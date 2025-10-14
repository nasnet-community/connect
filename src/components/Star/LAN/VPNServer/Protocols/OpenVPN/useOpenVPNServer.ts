import { $, useSignal } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import type {
  OpenVpnServerConfig,
  OvpnAuthMethod,
  OvpnCipher,
  VSNetwork,
} from "../../../../StarContext/Utils/VPNServerType";
import type {
  LayerMode,
  AuthMethod,
  NetworkProtocol,
} from "../../../../StarContext/CommonType";
import { StarContext } from "../../../../StarContext/StarContext";
import { validatePort, getAllVPNServerPorts } from "../../utils/portValidation";

// Define ViewMode type
type ViewMode = "easy" | "advanced";

// Protocol type including "both"
type ProtocolType = NetworkProtocol | "both";

// Draft configuration for a single OpenVPN server
interface OpenVPNDraftConfig {
  name: string;
  certificate: string;
  enabled: boolean;
  port: number;
  tcpPort: number;
  udpPort: number;
  protocol: ProtocolType;
  mode: LayerMode;
  vsNetwork: VSNetwork;
  addressPool: string;
  requireClientCertificate: boolean;
  auth: OvpnAuthMethod;
  cipher: OvpnCipher;
  certificateKeyPassphrase: string;
  defaultProfile: string;
  tlsVersion: "any" | "only-1.2";
  maxMtu: number;
  maxMru: number;
  keepaliveTimeout: number;
  authentication: AuthMethod[];
}

