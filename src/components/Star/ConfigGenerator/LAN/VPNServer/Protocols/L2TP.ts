import type { L2tpServerConfig, SubnetConfig, VSCredentials, VSNetwork } from "~/components/Star/StarContext";
import {
    type RouterConfig,
    CommandShortner,
    mergeRouterConfigs,
    formatBooleanValue,
    formatArrayValue,
    VSAddressList,
    VSInterfaceList,
    generateIPPool,
    VSPorfile,
    SubnetToRange,
} from "~/components/Star/ConfigGenerator";


export const L2tpServer = (config: L2tpServerConfig, vsNetwork: VSNetwork, subnetConfig: SubnetConfig): RouterConfig => {
    const routerConfig: RouterConfig = {
        "/ip pool": [],
        "/ppp profile": [],
        "/interface l2tp-server server": [],
        "/ip firewall filter": [],
        "/ip firewall address-list": [],
        "": [],
    };

    const {
        enabled,
        IPsec,
        Authentication,
        KeepaliveTimeout = 30,
        PacketSize,
        allowFastPath,
        maxSessions,
        OneSessionPerHost,
        acceptProtoVersion,
        callerIdType,
        L2TPV3,
    } = config;

    // Use provided subnet configuration
    const { subnet } = subnetConfig;
    const ranges = SubnetToRange(subnet);
    const name = "l2tp"; // L2TP server name

    // Generate IP pool for L2TP clients
    routerConfig["/ip pool"].push(
        ...generateIPPool({ name, ranges, comment: `L2TP ${name} client pool` })
    );

    // Create PPP profile using shared helper (profile name: `${name}-profile`)
    const profileCfg = VSPorfile(subnet, String(vsNetwork), name);
    Object.entries(profileCfg).forEach(([section, cmds]) => {
        routerConfig[section] = (routerConfig[section] ?? []).concat(cmds);
    });

    // Add VPN subnet to address list using shared helper
    const addrCfg = VSAddressList(subnet, String(vsNetwork), `${name} L2TP subnet`);
    Object.entries(addrCfg).forEach(([section, cmds]) => {
        routerConfig[section] = (routerConfig[section] ?? []).concat(cmds);
    });

    // Configure L2TP server
    const serverParams: string[] = [`enabled=${formatBooleanValue(enabled)}`];

    if (IPsec.UseIpsec) {
        serverParams.push(`use-ipsec=${IPsec.UseIpsec}`);
    }

    if (IPsec.IpsecSecret) {
        serverParams.push(`ipsec-secret="${IPsec.IpsecSecret}"`);
    }

    if (Authentication) {
        serverParams.push(`authentication=${formatArrayValue(Authentication)}`);
    }

    serverParams.push(`default-profile=${name}-profile`);

    if (KeepaliveTimeout) {
        serverParams.push(`keepalive-timeout=${KeepaliveTimeout}`);
    }

    if (PacketSize?.MaxMtu) {
        serverParams.push(`max-mtu=${PacketSize.MaxMtu}`);
    }

    if (PacketSize?.MaxMru) {
        serverParams.push(`max-mru=${PacketSize.MaxMru}`);
    }

    if (PacketSize?.mrru && PacketSize.mrru !== "disabled") {
        serverParams.push(`mrru=${PacketSize.mrru}`);
    }

    if (allowFastPath !== undefined) {
        serverParams.push(
            `allow-fast-path=${formatBooleanValue(allowFastPath)}`,
        );
    }

    if (maxSessions && maxSessions !== "unlimited") {
        serverParams.push(`max-sessions=${maxSessions}`);
    }

    if (OneSessionPerHost !== undefined) {
        serverParams.push(
            `one-session-per-host=${formatBooleanValue(OneSessionPerHost)}`,
        );
    }

    if (acceptProtoVersion) {
        serverParams.push(`accept-proto-version=${acceptProtoVersion}`);
    }

    if (callerIdType) {
        serverParams.push(`caller-id-type=${callerIdType}`);
    }

    if (L2TPV3.l2tpv3CircuitId) {
        serverParams.push(`l2tpv3-circuit-id=${L2TPV3.l2tpv3CircuitId}`);
    }

    if (L2TPV3.l2tpv3CookieLength !== undefined) {
        serverParams.push(
            `l2tpv3-cookie-length=${L2TPV3.l2tpv3CookieLength === 0 ? "0" : `${L2TPV3.l2tpv3CookieLength}-bytes`}`,
        );
    }

    if (L2TPV3.l2tpv3DigestHash) {
        serverParams.push(`l2tpv3-digest-hash=${L2TPV3.l2tpv3DigestHash}`);
    }

    routerConfig["/interface l2tp-server server"].push(
        `set ${serverParams.join(" ")}`,
    );

    return CommandShortner(routerConfig);
};

export const L2tpServerUsers = (serverConfig: L2tpServerConfig, users: VSCredentials[]): RouterConfig => {
    const config: RouterConfig = {
        "/ppp secret": [],
    };

    // Get the profile name from server config (matches the profile created in L2tpServer)
    const profileName = "l2tp-profile";

    // Filter users who have L2TP in their VPNType array
    const l2tpUsers = users.filter((user) => user.VPNType.includes("L2TP"));

    l2tpUsers.forEach((user) => {
        const secretParams: string[] = [
            `name="${user.Username}"`,
            `password="${user.Password}"`,
            `profile=${profileName}`,
            "service=l2tp",
        ];

        config["/ppp secret"].push(`add ${secretParams.join(" ")}`);
    });

    if (l2tpUsers.length === 0) {
        config["/ppp secret"].push("# No users configured for L2TP");
    }

    return CommandShortner(config);
};

