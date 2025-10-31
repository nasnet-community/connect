import { 
    type RouterConfig,
    generateDomesticIPScript,
    LetsEncrypt,
    PrivateCert,
    ExportCert,
    GetWANInterfaces,
    GetAllVPNInterfaceNames,
    GetWANInterface,
    GenerateVCInterfaceName,
    extractBridgeNames,
    DNSForeward,
    mergeMultipleConfigs,
} from "~/components/Star/ConfigGenerator";
import type {
    IntervalConfig,
    CertificateConfig,
    NTPConfig,
    GraphingConfig,
    DDNSEntry,
    UPNPConfig,
    NATPMPConfig,
    VPNClient,
    Networks,
    WANLinkType,
    Subnets,
    WANLinks,
} from "~/components/Star/StarContext";


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

export const update = (isCHR?: boolean): RouterConfig => {
    const config: RouterConfig = {
        "/system package update": ["set channel=stable"],
    };

    // Only add routerboard settings if not CHR
    if (!isCHR) {
        config["/system routerboard settings"] = ["set auto-upgrade=yes"];
    }

    return config;
};

export const CloudDDNS = (WANLinkType: WANLinkType): RouterConfig => {
    const config: RouterConfig = {
        "/ip cloud": ["set ddns-enabled=yes ddns-update-interval=1m"],
    };

    if (WANLinkType == "domestic" || WANLinkType == "both") {
        config["/ip cloud"] = ["set ddns-enabled=yes ddns-update-interval=1m"];
        config["/ip firewall address-list"] = [
            `add list="MikroTik-Cloud-Services" address="cloud2.mikrotik.com" \\
        comment="Dynamic list for MikroTik Cloud DDNS"`,
            `add list="MikroTik-Cloud-Services" address="cloud.mikrotik.com" \\
        comment="Legacy endpoint for completeness"`,
        ];
        config["/ip firewall mangle"] = [
            `add action=mark-routing chain=output dst-address-list="MikroTik-Cloud-Services" \\
        new-routing-mark="to-Domestic" passthrough=no \\
        comment="Force IP/Cloud DDNS traffic via Domestic WAN"`,
            `add action=mark-routing chain=output dst-address-list="MikroTik-Cloud-Services" \\
        protocol="udp" dst-port="15252" new-routing-mark="to-Domestic" passthrough=no \\
        comment="Force IP/Cloud DDNS traffic via Domestic WAN"`,
        ];
    }
    return config;
};

export const Logging = (): RouterConfig => {
    const config: RouterConfig = {
        "/system logging action": [
            `add disk-file-count=10 disk-file-name=ConnectLog disk-lines-per-file=100 disk-stop-on-full=yes name=DiskC target=disk`
        ],
        "/system logging": [
            `set 0 topics=info,!netwatch`,
            `add action=DiskC disabled=no prefix="" regex="" topics=critical,error,info,warning`
        ]
    };

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

export const IPAddressUpdateFunc = ( ipAddressConfig: IntervalConfig ): RouterConfig => {
    const { time, interval } = ipAddressConfig;

    if (!time || !interval) {
        return {};
    }

    // Get the domestic IP script configuration
    const domesticConfig = generateDomesticIPScript(time);

    // Add S4I routing rule
    const s4iConfig: RouterConfig = {
        "/ip firewall mangle": [
            `add action=mark-routing chain=output comment="S4I Route" content="s4i.co" new-routing-mark="to-Foreign" passthrough=no`,
            `add action=mark-routing chain=output comment="S4I Route" src-address=192.168.39.12 new-routing-mark="to-Foreign" passthrough=no`,
        ],
        "/interface bridge": [
            `add comment="Foreign Table Address Holder" name="FTAH"`
        ],
        "/ip address": [
            `add comment="Foreign Table Address Holder" address=192.168.39.12/32 interface=FTAH network=192.168.39.12`
        ],
    };

    // Merge the configs
    return mergeMultipleConfigs(domesticConfig, s4iConfig);
};

// Useful Services Utils
export const Certificate = ( certificateConfig: CertificateConfig ): RouterConfig => {
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
    // Use provided servers or default to pool.ntp.org if empty j
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
            (server) => `add address="${server}"`,
        ),
    };

    // Create DNS forward entries for NTP servers through General forwarder
    const dnsForwardConfigs: RouterConfig[] = servers.map(server => 
        DNSForeward(server, "General", false, `Forward ${server} via General DNS for NTP`)
    );

    return mergeMultipleConfigs(config, ...dnsForwardConfigs);
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

export const UPNP = ( UPNPConfig: UPNPConfig, subnets: Subnets, WANLinks: WANLinks, vpnClient?: VPNClient, networks?: Networks ): RouterConfig => {
    const config: RouterConfig = {
        "/ip upnp": ["set enabled=yes"],
        "/ip upnp interfaces": [],
    };

    const linkType = UPNPConfig.linkType;

    // Return if no link type specified
    if (!linkType) {
        return config;
    }

    // Add external (WAN) interfaces
    if (linkType === "foreign" && WANLinks.Foreign) {
        const interfaces = GetWANInterfaces(WANLinks.Foreign);
        interfaces.forEach(iface => {
            config["/ip upnp interfaces"].push(
                `add interface="${iface}" type=external `
            );
        });
    } else if (linkType === "domestic" && WANLinks.Domestic) {
        const interfaces = GetWANInterfaces(WANLinks.Domestic);
        interfaces.forEach(iface => {
            config["/ip upnp interfaces"].push(
                `add interface="${iface}" type=external `
            );
        });
    } else if (linkType === "vpn" && vpnClient) {
        const interfaces = GetAllVPNInterfaceNames(vpnClient);
        interfaces.forEach(iface => {
            config["/ip upnp interfaces"].push(
                `add interface="${iface}" type=external `
            );
        });
    }

    // Add internal (LAN bridge) interfaces
    if (networks) {
        const bridgeNames = extractBridgeNames(networks, subnets);
        bridgeNames.forEach(bridgeName => {
            config["/ip upnp interfaces"].push(
                `add interface="${bridgeName}" type=internal `
            );
        });
    }

    return config;
};

