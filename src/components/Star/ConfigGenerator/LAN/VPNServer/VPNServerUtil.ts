import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import { SubnetToFirstIP } from "~/components/Star/ConfigGenerator";
import type { VPNServer } from "~/components/Star/StarContext";
// import type { Credentials } from "~/components/Star/StarContext";

export interface VPNFirewallRule {
    port: number | string;
    protocol: "tcp" | "udp" | "tcp,udp";
    comment: string;
    interfaceList?: string;
}

export interface VPNAddressList {
    address: string;
    listName: string;
}

export interface VPNInterfaceList {
    interfaceName: string;
    lists: string[];
}

export interface IPPoolConfig {
    name: string;
    ranges: string;
    nextPool?: string;
    comment?: string;
}

// export function addNetworkSegmentation( config: RouterConfig, vpnServer: VPNServer ): void {
//     const { Users } = vpnServer;
//     const vpnTypes = [...new Set(Users.flatMap((user) => user.VPNType))];

//     // Create separate routing tables for each VPN type
//     if (!config["/routing table"]) {
//         config["/routing table"] = [];
//     }

//     vpnTypes.forEach((vpnType) => {
//         config["/routing table"].push(
//             `add fib name=vpn-${vpnType.toLowerCase()}`,
//         );
//     });

//     // Add mangle rules for traffic separation
//     if (!config["/ip firewall mangle"]) {
//         config["/ip firewall mangle"] = [];
//     }

//     vpnTypes.forEach((vpnType) => {
//         const networkMap = {
//             Wireguard: "192.168.170.0/24",
//             OpenVPN: "192.168.60.0/24",
//             PPTP: "192.168.70.0/24",
//             L2TP: "192.168.80.0/24",
//             SSTP: "192.168.90.0/24",
//             IKeV2: "192.168.77.0/24",
//         };

//         const network = networkMap[vpnType as keyof typeof networkMap];
//         if (network) {
//             config["/ip firewall mangle"].push(
//                 `add action=mark-routing chain=prerouting comment="Route ${vpnType} traffic" new-routing-mark=vpn-${vpnType.toLowerCase()} passthrough=yes src-address=${network}`,
//             );
//         }
//     });

//     // Add comments about network segmentation
//     if (!config[""]) {
//         config[""] = [];
//     }

//     config[""].push(
//         `# Network Segmentation enabled for VPN types: ${vpnTypes.join(", ")}`,
//     );
// }

export function formatArrayValue(value: any): string {
    if (Array.isArray(value)) {
        return value.join(",");
    }
    return String(value);
}

export function formatBooleanValue(value: boolean): string {
    return value ? "yes" : "no";
}

// VPN Server Utility Functions

// export const generateVPNFirewallRules = ( rules: VPNFirewallRule[] ): RouterConfig => {
//     const config: RouterConfig = {
//         "/ip firewall filter": [],
//     };

//     rules.forEach((rule) => {
//         const interfaceList = rule.interfaceList || "DOM-WAN";

//         if (rule.protocol === "tcp,udp") {
//             // Add separate rules for TCP and UDP
//             config["/ip firewall filter"].push(
//                 `add action=accept chain=input comment="${rule.comment} TCP" dst-port=${rule.port} \\
//                 in-interface-list=${interfaceList} protocol=tcp`,
//             );
//             config["/ip firewall filter"].push(
//                 `add action=accept chain=input comment="${rule.comment} UDP" dst-port=${rule.port} \\
//                 in-interface-list=${interfaceList} protocol=udp`,
//             );
//         } else {
//             config["/ip firewall filter"].push(
//                 `add action=accept chain=input comment="${rule.comment}" dst-port=${rule.port} \\
//                 in-interface-list=${interfaceList} protocol=${rule.protocol}`,
//             );
//         }
//     });

//     return config;
// };

// export const generateVPNAddressLists = ( addressLists: VPNAddressList[] ): RouterConfig => {
//     const config: RouterConfig = {
//         "/ip firewall address-list": [],
//     };

