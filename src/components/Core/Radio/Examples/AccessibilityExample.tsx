import { component$, useSignal, useId, $ } from "@builder.io/qwik";
import { Radio } from "../Radio";

export const AriaLabelsExample = component$(() => {
  const rating = useSignal("");
  const groupId = useId();
  const helpTextId = `${groupId}-help`;

  return (
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        ARIA Labels and Descriptions
      </h3>
      
      <fieldset role="radiogroup" aria-labelledby={`${groupId}-legend`} aria-describedby={helpTextId}>
        <legend id={`${groupId}-legend`} class="text-sm font-medium text-gray-700 dark:text-gray-300">
          Rate your experience *
        </legend>
        
        <div id={helpTextId} class="text-sm text-gray-500 dark:text-gray-400 mb-3">
          Please select a rating from 1 (poor) to 5 (excellent)
        </div>
        
        <div class="flex space-x-4">
          <Radio
            name="experience-rating"
            value="1"
            aria-label="1 star - Poor experience"
            aria-describedby={helpTextId}
            checked={rating.value === "1"}
            onChange$={(value) => (rating.value = value)}
          />
          <Radio
            name="experience-rating"
            value="2"
            aria-label="2 stars - Below average experience"
            aria-describedby={helpTextId}
            checked={rating.value === "2"}
            onChange$={(value) => (rating.value = value)}
          />
          <Radio
            name="experience-rating"
            value="3"
            aria-label="3 stars - Average experience"
            aria-describedby={helpTextId}
            checked={rating.value === "3"}
            onChange$={(value) => (rating.value = value)}
          />
          <Radio
            name="experience-rating"
            value="4"
            aria-label="4 stars - Good experience"
            aria-describedby={helpTextId}
            checked={rating.value === "4"}
            onChange$={(value) => (rating.value = value)}
          />
          <Radio
            name="experience-rating"
            value="5"
            aria-label="5 stars - Excellent experience"
            aria-describedby={helpTextId}
            checked={rating.value === "5"}
            onChange$={(value) => (rating.value = value)}
          />
        </div>
      </fieldset>

      <div class="mt-4 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Selected Rating: <span class="font-medium">{rating.value || "None"}</span>
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Each radio button has descriptive aria-label for screen readers
        </p>
      </div>
    </div>
  );
});

export const KeyboardNavigationExample = component$(() => {
  const preference = useSignal("moderate");
  const groupId = useId();

  return (
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        Keyboard Navigation Support
      </h3>
      
      <div class="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
        <h4 class="text-sm font-medium text-blue-800 dark:text-blue-200">
          Keyboard Instructions
        </h4>
        <ul class="mt-2 text-sm text-blue-700 dark:text-blue-300">
          <li>• Use Tab to enter the radio group</li>
          <li>• Use Arrow keys to navigate between options</li>
          <li>• Use Space to select the focused option</li>
          <li>• Use Tab to exit the radio group</li>
        </ul>
      </div>
      
      <fieldset role="radiogroup" aria-labelledby={`${groupId}-legend`}>
        <legend id={`${groupId}-legend`} class="text-sm font-medium text-gray-700 dark:text-gray-300">
          Notification Frequency
        </legend>
        
        <div class="mt-3 space-y-2">
          <Radio
            name="notification-frequency"
            value="high"
            label="High - Real-time notifications"
            checked={preference.value === "high"}
            onChange$={(value) => (preference.value = value)}
            aria-describedby={`${groupId}-high-desc`}
          />
          <div id={`${groupId}-high-desc`} class="ml-6 text-xs text-gray-500 dark:text-gray-400">
            Receive notifications immediately as they occur
          </div>
          
          <Radio
            name="notification-frequency"
            value="moderate"
            label="Moderate - Hourly summaries"
            checked={preference.value === "moderate"}
            onChange$={(value) => (preference.value = value)}
            aria-describedby={`${groupId}-moderate-desc`}
          />
          <div id={`${groupId}-moderate-desc`} class="ml-6 text-xs text-gray-500 dark:text-gray-400">
            Receive summary notifications every hour
          </div>
          
          <Radio
            name="notification-frequency"
            value="low"
            label="Low - Daily digest"
            checked={preference.value === "low"}
            onChange$={(value) => (preference.value = value)}
            aria-describedby={`${groupId}-low-desc`}
          />
          <div id={`${groupId}-low-desc`} class="ml-6 text-xs text-gray-500 dark:text-gray-400">
            Receive one daily summary of all notifications
          </div>
          
          <Radio
            name="notification-frequency"
            value="none"
            label="None - Disable all notifications"
            checked={preference.value === "none"}
            onChange$={(value) => (preference.value = value)}
            aria-describedby={`${groupId}-none-desc`}
          />
          <div id={`${groupId}-none-desc`} class="ml-6 text-xs text-gray-500 dark:text-gray-400">
            Turn off all notification types
          </div>
        </div>
      </fieldset>

      <div class="mt-4 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Selected: <span class="font-medium">{preference.value}</span>
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Try using keyboard navigation to change the selection
        </p>
      </div>
    </div>
  );
});

