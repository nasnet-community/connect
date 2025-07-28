import { component$ } from "@builder.io/qwik";
import {
  UsageTemplate,
  type UsageGuideline,
  type BestPractice,
  type AccessibilityTip,
} from "~/components/Docs/templates";

/**
 * NumberInput component usage guidelines and best practices
 */
export default component$(() => {
  const guidelines: UsageGuideline[] = [
    {
      title: "Set Appropriate Constraints",
      description: "Always define meaningful min/max values to guide user input and prevent errors.",
      example: "For quantity fields, set min=1 and max based on inventory. For percentages, use min=0 and max=100."
    },
    {
      title: "Choose Logical Step Values", 
      description: "Select step increments that make sense for your use case and user workflow.",
      example: "Use step=1 for quantities, step=0.01 for currency, step=5 or 10 for large ranges."
    },
    {
      title: "Consider Mobile Users",
      description: "Enable steppers and use appropriate sizing for touch-friendly interactions on mobile devices.",
      example: "Use size='lg' for mobile-primary interfaces and ensure stepper buttons are easily tappable."
    },
    {
      title: "Provide Clear Feedback",
      description: "Use helper text and error messages to communicate constraints and validation rules.",
      example: "Show 'Min: 1, Max: 100' in helper text and display specific error messages for out-of-range values."
    }
  ];

  const bestPractices: BestPractice[] = [
    {
      title: "UX Design Best Practices",
      description: "Guidelines for creating user-friendly number inputs",
      category: "UX Design",
      practices: [
        {
          title: "Use Steppers for Small Ranges",
          description: "Enable steppers when the range is relatively small and users benefit from precise control.",
          correct: "Quantity selector with 1-20 range using steppers",
          incorrect: "Age input with 1-100 range relying only on steppers"
        },
        {
          title: "Format for Clarity",
          description: "Use appropriate formatting to help users understand the expected input format.",
          correct: "Currency displayed as '$1,234.56' with proper locale formatting",
          incorrect: "Raw numbers '1234.56' for currency without context"
        },
        {
          title: "Validate in Real-Time",
          description: "Provide immediate feedback as users type or use steppers.",
          correct: "Show error immediately when value exceeds maximum",
          incorrect: "Wait until form submission to show validation errors"
        }
      ]
    },
    {
      title: "Performance Best Practices",
      description: "Optimize number inputs for speed and efficiency",
      category: "Performance",
      practices: [
        {
          title: "Debounce Value Changes",
          description: "For expensive operations, debounce the onValueChange callback.",
          correct: "Debounce API calls triggered by value changes by 300-500ms",
          incorrect: "Make API calls on every keystroke or stepper click"
        },
        {
          title: "Optimize Step Operations",
          description: "Use efficient step calculations for smooth continuous stepping.",
          correct: "Calculate steps mathematically rather than repeatedly adding",
          incorrect: "Perform multiple small increments for large step changes"
        },
        {
          title: "Minimize Re-renders",
          description: "Structure callbacks to prevent unnecessary component re-renders.",
          correct: "Use useCallback for stable function references",
          incorrect: "Create new callback functions on every render"
        }
      ]
    },
    {
      title: "Accessibility Best Practices",
      description: "Ensure number inputs are usable by everyone",
      category: "Accessibility",
      practices: [
        {
          title: "Label Everything",
          description: "Provide clear labels and descriptions for all interactive elements.",
          correct: "Label the input and provide aria-label for stepper buttons",
          incorrect: "Rely only on placeholder text or visual cues"
        },
        {
          title: "Support Keyboard Navigation",
          description: "Ensure all functionality is accessible via keyboard.",
          correct: "Arrow keys work for stepping, Enter confirms values",
          incorrect: "Require mouse interaction for stepper controls"
        },
        {
          title: "Announce Changes",
          description: "Ensure screen readers announce value changes and validation states.",
          correct: "Use aria-live regions for dynamic value updates",
          incorrect: "Silent updates that screen readers miss"
        }
      ]
    }
  ];

  const accessibilityTips: AccessibilityTip[] = [
    {
      title: "ARIA Attributes",
      description: "Use proper ARIA attributes to communicate the input's purpose and constraints.",
      implementation: `<NumberInput
  label="Age"
  min={18}
  max={120}
  aria-describedby="age-help"
  helperText="Must be between 18 and 120"
/>`
    },
    {
      title: "Keyboard Support",
      description: "Implement comprehensive keyboard navigation for all number input functionality.",
      implementation: `// Supported keyboard interactions:
// Arrow Up/Down: Step increment/decrement
// Page Up/Down: Large increments (10x step)
// Home/End: Jump to min/max values
// Enter: Confirm current value
// Escape: Reset to original value`
    },
    {
      title: "Screen Reader Announcements",
      description: "Ensure value changes and validation messages are properly announced.",
      implementation: `<NumberInput
  value={quantity}
  onValueChange$={(value) => {
    setQuantity(value);
    // Screen readers will announce the new value
  }}
  error={error}
  aria-invalid={!!error}
/>`
    },
    {
      title: "Focus Management",
      description: "Provide clear focus indicators and logical focus flow.",
      implementation: `// Focus returns to input after stepper interaction
// Visual focus indicators are clearly visible
// Tab order follows logical sequence: input → steppers → next element`
    }
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
    >
      <div class="mb-8">
        <h2 class="mb-4 text-xl font-semibold text-text-default dark:text-text-dark-default">
          When to Use NumberInput
        </h2>
        <div class="grid gap-4 md:grid-cols-2">
          <div class="rounded-lg border border-success-200 dark:border-success-800 bg-success-50 dark:bg-success-950 p-4">
            <h3 class="mb-2 font-medium text-success-800 dark:text-success-200">
              ✅ Perfect For
            </h3>
            <ul class="space-y-1 text-sm text-success-700 dark:text-success-300">
              <li>• Quantity inputs with min/max constraints</li>
              <li>• Currency and price fields</li>
              <li>• Percentage and ratio inputs</li>
              <li>• Settings and configuration values</li>
              <li>• Numeric form fields with validation</li>
              <li>• Mobile-first numeric input</li>
            </ul>
          </div>
          
          <div class="rounded-lg border border-warning-200 dark:border-warning-800 bg-warning-50 dark:bg-warning-950 p-4">
            <h3 class="mb-2 font-medium text-warning-800 dark:text-warning-200">
              ⚠️ Consider Alternatives For
            </h3>
            <ul class="space-y-1 text-sm text-warning-700 dark:text-warning-300">
              <li>• Very large ranges (consider Slider)</li>
              <li>• ID numbers or codes (use Text Input)</li>
              <li>• Phone numbers (use specialized Phone Input)</li>
              <li>• Predefined numeric options (use Select)</li>
              <li>• Binary numeric choices (use Toggle/Switch)</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="mb-4 text-xl font-semibold text-text-default dark:text-text-dark-default">
          Common Use Cases
        </h2>
        
        <div class="space-y-6">
          <div>
            <h3 class="mb-3 text-lg font-medium text-text-default dark:text-text-dark-default">
              E-commerce Quantity Selector
            </h3>
            <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
              <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
                <code>{`<NumberInput
  label="Quantity"
  min={1}
  max={stockQuantity}
  step={1}
  value={cartQuantity}
  onValueChange$={(value) => updateCartQuantity(value)}
  size="lg" // Better for mobile shopping
  helperText={\`Max available: \${stockQuantity}\`}
/>`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h3 class="mb-3 text-lg font-medium text-text-default dark:text-text-dark-default">
              Financial Application
            </h3>
            <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
              <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
                <code>{`const formatCurrency = $((value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(value);
});

<NumberInput
  label="Investment Amount"
  min={100}
  max={1000000}
  step={50}
  precision={2}
  formatValue$={formatCurrency}
  value={investmentAmount}
  onValueChange$={(value) => calculateReturns(value)}
  helperText="Minimum investment: $100"
/>`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h3 class="mb-3 text-lg font-medium text-text-default dark:text-text-dark-default">
              Configuration Settings
            </h3>
            <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
              <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
                <code>{`<NumberInput
  label="Cache Size (MB)"
  min={10}
  max={1024}
  step={10}
  value={cacheSize}
  onValueChange$={(value) => updateCacheSize(value)}
  helperText="Recommended: 256-512 MB"
  showSteppers={true}
  allowKeyboardStepping={true}
/>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="mb-4 text-xl font-semibold text-text-default dark:text-text-dark-default">
          Mobile Optimization Guidelines
        </h2>
        <div class="grid gap-4 md:grid-cols-2">
          <div class="space-y-3">
            <h3 class="font-medium text-text-default dark:text-text-dark-default">
              Touch Interaction
            </h3>
            <ul class="space-y-2 text-sm text-text-secondary dark:text-text-dark-secondary">
              <li>• Use size="lg" for better touch targets</li>
              <li>• Enable steppers for easier value adjustment</li>
              <li>• Provide immediate visual feedback on tap</li>
              <li>• Consider haptic feedback for stepper interactions</li>
            </ul>
          </div>
          <div class="space-y-3">
            <h3 class="font-medium text-text-default dark:text-text-dark-default">
              Input Method
            </h3>
            <ul class="space-y-2 text-sm text-text-secondary dark:text-text-dark-secondary">
              <li>• Trigger numeric keyboard on mobile devices</li>
              <li>• Allow both typing and stepper interaction</li>
              <li>• Handle virtual keyboard display changes</li>
              <li>• Provide clear value formatting</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="mb-4 text-xl font-semibold text-text-default dark:text-text-dark-default">
          Validation Strategies
        </h2>
        
        <div class="space-y-4">
          <div class="rounded-lg border border-info-200 dark:border-info-800 bg-info-50 dark:bg-info-950 p-4">
            <h3 class="mb-2 font-medium text-info-800 dark:text-info-200">
              Real-time Validation
            </h3>
            <p class="text-sm text-info-700 dark:text-info-300">
              Validate values as users type or use steppers. Show immediate feedback for out-of-range values
              and provide helpful guidance about valid ranges.
            </p>
          </div>
          
          <div class="rounded-lg border border-success-200 dark:border-success-800 bg-success-50 dark:bg-success-950 p-4">
            <h3 class="mb-2 font-medium text-success-800 dark:text-success-200">
              Auto-correction
            </h3>
            <p class="text-sm text-success-700 dark:text-success-300">
              Use <code>clampValueOnBlur</code> to automatically correct out-of-range values to the nearest
              valid value. This provides a forgiving user experience while maintaining data integrity.
            </p>
          </div>
          
          <div class="rounded-lg border border-warning-200 dark:border-warning-800 bg-warning-50 dark:bg-warning-950 p-4">
            <h3 class="mb-2 font-medium text-warning-800 dark:text-warning-200">
              Progressive Disclosure
            </h3>
            <p class="text-sm text-warning-700 dark:text-warning-300">
              Start with basic constraints and reveal more specific validation rules as needed.
              Avoid overwhelming users with too many restrictions upfront.
            </p>
          </div>
        </div>
      </div>

      <div class="rounded-lg border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-950 p-6">
        <h2 class="mb-4 text-xl font-semibold text-primary-800 dark:text-primary-200">
          Implementation Checklist
        </h2>
        <div class="grid gap-4 md:grid-cols-2">
          <div>
            <h3 class="mb-2 font-medium text-primary-800 dark:text-primary-200">
              Basic Setup
            </h3>
            <ul class="space-y-1 text-sm text-primary-700 dark:text-primary-300">
              <li>☐ Set appropriate min/max values</li>
              <li>☐ Choose logical step increment</li>
              <li>☐ Add descriptive label and helper text</li>
              <li>☐ Configure precision for decimal values</li>
            </ul>
          </div>
          <div>
            <h3 class="mb-2 font-medium text-primary-800 dark:text-primary-200">
              Enhanced Features
            </h3>
            <ul class="space-y-1 text-sm text-primary-700 dark:text-primary-300">
              <li>☐ Add custom formatting if needed</li>
              <li>☐ Implement validation error handling</li>
              <li>☐ Test keyboard navigation</li>
              <li>☐ Verify mobile touch interactions</li>
            </ul>
          </div>
        </div>
      </div>
    </UsageTemplate>
  );
});