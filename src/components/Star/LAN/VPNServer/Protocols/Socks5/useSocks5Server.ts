import { useContext, $, useStore, useSignal } from "@builder.io/qwik";
import { StarContext } from "~/components/Star/StarContext";
import type { Socks5ServerConfig, VSNetwork } from "~/components/Star/StarContext";

// Define ViewMode type
type ViewMode = "easy" | "advanced";

export const useSocks5Server = () => {
  const starContext = useContext(StarContext);
  const vpnServerState = starContext.state.LAN.VPNServer || { Users: [], CertificatePassphrase: "" };

  const socks5State = vpnServerState.Socks5Server || {
    enabled: true,
    Port: 1080,
    Network: "Split",
  };

  // Unified form state for both easy and advanced modes
  const formState = useStore({
    port: socks5State.Port || 1080,
    network: socks5State.Network || "Split",
    vsNetwork: socks5State.VSNetwork || "VPN",
  });

  // UI state
  const isEnabled = useSignal(!!socks5State.enabled);
  const viewMode = useSignal<ViewMode>("advanced");

  // Core update function
  const updateSocks5Server$ = $((config: Partial<Socks5ServerConfig>) => {
    const newConfig = {
      ...socks5State,
      ...config,
    };

    starContext.updateLAN$({
      VPNServer: {
        ...vpnServerState,
        Socks5Server: config.enabled === false ? undefined : newConfig,
      },
    });
  });

  // Advanced mode form update function
  const updateAdvancedForm$ = $((updatedValues: Partial<typeof formState>) => {
    // Update local state first
    Object.assign(formState, updatedValues);

    // Then update server config
    updateSocks5Server$({
      enabled: isEnabled.value,
      Port: formState.port,
      Network: formState.network as VSNetwork,
      VSNetwork: formState.vsNetwork as VSNetwork,
    });
  });

  // Easy mode form update function
  const updateEasyForm$ = $((network?: VSNetwork) => {
    const vsNetwork = network || formState.vsNetwork;
    formState.vsNetwork = vsNetwork;

    // Update server config with default values for easy mode
    updateSocks5Server$({
      enabled: true,
      Port: 1080,
      Network: vsNetwork,
      VSNetwork: vsNetwork,
    });
  });

  // Individual field updates
  const updatePort$ = $((value: number) =>
    updateAdvancedForm$({ port: value }),
  );
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
      updateSocks5Server$({ enabled: false });
    }
  });

  // Function to ensure default configuration when protocol is enabled
  const ensureDefaultConfig = $(() => {
    if (!vpnServerState.Socks5Server) {
      updateSocks5Server$({
        enabled: true,
        Port: 1080,
        Network: "Split",
        VSNetwork: "VPN",
      });
    }
  });

  return {
    // State
    socks5State,
    formState,
    // For backward compatibility with existing components
    get advancedFormState() {
      return { ...socks5State, ...formState };
    },
    get easyFormState() {
      return formState;
    },
    isEnabled,
    viewMode,

    // Core functions
    updateSocks5Server$,
    updateAdvancedForm$,
    updateEasyForm$,
    ensureDefaultConfig,

    // Individual field updates
    updatePort$,
    updateNetwork$,
    updateVSNetwork$,

    // Toggle
    handleToggle,
  };
};