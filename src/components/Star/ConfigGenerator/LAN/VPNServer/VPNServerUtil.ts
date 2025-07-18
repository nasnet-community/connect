import type { RouterConfig } from "../../ConfigGenerator";
import type { VPNServer } from "../../../StarContext/Utils/VPNServerType";
import type { StarState } from "../../../StarContext/StarContext";
import type { Credentials } from "../../../StarContext/Utils/VPNServerType";
import { OneTimeScript } from "../../utils/ScriptSchedule";


export interface VPNFirewallRule {
    port: number | string;
    protocol: 'tcp' | 'udp' | 'tcp,udp';
    comment: string;
    interfaceList?: string;
}

export interface VPNAddressList {
    address: string;
    listName: string;
}

export interface VPNInterfaceList {
    interfaceName: string;
    lists: string[];
}

export interface IPPoolConfig {
    name: string;
    ranges: string;
    nextPool?: string;
    comment?: string;
}

export function addNetworkSegmentation(config: RouterConfig, vpnServer: VPNServer): void {
    const { Users } = vpnServer;
    const vpnTypes = [...new Set(Users.flatMap(user => user.VPNType))];

    // Create separate routing tables for each VPN type
    if (!config["/routing table"]) {
        config["/routing table"] = [];
    }

    vpnTypes.forEach(vpnType => {
        config["/routing table"].push(`add fib name=vpn-${vpnType.toLowerCase()}`);
    });

    // Add mangle rules for traffic separation
    if (!config["/ip firewall mangle"]) {
        config["/ip firewall mangle"] = [];
    }

    vpnTypes.forEach(vpnType => {
        const networkMap = {
            'Wireguard': '192.168.170.0/24',
            'OpenVPN': '192.168.60.0/24',
            'PPTP': '192.168.70.0/24',
            'L2TP': '192.168.80.0/24',
            'SSTP': '192.168.90.0/24',
            'IKeV2': '192.168.77.0/24'
        };

        const network = networkMap[vpnType as keyof typeof networkMap];
        if (network) {
            config["/ip firewall mangle"].push(
                `add action=mark-routing chain=prerouting comment="Route ${vpnType} traffic" new-routing-mark=vpn-${vpnType.toLowerCase()} passthrough=yes src-address=${network}`
            );
        }
    });

    // Add comments about network segmentation
    if (!config[""]) {
        config[""] = [];
    }

    config[""].push(
        `# Network Segmentation enabled for VPN types: ${vpnTypes.join(', ')}`
    );
}

export function formatArrayValue(value: any): string {
    if (Array.isArray(value)) {
        return value.join(',');
    }
    return String(value);
}

export function formatBooleanValue(value: boolean): string {
    return value ? 'yes' : 'no';
}

// VPN Server Utility Functions



export const generateVPNFirewallRules = (rules: VPNFirewallRule[]): RouterConfig => {
    const config: RouterConfig = {
        "/ip firewall filter": []
    };

    rules.forEach(rule => {
        const interfaceList = rule.interfaceList || "DOM-WAN";
        
        if (rule.protocol === 'tcp,udp') {
            // Add separate rules for TCP and UDP
            config["/ip firewall filter"].push(
                `add action=accept chain=input comment="${rule.comment} TCP" dst-port=${rule.port} \\
                in-interface-list=${interfaceList} protocol=tcp`
            );
            config["/ip firewall filter"].push(
                `add action=accept chain=input comment="${rule.comment} UDP" dst-port=${rule.port} \\
                in-interface-list=${interfaceList} protocol=udp`
            );
        } else {
            config["/ip firewall filter"].push(
                `add action=accept chain=input comment="${rule.comment}" dst-port=${rule.port} \\
                in-interface-list=${interfaceList} protocol=${rule.protocol}`
            );
        }
    });

    return config;
};

export const generateVPNAddressLists = (addressLists: VPNAddressList[]): RouterConfig => {
    const config: RouterConfig = {
        "/ip firewall address-list": []
    };

    addressLists.forEach(addressList => {
        config["/ip firewall address-list"].push(
            `add address="${addressList.address}" list="${addressList.listName}"`
        );
    });

    return config;
};

export const generateVPNInterfaceLists = (interfaceLists: VPNInterfaceList[]): RouterConfig => {
    const config: RouterConfig = {
        "/interface list member": []
    };

    interfaceLists.forEach(interfaceList => {
        interfaceList.lists.forEach(listName => {
            config["/interface list member"].push(
                `add interface="${interfaceList.interfaceName}" list="${listName}"`
            );
        });
    });

    return config;
};

export const generateVPNServerNetworkConfig = (
    firewallRules: VPNFirewallRule[],
    addressLists: VPNAddressList[],
    interfaceLists: VPNInterfaceList[]
): RouterConfig => {
    const config: RouterConfig = {
        "/ip firewall filter": [],
        "/ip firewall address-list": [],
        "/interface list member": []
    };

    // Merge firewall rules
    const firewallConfig = generateVPNFirewallRules(firewallRules);
    config["/ip firewall filter"].push(...firewallConfig["/ip firewall filter"]);

    // Merge address lists
    const addressConfig = generateVPNAddressLists(addressLists);
    config["/ip firewall address-list"].push(...addressConfig["/ip firewall address-list"]);

    // Merge interface lists
    const interfaceConfig = generateVPNInterfaceLists(interfaceLists);
    config["/interface list member"].push(...interfaceConfig["/interface list member"]);

    return config;
};

export const generateIPPool = (poolConfig: IPPoolConfig): string[] => {
    const poolParams: string[] = [
        `name=${poolConfig.name}`,
        `ranges=${poolConfig.ranges}`
    ];
    
    if (poolConfig.nextPool) {
        poolParams.push(`next-pool=${poolConfig.nextPool}`);
    }
    
    if (poolConfig.comment) {
        poolParams.push(`comment="${poolConfig.comment}"`);
    }

    return [`add ${poolParams.join(' ')}`];
};


