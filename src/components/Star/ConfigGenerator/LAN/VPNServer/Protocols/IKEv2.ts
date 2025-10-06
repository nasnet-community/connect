import type { RouterConfig } from "~/components/Star/ConfigGenerator/";
import { formatBooleanValue, formatArrayValue } from "~/components/Star/ConfigGenerator/";
import { CommandShortner, mergeRouterConfigs } from "~/components/Star/ConfigGenerator/";
import { generateIPPool, type IPPoolConfig } from "~/components/Star/ConfigGenerator/";
import type { VSCredentials, Ikev2ServerConfig } from "~/components/Star/StarContext/";








const Ikev2ProfileConfig = (config: Ikev2ServerConfig): string[] => {
    // Use provided config or defaults following MikroTik documentation
    const profileName = config.profile.name || "ike2";
    const profileParams: string[] = [`name=${profileName}`];

    // Apply MikroTik best practices defaults if not specified
    const defaults = {
        hashAlgorithm: config.profile.hashAlgorithm || "sha1",
        encAlgorithm: config.profile.encAlgorithm || "aes-128",
        dhGroup: config.profile.dhGroup || "modp1024,modp2048",
        lifetime: config.profile.lifetime || "1d",
        natTraversal:
            config.profile.natTraversal !== undefined
                ? config.profile.natTraversal
                : true,
        dpdInterval: config.profile.dpdInterval || "8s",
        dpdMaximumFailures: config.profile.dpdMaximumFailures || 4,
        proposalCheck: config.profile.proposalCheck || "obey",
    };

    const optionalParams = [
        { key: "hash-algorithm", value: defaults.hashAlgorithm, isArray: true },
        { key: "enc-algorithm", value: defaults.encAlgorithm, isArray: true },
        { key: "dh-group", value: defaults.dhGroup, isArray: true },
        { key: "lifetime", value: defaults.lifetime },
        { key: "nat-traversal", value: defaults.natTraversal, isBoolean: true },
        { key: "dpd-interval", value: defaults.dpdInterval },
        { key: "dpd-maximum-failures", value: defaults.dpdMaximumFailures },
        { key: "proposal-check", value: defaults.proposalCheck },
    ];

    optionalParams.forEach((param) => {
        const formattedValue = param.isBoolean
            ? formatBooleanValue(param.value as boolean)
            : param.isArray
              ? formatArrayValue(param.value)
              : param.value;
        profileParams.push(`${param.key}=${formattedValue}`);
    });

    return [`add ${profileParams.join(" ")}`];
};

const Ikev2ProposalConfig = (config: Ikev2ServerConfig): string[] => {
    // Use provided config or defaults following MikroTik documentation
    const proposalName = config.proposal.name || "ike2";
    const proposalParams: string[] = [`name=${proposalName}`];

    // Apply MikroTik best practices: pfs-group=none for road warrior as per documentation
    const defaults = {
        authAlgorithms: config.proposal.authAlgorithms || "sha1",
        encAlgorithms:
            config.proposal.encAlgorithms ||
            "aes-256-cbc,aes-192-cbc,aes-128-cbc",
        lifetime: config.proposal.lifetime || "30m",
        pfsGroup: config.proposal.pfsGroup || "none", // Documentation recommends 'none' for road warrior
    };

    const optionalParams = [
        {
            key: "auth-algorithms",
            value: defaults.authAlgorithms,
            isArray: true,
        },
        { key: "enc-algorithms", value: defaults.encAlgorithms, isArray: true },
        { key: "lifetime", value: defaults.lifetime },
        { key: "pfs-group", value: defaults.pfsGroup },
    ];

    optionalParams.forEach((param) => {
        const formattedValue = param.isArray
            ? formatArrayValue(param.value)
            : param.value;
        proposalParams.push(`${param.key}=${formattedValue}`);
    });

    return [`add ${proposalParams.join(" ")}`];
};

