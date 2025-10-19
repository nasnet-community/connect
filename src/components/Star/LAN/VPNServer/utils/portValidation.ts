import type { VPNType } from "../../../StarContext/CommonType";
import type { StarState } from "../../../StarContext/StarContext";

// Reserved system/service ports that cannot be used for VPN servers
export const RESERVED_PORTS = [
  20, 21, 22, 23, 25, 53, 80, 110, 143, 443,
  465, 587, 993, 995, 3306, 5432, 8080, 8443,
];

export interface VPNServerPort {
  protocol: VPNType;
  serverName: string;
  port: number;
}

/**
 * Validates if a port can be used for a VPN server
 * Checks against reserved ports and existing VPN server ports
 */
export function validatePort(
  port: number,
  currentServerName: string,
  allVPNServers: VPNServerPort[]
): { valid: boolean; error?: string } {
  // Check if port is in valid range
  if (port < 1 || port > 65535) {
    return {
      valid: false,
      error: $localize`Port must be between 1 and 65535`,
    };
  }

  // Check reserved ports
  if (RESERVED_PORTS.includes(port)) {
    return {
      valid: false,
      error: $localize`Port ${port} is reserved for system services`,
    };
  }

  // Check duplicates across all VPN protocols
  const duplicate = allVPNServers.find(
    (s) => s.port === port && s.serverName !== currentServerName
  );

  if (duplicate) {
    return {
      valid: false,
      error: $localize`Port ${port} already used by ${duplicate.protocol}\: ${duplicate.serverName}`,
    };
  }

  return { valid: true };
}

/**
 * Extracts all VPN server ports from StarContext state
 */
export function getAllVPNServerPorts(state: StarState): VPNServerPort[] {
  const ports: VPNServerPort[] = [];
  const vpnServer = state.LAN.VPNServer;

  if (!vpnServer) {
    return ports;
  }

  // WireGuard servers
  if (vpnServer.WireguardServers) {
    vpnServer.WireguardServers.forEach((server) => {
      if (server.Interface.ListenPort) {
        ports.push({
          protocol: "Wireguard",
          serverName: server.Interface.Name,
          port: server.Interface.ListenPort,
        });
      }
    });
  }

  // OpenVPN servers
  if (vpnServer.OpenVpnServer) {
    vpnServer.OpenVpnServer.forEach((server) => {
      if (server.Port) {
        ports.push({
          protocol: "OpenVPN",
          serverName: server.name,
          port: server.Port,
        });
      }
    });
  }

  // L2TP server (single instance)
  if (vpnServer.L2tpServer?.enabled) {
    // L2TP uses port 1701 by default (not configurable in most implementations)
    ports.push({
      protocol: "L2TP",
      serverName: "L2TP Server",
      port: 1701,
    });
  }

  // PPTP server (single instance)
  if (vpnServer.PptpServer?.enabled) {
    // PPTP uses port 1723 by default
    ports.push({
      protocol: "PPTP",
      serverName: "PPTP Server",
      port: 1723,
    });
  }

  // SSTP server
  if (vpnServer.SstpServer?.enabled && vpnServer.SstpServer.Port) {
    ports.push({
      protocol: "SSTP",
      serverName: "SSTP Server",
      port: vpnServer.SstpServer.Port,
    });
  }

  // IKEv2 server (uses port 500/4500 for IKE, not user-configurable typically)
  if (vpnServer.Ikev2Server) {
    ports.push({
      protocol: "IKeV2",
      serverName: "IKEv2 Server",
      port: 500,
    });
    ports.push({
      protocol: "IKeV2",
      serverName: "IKEv2 Server (NAT-T)",
      port: 4500,
    });
  }

  // Socks5 server
  if (vpnServer.Socks5Server?.enabled && vpnServer.Socks5Server.Port) {
    ports.push({
      protocol: "Socks5",
      serverName: "Socks5 Server",
      port: vpnServer.Socks5Server.Port,
    });
  }

  // HTTP Proxy server
  if (vpnServer.HTTPProxyServer?.enabled && vpnServer.HTTPProxyServer.Port) {
    ports.push({
      protocol: "HTTPProxy",
      serverName: "HTTP Proxy Server",
      port: vpnServer.HTTPProxyServer.Port,
    });
  }

  return ports;
}

