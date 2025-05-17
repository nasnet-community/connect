import { component$, useStore, $ } from "@builder.io/qwik";
import { HiServerOutline } from "@qwikest/icons/heroicons";
import { useL2TPServer } from "./useL2TPServer";
import type { AuthMethod } from "../../../../StarContext/CommonType";
import { ServerCard } from "~/components/Core/Card";
import { 
  ServerFormField, 
  PasswordField, 
  CheckboxGroup, 
  ServerButton,
  Select
} from "~/components/Core/Form/ServerField";

// Create a serialized version of the server icon
const ServerIcon = $(HiServerOutline);

export const L2TPServerEasy = component$(() => {
  const { l2tpState, updateL2TPServer$, secretError } = useL2TPServer();
  
  const formState = useStore({
    authentication: [...(l2tpState.Authentication || ["mschap2", "mschap1"])],
    useIpsec: l2tpState.UseIpsec !== undefined ? 
      (typeof l2tpState.UseIpsec === 'boolean' ? (l2tpState.UseIpsec ? "yes" : "no") : l2tpState.UseIpsec) : 
      "yes",
    ipsecSecret: l2tpState.IpsecSecret || "",
  });

  const isEnabled = useStore({ value: !!l2tpState.Profile });

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
    } catch (error) {
      console.error("Error toggling auth method:", error);
    }
  });

  const applyChanges = $(() => {
    try {
      if (isEnabled.value) {
        updateL2TPServer$({
          Profile: "default",
          Authentication: [...formState.authentication],
          UseIpsec: formState.useIpsec as 'yes' | 'no' | 'required',
          IpsecSecret: formState.ipsecSecret,
        });
      } else {
        updateL2TPServer$({
          Profile: ""
        });
      }
    } catch (error) {
      console.error("Error applying L2TP settings:", error);
    }
  });

  const handleToggle = $((enabled: boolean) => {
    try {
      isEnabled.value = enabled;
      applyChanges();
    } catch (error) {
      console.error("Error toggling L2TP server:", error);
      isEnabled.value = !enabled; // Revert the change if there's an error
    }
  });

  return (
    <ServerCard
      title={$localize`L2TP Server`}
      icon={ServerIcon}
      enabled={isEnabled.value}
      onToggle$={handleToggle}
    >
      {isEnabled.value && (
        <div class="space-y-6">
          {/* IPsec Usage Dropdown */}
          <ServerFormField label={$localize`Use IPsec`}>
            <Select
              value={formState.useIpsec.toString()}
              onChange$={(value) => {
                if (value === "yes" || value === "no" || value === "required") {
                  formState.useIpsec = value;
                }
              }}
              options={[
                { value: "yes", label: $localize`Yes` },
                { value: "no", label: $localize`No` },
                { value: "required", label: $localize`Required` }
              ]}
            />
          </ServerFormField>

          {/* IPsec Secret Key - Only shown when IPsec is enabled */}
          {formState.useIpsec !== "no" && (
            <ServerFormField 
              label={$localize`IPsec Secret Key`}
              errorMessage={secretError.value}
            >
              <PasswordField
                value={formState.ipsecSecret}
                onChange$={(value) => (formState.ipsecSecret = value)}
                placeholder={$localize`Enter IPsec secret key`}
              />
            </ServerFormField>
          )}

          {/* Authentication Methods */}
          <ServerFormField label={$localize`Authentication Methods`}>
            <CheckboxGroup
              options={authOptions}
              selected={formState.authentication}
              onToggle$={toggleAuthMethod}
            />
          </ServerFormField>

          {/* Apply Settings Button */}
          <ServerButton
            onClick$={applyChanges}
            class="mt-4"
            disabled={formState.useIpsec !== "no" && !formState.ipsecSecret}
          >
            {$localize`Apply Settings`}
          </ServerButton>
        </div>
      )}
    </ServerCard>
  );
}); 