const Ikev2PolicyGroupConfig = (config: Ikev2ServerConfig): string[] => {
    if (!config.policyGroup) return [];

    const policyGroupParams: string[] = [`name=${config.policyGroup.name}`];

    if (config.policyGroup.comment) {
        policyGroupParams.push(`comment="${config.policyGroup.comment}"`);
    }

    return [`add ${policyGroupParams.join(" ")}`];
};

const Ikev2PolicyTemplateConfig = (config: Ikev2ServerConfig): string[] => {
    if (!config.policyTemplates) return [];

    const templateParams: string[] = [
        `group=${config.policyTemplates.group}`,
        `proposal=${config.policyTemplates.proposal}`,
        "template=yes",
    ];

    const optionalParams = [
        { key: "src-address", value: config.policyTemplates.srcAddress },
        { key: "dst-address", value: config.policyTemplates.dstAddress },
        { key: "protocol", value: config.policyTemplates.protocol },
        { key: "action", value: config.policyTemplates.action },
        { key: "level", value: config.policyTemplates.level },
    ];

    optionalParams.forEach((param) => {
        if (param.value !== undefined) {
            templateParams.push(`${param.key}=${param.value}`);
        }
    });

    return [`add ${templateParams.join(" ")}`];
};

const Ikev2PeerConfig = (config: Ikev2ServerConfig): string[] => {
    const peerParams: string[] = [
        `name=${config.peer.name}`,
        `profile=${config.peer.profile}`,
    ];

    const optionalParams = [
        { key: "address", value: config.peer.address },
        { key: "exchange-mode", value: config.peer.exchangeMode },
        { key: "passive", value: config.peer.passive, isBoolean: true },
        { key: "local-address", value: config.peer.localAddress },
        { key: "port", value: config.peer.port },
    ];

    optionalParams.forEach((param) => {
        if (param.value !== undefined) {
            const formattedValue = param.isBoolean
                ? formatBooleanValue(param.value as boolean)
                : param.value;
            peerParams.push(`${param.key}=${formattedValue}`);
        }
    });

    return [`add ${peerParams.join(" ")}`];
};

const Ikev2ModeConfig = (config: Ikev2ServerConfig): string[] => {
    if (!config.modeConfigs) return [];

    const modeConfigParams: string[] = [`name=${config.modeConfigs.name}`];

    const optionalParams = [
        { key: "address-pool", value: config.modeConfigs.addressPool },
        { key: "address", value: config.modeConfigs.address },
        {
            key: "address-prefix-length",
            value: config.modeConfigs.addressPrefixLength,
        },
        {
            key: "responder",
            value: config.modeConfigs.responder,
            isBoolean: true,
        },
        { key: "static-dns", value: config.modeConfigs.staticDns },
        { key: "split-include", value: config.modeConfigs.splitInclude },
        {
            key: "system-dns",
            value: config.modeConfigs.systemDns,
            isBoolean: true,
        },
    ];

    optionalParams.forEach((param) => {
        if (param.value !== undefined) {
            const formattedValue = param.isBoolean
                ? formatBooleanValue(param.value as boolean)
                : param.value;
            modeConfigParams.push(`${param.key}=${formattedValue}`);
        }
    });

    return [`add ${modeConfigParams.join(" ")}`];
};

// Note: This function is now handled in VPNServerUsers.ts for per-user identity configuration
// const Ikev2IdentityConfig = (config: Ikev2ServerConfig): string[] => {
//     // Use provided config or defaults following MikroTik documentation
//     const peerName = config.peer?.name || 'ike2';
//     const authMethod = config.identities?.authMethod || 'pre-shared-key';

//     const identityParams: string[] = [
//         `peer=${peerName}`,
//         `auth-method=${authMethod}`
//     ];

