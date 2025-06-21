import type { RouterConfig } from "../../ConfigGenerator";
import type {
    WireguardInterfaceConfig,
    OpenVpnServerConfig,
    PptpServerConfig,
    L2tpServerConfig,
    SstpServerConfig,
    Ikev2ServerConfig,
    Credentials,
    VPNServer
} from "../../../StarContext/Utils/VPNServerType";
import {
    WireguardServer,
    OVPNServer,
    PptpServer,
    L2tpServer,
    SstpServer,
    Ikev2Server
} from "./VPNServerInterfaces";
import {
    WireguardServerUsers,
    OVPNServerUsers,
    PptpServerUsers,
    L2tpServerUsers,
    SstpServerUsers,
    Ikev2ServerUsers,
    VPNServerCertificate
} from "./VPNServerUsers";
import { InboundTraffic } from "./VPNServerUtil";
import { mergeRouterConfigs, CommandShortner } from "../../utils/ConfigGeneratorUtil";




export const WireguardServerWrapper = (
    interfaceConfig: WireguardInterfaceConfig,
    users: Credentials[] = []
): RouterConfig => {
    const configs: RouterConfig[] = [];

    // Generate WireGuard interface configuration
    configs.push(WireguardServer(interfaceConfig));

    // Generate WireGuard users configuration if users are provided
    if (users.length > 0) {
        configs.push(WireguardServerUsers(interfaceConfig, users));
    }

    // Merge configurations
    const finalConfig = mergeRouterConfigs(...configs);

    // Add summary comments
    if (!finalConfig[""]) {
        finalConfig[""] = [];
    }

    const wireguardUsers = users.filter(user => user.VPNType.includes('Wireguard'));
    
    finalConfig[""].unshift(
        "# WireGuard Server Configuration Summary:",
        `# Interface: ${interfaceConfig.Name}`,
        `# Listen Port: ${interfaceConfig.ListenPort || 13231}`,
        `# Users: ${wireguardUsers.length}`,
        ""
    );

    return CommandShortner(finalConfig);
};

export const OVPNServerWrapper = (
    serverConfig: OpenVpnServerConfig,
    users: Credentials[] = []
): RouterConfig => {
    const configs: RouterConfig[] = [];

    // Generate OpenVPN interface configuration
    configs.push(OVPNServer(serverConfig));

    // Generate OpenVPN users configuration if users are provided
    if (users.length > 0) {
        configs.push(OVPNServerUsers(users));
    }

    // Merge configurations
    const finalConfig = mergeRouterConfigs(...configs);

    // Add summary comments
    if (!finalConfig[""]) {
        finalConfig[""] = [];
    }

    const ovpnUsers = users.filter(user => user.VPNType.includes('OpenVPN'));
    
    finalConfig[""].unshift(
        "# OpenVPN Server Configuration Summary:",
        `# Server: ${serverConfig.name}`,
        `# Port: ${serverConfig.Port || 1194}`,
        `# Protocol: ${serverConfig.Protocol || 'udp'}`,
        `# Users: ${ovpnUsers.length}`,
        ""
    );

    return CommandShortner(finalConfig);
};

export const PptpServerWrapper = (
    serverConfig: PptpServerConfig,
    users: Credentials[] = []
): RouterConfig => {
    const configs: RouterConfig[] = [];

    // Generate PPTP interface configuration
    configs.push(PptpServer(serverConfig));

    // Generate PPTP users configuration if users are provided
    if (users.length > 0) {
        configs.push(PptpServerUsers(users));
    }

    // Merge configurations
    const finalConfig = mergeRouterConfigs(...configs);

    // Add summary comments
    if (!finalConfig[""]) {
        finalConfig[""] = [];
    }

    const pptpUsers = users.filter(user => user.VPNType.includes('PPTP'));
    
    finalConfig[""].unshift(
        "# PPTP Server Configuration Summary:",
        `# Enabled: ${serverConfig.enabled}`,
        `# Default Profile: ${serverConfig.DefaultProfile || 'pptp-profile'}`,
        `# Users: ${pptpUsers.length}`,
        ""
    );

    return CommandShortner(finalConfig);
};

export const L2tpServerWrapper = (
    serverConfig: L2tpServerConfig,
    users: Credentials[] = []
): RouterConfig => {
    const configs: RouterConfig[] = [];

    // Generate L2TP interface configuration
    configs.push(L2tpServer(serverConfig));

    // Generate L2TP users configuration if users are provided
    if (users.length > 0) {
        configs.push(L2tpServerUsers(users));
    }

    // Merge configurations
    const finalConfig = mergeRouterConfigs(...configs);

    // Add summary comments
    if (!finalConfig[""]) {
        finalConfig[""] = [];
    }

    const l2tpUsers = users.filter(user => user.VPNType.includes('L2TP'));
    
    finalConfig[""].unshift(
        "# L2TP Server Configuration Summary:",
        `# Enabled: ${serverConfig.enabled}`,
        `# IPsec: ${serverConfig.IPsec.UseIpsec}`,
        `# Default Profile: ${serverConfig.DefaultProfile || 'l2tp-profile'}`,
        `# Users: ${l2tpUsers.length}`,
        ""
    );

    return CommandShortner(finalConfig);
};

