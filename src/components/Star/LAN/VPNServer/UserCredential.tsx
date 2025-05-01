import { component$, type QRL } from "@builder.io/qwik";
import { HiTrashOutline } from "@qwikest/icons/heroicons";
import type { Credentials } from "../../StarContext/LANType";
import type { VPNType } from "../../StarContext/CommonType";
import { VPN_PROTOCOLS } from "./Protocols/constants";

interface UserCredentialProps {
  user: Credentials;
  index: number;
  canDelete: boolean;
  onUsernameChange$: QRL<(value: string, index: number) => void>;
  onPasswordChange$: QRL<(value: string, index: number) => void>;
  onProtocolToggle$: QRL<(protocol: VPNType, index: number) => void>;
  onDelete$: QRL<(index: number) => void>;
}

export const UserCredential = component$<UserCredentialProps>(({
  user,
  index,
  canDelete,
  onUsernameChange$,
  onPasswordChange$,
  onProtocolToggle$,
  onDelete$
}) => {
  return (
    <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div class="grid gap-6 md:grid-cols-2">
        {/* Username and Password */}
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {$localize`Username`}<span class="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            value={user.Username}
            onChange$={(e) => onUsernameChange$((e.target as HTMLInputElement).value, index)}
            class="focus:ring-primary-500 w-full rounded-lg border border-gray-300 bg-white px-4 
                py-2 text-gray-900 focus:border-transparent focus:ring-2
                dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder={$localize`Enter Username`}
            required
          />
        </div>
        
        <div class="relative">
          <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {$localize`Password`}<span class="text-red-500 ml-1">*</span>
          </label>
          <div class="flex gap-2">
            <input
              type="password"
              value={user.Password}
              onChange$={(e) => onPasswordChange$((e.target as HTMLInputElement).value, index)}
              class="focus:ring-primary-500 w-full rounded-lg border border-gray-300 bg-white px-4 
                  py-2 text-gray-900 focus:border-transparent focus:ring-2
                  dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder={$localize`Enter Password`}
              required
            />
            {canDelete && (
              <button
                onClick$={() => onDelete$(index)}
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

      {/* VPN Protocols Selection */}
      <div class="mt-6">
        <label class="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {$localize`Allowed VPN Protocols`}<span class="text-red-500 ml-1">*</span>
        </label>
        <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {VPN_PROTOCOLS.map((protocol) => (
            <div 
              key={protocol.id} 
              class={`
                flex items-start gap-3 rounded-lg border p-3 transition-colors
                ${user.VPNType?.includes(protocol.id) 
                  ? 'border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-900/20' 
                  : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'}
              `}
              onClick$={() => onProtocolToggle$(protocol.id, index)}
            >
              <input
                type="checkbox"
                id={`protocol-${protocol.id}-${index}`}
                checked={user.VPNType?.includes(protocol.id) || false}
                onChange$={() => onProtocolToggle$(protocol.id, index)}
                class="mt-1 h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 dark:border-gray-600"
              />
              <div>
                <div class="flex items-center gap-2">
                  {/* Display protocol logo if available, fallback to text-only */}
                  <img 
                    src={protocol.logo} 
                    alt={protocol.name} 
                    class="h-5 w-5" 
                    onError$={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <label 
                    for={`protocol-${protocol.id}-${index}`}
                    class="text-sm font-medium text-gray-900 dark:text-white cursor-pointer"
                  >
                    {protocol.name}
                  </label>
                </div>
                <p class="mt-1 text-xs text-gray-600 dark:text-gray-400">
                  {protocol.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Select All / Deselect All buttons */}
      <div class="mt-4 flex justify-end gap-3">
        <button
          type="button"
          onClick$={() => {
            VPN_PROTOCOLS.forEach(protocol => {
              if (!user.VPNType?.includes(protocol.id)) {
                onProtocolToggle$(protocol.id, index);
              }
            });
          }}
          class="rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200 
                dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          {$localize`Select All`}
        </button>
        <button
          type="button"
          onClick$={() => {
            VPN_PROTOCOLS.forEach(protocol => {
              if (user.VPNType?.includes(protocol.id)) {
                onProtocolToggle$(protocol.id, index);
              }
            });
          }}
          class="rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200 
                dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          {$localize`Deselect All`}
        </button>
      </div>
    </div>
  );
}); 