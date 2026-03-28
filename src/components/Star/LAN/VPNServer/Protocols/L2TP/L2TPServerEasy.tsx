import { component$ } from "@builder.io/qwik";
import { HiServerOutline } from "@qwikest/icons/heroicons";
import { useL2TPServer } from "./useL2TPServer";
import { ServerCard } from "~/components/Core/Card/ServerCard";
import { ServerFormField } from "~/components/Core/Form/ServerField";
import { UnifiedSelect } from "~/components/Core/Select/UnifiedSelect";
import { Input } from "~/components/Core";
import { NetworkDropdown } from "../../components/NetworkSelection";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";
// import { FormField } from "../../../../WAN/VPNClient/components/FormField";

export const L2TPServerEasy = component$(() => {
  const locale = useMessageLocale();
  const {
    easyFormState,
    isEnabled,
    secretError,
    updateEasyUseIpsec$,
    updateEasyIpsecSecret$,
  } = useL2TPServer();

  return (
    <ServerCard
      title={semanticMessages.vpn_server_easy_l2tp_title({}, { locale })}
      icon={<HiServerOutline class="h-5 w-5" />}
    >
      {isEnabled.value && (
        <div class="space-y-6">
          {/* Network Selection */}
          <ServerFormField
            label={semanticMessages.vpn_server_network_label({}, { locale })}
          >
            <NetworkDropdown
              selectedNetwork={"VPN" as const}
              onNetworkChange$={(_network) => {
                console.log("L2TP Easy network changed");
              }}
            />
          </ServerFormField>

          {/* IPsec Usage Dropdown */}
          <ServerFormField
            label={semanticMessages.vpn_server_easy_use_ipsec({}, { locale })}
          >
            <UnifiedSelect
              value={easyFormState.useIpsec.toString()}
              onChange$={(value) => {
                const stringValue = Array.isArray(value) ? value[0] : value;
                if (
                  stringValue === "yes" ||
                  stringValue === "no" ||
                  stringValue === "required"
                ) {
                  updateEasyUseIpsec$(stringValue);
                }
              }}
              options={[
                {
                  value: "yes",
                  label: semanticMessages.vpn_server_easy_option_yes(
                    {},
                    { locale },
                  ),
                },
                {
                  value: "no",
                  label: semanticMessages.vpn_server_easy_option_no(
                    {},
                    { locale },
                  ),
                },
                {
                  value: "required",
                  label: semanticMessages.vpn_server_easy_option_required(
                    {},
                    { locale },
                  ),
                },
              ]}
            />
          </ServerFormField>

          {/* IPsec Secret Key - Only shown when IPsec is enabled */}
          {easyFormState.useIpsec !== "no" && (
            <div class="relative">
              <ServerFormField
                label={semanticMessages.vpn_server_easy_ipsec_secret_key(
                  {},
                  { locale },
                )}
                errorMessage={
                  secretError.value ||
                  (!secretError.value
                    ? semanticMessages.vpn_server_easy_ipsec_secret_help(
                        {},
                        { locale },
                      )
                    : undefined)
                }
                required={easyFormState.useIpsec === "required"}
              >
                <Input
                  type="text"
                  value={easyFormState.ipsecSecret}
                  onInput$={(event: Event, value: string) => {
                    updateEasyIpsecSecret$(value);
                  }}
                  placeholder={semanticMessages.vpn_server_easy_ipsec_secret_placeholder(
                    {},
                    { locale },
                  )}
                />
              </ServerFormField>
            </div>
          )}
        </div>
      )}
    </ServerCard>
  );
});
