import { component$, useSignal, $ } from "@builder.io/qwik";
import { HiServerOutline, HiPlusCircleOutline, HiUserGroupOutline, HiTrashOutline, HiDocumentDuplicateOutline } from "@qwikest/icons/heroicons";
import { useWireguardServer } from "./useWireguardServer";

export const WireguardServer = component$(() => {
  const {
    wireguardServers,
    currentServerIndex,
    isGeneratingKeys,
    privateKeyError,
    interfaceAddressError,
    peerPublicKeyError,
    peerAddressError,
    generateWireguardServer$,
    addPeer$,
    removePeer$,
    updateInterface$,
    updatePeer$,
    deleteServer$,
    selectServer$
  } = useWireguardServer();
  
  const activeTab = useSignal<'interface' | 'peers'>('interface');
  
  const copyToClipboard = $((text: string) => {
    navigator.clipboard.writeText(text);
  });

  return (
    <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div class="mb-6 flex items-center gap-3">
        <HiServerOutline class="h-6 w-6 text-primary-500 dark:text-primary-400" />
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{$localize`WireGuard Server`}</h3>
      </div>

      {/* Server instances */}
      <div class="mb-6">
        <div class="flex justify-between">
          <h4 class="mb-3 text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">
            {$localize`Server Instances`}
          </h4>
          <button
            onClick$={generateWireguardServer$}
            disabled={isGeneratingKeys.value}
            class="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-3 py-1 text-sm text-white transition-colors hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-500/25 disabled:opacity-50 dark:bg-primary-600 dark:hover:bg-primary-700"
          >
            <HiPlusCircleOutline class="h-4 w-4" />
            <span>{isGeneratingKeys.value ? $localize`Generating...` : $localize`New Server`}</span>
          </button>
        </div>
        
        {/* Tab selector for server instances */}
        {wireguardServers.length > 0 ? (
          <div class="mb-4 flex flex-wrap gap-2">
            {wireguardServers.map((server, index) => (
              <button
                key={index}
                onClick$={() => selectServer$(index)}
                class={`rounded-lg border px-3 py-1 text-sm transition-colors ${
                  currentServerIndex.value === index
                    ? "border-primary-500 bg-primary-50 text-primary-700 dark:border-primary-400 dark:bg-primary-900/30 dark:text-primary-400"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {server.Interface.Name}
              </button>
            ))}
          </div>
        ) : (
          <p class="mb-4 text-sm text-gray-500 dark:text-gray-400">
            {$localize`No WireGuard servers configured. Click "New Server" to create one.`}
          </p>
        )}
      </div>

      {wireguardServers.length > 0 && (
        <>
          {/* Tab navigation */}
          <div class="mb-6 border-b border-gray-200 dark:border-gray-700">
            <ul class="-mb-px flex flex-wrap">
              <li class="mr-2">
                <button
                  onClick$={() => (activeTab.value = 'interface')}
                  class={`inline-block rounded-t-lg border-b-2 p-4 ${
                    activeTab.value === 'interface'
                      ? "border-primary-500 text-primary-600 dark:border-primary-500 dark:text-primary-500"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300"
                  }`}
                >
                  {$localize`Interface Settings`}
                </button>
              </li>
              <li class="mr-2">
                <button
                  onClick$={() => (activeTab.value = 'peers')}
                  class={`inline-block rounded-t-lg border-b-2 p-4 ${
                    activeTab.value === 'peers'
                      ? "border-primary-500 text-primary-600 dark:border-primary-500 dark:text-primary-500"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300"
                  }`}
                >
                  {$localize`Peers`}
                </button>
              </li>
            </ul>
          </div>

          {/* Interface Settings Tab */}
          {activeTab.value === 'interface' && (
            <div class="space-y-6">
              <div>
                <h4 class="mb-3 text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">
                  {$localize`Interface Configuration`}
                </h4>
                <div class="grid gap-4 md:grid-cols-2">
                  {/* Interface Name */}
                  <div>
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {$localize`Interface Name`}
                    </label>
                    <input
                      type="text"
                      value={wireguardServers[currentServerIndex.value].Interface.Name}
                      onChange$={(e) => updateInterface$('Name', (e.target as HTMLInputElement).value)}
                      class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder={$localize`e.g. wg0`}
                    />
                  </div>

                  {/* Listen Port */}
                  <div>
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {$localize`Listen Port`}
                    </label>
                    <input
                      type="number"
                      value={wireguardServers[currentServerIndex.value].Interface.ListenPort || 51820}
                      onChange$={(e) => updateInterface$('ListenPort', parseInt((e.target as HTMLInputElement).value, 10))}
                      class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder={$localize`e.g. 51820`}
                      min="1024"
                      max="65535"
                    />
                  </div>

                  {/* Interface Address */}
                  <div>
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {$localize`Interface Address`}
                    </label>
                    <input
                      type="text"
                      value={wireguardServers[currentServerIndex.value].Interface.InterfaceAddress}
                      onChange$={(e) => updateInterface$('InterfaceAddress', (e.target as HTMLInputElement).value)}
                      class={`w-full rounded-lg border ${
                        interfaceAddressError.value
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600"
                      } px-4 py-2 dark:bg-gray-700 dark:text-white`}
                      placeholder={$localize`e.g. 10.0.0.1/24`}
                    />
                    {interfaceAddressError.value && (
                      <p class="mt-1 text-sm text-red-600 dark:text-red-500">
                        {interfaceAddressError.value}
                      </p>
                    )}
                  </div>

                  {/* MTU */}
                  <div>
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {$localize`MTU`}
                    </label>
                    <input
                      type="number"
                      value={wireguardServers[currentServerIndex.value].Interface.Mtu || 1420}
                      onChange$={(e) => updateInterface$('Mtu', parseInt((e.target as HTMLInputElement).value, 10))}
                      class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder={$localize`e.g. 1420`}
                      min="576"
                      max="9000"
                    />
                  </div>

                  {/* Private Key */}
                  <div class="md:col-span-2">
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {$localize`Private Key`}
                    </label>
                    <div class="flex items-center gap-2">
                      <input
                        type="text"
                        value={wireguardServers[currentServerIndex.value].Interface.PrivateKey}
                        onChange$={(e) => updateInterface$('PrivateKey', (e.target as HTMLInputElement).value)}
                        class={`w-full rounded-lg border ${
                          privateKeyError.value
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600"
                        } px-4 py-2 dark:bg-gray-700 dark:text-white`}
                        placeholder={$localize`Enter private key`}
                      />
                      <button
                        type="button"
                        onClick$={() => copyToClipboard(wireguardServers[currentServerIndex.value].Interface.PrivateKey)}
                        class="flex items-center gap-1 rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      >
                        <HiDocumentDuplicateOutline class="h-5 w-5" />
                        {$localize`Copy`}
                      </button>
                    </div>
                    {privateKeyError.value && (
                      <p class="mt-1 text-sm text-red-600 dark:text-red-500">
                        {privateKeyError.value}
                      </p>
                    )}
                  </div>

                  {/* Public Key (display only) */}
                  {wireguardServers[currentServerIndex.value].Interface.PublicKey && (
                    <div class="md:col-span-2">
                      <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {$localize`Public Key`}
                      </label>
                      <div class="flex items-center gap-2">
                        <input
                          type="text"
                          value={wireguardServers[currentServerIndex.value].Interface.PublicKey}
                          class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-300"
                          disabled
                        />
                        <button
                          type="button"
                          onClick$={() => copyToClipboard(wireguardServers[currentServerIndex.value].Interface.PublicKey || "")}
                          class="flex items-center gap-1 rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        >
                          <HiDocumentDuplicateOutline class="h-5 w-5" />
                          {$localize`Copy`}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Delete Server Button */}
              <div class="flex justify-end">
                <button
                  onClick$={deleteServer$}
                  class="inline-flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 focus:outline-none focus:ring-4 focus:ring-red-500/25 dark:border-red-800 dark:bg-red-900/30 dark:text-red-500 dark:hover:bg-red-900/50"
                >
                  <HiTrashOutline class="h-5 w-5" />
                  <span>{$localize`Delete Server`}</span>
                </button>
              </div>
            </div>
          )}

          {/* Peers Tab */}
          {activeTab.value === 'peers' && (
            <div class="space-y-6">
              <div class="flex items-center justify-between">
                <h4 class="mb-3 text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">
                  {$localize`WireGuard Peers`}
                </h4>
                <button
                  onClick$={addPeer$}
                  class="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-3 py-1 text-sm text-white transition-colors hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-500/25 dark:bg-primary-600 dark:hover:bg-primary-700"
                >
                  <HiPlusCircleOutline class="h-4 w-4" />
                  <span>{$localize`Add Peer`}</span>
                </button>
              </div>

              {wireguardServers[currentServerIndex.value].Peers.length === 0 ? (
                <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center dark:border-gray-700 dark:bg-gray-800">
                  <HiUserGroupOutline class="mx-auto mb-2 h-10 w-10 text-gray-400 dark:text-gray-500" />
                  <p class="text-gray-600 dark:text-gray-400">
                    {$localize`No peers configured. Click "Add Peer" to create one.`}
                  </p>
                </div>
              ) : (
                <div class="space-y-6">
                  {wireguardServers[currentServerIndex.value].Peers.map((peer, peerIndex) => (
                    <div key={peerIndex} class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                      <div class="mb-4 flex items-center justify-between">
                        <h5 class="font-medium text-gray-900 dark:text-white">
                          {$localize`Peer`} {peerIndex + 1} {peer.Comment && `- ${peer.Comment}`}
                        </h5>
                        <button
                          onClick$={() => removePeer$(peerIndex)}
                          class="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <HiTrashOutline class="h-5 w-5" />
                        </button>
                      </div>

                      <div class="grid gap-4 md:grid-cols-2">
                        {/* Public Key */}
                        <div class="md:col-span-2">
                          <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {$localize`Public Key`}
                          </label>
                          <input
                            type="text"
                            value={peer.PublicKey}
                            onChange$={(e) => updatePeer$(peerIndex, 'PublicKey', (e.target as HTMLInputElement).value)}
                            class={`w-full rounded-lg border ${
                              peerPublicKeyError.value
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600"
                            } px-4 py-2 dark:bg-gray-700 dark:text-white`}
                            placeholder={$localize`Enter peer's public key`}
                          />
                          {peerPublicKeyError.value && (
                            <p class="mt-1 text-sm text-red-600 dark:text-red-500">
                              {peerPublicKeyError.value}
                            </p>
                          )}
                        </div>

                        {/* Allowed Address */}
                        <div class="md:col-span-2">
                          <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {$localize`Allowed Address`}
                          </label>
                          <input
                            type="text"
                            value={peer.AllowedAddress}
                            onChange$={(e) => updatePeer$(peerIndex, 'AllowedAddress', (e.target as HTMLInputElement).value)}
                            class={`w-full rounded-lg border ${
                              peerAddressError.value
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600"
                            } px-4 py-2 dark:bg-gray-700 dark:text-white`}
                            placeholder={$localize`e.g. 10.0.0.2/32, 192.168.1.0/24`}
                          />
                          {peerAddressError.value && (
                            <p class="mt-1 text-sm text-red-600 dark:text-red-500">
                              {peerAddressError.value}
                            </p>
                          )}
                        </div>

                        {/* Pre-shared Key (Optional) */}
                        <div>
                          <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {$localize`Pre-shared Key`} <span class="text-gray-500">({$localize`Optional`})</span>
                          </label>
                          <input
                            type="text"
                            value={peer.PresharedKey || ""}
                            onChange$={(e) => updatePeer$(peerIndex, 'PresharedKey', (e.target as HTMLInputElement).value)}
                            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            placeholder={$localize`Enter pre-shared key`}
                          />
                        </div>

                        {/* Persistent Keepalive */}
                        <div>
                          <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {$localize`Persistent Keepalive`} <span class="text-gray-500">({$localize`seconds`})</span>
                          </label>
                          <input
                            type="number"
                            value={peer.PersistentKeepalive || 25}
                            onChange$={(e) => updatePeer$(peerIndex, 'PersistentKeepalive', parseInt((e.target as HTMLInputElement).value, 10))}
                            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            placeholder={$localize`e.g. 25`}
                            min="0"
                            max="3600"
                          />
                        </div>

                        {/* Endpoint Address (Optional for clients) */}
                        <div>
                          <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {$localize`Endpoint Address`} <span class="text-gray-500">({$localize`Optional`})</span>
                          </label>
                          <input
                            type="text"
                            value={peer.EndpointAddress || ""}
                            onChange$={(e) => updatePeer$(peerIndex, 'EndpointAddress', (e.target as HTMLInputElement).value)}
                            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            placeholder={$localize`e.g. example.com or IP address`}
                          />
                        </div>

                        {/* Endpoint Port */}
                        <div>
                          <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {$localize`Endpoint Port`} <span class="text-gray-500">({$localize`Optional`})</span>
                          </label>
                          <input
                            type="number"
                            value={peer.EndpointPort || ""}
                            onChange$={(e) => {
                              const value = (e.target as HTMLInputElement).value;
                              updatePeer$(peerIndex, 'EndpointPort', value ? parseInt(value, 10) : undefined);
                            }}
                            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            placeholder={$localize`e.g. 51820`}
                            min="1"
                            max="65535"
                          />
                        </div>

                        {/* Comment */}
                        <div class="md:col-span-2">
                          <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {$localize`Comment`} <span class="text-gray-500">({$localize`Optional`})</span>
                          </label>
                          <input
                            type="text"
                            value={peer.Comment || ""}
                            onChange$={(e) => updatePeer$(peerIndex, 'Comment', (e.target as HTMLInputElement).value)}
                            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            placeholder={$localize`e.g. Bob's phone`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}); 