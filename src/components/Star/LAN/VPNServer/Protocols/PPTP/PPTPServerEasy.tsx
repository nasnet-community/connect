import { component$, useStore, $ } from "@builder.io/qwik";
import { HiServerOutline } from "@qwikest/icons/heroicons";
import { usePPTPServer } from "./usePPTPServer";
import type { AuthMethod } from "../../../../StarContext/CommonType";
import { ServerCard } from "~/components/Core/Card";
import { 
  ServerFormField,
  CheckboxGroup
} from "~/components/Core/Form/ServerField";

// Create a serialized version of the server icon
const ServerIcon = $(HiServerOutline);

export const PPTPServerEasy = component$(() => {
  const { pptpState, updatePPTPServer$ } = usePPTPServer();
  
  // Local form state to track user input before submitting
  const formState = useStore({
    authentication: [...(pptpState.Authentication || ["mschap2", "mschap1"])],
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
      
      // Apply changes immediately
      updatePPTPServer$({
        Profile: "default", // Use default profile in easy mode
        Authentication: [...formState.authentication]
      });
    } catch (error) {
      console.error("Error toggling auth method:", error);
    }
  });

  return (
    <ServerCard
      title={$localize`PPTP Server`}
      icon={ServerIcon}
    >
      <div class="space-y-6">
        {/* Authentication Methods */}
        <ServerFormField label={$localize`Authentication Methods`}>
          <CheckboxGroup
            options={authOptions}
            selected={formState.authentication}
            onToggle$={toggleAuthMethod}
          />
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {$localize`Select the authentication methods you want to allow for PPTP connections`}
          </p>
        </ServerFormField>
      </div>
    </ServerCard>
  );
}); 