import { component$ } from "@builder.io/qwik";
import {
  HiServerOutline,
  HiLockClosedOutline,
  HiPlusCircleOutline,
  HiTrashOutline,
} from "@qwikest/icons/heroicons";
import {
  ServerCard,
  ServerFormField,
  ServerButton,
  SectionTitle,
  Input,
} from "../../../VPNServer/UI";
import { useWireguardServer } from "./useWireguardServer";

export const WireguardServerAdvanced = component$(() => {
  const {
    wireguardState,
    advancedFormState,
    showPrivateKey,
    privateKeyError,
    addressError,
    updateServerConfig,
    handleGeneratePrivateKey,
    togglePrivateKeyVisibility,
  } = useWireguardServer();

  return (
    <ServerCard
      title={$localize`WireGuard Server`}
      icon={<HiServerOutline class="h-5 w-5" />}
    >
      <div class="space-y-6 md:space-y-8">
        {/* Interface Configuration */}
        <div>
          <SectionTitle title={$localize`Interface Configuration`} />
          <div class="space-y-4">
            {/* Interface Name */}
            <ServerFormField label={$localize`Interface Name`}>
              <Input
                type="text"
                value={advancedFormState.name}
                onChange$={(_, value) => updateServerConfig({ name: value })}
                placeholder={$localize`e.g. wg-server`}
              />
            </ServerFormField>

            {/* Private Key */}
            <ServerFormField
              label={$localize`Private Key`}
              errorMessage={privateKeyError.value}
            >
              <div class="flex items-center gap-2">
                <div class="relative flex-1">
                  <Input
                    type={showPrivateKey.value ? "text" : "password"}
                    value={advancedFormState.privateKey}
                    onChange$={(_, value) =>
                      updateServerConfig({ privateKey: value })
                    }
                    placeholder={$localize`Enter or generate private key`}
                    validation={privateKeyError.value ? "invalid" : "default"}
                    hasSuffixSlot={true}
                  >
                    <button
                      q:slot="suffix"
                      type="button"
                      onClick$={togglePrivateKeyVisibility}
                      class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <HiLockClosedOutline class="h-5 w-5" />
                    </button>
                  </Input>
                </div>
                <ServerButton
                  onClick$={handleGeneratePrivateKey}
                  primary={false}
                  class="flex items-center gap-1"
                >
                  <HiPlusCircleOutline class="h-5 w-5" />
                  {$localize`Generate`}
                </ServerButton>
              </div>
            </ServerFormField>

            {/* Interface Address */}
            <ServerFormField
              label={$localize`Interface Address`}
              errorMessage={addressError.value}
            >
              <Input
                type="text"
                value={advancedFormState.interfaceAddress}
                onChange$={(_, value) =>
                  updateServerConfig({ interfaceAddress: value })
                }
                placeholder={$localize`e.g. 192.168.110.1/24`}
                validation={addressError.value ? "invalid" : "default"}
              />
              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {$localize`Server IP address with subnet mask`}
              </p>
            </ServerFormField>

            {/* Listen Port */}
            <ServerFormField label={$localize`Listen Port`}>
              <Input
                type="number"
                value={advancedFormState.listenPort.toString()}
                onChange$={(_, value) =>
                  updateServerConfig({
                    listenPort: parseInt(value, 10) || 51820,
                  })
                }
                placeholder="51820"
              />
              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {$localize`UDP port for WireGuard connections`}
              </p>
            </ServerFormField>

            {/* MTU */}
            <ServerFormField label={$localize`MTU`}>
              <Input
                type="number"
                value={advancedFormState.mtu.toString()}
                onChange$={(_, value) =>
                  updateServerConfig({ mtu: parseInt(value, 10) || 1420 })
                }
                placeholder="1420"
              />
              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {$localize`Maximum Transmission Unit size`}
              </p>
            </ServerFormField>
          </div>
        </div>

        {/* Peer Configuration */}
        <div>
          <div class="mb-4 flex items-center justify-between">
            <SectionTitle title={$localize`Peer Configuration`} />
            <ServerButton
              onClick$={() => {
                // For now, we'll show a message that peers should be configured via users section
                console.log("Peers should be configured in the Users step");
              }}
              primary={false}
              class="flex items-center gap-1"
            >
              <HiPlusCircleOutline class="h-5 w-5" />
              {$localize`Add Peer`}
            </ServerButton>
          </div>

          {wireguardState.Peers && wireguardState.Peers.length > 0 ? (
            <div class="space-y-3">
              {wireguardState.Peers.map((peer, index) => (
                <div
                  key={index}
                  class="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700"
                >
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900 dark:text-white">
                      {peer.Comment || $localize`Peer ${index + 1}`}
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      {peer.AllowedAddress || $localize`No address configured`}
                    </p>
                  </div>
                  <ServerButton
                    onClick$={() => {
                      // Remove peer functionality would go here
                      console.log("Remove peer", index);
                    }}
                    danger={true}
                    primary={false}
                    class="flex items-center gap-1"
                  >
                    <HiTrashOutline class="h-4 w-4" />
                  </ServerButton>
                </div>
              ))}
            </div>
          ) : (
            <div class="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center dark:border-gray-600">
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {$localize`No peers configured. Add users in the Users step to automatically create peers.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </ServerCard>
  );
});
