import type {
  //  VPNType,
   AuthMethod,
   TLSVersion,
   NetworkProtocol,
   LayerMode,
   WirelessCredentials } from "./CommonType";
import type { Ethernet, Wireless, Sfp, LTE } from "./CommonType";


// export type MultiLinkMode = 'LoadBalance' | 'FailOver' | 'LoadBalanceFailOver' | '';
// export type InterfaceType = 'Ethernet' | 'VLAN' | 'Celular' | 'Wireless';
// export type ConnectionType = 'PPPOE' | 'StaticIP' | 'DHCP' | '';
// export type QOSMode = 'SimpleQueue' | 'PCQ' | 'PCQPerConnection' | 'PCQPerHost' | 'PCQPerHostPerConnection' | '';
// export type NTPMode = 'Multicast' | 'Unicast' | 'Broadcast' | 'Manycast' | '';
export type WANType = 'PPPOR' | 'DHCP' | 'StaticIP' | 'LTE';
export type InterfaceType = 'Ethernet' | 'VLAN' | 'Celular' | 'Wireless';



// // Network Configurations
// interface WANConfig {
//   IP?: string;
//   Mask?: string;
//   Gateway?: string;
//   VLAN?: {
//     Interface: string;
//     ID: string;
//   };
//   Wireless?: {
//     SSID: string;
//     Password: string;
//   };
//   Cellular?: {
//     APN: string;
//   } & Credentials;
// }





export interface Credentials {
  Username: string;
  Password: string;
}

interface BasePppClientOptions {
  Profile?: string;
  AddDefaultRoute?: boolean;
  UsePeerDNS?: boolean;
  AllowAuth?: AuthMethod[];
}

export interface PptpClientConfig extends BasePppClientOptions {
  ConnectTo: string;
  Credentials: Credentials; 
  KeepaliveTimeout?: number;
}

export interface L2tpClientConfig extends BasePppClientOptions {
  ConnectTo: string;
  Credentials: Credentials;
  UseIPsec?: boolean;
  IPsecSecret?: string;
}

export interface SstpClientConfig extends BasePppClientOptions {
  ConnectTo: string;
  Credentials: Credentials; 
  Port?: number;
  ClientCertificateName?: string;
  VerifyServerCertificate?: boolean;
  TlsVersion?: TLSVersion;
}

export interface OpenVpnClientConfig {
  ConnectTo: string;
  Port?: number;
  Mode?: LayerMode;
  Protocol?: NetworkProtocol;
  Credentials?: Credentials;
  ClientCertificateName?: string;
  CaCertificateName?: string;
  Auth?: string;
  Cipher?: string;
  AddDefaultRoute?: boolean;
  UsePeerDNS?: boolean;
  VerifyServerCertificate?: boolean;
}

export interface Ike2ClientConfig {
  ServerAddress: string;
  AuthMethod: 'psk' | 'eap' | 'certificate';
  PresharedKey?: string;
  Credentials?: Credentials; 
  ClientCertificateName?: string;
  CaCertificateName?: string;
  PolicySrcAddress?: string;
  PolicyDstAddress?: string;
}

export interface WireguardClientConfig {
  InterfacePrivateKey: string;
  InterfaceAddress: string; 
  InterfaceListenPort?: number;
  InterfaceMTU?: number;
  PeerPublicKey: string;
  PeerEndpointAddress: string;
  PeerEndpointPort: number;
  PeerAllowedIPs: string; 
  PeerPresharedKey?: string;
  PeerPersistentKeepalive?: number; 
}





export interface VPNConfig {
    ServerAddress: string;
    ServerPort: string;
    Credentials?: Credentials;
  }

  export interface Credentials {
    Username: string;
    Password: string;
  }


 
// export interface WireguardConfig {
//   Address: string;
//   PrivateKey: string;
//   PublicKey: string;
//   AllowedIPs: string;
//   ListeningPort?: string;
//   DNS: string;
//   MTU: string;
//   PreSharedKey?: string;
//   PersistentKeepalive?: string;
//   ServerAddress: string;
//   ServerPort: string;
// }



export interface WANConfig {
  InterfaceName: Ethernet | Wireless | Sfp | LTE;
  WirelessCredentials?: WirelessCredentials;
}

export interface WANLink {
  Foreign: WANConfig;
  Domestic?: WANConfig;
}

export interface VPNClient {
  Wireguard?: WireguardClientConfig[];
  OpenVPN?: OpenVpnClientConfig[];
  PPTP?: PptpClientConfig[];
  L2TP?: L2tpClientConfig[];
  SSTP?: SstpClientConfig[];
  IKeV2?: Ike2ClientConfig[]; 
}


export interface WANState {
  WANLink: WANLink;
  VPNClient?: VPNClient;
}