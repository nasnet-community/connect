import type { AdvancedVPNState, VPNConfig } from "../types/AdvancedVPNState";
import type {
  VPNClient,
  WireguardClientConfig,
  OpenVpnClientConfig,
  PptpClientConfig,
  L2tpClientConfig,
  SstpClientConfig,
  Ike2ClientConfig,
} from "../../../../StarContext/Utils/VPNClientType";
import type { RouterConfig } from "../../../../ConfigGenerator/ConfigGenerator";
import {
  WireguardClient,
  OpenVPNClient,
  PPTPClient,
  L2TPClient,
  SSTPClient,
  IKeV2Client,
  isFQDN,
} from "../../../../ConfigGenerator/WAN/VPNClient/VPNClientCG";
import { GenerateOpenVPNCertificateScript } from "../../../../ConfigGenerator/WAN/VPNClient/VPNClientScripts";
import { mergeMultipleConfigs } from "../../../../ConfigGenerator/utils/ConfigGeneratorUtil";

// Convert AdvancedVPNState to StarContext VPNClient format
export function convertToStarContextVPNClient(
  state: AdvancedVPNState,
): VPNClient | undefined {
  // Filter enabled VPNs and sort by priority
  const enabledVPNs = state.vpnConfigs
    .filter((vpn) => vpn.enabled)
    .sort((a, b) => {
      const priorityA = state.priorities.indexOf(a.id);
      const priorityB = state.priorities.indexOf(b.id);
      return priorityA - priorityB;
    });

  if (enabledVPNs.length === 0) {
    return undefined;
  }

  // Get the highest priority enabled VPN
  const primaryVPN = enabledVPNs[0];
  const vpnClient: VPNClient = {};

  // Map the VPN config to the appropriate VPNClient property
  switch (primaryVPN.type) {
    case "Wireguard":
      vpnClient.Wireguard = primaryVPN.config as WireguardClientConfig;
      break;
    case "OpenVPN":
      vpnClient.OpenVPN = primaryVPN.config as OpenVpnClientConfig;
      break;
    case "PPTP":
      vpnClient.PPTP = primaryVPN.config as PptpClientConfig;
      break;
    case "L2TP":
      vpnClient.L2TP = primaryVPN.config as L2tpClientConfig;
      break;
    case "SSTP":
      vpnClient.SSTP = primaryVPN.config as SstpClientConfig;
      break;
    case "IKeV2":
      vpnClient.IKeV2 = primaryVPN.config as Ike2ClientConfig;
      break;
  }

  return vpnClient;
}

// Generate MikroTik commands for multiple VPN clients with priority-based failover
export function generateMultiVPNClientConfig(
  state: AdvancedVPNState,
  domesticLink: boolean,
): RouterConfig {
  // Filter enabled VPNs and sort by priority
  const enabledVPNs = state.vpnConfigs
    .filter((vpn) => vpn.enabled)
    .sort((a, b) => {
      const priorityA = state.priorities.indexOf(a.id);
      const priorityB = state.priorities.indexOf(b.id);
      return priorityA - priorityB;
    });

  if (enabledVPNs.length === 0) {
    return {};
  }

  // Generate configs for all enabled VPNs
  const vpnConfigs: RouterConfig[] = enabledVPNs.map((vpn, index) =>
    generateSingleVPNConfig(vpn, index, domesticLink),
  );

  // Merge all VPN configurations
  let mergedConfig = mergeMultipleConfigs(...vpnConfigs);

  // Add failover monitoring and routing scripts
  if (enabledVPNs.length > 1) {
    const failoverConfig = generateFailoverConfig(enabledVPNs);
    mergedConfig = mergeMultipleConfigs(mergedConfig, failoverConfig);
  }

  return mergedConfig;
}

