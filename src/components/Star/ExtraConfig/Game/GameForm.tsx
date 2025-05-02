import { component$, useSignal } from "@builder.io/qwik";
import type { StarContextType } from "~/components/Star/StarContext/StarContext";

export const GameForm = component$<{ context: StarContextType }>(
  ({ context }) => {
    const gameName = useSignal("");
    const tcpPorts = useSignal("");
    const udpPorts = useSignal("");
    const link = useSignal<"none" | "foreign" | "domestic" | "vpn">("none");

    return (
      <div class="mb-6 space-y-4 rounded-lg border border-border p-4 dark:border-border-dark">
        <h3 class="font-medium text-text dark:text-text-dark-default">
          {$localize`Add Custom Game`}
        </h3>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Game Name"
            bind:value={gameName}
            class="rounded-lg border border-border bg-surface px-4 py-2 dark:border-border-dark dark:bg-surface-dark"
          />
          <input
            type="text"
            placeholder="TCP Ports (comma separated)"
            bind:value={tcpPorts}
            class="rounded-lg border border-border bg-surface px-4 py-2 dark:border-border-dark dark:bg-surface-dark"
          />
          <input
            type="text"
            placeholder="UDP Ports (comma separated)"
            bind:value={udpPorts}
            class="rounded-lg border border-border bg-surface px-4 py-2 dark:border-border-dark dark:bg-surface-dark"
          />
          <select
            bind:value={link}
            class="rounded-lg border border-border bg-surface px-4 py-2 dark:border-border-dark dark:bg-surface-dark"
          >
            <option value="none">{$localize`Select Route`}</option>
            <option value="foreign">{$localize`Foreign`}</option>
            <option value="domestic">{$localize`Domestic`}</option>
            <option value="vpn">{$localize`VPN`}</option>
          </select>
        </div>
        <div class="flex justify-end">
          <button
            onClick$={() => {
              if (!gameName.value || link.value === "none") return;

              const newGame = {
                name: gameName.value,
                link: link.value,
                ports: {
                  tcp: tcpPorts.value
                    ? tcpPorts.value.split(",").map((p) => p.trim())
                    : [],
                  udp: udpPorts.value
                    ? udpPorts.value.split(",").map((p) => p.trim())
                    : [],
                },
              };

              context.updateExtraConfig$({
                Games: [...context.state.ExtraConfig.Games, newGame],
              });

              gameName.value = "";
              tcpPorts.value = "";
              udpPorts.value = "";
              link.value = "none";
            }}
            class="rounded-lg bg-primary-500 px-4 py-2 text-white transition-colors duration-200 hover:bg-primary-600 disabled:opacity-50"
            disabled={!gameName.value || link.value === "none"}
          >
            {$localize`Add Game`}
          </button>
        </div>
      </div>
    );
  },
);
