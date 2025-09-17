import { component$, $, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { WANWizardState, MultiLinkUIConfig } from "../types";
import type { UseWANAdvancedReturn } from "../hooks/useWANAdvanced";
import { Select, Input, FormLabel, FormHelperText } from "~/components/Core";

export interface Step3Props {
  wizardState: WANWizardState;
  wizardActions: UseWANAdvancedReturn;
}

export const Step3_MultiLink = component$<Step3Props>(
  ({ wizardState, wizardActions }) => {
    const draggedItem = useSignal<string | null>(null);
    const draggedOverItem = useSignal<string | null>(null);
    
    // Get the current strategy or default to LoadBalance
    const currentStrategy = wizardState.multiLinkStrategy?.strategy || "LoadBalance";
    const strategy = useSignal<"LoadBalance" | "Failover" | "RoundRobin" | "Both">(currentStrategy);
    
    // Initialize strategy if not set
    useVisibleTask$(() => {
      // Only set initial strategy if none exists
      if (!wizardState.multiLinkStrategy) {
        // Use setTimeout to ensure state mutation happens after render
        setTimeout(() => {
          wizardActions.setMultiLinkStrategy$({ 
            strategy: "LoadBalance",
            loadBalanceMethod: "PCC"
          });
        }, 0);
      }
    });
    
    const handleStrategyChange = $((value: string) => {
      const newStrategy = value as "LoadBalance" | "Failover" | "RoundRobin" | "Both";
      strategy.value = newStrategy;
      
      // Build the complete strategy configuration
      const strategyConfig: MultiLinkUIConfig = { 
        strategy: newStrategy,
        // Keep existing values or set defaults
        loadBalanceMethod: wizardState.multiLinkStrategy?.loadBalanceMethod || 
          ((newStrategy === "LoadBalance" || newStrategy === "Both") ? "PCC" : undefined),
        failoverCheckInterval: wizardState.multiLinkStrategy?.failoverCheckInterval || 
          ((newStrategy === "Failover" || newStrategy === "Both") ? 10 : undefined),
        failoverTimeout: wizardState.multiLinkStrategy?.failoverTimeout || 
          ((newStrategy === "Failover" || newStrategy === "Both") ? 30 : undefined),
        roundRobinInterval: wizardState.multiLinkStrategy?.roundRobinInterval || 
          (newStrategy === "RoundRobin" ? 60 : undefined),
        packetMode: wizardState.multiLinkStrategy?.packetMode || 
          (newStrategy === "RoundRobin" ? "connection" : undefined),
      };
      
      // Use setMultiLinkStrategy$ which handles initialization
      wizardActions.setMultiLinkStrategy$(strategyConfig);
    });
    
    const handleWeightChange = $((linkId: string, newWeight: number) => {
      const targetLink = wizardState.links.find(l => l.id === linkId);
      if (!targetLink) return;
      
      const oldWeight = targetLink.weight || 0;
      const diff = newWeight - oldWeight;
      
      // If no change, exit early
      if (diff === 0) return;
      
      // Prepare all updates at once
      const updates: Array<{ id: string; updates: Partial<typeof targetLink> }> = [];
      
      // Add target weight update
      updates.push({ id: linkId, updates: { weight: newWeight } });
      
      // Distribute the difference among other links
      const otherLinks = wizardState.links.filter(l => l.id !== linkId);
      
      if (otherLinks.length > 0) {
        const totalOtherWeight = otherLinks.reduce((sum, l) => sum + (l.weight || 0), 0);
        
        if (totalOtherWeight > 0) {
          // Calculate new weights for other links
          let remainingDiff = diff;
          
          otherLinks.forEach((link, index) => {
            const proportion = (link.weight || 0) / totalOtherWeight;
            const weightChange = index === otherLinks.length - 1 
              ? remainingDiff // Give any remaining difference to the last link
              : Math.round(diff * proportion);
            
            const newLinkWeight = Math.max(1, (link.weight || 0) - weightChange);
            remainingDiff -= weightChange;
            
            updates.push({ id: link.id, updates: { weight: newLinkWeight } });
          });
        } else {
          // If other links have no weight, distribute evenly
          const equalWeight = Math.floor((100 - newWeight) / otherLinks.length);
          const remainder = (100 - newWeight) - (equalWeight * otherLinks.length);
          
          otherLinks.forEach((link, index) => {
            updates.push({ 
              id: link.id, 
              updates: { weight: equalWeight + (index === 0 ? remainder : 0) } 
            });
          });
        }
      }
      
      // Apply all updates in a single batch operation
      wizardActions.batchUpdateLinks$(updates);
    });
    
    const handleDragStart = $((linkId: string) => {
      draggedItem.value = linkId;
    });
    
    const handleDragOver = $((linkId: string) => {
      draggedOverItem.value = linkId;
    });
    
    const handleDragEnd = $(() => {
      if (draggedItem.value && draggedOverItem.value && draggedItem.value !== draggedOverItem.value) {
        const draggedLink = wizardState.links.find(l => l.id === draggedItem.value);
        const targetLink = wizardState.links.find(l => l.id === draggedOverItem.value);
        
        if (draggedLink && targetLink) {
          const draggedPriority = draggedLink.priority || 0;
          const targetPriority = targetLink.priority || 0;
          
          // Create a new sorted list with swapped priorities
          const tempLinks = wizardState.links.map(link => ({
            ...link,
            priority: link.id === draggedItem.value ? targetPriority :
                     link.id === draggedOverItem.value ? draggedPriority :
                     link.priority || 0
          }));
          
          // Sort and reassign sequential priorities
          const sortedLinks = tempLinks.sort((a, b) => (a.priority || 0) - (b.priority || 0));
          const allUpdates = sortedLinks.map((link, index) => ({
            id: link.id,
            updates: { priority: index + 1 }
          }));
          
          // Apply all priority updates in a single batch operation
          wizardActions.batchUpdateLinks$(allUpdates);
        }
      }
      
      // Clear drag state
      draggedItem.value = null;
      draggedOverItem.value = null;
    });
    
    
    // Sort links by priority for display - create a new array to avoid mutation
    const linksByPriority = [...wizardState.links].sort((a, b) => (a.priority || 0) - (b.priority || 0));

    return (
      <div class="space-y-6">
        {/* Strategy Selection Card */}
        <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Multi-WAN Strategy
          </h3>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { 
                value: "LoadBalance", 
                label: "Load Balance", 
                description: "Distribute traffic",
                icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
              },
              { 
                value: "Failover", 
                label: "Failover", 
                description: "Backup links",
                icon: "M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              },
              { 
                value: "RoundRobin", 
                label: "Round Robin", 
                description: "Rotating links",
                icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              },
              { 
                value: "Both", 
                label: "Both", 
                description: "Balance + Failover",
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
        </div>

        {/* Load Balance Settings */}
        {(strategy.value === "LoadBalance" || strategy.value === "Both") && (
          <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Load Balance Configuration
            </h3>
            
            {/* Load Balance Method Selection */}
            <div class="mb-6">
              <FormLabel for="loadBalanceMethod">Load Balance Method</FormLabel>
              <Select
                id="loadBalanceMethod"
                value={wizardState.multiLinkStrategy?.loadBalanceMethod || "PCC"}
                onChange$={(value: string | string[]) => {
                  const selectedValue = Array.isArray(value) ? value[0] : value;
                  wizardActions.updateMultiLink({ loadBalanceMethod: selectedValue as "PCC" | "NTH" | "ECMP" | "Bonding" });
                }}
                options={[
                  { value: "PCC", label: "PCC (Per Connection Classifier)" },
                  { value: "NTH", label: "NTH (Nth Connection)" },
                  { value: "RoundRobin", label: "Round Robin" },
                  { value: "ECMP", label: "ECMP (Equal Cost Multi-Path)" },
                  { value: "Bonding", label: "Bonding" }
                ]}
                placeholder="Select load balance method"
                class="w-full"
              />
              <FormHelperText>Choose how traffic will be distributed across multiple links</FormHelperText>
            </div>
            
            {/* Weight Distribution */}
            <div class="flex items-center justify-between mb-4">
              <div>
                <h4 class="text-md font-medium text-gray-900 dark:text-white">
                  Load Balance Weights
                </h4>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Adjust traffic distribution percentage for each link
                </p>
              </div>
              <button
                onClick$={() => {
                  const equalWeight = Math.floor(100 / wizardState.links.length);
                  const remainder = 100 - (equalWeight * wizardState.links.length);
                  const updates = wizardState.links.map((link, index) => ({
                    id: link.id,
                    updates: {
                      weight: equalWeight + (index === 0 ? remainder : 0),
                    }
                  }));
                  // Apply updates directly
                  wizardActions.batchUpdateLinks$(updates);
                }}
                class="px-3 py-1.5 text-sm bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                Auto Balance
              </button>
            </div>
            
            <div class="space-y-3">
              {wizardState.links.map((link) => {
                const weight = link.weight || 0;
                
                return (
                  <div key={link.id} class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div class="flex items-center justify-between mb-2">
                      <div>
                        <span class="font-medium text-gray-900 dark:text-white">
                          {link.name}
                        </span>
                        {link.interfaceName && (
                          <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">
                            ({link.interfaceName})
                          </span>
                        )}
                      </div>
                      <div class="flex items-center gap-2">
                        <input
                          type="number"
                          min="1"
                          max="99"
                          value={weight}
                          onInput$={(e) => {
                            const value = parseInt((e.target as HTMLInputElement).value);
                            if (!isNaN(value) && value >= 1 && value <= 99) {
                              handleWeightChange(link.id, value);
                            }
                          }}
                          class="w-14 px-2 py-1 text-center text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                        />
                        <span class="text-sm text-gray-700 dark:text-gray-300">%</span>
                      </div>
                    </div>
                    <div class="relative">
                      <div class="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                        <div 
                          class="h-full bg-primary-500 transition-all duration-300"
                          style={`width: ${weight}%`}
                        />
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="99"
                        value={weight}
                        onInput$={(e) => handleWeightChange(link.id, parseInt((e.target as HTMLInputElement).value))}
                        class="absolute inset-0 w-full opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                );
              })}
              
              {/* Total Weight Indicator */}
              <div class="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Total Weight:
                  </span>
                  <div class="flex items-center gap-2">
                    {wizardState.links.reduce((sum, l) => sum + (l.weight || 0), 0) === 100 ? (
                      <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                      </svg>
                    ) : (
                      <svg class="w-4 h-4 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                      </svg>
                    )}
                    <span class={`text-lg font-bold ${
                      wizardState.links.reduce((sum, l) => sum + (l.weight || 0), 0) === 100
                        ? "text-green-600 dark:text-green-400"
                        : "text-amber-600 dark:text-amber-400"
                    }`}>
                      {wizardState.links.reduce((sum, l) => sum + (l.weight || 0), 0)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Round Robin Settings */}
        {strategy.value === "RoundRobin" && (
          <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Round Robin Configuration
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <FormLabel for="rotationInterval">Rotation Interval (seconds)</FormLabel>
                <Input
                  id="rotationInterval"
                  type="number"
                  min={30}
                  max={300}
                  value={wizardState.multiLinkStrategy?.roundRobinInterval || 60}
                  onInput$={(e: Event) => {
                    const value = parseInt((e.target as HTMLInputElement).value);
                    if (!isNaN(value) && value >= 30 && value <= 300) {
                      wizardActions.updateMultiLink({ roundRobinInterval: value });
                    }
                  }}
                  class="w-full"
                />
                <FormHelperText>How often to switch between WAN links (30-300 seconds)</FormHelperText>
              </div>
              
              <div>
                <FormLabel for="packetMode">Packet Distribution Mode</FormLabel>
                <Select
                  id="packetMode"
                  value={wizardState.multiLinkStrategy?.packetMode || "connection"}
                  onChange$={(value: string | string[]) => {
                    const selectedValue = Array.isArray(value) ? value[0] : value;
                    wizardActions.updateMultiLink({ packetMode: selectedValue as "connection" | "packet" });
                  }}
                  options={[
                    { value: "connection", label: "Per Connection" },
                    { value: "packet", label: "Per Packet" }
                  ]}
                  placeholder="Select packet mode"
                  class="w-full"
                />
                <FormHelperText>How to distribute traffic during rotation</FormHelperText>
              </div>
            </div>
            
            <div class="p-3 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-200 dark:border-green-700">
              <div class="flex items-start gap-2">
                <svg class="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-sm text-green-700 dark:text-green-300">
                  Traffic will rotate between all available WAN links at the specified interval, ensuring even distribution of usage
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Failover Priority */}
        {(strategy.value === "Failover" || strategy.value === "Both") && (
          <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Failover Configuration
            </h3>
            
            {/* Failover Timing Settings */}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <FormLabel for="failoverCheckInterval">Check Interval (seconds)</FormLabel>
                <Input
                  id="failoverCheckInterval"
                  type="number"
                  min={5}
                  max={60}
                  value={wizardState.multiLinkStrategy?.failoverCheckInterval || 10}
                  onInput$={(e: Event) => {
                    const value = parseInt((e.target as HTMLInputElement).value);
                    if (!isNaN(value) && value >= 5 && value <= 60) {
                      wizardActions.updateMultiLink({ failoverCheckInterval: value });
                    }
                  }}
                  class="w-full"
                />
                <FormHelperText>How often to check link health (5-60 seconds)</FormHelperText>
              </div>
              
              <div>
                <FormLabel for="failoverTimeout">Failover Timeout (seconds)</FormLabel>
                <Input
                  id="failoverTimeout"
                  type="number"
                  min={10}
                  max={120}
                  value={wizardState.multiLinkStrategy?.failoverTimeout || 30}
                  onInput$={(e: Event) => {
                    const value = parseInt((e.target as HTMLInputElement).value);
                    if (!isNaN(value) && value >= 10 && value <= 120) {
                      wizardActions.updateMultiLink({ failoverTimeout: value });
                    }
                  }}
                  class="w-full"
                />
                <FormHelperText>Time before marking link as failed (10-120 seconds)</FormHelperText>
              </div>
            </div>
            
            {/* Priority Ordering */}
            <div class="mb-4">
              <h4 class="text-md font-medium text-gray-900 dark:text-white">
                Failover Priority
              </h4>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Drag to reorder - higher priority links are used first
              </p>
            </div>
            
            <div class="space-y-2">
              {linksByPriority.map((link, index) => {
                const isDragging = draggedItem.value === link.id;
                const isDraggedOver = draggedOverItem.value === link.id;
                
                return (
                  <div
                    key={link.id}
                    draggable
                    onDragStart$={() => handleDragStart(link.id)}
                    onDragOver$={(e) => {
                      e.preventDefault();
                      handleDragOver(link.id);
                    }}
                    onDragEnd$={handleDragEnd}
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
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    
                    <div class={`
                      flex h-8 w-8 items-center justify-center rounded-full text-white font-bold text-sm
                      ${
                        index === 0
                          ? "bg-green-500"
                          : index === 1
                          ? "bg-blue-500"
                          : "bg-gray-400"
                      }
                    `}>
                      {link.priority || index + 1}
                    </div>
                    
                    <div class="flex-1">
                      <div class="flex items-center gap-2">
                        <span class="font-medium text-gray-900 dark:text-white">
                          {link.name}
                        </span>
                        {index === 0 && (
                          <span class="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
                            Primary
                          </span>
                        )}
                      </div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">
                        {link.interfaceName || 'Not configured'}
                        {link.connectionType && ` • ${link.connectionType}`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-700">
              <div class="flex items-start gap-2">
                <svg class="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-sm text-blue-700 dark:text-blue-300">
                  If the primary link fails, traffic automatically switches to the next available link
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);