// Generate config for a single VPN with priority suffix
function generateSingleVPNConfig(
  vpn: VPNConfig,
  priority: number,
  domesticLink: boolean,
): RouterConfig {
  let vpnConfig: RouterConfig = {};
  let interfaceName = "";
  let endpointAddress = "";
  let dns = "";
  const suffix = priority > 0 ? `-${priority + 1}` : "";

  switch (vpn.type) {
    case "Wireguard": {
      const config = vpn.config as WireguardClientConfig;
      vpnConfig = generateWireguardWithSuffix(config, suffix);
      interfaceName = `wireguard-client${suffix}`;
      endpointAddress = config.PeerEndpointAddress;
      dns = config.InterfaceDNS || "1.1.1.1";
      break;
    }
    case "OpenVPN": {
      const config = vpn.config as OpenVpnClientConfig;
      vpnConfig = generateOpenVPNWithSuffix(config, suffix);
      interfaceName = `ovpn-client${suffix}`;
      endpointAddress = config.Server.Address;
      dns = "1.1.1.1";
      break;
    }
    case "PPTP": {
      const config = vpn.config as PptpClientConfig;
      vpnConfig = generatePPTPWithSuffix(config, suffix);
      interfaceName = `pptp-client${suffix}`;
      endpointAddress = config.ConnectTo;
      dns = "1.1.1.1";
      break;
    }
    case "L2TP": {
      const config = vpn.config as L2tpClientConfig;
      vpnConfig = generateL2TPWithSuffix(config, suffix);
      interfaceName = `l2tp-client${suffix}`;
      endpointAddress = config.Server.Address;
      dns = "1.1.1.1";
      break;
    }
    case "SSTP": {
      const config = vpn.config as SstpClientConfig;
      vpnConfig = generateSSTPWithSuffix(config, suffix);
      interfaceName = `sstp-client${suffix}`;
      endpointAddress = config.Server.Address;
      dns = "1.1.1.1";
      break;
    }
    case "IKeV2": {
      const config = vpn.config as Ike2ClientConfig;
      vpnConfig = generateIKeV2WithSuffix(config, suffix);
      interfaceName = `ike2-client${suffix}`;
      endpointAddress = config.ServerAddress;
      dns = "1.1.1.1";
      break;
    }
  }

  // Add base configuration with priority-specific routing
  if (interfaceName && endpointAddress) {
    const baseConfig = generatePriorityBaseConfig(
      interfaceName,
      endpointAddress,
      dns,
      domesticLink,
      priority,
      vpn.name,
    );

    vpnConfig = mergeMultipleConfigs(vpnConfig, baseConfig);
  }

  return vpnConfig;
}

