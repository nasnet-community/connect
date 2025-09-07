import type {
  Ethernet,
  Wireless,
  Sfp,
  LTE,
  WirelessCredentials,
  Credentials,
} from "./CommonType";
import type { VPNClient } from "./Utils/VPNClientType";

export interface DOHConfig {
  enabled: boolean;
  domain?: string;
  bindingIP?: string;
}

export interface DNSConfig {
  ForeignDNS: string;
  VPNDNS: string;
  DomesticDNS?: string;
  SplitDNS?: string;
  DOHConfig?: DOHConfig;
}

// export type MultiLinkMode = 'LoadBalance' | 'FailOver' | 'LoadBalanceFailOver' | '';
// export type InterfaceType = 'Ethernet' | 'VLAN' | 'Celular' | 'Wireless';
// export type ConnectionType = 'PPPOE' | 'StaticIP' | 'DHCP' | '';
// export type QOSMode = 'SimpleQueue' | 'PCQ' | 'PCQPerConnection' | 'PCQPerHost' | 'PCQPerHostPerConnection' | '';
// export type NTPMode = 'Multicast' | 'Unicast' | 'Broadcast' | 'Manycast' | '';
export type WANType = "PPPOR" | "DHCP" | "StaticIP" | "LTE";
export type InterfaceType = "Ethernet" | "VLAN" | "Celular" | "Wireless";

// type IkeHashAlgorithm = 'md5' | 'sha1' | 'sha256' | 'sha384' | 'sha512';
// type IkeEncAlgorithm = 'des' | '3des' | 'aes-128' | 'aes-192' | 'aes-256' | 'blowfish' | 'aes-128-cbc' | 'aes-192-cbc' | 'aes-256-cbc' | 'aes-128-gcm' | 'aes-256-gcm';
// type IkeDhGroup = 'modp1024' | 'modp1536' | 'modp2048' | 'modp3072' | 'modp4096' | 'modp6144' | 'modp8192' | 'ecp256' | 'ecp384' | 'ecp521';
// type IkeAuthMethod = 'pre-shared-key' | 'rsa-signature' | 'eap';
// type IkeEapMethod = 'eap-mschapv2' | 'eap-tls';
// type IkeIdType = 'auto' | 'fqdn' | 'user-fqdn' | 'ip' | 'asn1dn' | string;
// type IkePolicyAction = 'encrypt' | 'none' | 'discard';
// type IkePolicyLevel = 'require' | 'unique' | 'use';

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

export interface VPNConfig {
  ServerAddress: string;
  ServerPort: string;
  Credentials?: Credentials;
}

export interface WANConfig {
  name?: string;
  InterfaceName: Ethernet | Wireless | Sfp | LTE;
  WirelessCredentials?: WirelessCredentials;
  lteSettings?: LTESettings;
}

export interface WANLink {
  Foreign: WANConfig;
  Domestic?: WANConfig;
}

// Wizard-specific types
export type ConnectionType = "DHCP" | "PPPoE" | "Static" | "LTE";
export type LoadBalanceMethod = "PCC" | "NTH" | "ECMP" | "Bonding" | "RoundRobin";
export type MultiLinkStrategy = "LoadBalance" | "Failover" | "RoundRobin" | "Both";

export interface LTESettings {
  apn: string;
  username?: string;
  password?: string;
}

export interface VLANConfig {
  enabled: boolean;
  id: number;
}

export interface MACAddressConfig {
  enabled: boolean;
  address: string;
}

export interface PPPoEConfig {
  username: string;
  password: string;
}

export interface StaticIPConfig {
  ipAddress: string;
  subnet: string;
  gateway: string;
  primaryDns: string;
  secondaryDns?: string;
}

export interface WANLinkConfig {
  id: string;
  name: string;

  // Interface settings
  interfaceType: "Ethernet" | "Wireless" | "SFP" | "LTE";
  interfaceName: string;

  // Interface-specific settings
  wirelessCredentials?: WirelessCredentials;
  lteSettings?: LTESettings;

  // Advanced settings
  vlanConfig?: VLANConfig;
  macAddress?: MACAddressConfig;

  // Connection settings
  connectionType?: ConnectionType;
  connectionConfig?: {
    pppoe?: PPPoEConfig;
    static?: StaticIPConfig;
  };
  connectionConfirmed?: boolean; // Track if user has confirmed/visited connection settings

  // Multi-link settings
  priority?: number;
  weight?: number;
}

export interface MultiLinkConfig {
  strategy: MultiLinkStrategy;
  loadBalanceMethod?: LoadBalanceMethod;
  failoverCheckInterval?: number;
  failoverTimeout?: number;
  roundRobinInterval?: number; // for Round Robin strategy
  packetMode?: "connection" | "packet"; // for Round Robin strategy
}

export interface WANWizardState {
  mode: "easy" | "advanced";
  viewMode?: "expanded" | "compact";
  links: WANLinkConfig[];
  multiLinkStrategy?: MultiLinkConfig;
  validationErrors: Record<string, string[]>;
}

export interface VPNClientState extends VPNClient {
  mode?: "easy" | "advanced";
  // Advanced mode properties
  VPNClients?: any[];
  MultiVPNConfig?: any;
  ValidationErrors?: Record<string, string[]>;
}

export interface WANState {
  WANLink: WANLink;
  VPNClient?: VPNClientState;
  DNSConfig?: DNSConfig;
  // New fields for wizard support
  WANLinks?: WANLinkConfig[];
  MultiLinkConfig?: MultiLinkConfig;
}
