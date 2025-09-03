// Removed unused ARPState import

export type TunnelType = "ipip" | "eoip" | "gre" | "vxlan";

export interface BaseTunnelConfig {
  name: string;
  type: TunnelType;
  remoteAddress: string;
  disabled?: boolean;
  comment?: string;
}

export interface IpipTunnelConfig extends BaseTunnelConfig {
  ipsecSecret?: string;
  dontFragment?: "inherit" | "no";
  allowFastPath?: boolean;
  localAddress?: string;
  mtu?: number;
  dscp?: number;
  keepalive?: string;
  clampTcpMss?: boolean;
}

export interface EoipTunnelConfig extends BaseTunnelConfig {
  tunnelId: number;
  ipsecSecret?: string;
  allowFastPath?: boolean;
  dontFragment?: "inherit" | "no";
  loopProtect?: "default" | "off" | "on";
  loopProtectDisableTime?: number;
  loopProtectSendInterval?: number;
  localAddress?: string;
  mtu?: number;
  arp?: string;
  macAddress?: string;
  keepalive?: string;
  clampTcpMss?: boolean;
}

export interface GreTunnelConfig extends BaseTunnelConfig {
  ipsecSecret?: string;
  allowFastPath?: boolean;
  dontFragment?: "inherit" | "no";
  localAddress?: string;
  mtu?: number;
  dscp?: number;
  keepalive?: string;
}

export interface VTeps {
  comment?: string;
  remoteAddress?: string;
}

export interface FDB {
  interface?: string;
  comment?: string;
  remoteAddress?: string;
}

export interface VxlanInterfaceConfig extends BaseTunnelConfig {
  vni: number;
  port?: number;
  bumMode: "unicast" | "multicast";
  group?: string;
  multicastInterface?: string;
  hw?: boolean;
  learning?: boolean;
  allowFastPath?: boolean;
  bridge?: string;
  bridgePVID?: number;
  checkSum?: boolean;
  dontFragment?: "auto" | "disabled" | "enabled" | "inherit";
  maxFdbSize?: number;
  ttl?: "auto" | number;
  vrf?: string;
  vtepsIpVersion?: "ipv4" | "ipv6";
  vteps?: VTeps[];
  fdb?: FDB[];
  localAddress?: string;
  mtu?: number;
}

export interface Tunnel {
  IPIP?: IpipTunnelConfig[];
  Eoip?: EoipTunnelConfig[];
  Gre?: GreTunnelConfig[];
  Vxlan?: VxlanInterfaceConfig[];
}
