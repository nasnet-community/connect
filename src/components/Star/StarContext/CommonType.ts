
export type Band = '2.4' | '5';
export type PppAuthMethod = "pap" | "chap" | "mschap1" | "mschap2";
export type ARPState = "enabled" | "disabled" | "proxy-arp" | "reply-only";
export type AuthMethod = "pap" | "chap" | "mschap1" | "mschap2";
export type TLSVersion = "any" | "only-1.2" | "only-1.3";

// export type TLSVersion = 'any' | '1.0' | '1.1' | '1.2' | 'only-1.2';
export type NetworkProtocol = "tcp" | "udp";
export type LayerMode = 'ip' | 'ethernet';
export type VPNType =
  | "Wireguard"
  | "OpenVPN"
  | "PPTP"
  | "L2TP"
  | "SSTP"
  | "IKeV2"

export type Ethernet = 'ether1' | 'ether2' | 'ether3' | 'ether4' | 'ether5' |
                      'ether6' | 'ether7' | 'ether8' | 'ether9' | 'ether10' |
                      'ether11' | 'ether12' | 'ether13' | 'ether14' | 'ether15' |
                      'ether16' | 'ether17' | 'ether18' | 'ether19' | 'ether20' |
                      'ether21' | 'ether22' | 'ether23' | 'ether24' | 'ether25' |
                      'ether26' | 'ether27' | 'ether28' | 'ether29' | 'ether30' |
                      'ether31' | 'ether32' ;
// export type Wireless = 'wlan1' | 'wlan2' | 'wlan3' | 'wlan4' | 'wlan5' ;
export type Wireless = 'wifi5' | 'wifi2.4';
export type Sfp = 'sfp1' | 'sfp2' | 'sfp3' | 'sfp4' | 'sfp5' | 'sfp6' | 'sfp7' | 
                  'sfp8' | 'sfp9' | 'sfp10' | 'sfp11' | 'sfp12' | 'sfp13' | 'sfp14' | 
                  'sfp15' | 'sfp16' | 'sfp17' | 'sfp18' | 'sfp19' | 'sfp20' | 'sfp21' | 
                  'sfp22' | 'sfp23' | 'sfp24' | 'sfp25' | 'sfp26' | 'sfp27' | 'sfp28' | 
                  'sfp29' | 'sfp30' | 'sfp31' | 'sfp32'  | 'sfp-sfpplus1' ;
export type LTE = 'lte1' | 'lte2' | 'lte3' | 'lte4' | 'lte5';

export interface WirelessCredentials  {
  SSID: string;
  Password: string;
}
export type Networks = "VPN" | "Domestic" | "Foreign" | "Split";

export interface Server {
  Address: string;
  Port?: number;
}

export interface Credentials {
  Username: string;
  Password: string;
}

export type IkeHashAlgorithm = 'md5' | 'sha1' | 'sha256' | 'sha384' | 'sha512';
export type IkeEncAlgorithm = 'des' | '3des' | 'aes-128' | 'aes-192' | 'aes-256' | 'blowfish' | 'aes-128-cbc' | 'aes-192-cbc' | 'aes-256-cbc' | 'aes-128-gcm' | 'aes-256-gcm' | 'camellia-128' | 'camellia-192' | 'camellia-256'; // Added camellia [6]
export type IkeDhGroup = 'modp1024' | 'modp1536' | 'modp2048' | 'modp3072' | 'modp4096' | 'modp6144' | 'modp8192' | 'ecp256' | 'ecp384' | 'ecp521';
export type IkeAuthMethod = 'pre-shared-key' | 'rsa-signature' | 'eap';
export type IkeEapMethod = 'eap-mschapv2' | 'eap-tls'; 
export type IkeIdType = 'auto' | 'fqdn' | 'user-fqdn' | 'ip' | 'asn1dn' | 'key-id'; 
export type IkePolicyAction = 'encrypt' | 'none' | 'discard';
export type IkePolicyLevel = 'require' | 'unique' | 'use';