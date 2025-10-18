import { useContext, $, useSignal, useStore, useTask$ } from "@builder.io/qwik";
import { StarContext } from "~/components/Star/StarContext";
import type { VPNType, VSCredentials, VSNetwork } from "~/components/Star/StarContext";
import type { QRL } from "@builder.io/qwik";

export const useVPNServerEasy = () => {
  const starContext = useContext(StarContext);
  const vpnServerState = starContext.state.LAN.VPNServer || {
    Users: [],
  };

  // Certificate passphrase state
  const certificatePassphrase = useSignal("");
  const showPassphrase = useSignal(false);
  const passphraseError = useSignal("");

  // User management state
  const users = useStore<VSCredentials[]>(
    vpnServerState.Users.length > 0
      ? vpnServerState.Users
      : [
          {
            Username: "",
            Password: "",
            VPNType: [
              "OpenVPN", 
              "Wireguard", 
              // "SSTP", 
              // "L2TP", 
              // "PPTP", 
              // "IKeV2", 
              // "SSH", 
              // "Socks5", 
              // "BackToHome", 
              // "HTTPProxy"

            ] as VPNType[],
          },
        ]
  );

  const usernameErrors = useStore<Record<number, string>>({});
  const passwordErrors = useStore<Record<number, string>>({});

  // Validation states
  const isValid = useSignal(false);
  const vpnServerEnabled = useSignal(true);

  // Validate passphrase
  const validatePassphrase = $((value: string) => {
    if (value.length < 10) {
      passphraseError.value = $localize`Passphrase must be at least 10 characters`;
      return false;
    }
    passphraseError.value = "";
    return true;
  });

  // Update passphrase
  const updatePassphrase$ = $((value: string) => {
    certificatePassphrase.value = value;
    validatePassphrase(value);
  });

  // Toggle passphrase visibility
  const togglePassphraseVisibility$ = $(() => {
    showPassphrase.value = !showPassphrase.value;
  });

  // User management functions
  const addUser = $(() => {
    users.push({
      Username: "",
      Password: "",
      VPNType: [
        "OpenVPN", 
        "Wireguard", 
        // "SSTP", 
        // "L2TP", 
        // "PPTP", 
        // "IKeV2", 
        // "SSH", 
        // "Socks5", 
        // "BackToHome", 
        // "HTTPProxy"

      ] as VPNType[],
    });
  });

  const removeUser = $((index: number) => {
    if (index > 0) {
      users.splice(index, 1);
      delete usernameErrors[index];
      delete passwordErrors[index];
    }
  });

  const validateUsername = $((username: string, index: number) => {
    if (!username.trim()) {
      usernameErrors[index] = $localize`Username is required`;
      return false;
    }

    // Check for duplicates
    const isDuplicate = users.some(
      (user, i) => i !== index && user.Username === username
    );

    if (isDuplicate) {
      usernameErrors[index] = $localize`Username already exists`;
      return false;
    }

    delete usernameErrors[index];
    return true;
  });

  const validatePassword = $((password: string, index: number) => {
    if (!password.trim()) {
      passwordErrors[index] = $localize`Password is required`;
      return false;
    }

    if (password.length < 8) {
      passwordErrors[index] = $localize`Password must be at least 8 characters`;
      return false;
    }

    delete passwordErrors[index];
    return true;
  });

  const handleUsernameChange = $((value: string, index: number) => {
    users[index].Username = value;
    validateUsername(value, index);
  });

  const handlePasswordChange = $((value: string, index: number) => {
    users[index].Password = value;
    validatePassword(value, index);
  });

  const handleProtocolToggle = $((protocol: VPNType, index: number) => {
    const user = users[index];
    const protocolIndex = user.VPNType.indexOf(protocol);

    if (protocolIndex >= 0) {
      // Don't allow removing all protocols
      if (user.VPNType.length > 1) {
        user.VPNType.splice(protocolIndex, 1);
      }
    } else {
      user.VPNType.push(protocol);
    }
  });

  // Overall validation
  useTask$(({ track }) => {
    track(() => certificatePassphrase.value);
    track(() => users.length);
    track(() => Object.keys(usernameErrors).length);
    track(() => Object.keys(passwordErrors).length);

    // Validate passphrase
    const hasValidPassphrase = certificatePassphrase.value.length >= 10;

    // Validate users
    const hasValidUsers =
      users.length > 0 &&
      users.every((user, index) => {
        const hasUsername = user.Username.trim().length > 0;
        const hasPassword = user.Password.length >= 8;
        const hasProtocols = user.VPNType.length > 0;
        const noUsernameError = !usernameErrors[index];
        const noPasswordError = !passwordErrors[index];

        return (
          hasUsername &&
          hasPassword &&
          hasProtocols &&
          noUsernameError &&
          noPasswordError
        );
      });

    isValid.value = hasValidPassphrase && hasValidUsers;
  });

  // Save settings to context
  const saveSettings = $(
    async (onComplete?: QRL<() => void>) => {
      if (!isValid.value) {
        console.error("Validation failed. Cannot save settings.");
        return;
      }

      // Enable default protocols for easy mode with VPN network
      const primaryNetwork: VSNetwork = "VPN";

      const defaultProtocols = {
        OpenVpnServer: [
          {
            enabled: true,
            name: "ovpn-tcp",
            Port: 1194,
            Protocol: "tcp" as const,
            Mode: "ethernet" as const,
            VSNetwork: primaryNetwork,
            Certificate: {
              Certificate: "vpn-server-cert",
              RequireClientCertificate: false,
              CertificateKeyPassphrase: certificatePassphrase.value,
            },
            Encryption: {
              Auth: ["sha256"] as any,
              Cipher: ["aes256-gcm"] as any,
            },
            Address: {
              Netmask: 24,
              AddressPool: "192.168.40.0-192.168.40.254",
            },
            IPV6: {},
          },
          {
            enabled: true,
            name: "ovpn-udp",
            Port: 1195,
            Protocol: "udp" as const,
            Mode: "ethernet" as const,
            VSNetwork: primaryNetwork,
            Certificate: {
              Certificate: "vpn-server-cert",
              RequireClientCertificate: false,
              CertificateKeyPassphrase: certificatePassphrase.value,
            },
            Encryption: {
              Auth: ["sha256"] as any,
              Cipher: ["aes256-gcm"] as any,
            },
            Address: {
              Netmask: 24,
              AddressPool: "192.168.40.0-192.168.40.254",
            },
            IPV6: {},
          },
        ],
        WireguardServers: [
          {
            Interface: {
              Name: "wireguard-server",
              PrivateKey: "",
              InterfaceAddress: "10.0.0.1/24",
              ListenPort: 51820,
              VSNetwork: primaryNetwork,
            },
            Peers: [],
          },
        ],
        // SstpServer: {
        //   enabled: true,
        //   Certificate: "vpn-server-cert",
        //   DefaultProfile: "sstp-profile",
        //   Port: 4443,
        //   ForceAes: false,
        //   Pfs: false,
        //   Ciphers: "aes256-gcm-sha384" as const,
        //   VerifyClientCertificate: false,
        //   TlsVersion: "only-1.2" as const,
        //   Authentication: ["mschap2"] as any,
        //   PacketSize: { MaxMtu: 1450, MaxMru: 1450 },
        //   KeepaliveTimeout: 30,
        //   VSNetwork: primaryNetwork,
        // },
        // PptpServer: {
        //   enabled: true,
        //   DefaultProfile: "pptp-profile",
        //   Authentication: ["mschap2"] as any,
        //   PacketSize: { MaxMtu: 1450, MaxMru: 1450 },
        //   KeepaliveTimeout: 30,
        //   VSNetwork: primaryNetwork,
        // },
        // L2tpServer: {
        //   enabled: true,
        //   DefaultProfile: "l2tp-profile",
        //   Authentication: ["mschap2", "mschap1"] as any,
        //   PacketSize: { MaxMtu: 1450, MaxMru: 1450 },
        //   IPsec: { UseIpsec: "no" as const, IpsecSecret: "" },
        //   KeepaliveTimeout: 30,
        //   allowFastPath: true,
        //   maxSessions: "unlimited" as const,
        //   OneSessionPerHost: false,
        //   L2TPV3: {
        //     l2tpv3CircuitId: "",
        //     l2tpv3CookieLength: 0 as const,
        //     l2tpv3DigestHash: "md5" as const,
        //     l2tpv3EtherInterfaceList: "",
        //   },
        //   acceptProtoVersion: "all" as const,
        //   callerIdType: "ip-address" as const,
        //   VSNetwork: primaryNetwork,
        // },
        // Ikev2Server: {
        //   ipPools: { Name: "ike2-pool", Ranges: "192.168.77.2-192.168.77.254" },
        //   profile: {
        //     name: "ike2",
        //     hashAlgorithm: "sha1" as const,
        //     encAlgorithm: "aes-128" as const,
        //     dhGroup: "modp1024" as const,
        //   },
        //   proposal: {
        //     name: "ike2",
        //     authAlgorithms: "sha1" as const,
        //     encAlgorithms: "aes-256-cbc" as const,
        //     pfsGroup: "none" as const,
        //   },
        //   policyGroup: { name: "ike2-policies" },
        //   policyTemplates: {
        //     group: "ike2-policies",
        //     proposal: "ike2",
        //     srcAddress: "0.0.0.0/0",
        //     dstAddress: "192.168.77.0/24",
        //   },
        //   peer: {
        //     name: "ike2",
        //     exchangeMode: "ike2" as const,
        //     passive: true,
        //     profile: "ike2",
        //   },
        //   identities: {
        //     authMethod: "pre-shared-key" as const,
        //     peer: "ike2",
        //     generatePolicy: "port-strict" as const,
        //     policyTemplateGroup: "ike2-policies",
        //     secret: certificatePassphrase.value,
        //   },
        //   modeConfigs: {
        //     name: "ike2-conf",
        //     addressPool: "ike2-pool",
        //     addressPrefixLength: 32,
        //     responder: true,
        //   },
        //   VSNetwork: primaryNetwork,
        // },
        // SSHServer: {
        //   enabled: true,
        //   Network: primaryNetwork,
        //   VSNetwork: primaryNetwork,
        // },
        // Socks5Server: {
        //   enabled: true,
        //   Port: 1080,
        //   Network: primaryNetwork,
        //   VSNetwork: primaryNetwork,
        // },
        // HTTPProxyServer: {
        //   enabled: true,
        //   Port: 8080,
        //   Network: primaryNetwork,
        //   AllowedIPAddresses: [],
        //   VSNetwork: primaryNetwork,
        // },
        // BackToHomeServer: {
        //   enabled: true,
        //   Network: primaryNetwork,
        //   VSNetwork: primaryNetwork,
        // },
      };

      await starContext.updateLAN$({
        VPNServer: {
          ...vpnServerState,
          Users: users,
          ...defaultProtocols,
        },
      });

      // Update Networks state with VPN Server interface names and boolean flags
      const vpnServerNetworks = {
        OpenVPN: ["ovpn-tcp", "ovpn-udp"],  // Interface names from OpenVpnServerConfig.name
        Wireguard: ["wg0"],    // Interface name from WireguardServerConfig.Interface.Name
        // PPTP: true,            // Boolean flag for PPTP
        // L2TP: true,            // Boolean flag for L2TP
        // SSTP: true,            // Boolean flag for SSTP
        // IKev2: true,           // Boolean flag for IKEv2
        // SSH: true,             // Boolean flag for SSH
        // Socks5: true,          // Boolean flag for Socks5
        // HTTPProxy: true,       // Boolean flag for HTTPProxy
        // BackToHome: true,      // Boolean flag for BackToHome
      };

      starContext.updateChoose$({
        Networks: {
          ...starContext.state.Choose.Networks,
          VPNServerNetworks: vpnServerNetworks,
        },
      });

      if (onComplete) {
        await onComplete();
      }
    }
  );

  return {
    // Certificate state
    certificatePassphrase,
    showPassphrase,
    passphraseError,
    updatePassphrase$,
    togglePassphraseVisibility$,

    // User state
    users,
    usernameErrors,
    passwordErrors,
    addUser,
    removeUser,
    handleUsernameChange,
    handlePasswordChange,
    handleProtocolToggle,

    // Overall state
    vpnServerEnabled,
    isValid,
    saveSettings,
  };
};