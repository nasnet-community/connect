import { component$, type QRL, $ } from "@builder.io/qwik";
import {
  HiSparklesOutline,
} from "@qwikest/icons/heroicons";
import type { NetworkKey } from "./type";
import { NETWORK_DESCRIPTIONS } from "./constants";
import { Toggle, Input, Button } from "~/components/Core";
import type { Mode } from "../../StarContext/ChooseType";

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
  }) => {
    const displayName =
      networkKey.charAt(0).toUpperCase() + networkKey.slice(1);

    return (
      <div
        class={`rounded-lg border shadow-sm transition-all duration-200
                ${isBaseNetworkDisabled
                  ? "border-gray-300 bg-gray-50 opacity-50 dark:border-gray-600 dark:bg-gray-900"
                  : "border-gray-200 bg-white hover:shadow-md dark:border-gray-700 dark:bg-gray-800"}
                ${isDisabled && !isBaseNetworkDisabled ? "opacity-60" : ""}`}
      >
        {/* Compact Header */}
        <div class="flex items-center justify-between p-3 border-b border-gray-100 dark:border-gray-700">
          <div class="flex items-center gap-2">
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white">
              {displayName} Network
            </h3>
            {!isDisabled && ssid && (
              <span class="text-xs text-gray-500 dark:text-gray-400">
                ({ssid})
              </span>
            )}
            <div class={`w-2 h-2 rounded-full ${isDisabled ? 'bg-gray-400' : 'bg-green-500'}`} />
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
              label={!isDisabled ? $localize`On` : $localize`Off`}
              labelPosition="left"
              size="sm"
              color="primary"
              disabled={isBaseNetworkDisabled}
            />
          </div>
        </div>

        {/* Warning message when base network is disabled */}
        {isBaseNetworkDisabled && (
          <div class="mx-3 mt-3 rounded-md bg-yellow-50 border border-yellow-200 p-2 dark:bg-yellow-900/20 dark:border-yellow-800">
            <p class="text-xs text-yellow-800 dark:text-yellow-200">
              <span class="font-semibold">{$localize`Network disabled:`}</span>
              {' '}
              {$localize`This base network is disabled. Enable it in the network configuration first.`}
            </p>
          </div>
        )}

        {/* Content */}
        <div class="px-3 pb-3 space-y-3 pt-3">
            {/* Quick Toggles */}
            <div class="flex flex-col gap-3 text-xs">
              {/* Only show visibility toggle in advance mode */}
              {mode === "advance" && (
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 dark:text-gray-400 font-medium">{$localize`SSID Visibility:`}</span>
                  <Toggle
                    checked={!isHide}
                    onChange$={$((checked: boolean) => {
                      // checked represents visible state, so invert for hide
                      onHideToggle(!checked);
                    })}
                    label={!isHide ? $localize`Show` : $localize`Hide`}
                    labelPosition="left"
                    disabled={isDisabled || isBaseNetworkDisabled}
                    size="sm"
                    color="primary"
                  />
                </div>
              )}

              <div class="flex items-center justify-between">
                <span class="text-gray-600 dark:text-gray-400 font-medium">{$localize`Band Mode:`}</span>
                <Toggle
                  checked={mode === "easy" ? true : splitBand}
                  onChange$={$((checked: boolean) => {
                    // In easy mode, always keep split band
                    if (mode !== "easy") {
                      // checked directly represents splitBand state
                      onSplitBandToggle(checked);
                    }
                  })}
                  label={splitBand ? $localize`Split` : $localize`Single`}
                  labelPosition="left"
                  disabled={isDisabled || mode === "easy" || isBaseNetworkDisabled}
                  size="sm"
                  color="primary"
                />
              </div>
            </div>

            {/* SSID Input */}
            <div class="space-y-1">
              <label class="text-xs font-medium text-gray-700 dark:text-gray-300">
                {$localize`SSID`}
                {!isDisabled && !isBaseNetworkDisabled && <span class="ml-1 text-red-500">*</span>}
              </label>
              <div class="flex gap-2">
                <Input
                  value={ssid}
                  onChange$={(e, value) => onSSIDChange(value)}
                  type="text"
                  disabled={isDisabled || isBaseNetworkDisabled}
                  placeholder={$localize`Network name`}
                  required={!isDisabled && !isBaseNetworkDisabled}
                  size="sm"
                  class="flex-1"
                />
                <Button
                  onClick$={generateNetworkSSID}
                  disabled={isLoading[`${networkKey}SSID`] || isDisabled || isBaseNetworkDisabled}
                  loading={isLoading[`${networkKey}SSID`]}
                  variant="outline"
                  size="sm"
                  iconOnly
                  aria-label={$localize`Generate SSID`}
                >
                  <HiSparklesOutline class="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Password Input */}
            <div class="space-y-1">
              <label class="text-xs font-medium text-gray-700 dark:text-gray-300">
                {$localize`Password`}
                {!isDisabled && !isBaseNetworkDisabled && <span class="ml-1 text-red-500">*</span>}
              </label>
              <div class="flex gap-2">
                <Input
                  value={password}
                  onChange$={(e, value) => onPasswordChange(value)}
                  type="text"
                  disabled={isDisabled || isBaseNetworkDisabled}
                  placeholder={$localize`Password`}
                  required={!isDisabled && !isBaseNetworkDisabled}
                  size="sm"
                  class="flex-1"
                />
                <Button
                  onClick$={generateNetworkPassword}
                  disabled={isLoading[`${networkKey}Password`] || isDisabled || isBaseNetworkDisabled}
                  loading={isLoading[`${networkKey}Password`]}
                  variant="outline"
                  size="sm"
                  iconOnly
                  aria-label={$localize`Generate Password`}
                >
                  <HiSparklesOutline class="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Description tooltip on hover */}
            <p class="text-xs text-gray-500 dark:text-gray-400 italic">
              {NETWORK_DESCRIPTIONS[networkKey]}
            </p>
          </div>
      </div>
    );
  },
);