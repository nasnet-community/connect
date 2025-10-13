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
        (lowerComment.includes("split") && !lowerComment.includes("games"))) {
        return ManglePriority.Split;
    }
    
    // 6. VPN Server inbound connections (check BEFORE Network Routing)
    if (lowerComment.includes("inbound") || 
        lowerComment.includes("incoming") ||
        lowerComment.includes("vpn-server") ||
        lowerComment.includes("conn-vpn-server") ||
        lowerCommand.includes("conn-vpn-server") ||
        (lowerComment.includes("ssh") && chain === "input") ||
        (lowerComment.includes("route") && lowerComment.includes("server"))) {
        return ManglePriority.VPNServerInbound;
    }
    
    // 7. Network routing (Domestic, Foreign, VPN)
    if ((lowerComment.includes("domestic") || 
         lowerComment.includes("foreign") || 
         lowerComment.includes("vpn")) &&
        (lowerComment.includes("connection") || 
         lowerComment.includes("routing")) &&
        !lowerComment.includes("games") &&
        !lowerComment.includes("split")) {
        return ManglePriority.NetworkRouting;
    }
    
    return ManglePriority.Default;
};

/**
 * Get sub-priority for ordering within the same priority group
 * This ensures consistent ordering within each priority level
 */
export const getSubPriority = (command: string, priority: ManglePriority): number => {
    const lowerCommand = command.toLowerCase();
    const chain = extractChain(command);
    
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
        if (lowerCommand.includes("mark-connection")) return 0;
        if (lowerCommand.includes("mark-routing")) return 1;
        return 999;
    }
    
    // For Split, order by specific types
    if (priority === ManglePriority.Split) {
        if (lowerCommand.includes("split-vpn")) return 0;
        if (lowerCommand.includes("split-frn")) return 1;
        if (lowerCommand.includes("split-dom")) return 2;
        if (lowerCommand.includes("chain=forward") && lowerCommand.includes("mark-connection")) return 3;
        if (lowerCommand.includes("chain=prerouting") && lowerCommand.includes("mark-routing")) return 4;
        return 999;
    }
    
    // For Network Routing, order by network type then action
    if (priority === ManglePriority.NetworkRouting) {
        let networkOrder = 0;
        if (lowerCommand.includes("domestic")) networkOrder = 0;
        else if (lowerCommand.includes("foreign")) networkOrder = 1;
        else if (lowerCommand.includes("vpn")) networkOrder = 2;
        
        let actionOrder = 0;
        if (lowerCommand.includes("mark-connection")) actionOrder = 0;
        else if (lowerCommand.includes("mark-routing")) actionOrder = 1;
        
        return networkOrder * 10 + actionOrder;
    }
    
    // For VPN Server Inbound, order by chain and action
    if (priority === ManglePriority.VPNServerInbound) {
        if (chain === "input") return 0;
        if (chain === "forward") return 1;
        if (chain === "output") return 2;
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
