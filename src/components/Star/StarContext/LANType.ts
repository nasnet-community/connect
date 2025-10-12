import type { Ethernet } from "./CommonType";
import type { BaseNetworksType } from "./CommonType";
import type { Tunnel } from "./Utils/TunnelType";
import type { VPNServer } from "./Utils/VPNServerType";
import type { Subnets } from "./Utils/Subnets";

export type WirelessInterfaceType = "Master" | "Slave";

export type WifiTarget =
  | "Domestic" 
  | "Foreign" 
  | "VPN"
  | "Split"  
  | "SingleDomestic" 
  | "SingleForeign" 
  | "SingleVPN" 

export interface WirelessConfig {
  SSID: string;
  Password: string;
  isHide: boolean;
  isDisabled: boolean;
  SplitBand: boolean;
  WifiTarget: WifiTarget;
  NetworkName: string;
}

export interface EthernetInterfaceConfig {
  name: Ethernet;
  bridge: BaseNetworksType;
}


export interface LANState {
  Wireless?: WirelessConfig[];
  VPNServer?: VPNServer;
  Tunnel?: Tunnel;
  Interface?: EthernetInterfaceConfig[];
  Subnets?: Subnets;
}
