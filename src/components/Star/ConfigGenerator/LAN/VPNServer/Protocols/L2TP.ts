import type { L2tpServerConfig, VSCredentials } from "~/components/Star/StarContext";
import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import { formatBooleanValue, formatArrayValue } from "~/components/Star/ConfigGenerator";
import { CommandShortner, mergeRouterConfigs } from "~/components/Star/ConfigGenerator";


export const L2tpServer = (config: L2tpServerConfig): RouterConfig => {
    const routerConfig: RouterConfig = {
        "/ip pool": [],
        "/ppp profile": [],
        "/interface l2tp-server server": [],
        "/ip firewall filter": [],
        "/ip firewall address-list": [],
    };

    const {
        enabled,
        IPsec,
        Authentication,
        DefaultProfile = "l2tp-profile",
        KeepaliveTimeout = 30,
        PacketSize,
        allowFastPath,
        maxSessions,
        OneSessionPerHost,
        acceptProtoVersion,
        callerIdType,
        L2TPV3,
    } = config;

    // Create IP pool for L2TP clients
    routerConfig["/ip pool"].push(
        `add name=l2tp-pool ranges=192.168.80.5-192.168.80.250`,
    );

    // Create PPP profile for L2TP
    const profileParams: string[] = [
        `name=l2tp-profile`,
        "dns-server=1.1.1.1",
        "local-address=192.168.80.1",
        "remote-address=l2tp-pool",
        "use-encryption=yes",
    ];

    routerConfig["/ppp profile"].push(`add ${profileParams.join(" ")}`);

    // Configure L2TP server
    const serverParams: string[] = [`enabled=${formatBooleanValue(enabled)}`];

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

    // Add firewall rules for L2TP
    routerConfig["/ip firewall filter"].push(
        `add action=accept chain=input comment="L2TP Server" dst-port=1701 in-interface-list=DOM-WAN protocol=udp`,
    );

    // Add IPsec firewall rules if IPsec is enabled
    if (IPsec.UseIpsec !== "no") {
        routerConfig["/ip firewall filter"].push(
            `add action=accept chain=input comment="L2TP IPsec ESP" in-interface-list=DOM-WAN protocol=ipsec-esp`,
            `add action=accept chain=input comment="L2TP IPsec AH" in-interface-list=DOM-WAN protocol=ipsec-ah`,
            `add action=accept chain=input comment="L2TP IPsec UDP 500" dst-port=500 in-interface-list=DOM-WAN protocol=udp`,
            `add action=accept chain=input comment="L2TP IPsec UDP 4500" dst-port=4500 in-interface-list=DOM-WAN protocol=udp`,
        );
    }

    // Add address list for L2TP network
    routerConfig["/ip firewall address-list"].push(
        "add address=192.168.80.0/24 list=VPN-LAN",
    );

    return CommandShortner(routerConfig);
};

export const L2tpServerUsers = (users: VSCredentials[]): RouterConfig => {
    const config: RouterConfig = {
        "/ppp secret": [],
    };

    // Filter users who have L2TP in their VPNType array
    const l2tpUsers = users.filter((user) => user.VPNType.includes("L2TP"));

    l2tpUsers.forEach((user) => {
        const secretParams: string[] = [
            `name="${user.Username}"`,
            `password="${user.Password}"`,
            "profile=l2tp-profile",
            "service=l2tp",
        ];

        config["/ppp secret"].push(`add ${secretParams.join(" ")}`);
    });

    if (l2tpUsers.length === 0) {
        config["/ppp secret"].push("# No users configured for L2TP");
    }

    return CommandShortner(config);
};

