import type { BondingConfig, WANLinkConfig, WANLinks, VPNClient } from "~/components/Star/StarContext";
import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import { GetWANInterface, GenerateVCInterfaceName } from "~/components/Star/ConfigGenerator";

// Common interface for Multi-WAN and Failover functions
// Used by both WAN links and VPN clients
export interface MultiWANInterface {
    name: string;
    network: string;
    gateway: string;
    distance: number;
    weight?: number;
    checkIP?: string;
    interval?: string;
    timeout?: string;
    checkIPs?: string[];
    threshold?: number;
}

// Domestic (Iranian) Check IPs - DNS servers and reliable endpoints within Iran
export const DomesticCheckIPs=[

    // Mokhaberat
    "217.218.127.127",
    "217.218.155.155",
    "5.200.200.200",
    


    // Shecan
    "178.22.122.100",
    "185.51.200.2",

    // Noyan Abr Arvan (ArvanCloud)
    "185.231.182.126",
    "185.97.117.187",

    // Sefroyek Pardaz Eng. (Shahrad / Shecan infra)
    "185.51.200.10",
    "185.51.200.50",

    // Tehran Univ. of Medical Sciences (ourdns1.tums.ac.ir)
    "194.225.62.80",

    // IRANET / IPM network (persia.iranet.ir)
    "194.225.73.141",

     // Information Technology Company
    "2.188.21.130",
    "2.188.21.131",
    "2.188.21.132",

    // 403 Service
    "10.202.10.202",
    "10.202.10.102",
    
    // Shelter
    "91.92.250.185",
    "91.92.244.233",


    // Shatel
    "85.15.1.14",
    "85.15.1.15",


    // Bogzar
    "185.55.225.25",
    "185.55.226.26",

    // Electro
    "78.157.42.100",
    "78.157.42.101",

    // Radar
    "10.202.10.10",
    "10.202.10.11",

    // Pishgaman
    "5.202.100.100",
    "5.202.100.101",

    // shatel
    "85.15.1.14",
    "85.15.1.15",

    // MCI
    "208.67.220.200",
    "208.67.222.222",

    // MTN
    "74.82.42.42",
    "109.69.8.51",

    // Rightel
    "91.239.100.100",
    "89.223.43.71",

    // shatelMobile
    "91.239.100.100",
    "89.233.43.71",

    // Asiatech
    "194.36.174.161",
    "178.22.122.100",
    "37.156.145.21",
    "37.156.145.229",


    // Rayankadeh Apadana Co. (IR)
    "185.113.59.253",

    // Parvaz System Information Technology
    "185.161.112.33",
    "185.161.112.34",

    // Gostaresh Ertebat Azin Kia or Rasaneh Pardaz Sepahan
    "185.186.242.161",

    // Hamkaran System Co.
    "185.187.84.15",


    // Telecommunication Infrastructure Co. (TIC / AS49666)
    "2.189.44.44",

    // ITC / DCI (recursive2.dci.ir, AS12880)
    "217.218.155.155",

    // IROST – Iranian Research Organization for Sci. & Tech. (dns.irost.net)
    "213.176.123.5",

    // Dadeh Gostar Asr Novin P.J.S. (DGAN / “Sabet”)
    "46.224.1.42",

    // Iran Telecommunication Company (ITC/TIC regional)
    "80.191.40.41",

    // Farabord Dadeh Haye Iranian (FDI / “Zitel”)
    "81.91.144.116",

    // Kish Cell Pars Co. (ns1.kcpcloud.ir)
    "91.245.229.1",

    // Pars Online PJS (parsonline)
    "91.99.101.12",

    // AS57935 Nrp Teknoloji Ltd. Şti. (listed in Isfahan)
    "92.119.56.162",
] as const;

// Foreign (International) Check IPs - Reliable global DNS servers and endpoints
export const ForeignCheckIPs = [

    // // Google Public DNS
    // "8.8.8.8",
    // "8.8.4.4",

    // // Cloudflare DNS
    // "1.1.1.1",
    // "1.0.0.1",

    // Level3 DNS
    "4.2.2.1",
    "4.2.2.2",
    "4.2.2.3",
    "4.2.2.4",

    // Quad9 DNS
    "9.9.9.9",
    "149.112.112.112",

    // OpenDNS
    "208.67.222.222",
    "208.67.220.220",

    // Google Secondary
    "8.26.56.26",
    "8.20.247.20",

    // Verisign Public DNS
    "64.6.64.6",
    "64.6.65.6",

    // DNS.Watch
    "84.200.69.80",
    "84.200.70.40",

    // Comodo Secure DNS
    "8.26.56.26",
    "8.20.247.20",

    // AdGuard DNS
    "94.140.14.14",
    "94.140.15.15",

    // Open NIC
    "185.121.177.177",
    "169.239.202.202",

    // Yandex
    "77.88.8.8",
    "77.88.8.1",


] as const;

