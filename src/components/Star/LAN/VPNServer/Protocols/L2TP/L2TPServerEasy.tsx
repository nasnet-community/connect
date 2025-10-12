import { component$ } from "@builder.io/qwik";
import { HiServerOutline } from "@qwikest/icons/heroicons";
import { useL2TPServer } from "./useL2TPServer";
import { ServerCard } from "~/components/Core/Card/ServerCard";
import { ServerFormField } from "~/components/Core/Form/ServerField";
import { UnifiedSelect } from "~/components/Core/Select/UnifiedSelect";
import { Input } from "~/components/Core";
import { NetworkDropdown } from "../../components/NetworkSelection";
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
          {/* Network Selection */}
          <ServerFormField label={$localize`Network`}>
            <NetworkDropdown
              selectedNetwork={"VPN" as const}
              onNetworkChange$={(network) => {
                console.log("L2TP Easy network changed to:", network);
              }}
            />
          </ServerFormField>

          {/* IPsec Usage Dropdown */}
          <ServerFormField
            label={$localize`Use IPsec`}
          >
            <UnifiedSelect
              value={easyFormState.useIpsec.toString()}
              onChange$={(value) => {
                const stringValue = Array.isArray(value) ? value[0] : value;
                if (stringValue === "yes" || stringValue === "no" || stringValue === "required") {
                  updateEasyUseIpsec$(stringValue);
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
                errorMessage={secretError.value || (!secretError.value ? $localize`Key used for encrypting L2TP/IPsec connections` : undefined)}
                required={easyFormState.useIpsec === "required"}
              >
                <Input
                  type="text"
                  value={easyFormState.ipsecSecret}
                  onInput$={(event: Event, value: string) => {
                    updateEasyIpsecSecret$(value);
                  }}
                  placeholder={$localize`Enter IPsec secret key`}
                />
              </ServerFormField>
            </div>
          )}
        </div>
      )}
    </ServerCard>
  );
});
