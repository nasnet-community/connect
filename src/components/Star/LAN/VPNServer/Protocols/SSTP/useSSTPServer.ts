import { $, useSignal, useStore, useId } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import type { SstpServerConfig } from "../../../../StarContext/Utils/VPNServerType";
import type { AuthMethod, TLSVersion } from "../../../../StarContext/CommonType";
import { StarContext } from "../../../../StarContext/StarContext";

// Define ViewMode type
type ViewMode = "easy" | "advanced";

export const useSSTPServer = () => {
  const starContext = useContext(StarContext);
  const vpnServerState = starContext.state.LAN.VPNServer || { Users: [] };
  
  const sstpState = vpnServerState.SstpServer || {
    enabled: true,
    DefaultProfile: "sstp-profile",
    Authentication: ["mschap2"],
    PacketSize: {
      MaxMtu: 1450,
      MaxMru: 1450
    },
    KeepaliveTimeout: 30,
    Certificate: "",
    Port: 4443,
    ForceAes: false,
    Pfs: false,
    Ciphers: "aes256-gcm-sha384",
    VerifyClientCertificate: false,
    TlsVersion: "only-1.2"
  };

  // Error signals
  const certificateError = useSignal("");
  const defaultProfileError = useSignal("");

  // Unified form state for both easy and advanced modes
  const formState = useStore({
    certificate: sstpState.Certificate || "",
    defaultProfile: sstpState.DefaultProfile || "sstp-profile",
    port: sstpState.Port || 4443,
    forceAes: sstpState.ForceAes !== undefined ? sstpState.ForceAes : false,
    pfs: sstpState.Pfs !== undefined ? sstpState.Pfs : false,
    ciphers: sstpState.Ciphers || "aes256-gcm-sha384",
    verifyClientCertificate: sstpState.VerifyClientCertificate !== undefined ? sstpState.VerifyClientCertificate : false,
    tlsVersion: sstpState.TlsVersion || "only-1.2",
    maxMtu: sstpState.PacketSize?.MaxMtu || 1450,
    maxMru: sstpState.PacketSize?.MaxMru || 1450,
    keepaliveTimeout: sstpState.KeepaliveTimeout || 30,
    authentication: sstpState.Authentication || ["mschap2"]
  });

  // UI state
  const isEnabled = useStore({ value: !!sstpState.Certificate });
  const viewMode = useSignal<ViewMode>("advanced");
  
  // Generate unique IDs for form controls
  const enableSwitchId = useId();
  const forceAesSwitchId = useId();
  const pfsSwitchId = useId();
  const verifyCertSwitchId = useId();

  // Authentication method options
  const authMethodOptions = [
    { value: "pap", label: $localize`PAP` },
    { value: "chap", label: $localize`CHAP` },
    { value: "mschap1", label: $localize`MS-CHAPv1` },
    { value: "mschap2", label: $localize`MS-CHAPv2` },
  ];

  // TLS version options
  const tlsVersionOptions = [
    { value: "any", label: $localize`Any` },
    { value: "only-1.2", label: $localize`Only 1.2` },
    { value: "only-1.3", label: $localize`Only 1.3` },
  ];

  // Cipher options
  const cipherOptions = [
    { value: "aes256-gcm-sha384", label: $localize`AES256-GCM-SHA384` },
    { value: "aes256-sha", label: $localize`AES256-SHA` },
  ];

  // Core update function
  const updateSSTPServer$ = $((config: Partial<SstpServerConfig>) => {
    const newConfig = {
      ...sstpState,
      ...config
    };
    
    let isValid = true;
    
    // Validate certificate
    if (config.Certificate !== undefined) {
      if (!newConfig.Certificate || !newConfig.Certificate.trim()) {
        certificateError.value = $localize`Certificate is required`;
        isValid = false;
      } else {
        certificateError.value = "";
      }
    }
    
    // Validate default profile
    if (config.DefaultProfile !== undefined) {
      if (!newConfig.DefaultProfile || !newConfig.DefaultProfile.trim()) {
        defaultProfileError.value = $localize`Default profile is required`;
        isValid = false;
      } else {
        defaultProfileError.value = "";
      }
    }
    
    if (isValid || (config.Certificate && config.Certificate === "")) {
      starContext.updateLAN$({ 
        VPNServer: {
          ...vpnServerState,
          SstpServer: (config.Certificate && config.Certificate === "") ? undefined : newConfig
        }
      });
    }
  });

  // Auto-apply changes function (from component logic)
  const applyChanges = $((updatedValues: Partial<typeof formState>) => {
    try {
      // Update local state
      Object.assign(formState, updatedValues);

      // Update server configuration
      updateSSTPServer$({
        enabled: isEnabled.value,
        Certificate: formState.certificate,
        Port: formState.port,
        ForceAes: formState.forceAes,
        Pfs: formState.pfs,
        TlsVersion: formState.tlsVersion as TLSVersion,
        Ciphers: formState.ciphers as "aes256-gcm-sha384" | "aes256-sha",
        VerifyClientCertificate: formState.verifyClientCertificate,
        DefaultProfile: formState.defaultProfile,
        Authentication: formState.authentication as AuthMethod[],
        PacketSize: {
          MaxMtu: formState.maxMtu,
          MaxMru: formState.maxMru,
        },
        KeepaliveTimeout: formState.keepaliveTimeout,
      });
    } catch (error) {
      console.error("Failed to update SSTP server configuration:", error);
    }
  });

  // Advanced mode form update function
  const updateAdvancedForm$ = $((updatedValues: Partial<typeof formState>) => {
    // Update local state first
    Object.assign(formState, updatedValues);
    
    // Then update server config
    updateSSTPServer$({
      enabled: true,
      Certificate: formState.certificate,
      DefaultProfile: formState.defaultProfile,
      Port: formState.port,
      ForceAes: formState.forceAes,
      Pfs: formState.pfs,
      Ciphers: formState.ciphers as "aes256-gcm-sha384" | "aes256-sha",
      VerifyClientCertificate: formState.verifyClientCertificate,
      TlsVersion: formState.tlsVersion as TLSVersion,
      Authentication: formState.authentication as AuthMethod[],
      PacketSize: {
        MaxMtu: formState.maxMtu,
        MaxMru: formState.maxMru,
      },
      KeepaliveTimeout: formState.keepaliveTimeout
    });
  });

  // Easy mode form update function
  const updateEasyForm$ = $((updatedValues: Partial<typeof formState>) => {
    // Update local state first
    Object.assign(formState, updatedValues);
    
    // Then update server config with default values
    updateSSTPServer$({
      enabled: true,
      Certificate: formState.certificate,
      DefaultProfile: "sstp-profile",
      Port: 4443,
      ForceAes: false,
      Pfs: false,
      Ciphers: "aes256-gcm-sha384",
      VerifyClientCertificate: false,
      TlsVersion: "only-1.2",
      Authentication: ["mschap2"],
      PacketSize: {
        MaxMtu: 1450,
        MaxMru: 1450,
      },
      KeepaliveTimeout: 30
    });
  });

  // Individual field update functions for advanced mode
  const updateCertificate$ = $((value: string) => applyChanges({ certificate: value }));
  const updateDefaultProfile$ = $((value: string) => applyChanges({ defaultProfile: value }));
  const updatePort$ = $((value: number) => applyChanges({ port: value }));
  const updateForceAes$ = $((value: boolean) => applyChanges({ forceAes: value }));
  const updatePfs$ = $((value: boolean) => applyChanges({ pfs: value }));
  const updateCiphers$ = $((value: string) => applyChanges({ ciphers: value as any }));
  const updateVerifyClientCertificate$ = $((value: boolean) => applyChanges({ verifyClientCertificate: value }));
  const updateTlsVersion$ = $((value: string) => applyChanges({ tlsVersion: value as any }));
  const updateMaxMtu$ = $((value: number) => applyChanges({ maxMtu: value }));
  const updateMaxMru$ = $((value: number) => applyChanges({ maxMru: value }));
  const updateKeepaliveTimeout$ = $((value: number) => applyChanges({ keepaliveTimeout: value }));

  // Authentication methods handling
  const isAuthMethodSelected = $((method: string) => {
    return formState.authentication.includes(method as AuthMethod);
  });

  const toggleAuthMethod = $((method: string) => {
    const authMethod = method as AuthMethod;
    const currentAuth = [...formState.authentication];
    const index = currentAuth.indexOf(authMethod);
    
    if (index === -1) {
      currentAuth.push(authMethod);
    } else {
      currentAuth.splice(index, 1);
    }
    
    applyChanges({ authentication: currentAuth });
  });

  // Toggle functions
  const handleToggle = $((enabled: boolean) => {
    try {
      isEnabled.value = enabled;
      applyChanges({});
    } catch (error) {
      console.error("Error toggling SSTP server:", error);
      isEnabled.value = !enabled; // Revert the change if there's an error
    }
  });

  // Easy mode functions
  const updateEasyCertificate$ = $((value: string) => {
    formState.certificate = value;
    updateEasyForm$({ certificate: value });
  });

  // Set view mode (easy or advanced)
  const setViewMode = $((mode: ViewMode) => {
    viewMode.value = mode;
  });

  // Function to ensure default configuration when protocol is enabled
  const ensureDefaultConfig = $(() => {
    if (!vpnServerState.SstpServer) {
      updateSSTPServer$({
        enabled: true,
        Certificate: "default",
        DefaultProfile: "sstp-profile",
        Authentication: ["mschap2"],
        PacketSize: { MaxMtu: 1450, MaxMru: 1450 },
        KeepaliveTimeout: 30,
        Port: 4443,
        ForceAes: false,
        Pfs: false,
        Ciphers: "aes256-sha",
        VerifyClientCertificate: false,
        TlsVersion: "only-1.2"
      });
    }
  });

  return {
    // State
    sstpState,
    formState,
    // For backward compatibility with existing components
    get advancedFormState() { return formState; },
    get easyFormState() { return formState; },
    isEnabled,
    viewMode,
    setViewMode,
    
    // UI IDs
    enableSwitchId,
    forceAesSwitchId,
    pfsSwitchId,
    verifyCertSwitchId,
    
    // Errors
    certificateError,
    defaultProfileError,
    
    // Options
    authMethodOptions,
    tlsVersionOptions,
    cipherOptions,
    
    // Core functions
    updateSSTPServer$,
    updateAdvancedForm$,
    updateEasyForm$,
    applyChanges,
    ensureDefaultConfig,
    
    // Individual field updates for advanced mode
    updateCertificate$,
    updateDefaultProfile$,
    updatePort$,
    updateForceAes$,
    updatePfs$,
    updateCiphers$,
    updateVerifyClientCertificate$,
    updateTlsVersion$,
    updateMaxMtu$,
    updateMaxMru$,
    updateKeepaliveTimeout$,
    
    // Authentication methods
    isAuthMethodSelected,
    toggleAuthMethod,
    
    // Toggles
    handleToggle,
    
    // Easy mode functions
    updateEasyCertificate$
  };
}; 