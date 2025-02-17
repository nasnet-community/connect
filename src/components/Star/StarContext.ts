import { createContextId, type QRL } from "@builder.io/qwik";

interface Credentials {
  Username: string;
  Password: string;
}

// Network Types
// type MultiLinkMode = 'LoadBalance' | 'FailOver' | 'LoadBalanceFailOver' | '';
// type InterfaceType = 'Ethernet' | 'VLAN' | 'Celular' | 'Wireless';
// type ConnectionType = 'PPPOE' | 'StaticIP' | 'DHCP' | '';
// type QOSMode = 'SimpleQueue' | 'PCQ' | 'PCQPerConnection' | 'PCQPerHost' | 'PCQPerHostPerConnection' | '';
// type NTPMode = 'Multicast' | 'Unicast' | 'Broadcast' | 'Manycast' | '';
type RouterModeType = "AP Mode" | "Trunk Mode" | "";
type FrimwareType = "MikroTik" | "OpenWRT" | "";
type RouterModel = "RB5009" | "hAP AX2" | "hAP AX3";
// type Band = '2.4' | '5';
type Mode = "easy" | "advance";
type VPNType =
  | "Wireguard"
  | "OpenVPN"
  | "PPTP"
  | "L2TP"
  | "SSTP"
  | "IKeV2"
  | "";
type ServiceType = "Enable" | "Disable" | "Local";
type UpdateInterval = "Daily" | "Weekly" | "Monthly" | "";

// Choose Section
interface ChooseState {
  Firmware: {
    Name: FrimwareType;
  };
  RouterMode: {
    Mode: RouterModeType;
  };
  RouterModel: {
    Model: RouterModel[];
    Interfaces: { [key: string]: string[] };
  };
}

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

interface services {
  api: ServiceType;
  apissl: ServiceType;
  ftp: ServiceType;
  ssh: ServiceType;
  telnet: ServiceType;
  winbox: ServiceType;
  web: ServiceType;
  webssl: ServiceType;
  [key: string]: ServiceType;
}

// VPN Configurations
interface VPNConfig {
  ServerAddress: string;
  ServerPort: string;
  Credentials?: Credentials;
}

export interface WireguardConfig {
  Address: string;
  PrivateKey: string;
  PublicKey: string;
  AllowedIPs: string;
  ListeningPort?: string;
  DNS: string;
  MTU: string;
  PreSharedKey?: string;
  PersistentKeepalive?: string;
  ServerAddress: string;
  ServerPort: string;
}

// WAN Section
interface WANState {
  Easy: {
    isWifi2_4: boolean;
    isWifi5: boolean;
    Foreign: {
      interface: string;
      WirelessCredentials: {
        SSID: string;
        Password: string;
      };
    };
    Domestic: {
      interface: string;
      WirelessCredentials: {
        SSID: string;
        Password: string;
      };
    };
    VPNClient: {
      VPNType: VPNType;
      Wireguard: WireguardConfig[];
      OpenVPN: VPNConfig[] | "";
      PPTP: VPNConfig[] | "";
      L2TP: (VPNConfig & { PreSharedKey: string })[] | "";
      SSTP: VPNConfig[] | "";
      IKeV2: VPNConfig[] | "";
    };
  };
}

interface WirelessCredential {
  SSID: string;
  Password: string;
}

interface WirelessConfig {
  SingleMode: {
    WirelessCredentials: WirelessCredential;
  };
  MultiMode: {
    Foreign: WirelessCredential;
    Domestic: WirelessCredential;
    Split: WirelessCredential;
    VPN: WirelessCredential;
  };
}

interface VPNServerUsers {
  Username: string;
  Password: string;
}

interface VPNServerConfig {
  Wireguard: boolean;
  OpenVPN: boolean;
  PPTP: boolean;
  L2TP: boolean;
  SSTP: boolean;
  IKeV2: boolean;
  Users: VPNServerUsers[];
}

export interface LANConfig {
  Wireless: WirelessConfig;
  VPNServerConfig: VPNServerConfig;
}

interface SubnetConfig {
  LANSubnet: string;
  VLANSubnets: string[];
  DHCPServer: {
    enabled: boolean;
    poolStart: string;
    poolEnd: string;
    leaseTime: string;
  };
}

interface InterfacesConfig {
  LAN: string[];
  VLAN: string[];
  Bridge: string[];
}

export interface GameConfig {
  name: string;
  link: "foreign" | "domestic" | "vpn" | "none";
  ports: {
    tcp?: string[];
    udp?: string[];
  };
}

export interface LANState {
  Wireless: {
    isWireless: boolean;
    isMultiSSID: boolean | "";
    SingleMode: {
      WirelessCredentials: {
        SSID: string;
        Password: string;
      };
    };
    MultiMode: {
      SamePassword: string;
      isSamePassword: boolean;
      Starlink: {
        SSID: string;
        Password: string;
      };
      Domestic: {
        SSID: string;
        Password: string;
      };
      Split: {
        SSID: string;
        Password: string;
      };
      VPN: {
        SSID: string;
        Password: string;
      };
    };
  };
  VPNServer: {
    Wireguard: boolean;
    OpenVPN: boolean;
    PPTP: boolean;
    L2TP: boolean;
    SSTP: boolean;
    IKeV2: boolean;
    Users: Array<{
      Username: string;
      Password: string;
    }>;
    OpenVPNConfig: {
      Passphrase: string;
    };
  };
  Subnet: SubnetConfig;
  Interfaces: InterfacesConfig;
}

interface ExtraConfigState {
  RouterIdentity: string;
  isRomon: boolean;
  services: services;
  Timezone: string;
  AutoReboot: {
    isAutoReboot: boolean;
    RebootTime: string;
  };
  Update: {
    isAutoReboot: boolean;
    UpdateTime: string;
    UpdateInterval: UpdateInterval;
  };
  isCertificate: boolean;
  isNTP: boolean;
  isGraphing: boolean;
  isDDNS: boolean;
  isLetsEncrypt: boolean;
  Games: GameConfig[];
}

export interface StarState {
  Mode: Mode;
  Choose: ChooseState;
  WAN: WANState;
  LAN: LANState;
  ExtraConfig: ExtraConfigState;
  ShowConfig: Record<string, unknown>;
}

export interface StarContextType {
  state: StarState;
  updateMode$: QRL<(mode: Mode) => void>;
  updateChoose$: QRL<(data: Partial<ChooseState>) => void>;
  updateWAN$: QRL<(data: Partial<WANState>) => void>;
  updateLAN$: QRL<(data: Partial<StarState["LAN"]>) => void>;
  updateExtraConfig$: QRL<(data: Partial<ExtraConfigState>) => void>;
  updateShowConfig$: QRL<(data: Partial<StarState["ShowConfig"]>) => void>;
}

export const StarContext = createContextId<StarContextType>("star-context");

export type { VPNType };
