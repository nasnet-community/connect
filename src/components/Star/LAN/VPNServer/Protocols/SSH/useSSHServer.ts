import { useContext, $, useStore, useSignal } from "@builder.io/qwik";
import { StarContext } from "~/components/Star/StarContext";
import type { SSHServerConfig, VSNetwork } from "~/components/Star/StarContext";

// Define ViewMode type
type ViewMode = "easy" | "advanced";

export const useSSHServer = () => {
  const starContext = useContext(StarContext);
  const vpnServerState = starContext.state.LAN.VPNServer || { Users: [], CertificatePassphrase: "" };

  const sshState = vpnServerState.SSHServer || {
    enabled: true,
    Network: "Split",
  };

  // Unified form state for both easy and advanced modes
  const formState = useStore({
    network: sshState.Network || "Split",
    vsNetwork: sshState.VSNetwork || "VPN",
  });

  // UI state
  const isEnabled = useSignal(!!sshState.enabled);
  const viewMode = useSignal<ViewMode>("advanced");

  // Core update function
  const updateSSHServer$ = $((config: Partial<SSHServerConfig>) => {
    const newConfig = {
      ...sshState,
      ...config,
    };

    starContext.updateLAN$({
      VPNServer: {
        ...vpnServerState,
        SSHServer: config.enabled === false && !config.Network ? undefined : newConfig,
      },
    });
  });

  // Advanced mode form update function
  const updateAdvancedForm$ = $((updatedValues: Partial<typeof formState>) => {
    // Update local state first
    Object.assign(formState, updatedValues);

    // Then update server config
    updateSSHServer$({
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
    updateSSHServer$({
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
      updateSSHServer$({ enabled: false });
    }
  });

  // Function to ensure default configuration when protocol is enabled
  const ensureDefaultConfig = $(() => {
    if (!vpnServerState.SSHServer) {
      updateSSHServer$({
        enabled: true,
        Network: "Split",
        VSNetwork: "VPN",
      });
    }
  });

  return {
    // State
    sshState,
    formState,
    // For backward compatibility with existing components
    get advancedFormState() {
      return { ...sshState, ...formState };
    },
    get easyFormState() {
      return formState;
    },
    isEnabled,
    viewMode,

    // Core functions
    updateSSHServer$,
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
