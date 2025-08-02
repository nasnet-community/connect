import { component$ } from "@builder.io/qwik";
import { HiServerOutline } from "@qwikest/icons/heroicons";
import { useL2TPServer } from "./useL2TPServer";
import { ServerCard, ServerFormField, Select } from "../../UI";
// import { FormField } from "../../../../WAN/VPNClient/components/FormField";

export const L2TPServerEasy = component$(() => {
  const {
    easyFormState,
    isEnabled,
    secretError,
    updateEasyUseIpsec$,
    updateEasyIpsecSecret$,
  } = useL2TPServer();

  return (
    <ServerCard
      title={$localize`L2TP Server`}
      icon={<HiServerOutline class="h-5 w-5" />}
    >
      {isEnabled.value && (
        <div class="space-y-6">
          {/* IPsec Usage Dropdown */}
          <ServerFormField
            label={$localize`Use IPsec`}
            helperText={$localize`Controls IPsec encryption for L2TP connections`}
          >
            <Select
              value={easyFormState.useIpsec.toString()}
              onChange$={(value) => {
                if (value === "yes" || value === "no" || value === "required") {
                  updateEasyUseIpsec$(value);
                }
              }}
              options={[
                { value: "yes", label: $localize`Yes` },
                { value: "no", label: $localize`No` },
                { value: "required", label: $localize`Required` },
              ]}
            />
          </ServerFormField>

          {/* IPsec Secret Key - Only shown when IPsec is enabled */}
          {easyFormState.useIpsec !== "no" && (
            <div class="relative">
              <ServerFormField
                label={$localize`IPsec Secret Key`}
                errorMessage={secretError.value}
                required={easyFormState.useIpsec === "required"}
                helperText={
                  secretError.value
                    ? undefined
                    : $localize`Key used for encrypting L2TP/IPsec connections`
                }
              >
                <div class="relative">
                  <input
                    type="text"
                    value={easyFormState.ipsecSecret}
                    onInput$={(e) => {
                      const target = e.target as HTMLInputElement;
                      updateEasyIpsecSecret$(target.value);
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
