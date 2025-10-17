export interface SubnetConfig {
    name: string;
    subnet: string;
  }
  
  export interface BaseSubnets {
    Split?: SubnetConfig;
    Domestic?: SubnetConfig;
    Foreign?: SubnetConfig;
    VPN?: SubnetConfig;
  }
  
  export interface VPNClientSubnets {
    Wireguard?: SubnetConfig[];
    OpenVPN?: SubnetConfig[];
    L2TP?: SubnetConfig[];
    PPTP?: SubnetConfig[];
    SSTP?: SubnetConfig[];
    IKev2?: SubnetConfig[];
  }
  
  export interface VPNServerSubnets {
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
  
  export interface TunnelSubnets {
    IPIP?: SubnetConfig[];
    Eoip?: SubnetConfig[];
    Gre?: SubnetConfig[];
    Vxlan?: SubnetConfig[];
  }
  export interface Subnets {
    BaseSubnets: BaseSubnets;
    ForeignSubnets?:SubnetConfig[];
    DomesticSubnets?:SubnetConfig[];
    VPNClientSubnets?:VPNClientSubnets;
    VPNServerSubnets?:VPNServerSubnets;
    TunnelSubnets?:TunnelSubnets;
  }