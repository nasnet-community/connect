import type { RouterConfig } from "../../ConfigGenerator";
import type {
    PptpServerConfig,
    L2tpServerConfig,
    SstpServerConfig,
    OpenVpnServerConfig,
    Ikev2ServerConfig,
    WireguardInterfaceConfig,
    // WireguardServerConfig,
    VPNServer
} from "../../../StarContext/Utils/VPNServerType"
import {
    formatBooleanValue,
    formatArrayValue,
    generateVPNFirewallRules,
    generateIPPool,
    type VPNFirewallRule,
    type IPPoolConfig
} from "./VPNServerUtil";
import { calculateNetworkAddress } from "../../utils/IPAddress";
import { CommandShortner, mergeRouterConfigs } from "../../utils/ConfigGeneratorUtil";

// Wireguard Server

export const WireguardServer = (WireguardInterfaceConfig: WireguardInterfaceConfig): RouterConfig => {
    const config: RouterConfig = {
        "/interface wireguard": [],
        "/ip address": [],
        "/interface list member": [],
        "/ip firewall address-list": [],
        "/ip firewall filter": [],
    };

    const {
        Name,
        PrivateKey,
        InterfaceAddress,
        ListenPort = 13231,
        Mtu = 1420,
    } = WireguardInterfaceConfig;

    // Create Wireguard interface
    const interfaceParams: string[] = [
        `name=${Name}`,
        `listen-port=${ListenPort}`,
        `mtu=${Mtu}`,
    ];

    if (PrivateKey) {
        interfaceParams.push(`private-key="${PrivateKey}"`);
    }

    config["/interface wireguard"].push(
        `add ${interfaceParams.join(' ')}`
    );

    // Add IP address to interface
    if (InterfaceAddress) {
        const [ip, prefix] = InterfaceAddress.split('/');
        const network = prefix ? calculateNetworkAddress(ip, prefix) : null;
        let addressCommand = `add address=${InterfaceAddress} interface=${Name}`;
        if (network) {
            addressCommand += ` network=${network}`;
        }
        config["/ip address"].push(addressCommand);
    }

    // Add interface list members
    config["/interface list member"].push(
        `add interface="${Name}" list="LAN"`,
        `add interface="${Name}" list="VPN-LAN"`
    );

    // Add address list for VPN network
    if (InterfaceAddress) {
        config["/ip firewall address-list"].push(
            `add address="${InterfaceAddress}" list="VPN-Local"`
        );
    }

    // Add firewall filter rule for WireGuard handshake
    config["/ip firewall filter"].push(
        `add action=accept chain=input comment="WireGuard Handshake" dst-port=${ListenPort} in-interface-list=DOM-WAN protocol=udp`
    );

    // Add comment about getting public key
    config["/interface wireguard"].push(
        `# To get the server's public key (needed for clients):`,
        `# /interface wireguard print detail where name=${Name}`
    );

    return CommandShortner(config);
};

// OpenVPN Server