// Modified base config with priority routing
function generatePriorityBaseConfig(
  interfaceName: string,
  endpointAddress: string,
  dns: string,
  domesticLink: boolean,
  priority: number,
  vpnName: string,
): RouterConfig {
  const config: RouterConfig = {
    "/ip firewall nat": [],
    "/interface list member": [],
    "/ip route": [],
    "/ip firewall address-list": [],
    "/ip firewall mangle": [],
  };

  // DNS configuration (only for primary VPN)
  if (priority === 0) {
    if (domesticLink) {
      config["/ip firewall nat"].push(
        `add action=dst-nat chain=dstnat comment="DNS VPN" dst-port=53 \\
        protocol=udp src-address-list=VPN-LAN to-addresses=${dns}`,
        `add action=dst-nat chain=dstnat comment="DNS VPN" dst-port=53 \\
        protocol=tcp src-address-list=VPN-LAN to-addresses=${dns}`,
        `add action=dst-nat chain=dstnat comment="DNS Split" dst-port=53 \\
        protocol=udp src-address-list=Split-LAN to-addresses=${dns}`,
        `add action=dst-nat chain=dstnat comment="DNS Split" dst-port=53 \\
        protocol=tcp src-address-list=Split-LAN to-addresses=${dns}`,
      );
    } else {
      config["/ip firewall nat"].push(
        `add action=dst-nat chain=dstnat comment="DNS VPN" dst-port=53 \\
        protocol=udp src-address-list=VPN-LAN to-addresses=${dns}`,
        `add action=dst-nat chain=dstnat comment="DNS VPN" dst-port=53 \\
        protocol=tcp src-address-list=VPN-LAN to-addresses=${dns}`,
      );
    }
  }

  // Interface list membership
  config["/interface list member"].push(
    `add interface="${interfaceName}" list="WAN" comment="${vpnName}"`,
    `add interface="${interfaceName}" list="FRN-WAN" comment="${vpnName}"`,
  );

  // Routing with priority
  const distance = 1 + priority;

  if (!isFQDN(endpointAddress)) {
    config["/ip route"].push(
      `add comment="Route-to-FRN-${vpnName}" disabled=no distance=1 dst-address=${endpointAddress} gateway=192.168.1.1 \\
      pref-src="" routing-table=main scope=30 suppress-hw-offload=no target-scope=10`,
    );
  }

  config["/ip route"].push(
    `add comment="Route-to-VPN-${vpnName}" disabled=no distance=${distance} dst-address=0.0.0.0/0 gateway=${interfaceName} \\
    pref-src="" routing-table=to-VPN scope=30 suppress-hw-offload=no target-scope=10 check-gateway=ping`,
  );

  // Address list for VPN endpoint
  config["/ip firewall address-list"].push(
    `add address="${endpointAddress}" list=VPNE comment="${vpnName}"`,
  );

  // Mangle rules (only for primary VPN)
  if (priority === 0) {
    config["/ip firewall mangle"].push(
      `add action=mark-connection chain=output comment="VPN Endpoint" \\
      dst-address-list=VPNE new-connection-mark=conn-VPNE passthrough=yes`,
      `add action=mark-routing chain=output comment="VPN Endpoint" \\
      connection-mark=conn-VPNE dst-address-list=VPNE new-routing-mark=to-FRN passthrough=no`,
      `add action=mark-routing chain=output comment="VPN Endpoint" \\
      dst-address-list=VPNE new-routing-mark=to-FRN passthrough=no`,
    );
  }

  return config;
}

// Generate failover monitoring and scripts
function generateFailoverConfig(vpns: VPNConfig[]): RouterConfig {
  const config: RouterConfig = {
    "/system script": [],
    "/system scheduler": [],
    "/tool netwatch": [],
  };

  // Create failover script
  const failoverScript = generateFailoverScript(vpns);
  config["/system script"].push(
    `add name="vpn-failover" owner=admin policy=read,write,test \\
    source="${failoverScript}"`,
  );

  // Schedule periodic checks
  config["/system scheduler"].push(
    `add interval=30s name="vpn-failover-check" on-event=vpn-failover \\
    policy=read,write,test start-time=startup`,
  );

  // Add netwatch for each VPN
  vpns.forEach((vpn) => {
    const endpointAddress = getEndpointAddress(vpn);

    config["/tool netwatch"].push(
      `add comment="${vpn.name}" down-script="/system script run vpn-failover" \\
      host=${endpointAddress} interval=10s timeout=3s up-script="/system script run vpn-failover"`,
    );
  });

  return config;
}

// Generate failover script content
function generateFailoverScript(vpns: VPNConfig[]): string {
  const lines: string[] = [
    ':local vpnList [/interface find where type~"pptp-out|l2tp-out|sstp-out|ovpn-out" or name~"wireguard-client|ike2-client"]',
    ':local activeVPN ""',
    ":local primaryRoute [/ip route find where routing-table=to-VPN distance=1]",
    "",
    "# Check VPN interfaces in priority order",
  ];

  vpns.forEach((vpn, index) => {
    const interfaceName = getInterfaceName(vpn, index);
    lines.push(
      `:if ([/interface get [find name="${interfaceName}"] running] = true) do={`,
      `  :set activeVPN "${interfaceName}"`,
      `  :if ($primaryRoute != "") do={`,
      `    /ip route set $primaryRoute gateway=$activeVPN`,
      `  }`,
      `  :log info "VPN Failover: Using ${vpn.name}"`,
      `  :return`,
      `}`,
    );
  });

  lines.push(
    "",
    ':log warning "VPN Failover: No active VPN connections available"',
  );

  return lines.join("\\r\\n");
}

