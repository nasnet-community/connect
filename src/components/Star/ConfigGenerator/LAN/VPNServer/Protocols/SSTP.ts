import type { SstpServerConfig, SubnetConfig, VSCredentials, VSNetwork } from "~/components/Star/StarContext";
import {
    type RouterConfig,
    CommandShortner,
    mergeRouterConfigs,
    formatBooleanValue,
    VSAddressList,
    VSInterfaceList,
    generateIPPool,
    VSPorfile,
    SubnetToRange,
} from "~/components/Star/ConfigGenerator";




export const SstpServer = (config: SstpServerConfig, vsNetwork: VSNetwork, subnetConfig: SubnetConfig): RouterConfig => {
    const routerConfig: RouterConfig = {
        "/ip pool": [],
        "/ppp profile": [],
        "/interface sstp-server server": [],
        "/ip firewall filter": [],
        "/ip firewall address-list": [],
        "": [],
    };

    const {
        enabled,
        // Certificate,
        Port = 4443,
        Authentication,
        KeepaliveTimeout = 30,
        PacketSize,
        // ForceAes,
        Pfs,
        Ciphers,
        VerifyClientCertificate,
        TlsVersion,
    } = config;

    // Use provided subnet configuration
    const { subnet } = subnetConfig;
    const ranges = SubnetToRange(subnet);
    const name = "sstp"; // SSTP server name

    // Generate IP pool for SSTP clients
    routerConfig["/ip pool"].push(
        ...generateIPPool({ name, ranges, comment: `SSTP ${name} client pool` })
    );

    // Create PPP profile using shared helper (profile name: `${name}-profile`)
    const profileCfg = VSPorfile(subnet, String(vsNetwork), name);
    Object.entries(profileCfg).forEach(([section, cmds]) => {
        routerConfig[section] = (routerConfig[section] ?? []).concat(cmds);
    });

    // Add VPN subnet to address list using shared helper
    const addrCfg = VSAddressList(subnet, String(vsNetwork), `${name} SSTP subnet`);
    Object.entries(addrCfg).forEach(([section, cmds]) => {
        routerConfig[section] = (routerConfig[section] ?? []).concat(cmds);
    });

    // Configure SSTP server
    const serverParams: string[] = [`enabled=${formatBooleanValue(enabled)}`];


    if (Port) {
        serverParams.push(`port=${Port}`);
    }

    if (Authentication) {
        serverParams.push(`authentication=mschap1,mschap2`);
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

    if (Pfs !== undefined) {
        serverParams.push(`pfs=${formatBooleanValue(Pfs)}`);
    }

    if (Ciphers) {
        serverParams.push(`ciphers=ciphers=aes256-sha,aes256-gcm-sha384`);
    }

    if (VerifyClientCertificate !== undefined) {
        serverParams.push(
            `verify-client-certificate=no`,
        );

    }

    if (TlsVersion) {
        serverParams.push(`tls-version=any`);
    }

    routerConfig["/interface sstp-server server"].push(
        `set ${serverParams.join(" ")}`,
    );

    return CommandShortner(routerConfig);
};

export const SstpServerUsers = (serverConfig: SstpServerConfig, users: VSCredentials[]): RouterConfig => {
    const config: RouterConfig = {
        "/ppp secret": [],
    };

    // Get the profile name from server config (matches the profile created in SstpServer)
    const profileName = "sstp-profile";

    // Filter users who have SSTP in their VPNType array
    const sstpUsers = users.filter((user) => user.VPNType.includes("SSTP"));

    sstpUsers.forEach((user) => {
        const secretParams: string[] = [
            `name="${user.Username}"`,
            `password="${user.Password}"`,
            `profile=${profileName}`,
            "service=sstp",
        ];

        config["/ppp secret"].push(`add ${secretParams.join(" ")}`);
    });

    if (sstpUsers.length === 0) {
        config["/ppp secret"].push("# No users configured for SSTP");
    }

    return CommandShortner(config);
};

export const SSTPVSBinding = (credentials: VSCredentials[], VSNetwork: VSNetwork): RouterConfig => {
    const config: RouterConfig = {
        "/interface sstp-server": [],
        "/interface list member": [],
        "": [],
    };

    if (!credentials || credentials.length === 0) {
        // config[""].push("# No credentials provided for VPN server binding");
        return config;
    }

    // Filter users for supported VPN types only
    const supportedVpnTypes = ["SSTP"];
    const filteredCredentials = credentials.filter((user) =>
        user.VPNType.some((vpnType) => supportedVpnTypes.includes(vpnType)),
    );

    if (filteredCredentials.length === 0) {
        // config[""].push(
        //     "# No users configured for supported VPN binding types (SSTP)",
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

    // SSTP Static Interface Bindings
    if (usersByVpnType["SSTP"]) {
        // config[""].push("# SSTP Static Interface Bindings");
        // config[""].push(
        //     "# Creates static interface for each SSTP user for advanced firewall/queue rules",
        // );

        usersByVpnType["SSTP"].forEach((user) => {
            const staticBindingName = `sstp-${user.Username}`;

            config["/interface sstp-server"].push(
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

export const SSTPServerFirewall = (serverConfigs: SstpServerConfig[]): RouterConfig => {
    const config: RouterConfig = {
        "/ip firewall filter": [],
        "/ip firewall mangle": [],
    };

    serverConfigs.forEach((serverConfig) => {
        const { Port = 4443 } = serverConfig;

        config["/ip firewall filter"].push(
            `add action=accept chain=input comment="SSTP Server (tcp)" dst-port=${Port} in-interface-list=Domestic-WAN protocol=tcp`,
        );

        config["/ip firewall mangle"].push(
            `add action=mark-connection chain=input comment="Mark Inbound SSTP Connections" \\
                connection-state=new in-interface-list=Domestic-WAN protocol=tcp dst-port=${Port} \\
                new-connection-mark=conn-vpn-server passthrough=yes`,
        );
    });

    return config;
}

export const SstpServerWrapper = ( serverConfig: SstpServerConfig, users: VSCredentials[] = [], subnetConfig?: SubnetConfig ): RouterConfig => {
    const configs: RouterConfig[] = [];

    // Get VSNetwork from server config or default to "VPN"
    const vsNetwork: VSNetwork = serverConfig.VSNetwork || "VPN";

    // Fallback to default subnet if no match found
    const effectiveSubnet: SubnetConfig = subnetConfig || {
        name: "sstp",
        subnet: "192.168.90.0/24", // Default SSTP network
    };

    // Generate SSTP server configuration
    configs.push(SstpServer(serverConfig, vsNetwork, effectiveSubnet));

    // Generate SSTP users configuration if users are provided
    if (users.length > 0) {
        configs.push(SstpServerUsers(serverConfig, users));
    }

    // Generate firewall rules
    configs.push(SSTPServerFirewall([serverConfig]));

    // Merge configurations
    const finalConfig = mergeRouterConfigs(...configs);

    // Add summary comments
    if (!finalConfig[""]) {
        finalConfig[""] = [];
    }

    return CommandShortner(finalConfig);
};


