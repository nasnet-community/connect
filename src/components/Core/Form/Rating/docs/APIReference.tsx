import { component$ } from "@builder.io/qwik";

/**
 * Rating Component API Reference
 * 
 * Complete documentation of all props, events, types, and interfaces
 * for the Rating component.
 */

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h1 class="mb-4 text-3xl font-bold text-text-default dark:text-text-dark-default">
          API Reference
        </h1>
        <p class="text-lg text-text-secondary dark:text-text-dark-secondary">
          Complete API documentation for the Rating component including all props, 
          events, and TypeScript interfaces.
        </p>
      </div>

      {/* Main Props */}
      <div>
        <h2 class="mb-4 text-2xl font-semibold text-text-default dark:text-text-dark-default">
          Props
        </h2>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse border border-border dark:border-border-dark">
            <thead>
              <tr class="bg-surface-light-secondary dark:bg-surface-dark-secondary">
                <th class="border border-border dark:border-border-dark p-3 text-left font-medium">Prop</th>
                <th class="border border-border dark:border-border-dark p-3 text-left font-medium">Type</th>
                <th class="border border-border dark:border-border-dark p-3 text-left font-medium">Default</th>
                <th class="border border-border dark:border-border-dark p-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-default dark:text-text-dark-default">value</td>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-primary-600 dark:text-primary-400">number</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-tertiary dark:text-text-dark-tertiary">-</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-secondary dark:text-text-dark-secondary">Current rating value (controlled mode)</td>
              </tr>
              <tr class="bg-surface-light-DEFAULT dark:bg-surface-dark-DEFAULT">
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-default dark:text-text-dark-default">defaultValue</td>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-primary-600 dark:text-primary-400">number</td>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-tertiary dark:text-text-dark-tertiary">0</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-secondary dark:text-text-dark-secondary">Default value for uncontrolled component</td>
              </tr>
              <tr>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-default dark:text-text-dark-default">max</td>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-primary-600 dark:text-primary-400">number</td>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-tertiary dark:text-text-dark-tertiary">5</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-secondary dark:text-text-dark-secondary">Maximum rating value</td>
              </tr>
              <tr class="bg-surface-light-DEFAULT dark:bg-surface-dark-DEFAULT">
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-default dark:text-text-dark-default">precision</td>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-primary-600 dark:text-primary-400">0.5 | 1</td>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-tertiary dark:text-text-dark-tertiary">1</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-secondary dark:text-text-dark-secondary">Rating precision (1 for full stars, 0.5 for half)</td>
              </tr>
              <tr>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-default dark:text-text-dark-default">size</td>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-primary-600 dark:text-primary-400">"sm" | "md" | "lg"</td>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-tertiary dark:text-text-dark-tertiary">"md"</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-secondary dark:text-text-dark-secondary">Size variant for the rating component</td>
              </tr>
              <tr class="bg-surface-light-DEFAULT dark:bg-surface-dark-DEFAULT">
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-default dark:text-text-dark-default">readOnly</td>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-primary-600 dark:text-primary-400">boolean</td>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-tertiary dark:text-text-dark-tertiary">false</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-secondary dark:text-text-dark-secondary">Whether the rating is read-only</td>
              </tr>
              <tr>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-default dark:text-text-dark-default">disabled</td>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-primary-600 dark:text-primary-400">boolean</td>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-tertiary dark:text-text-dark-tertiary">false</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-secondary dark:text-text-dark-secondary">Whether the rating is disabled</td>
              </tr>
              <tr class="bg-surface-light-DEFAULT dark:bg-surface-dark-DEFAULT">
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-default dark:text-text-dark-default">allowClear</td>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-primary-600 dark:text-primary-400">boolean</td>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-tertiary dark:text-text-dark-tertiary">false</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-secondary dark:text-text-dark-secondary">Allow clearing by clicking current value</td>
              </tr>
              <tr>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-default dark:text-text-dark-default">icon</td>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-primary-600 dark:text-primary-400">any</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-tertiary dark:text-text-dark-tertiary">-</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-secondary dark:text-text-dark-secondary">Custom icon for filled state</td>
              </tr>
              <tr class="bg-surface-light-DEFAULT dark:bg-surface-dark-DEFAULT">
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-default dark:text-text-dark-default">emptyIcon</td>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-primary-600 dark:text-primary-400">any</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-tertiary dark:text-text-dark-tertiary">-</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-secondary dark:text-text-dark-secondary">Custom icon for empty state</td>
              </tr>
              <tr>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-default dark:text-text-dark-default">labels</td>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-primary-600 dark:text-primary-400">string[]</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-tertiary dark:text-text-dark-tertiary">-</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-secondary dark:text-text-dark-secondary">Text labels for each rating value</td>
              </tr>
              <tr class="bg-surface-light-DEFAULT dark:bg-surface-dark-DEFAULT">
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-default dark:text-text-dark-default">showValue</td>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-primary-600 dark:text-primary-400">boolean</td>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-tertiary dark:text-text-dark-tertiary">false</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-secondary dark:text-text-dark-secondary">Show numeric value display</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Props */}
      <div>
        <h2 class="mb-4 text-2xl font-semibold text-text-default dark:text-text-dark-default">
          Form Props
        </h2>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse border border-border dark:border-border-dark">
            <thead>
              <tr class="bg-surface-light-secondary dark:bg-surface-dark-secondary">
                <th class="border border-border dark:border-border-dark p-3 text-left font-medium">Prop</th>
                <th class="border border-border dark:border-border-dark p-3 text-left font-medium">Type</th>
                <th class="border border-border dark:border-border-dark p-3 text-left font-medium">Default</th>
                <th class="border border-border dark:border-border-dark p-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-default dark:text-text-dark-default">label</td>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-primary-600 dark:text-primary-400">string</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-tertiary dark:text-text-dark-tertiary">-</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-secondary dark:text-text-dark-secondary">Field label text</td>
              </tr>
              <tr class="bg-surface-light-DEFAULT dark:bg-surface-dark-DEFAULT">
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-default dark:text-text-dark-default">helperText</td>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-primary-600 dark:text-primary-400">string</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-tertiary dark:text-text-dark-tertiary">-</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-secondary dark:text-text-dark-secondary">Helper text below the rating</td>
              </tr>
              <tr>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-default dark:text-text-dark-default">error</td>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-primary-600 dark:text-primary-400">string</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-tertiary dark:text-text-dark-tertiary">-</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-secondary dark:text-text-dark-secondary">Error message to display</td>
              </tr>
              <tr class="bg-surface-light-DEFAULT dark:bg-surface-dark-DEFAULT">
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-default dark:text-text-dark-default">required</td>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-primary-600 dark:text-primary-400">boolean</td>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-tertiary dark:text-text-dark-tertiary">false</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-secondary dark:text-text-dark-secondary">Whether the field is required</td>
              </tr>
              <tr>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-default dark:text-text-dark-default">name</td>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-primary-600 dark:text-primary-400">string</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-tertiary dark:text-text-dark-tertiary">-</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-secondary dark:text-text-dark-secondary">Name attribute for form submission</td>
              </tr>
              <tr class="bg-surface-light-DEFAULT dark:bg-surface-dark-DEFAULT">
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-default dark:text-text-dark-default">id</td>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-primary-600 dark:text-primary-400">string</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-tertiary dark:text-text-dark-tertiary">-</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-secondary dark:text-text-dark-secondary">Unique identifier for the component</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Event Handlers */}
      <div>
        <h2 class="mb-4 text-2xl font-semibold text-text-default dark:text-text-dark-default">
          Event Handlers
        </h2>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse border border-border dark:border-border-dark">
            <thead>
              <tr class="bg-surface-light-secondary dark:bg-surface-dark-secondary">
                <th class="border border-border dark:border-border-dark p-3 text-left font-medium">Handler</th>
                <th class="border border-border dark:border-border-dark p-3 text-left font-medium">Type</th>
                <th class="border border-border dark:border-border-dark p-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-default dark:text-text-dark-default">onValueChange$</td>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-primary-600 dark:text-primary-400">QRL&lt;(value: number | null) =&gt; void&gt;</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-secondary dark:text-text-dark-secondary">Called when the rating value changes</td>
              </tr>
              <tr class="bg-surface-light-DEFAULT dark:bg-surface-dark-DEFAULT">
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-default dark:text-text-dark-default">onChange$</td>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-primary-600 dark:text-primary-400">QRL&lt;(event: Event, value: number | null) =&gt; void&gt;</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-secondary dark:text-text-dark-secondary">Standard change handler with event object</td>
              </tr>
              <tr>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-default dark:text-text-dark-default">onHoverChange$</td>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-primary-600 dark:text-primary-400">QRL&lt;(value: number | null) =&gt; void&gt;</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-secondary dark:text-text-dark-secondary">Called when hover state changes</td>
              </tr>
              <tr class="bg-surface-light-DEFAULT dark:bg-surface-dark-DEFAULT">
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-default dark:text-text-dark-default">onFocus$</td>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-primary-600 dark:text-primary-400">QRL&lt;(event: FocusEvent) =&gt; void&gt;</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-secondary dark:text-text-dark-secondary">Called when component receives focus</td>
              </tr>
              <tr>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-default dark:text-text-dark-default">onBlur$</td>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-primary-600 dark:text-primary-400">QRL&lt;(event: FocusEvent) =&gt; void&gt;</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-secondary dark:text-text-dark-secondary">Called when component loses focus</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* TypeScript Interfaces */}
      <div>
        <h2 class="mb-4 text-2xl font-semibold text-text-default dark:text-text-dark-default">
          TypeScript Interfaces
        </h2>
        
        <div class="space-y-6">
          <div>
            <h3 class="mb-3 text-lg font-medium text-text-default dark:text-text-dark-default">
              RatingProps
            </h3>
            <div class="rounded-lg bg-gray-900 p-4">
              <pre class="text-sm text-gray-100 overflow-x-auto">
                <code>{`interface RatingProps {
  // Value props
  value?: number;
  defaultValue?: number;
  max?: number;
  precision?: 0.5 | 1;
  
  // Appearance props
  size?: "sm" | "md" | "lg";
  icon?: any;
  emptyIcon?: any;
  labels?: string[];
  showValue?: boolean;
  
  // State props
  readOnly?: boolean;
  disabled?: boolean;
  allowClear?: boolean;
  
  // Form props
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  name?: string;
  id?: string;
  
  // Style props
  class?: string;
  style?: CSSProperties;
  
  // Event handlers
  onValueChange$?: QRL<(value: number | null) => void>;
  onChange$?: QRL<(event: Event, value: number | null) => void>;
  onHoverChange$?: QRL<(value: number | null) => void>;
  onFocus$?: QRL<(event: FocusEvent) => void>;
  onBlur$?: QRL<(event: FocusEvent) => void>;
}`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h3 class="mb-3 text-lg font-medium text-text-default dark:text-text-dark-default">
              RatingSize
            </h3>
            <div class="rounded-lg bg-gray-900 p-4">
              <pre class="text-sm text-gray-100 overflow-x-auto">
                <code>{`type RatingSize = "sm" | "md" | "lg";

// Size configurations
interface SizeConfig {
  icon: string;     // Icon size classes
  label: string;    // Label text size
  helper: string;   // Helper text size
  spacing: string;  // Space between items
}`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h3 class="mb-3 text-lg font-medium text-text-default dark:text-text-dark-default">
              RatingPrecision
            </h3>
            <div class="rounded-lg bg-gray-900 p-4">
              <pre class="text-sm text-gray-100 overflow-x-auto">
                <code>{`type RatingPrecision = 0.5 | 1;

// 1 = Full stars only (1, 2, 3, 4, 5)
// 0.5 = Half-star precision (0.5, 1, 1.5, 2, 2.5, etc.)`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Navigation */}
      <div>
        <h2 class="mb-4 text-2xl font-semibold text-text-default dark:text-text-dark-default">
          Keyboard Navigation
        </h2>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse border border-border dark:border-border-dark">
            <thead>
              <tr class="bg-surface-light-secondary dark:bg-surface-dark-secondary">
                <th class="border border-border dark:border-border-dark p-3 text-left font-medium">Key</th>
                <th class="border border-border dark:border-border-dark p-3 text-left font-medium">Action</th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-default dark:text-text-dark-default">←↓</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-secondary dark:text-text-dark-secondary">Decrease rating by precision amount</td>
              </tr>
              <tr class="bg-surface-light-DEFAULT dark:bg-surface-dark-DEFAULT">
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-default dark:text-text-dark-default">→↑</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-secondary dark:text-text-dark-secondary">Increase rating by precision amount</td>
              </tr>
              <tr>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-default dark:text-text-dark-default">0-9</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-secondary dark:text-text-dark-secondary">Jump to specific rating value</td>
              </tr>
              <tr class="bg-surface-light-DEFAULT dark:bg-surface-dark-DEFAULT">
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-default dark:text-text-dark-default">Home</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-secondary dark:text-text-dark-secondary">Set to minimum value (0)</td>
              </tr>
              <tr>
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-default dark:text-text-dark-default">End</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-secondary dark:text-text-dark-secondary">Set to maximum value</td>
              </tr>
              <tr class="bg-surface-light-DEFAULT dark:bg-surface-dark-DEFAULT">
                <td class="border border-border dark:border-border-dark p-3 font-mono text-text-default dark:text-text-dark-default">Del/Backspace</td>
                <td class="border border-border dark:border-border-dark p-3 text-text-secondary dark:text-text-dark-secondary">Clear rating (if allowClear is enabled)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Accessibility */}
      <div>
        <h2 class="mb-4 text-2xl font-semibold text-text-default dark:text-text-dark-default">
          Accessibility Features
        </h2>
        <div class="space-y-4">
          <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4">
            <h3 class="mb-2 text-lg font-medium text-text-default dark:text-text-dark-default">
              ARIA Implementation
            </h3>
            <ul class="space-y-2 text-sm text-text-secondary dark:text-text-dark-secondary">
              <li>• <code>role="slider"</code> - Identifies as a slider widget</li>
              <li>• <code>aria-valuemin</code> - Minimum rating value (0)</li>
              <li>• <code>aria-valuemax</code> - Maximum rating value (max prop)</li>
              <li>• <code>aria-valuenow</code> - Current rating value</li>
              <li>• <code>aria-valuetext</code> - Human-readable value description</li>
              <li>• <code>aria-label</code> - Accessible name for the rating</li>
              <li>• <code>aria-describedby</code> - Associated helper/error text</li>
            </ul>
          </div>

          <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4">
            <h3 class="mb-2 text-lg font-medium text-text-default dark:text-text-dark-default">
              Screen Reader Support
            </h3>
            <ul class="space-y-2 text-sm text-text-secondary dark:text-text-dark-secondary">
              <li>• Announces current value and changes</li>
              <li>• Provides context about rating scale</li>
              <li>• Reads custom labels when available</li>
              <li>• Indicates required state and errors</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Example Usage */}
      <div>
        <h2 class="mb-4 text-2xl font-semibold text-text-default dark:text-text-dark-default">
          Example Usage
        </h2>
        <div class="rounded-lg bg-gray-900 p-4">
          <pre class="text-sm text-gray-100 overflow-x-auto">
            <code>{`import { component$, useSignal } from "@builder.io/qwik";
import { Rating } from "~/components/Core/Form/Rating";

export default component$(() => {
  const rating = useSignal(0);

  return (
    <Rating
      value={rating.value}
      onValueChange$={(value) => {
        rating.value = value || 0;
      }}
      max={5}
      precision={0.5}
      size="md"
      label="Rate your experience"
      helperText="Please rate from 1 to 5 stars"
      required
      showValue
      labels={["Poor", "Fair", "Good", "Very Good", "Excellent"]}
    />
  );
});`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
});