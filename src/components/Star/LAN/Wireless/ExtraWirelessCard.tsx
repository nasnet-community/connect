import { component$, type QRL, $ } from "@builder.io/qwik";
import { HiSparklesOutline, HiTrashOutline } from "@qwikest/icons/heroicons";
import type { ExtraWirelessInterface } from "./type";
import type { NetworkOption } from "./networkUtils";
import { Toggle, Input, Button, Select } from "~/components/Core";
import type { Mode } from "../../StarContext/ChooseType";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

interface ExtraWirelessCardProps {
  extraInterface: ExtraWirelessInterface;
  availableNetworks: NetworkOption[];
  assignedNetworks: string[];
  onNetworkSelect$: QRL<(id: string, networkName: string) => void>;
  onFieldChange$: QRL<
    (id: string, field: keyof ExtraWirelessInterface, value: any) => void
  >;
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
    const locale = useMessageLocale();
    const isDisabled = extraInterface.isDisabled;

    // Convert available networks to Select options format
    const networkOptions = availableNetworks.map((network) => {
      const isAssigned =
        assignedNetworks.includes(network.name) &&
        network.name !== extraInterface.targetNetworkName;
      return {
        value: network.name,
        label: isAssigned
          ? `${network.displayName} (${semanticMessages.wireless_extra_already_assigned({}, { locale })})`
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
        <div class="flex items-center justify-between border-b border-gray-100 p-3 dark:border-gray-700">
          <div class="flex min-w-0 flex-1 items-center gap-2">
            <div class="min-w-0 flex-1">
              <label class="mb-1 block text-xs text-gray-600 dark:text-gray-400">
                {semanticMessages.wireless_extra_network_label({}, { locale })}
                <span class="ml-1 text-red-500">*</span>
              </label>
              <Select
                options={networkOptions}
                value={extraInterface.targetNetworkName}
                onChange$={$((value: string | string[]) => {
                  const selectedValue = Array.isArray(value) ? value[0] : value;
                  onNetworkSelect$(extraInterface.id, selectedValue);
                })}
                placeholder={semanticMessages.wireless_extra_select_network_placeholder(
                  {},
                  { locale },
                )}
                size="sm"
                class="w-full"
              />
            </div>
            <div
              class={`mt-5 h-2 w-2 flex-shrink-0 rounded-full ${isDisabled ? "bg-gray-400" : "bg-green-500"}`}
            />
          </div>

          {/* Enable toggle and delete button */}
          <div class="ml-2 mt-5 flex items-center gap-2">
            <Toggle
              checked={!isDisabled}
              onChange$={$((checked: boolean) => {
                onFieldChange$(extraInterface.id, "isDisabled", !checked);
              })}
              label={
                !isDisabled
                  ? semanticMessages.shared_on({}, { locale })
                  : semanticMessages.shared_off({}, { locale })
              }
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
              aria-label={semanticMessages.wireless_extra_remove_interface(
                {},
                { locale },
              )}
            >
              <HiTrashOutline class="h-4 w-4" />
            </button>
          </div>
        </div>

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
                  checked={!extraInterface.isHide}
                  onChange$={$((checked: boolean) => {
                    onFieldChange$(extraInterface.id, "isHide", !checked);
                  })}
                  label={
                    !extraInterface.isHide
                      ? semanticMessages.shared_show({}, { locale })
                      : semanticMessages.shared_hide({}, { locale })
                  }
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
                <span class="font-medium text-gray-600 dark:text-gray-400">
                  {semanticMessages.wireless_card_band_mode({}, { locale })}
                </span>
                <Toggle
                  checked={mode === "easy" ? true : extraInterface.splitBand}
                  onChange$={$((checked: boolean) => {
                    if (mode !== "easy") {
                      onFieldChange$(extraInterface.id, "splitBand", checked);
                    }
                  })}
                  label={
                    extraInterface.splitBand
                      ? semanticMessages.wireless_card_split({}, { locale })
                      : semanticMessages.wireless_card_single({}, { locale })
                  }
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
              {semanticMessages.wireless_card_ssid_label({}, { locale })}
              {!isDisabled && <span class="ml-1 text-red-500">*</span>}
            </label>
            <div class="flex gap-2">
              <Input
                value={extraInterface.ssid}
                onChange$={$((e, value) =>
                  onFieldChange$(extraInterface.id, "ssid", value),
                )}
                type="text"
                disabled={isDisabled}
                placeholder={semanticMessages.wireless_card_network_name_placeholder(
                  {},
                  { locale },
                )}
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
              {!isDisabled && <span class="ml-1 text-red-500">*</span>}
            </label>
            <div class="flex gap-2">
              <Input
                value={extraInterface.password}
                onChange$={$((e, value) =>
                  onFieldChange$(extraInterface.id, "password", value),
                )}
                type="text"
                disabled={isDisabled}
                placeholder={semanticMessages.wireless_card_password_placeholder(
                  {},
                  { locale },
                )}
                required={!isDisabled}
                size="sm"
                class="flex-1"
              />
              <Button
                onClick$={async () =>
                  await generatePassword$(extraInterface.id)
                }
                disabled={
                  isLoading[`${extraInterface.id}-password`] || isDisabled
                }
                loading={isLoading[`${extraInterface.id}-password`]}
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

          {/* Show network info */}
          {extraInterface.targetNetworkName && (
            <p class="text-xs italic text-gray-500 dark:text-gray-400">
              {semanticMessages.wireless_extra_bridged_to({}, { locale })}{" "}
              {extraInterface.targetNetworkName}
            </p>
          )}
        </div>
      </div>
    );
  },
);