// Helper functions for generating configs with suffix
function generateWireguardWithSuffix(
  config: WireguardClientConfig,
  suffix: string,
): RouterConfig {
  const baseConfig = WireguardClient(config);
  return renameInterfaces(baseConfig, "wireguard-client", suffix);
}

function generateOpenVPNWithSuffix(
  config: OpenVpnClientConfig,
  suffix: string,
): RouterConfig {
  const baseConfig = OpenVPNClient(config);
  const renamedConfig = renameInterfaces(baseConfig, "ovpn-client", suffix);

  // Handle certificates if present
  if (config.Certificates) {
    const certScript = GenerateOpenVPNCertificateScript(config);
    return mergeMultipleConfigs(renamedConfig, certScript);
  }

  return renamedConfig;
}

function generatePPTPWithSuffix(
  config: PptpClientConfig,
  suffix: string,
): RouterConfig {
  const baseConfig = PPTPClient(config);
  return renameInterfaces(baseConfig, "pptp-client", suffix);
}

function generateL2TPWithSuffix(
  config: L2tpClientConfig,
  suffix: string,
): RouterConfig {
  const baseConfig = L2TPClient(config);
  return renameInterfaces(baseConfig, "l2tp-client", suffix);
}

function generateSSTPWithSuffix(
  config: SstpClientConfig,
  suffix: string,
): RouterConfig {
  const baseConfig = SSTPClient(config);
  return renameInterfaces(baseConfig, "sstp-client", suffix);
}

function generateIKeV2WithSuffix(
  config: Ike2ClientConfig,
  suffix: string,
): RouterConfig {
  const baseConfig = IKeV2Client(config);
  return renameInterfaces(baseConfig, "ike2-client", suffix);
}

// Helper to rename interfaces in config
function renameInterfaces(
  config: RouterConfig,
  baseName: string,
  suffix: string,
): RouterConfig {
  if (!suffix) return config;

  const newConfig: RouterConfig = {};
  const newName = `${baseName}${suffix}`;

  for (const [key, commands] of Object.entries(config)) {
    newConfig[key] = commands.map((cmd) =>
      cmd.replace(new RegExp(`\\b${baseName}\\b`, "g"), newName),
    );
  }

  return newConfig;
}

// Helper to get interface name for a VPN
function getInterfaceName(vpn: VPNConfig, index: number): string {
  const suffix = index > 0 ? `-${index + 1}` : "";

  switch (vpn.type) {
    case "Wireguard":
      return `wireguard-client${suffix}`;
    case "OpenVPN":
      return `ovpn-client${suffix}`;
    case "PPTP":
      return `pptp-client${suffix}`;
    case "L2TP":
      return `l2tp-client${suffix}`;
    case "SSTP":
      return `sstp-client${suffix}`;
    case "IKeV2":
      return `ike2-client${suffix}`;
    default:
      return "";
  }
}

// Helper to get endpoint address for a VPN
function getEndpointAddress(vpn: VPNConfig): string {
  switch (vpn.type) {
    case "Wireguard":
      return (vpn.config as WireguardClientConfig).PeerEndpointAddress;
    case "OpenVPN":
      return (vpn.config as OpenVpnClientConfig).Server.Address;
    case "PPTP":
      return (vpn.config as PptpClientConfig).ConnectTo;
    case "L2TP":
      return (vpn.config as L2tpClientConfig).Server.Address;
    case "SSTP":
      return (vpn.config as SstpClientConfig).Server.Address;
    case "IKeV2":
      return (vpn.config as Ike2ClientConfig).ServerAddress;
    default:
      return "";
  }
}

// Export the main function for use in WAN config generator
export function generateAdvancedVPNClientConfig(
  state: AdvancedVPNState,
  domesticLink: boolean,
): RouterConfig {
  return generateMultiVPNClientConfig(state, domesticLink);
}

// Export function to check if any VPN is enabled
export function hasEnabledVPN(state: AdvancedVPNState): boolean {
  return state.vpnConfigs.some((vpn) => vpn.enabled);
}
