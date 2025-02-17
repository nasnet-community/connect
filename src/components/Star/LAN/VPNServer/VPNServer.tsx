import {
  component$,
  useSignal,
  useStore,
  $,
  useContext,
  useComputed$,
} from "@builder.io/qwik";
import {
  HiServerOutline,
  HiPlusCircleOutline,
  HiUserGroupOutline,
  HiShieldCheckOutline,
  HiTrashOutline,
  HiCheckCircleOutline,
  HiXCircleOutline,
} from "@qwikest/icons/heroicons";
import type { StepProps } from "~/types/step";
import { StarContext } from "../../StarContext";

interface VPNUser {
  Username: string;
  Password: string;
}

export const VPNServer = component$<StepProps>((props) => {
  const starContext = useContext(StarContext);
  const users = useStore<VPNUser[]>([{ Username: "", Password: "" }]);
  const wireguardEnabled = useSignal(false);
  const openVPNEnabled = useSignal(false);
  const vpnServerEnabled = useSignal(false);
  const passphraseValue = useSignal("");
  const passphraseError = useSignal("");

  const addUser = $(() => {
    users.push({ Username: "", Password: "" });
  });

  const removeUser = $((index: number) => {
    if (users.length > 1) {
      users.splice(index, 1);
    }
  });

  const isValid = useComputed$(() => {
    if (!vpnServerEnabled.value) return true;

    const hasVPN = wireguardEnabled.value || openVPNEnabled.value;
    const hasValidUser = users.some(
      (user) => user.Username.trim() !== "" && user.Password.trim() !== "",
    );

    if (openVPNEnabled.value) {
      if (passphraseValue.value.length < 10) {
        passphraseError.value =
          "Passphrase must be at least 10 characters long";
        return false;
      } else {
        passphraseError.value = "";
      }
    }

    return hasVPN && hasValidUser;
  });

  const handleSubmit = $(() => {
    if (vpnServerEnabled.value) {
      starContext.updateLAN$({
        VPNServer: {
          Wireguard: wireguardEnabled.value,
          OpenVPN: openVPNEnabled.value,
          PPTP: false,
          L2TP: false,
          SSTP: false,
          IKeV2: false,
          Users: users.filter(
            (user) =>
              user.Username.trim() !== "" && user.Password.trim() !== "",
          ),
          OpenVPNConfig: {
            Passphrase: openVPNEnabled.value ? passphraseValue.value : "",
          },
        },
      });
    } else {
      starContext.updateLAN$({
        VPNServer: {
          Wireguard: false,
          OpenVPN: false,
          PPTP: false,
          L2TP: false,
          SSTP: false,
          IKeV2: false,
          Users: [],
          OpenVPNConfig: {
            Passphrase: "",
          },
        },
      });
    }
    props.onComplete$();
  });

  return (
    <div class="mx-auto w-full max-w-4xl p-4">
      <div class="space-y-8">
        {/* Header */}
        <div class="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div class="flex items-center gap-4">
            <div class="rounded-xl bg-primary-100 p-3 dark:bg-primary-900/30">
              <HiServerOutline class="h-8 w-8 text-primary-500 dark:text-primary-400" />
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                {$localize`VPN Server Configuration`}
              </h2>
              <p class="text-gray-600 dark:text-gray-400">
                {$localize`Set up your VPN server settings and user access`}
              </p>
            </div>
          </div>

          {/* Enable/Disable Toggle */}
          <div class="flex gap-4 rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
            <label
              class={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2
              ${
                !vpnServerEnabled.value
                  ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <input
                type="radio"
                name="vpnserver"
                checked={!vpnServerEnabled.value}
                onChange$={() => (vpnServerEnabled.value = false)}
                class="hidden"
              />
              <HiXCircleOutline class="h-5 w-5" />
              <span>{$localize`Disable`}</span>
            </label>
            <label
              class={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2
              ${
                vpnServerEnabled.value
                  ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <input
                type="radio"
                name="vpnserver"
                checked={vpnServerEnabled.value}
                onChange$={() => (vpnServerEnabled.value = true)}
                class="hidden"
              />
              <HiCheckCircleOutline class="h-5 w-5" />
              <span>{$localize`Enable`}</span>
            </label>
          </div>
        </div>

        {vpnServerEnabled.value && (
          <>
            {/* VPN Users */}
            <div class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div class="p-6">
                <div class="mb-6 flex items-center gap-3">
                  <HiUserGroupOutline class="h-6 w-6 text-primary-500 dark:text-primary-400" />
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{$localize`VPN Users`}</h3>
                </div>

                <div class="space-y-6">
                  {users.map((user, index) => (
                    <div
                      key={index}
                      class="group relative grid gap-4 sm:grid-cols-2"
                    >
                      <div>
                        <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          {$localize`Username`}
                        </label>
                        <input
                          type="text"
                          value={user.Username}
                          onChange$={(e) =>
                            (user.Username = (
                              e.target as HTMLInputElement
                            ).value)
                          }
                          class="focus:ring-primary-500 w-full rounded-lg border border-gray-300 bg-white px-4 
                                py-2 text-gray-900 focus:border-transparent focus:ring-2
                                dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                          placeholder={$localize`Enter Username`}
                        />
                      </div>
                      <div class="relative">
                        <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          {$localize`Password`}
                        </label>
                        <div class="flex gap-2">
                          <input
                            type="Password"
                            value={user.Password}
                            onChange$={(e) =>
                              (user.Password = (
                                e.target as HTMLInputElement
                              ).value)
                            }
                            class="focus:ring-primary-500 w-full rounded-lg border border-gray-300 bg-white px-4 
                                  py-2 text-gray-900 focus:border-transparent focus:ring-2
                                  dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            placeholder={$localize`Enter Password`}
                          />
                          {index > 0 && (
                            <button
                              onClick$={() => removeUser(index)}
                              class="rounded-lg p-2 text-red-500 transition-colors 
                                    hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                              title={$localize`Remove User`}
                            >
                              <HiTrashOutline class="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick$={addUser}
                  class="mt-4 inline-flex items-center gap-2 text-primary-500 transition-colors 
                        hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  <HiPlusCircleOutline class="h-5 w-5" />
                  <span>{$localize`Add User`}</span>
                </button>
              </div>
            </div>

            {/* VPN Protocols */}
            <div class="grid gap-6 md:grid-cols-2">
              {/* WireGuard */}
              <div class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div class="p-6">
                  <div class="mb-6 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <HiShieldCheckOutline class="h-6 w-6 text-primary-500 dark:text-primary-400" />
                      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{$localize`WireGuard`}</h3>
                    </div>
                    <label class="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={wireguardEnabled.value}
                        onChange$={() =>
                          (wireguardEnabled.value = !wireguardEnabled.value)
                        }
                        class="peer sr-only"
                      />
                      <div
                        class="peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 peer h-6 w-11 
                                rounded-full bg-gray-200 after:absolute 
                                after:left-[2px] after:top-[2px] after:h-5 
                                after:w-5 after:rounded-full after:border 
                                after:border-gray-300 after:bg-white after:transition-all after:content-[''] 
                                peer-checked:bg-primary-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 
                                dark:border-gray-600 dark:bg-gray-700"
                      ></div>
                      <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {wireguardEnabled.value
                          ? $localize`Enabled`
                          : $localize`Disabled`}
                      </span>
                    </label>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {$localize`Modern, efficient, and secure VPN protocol with excellent performance`}
                  </p>
                </div>
              </div>

              {/* OpenVPN */}
              <div class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div class="p-6">
                  <div class="mb-6 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <HiShieldCheckOutline class="h-6 w-6 text-primary-500 dark:text-primary-400" />
                      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{$localize`OpenVPN`}</h3>
                    </div>
                    <label class="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={openVPNEnabled.value}
                        onChange$={() =>
                          (openVPNEnabled.value = !openVPNEnabled.value)
                        }
                        class="peer sr-only"
                      />
                      <div
                        class="peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 peer h-6 w-11 
                                rounded-full bg-gray-200 after:absolute 
                                after:left-[2px] after:top-[2px] after:h-5 
                                after:w-5 after:rounded-full after:border 
                                after:border-gray-300 after:bg-white after:transition-all after:content-[''] 
                                peer-checked:bg-primary-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 
                                dark:border-gray-600 dark:bg-gray-700"
                      ></div>
                      <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {openVPNEnabled.value
                          ? $localize`Enabled`
                          : $localize`Disabled`}
                      </span>
                    </label>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {$localize`Versatile and widely-supported VPN protocol with robust security features`}
                  </p>
                </div>
              </div>
            </div>
            {/* Certificate Passphrase - New Section */}
            {openVPNEnabled.value && (
              <div class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div class="p-6">
                  <div class="mb-6 flex items-center gap-3">
                    <HiShieldCheckOutline class="h-6 w-6 text-primary-500 dark:text-primary-400" />
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{$localize`OpenVPN Certificate`}</h3>
                  </div>
                  <div>
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {$localize`Certificate Passphrase`}
                    </label>
                    <input
                      type="text"
                      value={passphraseValue.value}
                      onChange$={(e) => {
                        passphraseValue.value = (
                          e.target as HTMLInputElement
                        ).value;
                        if (passphraseValue.value.length < 10) {
                          passphraseError.value = $localize`Passphrase must be at least 10 characters long`;
                        } else {
                          passphraseError.value = "";
                        }
                      }}
                      class={`w-full rounded-lg border px-4 py-2 
            ${
              passphraseError.value
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-primary-500 border-gray-300 dark:border-gray-600"
            } 
            bg-white text-gray-900 focus:border-transparent focus:ring-2
            dark:bg-gray-700 dark:text-white`}
                      placeholder={$localize`Enter Certificate Passphrase`}
                    />
                    {passphraseError.value && (
                      <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                        {passphraseError.value}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Continue Button */}
        <div class="mt-8 flex justify-end">
          <button
            onClick$={handleSubmit}
            disabled={!isValid.value}
            class={`rounded-lg px-6 py-2 transition-colors duration-200
            ${
              isValid.value
                ? "cursor-pointer bg-primary-500 text-white hover:bg-primary-600"
                : "cursor-not-allowed bg-gray-300 text-gray-500"
            }`}
          >
            {$localize`Save`}
          </button>
        </div>
      </div>
    </div>
  );
});
