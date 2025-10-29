import type { RouterConfig } from "../ConfigGenerator";

/**
 * Priority order for sorting firewall mangle rules
 * Lower number = higher priority (appears first)
 */
export enum ManglePriority {
    Accept = 1,              // Accept rules for LOCAL-IP
    VPNEndpoint = 2,         // VPN Endpoint routing
    OutputSpecial = 3,       // Special output rules (S4I, Cloud DDNS)
    Games = 4,               // Game routing rules
    Split = 5,               // Split traffic routing
    NetworkRouting = 6,      // Domestic, Foreign, VPN routing
    VPNServerInbound = 7,    // VPN Server inbound connections
    Default = 999,           // Everything else goes to the end
}

/**
 * Extract comment from a MikroTik command string
 * Looks for comment="..." or comment=...
 */
export const extractComment = (command: string): string => {
    // Match comment="..." (with quotes)
    const quotedMatch = command.match(/comment="([^"]*)"/);
    if (quotedMatch) {
        return quotedMatch[1];
    }

    // Match comment=... (without quotes, up to next space or end)
    const unquotedMatch = command.match(/comment=([^\s]+)/);
    if (unquotedMatch) {
        return unquotedMatch[1];
    }

    return "";
};

/**
 * Extract connection-mark and new-connection-mark from a MikroTik command
 */
export const extractConnectionMark = (command: string): { newMark: string; connectionMark: string } => {
    // Match new-connection-mark="value" or new-connection-mark=value
    const newMarkMatch = command.match(/new-connection-mark=(?:"([^"]+)"|([^\s]+))/);
    const newMark = newMarkMatch ? (newMarkMatch[1] || newMarkMatch[2]) : "";
    
    // Match connection-mark="value" or connection-mark=value
    const connMarkMatch = command.match(/connection-mark=(?:"([^"]+)"|([^\s]+))/);
    const connectionMark = connMarkMatch ? (connMarkMatch[1] || connMarkMatch[2]) : "";
    
    return {
        newMark,
        connectionMark
    };
};

/**
 * Detect NTH/PCC load balancing type from comment
 */
export const getLoadBalancingType = (command: string, comment: string): string => {
    if (comment.includes("NTH LOAD BALANCING")) return "NTH";
    if (comment.includes("PCC LOAD BALANCING")) return "PCC";
    return "";
};

/**
 * Extract network type from load balancing comment
 */
export const getNetworkFromComment = (comment: string): string => {
    if (comment.startsWith("Domestic")) return "Domestic";
    if (comment.startsWith("Foreign")) return "Foreign";
    if (comment.startsWith("VPN")) return "VPN";
    return "";
};

/**
 * Extract specific target from comment for pairing mark-connection with mark-routing
 * Examples:
 * - "Routing Games to Domestic" -> "Domestic"
 * - "Routing Games to Domestic-Fiber1" -> "Domestic-Fiber1"
 * - "Domestic Connection" -> "Domestic"
 * - "Domestic-Fiber1 Connection" -> "Domestic-Fiber1"
 * - "Foreign-Foreign Link 1 Routing" -> "Foreign-Foreign Link 1"
 */
export const extractSpecificTarget = (comment: string): string => {
    // For "Routing Games to X" format
    const gamesMatch = comment.match(/Routing Games to (.+)/);
    if (gamesMatch) {
        return gamesMatch[1];
    }
    
    // For "X Connection" or "X Routing" format
    const connectionMatch = comment.match(/^(.+?)\s+(Connection|Routing)$/);
    if (connectionMatch) {
        return connectionMatch[1];
    }
    
    return comment;
};

/**
 * Generate a unique hash for a string to ensure proper pairing
 * This ensures each unique target gets a unique score
 */
export const getStringHash = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
};

/**
 * Extract chain from a MikroTik command string
 */
