export type NetworkName = string;
  
  export interface BaseNetworks {
    Split?: boolean;
    Domestic?: boolean;
    Foreign?: boolean;
    VPN?: boolean;
  }
  
  export interface VPNClientNetworks {
    Wireguard?: NetworkName[];
    OpenVPN?: NetworkName[];
    L2TP?: NetworkName[];
    PPTP?: NetworkName[];
    SSTP?: NetworkName[];
    IKev2?: NetworkName[];
  }
  
  export interface VPNServerNetworks {
    Wireguard?: NetworkName[];
    OpenVPN?: NetworkName[];
    L2TP?: NetworkName;
    PPTP?: NetworkName;
    SSTP?: NetworkName;
    IKev2?: NetworkName;
    Socks5?: NetworkName;
    SSH?: NetworkName;
    HTTPProxy?: NetworkName;
    BackToHome?: NetworkName;
    ZeroTier?: NetworkName;
  }
  
  export interface TunnelNetworks {
    IPIP?: NetworkName[];
    Eoip?: NetworkName[];
    Gre?: NetworkName[];
    Vxlan?: NetworkName[];
  }
 export interface Networks {
    BaseNetworks: BaseNetworks;
    ForeignNetworks?: NetworkName[];
    DomesticNetworks?: NetworkName[];
    VPNClientNetworks?: VPNClientNetworks;
    VPNServerNetworks?: VPNServerNetworks;
    TunnelNetworks?: TunnelNetworks;
  }