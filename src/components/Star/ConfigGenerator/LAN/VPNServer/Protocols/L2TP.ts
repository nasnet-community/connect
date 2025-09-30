import type { L2tpServerConfig } from "../../../../StarContext/Utils/VPNServerType";
import type { RouterConfig } from "../../../ConfigGenerator";
import { formatBooleanValue, formatArrayValue } from "../VPNServerUtil";
import { CommandShortner, mergeRouterConfigs } from "../../../utils/ConfigGeneratorUtil";
import type { Credentials } from "../../../../StarContext/Utils/VPNServerType";


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

export const L2tpServerUsers = (users: Credentials[]): RouterConfig => {
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

export const L2tpServerWrapper = ( serverConfig: L2tpServerConfig, users: Credentials[] = [] ): RouterConfig => {
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





