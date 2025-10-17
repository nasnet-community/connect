import type { Ikev2ServerConfig, SubnetConfig, VSCredentials, VSNetwork } from "~/components/Star/StarContext";
import {
    type RouterConfig,
    CommandShortner,
    mergeRouterConfigs,
    formatBooleanValue,
    VSAddressList,
    generateIPPool,
    SubnetToRange,
} from "~/components/Star/ConfigGenerator";

// Main IKEv2 Server Function - Optimized for maximum compatibility and speed

export const Ikev2Server = (config: Ikev2ServerConfig, vsNetwork: VSNetwork, subnetConfig: SubnetConfig): RouterConfig => {
    const routerConfig: RouterConfig = {
        "/ip pool": [],
        "/ip ipsec profile": [],
        "/ip ipsec proposal": [],
        "/ip ipsec policy group": [],
        "/ip ipsec policy": [],
        "/ip ipsec peer": [],
        "/ip ipsec mode-config": [],
        "/ip firewall filter": [],
        "/ip firewall address-list": [],
        "": [],
    };

    // Use provided subnet configuration
    const { subnet } = subnetConfig;
    const ranges = SubnetToRange(subnet);
    const name = "ikev2"; // IKEv2 server name


    // 1. Build IP Pool configuration - Using provided subnet
        routerConfig["/ip pool"].push(
        ...generateIPPool({ name, ranges, comment: `IKEv2 ${name} client pool` })
    );

    // Add VPN subnet to address list using shared helper
    const addrCfg = VSAddressList(subnet, String(vsNetwork), `${name} IKEv2 subnet`);
    Object.entries(addrCfg).forEach(([section, cmds]) => {
        routerConfig[section] = (routerConfig[section] ?? []).concat(cmds);
    });

    // 2. Build IPsec Profile (Phase 1) - Universal compatibility with all devices
    // Optimized for maximum compatibility: modp2048, modp3072, ecp256, ecp384, modp1024
    // Multiple encryption and hash algorithms for universal support
    const profileName = config.profile.name || name;
    const profileParams: string[] = [
        `name=${profileName}`,
        // DH Groups: Modern first, legacy fallback for compatibility
        `dh-group=modp2048,modp3072,ecp256,ecp384,modp1024`,
        // Encryption: AES-256 first for security, AES-128 for speed, 3DES for legacy
        `enc-algorithm=aes-256,aes-192,aes-128,3des`,
        // Hash: SHA-256 first, SHA-512 for security, SHA-1 for legacy devices
        // `hash-algorithm=sha256,sha512,sha1`,
        // Lifetime: 24h for optimal balance
        `lifetime=${config.profile.lifetime || "24h"}`,
        // DPD: 30s interval with 3 failures for reliable connection detection
        `dpd-interval=${config.profile.dpdInterval || "30s"}`,
        `dpd-maximum-failures=${config.profile.dpdMaximumFailures || 3}`,
        // NAT-T: Always enabled for clients behind NAT
        `nat-traversal=${formatBooleanValue(config.profile.natTraversal !== false)}`,
    ];
    routerConfig["/ip ipsec profile"].push(`add ${profileParams.join(" ")}`);

    // 3. Build IPsec Proposal (Phase 2) - Optimized for speed and compatibility
    // AES-GCM for hardware acceleration (fastest), CBC for compatibility
    // pfs-group=none for iOS/macOS compatibility and performance
    const proposalName = config.proposal.name || name;
    const proposalParams: string[] = [
        `name=${proposalName}`,
        // Encryption: AES-GCM first (hardware accelerated, fastest), then CBC for compatibility
        // Includes 3DES for legacy device support
        `enc-algorithms=aes-256-gcm,aes-128-gcm,aes-256-cbc,aes-192-cbc,aes-128-cbc,3des`,
        // Auth: null for GCM (built-in), sha256/sha1 for CBC modes
        // `auth-algorithms=null,sha256,sha1`,
        // PFS: none for iOS/macOS compatibility and better performance (critical!)
        `pfs-group=none`,
        // Lifetime: 8h for optimal balance between security and reconnection frequency
        `lifetime=${config.proposal.lifetime || "8h"}`,
    ];
    routerConfig["/ip ipsec proposal"].push(`add ${proposalParams.join(" ")}`);

    // 4. Build Policy Group and Policy Template - Universal traffic routing
    const policyGroupName = config.policyGroup?.name || `${name}-policies`;
    routerConfig["/ip ipsec policy group"].push(`add name="${policyGroupName}-server"`);

    // Policy template allows all traffic from clients to VPN subnet
        routerConfig["/ip ipsec policy"].push(
        `add dst-address="${subnet}" group="${policyGroupName}-server" proposal="${proposalName}" src-address=0.0.0.0/0 template=yes`,
    );

    // 5. Build Mode Config for address distribution - System DNS with responder mode
    const modeConfigName = config.modeConfigs?.name || `${name}-conf`;
    const modeConfigParams: string[] = [
        `name="${modeConfigName}"`,
        `address-pool="${name}"`,
        `address-prefix-length=32`,
        // Use system DNS for automatic DNS server assignment
        `system-dns=${formatBooleanValue(config.modeConfigs?.systemDns !== false)}`,
        // Responder mode for server operation
        `responder=yes`,
    ];

    // Add static DNS if specified
    if (config.modeConfigs?.staticDns) {
        modeConfigParams.push(`static-dns=${config.modeConfigs.staticDns}`);
    }

    // Add split-include if specified for split tunneling
    if (config.modeConfigs?.splitInclude) {
        modeConfigParams.push(`split-include=${config.modeConfigs.splitInclude}`);
    }

    routerConfig["/ip ipsec mode-config"].push(`add ${modeConfigParams.join(" ")}`);

    // 6. Build IPsec Peer (passive=yes for server, NAT-T enabled)
    const peerName = config.peer.name || name;
    const peerParams: string[] = [
        `name=${peerName}`,
        // IKEv2 exchange mode
        `exchange-mode=ike2`,
        // Passive mode for server (listen for connections)
        `passive=yes`,
        // Use the universal profile
        `profile=${profileName}`,
        // Send initial contact for better connection establishment
        `send-initial-contact=yes`,
    ];
    routerConfig["/ip ipsec peer"].push(`add ${peerParams.join(" ")}`);


    return CommandShortner(routerConfig);
};

