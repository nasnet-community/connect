import { component$, useStore, $ } from "@builder.io/qwik";
import { HiServerOutline } from "@qwikest/icons/heroicons";
import { useL2TPServer } from "./useL2TPServer";
import { ServerCard, ServerFormField, Select } from "../../../VPNServer/UI";
// import { FormField } from "../../../../WAN/VPNClient/components/FormField";

export const L2TPServerEasy = component$(() => {
  const { l2tpState, updateL2TPServer$, secretError } = useL2TPServer();
  
  const formState = useStore({
    useIpsec: l2tpState.UseIpsec !== undefined ? 
      (typeof l2tpState.UseIpsec === 'boolean' ? (l2tpState.UseIpsec ? "yes" : "no") : l2tpState.UseIpsec) : 
      "yes",
    ipsecSecret: l2tpState.IpsecSecret || "",
  });

  const isEnabled = useStore({ value: !!l2tpState.Profile });

  // Auto-apply changes when IPsec settings change
  const applyIpsecSettings = $((updatedValues: Partial<typeof formState>) => {
    try {
      // Update local state
      Object.assign(formState, updatedValues);
      
      if (isEnabled.value) {
        updateL2TPServer$({
          Profile: "default",
          UseIpsec: formState.useIpsec as 'yes' | 'no' | 'required',
          IpsecSecret: formState.ipsecSecret,
          // Use default authentication methods
          Authentication: ["mschap2", "mschap1"]
        });
      }
    } catch (error) {
      console.error("Error updating L2TP settings:", error);
    }
  });

  const handleToggle = $((enabled: boolean) => {
    try {
      isEnabled.value = enabled;
      
      if (enabled) {
        updateL2TPServer$({
          Profile: "default",
          UseIpsec: formState.useIpsec as 'yes' | 'no' | 'required',
          IpsecSecret: formState.ipsecSecret,
          Authentication: ["mschap2", "mschap1"]
        });
      } else {
        updateL2TPServer$({
          Profile: ""
        });
      }
    } catch (error) {
      console.error("Error toggling L2TP server:", error);
      isEnabled.value = !enabled; // Revert the change if there's an error
    }
  });

  return (
    <ServerCard
      title={$localize`L2TP Server`}
      icon={<HiServerOutline class="h-5 w-5" />}
      enabled={isEnabled.value}
      onToggle$={handleToggle}
    >
      {isEnabled.value && (
        <div class="space-y-6">
          {/* IPsec Usage Dropdown */}
          <ServerFormField 
            label={$localize`Use IPsec`}
            helperText={$localize`Controls IPsec encryption for L2TP connections`}
          >
            <Select
              value={formState.useIpsec.toString()}
              onChange$={(value) => {
                if (value === "yes" || value === "no" || value === "required") {
                  applyIpsecSettings({ useIpsec: value });
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
            <div class="relative">
              <ServerFormField
                label={$localize`IPsec Secret Key`}
                errorMessage={secretError.value}
                required={formState.useIpsec === "required"}
                helperText={secretError.value ? undefined : $localize`Key used for encrypting L2TP/IPsec connections`}
              >
                <div class="relative">
                  <input
                    type="text"
                    value={formState.ipsecSecret}
                    onInput$={(e) => {
                      const target = e.target as HTMLInputElement;
                      applyIpsecSettings({ ipsecSecret: target.value });
                    }}
                    placeholder={$localize`Enter IPsec secret key`}
                    class="w-full rounded-lg border border-border bg-white px-3 py-2
                      focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
                      disabled:cursor-not-allowed disabled:opacity-75
                      dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                  />
                </div>
              </ServerFormField>
            </div>
          )}
        </div>
      )}
    </ServerCard>
  );
}); 