export function addCommonVPNConfiguration(config: RouterConfig, vpnServer: VPNServer): void {
    const { Users } = vpnServer;

    // Create common PPP profiles if needed
    const vpnTypes = Users.flatMap(user => user.VPNType);
    const uniqueVpnTypes = [...new Set(vpnTypes)];

    // Add PPP profiles for PPP-based VPN types
    const pppBasedVpns = ['OpenVPN', 'PPTP', 'L2TP', 'SSTP'];
    const neededProfiles = uniqueVpnTypes.filter(type => pppBasedVpns.includes(type));

    if (neededProfiles.length > 0) {
        if (!config["/ppp profile"]) {
            config["/ppp profile"] = [];
        }

        // Add profiles for each VPN type if not already added
        if (neededProfiles.includes('OpenVPN') && !config["/ppp profile"].some(cmd => cmd.includes('ovpn-profile'))) {
            config["/ppp profile"].push(
                'add name=ovpn-profile dns-server=1.1.1.1 local-address=192.168.60.1 remote-address=ovpn-pool use-encryption=yes'
            );
        }

        if (neededProfiles.includes('PPTP') && !config["/ppp profile"].some(cmd => cmd.includes('pptp-profile'))) {
            config["/ppp profile"].push(
                'add name=pptp-profile dns-server=1.1.1.1 local-address=192.168.70.1 remote-address=pptp-pool use-encryption=yes'
            );
        }

        if (neededProfiles.includes('L2TP') && !config["/ppp profile"].some(cmd => cmd.includes('l2tp-profile'))) {
            config["/ppp profile"].push(
                'add name=l2tp-profile dns-server=1.1.1.1 local-address=192.168.80.1 remote-address=l2tp-pool use-encryption=yes'
            );
        }

        if (neededProfiles.includes('SSTP') && !config["/ppp profile"].some(cmd => cmd.includes('sstp-profile'))) {
            config["/ppp profile"].push(
                'add name=sstp-profile dns-server=1.1.1.1 local-address=192.168.90.1 remote-address=sstp-pool use-encryption=yes'
            );
        }
    }

    // Add IP pools for PPP-based VPNs if needed
    if (neededProfiles.length > 0) {
        if (!config["/ip pool"]) {
            config["/ip pool"] = [];
        }

        if (neededProfiles.includes('OpenVPN') && !config["/ip pool"].some(cmd => cmd.includes('ovpn-pool'))) {
            config["/ip pool"].push('add name=ovpn-pool ranges=192.168.60.5-192.168.60.250');
        }

        if (neededProfiles.includes('PPTP') && !config["/ip pool"].some(cmd => cmd.includes('pptp-pool'))) {
            config["/ip pool"].push('add name=pptp-pool ranges=192.168.70.5-192.168.70.250');
        }

        if (neededProfiles.includes('L2TP') && !config["/ip pool"].some(cmd => cmd.includes('l2tp-pool'))) {
            config["/ip pool"].push('add name=l2tp-pool ranges=192.168.80.5-192.168.80.250');
        }

        if (neededProfiles.includes('SSTP') && !config["/ip pool"].some(cmd => cmd.includes('sstp-pool'))) {
            config["/ip pool"].push('add name=sstp-pool ranges=192.168.90.5-192.168.90.250');
        }
    }

    // Add common firewall rules for VPN server access
    if (!config["/ip firewall filter"]) {
        config["/ip firewall filter"] = [];
    }

    // Add VPN server interface lists
    if (!config["/interface list member"]) {
        config["/interface list member"] = [];
    }

    // Add common address lists for VPN networks
    if (!config["/ip firewall address-list"]) {
        config["/ip firewall address-list"] = [];
    }

    // Add NAT rules for VPN clients to access internet
    if (!config["/ip firewall nat"]) {
        config["/ip firewall nat"] = [];
    }

    config["/ip firewall nat"].push(
        'add action=masquerade chain=srcnat comment="NAT for VPN clients" out-interface-list=WAN src-address-list=VPN-LAN'
    );

    // Add forward rules to allow VPN clients to access LAN and internet
    config["/ip firewall filter"].push(
        'add action=accept chain=forward comment="Allow VPN to LAN" src-address-list=VPN-LAN dst-address-list=LOCAL-IP',
        'add action=accept chain=forward comment="Allow LAN to VPN" src-address-list=LOCAL-IP dst-address-list=VPN-LAN',
        'add action=accept chain=forward comment="Allow VPN to Internet" src-address-list=VPN-LAN out-interface-list=WAN'
    );

    // Add comments about VPN server configuration
    if (!config[""]) {
        config[""] = [];
    }

    config[""].push(
        `# VPN Server Configuration Summary:`,
        `# Total users: ${Users.length}`,
        `# Configured VPN types: ${uniqueVpnTypes.join(', ')}`,
        `# Users per VPN type:`
    );

    uniqueVpnTypes.forEach(vpnType => {
        const userCount = Users.filter(user => user.VPNType.includes(vpnType)).length;
        config[""].push(`#   ${vpnType}: ${userCount} users`);
    });
}

// Utility function to get configured VPN protocols from StarContext
export const getConfiguredVPNProtocols = (state: StarState): string[] => {
    const vpnServer = state.LAN.VPNServer;
    if (!vpnServer) return [];

    const protocols: string[] = [];

    if (vpnServer.WireguardServers && vpnServer.WireguardServers.length > 0) {
        protocols.push('Wireguard');
    }
    if (vpnServer.OpenVpnServer) {
        protocols.push('OpenVPN');
    }
    if (vpnServer.PptpServer) {
        protocols.push('PPTP');
    }
    if (vpnServer.L2tpServer) {
        protocols.push('L2TP');
    }
    if (vpnServer.SstpServer) {
        protocols.push('SSTP');
    }
    if (vpnServer.Ikev2Server) {
        protocols.push('IKeV2');
    }

    return protocols;
};

// Utility function to check if a specific VPN protocol is configured
export const isVPNProtocolConfigured = (state: StarState, protocol: string): boolean => {
    const vpnServer = state.LAN.VPNServer;
    if (!vpnServer) return false;

    switch (protocol.toLowerCase()) {
        case 'wireguard':
            return !!(vpnServer.WireguardServers && vpnServer.WireguardServers.length > 0);
        case 'openvpn':
            return !!vpnServer.OpenVpnServer;
        case 'pptp':
            return !!vpnServer.PptpServer;
        case 'l2tp':
            return !!vpnServer.L2tpServer;
        case 'sstp':
            return !!vpnServer.SstpServer;
        case 'ikev2':
            return !!vpnServer.Ikev2Server;
        default:
            return false;
    }
};

// Utility function to get VPN users for a specific protocol
export const getVPNUsersForProtocol = (state: StarState, protocol: string): Credentials[] => {
    const vpnServer = state.LAN.VPNServer;
    if (!vpnServer || !vpnServer.Users) return [];

    return vpnServer.Users.filter(user => 
        user.VPNType.includes(protocol as any)
    );
};

