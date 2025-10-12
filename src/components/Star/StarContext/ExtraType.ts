export type ServiceType = "Enable" | "Disable" | "Local";
export type Interval = "Daily" | "Weekly" | "Monthly" | "";

export interface IntervalConfig {
  interval: Interval;
  time: string;
}

export interface RUIConfig {
  Timezone: string;
  Reboot?: IntervalConfig;
  Update?: IntervalConfig;
  IPAddressUpdate: IntervalConfig;
}

export interface ServiceConfig {
  type: ServiceType;
  port?: number;
}

export interface services {
  api: ServiceConfig;
  apissl: ServiceConfig;
  ftp: ServiceConfig;
  ssh: ServiceConfig;
  telnet: ServiceConfig;
  winbox: ServiceConfig;
  web: ServiceConfig;
  webssl: ServiceConfig;
}

export interface GameConfig {
  name: string;
  network: string; // NetworkName from Networks structure
  ports: {
    tcp?: string[];
    udp?: string[];
  };
}

export interface RouterIdentityRomon {
  RouterIdentity: string;
  isRomon?: boolean;
}

export interface CertificateConfig {
  SelfSigned?: boolean;
  LetsEncrypt?: boolean;
}

export interface NTPConfig {
  servers: string[];
}

export interface GraphingConfig {
  Interface: boolean;
  Queue: boolean;
  Resources: boolean;
}

export interface DDNSEntry {
  provider: "no-ip" | "dyndns" | "duckdns" | "cloudflare" | "custom";
  hostname: string;
  username: string;
  password: string;
  updateInterval: "5m" | "10m" | "30m" | "1h";
  customServerURL?: string;
}

export interface CloudDDNSConfig {
  ddnsEntries: DDNSEntry[];
}

export interface UPNPConfig {
  linkType: "domestic" | "foreign" | "vpn" | "";
}

export interface NATPMPConfig {
  linkType?: "domestic" | "foreign" | "vpn" | "";
  InterfaceName?: string;
}

export interface UsefulServicesConfig {
  certificate?: CertificateConfig;
  ntp?: NTPConfig;
  graphing?: GraphingConfig;
  cloudDDNS?: CloudDDNSConfig;
  upnp?: UPNPConfig;
  natpmp?: NATPMPConfig;
}

export interface ExtraConfigState {
  RouterIdentityRomon?: RouterIdentityRomon;
  services?: services;
  RUI: RUIConfig;
  usefulServices?: UsefulServicesConfig;
  Games?: GameConfig[];
}
