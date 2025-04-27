






export interface SubnetConfig {
    LANSubnet: string;
    VLANSubnets: string[];
    DHCPServer: {
      enabled: boolean;
      poolStart: string;
      poolEnd: string;
      leaseTime: string;
    };
  }


  export interface WirelessCredential {
    SSID: string;
    Password: string;
  }


export interface InterfacesConfig {
    LAN: string[];
    VLAN: string[];
    Bridge: string[];
  }
  

export interface WirelessConfig {
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


export  interface VPNServerUsers {
    Username: string;
    Password: string;
  }
  
export  interface VPNServerConfig {
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