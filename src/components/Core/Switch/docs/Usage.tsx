import { component$ } from "@builder.io/qwik";
import { CodeBlock } from "~/components/Core/Typography/CodeDisplay";

export default component$(() => {
  return (
    <div class="space-y-8">
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Basic Usage</h2>
        <p>
          The Switch component is designed to toggle between two states. At its simplest, you need to provide
          a <code>checked</code> state value and an <code>onChange$</code> handler to update that state.
        </p>
        <CodeBlock
          code={`
import { component$, useSignal } from '@builder.io/qwik';
import { Switch } from '~/components/Core/Switch';

export default component$(() => {
  const isEnabled = useSignal(false);
  
  return (
    <Switch
      checked={isEnabled.value}
      onChange$={(checked) => isEnabled.value = checked}
      aria-label="Enable feature"
    />
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Form Integration</h2>
        <p>
          The Switch component can be integrated with forms using Qwik's standard form handling.
          Provide a <code>name</code> attribute and optionally a <code>value</code> attribute.
        </p>
        <CodeBlock
          code={`
import { component$, useSignal } from '@builder.io/qwik';
import { Switch } from '~/components/Core/Switch';

export default component$(() => {
  const formValues = useSignal({
    notifications: false,
    darkMode: true
  });
  
  return (
    <form>
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <label id="notifications-label">Enable Notifications</label>
          <Switch
            name="notifications"
            checked={formValues.value.notifications}
            onChange$={(checked) => formValues.value.notifications = checked}
            aria-labelledby="notifications-label"
          />
        </div>
        
        <div class="flex items-center justify-between">
          <label id="dark-mode-label">Dark Mode</label>
          <Switch
            name="darkMode"
            checked={formValues.value.darkMode}
            onChange$={(checked) => formValues.value.darkMode = checked}
            aria-labelledby="dark-mode-label"
          />
        </div>
        
        <button type="submit" class="px-4 py-2 bg-primary-500 text-white rounded-md">
          Save Preferences
        </button>
      </div>
    </form>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Styling Customization</h2>
        <p>
          The Switch component can be customized using CSS classes or CSS variables. This provides flexibility
          for adapting the component to your design system.
        </p>
        <CodeBlock
          code={`
import { component$, useSignal } from '@builder.io/qwik';
import { Switch } from '~/components/Core/Switch';

export default component$(() => {
  const isChecked = useSignal(false);
  
  return (
    <div class="space-y-4">
      {/* Using CSS classes */}
      <Switch
        checked={isChecked.value}
        onChange$={(checked) => isChecked.value = checked}
        class="my-custom-switch"
        trackClass="my-custom-track"
        thumbClass="my-custom-thumb"
        aria-label="Custom styled switch"
      />
      
      {/* Using CSS variables */}
      <Switch
        checked={isChecked.value}
        onChange$={(checked) => isChecked.value = checked}
        aria-label="Custom colored switch"
        style={{
          '--switch-track-bg': '#f0f0f0',
          '--switch-track-checked-bg': '#007aff',
          '--switch-thumb-bg': '#ffffff',
          '--switch-focus-ring-color': 'rgba(0, 122, 255, 0.3)'
        }}
      />
    </div>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Accessibility</h2>
        <p>
          To ensure your Switch components are accessible, always provide appropriate labeling.
          You can use <code>aria-label</code> for standalone switches or <code>aria-labelledby</code>
          to reference a visible label element.
        </p>
        <CodeBlock
          code={`
import { component$, useSignal } from '@builder.io/qwik';
import { Switch } from '~/components/Core/Switch';

export default component$(() => {
  const enableNotifications = useSignal(false);
  const enableDarkMode = useSignal(true);
  
  return (
    <div class="space-y-4">
      {/* Using aria-label for standalone switch */}
      <Switch
        checked={enableNotifications.value}
        onChange$={(checked) => enableNotifications.value = checked}
        aria-label="Enable notifications"
      />
      
      {/* Using aria-labelledby to reference a visible label */}
      <div class="flex items-center justify-between">
        <label id="dark-mode-label" class="font-medium">Dark Mode</label>
        <Switch
          checked={enableDarkMode.value}
          onChange$={(checked) => enableDarkMode.value = checked}
          aria-labelledby="dark-mode-label"
        />
      </div>
      
      {/* Using aria-describedby for additional description */}
      <div class="flex items-center justify-between">
        <div>
          <label id="location-label" class="font-medium">Location Services</label>
          <p id="location-description" class="text-sm text-gray-500">
            Allow the app to use your current location
          </p>
        </div>
        <Switch
          checked={enableDarkMode.value}
          onChange$={(checked) => enableDarkMode.value = checked}
          aria-labelledby="location-label"
          aria-describedby="location-description"
        />
      </div>
    </div>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Best Practices</h2>
        <div class="space-y-4">
          <h3 class="text-lg font-medium">Do:</h3>
          <ul class="list-disc pl-6 space-y-2">
            <li>Use descriptive labels that clearly indicate what the switch controls</li>
            <li>Apply immediate changes when the switch is toggled (no form submission needed)</li>
            <li>Use consistent styling for all switches in your application</li>
            <li>Provide appropriate ARIA attributes for accessibility</li>
            <li>Consider using the disabled state when the controlled feature is unavailable</li>
            <li>Add visual and textual feedback when the switch changes state</li>
          </ul>
          
          <h3 class="text-lg font-medium">Don't:</h3>
          <ul class="list-disc pl-6 space-y-2">
            <li>Use switches for actions that require additional confirmation</li>
            <li>Place switches without labels or clear context</li>
            <li>Use switches for mutually exclusive options (use radio buttons instead)</li>
            <li>Apply switches for options that don't represent a true/false state</li>
            <li>Position switches inconsistently across different forms or sections</li>
          </ul>
        </div>
      </section>
    </div>
  );
}); 