export const Ikev2ServerUsers = (serverConfig: Ikev2ServerConfig, users: VSCredentials[], _subnetConfig: SubnetConfig): RouterConfig => {
    const config: RouterConfig = {
        "/ip ipsec identity": [],
        "/ppp secret": [],
        "": [],
    };

    // Filter users who have IKeV2 in their VPNType array
    const ikev2Users = users.filter((user) => user.VPNType.includes("IKeV2"));

    if (ikev2Users.length === 0) {
        return CommandShortner(config);
    }

    // Get configuration values
    const peerName = serverConfig.peer.name || "ikev2";
    const authMethod = serverConfig.identities.authMethod || "eap";
    const generatePolicy = serverConfig.identities.generatePolicy || "port-strict";
    const policyGroupName = serverConfig.policyGroup?.name || "ikev2-policies";
    const modeConfigName = serverConfig.modeConfigs?.name || "ikev2-conf";


    // For EAP authentication, we need PPP secrets
    if (authMethod === "eap") {
        // config[""].push("# PPP Secrets for EAP-MSCHAPv2 authentication");
        ikev2Users.forEach((user) => {
            const secretParams: string[] = [
                `name="${user.Username}"`,
                `password="${user.Password}"`,
                `service=ipsec`,
            ];
            config["/ppp secret"].push(`add ${secretParams.join(" ")}`);
        });
    // config[""].push("");

        // Single EAP identity for all users
        const identityParams: string[] = [
            `peer=${peerName}`,
            `auth-method=eap`,
            `eap-methods=pre-shared-key`,
            `generate-policy=${generatePolicy}`,
            `mode-config=${modeConfigName}`,
            `policy-template-group="${policyGroupName}-server"`,
            `match-by=remote-id`,
            `remote-id=ignore`,
        ];

        // Add certificate if specified
        if (serverConfig.identities.certificate) {
            identityParams.push(`certificate=${serverConfig.identities.certificate}`);
        }

        config["/ip ipsec identity"].push(`add ${identityParams.join(" ")}`);
    } else if (authMethod === "pre-shared-key") {
        // PSK identity for simple devices
        // config[""].push("# Pre-Shared Key authentication (fallback for simple devices)");
        const secret = serverConfig.identities.secret || "DefaultPSK2024!";
        const identityParams: string[] = [
            `peer=${peerName}`,
            `auth-method=pre-shared-key`,
            `secret="${secret}"`,
            `generate-policy=${generatePolicy}`,
            `mode-config=${modeConfigName}`,
            `policy-template-group="${policyGroupName}-server"`,
        ];
        config["/ip ipsec identity"].push(`add ${identityParams.join(" ")}`);
    }

    return CommandShortner(config);
};

export const IKEv2ServerFirewall = (serverConfigs: Ikev2ServerConfig[]): RouterConfig => {
    const config: RouterConfig = {
        "/ip firewall filter": [],
        "/ip firewall mangle": [],
        "/ip firewall raw": [],
        "/ip firewall nat": [],
    };

    serverConfigs.forEach(() => {
        // Allow IKE (UDP 500) and NAT-T (UDP 4500)
        config["/ip firewall filter"].push(
            `add action=accept chain=input comment="Allow IKE" dst-port="500" in-interface-list="Domestic-WAN" protocol="udp"`,
            `add action=accept chain=input comment="Allow IKE NAT-T" dst-port="4500" in-interface-list="Domestic-WAN" protocol="udp"`,
            `add action=accept chain=input comment="Allow ESP" in-interface-list="Domestic-WAN" protocol="ipsec-esp"`,
        );

        // Mark connections for traffic management
        config["/ip firewall mangle"].push(
            `add action=mark-connection chain=input comment="Mark Inbound IKEv2 Connections" \\
                connection-state=new in-interface-list="Domestic-WAN" protocol="udp" dst-port="500,4500" \\
                new-connection-mark="conn-vpn-server" passthrough=yes`,
        );
    });

    return config;
}

export const Ikev2ServerWrapper = ( serverConfig: Ikev2ServerConfig, users: VSCredentials[] = [], subnetConfig?: SubnetConfig ): RouterConfig => {
    const configs: RouterConfig[] = [];

    // Get VSNetwork from server config or default to "VPN"
    const vsNetwork: VSNetwork = serverConfig.VSNetwork || "VPN";

    // Fallback to default subnet if no match found
    const effectiveSubnet: SubnetConfig = subnetConfig || {
        name: "ikev2",
        subnet: "10.10.10.0/24", // Default IKEv2 network (following MikroTik docs)
    };

    // Generate IKEv2 server configuration
    configs.push(Ikev2Server(serverConfig, vsNetwork, effectiveSubnet));

    // Generate IKEv2 users configuration if users are provided
    if (users.length > 0) {
        configs.push(Ikev2ServerUsers(serverConfig, users, effectiveSubnet));
    }

    // Generate firewall rules
    configs.push(IKEv2ServerFirewall([serverConfig]));

    // Merge configurations
    const finalConfig = mergeRouterConfigs(...configs);

    return CommandShortner(finalConfig);
};












