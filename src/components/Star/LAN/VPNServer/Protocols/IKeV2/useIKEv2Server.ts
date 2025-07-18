import { $, useSignal, useStore } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import type { Ikev2ServerConfig, IpsecIdentityAuthMethod, IpsecIdentityEapMethod } from "../../../../StarContext/Utils/VPNServerType";

// Define ViewMode type
type ViewMode = "easy" | "advanced";

export const useIKEv2Server = () => {
  const starContext = useContext(StarContext);
  
  const vpnServerState = starContext.state.LAN.VPNServer || { Users: [] };
  
  const ikev2State = vpnServerState.Ikev2Server || {
    ipPools: { Name: "ike2-pool", Ranges: "192.168.77.2-192.168.77.254" },
    profile: { name: "ike2", hashAlgorithm: "sha1", encAlgorithm: "aes-128", dhGroup: "modp1024" },
    proposal: { name: "ike2", authAlgorithms: "sha1", encAlgorithms: "aes-256-cbc", pfsGroup: "none" },
    policyGroup: { name: "ike2-policies" },
    policyTemplates: { 
      group: "ike2-policies", 
      proposal: "ike2", 
      srcAddress: "0.0.0.0/0", 
      dstAddress: "192.168.77.0/24" 
    },
    peer: { name: "ike2", exchangeMode: "ike2", passive: true, profile: "ike2" },
    identities: { 
      authMethod: "pre-shared-key", 
      peer: "ike2", 
      generatePolicy: "port-strict", 
      policyTemplateGroup: "ike2-policies" 
    },
    modeConfigs: { 
      name: "ike2-conf", 
      addressPool: "ike2-pool", 
      addressPrefixLength: 32, 
      responder: true 
    }
  };

  // Error signals
  const certificateError = useSignal("");
  const presharedKeyError = useSignal("");
  const addressPoolError = useSignal("");
  
  // Unified form state for both easy and advanced modes
  const formState = useStore({
    addressPoolRanges: ikev2State.ipPools?.Ranges || "192.168.77.2-192.168.77.254",
    addressPoolName: ikev2State.ipPools?.Name || "ike2-pool",
    authMethod: ikev2State.identities?.authMethod || "digital-signature",
    presharedKey: ikev2State.identities?.secret || "",
    eapMethods: ikev2State.identities?.eapMethods || "eap-mschapv2",
    serverCertificate: ikev2State.identities?.certificate || "",
    peerName: ikev2State.peer?.name || "ike2",
    profileName: ikev2State.profile?.name || "ike2",
    proposalName: ikev2State.proposal?.name || "ike2",
    policyGroupName: ikev2State.policyGroup?.name || "ike2-policies",
    modeConfigName: ikev2State.modeConfigs?.name || "ike2-conf",
    staticDns: ikev2State.modeConfigs?.staticDns || ""
  });

  // UI state
  const showPassword = useSignal(false);
  const viewMode = useSignal<ViewMode>("advanced");

  // Auth method options
  const authMethods: {value: IpsecIdentityAuthMethod, label: string}[] = [
    { value: "digital-signature", label: "Digital Signature (Certificate)" },
    { value: "pre-shared-key", label: "Pre-shared Key" },
    { value: "eap", label: "EAP" }
  ];

  // EAP method options
  const eapMethods: {value: IpsecIdentityEapMethod, label: string}[] = [
    { value: "eap-mschapv2", label: "EAP-MSCHAPv2" },
    { value: "eap-tls", label: "EAP-TLS" },
    { value: "eap-peap", label: "EAP-PEAP" },
    { value: "eap-ttls", label: "EAP-TTLS" }
  ];

  // Core update function
  const updateIKEv2Server$ = $((config: Partial<Ikev2ServerConfig>) => {
    const newConfig = {
      ...ikev2State,
      ...config
    };
    
    let isValid = true;
    
    // Validate auth method and related fields
    if (newConfig.identities?.authMethod) {
      if (newConfig.identities.authMethod === "pre-shared-key") {
        if (!newConfig.identities.secret || !newConfig.identities.secret.trim()) {
          presharedKeyError.value = $localize`Pre-shared key is required for this authentication method`;
          isValid = false;
        } else if (newConfig.identities.secret.length < 8) {
          presharedKeyError.value = $localize`Pre-shared key should be at least 8 characters long`;
          isValid = false;
        } else {
          presharedKeyError.value = "";
        }
      } else {
        presharedKeyError.value = "";
        if ((newConfig.identities.authMethod === "digital-signature" || newConfig.identities.authMethod === "eap") && 
            (!newConfig.identities.certificate || !newConfig.identities.certificate.trim())) {
          certificateError.value = $localize`Certificate is required for this authentication method`;
          isValid = false;
        } else {
          certificateError.value = "";
        }
      }
    }
    
    // Validate address pool
    if (config.ipPools?.Ranges !== undefined) {
      if (config.ipPools.Ranges === "") {
        // Allow empty to disable server
        addressPoolError.value = "";
      } else if (!newConfig.ipPools?.Ranges || !newConfig.ipPools.Ranges.trim()) {
        addressPoolError.value = $localize`Address pool is required`;
        isValid = false;
      } else if (!newConfig.ipPools.Ranges.includes("-")) {
        addressPoolError.value = $localize`Address pool must include range (e.g., 192.168.77.2-192.168.77.254)`;
        isValid = false;
      } else {
        addressPoolError.value = "";
      }
    }
    
    if (isValid || (config.ipPools && config.ipPools.Ranges === "")) {
      starContext.updateLAN$({ 
        VPNServer: {
          ...vpnServerState,
          Ikev2Server: (config.ipPools && config.ipPools.Ranges === "") ? undefined : newConfig
        }
      });
    }
  });

  // Advanced mode form update function
  const updateAdvancedForm$ = $((updatedValues: Partial<typeof formState>) => {
    // Update local state first
    Object.assign(formState, updatedValues);
    
    // Then update server config with proper StarContext structure
    updateIKEv2Server$({
      ipPools: {
        Name: formState.addressPoolName,
        Ranges: formState.addressPoolRanges
      },
      identities: {
        authMethod: formState.authMethod,
        secret: formState.presharedKey,
        eapMethods: formState.eapMethods,
        certificate: formState.serverCertificate,
        peer: formState.peerName,
        generatePolicy: "port-strict",
        policyTemplateGroup: formState.policyGroupName
      },
      peer: {
        name: formState.peerName,
        exchangeMode: "ike2",
        passive: true,
        profile: formState.profileName
      },
      profile: {
        name: formState.profileName
      },
      proposal: {
        name: formState.proposalName
      },
      policyGroup: {
        name: formState.policyGroupName
      },
      modeConfigs: {
        name: formState.modeConfigName,
        addressPool: formState.addressPoolName,
        addressPrefixLength: 32,
        responder: true,
        staticDns: formState.staticDns
      }
    });
  });

  // Easy mode form update function
  const updateEasyForm$ = $((presharedKey: string) => {
    formState.presharedKey = presharedKey;
    
    // Update settings directly with proper StarContext structure
    updateIKEv2Server$({
      ipPools: {
        Name: "ike2-pool",
        Ranges: "192.168.77.2-192.168.77.254"
      },
      identities: {
        authMethod: "pre-shared-key",
        secret: presharedKey,
        peer: "ike2",
        generatePolicy: "port-strict",
        policyTemplateGroup: "ike2-policies"
      },
      peer: {
        name: "ike2",
        exchangeMode: "ike2",
        passive: true,
        profile: "ike2"
      },
      profile: {
        name: "ike2"
      },
      proposal: {
        name: "ike2"
      },
      policyGroup: {
        name: "ike2-policies"
      },
      modeConfigs: {
        name: "ike2-conf",
        addressPool: "ike2-pool",
        addressPrefixLength: 32,
        responder: true
      }
    });
  });

  // Individual field update functions for advanced mode
  const updateAddressPoolRanges$ = $((value: string) => updateAdvancedForm$({ addressPoolRanges: value }));
  const updateAddressPoolName$ = $((value: string) => updateAdvancedForm$({ addressPoolName: value }));
  const updateAuthMethod$ = $((value: IpsecIdentityAuthMethod) => updateAdvancedForm$({ authMethod: value }));
  const updatePresharedKey$ = $((value: string) => updateAdvancedForm$({ presharedKey: value }));
  const updateEapMethods$ = $((value: IpsecIdentityEapMethod) => updateAdvancedForm$({ eapMethods: value }));
  const updateServerCertificate$ = $((value: string) => updateAdvancedForm$({ serverCertificate: value }));
  const updatePeerName$ = $((value: string) => updateAdvancedForm$({ peerName: value }));
  const updateProfileName$ = $((value: string) => updateAdvancedForm$({ profileName: value }));
  const updateProposalName$ = $((value: string) => updateAdvancedForm$({ proposalName: value }));
  const updatePolicyGroupName$ = $((value: string) => updateAdvancedForm$({ policyGroupName: value }));
  const updateModeConfigName$ = $((value: string) => updateAdvancedForm$({ modeConfigName: value }));
  const updateStaticDns$ = $((value: string) => updateAdvancedForm$({ staticDns: value }));

  // Toggle password visibility
  const togglePasswordVisibility$ = $(() => {
    showPassword.value = !showPassword.value;
  });

  // Function to ensure default configuration when protocol is enabled
  const ensureDefaultConfig = $(() => {
    if (!vpnServerState.Ikev2Server) {
      updateIKEv2Server$({
        ipPools: { Name: "ike2-pool", Ranges: "192.168.77.2-192.168.77.254" },
        profile: { name: "ike2", hashAlgorithm: "sha1", encAlgorithm: "aes-128", dhGroup: "modp1024" },
        proposal: { name: "ike2", authAlgorithms: "sha1", encAlgorithms: "aes-256-cbc", pfsGroup: "none" },
        policyGroup: { name: "ike2-policies" },
        policyTemplates: { group: "ike2-policies", proposal: "ike2", srcAddress: "0.0.0.0/0", dstAddress: "192.168.77.0/24" },
        peer: { name: "ike2", exchangeMode: "ike2", passive: true, profile: "ike2" },
        identities: { authMethod: "digital-signature", peer: "ike2", generatePolicy: "port-strict", policyTemplateGroup: "ike2-policies" },
        modeConfigs: { name: "ike2-conf", addressPool: "ike2-pool", addressPrefixLength: 32, responder: true }
      });
    }
  });

  // // Set view mode (easy or advanced)
  // const setViewMode = $((mode: ViewMode) => {
  //   viewMode.value = mode;
  // });

  return {
    // State
    ikev2State,
    formState,
    // For backward compatibility with existing components
    get advancedFormState() { return formState; },
    get easyFormState() { return formState; },
    showPassword,
    viewMode,
    
    // Errors
    certificateError,
    presharedKeyError,
    addressPoolError,
    
    // Options
    authMethods,
    eapMethods,
    
    // Core functions
    updateIKEv2Server$,
    updateAdvancedForm$,
    updateEasyForm$,
    ensureDefaultConfig,
    
    // Individual field updates for advanced mode
    updateAddressPoolRanges$,
    updateAddressPoolName$,
    updateAuthMethod$,
    updatePresharedKey$,
    updateEapMethods$,
    updateServerCertificate$,
    updatePeerName$,
    updateProfileName$,
    updateProposalName$,
    updatePolicyGroupName$,
    updateModeConfigName$,
    updateStaticDns$,
    
    // UI functions
    togglePasswordVisibility$
  };
}; 