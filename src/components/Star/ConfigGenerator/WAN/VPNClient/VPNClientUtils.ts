import type { RouterConfig } from "../../ConfigGenerator";
import type { VPNClientType } from "../../../StarContext/CommonType";
// import type { WANLinkType } from "../../../StarContext/ChooseType";


export const GenerateVCInterfaceName = (Name: string, protocol: VPNClientType): string => {
    switch (protocol) {
        case "Wireguard":
            return `wireguard-client-${Name}`;
        case "OpenVPN":
            return `ovpn-client-${Name}`;
        case "PPTP":
            return `pptp-client-${Name}`;
        case "L2TP":
            return `l2tp-client-${Name}`;
        case "SSTP":
            return `sstp-client-${Name}`;
        case "IKeV2":
            return `ike2-client-${Name}`;
        default:
            return `vpn-client-${Name}`;
    }
}

export const RouteToVPN = ( InterfaceName: string, name: string ): RouterConfig => {
    const config: RouterConfig = {
        "/ip route": [],
    };

    const tableName = `to-VPN-${name}`;
    const comment = `Route-to-VPN-${name}`;

    config["/ip route"].push(
        `add comment="${comment}" disabled=no distance=1 dst-address=0.0.0.0/0 gateway=${InterfaceName} \\
        pref-src="" routing-table=${tableName} scope=30 suppress-hw-offload=no target-scope=10`,
    );

    return config;
};

export const InterfaceList = (InterfaceName: string): RouterConfig => {
    const config: RouterConfig = {
        "/interface list member": [],
    };

    config["/interface list member"].push(
        `add interface="${InterfaceName}" list="WAN" comment="VPN-${InterfaceName}"`,
        `add interface="${InterfaceName}" list="VPN-WAN" comment="VPN-${InterfaceName}"`,
    );

    return config;
};

export const AddressList = (Address: string): RouterConfig => {
    const config: RouterConfig = {
        "/ip firewall address-list": [],
        "/ip firewall mangle": [],
    };

    config["/ip firewall address-list"].push(
        `add address="${Address}" list=VPNE comment="VPN-${Address} Endpoint for routing"`,
    );
    config["/ip firewall mangle"].push(
        `add action=mark-connection chain=output comment="VPN Endpoint" \\
        dst-address-list=VPNE new-connection-mark=conn-VPNE passthrough=yes`,
        `add action=mark-routing chain=output comment="VPN Endpoint" \\
        connection-mark=conn-VPNE dst-address-list=VPNE new-routing-mark=to-FRN passthrough=no`,
        `add action=mark-routing chain=output comment="VPN Endpoint" \\
        dst-address-list=VPNE new-routing-mark=to-FRN passthrough=no`,
    );

    return config;
};

export const IPAddress = ( InterfaceName: string, Address: string ): RouterConfig => {
    const config: RouterConfig = {
        "/ip address": [],
    };

    config["/ip address"].push(
        `add address=${Address} interface=${InterfaceName} comment="VPN-${InterfaceName}"`,
    );

    return config;
};

// export const DNSVPN = (DNS: string, WANLinkType: WANLinkType): RouterConfig => {
//     const config: RouterConfig = {
//         "/ip firewall nat": [],
//     };

//     if (DomesticLink) {
//         config["/ip firewall nat"].push(
//             `add action=dst-nat chain=dstnat comment="DNS VPN" dst-port=53 \\
//             protocol=udp src-address-list=VPN-LAN to-addresses=${DNS}`,
//             `add action=dst-nat chain=dstnat comment="DNS VPN" dst-port=53 \\
//             protocol=tcp src-address-list=VPN-LAN to-addresses=${DNS}`,
//             `add action=dst-nat chain=dstnat comment="DNS Split" dst-port=53 \\
//             protocol=udp src-address-list=Split-LAN to-addresses=${DNS}`,
//             `add action=dst-nat chain=dstnat comment="DNS Split" dst-port=53 \\
//             protocol=tcp src-address-list=Split-LAN to-addresses=${DNS}`,
//         );
//     } else {
//         config["/ip firewall nat"].push(
//             `add action=dst-nat chain=dstnat comment="DNS VPN" dst-port=53 \\
//             protocol=udp src-address-list=VPN-LAN to-addresses=${DNS}`,
//             `add action=dst-nat chain=dstnat comment="DNS VPN" dst-port=53 \\
//             protocol=tcp src-address-list=VPN-LAN to-addresses=${DNS}`,
//         );
//     }

//     return config;
// };

export const BaseVPNConfig = ( InterfaceName: string, EndpointAddress: string, name: string): RouterConfig => {
    const config: RouterConfig = {
        "/ip address": [],
        "/ip firewall nat": [],
        "/interface list member": [],
        "/ip route": [],
        "/ip firewall address-list": [],
        "/ip firewall mangle": [],
    };

    // call the functions and add the output of the functions to the config
    // const addressConfig = AddressList(InterfaceName, EndpointAddress);
    // config["/ip address"].push(...addressConfig["/ip address"]);

    // const dnsConfig = DNSVPN(DNS, DomesticLink);
    // config["/ip firewall nat"].push(...dnsConfig["/ip firewall nat"]);

    const interfaceListConfig = InterfaceList(InterfaceName);
    config["/interface list member"].push(
        ...interfaceListConfig["/interface list member"],
    );

    const routeConfig = RouteToVPN(InterfaceName, name);
    config["/ip route"].push(...routeConfig["/ip route"]);

    const addressListConfig = AddressList(EndpointAddress);
    config["/ip firewall address-list"].push(
        ...addressListConfig["/ip firewall address-list"],
    );
    config["/ip firewall mangle"].push(
        ...addressListConfig["/ip firewall mangle"],
    );

    return config;
};