//     // Apply MikroTik best practices defaults following documentation
//     const defaults = {
//         certificate: config.identities?.certificate || 'server1',
//         generatePolicy: config.identities?.generatePolicy || 'port-strict',
//         modeConfig: config.identities?.modeConfig || 'ike2-conf',
//         policyTemplateGroup: config.identities?.policyTemplateGroup || 'ike2-policies'
//     };

//     // Add required parameters based on auth method
//     if (authMethod === 'digital-signature') {
//         // identityParams.push(`certificate=${defaults.certificate}`);
//     } else if (authMethod === 'pre-shared-key' && config.identities?.secret) {
//         identityParams.push(`secret="${config.identities.secret}"`);
//     }

//     // Add standard parameters for server configuration
//     identityParams.push(`generate-policy=${defaults.generatePolicy}`);
//     identityParams.push(`mode-config=${defaults.modeConfig}`);
//     identityParams.push(`policy-template-group=${defaults.policyTemplateGroup}`);

//     // Add optional EAP methods if specified
//     if (config.identities?.eapMethods) {
//         identityParams.push(`eap-methods=${config.identities.eapMethods}`);
//     }

//     return [`add ${identityParams.join(' ')}`];
// };

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
        "/ip firewall filter": [],
        "/ip firewall address-list": [],
        "": [],
    };

    // Add configuration order comments following MikroTik best practices
    routerConfig[""].push(
        "# IKEv2 Server Configuration following MikroTik best practices:",
        "# 1. IP Pool for client addresses",
        "# 2. IPsec Profile (Phase 1 parameters)",
        "# 3. IPsec Proposal (Phase 2 parameters) with pfs-group=none",
        "# 4. Policy Group and Policy Template",
        "# 5. Mode Config for address distribution",
        "# 6. IPsec Peer (passive=yes for server)",
        "# 7. IPsec Identity for authentication",
        "# 8. Firewall rules for IKE and ESP",
        "",
    );

    // 1. Build IP Pool configuration - Following MikroTik documentation pattern
    if (config.ipPools) {
        const poolConfig: IPPoolConfig = {
            name: config.ipPools.Name,
            ranges: config.ipPools.Ranges,
            nextPool: config.ipPools.NextPool,
            comment: config.ipPools.comment,
        };
        routerConfig["/ip pool"].push(...generateIPPool(poolConfig));
    } else {
        // Default pool following documentation example
        routerConfig["/ip pool"].push(
            `add name=ike2-pool ranges=192.168.77.2-192.168.77.254`,
        );
    }

    // 2. Build IPsec Profile (Phase 1) - Following documentation
    routerConfig["/ip ipsec profile"].push(...Ikev2ProfileConfig(config));

    // 3. Build IPsec Proposal (Phase 2) with pfs-group=none as per documentation
    const proposalConfig = Ikev2ProposalConfig(config);
    if (proposalConfig.length === 0) {
        // Default proposal following documentation with pfs-group=none
        routerConfig["/ip ipsec proposal"].push(`add name=ike2 pfs-group=none`);
    } else {
        routerConfig["/ip ipsec proposal"].push(...proposalConfig);
    }

    // 4. Build Policy Group and Policy Template - Following documentation pattern
    if (config.policyGroup) {
        routerConfig["/ip ipsec policy group"].push(
            ...Ikev2PolicyGroupConfig(config),
        );
    } else {
        // Default policy group following documentation
        routerConfig["/ip ipsec policy group"].push(`add name=ike2-policies`);
    }

    if (config.policyTemplates) {
        routerConfig["/ip ipsec policy"].push(
            ...Ikev2PolicyTemplateConfig(config),
        );
    } else {
        // Default policy template following documentation
        const groupName = config.policyGroup?.name || "ike2-policies";
        const proposalName = config.proposal.name || "ike2";
        routerConfig["/ip ipsec policy"].push(
            `add dst-address=192.168.77.0/24 group=${groupName} proposal=${proposalName} src-address=0.0.0.0/0 template=yes`,
        );
    }

    // 5. Build Mode Config for address distribution - Following documentation
    if (config.modeConfigs) {
        routerConfig["/ip ipsec mode-config"].push(...Ikev2ModeConfig(config));
    } else {
        // Default mode config following documentation
        const poolName = config.ipPools?.Name || "ike2-pool";
        routerConfig["/ip ipsec mode-config"].push(
            `add address-pool=${poolName} address-prefix-length=32 name=ike2-conf`,
        );
    }

    // 6. Build IPsec Peer (passive=yes for server) - Following documentation
    if (config.peer) {
        routerConfig["/ip ipsec peer"].push(...Ikev2PeerConfig(config));
    } else {
        // Default peer following documentation
        const profileName = config.profile.name || "ike2";
        routerConfig["/ip ipsec peer"].push(
            `add exchange-mode=ike2 name=ike2 passive=yes profile=${profileName}`,
        );
    }

    // 7. Build IPsec Identity for authentication - Following documentation
    // Note: IPsec Identity configuration is now handled in VPNServerUsers.ts
    // routerConfig["/ip ipsec identity"].push(...Ikev2IdentityConfig(config));

    // 8. Add firewall rules for IKEv2 and ESP - Following documentation requirements
    routerConfig["/ip firewall filter"].push(
        `add action=accept chain=input comment="Allow IKE" dst-port=500 in-interface-list=DOM-WAN protocol=udp`,
        `add action=accept chain=input comment="Allow IKE NAT-T" dst-port=4500 in-interface-list=DOM-WAN protocol=udp`,
        `add action=accept chain=input comment="Allow ESP" in-interface-list=DOM-WAN protocol=ipsec-esp`,
    );

    // Add address list for IKEv2 network
    const poolNetwork =
        config.ipPools?.Ranges.split("-")[0]?.replace(/\.\d+$/, ".0/24") ||
        "192.168.77.0/24";
    routerConfig["/ip firewall address-list"].push(
        `add address=${poolNetwork} list=VPN-LAN comment="IKEv2 clients network"`,
    );

    // Add best practices notes
    routerConfig[""].push(
        "# IKEv2 Server Configuration Notes:",
        "# - Uses exchange-mode=ike2 and passive=yes for server operation",
        "# - PFS group set to 'none' in proposal as recommended for road warrior setup",
        "# - Mode config provides address pool and DNS configuration to clients",
        "# - Policy template allows traffic from any source to IKEv2 network",
        "# - Separate firewall rules for IKE (500), NAT-T (4500), and ESP protocols",
        "# - Network added to VPN-LAN address list for firewall rules",
        "",
    );

    return CommandShortner(routerConfig);
};