// Function to generate inbound traffic marking rules for VPN server
export const InboundTraffic = (vpnServer: VPNServer): RouterConfig => {
    const config: RouterConfig = {
        "/ip firewall mangle": []
    };

    if (!vpnServer) {
        return config;
    }

    // Add comment header
    config["/ip firewall mangle"].push(
        "# --- VPN Server Inbound Traffic Marking ---",
        "# Mark inbound VPN connections and route outbound replies"
    );

    // Check for OpenVPN Server(s) - handle both single and potential multiple servers
    if (vpnServer.OpenVpnServer) {
        const openVpnServers = Array.isArray(vpnServer.OpenVpnServer) 
            ? vpnServer.OpenVpnServer 
            : [vpnServer.OpenVpnServer];
        
        openVpnServers.forEach((openVpnConfig) => {
            const port = openVpnConfig.Port || 1194;
            const protocol = openVpnConfig.Protocol || 'udp';
            const serverName = openVpnConfig.name || 'OpenVPN';
            
            config["/ip firewall mangle"].push(
                `add action=mark-connection chain=input comment="Mark Inbound OpenVPN Connections (${serverName})" \\
                    connection-state=new in-interface-list=DOM-WAN protocol=${protocol} dst-port=${port} \\
                    new-connection-mark=conn-vpn-server passthrough=yes`
            );
        });
    }

    // Check for SSTP Server
    if (vpnServer.SstpServer) {
        const port = vpnServer.SstpServer.Port || 4443;
        
        config["/ip firewall mangle"].push(
            `add action=mark-connection chain=input comment="Mark Inbound SSTP Connections" \\
                connection-state=new in-interface-list=DOM-WAN protocol=tcp dst-port=${port} \\
                new-connection-mark=conn-vpn-server passthrough=yes`
        );
    }

    // Check for PPTP Server
    if (vpnServer.PptpServer) {
        config["/ip firewall mangle"].push(
            `add action=mark-connection chain=input comment="Mark Inbound PPTP Connections" \\
                connection-state=new in-interface-list=DOM-WAN protocol=tcp dst-port=1723 \\
                new-connection-mark=conn-vpn-server passthrough=yes`
        );
    }

    // Check for L2TP Server
    if (vpnServer.L2tpServer) {
        config["/ip firewall mangle"].push(
            `add action=mark-connection chain=input comment="Mark Inbound L2TP Connections" \\
                connection-state=new in-interface-list=DOM-WAN protocol=udp dst-port=1701 \\
                new-connection-mark=conn-vpn-server passthrough=yes`
        );
    }

    // Check for WireGuard Servers - already handles multiple servers
    if (vpnServer.WireguardServers && vpnServer.WireguardServers.length > 0) {
        vpnServer.WireguardServers.forEach((wireguardConfig) => {
            const port = wireguardConfig.Interface.ListenPort || 13231;
            const interfaceName = wireguardConfig.Interface.Name;
            
            config["/ip firewall mangle"].push(
                `add action=mark-connection chain=input comment="Mark Inbound WireGuard Connections (${interfaceName})" \\
                    connection-state=new in-interface-list=DOM-WAN protocol=udp dst-port=${port} \\
                    new-connection-mark=conn-vpn-server passthrough=yes`
            );
        });
    }

    // Check for IKEv2/IPsec Server
    if (vpnServer.Ikev2Server) {
        // IKE main mode (UDP/500)
        config["/ip firewall mangle"].push(
            `add action=mark-connection chain=input comment="Mark Inbound IPsec/IKE Connections" \\
                connection-state=new in-interface-list=DOM-WAN protocol=udp dst-port=500 \\
                new-connection-mark=conn-vpn-server passthrough=yes`
        );

        // IKE NAT-T (UDP/4500)
        config["/ip firewall mangle"].push(
            `add action=mark-connection chain=input comment="Mark Inbound IPsec/IKE NAT-T Connections" \\
                connection-state=new in-interface-list=DOM-WAN protocol=udp dst-port=4500 \\
                new-connection-mark=conn-vpn-server passthrough=yes`
        );

        // IPsec ESP (protocol 50)
        config["/ip firewall mangle"].push(
            `add action=mark-connection chain=input comment="Mark Inbound IPsec ESP Connections" \\
                connection-state=new in-interface-list=DOM-WAN protocol=ipsec-esp \\
                new-connection-mark=conn-vpn-server passthrough=yes`
        );

        // IPsec AH (protocol 51)
        config["/ip firewall mangle"].push(
            `add action=mark-connection chain=input comment="Mark Inbound IPsec AH Connections" \\
                connection-state=new in-interface-list=DOM-WAN protocol=ipsec-ah \\
                new-connection-mark=conn-vpn-server passthrough=yes`
        );
    }

    // Add routing rule for outbound VPN replies
    if (config["/ip firewall mangle"].length > 2) { // More than just comments
        config["/ip firewall mangle"].push(
            "",
            "# Route outbound VPN server replies via Domestic WAN",
            `add action=mark-routing chain=output comment="Route VPN Server Replies via Domestic WAN" \\
                connection-mark=conn-vpn-server new-routing-mark=to-DOM passthrough=no`
        );
    }

    return config;
};

