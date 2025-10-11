import type { ARPState, BaseNetworksType } from "../CommonType";

export type TunnelType = "ipip" | "eoip" | "gre" | "vxlan";




export  interface BaseTunnelConfig {
    name: string;
    type: TunnelType;
    localAddress: string;
    remoteAddress: string;
    mtu?: number;
    disabled?: boolean;
    comment?: string;
    NetworkType: BaseNetworksType;
  }
    
  export  interface IpipTunnelConfig extends BaseTunnelConfig {
    ipsecSecret?: string; 
    keepalive?: string;  
    clampTcpMss?: boolean; 
    dscp?: number | "inherit"; 
    dontFragment?: 'inherit' | 'no';
    allowFastPath?: boolean;
  }
    
  export  interface EoipTunnelConfig extends BaseTunnelConfig {
    tunnelId: number; 
    macAddress?: string;  
    ipsecSecret?: string; 
    keepalive?: string;  
    arp?: ARPState; 
    arpTimeout?: number;
    clampTcpMss?: boolean; 
    allowFastPath?: boolean;
    dontFragment?: 'inherit' | 'no';
    dscp?: number | "inherit";
    loopProtect?: "default" | "off" | "on";
    loopProtectDisableTime?: number;
    loopProtectSendInterval?: number;
  }
    
  export  interface GreTunnelConfig extends BaseTunnelConfig {
    ipsecSecret?: string; 
    keepalive?: string; 
    allowFastPath?: boolean;
    clampTcpMss?: boolean; 
    dscp?: number | "inherit"; 
    dontFragment?: 'inherit' | 'no';
  }

  export interface VTeps {
    comment?: string;
    remoteAddress?: string;
  }

  export interface FDB {
    interface?: string;
    comment?: string;
    remoteAddress?: string;
  }
  
  export  interface VxlanInterfaceConfig extends BaseTunnelConfig {
      vni: number; 
      port?: number; 
      interface?: string; 
      bumMode: 'unicast' | 'multicast';
      group?: string;
      multicastInterface?: string;
      hw?: boolean;
      learning?: boolean;
      allowFastPath?: boolean;
      arp?: ARPState;
      arpTimeout?: number;
      bridge?: string;
      bridgePVID?: number;
      checkSum?: boolean;
      dontFragment?: 'auto' | 'disabled' | 'enabled' | 'inherit';
      macAddress?: string;
      maxFdbSize?: number;
      ttl?: 'auto' | number;
      vrf?: string;
      vtepsIpVersion?: 'ipv4' | 'ipv6';
      vteps?: VTeps[];
      fdb?: FDB[];
    }


  export interface Tunnel {
    IPIP?: IpipTunnelConfig[];
    Eoip?: EoipTunnelConfig[];
    Gre?: GreTunnelConfig[];
    Vxlan?: VxlanInterfaceConfig[];
  }