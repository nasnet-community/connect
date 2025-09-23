import {
  component$,
  useContext,
  useSignal,
  useComputed$,
  $,
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
        count: extendedGroupedConfigs.base.filter((c: any) => values[c.key] !== null).length,
      });
    }

    // Show domestic tab if there are multiple domestic WAN links
    if (extendedGroupedConfigs['wan-domestic']?.length > 0) {
      tabList.push({
        id: 'wan-domestic',
        label: $localize`Domestic`,
        icon: <LuHome class="h-4 w-4" />,
        count: extendedGroupedConfigs['wan-domestic'].filter((c: any) => values[c.key] !== null).length,
      });
    }

    // Show foreign tab if there are multiple foreign WAN links
    if (extendedGroupedConfigs['wan-foreign']?.length > 0) {
      tabList.push({
        id: 'wan-foreign',
        label: $localize`Foreign`,
        icon: <LuGlobe class="h-4 w-4" />,
        count: extendedGroupedConfigs['wan-foreign'].filter((c: any) => values[c.key] !== null).length,
      });
    }

    // Show VPN Client tab if there are multiple VPN clients
    if (extendedGroupedConfigs['vpn-client']?.length > 0) {
      tabList.push({
        id: 'vpn-client',
        label: $localize`VPN Client`,
        icon: <LuLock class="h-4 w-4" />,
        count: extendedGroupedConfigs['vpn-client'].filter((c: any) => values[c.key] !== null).length,
      });
    }

    // Show VPN Server tab if there are VPN servers configured
    if (extendedGroupedConfigs.vpn?.length > 0) {
      tabList.push({
        id: 'vpn',
        label: $localize`VPN Server`,
        icon: <LuShield class="h-4 w-4" />,
        count: extendedGroupedConfigs.vpn.filter((c: any) => values[c.key] !== null).length,
      });
    }

    // Show Tunnel tab if there are tunnels configured
    if (extendedGroupedConfigs.tunnel?.length > 0) {
      tabList.push({
        id: 'tunnel',
        label: $localize`Tunnel`,
        icon: <LuRoute class="h-4 w-4" />,
        count: extendedGroupedConfigs.tunnel.filter((c: any) => values[c.key] !== null).length,
      });
    }

    return tabList;
  });

  // Initialize active tab with first available tab
  useComputed$(() => {
    // Set initial tab if current tab doesn't exist in tabs array
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
      // Clear subnets when disabled - use empty Record for backward compatibility
      await starContext.updateLAN$({ Subnets: {} as any });
      if (onComplete$) {
        onComplete$();
      }
      return;
    }

    const isValidationPassed = await validateAll$();
    if (!isValidationPassed) {
      return;
    }

    // Convert third octet values back to full CIDR format for storage
    const finalSubnets: Record<string, string> = {};

    [
      ...extendedGroupedConfigs.base,
      ...extendedGroupedConfigs.vpn,
      ...extendedGroupedConfigs.tunnel,
      ...extendedGroupedConfigs["wan-domestic"],
      ...extendedGroupedConfigs["wan-foreign"],
      ...extendedGroupedConfigs["vpn-client"]
    ].forEach((config) => {
      const value = values[config.key];
      if (value !== null && value !== undefined) {
        finalSubnets[config.key] = `192.168.${value}.0/${config.mask}`;
      } else if (config.isRequired) {
        // Use placeholder for required empty values
        finalSubnets[config.key] = `192.168.${config.placeholder}.0/${config.mask}`;
      }
    });

    // Update context - use any for backward compatibility
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

                    {/* VPN Server Networks if configured */}
                    {starContext.state.LAN.VPNServer && (
                      (starContext.state.LAN.VPNServer.WireguardServers && starContext.state.LAN.VPNServer.WireguardServers.length > 0) ||
                      (starContext.state.LAN.VPNServer.OpenVpnServer && starContext.state.LAN.VPNServer.OpenVpnServer.length > 0) ||
                      starContext.state.LAN.VPNServer.L2tpServer?.enabled ||
                      starContext.state.LAN.VPNServer.PptpServer?.enabled ||
                      starContext.state.LAN.VPNServer.SstpServer?.enabled ||
                      starContext.state.LAN.VPNServer.Ikev2Server
                    ) && (
                      <div class="p-4 rounded-lg bg-green-50/50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                        <h4 class="font-medium text-green-700 dark:text-green-300 mb-3 flex items-center gap-2">
                          <LuShield class="h-4 w-4" />
                          {$localize`VPN Server Networks`}
                        </h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {starContext.state.LAN.VPNServer.WireguardServers?.map((server, index) => (
                            <div key={index} class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">{server.Interface?.Name || `WireGuard${index + 1}`}:</span>
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
                    values={values}
                    onChange$={handleChange$}
                    errors={errors}
                  />
                )}
                {activeTab.value === 'wan-domestic' && (
                  <TabContent
                    category="wan-domestic"
                    configs={extendedGroupedConfigs['wan-domestic'] || []}
                    values={values}
                    onChange$={handleChange$}
                    errors={errors}
                  />
                )}
                {activeTab.value === 'wan-foreign' && (
                  <TabContent
                    category="wan-foreign"
                    configs={extendedGroupedConfigs['wan-foreign'] || []}
                    values={values}
                    onChange$={handleChange$}
                    errors={errors}
                  />
                )}
                {activeTab.value === 'vpn-client' && (
                  <TabContent
                    category="vpn-client"
                    configs={extendedGroupedConfigs['vpn-client'] || []}
                    values={values}
                    onChange$={handleChange$}
                    errors={errors}
                  />
                )}
                {activeTab.value === 'vpn' && (
                  <TabContent
                    category="vpn"
                    configs={extendedGroupedConfigs.vpn || []}
                    values={values}
                    onChange$={handleChange$}
                    errors={errors}
                  />
                )}
                {activeTab.value === 'tunnel' && (
                  <TabContent
                    category="tunnel"
                    configs={extendedGroupedConfigs.tunnel || []}
                    values={values}
                    onChange$={handleChange$}
                    errors={errors}
                  />
                )}
              </div>

              {/* Action Footer with Enhanced Design */}
              <Card variant="outlined" class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-primary-200 dark:border-primary-800">
                <CardFooter class="bg-gradient-to-r from-primary-50/50 to-blue-50/50 dark:from-primary-900/20 dark:to-blue-900/20">
                  <div class="flex items-center justify-between w-full">
                    {/* Status Display */}
                    <div class="flex items-center gap-3">
                      {Object.keys(errors).length > 0 ? (
                        <>
                          <LuAlertTriangle class="h-5 w-5 text-red-500" />
                          <span class="text-sm text-red-600 dark:text-red-400">
                            {$localize`Please fix ${Object.keys(errors).length} error(s)`}
                          </span>
                        </>
                      ) : isValid ? (
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
                      disabled={!isValid}
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