export const ExportOpenVPN = (): RouterConfig => {
    // Create the OpenVPN Client Configuration Export script content as RouterConfig
    const exportOpenVPNScriptContent: RouterConfig = {
        "": [
            ":delay 130s;",
            "# ===========================================",
            "# OpenVPN Client Configuration Export Script",
            "# ===========================================",
            "# Enhanced version with proper file naming: Name-Protocol-Port.ovpn",
            "# Following MikroTik RouterOS 7.x documentation standards",
            "",
            ":log info \"=== OpenVPN Client Configuration Export Started ===\";",
            "",
            "# Declare local variables",
            ":local exportCount 0",
            ":local serverAddress \"\"",
            ":local ovpnEnabled false",
            "",
            "# Step 1: Check if OpenVPN server is configured and enabled",
            ":put \"[STEP] Checking OpenVPN server configuration...\"",
            ":do {",
            "    :local serverCount [/interface ovpn-server server print count-only]",
            "    :if ($serverCount > 0) do={",
            "        :set ovpnEnabled true",
            "        :put \"[OK] Found $serverCount OpenVPN server(s)\"",
            "        :log info \"OpenVPN Export: Found $serverCount OpenVPN server(s)\"",
            "    } else={",
            "        :put \"[ERROR] No OpenVPN server configured\"",
            "        :log warning \"OpenVPN Export: No OpenVPN server configured\"",
            "    }",
            "} on-error={",
            "    :put \"[ERROR] Failed to check OpenVPN server status\"",
            "    :log error \"OpenVPN Export: Failed to check OpenVPN server status\"",
            "}",
            "",
            "# Step 2: Setup server endpoint address",
            ":put \"[STEP] Detecting server endpoint address...\"",
            ":do {",
            "    # Try MikroTik Cloud DDNS first",
            "    /ip cloud set ddns-enabled=yes",
            "    :delay 5s",
            "    :set serverAddress [/ip cloud get dns-name]",
            "    :if ([:len $serverAddress] > 0) do={",
            "        :put \"[OK] Using Cloud DDNS: $serverAddress\"",
            "        :log info \"OpenVPN Export: Using Cloud DDNS endpoint: $serverAddress\"",
            "    } else={",
            "        :put \"[INFO] Cloud DDNS not available, checking WAN interfaces...\"",
            "        :log info \"OpenVPN Export: Cloud DDNS not available, checking WAN interfaces\"",
            "        ",
            "        # Fallback to WAN interface IP detection",
            "        :local wanInterfaces [/interface list member find list=\"WAN\"]",
            "        :if ([:len $wanInterfaces] > 0) do={",
            "            :local wanInt [/interface list member get [:pick $wanInterfaces 0] interface]",
            "            :local wanAddresses [/ip address find interface=$wanInt]",
            "            :if ([:len $wanAddresses] > 0) do={",
            "                :local wanAddr [/ip address get [:pick $wanAddresses 0] address]",
            "                :set serverAddress [:pick $wanAddr 0 [:find $wanAddr \"/\"]]",
            "                :put \"[OK] Using WAN IP: $serverAddress\"",
            "                :log info \"OpenVPN Export: Using WAN IP endpoint: $serverAddress\"",
            "            } else={",
            "                :set serverAddress ([/system identity get name] . \".example.com\")",
            "                :put \"[WARNING] No IP found, using placeholder: $serverAddress\"",
            "                :log warning \"OpenVPN Export: No WAN IP found, using placeholder\"",
            "            }",
            "        } else={",
            "            :set serverAddress ([/system identity get name] . \".example.com\")",
            "            :put \"[WARNING] No WAN interface found, using placeholder: $serverAddress\"",
            "            :log warning \"OpenVPN Export: No WAN interfaces found\"",
            "        }",
            "    }",
            "} on-error={",
            "    :set serverAddress ([/system identity get name] . \".example.com\")",
            "    :put \"[WARNING] Endpoint detection failed, using placeholder: $serverAddress\"",
            "    :log warning \"OpenVPN Export: Endpoint detection failed\"",
            "}",
            "",
            "# Step 3: Check certificate prerequisites",
            ":put \"[STEP] Checking certificate files...\"",
            ":local certsReady false",
            ":local caExists false",
            ":local clientCrtExists false",
            ":local clientKeyExists false",
            "",
            ":foreach file in=[/file find] do={",
            "    :local fileName [/file get $file name]",
            "    :if ($fileName = \"ca_certificate.crt\") do={ :set caExists true }",
            "    :if ($fileName = \"client_bundle.crt\") do={ :set clientCrtExists true }",
            "    :if ($fileName = \"client_bundle.key\") do={ :set clientKeyExists true }",
            "}",
            "",
            ":if ($caExists && $clientCrtExists && $clientKeyExists) do={",
            "    :set certsReady true",
            "    :put \"[OK] Certificate files found\"",
            "    :log info \"OpenVPN Export: All required certificate files found\"",
            "} else={",
            "    :put \"[ERROR] Certificate files missing:\"",
            "    :if (!$caExists) do={ :put \"  - ca_certificate.crt\" }",
            "    :if (!$clientCrtExists) do={ :put \"  - client_bundle.crt\" }",
            "    :if (!$clientKeyExists) do={ :put \"  - client_bundle.key\" }",
            "    :put \"[INFO] Run ExportCert function first to generate certificates\"",
            "    :log warning \"OpenVPN Export: Certificate files missing\"",
            "}",
            "",
            "# Step 4: Export client configurations for each OpenVPN server",
            ":if ($ovpnEnabled && $certsReady && [:len $serverAddress] > 0) do={",
            "    :put \"[STEP] Exporting OpenVPN client configurations...\"",
            "    ",
            "    :foreach serverId in=[/interface ovpn-server server find] do={",
            "        :do {",
            "            # Get server configuration details",
            "            :local serverName [/interface ovpn-server server get $serverId name]",
            "            :local serverPort [/interface ovpn-server server get $serverId port]",
            "            :local serverProtocol [/interface ovpn-server server get $serverId protocol]",
            "            :local serverDisabled [/interface ovpn-server server get $serverId disabled]",
            "            ",
            "            :put \"[INFO] Processing server: $serverName\"",
            "            :put \"[INFO] - Protocol: $serverProtocol\"",
            "            :put \"[INFO] - Port: $serverPort\"",
            "            :put \"[INFO] - Status: $[:pick \"enabled\" 0 [:len \"enabled\"]] $[:pick \"disabled\" 0 [:len \"disabled\"]]\"",
            "            :log info \"OpenVPN Export: Processing server $serverName ($serverProtocol:$serverPort)\"",
            "            ",
            "            :if (!$serverDisabled) do={",
            "                # Ensure require-client-certificate is enabled for export to work",
            "                /interface ovpn-server server set $serverId require-client-certificate=yes",
            "                :log info \"OpenVPN Export: Enabled require-client-certificate for server $serverName\"",
            "                ",
            "                # Generate filename in format: ServerName-Protocol-Port.ovpn",
            "                :local fileName ($serverName . \"-\" . [:tostr $serverProtocol] . \"-\" . [:tostr $serverPort] . \".ovpn\")",
            "                ",
            "                # Sanitize filename - remove invalid characters",
            "                :while ([:find $fileName \" \"] >= 0) do={",
            "                    :local pos [:find $fileName \" \"]",
            "                    :set fileName ([:pick $fileName 0 $pos] . \"_\" . [:pick $fileName ($pos + 1) [:len $fileName]])",
            "                }",
            "                ",
            "                # Remove other problematic characters",
            "                :local invalidChars {\"<\"; \">\"; \":\"; \"\\\\\"; \"/\"; \"|\"; \"?\"; \"*\"; \"\\\"\"; \"'\"}",
            "                :foreach char in=$invalidChars do={",
            "                    :while ([:find $fileName $char] >= 0) do={",
            "                        :local pos [:find $fileName $char]",
            "                        :set fileName ([:pick $fileName 0 $pos] . \"_\" . [:pick $fileName ($pos + 1) [:len $fileName]])",
            "                    }",
            "                }",
            "                ",
            "                :put \"[EXPORT] Generating configuration file: $fileName\"",
            "                :log info \"OpenVPN Export: Generating configuration file: $fileName\"",
            "                ",
            "                # Export client configuration - improved method for proper naming",
            "                :do {",
            "                    # Get list of existing .ovpn files before export",
            "                    :local existingFiles",
            "                    :foreach file in=[/file find] do={",
            "                        :local fName [/file get $file name]",
            "                        :if ([:find $fName \".ovpn\"] >= 0) do={",
            "                            :if ([:typeof $existingFiles] = \"nothing\") do={",
            "                                :set existingFiles {$fName}",
            "                            } else={",
            "                                :set existingFiles ($existingFiles , $fName)",
            "                            }",
            "                        }",
            "                    }",
            "                    ",
            "                    :put \"[INFO] Files before export: $[:len $existingFiles] .ovpn files\"",
            "                    :log info \"OpenVPN Export: Found $[:len $existingFiles] existing .ovpn files before export\"",
            "                    ",
            "                    # Export using standard RouterOS command (without file parameter)",
            "                    /interface ovpn-server server export-client-configuration \\",
            "                        server=$serverName \\",
            "                        server-address=$serverAddress \\",
            "                        ca-certificate=\"ca_certificate.crt\" \\",
            "                        client-certificate=\"client_bundle.crt\" \\",
            "                        client-cert-key=\"client_bundle.key\"",
            "                    ",
            "                    # Wait for file to be generated",
            "                    :delay 3s",
            "                    ",
            "                    # Find the newly generated file",
            "                    :local newFileName \"\"",
            "                    :local foundNewFile false",
            "                    ",
            "                    :foreach file in=[/file find] do={",
            "                        :local fName [/file get $file name]",
            "                        :if ([:find $fName \".ovpn\"] >= 0) do={",
            "                            # Check if this file is new (not in existingFiles list)",
            "                            :local isExisting false",
            "                            :foreach existingFile in=$existingFiles do={",
            "                                :if ($fName = $existingFile) do={",
            "                                    :set isExisting true",
            "                                }",
            "                            }",
            "                            ",
            "                            # If this is a new file, it's likely our export",
            "                            :if (!$isExisting) do={",
            "                                :set newFileName $fName",
            "                                :set foundNewFile true",
            "                                :put \"[FOUND] New file generated: $newFileName\"",
            "                                :log info \"OpenVPN Export: Found new file: $newFileName\"",
            "                            }",
            "                        }",
            "                    }",
            "                    ",
            "                    # If no new file found, look for typical RouterOS export patterns",
            "                    :if (!$foundNewFile) do={",
            "                        :put \"[SEARCH] Looking for typical export patterns...\"",
            "                        :foreach file in=[/file find] do={",
            "                            :local fName [/file get $file name]",
            "                            # Look for patterns like client*.ovpn, files with numbers",
            "                            :if ([:find $fName \".ovpn\"] >= 0) do={",
            "                                :if (([:find $fName \"client\"] >= 0) || ([:len $fName] > 15 && [:find $fName \"ovpn\"] > 10)) do={",
            "                                    :set newFileName $fName",
            "                                    :set foundNewFile true",
            "                                    :put \"[PATTERN] Found potential export file: $newFileName\"",
            "                                    :log info \"OpenVPN Export: Found file by pattern: $newFileName\"",
            "                                }",
            "                            }",
            "                        }",
            "                    }",
            "                    ",
            "                    # Rename the file to our desired format if found",
            "                    :if ($foundNewFile && [:len $newFileName] > 0) do={",
            "                        :do {",
            "                            /file set [/file find name=$newFileName] name=$fileName",
            "                            :put \"[SUCCESS] Renamed: $newFileName -> $fileName\"",
            "                            :log info \"OpenVPN Export: Successfully renamed $newFileName to $fileName\"",
            "                            :set exportCount ($exportCount + 1)",
            "                        } on-error={",
            "                            # If direct rename fails, try copy method",
            "                            :put \"[COPY] Direct rename failed, trying copy method...\"",
            "                            :do {",
            "                                :local fileContent [/file get [/file find name=$newFileName] contents]",
            "                                /file add name=$fileName contents=$fileContent",
            "                                /file remove [/file find name=$newFileName]",
            "                                :put \"[SUCCESS] Copied and renamed: $newFileName -> $fileName\"",
            "                                :log info \"OpenVPN Export: Copied and renamed $newFileName to $fileName\"",
            "                                :set exportCount ($exportCount + 1)",
            "                            } on-error={",
            "                                :put \"[WARNING] Could not rename file, keeping original: $newFileName\"",
            "                                :log warning \"OpenVPN Export: Could not rename file, keeping: $newFileName\"",
            "                                :set exportCount ($exportCount + 1)",
            "                            }",
            "                        }",
            "                    } else={",
            "                        :put \"[ERROR] No .ovpn file generated for server $serverName\"",
            "                        :log error \"OpenVPN Export: No .ovpn file found after export for server $serverName\"",
            "                    }",
            "                    ",
            "                } on-error={",
            "                    :put \"[ERROR] Failed to export configuration for server $serverName\"",
            "                    :log error \"OpenVPN Export: Export command failed for server $serverName\"",
            "                }",
            "            } else={",
            "                :put \"[SKIP] Server $serverName is disabled\"",
            "                :log info \"OpenVPN Export: Skipping disabled server $serverName\"",
            "            }",
            "            ",
            "        } on-error={",
            "            :put \"[ERROR] Failed to process OpenVPN server $serverId\"",
            "            :log error \"OpenVPN Export: Failed to process OpenVPN server $serverId\"",
            "        }",
            "    }",
            "} else={",
            "    :put \"[ERROR] Prerequisites not met for export\"",
            "    :log warning \"OpenVPN Export: Prerequisites not met\"",
            "}",
            "",
            "# Step 5: Summary and completion",
            ":put \"\"",
            ":put \"=========================================\"",
            ":put \"OpenVPN Export Complete\"",
            ":put \"=========================================\"",
            ":put \"Configurations exported: $exportCount\"",
            ":put \"Server endpoint: $serverAddress\"",
            ":put \"File naming format: ServerName-Protocol-Port.ovpn\"",
            ":put \"Completed at: $[/system clock get time]\"",
            "",
            ":if ($exportCount > 0) do={",
            "    :put \"\"",
            "    :put \"[SUCCESS] OpenVPN client configurations ready!\"",
            "    :put \"Next steps:\"",
            "    :put \"1. Download .ovpn files from Files menu\"",
            "    :put \"2. Import into OpenVPN clients\"",
            "    :put \"3. Test connectivity\"",
            "    :log info \"OpenVPN Export: Successfully exported $exportCount client configuration(s)\"",
            "} else={",
            "    :put \"\"",
            "    :put \"[INFO] Troubleshooting checklist:\"",
            "    :put \"\"",
            "    :put \"STEP 1: Verify OpenVPN server status:\"",
            "    :put \"   /interface ovpn-server server print detail\"",
            "    :put \"   - Ensure servers are not disabled\"",
            "    :put \"   - Check require-client-certificate=yes\"",
            "    :put \"\"",
            "    :put \"STEP 2: Verify certificates exist:\"",
            "    :put \"   /file print where name~\\\".crt\\\" or name~\\\".key\\\"\"",
            "    :put \"   Required files:\"",
            "    :put \"   - ca_certificate.crt (CA certificate)\"",
            "    :put \"   - client_bundle.crt (client certificate)\"",
            "    :put \"   - client_bundle.key (client private key)\"",
            "    :put \"\"",
            "    :put \"STEP 3: Generate missing certificates:\"",
            "    :put \"   - Run ExportCert function to export certificate files\"",
            "    :put \"   - Or manually export: /certificate export-certificate\"",
            "    :put \"\"",
            "    :put \"STEP 4: Check server configuration:\"",
            "    :put \"   /interface ovpn-server server set [find] require-client-certificate=yes\"",
            "    :put \"   /interface ovpn-server server set [find] disabled=no\"",
            "    :put \"\"",
            "    :put \"STEP 5: Verify endpoint address:\"",
            "    :put \"   Current endpoint: $serverAddress\"",
            "    :put \"   - Enable Cloud DDNS: /ip cloud set ddns-enabled=yes\"",
            "    :put \"   - Or configure static public IP\"",
            "    :log warning \"OpenVPN Export: No configurations were exported - check troubleshooting steps\"",
            "}",
            "",
            ":log info \"OpenVPN Export: Process completed - $exportCount configurations generated using endpoint $serverAddress\""
        ]
    };

    // Use OneTimeScript to create the script
    return OneTimeScript({
        ScriptContent: exportOpenVPNScriptContent,
        name: `Export-OpenVPN-Config`,
        startTime: "startup"
    });
};

