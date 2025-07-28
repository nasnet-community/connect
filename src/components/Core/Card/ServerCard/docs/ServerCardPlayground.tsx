import { component$, useSignal, $ } from "@builder.io/qwik";
import { PlaygroundTemplate } from "~/components/Docs/templates/PlaygroundTemplate";
import { ServerCard } from "~/components/Core/Card/ServerCard";
import {
  ServerIcon,
  WireguardIcon,
  OpenVPNIcon,
  L2TPIcon,
  PPTPIcon,
  SSTPIcon,
  IKEv2Icon,
} from "~/components/Star/LAN/VPNServer/Protocols/icons";

export default component$(() => {
  const playgroundEnabled = useSignal(true);

  return (
    <PlaygroundTemplate
      component={ServerCard}
      properties={[
        {
          type: "text",
          name: "title",
          label: "Server Title",
          defaultValue: "WireGuard VPN Server",
        },
        {
          type: "select",
          name: "icon",
          label: "Icon",
          defaultValue: "WireguardIcon",
          options: [
            { label: "Default Server", value: "ServerIcon" },
            { label: "WireGuard", value: "WireguardIcon" },
            { label: "OpenVPN", value: "OpenVPNIcon" },
            { label: "L2TP/IPSec", value: "L2TPIcon" },
            { label: "PPTP", value: "PPTPIcon" },
            { label: "SSTP", value: "SSTPIcon" },
            { label: "IKEv2", value: "IKEv2Icon" },
          ],
        },
        {
          type: "boolean",
          name: "showToggle",
          label: "Show Toggle Switch",
          defaultValue: true,
        },
        {
          type: "boolean",
          name: "enabled",
          label: "Server Enabled",
          defaultValue: true,
        },
        {
          type: "text",
          name: "class",
          label: "Custom CSS Classes",
          defaultValue: "",
        },
        {
          type: "text",
          name: "titleClass",
          label: "Title CSS Classes",
          defaultValue: "",
        },
      ]}
      renderComponent={$((props: any) => {
        const iconMap: Record<string, any> = {
          ServerIcon: $(ServerIcon),
          WireguardIcon: $(WireguardIcon),
          OpenVPNIcon: $(OpenVPNIcon),
          L2TPIcon: $(L2TPIcon),
          PPTPIcon: $(PPTPIcon),
          SSTPIcon: $(SSTPIcon),
          IKEv2Icon: $(IKEv2Icon),
        };

        const selectedIcon = iconMap[props.icon] || $(ServerIcon);

        return (
          <div class="mx-auto w-full max-w-xl">
            <ServerCard
              title={props.title}
              icon={selectedIcon}
              enabled={props.showToggle ? props.enabled : undefined}
              onToggle$={
                props.showToggle
                  ? $((enabled: boolean) => {
                      playgroundEnabled.value = enabled;
                    })
                  : undefined
              }
              class={props.class}
              titleClass={props.titleClass}
            >
              <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div class="font-medium text-gray-700 dark:text-gray-300">
                      Status
                    </div>
                    <div class="text-gray-500 dark:text-gray-400">
                      {props.showToggle && props.enabled
                        ? "Running"
                        : "Stopped"}
                    </div>
                  </div>
                  <div>
                    <div class="font-medium text-gray-700 dark:text-gray-300">
                      Port
                    </div>
                    <div class="text-gray-500 dark:text-gray-400">
                      {props.icon === "OpenVPNIcon"
                        ? "1194"
                        : props.icon === "L2TPIcon"
                          ? "500, 4500"
                          : "51820"}
                    </div>
                  </div>
                </div>

                <div class="space-y-3">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Configuration Mode
                    </label>
                    <select
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      disabled={!props.showToggle || !props.enabled}
                    >
                      <option>Easy Configuration</option>
                      <option>Advanced Configuration</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Max Clients
                    </label>
                    <input
                      type="number"
                      value="10"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      disabled={!props.showToggle || !props.enabled}
                    />
                  </div>
                </div>

                {props.showToggle && props.enabled && (
                  <div class="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
                    <div class="text-sm text-green-700 dark:text-green-300">
                      Server is active and accepting connections
                    </div>
                  </div>
                )}

                {props.showToggle && !props.enabled && (
                  <div class="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                      Server is disabled. Enable to start accepting connections.
                    </div>
                  </div>
                )}
              </div>
            </ServerCard>
          </div>
        );
      })}
    >
      <p class="text-sm text-gray-600 dark:text-gray-300">
        Use the controls above to customize the ServerCard component. Try
        different server protocols, enable/disable the toggle functionality, and
        experiment with custom styling to see how the component adapts to
        different configurations.
      </p>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
        The ServerCard component is specifically designed for server and VPN
        configuration interfaces, providing consistent toggle controls and
        visual feedback for server management operations.
      </p>
    </PlaygroundTemplate>
  );
});
