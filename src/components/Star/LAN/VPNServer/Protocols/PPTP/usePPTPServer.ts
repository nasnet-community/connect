import { $, useSignal, useStore } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import type { PptpServerConfig } from "../../../../StarContext/Utils/VPNServerType";
import type { AuthMethod } from "../../../../StarContext/CommonType";
import { StarContext } from "../../../../StarContext/StarContext";

// Define ViewMode type
type ViewMode = "easy" | "advanced";

export const usePPTPServer = () => {
  const starContext = useContext(StarContext);
  const vpnServerState = starContext.state.LAN.VPNServer || { Users: [] };

  const pptpState = vpnServerState.PptpServer || {
    enabled: true,
    DefaultProfile: "pptp-profile",
    Authentication: ["mschap2"],
    PacketSize: {
      MaxMtu: 1450,
      MaxMru: 1450,
    },
    KeepaliveTimeout: 30,
  };

  // Error signals
  const defaultProfileError = useSignal("");

  // Unified form state for both easy and advanced modes
  const formState = useStore({
    defaultProfile: pptpState.DefaultProfile || "pptp-profile",
    maxMtu: pptpState.PacketSize?.MaxMtu || 1450,
    maxMru: pptpState.PacketSize?.MaxMru || 1450,
    keepaliveTimeout: pptpState.KeepaliveTimeout || 30,
    authentication: pptpState.Authentication || ["mschap2"],
    network: pptpState.Network || "PPTP",
  });

  // UI state
  const isEnabled = useSignal(!!pptpState.DefaultProfile);
  const viewMode = useSignal<ViewMode>("advanced");

  // Authentication options
  const authOptions = [
    { value: "mschap1", label: "MS-CHAPv1" },
    { value: "mschap2", label: "MS-CHAPv2" },
    { value: "pap", label: "PAP" },
    { value: "chap", label: "CHAP" },
  ];

  // Core update function
  const updatePPTPServer$ = $((config: Partial<PptpServerConfig>) => {
    const newConfig = {
      ...pptpState,
      ...config,
    };

    let isValid = true;

    // Validate default profile
    if (config.DefaultProfile !== undefined) {
      if (!newConfig.DefaultProfile || !newConfig.DefaultProfile.trim()) {
        defaultProfileError.value = $localize`Default profile is required`;
        isValid = false;
      } else {
        defaultProfileError.value = "";
      }
    }

    if (isValid || (config.DefaultProfile && config.DefaultProfile === "")) {
      starContext.updateLAN$({
        VPNServer: {
          ...vpnServerState,
          PptpServer:
            config.DefaultProfile && config.DefaultProfile === ""
              ? undefined
              : newConfig,
        },
      });
    }
  });

  // Advanced mode form update function
  const updateAdvancedForm$ = $((updatedValues: Partial<typeof formState>) => {
    // Update local state first
    Object.assign(formState, updatedValues);

    // Then update server config
    updatePPTPServer$({
      enabled: true,
      DefaultProfile: formState.defaultProfile,
      Authentication: formState.authentication as AuthMethod[],
      Network: formState.network as any,
      PacketSize: {
        MaxMtu: formState.maxMtu,
        MaxMru: formState.maxMru,
      },
      KeepaliveTimeout: formState.keepaliveTimeout,
    });
  });

  // Easy mode form update function
  const updateEasyForm$ = $((updatedValues: Partial<typeof formState>) => {
    // Update local state first
    Object.assign(formState, updatedValues);

    // Then update server config with default values
    updatePPTPServer$({
      enabled: true,
      DefaultProfile: formState.defaultProfile,
      Authentication: ["mschap2"],
      Network: formState.network as any,
      PacketSize: {
        MaxMtu: 1450,
        MaxMru: 1450,
      },
      KeepaliveTimeout: 30,
    });
  });

  // Individual field update functions for advanced mode
  const updateDefaultProfile$ = $((value: string) =>
    updateAdvancedForm$({ defaultProfile: value }),
  );
  const updateMaxMtu$ = $((value: number) =>
    updateAdvancedForm$({ maxMtu: value }),
  );
  const updateMaxMru$ = $((value: number) =>
    updateAdvancedForm$({ maxMru: value }),
  );
  const updateKeepaliveTimeout$ = $((value: number) =>
    updateAdvancedForm$({ keepaliveTimeout: value }),
  );
  const updateNetwork$ = $((value: string) =>
    updateAdvancedForm$({ network: value }),
  );

  // Authentication methods handling
  const isAuthMethodSelected = $((method: string) => {
    return formState.authentication.includes(method as AuthMethod);
  });

  const toggleAuthMethod = $((method: string, isSelected: boolean) => {
    let newAuthentication = [...formState.authentication];

    if (isSelected) {
      if (!newAuthentication.includes(method as AuthMethod)) {
        newAuthentication.push(method as AuthMethod);
      }
    } else {
      newAuthentication = newAuthentication.filter((auth) => auth !== method);
    }

    // Ensure at least one method is selected
    if (newAuthentication.length === 0) {
      newAuthentication = ["mschap2"];
    }

    updateAdvancedForm$({ authentication: newAuthentication });
  });

  // Toggle functions
  const handleToggle = $((enabled: boolean) => {
    try {
      isEnabled.value = enabled;
      if (isEnabled.value && !formState.defaultProfile) {
        formState.defaultProfile = "pptp-profile";
      }

      if (enabled) {
        updateAdvancedForm$({});
      } else {
        updatePPTPServer$({ DefaultProfile: "" });
      }
    } catch (error) {
      console.error("Error toggling PPTP server:", error);
      isEnabled.value = !enabled; // Revert the change if there's an error
    }
  });

  // // Set view mode (easy or advanced)
  // const setViewMode = $((mode: ViewMode) => {
  //   viewMode.value = mode;
  // });

  // Function to ensure default configuration when protocol is enabled
  const ensureDefaultConfig = $(() => {
    if (!vpnServerState.PptpServer) {
      updatePPTPServer$({
        enabled: true,
        DefaultProfile: "pptp-profile",
        Authentication: ["mschap2"],
        PacketSize: {
          MaxMtu: 1450,
          MaxMru: 1450,
        },
        KeepaliveTimeout: 30,
      });
    }
  });

  // Easy mode functions
  const updateEasyDefaultProfile$ = $((value: string) => {
    formState.defaultProfile = value;
    updateEasyForm$({ defaultProfile: value });
  });

  return {
    // State
    pptpState,
    formState,
    // For backward compatibility with existing components
    get advancedFormState() {
      return formState;
    },
    get easyFormState() {
      return formState;
    },
    isEnabled,
    viewMode,

    // Errors
    defaultProfileError,

    // Options
    authOptions,

    // Core functions
    updatePPTPServer$,
    updateAdvancedForm$,
    updateEasyForm$,
    ensureDefaultConfig,

    // Individual field updates for advanced mode
    updateDefaultProfile$,
    updateMaxMtu$,
    updateMaxMru$,
    updateKeepaliveTimeout$,
    updateNetwork$,

    // Authentication methods
    isAuthMethodSelected,
    toggleAuthMethod,

    // Toggles
    handleToggle,

    // Easy mode functions
    updateEasyDefaultProfile$,
  };
};
