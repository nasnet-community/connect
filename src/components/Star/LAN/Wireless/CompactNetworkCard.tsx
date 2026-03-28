import { component$, type QRL, $ } from "@builder.io/qwik";
import { HiSparklesOutline } from "@qwikest/icons/heroicons";
import type { NetworkKey } from "./type";
import { getNetworkDescription, getNetworkDisplayName } from "./constants";
import { Toggle, Input, Button } from "~/components/Core";
import type { Mode } from "../../StarContext/ChooseType";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

interface CompactNetworkCardProps {
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
  isBaseNetworkDisabled?: boolean;
  hasBothBands?: boolean;
}

export const CompactNetworkCard = component$<CompactNetworkCardProps>(
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
    isBaseNetworkDisabled = false,
    hasBothBands = true,
  }) => {
    const locale = useMessageLocale();
    const displayName = getNetworkDisplayName(networkKey, locale);

    return (
      <div
        class={`rounded-lg border shadow-sm transition-all duration-200
                ${
                  isBaseNetworkDisabled
                    ? "border-gray-300 bg-gray-50 opacity-50 dark:border-gray-600 dark:bg-gray-900"
                    : "border-gray-200 bg-white hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                }
                ${isDisabled && !isBaseNetworkDisabled ? "opacity-60" : ""}`}
      >
        {/* Compact Header */}
        <div class="flex items-center justify-between border-b border-gray-100 p-3 dark:border-gray-700">
          <div class="flex items-center gap-2">
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white">
              {semanticMessages.wireless_card_network_title(
                { networkName: displayName },
                { locale },
              )}
            </h3>
            {!isDisabled && ssid && (
              <span class="text-xs text-gray-500 dark:text-gray-400">
                ({ssid})
              </span>
            )}
            <div
              class={`h-2 w-2 rounded-full ${isDisabled ? "bg-gray-400" : "bg-green-500"}`}
            />
          </div>

          <div class="flex items-center gap-2">
            {/* Inline Toggle for Enable/Disable */}
            <Toggle
              checked={!isDisabled}
              onChange$={$((checked: boolean) => {
                // Prevent toggling if base network is disabled
                if (!isBaseNetworkDisabled) {
                  onDisabledToggle(!checked);
                }
              })}
              label={
                !isDisabled
                  ? semanticMessages.shared_on({}, { locale })
                  : semanticMessages.shared_off({}, { locale })
              }
              labelPosition="left"
              size="sm"
              color="primary"
              disabled={isBaseNetworkDisabled}
            />
          </div>
        </div>

        {/* Warning message when base network is disabled */}
        {isBaseNetworkDisabled && (
          <div class="mx-3 mt-3 rounded-md border border-yellow-200 bg-yellow-50 p-2 dark:border-yellow-800 dark:bg-yellow-900/20">
            <p class="text-xs text-yellow-800 dark:text-yellow-200">
              <span class="font-semibold">
                {semanticMessages.wireless_card_base_network_disabled_title(
                  {},
                  { locale },
                )}
              </span>{" "}
              {semanticMessages.wireless_card_base_network_disabled_description(
                {},
                { locale },
              )}
            </p>
          </div>
        )}

        {/* Content */}
        <div class="space-y-3 px-3 pb-3 pt-3">
          {/* Quick Toggles */}
          <div class="flex flex-col gap-3 text-xs">
            {/* Only show visibility toggle in advance mode */}
            {mode === "advance" && (
              <div class="flex items-center justify-between">
                <span class="font-medium text-gray-600 dark:text-gray-400">
                  {semanticMessages.wireless_card_ssid_visibility(
                    {},
                    { locale },
                  )}
                </span>
                <Toggle
                  checked={!isHide}
                  onChange$={$((checked: boolean) => {
                    // checked represents visible state, so invert for hide
                    onHideToggle(!checked);
                  })}
                  label={
                    !isHide
                      ? semanticMessages.shared_show({}, { locale })
                      : semanticMessages.shared_hide({}, { locale })
                  }
                  labelPosition="left"
                  disabled={isDisabled || isBaseNetworkDisabled}
                  size="sm"
                  color="primary"
                />
              </div>
            )}

            {/* Only show split band toggle if router has both bands */}
            {hasBothBands && (
              <div class="flex items-center justify-between">
                <span class="font-medium text-gray-600 dark:text-gray-400">
                  {semanticMessages.wireless_card_band_mode({}, { locale })}
                </span>
                <Toggle
                  checked={mode === "easy" ? true : splitBand}
                  onChange$={$((checked: boolean) => {
                    // In easy mode, always keep split band
                    if (mode !== "easy") {
                      // checked directly represents splitBand state
                      onSplitBandToggle(checked);
                    }
                  })}
                  label={
                    splitBand
                      ? semanticMessages.wireless_card_split({}, { locale })
                      : semanticMessages.wireless_card_single({}, { locale })
                  }
                  labelPosition="left"
                  disabled={
                    isDisabled || mode === "easy" || isBaseNetworkDisabled
                  }
                  size="sm"
                  color="primary"
                />
              </div>
            )}
          </div>

          {/* SSID Input */}
          <div class="space-y-1">
            <label class="text-xs font-medium text-gray-700 dark:text-gray-300">
              {semanticMessages.wireless_card_ssid_label({}, { locale })}
              {!isDisabled && !isBaseNetworkDisabled && (
                <span class="ml-1 text-red-500">*</span>
              )}
            </label>
            <div class="flex gap-2">
              <Input
                value={ssid}
                onChange$={(e, value) => onSSIDChange(value)}
                type="text"
                disabled={isDisabled || isBaseNetworkDisabled}
                placeholder={semanticMessages.wireless_card_network_name_placeholder(
                  {},
                  { locale },
                )}
                required={!isDisabled && !isBaseNetworkDisabled}
                size="sm"
                class="flex-1"
              />
              <Button
                onClick$={generateNetworkSSID}
                disabled={
                  isLoading[`${networkKey}SSID`] ||
                  isDisabled ||
                  isBaseNetworkDisabled
                }
                loading={isLoading[`${networkKey}SSID`]}
                variant="outline"
                size="sm"
                iconOnly
                aria-label={semanticMessages.wireless_card_generate_ssid(
                  {},
                  { locale },
                )}
              >
                <HiSparklesOutline class="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Password Input */}
          <div class="space-y-1">
            <label class="text-xs font-medium text-gray-700 dark:text-gray-300">
              {semanticMessages.wireless_card_password_label({}, { locale })}
              {!isDisabled && !isBaseNetworkDisabled && (
                <span class="ml-1 text-red-500">*</span>
              )}
            </label>
            <div class="flex gap-2">
              <Input
                value={password}
                onChange$={(e, value) => onPasswordChange(value)}
                type="text"
                disabled={isDisabled || isBaseNetworkDisabled}
                placeholder={semanticMessages.wireless_card_password_placeholder(
                  {},
                  { locale },
                )}
                required={!isDisabled && !isBaseNetworkDisabled}
                size="sm"
                class="flex-1"
              />
              <Button
                onClick$={generateNetworkPassword}
                disabled={
                  isLoading[`${networkKey}Password`] ||
                  isDisabled ||
                  isBaseNetworkDisabled
                }
                loading={isLoading[`${networkKey}Password`]}
                variant="outline"
                size="sm"
                iconOnly
                aria-label={semanticMessages.wireless_card_generate_password(
                  {},
                  { locale },
                )}
              >
                <HiSparklesOutline class="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Description tooltip on hover */}
          <p class="text-xs italic text-gray-500 dark:text-gray-400">
            {getNetworkDescription(networkKey, locale)}
          </p>
        </div>
      </div>
    );
  },
);