export const extractChain = (command: string): string => {
    const chainMatch = command.match(/chain=(\S+)/);
    return chainMatch ? chainMatch[1] : "";
};

/**
 * Determine priority based on comment content and command characteristics
 */
export const getManglePriority = (command: string, comment: string): ManglePriority => {
    const lowerComment = comment.toLowerCase();
    const lowerCommand = command.toLowerCase();
    const chain = extractChain(command);
    const { connectionMark } = extractConnectionMark(command);
    
    // 1. Accept rules for LOCAL-IP traffic
    if (lowerComment === "accept" || 
        (lowerComment.includes("accept") && lowerCommand.includes("local-ip"))) {
        return ManglePriority.Accept;
    }
    
    // 2. VPN Endpoint routing
    if (lowerComment.includes("vpn endpoint")) {
        return ManglePriority.VPNEndpoint;
    }
    
    // 3. Special output routing (S4I, Cloud DDNS)
    if (chain === "output" && 
        (lowerComment.includes("s4i") || 
         lowerComment.includes("cloud ddns") ||
         lowerComment.includes("force ip/cloud"))) {
        return ManglePriority.OutputSpecial;
    }
    
    // 4. Game routing rules
    if (lowerComment.includes("games") || lowerComment.includes("routing games")) {
        return ManglePriority.Games;
    }
    
    // 5. Split traffic routing
    if (lowerComment.includes("split-") || 
        (lowerComment.includes("split") && !lowerComment.includes("games") && !lowerComment.includes("ssh"))) {
        return ManglePriority.Split;
    }
    
    // 6. Network routing (Domestic, Foreign, VPN) - includes NTH/PCC load balancing
    if ((lowerComment.includes("domestic") || 
         lowerComment.includes("foreign") || 
         lowerComment.includes("vpn")) &&
        (lowerComment.includes("connection") || 
         lowerComment.includes("routing") ||
         lowerComment.includes("load balancing")) &&
        !lowerComment.includes("games") &&
        !lowerComment.includes("split") &&
        !lowerComment.includes("ssh") &&
        !lowerComment.includes("inbound") &&
        !lowerComment.includes("incoming") &&
        !lowerComment.includes("vpn-server") &&
        !lowerComment.includes("conn-vpn-server") &&
        connectionMark !== "conn-vpn-server" &&
        connectionMark !== "ssh-conn-foreign") {
        return ManglePriority.NetworkRouting;
    }
    
    // 7. VPN Server inbound connections + SSH rules
    if (lowerComment.includes("inbound") || 
        lowerComment.includes("incoming") ||
        lowerComment.includes("vpn-server") ||
        lowerComment.includes("conn-vpn-server") ||
        lowerCommand.includes("conn-vpn-server") ||
        connectionMark === "conn-vpn-server" ||
        connectionMark === "ssh-conn-foreign" ||
        lowerComment.includes("ssh") ||
        (lowerComment.includes("route") && lowerComment.includes("server"))) {
        return ManglePriority.VPNServerInbound;
    }
    
    return ManglePriority.Default;
};

/**
 * Get sub-priority for ordering within the same priority group
 * This ensures consistent ordering within each priority level
 */
