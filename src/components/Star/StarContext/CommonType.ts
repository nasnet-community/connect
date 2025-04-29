
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


export type WirelessCredentials = {
  SSID: string;
  Password: string;
}

