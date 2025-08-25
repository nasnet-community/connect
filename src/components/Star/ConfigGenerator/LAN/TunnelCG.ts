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
    `local-address=${ipip.localAddress}`,
    `remote-address=${ipip.remoteAddress}`,
  ];

  // Add optional parameters
  if (ipip.mtu !== undefined) interfaceParams.push(`mtu=${ipip.mtu}`);
  if (ipip.disabled !== undefined)
    interfaceParams.push(`disabled=${ipip.disabled ? "yes" : "no"}`);
  if (ipip.comment !== undefined)
    interfaceParams.push(`comment="${ipip.comment}"`);
  if (ipip.ipsecSecret !== undefined)
    interfaceParams.push(`ipsec-secret="${ipip.ipsecSecret}"`);
  if (ipip.keepalive !== undefined)
    interfaceParams.push(`keepalive=${ipip.keepalive}`);
  if (ipip.clampTcpMss !== undefined)
    interfaceParams.push(`clamp-tcp-mss=${ipip.clampTcpMss ? "yes" : "no"}`);
  if (ipip.dscp !== undefined) interfaceParams.push(`dscp=${ipip.dscp}`);
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
    `local-address=${eoip.localAddress}`,
    `remote-address=${eoip.remoteAddress}`,
    `tunnel-id=${eoip.tunnelId}`,
  ];

  // Add optional parameters
  if (eoip.mtu !== undefined) interfaceParams.push(`mtu=${eoip.mtu}`);
  if (eoip.disabled !== undefined)
    interfaceParams.push(`disabled=${eoip.disabled ? "yes" : "no"}`);
  if (eoip.comment !== undefined)
    interfaceParams.push(`comment="${eoip.comment}"`);
  if (eoip.macAddress !== undefined)
    interfaceParams.push(`mac-address=${eoip.macAddress}`);
  if (eoip.ipsecSecret !== undefined)
    interfaceParams.push(`ipsec-secret="${eoip.ipsecSecret}"`);
  if (eoip.keepalive !== undefined)
    interfaceParams.push(`keepalive=${eoip.keepalive}`);
  if (eoip.arp !== undefined) interfaceParams.push(`arp=${eoip.arp}`);
  if (eoip.arpTimeout !== undefined)
    interfaceParams.push(`arp-timeout=${eoip.arpTimeout}`);
  if (eoip.clampTcpMss !== undefined)
    interfaceParams.push(`clamp-tcp-mss=${eoip.clampTcpMss ? "yes" : "no"}`);

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
  if (eoip.dscp !== undefined) interfaceParams.push(`dscp=${eoip.dscp}`);
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
    `local-address=${gre.localAddress}`,
    `remote-address=${gre.remoteAddress}`,
  ];

  // Add optional parameters
  if (gre.mtu !== undefined) interfaceParams.push(`mtu=${gre.mtu}`);
  if (gre.disabled !== undefined)
    interfaceParams.push(`disabled=${gre.disabled ? "yes" : "no"}`);
  if (gre.comment !== undefined)
    interfaceParams.push(`comment="${gre.comment}"`);
  if (gre.ipsecSecret !== undefined)
    interfaceParams.push(`ipsec-secret="${gre.ipsecSecret}"`);
  if (gre.keepalive !== undefined)
    interfaceParams.push(`keepalive=${gre.keepalive}`);
  if (gre.clampTcpMss !== undefined)
    interfaceParams.push(`clamp-tcp-mss=${gre.clampTcpMss ? "yes" : "no"}`);
  if (gre.dscp !== undefined) interfaceParams.push(`dscp=${gre.dscp}`);
  if (gre.dontFragment !== undefined)
    interfaceParams.push(`dont-fragment=${gre.dontFragment}`);

  // Business logic: if ipsecSecret is used, allowFastPath must be false
  if (gre.ipsecSecret && gre.allowFastPath !== false) {
    interfaceParams.push(`allow-fast-path=no`);
  } else if (gre.allowFastPath !== undefined) {
    interfaceParams.push(`allow-fast-path=${gre.allowFastPath ? "yes" : "no"}`);
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
  const interfaceParams: string[] = [`name=${vxlan.name}`, `vni=${vxlan.vni}`];

  // Add local-address if specified (available since RouterOS 7.7)
  if (vxlan.localAddress) {
    interfaceParams.push(`local-address=${vxlan.localAddress}`);
  }

  // Note: remote-address is not used in RouterOS VXLAN interface configuration
  // Remote VTEPs are configured separately via /interface vxlan vteps

  // Add optional parameters following RouterOS documentation syntax
  if (vxlan.mtu !== undefined) interfaceParams.push(`mtu=${vxlan.mtu}`);
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
  if (vxlan.arp !== undefined) interfaceParams.push(`arp=${vxlan.arp}`);
  if (vxlan.arpTimeout !== undefined)
    interfaceParams.push(`arp-timeout=${vxlan.arpTimeout}`);

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
  if (vxlan.macAddress !== undefined)
    interfaceParams.push(`mac-address=${vxlan.macAddress}`);
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

    if (vtep.remoteAddress) vtepParams.push(`remote-ip=${vtep.remoteAddress}`);
    if (vtep.comment) vtepParams.push(`comment="${vtep.comment}"`);

    config["/interface vxlan vteps"].push(`add ${vtepParams.join(" ")}`);
  });

  // Note: /interface vxlan fdb is read-only in RouterOS for monitoring learned MAC addresses
  // Static FDB entries are not configurable via CLI as of RouterOS 7.x
  // The FDB section is kept for future compatibility but will not generate commands

  return CommandShortner(config);
};

