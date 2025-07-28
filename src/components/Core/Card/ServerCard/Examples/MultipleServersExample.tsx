import { component$, useSignal, $ } from "@builder.io/qwik";
import { ServerCard } from "../../ServerCard";
import {
  WireguardIcon,
  OpenVPNIcon,
  L2TPIcon,
  PPTPIcon,
} from "~/components/Star/LAN/VPNServer/Protocols/icons";

/**
 * Multiple VPN servers configuration example
 * Demonstrates managing multiple server protocols simultaneously
 */
export const MultipleServersExample = component$(() => {
  const servers = useSignal({
    wireguard: { enabled: true, clients: 5, port: "51820" },
    openvpn: { enabled: false, clients: 0, port: "1194" },
    l2tp: { enabled: true, clients: 2, port: "500" },
    pptp: { enabled: false, clients: 0, port: "1723" },
  });

  const createToggleHandler = (serverType: string) =>
    $((enabled: boolean) => {
      const newServers = { ...servers.value };
      newServers[serverType as keyof typeof newServers] = {
        ...newServers[serverType as keyof typeof newServers],
        enabled,
        clients: enabled
          ? newServers[serverType as keyof typeof newServers].clients
          : 0,
      };
      servers.value = newServers;
    });

  return (
    <div class="space-y-6">
      <div class="mb-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          VPN Server Management
        </h2>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
          Configure and manage multiple VPN server protocols
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* WireGuard Server */}
        <ServerCard
          title="WireGuard VPN"
          icon={$(WireguardIcon)}
          enabled={servers.value.wireguard.enabled}
          onToggle$={createToggleHandler("wireguard")}
        >
          <div class="space-y-3">
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div class="font-medium text-gray-700 dark:text-gray-300">
                  Active Clients
                </div>
                <div class="text-gray-500 dark:text-gray-400">
                  {servers.value.wireguard.clients}/10
                </div>
              </div>
              <div>
                <div class="font-medium text-gray-700 dark:text-gray-300">
                  Port
                </div>
                <div class="text-gray-500 dark:text-gray-400">
                  {servers.value.wireguard.port}
                </div>
              </div>
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              Fast, modern VPN with strong cryptography
            </div>
          </div>
        </ServerCard>

        {/* OpenVPN Server */}
        <ServerCard
          title="OpenVPN Server"
          icon={$(OpenVPNIcon)}
          enabled={servers.value.openvpn.enabled}
          onToggle$={createToggleHandler("openvpn")}
        >
          <div class="space-y-3">
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div class="font-medium text-gray-700 dark:text-gray-300">
                  Active Clients
                </div>
                <div class="text-gray-500 dark:text-gray-400">
                  {servers.value.openvpn.clients}/20
                </div>
              </div>
              <div>
                <div class="font-medium text-gray-700 dark:text-gray-300">
                  Port
                </div>
                <div class="text-gray-500 dark:text-gray-400">
                  {servers.value.openvpn.port}/UDP
                </div>
              </div>
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              SSL/TLS based VPN with broad client support
            </div>
          </div>
        </ServerCard>

        {/* L2TP/IPSec Server */}
        <ServerCard
          title="L2TP/IPSec Server"
          icon={$(L2TPIcon)}
          enabled={servers.value.l2tp.enabled}
          onToggle$={createToggleHandler("l2tp")}
        >
          <div class="space-y-3">
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div class="font-medium text-gray-700 dark:text-gray-300">
                  Active Clients
                </div>
                <div class="text-gray-500 dark:text-gray-400">
                  {servers.value.l2tp.clients}/15
                </div>
              </div>
              <div>
                <div class="font-medium text-gray-700 dark:text-gray-300">
                  Ports
                </div>
                <div class="text-gray-500 dark:text-gray-400">500, 4500</div>
              </div>
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              Layer 2 tunneling with IPSec encryption
            </div>
          </div>
        </ServerCard>

        {/* PPTP Server */}
        <ServerCard
          title="PPTP Server"
          icon={$(PPTPIcon)}
          enabled={servers.value.pptp.enabled}
          onToggle$={createToggleHandler("pptp")}
        >
          <div class="space-y-3">
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div class="font-medium text-gray-700 dark:text-gray-300">
                  Active Clients
                </div>
                <div class="text-gray-500 dark:text-gray-400">
                  {servers.value.pptp.clients}/10
                </div>
              </div>
              <div>
                <div class="font-medium text-gray-700 dark:text-gray-300">
                  Port
                </div>
                <div class="text-gray-500 dark:text-gray-400">1723</div>
              </div>
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              Legacy protocol with wide device compatibility
            </div>
            {!servers.value.pptp.enabled && (
              <div class="rounded-lg bg-yellow-50 p-2 dark:bg-yellow-900/20">
                <div class="text-xs text-yellow-700 dark:text-yellow-300">
                  ⚠️ PPTP has known security vulnerabilities
                </div>
              </div>
            )}
          </div>
        </ServerCard>
      </div>

      {/* Summary Stats */}
      <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
        <h3 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
          Server Summary
        </h3>
        <div class="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
          <div>
            <div class="font-medium text-gray-900 dark:text-white">
              Active Servers
            </div>
            <div class="text-gray-500 dark:text-gray-400">
              {Object.values(servers.value).filter((s) => s.enabled).length}/4
            </div>
          </div>
          <div>
            <div class="font-medium text-gray-900 dark:text-white">
              Total Clients
            </div>
            <div class="text-gray-500 dark:text-gray-400">
              {Object.values(servers.value).reduce(
                (sum, server) => sum + server.clients,
                0,
              )}
            </div>
          </div>
          <div>
            <div class="font-medium text-gray-900 dark:text-white">
              Most Used Protocol
            </div>
            <div class="text-gray-500 dark:text-gray-400">
              {servers.value.wireguard.clients > 0 ? "WireGuard" : "None"}
            </div>
          </div>
          <div>
            <div class="font-medium text-gray-900 dark:text-white">
              System Load
            </div>
            <div class="text-gray-500 dark:text-gray-400">Low</div>
          </div>
        </div>
      </div>
    </div>
  );
});
