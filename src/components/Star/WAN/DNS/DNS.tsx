import { component$, $, useComputed$, useSignal } from "@builder.io/qwik";
import { Alert, GradientHeader, Card, CardFooter, Button } from "~/components/Core";
import {
  LuShield,
  LuHome,
  LuWifi,
  LuGlobe2,
  LuCheckCircle,
  LuAlertTriangle,
  LuInfo
} from "@qwikest/icons/lucide";
import { useDNS } from "./useDNS";
import { NetworkDNSCard } from "./NetworkDNSCard";
import { DOHConfiguration } from "./DOHConfiguration";
import type { DNSStepProps } from "./types";

export const DNS = component$<DNSStepProps>(({ onComplete$, onDisabled$ }) => {
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
    // updateDOH,
    validateAll,
    saveConfiguration,
    applyDNSPreset,
    applyDOHPreset,
    copyDNSConfig,
  } = useDNS();

  // Enable/disable state - default false (disabled by default)
  const dnsEnabled = useSignal(false);

  const handleComplete = $(async () => {
    if (!dnsEnabled.value) {
      // Save with default DNS configuration when disabled
      await saveConfiguration(false);
      if (onComplete$) {
        onComplete$();
      }
      return;
    }

    console.group("[DNS] Step completion triggered");

    try {
      const isValid = await validateAll();
      console.log("Validation result:", isValid);
      console.log("Validation errors:", validationErrors);

      if (isValid) {
        await saveConfiguration(true);
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
  const isConfigurationValid = !hasErrors && (dnsEnabled.value ? networkConfigs.value.every(config => config.dns.trim()) : true);

  return (
    <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-primary-50/50 dark:from-gray-900 dark:via-blue-900/10 dark:to-primary-900/10">
      <div class="container mx-auto w-full max-w-7xl px-6 py-8">
        <div class="space-y-8">
          {/* Modern Header */}
          <GradientHeader
            title={$localize`DNS Configuration`}
            description={$localize`Configure DNS servers and security settings for each network`}
            icon={<LuGlobe2 class="h-10 w-10" />}
            toggleConfig={{
              enabled: dnsEnabled,
              onChange$: $(async (enabled: boolean) => {
                if (!enabled && onDisabled$) {
                  await onDisabled$();
                }
              }),
              label: $localize`Enable DNS Configuration`
            }}
            gradient={{
              direction: "to-br",
              from: "blue-50",
              via: "primary-50",
              to: "blue-100"
            }}
            features={[
              { label: $localize`Fast DNS resolution`, color: "blue-500" },
              { label: $localize`Security filtering`, color: "green-500" },
              { label: $localize`Custom configurations`, color: "primary-500" }
            ]}
            showFeaturesWhen={dnsEnabled.value}
          />

          {!dnsEnabled.value ? (
            /* Disabled State with Default DNS Display */
            <div class="space-y-6">
              <div class="relative overflow-hidden rounded-2xl border border-gray-200 bg-white/60 dark:border-gray-700 dark:bg-gray-800/60 backdrop-blur-sm">
                <div class="absolute inset-0 bg-gradient-to-br from-gray-100/50 to-gray-200/50 dark:from-gray-800/50 dark:to-gray-900/50" />
                <div class="relative z-10 p-8">
                  <div class="mb-6 text-center">
                    <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                      <LuGlobe2 class="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 class="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-300">
                      {$localize`Using Default DNS Configuration`}
                    </h3>
                    <p class="mx-auto max-w-md text-sm text-gray-600 dark:text-gray-400">
                      {$localize`The following default DNS servers will be used. Enable DNS configuration above to customize these settings.`}
                    </p>
                  </div>

                  {/* Default DNS Display */}
                  <div class="mt-8 space-y-4">
                    <div class="p-4 rounded-lg bg-blue-50/50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                      <h4 class="font-medium text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2">
                        <LuGlobe2 class="h-4 w-4" />
                        {$localize`Default DNS Servers`}
                      </h4>
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div class="flex justify-between text-sm">
                          <span class="text-gray-600 dark:text-gray-400">{$localize`Foreign Network`}:</span>
                          <span class="font-mono text-gray-900 dark:text-gray-100">8.8.8.8</span>
                        </div>
                        <div class="flex justify-between text-sm">
                          <span class="text-gray-600 dark:text-gray-400">{$localize`VPN Network`}:</span>
                          <span class="font-mono text-gray-900 dark:text-gray-100">1.1.1.1</span>
                        </div>
                        {isDomestic && (
                          <>
                            <div class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">{$localize`Split Network`}:</span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">9.9.9.9</span>
                            </div>
                            <div class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">{$localize`Domestic Network`}:</span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">208.67.222.222</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Card variant="outlined" class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardFooter>
                  <div class="flex items-center justify-end w-full">
                    <Button onClick$={handleComplete} size="lg" class="px-8">
                      {$localize`Save & Continue`}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ) : (
            /* Enabled State with Full DNS Configuration */
            <>
              {/* Warning Alert about DNS Configuration */}
              <Alert
                status="info"
                title={$localize`DNS Configuration Notice`}
                class="mb-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
              >
                <div class="flex gap-3">
                  <LuInfo class="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div class="space-y-2">
                    <p class="text-sm text-gray-700 dark:text-gray-300">
                      {$localize`Configure custom DNS servers for each network segment. These settings will override default DNS configurations and can improve performance, security, and content filtering.`}
                    </p>
                  </div>
                </div>
              </Alert>
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
                  disabled={true}
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

              {/* Action Footer with Enhanced Design */}
              <Card variant="outlined" class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-primary-200 dark:border-primary-800">
                <CardFooter class="bg-gradient-to-r from-blue-50/50 to-primary-50/50 dark:from-blue-900/20 dark:to-primary-900/20">
                  <div class="flex items-center justify-between w-full">
                    {/* Status Display */}
                    <div class="flex items-center gap-3">
                      {Object.keys(validationErrors).length > 0 ? (
                        <>
                          <LuAlertTriangle class="h-5 w-5 text-red-500" />
                          <span class="text-sm text-red-600 dark:text-red-400">
                            {$localize`Please fix ${Object.keys(validationErrors).length} error(s)`}
                          </span>
                        </>
                      ) : isConfigurationValid ? (
                        <>
                          <LuCheckCircle class="h-5 w-5 text-green-500" />
                          <span class="text-sm text-green-600 dark:text-green-400">
                            {$localize`Configuration valid`}
                          </span>
                        </>
                      ) : (
                        <span class="text-sm text-gray-500 dark:text-gray-400">
                          {$localize`Configure your DNS settings`}
                        </span>
                      )}
                    </div>

                    {/* Action Button */}
                    <Button
                      onClick$={handleComplete}
                      size="lg"
                      disabled={!isConfigurationValid}
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