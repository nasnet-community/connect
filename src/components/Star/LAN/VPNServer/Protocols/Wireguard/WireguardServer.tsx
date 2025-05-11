import { component$, useSignal, $ } from "@builder.io/qwik";
import { 
  HiServerOutline, 
  HiPlusCircleOutline, 
  HiUserGroupOutline, 
  HiTrashOutline, 
  HiDocumentDuplicateOutline 
} from "@qwikest/icons/heroicons";
import { ServerCard } from "~/components/Core/Card";
import { 
  ServerFormField, 
  ServerButton,
  TabNavigation,
  SectionTitle
} from "~/components/Core/Form/ServerField";
import { Input } from "~/components/Core/Input";
import { useWireguardServer } from "./useWireguardServer";

// Create a serialized version of the server icon
const ServerIcon = $(HiServerOutline);

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

  const isEnabled = useSignal(wireguardServers.length > 0);

  const handleToggle = $((enabled: boolean) => {
    try {
      isEnabled.value = enabled;
      
      if (isEnabled.value && wireguardServers.length === 0) {
        // Create a default server if enabling and no servers exist
        generateWireguardServer$();
      }
    } catch (error) {
      console.error("Error toggling Wireguard server:", error);
      isEnabled.value = !enabled; // Revert the change if there's an error
    }
  });

  const handleAddServer = $(() => {
    try {
      generateWireguardServer$();
    } catch (error) {
      console.error("Error adding Wireguard server:", error);
    }
  });

  const handleDeleteServer = $(() => {
    try {
      if (wireguardServers.length > 0) {
        deleteServer$();
      }
    } catch (error) {
      console.error("Error deleting Wireguard server:", error);
    }
  });

  const handleServerTabClick = $((index: number) => {
    try {
      selectServer$(index);
    } catch (error) {
      console.error("Error selecting Wireguard server tab:", error);
    }
  });

  const copyToClipboard = $((text: string) => {
    navigator.clipboard.writeText(text);
  });

  const activeTab = useSignal<'interface' | 'peers'>('interface');
  
  // Generate tabs for TabNavigation component
  const tabOptions = [
    { id: 'interface', label: $localize`Interface Settings` },
    { id: 'peers', label: $localize`Peers` }
  ];

  return (
    <ServerCard
      title={$localize`WireGuard Server`}
      icon={ServerIcon}
      enabled={isEnabled.value}
      onToggle$={handleToggle}
    >
      {/* Server instances */}
      <div class="mb-6">
        <div class="flex justify-between">
          <SectionTitle title={$localize`Server Instances`} />
          
          <ServerButton
            onClick$={handleAddServer}
            disabled={isGeneratingKeys.value}
            class="inline-flex items-center gap-2 px-3 py-1 text-sm"
          >
            <HiPlusCircleOutline class="h-4 w-4" />
            <span>{isGeneratingKeys.value ? $localize`Generating...` : $localize`New Server`}</span>
          </ServerButton>
        </div>
        
        {/* Tab selector for server instances */}
        {wireguardServers.length > 0 ? (
          <div class="mb-4 flex flex-wrap gap-2">
            {wireguardServers.map((server, index) => (
              <button
                key={index}
                onClick$={() => handleServerTabClick(index)}
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
          <TabNavigation
            tabs={tabOptions}
            activeTab={activeTab.value}
            onSelect$={(tabId) => (activeTab.value = tabId as 'interface' | 'peers')}
          />

          {/* Interface Settings Tab */}
          {activeTab.value === 'interface' && (
            <div class="space-y-6">
              <div>
                <SectionTitle title={$localize`Interface Configuration`} />
                <div class="grid gap-4 md:grid-cols-2">
                  {/* Interface Name */}
                  <ServerFormField label={$localize`Interface Name`}>
                    <Input
                      type="text"
                      value={wireguardServers[currentServerIndex.value].Interface.Name}
                      onChange$={(_, value) => updateInterface$('Name', value)}
                      placeholder={$localize`e.g. wg0`}
                    />
                  </ServerFormField>

                  {/* Listen Port */}
                  <ServerFormField label={$localize`Listen Port`}>
                    <Input
                      type="number"
                      value={(wireguardServers[currentServerIndex.value].Interface.ListenPort || 51820).toString()}
                      onChange$={(_, value) => updateInterface$('ListenPort', parseInt(value, 10))}
                      placeholder={$localize`e.g. 51820`}
                    />
                  </ServerFormField>

                  {/* Interface Address */}
                  <ServerFormField 
                    label={$localize`Interface Address`}
                    errorMessage={interfaceAddressError.value}
                  >
                    <Input
                      type="text"
                      value={wireguardServers[currentServerIndex.value].Interface.InterfaceAddress}
                      onChange$={(_, value) => updateInterface$('InterfaceAddress', value)}
                      placeholder={$localize`e.g. 10.0.0.1/24`}
                      validation={interfaceAddressError.value ? "invalid" : "default"}
                    />
                  </ServerFormField>

                  {/* MTU */}
                  <ServerFormField label={$localize`MTU`}>
                    <Input
                      type="number"
                      value={(wireguardServers[currentServerIndex.value].Interface.Mtu || 1420).toString()}
                      onChange$={(_, value) => updateInterface$('Mtu', parseInt(value, 10))}
                      placeholder={$localize`e.g. 1420`}
                    />
                  </ServerFormField>

                  {/* Private Key */}
                  <ServerFormField 
                    label={$localize`Private Key`}
                    errorMessage={privateKeyError.value}
                    class="md:col-span-2"
                  >
                    <div class="flex items-center gap-2">
                      <Input
                        type="text"
                        value={wireguardServers[currentServerIndex.value].Interface.PrivateKey}
                        onChange$={(_, value) => updateInterface$('PrivateKey', value)}
                        placeholder={$localize`Enter private key`}
                        validation={privateKeyError.value ? "invalid" : "default"}
                      />
                      <ServerButton
                        onClick$={() => copyToClipboard(wireguardServers[currentServerIndex.value].Interface.PrivateKey)}
                        primary={false}
                        class="flex items-center gap-1 px-3 py-2 text-sm"
                      >
                        <HiDocumentDuplicateOutline class="h-5 w-5" />
                        {$localize`Copy`}
                      </ServerButton>
                    </div>
                  </ServerFormField>

                  {/* Public Key (display only) */}
                  {wireguardServers[currentServerIndex.value].Interface.PublicKey && (
                    <ServerFormField label={$localize`Public Key`} class="md:col-span-2">
                      <div class="flex items-center gap-2">
                        <Input
                          type="text"
                          value={wireguardServers[currentServerIndex.value].Interface.PublicKey || ""}
                          readonly
                          class="bg-gray-50 dark:bg-gray-600"
                        />
                        <ServerButton
                          onClick$={() => copyToClipboard(wireguardServers[currentServerIndex.value].Interface.PublicKey || "")}
                          primary={false}
                          class="flex items-center gap-1 px-3 py-2 text-sm"
                        >
                          <HiDocumentDuplicateOutline class="h-5 w-5" />
                          {$localize`Copy`}
                        </ServerButton>
                      </div>
                    </ServerFormField>
                  )}
                </div>
              </div>

              {/* Delete Server Button */}
              <div class="flex justify-end">
                <ServerButton
                  onClick$={handleDeleteServer}
                  danger={true}
                  primary={false}
                  class="inline-flex items-center gap-2"
                >
                  <HiTrashOutline class="h-5 w-5" />
                  <span>{$localize`Delete Server`}</span>
                </ServerButton>
              </div>
            </div>
          )}

          {/* Peers Tab */}
          {activeTab.value === 'peers' && (
            <div class="space-y-6">
              <div class="flex items-center justify-between">
                <SectionTitle title={$localize`WireGuard Peers`} />
                <ServerButton
                  onClick$={() => addPeer$()}
                  class="inline-flex items-center gap-2 px-3 py-1 text-sm"
                >
                  <HiPlusCircleOutline class="h-4 w-4" />
                  <span>{$localize`Add Peer`}</span>
                </ServerButton>
              </div>

              {wireguardServers[currentServerIndex.value].Peers.length === 0 ? (
                <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center dark:border-gray-700 dark:bg-gray-800">
                  <HiUserGroupOutline class="mx-auto h-8 w-8 text-gray-400" />
                  <p class="mt-2 text-gray-600 dark:text-gray-400">
                    {$localize`No peers configured yet`}
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-500">
                    {$localize`Click "Add Peer" to create a new connection`}
                  </p>
                </div>
              ) : (
                <div class="space-y-4">
                  {wireguardServers[currentServerIndex.value].Peers.map((peer, peerIndex) => (
                    <div 
                      key={peerIndex}
                      class="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                    >
                      <div class="mb-3 flex items-center justify-between">
                        <h4 class="font-medium">
                          {$localize`Peer ${peerIndex + 1}`}
                          {peer.Comment && ` - ${peer.Comment}`}
                        </h4>
                        <ServerButton
                          onClick$={() => removePeer$(peerIndex)}
                          danger={true}
                          primary={false}
                          class="p-1"
                        >
                          <HiTrashOutline class="h-4 w-4" />
                        </ServerButton>
                      </div>
                      
                      <div class="grid gap-4 md:grid-cols-2">
                        {/* Comment (Optional) */}
                        <ServerFormField label={$localize`Name (Optional)`}>
                          <Input
                            type="text"
                            value={peer.Comment || ""}
                            onChange$={(_, value) => updatePeer$(peerIndex, 'Comment', value)}
                            placeholder={$localize`e.g. Phone`}
                          />
                        </ServerFormField>
                        
                        {/* Peer Public Key */}
                        <ServerFormField 
                          label={$localize`Public Key`}
                          errorMessage={peerPublicKeyError.value}
                        >
                          <Input
                            type="text"
                            value={peer.PublicKey || ""}
                            onChange$={(_, value) => updatePeer$(peerIndex, 'PublicKey', value)}
                            placeholder={$localize`Peer's public key`}
                            validation={peerPublicKeyError.value ? "invalid" : "default"}
                          />
                        </ServerFormField>
                        
                        {/* Peer Allowed IPs */}
                        <ServerFormField 
                          label={$localize`Allowed IPs`}
                          errorMessage={peerAddressError.value}
                        >
                          <Input
                            type="text"
                            value={peer.AllowedAddress || ""}
                            onChange$={(_, value) => updatePeer$(peerIndex, 'AllowedAddress', value)}
                            placeholder={$localize`e.g. 10.0.0.2/32`}
                            validation={peerAddressError.value ? "invalid" : "default"}
                          />
                        </ServerFormField>
                        
                        {/* Keep Alive */}
                        <ServerFormField label={$localize`Keep Alive (seconds)`}>
                          <Input
                            type="number"
                            value={(peer.PersistentKeepalive || 25).toString()}
                            onChange$={(_, value) => updatePeer$(peerIndex, 'PersistentKeepalive', parseInt(value, 10))}
                            placeholder={$localize`e.g. 25`}
                          />
                        </ServerFormField>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </ServerCard>
  );
}); 