export const L2TPVSBinding = (credentials: VSCredentials[], VSNetwork: VSNetwork): RouterConfig => {
    const config: RouterConfig = {
        "/interface l2tp-server": [],
        "/interface list member": [],
        "": [],
    };

    if (credentials.length === 0) {
        // config[""].push("# No credentials provided for VPN server binding");
        return config;
    }

    // Filter users for supported VPN types only
    const supportedVpnTypes = ["L2TP"];
    const filteredCredentials = credentials.filter((user) =>
        user.VPNType.some((vpnType) => supportedVpnTypes.includes(vpnType)),
    );

    if (filteredCredentials.length === 0) {
        // config[""].push(
        //     "# No users configured for supported VPN binding types (L2TP)",
        // );
        return config;
    }

    // Group users by VPN type
    const usersByVpnType: { [key: string]: VSCredentials[] } = {};

    filteredCredentials.forEach((user) => {
        user.VPNType.forEach((vpnType: string) => {
            if (supportedVpnTypes.includes(vpnType)) {
                if (!usersByVpnType[vpnType]) {
                    usersByVpnType[vpnType] = [];
                }
                usersByVpnType[vpnType].push(user);
            }
        });
    });

    // Keep track of created interfaces for interface list membership
    const createdInterfaces: string[] = [];

    // L2TP Static Interface Bindings
    if (usersByVpnType["L2TP"]) {
        // config[""].push("# L2TP Static Interface Bindings");
        // config[""].push(
        //     "# Creates static interface for each L2TP user for advanced firewall/queue rules",
        // );

        usersByVpnType["L2TP"].forEach((user) => {
            const staticBindingName = `l2tp-${user.Username}`;

            config["/interface l2tp-server"].push(
                `add name="${staticBindingName}" user="${user.Username}" comment="Static binding for ${user.Username}"`,
            );

            createdInterfaces.push(staticBindingName);
        });
        // config[""].push("");
    }

    // Add all created interfaces to LAN and VSNetwork-LAN interface lists using VSInterfaceList
    if (createdInterfaces.length > 0) {
        createdInterfaces.forEach((interfaceName) => {
            // Use VSInterfaceList helper to add interface to proper lists
            const interfaceListCfg = VSInterfaceList(
                interfaceName, 
                String(VSNetwork), 
                `VPN binding interface for ${interfaceName}`
            );
            
            // Merge the interface list configuration
            Object.entries(interfaceListCfg).forEach(([section, cmds]) => {
                config[section] = (config[section] ?? []).concat(cmds);
            });
        });
        // config[""].push("");
    }

    // Summary
    // Object.entries(usersByVpnType).forEach(([vpnType, users]) => {
    //     config[""].push(
    //         `# ${vpnType}: ${users.length} users - ${users.map((u) => u.Username).join(", ")}`,
    //     );
    // });

    // if (createdInterfaces.length > 0) {
    //     config[""].push("");
    // }

    return config;
};

export const L2TPServerFirewall = (serverConfigs: L2tpServerConfig[]): RouterConfig => {
    const config: RouterConfig = {
        "/ip firewall filter": [],
        "/ip firewall mangle": [],
    };

    serverConfigs.forEach((serverConfig) => {
        const { IPsec } = serverConfig;

        config["/ip firewall filter"].push(
            `add action=accept chain=input comment="L2TP Server (udp)" dst-port=1701 in-interface-list=Domestic-WAN protocol=udp`,
        );

        config["/ip firewall mangle"].push(
            `add action=mark-connection chain=input comment="Mark Inbound L2TP Connections" \\
                connection-state=new in-interface-list=Domestic-WAN protocol=udp dst-port=1701 \\
                new-connection-mark=conn-vpn-server passthrough=yes`,
        );

        // Add IPsec firewall rules if IPsec is enabled
        if (IPsec.UseIpsec !== "no") {
            config["/ip firewall filter"].push(
                `add action=accept chain=input comment="L2TP IPsec ESP" in-interface-list=Domestic-WAN protocol=ipsec-esp`,
                `add action=accept chain=input comment="L2TP IPsec AH" in-interface-list=Domestic-WAN protocol=ipsec-ah`,
                `add action=accept chain=input comment="L2TP IPsec UDP 500" dst-port=500 in-interface-list=Domestic-WAN protocol=udp`,
                `add action=accept chain=input comment="L2TP IPsec UDP 4500" dst-port=4500 in-interface-list=Domestic-WAN protocol=udp`,
            );
        }
    });

    return config;
}

export const L2tpServerWrapper = ( serverConfig: L2tpServerConfig, users: VSCredentials[] = [], subnetConfig?: SubnetConfig ): RouterConfig => {
    const configs: RouterConfig[] = [];

    // Get VSNetwork from server config or default to "VPN"
    const vsNetwork: VSNetwork = serverConfig.VSNetwork || "VPN";

    // Fallback to default subnet if no match found
    const effectiveSubnet: SubnetConfig = subnetConfig || {
        name: "l2tp",
        subnet: "192.168.80.0/24", // Default L2TP network
    };

    // Generate L2TP server configuration
    configs.push(L2tpServer(serverConfig, vsNetwork, effectiveSubnet));

    // Generate L2TP users configuration if users are provided
    if (users.length > 0) {
        configs.push(L2tpServerUsers(serverConfig, users));
    }

    // Generate firewall rules
    configs.push(L2TPServerFirewall([serverConfig]));

    // Merge configurations
    const finalConfig = mergeRouterConfigs(...configs);

    return CommandShortner(finalConfig);
};