export const Ikev2ServerUsers = ( users: VSCredentials[], ikev2Config?: any ): RouterConfig => {
    const config: RouterConfig = {
        "/ip ipsec identity": [],
        "/ip ipsec mode-config": [],
        "": [],
    };

    // Filter users who have IKeV2 in their VPNType array
    const ikev2Users = users.filter((user) => user.VPNType.includes("IKeV2"));

    if (ikev2Users.length === 0) {
        config[""].push("# No users configured for IKEv2");
        return CommandShortner(config);
    }

    // Configure IKEv2 users with pre-shared key authentication
    config[""].push(
        "# IKEv2 User Configuration with Pre-Shared Key Authentication",
        "# Each user gets individual IPsec identity and mode-config",
        "",
    );

    // Get configuration from ikev2Config or use defaults
    const peerName = ikev2Config?.peer?.name || "ike2";
    const authMethod = ikev2Config?.identities?.authMethod || "pre-shared-key";
    const generatePolicy =
        ikev2Config?.identities?.generatePolicy || "port-strict";
    const policyTemplateGroup =
        ikev2Config?.identities?.policyTemplateGroup || "ike2-policies";

    // Create individual mode-config for each user with specific IP assignment
    config[""].push(
        "# Individual mode-config for specific user IP assignments",
    );
    ikev2Users.forEach((user, index) => {
        const userIP = `192.168.77.${index + 10}`;
        config["/ip ipsec mode-config"].push(
            `add address=${userIP} address-prefix-length=32 name=ikev2-${user.Username} responder=yes static-dns=1.1.1.1,8.8.8.8 system-dns=no `,
        );
    });

    config[""].push("");

    // Create IPsec identities for each user based on auth method
    config[""].push(
        `# IPsec identities for individual user authentication (${authMethod})`,
    );
    ikev2Users.forEach((user) => {
        const identityParams: string[] = [
            `peer=${peerName}`,
            `auth-method=${authMethod}`,
        ];

        // Add authentication-specific parameters
        if (authMethod === "pre-shared-key") {
            const secret = ikev2Config?.identities?.secret || user.Password;
            identityParams.push(`secret="${secret}"`);
        } else if (authMethod === "digital-signature") {
            const certificate =
                ikev2Config?.identities?.certificate || "server1";
            identityParams.push(`certificate=${certificate}`);
        }

        // Add standard parameters
        identityParams.push(`generate-policy=${generatePolicy}`);
        identityParams.push(`mode-config=ikev2-${user.Username}`);
        identityParams.push(`policy-template-group=${policyTemplateGroup}`);
        identityParams.push(`my-id=user-fqdn:${user.Username}@ikev2.local`);
        identityParams.push(`remote-id=ignore`);
        identityParams.push(`comment="Identity for ${user.Username}"`);

        config["/ip ipsec identity"].push(`add ${identityParams.join(" ")}`);
    });

    // Add summary information
    config[""].push("");
    config[""].push("# IKEv2 User Configuration Summary:");
    config[""].push(`# Total IKEv2 users: ${ikev2Users.length}`);
    config[""].push(`# Authentication method: ${authMethod}`);
    config[""].push(`# Peer name: ${peerName}`);
    config[""].push("# Each user has individual IP assignment and identity");
    config[""].push("");
    config[""].push("# IKEv2 Users:");
    ikev2Users.forEach((user, index) => {
        const userIP = `192.168.77.${index + 10}`;
        if (authMethod === "pre-shared-key") {
            const secret = ikev2Config?.identities?.secret || user.Password;
            config[""].push(
                `#   ${user.Username} - IP: ${userIP} - PSK: ${secret}`,
            );
        } else {
            config[""].push(`#   ${user.Username} - IP: ${userIP}`);
        }
    });

    config[""].push("");
    config[""].push("# Client Configuration Instructions:");
    config[""].push(
        "# 1. Set server address to your router's public IP or DDNS name",
    );
    config[""].push(`# 2. Use ${authMethod} authentication`);
    config[""].push(
        "# 3. Set user identity to: user@ikev2.local (e.g., user1@ikev2.local)",
    );
    if (authMethod === "pre-shared-key") {
        config[""].push("# 4. Use the corresponding user password as PSK");
    } else if (authMethod === "digital-signature") {
        config[""].push("# 4. Install the appropriate client certificate");
    }
    config[""].push("");
    config[""].push(
        `# Note: This configuration uses ${authMethod} authentication`,
    );

    return CommandShortner(config);
};

export const Ikev2ServerWrapper = ( serverConfig: Ikev2ServerConfig, users: VSCredentials[] = [] ): RouterConfig => {
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

    const ikev2Users = users.filter((user) => user.VPNType.includes("IKeV2"));

    finalConfig[""].unshift(
        "# IKEv2 Server Configuration Summary:",
        `# Profile: ${serverConfig.profile.name}`,
        `# Proposal: ${serverConfig.proposal.name}`,
        `# Peer: ${serverConfig.peer.name}`,
        `# Auth Method: ${serverConfig.identities.authMethod}`,
        `# Users: ${ikev2Users.length}`,
        "",
    );

    return CommandShortner(finalConfig);
};














































