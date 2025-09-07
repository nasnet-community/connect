import { component$, type QRL } from "@builder.io/qwik";
import { getStrategyIcon } from "../../utils/iconMappings";

export type StrategyType = "LoadBalance" | "Failover" | "RoundRobin" | "Both";

interface StrategyOption {
  value: StrategyType;
  label: string;
  description: string;
}

export interface StrategySelectorProps {
  selectedStrategy: StrategyType;
  onStrategyChange$: QRL<(strategy: StrategyType) => void>;
}

const strategies: StrategyOption[] = [
  { 
    value: "LoadBalance", 
    label: "Load Balance", 
    description: "Distribute traffic"
  },
  { 
    value: "Failover", 
    label: "Failover", 
    description: "Backup links"
  },
  { 
    value: "RoundRobin", 
    label: "Round Robin", 
    description: "Rotating links"
  },
  { 
    value: "Both", 
    label: "Both", 
    description: "Balance + Failover"
  }
];

export const StrategySelector = component$<StrategySelectorProps>(
  ({ selectedStrategy, onStrategyChange$ }) => {
    return (
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Multi-WAN Strategy
        </h3>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {strategies.map((option) => (
            <button
              key={option.value}
              onClick$={() => onStrategyChange$(option.value)}
              class={`
                relative p-4 rounded-lg border-2 transition-all
                ${
                  selectedStrategy === option.value
                    ? "border-primary-500 bg-primary-50 dark:bg-primary-900/10"
                    : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500"
                }
              `}
            >
              <div class="flex flex-col items-center">
                <svg 
                  class={`w-6 h-6 mb-2 ${
                    selectedStrategy === option.value
                      ? "text-primary-600 dark:text-primary-400"
                      : "text-gray-400"
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d={getStrategyIcon(option.value)} 
                  />
                </svg>
                <span class={`text-sm font-medium ${
                  selectedStrategy === option.value
                    ? "text-primary-700 dark:text-primary-300"
                    : "text-gray-700 dark:text-gray-200"
                }`}>
                  {option.label}
                </span>
                <span class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {option.description}
                </span>
              </div>
              {selectedStrategy === option.value && (
                <div class="absolute top-2 right-2">
                  <svg 
                    class="w-4 h-4 text-primary-600 dark:text-primary-400" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fill-rule="evenodd" 
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                      clip-rule="evenodd" 
                    />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }
);