export const SstpServerWrapper = (
    serverConfig: SstpServerConfig,
    users: Credentials[] = []
): RouterConfig => {
    const configs: RouterConfig[] = [];

    // Generate SSTP interface configuration
    configs.push(SstpServer(serverConfig));

    // Generate SSTP users configuration if users are provided
    if (users.length > 0) {
        configs.push(SstpServerUsers(users));
    }

    // Merge configurations
    const finalConfig = mergeRouterConfigs(...configs);

    // Add summary comments
    if (!finalConfig[""]) {
        finalConfig[""] = [];
    }

    const sstpUsers = users.filter(user => user.VPNType.includes('SSTP'));
    
    finalConfig[""].unshift(
        "# SSTP Server Configuration Summary:",
        `# Enabled: ${serverConfig.enabled}`,
        `# Certificate: ${serverConfig.Certificate}`,
        `# Port: ${serverConfig.Port || 443}`,
        `# Default Profile: ${serverConfig.DefaultProfile || 'sstp-profile'}`,
        `# Users: ${sstpUsers.length}`,
        ""
    );

    return CommandShortner(finalConfig);
};

export const Ikev2ServerWrapper = (
    serverConfig: Ikev2ServerConfig,
    users: Credentials[] = []
): RouterConfig => {
    const configs: RouterConfig[] = [];

    // Generate IKEv2 interface configuration
    configs.push(Ikev2Server(serverConfig));

    // Generate IKEv2 users configuration if users are provided
    if (users.length > 0) {
        configs.push(Ikev2ServerUsers(users));
    }

    // Merge configurations
    const finalConfig = mergeRouterConfigs(...configs);

    // Add summary comments
    if (!finalConfig[""]) {
        finalConfig[""] = [];
    }

    const ikev2Users = users.filter(user => user.VPNType.includes('IKeV2'));
    
    finalConfig[""].unshift(
        "# IKEv2 Server Configuration Summary:",
        `# Profile: ${serverConfig.profile.name}`,
        `# Proposal: ${serverConfig.proposal.name}`,
        `# Peer: ${serverConfig.peer.name}`,
        `# Auth Method: ${serverConfig.identities.authMethod}`,
        `# Users: ${ikev2Users.length}`,
        ""
    );

    return CommandShortner(finalConfig);
};

