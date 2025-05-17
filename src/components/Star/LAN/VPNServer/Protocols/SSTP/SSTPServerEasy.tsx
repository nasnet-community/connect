import { component$, useStore, $ } from "@builder.io/qwik";
import { HiServerOutline } from "@qwikest/icons/heroicons";
import { useSSTPServer } from "./useSSTPServer";
import type { AuthMethod } from "../../../../StarContext/CommonType";
import { ServerCard } from "~/components/Core/Card";
import { 
  ServerFormField,
  CheckboxGroup
} from "~/components/Core/Form/ServerField";

// Create a serialized version of the server icon
const ServerIcon = $(HiServerOutline);

export const SSTPServerEasy = component$(() => {
  const { sstpState, updateSSTPServer$ } = useSSTPServer();
  
  const formState = useStore({
    authentication: sstpState.Authentication || ["mschap2", "mschap1"],
  });

  const authMethods: AuthMethod[] = ["pap", "chap", "mschap1", "mschap2"];
  
  const authOptions = authMethods.map(method => ({
    value: method,
    label: method.toUpperCase()
  }));

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
      updateSSTPServer$({
        Profile: "default", // Use default profile in easy mode
        Certificate: "default", // Use default certificate in easy mode
        Port: 443, // Default port in easy mode
        Authentication: formState.authentication,
        ForceAes: true, // Default in easy mode
        Pfs: true, // Default in easy mode
        VerifyClientCertificate: false, // Default in easy mode
        TlsVersion: "only-1.2" // Default in easy mode
      });
    } catch (error) {
      console.error("Error toggling auth method:", error);
    }
  });

  return (
    <ServerCard
      title={$localize`SSTP Server`}
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
            {$localize`Select the authentication methods you want to allow for SSTP connections`}
          </p>
        </ServerFormField>
      </div>
    </ServerCard>
  );
}); 