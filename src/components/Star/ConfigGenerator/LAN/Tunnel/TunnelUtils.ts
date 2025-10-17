import { type RouterConfig, CommandShortner } from "~/components/Star/ConfigGenerator";
import { SubnetToFirstUsableIP } from "~/components/Star/ConfigGenerator/utils/Subnet";
import type {
    IpipTunnelConfig,
    EoipTunnelConfig,
    GreTunnelConfig,
    VxlanInterfaceConfig,
    Tunnel,
    SubnetConfig,
} from "~/components/Star/StarContext";


// Utility function to generate IP address configuration
export const generateIPAddress = ( address: string, interfaceName: string, comment?: string ): RouterConfig => {
    const config: RouterConfig = {
        "/ip address": [],
    };

    const addressParams: string[] = [
        `address="${address}"`,
        `interface="${interfaceName}"`,
    ];

    if (comment) {
        addressParams.push(`comment="${comment}"`);
    }

    config["/ip address"].push(`add ${addressParams.join(" ")}`);

    return config;
};

// // Utility function to generate interface list member configuration
// export const generateInterfaceList = ( interfaceName: string, lists: string[] ): RouterConfig => {
//     const config: RouterConfig = {
//         "/interface list member": [],
//     };

//     lists.forEach((listName) => {
//         const listParams: string[] = [
//             `interface="${interfaceName}"`,
//             `list="${listName}"`,
//         ];

//         config["/interface list member"].push(`add ${listParams.join(" ")}`);
//     });

//     return config;
// };

// // Utility function to generate address list configuration
// export const generateAddressList = ( address: string, listName: string, comment?: string ): RouterConfig => {
//     const config: RouterConfig = {
//         "/ip firewall address-list": [],
//     };

//     const addressListParams: string[] = [
//         `address="${address}"`,
//         `list="${listName}"`,
//     ];

//     if (comment) {
//         addressListParams.push(`comment="${comment}"`);
//     }

//     config["/ip firewall address-list"].push(
//         `add ${addressListParams.join(" ")}`,
//     );

//     return config;
// };

// Utility function to add tunnel interface to interface lists
export const TunnelInterfaceList = ( interfaceName: string, networkType: string, comment?: string ): RouterConfig => {
    const config: RouterConfig = {
        "/interface list member": [],
    };

    const commentStr = comment ? `comment="${comment}"` : "";

    config["/interface list member"].push(
        `add interface="${interfaceName}" list="LAN" ${commentStr}`,
        `add interface="${interfaceName}" list="${networkType}-LAN" ${commentStr}`,
    );

    return config;
};

// Utility function to add tunnel subnet to address lists
export const TunnelAddressList = ( subnet: string, networkType: string, comment?: string ): RouterConfig => {
    const config: RouterConfig = {
        "/ip firewall address-list": [],
    };

    const commentStr = comment ? `comment="${comment}"` : "";

    config["/ip firewall address-list"].push(
        `add address="${subnet}" list="${networkType}-LAN" ${commentStr}`,
    );

    return config;
};

// Helper function to extract CIDR prefix from subnet string
export const extractSubnetPrefix = (subnet: string): string => {
    return subnet.split("/")[1] || "24";
};

// Helper function to build tunnel IP address with subnet prefix
export const buildTunnelIPAddress = ( localAddress: string, subnet: SubnetConfig ): string => {
    const prefix = extractSubnetPrefix(subnet.subnet);
    
    // If localAddress is empty or undefined, use the first usable IP from the subnet
    const ip = localAddress && localAddress.trim() !== "" 
        ? localAddress 
        : SubnetToFirstUsableIP(subnet.subnet);
    
    return `${ip}/${prefix}`;
};

// Helper function to handle IPsec and fast path logic (shared by IPIP, EoIP, GRE)
export const handleIPsecAndFastPath = (
    params: string[],
    config: { ipsecSecret?: string; allowFastPath?: boolean }
): void => {
    // Business logic: if ipsecSecret is used, allowFastPath must be false
    if (config.ipsecSecret && config.allowFastPath !== false) {
        params.push(`allow-fast-path=no`);
    } else if (config.allowFastPath !== undefined) {
        params.push(`allow-fast-path=${config.allowFastPath ? "yes" : "no"}`);
    }
};

