import { component$, type QRL, $ } from "@builder.io/qwik";
import { HiSparklesOutline } from "@qwikest/icons/heroicons";
import type { NetworkKey } from "./type";
import { NETWORK_DESCRIPTIONS } from "./constants";
import { Toggle, Input, Button } from "~/components/Core";

interface CompactNetworkCardProps {
  networkKey: NetworkKey;
  ssid: string;
  password: string;
  isHide: boolean;
  isDisabled: boolean;
  splitBand: boolean;
  onSSIDChange: QRL<(value: string) => void>;
  onPasswordChange: QRL<(value: string) => void>;
  onHideToggle: QRL<(value: boolean) => void>;
  onDisabledToggle: QRL<(value: boolean) => void>;
  onSplitBandToggle: QRL<(value: boolean) => void>;
  generateNetworkSSID: QRL<() => Promise<void>>;
  generateNetworkPassword: QRL<() => Promise<void>>;
  isLoading: Record<string, boolean>;
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
  }) => {
    const displayName =
      networkKey.charAt(0).toUpperCase() + networkKey.slice(1);

    return (
      <div
        class={`rounded-lg border border-gray-200 bg-white shadow-sm 
                transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800
                ${isDisabled ? "opacity-60" : ""}`}
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
              onChange$={$((value: boolean) => onDisabledToggle(!value))}
              size="sm"
              color="primary"
            />
          </div>
        </div>

        {/* Content */}
        <div class="px-3 pb-3 space-y-3 pt-3">
            {/* Quick Toggles */}
            <div class="flex gap-4 text-xs">
              <label class="flex items-center gap-1 cursor-pointer">
                <Toggle
                  checked={isHide}
                  onChange$={$((value: boolean) => onHideToggle(value))}
                  disabled={isDisabled}
                  size="sm"
                  color="primary"
                />
                <span class="text-gray-600 dark:text-gray-400">Hide SSID</span>
              </label>

              <label class="flex items-center gap-1 cursor-pointer">
                <Toggle
                  checked={splitBand}
                  onChange$={$((value: boolean) => onSplitBandToggle(value))}
                  disabled={isDisabled}
                  size="sm"
                  color="primary"
                />
                <span class="text-gray-600 dark:text-gray-400">Split Band</span>
              </label>
            </div>

            {/* SSID Input */}
            <div class="space-y-1">
              <label class="text-xs font-medium text-gray-700 dark:text-gray-300">
                {$localize`SSID`}
                {!isDisabled && <span class="ml-1 text-red-500">*</span>}
              </label>
              <div class="flex gap-2">
                <Input
                  value={ssid}
                  onChange$={(e, value) => onSSIDChange(value)}
                  type="text"
                  disabled={isDisabled}
                  placeholder={$localize`Network name`}
                  required={!isDisabled}
                  size="sm"
                  class="flex-1"
                />
                <Button
                  onClick$={generateNetworkSSID}
                  disabled={isLoading[`${networkKey}SSID`] || isDisabled}
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
                {!isDisabled && <span class="ml-1 text-red-500">*</span>}
              </label>
              <div class="flex gap-2">
                <Input
                  value={password}
                  onChange$={(e, value) => onPasswordChange(value)}
                  type="text"
                  disabled={isDisabled}
                  placeholder={$localize`Password`}
                  required={!isDisabled}
                  size="sm"
                  class="flex-1"
                />
                <Button
                  onClick$={generateNetworkPassword}
                  disabled={isLoading[`${networkKey}Password`] || isDisabled}
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