export const getSubPriority = (command: string, priority: ManglePriority): number => {
    const lowerCommand = command.toLowerCase();
    const comment = extractComment(command);
    const lowerComment = comment.toLowerCase();
    const chain = extractChain(command);
    const { connectionMark } = extractConnectionMark(command);
    const loadBalancingType = getLoadBalancingType(command, comment);
    
    // For Accept rules, order by chain
    if (priority === ManglePriority.Accept) {
        const chainOrder = ["prerouting", "postrouting", "output", "input", "forward"];
        const index = chainOrder.indexOf(chain);
        return index >= 0 ? index : 999;
    }
    
    // For VPN Endpoint, order mark-connection before mark-routing
    if (priority === ManglePriority.VPNEndpoint) {
        if (lowerCommand.includes("mark-connection")) return 0;
        if (lowerCommand.includes("mark-routing") && lowerCommand.includes("connection-mark")) return 1;
        if (lowerCommand.includes("mark-routing") && !lowerCommand.includes("connection-mark")) return 2;
        return 999;
    }
    
    // For Games, maintain pairs: mark-connection then mark-routing
    if (priority === ManglePriority.Games) {
        const target = extractSpecificTarget(comment);
        
        // Use proper string hash to ensure each target gets a unique score
        const targetOrder = getStringHash(target) * 10;
        
        // Within each target, mark-connection comes before mark-routing
        const actionOrder = lowerCommand.includes("mark-connection") ? 0 : 1;
        
        return targetOrder + actionOrder;
    }
    
    // For Split, order by specific types
    if (priority === ManglePriority.Split) {
        if (lowerComment.includes("split-vpn")) return 0;
        if (lowerComment.includes("split-frn")) return 1;
        if (lowerComment.includes("split-dom") && !lowerComment.includes("!dom")) return 2;
        if (lowerComment.includes("split-!dom")) return 3;
        if (lowerCommand.includes("chain=forward") && lowerCommand.includes("mark-connection")) return 4;
        if (lowerCommand.includes("chain=prerouting") && lowerCommand.includes("mark-routing")) return 5;
        return 999;
    }
    
    // For Network Routing, order by network type then by load balancing
    if (priority === ManglePriority.NetworkRouting) {
        const target = extractSpecificTarget(comment);
        
        // Determine base network type order: Domestic=0, Foreign=100000000, VPN=200000000
        let networkOrder = 0;
        if (target.startsWith("Domestic") || lowerComment.includes("domestic")) {
            networkOrder = 0;
        } else if (target.startsWith("Foreign") || lowerComment.includes("foreign")) {
            networkOrder = 100000000;
        } else if (target.startsWith("VPN") || lowerComment.includes("vpn")) {
            networkOrder = 200000000;
        }
        
        let actionOrder = 0;
        
        // Check if this is a load balancing rule
        if (loadBalancingType === "NTH" || loadBalancingType === "PCC") {
            // NTH/PCC load balancing rules come after regular network routing
            // Base order for load balancing rules: 10000000+
            
            // Extract specific interface from load balancing comment
            // e.g., "Domestic - NTH LOAD BALANCING - Mark pppoe-client-Fiber1 connections"
            const interfaceMatch = comment.match(/Mark ([^\s]+) (connections|routing)/);
            const interfaceName = interfaceMatch ? interfaceMatch[1] : "";
            const interfaceOrder = getStringHash(interfaceName) * 10;
            
            if (loadBalancingType === "NTH") {
                // NTH order:
                // 1. mark-connection chain=prerouting in-interface (0)
                // 2. mark-routing chain=output (1)
                // 3. mark-connection chain=prerouting nth= (2)
                // 4. mark-routing chain=prerouting (3)
                
                if (lowerCommand.includes("mark-connection") && chain === "prerouting" && lowerCommand.includes("in-interface")) {
                    actionOrder = 10000000 + interfaceOrder + 0;
                } else if (lowerCommand.includes("mark-routing") && chain === "output") {
                    actionOrder = 10000000 + interfaceOrder + 1;
                } else if (lowerCommand.includes("mark-connection") && chain === "prerouting" && lowerCommand.includes("nth=")) {
                    actionOrder = 10000000 + interfaceOrder + 2;
                } else if (lowerCommand.includes("mark-routing") && chain === "prerouting") {
                    actionOrder = 10000000 + interfaceOrder + 3;
                } else {
                    actionOrder = 10000000 + interfaceOrder + 4;
                }
            } else if (loadBalancingType === "PCC") {
                // PCC order:
                // 1. mark-connection chain=input (0)
                // 2. mark-routing chain=output (1)
                // 3. mark-connection chain=prerouting (2)
                // 4. mark-routing chain=prerouting (3)
                
                if (lowerCommand.includes("mark-connection") && chain === "input") {
                    actionOrder = 10000000 + interfaceOrder + 0;
                } else if (lowerCommand.includes("mark-routing") && chain === "output") {
                    actionOrder = 10000000 + interfaceOrder + 1;
                } else if (lowerCommand.includes("mark-connection") && chain === "prerouting") {
                    actionOrder = 10000000 + interfaceOrder + 2;
                } else if (lowerCommand.includes("mark-routing") && chain === "prerouting") {
                    actionOrder = 10000000 + interfaceOrder + 3;
                } else {
                    actionOrder = 10000000 + interfaceOrder + 4;
                }
            }
        } else {
            // Regular network routing rules (not load balancing)
            // Pair by specific target (e.g., "Domestic", "Domestic-Fiber1", "Foreign", "Foreign-Foreign Link 1")
            const targetOrder = getStringHash(target) * 10;
            
            // Within each target, mark-connection comes before mark-routing
            const pairOrder = lowerCommand.includes("mark-connection") ? 0 : 1;
            
            actionOrder = targetOrder + pairOrder;
        }
        
        return networkOrder + actionOrder;
    }
    
    // For VPN Server Inbound, order SSH rules first, then VPN inbound markings, then routing rules
    if (priority === ManglePriority.VPNServerInbound) {
        // SSH rules should come first
        if (connectionMark === "ssh-conn-foreign" || lowerComment.includes("ssh")) {
            if (chain === "input" && lowerCommand.includes("mark-connection")) {
                return 0; // SSH input marking
            }
            if (chain === "prerouting" && lowerCommand.includes("mark-routing")) {
                return 1; // SSH preroute routing
            }
            if (chain === "output" && lowerCommand.includes("mark-routing")) {
                return 2; // SSH output routing
            }
        }
        
        // VPN Server inbound connection marking (PPTP, L2TP, SSTP, OpenVPN, WireGuard)
        if (chain === "input" && lowerCommand.includes("mark-connection") && !lowerComment.includes("ssh")) {
            return 10;
        }
        
        // VPN Server output routing (conn-vpn-server)
        if (chain === "output" && connectionMark === "conn-vpn-server") {
            return 20;
        }
        
        return 999;
    }
    
    return 0;
};

