import { useContext, $, useSignal, useStore, useTask$ } from "@builder.io/qwik";
import { StarContext } from "../../../StarContext/StarContext";
import type { Networks, VPNType } from "../../../StarContext/CommonType";
import type { Credentials } from "../../../StarContext/Utils/VPNServerType";
import type { QRL } from "@builder.io/qwik";

export const useVPNServerEasy = () => {
  const starContext = useContext(StarContext);
  const vpnServerState = starContext.state.LAN.VPNServer || {
    Users: [],
    SelectedNetworks: ["VPN"],
    CertificatePassphrase: "",
  };

  // Certificate passphrase state
  const certificatePassphrase = useSignal(
    vpnServerState.CertificatePassphrase || ""
  );
  const showPassphrase = useSignal(false);
  const passphraseError = useSignal("");

  // Network selection state
  const selectedNetworks = useStore<Networks[]>(
    vpnServerState.SelectedNetworks || ["VPN"]
  );

  // User management state
  const users = useStore<Credentials[]>(
    vpnServerState.Users.length > 0
      ? vpnServerState.Users
      : [
          {
            Username: "",
            Password: "",
            VPNType: ["OpenVPN", "Wireguard"] as VPNType[],
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

  // Network selection handlers
  const toggleNetwork$ = $((network: Networks) => {
    const index = selectedNetworks.indexOf(network);
    if (index >= 0) {
      // Don't allow removing the last network
      if (selectedNetworks.length > 1) {
        selectedNetworks.splice(index, 1);
      }
    } else {
      selectedNetworks.push(network);
    }
  });

  // User management functions
  const addUser = $(() => {
    users.push({
      Username: "",
      Password: "",
      VPNType: ["OpenVPN", "Wireguard"] as VPNType[],
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

    // Networks are automatically defaulted to ["VPN"] in easy mode
    isValid.value = hasValidPassphrase && hasValidUsers;
  });

  // Save settings to context
  const saveSettings = $(
    async (onComplete?: QRL<() => void>) => {
      if (!isValid.value) {
        console.error("Validation failed. Cannot save settings.");
        return;
      }

      // Enable default protocols for easy mode
      const defaultProtocols = {
        OpenVpnServer: [
          {
            enabled: true,
            name: "default",
            Port: 1194,
            Protocol: "tcp" as const,
            Mode: "ethernet" as const,
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
              Name: "wg0",
              PrivateKey: "",
              InterfaceAddress: "10.0.0.1/24",
              ListenPort: 51820,
            },
            Peers: [],
          },
        ],
      };

      await starContext.updateLAN$({
        VPNServer: {
          ...vpnServerState,
          Users: users,
          SelectedNetworks: selectedNetworks,
          CertificatePassphrase: certificatePassphrase.value,
          ...defaultProtocols,
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

    // Network state
    selectedNetworks,
    toggleNetwork$,

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