import {
  component$,
  useContext,
  useSignal,
  $,
  useTask$,
} from "@builder.io/qwik";
import { StarContext } from "~/components/Star/StarContext/StarContext";
import { Card, CardFooter, Button, GradientHeader } from "~/components/Core";
import type { StepProps } from "~/types/step";
import { 
  LuShield, 
  LuNetwork, 
  LuRoute, 
  LuCheckCircle,
  LuAlertTriangle 
} from "@qwikest/icons/lucide";
import { SubnetCard } from "./SubnetCard";
import { useSubnets } from "./useSubnets";

export const Subnets = component$<StepProps>(({ onComplete$, onDisabled$ }) => {
  const starContext = useContext(StarContext);
  
  // Check if subnets are already configured
  const hasSubnetsConfigured = !!(starContext.state.LAN.Subnets && Object.keys(starContext.state.LAN.Subnets).length > 0);
  
  // Enable/disable state - default true if subnets are configured, otherwise true (enabled by default)
  const subnetsEnabled = useSignal(hasSubnetsConfigured || true);

  // Use custom hook for subnet logic
  const {
    groupedConfigs,
    values,
    errors,
    isValid,
    handleChange$,
    validateAll$,
  } = useSubnets();

  // Handle save with modern error handling
  const handleSave$ = $(async () => {
    if (!subnetsEnabled.value) {
      // Clear subnets when disabled
      await starContext.updateLAN$({ Subnets: {} });
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
    
    [...groupedConfigs.base, ...groupedConfigs.vpn, ...groupedConfigs.tunnel].forEach((config) => {
      const value = values[config.key];
      if (value !== null && value !== undefined) {
        finalSubnets[config.key] = `192.168.${value}.0/${config.mask}`;
      } else if (config.isRequired) {
        // Use placeholder for required empty values
        finalSubnets[config.key] = `192.168.${config.placeholder}.0/${config.mask}`;
      }
    });

    // Update context
    await starContext.updateLAN$({ Subnets: finalSubnets });

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
            /* Disabled State with Modern Design */
            <div class="space-y-6">
              <div class="relative overflow-hidden rounded-2xl border border-gray-200 bg-white/60 dark:border-gray-700 dark:bg-gray-800/60 backdrop-blur-sm">
                <div class="absolute inset-0 bg-gradient-to-br from-gray-100/50 to-gray-200/50 dark:from-gray-800/50 dark:to-gray-900/50" />
                <div class="relative z-10 p-12 text-center">
                  <div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                    <LuNetwork class="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 class="mb-3 text-xl font-semibold text-gray-700 dark:text-gray-300">
                    {$localize`Network Configuration Disabled`}
                  </h3>
                  <p class="mx-auto max-w-md text-gray-600 dark:text-gray-400">
                    {$localize`Enable subnet configuration above to set up your network segments and IP addressing scheme.`}
                  </p>
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
            /* Enabled State with Modern Subnet Cards */
            <>
              <div class="space-y-8">
                {/* Base Networks Section */}
                {groupedConfigs.base.length > 0 && (
                  <div class="animate-in slide-in-from-left-4 duration-600">
                    <SubnetCard
                      title={$localize`Base Networks`}
                      description={$localize`Core network segments for your router configuration`}
                      icon={<LuNetwork class="h-6 w-6" />}
                      category="base"
                      configs={groupedConfigs.base}
                      values={values}
                      onChange$={handleChange$}
                      errors={errors}
                    />
                  </div>
                )}

                {/* VPN Networks Section */}
                {groupedConfigs.vpn.length > 0 && (
                  <div class="animate-in slide-in-from-left-4 duration-600" style={{ animationDelay: "200ms" }}>
                    <SubnetCard
                      title={$localize`VPN Server Networks`}
                      description={$localize`Dedicated subnets for VPN client connections`}
                      icon={<LuShield class="h-6 w-6" />}
                      category="vpn"
                      configs={groupedConfigs.vpn}
                      values={values}
                      onChange$={handleChange$}
                      errors={errors}
                    />
                  </div>
                )}

                {/* Tunnel Networks Section */}
                {groupedConfigs.tunnel.length > 0 && (
                  <div class="animate-in slide-in-from-left-4 duration-600" style={{ animationDelay: "400ms" }}>
                    <SubnetCard
                      title={$localize`Tunnel Networks`}
                      description={$localize`Point-to-point tunnel connections with /30 subnets`}
                      icon={<LuRoute class="h-6 w-6" />}
                      category="tunnel"
                      configs={groupedConfigs.tunnel}
                      values={values}
                      onChange$={handleChange$}
                      errors={errors}
                    />
                  </div>
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