// Helper function to add all subnet-based configurations for a tunnel
export const addTunnelSubnetConfigurations = (
    configs: RouterConfig[],
    tunnelConfig: IpipTunnelConfig | EoipTunnelConfig | GreTunnelConfig | VxlanInterfaceConfig,
    subnet: SubnetConfig,
    tunnelType: "IPIP" | "EoIP" | "GRE" | "VXLAN"
): void => {
    const networkType = tunnelConfig.NetworkType || "VPN";
    
    // Add IP address to tunnel interface
    configs.push(generateIPAddress(
        buildTunnelIPAddress(tunnelConfig.localAddress, subnet),
        tunnelConfig.name,
        `${tunnelType} tunnel ${tunnelConfig.name}`
    ));

    // Add interface to interface lists
    configs.push(TunnelInterfaceList(
        tunnelConfig.name,
        networkType,
        `${tunnelType} tunnel ${tunnelConfig.name}`
    ));

    // Add subnet to address list
    configs.push(TunnelAddressList(
        subnet.subnet,
        networkType,
        `${tunnelType} tunnel subnet ${tunnelConfig.name}`
    ));
};


// Function to generate inbound traffic marking rules for tunnel protocols
export const TunnelInboundTraffic = (tunnel: Tunnel): RouterConfig => {
    const config: RouterConfig = {
        "/ip firewall mangle": [],
    };

    // // Add comment header
    // config["/ip firewall mangle"].push(
    //     "# --- Tunnel Server Inbound Traffic Marking ---",
    //     "# Mark inbound tunnel connections and route outbound replies",
    // );

    // Check for IPIP tunnels - single rule for all IPIP tunnels (protocol-based)
    if (tunnel.IPIP && tunnel.IPIP.length > 0) {
        config["/ip firewall mangle"].push(
            `add action=mark-connection chain=input comment="Mark Inbound IPIP Tunnel Connections" \\
                connection-state=new in-interface-list="Domestic-WAN" protocol="ipip" \\
                new-connection-mark="conn-tunnel-server" passthrough=yes`,
        );
    }

    // Check for GRE/EoIP tunnels - single rule for all GRE/EoIP tunnels (protocol-based)
    if (
        (tunnel.Eoip && tunnel.Eoip.length > 0) ||
        (tunnel.Gre && tunnel.Gre.length > 0)
    ) {
        config["/ip firewall mangle"].push(
            `add action=mark-connection chain=input comment="Mark Inbound GRE/EoIP Tunnel Connections" \\
                connection-state=new in-interface-list="Domestic-WAN" protocol="gre" \\
                new-connection-mark="conn-tunnel-server" passthrough=yes`,
        );
    }

    // Check for VXLAN tunnels (can have multiple instances with different ports)
    if (tunnel.Vxlan && tunnel.Vxlan.length > 0) {
        tunnel.Vxlan.forEach((vxlanConfig) => {
            const port = vxlanConfig.port || 4789; // Default VXLAN port
            const interfaceName = vxlanConfig.name;
            const vni = vxlanConfig.vni;

            config["/ip firewall mangle"].push(
                `add action=mark-connection chain=input comment="Mark Inbound VXLAN Tunnel Connections (${interfaceName}, VNI ${vni}, Port ${port})" \\
                    connection-state=new in-interface-list="Domestic-WAN" protocol="udp" dst-port="${port}" \\
                    new-connection-mark="conn-tunnel-server" passthrough=yes`,
            );
        });
    }

    // Add routing rule for outbound tunnel replies (only if we have any tunnels configured)
    const hasTunnels =
        (tunnel.IPIP && tunnel.IPIP.length > 0) ||
        (tunnel.Eoip && tunnel.Eoip.length > 0) ||
        (tunnel.Gre && tunnel.Gre.length > 0) ||
        (tunnel.Vxlan && tunnel.Vxlan.length > 0);

    if (hasTunnels) {
        config["/ip firewall mangle"].push(
            "",
            // "# --- Route Outbound Tunnel Replies ---",
            `add action=mark-routing chain=output comment="Route Tunnel Server Replies via Domestic WAN" \\
                connection-mark="conn-tunnel-server" new-routing-mark="to-Domestic" passthrough=no`,
        );
    }

    return config;
};

// Helper function to find matching subnet by name (follows VPNServer pattern)
export const findSubnetByName = (tunnelName: string, subnetList?: SubnetConfig[]): SubnetConfig | undefined => {
    if (!subnetList || !Array.isArray(subnetList)) return undefined;
    
    // Try exact name match
    let matched = subnetList.find((s) => s.name === tunnelName);
    if (matched) return matched;
    
    // Try case-insensitive match
    matched = subnetList.find((s) => s.name.toLowerCase() === tunnelName.toLowerCase());
    if (matched) return matched;
    
    // Try with protocol prefix
    matched = subnetList.find((s) => s.name.toLowerCase().includes(tunnelName.toLowerCase()));
    if (matched) return matched;
    
    return undefined;
};


