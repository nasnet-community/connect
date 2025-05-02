import { useContext, $, useStore } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import type { EoipTunnelConfig } from "../../../../StarContext/LANType";

export const useEOIP = () => {
  const starContext = useContext(StarContext);
  const tunnelState = starContext.state.LAN.Tunnel || {};
  
  const eoipTunnels = useStore<EoipTunnelConfig[]>(
    tunnelState.Eoip || []
  );
  
  const expandedSections = useStore<Record<string, boolean>>({
    eoip: true,
  });

  const toggleSection = $((section: string) => {
    expandedSections[section] = !expandedSections[section];
  });
  
  const updateTunnelField = $((index: number, field: keyof EoipTunnelConfig, value: string | boolean | number | undefined) => {
    if (index >= 0 && index < eoipTunnels.length) {
      (eoipTunnels[index] as any)[field] = value;
      
      const updatedTunnels = [...eoipTunnels];
      starContext.updateLAN$({
        Tunnel: {
          ...tunnelState,
          Eoip: updatedTunnels
        }
      });
    }
  });

  return {
    eoipTunnels,
    expandedSections,
    toggleSection,
    updateTunnelField
  };
}; 