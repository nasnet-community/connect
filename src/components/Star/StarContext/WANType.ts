import type { 
    Ethernet,
   Wireless,
   Sfp,
   LTE,
   WirelessCredentials,
   Credentials 
  } from "./CommonType";
import type { VPNClient } from "./Utils/VPNClientType";


// export type MultiLinkMode = 'LoadBalance' | 'FailOver' | 'LoadBalanceFailOver' | '';
// export type InterfaceType = 'Ethernet' | 'VLAN' | 'Celular' | 'Wireless';
// export type ConnectionType = 'PPPOE' | 'StaticIP' | 'DHCP' | '';
// export type QOSMode = 'SimpleQueue' | 'PCQ' | 'PCQPerConnection' | 'PCQPerHost' | 'PCQPerHostPerConnection' | '';
// export type NTPMode = 'Multicast' | 'Unicast' | 'Broadcast' | 'Manycast' | '';
export type WANType = 'PPPOR' | 'DHCP' | 'StaticIP' | 'LTE';
export type InterfaceType = 'Ethernet' | 'VLAN' | 'Celular' | 'Wireless';


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
  InterfaceName: Ethernet | Wireless | Sfp | LTE;
  WirelessCredentials?: WirelessCredentials;
}

export interface WANLink {
  Foreign: WANConfig;
  Domestic?: WANConfig;
}


export interface WANState {
  WANLink: WANLink;
  VPNClient?: VPNClient;
}