import type {
    services,
    RouterIdentityRomon,
    GameConfig,
    ExtraConfigState,
    RUIConfig,
    UsefulServicesConfig,
    WANLinks,
    Subnets,
    VPNClient,
    WANLinkType,
    Networks,
    RouterModels,
    VPNServer,
} from "~/components/Star/StarContext";
import {
    Timezone,
    AReboot,
    AUpdate,
    IPAddressUpdateFunc,
    Clock,
    update,
    UPNP,
    NATPMP,
    PublicCert,
    mergeMultipleConfigs,
    type RouterConfig,
    CloudDDNS,
    Certificate,
    NTP,
    Graph,
    DDNS,
    mapNetworkToRoutingTable,
    generateDomesticIPScriptOneTime,
    Logging,
} from "~/components/Star/ConfigGenerator";

// Helper function to check if master router is CHR
const isMasterCHR = (routerModels?: RouterModels[]): boolean => {
    if (!routerModels) return false;
    const masterRouter = routerModels.find(r => r.isMaster);
    return masterRouter?.isCHR === true;
};


export const BaseExtra = (routerModels?: RouterModels[]): RouterConfig => {
    const configs: RouterConfig[] = [];

    // Add base system clock configuration
    configs.push(Clock());

    // Add system update configuration - skip routerboard settings if master is CHR
    configs.push(update(isMasterCHR(routerModels)));

    // Add public certificate configuration
    configs.push(PublicCert());

    // Add system logging configuration
    configs.push(Logging());

    // Add certificate settings configuration
    configs.push({
        "/certificate settings": [
            // "set builtin-trust-anchors=trusted crl-download=yes crl-store=system crl-use=yes",
            "set builtin-trust-anchors=trusted crl-download=yes crl-store=system ",

        ]
    });

    // Merge all configurations
    return mergeMultipleConfigs(...configs);
};

export const IdentityRomon = ( RouterIdentityRomon: RouterIdentityRomon ): RouterConfig => {
    const config: RouterConfig = {
        "/system identity": [],
        "/tool romon": [],
    };

    const { RouterIdentity, isRomon } = RouterIdentityRomon;

    if (RouterIdentity) {
        config["/system identity"].push(`set name="${RouterIdentity}"`);
    }

    if (isRomon) {
        config["/tool romon"].push("set enabled=yes");
    }

    return config;
};

export const AccessServices = (Services: services): RouterConfig => {
    const config: RouterConfig = {
        "/ip service": [],
    };

    const serviceNames = [
        "api",
        "api-ssl",
        "ftp",
        "ssh",
        "telnet",
        "winbox",
        "www",
        "www-ssl",
    ] as const;

    serviceNames.forEach((service) => {
        const serviceKey = service
            .replace("-ssl", "ssl")
            .replace("www", "web") as keyof services;

        const serviceConfig = Services[serviceKey];
        const setting =
            typeof serviceConfig === "string"
                ? serviceConfig
                : serviceConfig.type || "Disable";
        const port =
            typeof serviceConfig === "object" ? serviceConfig.port : undefined;

        let command = "";

        if (setting === "Disable") {
            command = `set ${service} disabled=yes`;
        } else if (setting === "Local") {
            command = `set ${service} address=192.168.0.0/16,172.16.0.0/12,10.0.0.0/8`;
        } else if (setting === "Enable") {
            command = `set ${service} disabled=no`;
        }

        // Add port configuration if specified
        if (port && command) {
            command += ` port=${port}`;
        }

        if (command) {
            config["/ip service"].push(command);
        }
    });

    return config;
};

export const RUI = (ruiConfig: RUIConfig): RouterConfig => {
    const configs: RouterConfig[] = [];

    // Handle timezone configuration
    if (ruiConfig.Timezone) {
        configs.push(Timezone(ruiConfig.Timezone));
    }

    // Handle auto-reboot scheduler
    if (ruiConfig.Reboot) {
        configs.push(AReboot(ruiConfig.Reboot));
    }

    // Handle auto-update scheduler
    if (ruiConfig.Update) {
        configs.push(AUpdate(ruiConfig.Update));
    }

    // Handle IP Address update script and scheduler
    if (ruiConfig.IPAddressUpdate) {
        configs.push(IPAddressUpdateFunc(ruiConfig.IPAddressUpdate));
    }

    // Merge all configurations
    return mergeMultipleConfigs(...configs);
};

