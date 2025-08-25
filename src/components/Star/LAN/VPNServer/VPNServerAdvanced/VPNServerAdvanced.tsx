import { component$, $, useStore, useSignal, useTask$ } from "@builder.io/qwik";
import type { StepProps } from "~/types/step";
import { useVPNServerAdvanced } from "./useVPNServerAdvanced";
import { VPNServerHeader } from "../VPNServerHeader";
import { ActionFooter } from "../ActionFooter";
import {
  CStepper,
  type CStepMeta,
} from "~/components/Core/Stepper/CStepper";
import { ProtocolsStep } from "./steps/ProtocolsStep";
import { ConfigStep } from "./steps/ConfigStep";
import { UsersStep } from "./steps/UsersStep";
import type { PropFunction } from "@builder.io/qwik";
import type { VPNType } from "../../../StarContext/CommonType";
import { VPNServerContextId, type VPNServerContextData } from "./VPNServerContext";

export const VPNServerAdvanced = component$<StepProps>(
  ({ onComplete$, onDisabled$ }) => {
    const {
      users,
      vpnServerEnabled,
      enabledProtocols,
      expandedSections,
      usernameErrors,
      isValid,
      toggleSection,
      addUser,
      removeUser,
      handleUsernameChange,
      handlePasswordChange,
      handleProtocolToggle,
      toggleProtocol,
      saveSettings,
    } = useVPNServerAdvanced();

    const toggleSection$ = $((section: string) => toggleSection(section));
    const toggleProtocol$ = $((protocol: VPNType) => toggleProtocol(protocol));
    const saveSettings$ = $((onComplete?: PropFunction<() => void>) =>
      saveSettings(onComplete),
    );

    // Track step completion state
    const stepState = useStore({
      protocols: false,
      config: false,
      users: false,
    });

    // Define serializable component functions with $()
    const ProtocolsStepWrapper$ = $((props: StepProps) => (
      <ProtocolsStep
        {...props}
        enabledProtocols={enabledProtocols}
        expandedSections={expandedSections}
        toggleSection$={toggleSection$}
        toggleProtocol$={toggleProtocol$}
      />
    ));

    const ConfigStepWrapper$ = $((props: StepProps) => (
      <ConfigStep {...props} enabledProtocols={enabledProtocols} />
    ));

    const UsersStepWrapper$ = $((props: StepProps) => (
      <UsersStep
        {...props}
        users={users}
        usernameErrors={usernameErrors}
        addUser={addUser}
        removeUser={removeUser}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        handleProtocolToggle={handleProtocolToggle}
        isValid={isValid}
      />
    ));

    // Create stable steps reference - initialize once
    const steps = useSignal<CStepMeta[]>([
      {
        id: 0,
        title: $localize`Protocols`,
        description: $localize`Choose which VPN protocols you want to enable on your router.`,
        component: ProtocolsStepWrapper$,
        isComplete: stepState.protocols,
      },
      {
        id: 1,
        title: $localize`Configuration`,
        description: $localize`Configure the settings for each enabled VPN protocol.`,
        component: ConfigStepWrapper$,
        isComplete: stepState.config,
      },
      {
        id: 2,
        title: $localize`Users`,
        description: $localize`Create user accounts that can connect to your VPN server.`,
        component: UsersStepWrapper$,
        isComplete: stepState.users,
      },
    ]);
    
    // Update step completion state when stepState changes
    useTask$(({ track }) => {
      track(() => stepState.protocols);
      track(() => stepState.config);
      track(() => stepState.users);
      
      // Update steps completion state without creating new array
      if (steps.value.length > 0) {
        steps.value = steps.value.map((step, index) => ({
          ...step,
          isComplete: index === 0 ? stepState.protocols : 
                      index === 1 ? stepState.config : 
                      index === 2 ? stepState.users : false
        }));
      }
    });

    // Handle completion of all steps
    const handleComplete$ = $(() => {
      saveSettings$(onComplete$);
    });

    // Create the context data object with only serializable properties
    const contextData: VPNServerContextData = {
      enabledProtocols,
      expandedSections,
      users,
      isValid,
      stepState,
      preventStepRecalculation: false,
      savedStepIndex: 0,
    };

    return (
      <div class="mx-auto w-full max-w-5xl p-4">
        <div class="space-y-8">
          {/* Header with Enable/Disable Toggle */}
          <VPNServerHeader
            vpnServerEnabled={vpnServerEnabled}
            onToggle$={$(async (enabled: boolean) => {
              if (!enabled && onDisabled$) {
                await onDisabled$();
              }
            })}
          />

          {vpnServerEnabled.value ? (
            <CStepper
              steps={steps.value}
              onComplete$={handleComplete$}
              allowSkipSteps={true}
              contextId={VPNServerContextId}
              contextValue={contextData}
            />
          ) : (
            /* If VPN server is disabled, show simplified view with save button */
            <div class="space-y-4">
              <div class="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center dark:border-gray-700 dark:bg-gray-800">
                <p class="mb-2 text-gray-700 dark:text-gray-300">
                  {$localize`VPN Server is currently disabled. Enable it using the toggle above to configure VPN server settings.`}
                </p>
              </div>
              <ActionFooter
                saveDisabled={false}
                onSave$={$(async () => {
                  await saveSettings$(onComplete$);
                })}
              />
            </div>
          )}
        </div>
      </div>
    );
  },
);
