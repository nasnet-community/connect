import { $, component$, useContext, useSignal } from "@builder.io/qwik";
import {
  HiCheckCircleOutline,
  HiXCircleOutline,
} from "@qwikest/icons/heroicons";
import type { StepProps } from "~/types/step";
import { StarContext } from "../../StarContext/StarContext";

export const Identity = component$<StepProps>(({ onComplete$ }) => {
  const ctx = useContext(StarContext);
  const routerIdentity = useSignal(ctx.state.ExtraConfig.RouterIdentityRomon?.RouterIdentity);
  const romonEnabled = useSignal(ctx.state.ExtraConfig.RouterIdentityRomon?.isRomon);
  const isValid = useSignal(false);

  const handleIdentityChange = $((value: string) => {
    routerIdentity.value = value;
    isValid.value = value.trim().length > 0;
  });

  const handleSubmit = $(() => {
    ctx.updateExtraConfig$({
      RouterIdentityRomon: {
        RouterIdentity: routerIdentity.value as string,
        isRomon: romonEnabled.value,
      },
    });

    onComplete$();
  });

  return (
    <div class="mx-auto w-full max-w-5xl p-4">
      <div class="overflow-hidden rounded-2xl border border-border bg-surface shadow-lg dark:border-border-dark dark:bg-surface-dark">
        {/* Header */}
        <div class="bg-primary-500 px-6 py-8 dark:bg-primary-600">
          <div class="flex items-center space-x-5">
            <div class="rounded-xl border border-white/20 bg-white/10 p-3.5 backdrop-blur-sm">
              <svg
                class="h-7 w-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width={2}
                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                />
              </svg>
            </div>
            <div class="space-y-1">
              <h2 class="text-2xl font-bold text-white">{$localize`Identity Settings`}</h2>
              <p class="text-sm font-medium text-primary-50">{$localize`Configure router identity and remote access`}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div class="space-y-8 p-6">
          {/* Router Identity Input */}
          <div class="space-y-2">
            <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
              {$localize`Router Identity`}
            </label>
            <input
              type="text"
              value={routerIdentity.value}
              onChange$={(e, currentTarget) =>
                handleIdentityChange(currentTarget.value)
              }
              placeholder={$localize`Enter router identity`}
              class="focus:ring-primary-500/50 w-full rounded-lg border border-border bg-surface px-4 py-2.5 focus:border-primary-500
                     focus:ring-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
            />
          </div>

          {/* Romon Settings */}
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <div>
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {$localize`Romon`}
                </label>
                <p class="mt-0.5 text-sm text-gray-600 dark:text-gray-400">
                  {$localize`Enable or disable Remote Network Monitoring (RoMON) for centralized management`}
                </p>
              </div>
              <div class="flex gap-4 rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
                <label
                  class={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2
          ${
            !romonEnabled.value
              ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
              : "text-gray-600 dark:text-gray-400"
          }`}
                >
                  <input
                    type="radio"
                    name="romon"
                    checked={!romonEnabled.value}
                    onChange$={() => (romonEnabled.value = false)}
                    class="hidden"
                  />
                  <HiXCircleOutline class="h-5 w-5" />
                  <span>{$localize`Disable`}</span>
                </label>
                <label
                  class={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2
          ${
            romonEnabled.value
              ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
              : "text-gray-600 dark:text-gray-400"
          }`}
                >
                  <input
                    type="radio"
                    name="romon"
                    checked={romonEnabled.value}
                    onChange$={() => (romonEnabled.value = true)}
                    class="hidden"
                  />
                  <HiCheckCircleOutline class="h-5 w-5" />
                  <span>{$localize`Enable`}</span>
                </label>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div class="flex justify-end pt-4">
            <button
              onClick$={handleSubmit}
              disabled={!isValid.value}
              class={`rounded-lg px-6 py-2.5 font-medium shadow-md transition-all duration-200 
                     focus:ring-2 focus:ring-offset-2 active:scale-[0.98] dark:focus:ring-offset-surface-dark
                     ${
                       isValid.value
                         ? "focus:ring-primary-500/50 bg-primary-500 text-white shadow-primary-500/25 hover:bg-primary-600"
                         : "cursor-not-allowed bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                     }`}
            >
              {$localize`Save`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
