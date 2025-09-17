import { component$, useSignal, $, useVisibleTask$, useContext } from "@builder.io/qwik";
import { LuCable, LuWifi, LuRouter, LuLink, LuHome, LuGlobe, LuShield } from "@qwikest/icons/lucide";
import { useStepperContext } from "~/components/Core/Stepper/CStepper";
import { Card, CardHeader, Toggle, Alert } from "~/components/Core";
import { UsefulServicesStepperContextId } from "../UsefulServicesAdvanced";
import { StarContext } from "~/components/Star/StarContext/StarContext";
import type { NATPMPConfig } from "~/components/Star/StarContext/ExtraType";

// Define InterfaceOption locally since it doesn't exist in StarContext
export type InterfaceOption = {
  label: string;
  value: string;
  type: 'domestic' | 'foreign' | 'vpn';
  interfaceName: string;
  connectionType: string;
};

export const NATPMPStep = component$(() => {
  // Get stepper context
  const context = useStepperContext<any>(UsefulServicesStepperContextId);
  
  // Get StarContext to access WAN links and VPN clients
  const starContext = useContext(StarContext);

  // Access servicesData from context
  const { servicesData } = context.data;

  // Initialize NAT-PMP config from StarContext if exists, otherwise use defaults
  const existingConfig = starContext.state.ExtraConfig?.usefulServices?.natpmp;
  
  // Create local signals for form state
  const natpmpEnabled = useSignal(existingConfig?.linkType !== "" || false);
  const selectedInterface = useSignal<InterfaceOption | undefined>(undefined);

  // Get all available interfaces combined
  const getAllInterfaces = $(() => {
    const interfaces: InterfaceOption[] = [];
    
    // Get WAN links from the proper structure
    const wanLink = starContext.state.WAN.WANLink;
    
    // Add domestic links
    if (wanLink?.Domestic?.WANConfigs) {
      wanLink.Domestic.WANConfigs.forEach((config, index) => {
        interfaces.push({
          type: 'domestic',
          value: `domestic-${index}`,
          label: `${config.name || `Domestic Link ${index + 1}`}`,
          interfaceName: config.InterfaceConfig.InterfaceName,
          connectionType: 'domestic'
        });
      });
    }
    
    // Add foreign links
    if (wanLink?.Foreign?.WANConfigs) {
      wanLink.Foreign.WANConfigs.forEach((config, index) => {
        interfaces.push({
          type: 'foreign',
          value: `foreign-${index}`,
          label: `${config.name || `Foreign Link ${index + 1}`}`,
          interfaceName: config.InterfaceConfig.InterfaceName,
          connectionType: 'foreign'
        });
      });
    }
    
    // Get VPN clients - new structure has arrays for each VPN type
    const vpnClient = starContext.state.WAN.VPNClient;
    if (vpnClient) {
      // Wireguard VPNs
      if (vpnClient.Wireguard && vpnClient.Wireguard.length > 0) {
        vpnClient.Wireguard.forEach((vpn, index) => {
          interfaces.push({
            type: 'vpn',
            value: `wireguard-${index}`,
            label: `Wireguard VPN ${index + 1}`,
            interfaceName: `wg${index}`,
            connectionType: 'wireguard'
          });
        });
      }
      
      // OpenVPN
      if (vpnClient.OpenVPN && vpnClient.OpenVPN.length > 0) {
        vpnClient.OpenVPN.forEach((vpn, index) => {
          interfaces.push({
            type: 'vpn',
            value: `openvpn-${index}`,
            label: `OpenVPN ${index + 1}`,
            interfaceName: `ovpn${index}`,
            connectionType: 'openvpn'
          });
        });
      }
      
      // PPTP
      if (vpnClient.PPTP && vpnClient.PPTP.length > 0) {
        vpnClient.PPTP.forEach((vpn, index) => {
          interfaces.push({
            type: 'vpn',
            value: `pptp-${index}`,
            label: `PPTP VPN ${index + 1}`,
            interfaceName: `pptp${index}`,
            connectionType: 'pptp'
          });
        });
      }
      
      // L2TP
      if (vpnClient.L2TP && vpnClient.L2TP.length > 0) {
        vpnClient.L2TP.forEach((vpn, index) => {
          interfaces.push({
            type: 'vpn',
            value: `l2tp-${index}`,
            label: `L2TP VPN ${index + 1}`,
            interfaceName: `l2tp${index}`,
            connectionType: 'l2tp'
          });
        });
      }
      
      // SSTP
      if (vpnClient.SSTP && vpnClient.SSTP.length > 0) {
        vpnClient.SSTP.forEach((vpn, index) => {
          interfaces.push({
            type: 'vpn',
            value: `sstp-${index}`,
            label: `SSTP VPN ${index + 1}`,
            interfaceName: `sstp${index}`,
            connectionType: 'sstp'
          });
        });
      }
      
      // IKeV2
      if (vpnClient.IKeV2 && vpnClient.IKeV2.length > 0) {
        vpnClient.IKeV2.forEach((vpn, index) => {
          interfaces.push({
            type: 'vpn',
            value: `ikev2-${index}`,
            label: `IKeV2 VPN ${index + 1}`,
            interfaceName: `ike${index}`,
            connectionType: 'ikev2'
          });
        });
      }
    }
    
    return interfaces;
  });

  // Update context data and validate step completion
  const validateAndUpdate$ = $(() => {
    // Create NAT-PMP config
    const natpmpConfig: NATPMPConfig = {
      linkType: natpmpEnabled.value ? 
        (selectedInterface.value?.type === "domestic" ? "domestic" : 
         selectedInterface.value?.type === "foreign" ? "foreign" : 
         selectedInterface.value?.type === "vpn" ? "vpn" : "") : "",
      InterfaceName: selectedInterface.value?.value,
    };

    // Update services data for stepper context (backward compatibility)
    servicesData.natpmp = {
      enabled: natpmpEnabled.value,
      linkType: selectedInterface.value?.type || "",
    };

    // Update StarContext with full configuration
    // Update StarContext via usefulServices
    starContext.updateExtraConfig$({
      usefulServices: {
        ...starContext.state.ExtraConfig.usefulServices,
        natpmp: natpmpConfig,
      }
    });

    // Validate: Step is complete when NAT-PMP is disabled or when enabled with an interface selected
    const isComplete = !natpmpEnabled.value || (natpmpEnabled.value && selectedInterface.value !== undefined);

    // Find the current step and update its completion status
    const currentStepIndex = context.steps.value.findIndex(
      (step) => step.id === 6, // NAT-PMP step ID
    );
    if (currentStepIndex !== -1) {
      context.updateStepCompletion$(
        context.steps.value[currentStepIndex].id,
        isComplete,
      );
    }
  });

  // Handle interface selection
  const handleInterfaceSelect$ = $((iface: InterfaceOption) => {
    selectedInterface.value = iface;
    validateAndUpdate$();
  });

  // Run validation on component mount
  useVisibleTask$(async () => {
    validateAndUpdate$();
  });

  // Get icon for interface type
  const getInterfaceIcon = (type: 'domestic' | 'foreign' | 'vpn') => {
    switch(type) {
      case 'domestic':
        return <LuHome class="h-5 w-5" />;
      case 'foreign':
        return <LuGlobe class="h-5 w-5" />;
      case 'vpn':
        return <LuShield class="h-5 w-5" />;
    }
  };

  // Get connection type icon
  const getConnectionIcon = (connectionType: string) => {
    if (connectionType.includes('wifi') || connectionType.includes('wireless')) {
      return <LuWifi class="h-4 w-4" />;
    } else if (connectionType.includes('sfp')) {
      return <LuRouter class="h-4 w-4" />;
    } else {
      return <LuCable class="h-4 w-4" />;
    }
  };

  // Get type color classes
  const getTypeColorClasses = (type: 'domestic' | 'foreign' | 'vpn') => {
    switch(type) {
      case 'domestic':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700';
      case 'foreign':
        return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700';
      case 'vpn':
        return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-700';
    }
  };

  // Get card hover classes
  const getCardHoverClasses = (type: 'domestic' | 'foreign' | 'vpn', isSelected: boolean) => {
    const base = 'transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer';
    if (isSelected) {
      switch(type) {
        case 'domestic':
          return `${base} bg-blue-50 border-2 border-blue-500 shadow-blue-100 dark:bg-blue-900/30 dark:border-blue-400 dark:shadow-blue-900/20`;
        case 'foreign':
          return `${base} bg-green-50 border-2 border-green-500 shadow-green-100 dark:bg-green-900/30 dark:border-green-400 dark:shadow-green-900/20`;
        case 'vpn':
          return `${base} bg-purple-50 border-2 border-purple-500 shadow-purple-100 dark:bg-purple-900/30 dark:border-purple-400 dark:shadow-purple-900/20`;
      }
    }
    return `${base} bg-white border-2 border-gray-200 hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600`;
  };

  return (
    <div class="space-y-8 animate-fade-in-up">
      {/* Modern header */}
      <div class="text-center space-y-4">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-500 text-white mb-6 shadow-xl shadow-primary-500/25 transition-transform hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h3 class="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
          {$localize`NAT-PMP Configuration`}
        </h3>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          {$localize`Configure NAT Port Mapping Protocol for automatic port forwarding and NAT traversal`}
        </p>
      </div>

      {/* NAT-PMP Enable Toggle */}
      <Card class="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-2 border-primary-200/50 dark:border-primary-700/50 shadow-lg">
        <CardHeader>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="flex h-16 w-16 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h4 class="text-2xl font-bold text-gray-900 dark:text-white">
                  {$localize`Enable NAT-PMP`}
                </h4>
                <p class="text-gray-600 dark:text-gray-400 mt-1">
                  {$localize`Enable Network Address Translation Port Mapping Protocol`}
                </p>
                <div class="mt-3 flex items-center gap-3">
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-400">
                    {$localize`Port Mapping`}
                  </span>
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-400">
                    {$localize`NAT Traversal`}
                  </span>
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-400">
                    {$localize`Apple Compatible`}
                  </span>
                </div>
              </div>
            </div>
            <Toggle
              checked={natpmpEnabled.value}
              onChange$={$((checked) => {
                natpmpEnabled.value = checked;
                validateAndUpdate$();
              })}
              size="lg"
              color="primary"
            />
          </div>
        </CardHeader>
      </Card>

      {/* Interface Selection - shown only when NAT-PMP is enabled */}
      {natpmpEnabled.value && (
        <div class="space-y-6 animate-fade-in-up">
          <div class="text-center">
            <h4 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {$localize`Select Interface for NAT-PMP`}
            </h4>
            <p class="text-gray-600 dark:text-gray-400">
              {$localize`Choose one network interface where NAT-PMP will be enabled`}
            </p>
          </div>

          {getAllInterfaces().then((interfaces) => {
            if (interfaces.length === 0) {
              return (
                <Alert
                  status="warning"
                  title={$localize`No Interfaces Available`}
                  class="border-0 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 shadow-lg"
                >
                  <div class="text-sm text-amber-800 dark:text-amber-300">
                    <p>
                      {$localize`No WAN links or VPN clients have been configured yet. Please configure at least one WAN link or VPN client in the previous steps before enabling NAT-PMP.`}
                    </p>
                  </div>
                </Alert>
              );
            }

            // Group interfaces by type
            const domesticInterfaces = interfaces.filter(i => i.type === 'domestic');
            const foreignInterfaces = interfaces.filter(i => i.type === 'foreign');
            const vpnInterfaces = interfaces.filter(i => i.type === 'vpn');

            return (
              <div class="mx-auto max-w-6xl space-y-8">
                {/* Domestic Links */}
                {domesticInterfaces.length > 0 && (
                  <div class="space-y-4">
                    <div class="flex items-center gap-3">
                      <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                        <LuHome class="h-5 w-5" />
                      </div>
                      <h5 class="text-lg font-semibold text-gray-900 dark:text-white">
                        {$localize`Domestic Network Links`}
                      </h5>
                      <span class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                        {domesticInterfaces.length} {domesticInterfaces.length === 1 ? 'link' : 'links'}
                      </span>
                    </div>
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {domesticInterfaces.map((iface) => {
                        const isSelected = selectedInterface.value?.value === iface.value;
                        return (
                          <div
                            key={iface.value}
                            onClick$={() => handleInterfaceSelect$(iface)}
                            class={`${getCardHoverClasses('domestic', isSelected)} rounded-xl p-4`}
                          >
                            <div class="flex items-start gap-3">
                              <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                                {getConnectionIcon(iface.connectionType)}
                              </div>
                              <div class="flex-1 min-w-0">
                                <div class="flex items-center gap-2">
                                  <h6 class="truncate text-sm font-semibold text-gray-900 dark:text-white">
                                    {iface.label}
                                  </h6>
                                  {isSelected && (
                                    <div class="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500">
                                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width={3} d="M5 13l4 4L19 7" />
                                      </svg>
                                    </div>
                                  )}
                                </div>
                                <p class="truncate text-xs text-gray-500 dark:text-gray-400">
                                  Interface: {iface.interfaceName}
                                </p>
                                <div class="mt-2 flex items-center gap-1">
                                  <span class={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium border ${getTypeColorClasses('domestic')}`}>
                                    <LuHome class="h-3 w-3" />
                                    {$localize`Domestic`}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Foreign Links */}
                {foreignInterfaces.length > 0 && (
                  <div class="space-y-4">
                    <div class="flex items-center gap-3">
                      <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
                        <LuGlobe class="h-5 w-5" />
                      </div>
                      <h5 class="text-lg font-semibold text-gray-900 dark:text-white">
                        {$localize`Foreign Network Links`}
                      </h5>
                      <span class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/50 dark:text-green-300">
                        {foreignInterfaces.length} {foreignInterfaces.length === 1 ? 'link' : 'links'}
                      </span>
                    </div>
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {foreignInterfaces.map((iface) => {
                        const isSelected = selectedInterface.value?.value === iface.value;
                        return (
                          <div
                            key={iface.value}
                            onClick$={() => handleInterfaceSelect$(iface)}
                            class={`${getCardHoverClasses('foreign', isSelected)} rounded-xl p-4`}
                          >
                            <div class="flex items-start gap-3">
                              <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
                                {getConnectionIcon(iface.connectionType)}
                              </div>
                              <div class="flex-1 min-w-0">
                                <div class="flex items-center gap-2">
                                  <h6 class="truncate text-sm font-semibold text-gray-900 dark:text-white">
                                    {iface.label}
                                  </h6>
                                  {isSelected && (
                                    <div class="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width={3} d="M5 13l4 4L19 7" />
                                      </svg>
                                    </div>
                                  )}
                                </div>
                                <p class="truncate text-xs text-gray-500 dark:text-gray-400">
                                  Interface: {iface.interfaceName}
                                </p>
                                <div class="mt-2 flex items-center gap-1">
                                  <span class={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium border ${getTypeColorClasses('foreign')}`}>
                                    <LuGlobe class="h-3 w-3" />
                                    {$localize`Foreign`}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* VPN Clients */}
                {vpnInterfaces.length > 0 && (
                  <div class="space-y-4">
                    <div class="flex items-center gap-3">
                      <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400">
                        <LuShield class="h-5 w-5" />
                      </div>
                      <h5 class="text-lg font-semibold text-gray-900 dark:text-white">
                        {$localize`VPN Client Connections`}
                      </h5>
                      <span class="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/50 dark:text-purple-300">
                        {vpnInterfaces.length} {vpnInterfaces.length === 1 ? 'client' : 'clients'}
                      </span>
                    </div>
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {vpnInterfaces.map((iface) => {
                        const isSelected = selectedInterface.value?.value === iface.value;
                        return (
                          <div
                            key={iface.value}
                            onClick$={() => handleInterfaceSelect$(iface)}
                            class={`${getCardHoverClasses('vpn', isSelected)} rounded-xl p-4`}
                          >
                            <div class="flex items-start gap-3">
                              <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400">
                                <LuShield class="h-6 w-6" />
                              </div>
                              <div class="flex-1 min-w-0">
                                <div class="flex items-center gap-2">
                                  <h6 class="truncate text-sm font-semibold text-gray-900 dark:text-white">
                                    {iface.label}
                                  </h6>
                                  {isSelected && (
                                    <div class="flex h-5 w-5 items-center justify-center rounded-full bg-purple-500">
                                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width={3} d="M5 13l4 4L19 7" />
                                      </svg>
                                    </div>
                                  )}
                                </div>
                                <p class="truncate text-xs text-gray-500 dark:text-gray-400">
                                  Interface: {iface.interfaceName}
                                </p>
                                <div class="mt-2 flex items-center gap-1">
                                  <span class={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium border ${getTypeColorClasses('vpn')}`}>
                                    <LuShield class="h-3 w-3" />
                                    {iface.connectionType.toUpperCase()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Selected interface summary */}
                {selectedInterface.value && (
                  <div class="mx-auto max-w-2xl rounded-xl border-2 border-dashed border-primary-300 bg-primary-50/50 p-6 dark:border-primary-600 dark:bg-primary-900/20">
                    <div class="flex items-center justify-center gap-3">
                      <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500 text-white">
                        <LuLink class="h-5 w-5" />
                      </div>
                      <div class="text-center">
                        <p class="text-sm font-medium text-primary-900 dark:text-primary-100">
                          {$localize`NAT-PMP will be enabled on:`}
                        </p>
                        <div class="mt-1 flex items-center justify-center gap-2">
                          {getInterfaceIcon(selectedInterface.value.type)}
                          <span class="font-semibold text-primary-800 dark:text-primary-200">
                            {selectedInterface.value.label} ({selectedInterface.value.interfaceName})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Selection validation warning */}
          {natpmpEnabled.value && !selectedInterface.value && (
            <Alert
              status="error"
              title={$localize`No Interface Selected`}
              class="border-0 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 shadow-lg animate-fade-in-up"
            >
              <div class="text-sm text-red-800 dark:text-red-300">
                <p>
                  {$localize`Please select an interface to enable NAT-PMP on, or disable NAT-PMP if not needed.`}
                </p>
              </div>
            </Alert>
          )}
        </div>
      )}

    </div>
  );
});