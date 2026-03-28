import { component$, $, useComputed$, useSignal } from "@builder.io/qwik";
import {
  Alert,
  GradientHeader,
  Card,
  CardFooter,
  Button,
} from "~/components/Core";
import {
  LuShield,
  LuHome,
  LuWifi,
  LuGlobe2,
  LuCheckCircle,
  LuAlertTriangle,
  LuInfo,
} from "@qwikest/icons/lucide";
import { useDNS } from "./useDNS";
import { NetworkDNSCard } from "./NetworkDNSCard";
import { DOHConfiguration } from "./DOHConfiguration";
import type { DNSStepProps } from "./types";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export const DNS = component$<DNSStepProps>(({ onComplete$, onDisabled$ }) => {
  const locale = useMessageLocale();
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

  // Enable/disable state - default false (disabled by default)2
  const dnsEnabled = useSignal(false);

  const handleComplete = $(async () => {
    if (!dnsEnabled.value) {
      // Save with default DNS configuration when disabled
      await saveConfiguration(false);
      onComplete$();
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
      presetsMap[config.type] = await getAvailablePresetsForNetwork(
        config.type,
      );
    }

    return presetsMap;
  });

  const hasErrors = Object.keys(validationErrors).length > 0;
  const isConfigurationValid =
    !hasErrors &&
    (dnsEnabled.value
      ? networkConfigs.value.every((config) => config.dns.trim())
      : true);

  return (
    <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-primary-50/50 dark:from-gray-900 dark:via-blue-900/10 dark:to-primary-900/10">
      <div class="container mx-auto w-full max-w-7xl px-6 py-8">
        <div class="space-y-8">
          {/* Modern Header */}
          <GradientHeader
            title={semanticMessages.dns_title({}, { locale })}
            description={semanticMessages.dns_description({}, { locale })}
            icon={<LuGlobe2 class="h-10 w-10" />}
            toggleConfig={{
              enabled: dnsEnabled,
              onChange$: $(async (enabled: boolean) => {
                if (!enabled && onDisabled$) {
                  await onDisabled$();
                }
              }),
              label: semanticMessages.dns_enable_label({}, { locale }),
            }}
            gradient={{
              direction: "to-br",
              from: "blue-50",
              via: "primary-50",
              to: "blue-100",
            }}
            features={[
              {
                label: semanticMessages.dns_feature_fast_resolution(
                  {},
                  { locale },
                ),
                color: "blue-500",
              },
              {
                label: semanticMessages.dns_feature_security_filtering(
                  {},
                  { locale },
                ),
                color: "green-500",
              },
              {
                label: semanticMessages.dns_feature_custom_configurations(
                  {},
                  { locale },
                ),
                color: "primary-500",
              },
            ]}
            showFeaturesWhen={dnsEnabled.value}
          />

          {!dnsEnabled.value ? (
            /* Disabled State with Default DNS Display */
            <div class="space-y-6">
              <div class="relative overflow-hidden rounded-2xl border border-gray-200 bg-white/60 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/60">
                <div class="absolute inset-0 bg-gradient-to-br from-gray-100/50 to-gray-200/50 dark:from-gray-800/50 dark:to-gray-900/50" />
                <div class="relative z-10 p-8">
                  <div class="mb-6 text-center">
                    <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                      <LuGlobe2 class="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 class="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-300">
                      {semanticMessages.dns_default_state_title({}, { locale })}
                    </h3>
                    <p class="mx-auto max-w-md text-sm text-gray-600 dark:text-gray-400">
                      {semanticMessages.dns_default_state_description(
                        {},
                        { locale },
                      )}
                    </p>
                  </div>

                  {/* Default DNS Display */}
                  <div class="mt-8 space-y-4">
                    <div class="rounded-lg border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                      <h4 class="mb-3 flex items-center gap-2 font-medium text-blue-700 dark:text-blue-300">
                        <LuGlobe2 class="h-4 w-4" />
                        {semanticMessages.dns_default_servers_title(
                          {},
                          { locale },
                        )}
                      </h4>
                      <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <div class="flex justify-between text-sm">
                          <span class="text-gray-600 dark:text-gray-400">
                            {semanticMessages.dns_network_foreign(
                              {},
                              { locale },
                            )}
                            :
                          </span>
                          <span class="font-mono text-gray-900 dark:text-gray-100">
                            8.8.8.8
                          </span>
                        </div>
                        <div class="flex justify-between text-sm">
                          <span class="text-gray-600 dark:text-gray-400">
                            {semanticMessages.dns_network_vpn({}, { locale })}:
                          </span>
                          <span class="font-mono text-gray-900 dark:text-gray-100">
                            1.1.1.1
                          </span>
                        </div>
                        {isDomestic && (
                          <>
                            <div class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">
                                {semanticMessages.dns_network_split(
                                  {},
                                  { locale },
                                )}
                                :
                              </span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">
                                9.9.9.9
                              </span>
                            </div>
                            <div class="flex justify-between text-sm">
                              <span class="text-gray-600 dark:text-gray-400">
                                {semanticMessages.dns_network_domestic(
                                  {},
                                  { locale },
                                )}
                                :
                              </span>
                              <span class="font-mono text-gray-900 dark:text-gray-100">
                                208.67.222.222
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Card
                variant="outlined"
                class="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80"
              >
                <CardFooter>
                  <div class="flex w-full items-center justify-end">
                    <Button onClick$={handleComplete} size="lg" class="px-8">
                      {semanticMessages.dns_save_continue({}, { locale })}
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
                title={semanticMessages.dns_notice_title({}, { locale })}
                class="mb-6 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20"
              >
                <div class="flex gap-3">
                  <LuInfo class="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                  <div class="space-y-2">
                    <p class="text-sm text-gray-700 dark:text-gray-300">
                      {semanticMessages.dns_notice_description({}, { locale })}
                    </p>
                  </div>
                </div>
              </Alert>
              {/* Network DNS Configuration */}
              <div class="space-y-4">
                <h3 class="text-text-default flex items-center gap-2 text-lg font-medium dark:text-text-dark-default">
                  <LuWifi class="h-5 w-5 text-primary-500" />
                  {semanticMessages.dns_servers_title({}, { locale })}
                </h3>

                <div class="relative grid grid-cols-1 gap-4 md:grid-cols-2">
                  {networkConfigs.value.map((config) => (
                    <NetworkDNSCard
                      key={config.type}
                      config={config}
                      error={validationErrors[config.type]}
                      availablePresets={availablePresetsMap.value[config.type]}
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
                  <h3 class="text-text-default flex items-center gap-2 text-lg font-medium dark:text-text-dark-default">
                    <LuShield class="h-5 w-5 text-primary-500" />
                    {semanticMessages.dns_security_title({}, { locale })}
                  </h3>

                  <div
                    class={`
                    inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium
                    ${
                      isDomestic
                        ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                        : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    }
                  `}
                  >
                    {isDomestic ? (
                      <LuHome class="h-3 w-3" />
                    ) : (
                      <LuShield class="h-3 w-3" />
                    )}
                    {isDomestic
                      ? semanticMessages.dns_for_domestic_network(
                          {},
                          { locale },
                        )
                      : semanticMessages.dns_for_vpn_network({}, { locale })}
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
                  title={semanticMessages.dns_configuration_issues_title(
                    {},
                    { locale },
                  )}
                >
                  <div class="mt-2">
                    <p class="mb-3 text-sm text-red-700 dark:text-red-300">
                      {semanticMessages.dns_resolve_issues({}, { locale })}
                    </p>
                    <div class="space-y-2">
                      {Object.entries(validationErrors).map(
                        ([field, error]) => (
                          <div
                            key={field}
                            class="flex items-center gap-2 text-sm text-red-700 dark:text-red-300"
                          >
                            <div class="h-1.5 w-1.5 rounded-full bg-red-500" />
                            <span class="font-medium capitalize">{field}:</span>
                            <span>{error}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </Alert>
              )}

              {/* Action Footer with Enhanced Design */}
              <Card
                variant="outlined"
                class="border-primary-200 bg-white/90 backdrop-blur-sm dark:border-primary-800 dark:bg-gray-800/90"
              >
                <CardFooter class="bg-gradient-to-r from-blue-50/50 to-primary-50/50 dark:from-blue-900/20 dark:to-primary-900/20">
                  <div class="flex w-full items-center justify-between">
                    {/* Status Display */}
                    <div class="flex items-center gap-3">
                      {Object.keys(validationErrors).length > 0 ? (
                        <>
                          <LuAlertTriangle class="h-5 w-5 text-red-500" />
                          <span class="text-sm text-red-600 dark:text-red-400">
                            {semanticMessages.dns_fix_error_count(
                              { count: Object.keys(validationErrors).length },
                              { locale },
                            )}
                          </span>
                        </>
                      ) : isConfigurationValid ? (
                        <>
                          <LuCheckCircle class="h-5 w-5 text-green-500" />
                          <span class="text-sm text-green-600 dark:text-green-400">
                            {semanticMessages.dns_configuration_valid(
                              {},
                              { locale },
                            )}
                          </span>
                        </>
                      ) : (
                        <span class="text-sm text-gray-500 dark:text-gray-400">
                          {semanticMessages.dns_configure_settings(
                            {},
                            { locale },
                          )}
                        </span>
                      )}
                    </div>

                    {/* Action Button */}
                    <Button
                      onClick$={handleComplete}
                      size="lg"
                      disabled={!isConfigurationValid}
                      class="px-8 font-medium shadow-lg transition-shadow hover:shadow-xl"
                    >
                      {semanticMessages.dns_save_continue({}, { locale })}
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