export const ExportWireGuard = (): RouterConfig => {
    // Create simplified WireGuard export script following RouterOS best practices
    const scriptContent: RouterConfig = {
        "": [
            `:delay 130s;`,
            "# ===========================================",
            "# WireGuard Client Configuration Export",
            "# ===========================================",
            "# Simplified script using RouterOS native commands",
            "# Following MikroTik documentation best practices",
            "",
            ":put \"[INFO] Starting WireGuard client configuration export\"",
            "",
            "# Declare local variables (RouterOS best practice)",
            ":local configCount 0",
            ":local endpointAddress \"\"",
            "",
            "# Step 1: Determine server endpoint",
            ":put \"[STEP] Detecting server endpoint...\"",
            ":log info \"WireGuard Export: Starting endpoint detection\"",
            ":do {",
            "    :local ddnsName [/ip cloud get dns-name]",
            "    :if ([:len $ddnsName] > 0) do={",
            "        :set endpointAddress $ddnsName",
            "        :put \"[OK] Using DDNS: $endpointAddress\"",
            "        :log info \"WireGuard Export: DDNS endpoint detected: $endpointAddress\"",
            "    } else={",
            "        :log info \"WireGuard Export: DDNS not available, checking WAN interfaces\"",
            "        # Fallback to WAN interface IP detection",
            "        :local wanInterfaces [/interface list member find list=\"WAN\"]",
            "        :if ([:len $wanInterfaces] > 0) do={",
            "            :local wanInt [/interface list member get [:pick $wanInterfaces 0] interface]",
            "            :log info \"WireGuard Export: Checking WAN interface: $wanInt\"",
            "            :local wanAddresses [/ip address find interface=$wanInt]",
            "            :if ([:len $wanAddresses] > 0) do={",
            "                :local wanAddr [/ip address get [:pick $wanAddresses 0] address]",
            "                :set endpointAddress [:pick $wanAddr 0 [:find $wanAddr \"/\"]]",
            "                :put \"[OK] Using WAN IP: $endpointAddress\"",
            "                :log info \"WireGuard Export: WAN IP endpoint detected: $endpointAddress\"",
            "            } else={",
            "                :set endpointAddress \"YOUR_PUBLIC_IP_HERE\"",
            "                :put \"[WARNING] No IP found on WAN interface - using placeholder\"",
            "                :log warning \"WireGuard Export: No IP address found on WAN interface $wanInt\"",
            "            }",
            "        } else={",
            "            :set endpointAddress \"YOUR_PUBLIC_IP_HERE\"",
            "            :put \"[WARNING] No WAN interface found - using placeholder\"",
            "            :log warning \"WireGuard Export: No WAN interfaces found in interface list\"",
            "        }",
            "    }",
            "} on-error={",
            "    :set endpointAddress \"YOUR_PUBLIC_IP_HERE\"",
            "    :put \"[WARNING] Endpoint detection failed - using placeholder\"",
            "    :log error \"WireGuard Export: Endpoint detection failed with error\"",
            "}",
            "",
            "# Step 2: Find WireGuard peers on server interfaces",
            ":put \"[STEP] Discovering WireGuard peers on server interfaces...\"",
            ":log info \"WireGuard Export: Searching for WireGuard peers on interfaces containing 'server' or 'Server'\"",
            ":local allPeers [/interface wireguard peers find]",
            ":local serverPeers",
            "",
            "# Filter peers whose interface contains 'server' or 'Server' in the name",
            "# Exclude interfaces containing 'client' or 'Client'",
            ":foreach peerId in=$allPeers do={",
            "    :local peerInterface [/interface wireguard peers get $peerId interface]",
            "    :local interfaceName [:tostr $peerInterface]",
            "    :put \"[DEBUG] Checking interface: $interfaceName\"",
            "    :log info \"WireGuard Export: Checking interface: $interfaceName\"",
            "    ",
            "    # Check if interface contains 'server' or 'Server' AND does not contain 'client' or 'Client'",
            "    :local hasServer (([:find $interfaceName \"server\"] >= 0) || ([:find $interfaceName \"Server\"] >= 0))",
            "    :local hasClient (([:find $interfaceName \"client\"] >= 0) || ([:find $interfaceName \"Client\"] >= 0))",
            "    ",
            "    :if ($hasServer && !$hasClient) do={",
            "        :if ([:typeof $serverPeers] = \"nothing\") do={",
            "            :set serverPeers {$peerId}",
            "        } else={",
            "            :set serverPeers ($serverPeers , $peerId)",
            "        }",
            "        :put \"[INCLUDE] Interface $interfaceName contains 'server' and does not contain 'client'\"",
            "        :log info \"WireGuard Export: Found peer on server interface: $interfaceName\"",
            "    } else={",
            "        :put \"[EXCLUDE] Interface $interfaceName - hasServer: $hasServer, hasClient: $hasClient\"",
            "        :log info \"WireGuard Export: Skipping interface $interfaceName - not a server interface\"",
            "    }",
            "}",
            "",
            ":if ([:len $serverPeers] = 0) do={",
            "    :put \"[ERROR] No peers found on WireGuard server interfaces\"",
            "    :put \"[INFO] Requirements for server interfaces:\"",
            "    :put \"[INFO] - Interface name must contain 'server' or 'Server'\"",
            "    :put \"[INFO] - Interface name must NOT contain 'client' or 'Client'\"",
            "    :put \"[INFO] Example valid names: wireguard-server, wg-server1, MyServer\"",
            "    :put \"[INFO] Example invalid names: wireguard-client, client-server, wg-client\"",
            "    :log error \"WireGuard Export: No peers found on valid server interfaces\"",
            "    :error \"No peers configured on WireGuard server interfaces\"",
            "}",
            "",
            ":put \"[OK] Found $[:len $serverPeers] peer(s) on WireGuard server interface(s)\"",
            ":log info \"WireGuard Export: Found $[:len $serverPeers] peer(s) on WireGuard server interface(s)\"",
            "",
            "# Step 3: Export client configurations for server peers",
            ":foreach peerId in=$serverPeers do={",
            "    :do {",
            "        :local peerInterface [/interface wireguard peers get $peerId interface]",
            "        :local interfaceName [:tostr $peerInterface]",
            "        :local listenPort [/interface wireguard get [find name=$interfaceName] listen-port]",
            "        :local peerConfig [/interface wireguard peers get $peerId]",
            "        :local peerName \"\"",
            "        ",
            "        # Try to get peer name (not comment) - use peer ID as fallback",
            "        :do {",
            "            :set peerName [/interface wireguard peers get $peerId name]",
            "        } on-error={",
            "            :set peerName (\"peer-\" . $peerId)",
            "        }",
            "        ",
            "        # If peer name is empty or default, use peer ID",
            "        :if ([:len $peerName] = 0 || $peerName = \"\") do={",
            "            :set peerName (\"peer-\" . $peerId)",
            "        }",
            "        ",
            "        :put \"[PROCESS] Peer on interface: $interfaceName (port: $listenPort)\"",
            "        :log info \"WireGuard Export: Processing peer on interface $interfaceName port $listenPort\"",
            "        ",
                    "        :put \"[EXPORT] Peer: $peerName (ID: $peerId)\"",
        "        :log info \"WireGuard Export: Exporting configuration for peer: $peerName\"",
        "        ",
        "        # Update endpoint for client config (don't add port - WireGuard will use interface listen-port)",
        "        /interface wireguard peers set $peerId client-endpoint=\"$endpointAddress\"",
        "        :log info \"WireGuard Export: Set client endpoint to $endpointAddress for peer $peerName\"",
            "        ",
            "        # Validate peer configuration before generating client config",
            "        :local peerPublicKey [/interface wireguard peers get $peerId public-key]",
            "        :local peerAllowedAddress [/interface wireguard peers get $peerId allowed-address]",
            "        :local interfacePrivateKey [/interface wireguard get [find name=$interfaceName] private-key]",
            "        ",
            "        :put \"[VALIDATE] Peer $peerName validation:\"",
            "        :put \"[VALIDATE] - Public Key: $[:len $peerPublicKey] chars\"",
            "        :put \"[VALIDATE] - Allowed Address: $peerAllowedAddress\"",
            "        :put \"[VALIDATE] - Interface Private Key: $[:len $interfacePrivateKey] chars\"",
            "        ",
            "        # Enhanced validation with detailed diagnostics",
            "        :local configComplete true",
            "        :local missingItems \"\"",
            "        ",
            "        :if ([:len $peerPublicKey] = 0) do={",
            "            :put \"[ERROR] Peer $peerName missing public key\"",
            "            :log error \"WireGuard Export: Peer $peerName has no public key configured\"",
            "            :set configComplete false",
            "            :set missingItems ($missingItems . \"public-key \")",
            "        }",
            "        :if ([:len $peerAllowedAddress] = 0) do={",
            "            :put \"[ERROR] Peer $peerName missing allowed-address\"",
            "            :log error \"WireGuard Export: Peer $peerName has no allowed-address configured\"",
            "            :set configComplete false",
            "            :set missingItems ($missingItems . \"allowed-address \")",
            "        }",
            "        :if ([:len $interfacePrivateKey] = 0) do={",
            "            :put \"[ERROR] Interface $interfaceName missing private key\"",
            "            :log error \"WireGuard Export: Interface $interfaceName has no private key configured\"",
            "            :set configComplete false",
            "            :set missingItems ($missingItems . \"interface-private-key \")",
            "        }",
            "        ",
            "        # Additional validation for peer state",
            "        :local peerDisabled [/interface wireguard peers get $peerId disabled]",
            "        :if ($peerDisabled) do={",
            "            :put \"[WARNING] Peer $peerName is disabled - configuration may not work\"",
            "            :log warning \"WireGuard Export: Peer $peerName is disabled\"",
            "        }",
            "        ",
            "        # Show current peer configuration for debugging when incomplete",
            "        :if (!$configComplete) do={",
            "            :put \"[DEBUG] Missing items for peer $peerName: $missingItems\"",
            "            :put \"[DEBUG] Current peer $peerName configuration:\"",
            "            :do {",
            "                :put \"[DEBUG] Peer details:\"",
            "                /interface wireguard peers print detail where .id=$peerId",
            "            } on-error={",
            "                :put \"[DEBUG] Could not display peer details\"",
            "            }",
            "            :put \"[DEBUG] Current interface $interfaceName configuration:\"",
            "            :do {",
            "                :put \"[DEBUG] Interface details:\"",
            "                /interface wireguard print detail where name=$interfaceName",
            "            } on-error={",
            "                :put \"[DEBUG] Could not display interface details\"",
            "            }",
            "        }",
            "        ",
            "        :local clientConfig \"\"",
            "        ",
            "        :if ($configComplete) do={",
            "            # Generate client configuration using file export method",
            "            # This avoids issues with structured output parsing",
            "            :do {",
            "                :put \"[GENERATE] Exporting config to file for peer $peerName...\"",
            "                ",
            "                # Create temporary filename for export",
            "                :local tempFileName (\"temp-\" . $peerName . \"-config.txt\")",
            "                ",
            "                # Export to file first (this always works reliably)",
            "                /interface wireguard peers show-client-config $peerId file=$tempFileName",
            "                ",
            "                # Small delay to ensure file is written",
            "                :delay 500ms",
            "                ",
            "                # Read the file content",
            "                :do {",
            "                    :set clientConfig [/file get [/file find name=$tempFileName] contents]",
            "                    :put \"[DEBUG] Successfully read temp file: $tempFileName\"",
            "                    :put \"[DEBUG] Raw file content length: $[:len $clientConfig]\"",
            "                    ",
            "                    # Clean up temporary file",
            "                    /file remove [/file find name=$tempFileName]",
            "                    ",
            "                } on-error={",
            "                    :put \"[ERROR] Failed to read temporary config file: $tempFileName\"",
            "                    :set clientConfig \"\"",
            "                    # Try to clean up temp file anyway",
            "                    :do {",
            "                        /file remove [/file find name=$tempFileName]",
            "                    } on-error={",
            "                        # Ignore cleanup errors",
            "                    }",
            "                }",
            "                ",
            "                # Process the configuration content",
            "                :if ([:len $clientConfig] > 0) do={",
            "                    # Convert to string if needed",
            "                    :if ([:typeof $clientConfig] != \"str\") do={",
            "                        :set clientConfig [:tostr $clientConfig]",
            "                    }",
            "                    ",
            "                    # Remove QR code section if present",
            "                    # Look for common QR code markers",
            "                    :local qrMarkers {\"qr:\"; \"####\"; \"#######\"; \"#########\"}",
            "                    :foreach marker in=$qrMarkers do={",
            "                        :local qrStart [:find $clientConfig $marker]",
            "                        :if ($qrStart >= 0) do={",
            "                            :set clientConfig [:pick $clientConfig 0 $qrStart]",
            "                            :put \"[DEBUG] Removed QR section starting with: $marker\"",
            "                        }",
            "                    }",
            "                    ",
            "                    # Clean up whitespace",
            "                    :while ([:len $clientConfig] > 0 && ([:pick $clientConfig ([:len $clientConfig] - 1) [:len $clientConfig]] = \"\\n\" || [:pick $clientConfig ([:len $clientConfig] - 1) [:len $clientConfig]] = \"\\r\" || [:pick $clientConfig ([:len $clientConfig] - 1) [:len $clientConfig]] = \" \" || [:pick $clientConfig ([:len $clientConfig] - 1) [:len $clientConfig]] = \"\\t\")) do={",
            "                        :set clientConfig [:pick $clientConfig 0 ([:len $clientConfig] - 1)]",
            "                    }",
            "                    :while ([:len $clientConfig] > 0 && ([:pick $clientConfig 0 1] = \"\\n\" || [:pick $clientConfig 0 1] = \"\\r\" || [:pick $clientConfig 0 1] = \" \" || [:pick $clientConfig 0 1] = \"\\t\")) do={",
            "                        :set clientConfig [:pick $clientConfig 1 [:len $clientConfig]]",
            "                    }",
            "                    ",
            "                    :put \"[DEBUG] Processed config length: $[:len $clientConfig]\"",
            "                    :if ([:len $clientConfig] > 100) do={",
            "                        :put \"[DEBUG] Config preview: $[:pick $clientConfig 0 100]...\"",
            "                    } else={",
            "                        :put \"[DEBUG] Full config: $clientConfig\"",
            "                    }",
            "                } else={",
            "                    :put \"[ERROR] Empty configuration content from file\"",
            "                }",
            "                ",
            "                :log info \"WireGuard Export: Generated client config for peer $peerName (length: $[:len $clientConfig])\"",
            "            } on-error={",
            "                :put \"[ERROR] Failed to export config for peer $peerName\"",
            "                :log error \"WireGuard Export: Config export failed for peer $peerName\"",
            "                :set clientConfig \"\"",
            "            }",
            "        } else={",
            "            :put \"[SKIP] Peer $peerName configuration incomplete - cannot generate client config\"",
            "            :put \"[SKIP] Missing configuration items: $missingItems\"",
            "            :log warning \"WireGuard Export: Skipping peer $peerName due to incomplete configuration - missing: $missingItems\"",
            "        }",
            "        ",
            "        # Create clean filename using peer name (peerName.conf)",
            "        :local fileName ($peerName . \".conf\")",
            "        ",
            "        # Advanced filename sanitization - remove/replace invalid characters",
            "        :while ([:find $fileName \" \"] >= 0) do={",
            "            :local pos [:find $fileName \" \"]",
            "            :set fileName ([:pick $fileName 0 $pos] . \"_\" . [:pick $fileName ($pos + 1) [:len $fileName]])",
            "        }",
            "        # Remove other problematic characters for file names",
            "        :local invalidChars {\"<\"; \">\"; \":\"; \"\\\\\"; \"/\"; \"|\"; \"?\"; \"*\"; \"\\\"\"}",
            "        :foreach char in=$invalidChars do={",
            "            :while ([:find $fileName $char] >= 0) do={",
            "                :local pos [:find $fileName $char]",
            "                :set fileName ([:pick $fileName 0 $pos] . \"_\" . [:pick $fileName ($pos + 1) [:len $fileName]])",
            "            }",
            "        }",
            "        ",
            "        # Verify we have content before creating file",
            "        :if ([:len $clientConfig] = 0) do={",
            "            :put \"[ERROR] No configuration content generated for peer $peerName\"",
            "            :log error \"WireGuard Export: Empty configuration for peer $peerName\"",
            "        } else={",
            "            :put \"[DEBUG] Config content preview: $[:pick $clientConfig 0 100]...\"",
            "            ",
            "            # Create and write file using RouterOS file system",
            "            :do {",
            "                # Use add command to create file with exact name (avoids .txt suffix)",
            "                /file add name=$fileName contents=$clientConfig",
            "                :put \"[OK] Created file using /file add method: $fileName\"",
            "            } on-error={",
            "                # Fallback method if add doesn't work",
            "                :put \"[INFO] Trying fallback file creation method for $fileName\"",
            "                /file print file=$fileName where name=\"\"",
            "                :delay 1s", 
            "                /file set [/file find name=$fileName] contents=$clientConfig",
            "                :put \"[OK] Created file using fallback method: $fileName\"",
            "            }",
            "        }",
            "        ",
            "        :put \"[OK] Saved: $fileName\"",
            "        :log info \"WireGuard Export: Successfully saved configuration file: $fileName\"",
            "        :set configCount ($configCount + 1)",
            "    } on-error={",
            "        :put \"[ERROR] Failed to export peer $peerId\"",
            "        :log error \"WireGuard Export: Failed to export peer $peerId\"",
            "    }",
            "}",
            "",
            "# Step 4: Summary and completion",
            ":put \"\"",
            ":put \"=========================================\"",
            ":put \"WireGuard Export Complete\"",
            ":put \"=========================================\"",
            ":put \"Configurations exported: $configCount\"",
            ":put \"Server endpoint: $endpointAddress\"",
            ":put \"Completed at: $[/system clock get time]\"",
            "",
            ":if ($configCount > 0) do={",
            "    :put \"\"",
            "    :put \"[SUCCESS] Client configurations ready!\"",
            "    :put \"Next steps:\"",
            "    :put \"1. Download .conf files from Files menu\"",
            "    :put \"2. Import into WireGuard clients\"",
            "    :put \"3. Test connectivity\"",
            "    :log info \"WireGuard Export: Successfully exported $configCount client configurations\"",
            "} else={",
            "    :put \"\"",
            "    :put \"[INFO] Troubleshooting empty configuration files:\"",
            "    :put \"\"",
            "    :put \"STEP 1: Check peer configuration completeness:\"",
            "    :put \"   /interface wireguard peers print detail\"",
            "    :put \"   Each peer MUST have:\"",
            "    :put \"   - public-key: Generated WireGuard public key\"",
            "    :put \"   - allowed-address: Client IP (e.g., 192.168.170.2/32)\"",
            "    :put \"\"",
            "    :put \"STEP 2: Check interface private key:\"",
            "    :put \"   /interface wireguard print detail\"",
            "    :put \"   Interface MUST have:\"",
            "    :put \"   - private-key: Generated WireGuard private key\"",
            "    :put \"\"",
            "    :put \"STEP 3: Fix missing configurations:\"",
            "    :put \"   For missing interface private key:\"",
            "    :put \"   /interface wireguard set [find name=wireguard-server] private-key=[/interface wireguard generate-private-key]\"",
            "    :put \"\"",
            "    :put \"   For missing peer public key (generate on client first):\"",
            "    :put \"   /interface wireguard peers set [find name=user1] public-key=\\\"CLIENT_PUBLIC_KEY_HERE\\\"\"",
            "    :put \"\"",
            "    :put \"   For missing peer allowed-address:\"",
            "    :put \"   /interface wireguard peers set [find name=user1] allowed-address=192.168.170.2/32\"",
            "    :put \"\"",
            "    :put \"STEP 4: Test manually after fixes:\"",
            "    :put \"   /interface wireguard peers show-client-config [find name=user1]\"",
            "    :put \"\"",
            "    :put \"STEP 5: Verify interface names:\"",
            "    :put \"   - Server interfaces must contain 'server' or 'Server'\"",
            "    :put \"   - Must NOT contain 'client' or 'Client'\"",
            "    :put \"   - Valid examples: wireguard-server, wg-server1, MyServer\"",
            "    :put \"\"",
            "    :put \"NOTE: The show-client-config command only works when ALL\"",
            "    :put \"      required fields are properly configured. Missing any\"",
            "    :put \"      field results in empty output (length: 0).\"",
            "    :log warning \"WireGuard Export: No configurations were exported - check peer configuration completeness\"",
            "}",
            "",
            ":log info \"WireGuard Export: Process completed - $configCount configurations generated using endpoint $endpointAddress\""
        ]
    };

    // Use OneTimeScript to create the script
    return OneTimeScript({
        ScriptContent: scriptContent,
        name: "Export-WireGuard-Simple",
        startTime: "startup"
    });
};

