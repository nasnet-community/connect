import { useContext, $, useStore } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import type { GreTunnelConfig } from "../../../../StarContext/LANType";

export const useGRE = () => {
  const starContext = useContext(StarContext);
  const tunnelState = starContext.state.LAN.Tunnel || {};
  
  const greTunnels = useStore<GreTunnelConfig[]>(
    tunnelState.Gre || []
  );
  
  const expandedSections = useStore<Record<string, boolean>>({
    gre: true,
  });

  const toggleSection = $((section: string) => {
    expandedSections[section] = !expandedSections[section];
  });
  
  const updateTunnelField = $((index: number, field: keyof GreTunnelConfig, value: string | boolean | number | undefined) => {
    if (index >= 0 && index < greTunnels.length) {
      (greTunnels[index] as any)[field] = value;
      
      const updatedTunnels = [...greTunnels];
      starContext.updateLAN$({
        Tunnel: {
          ...tunnelState,
          Gre: updatedTunnels
        }
      });
    }
  });

  return {
    greTunnels,
    expandedSections,
    toggleSection,
    updateTunnelField
  };
}; 