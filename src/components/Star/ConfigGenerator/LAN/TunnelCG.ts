import type { RouterConfig } from "../ConfigGenerator";
import type {
    IpipTunnelConfig,
    EoipTunnelConfig,
    GreTunnelConfig,
    VxlanInterfaceConfig,
    Tunnel,
} from "~/components/Star/StarContext/Utils/TunnelType";
import {
    CommandShortner,
    mergeRouterConfigs,
} from "../utils/ConfigGeneratorUtil";

// Utility function to generate IP address configuration
export const generateIPAddress = (
    address: string,
    interfaceName: string,
    comment?: string,
): RouterConfig => {
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

// Utility function to generate interface list member configuration
export const generateInterfaceList = (
    interfaceName: string,
    lists: string[],
): RouterConfig => {
    const config: RouterConfig = {
        "/interface list member": [],
    };

    lists.forEach((listName) => {
        const listParams: string[] = [
            `interface="${interfaceName}"`,
            `list="${listName}"`,
        ];

        config["/interface list member"].push(`add ${listParams.join(" ")}`);
    });

    return config;
};

// Utility function to generate address list configuration
export const generateAddressList = (
    address: string,
    listName: string,
    comment?: string,
): RouterConfig => {
    const config: RouterConfig = {
        "/ip firewall address-list": [],
    };

    const addressListParams: string[] = [
        `address="${address}"`,
        `list="${listName}"`,
    ];

    if (comment) {
        addressListParams.push(`comment="${comment}"`);
    }

    config["/ip firewall address-list"].push(
        `add ${addressListParams.join(" ")}`,
    );

    return config;
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
    if (ipip.ipsecSecret !== undefined)
        interfaceParams.push(`ipsec-secret="${ipip.ipsecSecret}"`);
    if (ipip.dontFragment !== undefined)
        interfaceParams.push(`dont-fragment=${ipip.dontFragment}`);

    // Business logic: if ipsecSecret is used, allowFastPath must be false
    if (ipip.ipsecSecret && ipip.allowFastPath !== false) {
        interfaceParams.push(`allow-fast-path=no`);
    } else if (ipip.allowFastPath !== undefined) {
        interfaceParams.push(
            `allow-fast-path=${ipip.allowFastPath ? "yes" : "no"}`,
        );
    }

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
    if (eoip.ipsecSecret !== undefined)
        interfaceParams.push(`ipsec-secret="${eoip.ipsecSecret}"`);

    // Business logic: if ipsecSecret is used, allowFastPath must be false
    if (eoip.ipsecSecret && eoip.allowFastPath !== false) {
        interfaceParams.push(`allow-fast-path=no`);
    } else if (eoip.allowFastPath !== undefined) {
        interfaceParams.push(
            `allow-fast-path=${eoip.allowFastPath ? "yes" : "no"}`,
        );
    }

    if (eoip.dontFragment !== undefined)
        interfaceParams.push(`dont-fragment=${eoip.dontFragment}`);
    if (eoip.loopProtect !== undefined)
        interfaceParams.push(`loop-protect=${eoip.loopProtect ? "on" : "off"}`);
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
    if (gre.ipsecSecret !== undefined)
        interfaceParams.push(`ipsec-secret="${gre.ipsecSecret}"`);
    if (gre.dontFragment !== undefined)
        interfaceParams.push(`dont-fragment=${gre.dontFragment}`);

    // Business logic: if ipsecSecret is used, allowFastPath must be false
    if (gre.ipsecSecret && gre.allowFastPath !== false) {
        interfaceParams.push(`allow-fast-path=no`);
    } else if (gre.allowFastPath !== undefined) {
        interfaceParams.push(
            `allow-fast-path=${gre.allowFastPath ? "yes" : "no"}`,
        );
    }

    config["/interface gre"].push(`add ${interfaceParams.join(" ")}`);

    return CommandShortner(config);
};

// Main VXLAN interface configuration function
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

// Function to generate inbound traffic marking rules for tunnel protocols
export const TunnelInboundTraffic = (tunnel: Tunnel): RouterConfig => {
    const config: RouterConfig = {
        "/ip firewall mangle": [],
    };

    if (!tunnel) {
        return config;
    }

    // Add comment header
    config["/ip firewall mangle"].push(
        "# --- Tunnel Server Inbound Traffic Marking ---",
        "# Mark inbound tunnel connections and route outbound replies",
    );

    // Check for IPIP tunnels - single rule for all IPIP tunnels (protocol-based)
    if (tunnel.IPIP && tunnel.IPIP.length > 0) {
        config["/ip firewall mangle"].push(
            `add action=mark-connection chain=input comment="Mark Inbound IPIP Tunnel Connections" \\
                connection-state=new in-interface-list=DOM-WAN protocol=ipip \\
                new-connection-mark=conn-tunnel-server passthrough=yes`,
        );
    }

    // Check for GRE/EoIP tunnels - single rule for all GRE/EoIP tunnels (protocol-based)
    if (
        (tunnel.Eoip && tunnel.Eoip.length > 0) ||
        (tunnel.Gre && tunnel.Gre.length > 0)
    ) {
        config["/ip firewall mangle"].push(
            `add action=mark-connection chain=input comment="Mark Inbound GRE/EoIP Tunnel Connections" \\
                connection-state=new in-interface-list=DOM-WAN protocol=gre \\
                new-connection-mark=conn-tunnel-server passthrough=yes`,
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
                    connection-state=new in-interface-list=DOM-WAN protocol=udp dst-port=${port} \\
                    new-connection-mark=conn-tunnel-server passthrough=yes`,
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
            "# --- Route Outbound Tunnel Replies ---",
            `add action=mark-routing chain=output comment="Route Tunnel Server Replies via Domestic WAN" \\
                connection-mark=conn-tunnel-server new-routing-mark=to-DOM passthrough=no`,
        );
    }

    return config;
};

// Utility function to process a single tunnel object
export const TunnelWrapper = (tunnel: Tunnel): RouterConfig => {
    const configs: RouterConfig[] = [];

    // Add Inbound Traffic Marking rules for tunnel protocols
    const inboundTrafficConfig = InboundTraffic(tunnel);
    if (
        inboundTrafficConfig["/ip firewall mangle"] &&
        inboundTrafficConfig["/ip firewall mangle"].length > 0
    ) {
        configs.push(inboundTrafficConfig);
    }

    // Process IPIP tunnels
    if (tunnel.IPIP && tunnel.IPIP.length > 0) {
        tunnel.IPIP.forEach((ipip) => {
            const ipipConfig = IPIPInterface(ipip);
            configs.push(ipipConfig);
        });
    }

    // Process EoIP tunnels
    if (tunnel.Eoip && tunnel.Eoip.length > 0) {
        tunnel.Eoip.forEach((eoip) => {
            const eoipConfig = EoipInterface(eoip);
            configs.push(eoipConfig);
        });
    }

    // Process GRE tunnels
    if (tunnel.Gre && tunnel.Gre.length > 0) {
        tunnel.Gre.forEach((gre) => {
            const greConfig = GreInterface(gre);
            configs.push(greConfig);
        });
    }

    // Process VXLAN tunnels
    if (tunnel.Vxlan && tunnel.Vxlan.length > 0) {
        tunnel.Vxlan.forEach((vxlan) => {
            const vxlanConfig = VxlanInterface(vxlan);
            configs.push(vxlanConfig);
        });
    }

    return CommandShortner(mergeRouterConfigs(...configs));
};
