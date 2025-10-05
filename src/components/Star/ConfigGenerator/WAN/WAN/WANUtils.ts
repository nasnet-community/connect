import type { RouterConfig } from "../../ConfigGenerator";
import type {
    WANLinkConfig,
    WANLink,
} from "../../../StarContext/Utils/WANLinkType";
import { GetWANInterface } from "./WANInterfaceUtils";

export const WANIfaceList = ( InterfaceName: string, Network: string ): RouterConfig => {
    const config: RouterConfig = {
        "/interface list member": [],
    };
    config["/interface list member"].push(
        `add interface=${InterfaceName} list="WAN"`,
        `add interface=${InterfaceName} list="${Network}-WAN"`,
    );
    return config;
};

export const Geteway = ( gateway: string | undefined, interfaceName: string | undefined, network: string, name: string, distance: number = 1, table: string ): RouterConfig => {
    const config: RouterConfig = {
        "/ip route": [],
    };

    // Use RouterOS notation: gateway%interface when both are available, or just interface when gateway is not provided
    let gatewayValue: string;
    if (gateway && interfaceName) {
        gatewayValue = `${gateway}%${interfaceName}`;
    } else if (interfaceName) {
        gatewayValue = interfaceName;
    } else if (gateway) {
        gatewayValue = gateway;
    } else {
        gatewayValue = "";
    }
    
    let routeCommand = `add dst-address=0.0.0.0/0 gateway=${gatewayValue}`;

    // Add distance if not default
    if (distance !== 1) {
        routeCommand += ` distance=${distance}`;
    }

    // Add routing table
    routeCommand += ` routing-table=${table}`;

    // Add comment with standard format
    routeCommand += ` comment="Route-to-${network}-${name}"`;

    config["/ip route"].push(routeCommand);

    return config;
};

export const Route = ( wanLinkConfig: WANLinkConfig, networkType: "Foreign" | "Domestic", distance: number ): RouterConfig => {
    const { name, ConnectionConfig } = wanLinkConfig;
    const interfaceName = GetWANInterface(wanLinkConfig);
    const tableName = `to-${networkType}-${name}`;
    const network = networkType === "Foreign" ? "Foreign" : "Domestic";
    
    let gateway: string | undefined;

    // Determine gateway based on connection type
    if (ConnectionConfig?.pppoe) {
        // PPPoE: Use interface name only as gateway
        gateway = undefined;
        return Geteway(undefined, interfaceName, network, name, distance, tableName);
    } else if (ConnectionConfig?.lteSettings || wanLinkConfig.InterfaceConfig.InterfaceName.startsWith("lte")) {
        // LTE: Use interface name only as gateway
        gateway = undefined;
        return Geteway(undefined, interfaceName, network, name, distance, tableName);
    } else if (ConnectionConfig?.static) {
        // Static: Use gateway from static config + interface
        gateway = ConnectionConfig.static.gateway;
        return Geteway(gateway, interfaceName, network, name, distance, tableName);
    } else {
        // DHCP (default): Use default IPs based on network type
        gateway = networkType === "Foreign" ? "100.64.0.1" : "192.168.2.1";
        return Geteway(gateway, interfaceName, network, name, distance, tableName);
    }
};

export const getLinkCount = (wanLink: WANLink): number => {
    return wanLink.WANConfigs.length || 0;
};

