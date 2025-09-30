import { useContext, $, useSignal, useStore, useTask$ } from "@builder.io/qwik";
import { track } from "@vercel/analytics";
import { StarContext } from "../../../StarContext/StarContext";
import type { VPNType, Networks } from "../../../StarContext/CommonType";
import type { QRL } from "@builder.io/qwik";

// Import protocol hooks for default configuration
import { usePPTPServer } from "../Protocols/PPTP/usePPTPServer";
import { useL2TPServer } from "../Protocols/L2TP/useL2TPServer";
import { useSSTPServer } from "../Protocols/SSTP/useSSTPServer";
import { useOpenVPNServer } from "../Protocols/OpenVPN/useOpenVPNServer";
import { useIKEv2Server } from "../Protocols/IKeV2/useIKEv2Server";
import { useWireguardServer } from "../Protocols/Wireguard/useWireguardServer";

// Import the new user management hook
import { useUserManagement } from "../UserCredential/useUserCredential";

export const useVPNServerAdvanced = () => {
  const starContext = useContext(StarContext);
  const vpnServerState = starContext.state.LAN.VPNServer || { 
    Users: []
  };

  // === PROTOCOL HOOKS FOR DEFAULT CONFIGS ===
  const pptpHook = usePPTPServer();
  const l2tpHook = useL2TPServer();
  const sstpHook = useSSTPServer();
  const openVpnHook = useOpenVPNServer();
  const ikev2Hook = useIKEv2Server();
  const wireguardHook = useWireguardServer();

  // === USER MANAGEMENT (delegated to useUserManagement hook) ===
  const userManagement = useUserManagement();

  // === VPN SERVER STATE ===
  const vpnServerEnabled = useSignal(true);
  const isValid = useSignal(true);

  // === NETWORK SELECTION STATE ===
  const selectedNetworks = useStore<Networks[]>(["VPN"]);

  // === PROTOCOL ENABLING/DISABLING ===
  const enabledProtocols = useStore<Record<VPNType, boolean>>({
    Wireguard: (vpnServerState.WireguardServers?.length || 0) > 0,
    OpenVPN: !!vpnServerState.OpenVpnServer?.[0]?.enabled || false,
    PPTP: !!vpnServerState.PptpServer?.enabled || false,
    L2TP: !!vpnServerState.L2tpServer?.enabled || false,
    SSTP: !!vpnServerState.SstpServer?.enabled || false,
    IKeV2: !!vpnServerState.Ikev2Server || false,
    Socks5: false,
    SSH: false,
    HTTPProxy: false,
    BackToHome: false,
    ZeroTier: false,
  });

  // === UI STATE ===
  const expandedSections = useStore<Record<string, boolean>>({
    users: true,
    protocols: true,
    pptp: false,
    l2tp: false,
    sstp: false,
    ikev2: false,
    openvpn: false,
    wireguard: false,
  });

  // === VALIDATION TASK ===
  useTask$(({ track }) => {
    track(() => vpnServerEnabled.value);
    track(() => enabledProtocols.Wireguard);
    track(() => enabledProtocols.OpenVPN);
    track(() => enabledProtocols.PPTP);
    track(() => enabledProtocols.L2TP);
    track(() => enabledProtocols.SSTP);
    track(() => enabledProtocols.IKeV2);
    track(() => userManagement.users);
    track(() => userManagement.isValid);

    if (!vpnServerEnabled.value) {
      isValid.value = true;
      return;
    }

    const hasEnabledProtocol = Object.values(enabledProtocols).some(
      (value) => value,
    );

    // Use user management validation
    const hasValidUsers = userManagement.isValid.value;

    isValid.value = hasEnabledProtocol && hasValidUsers;
  });

  // === UI ACTIONS ===
  const toggleSection = $((section: string) => {
    expandedSections[section] = !expandedSections[section];
  });

  const toggleNetwork = $((network: Networks) => {
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

  const toggleProtocol = $(async (protocol: VPNType) => {
    const wasEnabled = enabledProtocols[protocol];

    // Toggle the protocol state
    enabledProtocols[protocol] = !enabledProtocols[protocol];

    // Update expand sections based on new state
    if (!enabledProtocols[protocol]) {
      expandedSections[protocol.toLowerCase()] = false;
    } else {
      expandedSections[protocol.toLowerCase()] = true;

      // Ensure default configuration when enabling a protocol
      if (!wasEnabled) {
        switch (protocol) {
          case "PPTP":
            await pptpHook.ensureDefaultConfig();
            break;
          case "L2TP":
            await l2tpHook.ensureDefaultConfig();
            break;
          case "SSTP":
            await sstpHook.ensureDefaultConfig();
            break;
          case "OpenVPN":
            await openVpnHook.ensureDefaultConfig();
            break;
          case "IKeV2":
            await ikev2Hook.ensureDefaultConfig();
            break;
          case "Wireguard":
            await wireguardHook.ensureDefaultConfig();
            break;
        }
      }
    }
  });

  const toggleVpnServerEnabled = $(() => {
    vpnServerEnabled.value = !vpnServerEnabled.value;
  });

  // === SAVE SETTINGS ===
  const saveSettings = $((onComplete$?: QRL<() => void>) => {
    if (vpnServerEnabled.value) {
      // Save users first using the user management hook
      userManagement.saveUsers();

      // Grab the latest VPN server configuration from StarContext to avoid stale references
      const latestConfig = {
        ...(starContext.state.LAN.VPNServer || { Users: [] }),
      } as any;

      // Track which protocols are being enabled
      const enabledProtocolsList = Object.entries(enabledProtocols)
        .filter(([, enabled]) => enabled)
        .map(([protocol]) => protocol);

      // Start with latest config and update users and selected networks
      latestConfig.Users = userManagement.users;
      latestConfig.SelectedNetworks = selectedNetworks;

      // Conditionally include or exclude each protocol based on toggle state
      if (!enabledProtocols.PPTP) {
        latestConfig.PptpServer = undefined;
      } else {
        latestConfig.PptpServer = pptpHook.pptpState;
      }

      if (!enabledProtocols.L2TP) {
        latestConfig.L2tpServer = undefined;
      } else {
        latestConfig.L2tpServer = l2tpHook.l2tpState;
      }

      if (!enabledProtocols.SSTP) {
        latestConfig.SstpServer = undefined;
      } else {
        latestConfig.SstpServer = sstpHook.sstpState;
      }

      // Always preserve any existing OpenVPN configuration. The OpenVPN hook keeps this up-to-date.

      if (!enabledProtocols.IKeV2) {
        latestConfig.Ikev2Server = undefined;
      } else {
        latestConfig.Ikev2Server = ikev2Hook.ikev2State;
      }

      if (!enabledProtocols.Wireguard) {
        latestConfig.WireguardServers = undefined;
      } else {
        latestConfig.WireguardServers = [wireguardHook.wireguardState];
      }

      // Track VPN server configuration completion
      track("vpn_server_configured", {
        vpn_server_enabled: true,
        enabled_protocols: enabledProtocolsList.join(","),
        protocol_count: enabledProtocolsList.length,
        user_count: userManagement.users.length,
        step: "lan_config",
        component: "vpn_server",
        configuration_completed: true,
        success: true,
      });

      // Finally persist into StarContext
      starContext.updateLAN$({ VPNServer: latestConfig });
    } else {
      // Track VPN server disabled
      track("vpn_server_configured", {
        vpn_server_enabled: false,
        enabled_protocols: "none",
        protocol_count: 0,
        user_count: 0,
        step: "lan_config",
        component: "vpn_server",
        configuration_completed: true,
        success: true,
      });

      // Disable all VPN server configurations
      starContext.updateLAN$({
        VPNServer: {
          Users: [],
          PptpServer: undefined,
          L2tpServer: undefined,
          SstpServer: undefined,
          OpenVpnServer: undefined,
          Ikev2Server: undefined,
          WireguardServers: undefined,
        },
      });
    }

    if (onComplete$) {
      onComplete$();
    }
  });

  return {
    // === STATE ===
    users: userManagement.users,
    vpnServerEnabled,
    usernameErrors: userManagement.usernameErrors,
    isValid,
    enabledProtocols,
    expandedSections,
    selectedNetworks,

    // === USER MANAGEMENT ACTIONS (delegated to useUserManagement hook) ===
    addUser: userManagement.addUser,
    removeUser: userManagement.removeUser,
    handleUsernameChange: userManagement.handleUsernameChange,
    handlePasswordChange: userManagement.handlePasswordChange,
    handleProtocolToggle: userManagement.handleProtocolToggle,

    // === UI ACTIONS ===
    toggleSection,
    toggleProtocol,
    toggleNetwork,
    toggleVpnServerEnabled,

    // === SAVE ===
    saveSettings,
  };
};
