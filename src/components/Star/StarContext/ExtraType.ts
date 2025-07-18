export type ServiceType = "Enable" | "Disable" | "Local";
export type UpdateInterval = "Daily" | "Weekly" | "Monthly" | "";



export interface services {
    api: ServiceType;
    apissl: ServiceType;
    ftp: ServiceType;
    ssh: ServiceType;
    telnet: ServiceType;
    winbox: ServiceType;
    web: ServiceType;
    webssl: ServiceType;
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

export interface ExtraConfigState {
    RouterIdentityRomon?: RouterIdentityRomon;
    services?: services;
    Timezone?: string;
    AutoReboot?: AutoReboot;
    Update?: Update;
    isCertificate?: boolean;
    isNTP?: boolean;
    isGraphing?: boolean;
    isDDNS?: boolean;
    isLetsEncrypt?: boolean;
    Games?: GameConfig[];
  }