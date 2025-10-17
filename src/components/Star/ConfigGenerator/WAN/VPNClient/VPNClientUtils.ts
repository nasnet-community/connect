import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import type { VPNClientType, VPNClient } from "~/components/Star/StarContext";
import { DNSForeward, mergeMultipleConfigs } from "~/components/Star/ConfigGenerator";
// import type { WANLinkType } from "~/components/Star/StarContext";

// Check if a string is a Fully Qualified Domain Name (FQDN) vs an IP address
export const isFQDN = (address: string): boolean => {
    // Regular expression to match IPv4 address
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    // Regular expression to match IPv6 address (simplified)
    const ipv6Regex = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/;

    // If it matches an IP pattern, it's not an FQDN
    if (ipv4Regex.test(address) || ipv6Regex.test(address)) {
        return false;
    }

    // If it contains a dot and doesn't match IP pattern, likely an FQDN
    return address.includes('.');
};

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
        `add dst-address="0.0.0.0/0" gateway="${InterfaceName}" routing-table="${tableName}" scope=30 target-scope=10  comment="${comment}"`,
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

export const AddressListEntry = (Address: string): RouterConfig => {
    const config: RouterConfig = {
        "/ip firewall address-list": [],
    };

    config["/ip firewall address-list"].push(
        `add address="${Address}" list=VPNE comment="VPN-${Address} Endpoint for routing"`,
    );

    // If the address is a domain name (FQDN), create DNS forward entry through Foreign forwarder
    // This ensures VPN endpoint domains are resolved through domestic DNS servers
    if (isFQDN(Address)) {
        const dnsForward = DNSForeward(
            Address, 
            "Foreign", 
            `VPN Endpoint ${Address} - Route through Foreign DNS`
        );
        return mergeMultipleConfigs(config, dnsForward);
    }

    return config;
};

export const VPNEndpointMangle = (): RouterConfig => {
    const config: RouterConfig = {
        "/ip firewall mangle": [],
    };

    config["/ip firewall mangle"].push(
        `add action=mark-connection chain=output comment="VPN Endpoint" \\
        dst-address-list="VPNE" new-connection-mark="conn-VPNE" passthrough=yes`,
        `add action=mark-routing chain=output comment="VPN Endpoint" \\
        connection-mark="conn-VPNE" dst-address-list="VPNE" new-routing-mark="to-Foreign" passthrough=no`,
        `add action=mark-routing chain=output comment="VPN Endpoint" \\
        dst-address-list="VPNE" new-routing-mark="to-Foreign" passthrough=no`,
    );

    return config;
};

export const AddressList = (Address: string): RouterConfig => {
    const addressConfig = AddressListEntry(Address);
    const mangleConfig = VPNEndpointMangle();
    
    return {
        "/ip firewall address-list": addressConfig["/ip firewall address-list"],
        "/ip firewall mangle": mangleConfig["/ip firewall mangle"],
    };
};

export const IPAddress = ( InterfaceName: string, Address: string ): RouterConfig => {
    const config: RouterConfig = {
        "/ip address": [],
    };

    config["/ip address"].push(
        `add address="${Address}" interface="${InterfaceName}" comment="VPN-${InterfaceName}"`,
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

    const addressListConfig = AddressListEntry(EndpointAddress);
    config["/ip firewall address-list"].push(
        ...addressListConfig["/ip firewall address-list"],
    );

    return config;
};

export const GetAllVPNInterfaceNames = (vpnClient: VPNClient): string[] => {
    const interfaceNames: string[] = [];
    
    // Process Wireguard configs
    if (vpnClient.Wireguard) {
        vpnClient.Wireguard.forEach(config => {
            interfaceNames.push(GenerateVCInterfaceName(config.Name, "Wireguard"));
        });
    }
    
    // Process OpenVPN configs
    if (vpnClient.OpenVPN) {
        vpnClient.OpenVPN.forEach(config => {
            interfaceNames.push(GenerateVCInterfaceName(config.Name, "OpenVPN"));
        });
    }
    
    // Process PPTP configs
    if (vpnClient.PPTP) {
        vpnClient.PPTP.forEach(config => {
            interfaceNames.push(GenerateVCInterfaceName(config.Name, "PPTP"));
        });
    }
    
    // Process L2TP configs
    if (vpnClient.L2TP) {
        vpnClient.L2TP.forEach(config => {
            interfaceNames.push(GenerateVCInterfaceName(config.Name, "L2TP"));
        });
    }
    
    // Process SSTP configs
    if (vpnClient.SSTP) {
        vpnClient.SSTP.forEach(config => {
            interfaceNames.push(GenerateVCInterfaceName(config.Name, "SSTP"));
        });
    }
    
    // Process IKeV2 configs
    if (vpnClient.IKeV2) {
        vpnClient.IKeV2.forEach(config => {
            interfaceNames.push(GenerateVCInterfaceName(config.Name, "IKeV2"));
        });
    }
    
    return interfaceNames;
};

export const GetVPNInterfaceName = (name: string, protocol: VPNClientType): string => {
    return GenerateVCInterfaceName(name, protocol);
};