// Helper function to convert WANLinkConfig to MultiWANInterface
// isDomestic: true for domestic links, false for foreign links
// network: The network type for identification (e.g., "Foreign", "Domestic")
export const convertWANLinkToMultiWAN = ( 
    wanConfigs: WANLinkConfig[],  
    isDomestic: boolean = false,
    network: string = "Foreign"
): MultiWANInterface[] => {
    // Select appropriate check IPs based on link type
    const checkIPArray = isDomestic ? DomesticCheckIPs : ForeignCheckIPs;
    
    return wanConfigs.map((config, index) => {
        // Assign unique checkIP for each link by cycling through available IPs
        const uniqueCheckIP = checkIPArray[index % checkIPArray.length];
        
        // Get the final interface name after all transformations (VLAN, MACVLAN, PPPoE, etc.)
        const finalInterfaceName = GetWANInterface(config);
        
        // Determine the gateway based on connection type (matching DFSingleLink logic)
        let gateway: string;
        const { ConnectionConfig, InterfaceConfig } = config;
        
        if (ConnectionConfig?.pppoe) {
            // PPPoE: Use interface name only as gateway
            gateway = finalInterfaceName;
        } else if (ConnectionConfig?.lteSettings || InterfaceConfig.InterfaceName.startsWith("lte")) {
            // LTE: Use interface name only as gateway
            gateway = finalInterfaceName;
        } else if (ConnectionConfig?.static) {
            // Static: Use gateway from static config + interface
            gateway = `${ConnectionConfig.static.gateway}%${finalInterfaceName}`;
        } else {
            // DHCP (default): Use default IPs based on network type
            const defaultGateway = isDomestic ? "192.168.2.1" : "100.64.0.1";
            gateway = `${defaultGateway}%${finalInterfaceName}`;
        }
        
        return {
            name: config.name,
            network: network,
            gateway: gateway,
            distance: config.priority || (index + 1),
            weight: config.weight,
            checkIP: uniqueCheckIP,
            interval: "5s",
            timeout: "5s",
            checkIPs: checkIPArray.slice(0, 5) as unknown as string[], // Use first 5 check IPs
            threshold: 2, // At least 2 IPs must fail to consider link down
        };
    });
};

