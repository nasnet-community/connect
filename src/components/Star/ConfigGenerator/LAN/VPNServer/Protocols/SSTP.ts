import type { SstpServerConfig } from "../../../../StarContext/Utils/VPNServerType";
import type { RouterConfig } from "../../../ConfigGenerator";
import { formatBooleanValue, formatArrayValue } from "../VPNServerUtil";
import { CommandShortner, mergeRouterConfigs } from "../../../utils/ConfigGeneratorUtil";
import type { Credentials } from "../../../../StarContext/Utils/VPNServerType";




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

export const SstpServerUsers = (users: Credentials[]): RouterConfig => {
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

export const SstpServerWrapper = ( serverConfig: SstpServerConfig, users: Credentials[] = [] ): RouterConfig => {
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

