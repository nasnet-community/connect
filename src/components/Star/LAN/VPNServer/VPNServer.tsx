import { component$, $ } from "@builder.io/qwik";
import {
  HiUserGroupOutline,
  // HiShieldCheckOutline,
  HiPlusCircleOutline,
  HiChevronDownOutline,
  HiChevronUpOutline,
} from "@qwikest/icons/heroicons";
import type { StepProps } from "~/types/step";
import { UserCredential } from "./UserCredential";
import { PPTPServer } from "./Protocols/PPTP/PPTPServer";
import { L2TPServer } from "./Protocols/L2TP/L2TPServer";
import { SSTPServer } from "./Protocols/SSTP/SSTPServer";
import { IKEv2Server } from "./Protocols/IKeV2/IKEv2Server";
import { OpenVPNServer } from "./Protocols/OpenVPN/OpenVPNServer";
import { WireguardServer } from "./Protocols/Wireguard/WireguardServer";
import { useVPNServer } from "./useVPNServer";
import { VPNServerHeader } from "./VPNServerHeader";
import { ProtocolList } from "./Protocols/ProtocolList";
import { ActionFooter } from "./ActionFooter";
import type { VPNType } from "../../StarContext/CommonType";
import type { PropFunction } from "@builder.io/qwik";

export const VPNServer = component$<StepProps>(({ onComplete$ }) => {
  const {
    // State
    users,
    vpnServerEnabled,
    // passphraseValue,
    // passphraseError,
    enabledProtocols,
    expandedSections,
    isValid,
    
    // Actions
    toggleSection,
    addUser,
    removeUser,
    handleUsernameChange,
    handlePasswordChange,
    handleProtocolToggle,
    toggleProtocol,
    // handlePassphraseChange,
    saveSettings,
  } = useVPNServer();

  // Create QRL functions for child components
  const toggleSection$ = $((section: string) => toggleSection(section));
  const toggleProtocol$ = $((protocol: VPNType) => toggleProtocol(protocol));
  const saveSettings$ = $((onComplete?: PropFunction<() => void>) => saveSettings(onComplete));

  return (
    <div class="mx-auto w-full max-w-5xl p-4">
      <div class="space-y-8">
        {/* Header with Enable/Disable Toggle */}
        <VPNServerHeader vpnServerEnabled={vpnServerEnabled} />

        {vpnServerEnabled.value && (
          <>
            {/* VPN Protocols */}
            <ProtocolList 
              expandedSections={expandedSections} 
              enabledProtocols={enabledProtocols} 
              toggleSection$={toggleSection$} 
              toggleProtocol$={toggleProtocol$} 
            />
            
            {/* VPN Users Section */}
            <div class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div class="flex cursor-pointer items-center justify-between p-6" onClick$={() => toggleSection$('users')}>
                <div class="flex items-center gap-3">
                  <HiUserGroupOutline class="h-6 w-6 text-primary-500 dark:text-primary-400" />
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{$localize`VPN Users`}</h3>
                </div>
                {expandedSections.users ? (
                  <HiChevronUpOutline class="h-5 w-5 text-gray-500" />
                ) : (
                  <HiChevronDownOutline class="h-5 w-5 text-gray-500" />
                )}
              </div>

              {expandedSections.users && (
                <div class="border-t border-gray-200 p-6 dark:border-gray-700">
                  <div class="space-y-6">
                    {users.map((user, index) => (
                      <UserCredential
                        key={index}
                        user={user}
                        index={index}
                        canDelete={index > 0}
                        onUsernameChange$={handleUsernameChange}
                        onPasswordChange$={handlePasswordChange}
                        onProtocolToggle$={handleProtocolToggle}
                        onDelete$={removeUser}
                      />
                    ))}
                  </div>

                  <button
                    onClick$={addUser}
                    class="mt-6 inline-flex items-center gap-2 rounded-lg border border-gray-300 
                        bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm 
                        transition-colors hover:bg-gray-50 dark:border-gray-600 
                        dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    <HiPlusCircleOutline class="h-5 w-5" />
                    <span>{$localize`Add User`}</span>
                  </button>
                </div>
              )}
            </div>
            
            {/* Wireguard Server Configuration - Only if enabled */}
            {enabledProtocols.Wireguard && <WireguardServer />}
            
            {/* PPTP Server Configuration - Only if enabled */}
            {enabledProtocols.PPTP && <PPTPServer />}
            
            {/* L2TP Server Configuration - Only if enabled */}
            {enabledProtocols.L2TP && <L2TPServer />}
            
            {/* SSTP Server Configuration - Only if enabled */}
            {enabledProtocols.SSTP && <SSTPServer />}
            
            {/* IKEv2 Server Configuration - Only if enabled */}
            {enabledProtocols.IKeV2 && <IKEv2Server />}
            
            {/* OpenVPN Server Configuration - Only if enabled */}
            {enabledProtocols.OpenVPN && <OpenVPNServer />}

            {/* OpenVPN Certificate Passphrase - Only when OpenVPN is enabled */}
            {/* {enabledProtocols.OpenVPN && (
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
                      onChange$={(e) => handlePassphraseChange((e.target as HTMLInputElement).value)}
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
            )} */}
          </>
        )}

        {/* Save Button */}
        <ActionFooter 
          isValid={isValid} 
          saveSettings$={saveSettings$} 
          onComplete$={onComplete$}
        />
      </div>
    </div>
  );
});
