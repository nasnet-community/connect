import { component$, $, useSignal } from "@builder.io/qwik";
import type { VPNClientAdvancedState, MultiVPNStrategy } from "../types/VPNClientAdvancedTypes";
import type { UseVPNClientAdvancedReturn } from "../hooks/useVPNClientAdvanced";
import { VPNBox } from "../components/VPNBox/VPNBox";
import { VPNBoxContent } from "../components/VPNBox/VPNBoxContent";
import { Card, Input } from "~/components/Core";

export interface StepPrioritiesProps {
  wizardState: VPNClientAdvancedState;
  wizardActions: UseVPNClientAdvancedReturn;
}

export const StepPriorities = component$<StepPrioritiesProps>(
  ({ wizardState, wizardActions }) => {
    const draggedIndex = useSignal<number | null>(null);
    const dragOverIndex = useSignal<number | null>(null);
    const isDragging = useSignal(false);
    
    // Strategy state
    const strategy = useSignal<MultiVPNStrategy>(wizardState.multiVPNStrategy?.strategy || "Failover");

    // Sort VPNs by priority
    const sortedVPNs = [...wizardState.vpnConfigs].sort(
      (a, b) => (a.priority || 0) - (b.priority || 0),
    );

    const handleDragStart = $((index: number) => {
      draggedIndex.value = index;
      isDragging.value = true;
    });

    const handleDragEnd = $(() => {
      draggedIndex.value = null;
      dragOverIndex.value = null;
      isDragging.value = false;
    });

    const handleDragOver = $((e: DragEvent, index: number) => {
      e.preventDefault();
      dragOverIndex.value = index;
    });

    const handleDrop = $((e: DragEvent, dropIndex: number) => {
      e.preventDefault();

      if (draggedIndex.value === null || draggedIndex.value === dropIndex) {
        return;
      }

      const newVPNs = [...sortedVPNs];
      const [draggedVPN] = newVPNs.splice(draggedIndex.value, 1);
      newVPNs.splice(dropIndex, 0, draggedVPN);

      // Update priorities based on new order
      newVPNs.forEach((vpn, index) => {
        wizardActions.updateVPN$(vpn.id, { priority: index + 1 });
      });

      draggedIndex.value = null;
      dragOverIndex.value = null;
      isDragging.value = false;
    });

    const moveUp = $((index: number) => {
      if (index === 0) return;

      const newVPNs = [...sortedVPNs];
      [newVPNs[index], newVPNs[index - 1]] = [
        newVPNs[index - 1],
        newVPNs[index],
      ];

      newVPNs.forEach((vpn, idx) => {
        wizardActions.updateVPN$(vpn.id, { priority: idx + 1 });
      });
    });

    const moveDown = $((index: number) => {
      if (index === sortedVPNs.length - 1) return;

      const newVPNs = [...sortedVPNs];
      [newVPNs[index], newVPNs[index + 1]] = [
        newVPNs[index + 1],
        newVPNs[index],
      ];

      newVPNs.forEach((vpn, idx) => {
        wizardActions.updateVPN$(vpn.id, { priority: idx + 1 });
      });
    });

    // Strategy change handler
    const handleStrategyChange = $((newStrategy: MultiVPNStrategy) => {
      strategy.value = newStrategy;
      
      // Update the strategy in the wizard state
      const updates: any = { strategy: newStrategy };
      
      // Set default values for different strategies
      if (newStrategy === "Failover") {
        if (!wizardState.multiVPNStrategy?.failoverCheckInterval) {
          updates.failoverCheckInterval = 10;
        }
        if (!wizardState.multiVPNStrategy?.failoverTimeout) {
          updates.failoverTimeout = 30;
        }
      } else if (newStrategy === "RoundRobin") {
        if (!wizardState.multiVPNStrategy?.roundRobinInterval) {
          updates.roundRobinInterval = 60;
        }
      } else if (newStrategy === "Both") {
        // LoadBalance & Failover needs both failover settings
        if (!wizardState.multiVPNStrategy?.failoverCheckInterval) {
          updates.failoverCheckInterval = 10;
        }
        if (!wizardState.multiVPNStrategy?.failoverTimeout) {
          updates.failoverTimeout = 30;
        }
      }
      
      // Update the multiVPNStrategy in state
      wizardState.multiVPNStrategy = {
        ...wizardState.multiVPNStrategy,
        ...updates,
      };
    });

    return (
      <div class="space-y-6">
        {/* Strategy Selection */}
        <Card class="p-6">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
            {$localize`Multi-VPN Strategy`}
          </h3>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {[
              { 
                value: "Failover" as MultiVPNStrategy, 
                label: $localize`Failover`, 
                description: $localize`Primary with backup`,
                icon: "M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              },
              { 
                value: "RoundRobin" as MultiVPNStrategy, 
                label: $localize`Round Robin`, 
                description: $localize`Rotate connections`,
                icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              },
              { 
                value: "LoadBalance" as MultiVPNStrategy, 
                label: $localize`Load Balance`, 
                description: $localize`Distribute traffic`,
                icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
              },
              { 
                value: "Both" as MultiVPNStrategy, 
                label: $localize`LoadBalance & Failover`, 
                description: $localize`Balance + Backup`,
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              }
            ].map((option) => (
              <button
                key={option.value}
                onClick$={() => handleStrategyChange(option.value)}
                class={`
                  relative p-4 rounded-lg border-2 transition-all
                  ${
                    strategy.value === option.value
                      ? "border-primary-500 bg-primary-50 dark:bg-primary-900/10"
                      : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500"
                  }
                `}
              >
                <div class="flex flex-col items-center">
                  <svg class={`w-6 h-6 mb-2 ${
                    strategy.value === option.value
                      ? "text-primary-600 dark:text-primary-400"
                      : "text-gray-400"
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={option.icon} />
                  </svg>
                  <span class={`text-sm font-medium ${
                    strategy.value === option.value
                      ? "text-primary-700 dark:text-primary-300"
                      : "text-gray-700 dark:text-gray-200"
                  }`}>
                    {option.label}
                  </span>
                  <span class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {option.description}
                  </span>
                </div>
                {strategy.value === option.value && (
                  <div class="absolute top-2 right-2">
                    <svg class="w-4 h-4 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
          
          {/* Strategy Configuration */}
          {strategy.value === "Failover" && (
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h4 class="text-sm font-medium text-blue-800 dark:text-blue-200 mb-3">
                {$localize`Failover Settings`}
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">
                    {$localize`Check Interval (seconds)`}
                  </label>
                  <Input
                    type="number"
                    min={5}
                    max={60}
                    value={(wizardState.multiVPNStrategy?.failoverCheckInterval || 10).toString()}
                    onInput$={(e: Event) => {
                      const value = parseInt((e.target as HTMLInputElement).value);
                      if (!isNaN(value) && value >= 5 && value <= 60) {
                        wizardState.multiVPNStrategy = {
                          strategy: strategy.value,
                          ...wizardState.multiVPNStrategy,
                          failoverCheckInterval: value,
                        };
                      }
                    }}
                    class="w-full"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">
                    {$localize`Timeout (seconds)`}
                  </label>
                  <Input
                    type="number"
                    min={10}
                    max={120}
                    value={(wizardState.multiVPNStrategy?.failoverTimeout || 30).toString()}
                    onInput$={(e: Event) => {
                      const value = parseInt((e.target as HTMLInputElement).value);
                      if (!isNaN(value) && value >= 10 && value <= 120) {
                        wizardState.multiVPNStrategy = {
                          strategy: strategy.value,
                          ...wizardState.multiVPNStrategy,
                          failoverTimeout: value,
                        };
                      }
                    }}
                    class="w-full"
                  />
                </div>
              </div>
            </div>
          )}
          
          {strategy.value === "RoundRobin" && (
            <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <h4 class="text-sm font-medium text-green-800 dark:text-green-200 mb-3">
                {$localize`Round Robin Settings`}
              </h4>
              <div>
                <label class="block text-sm font-medium text-green-700 dark:text-green-300 mb-1">
                  {$localize`Rotation Interval (seconds)`}
                </label>
                <Input
                  type="number"
                  min={30}
                  max={300}
                  value={(wizardState.multiVPNStrategy?.roundRobinInterval || 60).toString()}
                  onInput$={(e: Event) => {
                    const value = parseInt((e.target as HTMLInputElement).value);
                    if (!isNaN(value) && value >= 30 && value <= 300) {
                      wizardState.multiVPNStrategy = {
                        strategy: strategy.value,
                        ...wizardState.multiVPNStrategy,
                        roundRobinInterval: value,
                      };
                    }
                  }}
                  class="w-full"
                />
                <p class="text-xs text-green-600 dark:text-green-400 mt-1">
                  {$localize`How often to switch between VPN connections`}
                </p>
              </div>
            </div>
          )}
          
          {strategy.value === "LoadBalance" && (
            <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
              <h4 class="text-sm font-medium text-orange-800 dark:text-orange-200 mb-3">
                {$localize`Load Balance Settings`}
              </h4>
              <div class="text-sm text-orange-700 dark:text-orange-300">
                <p>{$localize`Traffic will be distributed evenly across all active VPN connections based on the priority order set below.`}</p>
                <p class="mt-2 font-medium">{$localize`Note: Configure connection priorities in the VPN Priority Order section.`}</p>
              </div>
            </div>
          )}
          
          {strategy.value === "Both" && (
            <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <h4 class="text-sm font-medium text-purple-800 dark:text-purple-200 mb-3">
                {$localize`Load Balance & Failover Settings`}
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label class="block text-sm font-medium text-purple-700 dark:text-purple-300 mb-1">
                    {$localize`Check Interval (seconds)`}
                  </label>
                  <Input
                    type="number"
                    min={5}
                    max={60}
                    value={(wizardState.multiVPNStrategy?.failoverCheckInterval || 10).toString()}
                    onInput$={(e: Event) => {
                      const value = parseInt((e.target as HTMLInputElement).value);
                      if (!isNaN(value) && value >= 5 && value <= 60) {
                        wizardState.multiVPNStrategy = {
                          strategy: strategy.value,
                          ...wizardState.multiVPNStrategy,
                          failoverCheckInterval: value,
                        };
                      }
                    }}
                    class="w-full"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-purple-700 dark:text-purple-300 mb-1">
                    {$localize`Timeout (seconds)`}
                  </label>
                  <Input
                    type="number"
                    min={10}
                    max={120}
                    value={(wizardState.multiVPNStrategy?.failoverTimeout || 30).toString()}
                    onInput$={(e: Event) => {
                      const value = parseInt((e.target as HTMLInputElement).value);
                      if (!isNaN(value) && value >= 10 && value <= 120) {
                        wizardState.multiVPNStrategy = {
                          strategy: strategy.value,
                          ...wizardState.multiVPNStrategy,
                          failoverTimeout: value,
                        };
                      }
                    }}
                    class="w-full"
                  />
                </div>
              </div>
              <div class="text-sm text-purple-700 dark:text-purple-300">
                <p>{$localize`Combines load balancing with automatic failover. Traffic is distributed across active connections, with backup VPNs ready when primary connections fail.`}</p>
              </div>
            </div>
          )}
        </Card>

        {/* Priority Management */}
        <Card class="p-6">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {$localize`VPN Priority Order`}
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {$localize`Drag and drop VPNs to set their priority order. Higher priority VPNs will be preferred.`}
          </p>

        {/* Priority List */}
        <div class="space-y-3">
          {sortedVPNs.map((vpn, index) => (
            <div
              key={vpn.id}
              draggable
              onDragStart$={() => handleDragStart(index)}
              onDragEnd$={handleDragEnd}
              onDragOver$={(e) => handleDragOver(e, index)}
              onDrop$={(e) => handleDrop(e, index)}
              class={{
                "transition-all duration-200": true,
                "opacity-50": draggedIndex.value === index,
                "scale-105 transform":
                  dragOverIndex.value === index && draggedIndex.value !== index,
                "cursor-move": true,
              }}
            >
              <div class="flex items-center space-x-3">
                {/* Priority number */}
                <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30">
                  <span class="text-sm font-semibold text-primary-700 dark:text-primary-300">
                    {index + 1}
                  </span>
                </div>

                {/* VPN Box */}
                <div class="flex-1">
                  <VPNBox
                    vpn={vpn}
                    index={index}
                    isExpanded={false}
                    canRemove={false}
                  >
                    <VPNBoxContent
                      vpn={vpn}
                    >
                      <div class="flex items-center justify-between">
                        <div>
                          <p class="font-medium text-gray-900 dark:text-gray-100">
                            {vpn.name}
                          </p>
                          <p class="text-sm text-gray-500 dark:text-gray-400">
                            {vpn.type} Protocol
                          </p>
                        </div>

                        {/* Move buttons for non-touch devices */}
                        <div class="flex items-center space-x-2">
                          <button
                            onClick$={() => moveUp(index)}
                            disabled={index === 0}
                            class={{
                              "rounded-md p-2 transition-colors": true,
                              "cursor-not-allowed text-gray-400": index === 0,
                              "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700":
                                index > 0,
                            }}
                            title={$localize`Move up`}
                          >
                            <svg
                              class="h-5 w-5"
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
                            onClick$={() => moveDown(index)}
                            disabled={index === sortedVPNs.length - 1}
                            class={{
                              "rounded-md p-2 transition-colors": true,
                              "cursor-not-allowed text-gray-400":
                                index === sortedVPNs.length - 1,
                              "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700":
                                index < sortedVPNs.length - 1,
                            }}
                            title={$localize`Move down`}
                          >
                            <svg
                              class="h-5 w-5"
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

                          {/* Drag handle */}
                          <div class="cursor-move p-2 text-gray-400">
                            <svg
                              class="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 8h16M4 16h16"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </VPNBoxContent>
                  </VPNBox>
                </div>
              </div>
            </div>
          ))}
        </div>

          {/* Instructions */}
          <div class="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <div class="flex">
              <svg
                class="mr-2 h-5 w-5 text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                />
              </svg>
              <div class="text-sm text-blue-700 dark:text-blue-300">
                <p>{$localize`Priority Tips:`}</p>
                <ul class="mt-1 list-inside list-disc space-y-1">
                  <li>{$localize`Drag and drop VPN boxes to reorder them`}</li>
                  <li>{$localize`Use arrow buttons for precise positioning`}</li>
                  <li>{$localize`Priority 1 VPN will be tried first, then 2, and so on`}</li>
                  <li>{$localize`VPNs with the same strategy will use this priority order`}</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  },
);
