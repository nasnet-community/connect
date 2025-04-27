import type { VPNType } from "./CommonType";


// export type MultiLinkMode = 'LoadBalance' | 'FailOver' | 'LoadBalanceFailOver' | '';
// export type InterfaceType = 'Ethernet' | 'VLAN' | 'Celular' | 'Wireless';
// export type ConnectionType = 'PPPOE' | 'StaticIP' | 'DHCP' | '';
// export type QOSMode = 'SimpleQueue' | 'PCQ' | 'PCQPerConnection' | 'PCQPerHost' | 'PCQPerHostPerConnection' | '';
// export type NTPMode = 'Multicast' | 'Unicast' | 'Broadcast' | 'Manycast' | '';



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

  export interface Credentials {
    Username: string;
    Password: string;
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



export interface WANState {
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
  