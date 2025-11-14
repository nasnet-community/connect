import { useContext, $, useStore, useSignal } from "@builder.io/qwik";
import { StarContext } from "~/components/Star/StarContext";
import type { HTTPProxyServerConfig, VSNetwork } from "~/components/Star/StarContext";

// Define ViewMode type
type ViewMode = "easy" | "advanced";

export const useHTTPProxyServer = () => {
  const starContext = useContext(StarContext);
  const vpnServerState = starContext.state.LAN.VPNServer || { Users: [], CertificatePassphrase: "" };

  const httpProxyState = vpnServerState.HTTPProxyServer || {
    enabled: true,
    Port: 8080,
    Network: "Split",
    AllowedIPAddresses: [],
  };

  // Unified form state for both easy and advanced modes
  const formState = useStore({
    port: httpProxyState.Port || 8080,
    network: httpProxyState.Network || "Split",
    allowedIPAddresses: httpProxyState.AllowedIPAddresses || [],
    vsNetwork: httpProxyState.VSNetwork || "VPN",
  });

  // UI state
  const isEnabled = useSignal(!!httpProxyState.enabled);
  const viewMode = useSignal<ViewMode>("advanced");

  // Core update function
  const updateHTTPProxyServer$ = $((config: Partial<HTTPProxyServerConfig>) => {
    const newConfig = {
      ...httpProxyState,
      ...config,
    };

    starContext.updateLAN$({
      VPNServer: {
        ...vpnServerState,
        HTTPProxyServer: config.enabled === false ? undefined : newConfig,
      },
    });
  });

  // Advanced mode form update function
  const updateAdvancedForm$ = $((updatedValues: Partial<typeof formState>) => {
    // Update local state first
    Object.assign(formState, updatedValues);

    // Then update server config
    updateHTTPProxyServer$({
      enabled: isEnabled.value,
      Port: formState.port,
      Network: formState.network as VSNetwork,
      AllowedIPAddresses: formState.allowedIPAddresses,
      VSNetwork: formState.vsNetwork as VSNetwork,
    });
  });

  // Easy mode form update function
  const updateEasyForm$ = $((network?: VSNetwork) => {
    const vsNetwork = network || formState.vsNetwork;
    formState.vsNetwork = vsNetwork;

    // Update server config with default values for easy mode
    updateHTTPProxyServer$({
      enabled: true,
      Port: 8080,
      Network: vsNetwork,
      AllowedIPAddresses: [],
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
  const updateAllowedIPAddresses$ = $((value: string[]) =>
    updateAdvancedForm$({ allowedIPAddresses: value }),
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
      updateHTTPProxyServer$({ enabled: false });
    }
  });

  // Function to ensure default configuration when protocol is enabled
  const ensureDefaultConfig = $(() => {
    if (!vpnServerState.HTTPProxyServer) {
      updateHTTPProxyServer$({
        enabled: true,
        Port: 8080,
        Network: "Split",
        AllowedIPAddresses: [],
        VSNetwork: "VPN",
      });
    }
  });

  return {
    // State
    httpProxyState,
    formState,
    // For backward compatibility with existing components
    get advancedFormState() {
      return { ...httpProxyState, ...formState };
    },
    get easyFormState() {
      return formState;
    },
    isEnabled,
    viewMode,

    // Core functions
    updateHTTPProxyServer$,
    updateAdvancedForm$,
    updateEasyForm$,
    ensureDefaultConfig,

    // Individual field updates
    updatePort$,
    updateNetwork$,
    updateAllowedIPAddresses$,
    updateVSNetwork$,

    // Toggle
    handleToggle,
  };
};