export const OVPNServer = (config: OpenVpnServerConfig): RouterConfig => {
    const routerConfig: RouterConfig = {
        "/ip pool": [],
        "/ppp profile": [],
        "/interface ovpn-server server": [],
        "/ip firewall filter": [],
        "/ip firewall address-list": []
    };

    const {
        name,
        enabled = true,
        Port = 1194,
        Protocol = 'udp',
        Mode = 'ip',
        Certificate,
        Encryption,
        // IPV6,
        Address,
        DefaultProfile = 'ovpn-profile',
        KeepaliveTimeout = 60,
        RedirectGetway = 'disabled',
        PushRoutes
    } = config;

    // Create IP pool for OpenVPN clients
    if (Address?.AddressPool) {
        routerConfig["/ip pool"].push(
            `add name=${Address.AddressPool} ranges=192.168.60.5-192.168.60.250`
        );
    }

    // Create PPP profile
    const profileParams: string[] = [
        `name=${DefaultProfile}`,
        'dns-server=1.1.1.1',
        'local-address=192.168.60.1',
        `remote-address=${Address?.AddressPool || 'ovpn-pool'}`,
        'use-encryption=yes'
    ];

    routerConfig["/ppp profile"].push(
        `add ${profileParams.join(' ')}`
    );

    // Create OpenVPN server instance
    const serverParams: string[] = [
        `name=${name}`,
        `certificate=${Certificate.Certificate}`,
        `default-profile=${DefaultProfile}`,
        `disabled=${formatBooleanValue(!enabled)}`,
        `port=${Port}`,
        `protocol=${Protocol}`,
        `mode=${Mode}`
    ];

    if (Certificate.RequireClientCertificate !== undefined) {
        serverParams.push(`require-client-certificate=${formatBooleanValue(Certificate.RequireClientCertificate)}`);
    }

    if (Encryption?.Auth) {
        serverParams.push(`auth=${formatArrayValue(Encryption.Auth)}`);
    }

    if (Encryption?.Cipher) {
        serverParams.push(`cipher=${formatArrayValue(Encryption.Cipher)}`);
    }

    if (Encryption?.UserAuthMethod) {
        serverParams.push(`user-auth-method=${Encryption.UserAuthMethod}`);
    }

    if (RedirectGetway !== 'disabled') {
        serverParams.push(`redirect-gateway=${RedirectGetway}`);
    }

    if (PushRoutes) {
        serverParams.push(`push-routes="${PushRoutes}"`);
    }

    if (KeepaliveTimeout) {
        serverParams.push(`keepalive-timeout=${KeepaliveTimeout}`);
    }

    if (Address?.MaxMtu) {
        serverParams.push(`max-mtu=${Address.MaxMtu}`);
    }

    routerConfig["/interface ovpn-server server"].push(
        `add ${serverParams.join(' ')}`
    );

    // Add firewall rules
    routerConfig["/ip firewall filter"].push(
        `add action=accept chain=input comment="OpenVPN Server ${Protocol}" dst-port=${Port} in-interface-list=DOM-WAN protocol=${Protocol}`
    );

    // Add address list
    routerConfig["/ip firewall address-list"].push(
        'add address=192.168.60.0/24 list=VPN-Local'
    );

    return CommandShortner(routerConfig);
};

// PPTP Server

export const PptpServer = (config: PptpServerConfig): RouterConfig => {
    const routerConfig: RouterConfig = {
        "/interface pptp-server server": []
    };

    const {
        enabled,
        Authentication,
        DefaultProfile = 'pptp-profile',
        KeepaliveTimeout = 30,
        PacketSize
    } = config;

    const serverParams: string[] = [
        `enabled=${formatBooleanValue(enabled)}`
    ];

    if (Authentication) {
        serverParams.push(`authentication=${formatArrayValue(Authentication)}`);
    }

    if (DefaultProfile) {
        serverParams.push(`default-profile=${DefaultProfile}`);
    }

    if (KeepaliveTimeout) {
        serverParams.push(`keepalive-timeout=${KeepaliveTimeout}`);
    }

    if (PacketSize?.MaxMtu) {
        serverParams.push(`max-mtu=${PacketSize.MaxMtu}`);
    }

    if (PacketSize?.MaxMru) {
        serverParams.push(`max-mru=${PacketSize.MaxMru}`);
    }

    if (PacketSize?.mrru && PacketSize.mrru !== 'disabled') {
        serverParams.push(`mrru=${PacketSize.mrru}`);
    }

    routerConfig["/interface pptp-server server"].push(
        `set ${serverParams.join(' ')}`
    );

    return CommandShortner(routerConfig);
};

// L2TP Server

