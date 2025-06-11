import type { RouterConfig } from "../../ConfigGenerator";
import type {
    Credentials,
    WireguardInterfaceConfig,
    VPNServer
} from "../../../StarContext/Utils/VPNServerType"
import { 
    CheckCGNAT,
    LetsEncrypt,
    PrivateCert,
    ExportCert,
} from "../../utils/Certificate";
import { OneTimeScript } from "../../utils/ScriptSchedule";
import { CommandShortner, mergeRouterConfigs } from "../../utils/ConfigGeneratorUtil";



// VPN Server Utils

export const VPNServerCertificate = (vpnServer: VPNServer): RouterConfig => {
    const configs: RouterConfig[] = [];
    
    // Check if any certificate-requiring VPN servers are configured
    const requiresCertificates = !!(
        vpnServer.SstpServer ||
        vpnServer.OpenVpnServer ||
        vpnServer.Ikev2Server
    );
    
    if (!requiresCertificates) {
        return {
            "": ["# No VPN servers requiring certificates are configured"]
        };
    }
    
    // Add certificate-related configurations
    
    // 1. Check CGNAT configuration (important for Let's Encrypt)
    configs.push(CheckCGNAT());
    
    // 2. Generate Let's Encrypt certificate configuration
    configs.push(LetsEncrypt());
    
    // 3. Generate private certificate configuration as fallback
    configs.push(PrivateCert());
    
    // 4. Export certificates for client use
    configs.push(ExportCert("admin"));
    
    // Merge all certificate configurations
    const finalConfig: RouterConfig = {};
    
    configs.forEach(config => {
        Object.keys(config).forEach(section => {
            if (!finalConfig[section]) {
                finalConfig[section] = [];
            }
            finalConfig[section].push(...config[section]);
        });
    });
    
    // Add informational comments about which VPN servers require certificates
    if (!finalConfig[""]) {
        finalConfig[""] = [];
    }
    
    finalConfig[""].unshift(
        "# Certificate configuration for VPN servers:",
        vpnServer.SstpServer ? "# - SSTP Server requires certificates" : "",
        vpnServer.OpenVpnServer ? "# - OpenVPN Server requires certificates" : "", 
        vpnServer.Ikev2Server ? "# - IKEv2 Server requires certificates" : "",
        "# Certificate configurations include: CGNAT check, Let's Encrypt, Private certificates, and Export certificates"
    );
    
    // Remove empty comment lines
    finalConfig[""] = finalConfig[""].filter(line => line !== "");
    
    return finalConfig;
};

