import type { Signal } from "@builder.io/qwik";
import type { 
  IpipTunnelConfig,
  EoipTunnelConfig,
  GreTunnelConfig,
  VxlanInterfaceConfig
} from "../../StarContext/Utils/TunnelType";

export interface TunnelStepperData {
  tunnelEnabled: Signal<boolean>;
  selectedProtocol?: TunnelProtocolType;
  ipip: IpipTunnelConfig[];
  eoip: EoipTunnelConfig[];
  gre: GreTunnelConfig[];
  vxlan: VxlanInterfaceConfig[];
}

export type TunnelProtocolType = "ipip" | "eoip" | "gre" | "vxlan"; 