export const ScreenReaderExample = component$(() => {
  const securityLevel = useSignal("standard");
  const groupId = useId();
  const errorId = `${groupId}-error`;
  const isSubmitted = useSignal(false);

  const handleSubmit$ = $(() => {
    isSubmitted.value = true;
  });

  const hasError = isSubmitted.value && !securityLevel.value;

  return (
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        Screen Reader Optimized
      </h3>
      
      <form class="space-y-4">
        <fieldset 
          role="radiogroup" 
          aria-labelledby={`${groupId}-legend`}
          aria-describedby={hasError ? errorId : undefined}
          aria-required="true"
          aria-invalid={hasError}
        >
          <legend id={`${groupId}-legend`} class="text-sm font-medium text-gray-700 dark:text-gray-300">
            Security Level (Required)
          </legend>
          
          <div class="mt-3 space-y-3">
            <Radio
              name="security-level"
              value="basic"
              label="Basic Security"
              required
              checked={securityLevel.value === "basic"}
              onChange$={(value) => (securityLevel.value = value)}
              aria-describedby={`${groupId}-basic-info`}
            />
            <div id={`${groupId}-basic-info`} class="ml-6 text-sm text-gray-600 dark:text-gray-400">
              Standard password protection and basic encryption
            </div>
            
            <Radio
              name="security-level"
              value="standard"
              label="Standard Security (Recommended)"
              required
              checked={securityLevel.value === "standard"}
              onChange$={(value) => (securityLevel.value = value)}
              aria-describedby={`${groupId}-standard-info`}
            />
            <div id={`${groupId}-standard-info`} class="ml-6 text-sm text-gray-600 dark:text-gray-400">
              Two-factor authentication and enhanced encryption
            </div>
            
            <Radio
              name="security-level"
              value="enhanced"
              label="Enhanced Security"
              required
              checked={securityLevel.value === "enhanced"}
              onChange$={(value) => (securityLevel.value = value)}
              aria-describedby={`${groupId}-enhanced-info`}
            />
            <div id={`${groupId}-enhanced-info`} class="ml-6 text-sm text-gray-600 dark:text-gray-400">
              Multi-factor authentication and enterprise-grade encryption
            </div>
          </div>
          
          {hasError && (
            <div 
              id={errorId}
              role="alert"
              aria-live="polite"
              class="mt-2 text-sm text-red-600 dark:text-red-400"
            >
              Please select a security level to continue
            </div>
          )}
        </fieldset>

        <button
          type="button"
          onClick$={handleSubmit$}
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-describedby={hasError ? errorId : undefined}
        >
          Save Security Settings
        </button>
      </form>

      <div class="mt-4 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Selected Level: <span class="font-medium">{securityLevel.value || "None"}</span>
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Includes proper ARIA attributes and error announcements for screen readers
        </p>
      </div>
    </div>
  );
});