// Helper function to convert VPN Client configs to MultiWANInterface
// checkIPOffset: Offset to use when selecting check IPs (to avoid conflicts with WAN links)
export const convertVPNClientToMultiWAN = (vpnClient: VPNClient, checkIPOffset: number = 0): MultiWANInterface[] => {
    const interfaces: MultiWANInterface[] = [];
    // VPN clients typically route to foreign servers, use foreign check IPs
    // Start from offset + 5 to use different IPs than those used for checkIPs array
    const checkIPs = ForeignCheckIPs.slice(checkIPOffset + 5, checkIPOffset + 10) as unknown as string[];
    
    // Counter to assign unique checkIPs across all VPN types
    // Start from offset to avoid conflict with Foreign WAN check IPs
    let interfaceIndex = checkIPOffset;

    // Convert Wireguard clients
    if (vpnClient.Wireguard) {
        vpnClient.Wireguard.forEach((config) => {
            interfaces.push({
                name: config.Name,
                network: "VPN",
                gateway: GenerateVCInterfaceName(config.Name, "Wireguard"), // Use interface name
                distance: config.priority || 1,
                weight: config.weight,
                checkIP: ForeignCheckIPs[interfaceIndex % ForeignCheckIPs.length], // Unique check IP with offset
                interval: "10s",
                timeout: "5s",
                checkIPs: checkIPs,
                threshold: 2, // At least 2 IPs must fail
            });
            interfaceIndex++;
        });
    }

    // Convert OpenVPN clients
    if (vpnClient.OpenVPN) {
        vpnClient.OpenVPN.forEach((config) => {
            interfaces.push({
                name: config.Name,
                network: "VPN",
                gateway: GenerateVCInterfaceName(config.Name, "OpenVPN"), // Use interface name
                distance: config.priority || 1,
                weight: config.weight,
                checkIP: ForeignCheckIPs[interfaceIndex % ForeignCheckIPs.length],
                interval: "10s",
                timeout: "5s",
                checkIPs: checkIPs,
                threshold: 2,
            });
            interfaceIndex++;
        });
    }

    // Convert PPTP clients
    if (vpnClient.PPTP) {
        vpnClient.PPTP.forEach((config) => {
            interfaces.push({
                name: config.Name,
                network: "VPN",
                gateway: GenerateVCInterfaceName(config.Name, "PPTP"), // Use interface name
                distance: config.priority || 1,
                weight: config.weight,
                checkIP: ForeignCheckIPs[interfaceIndex % ForeignCheckIPs.length],
                interval: "10s",
                timeout: "5s",
                checkIPs: checkIPs,
                threshold: 2,
            });
            interfaceIndex++;
        });
    }

    // Convert L2TP clients
    if (vpnClient.L2TP) {
        vpnClient.L2TP.forEach((config) => {
            interfaces.push({
                name: config.Name,
                network: "VPN",
                gateway: GenerateVCInterfaceName(config.Name, "L2TP"), // Use interface name
                distance: config.priority || 1,
                weight: config.weight,
                checkIP: ForeignCheckIPs[interfaceIndex % ForeignCheckIPs.length],
                interval: "10s",
                timeout: "5s",
                checkIPs: checkIPs,
                threshold: 2,
            });
            interfaceIndex++;
        });
    }

    // Convert SSTP clients
    if (vpnClient.SSTP) {
        vpnClient.SSTP.forEach((config) => {
            interfaces.push({
                name: config.Name,
                network: "VPN",
                gateway: GenerateVCInterfaceName(config.Name, "SSTP"), // Use interface name
                distance: config.priority || 1,
                weight: config.weight,
                checkIP: ForeignCheckIPs[interfaceIndex % ForeignCheckIPs.length],
                interval: "10s",
                timeout: "5s",
                checkIPs: checkIPs,
                threshold: 2,
            });
            interfaceIndex++;
        });
    }

    // Convert IKEv2 clients
    if (vpnClient.IKeV2) {
        vpnClient.IKeV2.forEach((config) => {
            interfaces.push({
                name: config.Name,
                network: "VPN",
                gateway: GenerateVCInterfaceName(config.Name, "IKeV2"), // Use interface name
                distance: config.priority || 1,
                weight: config.weight,
                checkIP: ForeignCheckIPs[interfaceIndex % ForeignCheckIPs.length],
                interval: "10s",
                timeout: "5s",
                checkIPs: checkIPs,
                threshold: 2,
            });
            interfaceIndex++;
        });
    }

    return interfaces;
};

// Helper function to combine VPN clients and WAN links in priority order
// Order: VPN Clients -> Domestic WAN -> Foreign WAN
// This ensures VPN traffic is prioritized, followed by domestic, then foreign
export const combineMultiWANInterfaces = (
    vpnClient?: VPNClient,
    wanLinks?: WANLinks
): MultiWANInterface[] => {
    const allInterfaces: MultiWANInterface[] = [];

    // Calculate offset for VPN check IPs to avoid conflicts with Foreign WAN
    // If there are Foreign WAN links, offset VPN by their count
    const foreignWANCount = wanLinks?.Foreign?.WANConfigs ? wanLinks.Foreign.WANConfigs.length : 0;
    const vpnCheckIPOffset = foreignWANCount;

    // 1. Add VPN clients first (highest priority)
    if (vpnClient) {
        const vpnInterfaces = convertVPNClientToMultiWAN(vpnClient, vpnCheckIPOffset);
        allInterfaces.push(...vpnInterfaces);
    }

    // 2. Add Domestic WAN links second
    if (wanLinks?.Domestic?.WANConfigs && wanLinks.Domestic.WANConfigs.length > 0) {
        const domesticInterfaces = convertWANLinkToMultiWAN(
            wanLinks.Domestic.WANConfigs,
            true,  // isDomestic
            "Domestic"
        );
        allInterfaces.push(...domesticInterfaces);
    }

    // 3. Add Foreign WAN links last
    if (wanLinks?.Foreign?.WANConfigs && wanLinks.Foreign.WANConfigs.length > 0) {
        const foreignInterfaces = convertWANLinkToMultiWAN(
            wanLinks.Foreign.WANConfigs,
            false,  // isDomestic
            "Foreign"
        );
        allInterfaces.push(...foreignInterfaces);
    }

    // Reassign distances sequentially for proper failover priority
    // VPN (distance 1, 2, ...), then Domestic, then Foreign
    allInterfaces.forEach((iface, index) => {
        iface.distance = index + 1;
    });

    return allInterfaces;
};