export const WireguardPeerAddress = (
    interfaceName: string,
    scriptName: string = "WireGuard-Peer-Update",
    startTime: string = "startup"
): RouterConfig => {
    
    const scriptContent: RouterConfig = {
        "": [
            `:delay 100s;`,
            "# Define the WireGuard interface name as a parameter for the script",
            "# To run: /system script run <script_name> wg-interface=<your_wg_interface_name>",
            `:local wgInterfaceName "${interfaceName}";`,
            "",
            ":if ([:len $wgInterfaceName] = 0) do={",
            '    :log error "WireGuard interface name not provided. Use: /system script run <script_name> wg-interface=<your_wg_interface_name>"',
            "} else={",
            '    :log info ("Starting script for WireGuard interface: " . $wgInterfaceName)',
            "",
            "    # Step 1: Check and Enable IP Cloud DDNS",
            "    :local ddnsStatus [/ip cloud get ddns-enabled]",
            '    :if ($ddnsStatus != "yes") do={',
            "        /ip cloud set ddns-enabled=yes",
            '        :log info "IP Cloud DDNS has been enabled."',
            "    } else={",
            '        :log info "IP Cloud DDNS is already enabled."',
            "    }",
            "",
            "    # Step 2: Force IP Cloud Update (and allow time for it)",
            '    :log info "Forcing IP Cloud DDNS update..."',
            "    /ip cloud force-update",
            '    :log info "Waiting 10 seconds for IP Cloud to synchronize..."',
            "    :delay 10s",
            "",
            "    # Step 3: Retrieve and Store the Cloud DNS Name (Global Variable)",
            "    :global globalCloudDnsName",
            "    :set globalCloudDnsName [/ip cloud get dns-name]",
            "",
            "    :if ([:len $globalCloudDnsName] = 0) do={",
            '        :log error ("Failed to retrieve IP Cloud DNS Name. Status: " . [/ip cloud get status] . ". Public IP: " . [/ip cloud get public-address] . ". Ensure IP Cloud is functioning correctly.")',
            "    } else={",
            '        :log info ("Successfully retrieved IP Cloud DNS Name: " . $globalCloudDnsName)',
            "",
            "        # Step 4: Identify Target WireGuard Peers",
            '        :log info ("Searching for WireGuard peers on interface: " . $wgInterfaceName)',
            "        :local peerIds [/interface wireguard peers find interface=$wgInterfaceName]",
            "",
            "        :if ([:len $peerIds] = 0) do={",
            '            :log warning ("No WireGuard peers found for interface: " . $wgInterfaceName . ". No peers to update.")',
            "        } else={",
            '            :log info ("Found " . [:len $peerIds] . " peer(s) on interface: " . $wgInterfaceName . ". Proceeding with update.")',
            "",
            "            # Step 5: Update WireGuard Peer endpoint-address",
            "            :foreach peerId in=$peerIds do={",
            "                # Retrieve current peer details for logging",
            "                :local currentPeerComment [/interface wireguard peers get $peerId comment]",
            "                :local currentPeerPublicKey [/interface wireguard peers get $peerId public-key]",
            "                :local currentEndpointAddress [/interface wireguard peers get $peerId endpoint-address]",
            "",
            '                :log info ("Updating peer ID: " . $peerId . " (Comment: " . $currentPeerComment . ", PK: " . [:pick $currentPeerPublicKey 0 10] . "..., Current Endpoint: " . $currentEndpointAddress . ")")',
            "                ",
            "                /interface wireguard peers set $peerId endpoint-address=$globalCloudDnsName",
            "                ",
            '                :log info ("Peer ID: " . $peerId . " - endpoint-address updated to: " . $globalCloudDnsName)',
            "            }",
            '            :log info ("Finished updating WireGuard peers for interface: " . $wgInterfaceName)',
            "        }",
            "    }",
            '    :log info "Script finished."',
            "}"
        ]
    };

    return OneTimeScript({
        ScriptContent: scriptContent,
        name: scriptName,
        interval: "00:00:00",
        startTime: startTime
    });
};





