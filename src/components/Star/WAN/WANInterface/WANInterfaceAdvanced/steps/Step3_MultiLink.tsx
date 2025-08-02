import { component$, useSignal, $ } from "@builder.io/qwik";
import type {
  WANWizardState,
  MultiLinkStrategy,
  LoadBalanceMethod,
} from "../../../../StarContext/WANType";
import type { UseWANAdvancedReturn } from "../hooks/useWANAdvanced";

export interface Step3Props {
  wizardState: WANWizardState;
  wizardActions: UseWANAdvancedReturn;
}

export const Step3_MultiLink = component$<Step3Props>(
  ({ wizardState, wizardActions }) => {
    const strategy = useSignal<MultiLinkStrategy>(
      wizardState.multiLinkStrategy?.strategy || "LoadBalance",
    );
    const loadBalanceMethod = useSignal<LoadBalanceMethod>(
      wizardState.multiLinkStrategy?.loadBalanceMethod || "PCC",
    );

    const updateStrategy$ = $((newStrategy: MultiLinkStrategy) => {
      strategy.value = newStrategy;
      wizardActions.setMultiLinkStrategy$({
        strategy: newStrategy,
        loadBalanceMethod: loadBalanceMethod.value,
        failoverCheckInterval: 10,
        failoverTimeout: 30,
      });
    });

    const updateLoadBalanceMethod$ = $((method: LoadBalanceMethod) => {
      loadBalanceMethod.value = method;
      wizardActions.setMultiLinkStrategy$({
        strategy: strategy.value,
        loadBalanceMethod: method,
        failoverCheckInterval: 10,
        failoverTimeout: 30,
      });
    });

    const updateLinkWeight$ = $((linkId: string, weight: number) => {
      wizardActions.updateLink$(linkId, { weight });
    });

    const updateLinkPriority$ = $((linkId: string, priority: number) => {
      wizardActions.updateLink$(linkId, { priority });
    });

    // Calculate if weights are valid
    const totalWeight = wizardState.links.reduce(
      (sum, link) => sum + (link.weight || 0),
      0,
    );
    const weightsValid = totalWeight === 100;

    return (
      <div class="space-y-6">
        {/* Header */}
        <div>
          <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
            {$localize`Multi-WAN Configuration`}
          </h2>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {$localize`Configure how multiple WAN links work together`}
          </p>
        </div>

        {/* Strategy Selection */}
        <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h3 class="mb-4 text-base font-medium text-gray-900 dark:text-gray-100">
            {$localize`How should multiple links work together?`}
          </h3>

          <div class="space-y-3">
            {/* Load Balance */}
            <label
              class={`
            flex cursor-pointer items-start rounded-lg border p-4 transition-all
            ${
              strategy.value === "LoadBalance"
                ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                : "border-gray-200 hover:border-gray-300 dark:border-gray-700"
            }
          `}
            >
              <input
                type="radio"
                class="mt-0.5 text-primary-600 focus:ring-primary-500"
                checked={strategy.value === "LoadBalance"}
                onChange$={() => updateStrategy$("LoadBalance")}
              />
              <div class="ml-3">
                <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {$localize`Load Balance`}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  {$localize`Share traffic across all links for better performance`}
                </div>
              </div>
            </label>

            {/* Failover */}
            <label
              class={`
            flex cursor-pointer items-start rounded-lg border p-4 transition-all
            ${
              strategy.value === "Failover"
                ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                : "border-gray-200 hover:border-gray-300 dark:border-gray-700"
            }
          `}
            >
              <input
                type="radio"
                class="mt-0.5 text-primary-600 focus:ring-primary-500"
                checked={strategy.value === "Failover"}
                onChange$={() => updateStrategy$("Failover")}
              />
              <div class="ml-3">
                <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {$localize`Failover`}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  {$localize`Use backup links only when primary fails`}
                </div>
              </div>
            </label>

            {/* Both */}
            <label
              class={`
            flex cursor-pointer items-start rounded-lg border p-4 transition-all
            ${
              strategy.value === "Both"
                ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                : "border-gray-200 hover:border-gray-300 dark:border-gray-700"
            }
          `}
            >
              <input
                type="radio"
                class="mt-0.5 text-primary-600 focus:ring-primary-500"
                checked={strategy.value === "Both"}
                onChange$={() => updateStrategy$("Both")}
              />
              <div class="ml-3">
                <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {$localize`Both`}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  {$localize`Load balance with failover capability`}
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Load Balance Configuration */}
        {(strategy.value === "LoadBalance" || strategy.value === "Both") && (
          <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <h3 class="mb-4 text-base font-medium text-gray-900 dark:text-gray-100">
              {$localize`Load Balance Settings`}
            </h3>

            {/* Method Selection (Advanced Mode) */}
            {wizardState.mode === "advanced" && (
              <div class="mb-6">
                <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {$localize`Load Balance Method`}
                </label>
                <select
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 
                       focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                  value={loadBalanceMethod.value}
                  onChange$={(e) =>
                    updateLoadBalanceMethod$(
                      (e.target as HTMLSelectElement)
                        .value as LoadBalanceMethod,
                    )
                  }
                >
                  <option value="PCC">{$localize`PCC (Per Connection Classifier)`}</option>
                  <option value="NTH">{$localize`NTH (Nth Packet)`}</option>
                  <option value="ECMP">{$localize`ECMP (Equal Cost Multi-Path)`}</option>
                  <option value="Bonding">{$localize`Bonding`}</option>
                </select>
              </div>
            )}

            {/* Weight Distribution */}
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {$localize`Weight Distribution`}
              </label>
              <div class="space-y-3">
                {wizardState.links.map((link) => (
                  <div key={link.id} class="flex items-center gap-4">
                    <span class="w-32 text-sm text-gray-600 dark:text-gray-400">
                      {link.name}
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={link.weight || 0}
                      onInput$={(e) => {
                        const value =
                          parseInt((e.target as HTMLInputElement).value) || 0;
                        updateLinkWeight$(link.id, value);
                      }}
                      class="flex-1"
                    />
                    <span class="w-12 text-right text-sm font-medium text-gray-900 dark:text-gray-100">
                      {link.weight || 0}%
                    </span>
                  </div>
                ))}
              </div>

              {/* Weight Total */}
              <div class="mt-3 flex items-center justify-end gap-2">
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {$localize`Total:`}
                </span>
                <span
                  class={`text-sm font-medium ${weightsValid ? "text-green-600" : "text-error-600"}`}
                >
                  {totalWeight}%
                </span>
              </div>

              {!weightsValid && (
                <p class="mt-2 text-sm text-error-600 dark:text-error-400">
                  {$localize`Weights must sum to 100%`}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Failover Configuration */}
        {(strategy.value === "Failover" || strategy.value === "Both") && (
          <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <h3 class="mb-4 text-base font-medium text-gray-900 dark:text-gray-100">
              {$localize`Failover Priority`}
            </h3>
            <p class="mb-4 text-sm text-gray-500 dark:text-gray-400">
              {$localize`Drag to reorder links by priority (1 = highest priority)`}
            </p>

            <div class="space-y-2">
              {wizardState.links
                .sort((a, b) => (a.priority || 0) - (b.priority || 0))
                .map((link, index) => (
                  <div
                    key={link.id}
                    class="flex items-center gap-4 rounded-md bg-gray-50 p-3 dark:bg-gray-700"
                  >
                    <span class="w-8 text-sm font-medium text-gray-500 dark:text-gray-400">
                      {index + 1}.
                    </span>
                    <span class="flex-1 text-sm text-gray-900 dark:text-gray-100">
                      {link.name} ({link.interfaceName || "Not configured"})
                    </span>
                    <div class="flex gap-1">
                      <button
                        onClick$={() => {
                          if (index > 0) {
                            const prevLink = wizardState.links[index - 1];
                            updateLinkPriority$(
                              link.id,
                              prevLink.priority || 1,
                            );
                            updateLinkPriority$(
                              prevLink.id,
                              link.priority || index + 1,
                            );
                          }
                        }}
                        disabled={index === 0}
                        class="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                      >
                        <svg
                          class="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 15l7-7 7 7"
                          />
                        </svg>
                      </button>
                      <button
                        onClick$={() => {
                          if (index < wizardState.links.length - 1) {
                            const nextLink = wizardState.links[index + 1];
                            updateLinkPriority$(
                              link.id,
                              nextLink.priority || index + 2,
                            );
                            updateLinkPriority$(
                              nextLink.id,
                              link.priority || index + 1,
                            );
                          }
                        }}
                        disabled={index === wizardState.links.length - 1}
                        class="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                      >
                        <svg
                          class="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    );
  },
);