export const L2tpServer = (config: L2tpServerConfig): RouterConfig => {
    const routerConfig: RouterConfig = {
        "/interface l2tp-server server": []
    };

    const {
        enabled,
        IPsec,
        Authentication,
        DefaultProfile = 'l2tp-profile',
        KeepaliveTimeout = 30,
        PacketSize,
        allowFastPath,
        maxSessions,
        OneSessionPerHost,
        acceptProtoVersion,
        callerIdType,
        L2TPV3
    } = config;

    const serverParams: string[] = [
        `enabled=${formatBooleanValue(enabled)}`
    ];

    if (IPsec.UseIpsec !== undefined) {
        serverParams.push(`use-ipsec=${IPsec.UseIpsec}`);
    }

    if (IPsec.IpsecSecret) {
        serverParams.push(`ipsec-secret="${IPsec.IpsecSecret}"`);
    }

    if (Authentication) {
        serverParams.push(`authentication=${formatArrayValue(Authentication)}`);
    }

    if (DefaultProfile) {
        serverParams.push(`default-profile=${DefaultProfile}`);
    }

    if (KeepaliveTimeout) {
        serverParams.push(`keepalive-timeout=${KeepaliveTimeout}`);
    }

    if (PacketSize?.MaxMtu) {
        serverParams.push(`max-mtu=${PacketSize.MaxMtu}`);
    }

    if (PacketSize?.MaxMru) {
        serverParams.push(`max-mru=${PacketSize.MaxMru}`);
    }

    if (PacketSize?.mrru && PacketSize.mrru !== 'disabled') {
        serverParams.push(`mrru=${PacketSize.mrru}`);
    }

    if (allowFastPath !== undefined) {
        serverParams.push(`allow-fast-path=${formatBooleanValue(allowFastPath)}`);
    }

    if (maxSessions && maxSessions !== 'unlimited') {
        serverParams.push(`max-sessions=${maxSessions}`);
    }

    if (OneSessionPerHost !== undefined) {
        serverParams.push(`one-session-per-host=${formatBooleanValue(OneSessionPerHost)}`);
    }

    if (acceptProtoVersion) {
        serverParams.push(`accept-proto-version=${acceptProtoVersion}`);
    }

    if (callerIdType) {
        serverParams.push(`caller-id-type=${callerIdType}`);
    }

    if (L2TPV3?.l2tpv3CircuitId) {
        serverParams.push(`l2tpv3-circuit-id=${L2TPV3.l2tpv3CircuitId}`);
    }

    if (L2TPV3?.l2tpv3CookieLength !== undefined) {
        serverParams.push(`l2tpv3-cookie-length=${L2TPV3.l2tpv3CookieLength === 0 ? '0' : `${L2TPV3.l2tpv3CookieLength}-bytes`}`);
    }

    if (L2TPV3?.l2tpv3DigestHash) {
        serverParams.push(`l2tpv3-digest-hash=${L2TPV3.l2tpv3DigestHash}`);
    }

    routerConfig["/interface l2tp-server server"].push(
        `set ${serverParams.join(' ')}`
    );

    return CommandShortner(routerConfig);
};

// SSTP Server

export const SstpServer = (config: SstpServerConfig): RouterConfig => {
    const routerConfig: RouterConfig = {
        "/interface sstp-server server": [],
        "/ip firewall filter": []
    };

    const {
        enabled,
        Certificate,
        Port = 443,
        Authentication,
        DefaultProfile = 'sstp-profile',
        KeepaliveTimeout = 30,
        PacketSize,
        ForceAes,
        Pfs,
        Ciphers,
        VerifyClientCertificate,
        TlsVersion
    } = config;

    const serverParams: string[] = [
        `enabled=${formatBooleanValue(enabled)}`
    ];

    if (Certificate) {
        serverParams.push(`certificate=${Certificate}`);
        
        if (Certificate === 'none') {
            routerConfig["/interface sstp-server server"].push(
                "# WARNING: SSTP server configured with certificate=none is insecure and incompatible with Windows clients."
            );
        }
    }

    if (Port) {
        serverParams.push(`port=${Port}`);
    }

    if (Authentication) {
        serverParams.push(`authentication=${formatArrayValue(Authentication)}`);
    }

    if (DefaultProfile) {
        serverParams.push(`default-profile=${DefaultProfile}`);
    }

    if (KeepaliveTimeout) {
        serverParams.push(`keepalive-timeout=${KeepaliveTimeout}`);
    }

    if (PacketSize?.MaxMtu) {
        serverParams.push(`max-mtu=${PacketSize.MaxMtu}`);
    }

    if (PacketSize?.MaxMru) {
        serverParams.push(`max-mru=${PacketSize.MaxMru}`);
    }

    if (PacketSize?.mrru && PacketSize.mrru !== 'disabled') {
        serverParams.push(`mrru=${PacketSize.mrru}`);
    }

    if (ForceAes !== undefined) {
        serverParams.push(`force-aes=${formatBooleanValue(ForceAes)}`);
    }

    if (Pfs !== undefined) {
        serverParams.push(`pfs=${formatBooleanValue(Pfs)}`);
    }

    if (Ciphers) {
        serverParams.push(`ciphers=${Ciphers}`);
    }

    if (VerifyClientCertificate !== undefined) {
        serverParams.push(`verify-client-certificate=${formatBooleanValue(VerifyClientCertificate)}`);
        
        if (VerifyClientCertificate) {
            routerConfig["/interface sstp-server server"].push(
                "# WARNING: SSTP verify-client-certificate=yes is incompatible with Windows clients."
            );
        }
    }

    if (TlsVersion) {
        serverParams.push(`tls-version=${TlsVersion}`);
    }

    routerConfig["/interface sstp-server server"].push(
        `set ${serverParams.join(' ')}`
    );

    // Add firewall rule
    routerConfig["/ip firewall filter"].push(
        `add action=accept chain=input comment="SSTP Server" dst-port=${Port} in-interface-list=DOM-WAN protocol=tcp`
    );

    return CommandShortner(routerConfig);
};

