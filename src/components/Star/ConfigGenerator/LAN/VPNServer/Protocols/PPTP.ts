import type { PptpServerConfig } from "../../../../StarContext/Utils/VPNServerType";
import type { RouterConfig } from "../../../ConfigGenerator";
import { formatBooleanValue, formatArrayValue } from "../VPNServerUtil";
import { CommandShortner, mergeRouterConfigs } from "../../../utils/ConfigGeneratorUtil";
import type { Credentials } from "../../../../StarContext/Utils/VPNServerType";


export const PptpServer = (config: PptpServerConfig): RouterConfig => {
    const routerConfig: RouterConfig = {
        "/ip pool": [],
        "/ppp profile": [],
        "/interface pptp-server server": [],
        "/ip firewall filter": [],
        "/ip firewall address-list": [],
    };

    const {
        enabled,
        Authentication,
        DefaultProfile = "pptp-profile",
        KeepaliveTimeout = 30,
        PacketSize,
    } = config;

    // Create IP pool for PPTP clients
    routerConfig["/ip pool"].push(
        `add name=pptp-pool ranges=192.168.70.5-192.168.70.250`,
    );

    // Create PPP profile for PPTP
    const profileParams: string[] = [
        `name=pptp-profile`,
        "dns-server=1.1.1.1",
        "local-address=192.168.70.1",
        "remote-address=pptp-pool",
        "use-encryption=yes",
    ];

    routerConfig["/ppp profile"].push(`add ${profileParams.join(" ")}`);

    // Configure PPTP server
    const serverParams: string[] = [`enabled=${formatBooleanValue(enabled)}`];

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

    if (PacketSize?.mrru && PacketSize.mrru !== "disabled") {
        serverParams.push(`mrru=${PacketSize.mrru}`);
    }

    routerConfig["/interface pptp-server server"].push(
        `set ${serverParams.join(" ")}`,
    );

    // Add firewall rule for PPTP
    routerConfig["/ip firewall filter"].push(
        `add action=accept chain=input comment="PPTP Server" dst-port=1723 in-interface-list=DOM-WAN protocol=tcp`,
    );

    // Add address list for PPTP network
    routerConfig["/ip firewall address-list"].push(
        "add address=192.168.70.0/24 list=VPN-LAN",
    );

    return CommandShortner(routerConfig);
};

export const PptpServerUsers = (users: Credentials[]): RouterConfig => {
    const config: RouterConfig = {
        "/ppp secret": [],
    };

    // Filter users who have PPTP in their VPNType array
    const pptpUsers = users.filter((user) => user.VPNType.includes("PPTP"));

    pptpUsers.forEach((user) => {
        const secretParams: string[] = [
            `name="${user.Username}"`,
            `password="${user.Password}"`,
            "profile=pptp-profile",
            "service=pptp",
        ];

        config["/ppp secret"].push(`add ${secretParams.join(" ")}`);
    });

    if (pptpUsers.length === 0) {
        config["/ppp secret"].push("# No users configured for PPTP");
    }

    return CommandShortner(config);
};

export const PptpServerWrapper = ( serverConfig: PptpServerConfig, users: Credentials[] = [] ): RouterConfig => {
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

    const pptpUsers = users.filter((user) => user.VPNType.includes("PPTP"));

    finalConfig[""].unshift(
        "# PPTP Server Configuration Summary:",
        `# Enabled: ${serverConfig.enabled}`,
        `# Default Profile: ${serverConfig.DefaultProfile || "pptp-profile"}`,
        `# Users: ${pptpUsers.length}`,
        "",
    );

    return CommandShortner(finalConfig);
};

