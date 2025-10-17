import {
  component$,
  useContext,
  useSignal,
  useComputed$,
  $,
  useTask$,
} from "@builder.io/qwik";
import { StarContext } from "~/components/Star/StarContext/StarContext";
import { Card, CardFooter, Button, GradientHeader, Alert } from "~/components/Core";
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
  LuInfo
} from "@qwikest/icons/lucide";
import { TabContent } from "./TabContent";
import { useSubnets } from "./useSubnets";

export const Subnets = component$<StepProps>(({ onComplete$, onDisabled$ }) => {
  const starContext = useContext(StarContext);

  // Check if subnets are already configured
  const hasSubnetsConfigured = !!(starContext.state.LAN.Subnets && Object.keys(starContext.state.LAN.Subnets).length > 0);

  // Enable/disable state - default false (disabled by default), but enabled if subnets are already configured
  const subnetsEnabled = useSignal(hasSubnetsConfigured || false);

  // Active tab state
  const activeTab = useSignal('base');

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
        id: 'base',
        label: $localize`Base`,
        icon: <LuNetwork class="h-4 w-4" />,
        count: extendedGroupedConfigs.base.filter((c: any) => values.value[c.key] !== null).length,
      });
    }

    // Show domestic tab if there are multiple domestic WAN links
    if (extendedGroupedConfigs['wan-domestic']?.length > 0) {
      tabList.push({
        id: 'wan-domestic',
        label: $localize`Domestic`,
        icon: <LuHome class="h-4 w-4" />,
        count: extendedGroupedConfigs['wan-domestic'].filter((c: any) => values.value[c.key] !== null).length,
      });
    }

    // Show foreign tab if there are multiple foreign WAN links
    if (extendedGroupedConfigs['wan-foreign']?.length > 0) {
      tabList.push({
        id: 'wan-foreign',
        label: $localize`Foreign`,
        icon: <LuGlobe class="h-4 w-4" />,
        count: extendedGroupedConfigs['wan-foreign'].filter((c: any) => values.value[c.key] !== null).length,
      });
    }

    // Show VPN Client tab if there are multiple VPN clients
    if (extendedGroupedConfigs['vpn-client']?.length > 0) {
      tabList.push({
        id: 'vpn-client',
        label: $localize`VPN Client`,
        icon: <LuLock class="h-4 w-4" />,
        count: extendedGroupedConfigs['vpn-client'].filter((c: any) => values.value[c.key] !== null).length,
      });
    }

    // Show VPN Server tab if there are VPN servers configured
    if (extendedGroupedConfigs.vpn?.length > 0) {
      tabList.push({
        id: 'vpn',
        label: $localize`VPN Server`,
        icon: <LuShield class="h-4 w-4" />,
        count: extendedGroupedConfigs.vpn.filter((c: any) => values.value[c.key] !== null).length,
      });
    }

    // Show Tunnel tab if there are tunnels configured
    if (extendedGroupedConfigs.tunnel?.length > 0) {
      tabList.push({
        id: 'tunnel',
        label: $localize`Tunnel`,
        icon: <LuRoute class="h-4 w-4" />,
        count: extendedGroupedConfigs.tunnel.filter((c: any) => values.value[c.key] !== null).length,
      });
    }

    return tabList;
  });

  // Initialize/adjust active tab when tabs change (no mutations in useComputed$)
  useTask$(({ track }) => {
    track(() => tabs.value);
    if (tabs.value.length > 0) {
      const currentTabExists = tabs.value.some(tab => tab.id === activeTab.value);
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
      const createSubnetConfig = (name: string, value: number, mask: number) => ({
        name,
        subnet: `192.168.${value}.0/${mask}`
      });

      const defaultSubnets: any = {
        BaseSubnets: {},
        ForeignSubnets: [],
        DomesticSubnets: [],
        VPNClientSubnets: {},
        VPNServerSubnets: {},
        TunnelSubnets: {}
      };

      // Process all configs with their default placeholder values
      extendedGroupedConfigs.base?.forEach((config: any) => {
        defaultSubnets.BaseSubnets[config.key] = createSubnetConfig(config.key, config.placeholder, config.mask);
      });

      extendedGroupedConfigs["wan-domestic"]?.forEach((config: any) => {
        defaultSubnets.DomesticSubnets.push(createSubnetConfig(config.label, config.placeholder, config.mask));
      });

      extendedGroupedConfigs["wan-foreign"]?.forEach((config: any) => {
        defaultSubnets.ForeignSubnets.push(createSubnetConfig(config.label, config.placeholder, config.mask));
      });

      // VPN Client networks - organize by protocol
      const vpnClientsByProtocol: Record<string, any[]> = {
        Wireguard: [],
        OpenVPN: [],
        PPTP: [],
        L2TP: [],
        SSTP: [],
        IKev2: []
      };

      const networks = starContext.state.Choose.Networks;
      let vpnClientIndex = 0;

      // Map VPN client configs to protocols using the same order as in useSubnets
      extendedGroupedConfigs["vpn-client"]?.forEach((config: any) => {
        vpnClientIndex++;
        const placeholder = 41 + vpnClientIndex - 1;
        
        // Determine protocol based on Networks configuration
        let protocol = '';
        let _protocolIndex = 0;
        
        if (networks?.VPNClientNetworks?.Wireguard?.length) {
          if (vpnClientIndex <= networks.VPNClientNetworks.Wireguard.length) {
            protocol = 'Wireguard';
            _protocolIndex = vpnClientIndex - 1;
          }
        }
        let currentCount = networks?.VPNClientNetworks?.Wireguard?.length || 0;
        
        if (!protocol && networks?.VPNClientNetworks?.OpenVPN?.length) {
          if (vpnClientIndex <= currentCount + networks.VPNClientNetworks.OpenVPN.length) {
            protocol = 'OpenVPN';
            _protocolIndex = vpnClientIndex - currentCount - 1;
          }
          currentCount += networks.VPNClientNetworks.OpenVPN.length;
        }
        
        if (!protocol && networks?.VPNClientNetworks?.L2TP?.length) {
          if (vpnClientIndex <= currentCount + networks.VPNClientNetworks.L2TP.length) {
            protocol = 'L2TP';
            _protocolIndex = vpnClientIndex - currentCount - 1;
          }
          currentCount += networks.VPNClientNetworks.L2TP.length;
        }
        
        if (!protocol && networks?.VPNClientNetworks?.PPTP?.length) {
          if (vpnClientIndex <= currentCount + networks.VPNClientNetworks.PPTP.length) {
            protocol = 'PPTP';
            _protocolIndex = vpnClientIndex - currentCount - 1;
          }
          currentCount += networks.VPNClientNetworks.PPTP.length;
        }
        
        if (!protocol && networks?.VPNClientNetworks?.SSTP?.length) {
          if (vpnClientIndex <= currentCount + networks.VPNClientNetworks.SSTP.length) {
            protocol = 'SSTP';
            _protocolIndex = vpnClientIndex - currentCount - 1;
          }
          currentCount += networks.VPNClientNetworks.SSTP.length;
        }
        
        if (!protocol && networks?.VPNClientNetworks?.IKev2?.length) {
          protocol = 'IKev2';
          _protocolIndex = vpnClientIndex - currentCount - 1;
        }

        if (protocol) {
          vpnClientsByProtocol[protocol].push(createSubnetConfig(config.label, placeholder, config.mask));
        }
      });

      Object.entries(vpnClientsByProtocol).forEach(([protocol, configs]) => {
        if (configs.length > 0) {
          defaultSubnets.VPNClientSubnets[protocol] = configs;
        }
      });

      // VPN Server networks
      extendedGroupedConfigs.vpn?.forEach((config: any) => {
        const subnetConfig = createSubnetConfig(config.label, config.placeholder, config.mask);
        
        // Check if it's an array protocol (Wireguard, OpenVPN)
        if (networks?.VPNServerNetworks?.Wireguard?.some((name: string) => name === config.key)) {
          if (!defaultSubnets.VPNServerSubnets.Wireguard) {
            defaultSubnets.VPNServerSubnets.Wireguard = [];
          }
          defaultSubnets.VPNServerSubnets.Wireguard.push(subnetConfig);
        } else if (networks?.VPNServerNetworks?.OpenVPN?.some((name: string) => name === config.key)) {
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
        const subnetConfig = createSubnetConfig(config.label, config.placeholder, config.mask);
        
        // Determine tunnel type from Networks
        if (networks?.TunnelNetworks?.IPIP?.some((name: string) => name === config.key)) {
          if (!defaultSubnets.TunnelSubnets.IPIP) {
            defaultSubnets.TunnelSubnets.IPIP = [];
          }
          defaultSubnets.TunnelSubnets.IPIP.push(subnetConfig);
        } else if (networks?.TunnelNetworks?.Eoip?.some((name: string) => name === config.key)) {
          if (!defaultSubnets.TunnelSubnets.Eoip) {
            defaultSubnets.TunnelSubnets.Eoip = [];
          }
          defaultSubnets.TunnelSubnets.Eoip.push(subnetConfig);
        } else if (networks?.TunnelNetworks?.Gre?.some((name: string) => name === config.key)) {
          if (!defaultSubnets.TunnelSubnets.Gre) {
            defaultSubnets.TunnelSubnets.Gre = [];
          }
          defaultSubnets.TunnelSubnets.Gre.push(subnetConfig);
        } else if (networks?.TunnelNetworks?.Vxlan?.some((name: string) => name === config.key)) {
          if (!defaultSubnets.TunnelSubnets.Vxlan) {
            defaultSubnets.TunnelSubnets.Vxlan = [];
          }
          defaultSubnets.TunnelSubnets.Vxlan.push(subnetConfig);
        }
      });

      // Clean up empty sections
      if (Object.keys(defaultSubnets.BaseSubnets).length === 0) delete defaultSubnets.BaseSubnets;
      if (defaultSubnets.ForeignSubnets.length === 0) delete defaultSubnets.ForeignSubnets;
      if (defaultSubnets.DomesticSubnets.length === 0) delete defaultSubnets.DomesticSubnets;
      if (Object.keys(defaultSubnets.VPNClientSubnets).length === 0) delete defaultSubnets.VPNClientSubnets;
      if (Object.keys(defaultSubnets.VPNServerSubnets).length === 0) delete defaultSubnets.VPNServerSubnets;
      if (Object.keys(defaultSubnets.TunnelSubnets).length === 0) delete defaultSubnets.TunnelSubnets;

      await starContext.updateLAN$({ Subnets: defaultSubnets as any });
      if (onComplete$) {
        onComplete$();
      }
      return;
    }

    const isValidationPassed = await validateAll$();
    if (!isValidationPassed) {
      return;
    }

    // Helper to create SubnetConfig object
    const createSubnetConfig = (name: string, value: number, mask: number) => ({
      name,
      subnet: `192.168.${value}.0/${mask}`
    });

    // Initialize structured subnets object
    const finalSubnets: any = {
      BaseSubnets: {},
      ForeignSubnets: [],
      DomesticSubnets: [],
      VPNClientSubnets: {},
      VPNServerSubnets: {},
      TunnelSubnets: {}
    };

    // Process base networks
    extendedGroupedConfigs.base.forEach((config: any) => {
      const value = values.value[config.key];
      if (value !== null && value !== undefined) {
        finalSubnets.BaseSubnets[config.key] = createSubnetConfig(config.key, value, config.mask);
      } else if (config.isRequired) {
        finalSubnets.BaseSubnets[config.key] = createSubnetConfig(config.key, config.placeholder, config.mask);
      }
    });

    // Process domestic WAN networks
    extendedGroupedConfigs["wan-domestic"]?.forEach((config: any) => {
      const value = values.value[config.key];
      if (value !== null && value !== undefined) {
        finalSubnets.DomesticSubnets.push(createSubnetConfig(config.label, value, config.mask));
      } else if (config.isRequired) {
        finalSubnets.DomesticSubnets.push(createSubnetConfig(config.label, config.placeholder, config.mask));
      }
    });

    // Process foreign WAN networks
    extendedGroupedConfigs["wan-foreign"]?.forEach((config: any) => {
      const value = values.value[config.key];
      if (value !== null && value !== undefined) {
        finalSubnets.ForeignSubnets.push(createSubnetConfig(config.label, value, config.mask));
      } else if (config.isRequired) {
        finalSubnets.ForeignSubnets.push(createSubnetConfig(config.label, config.placeholder, config.mask));
      }
    });

    // Process VPN client networks - organize by protocol
    const vpnClientsByProtocol: Record<string, any[]> = {
      Wireguard: [],
      OpenVPN: [],
      PPTP: [],
      L2TP: [],
      SSTP: [],
      IKev2: []
    };

    extendedGroupedConfigs["vpn-client"]?.forEach((config: any, index: number) => {
      const value = values.value[config.key];
      const vpnClients = starContext.state.WAN.VPNClient;
      
      // Determine protocol from the index by counting clients in order
      let currentIndex = 0;
      let protocol = '';
      
      if (vpnClients?.Wireguard?.length) {
        if (index < currentIndex + vpnClients.Wireguard.length) {
          protocol = 'Wireguard';
        }
        currentIndex += vpnClients.Wireguard.length;
      }
      if (!protocol && vpnClients?.OpenVPN?.length) {
        if (index < currentIndex + vpnClients.OpenVPN.length) {
          protocol = 'OpenVPN';
        }
        currentIndex += vpnClients.OpenVPN.length;
      }
      if (!protocol && vpnClients?.PPTP?.length) {
        if (index < currentIndex + vpnClients.PPTP.length) {
          protocol = 'PPTP';
        }
        currentIndex += vpnClients.PPTP.length;
      }
      if (!protocol && vpnClients?.L2TP?.length) {
        if (index < currentIndex + vpnClients.L2TP.length) {
          protocol = 'L2TP';
        }
        currentIndex += vpnClients.L2TP.length;
      }
      if (!protocol && vpnClients?.SSTP?.length) {
        if (index < currentIndex + vpnClients.SSTP.length) {
          protocol = 'SSTP';
        }
        currentIndex += vpnClients.SSTP.length;
      }
      if (!protocol && vpnClients?.IKeV2?.length) {
        if (index < currentIndex + vpnClients.IKeV2.length) {
          protocol = 'IKev2';
        }
        currentIndex += vpnClients.IKeV2.length;
      }

      if (protocol && (value !== null && value !== undefined)) {
        vpnClientsByProtocol[protocol].push(createSubnetConfig(config.label, value, config.mask));
      }
    });

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
        if (value !== null && value !== undefined) {
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
        if (value !== null && value !== undefined) {
          openvpnConfigs.push(createSubnetConfig(serverName, value, 24));
        }
      });
      if (openvpnConfigs.length > 0) {
        finalSubnets.VPNServerSubnets.OpenVPN = openvpnConfigs;
      }
    }

      // Single server protocols
      const singleServerProtocols = [
        { key: 'L2TP', enabled: vpnServers?.L2tpServer?.enabled },
        { key: 'PPTP', enabled: vpnServers?.PptpServer?.enabled },
        { key: 'SSTP', enabled: vpnServers?.SstpServer?.enabled },
        { key: 'IKev2', enabled: vpnServers?.Ikev2Server },
        { key: 'SSH', enabled: vpnServers?.SSHServer?.enabled },
        { key: 'Socks5', enabled: vpnServers?.Socks5Server?.enabled },
        { key: 'HTTPProxy', enabled: vpnServers?.HTTPProxyServer?.enabled },
        { key: 'BackToHome', enabled: vpnServers?.BackToHomeServer?.enabled },
        { key: 'ZeroTier', enabled: vpnServers?.ZeroTierServer?.enabled }
      ];

    singleServerProtocols.forEach(({ key, enabled }) => {
      if (enabled) {
        const value = values.value[key];
        if (value !== null && value !== undefined) {
          finalSubnets.VPNServerSubnets[key] = createSubnetConfig(key, value, 24);
        }
      }
    });

    // Process tunnel networks - organize by tunnel type
    const tunnels = starContext.state.LAN.Tunnel;
    const tunnelTypes = [
      { key: 'IPIP', configs: tunnels?.IPIP },
      { key: 'Eoip', configs: tunnels?.Eoip },
      { key: 'Gre', configs: tunnels?.Gre },
      { key: 'Vxlan', configs: tunnels?.Vxlan }
    ];

    tunnelTypes.forEach(({ key, configs }) => {
      if (configs?.length) {
        const tunnelConfigs: any[] = [];
        configs.forEach((tunnel: any, index: number) => {
          const tunnelName = tunnel.name || `${key}${index + 1}`;
          const value = values.value[tunnelName];
          if (value !== null && value !== undefined) {
            tunnelConfigs.push(createSubnetConfig(tunnelName, value, 30));
          }
        });
        if (tunnelConfigs.length > 0) {
          finalSubnets.TunnelSubnets[key] = tunnelConfigs;
        }
      }
    });

    // Clean up empty sections
    if (Object.keys(finalSubnets.BaseSubnets).length === 0) delete finalSubnets.BaseSubnets;
    if (finalSubnets.ForeignSubnets.length === 0) delete finalSubnets.ForeignSubnets;
    if (finalSubnets.DomesticSubnets.length === 0) delete finalSubnets.DomesticSubnets;
    if (Object.keys(finalSubnets.VPNClientSubnets).length === 0) delete finalSubnets.VPNClientSubnets;
    if (Object.keys(finalSubnets.VPNServerSubnets).length === 0) delete finalSubnets.VPNServerSubnets;
    if (Object.keys(finalSubnets.TunnelSubnets).length === 0) delete finalSubnets.TunnelSubnets;

    // Update context with structured format
    await starContext.updateLAN$({ Subnets: finalSubnets as any });

    // Complete step
    if (onComplete$) {
      onComplete$();
    }
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
              label: $localize`Enable Subnets`
            }}
            gradient={{
              direction: "to-br",
              from: "primary-50",
              via: "blue-50",
              to: "primary-100"
            }}
            features={[
              { label: $localize`Smart IP validation`, color: "primary-500" },
              { label: $localize`Conflict detection`, color: "green-500" },
              { label: $localize`Auto-suggestions`, color: "blue-500" }
            ]}
            showFeaturesWhen={subnetsEnabled.value}
          />

          {!subnetsEnabled.value ? (
            /* Disabled State with Default Subnet Display */
            <div class="space-y-6">
              <div class="relative overflow-hidden rounded-2xl border border-gray-200 bg-white/60 dark:border-gray-700 dark:bg-gray-800/60 backdrop-blur-sm">
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
                    <div class="p-4 rounded-lg bg-primary-50/50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800">
                      <h4 class="font-medium text-primary-700 dark:text-primary-300 mb-3 flex items-center gap-2">
                        <LuNetwork class="h-4 w-4" />
                        {$localize`Base Networks`}
                      </h4>
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {starContext.state.Choose.WANLinkType === "domestic" || starContext.state.Choose.WANLinkType === "both" ? (
                          <>
                            <div class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">{$localize`Split Network`}:</span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">192.168.10.0/24</span>
                            </div>
                            <div class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">{$localize`Domestic Network`}:</span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">192.168.20.0/24</span>
                            </div>
                            <div class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">{$localize`Foreign Network`}:</span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">192.168.30.0/24</span>
                            </div>
                            <div class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">{$localize`VPN Network`}:</span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">192.168.40.0/24</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">{$localize`VPN Network`}:</span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">192.168.10.0/24</span>
                            </div>
                            <div class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">{$localize`Foreign Network`}:</span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">192.168.30.0/24</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Domestic WAN Networks */}
                    {starContext.state.Choose.Networks?.DomesticNetworks?.length && starContext.state.Choose.Networks?.DomesticNetworks?.length > 0 && (
                      <div class="p-4 rounded-lg bg-orange-50/50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                        <h4 class="font-medium text-orange-700 dark:text-orange-300 mb-3 flex items-center gap-2">
                          <LuHome class="h-4 w-4" />
                          {$localize`Domestic WAN Networks`}
                        </h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {starContext.state.Choose.Networks?.DomesticNetworks?.map((networkName, index) => (
                            <div key={index} class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">{networkName}:</span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">192.168.{21 + index}.0/24</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Foreign WAN Networks */}
                    {starContext.state.Choose.Networks?.ForeignNetworks?.length && starContext.state.Choose.Networks?.ForeignNetworks?.length > 0 && (
                      <div class="p-4 rounded-lg bg-blue-50/50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                        <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2">
                          <LuGlobe class="h-4 w-4" />
                          {$localize`Foreign WAN Networks`}
                        </h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {starContext.state.Choose.Networks.ForeignNetworks.map((networkName, index) => (
                            <div key={index} class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">{networkName}:</span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">192.168.{31 + index}.0/24</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* VPN Client Networks */}
                    {(starContext.state.Choose.Networks?.VPNClientNetworks?.Wireguard?.length && starContext.state.Choose.Networks?.VPNClientNetworks?.Wireguard?.length > 0 ||
                      starContext.state.Choose.Networks?.VPNClientNetworks?.OpenVPN?.length && starContext.state.Choose.Networks?.VPNClientNetworks?.OpenVPN?.length > 0 ||
                      starContext.state.Choose.Networks?.VPNClientNetworks?.L2TP?.length && starContext.state.Choose.Networks?.VPNClientNetworks?.L2TP?.length > 0 ||
                      starContext.state.Choose.Networks?.VPNClientNetworks?.PPTP?.length && starContext.state.Choose.Networks?.VPNClientNetworks?.PPTP?.length > 0 ||
                      starContext.state.Choose.Networks?.VPNClientNetworks?.SSTP?.length && starContext.state.Choose.Networks?.VPNClientNetworks?.SSTP?.length > 0 ||
                      starContext.state.Choose.Networks?.VPNClientNetworks?.IKev2?.length && starContext.state.Choose.Networks?.VPNClientNetworks?.IKev2?.length > 0) && (
                      <div class="p-4 rounded-lg bg-teal-50/50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800">
                        <h4 class="font-medium text-teal-700 dark:text-teal-300 mb-3 flex items-center gap-2">
                          <LuLock class="h-4 w-4" />
                          {$localize`VPN Client Networks`}
                        </h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {(() => {
                            let clientIndex = 0;
                            const vpnClientNetworks = starContext.state.Choose.Networks?.VPNClientNetworks;
                            const elements: any[] = [];
                            
                            // Wireguard clients
                            vpnClientNetworks?.Wireguard?.forEach((networkName) => {
                              elements.push(
                                <div key={`wg-${clientIndex}`} class="flex justify-between text-sm">
                                  <span class="text-gray-600 dark:text-gray-400">{networkName}:</span>
                                  <span class="font-mono text-gray-900 dark:text-gray-100">192.168.{41 + clientIndex}.0/24</span>
                                </div>
                              );
                              clientIndex++;
                            });
                            
                            // OpenVPN clients
                            vpnClientNetworks?.OpenVPN?.forEach((networkName) => {
                              elements.push(
                                <div key={`ovpn-${clientIndex}`} class="flex justify-between text-sm">
                                  <span class="text-gray-600 dark:text-gray-400">{networkName}:</span>
                                  <span class="font-mono text-gray-900 dark:text-gray-100">192.168.{41 + clientIndex}.0/24</span>
                                </div>
                              );
                              clientIndex++;
                            });
                            
                            // L2TP clients
                            vpnClientNetworks?.L2TP?.forEach((networkName) => {
                              elements.push(
                                <div key={`l2tp-${clientIndex}`} class="flex justify-between text-sm">
                                  <span class="text-gray-600 dark:text-gray-400">{networkName}:</span>
                                  <span class="font-mono text-gray-900 dark:text-gray-100">192.168.{41 + clientIndex}.0/24</span>
                                </div>
                              );
                              clientIndex++;
                            });
                            
                            // PPTP clients
                            vpnClientNetworks?.PPTP?.forEach((networkName) => {
                              elements.push(
                                <div key={`pptp-${clientIndex}`} class="flex justify-between text-sm">
                                  <span class="text-gray-600 dark:text-gray-400">{networkName}:</span>
                                  <span class="font-mono text-gray-900 dark:text-gray-100">192.168.{41 + clientIndex}.0/24</span>
                                </div>
                              );
                              clientIndex++;
                            });
                            
                            // SSTP clients
                            vpnClientNetworks?.SSTP?.forEach((networkName) => {
                              elements.push(
                                <div key={`sstp-${clientIndex}`} class="flex justify-between text-sm">
                                  <span class="text-gray-600 dark:text-gray-400">{networkName}:</span>
                                  <span class="font-mono text-gray-900 dark:text-gray-100">192.168.{41 + clientIndex}.0/24</span>
                                </div>
                              );
                              clientIndex++;
                            });
                            
                            // IKEv2 clients
                            vpnClientNetworks?.IKev2?.forEach((networkName) => {
                              elements.push(
                                <div key={`ikev2-${clientIndex}`} class="flex justify-between text-sm">
                                  <span class="text-gray-600 dark:text-gray-400">{networkName}:</span>
                                  <span class="font-mono text-gray-900 dark:text-gray-100">192.168.{41 + clientIndex}.0/24</span>
                                </div>
                              );
                              clientIndex++;
                            });
                            
                            return elements;
                          })()}
                        </div>
                      </div>
                    )}

                    {/* VPN Server Networks if configured */}
                    {starContext.state.LAN.VPNServer && (
                      (starContext.state.LAN.VPNServer.WireguardServers && starContext.state.LAN.VPNServer.WireguardServers.length > 0) ||
                      (starContext.state.LAN.VPNServer.OpenVpnServer && starContext.state.LAN.VPNServer.OpenVpnServer.length > 0) ||
                      starContext.state.LAN.VPNServer.L2tpServer?.enabled ||
                      starContext.state.LAN.VPNServer.PptpServer?.enabled ||
                      starContext.state.LAN.VPNServer.SstpServer?.enabled ||
                      starContext.state.LAN.VPNServer.Ikev2Server ||
                      starContext.state.Choose.Networks?.VPNServerNetworks?.SSH ||
                      starContext.state.Choose.Networks?.VPNServerNetworks?.Socks5 ||
                      starContext.state.Choose.Networks?.VPNServerNetworks?.HTTPProxy ||
                      starContext.state.Choose.Networks?.VPNServerNetworks?.BackToHome ||
                      starContext.state.Choose.Networks?.VPNServerNetworks?.ZeroTier
                    ) && (
                      <div class="p-4 rounded-lg bg-green-50/50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                        <h4 class="font-medium text-green-700 dark:text-green-300 mb-3 flex items-center gap-2">
                          <LuShield class="h-4 w-4" />
                          {$localize`VPN Server Networks`}
                        </h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {starContext.state.LAN.VPNServer.WireguardServers?.map((server, index) => (
                            <div key={index} class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">{server.Interface.Name || `WireGuard${index + 1}`}:</span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">192.168.{110 + index}.0/24</span>
                            </div>
                          ))}
                          {starContext.state.LAN.VPNServer.OpenVpnServer?.map((server, index) => (
                            <div key={index} class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">{server.name || `OpenVPN${index + 1}`}:</span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">192.168.{120 + index}.0/24</span>
                            </div>
                          ))}
                          {starContext.state.LAN.VPNServer.L2tpServer?.enabled && (
                            <div class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">{$localize`L2TP`}:</span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">192.168.150.0/24</span>
                            </div>
                          )}
                          {starContext.state.LAN.VPNServer.PptpServer?.enabled && (
                            <div class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">{$localize`PPTP`}:</span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">192.168.130.0/24</span>
                            </div>
                          )}
                          {starContext.state.LAN.VPNServer.SstpServer?.enabled && (
                            <div class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">{$localize`SSTP`}:</span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">192.168.140.0/24</span>
                            </div>
                          )}
                          {starContext.state.LAN.VPNServer.Ikev2Server && (
                            <div class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">{$localize`IKEv2`}:</span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">192.168.160.0/24</span>
                            </div>
                          )}
                          {starContext.state.Choose.Networks?.VPNServerNetworks?.SSH && (
                            <div class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">{$localize`SSH Server`}:</span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">192.168.165.0/24</span>
                            </div>
                          )}
                          {starContext.state.Choose.Networks?.VPNServerNetworks?.Socks5 && (
                            <div class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">{$localize`Socks5 Proxy`}:</span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">192.168.155.0/24</span>
                            </div>
                          )}
                          {starContext.state.Choose.Networks?.VPNServerNetworks?.HTTPProxy && (
                            <div class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">{$localize`HTTP Proxy`}:</span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">192.168.156.0/24</span>
                            </div>
                          )}
                          {starContext.state.Choose.Networks?.VPNServerNetworks?.BackToHome && (
                            <div class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">{$localize`Back To Home`}:</span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">192.168.157.0/24</span>
                            </div>
                          )}
                          {starContext.state.Choose.Networks?.VPNServerNetworks?.ZeroTier && (
                            <div class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">{$localize`ZeroTier`}:</span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">192.168.158.0/24</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Tunnel Networks if configured */}
                    {starContext.state.LAN.Tunnel && (
                      (starContext.state.LAN.Tunnel.IPIP && starContext.state.LAN.Tunnel.IPIP.length > 0) ||
                      (starContext.state.LAN.Tunnel.Eoip && starContext.state.LAN.Tunnel.Eoip.length > 0) ||
                      (starContext.state.LAN.Tunnel.Gre && starContext.state.LAN.Tunnel.Gre.length > 0) ||
                      (starContext.state.LAN.Tunnel.Vxlan && starContext.state.LAN.Tunnel.Vxlan.length > 0)
                    ) && (
                      <div class="p-4 rounded-lg bg-purple-50/50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                        <h4 class="font-medium text-purple-700 dark:text-purple-300 mb-3 flex items-center gap-2">
                          <LuRoute class="h-4 w-4" />
                          {$localize`Tunnel Networks`}
                        </h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {starContext.state.LAN.Tunnel.IPIP?.map((tunnel, index) => (
                            <div key={index} class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">{tunnel.name || `IPIP${index + 1}`}:</span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">192.168.{170 + index}.0/30</span>
                            </div>
                          ))}
                          {starContext.state.LAN.Tunnel.Eoip?.map((tunnel, index) => (
                            <div key={index} class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">{tunnel.name || `EoIP${index + 1}`}:</span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">192.168.{180 + index}.0/30</span>
                            </div>
                          ))}
                          {starContext.state.LAN.Tunnel.Gre?.map((tunnel, index) => (
                            <div key={index} class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">{tunnel.name || `GRE${index + 1}`}:</span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">192.168.{190 + index}.0/30</span>
                            </div>
                          ))}
                          {starContext.state.LAN.Tunnel.Vxlan?.map((tunnel, index) => (
                            <div key={index} class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">{tunnel.name || `VXLAN${index + 1}`}:</span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">192.168.{210 + index}.0/30</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Card variant="outlined" class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardFooter>
                  <div class="flex items-center justify-end w-full">
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
                class="mb-6 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
              >
                <div class="flex gap-3">
                  <LuInfo class="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div class="space-y-2">
                    <p class="text-sm text-gray-700 dark:text-gray-300">
                      {$localize`We've established a systematic subnet configuration that helps organize and manage your network effectively. These values follow best practices for network segmentation and routing.`}
                    </p>
                    <p class="text-sm font-semibold text-amber-700 dark:text-amber-400">
                      ⚠️ {$localize`Warning: Only modify these settings if you have technical networking knowledge. Incorrect subnet values may cause network connectivity issues and routing problems.`}
                    </p>
                  </div>
                </div>
              </Alert>

              {/* Custom Wrapping Tab Navigation */}
              {tabs.value.length > 0 && (
                <div class="mb-6">
                  <div class="flex flex-wrap gap-2 justify-center">
                    {tabs.value.map((tab) => (
                      <button
                        key={tab.id}
                        onClick$={() => handleTabSelect$(tab.id)}
                        class={`
                          px-4 py-2.5 rounded-full font-medium transition-all duration-200
                          flex items-center gap-2
                          ${activeTab.value === tab.id
                            ? 'bg-primary-500 text-white shadow-lg transform scale-105'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                          }
                        `}
                        aria-selected={activeTab.value === tab.id}
                        role="tab"
                      >
                        {tab.icon}
                        <span>{tab.label}</span>
                        {tab.count > 0 && (
                          <span class={`
                            ml-1 px-2 py-0.5 rounded-full text-xs font-semibold
                            ${activeTab.value === tab.id
                              ? 'bg-white/20 text-white'
                              : 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                            }
                          `}>
                            {tab.count}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab Content */}
              <div class="min-h-[400px] relative">
                {/* Debug info - remove after testing */}
                {/* <div class="text-xs text-gray-500 mb-2">Active Tab: {activeTab.value}</div> */}

                {/* Render active tab content - TabContent handles empty configs */}
                {activeTab.value === 'base' && (
                  <TabContent
                    category="base"
                    configs={extendedGroupedConfigs.base || []}
                    values={values.value}
                    onChange$={handleChange$}
                    errors={errors.value}
                  />
                )}
                {activeTab.value === 'wan-domestic' && (
                  <TabContent
                    category="wan-domestic"
                    configs={extendedGroupedConfigs['wan-domestic'] || []}
                    values={values.value}
                    onChange$={handleChange$}
                    errors={errors.value}
                  />
                )}
                {activeTab.value === 'wan-foreign' && (
                  <TabContent
                    category="wan-foreign"
                    configs={extendedGroupedConfigs['wan-foreign'] || []}
                    values={values.value}
                    onChange$={handleChange$}
                    errors={errors.value}
                  />
                )}
                {activeTab.value === 'vpn-client' && (
                  <TabContent
                    category="vpn-client"
                    configs={extendedGroupedConfigs['vpn-client'] || []}
                    values={values.value}
                    onChange$={handleChange$}
                    errors={errors.value}
                  />
                )}
                {activeTab.value === 'vpn' && (
                  <TabContent
                    category="vpn"
                    configs={extendedGroupedConfigs.vpn || []}
                    values={values.value}
                    onChange$={handleChange$}
                    errors={errors.value}
                  />
                )}
                {activeTab.value === 'tunnel' && (
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
              <Card variant="outlined" class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-primary-200 dark:border-primary-800">
                <CardFooter class="bg-gradient-to-r from-primary-50/50 to-blue-50/50 dark:from-primary-900/20 dark:to-blue-900/20">
                  <div class="flex items-center justify-between w-full">
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
                      disabled={!isValid.value || Object.keys(errors.value).length > 0}
                      class="px-8 font-medium shadow-lg hover:shadow-xl transition-shadow"
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
