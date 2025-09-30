import type { Ethernet } from "./CommonType";
import type { Networks } from "./CommonType";
import type { Tunnel } from "./Utils/TunnelType";
import type { VPNServer } from "./Utils/VPNServerType";


export type WirelessInterfaceType = "Master" | "Slave";
export interface WirelessConfig {
  SSID: string;
  Password: string;
  isHide: boolean;
  isDisabled: boolean;
  SplitBand: boolean;
}

export interface MultiMode {
  Foreign?: WirelessConfig;
  Domestic?: WirelessConfig;
  Split?: WirelessConfig;
  VPN?: WirelessConfig;
}

export interface Wireless {
  SingleMode?: WirelessConfig;
  MultiMode?: MultiMode;
}

export interface EthernetInterfaceConfig {
  name: Ethernet;
  bridge: Networks;
}

export interface SubnetConfig {
  name: string;
  subnet: string;
}

export interface BaseNetworks {
  Split?: SubnetConfig;
  Domestic?: SubnetConfig;
  Foreign?: SubnetConfig;
  VPN?: SubnetConfig;
}

export interface VPNClientNetworks {
  Wireguard?: SubnetConfig[];
  OpenVPN?: SubnetConfig[];
  L2TP?: SubnetConfig[];
  PPTP?: SubnetConfig[];
  SSTP?: SubnetConfig[];
  IKev2?: SubnetConfig[];
}

export interface VPNServerNetworks {
  Wireguard?: SubnetConfig[];
  OpenVPN?: SubnetConfig[];
  L2TP?: SubnetConfig;
  PPTP?: SubnetConfig;
  SSTP?: SubnetConfig;
  IKev2?: SubnetConfig;
  Socks5?: SubnetConfig;
  SSH?: SubnetConfig;
  HTTPProxy?: SubnetConfig;
  BackToHome?: SubnetConfig;
  ZeroTier?: SubnetConfig;
}

export interface TunnelNetworks {
  IPIP?: SubnetConfig[];
  Eoip?: SubnetConfig[];
  Gre?: SubnetConfig[];
  Vxlan?: SubnetConfig[];
}
export interface Subnets {
  BaseNetworks: BaseNetworks;
  ForeignNetworks?:SubnetConfig[];
  DomesticNetworks?:SubnetConfig[];
  VPNClientNetworks?:VPNClientNetworks;
  VPNServerNetworks?:VPNServerNetworks;
  TunnelNetworks?:TunnelNetworks;
}
export interface LANState {
  Wireless?: Wireless;
  VPNServer?: VPNServer;
  Tunnel?: Tunnel;
  Interface?: EthernetInterfaceConfig[];
  Subnets?: Subnets;
}
