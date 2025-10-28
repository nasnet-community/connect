import { component$, $ } from "@builder.io/qwik";
import { HiSparklesOutline } from "@qwikest/icons/heroicons";
import type { QRL, Signal } from "@builder.io/qwik";
import { Input, Toggle, Button } from "~/components/Core";
import type { Mode } from "../../StarContext/ChooseType";

interface SingleSSIDFormProps {
  ssid: Signal<string>;
  password: Signal<string>;
  isHide: Signal<boolean>;
  isDisabled: Signal<boolean>;
  splitBand: Signal<boolean>;
  generateSSID: QRL<() => Promise<void>>;
  generatePassword: QRL<() => Promise<void>>;
  toggleHide?: QRL<() => void>;
  toggleDisabled?: QRL<() => void>;
  toggleSplitBand?: QRL<() => void>;
  isLoading: Signal<Record<string, boolean>>;
  mode?: Mode;
  hasBothBands?: boolean;
}

export const SingleSSIDForm = component$<SingleSSIDFormProps>(
  ({
    ssid,
    password,
    isHide,
    splitBand,
    generateSSID,
    generatePassword,
    isLoading,
    mode = "advance",
    hasBothBands = true,
  }) => {

    return (
      <div class="space-y-6">
        <p class="dark:text-text-secondary-dark text-text-secondary">
          {$localize`Configure a single SSID for all networks`}
        </p>

        <div class="flex flex-wrap items-center justify-end gap-4 border-b border-gray-200 pb-4 dark:border-gray-700">
          {/* Only show visibility toggle in advance mode */}
          {mode === "advance" && (
            <Toggle
              checked={!isHide.value}
              onChange$={$((checked: boolean) => {
                isHide.value = !checked;
              })}
              label={$localize`Show SSID`}
              labelPosition="left"
              size="sm"
              color="primary"
            />
          )}

          {/* Only show split band toggle if router has both bands */}
          {hasBothBands && (
            <Toggle
              checked={mode === "easy" ? false : splitBand.value}
              onChange$={$((checked: boolean) => {
                // In easy mode, always keep split band false
                splitBand.value = mode === "easy" ? false : checked;
              })}
              label={$localize`Split 2.4/5GHz`}
              labelPosition="left"
              size="sm"
              color="primary"
              disabled={mode === "easy"}
            />
          )}
        </div>

        <div class="mt-4 space-y-6">
          <div class="space-y-2">
            <label
              class="text-sm font-medium text-gray-700 dark:text-gray-300"
              for="ssid"
            >
              {$localize`Network Name (SSID)`}
              <span class="ml-1 text-red-500">*</span>
            </label>
            <div class="flex flex-col gap-3 sm:flex-row">
              <Input
                id="ssid"
                type="text"
                value={ssid.value}
                onInput$={(event: Event, value: string) => {
                  ssid.value = value;
                }}
                placeholder={$localize`Enter network name`}
                required
                class="h-11 flex-1"
              />
              <Button
                onClick$={generateSSID}
                disabled={isLoading.value.singleSSID}
                loading={isLoading.value.singleSSID}
                variant="primary"
                size="md"
                leftIcon
                class="min-w-[160px]"
              >
                <HiSparklesOutline q:slot="leftIcon" class="h-5 w-5" />
                {$localize`Generate SSID`}
              </Button>
            </div>
          </div>

          <div class="space-y-2">
            <label
              class="text-sm font-medium text-gray-700 dark:text-gray-300"
              for="password"
            >
              {$localize`Network Password`}
              <span class="ml-1 text-red-500">*</span>
            </label>
            <div class="flex flex-col gap-3 sm:flex-row">
              <Input
                id="password"
                type="text"
                value={password.value}
                onInput$={(event: Event, value: string) => {
                  password.value = value;
                }}
                placeholder={$localize`Enter network password`}
                required
                class="h-11 flex-1"
              />
              <Button
                onClick$={generatePassword}
                disabled={isLoading.value.singlePassword}
                loading={isLoading.value.singlePassword}
                variant="primary"
                size="md"
                leftIcon
                class="min-w-[160px]"
              >
                <HiSparklesOutline q:slot="leftIcon" class="h-5 w-5" />
                {$localize`Generate Pass`}
              </Button>
            </div>
          </div>
        </div>

        {/* Info Note */}
        <div class="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            {$localize`Note: Both Network Name and Password are required to save your configuration.`}
          </p>
        </div>
      </div>
    );
  },
);