// PCC - Per Connection Classifier Load Balancing
export const PCCMangle = ( linkCount: number, wanInterfaces: string[], AddressList: string , RoutingMark: string ): RouterConfig => {
    const config: RouterConfig = {
        "/ip firewall mangle": [],
    };

    const mangleRules = config["/ip firewall mangle"];
    const Network = RoutingMark.replace("to-", "");

    // 2. Mark connections coming from each WAN interface
    wanInterfaces.forEach((iface, _index) => {
        mangleRules.push(
            `add action=mark-connection chain=input in-interface="${iface}" new-connection-mark="${iface}-conn" \\
            passthrough=yes comment="${Network} - PCC LOAD BALANCING - Mark ${iface} connections"`,
        );
    });

    // 3. Mark routing for output based on connection marks
    wanInterfaces.forEach((iface) => {
        mangleRules.push(
            `add action=mark-routing chain=output connection-mark="${iface}-conn" new-routing-mark="${RoutingMark}" \\
            passthrough=yes comment="${Network} - PCC LOAD BALANCING - Mark ${iface} routing"`,
        );
    });

    // 4. PCC classifier rules - distribute new connections across WANs
    wanInterfaces.forEach((iface, index) => {
        mangleRules.push(
            `add action=mark-connection chain=prerouting new-connection-mark="${iface}-conn" passthrough=yes \\
            per-connection-classifier=both-addresses-and-ports:${linkCount}/${index} dst-address-type=!local \\
            dst-address-list="!LOCAL-IP" src-address-list="${AddressList}" comment="${Network} - PCC LOAD BALANCING - Mark ${iface} connections"`,
        );
    });

    // 5. Mark routing in prerouting based on connection marks
    wanInterfaces.forEach((iface) => {
        mangleRules.push(
            `add action=mark-routing chain=prerouting connection-mark="${iface}-conn" new-routing-mark="${RoutingMark}" \\
            passthrough=yes dst-address-list="!LOCAL-IP" src-address-list="${AddressList}" comment="${Network} - PCC LOAD BALANCING - Mark ${iface} routing"`,
        );
    });

    return config;
};

// NTH - Nth packet Load Balancing
export const NTHMangle = ( linkCount: number, wanInterfaces: string[], localNetwork: string, RoutingMark: string ): RouterConfig => {
    const config: RouterConfig = {
        "/ip firewall mangle": [],
    };

    const mangleRules = config["/ip firewall mangle"];
    const Network = RoutingMark.replace("to-", "");

    // 2. Mark connections coming from each WAN interface
    wanInterfaces.forEach((iface) => {
        mangleRules.push(
            `add action=mark-connection chain=prerouting in-interface="${iface}" new-connection-mark="${iface}-conn" \\
            passthrough=yes comment="${Network} - NTH LOAD BALANCING - Mark ${iface} connections"`,
        );
    });

    // 3. Mark routing for output based on connection marks
    wanInterfaces.forEach((iface) => {
        mangleRules.push(
            `add action=mark-routing chain=output connection-mark="${iface}-conn" new-routing-mark="${RoutingMark}" \\
            passthrough=yes comment="${Network} - NTH LOAD BALANCING - Mark ${iface} routing"`,
        );
    });

    // 4. NTH classifier rules - distribute new connections across WANs
    wanInterfaces.forEach((iface, index) => {
        const nthIndex = index + 1;
        mangleRules.push(
            `add action=mark-connection chain=prerouting new-connection-mark="${iface}-conn" passthrough=yes \\
            connection-state=new dst-address-list="!LOCAL-IP" src-address-list="${localNetwork}" \\
            nth=${linkCount},${nthIndex} comment="${Network} - NTH LOAD BALANCING - Mark ${iface} connections"`,
        );
    });

    // 5. Mark routing in prerouting based on connection marks
    wanInterfaces.forEach((iface) => {
        mangleRules.push(
            `add action=mark-routing chain=prerouting connection-mark="${iface}-conn" new-routing-mark="${RoutingMark}" \\
            passthrough=yes dst-address-list="!LOCAL-IP" src-address-list="${localNetwork}" \\
            comment="${Network} - NTH LOAD BALANCING - Mark ${iface} routing"`,
        );
    });

    return config;
};

