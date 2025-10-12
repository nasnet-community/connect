import { component$ } from "@builder.io/qwik";
import type { StarContextType } from "~/components/Star/StarContext/StarContext";

export const GameSelected = component$<{ context: StarContextType }>(
  ({ context }) => {
    const formatPorts = (ports: {
      tcp?: (string | number)[];
      udp?: (string | number)[];
    }) => {
      const parts = [];
      if (ports.tcp?.length) {
        parts.push(`TCP: ${ports.tcp.join(", ")}`);
      }
      if (ports.udp?.length) {
        parts.push(`UDP: ${ports.udp.join(", ")}`);
      }
      return parts.join(" | ");
    };
    return context.state.ExtraConfig.Games?.length ? (
      <div class="space-y-3">
        <h3 class="font-medium text-text dark:text-text-dark-default">
          {$localize`Selected Games`}
        </h3>
        <div class="space-y-2">
          {context.state.ExtraConfig.Games.map((game, index) => (
            <div
              key={`${game.name}-${game.network}-${index}`}
              class="bg-surface-secondary dark:bg-surface-dark-secondary flex items-center justify-between rounded-lg p-3"
            >
              <div class="flex items-center space-x-3">
                <span class="font-medium text-text dark:text-text-dark-default">
                  {game.name}
                </span>
                <span class="text-text-secondary dark:text-text-dark-secondary text-sm">
                  ({game.network})
                </span>
                <span class="text-text-secondary dark:text-text-dark-secondary text-sm">
                  {formatPorts(game.ports)}
                </span>
              </div>
              <button
                onClick$={() => {
                  const updatedGames = [
                    ...(context.state.ExtraConfig.Games || []),
                  ];
                  updatedGames.splice(index, 1);
                  context.updateExtraConfig$({ Games: updatedGames });
                }}
                class="text-red-500 hover:text-red-600"
              >
                <svg
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
            </div>
          ))}
        </div>
      </div>
    ) : null;
  },
);
