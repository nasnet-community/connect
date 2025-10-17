import {
  component$,
  useSignal,
  useStore,
  $,
  type QRL,
} from "@builder.io/qwik";
import {
  LuPlus,
  LuTrash2,
  LuCpu,
  LuNetwork,
  LuWifi,
  LuZap,
  LuSmartphone,
  LuX,
} from "@qwikest/icons/lucide";
import { Button, Input, Select } from "~/components/Core";
import type {
  CustomRouterForm,
  EthernetSpeed,
  WifiBand,
  SfpType,
} from "./CustomRouterTypes";
import {
  validateCustomRouterForm,
  convertFormToRouterData,
} from "./CustomRouterUtils";
import type { RouterData } from "./Constants";

interface CustomRouterModalProps {
  isOpen: boolean;
  onClose$: QRL<() => void>;
  onSave$: QRL<(router: RouterData, isCHR: boolean, cpuArch: string) => void>;
  _existingRouters: RouterData[];
}

export const CustomRouterModal = component$<CustomRouterModalProps>((props) => {
  const { isOpen, onClose$, onSave$, _existingRouters } = props;

  const formData = useStore<CustomRouterForm>({
    name: "",
    isCHR: false,
    cpuArch: "",
    ethernet: [],
    wireless: [],
    sfp: [],
    lte: 0,
  });

  const errors = useSignal<string[]>([]);
  const showErrors = useSignal(false);

  const handleAddEthernet = $(() => {
    formData.ethernet.push({ count: 1, speed: "1g" });
  });

  const handleRemoveEthernet = $((index: number) => {
    formData.ethernet.splice(index, 1);
  });

  const handleAddWireless = $(() => {
    formData.wireless.push({ count: 1, band: "2.4" });
  });

  const handleRemoveWireless = $((index: number) => {
    formData.wireless.splice(index, 1);
  });

  const handleAddSfp = $(() => {
    formData.sfp.push({ count: 1, type: "sfp" });
  });

  const handleRemoveSfp = $((index: number) => {
    formData.sfp.splice(index, 1);
  });

  const handleSave = $(() => {
    const validation = validateCustomRouterForm(formData);

    if (!validation.valid) {
      errors.value = validation.errors;
      showErrors.value = true;
      return;
    }

    const routerData = convertFormToRouterData(formData);
    onSave$(routerData, formData.isCHR, formData.cpuArch);
    onClose$();
  });

  const handleCancel = $(() => {
    // Reset form
    formData.name = "";
    formData.isCHR = false;
    formData.cpuArch = "";
    formData.ethernet = [];
    formData.wireless = [];
    formData.sfp = [];
    formData.lte = 0;
    errors.value = [];
    showErrors.value = false;
    onClose$();
  });

  if (!isOpen) return null;

  return (
    <div
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick$={(e) => {
        if (e.target === e.currentTarget) {
          handleCancel();
        }
      }}
    >
      <div class="relative mx-4 max-h-[90vh] w-full max-w-4xl overflow-auto rounded-3xl bg-white dark:bg-gray-900 shadow-2xl">
        {/* Header */}
        <div class="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-8 py-6">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                {$localize`Custom Router Configuration`}
              </h2>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {$localize`Define your router's interfaces and specifications`}
              </p>
            </div>
            <button
              type="button"
              onClick$={handleCancel}
              class="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300 transition-colors"
              aria-label={$localize`Close`}
            >
              <LuX class="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div class="p-8 space-y-8">
          {/* Error Display */}
          {showErrors.value && errors.value.length > 0 && (
            <div class="rounded-xl bg-error/10 border border-error/30 p-4">
              <h3 class="font-semibold text-error mb-2">{$localize`Validation Errors:`}</h3>
              <ul class="list-disc list-inside space-y-1">
                {errors.value.map((error, idx) => (
                  <li key={idx} class="text-sm text-error">
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Basic Information */}
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <LuCpu class="h-5 w-5 text-primary-500" />
              {$localize`Basic Information`}
            </h3>

            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {$localize`Router Name`} <span class="text-error">*</span>
                </label>
                <Input
                  value={formData.name}
                  onInput$={(e) => {
                    formData.name = (e.target as HTMLInputElement).value;
                  }}
                  placeholder={$localize`e.g., My Custom Router`}
                  class="w-full"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {$localize`CPU Architecture`}
                </label>
                <Select
                  value={formData.cpuArch}
                  onChange$={(value) => {
                    formData.cpuArch = Array.isArray(value) ? value[0] : value;
                  }}
                  options={[
                    { value: "", label: $localize`Select architecture...` },
                    { value: "ARM", label: "ARM" },
                    { value: "ARM64", label: "ARM64" },
                    { value: "x64/x86", label: "x64/x86" },
                  ]}
                  placeholder={$localize`Select architecture...`}
                  class="w-full"
                />
              </div>
            </div>

            <div class="flex items-center gap-3">
              <input
                type="checkbox"
                id="isCHR"
                checked={formData.isCHR}
                onChange$={(e) => {
                  formData.isCHR = (e.target as HTMLInputElement).checked;
                }}
                class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label
                for="isCHR"
                class="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {$localize`Cloud Hosted Router (CHR)`}
              </label>
            </div>
          </div>

          {/* Ethernet Interfaces */}
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <LuNetwork class="h-5 w-5 text-primary-500" />
                {$localize`Ethernet Interfaces`}
              </h3>
              <Button
                onClick$={handleAddEthernet}
                variant="outline"
                size="sm"
                class="gap-2"
              >
                <LuPlus class="h-4 w-4" />
                {$localize`Add Ethernet`}
              </Button>
            </div>

            {formData.ethernet.length === 0 ? (
              <p class="text-sm text-gray-500 dark:text-gray-400 italic">
                {$localize`No ethernet interfaces configured. Click "Add Ethernet" to add one.`}
              </p>
            ) : (
              <div class="space-y-3">
                {formData.ethernet.map((config, index) => (
                  <div
                    key={index}
                    class="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  >
                    <div class="flex-1 grid gap-3 md:grid-cols-2">
                      <div>
                        <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                          {$localize`Count`}
                        </label>
                        <Input
                          type="number"
                          min={1}
                          max={32}
                          value={config.count.toString()}
                          onInput$={(e) => {
                            config.count = parseInt(
                              (e.target as HTMLInputElement).value,
                              10
                            ) || 1;
                          }}
                          class="w-full"
                        />
                      </div>
                      <div>
                        <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                          {$localize`Speed`}
                        </label>
                        <Select
                          value={config.speed}
                          onChange$={(value) => {
                            config.speed = value as EthernetSpeed;
                          }}
                          options={[
                            { value: "1g", label: "1 Gbps" },
                            { value: "2.5g", label: "2.5 Gbps" },
                            { value: "10g", label: "10 Gbps" },
                          ]}
                          class="w-full"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick$={() => handleRemoveEthernet(index)}
                      class="p-2 rounded-lg text-error hover:bg-error/10 transition-colors"
                      aria-label={$localize`Remove`}
                    >
                      <LuTrash2 class="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Wireless Interfaces */}
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <LuWifi class="h-5 w-5 text-primary-500" />
                {$localize`Wireless Interfaces`}
              </h3>
              <Button
                onClick$={handleAddWireless}
                variant="outline"
                size="sm"
                class="gap-2"
              >
                <LuPlus class="h-4 w-4" />
                {$localize`Add Wireless`}
              </Button>
            </div>

            {formData.wireless.length === 0 ? (
              <p class="text-sm text-gray-500 dark:text-gray-400 italic">
                {$localize`No wireless interfaces configured. Click "Add Wireless" to add one.`}
              </p>
            ) : (
              <div class="space-y-3">
                {formData.wireless.map((config, index) => (
                  <div
                    key={index}
                    class="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  >
                    <div class="flex-1 grid gap-3 md:grid-cols-2">
                      <div>
                        <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                          {$localize`Count`}
                        </label>
                        <Input
                          type="number"
                          min={1}
                          max={5}
                          value={config.count.toString()}
                          onInput$={(e) => {
                            config.count = parseInt(
                              (e.target as HTMLInputElement).value,
                              10
                            ) || 1;
                          }}
                          class="w-full"
                        />
                      </div>
                      <div>
                        <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                          {$localize`Band`}
                        </label>
                        <Select
                          value={config.band}
                          onChange$={(value) => {
                            config.band = value as WifiBand;
                          }}
                          options={[
                            { value: "2.4", label: "2.4 GHz" },
                            { value: "5", label: "5 GHz" },
                            { value: "6", label: "6 GHz" },
                          ]}
                          class="w-full"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick$={() => handleRemoveWireless(index)}
                      class="p-2 rounded-lg text-error hover:bg-error/10 transition-colors"
                      aria-label={$localize`Remove`}
                    >
                      <LuTrash2 class="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SFP Interfaces */}
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <LuZap class="h-5 w-5 text-primary-500" />
                {$localize`SFP Interfaces`}
              </h3>
              <Button
                onClick$={handleAddSfp}
                variant="outline"
                size="sm"
                class="gap-2"
              >
                <LuPlus class="h-4 w-4" />
                {$localize`Add SFP`}
              </Button>
            </div>

            {formData.sfp.length === 0 ? (
              <p class="text-sm text-gray-500 dark:text-gray-400 italic">
                {$localize`No SFP interfaces configured. Click "Add SFP" to add one.`}
              </p>
            ) : (
              <div class="space-y-3">
                {formData.sfp.map((config, index) => (
                  <div
                    key={index}
                    class="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  >
                    <div class="flex-1 grid gap-3 md:grid-cols-2">
                      <div>
                        <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                          {$localize`Count`}
                        </label>
                        <Input
                          type="number"
                          min={1}
                          max={32}
                          value={config.count.toString()}
                          onInput$={(e) => {
                            config.count = parseInt(
                              (e.target as HTMLInputElement).value,
                              10
                            ) || 1;
                          }}
                          class="w-full"
                        />
                      </div>
                      <div>
                        <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                          {$localize`Type`}
                        </label>
                        <Select
                          value={config.type}
                          onChange$={(value) => {
                            config.type = value as SfpType;
                          }}
                          options={[
                            { value: "sfp", label: "SFP" },
                            { value: "sfp+", label: "SFP+" },
                            { value: "sfp28", label: "SFP28" },
                            { value: "qsfp+", label: "QSFP+" },
                          ]}
                          class="w-full"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick$={() => handleRemoveSfp(index)}
                      class="p-2 rounded-lg text-error hover:bg-error/10 transition-colors"
                      aria-label={$localize`Remove`}
                    >
                      <LuTrash2 class="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* LTE Interfaces */}
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <LuSmartphone class="h-5 w-5 text-primary-500" />
              {$localize`LTE Interfaces`}
            </h3>

            <div class="max-w-xs">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {$localize`LTE Modem Count`}
              </label>
              <Input
                type="number"
                min={0}
                max={5}
                value={formData.lte.toString()}
                onInput$={(e) => {
                  formData.lte = parseInt(
                    (e.target as HTMLInputElement).value,
                    10
                  ) || 0;
                }}
                class="w-full"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div class="sticky bottom-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-8 py-6">
          <div class="flex justify-end gap-3">
            <Button onClick$={handleCancel} variant="outline">
              {$localize`Cancel`}
            </Button>
            <Button onClick$={handleSave} variant="primary">
              {$localize`Save Router`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

