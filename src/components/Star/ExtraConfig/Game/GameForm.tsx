import { component$, useSignal } from "@builder.io/qwik";
import type { StarContextType } from "~/components/Star/StarContext/StarContext";
import { Input, Select } from "~/components/Core";

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
            value={link.value}
            onChange$={(value: string | string[]) => {
              link.value = value as "none" | "foreign" | "domestic" | "vpn";
            }}
            options={[
              { value: "none", label: $localize`Select Route` },
              { value: "foreign", label: $localize`Foreign` },
              { value: "domestic", label: $localize`Domestic` },
              { value: "vpn", label: $localize`VPN` },
            ]}
          />
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