export const NATPMP = ( NATPMPConfig: NATPMPConfig, subnets: Subnets, WANLinks: WANLinks, vpnClient?: VPNClient, networks?: Networks ): RouterConfig => {
    const config: RouterConfig = {
        "/ip nat-pmp": ["set enabled=yes"],
        "/ip nat-pmp interfaces": [],
    };

    const linkType = NATPMPConfig.linkType;
    const interfaceName = NATPMPConfig.InterfaceName;

    // Add external (WAN) interface
    // Use specific InterfaceName if provided, otherwise determine from linkType
    if (interfaceName) {
        // interfaceName contains the config name, need to resolve to actual interface
        let actualInterface: string | null = null;
        
        // Search in Domestic links
        if (WANLinks.Domestic?.WANConfigs) {
            const config = WANLinks.Domestic.WANConfigs.find(c => c.name === interfaceName);
            if (config) {
                actualInterface = GetWANInterface(config);
            }
        }
        
        // Search in Foreign links if not found
        if (!actualInterface && WANLinks.Foreign?.WANConfigs) {
            const config = WANLinks.Foreign.WANConfigs.find(c => c.name === interfaceName);
            if (config) {
                actualInterface = GetWANInterface(config);
            }
        }
        
        // Search in VPN clients if not found
        if (!actualInterface && vpnClient) {
            // Check Wireguard
            if (vpnClient.Wireguard && vpnClient.Wireguard.length > 0) {
                const vpn = vpnClient.Wireguard.find(v => v.Name === interfaceName);
                if (vpn) {
                    actualInterface = GenerateVCInterfaceName(vpn.Name, "Wireguard");
                }
            }
            
            // Check OpenVPN
            if (!actualInterface && vpnClient.OpenVPN && vpnClient.OpenVPN.length > 0) {
                const vpn = vpnClient.OpenVPN.find(v => v.Name === interfaceName);
                if (vpn) {
                    actualInterface = GenerateVCInterfaceName(vpn.Name, "OpenVPN");
                }
            }
            
            // Check PPTP
            if (!actualInterface && vpnClient.PPTP && vpnClient.PPTP.length > 0) {
                const vpn = vpnClient.PPTP.find(v => v.Name === interfaceName);
                if (vpn) {
                    actualInterface = GenerateVCInterfaceName(vpn.Name, "PPTP");
                }
            }
            
            // Check L2TP
            if (!actualInterface && vpnClient.L2TP && vpnClient.L2TP.length > 0) {
                const vpn = vpnClient.L2TP.find(v => v.Name === interfaceName);
                if (vpn) {
                    actualInterface = GenerateVCInterfaceName(vpn.Name, "L2TP");
                }
            }
            
            // Check SSTP
            if (!actualInterface && vpnClient.SSTP && vpnClient.SSTP.length > 0) {
                const vpn = vpnClient.SSTP.find(v => v.Name === interfaceName);
                if (vpn) {
                    actualInterface = GenerateVCInterfaceName(vpn.Name, "SSTP");
                }
            }
            
            // Check IKeV2
            if (!actualInterface && vpnClient.IKeV2 && vpnClient.IKeV2.length > 0) {
                const vpn = vpnClient.IKeV2.find(v => v.Name === interfaceName);
                if (vpn) {
                    actualInterface = GenerateVCInterfaceName(vpn.Name, "IKeV2");
                }
            }
        }
        
        // Add the resolved interface if found
        if (actualInterface) {
            config["/ip nat-pmp interfaces"].push(
                `add interface="${actualInterface}" type=external `
            );
        }
    } else if (linkType) {
        // Fall back to linkType-based interface detection
        if (linkType === "foreign" && WANLinks.Foreign) {
            const interfaces = GetWANInterfaces(WANLinks.Foreign);
            interfaces.forEach(iface => {
                config["/ip nat-pmp interfaces"].push(
                    `add interface="${iface}" type=external `
                );
            });
        } else if (linkType === "domestic" && WANLinks.Domestic) {
            const interfaces = GetWANInterfaces(WANLinks.Domestic);
            interfaces.forEach(iface => {
                config["/ip nat-pmp interfaces"].push(
                    `add interface="${iface}" type=external `
                );
            });
        } else if (linkType === "vpn" && vpnClient) {
            const interfaces = GetAllVPNInterfaceNames(vpnClient);
            interfaces.forEach(iface => {
                config["/ip nat-pmp interfaces"].push(
                    `add interface="${iface}" type=external `
                );
            });
        }
    }

    // Add internal (LAN bridge) interfaces
    if (networks) {
        const bridgeNames = extractBridgeNames(networks, subnets);
        bridgeNames.forEach(bridgeName => {
            config["/ip nat-pmp interfaces"].push(
                `add interface="${bridgeName}" type=internal `
            );
        });
    }

    return config;
};
