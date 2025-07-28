import { component$, useSignal, $ } from "@builder.io/qwik";
import { DocExample } from "~/components/Docs/";
import { ServerCard } from "../../ServerCard";
import {
  WireguardIcon,
  OpenVPNIcon,
  L2TPIcon,
  PPTPIcon,
  SSTPIcon,
  IKEv2Icon,
} from "~/components/Star/LAN/VPNServer/Protocols/icons";

export default component$(() => {
  const wireguardEnabled = useSignal(true);
  const openvpnEnabled = useSignal(false);
  const l2tpEnabled = useSignal(true);

  return (
    <div class="space-y-12">
      <DocExample
        title="Basic Server Card"
        description="A simple server card with default icon and no toggle functionality."
        preview={
          <div class="mx-auto w-full max-w-md">
            <ServerCard title="Web Server">
              <div class="space-y-4">
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  Basic server configuration without enable/disable
                  functionality. Perfect for informational server cards or when
                  toggle control is handled elsewhere.
                </p>
                <div class="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                  <div class="text-sm">
                    <div class="font-medium">Status: Running</div>
                    <div class="text-gray-500 dark:text-gray-400">
                      Port: 8080
                    </div>
                  </div>
                </div>
              </div>
            </ServerCard>
          </div>
        }
        code={`
<ServerCard title="Web Server">
  <div class="space-y-4">
    <p class="text-sm text-gray-600 dark:text-gray-300">
      Basic server configuration without enable/disable functionality.
      Perfect for informational server cards or when toggle control
      is handled elsewhere.
    </p>
    <div class="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
      <div class="text-sm">
        <div class="font-medium">Status: Running</div>
        <div class="text-gray-500 dark:text-gray-400">Port: 8080</div>
      </div>
    </div>
  </div>
</ServerCard>
        `}
      />

      <DocExample
        title="Server Card with Toggle"
        description="Server card with enable/disable toggle functionality."
        preview={
          <div class="mx-auto w-full max-w-md">
            <ServerCard
              title="WireGuard VPN"
              icon={$(WireguardIcon)}
              enabled={wireguardEnabled.value}
              onToggle$={$((enabled: boolean) => {
                wireguardEnabled.value = enabled;
              })}
            >
              <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div class="font-medium text-gray-700 dark:text-gray-300">
                      Interface
                    </div>
                    <div class="text-gray-500 dark:text-gray-400">wg0</div>
                  </div>
                  <div>
                    <div class="font-medium text-gray-700 dark:text-gray-300">
                      Port
                    </div>
                    <div class="text-gray-500 dark:text-gray-400">51820</div>
                  </div>
                </div>
                {wireguardEnabled.value && (
                  <div class="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
                    <div class="text-sm text-green-700 dark:text-green-300">
                      Server is active and accepting connections
                    </div>
                  </div>
                )}
              </div>
            </ServerCard>
          </div>
        }
        code={`
const wireguardEnabled = useSignal(true);

<ServerCard
  title="WireGuard VPN"
  icon={$(WireguardIcon)}
  enabled={wireguardEnabled.value}
  onToggle$={$((enabled: boolean) => {
    wireguardEnabled.value = enabled;
  })}
>
  <div class="space-y-4">
    <div class="grid grid-cols-2 gap-4 text-sm">
      <div>
        <div class="font-medium text-gray-700 dark:text-gray-300">Interface</div>
        <div class="text-gray-500 dark:text-gray-400">wg0</div>
      </div>
      <div>
        <div class="font-medium text-gray-700 dark:text-gray-300">Port</div>
        <div class="text-gray-500 dark:text-gray-400">51820</div>
      </div>
    </div>
    {wireguardEnabled.value && (
      <div class="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
        <div class="text-sm text-green-700 dark:text-green-300">
          Server is active and accepting connections
        </div>
      </div>
    )}
  </div>
</ServerCard>
        `}
      />

      <DocExample
        title="VPN Protocol Cards"
        description="Multiple server cards showing different VPN protocols with their specific icons."
        preview={
          <div class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            <ServerCard
              title="OpenVPN Server"
              icon={$(OpenVPNIcon)}
              enabled={openvpnEnabled.value}
              onToggle$={$((enabled: boolean) => {
                openvpnEnabled.value = enabled;
              })}
            >
              <div class="space-y-3">
                <div class="text-sm">
                  <div class="font-medium text-gray-700 dark:text-gray-300">
                    Protocol: UDP
                  </div>
                  <div class="text-gray-500 dark:text-gray-400">Port: 1194</div>
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  SSL/TLS based VPN with strong encryption
                </div>
              </div>
            </ServerCard>

            <ServerCard
              title="L2TP/IPSec Server"
              icon={$(L2TPIcon)}
              enabled={l2tpEnabled.value}
              onToggle$={$((enabled: boolean) => {
                l2tpEnabled.value = enabled;
              })}
            >
              <div class="space-y-3">
                <div class="text-sm">
                  <div class="font-medium text-gray-700 dark:text-gray-300">
                    IPSec ESP: Enabled
                  </div>
                  <div class="text-gray-500 dark:text-gray-400">
                    Ports: 500, 4500
                  </div>
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  Layer 2 tunneling with IPSec encryption
                </div>
              </div>
            </ServerCard>
          </div>
        }
        code={`
const openvpnEnabled = useSignal(false);
const l2tpEnabled = useSignal(true);

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
  <ServerCard
    title="OpenVPN Server"
    icon={$(OpenVPNIcon)}
    enabled={openvpnEnabled.value}
    onToggle$={$((enabled: boolean) => {
      openvpnEnabled.value = enabled;
    })}
  >
    <div class="space-y-3">
      <div class="text-sm">
        <div class="font-medium text-gray-700 dark:text-gray-300">Protocol: UDP</div>
        <div class="text-gray-500 dark:text-gray-400">Port: 1194</div>
      </div>
      <div class="text-xs text-gray-500 dark:text-gray-400">
        SSL/TLS based VPN with strong encryption
      </div>
    </div>
  </ServerCard>

  <ServerCard
    title="L2TP/IPSec Server"
    icon={$(L2TPIcon)}
    enabled={l2tpEnabled.value}
    onToggle$={$((enabled: boolean) => {
      l2tpEnabled.value = enabled;
    })}
  >
    <div class="space-y-3">
      <div class="text-sm">
        <div class="font-medium text-gray-700 dark:text-gray-300">IPSec ESP: Enabled</div>
        <div class="text-gray-500 dark:text-gray-400">Ports: 500, 4500</div>
      </div>
      <div class="text-xs text-gray-500 dark:text-gray-400">
        Layer 2 tunneling with IPSec encryption
      </div>
    </div>
  </ServerCard>
</div>
        `}
      />

      <DocExample
        title="Server Configuration Form"
        description="Server card containing form elements for configuration."
        preview={
          <div class="mx-auto w-full max-w-md">
            <ServerCard
              title="PPTP Server"
              icon={$(PPTPIcon)}
              enabled={true}
              onToggle$={$(() => {
                // Toggle handler
              })}
            >
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Max Clients
                  </label>
                  <input
                    type="number"
                    value="10"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Authentication
                  </label>
                  <select class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                    <option>MSCHAPv2</option>
                    <option>CHAP</option>
                    <option>PAP</option>
                  </select>
                </div>
              </div>
            </ServerCard>
          </div>
        }
        code={`
<ServerCard
  title="PPTP Server"
  icon={$(PPTPIcon)}
  enabled={true}
  onToggle$={$(() => {
    // Toggle handler
  })}
>
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Max Clients
      </label>
      <input
        type="number"
        value="10"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Authentication
      </label>
      <select class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        <option>MSCHAPv2</option>
        <option>CHAP</option>
        <option>PAP</option>
      </select>
    </div>
  </div>
</ServerCard>
        `}
      />

      <DocExample
        title="Custom Styling"
        description="Server cards with custom CSS classes for different visual treatments."
        preview={
          <div class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            <ServerCard
              title="SSTP Server"
              icon={$(SSTPIcon)}
              class="border-l-4 border-l-blue-500"
              titleClass="text-blue-600 dark:text-blue-400"
              enabled={false}
              onToggle$={$(() => {
                // Toggle handler
              })}
            >
              <div class="text-sm text-gray-600 dark:text-gray-300">
                Secure Socket Tunneling Protocol server with custom blue accent.
              </div>
            </ServerCard>

            <ServerCard
              title="IKEv2 Server"
              icon={$(IKEv2Icon)}
              class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20"
              enabled={true}
              onToggle$={$(() => {
                // Toggle handler
              })}
            >
              <div class="text-sm text-gray-600 dark:text-gray-300">
                Internet Key Exchange v2 server with gradient background.
              </div>
            </ServerCard>
          </div>
        }
        code={`
<ServerCard
  title="SSTP Server"
  icon={$(SSTPIcon)}
  class="border-l-4 border-l-blue-500"
  titleClass="text-blue-600 dark:text-blue-400"
  enabled={false}
  onToggle$={$(() => {
    // Toggle handler
  })}
>
  <div class="text-sm text-gray-600 dark:text-gray-300">
    Secure Socket Tunneling Protocol server with custom blue accent.
  </div>
</ServerCard>

<ServerCard
  title="IKEv2 Server"
  icon={$(IKEv2Icon)}
  class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20"
  enabled={true}
  onToggle$={$(() => {
    // Toggle handler
  })}
>
  <div class="text-sm text-gray-600 dark:text-gray-300">
    Internet Key Exchange v2 server with gradient background.
  </div>
</ServerCard>
        `}
      />
    </div>
  );
});