/**
 * Sort mangle rules according to priority
 */
export const sortMangleRules = (commands: string[]): string[] => {
    return [...commands].sort((a, b) => {
        const commentA = extractComment(a);
        const commentB = extractComment(b);

        const priorityA = getManglePriority(a, commentA);
        const priorityB = getManglePriority(b, commentB);

        // Sort by priority first
        if (priorityA !== priorityB) {
            return priorityA - priorityB;
        }

        // If same priority, sort by sub-priority
        const subPriorityA = getSubPriority(a, priorityA);
        const subPriorityB = getSubPriority(b, priorityB);
        
        if (subPriorityA !== subPriorityB) {
            return subPriorityA - subPriorityB;
        }

        // If same priority and sub-priority, maintain original order (stable sort)
        return 0;
    });
};

/**
 * Sort specific sections of RouterConfig
 */
export const sortRouterConfig = ( config: RouterConfig, sections: string[] = ["/ip firewall mangle"] ): RouterConfig => {
    const sortedConfig: RouterConfig = { ...config };

    sections.forEach((section) => {
        if (Array.isArray(sortedConfig[section])) {
            sortedConfig[section] = sortMangleRules(sortedConfig[section]);
        }
    });

    return sortedConfig;
};

/**
 * Sort all firewall-related sections
 */
export const sortFirewallRules = (config: RouterConfig): RouterConfig => {
    return sortRouterConfig(config, [
        "/ip firewall mangle",
        "/ip firewall nat",
        "/ip firewall filter",
        "/ip firewall raw",
    ]);
};