export const UsefulServices = ( usefulServicesConfig: UsefulServicesConfig, subnets?: Subnets, wanLinks?: WANLinks, vpnClient?: VPNClient, networks?: Networks, routerModels?: RouterModels[], vpnServer?: VPNServer ): RouterConfig => {
    const configs: RouterConfig[] = [];

    // Handle Certificate configuration
    if (usefulServicesConfig.certificate) {
        configs.push(Certificate(usefulServicesConfig.certificate, vpnServer));
    }

    // Handle NTP configuration
    if (usefulServicesConfig.ntp) {
        configs.push(NTP(usefulServicesConfig.ntp));
    }

    // Handle Graphing configuration
    if (usefulServicesConfig.graphing) {
        configs.push(Graph(usefulServicesConfig.graphing));
    }

    // Handle Cloud DDNS configuration - skip if master is CHR
    if (usefulServicesConfig.cloudDDNS && !isMasterCHR(routerModels)) {
        // Process each DDNS entry
        usefulServicesConfig.cloudDDNS.ddnsEntries.forEach(entry => {
            configs.push(DDNS(entry));
        });
    }

    // Handle UPNP configuration
    if (usefulServicesConfig.upnp && subnets && wanLinks) {
        configs.push(UPNP(usefulServicesConfig.upnp, subnets, wanLinks, vpnClient, networks));
    }

    // Handle NAT-PMP configuration
    if (usefulServicesConfig.natpmp && subnets && wanLinks) {
        configs.push(NATPMP(usefulServicesConfig.natpmp, subnets, wanLinks, vpnClient, networks));
    }

    return mergeMultipleConfigs(...configs);
};

const extractRoutingTablesFromNetworks = (networks: Networks): string[] => {
    const tableNames: string[] = [];

    // Base Networks
    if (networks.BaseNetworks) {
        if (networks.BaseNetworks.Domestic) {
            tableNames.push("to-Domestic");
        }
        if (networks.BaseNetworks.Foreign) {
            tableNames.push("to-Foreign");
        }
        if (networks.BaseNetworks.VPN) {
            tableNames.push("to-VPN");
        }
    }

    // Additional Foreign Networks
    if (networks.ForeignNetworks && networks.ForeignNetworks.length > 0) {
        networks.ForeignNetworks.forEach((networkName) => {
            tableNames.push(`to-Foreign-${networkName}`);
        });
    }

    // Additional Domestic Networks
    if (networks.DomesticNetworks && networks.DomesticNetworks.length > 0) {
        networks.DomesticNetworks.forEach((networkName) => {
            tableNames.push(`to-Domestic-${networkName}`);
        });
    }

    // VPN Client Networks
    if (networks.VPNClientNetworks) {
        const vpnClient = networks.VPNClientNetworks;

        // Wireguard
        if (vpnClient.Wireguard && vpnClient.Wireguard.length > 0) {
            vpnClient.Wireguard.forEach((networkName) => {
                tableNames.push(`to-VPN-${networkName}`);
            });
        }

        // OpenVPN
        if (vpnClient.OpenVPN && vpnClient.OpenVPN.length > 0) {
            vpnClient.OpenVPN.forEach((networkName) => {
                tableNames.push(`to-VPN-${networkName}`);
            });
        }

        // L2TP
        if (vpnClient.L2TP && vpnClient.L2TP.length > 0) {
            vpnClient.L2TP.forEach((networkName) => {
                tableNames.push(`to-VPN-${networkName}`);
            });
        }

        // PPTP
        if (vpnClient.PPTP && vpnClient.PPTP.length > 0) {
            vpnClient.PPTP.forEach((networkName) => {
                tableNames.push(`to-VPN-${networkName}`);
            });
        }

        // SSTP
        if (vpnClient.SSTP && vpnClient.SSTP.length > 0) {
            vpnClient.SSTP.forEach((networkName) => {
                tableNames.push(`to-VPN-${networkName}`);
            });
        }

        // IKev2
        if (vpnClient.IKev2 && vpnClient.IKev2.length > 0) {
            vpnClient.IKev2.forEach((networkName) => {
                tableNames.push(`to-VPN-${networkName}`);
            });
        }
    }

    return tableNames;
};

