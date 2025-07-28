import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { NumberInput } from "../NumberInput";

/**
 * Disabled States Example
 * 
 * Demonstrates different states of NumberInput including disabled, readonly,
 * error states, and loading patterns. Shows proper styling and user feedback.
 */

export default component$(() => {
  // State management for dynamic examples
  const dynamicValue = useSignal(50);
  const loadingStates = useStore({
    saving: false,
    calculating: false,
    validating: false,
  });

  const settings = useStore({
    maxConnections: 100,
    timeout: 30,
    retries: 3,
    cacheSize: 256,
  });

  // Simulate async operations
  const simulateSave = $(async () => {
    loadingStates.saving = true;
    await new Promise(resolve => setTimeout(resolve, 2000));
    loadingStates.saving = false;
  });

  const simulateCalculation = $(async () => {
    loadingStates.calculating = true;
    await new Promise(resolve => setTimeout(resolve, 1500));
    loadingStates.calculating = false;
  });

  const _simulateValidation = $(async () => {
    loadingStates.validating = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    loadingStates.validating = false;
  });

  return (
    <div class="space-y-8 p-6">
      <div class="mb-6">
        <h2 class="mb-2 text-2xl font-bold text-text-default dark:text-text-dark-default">
          NumberInput Component States
        </h2>
        <p class="text-text-secondary dark:text-text-dark-secondary">
          Comprehensive examples of disabled, readonly, error, and loading states with proper accessibility.
        </p>
      </div>

      {/* Basic States */}
      <div class="space-y-6">
        <h3 class="text-lg font-medium text-text-default dark:text-text-dark-default">
          Basic Component States
        </h3>
        
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Default State */}
          <div>
            <h4 class="mb-3 text-sm font-medium text-text-default dark:text-text-dark-default">
              Default State
            </h4>
            <NumberInput
              label="Quantity"
              value={5}
              min={1}
              max={99}
              onValueChange$={() => {}}
              placeholder="Enter quantity"
              helperText="Normal interactive state"
              size="lg"
            />
          </div>

          {/* Disabled State */}
          <div>
            <h4 class="mb-3 text-sm font-medium text-text-default dark:text-text-dark-default">
              Disabled State
            </h4>
            <NumberInput
              label="Server Capacity"
              value={1000}
              min={0}
              max={10000}
              disabled={true}
              placeholder="Not editable"
              helperText="System-managed value"
              size="lg"
            />
          </div>

          {/* Readonly State */}
          <div>
            <h4 class="mb-3 text-sm font-medium text-text-default dark:text-text-dark-default">
              Readonly State
            </h4>
            <NumberInput
              label="User ID"
              value={12345}
              readOnly={true}
              placeholder="Cannot be changed"
              helperText="View-only field"
              size="lg"
            />
          </div>

          {/* Error State */}
          <div>
            <h4 class="mb-3 text-sm font-medium text-text-default dark:text-text-dark-default">
              Error State
            </h4>
            <NumberInput
              label="Age"
              value={150}
              min={0}
              max={120}
              error="Age cannot exceed 120 years"
              placeholder="Enter valid age"
              helperText="Must be realistic"
              size="lg"
              onValueChange$={() => {}}
            />
          </div>

          {/* Required State */}
          <div>
            <h4 class="mb-3 text-sm font-medium text-text-default dark:text-text-dark-default">
              Required State
            </h4>
            <NumberInput
              label="Priority Level"
              value={undefined}
              min={1}
              max={5}
              required={true}
              error="Priority level is required"
              placeholder="Select priority"
              helperText="1 = Low, 5 = Critical"
              size="lg"
              onValueChange$={() => {}}
            />
          </div>

          {/* Success State */}
          <div>
            <h4 class="mb-3 text-sm font-medium text-text-default dark:text-text-dark-default">
              Success State
            </h4>
            <NumberInput
              label="Score"
              value={95}
              min={0}
              max={100}
              placeholder="Test score"
              helperText="Excellent performance!"
              size="lg"
              onValueChange$={() => {}}
              class="[&>div]:border-success-500 [&>div]:dark:border-success-400"
            />
            <div class="mt-1 text-xs text-success-600 dark:text-success-400">
              ✓ Score validated successfully
            </div>
          </div>
        </div>
      </div>

      {/* Loading States */}
      <div class="space-y-6">
        <h3 class="text-lg font-medium text-text-default dark:text-text-dark-default">
          Loading and Processing States
        </h3>
        
        <div class="grid gap-6 md:grid-cols-2">
          <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4">
            <h4 class="mb-3 text-sm font-medium text-text-default dark:text-text-dark-default">
              Saving State
            </h4>
            <NumberInput
              label="Configuration Value"
              value={dynamicValue.value}
              min={0}
              max={100}
              disabled={loadingStates.saving}
              onValueChange$={(value) => {
                if (value !== undefined) dynamicValue.value = value;
              }}
              placeholder="Enter value"
              helperText={loadingStates.saving ? "Saving..." : "Click save to test"}
              size="lg"
            />
            <button
              type="button"
              onClick$={simulateSave}
              disabled={loadingStates.saving}
              class={[
                "mt-3 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                loadingStates.saving
                  ? "bg-surface-light-quaternary text-text-tertiary cursor-not-allowed dark:bg-surface-dark-quaternary dark:text-text-dark-tertiary"
                  : "bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
              ]}
            >
              {loadingStates.saving ? "Saving..." : "Save Configuration"}
            </button>
          </div>

          <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4">
            <h4 class="mb-3 text-sm font-medium text-text-default dark:text-text-dark-default">
              Processing State
            </h4>
            <NumberInput
              label="Calculation Input"
              value={42}
              min={1}
              max={1000}
              readOnly={loadingStates.calculating}
              placeholder="Enter number"
              helperText={loadingStates.calculating ? "Processing calculation..." : "Click calculate to test"}
              size="lg"
              onValueChange$={() => {}}
            />
            <button
              type="button"
              onClick$={simulateCalculation}
              disabled={loadingStates.calculating}
              class={[
                "mt-3 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                loadingStates.calculating
                  ? "bg-surface-light-quaternary text-text-tertiary cursor-not-allowed dark:bg-surface-dark-quaternary dark:text-text-dark-tertiary"
                  : "bg-secondary-600 text-white hover:bg-secondary-700 dark:bg-secondary-500 dark:hover:bg-secondary-600"
              ]}
            >
              {loadingStates.calculating ? "Calculating..." : "Calculate Result"}
            </button>
          </div>
        </div>
      </div>

      {/* Conditional States */}
      <div class="space-y-6">
        <h3 class="text-lg font-medium text-text-default dark:text-text-dark-default">
          Conditional and Dependent States
        </h3>
        
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <h4 class="mb-4 text-sm font-medium text-text-default dark:text-text-dark-default">
            Server Configuration Panel
          </h4>
          <p class="mb-6 text-sm text-text-secondary dark:text-text-dark-secondary">
            Some settings become disabled based on other configuration values.
          </p>
          
          <div class="grid gap-6 md:grid-cols-2">
            <NumberInput
              label="Max Connections"
              value={settings.maxConnections}
              min={10}
              max={1000}
              step={10}
              onValueChange$={(value) => {
                if (value !== undefined) {
                  settings.maxConnections = value;
                  // Auto-adjust dependent settings
                  if (settings.timeout > value / 10) {
                    settings.timeout = Math.floor(value / 10);
                  }
                }
              }}
              placeholder="100"
              helperText="Maximum concurrent connections"
              size="lg"
            />

            <NumberInput
              label="Connection Timeout"
              value={settings.timeout}
              min={5}
              max={Math.max(60, settings.maxConnections / 10)}
              step={5}
              disabled={settings.maxConnections < 50}
              onValueChange$={(value) => {
                if (value !== undefined) settings.timeout = value;
              }}
              placeholder="30"
              helperText={
                settings.maxConnections < 50 
                  ? "Disabled when connections < 50"
                  : "Seconds before timeout"
              }
              size="lg"
            />

            <NumberInput
              label="Retry Attempts"
              value={settings.retries}
              min={0}
              max={10}
              readOnly={settings.maxConnections > 500}
              onValueChange$={(value) => {
                if (value !== undefined) settings.retries = value;
              }}
              placeholder="3"
              helperText={
                settings.maxConnections > 500
                  ? "Auto-managed for high loads"
                  : "Number of retry attempts"
              }
              size="lg"
            />

            <NumberInput
              label="Cache Size (MB)"
              value={settings.cacheSize}
              min={32}
              max={2048}
              step={32}
              error={
                settings.cacheSize > settings.maxConnections * 4
                  ? "Cache too large for connection count"
                  : ""
              }
              onValueChange$={(value) => {
                if (value !== undefined) settings.cacheSize = value;
              }}
              placeholder="256"
              helperText="Memory cache allocation"
              size="lg"
            />
          </div>

          {/* Configuration Summary */}
          <div class="mt-6 rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
            <h5 class="mb-2 text-sm font-medium text-text-default dark:text-text-dark-default">
              Configuration Summary:
            </h5>
            <div class="grid gap-1 text-xs text-text-secondary dark:text-text-dark-secondary">
              <div>Max Connections: {settings.maxConnections}</div>
              <div>Timeout: {settings.timeout}s {settings.maxConnections < 50 && "(disabled)"}</div>
              <div>Retries: {settings.retries} {settings.maxConnections > 500 && "(auto-managed)"}</div>
              <div>Cache: {settings.cacheSize}MB</div>
            </div>
          </div>
        </div>
      </div>

      {/* Size Variants in Different States */}
      <div class="space-y-6">
        <h3 class="text-lg font-medium text-text-default dark:text-text-dark-default">
          Size Variants Across States
        </h3>
        
        <div class="grid gap-6 md:grid-cols-3">
          <div>
            <h4 class="mb-3 text-sm font-medium text-text-default dark:text-text-dark-default">
              Small Size
            </h4>
            <div class="space-y-4">
              <NumberInput
                label="Normal"
                value={10}
                size="sm"
                placeholder="Small input"
                onValueChange$={() => {}}
              />
              <NumberInput
                label="Disabled"
                value={20}
                size="sm"
                disabled={true}
                placeholder="Small disabled"
              />
              <NumberInput
                label="Error"
                value={30}
                size="sm"
                error="Invalid value"
                onValueChange$={() => {}}
              />
            </div>
          </div>

          <div>
            <h4 class="mb-3 text-sm font-medium text-text-default dark:text-text-dark-default">
              Medium Size
            </h4>
            <div class="space-y-4">
              <NumberInput
                label="Normal"
                value={40}
                size="md"
                placeholder="Medium input"
                onValueChange$={() => {}}
              />
              <NumberInput
                label="Disabled"
                value={50}
                size="md"
                disabled={true}
                placeholder="Medium disabled"
              />
              <NumberInput
                label="Error"
                value={60}
                size="md"
                error="Invalid value"
                onValueChange$={() => {}}
              />
            </div>
          </div>

          <div>
            <h4 class="mb-3 text-sm font-medium text-text-default dark:text-text-dark-default">
              Large Size
            </h4>
            <div class="space-y-4">
              <NumberInput
                label="Normal"
                value={70}
                size="lg"
                placeholder="Large input"
                onValueChange$={() => {}}
              />
              <NumberInput
                label="Disabled"
                value={80}
                size="lg"
                disabled={true}
                placeholder="Large disabled"
              />
              <NumberInput
                label="Error"
                value={90}
                size="lg"
                error="Invalid value"
                onValueChange$={() => {}}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stepper States */}
      <div class="space-y-6">
        <h3 class="text-lg font-medium text-text-default dark:text-text-dark-default">
          Stepper Button States
        </h3>
        
        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <h4 class="mb-3 text-sm font-medium text-text-default dark:text-text-dark-default">
              At Minimum Value
            </h4>
            <NumberInput
              label="Minimum Reached"
              value={0}
              min={0}
              max={100}
              step={1}
              onValueChange$={() => {}}
              placeholder="At minimum"
              helperText="Decrement button should be disabled"
              size="lg"
            />
          </div>

          <div>
            <h4 class="mb-3 text-sm font-medium text-text-default dark:text-text-dark-default">
              At Maximum Value
            </h4>
            <NumberInput
              label="Maximum Reached"
              value={100}
              min={0}
              max={100}
              step={1}
              onValueChange$={() => {}}
              placeholder="At maximum"
              helperText="Increment button should be disabled"
              size="lg"
            />
          </div>

          <div>
            <h4 class="mb-3 text-sm font-medium text-text-default dark:text-text-dark-default">
              No Steppers
            </h4>
            <NumberInput
              label="Text Input Only"
              value={50}
              min={0}
              max={100}
              showSteppers={false}
              onValueChange$={() => {}}
              placeholder="No stepper buttons"
              helperText="Keyboard and typing only"
              size="lg"
            />
          </div>

          <div>
            <h4 class="mb-3 text-sm font-medium text-text-default dark:text-text-dark-default">
              Disabled Steppers
            </h4>
            <NumberInput
              label="Disabled Input"
              value={25}
              min={0}
              max={100}
              disabled={true}
              placeholder="All disabled"
              helperText="All interactions disabled"
              size="lg"
            />
          </div>
        </div>
      </div>

      {/* Implementation Guide */}
      <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
        <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
          State Management Best Practices
        </h3>
        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <h4 class="mb-3 text-sm font-medium text-text-default dark:text-text-dark-default">
              Accessibility Considerations:
            </h4>
            <ul class="space-y-2 text-sm text-text-secondary dark:text-text-dark-secondary">
              <li>• Use aria-disabled for disabled states</li>
              <li>• Provide clear error announcements</li>
              <li>• Maintain focus indicators in all states</li>
              <li>• Use proper contrast ratios</li>
              <li>• Announce loading states to screen readers</li>
            </ul>
          </div>
          <div>
            <h4 class="mb-3 text-sm font-medium text-text-default dark:text-text-dark-default">
              UX Guidelines:
            </h4>
            <ul class="space-y-2 text-sm text-text-secondary dark:text-text-dark-secondary">
              <li>• Show clear visual feedback for each state</li>
              <li>• Use loading states for async operations</li>
              <li>• Disable dependent fields logically</li>
              <li>• Provide helpful error messages</li>
              <li>• Maintain consistent sizing across states</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});