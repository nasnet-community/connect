import { useContext, $, useStore } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import type { VxlanInterfaceConfig } from "../../../../StarContext/Utils/TunnelType";

export const useVXLAN = () => {
  const starContext = useContext(StarContext);
  const tunnelState = starContext.state.LAN.Tunnel || {};
  
  const vxlanTunnels = useStore<VxlanInterfaceConfig[]>(
    tunnelState.Vxlan || []
  );
  
  const expandedSections = useStore<Record<string, boolean>>({
    vxlan: true,
  });

  const toggleSection = $((section: string) => {
    expandedSections[section] = !expandedSections[section];
  });
  
  const updateTunnelField = $((index: number, field: keyof VxlanInterfaceConfig, value: string | boolean | number | undefined) => {
    if (index >= 0 && index < vxlanTunnels.length) {
      (vxlanTunnels[index] as any)[field] = value;
      
      const updatedTunnels = [...vxlanTunnels];
      starContext.updateLAN$({
        Tunnel: {
          ...tunnelState,
          Vxlan: updatedTunnels
        }
      });
    }
  });

  return {
    vxlanTunnels,
    expandedSections,
    toggleSection,
    updateTunnelField
  };
}; 