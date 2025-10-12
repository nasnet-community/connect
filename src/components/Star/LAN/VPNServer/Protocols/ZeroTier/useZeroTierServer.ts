import { useContext, $ } from "@builder.io/qwik";
import { StarContext } from "~/components/Star/StarContext";

export const useZeroTierServer = () => {
  const starContext = useContext(StarContext);
  const vpnServer = starContext.state.LAN.VPNServer;

  // Do not mutate StarContext during render; provide ephemeral defaults instead

  return {
    advancedFormState: vpnServer?.ZeroTierServer || {
      enabled: false,
      Network: "Split",
      ZeroTierNetworkID: "",
    },
    ensureDefaultConfig: $(async () => {
      const current = starContext.state.LAN.VPNServer || {} as any;
      if (!current.ZeroTierServer) {
        await starContext.updateLAN$({
          VPNServer: {
            ...current,
            ZeroTierServer: {
              enabled: true,
              Network: "Split",
              ZeroTierNetworkID: "",
            },
          },
        });
      }
    }),
  };
};