import { component$, $, useStore, useComputed$ } from "@builder.io/qwik";
import type { StepProps } from "~/types/step";
import { useVPNServer } from "./useVPNServer";
import { VPNServerHeader } from "./VPNServerHeader";
import { ActionFooter } from "./ActionFooter";
import { CStepper, type CStepItem } from "~/components/Core/Stepper/CStepper";
import { ProtocolsStep } from "./steps/ProtocolsStep";
import { ConfigStep } from "./steps/ConfigStep";
import { UsersStep } from "./steps/UsersStep";
import type { PropFunction } from "@builder.io/qwik";
import type { VPNType } from "../../StarContext/CommonType";

export const VPNServer = component$<StepProps>(({ onComplete$ }) => {
  const {
    users,
    vpnServerEnabled,
    enabledProtocols,
    expandedSections,
    isValid,
    toggleSection,
    addUser,
    removeUser,
    handleUsernameChange,
    handlePasswordChange,
    handleProtocolToggle,
    toggleProtocol,
    saveSettings,
  } = useVPNServer();

  const toggleSection$ = $((section: string) => toggleSection(section));
  const toggleProtocol$ = $((protocol: VPNType) => toggleProtocol(protocol));
  const saveSettings$ = $((onComplete?: PropFunction<() => void>) => saveSettings(onComplete));
  
  // Track step completion state
  const stepState = useStore({
    protocols: false,
    config: false,
    users: false,
  });
  
  // Define step completion handlers
  const completeProtocols$ = $(() => {
    stepState.protocols = true;
  });
  
  const completeConfig$ = $(() => {
    stepState.config = true;
  });
  
  const completeUsers$ = $(() => {
    stepState.users = true;
  });
  
  // Define serializable component functions with $()
  const ProtocolsStepWrapper$ = $((props: StepProps) => (
    <ProtocolsStep
      {...props}
      enabledProtocols={enabledProtocols}
      expandedSections={expandedSections}
      toggleSection$={toggleSection$}
      toggleProtocol$={toggleProtocol$}
      onComplete$={completeProtocols$}
      isComplete={stepState.protocols}
    />
  ));
  
  const ConfigStepWrapper$ = $((props: StepProps) => (
    <ConfigStep
      {...props}
      enabledProtocols={enabledProtocols}
      onComplete$={completeConfig$}
      isComplete={stepState.config}
    />
  ));
  
  const UsersStepWrapper$ = $((props: StepProps) => (
    <UsersStep
      {...props}
      users={users}
      addUser={addUser}
      removeUser={removeUser}
      handleUsernameChange={handleUsernameChange}
      handlePasswordChange={handlePasswordChange}
      handleProtocolToggle={handleProtocolToggle}
      isValid={isValid}
      onComplete$={completeUsers$}
      isComplete={stepState.users}
    />
  ));
  
  // Create steps for stepper
  const steps = useComputed$<CStepItem[]>(() => [
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

  // Handle completion of all steps
  const handleComplete$ = $(() => {
    saveSettings$(onComplete$);
  });

  return (
    <div class="mx-auto w-full max-w-5xl p-4">
      <div class="space-y-8">
        {/* Header with Enable/Disable Toggle */}
        <VPNServerHeader vpnServerEnabled={vpnServerEnabled} />

        {vpnServerEnabled.value ? (
          <CStepper
            steps={steps.value}
            onComplete$={handleComplete$}
          />
        ) : (
          /* If VPN server is disabled, show simplified view with save button */
          <ActionFooter 
            saveDisabled={!isValid.value}
            onSave$={() => saveSettings$(onComplete$)}
          />
        )}
      </div>
    </div>
  );
});
