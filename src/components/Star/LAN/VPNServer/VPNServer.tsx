import { component$, $, useComputed$ } from "@builder.io/qwik";
import type { StepProps } from "~/types/step";
import { useVPNServer } from "./useVPNServer";
import { VPNServerHeader } from "./VPNServerHeader";
import { ActionFooter } from "./ActionFooter";
import { CStepper, type CStepMeta, createStepperContext } from "~/components/Core/Stepper/CStepper";
import { ProtocolsStep } from "./steps/ProtocolsStep";
import { ConfigStep } from "./steps/ConfigStep";
import { UsersStep } from "./steps/UsersStep";
import type { PropFunction } from "@builder.io/qwik";
import type { VPNType } from "../../StarContext/CommonType";
import type { Credentials } from "../../StarContext/LANType";

// Create a typed context for VPN Server
export interface VPNServerContextData {
  users: Credentials[];
  enabledProtocols: Record<VPNType, boolean>;
  expandedSections: Record<string, boolean>;
  isValid: { value: boolean };
}

export const VPNServerContextId = createStepperContext<VPNServerContextData>("vpn-server");

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

  // Define function wrappers for component use with improved logging
  const toggleSection$ = $((section: string) => toggleSection(section));
  
  const toggleProtocol$ = $((protocol: VPNType) => {
    toggleProtocol(protocol);
  });
  
  const saveSettings$ = $((onComplete?: PropFunction<() => void>) => saveSettings(onComplete));

  // Create steps for stepper with JSX components directly
  const steps = useComputed$<CStepMeta[]>(() => {
    return [
      {
        id: 0,
        title: $localize`Protocols`,
        description: $localize`Choose which VPN protocols you want to enable on your router.`,
        component: (
          <ProtocolsStep
            enabledProtocols={enabledProtocols}
            expandedSections={expandedSections}
            toggleSection$={toggleSection$}
            toggleProtocol$={toggleProtocol$}
          />
        ),
        isComplete: Object.values(enabledProtocols).some(v => v),
      },
      {
        id: 1,
        title: $localize`Configuration`,
        description: $localize`Configure the settings for each enabled VPN protocol.`,
        component: (
          <ConfigStep
            enabledProtocols={enabledProtocols}
          />
        ),
        isComplete: true, // Config is always complete since it's optional
      },
      {
        id: 2,
        title: $localize`Users`,
        description: $localize`Create user accounts that can connect to your VPN server.`,
        component: (
          <UsersStep
            users={users}
            addUser={addUser}
            removeUser={removeUser}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            handleProtocolToggle={handleProtocolToggle}
            isValid={isValid}
          />
        ),
        isComplete: isValid.value,
      },
    ];
  });

  // Handle completion of all steps
  const handleComplete$ = $(() => {
    saveSettings$(onComplete$);
  });

  // Create context data
  const contextData: VPNServerContextData = {
    users,
    enabledProtocols,
    expandedSections,
    isValid,
  };

  return (
    <div class="mx-auto w-full max-w-5xl p-4">
      <div class="space-y-8">
        {/* Header with Enable/Disable Toggle */}
        <VPNServerHeader vpnServerEnabled={vpnServerEnabled} />

        {vpnServerEnabled.value ? (
          <CStepper
            steps={steps.value}
            onComplete$={handleComplete$}
            contextId={VPNServerContextId}
            contextValue={contextData}
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