//     addressLists.forEach((addressList) => {
//         config["/ip firewall address-list"].push(
//             `add address="${addressList.address}" list="${addressList.listName}"`,
//         );
//     });

//     return config;
// };

// export const generateVPNInterfaceLists = ( interfaceLists: VPNInterfaceList[] ): RouterConfig => {
//     const config: RouterConfig = {
//         "/interface list member": [],
//     };

//     interfaceLists.forEach((interfaceList) => {
//         interfaceList.lists.forEach((listName) => {
//             config["/interface list member"].push(
//                 `add interface="${interfaceList.interfaceName}" list="${listName}"`,
//             );
//         });
//     });

//     return config;
// };

// export const generateVPNServerNetworkConfig = ( firewallRules: VPNFirewallRule[], addressLists: VPNAddressList[], interfaceLists: VPNInterfaceList[] ): RouterConfig => {
//     const config: RouterConfig = {
//         "/ip firewall filter": [],
//         "/ip firewall address-list": [],
//         "/interface list member": [],
//     };

//     // Merge firewall rules
//     const firewallConfig = generateVPNFirewallRules(firewallRules);
//     config["/ip firewall filter"].push(
//         ...firewallConfig["/ip firewall filter"],
//     );

//     // Merge address lists
//     const addressConfig = generateVPNAddressLists(addressLists);
//     config["/ip firewall address-list"].push(
//         ...addressConfig["/ip firewall address-list"],
//     );

//     // Merge interface lists
//     const interfaceConfig = generateVPNInterfaceLists(interfaceLists);
//     config["/interface list member"].push(
//         ...interfaceConfig["/interface list member"],
//     );

//     return config;
// };



// export function addCommonVPNConfiguration( config: RouterConfig, vpnServer: VPNServer ): void {
//     const { Users } = vpnServer;

//     // Create common PPP profiles if needed
//     const vpnTypes = Users.flatMap((user) => user.VPNType);
//     const uniqueVpnTypes = [...new Set(vpnTypes)];

//     // Add PPP profiles for PPP-based VPN types
//     const pppBasedVpns = ["OpenVPN", "PPTP", "L2TP", "SSTP"];
//     const neededProfiles = uniqueVpnTypes.filter((type) =>
//         pppBasedVpns.includes(type),
//     );

//     if (neededProfiles.length > 0) {
//         if (!config["/ppp profile"]) {
//             config["/ppp profile"] = [];
//         }

//         // Add profiles for each VPN type if not already added
//         if (
//             neededProfiles.includes("OpenVPN") &&
//             !config["/ppp profile"].some((cmd) => cmd.includes("ovpn-profile"))
//         ) {
//             config["/ppp profile"].push(
//                 "add name=ovpn-profile dns-server=1.1.1.1 local-address=192.168.60.1 remote-address=ovpn-pool use-encryption=yes",
//             );
//         }

//         if (
//             neededProfiles.includes("PPTP") &&
//             !config["/ppp profile"].some((cmd) => cmd.includes("pptp-profile"))
//         ) {
//             config["/ppp profile"].push(
//                 "add name=pptp-profile dns-server=1.1.1.1 local-address=192.168.70.1 remote-address=pptp-pool use-encryption=yes",
//             );
//         }

//         if (
//             neededProfiles.includes("L2TP") &&
//             !config["/ppp profile"].some((cmd) => cmd.includes("l2tp-profile"))
//         ) {
//             config["/ppp profile"].push(
//                 "add name=l2tp-profile dns-server=1.1.1.1 local-address=192.168.80.1 remote-address=l2tp-pool use-encryption=yes",
//             );
//         }

//         if (
//             neededProfiles.includes("SSTP") &&
//             !config["/ppp profile"].some((cmd) => cmd.includes("sstp-profile"))
//         ) {
//             config["/ppp profile"].push(
//                 "add name=sstp-profile dns-server=1.1.1.1 local-address=192.168.90.1 remote-address=sstp-pool use-encryption=yes",
//             );
//         }
//     }

//     // Add IP pools for PPP-based VPNs if needed
//     if (neededProfiles.length > 0) {
//         if (!config["/ip pool"]) {
//             config["/ip pool"] = [];
//         }

