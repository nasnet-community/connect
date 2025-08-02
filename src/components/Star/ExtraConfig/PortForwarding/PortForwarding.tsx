import { component$, useStore } from "@builder.io/qwik";
import type { StepProps } from "~/types/step";

interface PortForwardingRule {
  protocol: string;
  remoteIP: string;
  remotePort: string;
  targetIP: string;
  targetPort: string;
  description: string;
}

export const PortForwarding = component$<StepProps>(() => {
  const state = useStore({
    protocol: "",
    remoteIP: "",
    remotePort: "",
    targetIP: "",
    targetPort: "",
    description: "",
    rules: [] as PortForwardingRule[],
  });

  return (
    <div class="mx-auto w-full max-w-5xl p-4">
      <div class="overflow-hidden rounded-2xl border border-border bg-surface shadow-lg dark:border-border-dark dark:bg-surface-dark">
        {/* Header */}
        <div class="bg-primary-500 px-6 py-8 dark:bg-primary-600">
          <div class="flex items-center space-x-5">
            <div class="rounded-xl border border-white/20 bg-white/10 p-3.5 backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </div>
            <div class="space-y-1">
              <h2 class="text-2xl font-bold text-white">{$localize`Port Forwarding`}</h2>
              <p class="text-sm font-medium text-primary-50">{$localize`Configure port forwarding rules for your network`}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div class="p-6">
          {/* Form */}
          <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="col-span-1">
              <label class="text-text-secondary dark:text-text-dark-secondary mb-1 block text-sm font-medium">{$localize`Protocol`}</label>
              <select
                value={state.protocol}
                onChange$={(e) =>
                  (state.protocol = (e.target as HTMLSelectElement).value)
                }
                class="w-full rounded-md border-border bg-surface px-3 py-2 text-text dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
              >
                <option value="">{$localize`Select Protocol`}</option>
                <option value="TCP">{$localize`TCP`}</option>
                <option value="UDP">{$localize`UDP`}</option>
                <option value="BOTH">{$localize`Both`}</option>
              </select>
            </div>

            <div class="col-span-1">
              <label class="text-text-secondary dark:text-text-dark-secondary mb-1 block text-sm font-medium">{$localize`Remote IP`}</label>
              <input
                type="text"
                value={state.remoteIP}
                onChange$={(e) =>
                  (state.remoteIP = (e.target as HTMLInputElement).value)
                }
                class="w-full rounded-md border-border bg-surface px-3 py-2 text-text dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                placeholder={$localize`Enter Remote IP`}
              />
            </div>

            <div class="col-span-1">
              <label class="text-text-secondary dark:text-text-dark-secondary mb-1 block text-sm font-medium">{$localize`Remote Port`}</label>
              <input
                type="text"
                value={state.remotePort}
                onChange$={(e) =>
                  (state.remotePort = (e.target as HTMLInputElement).value)
                }
                class="w-full rounded-md border-border bg-surface px-3 py-2 text-text dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                placeholder={$localize`Enter Remote Port`}
              />
            </div>

            <div class="col-span-1">
              <label class="text-text-secondary dark:text-text-dark-secondary mb-1 block text-sm font-medium">{$localize`Target IP`}</label>
              <input
                type="text"
                value={state.targetIP}
                onChange$={(e) =>
                  (state.targetIP = (e.target as HTMLInputElement).value)
                }
                class="w-full rounded-md border-border bg-surface px-3 py-2 text-text dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                placeholder={$localize`Enter Target IP`}
              />
            </div>

            <div class="col-span-1">
              <label class="text-text-secondary dark:text-text-dark-secondary mb-1 block text-sm font-medium">{$localize`Target Port`}</label>
              <input
                type="text"
                value={state.targetPort}
                onChange$={(e) =>
                  (state.targetPort = (e.target as HTMLInputElement).value)
                }
                class="w-full rounded-md border-border bg-surface px-3 py-2 text-text dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                placeholder={$localize`Enter Target Port`}
              />
            </div>

            <div class="col-span-1">
              <label class="text-text-secondary dark:text-text-dark-secondary mb-1 block text-sm font-medium">{$localize`Description`}</label>
              <input
                type="text"
                value={state.description}
                onChange$={(e) =>
                  (state.description = (e.target as HTMLInputElement).value)
                }
                class="w-full rounded-md border-border bg-surface px-3 py-2 text-text dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                placeholder={$localize`Enter Description`}
              />
            </div>

            <div class="col-span-2 flex justify-end">
              <button
                onClick$={() => {
                  if (
                    state.protocol &&
                    state.remoteIP &&
                    state.remotePort &&
                    state.targetIP &&
                    state.targetPort
                  ) {
                    state.rules = [
                      ...state.rules,
                      {
                        protocol: state.protocol,
                        remoteIP: state.remoteIP,
                        remotePort: state.remotePort,
                        targetIP: state.targetIP,
                        targetPort: state.targetPort,
                        description: state.description,
                      },
                    ];
                    state.protocol = "";
                    state.remoteIP = "";
                    state.remotePort = "";
                    state.targetIP = "";
                    state.targetPort = "";
                    state.description = "";
                  }
                }}
                disabled={
                  !state.protocol ||
                  !state.remoteIP ||
                  !state.remotePort ||
                  !state.targetIP ||
                  !state.targetPort
                }
                class="flex items-center gap-2 rounded-md bg-primary-500 px-4 py-2 text-white transition-colors hover:bg-primary-600 disabled:bg-primary-200 dark:disabled:bg-primary-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                {$localize`Add Rule`}
              </button>
            </div>
          </div>

          {/* Table */}
          {state.rules.length > 0 && (
            <div class="overflow-x-auto">
              <table class="w-full text-left text-sm">
                <thead class="bg-surface-secondary dark:bg-surface-dark-secondary text-xs uppercase">
                  <tr>
                    <th class="px-4 py-3">{$localize`Protocol`}</th>
                    <th class="px-4 py-3">{$localize`Remote IP`}</th>
                    <th class="px-4 py-3">{$localize`Remote Port`}</th>
                    <th class="px-4 py-3">{$localize`Target IP`}</th>
                    <th class="px-4 py-3">{$localize`Target Port`}</th>
                    <th class="px-4 py-3">{$localize`Description`}</th>
                    <th class="px-4 py-3">{$localize`Action`}</th>
                  </tr>
                </thead>
                <tbody>
                  {state.rules.map((rule, index) => (
                    <tr
                      key={index}
                      class="border-b border-border dark:border-border-dark"
                    >
                      <td class="px-4 py-3">{rule.protocol}</td>
                      <td class="px-4 py-3">{rule.remoteIP}</td>
                      <td class="px-4 py-3">{rule.remotePort}</td>
                      <td class="px-4 py-3">{rule.targetIP}</td>
                      <td class="px-4 py-3">{rule.targetPort}</td>
                      <td class="px-4 py-3">{rule.description}</td>
                      <td class="px-4 py-3">
                        <button
                          onClick$={() => {
                            state.rules = state.rules.filter(
                              (_, i) => i !== index,
                            );
                          }}
                          class="text-error-500 hover:text-error-600 dark:text-error-400 dark:hover:text-error-300"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
