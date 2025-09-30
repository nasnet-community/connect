import { generateDomesticIPScript } from "./DomesticIPS";
import type { RouterConfig } from "../ConfigGenerator";
import type {
    IntervalConfig,
    CertificateConfig,
    NTPConfig,
    GraphingConfig,
    DDNSEntry,
    UPNPConfig,
    NATPMPConfig,
} from "~/components/Star/StarContext/ExtraType";
import { mergeMultipleConfigs } from "../utils/ConfigGeneratorUtil";
// import { OneTimeScript, ScriptAndScheduler } from "../utils/ScriptSchedule";
import type { WANLinkType } from "~/components/Star/StarContext/ChooseType";
import { LetsEncrypt, PrivateCert, ExportCert } from "../utils/Certificate";
import type { Subnets } from "../../StarContext/LANType";
import { GetNetworks } from "../utils/utils";
// import { GetWANInterfaceWName, GetWANInterfaces } from "../WAN/WAN/WANUtils";
import type { WANLinks } from "~/components/Star/StarContext/WANType";

// Base Extra Utils
export const Clock = (): RouterConfig => {
    const config: RouterConfig = {
        "/system clock": [
            `set date=${new Date()
                .toLocaleString("en", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                })
                .replace(/,\s|\s/g, "/")
                .replace(/\/\//g, "/")}`,
        ],
    };

    return config;
};

export const update = (): RouterConfig => {
    const config: RouterConfig = {
        "/system package update": ["set channel=stable"],
        "/system routerboard settings": ["set auto-upgrade=yes"],
    };

    return config;
};

export const CloudDDNS = (WANLinkType: WANLinkType): RouterConfig => {
    const config: RouterConfig = {
        "/ip cloud": ["set ddns-enabled=yes ddns-update-interval=1m"],
    };

    if (WANLinkType == "domestic" || WANLinkType == "both") {
        config["/ip cloud"] = ["set ddns-enabled=yes ddns-update-interval=1m"];
        config["/ip firewall address-list"] = [
            `add list=MikroTik-Cloud-Services address=cloud2.mikrotik.com \\
        comment="Dynamic list for MikroTik Cloud DDNS"`,
            `add list=MikroTik-Cloud-Services address=cloud.mikrotik.com \\
        comment="Legacy endpoint for completeness"`,
        ];
        config["/ip firewall mangle"] = [
            `add action=mark-routing chain=output dst-address-list=MikroTik-Cloud-Services \\
        new-routing-mark=to-DOM passthrough=no \\
        comment="Force IP/Cloud DDNS traffic via Domestic WAN"`,
            `add action=mark-routing chain=output dst-address-list=MikroTik-Cloud-Services \\
        protocol=udp dst-port=15252 new-routing-mark=to-DOM passthrough=no \\
        comment="Force IP/Cloud DDNS traffic via Domestic WAN"`,
        ];
    }
    return config;
};

// RUI Utils
export const Timezone = (Timezone: string): RouterConfig => {
    const config: RouterConfig = {
        "/system clock": [],
    };

    config["/system clock"].push(
        `set time-zone-autodetect=no time-zone-name=${Timezone}`,
    );

    return config;
};

export const AReboot = (rebootConfig: IntervalConfig): RouterConfig => {
    const config: RouterConfig = {
        "/system scheduler": [],
    };

    const { time, interval } = rebootConfig;

    if (time && interval) {
        let intervalStr = "";
        switch (interval) {
            case "Daily":
                intervalStr = "1d";
                break;
            case "Weekly":
                intervalStr = "1w";
                break;
            case "Monthly":
                intervalStr = "30d";
                break;
            default:
                intervalStr = "1d";
        }

        config["/system scheduler"].push(
            `add disabled=no interval=${intervalStr} name=reboot-${time} on-event="/system reboot" \\
policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon \\
start-time=${time}:00`,
        );
    }

    return config;
};