export const VPNServerWrapper = (
    vpnServer: VPNServer
): RouterConfig => {
    const configs: RouterConfig[] = [];
    
    // Check if VPN Server exists
    if (!vpnServer) {
        return {
            "": ["# No VPN Server configuration provided"]
        };
    }

    const { Users } = vpnServer;
    if (!Users || Users.length === 0) {
        return {
            "": ["# No VPN users configured"]
        };
    }

    // Helper function to add configuration if it exists
    const addConfig = (config: RouterConfig) => {
        if (config && Object.keys(config).length > 0) {
            configs.push(config);
        }
    };

    // Add VPN Server Certificate configuration first (required for certificate-based VPNs)
    console.log('Generating VPN Server Certificate configuration');
    addConfig(VPNServerCertificate(vpnServer));

    // Add Inbound Traffic Marking rules for VPN server protocols
    console.log('Generating VPN Inbound Traffic Marking rules');
    addConfig(InboundTraffic(vpnServer));

    // Generate WireGuard Server configurations
    if (vpnServer.WireguardServers && vpnServer.WireguardServers.length > 0) {
        console.log('Generating WireGuard server configurations');
        vpnServer.WireguardServers.forEach(wireguardConfig => {
            if (wireguardConfig.Interface) {
                addConfig(WireguardServerWrapper(wireguardConfig.Interface, Users));
            }
        });
    }

    // Generate OpenVPN Server configuration
    if (vpnServer.OpenVpnServer) {
        console.log('Generating OpenVPN server configuration');
        addConfig(OVPNServerWrapper(vpnServer.OpenVpnServer, Users));
    }

    // Generate PPTP Server configuration
    if (vpnServer.PptpServer) {
        console.log('Generating PPTP server configuration');
        addConfig(PptpServerWrapper(vpnServer.PptpServer, Users));
    }

    // Generate L2TP Server configuration
    if (vpnServer.L2tpServer) {
        console.log('Generating L2TP server configuration');
        addConfig(L2tpServerWrapper(vpnServer.L2tpServer, Users));
    }

    // Generate SSTP Server configuration
    if (vpnServer.SstpServer) {
        console.log('Generating SSTP server configuration');
        addConfig(SstpServerWrapper(vpnServer.SstpServer, Users));
    }

    // Generate IKEv2 Server configuration
    if (vpnServer.Ikev2Server) {
        console.log('Generating IKEv2 server configuration');
        addConfig(Ikev2ServerWrapper(vpnServer.Ikev2Server, Users));
    }

    // If no VPN protocols are configured, return empty config with message
    if (configs.length === 0) {
        return {
            "": [
                "# No VPN server protocols are configured",
                "# Available protocols: WireGuard, OpenVPN, PPTP, L2TP, SSTP, IKEv2"
            ]
        };
    }

    // Merge all configurations
    const finalConfig = mergeRouterConfigs(...configs);

    // Add comprehensive summary comments
    if (!finalConfig[""]) {
        finalConfig[""] = [];
    }

    // Determine which protocols are configured
    const configuredProtocols: string[] = [];
    const protocolStats: { [key: string]: number } = {};
    
    if (vpnServer.WireguardServers && vpnServer.WireguardServers.length > 0) {
        configuredProtocols.push('WireGuard');
        const wireguardUsers = Users.filter(user => user.VPNType.includes('Wireguard'));
        protocolStats['WireGuard'] = wireguardUsers.length;
    }
    
    if (vpnServer.OpenVpnServer) {
        configuredProtocols.push('OpenVPN');
        const ovpnUsers = Users.filter(user => user.VPNType.includes('OpenVPN'));
        protocolStats['OpenVPN'] = ovpnUsers.length;
    }
    
    if (vpnServer.PptpServer) {
        configuredProtocols.push('PPTP');
        const pptpUsers = Users.filter(user => user.VPNType.includes('PPTP'));
        protocolStats['PPTP'] = pptpUsers.length;
    }
    
    if (vpnServer.L2tpServer) {
        configuredProtocols.push('L2TP');
        const l2tpUsers = Users.filter(user => user.VPNType.includes('L2TP'));
        protocolStats['L2TP'] = l2tpUsers.length;
    }
    
    if (vpnServer.SstpServer) {
        configuredProtocols.push('SSTP');
        const sstpUsers = Users.filter(user => user.VPNType.includes('SSTP'));
        protocolStats['SSTP'] = sstpUsers.length;
    }
    
    if (vpnServer.Ikev2Server) {
        configuredProtocols.push('IKEv2');
        const ikev2Users = Users.filter(user => user.VPNType.includes('IKeV2'));
        protocolStats['IKEv2'] = ikev2Users.length;
    }

    // Add comprehensive header
    finalConfig[""].unshift(
        "# ===============================================",
        "# VPN Server Complete Configuration",
        "# ===============================================",
        `# Total VPN Users: ${Users.length}`,
        `# Configured Protocols: ${configuredProtocols.join(', ')}`,
        `# Generated Configurations: ${configs.length}`,
        "",
        "# Protocol Statistics:",
        ...Object.entries(protocolStats).map(([protocol, count]) => 
            `#   ${protocol}: ${count} users`
        ),
        "",
        "# Configuration Includes:",
        "# 1. Certificate management (Let's Encrypt + Private certificates)",
        "# 2. VPN server interface configurations",
        "# 3. User authentication and management",
        "# 4. Firewall rules and network segmentation",
        "# 5. Address pools and routing configurations",
        "",
        "# Network Assignments:",
        configuredProtocols.includes('WireGuard') ? "#   WireGuard: 192.168.170.0/24" : "",
        configuredProtocols.includes('OpenVPN') ? "#   OpenVPN: 192.168.60.0/24" : "",
        configuredProtocols.includes('PPTP') ? "#   PPTP: 192.168.70.0/24" : "",
        configuredProtocols.includes('L2TP') ? "#   L2TP: 192.168.80.0/24" : "",
        configuredProtocols.includes('SSTP') ? "#   SSTP: 192.168.90.0/24" : "",
        configuredProtocols.includes('IKEv2') ? "#   IKEv2: 192.168.77.0/24" : "",
        "",
        "# ===============================================",
        ""
    );

    // Filter out empty comment lines
    finalConfig[""] = finalConfig[""].filter(line => line !== "");

    // Add final summary at the end
    if (!finalConfig["# Summary"]) {
        finalConfig["# Summary"] = [];
    }

    finalConfig["# Summary"].push(
        "",
        "# VPN Server Configuration Summary:",
        `# Successfully configured ${configuredProtocols.length} VPN protocol(s)`,
        `# Total user accounts: ${Users.length}`,
        `# Certificate management: Enabled (Let's Encrypt + Private fallback)`,
        `# Network segmentation: Enabled with dedicated subnets`,
        `# Firewall rules: Applied for secure access`,
        `# User authentication: Configured per protocol requirements`,
        "",
        "# Next Steps:",
        "# 1. Review and apply configuration to router",
        "# 2. Verify certificate generation and assignment",
        "# 3. Test VPN connections with configured users",
        "# 4. Monitor firewall logs for connection attempts",
        ""
    );

    return CommandShortner(finalConfig);
};




















