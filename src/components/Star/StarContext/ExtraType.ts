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
    link: "foreign" | "domestic" | "vpn" | "none";
    ports: {
      tcp?: string[];
      udp?: string[];
    };
  }




export interface ExtraConfigState {
    RouterIdentity?: string;
    isRomon?: boolean;
    services?: services;
    Timezone?: string;
    AutoReboot?: {
      isAutoReboot: boolean;
      RebootTime: string;
    };
    Update?: {
      isAutoReboot: boolean;
      UpdateTime: string;
      UpdateInterval: UpdateInterval;
    };
    isCertificate?: boolean;
    isNTP?: boolean;
    isGraphing?: boolean;
    isDDNS?: boolean;
    isLetsEncrypt?: boolean;
    Games?: GameConfig[];
  }