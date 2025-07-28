import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import {
  PlaygroundTemplate,
  type PropertyControl,
} from "~/components/Docs/templates";
import { PinInput } from "../PinInput";

/**
 * PinInput component interactive playground
 */
export default component$(() => {
  // Playground state
  const state = useStore({
    // Basic props
    value: "",
    length: 4,
    type: "numeric" as "numeric" | "alphanumeric",
    mask: false,
    label: "PIN Input",
    helperText: "Enter your PIN code",
    error: "",
    placeholder: "○",
    
    // Behavior
    size: "md" as "sm" | "md" | "lg",
    disabled: false,
    required: false,
    autoFocus: true,
    selectOnFocus: true,
    spaced: true,
    
    // Demo scenarios
    demoScenario: "basic" as "basic" | "totp" | "product-key" | "secure-pin",
  });

  // Demo values for different scenarios
  const currentValue = useSignal(state.value);
  const completionMessage = useSignal("");
  const attempts = useSignal(0);

  // Control definitions for the playground
  const controls: PropertyControl[] = [
    {
      name: "demoScenario",
      label: "Demo Scenario",
      type: "select",
      options: [
        { label: "Basic PIN", value: "basic" },
        { label: "TOTP Authentication", value: "totp" },
        { label: "Product Key", value: "product-key" },
        { label: "Secure Banking PIN", value: "secure-pin" },
      ],
    },
    {
      name: "length",
      label: "Length",
      type: "number",
      min: 2,
      max: 10,
    },
    {
      name: "type",
      label: "Input Type",
      type: "select",
      options: [
        { label: "Numeric", value: "numeric" },
        { label: "Alphanumeric", value: "alphanumeric" },
      ],
    },
    {
      name: "size",
      label: "Size",
      type: "select",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
    },
    {
      name: "mask",
      label: "Mask Input",
      type: "boolean",
    },
    {
      name: "label",
      label: "Label",
      type: "text",
    },
    {
      name: "helperText",
      label: "Helper Text",
      type: "text",
    },
    {
      name: "error",
      label: "Error Message",
      type: "text",
    },
    {
      name: "placeholder",
      label: "Placeholder Character",
      type: "text",
    },
    {
      name: "disabled",
      label: "Disabled",
      type: "boolean",
    },
    {
      name: "required",
      label: "Required",
      type: "boolean",
    },
    {
      name: "autoFocus",
      label: "Auto Focus",
      type: "boolean",
    },
    {
      name: "selectOnFocus",
      label: "Select on Focus",
      type: "boolean",
    },
    {
      name: "spaced",
      label: "Spaced Layout",
      type: "boolean",
    },
  ];

  // Apply scenario presets
  const applyScenario = $((scenario: string) => {
    completionMessage.value = "";
    attempts.value = 0;
    currentValue.value = "";
    
    switch (scenario) {
      case "totp":
        state.length = 6;
        state.type = "numeric";
        state.mask = false;
        state.label = "Authentication Code";
        state.helperText = "Enter the 6-digit code from your authenticator app";
        state.placeholder = "0";
        state.error = "";
        break;
      case "product-key":
        state.length = 5;
        state.type = "alphanumeric";
        state.mask = false;
        state.label = "Product Key";
        state.helperText = "Enter your 5-character license key";
        state.placeholder = "-";
        state.spaced = false;
        state.error = "";
        break;
      case "secure-pin":
        state.length = 4;
        state.type = "numeric";
        state.mask = true;
        state.label = "Security PIN";
        state.helperText = "Enter your 4-digit security PIN";
        state.placeholder = "●";
        state.spaced = true;
        state.error = "";
        break;
      default: // basic
        state.length = 4;
        state.type = "numeric";
        state.mask = false;
        state.label = "PIN Input";
        state.helperText = "Enter your PIN code";
        state.placeholder = "○";
        state.spaced = true;
        state.error = "";
    }
  });

  // Event handlers
  const handleValueChange$ = $((value: string) => {
    currentValue.value = value;
    state.value = value;
    completionMessage.value = "";
    
    // Clear errors when user starts typing
    if (state.error) {
      state.error = "";
    }
  });

  const handleComplete$ = $((value: string) => {
    switch (state.demoScenario) {
      case "totp":
        if (value === "123456") {
          completionMessage.value = "✅ Authentication successful!";
        } else {
          state.error = "Invalid authentication code. Please try again.";
          currentValue.value = "";
        }
        break;
      case "product-key":
        if (value.toUpperCase() === "ABC123" || value.toUpperCase() === "XYZ789") {
          completionMessage.value = "✅ Valid product key! License activated.";
        } else {
          state.error = "Invalid product key. Please check and try again.";
          currentValue.value = "";
        }
        break;
      case "secure-pin":
        if (value === "1234" || value === "0000") {
          attempts.value++;
          if (attempts.value >= 3) {
            state.error = "Account locked. Too many failed attempts.";
            state.disabled = true;
          } else {
            state.error = `Invalid PIN. ${3 - attempts.value} attempts remaining.`;
            currentValue.value = "";
          }
        } else {
          completionMessage.value = "✅ Security PIN verified!";
          attempts.value = 0;
        }
        break;
      default:
        completionMessage.value = `✅ PIN entered: ${value}`;
    }
  });

  const handleControlChange$ = $((property: string, value: any) => {
    if (property === "demoScenario") {
      state.demoScenario = value;
      applyScenario(value);
    } else {
      (state as any)[property] = value;
    }
  });

  const resetDemo = $(() => {
    currentValue.value = "";
    state.value = "";
    completionMessage.value = "";
    attempts.value = 0;
    state.error = "";
    state.disabled = false;
  });

  return (
    <PlaygroundTemplate
      title="PinInput Playground"
      description="Experiment with different PinInput configurations and test real-world scenarios."
      controls={controls}
      onControlChange$={handleControlChange$}
      state={state}
    >
      <div class="space-y-8">
        {/* Main Interactive Demo */}
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
            Interactive Demo
          </h3>
          
          <div class="max-w-md">
            <PinInput
              value={currentValue.value}
              length={state.length}
              type={state.type}
              mask={state.mask}
              size={state.size}
              disabled={state.disabled}
              required={state.required}
              autoFocus={state.autoFocus}
              selectOnFocus={state.selectOnFocus}
              spaced={state.spaced}
              label={state.label}
              helperText={state.helperText}
              error={state.error}
              placeholder={state.placeholder}
              onValueChange$={handleValueChange$}
              onComplete$={handleComplete$}
            />
          </div>
          
          {/* Demo Results */}
          {completionMessage.value && (
            <div class="mt-4 rounded-md bg-success-50 dark:bg-success-950 border border-success-200 dark:border-success-800 p-3">
              <p class="text-sm text-success-800 dark:text-success-200">
                {completionMessage.value}
              </p>
            </div>
          )}
          
          {/* Current State Display */}
          <div class="mt-6 rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
            <h4 class="mb-2 text-sm font-medium text-text-default dark:text-text-dark-default">
              Current State:
            </h4>
            <div class="grid gap-2 text-xs font-mono text-text-secondary dark:text-text-dark-secondary">
              <div>value: <span class="text-primary-600 dark:text-primary-400">"{currentValue.value}"</span></div>
              <div>length: <span class="text-primary-600 dark:text-primary-400">{state.length}</span></div>
              <div>type: <span class="text-primary-600 dark:text-primary-400">"{state.type}"</span></div>
              <div>completed: <span class="text-primary-600 dark:text-primary-400">{currentValue.value.length === state.length}</span></div>
              {state.demoScenario === "secure-pin" && (
                <div>attempts: <span class="text-warning-600 dark:text-warning-400">{attempts.value}</span></div>
              )}
            </div>
          </div>

          <div class="mt-4 flex gap-2">
            <button
              type="button"
              onClick$={resetDemo}
              class="rounded-md bg-secondary-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-secondary-700 dark:bg-secondary-500 dark:hover:bg-secondary-600"
            >
              Reset Demo
            </button>
          </div>
        </div>

        {/* Scenario-Specific Instructions */}
        <div class="rounded-lg border border-info-200 dark:border-info-800 bg-info-50 dark:bg-info-950 p-4">
          <h3 class="mb-2 font-medium text-info-800 dark:text-info-200">
            Demo Instructions
          </h3>
          <div class="text-sm text-info-700 dark:text-info-300">
            {state.demoScenario === "basic" && (
              <p>Type any {state.length}-{state.type} PIN to see the completion handler in action.</p>
            )}
            {state.demoScenario === "totp" && (
              <p>Try entering "123456" for a successful authentication, or any other 6-digit code to see error handling.</p>
            )}
            {state.demoScenario === "product-key" && (
              <p>Valid keys: "ABC123" or "XYZ789". Try pasting a key or typing character by character.</p>
            )}
            {state.demoScenario === "secure-pin" && (
              <p>Wrong PINs: "1234" or "0000" (triggers error). Any other 4-digit PIN will succeed. Account locks after 3 failed attempts.</p>
            )}
          </div>
        </div>

        {/* Size Comparison */}
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
            Size Comparison
          </h3>
          <div class="grid gap-6 md:grid-cols-3">
            <div>
              <label class="mb-2 block text-sm font-medium text-text-default dark:text-text-dark-default">
                Small
              </label>
              <PinInput
                size="sm"
                length={4}
                value=""
                placeholder="0"
                onValueChange$={() => {}}
              />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-text-default dark:text-text-dark-default">
                Medium (Default)
              </label>
              <PinInput
                size="md"
                length={4}
                value=""
                placeholder="0"
                onValueChange$={() => {}}
              />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-text-default dark:text-text-dark-default">
                Large
              </label>
              <PinInput
                size="lg"
                length={4}
                value=""
                placeholder="0"
                onValueChange$={() => {}}
              />
            </div>
          </div>
        </div>

        {/* Input Type Comparison */}
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
            Input Type Comparison
          </h3>
          <div class="grid gap-6 md:grid-cols-2">
            <div>
              <label class="mb-2 block text-sm font-medium text-text-default dark:text-text-dark-default">
                Numeric Only (0-9)
              </label>
              <PinInput
                type="numeric"
                length={4}
                value=""
                placeholder="0"
                helperText="Only numbers allowed"
                onValueChange$={() => {}}
              />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-text-default dark:text-text-dark-default">
                Alphanumeric (A-Z, 0-9)
              </label>
              <PinInput
                type="alphanumeric"
                length={5}
                value=""
                placeholder="○"
                helperText="Letters and numbers allowed"
                onValueChange$={() => {}}
              />
            </div>
          </div>
        </div>

        {/* Layout Options */}
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
            Layout Options
          </h3>
          <div class="grid gap-6 md:grid-cols-2">
            <div>
              <label class="mb-2 block text-sm font-medium text-text-default dark:text-text-dark-default">
                Spaced Layout (Default)
              </label>
              <PinInput
                length={5}
                spaced={true}
                value=""
                placeholder="○"
                onValueChange$={() => {}}
              />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-text-default dark:text-text-dark-default">
                Compact Layout
              </label>
              <PinInput
                length={5}
                spaced={false}
                value=""
                placeholder="-"
                onValueChange$={() => {}}
              />
            </div>
          </div>
        </div>

        {/* State Examples */}
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
            Component States
          </h3>
          <div class="grid gap-6 md:grid-cols-2">
            <div>
              <label class="mb-2 block text-sm font-medium text-text-default dark:text-text-dark-default">
                Error State
              </label>
              <PinInput
                length={4}
                value=""
                error="Invalid PIN. Please try again."
                placeholder="0"
                onValueChange$={() => {}}
              />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-text-default dark:text-text-dark-default">
                Disabled State
              </label>
              <PinInput
                length={4}
                value="1234"
                disabled={true}
                placeholder="0"
                helperText="This input is disabled"
              />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-text-default dark:text-text-dark-default">
                Masked Input
              </label>
              <PinInput
                length={4}
                value="1234"
                mask={true}
                placeholder="●"
                helperText="Input is masked for security"
                onValueChange$={() => {}}
              />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-text-default dark:text-text-dark-default">
                Required Field
              </label>
              <PinInput
                length={4}
                value=""
                required={true}
                placeholder="0"
                helperText="This field is required"
                onValueChange$={() => {}}
              />
            </div>
          </div>
        </div>

        {/* Generated Code */}
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
            Generated Code
          </h3>
          <div class="rounded-md bg-gray-900 p-4">
            <pre class="text-sm text-gray-100 overflow-x-auto">
              <code>{`<PinInput
  value="${currentValue.value}"${state.length !== 4 ? `\n  length={${state.length}}` : ""}${state.type !== "numeric" ? `\n  type="${state.type}"` : ""}${state.mask ? `\n  mask={true}` : ""}${state.size !== "md" ? `\n  size="${state.size}"` : ""}${state.disabled ? `\n  disabled={true}` : ""}${state.required ? `\n  required={true}` : ""}${!state.autoFocus ? `\n  autoFocus={false}` : ""}${!state.selectOnFocus ? `\n  selectOnFocus={false}` : ""}${!state.spaced ? `\n  spaced={false}` : ""}${state.label ? `\n  label="${state.label}"` : ""}${state.helperText ? `\n  helperText="${state.helperText}"` : ""}${state.error ? `\n  error="${state.error}"` : ""}${state.placeholder !== "○" ? `\n  placeholder="${state.placeholder}"` : ""}
  onValueChange$={(value) => console.log(value)}
  onComplete$={(value) => console.log("Complete:", value)}
/>`}</code>
            </pre>
          </div>
        </div>
      </div>
    </PlaygroundTemplate>
  );
});