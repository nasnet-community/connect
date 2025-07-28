import { component$ } from "@builder.io/qwik";
import { ExamplesTemplate, type Example } from "~/components/Docs/templates";
import { BasicNumberInput } from "../Examples/BasicNumberInput";

/**
 * NumberInput component examples documentation
 */
export default component$(() => {
  const examples: Example[] = [
    {
      title: "Basic Number Input",
      description: "Simple number input with validation, steppers, and basic constraints. Shows fundamental usage patterns.",
      component: <BasicNumberInput />,
      code: `import { component$, useSignal } from "@builder.io/qwik";
import { NumberInput } from "~/components/Core/Form";

export default component$(() => {
  const quantity = useSignal(1);

  return (
    <NumberInput
      label="Quantity"
      value={quantity.value}
      min={1}
      max={99}
      step={1}
      onValueChange$={(value) => {
        if (value !== undefined) quantity.value = value;
      }}
      placeholder="Enter quantity..."
      helperText="Min: 1, Max: 99"
    />
  );
});`
    },
    {
      title: "Currency Input with Formatting",
      description: "Demonstrates custom formatting for currency values with proper parsing and decimal precision.",
      component: (
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <p class="mb-4 text-text-secondary dark:text-text-dark-secondary">
            This example shows how to implement currency formatting:
          </p>
          <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
            <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
              <code>{`const formatCurrency = $((value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
});

const parseCurrency = $((value: string) => {
  // Remove currency symbols and parse
  const cleaned = value.replace(/[^\\d.-]/g, '');
  return parseFloat(cleaned) || 0;
});

<NumberInput
  label="Price"
  value={price.value}
  min={0}
  max={999999}
  step={0.01}
  precision={2}
  formatValue$={formatCurrency}
  parseValue$={parseCurrency}
  onValueChange$={(value) => {
    if (value !== undefined) price.value = value;
  }}
  placeholder="$0.00"
  helperText="Enter price in USD"
/>`}</code>
            </pre>
          </div>
        </div>
      )
    },
    {
      title: "Form Integration & Validation",
      description: "Shows how to integrate NumberInput with form validation, error handling, and submission.",
      component: (
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <p class="mb-4 text-text-secondary dark:text-text-dark-secondary">
            Complete form integration with validation:
          </p>
          <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
            <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
              <code>{`export default component$(() => {
  const formData = useStore({
    age: undefined as number | undefined,
    salary: undefined as number | undefined,
    experience: undefined as number | undefined
  });

  const errors = useStore({
    age: "",
    salary: "",
    experience: ""
  });

  const validateAge = $((value: number | undefined) => {
    if (!value) {
      errors.age = "Age is required";
    } else if (value < 18) {
      errors.age = "Must be at least 18 years old";
    } else if (value > 120) {
      errors.age = "Please enter a valid age";
    } else {
      errors.age = "";
    }
  });

  return (
    <form preventdefault:submit onSubmit$={handleSubmit}>
      <NumberInput
        label="Age *"
        value={formData.age}
        min={18}
        max={120}
        step={1}
        required={true}
        error={errors.age}
        onValueChange$={(value) => {
          formData.age = value;
          validateAge(value);
        }}
        placeholder="Enter your age"
        helperText="Must be between 18 and 120"
      />
      
      <NumberInput
        label="Annual Salary"
        value={formData.salary}
        min={0}
        step={1000}
        formatValue$={formatCurrency}
        parseValue$={parseCurrency}
        onValueChange$={(value) => {
          formData.salary = value;
        }}
        placeholder="$0"
        helperText="Optional - for salary calculations"
      />
      
      <button type="submit">Submit</button>
    </form>
  );
});`}</code>
            </pre>
          </div>
        </div>
      )
    },
    {
      title: "Percentage & Precision Control",
      description: "Advanced examples showing percentage formatting and decimal precision control for various use cases.",
      component: (
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <p class="mb-4 text-text-secondary dark:text-text-dark-secondary">
            Precision control for different numeric scenarios:
          </p>
          <div class="space-y-4">
            <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
              <h4 class="mb-2 text-sm font-medium text-text-default dark:text-text-dark-default">
                Percentage Input
              </h4>
              <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
                <code>{`const formatPercentage = $((value: number) => {
  return \`\${value.toFixed(1)}%\`;
});

<NumberInput
  label="Discount Rate"
  value={discount.value}
  min={0}
  max={100}
  step={0.1}
  precision={1}
  formatValue$={formatPercentage}
  parseValue$={(value) => parseFloat(value.replace('%', ''))}
  onValueChange$={(value) => {
    if (value !== undefined) discount.value = value;
  }}
/>`}</code>
              </pre>
            </div>
            <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
              <h4 class="mb-2 text-sm font-medium text-text-default dark:text-text-dark-default">
                Scientific Precision
              </h4>
              <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
                <code>{`<NumberInput
  label="Measurement (mm)"
  value={measurement.value}
  min={0}
  step={0.001}
  precision={3}
  onValueChange$={(value) => {
    if (value !== undefined) measurement.value = value;
  }}
  helperText="Precision to 0.001mm"
/>`}</code>
              </pre>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Mobile-Optimized Design",
      description: "Mobile-first design patterns with touch-friendly interfaces and responsive behavior.",
      component: (
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <p class="mb-4 text-text-secondary dark:text-text-dark-secondary">
            Mobile optimization techniques for better touch experience:
          </p>
          <div class="space-y-4">
            <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
              <h4 class="mb-2 text-sm font-medium text-text-default dark:text-text-dark-default">
                Large Touch Targets
              </h4>
              <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
                <code>{`<NumberInput
  label="Mobile Quantity"
  value={quantity.value}
  min={1}
  max={999}
  size="lg"  // Larger for mobile
  stepperDelay={100}  // Slower for mobile
  onValueChange$={(value) => {
    if (value !== undefined) {
      quantity.value = value;
      // Haptic feedback on mobile
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
    }
  }}
  class="mobile:min-h-[56px]"  // Extra height on mobile
  helperText="Use + and - buttons for easy adjustment"
/>`}</code>
              </pre>
            </div>
            <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
              <h4 class="mb-2 text-sm font-medium text-text-default dark:text-text-dark-default">
                Responsive Behavior
              </h4>
              <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
                <code>{`// Adaptive step size based on screen size
const getStepSize = () => {
  return window.innerWidth < 768 ? 1 : 0.1;  // Larger steps on mobile
};

<NumberInput
  label="Settings Value"
  value={setting.value}
  step={getStepSize()}
  size={isMobile ? "lg" : "md"}
  showSteppers={true}  // Always show on mobile
  allowKeyboardStepping={!isMobile}  // Disable on mobile
  onValueChange$={(value) => {
    if (value !== undefined) setting.value = value;
  }}
/>`}</code>
              </pre>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <div class="mb-8">
        <p class="text-text-secondary dark:text-text-dark-secondary">
          The NumberInput component provides flexible numeric input handling with built-in validation, 
          custom formatting, and mobile-optimized interactions. These examples demonstrate key patterns 
          from basic usage to advanced formatting and mobile optimization.
        </p>
      </div>

      <div class="mb-8 rounded-lg border border-info-200 dark:border-info-800 bg-info-50 dark:bg-info-950 p-4">
        <h3 class="mb-2 font-medium text-info-800 dark:text-info-200">
          💡 Implementation Tips
        </h3>
        <ul class="space-y-1 text-sm text-info-700 dark:text-info-300">
          <li>• Set appropriate min/max constraints to guide user input</li>
          <li>• Use logical step values (1 for integers, 0.01 for currency, 0.1 for percentages)</li>
          <li>• Enable clampValueOnBlur to automatically correct out-of-range values</li>
          <li>• Consider size="lg" for mobile-first interfaces</li>
          <li>• Use custom formatters for currency, percentage, and specialized number displays</li>
          <li>• Implement proper validation with helpful error messages</li>
        </ul>
      </div>

      <div class="mb-8 rounded-lg border border-success-200 dark:border-success-800 bg-success-50 dark:bg-success-950 p-4">
        <h3 class="mb-2 font-medium text-success-800 dark:text-success-200">
          ✅ Best Practices
        </h3>
        <ul class="space-y-1 text-sm text-success-700 dark:text-success-300">
          <li>• Provide clear labels and helper text describing constraints</li>
          <li>• Use steppers for small ranges and precise adjustments</li>
          <li>• Implement real-time validation with immediate feedback</li>
          <li>• Test keyboard navigation (arrow keys, Page Up/Down, Home/End)</li>
          <li>• Ensure proper ARIA attributes for accessibility</li>
          <li>• Consider locale-specific formatting for international apps</li>
        </ul>
      </div>

      <div class="rounded-lg border border-warning-200 dark:border-warning-800 bg-warning-50 dark:bg-warning-950 p-4">
        <h3 class="mb-2 font-medium text-warning-800 dark:text-warning-200">
          ⚠️ Common Pitfalls
        </h3>
        <ul class="space-y-1 text-sm text-warning-700 dark:text-warning-300">
          <li>• Not setting appropriate min/max bounds</li>
          <li>• Using step values that don't align with precision</li>
          <li>• Forgetting to handle undefined values in onValueChange</li>
          <li>• Poor mobile touch target sizing</li>
          <li>• Inconsistent formatting between display and storage</li>
          <li>• Missing validation for edge cases (NaN, Infinity)</li>
        </ul>
      </div>
    </ExamplesTemplate>
  );
});