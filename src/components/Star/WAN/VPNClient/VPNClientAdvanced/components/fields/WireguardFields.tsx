import { component$, $ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { WireguardClientConfig } from "~/components/Star/StarContext/Utils/VPNClientType";

interface WireguardFieldsProps {
  config: Partial<WireguardClientConfig>;
  onUpdate$: QRL<(updates: Partial<WireguardClientConfig>) => Promise<void>>;
  errors?: Record<string, string>;
  mode?: "easy" | "advanced";
}

export const WireguardFields = component$<WireguardFieldsProps>((props) => {
  const { config, errors = {}, mode = "advanced", onUpdate$ } = props;

  return (
    <div class="space-y-4">
      {/* Interface Private Key */}
      <div>
        <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
          {$localize`Interface Private Key`} *
        </label>
        <input
          type="text"
          value={config.InterfacePrivateKey || ""}
          onInput$={$((e) =>
            onUpdate$({
              InterfacePrivateKey: (e.target as HTMLInputElement).value,
            }),
          )}
          class={`w-full rounded-md border px-3 py-2 
                  ${
                    errors.InterfacePrivateKey
                      ? "border-red-500 focus:ring-red-500"
                      : "border-border focus:ring-primary-500 dark:border-border-dark"
                  }
                  text-text-default bg-background
                  dark:bg-background-dark dark:text-text-dark-default`}
          placeholder="Your private key"
        />
        {errors.InterfacePrivateKey && (
          <p class="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.InterfacePrivateKey}
          </p>
        )}
      </div>

      {/* Interface Address */}
      <div>
        <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
          {$localize`Interface Address`} *
        </label>
        <input
          type="text"
          value={config.InterfaceAddress || ""}
          onInput$={$((e) =>
            onUpdate$({
              InterfaceAddress: (e.target as HTMLInputElement).value,
            }),
          )}
          class={`w-full rounded-md border px-3 py-2 
                  ${
                    errors.InterfaceAddress
                      ? "border-red-500 focus:ring-red-500"
                      : "border-border focus:ring-primary-500 dark:border-border-dark"
                  }
                  text-text-default bg-background
                  dark:bg-background-dark dark:text-text-dark-default`}
          placeholder="10.0.0.2/32"
        />
        {errors.InterfaceAddress && (
          <p class="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.InterfaceAddress}
          </p>
        )}
      </div>

      {/* Peer Public Key */}
      <div>
        <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
          {$localize`Peer Public Key`} *
        </label>
        <input
          type="text"
          value={config.PeerPublicKey || ""}
          onInput$={$((e) =>
            onUpdate$({ PeerPublicKey: (e.target as HTMLInputElement).value }),
          )}
          class={`w-full rounded-md border px-3 py-2 
                  ${
                    errors.PeerPublicKey
                      ? "border-red-500 focus:ring-red-500"
                      : "border-border focus:ring-primary-500 dark:border-border-dark"
                  }
                  text-text-default bg-background
                  dark:bg-background-dark dark:text-text-dark-default`}
          placeholder="Server public key"
        />
        {errors.PeerPublicKey && (
          <p class="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.PeerPublicKey}
          </p>
        )}
      </div>

      {/* Peer Endpoint */}
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
            {$localize`Peer Endpoint Address`} *
          </label>
          <input
            type="text"
            value={config.PeerEndpointAddress || ""}
            onInput$={$((e) =>
              onUpdate$({
                PeerEndpointAddress: (e.target as HTMLInputElement).value,
              }),
            )}
            class={`w-full rounded-md border px-3 py-2 
                    ${
                      errors.PeerEndpointAddress
                        ? "border-red-500 focus:ring-red-500"
                        : "border-border focus:ring-primary-500 dark:border-border-dark"
                    }
                    text-text-default bg-background
                    dark:bg-background-dark dark:text-text-dark-default`}
            placeholder="vpn.example.com"
          />
          {errors.PeerEndpointAddress && (
            <p class="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.PeerEndpointAddress}
            </p>
          )}
        </div>

        <div>
          <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
            {$localize`Peer Endpoint Port`} *
          </label>
          <input
            type="number"
            value={config.PeerEndpointPort || ""}
            onInput$={$((e) =>
              onUpdate$({
                PeerEndpointPort: parseInt(
                  (e.target as HTMLInputElement).value,
                ),
              }),
            )}
            class={`w-full rounded-md border px-3 py-2 
                    ${
                      errors.PeerEndpointPort
                        ? "border-red-500 focus:ring-red-500"
                        : "border-border focus:ring-primary-500 dark:border-border-dark"
                    }
                    text-text-default bg-background
                    dark:bg-background-dark dark:text-text-dark-default`}
            placeholder="51820"
          />
          {errors.PeerEndpointPort && (
            <p class="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.PeerEndpointPort}
            </p>
          )}
        </div>
      </div>

      {/* Peer Allowed IPs */}
      <div>
        <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
          {$localize`Peer Allowed IPs`} *
        </label>
        <input
          type="text"
          value={config.PeerAllowedIPs || ""}
          onInput$={$((e) =>
            onUpdate$({ PeerAllowedIPs: (e.target as HTMLInputElement).value }),
          )}
          class={`w-full rounded-md border px-3 py-2 
                  ${
                    errors.PeerAllowedIPs
                      ? "border-red-500 focus:ring-red-500"
                      : "border-border focus:ring-primary-500 dark:border-border-dark"
                  }
                  text-text-default bg-background
                  dark:bg-background-dark dark:text-text-dark-default`}
          placeholder="0.0.0.0/0"
        />
        {errors.PeerAllowedIPs && (
          <p class="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.PeerAllowedIPs}
          </p>
        )}
      </div>

      {/* Advanced Settings */}
      {mode === "advanced" && (
        <>
          <div>
            <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
              {$localize`Interface DNS`}
            </label>
            <input
              type="text"
              value={config.InterfaceDNS || ""}
              onInput$={$((e) =>
                onUpdate$({
                  InterfaceDNS: (e.target as HTMLInputElement).value,
                }),
              )}
              class="text-text-default w-full rounded-md border border-border 
                     bg-background px-3 py-2
                     focus:ring-primary-500 dark:border-border-dark
                     dark:bg-background-dark dark:text-text-dark-default"
              placeholder="8.8.8.8"
            />
          </div>

          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
                {$localize`Interface MTU`}
              </label>
              <input
                type="number"
                value={config.InterfaceMTU || ""}
                onInput$={$((e) =>
                  onUpdate$({
                    InterfaceMTU: parseInt(
                      (e.target as HTMLInputElement).value,
                    ),
                  }),
                )}
                class="text-text-default w-full rounded-md border border-border 
                       bg-background px-3 py-2
                       focus:ring-primary-500 dark:border-border-dark
                       dark:bg-background-dark dark:text-text-dark-default"
                placeholder="1420"
              />
            </div>

            <div>
              <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
                {$localize`Persistent Keepalive`}
              </label>
              <input
                type="number"
                value={config.PeerPersistentKeepalive || ""}
                onInput$={$((e) =>
                  onUpdate$({
                    PeerPersistentKeepalive: parseInt(
                      (e.target as HTMLInputElement).value,
                    ),
                  }),
                )}
                class="text-text-default w-full rounded-md border border-border 
                       bg-background px-3 py-2
                       focus:ring-primary-500 dark:border-border-dark
                       dark:bg-background-dark dark:text-text-dark-default"
                placeholder="25"
              />
            </div>
          </div>

          <div>
            <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
              {$localize`Preshared Key`}
            </label>
            <input
              type="text"
              value={config.PeerPresharedKey || ""}
              onInput$={$((e) =>
                onUpdate$({
                  PeerPresharedKey: (e.target as HTMLInputElement).value,
                }),
              )}
              class="text-text-default w-full rounded-md border border-border 
                     bg-background px-3 py-2
                     focus:ring-primary-500 dark:border-border-dark
                     dark:bg-background-dark dark:text-text-dark-default"
              placeholder="Optional preshared key"
            />
          </div>
        </>
      )}
    </div>
  );
});
