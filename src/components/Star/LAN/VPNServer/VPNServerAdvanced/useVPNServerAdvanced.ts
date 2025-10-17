import { useContext, $, useSignal, useStore, useTask$ } from "@builder.io/qwik";
import { track } from "@vercel/analytics";
import { StarContext } from "~/components/Star/StarContext";
import type { VPNType, BaseNetworksType } from "~/components/Star/StarContext";
import type { QRL } from "@builder.io/qwik";

// Import protocol hooks for default configuration
import { usePPTPServer } from "../Protocols/PPTP/usePPTPServer";
import { useL2TPServer } from "../Protocols/L2TP/useL2TPServer";
import { useSSTPServer } from "../Protocols/SSTP/useSSTPServer";
import { useOpenVPNServer } from "../Protocols/OpenVPN/useOpenVPNServer";
import { useIKEv2Server } from "../Protocols/IKeV2/useIKEv2Server";
import { useWireguardServer } from "../Protocols/Wireguard/useWireguardServer";
import { useSocks5Server } from "../Protocols/Socks5/useSocks5Server";
import { useHTTPProxyServer } from "../Protocols/HTTPProxy/useHTTPProxyServer";
import { useSSHServer } from "../Protocols/SSH/useSSHServer";
import { useBackToHomeServer } from "../Protocols/BackToHome/useBackToHomeServer";
import { useZeroTierServer } from "../Protocols/ZeroTier/useZeroTierServer";

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
  const socks5Hook = useSocks5Server();
  const httpProxyHook = useHTTPProxyServer();
  const sshHook = useSSHServer();
  const backToHomeHook = useBackToHomeServer();
  const zeroTierHook = useZeroTierServer();

  // === USER MANAGEMENT (delegated to useUserManagement hook) ===
  const userManagement = useUserManagement();

  // === VPN SERVER STATE ===
  const vpnServerEnabled = useSignal(true);
  const isValid = useSignal(true);

  // === NETWORK SELECTION STATE ===
  const selectedNetworks = useStore<BaseNetworksType[]>(["VPN"]);

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

  const toggleNetwork = $((network: BaseNetworksType) => {
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
          case "Socks5":
            await socks5Hook.ensureDefaultConfig();
            break;
          case "HTTPProxy":
            await httpProxyHook.ensureDefaultConfig();
            break;
          case "SSH":
            await sshHook.ensureDefaultConfig();
            break;
          case "BackToHome":
            await backToHomeHook.ensureDefaultConfig();
            break;
          case "ZeroTier":
            await zeroTierHook.ensureDefaultConfig();
            break;
        }
      }
    }
  });

  const toggleVpnServerEnabled = $(() => {
    vpnServerEnabled.value = !vpnServerEnabled.value;
  });

  // === SAVE SETTINGS ===
  const saveSettings = $(async (onComplete$?: QRL<() => void>) => {
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

      // Start with latest config and update users
      latestConfig.Users = userManagement.users;
      // Remove SelectedNetworks (not part of StarContext types)
      if (latestConfig.SelectedNetworks) {
        delete latestConfig.SelectedNetworks;
      }

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

      if (!enabledProtocols.OpenVPN) {
        latestConfig.OpenVpnServer = undefined;
      } else {
        // Save all OpenVPN tabs' configurations
        try {
          const openVpnResult = await openVpnHook.saveAllServers$();
          // After saving, get the updated servers from StarContext
          // IMPORTANT: Get the fresh state after saveAllServers$ has updated it
          const freshVPNState = starContext.state.LAN.VPNServer || { Users: [] };
          latestConfig.OpenVpnServer = freshVPNState.OpenVpnServer || [];
          // Log validation results
          if (openVpnResult.errors.length > 0) {
            console.warn("OpenVPN validation errors:", openVpnResult.errors);
          }
          console.log(`OpenVPN: Saved ${openVpnResult.saved} of ${openVpnResult.total} tabs`);
          console.log(`OpenVPN servers in latestConfig:`, latestConfig.OpenVpnServer?.map((s: any) => s.name));
        } catch (error) {
          console.error("Error saving OpenVPN servers:", error);
          // Fallback to existing state
          latestConfig.OpenVpnServer = (starContext.state.LAN.VPNServer as any)?.OpenVpnServer || [];
        }
      }

      if (!enabledProtocols.IKeV2) {
        latestConfig.Ikev2Server = undefined;
      } else {
        latestConfig.Ikev2Server = ikev2Hook.ikev2State;
      }

      if (!enabledProtocols.Wireguard) {
        latestConfig.WireguardServers = undefined;
      } else {
        // Save all Wireguard tabs' configurations
        try {
          const wireguardResult = await wireguardHook.saveAllServers$();
          // After saving, get the updated servers from StarContext
          // IMPORTANT: Get the fresh state after saveAllServers$ has updated it
          const freshVPNState = starContext.state.LAN.VPNServer || { Users: [] };
          latestConfig.WireguardServers = freshVPNState.WireguardServers || [];
          // Log validation results
          if (wireguardResult.errors.length > 0) {
            console.warn("Wireguard validation errors:", wireguardResult.errors);
          }
          console.log(`Wireguard: Saved ${wireguardResult.saved} of ${wireguardResult.total} tabs`);
          console.log(`Wireguard servers in latestConfig:`, latestConfig.WireguardServers?.map((s: any) => s.Interface?.Name));
        } catch (error) {
          console.error("Error saving WireGuard servers:", error);
          // Fallback to existing state
          latestConfig.WireguardServers = (starContext.state.LAN.VPNServer as any)?.WireguardServers || [];
        }
      }

      // Additional protocols persistence
      if (!enabledProtocols.Socks5) {
        latestConfig.Socks5Server = undefined;
      } else {
        latestConfig.Socks5Server = (starContext.state.LAN.VPNServer as any)?.Socks5Server || socks5Hook.advancedFormState;
      }

      if (!enabledProtocols.SSH) {
        latestConfig.SSHServer = undefined;
      } else {
        latestConfig.SSHServer = (starContext.state.LAN.VPNServer as any)?.SSHServer || sshHook.advancedFormState;
      }

      if (!enabledProtocols.HTTPProxy) {
        latestConfig.HTTPProxyServer = undefined;
      } else {
        latestConfig.HTTPProxyServer = (starContext.state.LAN.VPNServer as any)?.HTTPProxyServer || httpProxyHook.advancedFormState;
      }

      if (!enabledProtocols.BackToHome) {
        latestConfig.BackToHomeServer = undefined;
      } else {
        latestConfig.BackToHomeServer = (starContext.state.LAN.VPNServer as any)?.BackToHomeServer || backToHomeHook.advancedFormState;
      }

      if (!enabledProtocols.ZeroTier) {
        latestConfig.ZeroTierServer = undefined;
      } else {
        latestConfig.ZeroTierServer = (starContext.state.LAN.VPNServer as any)?.ZeroTierServer || zeroTierHook.advancedFormState;
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

      // Update Networks state with VPN Server interface names and enabled status
      const vpnServerNetworks: Record<string, boolean | string[]> = {};

      // Multi-instance protocols: Store interface names
      // Use latestConfig which contains all the saved servers
      if (enabledProtocols.Wireguard && latestConfig.WireguardServers) {
        vpnServerNetworks.Wireguard = latestConfig.WireguardServers
          .map((server: any) => server.Interface?.Name)
          .filter((name: string) => name);
        console.log("Networks - Wireguard servers:", vpnServerNetworks.Wireguard);
      }

      if (enabledProtocols.OpenVPN && latestConfig.OpenVpnServer && latestConfig.OpenVpnServer.length > 0) {
        // Map all OpenVPN server names, including both TCP and UDP when "Both" protocol is selected
        vpnServerNetworks.OpenVPN = latestConfig.OpenVpnServer
          .map((server: any) => server.name)
          .filter((name: string) => !!name);
        console.log("Networks - OpenVPN servers:", vpnServerNetworks.OpenVPN);
      }

      // Single-instance protocols: Store enabled status (boolean)
      if (enabledProtocols.PPTP && latestConfig.PptpServer) {
        vpnServerNetworks.PPTP = true;
      }

      if (enabledProtocols.L2TP && latestConfig.L2tpServer) {
        vpnServerNetworks.L2TP = true;
      }

      if (enabledProtocols.SSTP && latestConfig.SstpServer) {
        vpnServerNetworks.SSTP = true;
      }

      if (enabledProtocols.IKeV2 && latestConfig.Ikev2Server) {
        vpnServerNetworks.IKev2 = true;
      }

      if (enabledProtocols.Socks5 && latestConfig.Socks5Server) {
        vpnServerNetworks.Socks5 = true;
      }

      if (enabledProtocols.SSH && latestConfig.SSHServer) {
        vpnServerNetworks.SSH = true;
      }

      if (enabledProtocols.HTTPProxy && latestConfig.HTTPProxyServer) {
        vpnServerNetworks.HTTPProxy = true;
      }

      if (enabledProtocols.BackToHome && latestConfig.BackToHomeServer) {
        vpnServerNetworks.BackToHome = true;
      }

      if (enabledProtocols.ZeroTier && latestConfig.ZeroTierServer) {
        vpnServerNetworks.ZeroTier = true;
      }

      // Update Choose.Networks with VPNServerNetworks
      console.log("Updating Choose.Networks with VPNServerNetworks:", vpnServerNetworks);
      starContext.updateChoose$({
        Networks: {
          ...starContext.state.Choose.Networks,
          VPNServerNetworks: vpnServerNetworks,
        },
      });
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

      // Clear VPNServerNetworks from Choose.Networks
      starContext.updateChoose$({
        Networks: {
          ...starContext.state.Choose.Networks,
          VPNServerNetworks: undefined,
        },
      });
    }

    if (onComplete$) {
      await onComplete$();
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

    // === PROTOCOL HOOKS (for passing to child components) ===
    vpnHooks: {
      openVpn: openVpnHook,
      wireguard: wireguardHook,
    },
  };
};
