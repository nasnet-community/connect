export type ServiceType = "Enable" | "Disable" | "Local";
export type UpdateInterval = "Daily" | "Weekly" | "Monthly" | "";

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
  link: "foreign" | "domestic" | "vpn";
  ports: {
    tcp?: string[];
    udp?: string[];
  };
}

export interface RouterIdentityRomon {
  RouterIdentity: string;
  isRomon?: boolean;
}

export interface AutoReboot {
  isAutoReboot: boolean;
  RebootTime: string;
}

export interface Update {
  isAutoReboot: boolean;
  UpdateTime: string;
  UpdateInterval: UpdateInterval;
}

export interface IPAddressUpdate {
  isIPAddressUpdate: boolean;
  IPAddressUpdateTime: string;
}

export interface ExtraConfigState {
  RouterIdentityRomon?: RouterIdentityRomon;
  services?: services;
  Timezone?: string;
  AutoReboot?: AutoReboot;
  Update?: Update;
  IPAddressUpdate?: IPAddressUpdate;
  isCertificate?: boolean;
  isNTP?: boolean;
  isGraphing?: boolean;
  isDDNS?: boolean;
  isLetsEncrypt?: boolean;
  Games?: GameConfig[];
}