// IKEv2 Server Helper Functions

const Ikev2ProfileConfig = (config: Ikev2ServerConfig): string[] => {
    const profileParams: string[] = [`name=${config.profile.name}`];

    const optionalParams = [
        { key: 'hash-algorithm', value: config.profile.hashAlgorithm, isArray: true },
        { key: 'enc-algorithm', value: config.profile.encAlgorithm, isArray: true },
        { key: 'dh-group', value: config.profile.dhGroup, isArray: true },
        { key: 'lifetime', value: config.profile.lifetime },
        { key: 'nat-traversal', value: config.profile.natTraversal, isBoolean: true },
        { key: 'dpd-interval', value: config.profile.dpdInterval },
        { key: 'dpd-maximum-failures', value: config.profile.dpdMaximumFailures },
        { key: 'proposal-check', value: config.profile.proposalCheck }
    ];

    optionalParams.forEach(param => {
        if (param.value !== undefined) {
            const formattedValue = param.isBoolean 
                ? formatBooleanValue(param.value as boolean)
                : param.isArray 
                    ? formatArrayValue(param.value)
                    : param.value;
            profileParams.push(`${param.key}=${formattedValue}`);
        }
    });

    return [`add ${profileParams.join(' ')}`];
};

const Ikev2ProposalConfig = (config: Ikev2ServerConfig): string[] => {
    const proposalParams: string[] = [`name=${config.proposal.name}`];

    const optionalParams = [
        { key: 'auth-algorithms', value: config.proposal.authAlgorithms, isArray: true },
        { key: 'enc-algorithms', value: config.proposal.encAlgorithms, isArray: true },
        { key: 'lifetime', value: config.proposal.lifetime },
        { key: 'pfs-group', value: config.proposal.pfsGroup }
    ];

    optionalParams.forEach(param => {
        if (param.value !== undefined) {
            const formattedValue = param.isArray 
                ? formatArrayValue(param.value)
                : param.value;
            proposalParams.push(`${param.key}=${formattedValue}`);
        }
    });

    return [`add ${proposalParams.join(' ')}`];
};

const Ikev2PolicyGroupConfig = (config: Ikev2ServerConfig): string[] => {
    if (!config.policyGroup) return [];
    
    const policyGroupParams: string[] = [`name=${config.policyGroup.name}`];

    if (config.policyGroup.comment) {
        policyGroupParams.push(`comment="${config.policyGroup.comment}"`);
    }

    return [`add ${policyGroupParams.join(' ')}`];
};

const Ikev2PolicyTemplateConfig = (config: Ikev2ServerConfig): string[] => {
    if (!config.policyTemplates) return [];
    
    const templateParams: string[] = [
        `group=${config.policyTemplates.group}`,
        `proposal=${config.policyTemplates.proposal}`,
        'template=yes'
    ];

    const optionalParams = [
        { key: 'src-address', value: config.policyTemplates.srcAddress },
        { key: 'dst-address', value: config.policyTemplates.dstAddress },
        { key: 'protocol', value: config.policyTemplates.protocol },
        { key: 'action', value: config.policyTemplates.action },
        { key: 'level', value: config.policyTemplates.level }
    ];

    optionalParams.forEach(param => {
        if (param.value !== undefined) {
            templateParams.push(`${param.key}=${param.value}`);
        }
    });

    return [`add ${templateParams.join(' ')}`];
};

