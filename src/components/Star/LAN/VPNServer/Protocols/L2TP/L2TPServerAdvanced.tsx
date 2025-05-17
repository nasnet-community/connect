import { component$, useStore, $ } from "@builder.io/qwik";
import { HiServerOutline } from "@qwikest/icons/heroicons";
import { useL2TPServer } from "./useL2TPServer";
import type { AuthMethod } from "../../../../StarContext/CommonType";
import { ServerCard } from "~/components/Core/Card";
import {   ServerFormField,  PasswordField,  CheckboxGroup,  ServerButton,  Select,  SectionTitle} from "~/components/Core/Form/ServerField";
import { Input } from "~/components/Core/Input";

// Create a serialized version of the server icon
const ServerIcon = $(HiServerOutline);

/**
 * L2TP Server Configuration Component
 * 
 * Allows users to configure L2TP VPN server settings including:
 * - Enable/disable L2TP server
 * - Configure authentication methods
 * - Set IPsec secret
 * - Configure MTU/MRU and other connection parameters
 */
export const L2TPServerAdvanced = component$(() => {
  const { l2tpState, updateL2TPServer$ } = useL2TPServer();
  
  const formState = useStore({
    profile: l2tpState.Profile || "default",
    authentication: [...(l2tpState.Authentication || ["mschap2", "mschap1"])],
    maxMru: l2tpState.MaxMru || 1450,
    maxMtu: l2tpState.MaxMtu || 1450,
    useIpsec: l2tpState.UseIpsec !== undefined ? (typeof l2tpState.UseIpsec === 'boolean' ? (l2tpState.UseIpsec ? "yes" : "no") : l2tpState.UseIpsec) : "yes",
    ipsecSecret: l2tpState.IpsecSecret || "",
    keepaliveTimeout: l2tpState.KeepaliveTimeout || 30
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
          Profile: formState.profile,
          Authentication: [...formState.authentication],
          MaxMru: formState.maxMru,
          MaxMtu: formState.maxMtu,
          UseIpsec: formState.useIpsec as 'yes' | 'no' | 'required',
          IpsecSecret: formState.ipsecSecret,
          KeepaliveTimeout: formState.keepaliveTimeout
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
      if (isEnabled.value && !formState.profile) {
        formState.profile = "default";
      }
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
      {/* Basic Configuration */}
      <div class="space-y-4 mb-6">
        <SectionTitle title={$localize`Basic Configuration`} />
        
        {/* Profile Name Field */}
        <ServerFormField 
          label={$localize`Profile Name`}
        >
          <Input
            type="text"
            value={formState.profile}
            onChange$={(_, value) => (formState.profile = value)}
            placeholder={$localize`Enter profile name`}
          />
        </ServerFormField>

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
      </div>

      {/* Advanced Configuration */}
      <div class="space-y-4 mb-6">
        <SectionTitle title={$localize`Advanced Configuration`} />
        
        {/* Max MTU Field */}
        <ServerFormField label={$localize`Max MTU`}>
          <Input
            type="number"
            value={formState.maxMtu.toString()}
            onChange$={(_, value) => (formState.maxMtu = parseInt(value, 10) || 1450)}
          />
        </ServerFormField>

        {/* Max MRU Field */}
        <ServerFormField label={$localize`Max MRU`}>
          <Input
            type="number"
            value={formState.maxMru.toString()}
            onChange$={(_, value) => (formState.maxMru = parseInt(value, 10) || 1450)}
          />
        </ServerFormField>

        {/* Keepalive Timeout Field */}
        <ServerFormField label={$localize`Keepalive Timeout (seconds)`}>
          <Input
            type="number"
            value={formState.keepaliveTimeout.toString()}
            onChange$={(_, value) => (formState.keepaliveTimeout = parseInt(value, 10) || 30)}
          />
        </ServerFormField>
      </div>

      {/* Apply Settings Button */}
      <ServerButton
        onClick$={applyChanges}
        class="mt-4"
      >
        {$localize`Apply Settings`}
      </ServerButton>
    </ServerCard>
  );
}); 