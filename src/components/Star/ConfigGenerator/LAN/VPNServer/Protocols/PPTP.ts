import type { PptpServerConfig, SubnetConfig, VSCredentials, VSNetwork } from "~/components/Star/StarContext";
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


export const PptpServer = (config: PptpServerConfig, vsNetwork: VSNetwork, subnetConfig: SubnetConfig): RouterConfig => {
    const routerConfig: RouterConfig = {
        "/ip pool": [],
        "/ppp profile": [],
        "/interface pptp-server server": [],
        "/ip firewall filter": [],
        "/ip firewall address-list": [],
        "": [],
    };

    const {
        enabled,
        Authentication,
        KeepaliveTimeout = 30,
        PacketSize,
    } = config;

    // Use provided subnet configuration
    const { subnet } = subnetConfig;
    const ranges = SubnetToRange(subnet);
    const name = "pptp"; // PPTP server name

    // Generate IP pool for PPTP clients
    routerConfig["/ip pool"].push(
        ...generateIPPool({ name, ranges, comment: `PPTP ${name} client pool` })
    );

    // Create PPP profile using shared helper (profile name: `${name}-profile`)
    const profileCfg = VSPorfile(subnet, String(vsNetwork), name);
    Object.entries(profileCfg).forEach(([section, cmds]) => {
        routerConfig[section] = (routerConfig[section] ?? []).concat(cmds);
    });

    // Add VPN subnet to address list using shared helper
    const addrCfg = VSAddressList(subnet, String(vsNetwork), `${name} PPTP subnet`);
    Object.entries(addrCfg).forEach(([section, cmds]) => {
        routerConfig[section] = (routerConfig[section] ?? []).concat(cmds);
    });

    // Configure PPTP server
    const serverParams: string[] = [`enabled=${formatBooleanValue(enabled)}`];

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

    routerConfig["/interface pptp-server server"].push(
        `set ${serverParams.join(" ")}`,
    );

    return CommandShortner(routerConfig);
};

export const PptpServerUsers = (serverConfig: PptpServerConfig, users: VSCredentials[]): RouterConfig => {
    const config: RouterConfig = {
        "/ppp secret": [],
    };

    // Get the profile name from server config (matches the profile created in PptpServer)
    const profileName = "pptp-profile";

    // Filter users who have PPTP in their VPNType array
    const pptpUsers = users.filter((user) => user.VPNType.includes("PPTP"));

    pptpUsers.forEach((user) => {
        const secretParams: string[] = [
            `name="${user.Username}"`,
            `password="${user.Password}"`,
            `profile=${profileName}`,
            "service=pptp",
        ];

        config["/ppp secret"].push(`add ${secretParams.join(" ")}`);
    });

    if (pptpUsers.length === 0) {
        config["/ppp secret"].push("# No users configured for PPTP");
    }

    return CommandShortner(config);
};

export const PPTPVSBinding = (credentials: VSCredentials[], VSNetwork: VSNetwork): RouterConfig => {
    const config: RouterConfig = {
        "/interface pptp-server": [],
        "/interface list member": [],
        "": [],
    };

    if (!credentials || credentials.length === 0) {
        // config[""].push("# No credentials provided for VPN server binding");
        return config;
    }

    // Filter users for supported VPN types only
    const supportedVpnTypes = ["PPTP"];
    const filteredCredentials = credentials.filter((user) =>
        user.VPNType.some((vpnType) => supportedVpnTypes.includes(vpnType)),
    );

    if (filteredCredentials.length === 0) {
        // config[""].push(
        //     "# No users configured for supported VPN binding types (PPTP)",
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

    // PPTP Static Interface Bindings
    if (usersByVpnType["PPTP"]) {
        // config[""].push("# PPTP Static Interface Bindings");
        // config[""].push(
        //     "# Creates static interface for each PPTP user for advanced firewall/queue rules",
        // );

        usersByVpnType["PPTP"].forEach((user) => {
            const staticBindingName = `pptp-${user.Username}`;

            config["/interface pptp-server"].push(
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

export const PPTPServerFirewall = (serverConfigs: PptpServerConfig[]): RouterConfig => {
    const config: RouterConfig = {
        "/ip firewall filter": [],
        "/ip firewall mangle": [],
    };

    serverConfigs.forEach(() => {
        config["/ip firewall filter"].push(
            `add action=accept chain=input comment="PPTP Server (tcp)" dst-port=1723 in-interface-list=Domestic-WAN protocol=tcp`,
        );

        config["/ip firewall mangle"].push(
            `add action=mark-connection chain=input comment="Mark Inbound PPTP Connections" \\
                connection-state=new in-interface-list=Domestic-WAN protocol=tcp dst-port=1723 \\
                new-connection-mark=conn-vpn-server passthrough=yes`,
        );
    });

    return config;
}

export const PptpServerWrapper = (serverConfig: PptpServerConfig, users: VSCredentials[] = [], subnetConfig?: SubnetConfig): RouterConfig => {
    const configs: RouterConfig[] = [];

    // Get VSNetwork from server config or default to "VPN"
    const vsNetwork: VSNetwork = serverConfig.VSNetwork || "VPN";

    // Fallback to default subnet if no match found
    const effectiveSubnet: SubnetConfig = subnetConfig || {
        name: "pptp",
        subnet: "192.168.70.0/24", // Default PPTP network
    };

    // Generate PPTP server configuration
    configs.push(PptpServer(serverConfig, vsNetwork, effectiveSubnet));

    // Generate PPTP users configuration if users are provided
    if (users.length > 0) {
        configs.push(PptpServerUsers(serverConfig, users));
    }

    // Generate firewall rules
    configs.push(PPTPServerFirewall([serverConfig]));

    // Merge configurations
    const finalConfig = mergeRouterConfigs(...configs);

    // Add summary comments
    if (!finalConfig[""]) {
        finalConfig[""] = [];
    }

    return CommandShortner(finalConfig);
};





    // // Check for PPTP Server
    // if (vpnServer.PptpServer) {
    //     config["/ip firewall mangle"].push(
    //         `add action=mark-connection chain=input comment="Mark Inbound PPTP Connections" \\
    //             connection-state=new in-interface-list=${interfaceList} protocol=tcp dst-port=1723 \\
    //             new-connection-mark=conn-vpn-server passthrough=yes`,
    //     );
    // }