export const WireguardPeerAddress = (
    interfaceName: string,
    scriptName: string = "WireGuard-Peer-Update",
    startTime: string = "startup"
): RouterConfig => {
    
    const scriptContent: RouterConfig = {
        "": [
            "# Define the WireGuard interface name as a parameter for the script",
            "# To run: /system script run <script_name> wg-interface=<your_wg_interface_name>",
            `:local wgInterfaceName "${interfaceName}";`,
            "",
            ":if ([:len $wgInterfaceName] = 0) do={",
            '    :log error "WireGuard interface name not provided. Use: /system script run <script_name> wg-interface=<your_wg_interface_name>";',
            "} else {",
            '    :log info "Starting script for WireGuard interface: $wgInterfaceName";',
            "",
            "    # Step 1: Check and Enable IP Cloud DDNS",
            "    :local ddnsStatus [/ip cloud get ddns-enabled];",
            '    if ($ddnsStatus != "yes") do={',
            "        /ip cloud set ddns-enabled=yes;",
            '        :log info "IP Cloud DDNS has been enabled.";',
            "    } else {",
            '        :log info "IP Cloud DDNS is already enabled.";',
            "    }",
            "",
            "    # Step 2: Force IP Cloud Update (and allow time for it)",
            '    :log info "Forcing IP Cloud DDNS update...";',
            "    /ip cloud force-update;",
            '    :log info "Waiting 10 seconds for IP Cloud to synchronize...";',
            "    :delay 10s; # Allow time for the update to process and dns-name to be available",
            "",
            "    # Step 3: Retrieve and Store the Cloud DNS Name (Global Variable)",
            "    :global globalCloudDnsName;",
            "    :set globalCloudDnsName [/ip cloud get dns-name];",
            "",
            "    :if ([:len $globalCloudDnsName] = 0) do={",
            '        :log error "Failed to retrieve IP Cloud DNS Name. Status: [/ip cloud get status]. Public IP: [/ip cloud get public-address]. Ensure IP Cloud is functioning correctly.";',
            "    } else {",
            '        :log info "Successfully retrieved IP Cloud DNS Name: $globalCloudDnsName";',
            "",
            "        # Step 4: Identify Target WireGuard Peers",
            '        :log info "Searching for WireGuard peers on interface \'$wgInterfaceName\'...";',
            "        :local peerIds [/interface wireguard peers find interface=$wgInterfaceName];",
            "",
            "        :if ([:len $peerIds] = 0) do={",
            '            :log warning "No WireGuard peers found for interface \'$wgInterfaceName\'. No peers to update.";',
            "        } else {",
            '            :log info "Found [:len $peerIds] peer(s) on interface \'$wgInterfaceName\'. Proceeding with update.";',
            "",
            "            # Step 5: Update WireGuard Peer endpoint-address",
            "            :foreach peerId in=$peerIds do={",
            "                # Retrieve current peer details for logging",
            "                :local currentPeerComment [/interface wireguard peers get $peerId comment];",
            "                :local currentPeerPublicKey [/interface wireguard peers get $peerId public-key];",
            "                :local currentEndpointAddress [/interface wireguard peers get $peerId endpoint-address];",
            "",
            '                :log info "Updating peer ID: $peerId (Comment: \'$currentPeerComment\', PK: $[:pick $currentPeerPublicKey 0 10]..., Current Endpoint: \'$currentEndpointAddress\')";',
            "                ",
            "                /interface wireguard peers set $peerId endpoint-address=$globalCloudDnsName;",
            "                ",
            '                :log info "Peer ID: $peerId - endpoint-address updated to \'$globalCloudDnsName\'.";',
            "            }",
            '            :log info "Finished updating WireGuard peers for interface \'$wgInterfaceName\'.";',
            "        }",
            "    }",
            '    :log info "Script finished.";',
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

export const VPNServerBinding = (credentials: Credentials[]): RouterConfig => {
    const config: RouterConfig = {
        "/interface l2tp-server": [],
        "/interface pptp-server": [],
        "/interface sstp-server": [],
        "/interface ovpn-server": [],
        "": []
    };

    if (!credentials || credentials.length === 0) {
        config[""].push("# No credentials provided for VPN server binding");
        return config;
    }

    // Filter users for supported VPN types only
    const supportedVpnTypes = ['L2TP', 'PPTP', 'SSTP', 'OpenVPN'];
    const filteredCredentials = credentials.filter(user => 
        user.VPNType.some(vpnType => supportedVpnTypes.includes(vpnType))
    );

    if (filteredCredentials.length === 0) {
        config[""].push("# No users configured for supported VPN binding types (L2TP, PPTP, SSTP, OpenVPN)");
        return config;
    }

    // Group users by VPN type
    const usersByVpnType: { [key: string]: Credentials[] } = {};
    
    filteredCredentials.forEach(user => {
        user.VPNType.forEach((vpnType: string) => {
            if (supportedVpnTypes.includes(vpnType)) {
                if (!usersByVpnType[vpnType]) {
                    usersByVpnType[vpnType] = [];
                }
                usersByVpnType[vpnType].push(user);
            }
        });
    });

    // Add general comments
    config[""].push(
        "# VPN Server Binding Configuration",
        `# Total users: ${filteredCredentials.length}`,
        `# Supported VPN types: ${Object.keys(usersByVpnType).join(', ')}`,
        ""
    );

    // L2TP Static Interface Bindings
    if (usersByVpnType['L2TP']) {
        config[""].push("# L2TP Static Interface Bindings");
        config[""].push("# Creates static interface for each L2TP user for advanced firewall/queue rules");
        
        usersByVpnType['L2TP'].forEach(user => {
            const staticBindingName = `l2tp-${user.Username}`;
            
            config["/interface l2tp-server"].push(
                `add name="${staticBindingName}" user="${user.Username}" comment="Static binding for ${user.Username}"`
            );
        });
        config[""].push("");
    }

    // PPTP Static Interface Bindings
    if (usersByVpnType['PPTP']) {
        config[""].push("# PPTP Static Interface Bindings");
        config[""].push("# Creates static interface for each PPTP user for advanced firewall/queue rules");
        
        usersByVpnType['PPTP'].forEach(user => {
            const staticBindingName = `pptp-${user.Username}`;
            
            config["/interface pptp-server"].push(
                `add name="${staticBindingName}" user="${user.Username}" comment="Static binding for ${user.Username}"`
            );
        });
        config[""].push("");
    }

    // SSTP Static Interface Bindings
    if (usersByVpnType['SSTP']) {
        config[""].push("# SSTP Static Interface Bindings");
        config[""].push("# Creates static interface for each SSTP user for advanced firewall/queue rules");
        
        usersByVpnType['SSTP'].forEach(user => {
            const staticBindingName = `sstp-${user.Username}`;
            
            config["/interface sstp-server"].push(
                `add name="${staticBindingName}" user="${user.Username}" comment="Static binding for ${user.Username}"`
            );
        });
        config[""].push("");
    }

    // OpenVPN Static Interface Bindings
    if (usersByVpnType['OpenVPN']) {
        config[""].push("# OpenVPN Static Interface Bindings");
        config[""].push("# Creates static interface for each OpenVPN user for advanced firewall/queue rules");
        
        usersByVpnType['OpenVPN'].forEach(user => {
            const staticBindingName = `ovpn-${user.Username}`;
            
            config["/interface ovpn-server"].push(
                `add name="${staticBindingName}" user="${user.Username}" comment="Static binding for ${user.Username}"`
            );
        });
        config[""].push("");
    }

    // Advanced Binding Information
    config[""].push("# Static Interface Binding Benefits:");
    config[""].push("# 1. Predictable interface names for firewall rules");
    config[""].push("# 2. Per-user queue management capabilities");
    config[""].push("# 3. Individual user traffic monitoring");
    config[""].push("# 4. User-specific interface list assignments");
    config[""].push("");
    config[""].push("# Note: Users must still be configured in /ppp secret for authentication");
    config[""].push("");

    // Summary
    config[""].push("# VPN Server Binding Summary:");
    Object.entries(usersByVpnType).forEach(([vpnType, users]) => {
        config[""].push(`# ${vpnType}: ${users.length} users - ${users.map(u => u.Username).join(', ')}`);
    });

    return config;
};



// Wireguard Server Users

export const WireguardServerUsers = (
    serverConfig: WireguardInterfaceConfig, 
    users: Credentials[]
): RouterConfig => {
    const config: RouterConfig = {
        "/interface wireguard peers": []
    };

    if (!serverConfig.InterfaceAddress) {
        config["/interface wireguard peers"].push(
            "# Error: Server interface address is required to generate client peers"
        );
        return config;
    }

    // Extract network info from server address
    const [serverIP, prefixStr] = serverConfig.InterfaceAddress.split('/');
    const prefix = parseInt(prefixStr || '24');
    console.log(prefix);
    const baseNetwork = serverIP.split('.').slice(0, 3).join('.');

    // Filter users who have Wireguard in their VPNType array
    const wireguardUsers = users.filter(user => 
        user.VPNType.includes('Wireguard')
    );

    wireguardUsers.forEach((user, index) => {
        const clientIP = `${baseNetwork}.${index + 2}`;
        const clientAddress = `${clientIP}/32`;
        
        const peerParams: string[] = [
            `interface=${serverConfig.Name}`,
            `name="${user.Username}"`,
            `allowed-address=0.0.0.0/0`,
            `client-address=${clientAddress}`,
            `client-dns=${serverIP}`,
            `client-endpoint=""`,
            `client-keepalive=25s`,
            `client-listen-port=${serverConfig.ListenPort || 13231}`,
            `persistent-keepalive=25s`,
            `preshared-key=auto`,
            `private-key=auto`,
            `responder=yes`
        ];

        config["/interface wireguard peers"].push(
            `add ${peerParams.join(' ')}`
        );
    });

    if (wireguardUsers.length === 0) {
        config["/interface wireguard peers"].push(
            "# No users configured for WireGuard VPN"
        );
        return CommandShortner(config);
    }

    // Generate WireGuard peer address update script
    const peerAddressScript = WireguardPeerAddress(
        serverConfig.Name,
        `WG-Peer-Update-${serverConfig.Name}`,
        "startup"
    );

    // Merge the peer configuration with the address update script
    const finalConfig = mergeRouterConfigs(config, peerAddressScript);

    return CommandShortner(finalConfig);
};

// OpenVPN Server Users

export const OVPNServerUsers = (users: Credentials[]): RouterConfig => {
    const config: RouterConfig = {
        "/ppp secret": []
    };

    // Filter users who have OpenVPN in their VPNType array
    const ovpnUsers = users.filter(user => 
        user.VPNType.includes('OpenVPN')
    );

    ovpnUsers.forEach(user => {
        const secretParams: string[] = [
            `name="${user.Username}"`,
            `password="${user.Password}"`,
            'profile=ovpn-profile',
            'service=ovpn'
        ];

        config["/ppp secret"].push(
            `add ${secretParams.join(' ')}`
        );
    });

    if (ovpnUsers.length === 0) {
        config["/ppp secret"].push(
            "# No users configured for OpenVPN"
        );
    }

    return CommandShortner(config);
};

// PPTP Server Users

export const PptpServerUsers = (users: Credentials[]): RouterConfig => {
    const config: RouterConfig = {
        "/ppp secret": []
    };

    // Filter users who have PPTP in their VPNType array
    const pptpUsers = users.filter(user => 
        user.VPNType.includes('PPTP')
    );

    pptpUsers.forEach(user => {
        const secretParams: string[] = [
            `name="${user.Username}"`,
            `password="${user.Password}"`,
            'profile=pptp-profile',
            'service=pptp'
        ];

        config["/ppp secret"].push(
            `add ${secretParams.join(' ')}`
        );
    });

    if (pptpUsers.length === 0) {
        config["/ppp secret"].push(
            "# No users configured for PPTP"
        );
    }

    return CommandShortner(config);
};

// L2TP Server Users

export const L2tpServerUsers = (users: Credentials[]): RouterConfig => {
    const config: RouterConfig = {
        "/ppp secret": []
    };

    // Filter users who have L2TP in their VPNType array
    const l2tpUsers = users.filter(user => 
        user.VPNType.includes('L2TP')
    );

    l2tpUsers.forEach(user => {
        const secretParams: string[] = [
            `name="${user.Username}"`,
            `password="${user.Password}"`,
            'profile=l2tp-profile',
            'service=l2tp'
        ];

        config["/ppp secret"].push(
            `add ${secretParams.join(' ')}`
        );
    });

    if (l2tpUsers.length === 0) {
        config["/ppp secret"].push(
            "# No users configured for L2TP"
        );
    }

    return CommandShortner(config);
};

// SSTP Server Users

export const SstpServerUsers = (users: Credentials[]): RouterConfig => {
    const config: RouterConfig = {
        "/ppp secret": []
    };

    // Filter users who have SSTP in their VPNType array
    const sstpUsers = users.filter(user => 
        user.VPNType.includes('SSTP')
    );

    sstpUsers.forEach(user => {
        const secretParams: string[] = [
            `name="${user.Username}"`,
            `password="${user.Password}"`,
            'profile=sstp-profile',
            'service=sstp'
        ];

        config["/ppp secret"].push(
            `add ${secretParams.join(' ')}`
        );
    });

    if (sstpUsers.length === 0) {
        config["/ppp secret"].push(
            "# No users configured for SSTP"
        );
    }

    return CommandShortner(config);
};

// IKEv2 Server Users

export const Ikev2ServerUsers = (users: Credentials[]): RouterConfig => {
    const config: RouterConfig = {
        "": ["# IKEv2 users are managed through IPsec identities and mode-config"]
    };

    // Filter users who have IKeV2 in their VPNType array
    const ikev2Users = users.filter(user => 
        user.VPNType.includes('IKeV2')
    );

    if (ikev2Users.length === 0) {
        config[""].push("# No users configured for IKEv2");
    } else {
        config[""].push(`# ${ikev2Users.length} users configured for IKEv2: ${ikev2Users.map(u => u.Username).join(', ')}`);
    }

    return CommandShortner(config);
};


// VPN Server Users Wrapper

export const VPNServerUsersWrapper = (
    credentials: Credentials[], 
    vpnServer: VPNServer
): RouterConfig => {
    const configs: RouterConfig[] = [];

    // Helper function to add configuration if it exists
    const addConfig = (routerConfig: RouterConfig) => {
        if (routerConfig && Object.keys(routerConfig).length > 0) {
            configs.push(routerConfig);
        }
    };

    // Always include VPN Server Certificate configuration
    console.log('Generating VPN Server Certificate configuration');
    addConfig(VPNServerCertificate(vpnServer));

    // Always include VPN Server Binding configuration
    console.log('Generating VPN Server Binding configuration');
    addConfig(VPNServerBinding(credentials));

    // Check which VPN types are used by the users
    const usedVpnTypes = [...new Set(credentials.flatMap(user => user.VPNType))];

    if (usedVpnTypes.length === 0) {
        return {
            "": [
                "# No VPN types found in user credentials",
                "# VPN Server Certificate and Binding configurations included above"
            ]
        };
    }

    // Generate user configurations for each used VPN protocol
    if (usedVpnTypes.includes('Wireguard') && vpnServer.WireguardServers && vpnServer.WireguardServers.length > 0) {
        console.log('Generating WireGuard users configuration');
        vpnServer.WireguardServers.forEach(wireguardConfig => {
            if (wireguardConfig.Interface) {
                addConfig(WireguardServerUsers(wireguardConfig.Interface, credentials));
            }
        });
    }

    if (usedVpnTypes.includes('OpenVPN')) {
        console.log('Generating OpenVPN users configuration');
        addConfig(OVPNServerUsers(credentials));
    }

    if (usedVpnTypes.includes('PPTP')) {
        console.log('Generating PPTP users configuration');
        addConfig(PptpServerUsers(credentials));
    }

    if (usedVpnTypes.includes('L2TP')) {
        console.log('Generating L2TP users configuration');
        addConfig(L2tpServerUsers(credentials));
    }

    if (usedVpnTypes.includes('SSTP')) {
        console.log('Generating SSTP users configuration');
        addConfig(SstpServerUsers(credentials));
    }

    if (usedVpnTypes.includes('IKeV2')) {
        console.log('Generating IKEv2 users configuration');
        addConfig(Ikev2ServerUsers(credentials));
    }

    // If no valid configurations were generated, return minimal config
    if (configs.length === 0) {
        return {
            "": [
                "# No VPN server configurations generated",
                `# Users configured for: ${usedVpnTypes.join(', ')}`,
                "# Check VPN server interface configurations"
            ]
        };
    }

    // Merge all configurations
    const finalConfig = mergeRouterConfigs(...configs);

    // Add summary comments
    if (!finalConfig[""]) {
        finalConfig[""] = [];
    }

    finalConfig[""].unshift(
        "# VPN Server Users Configuration Summary:",
        `# Total users: ${credentials.length}`,
        `# Used VPN types: ${usedVpnTypes.join(', ')}`,
        `# Generated configurations: ${configs.length}`,
        ""
    );

    // Add user breakdown by VPN type
    usedVpnTypes.forEach(vpnType => {
        const userCount = credentials.filter(user => user.VPNType.includes(vpnType)).length;
        const usernames = credentials
            .filter(user => user.VPNType.includes(vpnType))
            .map(user => user.Username)
            .join(', ');
        finalConfig[""].push(`# ${vpnType}: ${userCount} users (${usernames})`);
    });

    finalConfig[""].push("");

    return CommandShortner(finalConfig);
};





















