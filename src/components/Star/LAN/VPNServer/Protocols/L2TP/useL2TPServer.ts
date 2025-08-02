import { $, useSignal, useStore } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import type { L2tpServerConfig } from "../../../../StarContext/Utils/VPNServerType";
import type { AuthMethod } from "../../../../StarContext/CommonType";
import { StarContext } from "../../../../StarContext/StarContext";

// Define ViewMode type
type ViewMode = "easy" | "advanced";

export const useL2TPServer = () => {
  const starContext = useContext(StarContext);
  const vpnServerState = starContext.state.LAN.VPNServer || { Users: [] };

  const l2tpState = vpnServerState.L2tpServer || {
    enabled: true,
    DefaultProfile: "l2tp-profile",
    Authentication: ["mschap2"],
    PacketSize: {
      MaxMtu: 1450,
      MaxMru: 1450,
    },
    KeepaliveTimeout: 30,
    IPsec: {
      UseIpsec: "no",
      IpsecSecret: "",
    },
    allowFastPath: true,
    maxSessions: "unlimited",
    OneSessionPerHost: false,
    L2TPV3: {
      l2tpv3CircuitId: "",
      l2tpv3CookieLength: 0,
      l2tpv3DigestHash: "md5",
      l2tpv3EtherInterfaceList: "",
    },
    acceptProtoVersion: "all",
    callerIdType: "ip-address",
  };

  // Error signals
  const secretError = useSignal("");

  // Unified form state for both easy and advanced modes
  const formState = useStore({
    profile: l2tpState.DefaultProfile || "default",
    authentication: [...(l2tpState.Authentication || ["mschap2", "mschap1"])],
    maxMru: l2tpState.PacketSize?.MaxMru || 1450,
    maxMtu: l2tpState.PacketSize?.MaxMtu || 1450,
    useIpsec: l2tpState.IPsec.UseIpsec || "yes",
    ipsecSecret: l2tpState.IPsec.IpsecSecret || "",
    keepaliveTimeout: l2tpState.KeepaliveTimeout || 30,
    allowFastPath:
      l2tpState.allowFastPath !== undefined ? l2tpState.allowFastPath : true,
    maxSessions: l2tpState.maxSessions || "unlimited",
    oneSessionPerHost:
      l2tpState.OneSessionPerHost !== undefined
        ? l2tpState.OneSessionPerHost
        : false,
  });

  // UI state
  const isEnabled = useStore({ value: !!l2tpState.DefaultProfile });
  const viewMode = useSignal<ViewMode>("advanced");

  // Authentication method options
  const authMethods: AuthMethod[] = ["pap", "chap", "mschap1", "mschap2"];

  const authOptions = authMethods.map((method) => ({
    value: method,
    label: method.toUpperCase(),
  }));

  // Core update function
  const updateL2TPServer$ = $((config: Partial<L2tpServerConfig>) => {
    const newConfig = {
      ...l2tpState,
      ...config,
    };

    // Validate IPsec secret if required
    if (config.IPsec?.IpsecSecret !== undefined) {
      const useIpsec = config.IPsec.UseIpsec || newConfig.IPsec.UseIpsec;
      if (
        (useIpsec === "yes" || useIpsec === "required") &&
        (!config.IPsec.IpsecSecret || !config.IPsec.IpsecSecret.trim())
      ) {
        secretError.value = $localize`IPsec secret is required when IPsec is enabled`;
        return;
      } else {
        secretError.value = "";
      }
    }

    starContext.updateLAN$({
      VPNServer: {
        ...vpnServerState,
        L2tpServer: config.DefaultProfile === "" ? undefined : newConfig,
      },
    });
  });

  // Advanced mode form update function
  const updateAdvancedForm$ = $((updatedValues: Partial<typeof formState>) => {
    // Update local state first
    Object.assign(formState, updatedValues);

    // Then update server config
    updateL2TPServer$({
      DefaultProfile: formState.profile,
      Authentication: [...formState.authentication],
      PacketSize: {
        MaxMtu: formState.maxMtu,
        MaxMru: formState.maxMru,
      },
      IPsec: {
        UseIpsec: formState.useIpsec,
        IpsecSecret: formState.ipsecSecret,
      },
      KeepaliveTimeout: formState.keepaliveTimeout,
      allowFastPath: formState.allowFastPath,
      maxSessions: formState.maxSessions,
      OneSessionPerHost: formState.oneSessionPerHost,
      enabled: true,
    });
  });

  // Easy mode form update function
  const applyIpsecSettings = $((updatedValues: Partial<typeof formState>) => {
    // Update local state
    Object.assign(formState, updatedValues);

    if (isEnabled.value) {
      updateL2TPServer$({
        DefaultProfile: "default",
        IPsec: {
          UseIpsec: formState.useIpsec,
          IpsecSecret: formState.ipsecSecret,
        },
        // Use default authentication methods
        Authentication: ["mschap2", "mschap1"],
        enabled: true,
      });
    }
  });

  // Individual field update functions for advanced mode
  const updateProfile$ = $((value: string) =>
    updateAdvancedForm$({ profile: value }),
  );
  const updateMaxMtu$ = $((value: number) =>
    updateAdvancedForm$({ maxMtu: value }),
  );
  const updateMaxMru$ = $((value: number) =>
    updateAdvancedForm$({ maxMru: value }),
  );
  const updateUseIpsec$ = $((value: "yes" | "no" | "required") =>
    updateAdvancedForm$({ useIpsec: value }),
  );
  const updateIpsecSecret$ = $((value: string) =>
    updateAdvancedForm$({ ipsecSecret: value }),
  );
  const updateKeepaliveTimeout$ = $((value: number) =>
    updateAdvancedForm$({ keepaliveTimeout: value }),
  );
  const updateAllowFastPath$ = $((value: boolean) =>
    updateAdvancedForm$({ allowFastPath: value }),
  );
  const updateOneSessionPerHost$ = $((value: boolean) =>
    updateAdvancedForm$({ oneSessionPerHost: value }),
  );

  // Auth method toggle function
  const toggleAuthMethod = $((method: string) => {
    try {
      const authMethod = method as AuthMethod;
      const index = formState.authentication.indexOf(authMethod);
      if (index === -1) {
        formState.authentication = [...formState.authentication, authMethod];
      } else {
        formState.authentication = formState.authentication.filter(
          (m: AuthMethod) => m !== authMethod,
        );
      }
      // Apply changes immediately
      updateAdvancedForm$({});
    } catch (error) {
      console.error("Error toggling auth method:", error);
    }
  });

  // Main toggle function for enable/disable
  const handleToggle = $((enabled: boolean) => {
    try {
      isEnabled.value = enabled;
      if (isEnabled.value && !formState.profile) {
        formState.profile = "default";
      }
      updateAdvancedForm$({});
    } catch (error) {
      console.error("Error toggling L2TP server:", error);
      isEnabled.value = !enabled; // Revert the change if there's an error
    }
  });

  // // Set view mode (easy or advanced)
  // const setViewMode = $((mode: ViewMode) => {
  //   viewMode.value = mode;
  // });

  // Easy mode IPsec update functions
  const updateEasyUseIpsec$ = $((value: "yes" | "no" | "required") => {
    applyIpsecSettings({ useIpsec: value });
  });

  const updateEasyIpsecSecret$ = $((value: string) => {
    applyIpsecSettings({ ipsecSecret: value });
  });

  // Function to ensure default configuration when protocol is enabled
  const ensureDefaultConfig = $(() => {
    if (!vpnServerState.L2tpServer) {
      updateL2TPServer$({
        enabled: true,
        DefaultProfile: "l2tp-profile",
        Authentication: ["mschap2"],
        PacketSize: { MaxMtu: 1450, MaxMru: 1450 },
        KeepaliveTimeout: 30,
        IPsec: { UseIpsec: "no", IpsecSecret: "" },
        allowFastPath: true,
        maxSessions: "unlimited",
        OneSessionPerHost: false,
        L2TPV3: {
          l2tpv3CircuitId: "",
          l2tpv3CookieLength: 0,
          l2tpv3DigestHash: "md5",
          l2tpv3EtherInterfaceList: "",
        },
        acceptProtoVersion: "all",
        callerIdType: "ip-address",
      });
    }
  });

  return {
    // State
    l2tpState,
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
    secretError,

    // Options
    authOptions,

    // Core functions
    updateL2TPServer$,
    updateAdvancedForm$,
    applyIpsecSettings,
    ensureDefaultConfig,

    // Individual field updates for advanced mode
    updateProfile$,
    updateMaxMtu$,
    updateMaxMru$,
    updateUseIpsec$,
    updateIpsecSecret$,
    updateKeepaliveTimeout$,
    updateAllowFastPath$,
    updateOneSessionPerHost$,
    toggleAuthMethod,

    // Main toggle
    handleToggle,

    // Easy mode functions
    updateEasyUseIpsec$,
    updateEasyIpsecSecret$,
  };
};