//         if (
//             neededProfiles.includes("OpenVPN") &&
//             !config["/ip pool"].some((cmd) => cmd.includes("ovpn-pool"))
//         ) {
//             config["/ip pool"].push(
//                 "add name=ovpn-pool ranges=192.168.60.5-192.168.60.250",
//             );
//         }

//         if (
//             neededProfiles.includes("PPTP") &&
//             !config["/ip pool"].some((cmd) => cmd.includes("pptp-pool"))
//         ) {
//             config["/ip pool"].push(
//                 "add name=pptp-pool ranges=192.168.70.5-192.168.70.250",
//             );
//         }

//         if (
//             neededProfiles.includes("L2TP") &&
//             !config["/ip pool"].some((cmd) => cmd.includes("l2tp-pool"))
//         ) {
//             config["/ip pool"].push(
//                 "add name=l2tp-pool ranges=192.168.80.5-192.168.80.250",
//             );
//         }

//         if (
//             neededProfiles.includes("SSTP") &&
//             !config["/ip pool"].some((cmd) => cmd.includes("sstp-pool"))
//         ) {
//             config["/ip pool"].push(
//                 "add name=sstp-pool ranges=192.168.90.5-192.168.90.250",
//             );
//         }
//     }

//     // Add common firewall rules for VPN server access
//     if (!config["/ip firewall filter"]) {
//         config["/ip firewall filter"] = [];
//     }

//     // Add VPN server interface lists
//     if (!config["/interface list member"]) {
//         config["/interface list member"] = [];
//     }

//     // Add common address lists for VPN networks
//     if (!config["/ip firewall address-list"]) {
//         config["/ip firewall address-list"] = [];
//     }

//     // Add NAT rules for VPN clients to access internet
//     if (!config["/ip firewall nat"]) {
//         config["/ip firewall nat"] = [];
//     }

//     config["/ip firewall nat"].push(
//         'add action=masquerade chain=srcnat comment="NAT for VPN clients" out-interface-list=WAN src-address-list=VPN-LAN',
//     );

//     // Add forward rules to allow VPN clients to access LAN and internet
//     config["/ip firewall filter"].push(
//         'add action=accept chain=forward comment="Allow VPN to LAN" src-address-list=VPN-LAN dst-address-list=LOCAL-IP',
//         'add action=accept chain=forward comment="Allow LAN to VPN" src-address-list=LOCAL-IP dst-address-list=VPN-LAN',
//         'add action=accept chain=forward comment="Allow VPN to Internet" src-address-list=VPN-LAN out-interface-list=WAN',
//     );

//     // Add comments about VPN server configuration
//     if (!config[""]) {
//         config[""] = [];
//     }

//     config[""].push(
//         `# VPN Server Configuration Summary:`,
//         `# Total users: ${Users.length}`,
//         `# Configured VPN types: ${uniqueVpnTypes.join(", ")}`,
//         `# Users per VPN type:`,
//     );

//     uniqueVpnTypes.forEach((vpnType) => {
//         const userCount = Users.filter((user) =>
//             user.VPNType.includes(vpnType),
//         ).length;
//         config[""].push(`#   ${vpnType}: ${userCount} users`);
//     });
// }

// // Utility function to get configured VPN protocols from StarContext
// export const getConfiguredVPNProtocols = ( vpnServer: VPNServer ): string[] => {
//     if (!vpnServer) return [];

//     const protocols: string[] = [];

//     if (vpnServer.WireguardServers && vpnServer.WireguardServers.length > 0) {
//         protocols.push("Wireguard");
//     }
//     if (vpnServer.OpenVpnServer) {
//         protocols.push("OpenVPN");
//     }
//     if (vpnServer.PptpServer) {
//         protocols.push("PPTP");
//     }
//     if (vpnServer.L2tpServer) {
//         protocols.push("L2TP");
//     }
//     if (vpnServer.SstpServer) {
//         protocols.push("SSTP");
//     }
//     if (vpnServer.Ikev2Server) {
//         protocols.push("IKeV2");
//     }

