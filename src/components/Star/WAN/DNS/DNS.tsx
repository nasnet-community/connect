import { component$, $, useComputed$ } from "@builder.io/qwik";
import { Alert } from "~/components/Core";
import { 
  LuShield, 
  LuHome,
  LuWifi,
  LuGlobe2
} from "@qwikest/icons/lucide";
import { useDNS } from "./useDNS";
import { NetworkDNSCard } from "./NetworkDNSCard";
import { DOHConfiguration } from "./DOHConfiguration";
import type { DNSStepProps } from "./types";

export const DNS = component$<DNSStepProps>(({ onComplete$ }) => {
  const {
    dnsConfig,
    validationErrors,
    isValidating,
    isDomestic,
    dohPresets,
    getAvailablePresetsForNetwork,
    getNetworkConfigs,
    getDOHNetworkInfo,
    updateDNS,
    updateDOH,
    validateAll,
    saveConfiguration,
    applyDNSPreset,
    applyDOHPreset,
    copyDNSConfig,
  } = useDNS();

  const handleComplete = $(async () => {
    console.group("[DNS] Step completion triggered");
    
    try {
      const isValid = await validateAll();
      console.log("Validation result:", isValid);
      console.log("Validation errors:", validationErrors);

      if (isValid) {
        await saveConfiguration();
        console.log("DNS configuration saved:", dnsConfig);
        await onComplete$();
        console.log("Step marked as complete");
      } else {
        console.log("Validation failed, showing errors");
      }
    } catch (error) {
      console.error("Error in DNS step completion:", error);
    }

    console.groupEnd();
  });

  const networkConfigs = useComputed$(() => getNetworkConfigs());
  const dohNetworkInfo = useComputed$(() => getDOHNetworkInfo());
  
  // Pre-compute available presets for each network to avoid serialization issues
  const availablePresetsMap = useComputed$(async () => {
    const configs = networkConfigs.value;
    const presetsMap: Record<string, any[]> = {};
    
    for (const config of configs) {
      presetsMap[config.type] = await getAvailablePresetsForNetwork(config.type);
    }
    
    return presetsMap;
  });
  
  const hasErrors = Object.keys(validationErrors).length > 0;
  const isConfigurationValid = !hasErrors && networkConfigs.value.every(config => config.dns.trim());

  return (
    <div class="w-full p-4">
      <div class="rounded-lg bg-surface p-6 shadow-md transition-all dark:bg-surface-dark">
        <div class="space-y-6">
          {/* Header */}
          <div class="flex items-center space-x-4">
            <div class="rounded-full bg-primary-100 p-3 dark:bg-primary-900">
              <LuGlobe2 class="h-6 w-6 text-primary-600 dark:text-primary-300" />
            </div>
            <div>
              <h2 class="text-text-default text-xl font-semibold dark:text-text-dark-default">
                {$localize`DNS Configuration`}
              </h2>
              <p class="text-text-muted dark:text-text-dark-muted">
                {$localize`Configure DNS servers and security settings for each network`}
              </p>
            </div>
          </div>
          {/* Network DNS Configuration */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-text-default dark:text-text-dark-default flex items-center gap-2">
              <LuWifi class="h-5 w-5 text-primary-500" />
              {$localize`Network DNS Servers`}
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
              {networkConfigs.value.map((config) => (
                <NetworkDNSCard
                  key={config.type}
                  config={config}
                  error={validationErrors[config.type]}
                  availablePresets={availablePresetsMap.value?.[config.type] || []}
                  onDNSChange$={updateDNS}
                  onCopyDNS$={copyDNSConfig}
                  onApplyPreset$={applyDNSPreset}
                />
              ))}
            </div>
          </div>

          {/* DOH Configuration */}
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <h3 class="text-lg font-medium text-text-default dark:text-text-dark-default flex items-center gap-2">
                <LuShield class="h-5 w-5 text-primary-500" />
                {$localize`DNS Security (DOH)`}
              </h3>
              
              <div class={`
                inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium
                ${isDomestic 
                  ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' 
                  : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                }
              `}>
                {isDomestic ? <LuHome class="h-3 w-3" /> : <LuShield class="h-3 w-3" />}
                {$localize`For ${isDomestic ? 'Domestic' : 'VPN'} Network`}
              </div>
            </div>

            <DOHConfiguration
              dohConfig={dnsConfig.DOH || {}}
              networkInfo={dohNetworkInfo.value}
              domainError={validationErrors.dohDomain}
              bindingError={validationErrors.dohBinding}
              dohPresets={dohPresets}
              onDOHChange$={updateDOH}
              onApplyDOHPreset$={applyDOHPreset}
            />
          </div>

          {/* Validation Errors */}
          {hasErrors && !isValidating.value && (
            <Alert
              status="error"
              title={$localize`Configuration Issues`}
            >
              <div class="mt-2">
                <p class="text-sm text-red-700 dark:text-red-300 mb-3">
                  {$localize`Please resolve the following issues:`}
                </p>
                <div class="space-y-2">
                  {Object.entries(validationErrors).map(([field, error]) => (
                    <div key={field} class="flex items-center gap-2 text-sm text-red-700 dark:text-red-300">
                      <div class="w-1.5 h-1.5 bg-red-500 rounded-full" />
                      <span class="font-medium capitalize">{field}:</span>
                      <span>{error}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Alert>
          )}

          {/* ActionFooter */}
          <div class="flex items-center justify-between border-t border-border pt-4 dark:border-border-dark">
            <span class={`text-sm ${isConfigurationValid ? "text-success" : "text-warning"}`}>
              {isConfigurationValid
                ? $localize`Configuration Complete`
                : $localize`Configuration Incomplete`}
            </span>
            <button
              onClick$={handleComplete}
              class="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium 
              text-white transition-colors hover:bg-primary-600
              disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!isConfigurationValid}
            >
              {isConfigurationValid ? $localize`Configured` : $localize`Save`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});