const Ikev2PeerConfig = (config: Ikev2ServerConfig): string[] => {
    const peerParams: string[] = [
        `name=${config.peer.name}`,
        `profile=${config.peer.profile}`
    ];

    const optionalParams = [
        { key: 'address', value: config.peer.address },
        { key: 'exchange-mode', value: config.peer.exchangeMode },
        { key: 'passive', value: config.peer.passive, isBoolean: true },
        { key: 'local-address', value: config.peer.localAddress },
        { key: 'port', value: config.peer.port }
    ];

    optionalParams.forEach(param => {
        if (param.value !== undefined) {
            const formattedValue = param.isBoolean 
                ? formatBooleanValue(param.value as boolean)
                : param.value;
            peerParams.push(`${param.key}=${formattedValue}`);
        }
    });

    return [`add ${peerParams.join(' ')}`];
};

const Ikev2ModeConfig = (config: Ikev2ServerConfig): string[] => {
    if (!config.modeConfigs) return [];
    
    const modeConfigParams: string[] = [`name=${config.modeConfigs.name}`];

    const optionalParams = [
        { key: 'address-pool', value: config.modeConfigs.addressPool },
        { key: 'address', value: config.modeConfigs.address },
        { key: 'address-prefix-length', value: config.modeConfigs.addressPrefixLength },
        { key: 'responder', value: config.modeConfigs.responder, isBoolean: true },
        { key: 'static-dns', value: config.modeConfigs.staticDns },
        { key: 'split-include', value: config.modeConfigs.splitInclude },
        { key: 'system-dns', value: config.modeConfigs.systemDns, isBoolean: true }
    ];

    optionalParams.forEach(param => {
        if (param.value !== undefined) {
            const formattedValue = param.isBoolean 
                ? formatBooleanValue(param.value as boolean)
                : param.value;
            modeConfigParams.push(`${param.key}=${formattedValue}`);
        }
    });

    return [`add ${modeConfigParams.join(' ')}`];
};

const Ikev2IdentityConfig = (config: Ikev2ServerConfig): string[] => {
    const identityParams: string[] = [
        `peer=${config.peer.name}`,
        `auth-method=${config.identities.authMethod}`
    ];

    const optionalParams = [
        { key: 'secret', value: config.identities.secret },
        { key: 'certificate', value: config.identities.certificate },
        { key: 'eap-methods', value: config.identities.eapMethods },
        { key: 'generate-policy', value: config.identities.generatePolicy },
        { key: 'mode-config', value: config.identities.modeConfig },
        { key: 'policy-template-group', value: config.identities.policyTemplateGroup }
    ];

    optionalParams.forEach(param => {
        if (param.value !== undefined) {
            identityParams.push(`${param.key}=${param.value}`);
        }
    });

    return [`add ${identityParams.join(' ')}`];
};

// Main IKEv2 Server Function

