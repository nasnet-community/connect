import { component$, useSignal, useComputed$ } from "@builder.io/qwik";
import type { StarContextType } from "~/components/Star/StarContext/StarContext";
import { Input, Select } from "~/components/Core";
import { buildNetworkOptions } from "./NetworkOptionsHelper";

export const GameForm = component$<{ context: StarContextType }>(
  ({ context }) => {
    const gameName = useSignal("");
    const tcpPorts = useSignal("");
    const udpPorts = useSignal("");
    const network = useSignal<string>("none");

    // Build network options from StarContext Networks
    const networkOptions = useComputed$(() => {
      const options = buildNetworkOptions(context.state.Choose.Networks, context.state.WAN);
      return [
        { value: "none", label: $localize`Select Network` },
        ...options.map((opt) => ({ value: opt.value, label: opt.label })),
      ];
    });

    return (
      <div class="mb-6 space-y-4 rounded-lg border border-border p-4 dark:border-border-dark">
        <h3 class="font-medium text-text dark:text-text-dark-default">
          {$localize`Add Custom Game`}
        </h3>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            type="text"
            placeholder="Game Name"
            value={gameName.value}
            onInput$={(event: Event, value: string) => {
              gameName.value = value;
            }}
          />
          <Input
            type="text"
            placeholder="TCP Ports (comma separated)"
            value={tcpPorts.value}
            onInput$={(event: Event, value: string) => {
              tcpPorts.value = value;
            }}
          />
          <Input
            type="text"
            placeholder="UDP Ports (comma separated)"
            value={udpPorts.value}
            onInput$={(event: Event, value: string) => {
              udpPorts.value = value;
            }}
          />
          <Select
            value={network.value}
            onChange$={(value: string | string[]) => {
              network.value = value as string;
            }}
            options={networkOptions.value}
          />
        </div>
        <div class="flex justify-end">
          <button
            onClick$={() => {
              if (!gameName.value || network.value === "none") return;

              const newGame = {
                name: gameName.value,
                network: network.value,
                ports: {
                  tcp: tcpPorts.value
                    ? tcpPorts.value.split(",").map((p) => p.trim())
                    : [],
                  udp: udpPorts.value
                    ? udpPorts.value.split(",").map((p) => p.trim())
                    : [],
                },
              };

              if (!context.state.ExtraConfig.Games) {
                context.updateExtraConfig$({ Games: [newGame] });
              } else {
                context.updateExtraConfig$({
                  Games: [...context.state.ExtraConfig.Games, newGame],
                });
              }

              gameName.value = "";
              tcpPorts.value = "";
              udpPorts.value = "";
              network.value = "none";
            }}
            class="rounded-lg bg-primary-500 px-4 py-2 text-white transition-colors duration-200 hover:bg-primary-600 disabled:opacity-50"
            disabled={!gameName.value || network.value === "none"}
          >
            {$localize`Add Game`}
          </button>
        </div>
      </div>
    );
  },
);