// Load Balancing Route - Routing configuration for PCC/NTH Load Balancing
// This function generates the routing configuration needed for both PCC and NTH load balancing
export const LoadBalanceRoute = ( interfaces: MultiWANInterface[],  _method: "PCC" | "NTH" = "PCC", routingTable: string = "main" ): RouterConfig => {
    const config: RouterConfig = {
        "/ip route": [],
    };

    const routes = config["/ip route"];
    
    // Check if this is a base routing table (to-Domestic, to-Foreign, to-VPN)
    // For base tables, we skip generating routes here as FailoverRecursive() will handle them
    const isBaseTable = routingTable === "to-Domestic" || routingTable === "to-Foreign" || routingTable === "to-VPN";
    
    // Only generate routes for non-base tables (like "main")
    // Per-link tables get their routes from Route() function
    // Base tables get their routes from FailoverRecursive()
    
    if (!isBaseTable) {
        const tableParam = routingTable ? `routing-table="${routingTable}"` : "";
        
        // 1. Create recursive check routes (dst-address with real gateway)
        // These routes are used to check if the ISP gateway is reachable
        interfaces.forEach((wan) => {
            routes.push(
                `add check-gateway=ping dst-address="${wan.checkIP}" gateway="${wan.gateway}" \\
                ${tableParam} target-scope="10" scope="10" comment="Route-to-${wan.network}-${wan.name}"`
            );
        });
        
        // 3. Create default routes with increasing distance for failover
        // These provide automatic failover if primary routes fail
        interfaces.forEach((wan, index) => {
            const distance = index + 1; // 1, 2, 3, 4...
            routes.push(
                `add check-gateway=ping gateway="${wan.checkIP}" ${tableParam} distance=${distance} \\
                scope="30" target-scope="30" comment="Route-to-${wan.network}-${wan.name}"`
            );
        });
    }

    // Section 2 REMOVED - per-link tables now get routes from Route() function
    // Previously this section generated routes like:
    // add check-gateway=ping gateway="${wan.checkIP}" scope="30" target-scope="30"
    //     routing-table="to-${wan.network}-${wan.name}" comment="Route-to-${wan.network}-${wan.name}"
    // These are now redundant because Route() generates CheckIP routes for per-link tables

    return config;
};




// Failover Gateway - Simple gateway check with automatic failover
export const FailoverGateway = ( interfaces: MultiWANInterface[], Table: string ): RouterConfig => {
    const config: RouterConfig = {
        "/ip route": [],
    };

    const routes = config["/ip route"];

    // Create main default routes with check-gateway=ping
    // Routes automatically disable when gateway is unreachable
    interfaces.forEach((wan) => {
        const routingTable = Table ? `routing-table="${Table}"` : "";
        routes.push(
            `add check-gateway=ping dst-address="0.0.0.0/0" gateway="${wan.gateway}"  ${routingTable} distance=${wan.distance} \\
            target-scope="30" scope="30" comment="Failover Gateway - ${wan.name}"`,
        );
    });

    return config;
};

// Failover Recursive - Check connectivity to public IPs via specific gateways
// export const FailoverRecursive = ( interfaces: MultiWANInterface[], Table: string ): RouterConfig => {
//     const config: RouterConfig = {
//         "/ip route": [],
//     };

//     const routes = config["/ip route"];
//     const routingTable = Table ? `routing-table="${Table}"` : "";

//     // 1. Create recursive host routes
//     // These monitor connectivity to public IPs via ISP gateways
//     interfaces.forEach((wan) => {
//         const routeComment = `Route-to-${wan.network}-${wan.name}`;
//         routes.push(
//             `add check-gateway=ping dst-address="${wan.checkIP}" gateway="${wan.gateway}" \\
//             ${routingTable} target-scope="10" scope="10" comment="${routeComment}"`,
//         );
//     });

//     // 2. Create main default routes pointing to the check IPs
//     // These use the recursive routes to determine availability
//     interfaces.forEach((wan) => {
//         const routeComment = `CheckIP-Route-to-${wan.network}-${wan.name}`;
//         routes.push(
//             `add check-gateway=ping dst-address="0.0.0.0/0" gateway="${wan.checkIP}" ${routingTable} \\
//             distance=${wan.distance} target-scope="10" scope="30" comment="${routeComment}"`,
//         );
//     });