export const L2TPVSBinding = (credentials: VSCredentials[]): RouterConfig => {
    const config: RouterConfig = {
        "/interface l2tp-server": [],
        "/interface pptp-server": [],
        "/interface sstp-server": [],
        "/interface ovpn-server": [],
        "/interface list member": [],
        "": [],
    };

    if (!credentials || credentials.length === 0) {
        config[""].push("# No credentials provided for VPN server binding");
        return config;
    }

    // Filter users for supported VPN types only
    const supportedVpnTypes = ["L2TP", "PPTP", "SSTP", "OpenVPN"];
    const filteredCredentials = credentials.filter((user) =>
        user.VPNType.some((vpnType) => supportedVpnTypes.includes(vpnType)),
    );

    if (filteredCredentials.length === 0) {
        config[""].push(
            "# No users configured for supported VPN binding types (L2TP, PPTP, SSTP, OpenVPN)",
        );
        return config;
    }

    // Group users by VPN type
    const usersByVpnType: { [key: string]: Credentials[] } = {};

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

    // Add general comments
    config[""].push(
        "# VPN Server Binding Configuration",
        `# Total users: ${filteredCredentials.length}`,
        `# Supported VPN types: ${Object.keys(usersByVpnType).join(", ")}`,
        "# Each binding interface is added to LAN and VPN-LAN interface lists for proper network management",
        "",
    );

    // Keep track of created interfaces for interface list membership
    const createdInterfaces: string[] = [];

    // L2TP Static Interface Bindings
    if (usersByVpnType["L2TP"]) {
        config[""].push("# L2TP Static Interface Bindings");
        config[""].push(
            "# Creates static interface for each L2TP user for advanced firewall/queue rules",
        );

        usersByVpnType["L2TP"].forEach((user) => {
            const staticBindingName = `l2tp-${user.Username}`;

            config["/interface l2tp-server"].push(
                `add name="${staticBindingName}" user="${user.Username}" comment="Static binding for ${user.Username}"`,
            );

            createdInterfaces.push(staticBindingName);
        });
        config[""].push("");
    }

    // PPTP Static Interface Bindings
    if (usersByVpnType["PPTP"]) {
        config[""].push("# PPTP Static Interface Bindings");
        config[""].push(
            "# Creates static interface for each PPTP user for advanced firewall/queue rules",
        );

        usersByVpnType["PPTP"].forEach((user) => {
            const staticBindingName = `pptp-${user.Username}`;

            config["/interface pptp-server"].push(
                `add name="${staticBindingName}" user="${user.Username}" comment="Static binding for ${user.Username}"`,
            );

            createdInterfaces.push(staticBindingName);
        });
        config[""].push("");
    }

    // SSTP Static Interface Bindings
    if (usersByVpnType["SSTP"]) {
        config[""].push("# SSTP Static Interface Bindings");
        config[""].push(
            "# Creates static interface for each SSTP user for advanced firewall/queue rules",
        );

        usersByVpnType["SSTP"].forEach((user) => {
            const staticBindingName = `sstp-${user.Username}`;

            config["/interface sstp-server"].push(
                `add name="${staticBindingName}" user="${user.Username}" comment="Static binding for ${user.Username}"`,
            );

            createdInterfaces.push(staticBindingName);
        });
        config[""].push("");
    }

    // OpenVPN Static Interface Bindings
    if (usersByVpnType["OpenVPN"]) {
        config[""].push("# OpenVPN Static Interface Bindings");
        config[""].push(
            "# Creates static interface for each OpenVPN user for advanced firewall/queue rules",
        );

        usersByVpnType["OpenVPN"].forEach((user) => {
            const staticBindingName = `ovpn-${user.Username}`;

            config["/interface ovpn-server"].push(
                `add name="${staticBindingName}" user="${user.Username}" comment="Static binding for ${user.Username}"`,
            );

            createdInterfaces.push(staticBindingName);
        });
        config[""].push("");
    }

    // Add all created interfaces to LAN and VPN-LAN interface lists
    if (createdInterfaces.length > 0) {
        config[""].push("# Adding VPN binding interfaces to interface lists");
        config[""].push(
            "# This enables proper network segmentation and management",
        );

        createdInterfaces.forEach((interfaceName) => {
            // Add to LAN interface list
            config["/interface list member"].push(
                `add interface="${interfaceName}" list="LAN" comment="VPN binding interface for network management"`,
            );

            // Add to VPN-LAN interface list
            config["/interface list member"].push(
                `add interface="${interfaceName}" list="VPN-LAN" comment="VPN binding interface for VPN-specific rules"`,
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
    config[""].push("# 5. Proper network segmentation through interface lists");
    config[""].push("# 6. Simplified management via LAN and VPN-LAN lists");
    config[""].push("");
    config[""].push(
        "# Note: Users must still be configured in /ppp secret for authentication",
    );
    config[""].push("");

    // Summary
    config[""].push("# VPN Server Binding Summary:");
    Object.entries(usersByVpnType).forEach(([vpnType, users]) => {
        config[""].push(
            `# ${vpnType}: ${users.length} users - ${users.map((u) => u.Username).join(", ")}`,
        );
    });

    if (createdInterfaces.length > 0) {
        config[""].push("");
        config[""].push("# Interface List Memberships:");
        config[""].push(
            `# ${createdInterfaces.length} interfaces added to both LAN and VPN-LAN lists`,
        );
        config[""].push(`# Interface names: ${createdInterfaces.join(", ")}`);
    }

    return config;
};

export const L2tpServerWrapper = ( serverConfig: L2tpServerConfig, users: VSCredentials[] = [] ): RouterConfig => {
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

    const l2tpUsers = users.filter((user) => user.VPNType.includes("L2TP"));

    finalConfig[""].unshift(
        "# L2TP Server Configuration Summary:",
        `# Enabled: ${serverConfig.enabled}`,
        `# IPsec: ${serverConfig.IPsec.UseIpsec}`,
        `# Default Profile: ${serverConfig.DefaultProfile || "l2tp-profile"}`,
        `# Users: ${l2tpUsers.length}`,
        "",
    );

    return CommandShortner(finalConfig);
};





