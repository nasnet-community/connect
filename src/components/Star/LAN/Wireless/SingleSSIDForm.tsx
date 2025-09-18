import { component$, $, useSignal, useTask$ } from "@builder.io/qwik";
import { HiSparklesOutline, HiEyeSlashOutline, HiEyeOutline, HiSignalOutline, HiSignalSlashOutline } from "@qwikest/icons/heroicons";
import type { QRL, Signal } from "@builder.io/qwik";
import { Input, SegmentedControl, Button } from "~/components/Core";

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
  }) => {
    // Create mutable string signals for SegmentedControls
    const hideState = useSignal(isHide.value ? "hidden" : "visible");
    const splitBandState = useSignal(splitBand.value ? "split" : "combined");

    // Keep the string signals in sync with the boolean signals
    useTask$(({ track }) => {
      track(() => isHide.value);
      hideState.value = isHide.value ? "hidden" : "visible";
    });

    useTask$(({ track }) => {
      track(() => splitBand.value);
      splitBandState.value = splitBand.value ? "split" : "combined";
    });

    const hideOptions = [
      {
        value: "visible",
        label: $localize`Visible`,
        icon: <HiEyeOutline />,
      },
      {
        value: "hidden",
        label: $localize`Hidden`,
        icon: <HiEyeSlashOutline />,
      },
    ];

    const splitBandOptions = [
      {
        value: "combined",
        label: $localize`Combined`,
        icon: <HiSignalOutline />,
      },
      {
        value: "split",
        label: $localize`Split Band`,
        icon: <HiSignalSlashOutline />,
      },
    ];

    return (
      <div class="space-y-6">
        <p class="dark:text-text-secondary-dark text-text-secondary">
          {$localize`Configure a single SSID for all networks`}
        </p>

        <div class="flex flex-wrap items-center justify-end gap-4 border-b border-gray-200 pb-4 dark:border-gray-700">
          <div class="flex items-center gap-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {$localize`Visibility:`}
            </label>
            <SegmentedControl
              value={hideState}
              options={hideOptions}
              onChange$={$((value: string) => {
                isHide.value = value === "hidden";
              })}
              size="sm"
              color="primary"
            />
          </div>

          <div class="flex items-center gap-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {$localize`Band Mode:`}
            </label>
            <SegmentedControl
              value={splitBandState}
              options={splitBandOptions}
              onChange$={$((value: string) => {
                splitBand.value = value === "split";
              })}
              size="sm"
              color="primary"
            />
          </div>
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
                type="password"
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