//     return config;
// };


export const FailoverRecursive = ( interfaces: MultiWANInterface[], Table: string ): RouterConfig => {
    const config: RouterConfig = {
        "/ip route": [],
    };

    const routes = config["/ip route"];
    const routingTable = Table ? `routing-table="${Table}"` : "";

    // 1. Create recursive host routes
    // These monitor connectivity to public IPs via ISP gateways
    interfaces.forEach((wan) => {
        const routeComment = `Route-to-${wan.network}-${wan.name}`;
        routes.push(
            `add dst-address="${wan.checkIP}" gateway="${wan.gateway}" \\
            ${routingTable} scope="10" comment="${routeComment}"`,
        );
    });

    // 2. Create main default routes pointing to the check IPs
    // These use the recursive routes to determine availability
    interfaces.forEach((wan) => {
        const routeComment = `CheckIP-Route-to-${wan.network}-${wan.name}`;
        // Distance pattern: 1, 5, 10, 15, 20, 25...
        const distance = wan.distance === 1 ? 1 : (wan.distance - 2) * 5 + 5;
        routes.push(
            `add check-gateway=ping dst-address="0.0.0.0/0" gateway="${wan.checkIP}" ${routingTable} \\
            distance="${distance}" target-scope="11" comment="${routeComment}"`,
        );
    });

    return config;
};


// Failover Netwatch - Monitor IPs and control routes via scripts
export const FailoverNetwatch = ( interfaces: MultiWANInterface[], Table: string ): RouterConfig => {
    const config: RouterConfig = {
        "/ip route": [],
        "/tool netwatch": [],
    };

    const routes = config["/ip route"];
    const netwatchRules = config["/tool netwatch"];
    const routingTable = Table ? `routing-table="${Table}"` : "";

    // 1. Create recursive host routes
    // These monitor connectivity to public IPs via ISP gateways
    interfaces.forEach((wan) => {
        const routeComment = `Route-to-${wan.network}-${wan.name}`;
        routes.push(
            `add dst-address="${wan.checkIP}" gateway="${wan.gateway}" \\
            ${routingTable} scope="10" comment="${routeComment}"`,
        );
    });

    // 2. Create main default routes pointing to the check IPs
    // These use the recursive routes to determine availability
    interfaces.forEach((wan) => {
        const routeComment = `CheckIP-Route-to-${wan.network}-${wan.name}`;
        // Distance pattern: 1, 5, 10, 15, 20, 25...
        const distance = wan.distance === 1 ? 1 : (wan.distance - 2) * 5 + 5;

        routes.push(
            `add check-gateway=ping dst-address="0.0.0.0/0" gateway="${wan.checkIP}" ${routingTable} \\
            distance="${distance}" target-scope="11" comment="${routeComment}"`,
        );
    });


    //     // 1. Create recursive host routes
    // // These monitor connectivity to public IPs via ISP gateways
    // interfaces.forEach((wan) => {
    //     const routeComment = `Route-to-${wan.network}-${wan.name}`;
    //     routes.push(
    //         `add dst-address="${wan.checkIP}" gateway="${wan.gateway}" \\
    //         ${routingTable} target-scope="10" scope="30" comment="${routeComment}"`,
    //     );
    // });

    // // 2. Create main default routes pointing to the check IPs
    // // These use the recursive routes to determine availability
    // interfaces.forEach((wan) => {
    //     const routeComment = `CheckIP-Route-to-${wan.network}-${wan.name}`;
    //     routes.push(
    //         `add dst-address="0.0.0.0/0" target-scope="10" scope="30" gateway="${wan.checkIP}"  \\
    //         ${routingTable} distance="${wan.distance * 5}" comment="${routeComment}"`,
    //     );
    // });

    // 3. Configure Netwatch entries with up/down scripts
    interfaces.forEach((wan) => {
        const interval = "5s"; 
        const timeout = "500ms";
        // const upScript = `/ip route enable [find comment=\\"CheckIP-Route-to-${wan.network}-${wan.name}\\"]; /log info \\"${wan.name} is UP, switching back\\"`;
        // const downScript = `/ip route disable [find comment=\\"CheckIP-Route-to-${wan.network}-${wan.name}\\"]; /log info \\"${wan.name} is DOWN, switching to backup\\"`;
        const upScript = `/ip route enable [find comment=\\"CheckIP-Route-to-${wan.network}-${wan.name}\\"]; `;
        const downScript = `/ip route disable [find comment=\\"CheckIP-Route-to-${wan.network}-${wan.name}\\"]; `;

        netwatchRules.push(
            `add host="${wan.checkIP}" interval=${interval} timeout=${timeout} \\
            ignore-initial-down=no ignore-initial-up=yes start-delay=0ms startup-delay=0s \\
            up-script="${upScript}" down-script="${downScript}" comment="Failover Netwatch - ${wan.name}"`,
        );
    });

    return config;
};