export const IPIPInterface = (ipip: IpipTunnelConfig): RouterConfig => {
    const config: RouterConfig = {
        "/interface ipip": [],
    };

    // Build IPIP tunnel command parameters
    const interfaceParams: string[] = [
        `name=${ipip.name}`,
        `remote-address=${ipip.remoteAddress}`,
    ];

    // Add optional parameters
    if (ipip.disabled !== undefined)
        interfaceParams.push(`disabled=${ipip.disabled ? "yes" : "no"}`);
    if (ipip.comment !== undefined)
        interfaceParams.push(`comment="${ipip.comment}"`);
    else
        interfaceParams.push(`comment="${ipip.name} IPIP Tunnel for Network ${ipip.NetworkType}"`);
    if (ipip.ipsecSecret !== undefined)
        interfaceParams.push(`ipsec-secret="${ipip.ipsecSecret}"`);
    if (ipip.dontFragment !== undefined)
        interfaceParams.push(`dont-fragment=${ipip.dontFragment}`);

    // Handle IPsec and fast path logic
    handleIPsecAndFastPath(interfaceParams, ipip);

    config["/interface ipip"].push(`add ${interfaceParams.join(" ")}`);

    return CommandShortner(config);
};
export const EoipInterface = (eoip: EoipTunnelConfig): RouterConfig => {
    const config: RouterConfig = {
        "/interface eoip": [],
    };

    // Build EoIP tunnel command parameters
    const interfaceParams: string[] = [
        `name=${eoip.name}`,
        `remote-address=${eoip.remoteAddress}`,
        `tunnel-id=${eoip.tunnelId}`,
    ];

    // Add optional parameters
    if (eoip.disabled !== undefined)
        interfaceParams.push(`disabled=${eoip.disabled ? "yes" : "no"}`);
    if (eoip.comment !== undefined)
        interfaceParams.push(`comment="${eoip.comment}"`);
    else
        interfaceParams.push(`comment="${eoip.name} EoIP Tunnel for Network ${eoip.NetworkType}"`);
    if (eoip.ipsecSecret !== undefined)
        interfaceParams.push(`ipsec-secret="${eoip.ipsecSecret}"`);

    // Handle IPsec and fast path logic
    handleIPsecAndFastPath(interfaceParams, eoip);

    if (eoip.dontFragment !== undefined)
        interfaceParams.push(`dont-fragment=${eoip.dontFragment}`);
    if (eoip.loopProtect !== undefined)
        interfaceParams.push(`loop-protect=${eoip.loopProtect}`);
    if (eoip.loopProtectDisableTime !== undefined)
        interfaceParams.push(
            `loop-protect-disable-time=${eoip.loopProtectDisableTime}`,
        );
    if (eoip.loopProtectSendInterval !== undefined)
        interfaceParams.push(
            `loop-protect-send-interval=${eoip.loopProtectSendInterval}`,
        );

    config["/interface eoip"].push(`add ${interfaceParams.join(" ")}`);

    return CommandShortner(config);
};
export const GreInterface = (gre: GreTunnelConfig): RouterConfig => {
    const config: RouterConfig = {
        "/interface gre": [],
    };

    // Build GRE tunnel command parameters
    const interfaceParams: string[] = [
        `name=${gre.name}`,
        `remote-address=${gre.remoteAddress}`,
    ];

    // Add optional parameters
    if (gre.disabled !== undefined)
        interfaceParams.push(`disabled=${gre.disabled ? "yes" : "no"}`);
    if (gre.comment !== undefined)
        interfaceParams.push(`comment="${gre.comment}"`);
    else
        interfaceParams.push(`comment="${gre.name} GRE Tunnel for Network ${gre.NetworkType}"`);
    if (gre.ipsecSecret !== undefined)
        interfaceParams.push(`ipsec-secret="${gre.ipsecSecret}"`);
    if (gre.dontFragment !== undefined)
        interfaceParams.push(`dont-fragment=${gre.dontFragment}`);

    // Handle IPsec and fast path logic
    handleIPsecAndFastPath(interfaceParams, gre);

    config["/interface gre"].push(`add ${interfaceParams.join(" ")}`);

    return CommandShortner(config);
};
export const VxlanInterface = (vxlan: VxlanInterfaceConfig): RouterConfig => {
    const config: RouterConfig = {
        "/interface vxlan": [],
        "/interface vxlan vteps": [],
    };

    // Build main VXLAN interface command parameters
    const interfaceParams: string[] = [
        `name=${vxlan.name}`,
        `vni=${vxlan.vni}`,
    ];

    // Note: remote-address is not used in RouterOS VXLAN interface configuration
    // Remote VTEPs are configured separately via /interface vxlan vteps

    // Add optional parameters following RouterOS documentation syntax
    if (vxlan.disabled !== undefined)
        interfaceParams.push(`disabled=${vxlan.disabled ? "yes" : "no"}`);
    if (vxlan.comment !== undefined)
        interfaceParams.push(`comment="${vxlan.comment}"`);
    else
        interfaceParams.push(`comment="${vxlan.name} VXLAN Tunnel for Network ${vxlan.NetworkType}"`);
    if (vxlan.port !== undefined) interfaceParams.push(`port=${vxlan.port}`);
    if (vxlan.hw !== undefined)
        interfaceParams.push(`hw=${vxlan.hw ? "yes" : "no"}`);
    if (vxlan.learning !== undefined)
        interfaceParams.push(`learning=${vxlan.learning ? "yes" : "no"}`);
    if (vxlan.allowFastPath !== undefined)
        interfaceParams.push(
            `allow-fast-path=${vxlan.allowFastPath ? "yes" : "no"}`,
        );

    // Bridge parameter: name of bridge interface, not boolean
    if (vxlan.bridge !== undefined && typeof vxlan.bridge === "string") {
        interfaceParams.push(`bridge=${vxlan.bridge}`);
    }

    if (vxlan.bridgePVID !== undefined)
        interfaceParams.push(`bridge-pvid=${vxlan.bridgePVID}`);
    if (vxlan.checkSum !== undefined)
        interfaceParams.push(`checksum=${vxlan.checkSum ? "yes" : "no"}`);
    if (vxlan.dontFragment !== undefined)
        interfaceParams.push(`dont-fragment=${vxlan.dontFragment}`);
    if (vxlan.maxFdbSize !== undefined)
        interfaceParams.push(`max-fdb-size=${vxlan.maxFdbSize}`);
    if (vxlan.ttl !== undefined) interfaceParams.push(`ttl=${vxlan.ttl}`);
    if (vxlan.vrf !== undefined) interfaceParams.push(`vrf=${vxlan.vrf}`);
    if (vxlan.vtepsIpVersion !== undefined)
        interfaceParams.push(`vteps-ip-version=${vxlan.vtepsIpVersion}`);

    // Handle BUM (Broadcast, Unknown unicast, Multicast) traffic mode
    if (vxlan.bumMode === "multicast") {
        if (vxlan.group && vxlan.multicastInterface) {
            interfaceParams.push(`group=${vxlan.group}`);
            interfaceParams.push(`interface=${vxlan.multicastInterface}`);
        }
    }

    // Add the main VXLAN interface command
    config["/interface vxlan"].push(`add ${interfaceParams.join(" ")}`);

    // Generate VTEP peers - every VXLAN needs at least one VTEP for proper operation
    const vtepsToAdd = [...(vxlan.vteps || [])];

    // If no VTEPs are explicitly defined but remoteAddress is provided, create a default VTEP
    if (vtepsToAdd.length === 0 && vxlan.remoteAddress) {
        vtepsToAdd.push({
            remoteAddress: vxlan.remoteAddress,
            comment: `Default VTEP for ${vxlan.name}`,
        });
    }

    // For unicast mode, ensure at least one VTEP exists
    if (vxlan.bumMode === "unicast" && vtepsToAdd.length === 0) {
        throw new Error(
            `VXLAN ${vxlan.name} in unicast mode requires at least one VTEP configuration`,
        );
    }

    // For multicast mode, VTEPs are optional but can be used for optimized unicast traffic

    // Add all VTEP configurations
    vtepsToAdd.forEach((vtep) => {
        const vtepParams: string[] = [`interface=${vxlan.name}`];

        if (vtep.remoteAddress)
            vtepParams.push(`remote-ip=${vtep.remoteAddress}`);
        if (vtep.comment) vtepParams.push(`comment="${vtep.comment}"`);

        config["/interface vxlan vteps"].push(`add ${vtepParams.join(" ")}`);
    });

    // Note: /interface vxlan fdb is read-only in RouterOS for monitoring learned MAC addresses
    // Static FDB entries are not configurable via CLI as of RouterOS 7.x
    // The FDB section is kept for future compatibility but will not generate commands

    return CommandShortner(config);
};