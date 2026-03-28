import { component$, type QRL, $ } from "@builder.io/qwik";
import { HiSparklesOutline, HiWifiOutline } from "@qwikest/icons/heroicons";
import type { NetworkKey } from "./type";
import { getNetworkDescription, getNetworkDisplayName } from "./constants";
import { Toggle, Button } from "~/components/Core";
import type { Mode } from "../../StarContext/ChooseType";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

interface NetworkCardProps {
  networkKey: NetworkKey;
  ssid: string;
  password: string;
  isHide: boolean;
  isDisabled: boolean;
  splitBand: boolean;
  onSSIDChange: QRL<(value: string) => void>;
  onPasswordChange: QRL<(value: string) => void>;
  onHideToggle: QRL<(value?: boolean) => void>;
  onDisabledToggle: QRL<(value?: boolean) => void>;
  onSplitBandToggle: QRL<(value?: boolean) => void>;
  generateNetworkSSID: QRL<() => Promise<void>>;
  generateNetworkPassword: QRL<() => Promise<void>>;
  isLoading: Record<string, boolean>;
  mode?: Mode;
  hasBothBands?: boolean;
}

export const NetworkCard = component$<NetworkCardProps>(
  ({
    networkKey,
    ssid,
    password,
    isHide,
    isDisabled,
    splitBand,
    onSSIDChange,
    onPasswordChange,
    onHideToggle,
    onDisabledToggle,
    onSplitBandToggle,
    generateNetworkSSID,
    generateNetworkPassword,
    isLoading,
    mode = "advance",
    hasBothBands = true,
  }) => {
    const locale = useMessageLocale();
    const displayName = getNetworkDisplayName(networkKey, locale);

    return (
      <div
        class={`rounded-xl border border-gray-200 bg-white shadow-sm 
                transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800
                ${isDisabled ? "opacity-60" : ""}`}
      >
        <div class="p-6">
          <div class="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
            <div class="flex items-center gap-3">
              <div class="rounded-lg bg-primary-50 p-2 dark:bg-primary-900/20">
                <HiWifiOutline class="h-6 w-6 text-primary-500 dark:text-primary-400" />
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  {semanticMessages.wireless_card_network_title(
                    { networkName: displayName },
                    { locale },
                  )}
                </h3>
                <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {getNetworkDescription(networkKey, locale)}
                </p>
              </div>
            </div>

            <div class="flex flex-col items-end gap-3">
              <Toggle
                checked={!isDisabled}
                onChange$={$((checked: boolean) => {
                  // checked represents enabled state, so invert for disabled
                  onDisabledToggle(!checked);
                })}
                label={
                  !isDisabled
                    ? semanticMessages.shared_enabled({}, { locale })
                    : semanticMessages.shared_disabled({}, { locale })
                }
                labelPosition="left"
                size="sm"
                color="primary"
              />

              <div class="flex items-center gap-4">
                {/* Only show visibility toggle in advance mode */}
                {mode === "advance" && (
                  <Toggle
                    checked={!isHide}
                    onChange$={$((checked: boolean) => {
                      // checked represents visible state, so invert for hide
                      onHideToggle(!checked);
                    })}
                    label={semanticMessages.wireless_single_show_ssid(
                      {},
                      { locale },
                    )}
                    labelPosition="left"
                    size="sm"
                    color="primary"
                    disabled={isDisabled}
                  />
                )}

                {/* Only show split band toggle if router has both bands */}
                {hasBothBands && (
                  <Toggle
                    checked={mode === "easy" ? true : splitBand}
                    onChange$={$((checked: boolean) => {
                      // In easy mode, always keep split band
                      if (mode !== "easy") {
                        // checked directly represents splitBand state
                        onSplitBandToggle(checked);
                      }
                    })}
                    label={semanticMessages.wireless_single_split_band(
                      {},
                      { locale },
                    )}
                    labelPosition="left"
                    size="sm"
                    color="primary"
                    disabled={isDisabled || mode === "easy"}
                  />
                )}
              </div>
            </div>
          </div>

          <div class="mt-6 space-y-6">
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                {semanticMessages.wireless_single_network_name_label(
                  {},
                  { locale },
                )}
                {!isDisabled && <span class="ml-1 text-red-500">*</span>}
              </label>
              <div class="flex flex-col gap-3 sm:flex-row">
                <input
                  value={ssid}
                  onChange$={(e) =>
                    onSSIDChange((e.target as HTMLInputElement).value)
                  }
                  type="text"
                  disabled={isDisabled}
                  class={`h-11 flex-1 rounded-lg border border-gray-300 bg-white px-4 
                       text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white
                       ${isDisabled ? "cursor-not-allowed" : ""}`}
                  placeholder={semanticMessages.wireless_card_network_name_placeholder_specific(
                    { networkName: displayName },
                    { locale },
                  )}
                  required={!isDisabled}
                />
                <Button
                  onClick$={generateNetworkSSID}
                  disabled={isLoading[`${networkKey}SSID`] || isDisabled}
                  loading={isLoading[`${networkKey}SSID`]}
                  variant="primary"
                  size="md"
                  leftIcon
                  class="min-w-[160px]"
                >
                  <HiSparklesOutline q:slot="leftIcon" class="h-5 w-5" />
                  {semanticMessages.wireless_card_generate_ssid({}, { locale })}
                </Button>
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                {semanticMessages.wireless_card_password_label({}, { locale })}
                {!isDisabled && <span class="ml-1 text-red-500">*</span>}
              </label>
              <div class="flex flex-col gap-3 sm:flex-row">
                <input
                  value={password}
                  onChange$={(e) =>
                    onPasswordChange((e.target as HTMLInputElement).value)
                  }
                  type="text"
                  disabled={isDisabled}
                  class={`h-11 flex-1 rounded-lg border border-gray-300 bg-white px-4 
                       text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white
                       ${isDisabled ? "cursor-not-allowed" : ""}`}
                  placeholder={semanticMessages.wireless_card_password_placeholder_specific(
                    { networkName: displayName },
                    { locale },
                  )}
                  required={!isDisabled}
                />
                <Button
                  onClick$={generateNetworkPassword}
                  disabled={isLoading[`${networkKey}Password`] || isDisabled}
                  loading={isLoading[`${networkKey}Password`]}
                  variant="primary"
                  size="md"
                  leftIcon
                  class="min-w-[160px]"
                >
                  <HiSparklesOutline q:slot="leftIcon" class="h-5 w-5" />
                  {semanticMessages.wireless_card_generate_password(
                    {},
                    { locale },
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
