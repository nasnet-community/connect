import { useContext, $, useSignal, useStore, useComputed$ } from "@builder.io/qwik";
import { StarContext } from "../../StarContext/StarContext";
import type { 
  BaseTunnelConfig, 
  IpipTunnelConfig, 
  EoipTunnelConfig, 
  GreTunnelConfig, 
  VxlanInterfaceConfig,
  TunnelType
} from "../../StarContext/LANType";
import type { QRL } from "@builder.io/qwik";

export const useTunnel = () => {
  const starContext = useContext(StarContext);
  const tunnelState = starContext.state.LAN.Tunnel || {};
  
  const tunnelEnabled = useSignal(true);
  const selectedTunnelType = useSignal<TunnelType | "">("");
  
  const allTunnels: BaseTunnelConfig[] = [
    ...(tunnelState.IPIP || []),
    ...(tunnelState.Eoip || []),
    ...(tunnelState.Gre || []),
    ...(tunnelState.Vxlan || [])
  ];
  
  const tunnels = useStore<BaseTunnelConfig[]>(allTunnels);
  
  const tunnelTypes: TunnelType[] = ['ipip', 'eoip', 'gre', 'vxlan'];
  
  const expandedSections = useStore<Record<string, boolean>>({
    tunnelList: true,
    ipip: false,
    eoip: false,
    gre: false,
    vxlan: false
  });

  const toggleSection = $((section: string) => {
    expandedSections[section] = !expandedSections[section];
  });

  const addTunnel = $(() => {
    if (!selectedTunnelType.value) return;

    const newTunnelBase = {
      name: `${selectedTunnelType.value}-tunnel-${tunnels.filter((t: BaseTunnelConfig) => t.type === selectedTunnelType.value).length + 1}`,
      type: selectedTunnelType.value,
      localAddress: "",
      remoteAddress: "",
    };

    let newTunnel: BaseTunnelConfig;

    switch (selectedTunnelType.value) {
      case 'ipip':
        newTunnel = { 
          ...newTunnelBase, 
          type: 'ipip',
        } as IpipTunnelConfig;
        break;
      case 'eoip':
        newTunnel = { 
          ...newTunnelBase, 
          type: 'eoip',
          tunnelId: tunnels.filter((t: BaseTunnelConfig) => t.type === 'eoip').length + 1,
        } as EoipTunnelConfig;
        break;
      case 'gre':
        newTunnel = { 
          ...newTunnelBase, 
          type: 'gre',
        } as GreTunnelConfig;
        break;
      case 'vxlan':
        newTunnel = { 
          ...newTunnelBase, 
          type: 'vxlan',
          vni: tunnels.filter((t: BaseTunnelConfig) => t.type === 'vxlan').length + 1,
        } as VxlanInterfaceConfig;
        break;
      default:
        return;
    }

    tunnels.push(newTunnel);
    selectedTunnelType.value = "";
  });

  const selectTunnelType = $((type: TunnelType) => {
    selectedTunnelType.value = type;
  });
  
  const isValid = useComputed$(() => {
    if (!tunnelEnabled.value) return true;
    
    if (tunnels.length === 0) return true;
    
    return tunnels.every((tunnel: BaseTunnelConfig) => {
      const hasRequiredFields = 
        tunnel.name.trim() !== "" && 
        tunnel.localAddress.trim() !== "" && 
        tunnel.remoteAddress.trim() !== "";
      
      if (tunnel.type === 'eoip') {
        return hasRequiredFields && (tunnel as EoipTunnelConfig).tunnelId !== undefined;
      }
      
      if (tunnel.type === 'vxlan') {
        return hasRequiredFields && (tunnel as VxlanInterfaceConfig).vni !== undefined;
      }
      
      return hasRequiredFields;
    });
  });

  const saveSettings = $((onComplete$?: QRL<() => void>) => {
    if (tunnelEnabled.value) {
      const ipip = tunnels.filter((t: BaseTunnelConfig) => t.type === 'ipip') as IpipTunnelConfig[];
      const eoip = tunnels.filter((t: BaseTunnelConfig) => t.type === 'eoip') as EoipTunnelConfig[];
      const gre = tunnels.filter((t: BaseTunnelConfig) => t.type === 'gre') as GreTunnelConfig[];
      const vxlan = tunnels.filter((t: BaseTunnelConfig) => t.type === 'vxlan') as VxlanInterfaceConfig[];
      
      starContext.updateLAN$({
        Tunnel: {
          IPIP: ipip.length > 0 ? ipip : undefined,
          Eoip: eoip.length > 0 ? eoip : undefined,
          Gre: gre.length > 0 ? gre : undefined,
          Vxlan: vxlan.length > 0 ? vxlan : undefined,
        }
      });
    } else {
      starContext.updateLAN$({
        Tunnel: {
          IPIP: undefined,
          Eoip: undefined,
          Gre: undefined,
          Vxlan: undefined,
        }
      });
    }
    
    if (onComplete$) {
      onComplete$();
    }
  });

  const toggleTunnelEnabled = $(() => {
    tunnelEnabled.value = !tunnelEnabled.value;
  });

  return {
    tunnelEnabled,
    tunnels,
    tunnelTypes,
    selectedTunnelType,
    expandedSections,
    isValid,
    
    toggleSection,
    addTunnel,
    selectTunnelType,
    saveSettings,
    toggleTunnelEnabled
  };
}; 