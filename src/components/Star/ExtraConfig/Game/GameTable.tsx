import { $, component$, useComputed$ } from "@builder.io/qwik";
import { games } from "./GameData";
import { useGameLogic } from "./useGame";
import type { GameTableProps } from "./type";
import { buildNetworkOptions, groupNetworkOptions } from "./NetworkOptionsHelper";

export const GameTable = component$<GameTableProps>(
  ({ searchQuery, currentPage, itemsPerPage, context }) => {
    const { handleGameSelection } = useGameLogic();

    // Build network options from StarContext Networks
    const networkOptions = useComputed$(() =>
      buildNetworkOptions(context.state.Choose.Networks, context.state.WAN)
    );

    const groupedOptions = useComputed$(() =>
      groupNetworkOptions(networkOptions.value)
    );

    return (
      <div class="overflow-hidden rounded-xl border border-border dark:border-border-dark">
        <table class="w-full text-left text-sm">
          <thead class="bg-surface-secondary dark:bg-surface-dark-secondary">
            <tr>
              <th class="px-6 py-4 font-medium">{$localize`Game Name`}</th>
              <th class="px-6 py-4 font-medium">{$localize`TCP Ports`}</th>
              <th class="px-6 py-4 font-medium">{$localize`UDP Ports`}</th>
              <th class="px-6 py-4 font-medium">{$localize`Action`}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border dark:divide-border-dark">
            {games
              .filter((game) =>
                game.name
                  .toLowerCase()
                  .includes(searchQuery.value.toLowerCase()),
              )
              .slice(
                (currentPage.value - 1) * itemsPerPage,
                currentPage.value * itemsPerPage,
              )
              .map((game) => {
                const selectedGame = context.state.ExtraConfig.Games?.find(
                  (g) => g.name === game.name,
                );

                return (
                  <tr key={game.name}>
                    <td class="px-6 py-4 font-medium">{game.name}</td>
                    <td class="px-6 py-4">{game.tcp?.join(", ") || "-"}</td>
                    <td class="px-6 py-4">{game.udp?.join(", ") || "-"}</td>
                    <td class="px-6 py-4">
                      <select
                        value={selectedGame?.network || "none"}
                        onChange$={$((e) => {
                          const serializedGame = {
                            name: String(game.name),
                            tcp: game.tcp?.map((port) =>
                              String(port).valueOf(),
                            ),
                            udp: game.udp?.map((port) =>
                              String(port).valueOf(),
                            ),
                          };
                          handleGameSelection(
                            serializedGame,
                            (e.target as HTMLSelectElement).value,
                          );
                        })}
                        class="w-full rounded-lg border border-border bg-surface px-3 py-2 dark:border-border-dark dark:bg-surface-dark"
                      >
                        <option value="none">{$localize`Select Network`}</option>
                        {Object.entries(groupedOptions.value).map(([category, options]) => (
                          <optgroup key={category} label={category}>
                            {options.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  },
);
