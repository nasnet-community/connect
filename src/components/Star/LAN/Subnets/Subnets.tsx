import {
  component$,
  useContext,
  useSignal,
  useComputed$,
  $,
  useTask$,
} from "@builder.io/qwik";
import { StarContext } from "~/components/Star/StarContext/StarContext";
import {
  Card,
  CardFooter,
  Button,
  GradientHeader,
  Alert,
} from "~/components/Core";
import type { StepProps } from "~/types/step";
import {
  LuShield,
  LuNetwork,
  LuRoute,
  LuCheckCircle,
  LuAlertTriangle,
  LuHome,
  LuGlobe,
  LuLock,
  LuInfo,
} from "@qwikest/icons/lucide";
import { TabContent } from "./TabContent";
import { useSubnets } from "./useSubnets";

export const Subnets = component$<StepProps>(({ onComplete$, onDisabled$ }) => {
  const starContext = useContext(StarContext);

  // Check if subnets are already configured
  const _hasSubnetsConfigured = !!(
    starContext.state.LAN.Subnets &&
    Object.keys(starContext.state.LAN.Subnets).length > 0
  );

  // Enable/disable state - always disabled by default
  const subnetsEnabled = useSignal(false);

  // Active tab state
  const activeTab = useSignal("base");

  // Use custom hook for subnet logic
  const {
    groupedConfigs,
    values,
    errors,
    isValid,
    handleChange$,
    validateAll$,
  } = useSubnets();

  // Type assertion for the new categories
  const extendedGroupedConfigs = groupedConfigs as any;
  const chooseNetworks = starContext.state.Choose.Networks;
  const domesticNetworks = chooseNetworks.DomesticNetworks;
  const foreignNetworks = chooseNetworks.ForeignNetworks;
  const vpnClientNetworks = chooseNetworks.VPNClientNetworks;
  const vpnServerNetworks = chooseNetworks.VPNServerNetworks;
  const vpnServerState = starContext.state.LAN.VPNServer;

  // Create tabs configuration based on available subnets - make it reactive
  const tabs = useComputed$(() => {
    const tabList: Array<{
      id: string;
      label: string;
      icon: any;
      count: number;
    }> = [];

    // Always show base tab
    if (extendedGroupedConfigs.base?.length > 0) {
      tabList.push({
        id: "base",
        label: $localize`Base`,
        icon: <LuNetwork class="h-4 w-4" />,
        count: extendedGroupedConfigs.base.filter(
          (c: any) => values.value[c.key] !== null,
        ).length,
      });
    }

    // Show domestic tab if there are multiple domestic WAN links
    if (extendedGroupedConfigs["wan-domestic"]?.length > 0) {
      tabList.push({
        id: "wan-domestic",
        label: $localize`Domestic`,
        icon: <LuHome class="h-4 w-4" />,
        count: extendedGroupedConfigs["wan-domestic"].filter(
          (c: any) => values.value[c.key] !== null,
        ).length,
      });
    }

    // Show foreign tab if there are multiple foreign WAN links
    if (extendedGroupedConfigs["wan-foreign"]?.length > 0) {
      tabList.push({
        id: "wan-foreign",
        label: $localize`Foreign`,
        icon: <LuGlobe class="h-4 w-4" />,
        count: extendedGroupedConfigs["wan-foreign"].filter(
          (c: any) => values.value[c.key] !== null,
        ).length,
      });
    }

    // Show VPN Client tab if there are multiple VPN clients
    if (extendedGroupedConfigs["vpn-client"]?.length > 0) {
      tabList.push({
        id: "vpn-client",
        label: $localize`VPN Client`,
        icon: <LuLock class="h-4 w-4" />,
        count: extendedGroupedConfigs["vpn-client"].filter(
          (c: any) => values.value[c.key] !== null,
        ).length,
      });
    }

    // Show VPN Server tab if there are VPN servers configured
    if (extendedGroupedConfigs.vpn?.length > 0) {
      tabList.push({
        id: "vpn",
        label: $localize`VPN Server`,
        icon: <LuShield class="h-4 w-4" />,
        count: extendedGroupedConfigs.vpn.filter(
          (c: any) => values.value[c.key] !== null,
        ).length,
      });
    }

    // Show Tunnel tab if there are tunnels configured
    if (extendedGroupedConfigs.tunnel?.length > 0) {
      tabList.push({
        id: "tunnel",
        label: $localize`Tunnel`,
        icon: <LuRoute class="h-4 w-4" />,
        count: extendedGroupedConfigs.tunnel.filter(
          (c: any) => values.value[c.key] !== null,
        ).length,
      });
    }

    return tabList;
  });

  // Initialize/adjust active tab when tabs change (no mutations in useComputed$)
  useTask$(({ track }) => {
    track(() => tabs.value);
    if (tabs.value.length > 0) {
      const currentTabExists = tabs.value.some(
        (tab) => tab.id === activeTab.value,
      );
      if (!currentTabExists) {
        activeTab.value = tabs.value[0].id;
      }
    }
  });

  // Handle tab selection
  const handleTabSelect$ = $((tabId: string) => {
    activeTab.value = tabId;
  });

  // Handle save with modern error handling
  const handleSave$ = $(async () => {
    if (!subnetsEnabled.value) {
      // Build default subnets using placeholder values when disabled
      const createSubnetConfig = (
        name: string,
        value: number,
        mask: number,
      ) => ({
        name,
        subnet: `192.168.${value}.0/${mask}`,
      });

      const defaultSubnets: any = {
        BaseSubnets: {},
        ForeignSubnets: [],
        DomesticSubnets: [],
        VPNClientSubnets: {},
        VPNServerSubnets: {},
        TunnelSubnets: {},
      };

      // Process all configs with their default placeholder values
      extendedGroupedConfigs.base?.forEach((config: any) => {
        defaultSubnets.BaseSubnets[config.key] = createSubnetConfig(
          config.key,
          config.placeholder,
          config.mask,
        );
      });

      extendedGroupedConfigs["wan-domestic"]?.forEach((config: any) => {
        defaultSubnets.DomesticSubnets.push(
          createSubnetConfig(config.label, config.placeholder, config.mask),
        );
      });

      extendedGroupedConfigs["wan-foreign"]?.forEach((config: any) => {
        defaultSubnets.ForeignSubnets.push(
          createSubnetConfig(config.label, config.placeholder, config.mask),
        );
      });

      // VPN Client networks - organize by protocol
      const vpnClientsByProtocol: Record<string, any[]> = {
        Wireguard: [],
        OpenVPN: [],
        PPTP: [],
        L2TP: [],
        SSTP: [],
        IKev2: [],
      };

      const networks = starContext.state.Choose.Networks;
      const vpnClientNetworks = networks.VPNClientNetworks;
      const vpnServerNetworks = networks.VPNServerNetworks;
      const tunnelNetworks = networks.TunnelNetworks;
      let vpnClientIndex = 0;

      // Map VPN client configs to protocols using the same order as in useSubnets
      extendedGroupedConfigs["vpn-client"]?.forEach((config: any) => {
        vpnClientIndex++;
        const placeholder = 41 + vpnClientIndex - 1;

        // Determine protocol based on Networks configuration
        let protocol = "";
        let _protocolIndex = 0;

        if (vpnClientNetworks?.Wireguard?.length) {
          if (vpnClientIndex <= vpnClientNetworks.Wireguard.length) {
            protocol = "Wireguard";
            _protocolIndex = vpnClientIndex - 1;
          }
        }
        let currentCount = vpnClientNetworks?.Wireguard?.length || 0;

        if (!protocol && vpnClientNetworks?.OpenVPN?.length) {
          if (
            vpnClientIndex <=
            currentCount + vpnClientNetworks.OpenVPN.length
          ) {
            protocol = "OpenVPN";
            _protocolIndex = vpnClientIndex - currentCount - 1;
          }
          currentCount += vpnClientNetworks.OpenVPN.length;
        }

        if (!protocol && vpnClientNetworks?.L2TP?.length) {
          if (vpnClientIndex <= currentCount + vpnClientNetworks.L2TP.length) {
            protocol = "L2TP";
            _protocolIndex = vpnClientIndex - currentCount - 1;
          }
          currentCount += vpnClientNetworks.L2TP.length;
        }

        if (!protocol && vpnClientNetworks?.PPTP?.length) {
          if (vpnClientIndex <= currentCount + vpnClientNetworks.PPTP.length) {
            protocol = "PPTP";
            _protocolIndex = vpnClientIndex - currentCount - 1;
          }
          currentCount += vpnClientNetworks.PPTP.length;
        }

        if (!protocol && vpnClientNetworks?.SSTP?.length) {
          if (vpnClientIndex <= currentCount + vpnClientNetworks.SSTP.length) {
            protocol = "SSTP";
            _protocolIndex = vpnClientIndex - currentCount - 1;
          }
          currentCount += vpnClientNetworks.SSTP.length;
        }

        if (!protocol && vpnClientNetworks?.IKev2?.length) {
          protocol = "IKev2";
          _protocolIndex = vpnClientIndex - currentCount - 1;
        }

        if (protocol) {
          vpnClientsByProtocol[protocol].push(
            createSubnetConfig(config.label, placeholder, config.mask),
          );
        }
      });

      Object.entries(vpnClientsByProtocol).forEach(([protocol, configs]) => {
        if (configs.length > 0) {
          defaultSubnets.VPNClientSubnets[protocol] = configs;
        }
      });

      // VPN Server networks
      extendedGroupedConfigs.vpn?.forEach((config: any) => {
        const subnetConfig = createSubnetConfig(
          config.label,
          config.placeholder,
          config.mask,
        );

        // Check if it's an array protocol (Wireguard, OpenVPN)
        if (
          vpnServerNetworks?.Wireguard?.some(
            (name: string) => name === config.key,
          )
        ) {
          if (!defaultSubnets.VPNServerSubnets.Wireguard) {
            defaultSubnets.VPNServerSubnets.Wireguard = [];
          }
          defaultSubnets.VPNServerSubnets.Wireguard.push(subnetConfig);
        } else if (
          vpnServerNetworks?.OpenVPN?.some(
            (name: string) => name === config.key,
          )
        ) {
          if (!defaultSubnets.VPNServerSubnets.OpenVPN) {
            defaultSubnets.VPNServerSubnets.OpenVPN = [];
          }
          defaultSubnets.VPNServerSubnets.OpenVPN.push(subnetConfig);
        } else {
          // Single server protocols
          defaultSubnets.VPNServerSubnets[config.key] = subnetConfig;
        }
      });

      // Tunnel networks
      extendedGroupedConfigs.tunnel?.forEach((config: any) => {
        const subnetConfig = createSubnetConfig(
          config.label,
          config.placeholder,
          config.mask,
        );

        // Determine tunnel type from Networks
        if (tunnelNetworks?.IPIP?.some((name: string) => name === config.key)) {
          if (!defaultSubnets.TunnelSubnets.IPIP) {
            defaultSubnets.TunnelSubnets.IPIP = [];
          }
          defaultSubnets.TunnelSubnets.IPIP.push(subnetConfig);
        } else if (
          tunnelNetworks?.Eoip?.some((name: string) => name === config.key)
        ) {
          if (!defaultSubnets.TunnelSubnets.Eoip) {
            defaultSubnets.TunnelSubnets.Eoip = [];
          }
          defaultSubnets.TunnelSubnets.Eoip.push(subnetConfig);
        } else if (
          tunnelNetworks?.Gre?.some((name: string) => name === config.key)
        ) {
          if (!defaultSubnets.TunnelSubnets.Gre) {
            defaultSubnets.TunnelSubnets.Gre = [];
          }
          defaultSubnets.TunnelSubnets.Gre.push(subnetConfig);
        } else if (
          tunnelNetworks?.Vxlan?.some((name: string) => name === config.key)
        ) {
          if (!defaultSubnets.TunnelSubnets.Vxlan) {
            defaultSubnets.TunnelSubnets.Vxlan = [];
          }
          defaultSubnets.TunnelSubnets.Vxlan.push(subnetConfig);
        }
      });

      // Clean up empty sections
      if (Object.keys(defaultSubnets.BaseSubnets).length === 0)
        delete defaultSubnets.BaseSubnets;
      if (defaultSubnets.ForeignSubnets.length === 0)
        delete defaultSubnets.ForeignSubnets;
      if (defaultSubnets.DomesticSubnets.length === 0)
        delete defaultSubnets.DomesticSubnets;
      if (Object.keys(defaultSubnets.VPNClientSubnets).length === 0)
        delete defaultSubnets.VPNClientSubnets;
      if (Object.keys(defaultSubnets.VPNServerSubnets).length === 0)
        delete defaultSubnets.VPNServerSubnets;
      if (Object.keys(defaultSubnets.TunnelSubnets).length === 0)
        delete defaultSubnets.TunnelSubnets;

      await starContext.updateLAN$({ Subnets: defaultSubnets as any });
      onComplete$();
      return;
    }

    const isValidationPassed = await validateAll$();
    if (!isValidationPassed) {
      return;
    }

    // Helper to create SubnetConfig object
    const createSubnetConfig = (name: string, value: number, mask: number) => ({
      name,
      subnet: `192.168.${value}.0/${mask}`,
    });

    // Initialize structured subnets object
    const finalSubnets: any = {
      BaseSubnets: {},
      ForeignSubnets: [],
      DomesticSubnets: [],
      VPNClientSubnets: {},
      VPNServerSubnets: {},
      TunnelSubnets: {},
    };

    // Process base networks
    extendedGroupedConfigs.base.forEach((config: any) => {
      const value = values.value[config.key];
      if (value !== null) {
        finalSubnets.BaseSubnets[config.key] = createSubnetConfig(
          config.key,
          value,
          config.mask,
        );
      } else if (config.isRequired) {
        finalSubnets.BaseSubnets[config.key] = createSubnetConfig(
          config.key,
          config.placeholder,
          config.mask,
        );
      }
    });

    // Process domestic WAN networks
    extendedGroupedConfigs["wan-domestic"]?.forEach((config: any) => {
      const value = values.value[config.key];
      if (value !== null) {
        finalSubnets.DomesticSubnets.push(
          createSubnetConfig(config.label, value, config.mask),
        );
      } else if (config.isRequired) {
        finalSubnets.DomesticSubnets.push(
          createSubnetConfig(config.label, config.placeholder, config.mask),
        );
      }
    });

    // Process foreign WAN networks
    extendedGroupedConfigs["wan-foreign"]?.forEach((config: any) => {
      const value = values.value[config.key];
      if (value !== null) {
        finalSubnets.ForeignSubnets.push(
          createSubnetConfig(config.label, value, config.mask),
        );
      } else if (config.isRequired) {
        finalSubnets.ForeignSubnets.push(
          createSubnetConfig(config.label, config.placeholder, config.mask),
        );
      }
    });

    // Process VPN client networks - organize by protocol
    const vpnClientsByProtocol: Record<string, any[]> = {
      Wireguard: [],
      OpenVPN: [],
      PPTP: [],
      L2TP: [],
      SSTP: [],
      IKev2: [],
    };

    extendedGroupedConfigs["vpn-client"]?.forEach(
      (config: any, index: number) => {
        const value = values.value[config.key];
        const vpnClients = starContext.state.WAN.VPNClient;

        // Determine protocol from the index by counting clients in order
        let currentIndex = 0;
        let protocol = "";

        if (vpnClients?.Wireguard?.length) {
          if (index < currentIndex + vpnClients.Wireguard.length) {
            protocol = "Wireguard";
          }
          currentIndex += vpnClients.Wireguard.length;
        }
        if (!protocol && vpnClients?.OpenVPN?.length) {
          if (index < currentIndex + vpnClients.OpenVPN.length) {
            protocol = "OpenVPN";
          }
          currentIndex += vpnClients.OpenVPN.length;
        }
        if (!protocol && vpnClients?.PPTP?.length) {
          if (index < currentIndex + vpnClients.PPTP.length) {
            protocol = "PPTP";
          }
          currentIndex += vpnClients.PPTP.length;
        }
        if (!protocol && vpnClients?.L2TP?.length) {
          if (index < currentIndex + vpnClients.L2TP.length) {
            protocol = "L2TP";
          }
          currentIndex += vpnClients.L2TP.length;
        }
        if (!protocol && vpnClients?.SSTP?.length) {
          if (index < currentIndex + vpnClients.SSTP.length) {
            protocol = "SSTP";
          }
          currentIndex += vpnClients.SSTP.length;
        }
        if (!protocol && vpnClients?.IKeV2?.length) {
          if (index < currentIndex + vpnClients.IKeV2.length) {
            protocol = "IKev2";
          }
          currentIndex += vpnClients.IKeV2.length;
        }

        if (protocol && value !== null) {
          vpnClientsByProtocol[protocol].push(
            createSubnetConfig(config.label, value, config.mask),
          );
        }
      },
    );

    // Add non-empty protocol arrays to VPNClientSubnets
    Object.entries(vpnClientsByProtocol).forEach(([protocol, configs]) => {
      if (configs.length > 0) {
        finalSubnets.VPNClientSubnets[protocol] = configs;
      }
    });

    // Process VPN server networks - organize by protocol
    const vpnServers = starContext.state.LAN.VPNServer;

    // WireGuard servers (array)
    if (vpnServers?.WireguardServers?.length) {
      const wireguardConfigs: any[] = [];
      vpnServers.WireguardServers.forEach((server, index) => {
        const serverName = server.Interface.Name || `WireGuard${index + 1}`;
        const value = values.value[serverName];
        if (value !== null) {
          wireguardConfigs.push(createSubnetConfig(serverName, value, 24));
        }
      });
      if (wireguardConfigs.length > 0) {
        finalSubnets.VPNServerSubnets.Wireguard = wireguardConfigs;
      }
    }

    // OpenVPN servers (array)
    if (vpnServers?.OpenVpnServer?.length) {
      const openvpnConfigs: any[] = [];
      vpnServers.OpenVpnServer.forEach((server, index) => {
        const serverName = server.name || `OpenVPN${index + 1}`;
        const value = values.value[serverName];
        if (value !== null) {
          openvpnConfigs.push(createSubnetConfig(serverName, value, 24));
        }
      });
      if (openvpnConfigs.length > 0) {
        finalSubnets.VPNServerSubnets.OpenVPN = openvpnConfigs;
      }
    }

    // Single server protocols
    const singleServerProtocols = [
      { key: "L2TP", enabled: vpnServers?.L2tpServer?.enabled },
      { key: "PPTP", enabled: vpnServers?.PptpServer?.enabled },
      { key: "SSTP", enabled: vpnServers?.SstpServer?.enabled },
      { key: "IKev2", enabled: vpnServers?.Ikev2Server },
      { key: "SSH", enabled: vpnServers?.SSHServer?.enabled },
      { key: "Socks5", enabled: vpnServers?.Socks5Server?.enabled },
      { key: "HTTPProxy", enabled: vpnServers?.HTTPProxyServer?.enabled },
      { key: "BackToHome", enabled: vpnServers?.BackToHomeServer?.enabled },
      { key: "ZeroTier", enabled: vpnServers?.ZeroTierServer?.enabled },
    ];

    singleServerProtocols.forEach(({ key, enabled }) => {
      if (enabled) {
        const value = values.value[key];
        if (value !== null) {
          finalSubnets.VPNServerSubnets[key] = createSubnetConfig(
            key,
            value,
            24,
          );
        }
      }
    });

    // Process tunnel networks - organize by tunnel type
    const tunnels = starContext.state.LAN.Tunnel;
    const tunnelTypes = [
      { key: "IPIP", configs: tunnels?.IPIP },
      { key: "Eoip", configs: tunnels?.Eoip },
      { key: "Gre", configs: tunnels?.Gre },
      { key: "Vxlan", configs: tunnels?.Vxlan },
    ];

    tunnelTypes.forEach(({ key, configs }) => {
      if (configs?.length) {
        const tunnelConfigs: any[] = [];
        configs.forEach((tunnel: any, index: number) => {
          const tunnelName = tunnel.name || `${key}${index + 1}`;
          const value = values.value[tunnelName];
          if (value !== null) {
            tunnelConfigs.push(createSubnetConfig(tunnelName, value, 30));
          }
        });
        if (tunnelConfigs.length > 0) {
          finalSubnets.TunnelSubnets[key] = tunnelConfigs;
        }
      }
    });

    // Clean up empty sections
    if (Object.keys(finalSubnets.BaseSubnets).length === 0)
      delete finalSubnets.BaseSubnets;
    if (finalSubnets.ForeignSubnets.length === 0)
      delete finalSubnets.ForeignSubnets;
    if (finalSubnets.DomesticSubnets.length === 0)
      delete finalSubnets.DomesticSubnets;
    if (Object.keys(finalSubnets.VPNClientSubnets).length === 0)
      delete finalSubnets.VPNClientSubnets;
    if (Object.keys(finalSubnets.VPNServerSubnets).length === 0)
      delete finalSubnets.VPNServerSubnets;
    if (Object.keys(finalSubnets.TunnelSubnets).length === 0)
      delete finalSubnets.TunnelSubnets;

    // Update context with structured format
    await starContext.updateLAN$({ Subnets: finalSubnets as any });

    // Complete step
    onComplete$();
  });

  return (
    <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-primary-50/50 dark:from-gray-900 dark:via-blue-900/10 dark:to-primary-900/10">
      <div class="container mx-auto w-full max-w-7xl px-6 py-8">
        <div class="space-y-8">
          {/* Modern Header */}
          <GradientHeader
            title={$localize`Network Subnets`}
            description={$localize`Configure IP subnets for your network segments with smart validation and conflict detection`}
            icon={<LuNetwork class="h-10 w-10" />}
            toggleConfig={{
              enabled: subnetsEnabled,
              onChange$: $(async (enabled: boolean) => {
                if (!enabled && onDisabled$) {
                  await onDisabled$();
                }
              }),
              label: $localize`Enable Subnets`,
            }}
            gradient={{
              direction: "to-br",
              from: "primary-50",
              via: "blue-50",
              to: "primary-100",
            }}
            features={[
              { label: $localize`Smart IP validation`, color: "primary-500" },
              { label: $localize`Conflict detection`, color: "green-500" },
              { label: $localize`Auto-suggestions`, color: "blue-500" },
            ]}
            showFeaturesWhen={subnetsEnabled.value}
          />

          {!subnetsEnabled.value ? (
            /* Disabled State with Default Subnet Display */
            <div class="space-y-6">
              <div class="relative overflow-hidden rounded-2xl border border-gray-200 bg-white/60 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/60">
                <div class="absolute inset-0 bg-gradient-to-br from-gray-100/50 to-gray-200/50 dark:from-gray-800/50 dark:to-gray-900/50" />
                <div class="relative z-10 p-8">
                  <div class="mb-6 text-center">
                    <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                      <LuNetwork class="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 class="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-300">
                      {$localize`Using Default Network Configuration`}
                    </h3>
                    <p class="mx-auto max-w-md text-sm text-gray-600 dark:text-gray-400">
                      {$localize`The following default subnets will be used. Enable subnet configuration above to customize these values.`}
                    </p>
                  </div>

                  {/* Default Subnets Display */}
                  <div class="mt-8 space-y-4">
                    {/* Base Networks */}
                    <div class="rounded-lg border border-primary-200 bg-primary-50/50 p-4 dark:border-primary-800 dark:bg-primary-900/20">
                      <h4 class="mb-3 flex items-center gap-2 font-medium text-primary-700 dark:text-primary-300">
                        <LuNetwork class="h-4 w-4" />
                        {$localize`Base Networks`}
                      </h4>
                      <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
                        {starContext.state.Choose.WANLinkType === "domestic" ||
                        starContext.state.Choose.WANLinkType === "both" ? (
                          <>
                            <div class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">
                                {$localize`Split Network`}:
                              </span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">
                                192.168.10.0/24
                              </span>
                            </div>
                            <div class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">
                                {$localize`Domestic Network`}:
                              </span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">
                                192.168.20.0/24
                              </span>
                            </div>
                            <div class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">
                                {$localize`Foreign Network`}:
                              </span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">
                                192.168.30.0/24
                              </span>
                            </div>
                            <div class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">
                                {$localize`VPN Network`}:
                              </span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">
                                192.168.40.0/24
                              </span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">
                                {$localize`VPN Network`}:
                              </span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">
                                192.168.10.0/24
                              </span>
                            </div>
                            <div class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">
                                {$localize`Foreign Network`}:
                              </span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">
                                192.168.30.0/24
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Domestic WAN Networks */}
                    {(domesticNetworks?.length ?? 0) > 0 && (
                      <div class="rounded-lg border border-orange-200 bg-orange-50/50 p-4 dark:border-orange-800 dark:bg-orange-900/20">
                        <h4 class="mb-3 flex items-center gap-2 font-medium text-orange-700 dark:text-orange-300">
                          <LuHome class="h-4 w-4" />
                          {$localize`Domestic WAN Networks`}
                        </h4>
                        <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
                          {domesticNetworks?.map((networkName, index) => (
                            <div
                              key={index}
                              class="flex justify-between text-sm"
                            >
                              <span class="text-gray-600 dark:text-gray-400">
                                {networkName}:
                              </span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">
                                192.168.{21 + index}.0/24
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Foreign WAN Networks */}
                    {(foreignNetworks?.length ?? 0) > 0 && (
                      <div class="rounded-lg border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                        <h4 class="mb-3 flex items-center gap-2 font-medium text-blue-700 dark:text-blue-300">
                          <LuGlobe class="h-4 w-4" />
                          {$localize`Foreign WAN Networks`}
                        </h4>
                        <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
                          {foreignNetworks?.map((networkName, index) => (
                            <div
                              key={index}
                              class="flex justify-between text-sm"
                            >
                              <span class="text-gray-600 dark:text-gray-400">
                                {networkName}:
                              </span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">
                                192.168.{31 + index}.0/24
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* VPN Client Networks */}
                    {((vpnClientNetworks?.Wireguard?.length ?? 0) > 0 ||
                      (vpnClientNetworks?.OpenVPN?.length ?? 0) > 0 ||
                      (vpnClientNetworks?.L2TP?.length ?? 0) > 0 ||
                      (vpnClientNetworks?.PPTP?.length ?? 0) > 0 ||
                      (vpnClientNetworks?.SSTP?.length ?? 0) > 0 ||
                      (vpnClientNetworks?.IKev2?.length ?? 0) > 0) && (
                      <div class="rounded-lg border border-teal-200 bg-teal-50/50 p-4 dark:border-teal-800 dark:bg-teal-900/20">
                        <h4 class="mb-3 flex items-center gap-2 font-medium text-teal-700 dark:text-teal-300">
                          <LuLock class="h-4 w-4" />
                          {$localize`VPN Client Networks`}
                        </h4>
                        <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
                          {(() => {
                            let clientIndex = 0;
                            const elements: any[] = [];

                            // Wireguard clients
                            vpnClientNetworks?.Wireguard?.forEach(
                              (networkName) => {
                                elements.push(
                                  <div
                                    key={`wg-${clientIndex}`}
                                    class="flex justify-between text-sm"
                                  >
                                    <span class="text-gray-600 dark:text-gray-400">
                                      {networkName}:
                                    </span>
                                    <span class="font-mono text-gray-900 dark:text-gray-100">
                                      192.168.{41 + clientIndex}.0/24
                                    </span>
                                  </div>,
                                );
                                clientIndex++;
                              },
                            );

                            // OpenVPN clients
                            vpnClientNetworks?.OpenVPN?.forEach(
                              (networkName) => {
                                elements.push(
                                  <div
                                    key={`ovpn-${clientIndex}`}
                                    class="flex justify-between text-sm"
                                  >
                                    <span class="text-gray-600 dark:text-gray-400">
                                      {networkName}:
                                    </span>
                                    <span class="font-mono text-gray-900 dark:text-gray-100">
                                      192.168.{41 + clientIndex}.0/24
                                    </span>
                                  </div>,
                                );
                                clientIndex++;
                              },
                            );

                            // L2TP clients
                            vpnClientNetworks?.L2TP?.forEach((networkName) => {
                              elements.push(
                                <div
                                  key={`l2tp-${clientIndex}`}
                                  class="flex justify-between text-sm"
                                >
                                  <span class="text-gray-600 dark:text-gray-400">
                                    {networkName}:
                                  </span>
                                  <span class="font-mono text-gray-900 dark:text-gray-100">
                                    192.168.{41 + clientIndex}.0/24
                                  </span>
                                </div>,
                              );
                              clientIndex++;
                            });

                            // PPTP clients
                            vpnClientNetworks?.PPTP?.forEach((networkName) => {
                              elements.push(
                                <div
                                  key={`pptp-${clientIndex}`}
                                  class="flex justify-between text-sm"
                                >
                                  <span class="text-gray-600 dark:text-gray-400">
                                    {networkName}:
                                  </span>
                                  <span class="font-mono text-gray-900 dark:text-gray-100">
                                    192.168.{41 + clientIndex}.0/24
                                  </span>
                                </div>,
                              );
                              clientIndex++;
                            });

                            // SSTP clients
                            vpnClientNetworks?.SSTP?.forEach((networkName) => {
                              elements.push(
                                <div
                                  key={`sstp-${clientIndex}`}
                                  class="flex justify-between text-sm"
                                >
                                  <span class="text-gray-600 dark:text-gray-400">
                                    {networkName}:
                                  </span>
                                  <span class="font-mono text-gray-900 dark:text-gray-100">
                                    192.168.{41 + clientIndex}.0/24
                                  </span>
                                </div>,
                              );
                              clientIndex++;
                            });

                            // IKEv2 clients
                            vpnClientNetworks?.IKev2?.forEach((networkName) => {
                              elements.push(
                                <div
                                  key={`ikev2-${clientIndex}`}
                                  class="flex justify-between text-sm"
                                >
                                  <span class="text-gray-600 dark:text-gray-400">
                                    {networkName}:
                                  </span>
                                  <span class="font-mono text-gray-900 dark:text-gray-100">
                                    192.168.{41 + clientIndex}.0/24
                                  </span>
                                </div>,
                              );
                              clientIndex++;
                            });

                            return elements;
                          })()}
                        </div>
                      </div>
                    )}

                    {/* VPN Server Networks if configured */}
                    {vpnServerState &&
                      ((vpnServerState.WireguardServers &&
                        vpnServerState.WireguardServers.length > 0) ||
                        (vpnServerState.OpenVpnServer &&
                          vpnServerState.OpenVpnServer.length > 0) ||
                        vpnServerState.L2tpServer?.enabled ||
                        vpnServerState.PptpServer?.enabled ||
                        vpnServerState.SstpServer?.enabled ||
                        vpnServerState.Ikev2Server ||
                        vpnServerNetworks?.SSH ||
                        vpnServerNetworks?.Socks5 ||
                        vpnServerNetworks?.HTTPProxy ||
                        vpnServerNetworks?.BackToHome ||
                        vpnServerNetworks?.ZeroTier) && (
                        <div class="rounded-lg border border-green-200 bg-green-50/50 p-4 dark:border-green-800 dark:bg-green-900/20">
                          <h4 class="mb-3 flex items-center gap-2 font-medium text-green-700 dark:text-green-300">
                            <LuShield class="h-4 w-4" />
                            {$localize`VPN Server Networks`}
                          </h4>
                          <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
                            {vpnServerState.WireguardServers?.map(
                              (server, index) => (
                                <div
                                  key={index}
                                  class="flex justify-between text-sm"
                                >
                                  <span class="text-gray-600 dark:text-gray-400">
                                    {server.Interface.Name ||
                                      `WireGuard${index + 1}`}
                                    :
                                  </span>
                                  <span class="font-mono text-gray-900 dark:text-gray-100">
                                    192.168.{110 + index}.0/24
                                  </span>
                                </div>
                              ),
                            )}
                            {vpnServerState.OpenVpnServer?.map(
                              (server, index) => (
                                <div
                                  key={index}
                                  class="flex justify-between text-sm"
                                >
                                  <span class="text-gray-600 dark:text-gray-400">
                                    {server.name || `OpenVPN${index + 1}`}:
                                  </span>
                                  <span class="font-mono text-gray-900 dark:text-gray-100">
                                    192.168.{120 + index}.0/24
                                  </span>
                                </div>
                              ),
                            )}
                            {vpnServerState.L2tpServer?.enabled && (
                              <div class="flex justify-between text-sm">
                                <span class="text-gray-600 dark:text-gray-400">
                                  {$localize`L2TP`}:
                                </span>
                                <span class="font-mono text-gray-900 dark:text-gray-100">
                                  192.168.150.0/24
                                </span>
                              </div>
                            )}
                            {vpnServerState.PptpServer?.enabled && (
                              <div class="flex justify-between text-sm">
                                <span class="text-gray-600 dark:text-gray-400">
                                  {$localize`PPTP`}:
                                </span>
                                <span class="font-mono text-gray-900 dark:text-gray-100">
                                  192.168.130.0/24
                                </span>
                              </div>
                            )}
                            {vpnServerState.SstpServer?.enabled && (
                              <div class="flex justify-between text-sm">
                                <span class="text-gray-600 dark:text-gray-400">
                                  {$localize`SSTP`}:
                                </span>
                                <span class="font-mono text-gray-900 dark:text-gray-100">
                                  192.168.140.0/24
                                </span>
                              </div>
                            )}
                            {vpnServerState.Ikev2Server && (
                              <div class="flex justify-between text-sm">
                                <span class="text-gray-600 dark:text-gray-400">
                                  {$localize`IKEv2`}:
                                </span>
                                <span class="font-mono text-gray-900 dark:text-gray-100">
                                  192.168.160.0/24
                                </span>
                              </div>
                            )}
                            {vpnServerNetworks?.SSH && (
                              <div class="flex justify-between text-sm">
                                <span class="text-gray-600 dark:text-gray-400">
                                  {$localize`SSH Server`}:
                                </span>
                                <span class="font-mono text-gray-900 dark:text-gray-100">
                                  192.168.165.0/24
                                </span>
                              </div>
                            )}
                            {vpnServerNetworks?.Socks5 && (
                              <div class="flex justify-between text-sm">
                                <span class="text-gray-600 dark:text-gray-400">
                                  {$localize`Socks5 Proxy`}:
                                </span>
                                <span class="font-mono text-gray-900 dark:text-gray-100">
                                  192.168.155.0/24
                                </span>
                              </div>
                            )}
                            {vpnServerNetworks?.HTTPProxy && (
                              <div class="flex justify-between text-sm">
                                <span class="text-gray-600 dark:text-gray-400">
                                  {$localize`HTTP Proxy`}:
                                </span>
                                <span class="font-mono text-gray-900 dark:text-gray-100">
                                  192.168.156.0/24
                                </span>
                              </div>
                            )}
                            {vpnServerNetworks?.BackToHome && (
                              <div class="flex justify-between text-sm">
                                <span class="text-gray-600 dark:text-gray-400">
                                  {$localize`Back To Home`}:
                                </span>
                                <span class="font-mono text-gray-900 dark:text-gray-100">
                                  192.168.157.0/24
                                </span>
                              </div>
                            )}
                            {vpnServerNetworks?.ZeroTier && (
                              <div class="flex justify-between text-sm">
                                <span class="text-gray-600 dark:text-gray-400">
                                  {$localize`ZeroTier`}:
                                </span>
                                <span class="font-mono text-gray-900 dark:text-gray-100">
                                  192.168.158.0/24
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                    {/* Tunnel Networks if configured */}
                    {starContext.state.LAN.Tunnel &&
                      ((starContext.state.LAN.Tunnel.IPIP &&
                        starContext.state.LAN.Tunnel.IPIP.length > 0) ||
                        (starContext.state.LAN.Tunnel.Eoip &&
                          starContext.state.LAN.Tunnel.Eoip.length > 0) ||
                        (starContext.state.LAN.Tunnel.Gre &&
                          starContext.state.LAN.Tunnel.Gre.length > 0) ||
                        (starContext.state.LAN.Tunnel.Vxlan &&
                          starContext.state.LAN.Tunnel.Vxlan.length > 0)) && (
                        <div class="rounded-lg border border-purple-200 bg-purple-50/50 p-4 dark:border-purple-800 dark:bg-purple-900/20">
                          <h4 class="mb-3 flex items-center gap-2 font-medium text-purple-700 dark:text-purple-300">
                            <LuRoute class="h-4 w-4" />
                            {$localize`Tunnel Networks`}
                          </h4>
                          <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
                            {starContext.state.LAN.Tunnel.IPIP?.map(
                              (tunnel, index) => (
                                <div
                                  key={index}
                                  class="flex justify-between text-sm"
                                >
                                  <span class="text-gray-600 dark:text-gray-400">
                                    {tunnel.name || `IPIP${index + 1}`}:
                                  </span>
                                  <span class="font-mono text-gray-900 dark:text-gray-100">
                                    192.168.{170 + index}.0/30
                                  </span>
                                </div>
                              ),
                            )}
                            {starContext.state.LAN.Tunnel.Eoip?.map(
                              (tunnel, index) => (
                                <div
                                  key={index}
                                  class="flex justify-between text-sm"
                                >
                                  <span class="text-gray-600 dark:text-gray-400">
                                    {tunnel.name || `EoIP${index + 1}`}:
                                  </span>
                                  <span class="font-mono text-gray-900 dark:text-gray-100">
                                    192.168.{180 + index}.0/30
                                  </span>
                                </div>
                              ),
                            )}
                            {starContext.state.LAN.Tunnel.Gre?.map(
                              (tunnel, index) => (
                                <div
                                  key={index}
                                  class="flex justify-between text-sm"
                                >
                                  <span class="text-gray-600 dark:text-gray-400">
                                    {tunnel.name || `GRE${index + 1}`}:
                                  </span>
                                  <span class="font-mono text-gray-900 dark:text-gray-100">
                                    192.168.{190 + index}.0/30
                                  </span>
                                </div>
                              ),
                            )}
                            {starContext.state.LAN.Tunnel.Vxlan?.map(
                              (tunnel, index) => (
                                <div
                                  key={index}
                                  class="flex justify-between text-sm"
                                >
                                  <span class="text-gray-600 dark:text-gray-400">
                                    {tunnel.name || `VXLAN${index + 1}`}:
                                  </span>
                                  <span class="font-mono text-gray-900 dark:text-gray-100">
                                    192.168.{210 + index}.0/30
                                  </span>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>

              <Card
                variant="outlined"
                class="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80"
              >
                <CardFooter>
                  <div class="flex w-full items-center justify-end">
                    <Button onClick$={handleSave$} size="lg" class="px-8">
                      {$localize`Save & Continue`}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ) : (
            /* Enabled State with Tab Navigation */
            <>
              {/* Warning Alert about Subnet Configuration */}
              <Alert
                status="warning"
                title={$localize`Important Network Configuration Notice`}
                class="mb-6 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20"
              >
                <div class="flex gap-3">
                  <LuInfo class="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
                  <div class="space-y-2">
                    <p class="text-sm text-gray-700 dark:text-gray-300">
                      {$localize`We've established a systematic subnet configuration that helps organize and manage your network effectively. These values follow best practices for network segmentation and routing.`}
                    </p>
                    <p class="text-sm font-semibold text-amber-700 dark:text-amber-400">
                      ⚠️{" "}
                      {$localize`Warning: Only modify these settings if you have technical networking knowledge. Incorrect subnet values may cause network connectivity issues and routing problems.`}
                    </p>
                  </div>
                </div>
              </Alert>

              {/* Custom Wrapping Tab Navigation */}
              {tabs.value.length > 0 && (
                <div class="mb-6">
                  <div class="flex flex-wrap justify-center gap-2">
                    {tabs.value.map((tab) => (
                      <button
                        key={tab.id}
                        onClick$={() => handleTabSelect$(tab.id)}
                        class={`
                          flex items-center gap-2 rounded-full px-4 py-2.5
                          font-medium transition-all duration-200
                          ${
                            activeTab.value === tab.id
                              ? "scale-105 transform bg-primary-500 text-white shadow-lg"
                              : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                          }
                        `}
                        aria-selected={activeTab.value === tab.id}
                        role="tab"
                      >
                        {tab.icon}
                        <span>{tab.label}</span>
                        {tab.count > 0 && (
                          <span
                            class={`
                            ml-1 rounded-full px-2 py-0.5 text-xs font-semibold
                            ${
                              activeTab.value === tab.id
                                ? "bg-white/20 text-white"
                                : "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400"
                            }
                          `}
                          >
                            {tab.count}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab Content */}
              <div class="relative min-h-[400px]">
                {/* Debug info - remove after testing */}
                {/* <div class="text-xs text-gray-500 mb-2">Active Tab: {activeTab.value}</div> */}

                {/* Render active tab content - TabContent handles empty configs */}
                {activeTab.value === "base" && (
                  <TabContent
                    category="base"
                    configs={extendedGroupedConfigs.base || []}
                    values={values.value}
                    onChange$={handleChange$}
                    errors={errors.value}
                  />
                )}
                {activeTab.value === "wan-domestic" && (
                  <TabContent
                    category="wan-domestic"
                    configs={extendedGroupedConfigs["wan-domestic"] || []}
                    values={values.value}
                    onChange$={handleChange$}
                    errors={errors.value}
                  />
                )}
                {activeTab.value === "wan-foreign" && (
                  <TabContent
                    category="wan-foreign"
                    configs={extendedGroupedConfigs["wan-foreign"] || []}
                    values={values.value}
                    onChange$={handleChange$}
                    errors={errors.value}
                  />
                )}
                {activeTab.value === "vpn-client" && (
                  <TabContent
                    category="vpn-client"
                    configs={extendedGroupedConfigs["vpn-client"] || []}
                    values={values.value}
                    onChange$={handleChange$}
                    errors={errors.value}
                  />
                )}
                {activeTab.value === "vpn" && (
                  <TabContent
                    category="vpn"
                    configs={extendedGroupedConfigs.vpn || []}
                    values={values.value}
                    onChange$={handleChange$}
                    errors={errors.value}
                  />
                )}
                {activeTab.value === "tunnel" && (
                  <TabContent
                    category="tunnel"
                    configs={extendedGroupedConfigs.tunnel || []}
                    values={values.value}
                    onChange$={handleChange$}
                    errors={errors.value}
                  />
                )}
              </div>

              {/* Action Footer with Enhanced Design */}
              <Card
                variant="outlined"
                class="border-primary-200 bg-white/90 backdrop-blur-sm dark:border-primary-800 dark:bg-gray-800/90"
              >
                <CardFooter class="bg-gradient-to-r from-primary-50/50 to-blue-50/50 dark:from-primary-900/20 dark:to-blue-900/20">
                  <div class="flex w-full items-center justify-between">
                    {/* Status Display */}
                    <div class="flex items-center gap-3">
                      {Object.keys(errors.value).length > 0 ? (
                        <>
                          <LuAlertTriangle class="h-5 w-5 text-red-500" />
                          <span class="text-sm text-red-600 dark:text-red-400">
                            {$localize`Please fix ${Object.keys(errors.value).length} error(s)`}
                          </span>
                        </>
                      ) : isValid.value ? (
                        <>
                          <LuCheckCircle class="h-5 w-5 text-green-500" />
                          <span class="text-sm text-green-600 dark:text-green-400">
                            {$localize`Configuration valid`}
                          </span>
                        </>
                      ) : (
                        <span class="text-sm text-gray-500 dark:text-gray-400">
                          {$localize`Configure your network subnets`}
                        </span>
                      )}
                    </div>

                    {/* Action Button */}
                    <Button
                      onClick$={handleSave$}
                      size="lg"
                      disabled={
                        !isValid.value || Object.keys(errors.value).length > 0
                      }
                      class="px-8 font-medium shadow-lg transition-shadow hover:shadow-xl"
                    >
                      {$localize`Save & Continue`}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
});