//     return protocols;
// };

// // Utility function to check if a specific VPN protocol is configured
// export const isVPNProtocolConfigured = ( vpnServer: VPNServer, protocol: string ): boolean => {
//     if (!vpnServer) return false;

//     switch (protocol.toLowerCase()) {
//         case "wireguard":
//             return !!(
//                 vpnServer.WireguardServers &&
//                 vpnServer.WireguardServers.length > 0
//             );
//         case "openvpn":
//             return !!vpnServer.OpenVpnServer;
//         case "pptp":
//             return !!vpnServer.PptpServer;
//         case "l2tp":
//             return !!vpnServer.L2tpServer;
//         case "sstp":
//             return !!vpnServer.SstpServer;
//         case "ikev2":
//             return !!vpnServer.Ikev2Server;
//         default:
//             return false;
//     }
// };

// // Utility function to get VPN users for a specific protocol
// export const getVPNUsersForProtocol = ( vpnServer: VPNServer, protocol: string ): Credentials[] => {
//     if (!vpnServer || !vpnServer.Users) return [];

//     return vpnServer.Users.filter((user) =>
//         user.VPNType.includes(protocol as any),
//     );
// };

// Function to generate inbound traffic marking rules for VPN server
export const VSInboundTraffic = ( vpnServer: VPNServer ): RouterConfig => {
    const config: RouterConfig = {
        "/ip firewall mangle": [],
    };

    if (!vpnServer) {
        return config;
    }

    // Add routing rule for outbound VPN replies
    if (config["/ip firewall mangle"].length > 2) {
        // More than just comments
        config["/ip firewall mangle"].push(
            "",
            `add action=mark-routing chain=output comment="Route VPN Server Replies via Domestic WAN" \\
                connection-mark=conn-vpn-server new-routing-mark=to-DOM passthrough=no`,
        );
    }

    return config;
};

export const VSInterfaceList = ( interfaceName: string, VSNetwork: string, comment?: string ): RouterConfig => {
    const config: RouterConfig = {
        "/interface list member": [],
    };
    
    config["/interface list member"].push(
        `add interface="${interfaceName}" list="LAN" ${comment ? `comment="${comment}"` : ""}`,
        `add interface="${interfaceName}" list="${VSNetwork}-LAN" ${comment ? `comment="${comment}"` : ""}`,
    );

    return config;
}

export const VSAddressList = ( subnet: string, VSNetwork: string, comment?: string ): RouterConfig => {
    const config: RouterConfig = {
        "/ip firewall address-list": [],
    };

    config["/ip firewall address-list"].push(
        `add address="${subnet}" list="${VSNetwork}-LAN" ${comment ? `comment="${comment}"` : ""}`,
    );

    return config;
}

export const generateIPPool = (poolConfig: IPPoolConfig): string[] => {
    const poolParams: string[] = [
        `name="${poolConfig.name}-pool"`,
        `ranges=${poolConfig.ranges}`,
    ];

    if (poolConfig.nextPool) {
        poolParams.push(`next-pool=${poolConfig.nextPool}`);
    }

    if (poolConfig.comment) {
        poolParams.push(`comment="${poolConfig.comment}"`);
    }

    return [`add ${poolParams.join(" ")}`];
};

export const VSPorfile = (subnet: string, VSNetwork: string, name: string ): RouterConfig => {
    const config: RouterConfig = {
        "/ppp profile": [],
    };

    const PoolName = name + "-pool";
    const ProfileName = name + "-profile";
    // LocalAddress and DNS Must be the first IP of the subnet use the functions in the Subnet
    const LocalAddress = SubnetToFirstIP(subnet);



    config["/ppp profile"].push(
        `add address-list="${VSNetwork}-LAN" dns-server="${LocalAddress}" interface-list="${VSNetwork}-LAN" local-address="${LocalAddress}" name="${ProfileName}" \\
        remote-address="${PoolName}" use-encryption=yes use-ipv6=no use-upnp=yes`,
    );

    return config;
}