export const useOpenVPNServer = () => {
  const starContext = useContext(StarContext);

  const vpnServerState = starContext.state.LAN.VPNServer || { Users: [] };

  // Get all existing OpenVPN servers from StarContext
  const openVpnServers = vpnServerState.OpenVpnServer || [];

  // Active tab index for managing which server is being edited
  const activeTabIndex = useSignal(0);

  // Error signals
  const certificateError = useSignal("");
  const passphraseError = useSignal("");
  const portError = useSignal("");

  // UI state
  const showPassphrase = useSignal(false);
  const isEnabled = useSignal(openVpnServers.length > 0);
  const activeTab = useSignal<"basic" | "network" | "security">("basic");
  const viewMode = useSignal<ViewMode>("advanced");

  // Draft configurations for each tab (not saved to StarContext until explicit save)
  const draftConfigs = useSignal<OpenVPNDraftConfig[]>(
    openVpnServers && openVpnServers.length > 0
      ? openVpnServers
          .filter((server) => server && server.name && server.Certificate && server.Address && server.Encryption) // Filter out invalid servers
          .map((server) => ({
            name: server.name || "openvpn-1",
            certificate: server.Certificate.Certificate || "server-cert",
            enabled: server.enabled !== undefined ? server.enabled : true,
            port: server.Port || 1194,
            tcpPort: 1194,
            udpPort: 1195,
            protocol: (server.Protocol || "udp") as ProtocolType,
            mode: server.Mode || "ip",
            vsNetwork: "VPN" as VSNetwork,
            addressPool: server.Address.AddressPool || "192.168.78.0/24",
            requireClientCertificate: server.Certificate.RequireClientCertificate || false,
            auth: (server.Encryption.Auth && server.Encryption.Auth[0]) || "sha256",
            cipher: (server.Encryption.Cipher && server.Encryption.Cipher[0]) || "aes256-gcm",
            certificateKeyPassphrase: server.Certificate.CertificateKeyPassphrase || "",
            defaultProfile: server.DefaultProfile || "ovpn-profile",
            tlsVersion: server.Encryption.TlsVersion || "only-1.2",
            maxMtu: server.PacketSize?.MaxMtu || 1450,
            maxMru: server.PacketSize?.MaxMru || 1450,
            keepaliveTimeout: server.KeepaliveTimeout || 30,
            authentication: server.Authentication || ["mschap2"],
          }))
      : [
          {
            name: "openvpn-1",
            certificate: "server-cert",
            enabled: true,
            port: 1194,
            tcpPort: 1194,
            udpPort: 1195,
            protocol: "both" as ProtocolType,
            mode: "ip" as LayerMode,
            vsNetwork: "VPN" as VSNetwork,
            addressPool: "192.168.78.0/24",
            requireClientCertificate: false,
            auth: "sha256" as OvpnAuthMethod,
            cipher: "aes256-gcm" as OvpnCipher,
            certificateKeyPassphrase: "",
            defaultProfile: "ovpn-profile",
            tlsVersion: "only-1.2" as const,
            maxMtu: 1450,
            maxMru: 1450,
            keepaliveTimeout: 30,
            authentication: ["mschap2"] as AuthMethod[],
          },
        ]
  );

  // Update draft configuration for current tab
  const updateDraftConfig$ = $((updates: Partial<OpenVPNDraftConfig>) => {
    const currentIndex = activeTabIndex.value;
    const next = [...draftConfigs.value];
    next[currentIndex] = { ...next[currentIndex], ...updates };
    draftConfigs.value = next;
  });

  // Add a new server tab with default configuration
  const addServerTab$ = $(() => {
    const newServerNumber = draftConfigs.value.length + 1;
    
    // Get all existing VPN ports to avoid conflicts
    const allPorts = getAllVPNServerPorts(starContext.state);
    
    // Also get ports from current draft configs (unsaved servers)
    const draftPorts = draftConfigs.value.flatMap(draft => {
      if (draft.protocol === "both") {
        return [
          { protocol: "OpenVPN" as const, serverName: `${draft.name}-tcp`, port: draft.tcpPort },
          { protocol: "OpenVPN" as const, serverName: `${draft.name}-udp`, port: draft.udpPort }
        ];
      } else {
        return [{ protocol: "OpenVPN" as const, serverName: draft.name, port: draft.port }];
      }
    });
    
    // Combine saved and draft ports
    const combinedPorts = [...allPorts, ...draftPorts];
    const used = new Set<number>(combinedPorts.map(p => p.port));
    // Pair-safe allocator: UDP even, TCP odd
    let nextEven = 1194;
    while (used.has(nextEven) || used.has(nextEven + 1)) {
      nextEven += 2;
    }
    const udpPort = nextEven;
    const tcpPort = nextEven + 1;
    
    const newDraft: OpenVPNDraftConfig = {
      name: `openvpn-${newServerNumber}`,
      certificate: "server-cert",
      enabled: true,
      port: tcpPort,
      tcpPort: tcpPort,
      udpPort: udpPort,
      protocol: "both",
      mode: "ip",
      vsNetwork: "VPN",
      addressPool: `192.168.${78 + newServerNumber - 1}.0/24`,
      requireClientCertificate: false,
      auth: "sha256",
      cipher: "aes256-gcm",
      certificateKeyPassphrase: "",
      defaultProfile: "ovpn-profile",
      tlsVersion: "only-1.2",
      maxMtu: 1450,
      maxMru: 1450,
      keepaliveTimeout: 30,
      authentication: ["mschap2"],
    };
    draftConfigs.value = [...draftConfigs.value, newDraft];
    activeTabIndex.value = draftConfigs.value.length - 1;
  });

  // Remove a server tab
  const removeServerTab$ = $((index: number) => {
    if (draftConfigs.value.length > 1) {
      const removedDraft = draftConfigs.value[index];
      const next = [...draftConfigs.value];
      next.splice(index, 1);
      draftConfigs.value = next;
      // Adjust active tab if needed
      if (activeTabIndex.value >= draftConfigs.value.length) {
        activeTabIndex.value = draftConfigs.value.length - 1;
      }
      // Also remove from StarContext
      const updatedServers = [...openVpnServers];
      // Remove servers that match the name prefix
      const filtered = updatedServers.filter(
        s => !s.name.startsWith(removedDraft?.name || `openvpn-${index + 1}`)
      );
      starContext.updateLAN$({
        VPNServer: {
          ...vpnServerState,
          OpenVpnServer: filtered.length > 0 ? filtered : undefined,
        },
      });
    }
  });

  // Save current tab configuration to StarContext
  const saveCurrentServer$ = $(() => {
    const currentIndex = activeTabIndex.value;
    const currentDraft = draftConfigs.value[currentIndex] || draftConfigs.value[0];

    // Reset errors
    certificateError.value = "";
    passphraseError.value = "";
    portError.value = "";

    let isValid = true;

    // Validate certificate
    if (!currentDraft.certificate || !currentDraft.certificate.trim()) {
      certificateError.value = $localize`Certificate is required`;
      isValid = false;
    }

    // Validate passphrase
    if (currentDraft.certificateKeyPassphrase && currentDraft.certificateKeyPassphrase.length < 10) {
      passphraseError.value = $localize`Passphrase must be at least 10 characters long`;
      isValid = false;
    }

    // Validate ports
    const allPorts = getAllVPNServerPorts(starContext.state);

    if (currentDraft.protocol === "both") {
      // Validate both TCP and UDP ports
      const tcpValidation = validatePort(currentDraft.tcpPort, `${currentDraft.name}-tcp`, allPorts);
      const udpValidation = validatePort(currentDraft.udpPort, `${currentDraft.name}-udp`, allPorts);

      if (!tcpValidation.valid) {
        portError.value = `TCP: ${tcpValidation.error}`;
        isValid = false;
      } else if (!udpValidation.valid) {
        portError.value = `UDP: ${udpValidation.error}`;
        isValid = false;
      }
    } else {
      // Validate single port
      const portValidation = validatePort(currentDraft.port, currentDraft.name, allPorts);
      if (!portValidation.valid) {
        portError.value = portValidation.error || "";
        isValid = false;
      }
    }

    if (!isValid) {
      return;
    }

    // Create base config object
    const baseConfig = {
      Certificate: {
        Certificate: currentDraft.certificate,
        RequireClientCertificate: currentDraft.requireClientCertificate,
        CertificateKeyPassphrase: currentDraft.certificateKeyPassphrase,
      },
      enabled: currentDraft.enabled,
      Mode: currentDraft.mode,
      DefaultProfile: currentDraft.defaultProfile,
      Authentication: currentDraft.authentication,
      PacketSize: {
        MaxMtu: currentDraft.maxMtu,
        MaxMru: currentDraft.maxMru,
      },
      KeepaliveTimeout: currentDraft.keepaliveTimeout,
      VRF: "",
      RedirectGetway: "disabled" as const,
      PushRoutes: "",
      RenegSec: 3600,
      Encryption: {
        Auth: [currentDraft.auth],
        UserAuthMethod: "mschap2" as const,
        Cipher: [currentDraft.cipher],
        TlsVersion: currentDraft.tlsVersion,
      },
      IPV6: {
        EnableTunIPv6: false,
        IPv6PrefixLength: 64,
        TunServerIPv6: "",
      },
      Address: {
        AddressPool: currentDraft.addressPool,
        Netmask: 24,
        MacAddress: "",
        MaxMtu: currentDraft.maxMtu,
      },
      VSNetwork: currentDraft.vsNetwork,
    };

    let serverConfigs: OpenVpnServerConfig[];

    // Handle "Both" protocol case - create two servers
    if (currentDraft.protocol === "both") {
      serverConfigs = [
        {
          ...baseConfig,
          name: `${currentDraft.name}-tcp`,
          Protocol: "tcp" as const,
          Port: currentDraft.tcpPort,
        },
        {
          ...baseConfig,
          name: `${currentDraft.name}-udp`,
          Protocol: "udp" as const,
          Port: currentDraft.udpPort,
        },
      ];
    } else {
      // Single protocol case
      serverConfigs = [
        {
          ...baseConfig,
          name: currentDraft.name,
          Protocol: currentDraft.protocol as NetworkProtocol,
          Port: currentDraft.port,
        },
      ];
    }

    // Update StarContext with the saved servers
    // Remove old servers with matching base name and add new ones
    const updatedServers = openVpnServers.filter(
      s => !s.name.startsWith(currentDraft.name.replace(/-tcp$|-udp$/, ""))
    );
    updatedServers.push(...serverConfigs);

    starContext.updateLAN$({
      VPNServer: {
        ...vpnServerState,
        OpenVpnServer: updatedServers,
      },
    });
  });

  // Save all servers (all tabs) to StarContext
  const saveAllServers$ = $(() => {
    const validServers: OpenVpnServerConfig[] = [];
    const errors: string[] = [];

    // Get all existing VPN ports to avoid conflicts
    const allPorts = getAllVPNServerPorts(starContext.state);

    // Validate and collect all drafts
    for (const draft of draftConfigs.value) {
      let hasError = false;

      // Validate certificate
      if (!draft.certificate || !draft.certificate.trim()) {
        errors.push(`${draft.name}: Certificate is required`);
        hasError = true;
      }

      // Validate passphrase
      if (draft.certificateKeyPassphrase && draft.certificateKeyPassphrase.length < 10) {
        errors.push(`${draft.name}: Passphrase must be at least 10 characters long`);
        hasError = true;
      }

      // Validate ports based on protocol
      if (draft.protocol === "both") {
        const tcpValidation = validatePort(draft.tcpPort, `${draft.name}-tcp`, allPorts);
        const udpValidation = validatePort(draft.udpPort, `${draft.name}-udp`, allPorts);

        if (!tcpValidation.valid) {
          errors.push(`${draft.name}: TCP ${tcpValidation.error}`);
          hasError = true;
        }
        if (!udpValidation.valid) {
          errors.push(`${draft.name}: UDP ${udpValidation.error}`);
          hasError = true;
        }
      } else {
        const portValidation = validatePort(draft.port, draft.name, allPorts);
        if (!portValidation.valid) {
          errors.push(`${draft.name}: ${portValidation.error}`);
          hasError = true;
        }
      }

      // If valid, add to valid servers list
      if (!hasError) {
        // Create base config object
        const baseConfig = {
          Certificate: {
            Certificate: draft.certificate,
            RequireClientCertificate: draft.requireClientCertificate,
            CertificateKeyPassphrase: draft.certificateKeyPassphrase,
          },
          enabled: draft.enabled,
          Mode: draft.mode,
          DefaultProfile: draft.defaultProfile,
          Authentication: draft.authentication,
          PacketSize: {
            MaxMtu: draft.maxMtu,
            MaxMru: draft.maxMru,
          },
          KeepaliveTimeout: draft.keepaliveTimeout,
          VRF: "",
          RedirectGetway: "disabled" as const,
          PushRoutes: "",
          RenegSec: 3600,
          Encryption: {
            Auth: [draft.auth],
            UserAuthMethod: "mschap2" as const,
            Cipher: [draft.cipher],
            TlsVersion: draft.tlsVersion,
          },
          IPV6: {
            EnableTunIPv6: false,
            IPv6PrefixLength: 64,
            TunServerIPv6: "",
          },
          Address: {
            AddressPool: draft.addressPool,
            Netmask: 24,
            MacAddress: "",
            MaxMtu: draft.maxMtu,
          },
          VSNetwork: draft.vsNetwork,
        };

        // Handle "Both" protocol case - create two servers
        if (draft.protocol === "both") {
          validServers.push(
            {
              ...baseConfig,
              name: `${draft.name}-tcp`,
              Protocol: "tcp" as const,
              Port: draft.tcpPort,
            },
            {
              ...baseConfig,
              name: `${draft.name}-udp`,
              Protocol: "udp" as const,
              Port: draft.udpPort,
            }
          );
        } else {
          // Single protocol case
          validServers.push({
            ...baseConfig,
            name: draft.name,
            Protocol: draft.protocol as NetworkProtocol,
            Port: draft.port,
          });
        }
      }
    }

    // Get FRESH state instead of using stale vpnServerState captured at initialization
    const currentVPNState = starContext.state.LAN.VPNServer || { Users: [] };

    // Save all valid servers to StarContext
    starContext.updateLAN$({
      VPNServer: {
        ...currentVPNState,
        OpenVpnServer: validServers.length > 0 ? validServers : undefined,
      },
    });

    return {
      saved: validServers.length,
      total: draftConfigs.value.length,
      errors,
    };
  });

  // Switch to a different tab
  const switchTab$ = $((index: number) => {
    if (index >= 0 && index < draftConfigs.value.length) {
      activeTabIndex.value = index;
    }
  });

  // Individual field update functions
  const updateName$ = $((value: string) => {
    updateDraftConfig$({ name: value });
  });

  const updateCertificate$ = $((value: string) => {
    updateDraftConfig$({ certificate: value });
    certificateError.value = "";
  });

  const updatePort$ = $((value: number) => {
    updateDraftConfig$({ port: value });
    
    // Get all saved ports
    const allPorts = getAllVPNServerPorts(starContext.state);
    
    // Add draft ports (excluding current draft)
    const currentIndex = activeTabIndex.value;
    const draftPorts = draftConfigs.value
      .filter((_, index) => index !== currentIndex)
      .flatMap(draft => {
        if (draft.protocol === "both") {
          return [
            { protocol: "OpenVPN" as const, serverName: `${draft.name}-tcp`, port: draft.tcpPort },
            { protocol: "OpenVPN" as const, serverName: `${draft.name}-udp`, port: draft.udpPort }
          ];
        } else {
          return [{ protocol: "OpenVPN" as const, serverName: draft.name, port: draft.port }];
        }
      });
    
    const combinedPorts = [...allPorts, ...draftPorts];
    const currentDraft = draftConfigs.value[currentIndex];
    const validation = validatePort(value, currentDraft.name, combinedPorts);
    
    if (!validation.valid) {
      portError.value = validation.error || "";
    } else {
      portError.value = "";
    }
  });

  const updateTcpPort$ = $((value: number) => {
    updateDraftConfig$({ tcpPort: value });
    
    // Get all saved ports
    const allPorts = getAllVPNServerPorts(starContext.state);
    
    // Add draft ports (excluding current draft)
    const currentIndex = activeTabIndex.value;
    const draftPorts = draftConfigs.value
      .filter((_, index) => index !== currentIndex)
      .flatMap(draft => {
        if (draft.protocol === "both") {
          return [
            { protocol: "OpenVPN" as const, serverName: `${draft.name}-tcp`, port: draft.tcpPort },
            { protocol: "OpenVPN" as const, serverName: `${draft.name}-udp`, port: draft.udpPort }
          ];
        } else {
          return [{ protocol: "OpenVPN" as const, serverName: draft.name, port: draft.port }];
        }
      });
    
    const combinedPorts = [...allPorts, ...draftPorts];
    const currentDraft = draftConfigs.value[currentIndex];
    // Guard equality with UDP on same draft
    if (currentDraft.protocol === "both" && value === currentDraft.udpPort) {
      portError.value = $localize`TCP/UDP ports must be different`;
      return;
    }
    const validation = validatePort(value, `${currentDraft.name}-tcp`, combinedPorts);
    
    if (!validation.valid) {
      portError.value = `TCP: ${validation.error || ""}`;
    } else {
      portError.value = "";
    }
  });

  const updateUdpPort$ = $((value: number) => {
    updateDraftConfig$({ udpPort: value });
    
    // Get all saved ports
    const allPorts = getAllVPNServerPorts(starContext.state);
    
    // Add draft ports (excluding current draft)
    const currentIndex = activeTabIndex.value;
    const draftPorts = draftConfigs.value
      .filter((_, index) => index !== currentIndex)
      .flatMap(draft => {
        if (draft.protocol === "both") {
          return [
            { protocol: "OpenVPN" as const, serverName: `${draft.name}-tcp`, port: draft.tcpPort },
            { protocol: "OpenVPN" as const, serverName: `${draft.name}-udp`, port: draft.udpPort }
          ];
        } else {
          return [{ protocol: "OpenVPN" as const, serverName: draft.name, port: draft.port }];
        }
      });
    
    const combinedPorts = [...allPorts, ...draftPorts];
    const currentDraft = draftConfigs.value[currentIndex];
    // Guard equality with TCP on same draft
    if (currentDraft.protocol === "both" && value === currentDraft.tcpPort) {
      portError.value = $localize`TCP/UDP ports must be different`;
      return;
    }
    const validation = validatePort(value, `${currentDraft.name}-udp`, combinedPorts);
    
    if (!validation.valid) {
      portError.value = `UDP: ${validation.error || ""}`;
    } else {
      portError.value = "";
    }
  });

  const updateProtocol$ = $((value: NetworkProtocol | "both") => {
    updateDraftConfig$({ protocol: value });
  });

  const updateMode$ = $((value: LayerMode) => {
    updateDraftConfig$({ mode: value });
  });

  const updateVSNetwork$ = $((value: VSNetwork) => {
    updateDraftConfig$({ vsNetwork: value });
  });

  const updateAddressPool$ = $((value: string) => {
    updateDraftConfig$({ addressPool: value });
  });

  const updateRequireClientCertificate$ = $((value: boolean) => {
    updateDraftConfig$({ requireClientCertificate: value });
  });

  const updateAuth$ = $((value: OvpnAuthMethod) => {
    updateDraftConfig$({ auth: value });
  });

  const updateCipher$ = $((value: OvpnCipher) => {
    updateDraftConfig$({ cipher: value });
  });

  const updateCertificateKeyPassphrase$ = $((value: string) => {
    updateDraftConfig$({ certificateKeyPassphrase: value });
    passphraseError.value = "";
  });

  const updateDefaultProfile$ = $((value: string) => {
    updateDraftConfig$({ defaultProfile: value });
  });

  const updateTlsVersion$ = $((value: "any" | "only-1.2") => {
    updateDraftConfig$({ tlsVersion: value });
  });

  const updateMaxMtu$ = $((value: number) => {
    updateDraftConfig$({ maxMtu: value });
  });

  const updateMaxMru$ = $((value: number) => {
    updateDraftConfig$({ maxMru: value });
  });

  const updateKeepaliveTimeout$ = $((value: number) => {
    updateDraftConfig$({ keepaliveTimeout: value });
  });

  // Toggle functions
  const handleToggle = $((enabled: boolean) => {
    try {
      isEnabled.value = enabled;
      const currentDraft = draftConfigs.value[activeTabIndex.value] || draftConfigs.value[0];
      if (isEnabled.value && !currentDraft.name) {
        updateDraftConfig$({ name: "openvpn-1" });
      }
    } catch (error) {
      console.error("Error toggling OpenVPN server:", error);
      isEnabled.value = !enabled;
    }
  });

  const togglePassphraseVisibility$ = $(() => {
    showPassphrase.value = !showPassphrase.value;
  });

  // Easy mode update function
  const updateEasyPassphrase$ = $((value: string) => {
    updateDraftConfig$({ certificateKeyPassphrase: value });
    passphraseError.value = "";
  });

  // Function to ensure default configuration when protocol is enabled
  const ensureDefaultConfig = $(() => {
    if (!vpnServerState.OpenVpnServer || vpnServerState.OpenVpnServer.length === 0) {
      if (draftConfigs.value.length === 0) {
        draftConfigs.value = [
        ...draftConfigs.value,
        {
          name: "openvpn-1",
          certificate: "server-cert",
          enabled: true,
          port: 1194,
          tcpPort: 1194,
          udpPort: 1195,
          protocol: "both",
          mode: "ip",
          vsNetwork: "VPN",
          addressPool: "192.168.78.0/24",
          requireClientCertificate: false,
          auth: "sha256",
          cipher: "aes256-gcm",
          certificateKeyPassphrase: "",
          defaultProfile: "ovpn-profile",
          tlsVersion: "only-1.2",
          maxMtu: 1450,
          maxMru: 1450,
          keepaliveTimeout: 30,
          authentication: ["mschap2"],
        }
        ];
      }
    }
  });

  // Tab options for UI
  const tabOptions = [
    { id: "basic", label: $localize`Basic Settings` },
    { id: "network", label: $localize`Network Settings` },
    { id: "security", label: $localize`Security Settings` },
  ];

  // Protocol options
  const protocolOptions = [
    { value: "both", label: "Both (TCP & UDP)" },
    { value: "tcp", label: "TCP" },
    { value: "udp", label: "UDP" },
  ];

  // Mode options
  const modeOptions = [
    { value: "ip", label: $localize`IP (Layer 3)` },
    { value: "ethernet", label: $localize`Ethernet (Layer 2)` },
  ];

  // Auth method options
  const authMethodOptions = [
    { value: "md5", label: "MD5" },
    { value: "sha1", label: "SHA1" },
    { value: "sha256", label: "SHA256" },
    { value: "sha512", label: "SHA512" },
    { value: "null", label: "None" },
  ];

  // Cipher options
  const cipherOptions = [
    { value: "null", label: "None" },
    { value: "aes128-cbc", label: "AES-128-CBC" },
    { value: "aes192-cbc", label: "AES-192-CBC" },
    { value: "aes256-cbc", label: "AES-256-CBC" },
    { value: "aes128-gcm", label: "AES-128-GCM" },
    { value: "aes192-gcm", label: "AES-192-GCM" },
    { value: "aes256-gcm", label: "AES-256-GCM" },
    { value: "blowfish128", label: "Blowfish-128" },
  ];

  // TLS version options
  const tlsVersionOptions = [
    { value: "any", label: $localize`Any` },
    { value: "only-1.2", label: $localize`Only 1.2` },
  ];

  return {
    // State
    openVpnServers,
    draftConfigs,
    activeTabIndex,

    // For backward compatibility
    get openVpnState() {
      return openVpnServers[0] || draftConfigs.value[activeTabIndex.value] || draftConfigs.value[0];
    },
    get formState() {
      return draftConfigs.value[activeTabIndex.value] || draftConfigs.value[0];
    },
    get advancedFormState() {
      return draftConfigs.value[activeTabIndex.value] || draftConfigs.value[0];
    },
    get easyFormState() {
      return draftConfigs.value[activeTabIndex.value] || draftConfigs.value[0];
    },
    isEnabled,
    viewMode,
    showPassphrase,
    activeTab,

    // Errors
    certificateError,
    passphraseError,
    portError,

    // Options
    tabOptions,
    protocolOptions,
    modeOptions,
    authMethodOptions,
    cipherOptions,
    tlsVersionOptions,

    // Tab management
    addServerTab$,
    removeServerTab$,
    switchTab$,

    // Core functions
    updateDraftConfig$,
    saveCurrentServer$,
    saveAllServers$,
    ensureDefaultConfig,

    // Individual field updates
    updateName$,
    updateCertificate$,
    updatePort$,
    updateTcpPort$,
    updateUdpPort$,
    updateProtocol$,
    updateMode$,
    updateVSNetwork$,
    updateAddressPool$,
    updateRequireClientCertificate$,
    updateAuth$,
    updateCipher$,
    updateCertificateKeyPassphrase$,
    updateDefaultProfile$,
    updateTlsVersion$,
    updateMaxMtu$,
    updateMaxMru$,
    updateKeepaliveTimeout$,

    // Toggles
    handleToggle,
    togglePassphraseVisibility$,

    // Easy mode functions
    updateEasyPassphrase$,

    // Backward compatibility
    updateAdvancedForm$: updateDraftConfig$,
    updateEasyServerConfig: saveCurrentServer$,
    updateOpenVPNServer$: saveCurrentServer$,
  };
};
