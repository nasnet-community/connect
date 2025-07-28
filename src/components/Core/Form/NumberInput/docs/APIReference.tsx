import { component$ } from "@builder.io/qwik";
import {
  APIReferenceTemplate,
  type PropDetail,
  type EventDetail,
  type MethodDetail,
} from "~/components/Docs/templates";

/**
 * NumberInput component API reference documentation
 */
export default component$(() => {
  const props: PropDetail[] = [
    {
      name: "value",
      type: "number",
      description: "Current numeric value of the input",
    },
    {
      name: "onValueChange$",
      type: "QRL<(value: number | undefined) => void>",
      description: "Callback fired when the numeric value changes",
    },
    {
      name: "min",
      type: "number",
      description: "Minimum allowed value for validation and stepper controls",
    },
    {
      name: "max",
      type: "number",
      description: "Maximum allowed value for validation and stepper controls",
    },
    {
      name: "step",
      type: "number",
      defaultValue: "1",
      description: "Amount to increment/decrement when using stepper controls or arrow keys",
    },
    {
      name: "precision",
      type: "number",
      defaultValue: "0",
      description: "Number of decimal places to display and maintain precision",
    },
    {
      name: "label",
      type: "string",
      description: "Label text displayed above the input field",
    },
    {
      name: "placeholder",
      type: "string",
      description: "Placeholder text shown when input is empty",
    },
    {
      name: "helperText",
      type: "string",
      description: "Helper text displayed below the input field",
    },
    {
      name: "error",
      type: "string",
      description: "Error message to display when validation fails",
    },
    {
      name: "id",
      type: "string",
      description: "HTML id attribute for the input element",
    },
    {
      name: "name",
      type: "string",
      description: "HTML name attribute for form submission",
    },
    {
      name: "required",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the input is required for form validation",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the input and steppers are disabled",
    },
    {
      name: "readOnly",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the input is read-only (steppers hidden)",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: "Size variant of the input and steppers",
    },
    {
      name: "showSteppers",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to display increment/decrement stepper buttons",
    },
    {
      name: "allowKeyboardStepping",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to allow arrow key increment/decrement",
    },
    {
      name: "formatValue$",
      type: "QRL<(value: number) => string>",
      description: "Custom formatter for display value (e.g., currency, percentage)",
    },
    {
      name: "parseValue$",
      type: "QRL<(value: string) => number | undefined>",
      description: "Custom parser for converting formatted strings back to numbers",
    },
    {
      name: "allowNegative",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to allow negative numbers",
    },
    {
      name: "clampValueOnBlur",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to automatically clamp value to min/max range on blur",
    },
    {
      name: "stepperDelay",
      type: "number",
      defaultValue: "50",
      description: "Delay in milliseconds for continuous stepping when holding stepper buttons",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes for the wrapper element",
    },
  ];

  const events: EventDetail[] = [
    {
      name: "onValueChange$",
      parameters: [
        {
          name: "value",
          type: "number | undefined",
          description: "The new numeric value, or undefined if input is invalid"
        }
      ],
      description: "Fired when the numeric value changes through typing, steppers, or keyboard navigation",
    },
    {
      name: "formatValue$",
      parameters: [
        {
          name: "value",
          type: "number",
          description: "The numeric value to format for display"
        }
      ],
      description: "Custom function to format numeric values for display",
      returnType: "string",
    },
    {
      name: "parseValue$",
      parameters: [
        {
          name: "value",
          type: "string",
          description: "The formatted string to parse back to a number"
        }
      ],
      description: "Custom function to parse formatted display strings back to numeric values",
      returnType: "number | undefined",
    },
  ];

  const methods: MethodDetail[] = [
    // NumberInput doesn't expose public methods directly
  ];

  return (
    <APIReferenceTemplate 
      props={props} 
      events={events} 
      methods={methods}
    >
      <div class="mb-8">
        <p class="text-text-secondary dark:text-text-dark-secondary">
          The NumberInput component provides a robust interface for numeric input with built-in validation, 
          formatting capabilities, and intuitive stepper controls optimized for both desktop and mobile interactions.
        </p>
      </div>

      {/* Type Definitions */}
      <div class="mt-8">
        <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
          Type Definitions
        </h3>
        
        <div class="space-y-6">
          <div>
            <h4 class="mb-3 text-base font-medium text-text-default dark:text-text-dark-default">
              NumberInputSize
            </h4>
            <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
              <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
                <code>{`type NumberInputSize = "sm" | "md" | "lg";`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h4 class="mb-3 text-base font-medium text-text-default dark:text-text-dark-default">
              Size Specifications
            </h4>
            <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
              <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
                <code>{`// Size variants with mobile-optimized dimensions
sm: {
  input: "h-9 mobile:h-10 text-sm px-2 pr-8",
  stepper: "w-6 h-4 mobile:w-8 mobile:h-5"
}

md: {
  input: "h-10 mobile:h-11 px-3 pr-10",
  stepper: "w-8 h-5 mobile:w-9 mobile:h-6" 
}

lg: {
  input: "h-12 mobile:h-14 text-lg px-4 pr-12",
  stepper: "w-10 h-6 mobile:w-11 mobile:h-7"
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Validation Behavior */}
      <div class="mt-8">
        <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
          Validation Behavior
        </h3>
        
        <div class="space-y-4">
          <div class="rounded-lg border border-info-200 dark:border-info-800 bg-info-50 dark:bg-info-950 p-4">
            <h4 class="mb-2 font-medium text-info-800 dark:text-info-200">
              Range Validation
            </h4>
            <p class="text-sm text-info-700 dark:text-info-300">
              Values are automatically validated against min/max constraints. When <code>clampValueOnBlur</code> 
              is enabled (default), out-of-range values are automatically adjusted to the nearest valid value on blur.
            </p>
          </div>
          
          <div class="rounded-lg border border-warning-200 dark:border-warning-800 bg-warning-50 dark:bg-warning-950 p-4">
            <h4 class="mb-2 font-medium text-warning-800 dark:text-warning-200">
              Precision Handling
            </h4>
            <p class="text-sm text-warning-700 dark:text-warning-300">
              The <code>precision</code> prop controls decimal places for display and storage. Internal calculations 
              maintain full precision to prevent rounding errors during step operations.
            </p>
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div class="mt-8">
        <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
          Usage Examples
        </h3>
        
        <div class="space-y-6">
          <div>
            <h4 class="mb-3 text-base font-medium text-text-default dark:text-text-dark-default">
              Basic Number Input
            </h4>
            <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
              <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
                <code>{`import { NumberInput } from "~/components/Core/Form";

<NumberInput
  label="Quantity"
  min={1}
  max={100}
  step={1}
  value={quantity}
  onValueChange$={(value) => setQuantity(value)}
  placeholder="Enter quantity"
  helperText="Min: 1, Max: 100"
/>`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h4 class="mb-3 text-base font-medium text-text-default dark:text-text-dark-default">
              Currency Input with Formatting
            </h4>
            <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
              <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
                <code>{`const formatCurrency = $((value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
});

const parseCurrency = $((value: string) => {
  const cleaned = value.replace(/[^\\d.-]/g, '');
  return parseFloat(cleaned);
});

<NumberInput
  label="Price"
  min={0}
  step={0.01}
  precision={2}
  formatValue$={formatCurrency}
  parseValue$={parseCurrency}
  value={price}
  onValueChange$={(value) => setPrice(value)}
/>`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h4 class="mb-3 text-base font-medium text-text-default dark:text-text-dark-default">
              Percentage Input
            </h4>
            <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
              <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
                <code>{`<NumberInput
  label="Discount Percentage"
  min={0}
  max={100}
  step={0.1}
  precision={1}
  formatValue$={(value) => \`\${value}%\`}
  parseValue$={(value) => parseFloat(value.replace('%', ''))}
  value={discount}
  onValueChange$={(value) => setDiscount(value)}
  size="lg"
/>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Accessibility Features */}
      <div class="mt-8">
        <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
          Accessibility Features
        </h3>
        
        <div class="grid gap-4 md:grid-cols-2">
          <div class="rounded-lg border border-success-200 dark:border-success-800 bg-success-50 dark:bg-success-950 p-4">
            <h4 class="mb-2 font-medium text-success-800 dark:text-success-200">
              Keyboard Navigation
            </h4>
            <ul class="space-y-1 text-sm text-success-700 dark:text-success-300">
              <li>• Arrow keys for step increment/decrement</li>
              <li>• Page Up/Down for large steps (10x)</li>
              <li>• Home/End for min/max values</li>
              <li>• Tab navigation between elements</li>
            </ul>
          </div>
          
          <div class="rounded-lg border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-950 p-4">
            <h4 class="mb-2 font-medium text-primary-800 dark:text-primary-200">
              Screen Reader Support
            </h4>
            <ul class="space-y-1 text-sm text-primary-700 dark:text-primary-300">
              <li>• ARIA attributes for current value</li>
              <li>• Min/max range announcements</li>
              <li>• Error and validation messages</li>
              <li>• Stepper button descriptions</li>
            </ul>
          </div>
        </div>
      </div>
    </APIReferenceTemplate>
  );
});