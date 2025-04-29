import type { AuthMethod, ARPState, TLSVersion, NetworkProtocol, LayerMode, VPNType } from "./CommonType";


export type OvpnAuthMethod = "md5" | "sha1" | "null" | "sha256" | "sha512";
export type OvpnCipher =
  | "null"
  | "aes128-cbc"
  | "aes128-gcm"
  | "aes192-cbc"
  | "aes192-gcm"
  | "aes256-cbc"
  | "aes256-gcm"
  | "blowfish128";
// export type MikroTikTunnelConfig =
//   | IpipTunnelConfig
//   | EoipTunnelConfig
//   | GreTunnelConfig
//   | VxlanInterfaceConfig;

export type TunnelType = "ipip" | "eoip" | "gre" | "vxlan";
export type ClientAuthMethod = "eap" | "pre-shared-key" | "digital-signature";

export interface Credentials {
  Username: string;
  Password: string;
  VPNType: VPNType[];
}

export interface WirelessConfig {
  SSID: string;
  Password: string;
  isHide: boolean;
  isDisabled: boolean;
}



export interface PptpServerConfig {
  Profile: string;
  Authentication?: AuthMethod[];
  MaxMtu?: number;
  MaxMru?: number;
  KeepaliveTimeout?: number;
}

export interface L2tpServerConfig {
  Profile: string;
  UseIpsec: 'yes' | 'no' | 'required';
  IpsecSecret?: string;
  Authentication?: AuthMethod[];
  MaxMtu?: number;
  MaxMru?: number;
  KeepaliveTimeout?: number;
  OneSessionPerHost?: boolean;
}

export interface SstpServerConfig {
  Profile: string;
  Certificate: string;
  Port?: number;
  Authentication?: AuthMethod[];
  ForceAes?: boolean;
  Pfs?: boolean;
  VerifyClientCertificate?: boolean;
  TlsVersion?: TLSVersion;
}

export interface OpenVpnServerConfig {
  Profile: string;
  Certificate: string;
  Port?: number;
  Protocol?: NetworkProtocol;
  Mode?: LayerMode;
  Netmask?: number;
  MacAddress?: string;
  RequireClientCertificate?: boolean;
  Auth?: string; 
  Cipher?: string | string[]; 
  CertificateKeyPassphrase?: string;
}

export interface Ikev2ServerConfig {
  AddressPool: string;
  ClientAuthMethod: ClientAuthMethod;
  PresharedKey?: string;
  EapMethods?: string; 
  ServerCertificate?: string;
  ClientCaCertificate?: string;
  DnsServers?: string;
  PeerName?: string;
  IpsecProfile?: string;
  IpsecProposal?: string;
  PolicyTemplateGroup?: string;
}

export interface WireguardInterfaceConfig {
  Name: string;
  PrivateKey: string;
  readonly PublicKey?: string; 
  InterfaceAddress: string;
  ListenPort?: number;
  Mtu?: number;
}


export interface WireguardPeerConfig {
  PublicKey: string;
  AllowedAddress: string; 
  PresharedKey?: string;
  EndpointAddress?: string;
  EndpointPort?: number;
  Comment?: string;
}

export interface WireguardServerInstanceConfig {
  Interface: WireguardInterfaceConfig;
  Peers: WireguardPeerConfig[];
}




export  interface BaseTunnelConfig {
  name: string;
  type: TunnelType;
  localAddress: string;
  remoteAddress: string;
  mtu?: number;
}
  

export  interface IpipTunnelConfig extends BaseTunnelConfig {
  ipsecSecret?: string; 
  keepalive?: string;  
  clampTcpMss?: boolean; 
  dscp?: number | "inherit"; 
}
  
export  interface EoipTunnelConfig extends BaseTunnelConfig {
  tunnelId: number; 
  macAddress?: string;  
  ipsecSecret?: string; 
  keepalive?: string;  
  arp?: ARPState; 
  clampTcpMss?: boolean; 
}
  
export  interface GreTunnelConfig extends BaseTunnelConfig {
  ipsecSecret?: string; 
  keepalive?: string; 
  clampTcpMss?: boolean; 
  dscp?: number | "inherit"; 
}

export  interface VxlanInterfaceConfig extends BaseTunnelConfig {
    vni: number; 
    port?: number; 
    interface?: string; 
  }
  
export interface LANState {
  Wireless?: {
    isMultiSSID: boolean ;
    SingleMode?:  WirelessConfig;
    MultiMode?: {
      Starlink?: WirelessConfig;
      Domestic?: WirelessConfig;
      Split?: WirelessConfig;
      VPN?: WirelessConfig;
    };
  };
  VPNServer?: {
    Users: Credentials[]; 
    PptpServer?: PptpServerConfig;
    L2tpServer?: L2tpServerConfig;
    SstpServer?: SstpServerConfig;
    OpenVpnServer?: OpenVpnServerConfig;
    Ikev2Server?: Ikev2ServerConfig;
    WireguardServers?: WireguardServerInstanceConfig[];
  };
  Tunnel?: {
    IPIP?: IpipTunnelConfig[];
    Eoip?: EoipTunnelConfig[];
    Gre?: GreTunnelConfig[];
    Vxlan?: VxlanInterfaceConfig[];
  };
}