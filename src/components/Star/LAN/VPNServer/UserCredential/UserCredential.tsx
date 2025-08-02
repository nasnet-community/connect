import { component$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { Credentials } from "../../../StarContext/Utils/VPNServerType";
import type { VPNType } from "../../../StarContext/CommonType";
import { VPN_PROTOCOLS } from "../Protocols/constants";
import { useStepperContext } from "~/components/Core/Stepper/CStepper";
import { VPNServerContextId } from "../VPNServer";
import { Card, FormField } from "../UI";
import { useUserCredential } from "./useUserCredential";
import {
  HiUserOutline,
  HiLockClosedOutline,
  HiTrashOutline,
  HiExclamationTriangleOutline,
  HiCheckCircleOutline,
} from "@qwikest/icons/heroicons";

interface UserCredentialProps {
  user: Credentials;
  index: number;
  canDelete: boolean;
  usernameError?: string;
  onUsernameChange$: QRL<(value: string, index: number) => void>;
  onPasswordChange$: QRL<(value: string, index: number) => void>;
  onProtocolToggle$: QRL<(protocol: VPNType, index: number) => void>;
  onDelete$: QRL<(index: number) => void>;
}

export const UserCredential = component$<UserCredentialProps>(
  ({
    user,
    index,
    canDelete,
    usernameError,
    onUsernameChange$,
    onPasswordChange$,
    onProtocolToggle$,
    onDelete$,
  }) => {
    const stepper = useStepperContext(VPNServerContextId);

    const {
      isUserValid,
      cardTitle,
      handleUsernameChange,
      handlePasswordChange,
      handleProtocolToggle,
      handleDelete,
    } = useUserCredential({
      user,
      index,
      onUsernameChange$,
      onPasswordChange$,
      onProtocolToggle$,
      onDelete$,
    });

    return (
      <Card
        variant="default"
        title={cardTitle}
        class="mb-3 overflow-hidden transition-all"
        loading={false}
      >
        {/* Custom Header - Replaces the standard Card title */}
        <div class="-mt-1 mb-4 flex w-full items-center justify-between">
          <div class="flex items-center gap-2">
            <HiUserOutline class="h-4 w-4 text-primary-500" />
            <span class="font-medium">{$localize`User ${index + 1}`}</span>
            {!isUserValid && (
              <span class="ml-1 rounded-full bg-warning-surface px-1.5 py-0.5 text-xs text-warning-dark">
                {$localize`Incomplete`}
              </span>
            )}
          </div>
          <div class="flex items-center gap-2">
            {canDelete && (
              <button
                type="button"
                onClick$={async (e) => {
                  e.stopPropagation();
                  await handleDelete();
                }}
                class="text-error transition-colors hover:text-error-dark dark:text-error-light dark:hover:text-error"
                aria-label={$localize`Remove User`}
              >
                <HiTrashOutline class="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Username Field */}
            <FormField
              label={$localize`Username`}
              id={`username-${index}`}
              required={true}
              size="sm"
              validation={
                usernameError
                  ? "invalid"
                  : user.Username.trim() !== ""
                    ? "valid"
                    : "invalid"
              }
              errorMessage={
                usernameError ||
                (user.Username.trim() === "" ? $localize`Required` : undefined)
              }
            >
              <div class="relative">
                <input
                  id={`username-${index}`}
                  type="text"
                  value={user.Username}
                  onInput$={async (e) => {
                    const target = e.target as HTMLInputElement;
                    await handleUsernameChange(target.value);
                  }}
                  class="w-full rounded-lg border border-border bg-white py-1.5 pl-8 text-sm
                    focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
                    dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                  placeholder={$localize`Enter username`}
                />
                <div class="text-text-muted dark:text-text-dark-muted absolute left-2.5 top-1/2 -translate-y-1/2">
                  <HiUserOutline class="h-4 w-4" />
                </div>
              </div>
            </FormField>

            {/* Password Field */}
            <FormField
              label={$localize`Password`}
              id={`password-${index}`}
              required={true}
              size="sm"
              validation={user.Password.trim() !== "" ? "valid" : "invalid"}
              errorMessage={
                user.Password.trim() === "" ? $localize`Required` : undefined
              }
            >
              <div class="relative">
                <input
                  id={`password-${index}`}
                  type="text"
                  value={user.Password}
                  onInput$={async (e) => {
                    const target = e.target as HTMLInputElement;
                    await handlePasswordChange(target.value);
                  }}
                  class="w-full rounded-lg border border-border bg-white py-1.5 pl-8 text-sm
                    focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
                    dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                  placeholder={$localize`Enter password`}
                />
                <div class="text-text-muted dark:text-text-dark-muted absolute left-2.5 top-1/2 -translate-y-1/2">
                  <HiLockClosedOutline class="h-4 w-4" />
                </div>
              </div>
            </FormField>
          </div>

          {/* Allowed VPN Protocols - Redesigned */}
          <FormField
            label={$localize`Allowed Protocols`}
            size="sm"
            validation={
              Array.isArray(user.VPNType) && user.VPNType.length > 0
                ? "valid"
                : "invalid"
            }
            errorMessage={
              Array.isArray(user.VPNType) && user.VPNType.length === 0
                ? $localize`Select at least one protocol`
                : undefined
            }
          >
            <div class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
              {VPN_PROTOCOLS.map((protocol) => {
                // Only show enabled protocols
                if (!stepper.data.enabledProtocols[protocol.id]) return null;

                const isSelected = (user.VPNType || []).includes(protocol.id);

                return (
                  <div
                    key={protocol.id}
                    onClick$={async () =>
                      await handleProtocolToggle(protocol.id)
                    }
                    class={`
                      relative cursor-pointer rounded-lg border transition-all hover:shadow-md
                      ${
                        isSelected
                          ? "border-primary-400 bg-primary-50 shadow-sm dark:border-primary-500 dark:bg-primary-900/20"
                          : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
                      }
                    `}
                  >
                    {/* Selected indicator */}
                    {isSelected && (
                      <div class="absolute -right-1 -top-1 rounded-full bg-primary-500 p-0.5 shadow-sm dark:bg-primary-600">
                        <HiCheckCircleOutline class="h-3 w-3 text-white" />
                      </div>
                    )}

                    <div class="flex flex-col items-center gap-1 p-2">
                      {/* Protocol logo */}
                      <img
                        src={protocol.logo}
                        alt={protocol.name}
                        class={`h-6 w-6 ${
                          isSelected
                            ? "dark:brightness-[1.1] dark:drop-shadow-[0_0_2px_rgba(79,70,229,0.3)] dark:hue-rotate-[180deg] dark:invert dark:saturate-[5] dark:sepia dark:filter"
                            : "dark:opacity-80 dark:brightness-75 dark:hue-rotate-[180deg] dark:invert dark:saturate-[2] dark:sepia dark:filter"
                        }`}
                        onError$={(e) => {
                          const target = e.target as HTMLInputElement;
                          target.style.display = "none";
                        }}
                      />

                      {/* Protocol name */}
                      <span
                        class={`text-center text-xs font-medium ${
                          isSelected
                            ? "text-primary-700 dark:text-primary-300"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {protocol.name}
                      </span>
                    </div>

                    {/* Hidden checkbox for accessibility */}
                    <input
                      type="checkbox"
                      class="sr-only"
                      checked={isSelected}
                      onChange$={async () => {
                        await handleProtocolToggle(protocol.id);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </FormField>

          {/* Invalid User Warning - Compact Version */}
          {!isUserValid && (
            <div
              class="flex items-center gap-2 rounded-md border border-warning-400/30 bg-warning-50 p-2.5 text-xs text-warning-700 shadow-sm
              dark:border-l-2 dark:border-warning-500/70 dark:border-l-warning-400
              dark:bg-gradient-to-r dark:from-warning-900/40 dark:to-warning-900/20 
              dark:text-warning-200"
            >
              <div class="dark:animate-pulse">
                <HiExclamationTriangleOutline class="h-4 w-4 flex-shrink-0 text-warning-500 dark:text-warning-300" />
              </div>
              <span class="font-medium">{$localize`Complete all required fields`}</span>
            </div>
          )}
        </div>
      </Card>
    );
  },
);