export const Game = (games: GameConfig[], networks: Networks): RouterConfig => {
    const config: RouterConfig = {
        "/ip firewall raw": [],
        "/ip firewall mangle": [],
    };

    // Only generate game routing rules if games are configured
    if (games && games.length > 0) {
        // Determine source address list based on Split network availability
        // If Split network exists, use "Split-LAN", otherwise use "VPN-LAN"
        const sourceAddressList = networks.BaseNetworks?.Split ? "Split-LAN" : "VPN-LAN";

        // Extract all routing tables from networks
        const routingTables = extractRoutingTablesFromNetworks(networks);

        // Generate mangle rules for each routing table (Base Networks + Additional Networks)
        routingTables.forEach((routingTable) => {
            // Extract the network name from routing table (e.g., "to-Foreign" -> "Foreign")
            const networkName = routingTable.replace("to-", "");
            
            config["/ip firewall mangle"].push(
                // `add action=mark-connection chain=prerouting dst-address-list="${networkName}-IP-Games" \\
                // new-connection-mark="${networkName}-conn-Games" passthrough=yes src-address-list="${sourceAddressList}" \\
                // comment="Routing Games to ${networkName}"`,
                // `add action=mark-routing chain=prerouting connection-mark="${networkName}-conn-Games" \\
                // new-routing-mark="${routingTable}" passthrough=no src-address-list="${sourceAddressList}" \\
                // comment="Routing Games to ${networkName}"`,
                `add action=mark-routing chain=prerouting \\
                new-routing-mark="${routingTable}" passthrough=no src-address-list="${sourceAddressList}" \\
                dst-address-list="${networkName}-IP-Games" comment="Routing Games to ${networkName}"`,
            );
        });

        // Generate raw rules for each game
        games.forEach((game: GameConfig) => {
            // Map network name to routing table
            const routingTable = mapNetworkToRoutingTable(game.network, networks);
            
            // Skip if network mapping failed
            if (!routingTable) {
                return;
            }

            // Extract network name from routing table for address list
            const networkName = routingTable.replace("to-", "");

            // Add TCP port rules
            if (game.ports.tcp?.length && game.ports.tcp.some((port) => port !== "")) {
                const tcpPorts = game.ports.tcp.filter((port) => port !== "").join(",");
                config["/ip firewall raw"].push(
                    `add action=add-dst-to-address-list src-address-list="${sourceAddressList}" address-list="${networkName}-IP-Games" address-list-timeout=1d \\
        chain=prerouting dst-address-list="!LOCAL-IP" dst-port="${tcpPorts}" protocol="tcp" \\
        comment="${game.name} - TCP"`,
                );
            }

            // Add UDP port rules
            if (game.ports.udp?.length && game.ports.udp.some((port) => port !== "")) {
                const udpPorts = game.ports.udp.filter((port) => port !== "").join(",");
                config["/ip firewall raw"].push(
                    `add action=add-dst-to-address-list src-address-list="${sourceAddressList}" address-list="${networkName}-IP-Games" address-list-timeout=1d \\
        chain=prerouting dst-address-list="!LOCAL-IP" dst-port="${udpPorts}" protocol="udp" \\
        comment="${game.name} - UDP"`,
                );
            }
        });
    }

    return config;
};

export const Firewall = (): RouterConfig => {
    const config: RouterConfig = {
        "/ip firewall filter": [
            `add action=drop chain=input dst-port=53 in-interface-list=WAN protocol="udp"`,
            `add action=drop chain=input dst-port=53 in-interface-list=WAN protocol="tcp"`,
        ],
    };

    return config;
};

export const ExtraCG = (
    ExtraConfigState: ExtraConfigState,
    wanLinkType: WANLinkType,
    subnets?: Subnets,
    wanLinks?: WANLinks,
    vpnClient?: VPNClient,
    networks?: Networks,
    routerModels?: RouterModels[],
    vpnServer?: VPNServer,
): RouterConfig => {
    const configs: RouterConfig[] = [
        BaseExtra(routerModels),
        generateDomesticIPScriptOneTime(),
        // PublicCert(),
    ];

    // Add conditional configurations
    if (ExtraConfigState.RouterIdentityRomon) {
        configs.push(IdentityRomon(ExtraConfigState.RouterIdentityRomon));
    }

    if (ExtraConfigState.services) {
        configs.push(AccessServices(ExtraConfigState.services));
    }

    if (ExtraConfigState.RUI) {
        configs.push(RUI(ExtraConfigState.RUI));
    }

    // Generate Game mangle and raw rules only if Games are configured
    if (networks && ExtraConfigState.Games && ExtraConfigState.Games.length > 0) {
        configs.push(Game(ExtraConfigState.Games, networks));
    }

    // Handle all useful services (Certificate, NTP, Graph, DDNS, UPNP, NAT-PMP)
    if (ExtraConfigState.usefulServices) {
        configs.push(UsefulServices(ExtraConfigState.usefulServices, subnets, wanLinks, vpnClient, networks, routerModels, vpnServer));
    }

    // Add Cloud DDNS configuration - skip if master is CHR
    if (!isMasterCHR(routerModels)) {
        configs.push(CloudDDNS(wanLinkType));
    }

    return mergeMultipleConfigs(...configs);
};