export const AUpdate = (updateConfig: IntervalConfig): RouterConfig => {
    const config: RouterConfig = {
        "/system scheduler": [],
    };

    const { time, interval } = updateConfig;

    if (time && interval) {
        let intervalStr = "";
        switch (interval) {
            case "Daily":
                intervalStr = "1d";
                break;
            case "Weekly":
                intervalStr = "1w";
                break;
            case "Monthly":
                intervalStr = "30d";
                break;
            default:
                intervalStr = "1w";
        }

        config["/system scheduler"].push(
            `add disabled=no interval=${intervalStr} name=update on-event="/system package update\\r\\
    \\ncheck-for-updates once\\r\\
    \\n:delay 9s;\\r\\
    \\n:if ( [get status] = \\"New version is available\\") do={ install }" \\
    policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon \\
    start-time=${time}:00`,
        );
    }

    return config;
};

export const IPAddressUpdateFunc = (
    ipAddressConfig: IntervalConfig,
): RouterConfig => {
    const { time, interval } = ipAddressConfig;

    if (!time || !interval) {
        return {};
    }

    // Get the domestic IP script configuration
    const domesticConfig = generateDomesticIPScript(time);

    // Add S4I routing rule
    const s4iConfig: RouterConfig = {
        "/ip firewall mangle": [
            `add action=mark-routing chain=output comment="S4I Route" content=s4i.co new-routing-mark=to-FRN passthrough=no`,
        ],
    };

    // Merge the configs
    return mergeMultipleConfigs(domesticConfig, s4iConfig);
};

// Useful Services Utils
export const Certificate = (
    certificateConfig: CertificateConfig,
): RouterConfig => {
    const configs: RouterConfig[] = [];

    // Handle Self-Signed (Private) Certificate
    if (certificateConfig.SelfSigned) {
        configs.push(PrivateCert());
        configs.push(ExportCert());
    }

    // Handle Let's Encrypt Certificate
    if (certificateConfig.LetsEncrypt) {
        configs.push(LetsEncrypt());
    }

    // Merge all configurations
    return mergeMultipleConfigs(...configs);
};

export const NTP = (NTPConfig: NTPConfig): RouterConfig => {
    // Use provided servers or default to pool.ntp.org if empty
    const servers =
        NTPConfig.servers && NTPConfig.servers.length > 0
            ? NTPConfig.servers
            : ["pool.ntp.org"];

    const config: RouterConfig = {
        "/system ntp client": ["set enabled=yes"],
        "/system ntp server": [
            "set broadcast=yes enabled=yes manycast=yes multicast=yes",
        ],
        "/system ntp client servers": servers.map(
            (server) => `add address=${server}`,
        ),
    };

    return config;
};

export const Graph = (GraphingConfig: GraphingConfig): RouterConfig => {
    const config: RouterConfig = {
        "/tool graphing interface": [],
        "/tool graphing queue": [],
        "/tool graphing resource": [],
    };

    // Enable interface graphing if configured
    if (GraphingConfig.Interface) {
        config["/tool graphing interface"].push("add");
    }

    // Enable queue graphing if configured
    if (GraphingConfig.Queue) {
        config["/tool graphing queue"].push("add");
    }

    // Enable resource graphing if configured
    if (GraphingConfig.Resources) {
        config["/tool graphing resource"].push("add");
    }

    return config;
};

export const DDNS = (_DDNSEntry: DDNSEntry): RouterConfig => {
    const config: RouterConfig = {};

    return config;
};

export const UPNP = (
    UPNPConfig: UPNPConfig,
    _subnets: Subnets,
    _WANLinks: WANLinks,
): RouterConfig => {
    const config: RouterConfig = {
        "/ip upnp": ["set enabled=yes"],
    };

    // Get External Interfaces Networks
    const _LType = UPNPConfig.linkType;

    // Get Internal Interfaces Networks

    return config;
};

export const NATPMP = (
    NATPMPConfig: NATPMPConfig,
    subnets: Subnets,
    _WANLinks: WANLinks,
): RouterConfig => {
    const config: RouterConfig = {
        "/ip nat-pmp": ["set enabled=yes"],
    };

    const _Networks = GetNetworks(subnets);

    return config;
};