// Failover Scheduled - Advanced monitoring with multiple check IPs and thresholds
export const FailoverScheduled = ( interfaces: MultiWANInterface[], Table: string ): RouterConfig => {
    const config: RouterConfig = {
        "/ip route": [],
        "/system script": [],
        "/system scheduler": [],
    };

    const routes = config["/ip route"];
    const scripts = config["/system script"];
    const schedulers = config["/system scheduler"];
    const routingTable = Table ? `routing-table="${Table}"` : "";

    // 1. Create main default routes (controlled by scheduled scripts)
    interfaces.forEach((wan) => {
        routes.push(
            `add dst-address="0.0.0.0/0" gateway="${wan.gateway}" ${routingTable} \\
            distance=${wan.distance} comment="${wan.name}_route"`,
        );
    });

    // 2. Create specific host routes for script checks
    interfaces.forEach((wan) => {
        wan.checkIPs?.forEach((ip, index) => {
            routes.push(
                `add dst-address="${ip}" gateway="${wan.gateway}" ${routingTable} \\
                comment="${wan.name}_CHECK_ROUTE_${index + 1}" target-scope="10" scope="30"`,
            );
        });
    });

    // 3. Create health check scripts
    /* eslint-disable no-useless-escape */
    interfaces.forEach((wan) => {
        const threshold = wan.threshold || 1;
        const checkIpList = wan.checkIPs?.map((ip) => `"${ip}"`).join(",") || "";

        const scriptSource = `
:local wanName "${wan.name}";
:local routeComment "${wan.name}_route";
:local gatewayAddress "${wan.gateway}";
:local checkIps (${checkIpList});
:local unreachableCount 0;
:local threshold ${threshold};
:local totalIps [:len \$checkIps];

:foreach ip in=\$checkIps do={
  :if ([/ping \$ip count=3] = 0) do={
    :set unreachableCount (\$unreachableCount + 1);
  }
}

:if (\$unreachableCount >= \$threshold) do={
  :if (![/ip route get [find comment=\$routeComment] disabled]) do={
    /ip route disable [find comment=\$routeComment];
    :log error "WAN \$wanName (\$gatewayAddress) is DOWN - Ping to \$unreachableCount of \$totalIps IPs failed! Disabling route \$routeComment.";
  }
} else={
  :if ([/ip route get [find comment=\$routeComment] disabled]) do={
    /ip route enable [find comment=\$routeComment];
    :log info "WAN \$wanName (\$gatewayAddress) is UP - Ping to \$unreachableCount of \$totalIps IPs successful! Enabling route \$routeComment.";
  }
}
`;

        scripts.push(
            `add name="check-${wan.name.toLowerCase()}-script" source="${scriptSource}" \\
            comment="Failover Scheduled - ${wan.name} Health Check Script"`,
        );
    });
    /* eslint-enable no-useless-escape */

    // 4. Create scheduler entries to run scripts periodically
    interfaces.forEach((wan) => {
        const interval = wan.interval || "10s";
        schedulers.push(
            `add name="run-check-${wan.name.toLowerCase()}" interval=${interval} \\
            on-event="/system script run \\"check-${wan.name.toLowerCase()}-script\\"" \\
            comment="Failover Scheduled - Scheduler for ${wan.name}"`,
        );
    });

    return config;
};

// ECMP - Equal Cost Multi-Path routing (Load Balancing)
export const ECMP = ( interfaces: MultiWANInterface[], Table: string ): RouterConfig => {
    const config: RouterConfig = {
        "/ip route": [],
    };

    const routes = config["/ip route"];
    const routingTable = Table ? `routing-table="${Table}"` : "";

    // Create recursive routes if check IPs are provided
    interfaces.forEach((wan) => {
        if (wan.checkIP) {
            routes.push(
                `add dst-address="${wan.checkIP}" gateway=${wan.gateway} ${routingTable} \\
                scope=10 comment="ECMP Check - ${wan.name}"`,
            );
        }
    });

    // Create ECMP route with multiple gateways
    const gateways = interfaces
        .map((wan) => wan.checkIP || wan.gateway)
        .join(",");
    routes.push(
        `add check-gateway=ping dst-address="0.0.0.0/0" gateway=${gateways} ${routingTable} comment="ECMP Load Balancing"`,
    );

    return config;
};









