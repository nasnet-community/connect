import { useContext, $, useStore, useSignal } from "@builder.io/qwik";
import { StarContext } from "~/components/Star/StarContext";
import type { BackToHomeServerConfig, VSNetwork } from "~/components/Star/StarContext";

// Define ViewMode type
type ViewMode = "easy" | "advanced";

export const useBackToHomeServer = () => {
  const starContext = useContext(StarContext);
  const vpnServerState = starContext.state.LAN.VPNServer || { Users: [] };

  const backToHomeState = vpnServerState.BackToHomeServer || {
    enabled: true,
    Network: "Split",
  };

  // Unified form state for both easy and advanced modes
  const formState = useStore({
    network: backToHomeState.Network || "Split",
    vsNetwork: backToHomeState.VSNetwork || "VPN",
  });

  // UI state
  const isEnabled = useSignal(!!backToHomeState.enabled);
  const viewMode = useSignal<ViewMode>("advanced");

  // Core update function
  const updateBackToHomeServer$ = $((config: Partial<BackToHomeServerConfig>) => {
    const newConfig = {
      ...backToHomeState,
      ...config,
    };

    starContext.updateLAN$({
      VPNServer: {
        ...vpnServerState,
        BackToHomeServer: config.enabled === false && !config.Network ? undefined : newConfig,
      },
    });
  });

  // Advanced mode form update function
  const updateAdvancedForm$ = $((updatedValues: Partial<typeof formState>) => {
    // Update local state first
    Object.assign(formState, updatedValues);

    // Then update server config
    updateBackToHomeServer$({
      enabled: isEnabled.value,
      Network: formState.network as VSNetwork,
      VSNetwork: formState.vsNetwork as VSNetwork,
    });
  });

  // Easy mode form update function
  const updateEasyForm$ = $((network?: VSNetwork) => {
    const vsNetwork = network || formState.vsNetwork;
    formState.vsNetwork = vsNetwork;

    // Update server config with default values for easy mode
    updateBackToHomeServer$({
      enabled: true,
      Network: vsNetwork,
      VSNetwork: vsNetwork,
    });
  });

  // Individual field updates
  const updateNetwork$ = $((value: VSNetwork) =>
    updateAdvancedForm$({ network: value }),
  );
  const updateVSNetwork$ = $((value: VSNetwork) =>
    updateAdvancedForm$({ vsNetwork: value }),
  );

  // Toggle server enable status
  const handleToggle = $((enabled: boolean) => {
    isEnabled.value = enabled;
    if (enabled) {
      updateAdvancedForm$({});
    } else {
      updateBackToHomeServer$({ enabled: false });
    }
  });

  // Function to ensure default configuration when protocol is enabled
  const ensureDefaultConfig = $(() => {
    if (!vpnServerState.BackToHomeServer) {
      updateBackToHomeServer$({
        enabled: true,
        Network: "Split",
        VSNetwork: "VPN",
      });
    }
  });

  return {
    // State
    backToHomeState,
    formState,
    // For backward compatibility with existing components
    get advancedFormState() {
      return { ...backToHomeState, ...formState };
    },
    get easyFormState() {
      return formState;
    },
    isEnabled,
    viewMode,

    // Core functions
    updateBackToHomeServer$,
    updateAdvancedForm$,
    updateEasyForm$,
    ensureDefaultConfig,

    // Individual field updates
    updateNetwork$,
    updateVSNetwork$,

    // Toggle
    handleToggle,
  };
};