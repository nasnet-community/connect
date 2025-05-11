import { component$, useStore, $ } from "@builder.io/qwik";
import { HiServerOutline } from "@qwikest/icons/heroicons";
import { usePPTPServer } from "./usePPTPServer";
import type { AuthMethod } from "../../../../StarContext/CommonType";
import { ServerCard } from "~/components/Core/Card";
import { 
  ServerFormField,
  CheckboxGroup,
  ServerButton,
  SectionTitle
} from "~/components/Core/Form/ServerField";
import { Input } from "~/components/Core/Input";

// Create a serialized version of the server icon
const ServerIcon = $(HiServerOutline);

/**
 * PPTP Server Configuration Component
 * 
 * Allows users to configure PPTP VPN server settings including:
 * - Enable/disable PPTP server
 * - Configure profile name
 * - Configure authentication methods
 * - Set MTU, MRU, and other connection parameters
 */
export const PPTPServer = component$(() => {
  const { pptpState, updatePPTPServer$ } = usePPTPServer();
  
  // Local form state to track user input before submitting
  const formState = useStore({
    profile: pptpState.Profile || "default",
    authentication: [...(pptpState.Authentication || ["mschap2", "mschap1"])],
    maxMtu: pptpState.MaxMtu || 1450,
    maxMru: pptpState.MaxMru || 1450,
    keepaliveTimeout: pptpState.KeepaliveTimeout || 30
  });

  // Track enabled state separately for reliable toggle behavior
  const isEnabled = useStore({
    value: !!pptpState.Profile
  });

  // Available authentication methods
  const authMethods: AuthMethod[] = ["pap", "chap", "mschap1", "mschap2"];
  
  // Format authentication methods as checkbox options
  const authOptions = authMethods.map(method => ({
    value: method,
    label: method.toUpperCase()
  }));

  /**
   * Toggle an authentication method in the selected list
   */
  const toggleAuthMethod = $((method: string) => {
    try {
      const authMethod = method as AuthMethod;
      const index = formState.authentication.indexOf(authMethod);
      if (index === -1) {
        formState.authentication = [...formState.authentication, authMethod];
      } else {
        formState.authentication = formState.authentication.filter(m => m !== authMethod);
      }
    } catch (error) {
      console.error("Error toggling auth method:", error);
    }
  });

  /**
   * Apply changes to the server configuration
   */
  const applyChanges = $(() => {
    try {
      if (isEnabled.value) {
        updatePPTPServer$({
          Profile: formState.profile,
          Authentication: [...formState.authentication],
          MaxMtu: formState.maxMtu,
          MaxMru: formState.maxMru,
          KeepaliveTimeout: formState.keepaliveTimeout
        });
      } else {
        // If disabled, clear the profile to indicate server is off
        updatePPTPServer$({
          Profile: ""
        });
      }
    } catch (error) {
      console.error("Error applying PPTP settings:", error);
    }
  });

  /**
   * Handle enable/disable toggle
   */
  const handleToggle = $((enabled: boolean) => {
    try {
      isEnabled.value = enabled;
      if (isEnabled.value && !formState.profile) {
        formState.profile = "default";
      }
      applyChanges();
    } catch (error) {
      console.error("Error toggling PPTP server:", error);
      isEnabled.value = !enabled; // Revert the change if there's an error
    }
  });

  return (
    <ServerCard
      title={$localize`PPTP Server`}
      icon={ServerIcon}
      enabled={isEnabled.value}
      onToggle$={handleToggle}
    >
      <div class="space-y-6">
        {/* Authentication Methods */}
        <div>
          <SectionTitle title={$localize`Authentication Methods`} />
          <CheckboxGroup
            options={authOptions}
            selected={formState.authentication}
            onToggle$={toggleAuthMethod}
          />
        </div>

        {/* Connection Settings */}
        <div>
          <SectionTitle title={$localize`Connection Settings`} />
          <div class="grid gap-4 md:grid-cols-2">
            {/* Profile Name */}
            <ServerFormField label={$localize`Profile Name`}>
              <Input
                type="text"
                value={formState.profile}
                onChange$={(_, value) => (formState.profile = value)}
              />
            </ServerFormField>

            {/* MTU */}
            <ServerFormField label={$localize`Maximum MTU`}>
              <Input
                type="number"
                value={formState.maxMtu.toString()}
                onChange$={(_, value) => (formState.maxMtu = parseInt(value, 10) || 1450)}
              />
            </ServerFormField>

            {/* MRU */}
            <ServerFormField label={$localize`Maximum MRU`}>
              <Input
                type="number"
                value={formState.maxMru.toString()}
                onChange$={(_, value) => (formState.maxMru = parseInt(value, 10) || 1450)}
              />
            </ServerFormField>

            {/* Keepalive Timeout */}
            <ServerFormField label={$localize`Keepalive Timeout (s)`}>
              <Input
                type="number"
                value={formState.keepaliveTimeout.toString()}
                onChange$={(_, value) => (formState.keepaliveTimeout = parseInt(value, 10) || 30)}
              />
            </ServerFormField>
          </div>
        </div>

        <ServerButton
          onClick$={applyChanges}
        >
          {$localize`Apply Settings`}
        </ServerButton>
      </div>
    </ServerCard>
  );
}); 