import { component$, $, useComputed$, useStore } from "@builder.io/qwik";
import type { StepProps } from "~/types/step";
import { useVPNServerEasy } from "./useVPNServerEasy";
import { VPNServerHeader } from "../VPNServerHeader";
import { ActionFooter } from "../ActionFooter";
import {
  CStepper,
  type CStepMeta,
} from "~/components/Core/Stepper/CStepper";
import { CertificateStep } from "./steps/CertificateStep";
import { EasyUsersStep } from "./steps/EasyUsersStep";
import { VPNServerContextId, type VPNServerContextData } from "../VPNServerAdvanced/VPNServerContext";

export const VPNServerEasy = component$<StepProps>(
  ({ onComplete$, onDisabled$ }) => {
    const {
      // Certificate state
      certificatePassphrase,
      showPassphrase,
      passphraseError,
      updatePassphrase$,
      togglePassphraseVisibility$,

      // User state
      users,
      usernameErrors,
      passwordErrors,
      addUser,
      removeUser,
      handleUsernameChange,
      handlePasswordChange,
      handleProtocolToggle,

      // Overall state
      vpnServerEnabled,
      isValid,
      saveSettings,
    } = useVPNServerEasy();

    // Define serializable component functions with $()
    const CertificateStepWrapper$ = $((props: StepProps) => (
      <CertificateStep
        {...props}
        certificatePassphrase={certificatePassphrase}
        showPassphrase={showPassphrase}
        passphraseError={passphraseError}
        updatePassphrase$={updatePassphrase$}
        togglePassphraseVisibility$={togglePassphraseVisibility$}
      />
    ));

    const UsersStepWrapper$ = $((props: StepProps) => (
      <EasyUsersStep
        {...props}
        users={users}
        usernameErrors={usernameErrors}
        passwordErrors={passwordErrors}
        addUser={addUser}
        removeUser={removeUser}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        handleProtocolToggle={handleProtocolToggle}
        isValid={isValid}
      />
    ));

    // Create steps for stepper
    const steps = useComputed$<CStepMeta[]>(() => {
      // Track the reactive values to ensure proper reactivity
      const passphraseLength = certificatePassphrase.value.length;
      const validUsers = isValid.value;
      
      return [
        {
          id: 0,
          title: $localize`Certificate`,
          description: $localize`Configure certificate passphrase for secure VPN access.`,
          component: CertificateStepWrapper$,
          isComplete: passphraseLength >= 10,
        },
        {
          id: 1,
          title: $localize`User Accounts`,
          description: $localize`Create user accounts for VPN access.`,
          component: UsersStepWrapper$,
          isComplete: validUsers,
        },
      ];
    });

    // Track step completion state for context
    const stepState = useStore({
      protocols: true, // Always true for easy mode as protocols are pre-selected
      config: true, // Always true for easy mode as config is handled automatically
      users: false, // Will be updated by UserCredential
    });

    // Create enabled protocols for easy mode (OpenVPN and WireGuard)
    const enabledProtocols = useStore({
      OpenVPN: true,
      Wireguard: true,
      L2TP: false,
      PPTP: false,
      SSTP: false,
      IKeV2: false,
      Socks5: false,
      SSH: false,
      HTTPProxy: false,
      BackToHome: false,
      ZeroTier: false,
    });

    // Handle completion of all steps
    const handleComplete$ = $(() => {
      saveSettings(onComplete$);
    });

    // Create the context data object for easy mode
    const contextData: VPNServerContextData = {
      enabledProtocols,
      expandedSections: {},
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
              allowSkipSteps={false}
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
                  await saveSettings(onComplete$);
                })}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
);