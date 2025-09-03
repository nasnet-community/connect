import { $, useSignal, useStore } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import type {
  OpenVpnServerConfig,
  OpenVpnProtocol,
  OvpnAuthMethod,
  OvpnCipher,
} from "../../../../StarContext/Utils/VPNServerType";
import type {
  LayerMode,
  AuthMethod,
  Networks,
} from "../../../../StarContext/CommonType";
import { StarContext } from "../../../../StarContext/StarContext";

// Define ViewMode type
type ViewMode = "easy" | "advanced";

export const useOpenVPNServer = () => {
  const starContext = useContext(StarContext);

  const vpnServerState = starContext.state.LAN.VPNServer || { Users: [] };

  // Get the first OpenVPN server configuration or create a default one
  const openVpnState = (vpnServerState.OpenVpnServer &&
    vpnServerState.OpenVpnServer[0]) || {
    name: "default",
    enabled: true,
    Port: 1194,
    Protocol: "udp",
    Mode: "ip",
    Network: "VPN",
    DefaultProfile: "ovpn-profile",
    Authentication: ["mschap2"],
    PacketSize: {
      MaxMtu: 1450,
      MaxMru: 1450,
    },
    KeepaliveTimeout: 30,
    VRF: "",
    RedirectGetway: "def1",
    PushRoutes: "",
    RenegSec: 3600,
    Encryption: {
      Auth: ["sha256"],
      UserAuthMethod: "mschap2",
      Cipher: ["aes256-cbc"],
      TlsVersion: "any",
    },
    IPV6: {
      EnableTunIPv6: false,
      IPv6PrefixLength: 64,
      TunServerIPv6: "",
    },
    Certificate: {
      Certificate: "default",
      RequireClientCertificate: false,
      CertificateKeyPassphrase: "",
    },
    Address: {
      Netmask: 24,
      MacAddress: "",
      MaxMtu: 1450,
      AddressPool: "",
    },
  };

  // Error signals
  const certificateError = useSignal("");
  const passphraseError = useSignal("");

  // Unified form state for both easy and advanced modes
  const formState = useStore({
    name: openVpnState.name || "default",
    certificate: openVpnState.Certificate.Certificate || "",
    enabled: openVpnState.enabled !== undefined ? openVpnState.enabled : true,
    port: openVpnState.Port || 1194,
    tcpPort: 1194, // Default TCP port
    udpPort: 1195, // Default UDP port
    protocol: openVpnState.Protocol || "udp",
    mode: openVpnState.Mode || "ip",
    network: openVpnState.Network || "VPN",
    addressPool: openVpnState.Address.AddressPool || "192.168.78.0/24",
    requireClientCertificate:
      openVpnState.Certificate.RequireClientCertificate !== undefined
        ? openVpnState.Certificate.RequireClientCertificate
        : false,
    auth:
      (openVpnState.Encryption.Auth && openVpnState.Encryption.Auth[0]) ||
      "sha256",
    cipher:
      (openVpnState.Encryption.Cipher && openVpnState.Encryption.Cipher[0]) ||
      "aes256-gcm",
    certificateKeyPassphrase:
      openVpnState.Certificate.CertificateKeyPassphrase || "",
    defaultProfile: openVpnState.DefaultProfile || "default",
    tlsVersion: openVpnState.Encryption.TlsVersion || "only-1.2",
    maxMtu: openVpnState.PacketSize?.MaxMtu || 1450,
    maxMru: openVpnState.PacketSize?.MaxMru || 1450,
    keepaliveTimeout: openVpnState.KeepaliveTimeout || 30,
    authentication: openVpnState.Authentication || ["mschap2"],
  });

  // UI state
  const isEnabled = useSignal(!!openVpnState.name);
  const showPassphrase = useSignal(false);
  const activeTab = useSignal<"basic" | "network" | "security">("basic");
  const viewMode = useSignal<ViewMode>("advanced");

  // Tab options
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

  // Core update function
  const updateOpenVPNServer$ = $(
    (configOrConfigs: Partial<OpenVpnServerConfig> | OpenVpnServerConfig[]) => {
      // Handle both single config and array of configs
      if (Array.isArray(configOrConfigs)) {
        // For array of configs (multiple servers)
        passphraseError.value = "";
        certificateError.value = "";

        // Validate all servers
        for (const config of configOrConfigs) {
          // Validate certificate
          if (
            !config.Certificate.Certificate ||
            !config.Certificate.Certificate.trim()
          ) {
            certificateError.value = $localize`Certificate is required`;
          }

          // Validate passphrase
          if (
            config.Certificate.CertificateKeyPassphrase &&
            config.Certificate.CertificateKeyPassphrase.length < 10
          ) {
            passphraseError.value = $localize`Passphrase must be at least 10 characters long`;
          }
        }

        // Update context regardless of validation to preserve user input.
        // The `isValid` flag can be used later to prevent advancing in a stepper.
        starContext.updateLAN$({
          VPNServer: {
            ...vpnServerState,
            OpenVpnServer: configOrConfigs,
          },
        });
      } else {
        // Handle single config (backward compatibility)
        const config = configOrConfigs;
        const newConfig = {
          ...openVpnState,
          ...config,
        };

        let isValid = true;

        // Validate certificate
        if (config.Certificate?.Certificate !== undefined) {
          if (
            !newConfig.Certificate.Certificate ||
            !newConfig.Certificate.Certificate.trim()
          ) {
            certificateError.value = $localize`Certificate is required`;
            isValid = false;
          } else {
            certificateError.value = "";
          }
        }

        // Validate passphrase
        if (config.Certificate?.CertificateKeyPassphrase !== undefined) {
          if (
            newConfig.Certificate.CertificateKeyPassphrase &&
            newConfig.Certificate.CertificateKeyPassphrase.length < 10
          ) {
            passphraseError.value = $localize`Passphrase must be at least 10 characters long`;
            isValid = false;
          } else {
            passphraseError.value = "";
          }
        }

        if (isValid || (config.name && config.name === "")) {
          starContext.updateLAN$({
            VPNServer: {
              ...vpnServerState,
              OpenVpnServer:
                config.name && config.name === "" ? undefined : [newConfig],
            },
          });
        }
      }
    },
  );

  // Advanced mode form update function
  const updateAdvancedForm$ = $((updatedValues: Partial<typeof formState>) => {
    // Update local state first
    Object.assign(formState, updatedValues);

    // Handle "Both" protocol case - create two servers
    if (formState.protocol === "both") {
      const baseConfig = {
        name: formState.name,
        enabled: formState.enabled,
        Mode: formState.mode as LayerMode,
        Network: formState.network as Networks,
        DefaultProfile: formState.defaultProfile,
        Authentication: formState.authentication as AuthMethod[],
        PacketSize: {
          MaxMtu: formState.maxMtu,
          MaxMru: formState.maxMru,
        },
        KeepaliveTimeout: formState.keepaliveTimeout,
        VRF: "",
        RedirectGetway: "disabled" as const,
        PushRoutes: "",
        RenegSec: 3600,
        Encryption: {
          Auth: [formState.auth as OvpnAuthMethod],
          Cipher: [formState.cipher as OvpnCipher],
          TlsVersion: formState.tlsVersion as "any" | "only-1.2",
          UserAuthMethod: "mschap2" as const,
        },
        IPV6: {
          EnableTunIPv6: false,
          IPv6PrefixLength: 64,
          TunServerIPv6: "",
        },
        Certificate: {
          Certificate: formState.certificate,
          RequireClientCertificate: formState.requireClientCertificate,
          CertificateKeyPassphrase: formState.certificateKeyPassphrase,
        },
        Address: {
          AddressPool: formState.addressPool,
          Netmask: 24,
          MacAddress: "",
          MaxMtu: formState.maxMtu,
        },
      };

      // Create two servers - one TCP and one UDP
      const servers = [
        {
          ...baseConfig,
          name: `${formState.name}-tcp`,
          Protocol: "tcp" as const,
          Port: formState.tcpPort || 1194,
        },
        {
          ...baseConfig,
          name: `${formState.name}-udp`,
          Protocol: "udp" as const,
          Port: formState.udpPort || 1195,
        },
      ];

      updateOpenVPNServer$(servers);
    } else {
      // Single protocol case
      updateOpenVPNServer$({
        name: formState.name,
        enabled: formState.enabled,
        Port: formState.port,
        Protocol: formState.protocol as OpenVpnProtocol,
        Mode: formState.mode as LayerMode,
        Network: formState.network as Networks,
        DefaultProfile: formState.defaultProfile,
        Authentication: formState.authentication as AuthMethod[],
        PacketSize: {
          MaxMtu: formState.maxMtu,
          MaxMru: formState.maxMru,
        },
        KeepaliveTimeout: formState.keepaliveTimeout,
        VRF: "",
        RedirectGetway: "disabled",
        PushRoutes: "",
        RenegSec: 3600,
        Encryption: {
          Auth: [formState.auth as OvpnAuthMethod],
          Cipher: [formState.cipher as OvpnCipher],
          TlsVersion: formState.tlsVersion as "any" | "only-1.2",
          UserAuthMethod: "mschap2",
        },
        IPV6: {
          EnableTunIPv6: false,
          IPv6PrefixLength: 64,
          TunServerIPv6: "",
        },
        Certificate: {
          Certificate: formState.certificate,
          RequireClientCertificate: formState.requireClientCertificate,
          CertificateKeyPassphrase: formState.certificateKeyPassphrase,
        },
        Address: {
          AddressPool: formState.addressPool,
          Netmask: 24,
          MacAddress: "",
          MaxMtu: formState.maxMtu,
        },
      });
    }
  });

  // Easy mode form update function
  const updateEasyServerConfig = $(() => {
    if (!formState.certificateKeyPassphrase) {
      updateOpenVPNServer$([]);
      return;
    }

    const baseConfig = {
      Certificate: {
        Certificate: "server-cert",
        CertificateKeyPassphrase: formState.certificateKeyPassphrase,
        RequireClientCertificate: false,
      },
      enabled: true,
      Mode: "ip" as const,
      Network: formState.network as Networks,
      DefaultProfile: "ovpn-profile",
      Authentication: ["mschap2" as AuthMethod],
      PacketSize: { MaxMtu: 1450, MaxMru: 1450 },
      KeepaliveTimeout: 30,
      VRF: "",
      RedirectGetway: "def1" as const,
      PushRoutes: "",
      RenegSec: 3600,
      Encryption: {
        Auth: ["sha256" as const],
        UserAuthMethod: "mschap2" as const,
        Cipher: ["aes256-cbc" as const],
        TlsVersion: "any" as const,
      },
      IPV6: {
        EnableTunIPv6: false,
        IPv6PrefixLength: 64,
        TunServerIPv6: "",
      },
      Address: {
        Netmask: 24,
        MacAddress: "",
        MaxMtu: 1450,
        AddressPool: "ovpn-pool",
      },
    };

    // Create two servers - one UDP and one TCP with different ports
    const servers = [
      {
        ...baseConfig,
        name: "openvpn-udp",
        Protocol: "udp" as const,
        Port: 1194, // Standard OpenVPN UDP port
      },
      {
        ...baseConfig,
        name: "openvpn-tcp",
        Protocol: "tcp" as const,
        Port: 1195,
      },
    ];

    updateOpenVPNServer$(servers);
  });

  // Individual field update functions for advanced mode
  const updateName$ = $((value: string) =>
    updateAdvancedForm$({ name: value }),
  );
  const updateCertificate$ = $((value: string) =>
    updateAdvancedForm$({ certificate: value }),
  );
  const updatePort$ = $((value: number) =>
    updateAdvancedForm$({ port: value }),
  );
  const updateTcpPort$ = $((value: number) =>
    updateAdvancedForm$({ tcpPort: value }),
  );
  const updateUdpPort$ = $((value: number) =>
    updateAdvancedForm$({ udpPort: value }),
  );
  const updateProtocol$ = $((value: OpenVpnProtocol) =>
    updateAdvancedForm$({ protocol: value }),
  );
  const updateMode$ = $((value: LayerMode) =>
    updateAdvancedForm$({ mode: value }),
  );
  const updateNetwork$ = $((value: Networks | string) =>
    updateAdvancedForm$({ network: value as any }),
  );
  const updateAddressPool$ = $((value: string) =>
    updateAdvancedForm$({ addressPool: value }),
  );
  const updateRequireClientCertificate$ = $((value: boolean) =>
    updateAdvancedForm$({ requireClientCertificate: value }),
  );
  const updateAuth$ = $((value: OvpnAuthMethod) =>
    updateAdvancedForm$({ auth: value }),
  );
  const updateCipher$ = $((value: OvpnCipher) =>
    updateAdvancedForm$({ cipher: value }),
  );
  const updateCertificateKeyPassphrase$ = $((value: string) =>
    updateAdvancedForm$({ certificateKeyPassphrase: value }),
  );
  const updateDefaultProfile$ = $((value: string) =>
    updateAdvancedForm$({ defaultProfile: value }),
  );
  const updateTlsVersion$ = $((value: "any" | "only-1.2") =>
    updateAdvancedForm$({ tlsVersion: value }),
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

  // Toggle functions
  const handleToggle = $((enabled: boolean) => {
    try {
      isEnabled.value = enabled;
      if (isEnabled.value && !formState.name) {
        formState.name = "default";
      }
      updateAdvancedForm$({});
    } catch (error) {
      console.error("Error toggling OpenVPN server:", error);
      isEnabled.value = !enabled; // Revert the change if there's an error
    }
  });

  const togglePassphraseVisibility$ = $(() => {
    showPassphrase.value = !showPassphrase.value;
  });

  // Easy mode functions
  const updateEasyPassphrase$ = $((value: string) => {
    formState.certificateKeyPassphrase = value;
    updateEasyServerConfig();
  });

  // Function to ensure default configuration when protocol is enabled
  const ensureDefaultConfig = $(() => {
    if (
      !vpnServerState.OpenVpnServer ||
      vpnServerState.OpenVpnServer.length === 0
    ) {
      const baseConfig = {
        Certificate: {
          Certificate: "server-cert",
          CertificateKeyPassphrase: "",
          RequireClientCertificate: false,
        },
        enabled: true,
        Mode: "ip" as const,
        Network: "VPN" as Networks,
        DefaultProfile: "ovpn-profile",
        Authentication: ["mschap2" as AuthMethod],
        PacketSize: { MaxMtu: 1450, MaxMru: 1450 },
        KeepaliveTimeout: 30,
        VRF: "",
        RedirectGetway: "def1" as const,
        PushRoutes: "",
        RenegSec: 3600,
        Encryption: {
          Auth: ["sha256" as const],
          UserAuthMethod: "mschap2" as const,
          Cipher: ["aes256-cbc" as const],
          TlsVersion: "any" as const,
        },
        IPV6: {
          EnableTunIPv6: false,
          IPv6PrefixLength: 64,
          TunServerIPv6: "",
        },
        Address: {
          Netmask: 24,
          MacAddress: "",
          MaxMtu: 1450,
          AddressPool: "ovpn-pool",
        },
      };

      // Create two servers - one UDP and one TCP with different ports
      const servers = [
        {
          ...baseConfig,
          name: "openvpn-udp",
          Protocol: "udp" as const,
          Port: 1194, // Standard OpenVPN UDP port
        },
        {
          ...baseConfig,
          name: "openvpn-tcp",
          Protocol: "tcp" as const,
          Port: 1195,
        },
      ];

      updateOpenVPNServer$(servers);
    }
  });

  return {
    // State
    openVpnState,
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
    showPassphrase,
    activeTab,

    // Errors
    certificateError,
    passphraseError,

    // Options
    tabOptions,
    protocolOptions,
    modeOptions,
    authMethodOptions,
    cipherOptions,
    tlsVersionOptions,

    // Core functions
    updateOpenVPNServer$,
    updateAdvancedForm$,
    updateEasyServerConfig,
    ensureDefaultConfig,

    // Individual field updates for advanced mode
    updateName$,
    updateCertificate$,
    updatePort$,
    updateTcpPort$,
    updateUdpPort$,
    updateProtocol$,
    updateMode$,
    updateNetwork$,
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
  };
};
