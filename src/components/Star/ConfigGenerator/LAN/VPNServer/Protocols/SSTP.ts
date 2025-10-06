import type { SstpServerConfig, VSCredentials } from "~/components/Star/StarContext";
import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import { formatBooleanValue, formatArrayValue } from "~/components/Star/ConfigGenerator";
import { CommandShortner, mergeRouterConfigs } from "~/components/Star/ConfigGenerator";




export const SstpServer = (config: SstpServerConfig): RouterConfig => {
    const routerConfig: RouterConfig = {
        "/ip pool": [],
        "/ppp profile": [],
        "/interface sstp-server server": [],
        "/ip firewall filter": [],
        "/ip firewall address-list": [],
    };

    const {
        enabled,
        // Certificate,
        Port = 4443,
        Authentication,
        DefaultProfile = "sstp-profile",
        KeepaliveTimeout = 30,
        PacketSize,
        // ForceAes,
        Pfs,
        Ciphers,
        VerifyClientCertificate,
        TlsVersion,
    } = config;

    // Create IP pool for SSTP clients
    routerConfig["/ip pool"].push(
        `add name=sstp-pool ranges=192.168.90.5-192.168.90.250`,
    );

    // Create PPP profile for SSTP
    const profileParams: string[] = [
        `name=sstp-profile`,
        "dns-server=1.1.1.1",
        "local-address=192.168.90.1",
        "remote-address=sstp-pool",
        "use-encryption=yes",
    ];

    routerConfig["/ppp profile"].push(`add ${profileParams.join(" ")}`);

    // Configure SSTP server
    const serverParams: string[] = [`enabled=${formatBooleanValue(enabled)}`];

    // if (Certificate) {
    //     serverParams.push(`certificate=${Certificate}`);

    //     if (Certificate === 'none') {
    //         routerConfig["/interface sstp-server server"].push(
    //             "# WARNING: SSTP server configured with certificate=none is insecure and incompatible with Windows clients."
    //         );
    //     }
    // }

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

    if (PacketSize?.mrru && PacketSize.mrru !== "disabled") {
        serverParams.push(`mrru=${PacketSize.mrru}`);
    }

    // if (ForceAes !== undefined) {
    //     serverParams.push(`force-aes=${formatBooleanValue(ForceAes)}`);
    // }

    if (Pfs !== undefined) {
        serverParams.push(`pfs=${formatBooleanValue(Pfs)}`);
    }

    if (Ciphers) {
        serverParams.push(`ciphers=${Ciphers}`);
    }

    if (VerifyClientCertificate !== undefined) {
        serverParams.push(
            `verify-client-certificate=${formatBooleanValue(VerifyClientCertificate)}`,
        );

        if (VerifyClientCertificate) {
            routerConfig["/interface sstp-server server"].push(
                "# WARNING: SSTP verify-client-certificate=yes is incompatible with Windows clients.",
            );
        }
    }

    if (TlsVersion) {
        serverParams.push(`tls-version=${TlsVersion}`);
    }

    routerConfig["/interface sstp-server server"].push(
        `set ${serverParams.join(" ")}`,
    );

    // Add firewall rule for SSTP
    routerConfig["/ip firewall filter"].push(
        `add action=accept chain=input comment="SSTP Server" dst-port=${Port} in-interface-list=DOM-WAN protocol=tcp`,
    );

    // Add address list for SSTP network
    routerConfig["/ip firewall address-list"].push(
        "add address=192.168.90.0/24 list=VPN-LAN",
    );

    return CommandShortner(routerConfig);
};

export const SstpServerUsers = (users: VSCredentials[]): RouterConfig => {
    const config: RouterConfig = {
        "/ppp secret": [],
    };

    // Filter users who have SSTP in their VPNType array
    const sstpUsers = users.filter((user) => user.VPNType.includes("SSTP"));

    sstpUsers.forEach((user) => {
        const secretParams: string[] = [
            `name="${user.Username}"`,
            `password="${user.Password}"`,
            "profile=sstp-profile",
            "service=sstp",
        ];

        config["/ppp secret"].push(`add ${secretParams.join(" ")}`);
    });

    if (sstpUsers.length === 0) {
        config["/ppp secret"].push("# No users configured for SSTP");
    }

    return CommandShortner(config);
};

export const SSTPVSBinding = (credentials: VSCredentials[]): RouterConfig => {
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

export const SstpServerWrapper = ( serverConfig: SstpServerConfig, users: VSCredentials[] = [] ): RouterConfig => {
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

    const sstpUsers = users.filter((user) => user.VPNType.includes("SSTP"));

    finalConfig[""].unshift(
        "# SSTP Server Configuration Summary:",
        `# Enabled: ${serverConfig.enabled}`,
        `# Certificate: ${serverConfig.Certificate}`,
        `# Port: ${serverConfig.Port || 4443}`,
        `# Default Profile: ${serverConfig.DefaultProfile || "sstp-profile"}`,
        `# Users: ${sstpUsers.length}`,
        "",
    );

    return CommandShortner(finalConfig);
};