export const Ikev2Server = (config: Ikev2ServerConfig): RouterConfig => {
    const routerConfig: RouterConfig = {
        "/ip pool": [],
        "/ip ipsec profile": [],
        "/ip ipsec proposal": [],
        "/ip ipsec policy group": [],
        "/ip ipsec policy": [],
        "/ip ipsec peer": [],
        "/ip ipsec mode-config": [],
        "/ip ipsec identity": [],
        "/ip firewall filter": []
    };

    // Build IP Pool configuration using helper function
    if (config.ipPools) {
        const poolConfig: IPPoolConfig = {
            name: config.ipPools.Name,
            ranges: config.ipPools.Ranges,
            nextPool: config.ipPools.NextPool,
            comment: config.ipPools.comment
        };
        routerConfig["/ip pool"].push(...generateIPPool(poolConfig));
    }

    // Build each configuration section using helper functions
    routerConfig["/ip ipsec profile"].push(...Ikev2ProfileConfig(config));
    routerConfig["/ip ipsec proposal"].push(...Ikev2ProposalConfig(config));
    routerConfig["/ip ipsec policy group"].push(...Ikev2PolicyGroupConfig(config));
    routerConfig["/ip ipsec policy"].push(...Ikev2PolicyTemplateConfig(config));
    routerConfig["/ip ipsec peer"].push(...Ikev2PeerConfig(config));
    routerConfig["/ip ipsec mode-config"].push(...Ikev2ModeConfig(config));
    routerConfig["/ip ipsec identity"].push(...Ikev2IdentityConfig(config));

    // Add firewall rules using generateVPNFirewallRules
    const ikev2FirewallRules: VPNFirewallRule[] = [
        {
            port: '500,4500',
            protocol: 'udp',
            comment: 'Allow IKEv2',
            interfaceList: 'DOM-WAN'
        },
        {
            port: 'ipsec-esp',
            protocol: 'udp',
            comment: 'Allow ESP'
        }
    ];
    
    const firewallConfig = generateVPNFirewallRules(ikev2FirewallRules);
    routerConfig["/ip firewall filter"].push(...firewallConfig["/ip firewall filter"]);

    return CommandShortner(routerConfig);
};

// VPN Server Interfaces Wrapper

export const VPNServerInterfaceWrapper = (config: VPNServer): RouterConfig => {
    const configs: RouterConfig[] = [];

    // Helper function to add configuration if it exists
    const addConfig = (routerConfig: RouterConfig) => {
        if (routerConfig && Object.keys(routerConfig).length > 0) {
            configs.push(routerConfig);
        }
    };

    // Check and generate WireGuard Server Interfaces
    if (config.WireguardServers && config.WireguardServers.length > 0) {
        config.WireguardServers.forEach(wireguardConfig => {
            if (wireguardConfig.Interface) {
                console.log('Generating WireGuard server interface configuration');
                addConfig(WireguardServer(wireguardConfig.Interface));
            }
        });
    }

    // Check and generate OpenVPN Server Interface
    if (config.OpenVpnServer) {
        console.log('Generating OpenVPN server interface configuration');
        addConfig(OVPNServer(config.OpenVpnServer));
    }

    // Check and generate PPTP Server Interface
    if (config.PptpServer) {
        console.log('Generating PPTP server interface configuration');
        addConfig(PptpServer(config.PptpServer));
    }

    // Check and generate L2TP Server Interface
    if (config.L2tpServer) {
        console.log('Generating L2TP server interface configuration');
        addConfig(L2tpServer(config.L2tpServer));
    }

    // Check and generate SSTP Server Interface
    if (config.SstpServer) {
        console.log('Generating SSTP server interface configuration');
        addConfig(SstpServer(config.SstpServer));
    }

    // Check and generate IKEv2 Server Interface
    if (config.Ikev2Server) {
        console.log('Generating IKEv2 server interface configuration');
        addConfig(Ikev2Server(config.Ikev2Server));
    }

    // If no VPN protocols are configured, return empty config with message
    if (configs.length === 0) {
        return {
            "": ["# No VPN server protocols are configured"]
        };
    }

    // Merge all interface configurations
    const finalConfig = mergeRouterConfigs(...configs);

    // Add summary comments
    if (!finalConfig[""]) {
        finalConfig[""] = [];
    }

    const configuredProtocols: string[] = [];
    if (config.WireguardServers && config.WireguardServers.length > 0) configuredProtocols.push('Wireguard');
    if (config.OpenVpnServer) configuredProtocols.push('OpenVPN');
    if (config.PptpServer) configuredProtocols.push('PPTP');
    if (config.L2tpServer) configuredProtocols.push('L2TP');
    if (config.SstpServer) configuredProtocols.push('SSTP');
    if (config.Ikev2Server) configuredProtocols.push('IKEv2');

    finalConfig[""].unshift(
        "# VPN Server Interface Configuration Summary:",
        `# Configured protocols: ${configuredProtocols.join(', ')}`,
        `# Total configurations: ${configs.length}`,
        ""
    );

    return CommandShortner(finalConfig);
}




