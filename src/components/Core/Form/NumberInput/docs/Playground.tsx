import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import {
  PlaygroundTemplate,
  type PropertyControl,
} from "~/components/Docs/templates";
import { NumberInput } from "../NumberInput";

/**
 * NumberInput component interactive playground
 */
export default component$(() => {
  // Playground state
  const state = useStore({
    // Basic props
    value: 42,
    placeholder: "Enter a number...",
    label: "Number Input",
    helperText: "Use steppers or type directly",
    error: "",
    
    // Constraints
    min: 0,
    max: 100,
    step: 1,
    precision: 0,
    
    // Behavior
    size: "md" as "sm" | "md" | "lg",
    disabled: false,
    readOnly: false,
    required: false,
    showSteppers: true,
    allowKeyboardStepping: true,
    allowNegative: true,
    clampValueOnBlur: true,
    stepperDelay: 50,
    
    // Custom formatting
    useFormatting: false,
    formatType: "currency" as "currency" | "percentage" | "custom",
  });

  // Demo values for different scenarios
  const currentValue = useSignal(state.value);
  const currencyValue = useSignal(99.99);
  const percentageValue = useSignal(85.5);
  const precisionValue = useSignal(3.14159);

  // Control definitions for the playground
  const controls: PropertyControl[] = [
    {
      name: "value",
      label: "Value",
      type: "number",
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
      name: "placeholder",
      label: "Placeholder",
      type: "text",
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
      name: "min",
      label: "Minimum Value",
      type: "number",
    },
    {
      name: "max",
      label: "Maximum Value",
      type: "number",
    },
    {
      name: "step",
      label: "Step Amount",
      type: "number",
    },
    {
      name: "precision",
      label: "Decimal Precision",
      type: "number",
    },
    {
      name: "disabled",
      label: "Disabled",
      type: "boolean",
    },
    {
      name: "readOnly",
      label: "Read Only",
      type: "boolean",
    },
    {
      name: "required",
      label: "Required",
      type: "boolean",
    },
    {
      name: "showSteppers",
      label: "Show Steppers",
      type: "boolean",
    },
    {
      name: "allowKeyboardStepping",
      label: "Allow Keyboard Stepping",
      type: "boolean",
    },
    {
      name: "allowNegative",
      label: "Allow Negative",
      type: "boolean",
    },
    {
      name: "clampValueOnBlur",
      label: "Clamp on Blur",
      type: "boolean",
    },
    {
      name: "stepperDelay",
      label: "Stepper Delay (ms)",
      type: "number",
    },
  ];

  // Custom formatters
  const formatCurrency = $((value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  });

  const formatPercentage = $((value: number) => {
    return `${value.toFixed(1)}%`;
  });

  const parseCurrency = $((value: string) => {
    const cleaned = value.replace(/[^0-9.-]/g, '');
    return parseFloat(cleaned);
  });

  const parsePercentage = $((value: string) => {
    const cleaned = value.replace('%', '');
    return parseFloat(cleaned);
  });

  // Event handlers
  const handleValueChange$ = $((value: number | undefined) => {
    if (value !== undefined) {
      currentValue.value = value;
      state.value = value;
    }
  });

  const handleControlChange$ = $((property: string, value: any) => {
    (state as any)[property] = value;
    if (property === 'value') {
      currentValue.value = value;
    }
  });

  return (
    <PlaygroundTemplate
      title="NumberInput Playground"
      description="Experiment with different NumberInput configurations and see how they affect the component's behavior and appearance."
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
            <NumberInput
              value={currentValue.value}
              min={state.min}
              max={state.max}
              step={state.step}
              precision={state.precision}
              size={state.size}
              disabled={state.disabled}
              readOnly={state.readOnly}
              required={state.required}
              showSteppers={state.showSteppers}
              allowKeyboardStepping={state.allowKeyboardStepping}
              allowNegative={state.allowNegative}
              clampValueOnBlur={state.clampValueOnBlur}
              stepperDelay={state.stepperDelay}
              label={state.label}
              placeholder={state.placeholder}
              helperText={state.helperText}
              error={state.error}
              onValueChange$={handleValueChange$}
            />
          </div>
          
          {/* Current State Display */}
          <div class="mt-6 rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
            <h4 class="mb-2 text-sm font-medium text-text-default dark:text-text-dark-default">
              Current State:
            </h4>
            <div class="grid gap-2 text-xs font-mono text-text-secondary dark:text-text-dark-secondary">
              <div>value: <span class="text-primary-600 dark:text-primary-400">{currentValue.value}</span></div>
              <div>min: <span class="text-primary-600 dark:text-primary-400">{state.min}</span></div>
              <div>max: <span class="text-primary-600 dark:text-primary-400">{state.max}</span></div>
              <div>step: <span class="text-primary-600 dark:text-primary-400">{state.step}</span></div>
              <div>precision: <span class="text-primary-600 dark:text-primary-400">{state.precision}</span></div>
            </div>
          </div>
        </div>

        {/* Size Variants Demo */}
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
            Size Variants
          </h3>
          <div class="grid gap-4 md:grid-cols-3">
            <div>
              <label class="mb-2 block text-sm font-medium text-text-default dark:text-text-dark-default">
                Small
              </label>
              <NumberInput
                size="sm"
                value={10}
                min={1}
                max={20}
                placeholder="Small size"
                onValueChange$={() => {}}
              />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-text-default dark:text-text-dark-default">
                Medium (Default)
              </label>
              <NumberInput
                size="md"
                value={50}
                min={1}
                max={100}
                placeholder="Medium size"
                onValueChange$={() => {}}
              />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-text-default dark:text-text-dark-default">
                Large
              </label>
              <NumberInput
                size="lg"
                value={75}
                min={1}
                max={100}
                placeholder="Large size"
                onValueChange$={() => {}}
              />
            </div>
          </div>
        </div>

        {/* Formatting Examples */}
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
            Custom Formatting Examples
          </h3>
          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <label class="mb-2 block text-sm font-medium text-text-default dark:text-text-dark-default">
                Currency Formatting
              </label>
              <NumberInput
                value={currencyValue.value}
                min={0}
                max={9999}
                step={0.01}
                precision={2}
                formatValue$={formatCurrency}
                parseValue$={parseCurrency}
                placeholder="$0.00"
                onValueChange$={(value) => {
                  if (value !== undefined) currencyValue.value = value;
                }}
              />
              <p class="mt-1 text-xs text-text-secondary dark:text-text-dark-secondary">
                Raw value: {currencyValue.value}
              </p>
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-text-default dark:text-text-dark-default">
                Percentage Formatting
              </label>
              <NumberInput
                value={percentageValue.value}
                min={0}
                max={100}
                step={0.1}
                precision={1}
                formatValue$={formatPercentage}
                parseValue$={parsePercentage}
                placeholder="0.0%"
                onValueChange$={(value) => {
                  if (value !== undefined) percentageValue.value = value;
                }}
              />
              <p class="mt-1 text-xs text-text-secondary dark:text-text-dark-secondary">
                Raw value: {percentageValue.value}
              </p>
            </div>
          </div>
        </div>

        {/* Precision Demo */}
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
            Precision Control
          </h3>
          <div class="grid gap-4 md:grid-cols-3">
            <div>
              <label class="mb-2 block text-sm font-medium text-text-default dark:text-text-dark-default">
                No Decimals (precision=0)
              </label>
              <NumberInput
                value={42}
                precision={0}
                step={1}
                placeholder="Integer only"
                onValueChange$={() => {}}
              />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-text-default dark:text-text-dark-default">
                2 Decimal Places
              </label>
              <NumberInput
                value={42.75}
                precision={2}
                step={0.01}
                placeholder="0.00"
                onValueChange$={() => {}}
              />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-text-default dark:text-text-dark-default">
                High Precision (5 places)
              </label>
              <NumberInput
                value={precisionValue.value}
                precision={5}
                step={0.00001}
                placeholder="0.00000"
                onValueChange$={(value) => {
                  if (value !== undefined) precisionValue.value = value;
                }}
              />
            </div>
          </div>
        </div>

        {/* States Demo */}
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
            Component States
          </h3>
          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <label class="mb-2 block text-sm font-medium text-text-default dark:text-text-dark-default">
                Error State
              </label>
              <NumberInput
                value={150}
                min={1}
                max={100}
                error="Value must be between 1 and 100"
                placeholder="Error example"
                onValueChange$={() => {}}
              />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-text-default dark:text-text-dark-default">
                Disabled State
              </label>
              <NumberInput
                value={25}
                disabled={true}
                placeholder="Disabled example"
                onValueChange$={() => {}}
              />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-text-default dark:text-text-dark-default">
                Read Only
              </label>
              <NumberInput
                value={75}
                readOnly={true}
                placeholder="Read only example"
                onValueChange$={() => {}}
              />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-text-default dark:text-text-dark-default">
                Without Steppers
              </label>
              <NumberInput
                value={50}
                showSteppers={false}
                placeholder="No steppers"
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
              <code>{`<NumberInput
  value={${currentValue.value}}${state.min !== undefined ? `
  min={${state.min}}` : ""}${state.max !== undefined ? `
  max={${state.max}}` : ""}${state.step !== 1 ? `
  step={${state.step}}` : ""}${state.precision !== 0 ? `
  precision={${state.precision}}` : ""}${state.size !== "md" ? `
  size="${state.size}"` : ""}${state.disabled ? `
  disabled={true}` : ""}${state.readOnly ? `
  readOnly={true}` : ""}${state.required ? `
  required={true}` : ""}${!state.showSteppers ? `
  showSteppers={false}` : ""}${!state.allowKeyboardStepping ? `
  allowKeyboardStepping={false}` : ""}${!state.allowNegative ? `
  allowNegative={false}` : ""}${!state.clampValueOnBlur ? `
  clampValueOnBlur={false}` : ""}${state.stepperDelay !== 50 ? `
  stepperDelay={${state.stepperDelay}}` : ""}${state.label ? `
  label="${state.label}"` : ""}${state.placeholder ? `
  placeholder="${state.placeholder}"` : ""}${state.helperText ? `
  helperText="${state.helperText}"` : ""}${state.error ? `
  error="${state.error}"` : ""}
  onValueChange$={(value) => console.log(value)}
/>`}</code>
            </pre>
          </div>
        </div>
      </div>
    </PlaygroundTemplate>
  );
});