export const FocusManagementExample = component$(() => {
  const theme = useSignal("system");
  const groupId = useId();

  return (
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        Focus Management
      </h3>
      
      <fieldset 
        role="radiogroup" 
        aria-labelledby={`${groupId}-legend`}
        class="focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 rounded-lg p-2"
      >
        <legend id={`${groupId}-legend`} class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Theme Preference
        </legend>
        
        <div class="space-y-2">
          <Radio
            name="theme-preference"
            value="light"
            label="Light Theme"
            checked={theme.value === "light"}
            onChange$={(value) => (theme.value = value)}
            class="focus-within:bg-blue-50 dark:focus-within:bg-blue-900/20 rounded px-2 py-1"
          />
          
          <Radio
            name="theme-preference"
            value="dark"
            label="Dark Theme"
            checked={theme.value === "dark"}
            onChange$={(value) => (theme.value = value)}
            class="focus-within:bg-blue-50 dark:focus-within:bg-blue-900/20 rounded px-2 py-1"
          />
          
          <Radio
            name="theme-preference"
            value="system"
            label="System Theme (Auto)"
            checked={theme.value === "system"}
            onChange$={(value) => (theme.value = value)}
            class="focus-within:bg-blue-50 dark:focus-within:bg-blue-900/20 rounded px-2 py-1"
          />
        </div>
      </fieldset>

      <div class="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
        <h4 class="text-sm font-medium text-amber-800 dark:text-amber-200">
          Focus Indicators
        </h4>
        <p class="mt-1 text-sm text-amber-700 dark:text-amber-300">
          Each radio button shows clear focus indicators when navigated with keyboard. 
          The entire group has a focus ring when any option is focused.
        </p>
      </div>

      <div class="mt-4 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Selected Theme: <span class="font-medium">{theme.value}</span>
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Focus management ensures smooth keyboard navigation experience
        </p>
      </div>
    </div>
  );
});

export const HighContrastExample = component$(() => {
  const accessibilityMode = useSignal("standard");
  const groupId = useId();

  return (
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        High Contrast Support
      </h3>
      
      <fieldset role="radiogroup" aria-labelledby={`${groupId}-legend`}>
        <legend id={`${groupId}-legend`} class="text-sm font-medium text-gray-700 dark:text-gray-300">
          Accessibility Mode
        </legend>
        
        <div class="mt-3 space-y-2">
          <Radio
            name="accessibility-mode"
            value="standard"
            label="Standard Mode"
            checked={accessibilityMode.value === "standard"}
            onChange$={(value) => (accessibilityMode.value = value)}
            class="contrast-more:ring-2 contrast-more:ring-black dark:contrast-more:ring-white"
          />
          
          <Radio
            name="accessibility-mode"
            value="high-contrast"
            label="High Contrast Mode"
            checked={accessibilityMode.value === "high-contrast"}
            onChange$={(value) => (accessibilityMode.value = value)}
            class="contrast-more:ring-2 contrast-more:ring-black dark:contrast-more:ring-white"
          />
          
          <Radio
            name="accessibility-mode"
            value="reduced-motion"
            label="Reduced Motion Mode"
            checked={accessibilityMode.value === "reduced-motion"}
            onChange$={(value) => (accessibilityMode.value = value)}
            class="contrast-more:ring-2 contrast-more:ring-black dark:contrast-more:ring-white"
          />
        </div>
      </fieldset>

      <div class="rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-900/20">
        <h4 class="text-sm font-medium text-purple-800 dark:text-purple-200">
          Contrast Features
        </h4>
        <ul class="mt-2 text-sm text-purple-700 dark:text-purple-300">
          <li>• Enhanced borders in high contrast mode</li>
          <li>• Increased color contrast ratios</li>
          <li>• Support for Windows High Contrast themes</li>
          <li>• Compatible with forced-colors media query</li>
        </ul>
      </div>

      <div class="mt-4 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Selected Mode: <span class="font-medium">{accessibilityMode.value}</span>
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Radio buttons adapt to system accessibility preferences
        </p>
      </div>
    </div>
  );
});

export default AriaLabelsExample;