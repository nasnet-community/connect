import { useContext, $, useStore } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import type { IpipTunnelConfig } from "../../../../StarContext/Utils/TunnelType";

export const useIPIP = () => {
  const starContext = useContext(StarContext);
  const tunnelState = starContext.state.LAN.Tunnel || {};

  const ipipTunnels = useStore<IpipTunnelConfig[]>(tunnelState.IPIP || []);

  const expandedSections = useStore<Record<string, boolean>>({
    ipip: true,
  });

  const toggleSection = $((section: string) => {
    expandedSections[section] = !expandedSections[section];
  });

  const updateTunnelField = $(
    (
      index: number,
      field: keyof IpipTunnelConfig,
      value: string | boolean | number | undefined,
    ) => {
      if (index >= 0 && index < ipipTunnels.length) {
        (ipipTunnels[index] as any)[field] = value;

        const updatedTunnels = [...ipipTunnels];
        starContext.updateLAN$({
          Tunnel: {
            ...tunnelState,
            IPIP: updatedTunnels,
          },
        });
      }
    },
  );

  return {
    ipipTunnels,
    expandedSections,
    toggleSection,
    updateTunnelField,
  };
};
