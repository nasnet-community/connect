export interface SubnetConfig {
    name: string;
    subnet: string;
  }
  
  export interface BaseNetworksSubnets {
    Split?: SubnetConfig;
    Domestic?: SubnetConfig;
    Foreign?: SubnetConfig;
    VPN?: SubnetConfig;
  }
  
  export interface VPNClientNetworksSubnets {
    Wireguard?: SubnetConfig[];
    OpenVPN?: SubnetConfig[];
    L2TP?: SubnetConfig[];
    PPTP?: SubnetConfig[];
    SSTP?: SubnetConfig[];
    IKev2?: SubnetConfig[];
  }
  
  export interface VPNServerNetworksSubnets {
    Wireguard?: SubnetConfig[];
    OpenVPN?: SubnetConfig[];
    L2TP?: SubnetConfig;
    PPTP?: SubnetConfig;
    SSTP?: SubnetConfig;
    IKev2?: SubnetConfig;
    Socks5?: SubnetConfig;
    SSH?: SubnetConfig;
    HTTPProxy?: SubnetConfig;
    BackToHome?: SubnetConfig;
    ZeroTier?: SubnetConfig;
  }
  
  export interface TunnelNetworksSubnets {
    IPIP?: SubnetConfig[];
    Eoip?: SubnetConfig[];
    Gre?: SubnetConfig[];
    Vxlan?: SubnetConfig[];
  }
  export interface Subnets {
    BaseNetworks: BaseNetworksSubnets;
    ForeignNetworks?:SubnetConfig[];
    DomesticNetworks?:SubnetConfig[];
    VPNClientNetworks?:VPNClientNetworksSubnets;
    VPNServerNetworks?:VPNServerNetworksSubnets;
    TunnelNetworks?:TunnelNetworksSubnets;
  }