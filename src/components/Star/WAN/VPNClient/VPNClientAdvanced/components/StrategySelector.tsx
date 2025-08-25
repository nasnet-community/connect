import { component$, $, type QRL } from "@builder.io/qwik";
import { Card } from "~/components/Core";
import type { MultiVPNStrategy } from "../types/VPNClientAdvancedTypes";

export interface StrategySelectorProps {
  selectedStrategy: MultiVPNStrategy;
  onStrategyChange$: QRL<(strategy: MultiVPNStrategy) => void>;
  vpnCount: number;
}

export const StrategySelector = component$<StrategySelectorProps>(({
  selectedStrategy,
  onStrategyChange$,
  vpnCount
}) => {
  const strategies = [
    {
      id: "Failover" as MultiVPNStrategy,
      title: $localize`Failover`,
      description: $localize`Use one VPN at a time, switch to backup when primary fails`,
      icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4",
      pros: [
        $localize`Simple and reliable`,
        $localize`No connection splitting`,
        $localize`Automatic failover`
      ],
      cons: [
        $localize`Doesn't utilize multiple connections`,
        $localize`Some downtime during failover`
      ],
      recommended: vpnCount <= 2
    },
    {
      id: "RoundRobin" as MultiVPNStrategy,
      title: $localize`Round Robin`,
      description: $localize`Balance traffic across all VPNs for maximum speed`,
      icon: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z",
      pros: [
        $localize`Maximum bandwidth utilization`,
        $localize`Load distribution`,
        $localize`Good for high-traffic scenarios`
      ],
      cons: [
        $localize`May cause connection issues with some services`,
        $localize`Complex routing`,
        $localize`Requires stable connections`
      ],
      recommended: vpnCount >= 3
    },
    {
      id: "Priority" as MultiVPNStrategy,
      title: $localize`Priority`,
      description: $localize`Use VPNs in order of priority, manually control switching`,
      icon: "M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4",
      pros: [
        $localize`Full manual control`,
        $localize`Predictable routing`,
        $localize`Easy to troubleshoot`
      ],
      cons: [
        $localize`No automatic failover`,
        $localize`Requires manual intervention`,
        $localize`Underutilizes backup VPNs`
      ],
      recommended: false
    }
  ];

  const handleStrategySelect = $((strategy: MultiVPNStrategy) => {
    onStrategyChange$(strategy);
  });

  return (
    <div class="space-y-4">
      <div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">
          {$localize`Multi-VPN Strategy`}
        </h3>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {$localize`Choose how multiple VPN connections should work together`}
        </p>
      </div>

      <div class="grid gap-4 md:grid-cols-3">
        {strategies.map((strategy) => (
          <Card
            key={strategy.id}
            class={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedStrategy === strategy.id
                ? "border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-900/20"
                : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
            }`}
            onClick$={() => handleStrategySelect(strategy.id)}
          >
            <div class="p-6">
              {/* Header */}
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    selectedStrategy === strategy.id
                      ? "bg-primary-100 dark:bg-primary-900/30"
                      : "bg-gray-100 dark:bg-gray-800"
                  }`}>
                    <svg 
                      class={`h-5 w-5 ${
                        selectedStrategy === strategy.id
                          ? "text-primary-600 dark:text-primary-400"
                          : "text-gray-600 dark:text-gray-400"
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={strategy.icon} />
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900 dark:text-white">
                      {strategy.title}
                    </h4>
                    {strategy.recommended && (
                      <span class="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        {$localize`Recommended`}
                      </span>
                    )}
                  </div>
                </div>
                
                {selectedStrategy === strategy.id && (
                  <svg class="h-6 w-6 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                )}
              </div>

              {/* Description */}
              <p class="mt-3 text-sm text-gray-600 dark:text-gray-400">
                {strategy.description}
              </p>

              {/* Pros */}
              <div class="mt-4">
                <h5 class="text-xs font-medium uppercase tracking-wide text-green-600 dark:text-green-400">
                  {$localize`Advantages`}
                </h5>
                <ul class="mt-2 space-y-1">
                  {strategy.pros.map((pro, index) => (
                    <li key={index} class="flex items-center text-xs text-gray-600 dark:text-gray-400">
                      <svg class="mr-2 h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div class="mt-3">
                <h5 class="text-xs font-medium uppercase tracking-wide text-amber-600 dark:text-amber-400">
                  {$localize`Considerations`}
                </h5>
                <ul class="mt-2 space-y-1">
                  {strategy.cons.map((con, index) => (
                    <li key={index} class="flex items-center text-xs text-gray-600 dark:text-gray-400">
                      <svg class="mr-2 h-3 w-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                      </svg>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Strategy-specific Settings */}
      {selectedStrategy === "Failover" && (
        <Card class="bg-blue-50 dark:bg-blue-900/20">
          <div class="p-4">
            <h4 class="font-medium text-blue-900 dark:text-blue-100">
              {$localize`Failover Settings`}
            </h4>
            <div class="mt-3 grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-blue-800 dark:text-blue-200">
                  {$localize`Check Interval (seconds)`}
                </label>
                <input
                  type="number"
                  min="10"
                  max="300"
                  value="30"
                  class="mt-1 block w-full rounded-md border border-blue-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-blue-600 dark:bg-gray-800"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-blue-800 dark:text-blue-200">
                  {$localize`Timeout (seconds)`}
                </label>
                <input
                  type="number"
                  min="5"
                  max="60"
                  value="10"
                  class="mt-1 block w-full rounded-md border border-blue-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-blue-600 dark:bg-gray-800"
                />
              </div>
            </div>
          </div>
        </Card>
      )}

      {selectedStrategy === "RoundRobin" && (
        <Card class="bg-green-50 dark:bg-green-900/20">
          <div class="p-4">
            <h4 class="font-medium text-green-900 dark:text-green-100">
              {$localize`Load Balancing Settings`}
            </h4>
            <div class="mt-3">
              <label class="block text-sm font-medium text-green-800 dark:text-green-200">
                {$localize`Weight Distribution`}
              </label>
              <p class="mt-1 text-xs text-green-700 dark:text-green-300">
                {$localize`Configure in Step 3 priority editor`}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
});