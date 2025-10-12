import { $, component$, useContext } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { VSCredentials } from "../../../StarContext/Utils/VPNServerType";
import type { VPNType } from "../../../StarContext/CommonType";
import { VPN_PROTOCOLS } from "../Protocols/constants";
import { Card } from "~/components/Core/Card";
import { Field } from "~/components/Core/Form/Field";
import { Input, Checkbox } from "~/components/Core";
import { useUserCredential } from "./useUserCredential";
import { StarContext } from "../../../StarContext/StarContext";
import {
  HiUserOutline,
  HiLockClosedOutline,
  HiTrashOutline,
  HiExclamationTriangleOutline,
  HiCheckCircleOutline,
  HiCheckOutline,
} from "@qwikest/icons/heroicons";

interface UserCredentialProps {
  user: VSCredentials;
  index: number;
  canDelete: boolean;
  usernameError?: string;
  passwordError?: string;
  onUsernameChange$: QRL<(value: string, index: number) => void>;
  onPasswordChange$: QRL<(value: string, index: number) => void>;
  onProtocolToggle$: QRL<(protocol: VPNType, index: number) => void>;
  onDelete$: QRL<(index: number) => void>;
  easyMode?: boolean;
  enabledProtocols?: Record<VPNType, boolean>;
}

export const UserCredential = component$<UserCredentialProps>(
  ({
    user,
    index,
    canDelete,
    usernameError,
    passwordError,
    onUsernameChange$,
    onPasswordChange$,
    onProtocolToggle$,
    onDelete$,
    easyMode = false,
    enabledProtocols,
  }) => {
    // Get mode from StarContext
    const starContext = useContext(StarContext);
    const isEasyMode = easyMode || starContext.state.Choose.Mode === "easy";

    const {
      isUserValid,
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

    // Calculate enabled protocols for Select All functionality
    const enabledProtocolsList = VPN_PROTOCOLS.filter(
      (protocol) => enabledProtocols && enabledProtocols[protocol.id]
    ).map((p) => p.id);

    // Check if all enabled protocols are selected
    const allProtocolsSelected =
      enabledProtocolsList.length > 0 &&
      enabledProtocolsList.every((protocol) =>
        (user.VPNType || []).includes(protocol)
      );

    // Handle Select All / Deselect All
    const handleSelectAll = $(async () => {
      if (allProtocolsSelected) {
        // Deselect all protocols
        for (const protocol of enabledProtocolsList) {
          if ((user.VPNType || []).includes(protocol)) {
            await handleProtocolToggle(protocol);
          }
        }
      } else {
        // Select all enabled protocols
        for (const protocol of enabledProtocolsList) {
          if (!(user.VPNType || []).includes(protocol)) {
            await handleProtocolToggle(protocol);
          }
        }
      }
    });

    return (
      <Card
        variant="default"
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
            <Field
              label={$localize`Username`}
              id={`username-${index}`}
              required={true}
              size="sm"
              error={
                usernameError ||
                (user.Username.trim() === "" ? $localize`Required` : undefined)
              }
            >
              <div class="relative">
                <Input
                  id={`username-${index}`}
                  type="text"
                  value={user.Username}
                  onInput$={async (event: Event, value: string) => {
                    await handleUsernameChange(value);
                  }}
                  placeholder={$localize`Enter username`}
                  size="sm"
                  class="pl-8"
                />
                <div class="text-text-muted dark:text-text-dark-muted absolute left-2.5 top-1/2 -translate-y-1/2">
                  <HiUserOutline class="h-4 w-4" />
                </div>
              </div>
            </Field>

            {/* Password Field */}
            <Field
              label={$localize`Password`}
              id={`password-${index}`}
              required={true}
              size="sm"
              error={
                passwordError ||
                (user.Password.trim() === "" ? $localize`Required` : undefined)
              }
            >
              <div class="relative">
                <Input
                  id={`password-${index}`}
                  type="text"
                  value={user.Password}
                  onInput$={async (event: Event, value: string) => {
                    await handlePasswordChange(value);
                  }}
                  placeholder={$localize`Enter password`}
                  size="sm"
                  class="pl-8"
                />
                <div class="text-text-muted dark:text-text-dark-muted absolute left-2.5 top-1/2 -translate-y-1/2">
                  <HiLockClosedOutline class="h-4 w-4" />
                </div>
              </div>
            </Field>
          </div>


          {/* Allowed VPN Protocols - Only show in Advanced mode */}
          {!isEasyMode && (
            <Field
              label={$localize`Allowed Protocols`}
              size="sm"
              error={
                Array.isArray(user.VPNType) && user.VPNType.length === 0
                  ? $localize`Select at least one protocol`
                  : undefined
              }
            >
              <div class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
                {/* Select All / Deselect All Card */}
                <div
                  onClick$={handleSelectAll}
                  class={`
                    relative cursor-pointer rounded-lg border transition-all hover:shadow-md
                    ${
                      allProtocolsSelected
                        ? "border-primary-400 bg-primary-50 shadow-sm dark:border-primary-500 dark:bg-primary-900/20"
                        : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
                    }
                  `}
                >
                  {/* Selected indicator */}
                  {allProtocolsSelected && (
                    <div class="absolute -right-1 -top-1 rounded-full bg-primary-500 p-0.5 shadow-sm dark:bg-primary-600">
                      <HiCheckCircleOutline class="h-3 w-3 text-white" />
                    </div>
                  )}

                  <div class="flex flex-col items-center gap-1 p-2">
                    {/* Icon */}
                    <div
                      class={`flex h-6 w-6 items-center justify-center rounded ${
                        allProtocolsSelected
                          ? "bg-primary-500 dark:bg-primary-600"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    >
                      <HiCheckOutline
                        class={`h-4 w-4 ${
                          allProtocolsSelected
                            ? "text-white"
                            : "text-gray-600 dark:text-gray-300"
                        }`}
                      />
                    </div>

                    {/* Text */}
                    <span
                      class={`text-center text-xs font-medium ${
                        allProtocolsSelected
                          ? "text-primary-700 dark:text-primary-300"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {allProtocolsSelected
                        ? $localize`Deselect All`
                        : $localize`Select All`}
                    </span>
                  </div>
                </div>

                {VPN_PROTOCOLS.map((protocol) => {
                  // Only show enabled protocols
                  if (enabledProtocols && !enabledProtocols[protocol.id]) {
                    return null;
                  }

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
                    <Checkbox
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
            </Field>
          )}

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
