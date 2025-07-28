import { component$, useSignal } from "@builder.io/qwik";
import { Switch } from "~/components/Core/Switch";

export const SemanticVariants = component$(() => {
  const defaultSwitch = useSignal(true);
  const successSwitch = useSignal(false);
  const warningSwitch = useSignal(true);
  const errorSwitch = useSignal(false);

  return (
    <div class="space-y-8">
      <div class="space-y-6">
        <h3 class="text-lg font-semibold text-text-primary dark:text-text-dark-primary">
          Semantic Color Variants
        </h3>
        <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
          Use semantic color variants to convey meaning and context. Each variant uses
          appropriate colors from the Tailwind configuration.
        </p>

        <div class="grid gap-6 sm:grid-cols-2">
          {/* Default Variant */}
          <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-text-primary dark:text-text-dark-primary">
                  Default Theme
                </h4>
                <p class="text-xs text-text-secondary dark:text-text-dark-secondary">
                  Standard primary colors
                </p>
              </div>
              <Switch
                checked={defaultSwitch.value}
                onChange$={(checked) => (defaultSwitch.value = checked)}
                variant="default"
                aria-label="Default variant switch"
              />
            </div>
            <div class="text-xs text-text-tertiary dark:text-text-dark-tertiary">
              Uses: primary-500/600
            </div>
          </div>

          {/* Success Variant */}
          <div class="space-y-4 rounded-lg border border-success-200 bg-success-50 p-6 dark:border-success-800 dark:bg-success-900/20">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-success-800 dark:text-success-200">
                  Success State
                </h4>
                <p class="text-xs text-success-600 dark:text-success-400">
                  Indicates successful operations
                </p>
              </div>
              <Switch
                checked={successSwitch.value}
                onChange$={(checked) => (successSwitch.value = checked)}
                variant="success"
                aria-label="Success variant switch"
              />
            </div>
            <div class="text-xs text-success-600 dark:text-success-400">
              Uses: success-500/600
            </div>
          </div>

          {/* Warning Variant */}
          <div class="space-y-4 rounded-lg border border-warning-200 bg-warning-50 p-6 dark:border-warning-800 dark:bg-warning-900/20">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-warning-800 dark:text-warning-200">
                  Warning State
                </h4>
                <p class="text-xs text-warning-600 dark:text-warning-400">
                  Indicates caution or attention needed
                </p>
              </div>
              <Switch
                checked={warningSwitch.value}
                onChange$={(checked) => (warningSwitch.value = checked)}
                variant="warning"
                aria-label="Warning variant switch"
              />
            </div>
            <div class="text-xs text-warning-600 dark:text-warning-400">
              Uses: warning-500/600
            </div>
          </div>

          {/* Error Variant */}
          <div class="space-y-4 rounded-lg border border-error-200 bg-error-50 p-6 dark:border-error-800 dark:bg-error-900/20">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-error-800 dark:text-error-200">
                  Error State
                </h4>
                <p class="text-xs text-error-600 dark:text-error-400">
                  Indicates errors or destructive actions
                </p>
              </div>
              <Switch
                checked={errorSwitch.value}
                onChange$={(checked) => (errorSwitch.value = checked)}
                variant="error"
                aria-label="Error variant switch"
              />
            </div>
            <div class="text-xs text-error-600 dark:text-error-400">
              Uses: error-500/600
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h4 class="text-sm font-semibold text-text-primary dark:text-text-dark-primary">
          Real-World Use Cases
        </h4>
        <div class="space-y-6">
          {/* Auto-save example */}
          <div class="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div>
              <h5 class="text-sm font-medium text-text-primary dark:text-text-dark-primary">
                Auto-save Documents
              </h5>
              <p class="text-xs text-text-secondary dark:text-text-dark-secondary">
                Automatically save changes as you work
              </p>
            </div>
            <Switch
              checked={successSwitch.value}
              onChange$={(checked) => (successSwitch.value = checked)}
              variant="success"
              label={successSwitch.value ? "Enabled" : "Disabled"}
              labelPosition="left"
            />
          </div>

          {/* Maintenance mode example */}
          <div class="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div>
              <h5 class="text-sm font-medium text-text-primary dark:text-text-dark-primary">
                Maintenance Mode
              </h5>
              <p class="text-xs text-text-secondary dark:text-text-dark-secondary">
                Enable to prevent new user registrations
              </p>
            </div>
            <Switch
              checked={warningSwitch.value}
              onChange$={(checked) => (warningSwitch.value = checked)}
              variant="warning"
              label={warningSwitch.value ? "Active" : "Inactive"}
              labelPosition="left"
            />
          </div>

          {/* Delete account example */}
          <div class="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div>
              <h5 class="text-sm font-medium text-text-primary dark:text-text-dark-primary">
                Account Deletion
              </h5>
              <p class="text-xs text-text-secondary dark:text-text-dark-secondary">
                Permanently delete user account and data
              </p>
            </div>
            <Switch
              checked={errorSwitch.value}
              onChange$={(checked) => (errorSwitch.value = checked)}
              variant="error"
              label={errorSwitch.value ? "Delete" : "Keep"}
              labelPosition="left"
            />
          </div>
        </div>
      </div>

      <div class="rounded-lg bg-info-50 border border-info-200 p-4 dark:bg-info-900/20 dark:border-info-800">
        <h4 class="text-sm font-medium text-info-800 dark:text-info-200 mb-2">
          💡 Semantic Variant Guidelines
        </h4>
        <ul class="text-sm text-info-700 dark:text-info-300 space-y-1">
          <li>• <strong>Default:</strong> Use for general settings and preferences</li>
          <li>• <strong>Success:</strong> Use for positive actions like auto-save, backup enabled</li>
          <li>• <strong>Warning:</strong> Use for caution states like maintenance mode, beta features</li>
          <li>• <strong>Error:</strong> Use for destructive actions like delete, disable security</li>
        </ul>
      </div>
    </div>
  );
});