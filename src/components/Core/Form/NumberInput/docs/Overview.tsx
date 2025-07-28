import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates";

/**
 * NumberInput component overview documentation
 */
export default component$(() => {
  return (
    <OverviewTemplate
      title="NumberInput"
      description="A specialized input component designed for numeric values with built-in validation, formatting capabilities, and intuitive stepper controls for precise value adjustment."
      features={[
        {
          icon: "🔢",
          title: "Smart Validation",
          description: "Built-in min/max validation with real-time feedback and constraint enforcement."
        },
        {
          icon: "📱",
          title: "Mobile Optimized", 
          description: "Touch-friendly stepper controls with responsive sizing and gesture support."
        },
        {
          icon: "⚡",
          title: "Keyboard Navigation",
          description: "Full keyboard support with arrow keys, Enter/Escape, and accessibility features."
        },
        {
          icon: "💰",
          title: "Custom Formatting",
          description: "Support for currency, percentage, and custom number formatting patterns."
        },
        {
          icon: "🎯",
          title: "Precision Control",
          description: "Configurable decimal places and step intervals for exact value control."
        },
        {
          icon: "♿",
          title: "Accessible",
          description: "ARIA compliant with screen reader support and keyboard-only navigation."
        }
      ]}
      whenToUse={[
        "Perfect for quantity fields, pricing inputs, and numeric form controls",
        "Ideal for configuration values, thresholds, and numeric preferences",
        "Streamlined data entry for spreadsheets, tables, and data grids",
        "Currency inputs, percentage fields, and financial calculations"
      ]}
      keyFeatures={[
        {
          icon: "🎯",
          title: "Intuitive Interaction",
          description: "Stepper controls provide clear visual feedback and predictable behavior."
        },
        {
          icon: "🛡️",
          title: "Error Prevention",
          description: "Validates input in real-time to prevent invalid values and guide users."
        },
        {
          icon: "📱",
          title: "Mobile First",
          description: "Designed with touch interactions and mobile constraints in mind."
        },
        {
          icon: "🎨",
          title: "Flexibility", 
          description: "Adaptable to various numeric input scenarios while maintaining consistency."
        }
      ]}
    >
      <div class="mt-8 space-y-6">
        <div>
          <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
            Core Capabilities
          </h3>
          <div class="grid gap-4 md:grid-cols-2">
            <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4">
              <h4 class="mb-2 font-medium text-text-default dark:text-text-dark-default">
                Value Constraints
              </h4>
              <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
                Set minimum and maximum values with automatic validation. Values are clamped to bounds 
                and users receive immediate feedback for out-of-range inputs.
              </p>
            </div>
            <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4">
              <h4 class="mb-2 font-medium text-text-default dark:text-text-dark-default">
                Step Controls
              </h4>
              <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
                Configurable step intervals for precise value adjustment. Supports decimal steps 
                and continuous increment/decrement when holding stepper buttons.
              </p>
            </div>
            <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4">
              <h4 class="mb-2 font-medium text-text-default dark:text-text-dark-default">
                Format Flexibility
              </h4>
              <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
                Custom formatters for display values while maintaining numeric precision internally.
                Perfect for currency, percentages, and specialized numeric formats.
              </p>
            </div>
            <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4">
              <h4 class="mb-2 font-medium text-text-default dark:text-text-dark-default">
                Touch Interaction
              </h4>
              <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
                Large, touch-friendly stepper buttons with visual feedback. Optimized tap targets 
                and gesture support for mobile devices.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
            When to Use NumberInput
          </h3>
          <div class="space-y-3">
            <div class="flex items-start gap-3">
              <div class="mt-1 h-2 w-2 rounded-full bg-success-500"></div>
              <div>
                <p class="font-medium text-text-default dark:text-text-dark-default">
                  Numeric Values Only
                </p>
                <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
                  When you specifically need numeric input with validation and formatting.
                </p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="mt-1 h-2 w-2 rounded-full bg-success-500"></div>
              <div>
                <p class="font-medium text-text-default dark:text-text-dark-default">
                  Bounded Ranges
                </p>
                <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
                  For values with clear minimum and maximum constraints like quantities or percentages.
                </p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="mt-1 h-2 w-2 rounded-full bg-success-500"></div>
              <div>
                <p class="font-medium text-text-default dark:text-text-dark-default">
                  Step Increments
                </p>
                <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
                  When users benefit from precise stepping controls, especially on mobile devices.
                </p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="mt-1 h-2 w-2 rounded-full bg-success-500"></div>
              <div>
                <p class="font-medium text-text-default dark:text-text-dark-default">
                  Formatted Display
                </p>
                <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
                  For currency, percentage, or other formatted numeric representations.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
            When to Consider Alternatives
          </h3>
          <div class="space-y-3">
            <div class="flex items-start gap-3">
              <div class="mt-1 h-2 w-2 rounded-full bg-warning-500"></div>
              <div>
                <p class="font-medium text-text-default dark:text-text-dark-default">
                  Text with Numbers
                </p>
                <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
                  For mixed alphanumeric input like product codes, use a regular text Input.
                </p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="mt-1 h-2 w-2 rounded-full bg-warning-500"></div>
              <div>
                <p class="font-medium text-text-default dark:text-text-dark-default">
                  Large Ranges
                </p>
                <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
                  For very large ranges (1-10000), consider using a Slider with NumberInput combination.
                </p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="mt-1 h-2 w-2 rounded-full bg-warning-500"></div>
              <div>
                <p class="font-medium text-text-default dark:text-text-dark-default">
                  Simple Selection
                </p>
                <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
                  For picking from predefined numeric options, use a Select component instead.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
            Interaction Patterns
          </h3>
          <div class="grid gap-4 md:grid-cols-2">
            <div class="rounded-lg border border-info-200 dark:border-info-800 bg-info-50 dark:bg-info-950 p-4">
              <h4 class="mb-2 font-medium text-info-800 dark:text-info-200">
                Keyboard Interaction
              </h4>
              <ul class="space-y-1 text-sm text-info-700 dark:text-info-300">
                <li>• Arrow Up/Down: Increment/decrement by step</li>
                <li>• Page Up/Down: Large increments (10x step)</li>
                <li>• Home/End: Jump to min/max values</li>
                <li>• Enter: Confirm current value</li>
                <li>• Escape: Reset to original value</li>
              </ul>
            </div>
            <div class="rounded-lg border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-950 p-4">
              <h4 class="mb-2 font-medium text-primary-800 dark:text-primary-200">
                Touch Interaction
              </h4>
              <ul class="space-y-1 text-sm text-primary-700 dark:text-primary-300">
                <li>• Tap steppers: Single increment/decrement</li>
                <li>• Hold steppers: Continuous adjustment</li>
                <li>• Direct typing: Manual value entry</li>
                <li>• Swipe gestures: Quick value changes</li>
                <li>• Focus indicators: Clear interaction feedback</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </OverviewTemplate>
  );
});