// Function to generate inbound traffic marking rules for tunnel protocols
export const InboundTraffic = (tunnel: Tunnel): RouterConfig => {
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

      // Generate additional configurations for IPIP tunnel
      if (ipip.localAddress && ipip.remoteAddress) {
        // Generate IP address for tunnel interface (point-to-point /30 network)
        const tunnelIpAddress = `${ipip.localAddress}/30`;
        const ipAddressConfig = generateIPAddress(
          tunnelIpAddress,
          ipip.name,
          `IP address for ${ipip.name} tunnel`,
        );
        configs.push(ipAddressConfig);

        // Generate interface list membership (commonly used for LAN and VPN grouping)
        const interfaceListConfig = generateInterfaceList(ipip.name, [
          "LAN",
          "TUNNEL",
        ]);
        configs.push(interfaceListConfig);

        // Generate address list for tunnel network (if network range is derivable)
        // Using /30 network for point-to-point tunnels as common practice
        const networkPrefix =
          ipip.localAddress.split(".").slice(0, 3).join(".") + ".0/30";
        const addressListConfig = generateAddressList(
          networkPrefix,
          "TUNNEL-NETWORKS",
          `Network for ${ipip.name}`,
        );
        configs.push(addressListConfig);
      }
    });
  }

  // Process EoIP tunnels
  if (tunnel.Eoip && tunnel.Eoip.length > 0) {
    tunnel.Eoip.forEach((eoip) => {
      const eoipConfig = EoipInterface(eoip);
      configs.push(eoipConfig);

      // Generate additional configurations for EoIP tunnel
      if (eoip.localAddress && eoip.remoteAddress) {
        // Generate IP address for tunnel interface (point-to-point /30 network)
        const tunnelIpAddress = `${eoip.localAddress}/30`;
        const ipAddressConfig = generateIPAddress(
          tunnelIpAddress,
          eoip.name,
          `IP address for ${eoip.name} tunnel`,
        );
        configs.push(ipAddressConfig);

        // Generate interface list membership (EoIP is typically used for L2 extension)
        const interfaceListConfig = generateInterfaceList(eoip.name, [
          "LAN",
          "L2-TUNNEL",
        ]);
        configs.push(interfaceListConfig);

        // Generate address list for tunnel endpoints
        const networkPrefix =
          eoip.localAddress.split(".").slice(0, 3).join(".") + ".0/30";
        const addressListConfig = generateAddressList(
          networkPrefix,
          "L2-TUNNEL-NETWORKS",
          `Network for ${eoip.name}`,
        );
        configs.push(addressListConfig);
      }
    });
  }

  // Process GRE tunnels
  if (tunnel.Gre && tunnel.Gre.length > 0) {
    tunnel.Gre.forEach((gre) => {
      const greConfig = GreInterface(gre);
      configs.push(greConfig);

      // Generate additional configurations for GRE tunnel
      if (gre.localAddress && gre.remoteAddress) {
        // Generate IP address for tunnel interface (point-to-point /30 network)
        const tunnelIpAddress = `${gre.localAddress}/30`;
        const ipAddressConfig = generateIPAddress(
          tunnelIpAddress,
          gre.name,
          `IP address for ${gre.name} tunnel`,
        );
        configs.push(ipAddressConfig);

        // Generate interface list membership (GRE commonly used for routing)
        const interfaceListConfig = generateInterfaceList(gre.name, [
          "LAN",
          "GRE-TUNNEL",
        ]);
        configs.push(interfaceListConfig);

        // Generate address list for tunnel network
        const networkPrefix =
          gre.localAddress.split(".").slice(0, 3).join(".") + ".0/30";
        const addressListConfig = generateAddressList(
          networkPrefix,
          "GRE-TUNNEL-NETWORKS",
          `Network for ${gre.name}`,
        );
        configs.push(addressListConfig);
      }
    });
  }

  // Process VXLAN tunnels
  if (tunnel.Vxlan && tunnel.Vxlan.length > 0) {
    tunnel.Vxlan.forEach((vxlan) => {
      const vxlanConfig = VxlanInterface(vxlan);
      configs.push(vxlanConfig);

      // Generate additional configurations for VXLAN tunnel
      if (vxlan.localAddress) {
        // Generate IP address for VXLAN interface (typically used when VXLAN needs L3 connectivity)
        // VXLAN interfaces often get IP addresses when used as gateways for the overlay network
        const vxlanIpAddress = `172.16.${Math.floor(vxlan.vni / 256)}.1/24`;
        const ipAddressConfig = generateIPAddress(
          vxlanIpAddress,
          vxlan.name,
          `Gateway IP for VXLAN ${vxlan.name} (VNI ${vxlan.vni})`,
        );
        configs.push(ipAddressConfig);

        // Generate interface list membership (VXLAN for L2 overlay networks)
        const interfaceListConfig = generateInterfaceList(vxlan.name, [
          "LAN",
          "VXLAN-OVERLAY",
        ]);
        configs.push(interfaceListConfig);

        // Generate address list for VXLAN VNI networks
        // Using VNI to create a logical network identifier
        const vniNetwork = `172.16.${Math.floor(vxlan.vni / 256)}.0/24`;
        const addressListConfig = generateAddressList(
          vniNetwork,
          "VXLAN-NETWORKS",
          `VNI ${vxlan.vni} network for ${vxlan.name}`,
        );
        configs.push(addressListConfig);

        // If VTEP peers are defined, add them to address lists for firewall rules
        if (vxlan.vteps && vxlan.vteps.length > 0) {
          vxlan.vteps.forEach((vtep) => {
            if (vtep.remoteAddress) {
              const vtepAddressConfig = generateAddressList(
                vtep.remoteAddress,
                "VXLAN-VTEPS",
                `VTEP peer for ${vxlan.name}`,
              );
              configs.push(vtepAddressConfig);
            }
          });
        }
      }
    });
  }

  return CommandShortner(mergeRouterConfigs(...configs));
};