// Bonding - Link Aggregation for combining multiple interfaces
export const Bonding = (bondingConfig: BondingConfig ): RouterConfig => {
    const bondConfig: RouterConfig = {
        "/interface bonding": [],
    };

    const {
        name,
        mode,
        slaves,
        ipAddress,
        arpMonitoring,
        miiMonitoring,
        mtu,
        lacp,
    } = bondingConfig;

    // Add IP address section if specified
    if (ipAddress) {
        bondConfig["/ip address"] = [];
    }

    const bondingRules = bondConfig["/interface bonding"];
    const bondName = name || "bonding";
    // const mode = mode || "balance-rr"
    // const slaves = slaves.join(",")

    // Build the bonding interface command
    let bondCommand = `add name="${bondName}" mode=${mode} slaves="${slaves}"`;

    // Add ARP monitoring if enabled
    if (arpMonitoring?.enabled && arpMonitoring.targets.length > 0) {
        bondCommand += ` link-monitoring=arp`;
        bondCommand += ` arp-ip-targets="${arpMonitoring.targets.join(",")}"`;

        if (arpMonitoring.interval) {
            bondCommand += ` arp-interval=${arpMonitoring.interval}`;
        }

        if (arpMonitoring.validateTime) {
            bondCommand += ` arp-validate-time=${arpMonitoring.validateTime}`;
        }
    }
    // Add MII monitoring if enabled (alternative to ARP)
    else if (miiMonitoring?.enabled) {
        bondCommand += ` link-monitoring=mii`;

        if (miiMonitoring.interval) {
            bondCommand += ` mii-interval=${miiMonitoring.interval}`;
        }
    }

    // Add MTU if specified
    if (mtu) {
        bondCommand += ` mtu=${mtu}`;
    }

    // Add LACP settings for 802.3ad mode
    if (mode === "802.3ad" && lacp) {
        if (lacp.rate) {
            bondCommand += ` lacp-rate=${lacp.rate}`;
        }
    }

    bondCommand += ` comment="Bonding Interface - ${mode} mode"`;
    bondingRules.push(bondCommand);

    // Add IP address if specified
    if (ipAddress) {
        bondConfig["/ip address"]!.push(
            `add address="${ipAddress}" interface="${bondName}" comment="IP for Bonding Interface"`,
        );
    }

    return bondConfig;
};

// Bonding with Load Balancing - Combines bonding with routing for multi-WAN
// Note: This function is currently commented out as it requires extending BondingConfig
// with gateway, checkIP, and distance properties
/*
export const BondingWithRouting = ( bondingConfigs: BondingConfig[] ): RouterConfig => {
    const config: RouterConfig = {
        "/interface bonding": [],
        "/ip route": [],
    };

    const bondingRules = config["/interface bonding"];
    const routes = config["/ip route"];

    // Create bonding interfaces
    bondingConfigs.forEach((bond) => {
        const mode = bond.mode || "balance-rr";
        const slaves = bond.slaves.join(",");

        bondingRules.push(
            `add name="${bond.name}" mode=${mode} slaves="${slaves}" comment="Bonding ${bond.name} - ${mode}"`,
        );

        // Add routes if gateway is specified
        if (bond.gateway) {
            if (bond.checkIP) {
                // Recursive routing for more reliable monitoring
                routes.push(
                    `add dst-address="${bond.checkIP}" gateway=${bond.gateway} scope=10 comment="Check ${bond.name}"`,
                );
                routes.push(
                    `add dst-address="0.0.0.0/0" gateway=${bond.checkIP} distance=${bond.distance || 1} check-gateway=ping comment="Route via ${bond.name}"`,
                );
            } else {
                // Simple gateway route
                routes.push(
                    `add dst-address="0.0.0.0/0" gateway=${bond.gateway} distance=${bond.distance || 1} check-gateway=ping comment="Route via ${bond.name}"`,
                );
            }
        }
    });

    return config;
};
*/
















