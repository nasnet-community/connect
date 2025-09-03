import { component$, $, useSignal } from "@builder.io/qwik";
import type { VPNClientAdvancedState, MultiVPNStrategy } from "../types/VPNClientAdvancedTypes";
import type { UseVPNClientAdvancedReturn } from "../hooks/useVPNClientAdvanced";
import { Input } from "~/components/Core";

export interface StepPrioritiesProps {
  wizardState: VPNClientAdvancedState;
  wizardActions: UseVPNClientAdvancedReturn;
}

export const StepPriorities = component$<StepPrioritiesProps>(
  ({ wizardState, wizardActions }) => {
    const draggedItem = useSignal<string | null>(null);
    const draggedOverItem = useSignal<string | null>(null);
    
    // Strategy state
    const strategy = useSignal<MultiVPNStrategy>(wizardState.multiVPNStrategy?.strategy || "Failover");

    // Sort VPNs by priority
    const sortedVPNs = [...wizardState.vpnConfigs].sort(
      (a, b) => (a.priority || 0) - (b.priority || 0),
    );

    const handleDragStart = $((vpnId: string) => {
      draggedItem.value = vpnId;
    });
    
    const handleDragOver = $((vpnId: string) => {
      draggedOverItem.value = vpnId;
    });
    
    const handleDragEnd = $(async () => {
      if (draggedItem.value && draggedOverItem.value && draggedItem.value !== draggedOverItem.value) {
        const draggedVPN = wizardState.vpnConfigs.find(vpn => vpn.id === draggedItem.value);
        const targetVPN = wizardState.vpnConfigs.find(vpn => vpn.id === draggedOverItem.value);
        
        if (draggedVPN && targetVPN) {
          const draggedPriority = draggedVPN.priority || 0;
          const targetPriority = targetVPN.priority || 0;
          
          // First swap the two items
          const initialUpdates = [
            { id: draggedItem.value, updates: { priority: targetPriority } },
            { id: draggedOverItem.value, updates: { priority: draggedPriority } }
          ];
          
          // Apply initial swap
          await wizardActions.batchUpdateVPNs$(initialUpdates);
          
          // Then reorder all priorities to ensure they're sequential
          const tempVPNs = wizardState.vpnConfigs.map(vpn => ({
            ...vpn,
            priority: vpn.id === draggedItem.value ? targetPriority :
                     vpn.id === draggedOverItem.value ? draggedPriority :
                     vpn.priority || 0
          }));
          
          const sortedVPNs = tempVPNs.sort((a, b) => (a.priority || 0) - (b.priority || 0));
          const reorderUpdates = sortedVPNs.map((vpn, index) => ({
            id: vpn.id,
            updates: { priority: index + 1 }
          }));
          
          // Apply sequential reordering
          await wizardActions.batchUpdateVPNs$(reorderUpdates);
        }
      }
      
      draggedItem.value = null;
      draggedOverItem.value = null;
    });

    const moveUp = $(async (index: number) => {
      if (index === 0) return;

      const newVPNs = [...sortedVPNs];
      [newVPNs[index], newVPNs[index - 1]] = [
        newVPNs[index - 1],
        newVPNs[index],
      ];

      // Prepare batch updates
      const updates = newVPNs.map((vpn, idx) => ({
        id: vpn.id,
        updates: { priority: idx + 1 }
      }));

      // Update all priorities at once
      await wizardActions.batchUpdateVPNs$(updates);
    });

    const moveDown = $(async (index: number) => {
      if (index === sortedVPNs.length - 1) return;

      const newVPNs = [...sortedVPNs];
      [newVPNs[index], newVPNs[index + 1]] = [
        newVPNs[index + 1],
        newVPNs[index],
      ];

      // Prepare batch updates
      const updates = newVPNs.map((vpn, idx) => ({
        id: vpn.id,
        updates: { priority: idx + 1 }
      }));

      // Update all priorities at once
      await wizardActions.batchUpdateVPNs$(updates);
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
        <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
            {$localize`Multi-VPN Strategy`}
          </h3>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {[
              { 
                value: "Failover" as MultiVPNStrategy, 
                label: $localize`Failover`, 
                description: $localize`Backup Connection`,
                icon: "M13 10V3L4 14h7v7l9-11h-7z"
              },
              { 
                value: "RoundRobin" as MultiVPNStrategy, 
                label: $localize`Round Robin`, 
                description: $localize`Rotating Usage`,
                icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              },
              { 
                value: "LoadBalance" as MultiVPNStrategy, 
                label: $localize`Load Balance`, 
                description: $localize`Distributed Traffic`,
                icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"
              },
              { 
                value: "Both" as MultiVPNStrategy, 
                label: $localize`Both`, 
                description: $localize`Balance + Failover`,
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              }
            ].map(option => (
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
                <div class="flex flex-col items-center text-center">
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

          {strategy.value === "Failover" && (
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
              <h4 class="text-sm font-medium text-blue-800 dark:text-blue-200 mb-3">
                {$localize`Failover Settings`}
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
              <div class="p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-700">
                <div class="flex items-start gap-2">
                  <svg class="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p class="text-sm text-blue-700 dark:text-blue-300">
                    If the primary VPN fails, traffic automatically switches to the next available VPN
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {strategy.value === "RoundRobin" && (
            <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-700">
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
            <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-700">
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
            <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
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
        </div>

        {/* Priority Management */}
        <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
            {$localize`VPN Priority Order`}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">
            {$localize`Drag and drop VPNs to set their priority order. Higher priority VPNs will be preferred.`}
          </p>

        {/* Priority List */}
        <div class="space-y-3">
          {sortedVPNs.map((vpn, index) => {
            const isDragging = draggedItem.value === vpn.id;
            const isDraggedOver = draggedOverItem.value === vpn.id && draggedItem.value !== vpn.id;
            
            return (
              <div
                key={vpn.id}
                draggable
                onDragStart$={() => handleDragStart(vpn.id)}
                onDragEnd$={handleDragEnd}
                onDragOver$={(e) => {
                  e.preventDefault();
                  handleDragOver(vpn.id);
                }}
                class={`
                  flex items-center gap-3 p-4 rounded-lg cursor-move transition-all
                  ${
                    isDragging
                      ? "opacity-50 scale-95"
                      : isDraggedOver
                      ? "shadow-lg border-primary-500 bg-primary-50 dark:bg-primary-900/10"
                      : index === 0
                      ? "bg-white dark:bg-gray-700 border border-green-200 dark:border-green-700"
                      : "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                  }
                  hover:shadow-md
                `}
              >
                {/* Priority number */}
                <div class={`
                  flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold
                  ${
                    index === 0
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }
                `}>
                  {index + 1}
                </div>

                {/* VPN Protocol Icon */}
                <div class={`
                  flex h-10 w-10 items-center justify-center rounded-lg transition-colors
                  ${
                    index === 0
                      ? "bg-green-100 dark:bg-green-900/30"
                      : "bg-gray-100 dark:bg-gray-700"
                  }
                `}>
                  <svg 
                    class={`h-6 w-6 ${
                      index === 0 
                        ? "text-green-600 dark:text-green-400" 
                        : "text-gray-600 dark:text-gray-400"
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={{
                      "Wireguard": "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
                      "OpenVPN": "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                      "L2TP": "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 919-9",
                      "PPTP": "M13 10V3L4 14h7v7l9-11h-7z",
                      "SSTP": "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
                      "IKeV2": "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }[vpn.type] || "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"} />
                  </svg>
                </div>

                {/* VPN Info */}
                <div class="flex-1">
                  <div class="flex items-center gap-2">
                    <span class={`font-medium ${
                      index === 0
                        ? "text-green-900 dark:text-green-100"
                        : "text-gray-900 dark:text-white"
                    }`}>
                      {vpn.name}
                    </span>
                    {index === 0 && (
                      <span class="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
                        Primary
                      </span>
                    )}
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    {vpn.type} Protocol
                    {vpn.assignedLink && ` • Assigned to WAN Link`}
                  </div>
                </div>

                {/* Move Buttons */}
                <div class="flex items-center space-x-1">
                  <button
                    onClick$={(e) => {
                      e.stopPropagation();
                      moveUp(index);
                    }}
                    disabled={index === 0}
                    class={`
                      rounded p-2 transition-colors
                      ${
                        index === 0
                          ? "cursor-not-allowed text-gray-400"
                          : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600"
                      }
                    `}
                    title={$localize`Move up`}
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  
                  <button
                    onClick$={(e) => {
                      e.stopPropagation();
                      moveDown(index);
                    }}
                    disabled={index === sortedVPNs.length - 1}
                    class={`
                      rounded p-2 transition-colors
                      ${
                        index === sortedVPNs.length - 1
                          ? "cursor-not-allowed text-gray-400"
                          : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600"
                      }
                    `}
                    title={$localize`Move down`}
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Drag Handle */}
                  <div class="cursor-move p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </div>
    );
  },
);