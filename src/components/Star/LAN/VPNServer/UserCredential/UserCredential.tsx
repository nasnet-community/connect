import { component$, $, useVisibleTask$, useSignal } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { Credentials } from "../../../StarContext/LANType";
import type { VPNType } from "../../../StarContext/CommonType";
import { VPN_PROTOCOLS } from "../Protocols/constants";
import { useStepperContext } from "~/components/Core/Stepper/CStepper";
import { VPNServerContextId } from "../VPNServer";
import { Card, FormField } from "../UI";
import { 
  HiUserOutline, 
  HiLockClosedOutline, 
  HiTrashOutline, 
  HiExclamationTriangleOutline,
  // HiChevronDownOutline,
  // HiChevronUpOutline,
  HiEyeOutline,
  HiEyeSlashOutline
} from "@qwikest/icons/heroicons";

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
  onDelete$,
}) => {
  const stepper = useStepperContext(VPNServerContextId);
  
  // Determine if this user is valid
  const isUserValid = user.Username.trim() !== "" && 
    user.Password.trim() !== "" && 
    Array.isArray(user.VPNType) && 
    user.VPNType.length > 0;
  
  // Use useVisibleTask$ to validate and update step completion
  // This runs on the client and doesn't have serialization issues
  useVisibleTask$(({ track }) => {
    // Track the user and all users for validation
    track(() => user);
    track(() => stepper.data.users);
    
    // Check if all users are valid
    const isFormValid = stepper.data.users.every(u => {
      const hasCredentials = u.Username?.trim() !== "" && u.Password?.trim() !== "";
      const hasProtocols = Array.isArray(u.VPNType) && u.VPNType.length > 0;
      const hasValidProtocols = Array.isArray(u.VPNType) && 
        u.VPNType.every(protocol => stepper.data.enabledProtocols[protocol] === true);
      return hasCredentials && hasProtocols && hasValidProtocols;
    });
    
    // Update the context data stepState directly
    if (stepper.data.stepState) {
      stepper.data.stepState.users = isFormValid;
    }
    
    // Find the Users step and update its completion status
    const usersStepId = stepper.steps.value.find(step => 
      step.title.includes("Users")
    )?.id;
    
    if (usersStepId !== undefined) {
      if (isFormValid) {
        stepper.completeStep$(usersStepId);
      } else {
        stepper.updateStepCompletion$(usersStepId, false);
      }
    }
  });

  // Event handlers for inputs - they don't need to call validation explicitly
  // as useVisibleTask$ will handle that reactively
  const handleUsernameChange = $(async (value: string) => {
    await onUsernameChange$(value, index);
  });
  
  const handlePasswordChange = $(async (value: string) => {
    await onPasswordChange$(value, index);
  });
  
  const handleProtocolToggle = $(async (protocol: VPNType) => {
    await onProtocolToggle$(protocol, index);
  });
  
  const handleDelete = $(async () => {
    await onDelete$(index);
  });

  const showPassword = useSignal(false);
  
  // Use a basic title for the Card component to satisfy TypeScript requirements
  const cardTitle = $localize`User ${index + 1}`;
  
  return (
    <Card
      variant="default"
      title={cardTitle}
      class="mb-3 overflow-hidden transition-all"
      loading={false}
    >
      {/* Custom Header - Replaces the standard Card title */}
      <div class="flex w-full items-center justify-between mb-4 -mt-1">
        <div class="flex items-center gap-2">
          <HiUserOutline class="h-4 w-4 text-primary-500" />
          <span class="font-medium">{$localize`User ${index + 1}`}</span>
          {!isUserValid && (
            <span class="ml-1 text-xs px-1.5 py-0.5 rounded-full bg-warning-surface text-warning-dark">
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
              class="text-error hover:text-error-dark dark:text-error-light dark:hover:text-error transition-colors"
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
              validation={user.Username.trim() !== "" ? "valid" : "invalid"}
              errorMessage={user.Username.trim() === "" ? $localize`Required` : undefined}
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
                  class="w-full rounded-lg border border-border pl-8 py-1.5 text-sm bg-white
                    focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
                    dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                  placeholder={$localize`Enter username`}
                />
                <div class="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted dark:text-text-dark-muted">
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
              errorMessage={user.Password.trim() === "" ? $localize`Required` : undefined}
            >
              <div class="relative">
                <input
                  id={`password-${index}`}
                  type={showPassword.value ? "text" : "password"}
                  value={user.Password}
                  onInput$={async (e) => {
                    const target = e.target as HTMLInputElement;
                    await handlePasswordChange(target.value);
                  }}
                  class="w-full rounded-lg border border-border pl-8 pr-8 py-1.5 text-sm bg-white
                    focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
                    dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                  placeholder={$localize`Enter password`}
                />
                <div class="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted dark:text-text-dark-muted">
                  <HiLockClosedOutline class="h-4 w-4" />
                </div>
                <button
                  type="button"
                  onClick$={() => (showPassword.value = !showPassword.value)}
                  class="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-default dark:text-text-dark-muted dark:hover:text-text-dark-default"
                >
                  {showPassword.value ? (
                    <HiEyeOutline class="h-4 w-4" />
                  ) : (
                    <HiEyeSlashOutline class="h-4 w-4" />
                  )}
                </button>
              </div>
            </FormField>
          </div>
          
          {/* Allowed VPN Protocols */}
          <FormField
            label={$localize`Allowed Protocols`}
            size="sm"
            validation={Array.isArray(user.VPNType) && user.VPNType.length > 0 ? "valid" : "invalid"}
            errorMessage={Array.isArray(user.VPNType) && user.VPNType.length === 0 ? $localize`Select at least one` : undefined}
          >
            <div class="flex flex-wrap gap-1.5">
              {VPN_PROTOCOLS.map((protocol) => (
                <div key={protocol.id} class="flex-none">
                  {stepper.data.enabledProtocols[protocol.id] && (
                    <label
                      class={`
                        inline-flex cursor-pointer items-center text-xs rounded-full px-2.5 py-1 transition-colors
                        ${(user.VPNType || []).includes(protocol.id)
                          ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400 shadow-sm'
                          : 'bg-surface-tertiary text-text-muted dark:bg-surface-dark-secondary dark:text-text-dark-muted'}
                      `}
                    >
                      <input
                        type="checkbox"
                        class="sr-only"
                        checked={(user.VPNType || []).includes(protocol.id)}
                        onChange$={async () => {
                          await handleProtocolToggle(protocol.id);
                        }}
                      />
                      <span class="font-medium">{protocol.name}</span>
                    </label>
                  )}
                </div>
              ))}
            </div>
          </FormField>
          
          {/* Invalid User Warning - Compact Version */}
          {!isUserValid && (
            <div class="flex items-center p-2 gap-2 rounded bg-warning-surface text-warning-dark text-xs dark:bg-warning-900/20 dark:text-warning-light">
              <HiExclamationTriangleOutline class="h-3.5 w-3.5 flex-shrink-0" />
              <span>{$localize`Complete all required fields`}</span>
            </div>
          )}
        </div>
    </Card>
  );
}); 