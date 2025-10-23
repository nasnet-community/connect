import { component$, type QRL, $ } from "@builder.io/qwik";
import {
  HiSparklesOutline,
  HiTrashOutline,
} from "@qwikest/icons/heroicons";
import type { ExtraWirelessInterface } from "./type";
import type { NetworkOption } from "./networkUtils";
import { Toggle, Input, Button, Select } from "~/components/Core";
import type { Mode } from "../../StarContext/ChooseType";

interface ExtraWirelessCardProps {
  extraInterface: ExtraWirelessInterface;
  availableNetworks: NetworkOption[];
  assignedNetworks: string[];
  onNetworkSelect$: QRL<(id: string, networkName: string) => void>;
  onFieldChange$: QRL<(id: string, field: keyof ExtraWirelessInterface, value: any) => void>;
  onDelete$: QRL<(id: string) => void>;
  generateSSID$: QRL<(id: string) => Promise<void>>;
  generatePassword$: QRL<(id: string) => Promise<void>>;
  isLoading: Record<string, boolean>;
  mode?: Mode;
  hasBothBands?: boolean;
}

export const ExtraWirelessCard = component$<ExtraWirelessCardProps>(
  ({
    extraInterface,
    availableNetworks,
    assignedNetworks,
    onNetworkSelect$,
    onFieldChange$,
    onDelete$,
    generateSSID$,
    generatePassword$,
    isLoading,
    mode = "advance",
    hasBothBands = true,
  }) => {
    const isDisabled = extraInterface.isDisabled;

    // Convert available networks to Select options format
    const networkOptions = availableNetworks.map((network) => {
      const isAssigned = assignedNetworks.includes(network.name) &&
                         network.name !== extraInterface.targetNetworkName;
      return {
        value: network.name,
        label: isAssigned
          ? `${network.displayName} (${$localize`Already assigned`})`
          : network.displayName,
        disabled: isAssigned,
      };
    });

    return (
      <div
        class={`rounded-lg border border-gray-200 bg-white shadow-sm
                transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800
                ${isDisabled ? "opacity-60" : ""}`}
      >
        {/* Compact Header with network selector, status, enable toggle and delete button */}
        <div class="flex items-center justify-between p-3 border-b border-gray-100 dark:border-gray-700">
          <div class="flex items-center gap-2 flex-1 min-w-0">
            <div class="flex-1 min-w-0">
              <label class="text-xs text-gray-600 dark:text-gray-400 block mb-1">
                {$localize`Network`}<span class="ml-1 text-red-500">*</span>
              </label>
              <Select
                options={networkOptions}
                value={extraInterface.targetNetworkName}
                onChange$={$((value: string | string[]) => {
                  const selectedValue = Array.isArray(value) ? value[0] : value;
                  onNetworkSelect$(extraInterface.id, selectedValue);
                })}
                placeholder={$localize`Select network...`}
                size="sm"
                class="w-full"
              />
            </div>
            <div class={`w-2 h-2 rounded-full flex-shrink-0 mt-5 ${isDisabled ? 'bg-gray-400' : 'bg-green-500'}`} />
          </div>

          {/* Enable toggle and delete button */}
          <div class="flex items-center gap-2 ml-2 mt-5">
            <Toggle
              checked={!isDisabled}
              onChange$={$((checked: boolean) => {
                onFieldChange$(extraInterface.id, "isDisabled", !checked);
              })}
              label={!isDisabled ? $localize`On` : $localize`Off`}
              labelPosition="left"
              size="sm"
              color="primary"
            />
            <button
              type="button"
              onClick$={async () => {
                await onDelete$(extraInterface.id);
              }}
              class="text-error transition-colors hover:text-error-dark dark:text-error-light dark:hover:text-error"
              aria-label={$localize`Remove Wireless Interface`}
            >
              <HiTrashOutline class="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div class="px-3 pb-3 space-y-3 pt-3">
          {/* Quick Toggles */}
          <div class="flex flex-col gap-3 text-xs">
            {/* Only show visibility toggle in advance mode */}
            {mode === "advance" && (
              <div class="flex items-center justify-between">
                <span class="text-gray-600 dark:text-gray-400 font-medium">{$localize`SSID Visibility:`}</span>
                <Toggle
                  checked={!extraInterface.isHide}
                  onChange$={$((checked: boolean) => {
                    onFieldChange$(extraInterface.id, "isHide", !checked);
                  })}
                  label={!extraInterface.isHide ? $localize`Show` : $localize`Hide`}
                  labelPosition="left"
                  disabled={isDisabled}
                  size="sm"
                  color="primary"
                />
              </div>
            )}

            {/* Only show split band toggle if router has both bands */}
            {hasBothBands && (
              <div class="flex items-center justify-between">
                <span class="text-gray-600 dark:text-gray-400 font-medium">{$localize`Band Mode:`}</span>
                <Toggle
                  checked={mode === "easy" ? true : extraInterface.splitBand}
                  onChange$={$((checked: boolean) => {
                    if (mode !== "easy") {
                      onFieldChange$(extraInterface.id, "splitBand", checked);
                    }
                  })}
                  label={extraInterface.splitBand ? $localize`Split` : $localize`Single`}
                  labelPosition="left"
                  disabled={isDisabled || mode === "easy"}
                  size="sm"
                  color="primary"
                />
              </div>
            )}
          </div>

          {/* SSID Input */}
          <div class="space-y-1">
            <label class="text-xs font-medium text-gray-700 dark:text-gray-300">
              {$localize`SSID`}
              {!isDisabled && <span class="ml-1 text-red-500">*</span>}
            </label>
            <div class="flex gap-2">
              <Input
                value={extraInterface.ssid}
                onChange$={$((e, value) => onFieldChange$(extraInterface.id, "ssid", value))}
                type="text"
                disabled={isDisabled}
                placeholder={$localize`Network name`}
                required={!isDisabled}
                size="sm"
                class="flex-1"
              />
              <Button
                onClick$={async () => await generateSSID$(extraInterface.id)}
                disabled={isLoading[`${extraInterface.id}-ssid`] || isDisabled}
                loading={isLoading[`${extraInterface.id}-ssid`]}
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
                value={extraInterface.password}
                onChange$={$((e, value) => onFieldChange$(extraInterface.id, "password", value))}
                type="text"
                disabled={isDisabled}
                placeholder={$localize`Password`}
                required={!isDisabled}
                size="sm"
                class="flex-1"
              />
              <Button
                onClick$={async () => await generatePassword$(extraInterface.id)}
                disabled={isLoading[`${extraInterface.id}-password`] || isDisabled}
                loading={isLoading[`${extraInterface.id}-password`]}
                variant="outline"
                size="sm"
                iconOnly
                aria-label={$localize`Generate Password`}
              >
                <HiSparklesOutline class="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Show network info */}
          {extraInterface.targetNetworkName && (
            <p class="text-xs text-gray-500 dark:text-gray-400 italic">
              {$localize`This wireless interface will be bridged to`} {extraInterface.targetNetworkName}
            </p>
          )}
        </div>
      </div>
    );
  },
);
