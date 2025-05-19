import { component$ } from '@builder.io/qwik';
import { UsageTemplate } from '~/components/Docs/templates';

export default component$(() => {
  const installation = `
// Import the Toggle component
import { Toggle } from '~/components/Core/Toggle';
`;

  const basicUsage = `
// Basic toggle with controlled state
import { component$, useSignal, $ } from '@builder.io/qwik';
import { Toggle } from '~/components/Core/Toggle';

export default component$(() => {
  const enabled = useSignal(false);
  
  return (
    <Toggle
      checked={enabled.value}
      onChange$={$((checked) => {
        enabled.value = checked;
      })}
      label="Enable feature"
    />
  );
});

// Toggle with left label
<Toggle
  checked={state.enabled}
  onChange$={$((checked) => { state.enabled = checked; })}
  label="Show notifications"
  labelPosition="left"
/>

// Different sizes
<Toggle 
  checked={state.small} 
  onChange$={$((checked) => { state.small = checked; })} 
  label="Small toggle"
  size="sm"
/>

<Toggle 
  checked={state.medium} 
  onChange$={$((checked) => { state.medium = checked; })} 
  label="Medium toggle" 
  size="md"
/>

<Toggle 
  checked={state.large} 
  onChange$={$((checked) => { state.large = checked; })} 
  label="Large toggle" 
  size="lg"
/>
`;

  const advancedUsage = `
// Toggle without label (using aria-label)
<Toggle
  checked={state.noLabel}
  onChange$={$((checked) => { state.noLabel = checked; })}
  aria-label="Toggle dark mode"
/>

// Disabled toggle
<Toggle
  checked={state.disabled}
  onChange$={$((checked) => { state.disabled = checked; })}
  label="Premium feature"
  disabled={true}
/>

// Required toggle in a form
<form>
  <Toggle
    checked={state.terms}
    onChange$={$((checked) => { state.terms = checked; })}
    label="I accept the terms and conditions"
    required={true}
    name="terms"
  />
  <button type="submit">Submit</button>
</form>

// Toggle with additional description
<div>
  <Toggle
    checked={state.analytics}
    onChange$={$((checked) => { state.analytics = checked; })}
    label="Usage analytics"
    aria-describedby="analytics-description"
  />
  <p id="analytics-description" class="text-sm text-gray-500 mt-1">
    Help us improve by sharing anonymous usage data.
  </p>
</div>

// Toggle group with custom styling
<div class="p-4 border rounded-md space-y-3">
  <h3 class="text-lg font-medium mb-2">Notification Settings</h3>
  
  <Toggle
    checked={state.email}
    onChange$={$((checked) => { state.email = checked; })}
    label="Email notifications"
    class="w-full justify-between"
  />
  
  <Toggle
    checked={state.push}
    onChange$={$((checked) => { state.push = checked; })}
    label="Push notifications"
    class="w-full justify-between"
  />
  
  <Toggle
    checked={state.sms}
    onChange$={$((checked) => { state.sms = checked; })}
    label="SMS notifications"
    class="w-full justify-between"
  />
</div>
`;

  const dos = [
    'Use consistent sizes throughout your application for visual harmony',
    'Provide clear, concise labels that explain what the toggle controls',
    'Use aria-label when toggles don\'t have visible labels',
    'Group related toggles together within logical sections',
    'Consider using left-positioned labels when displaying a list of toggles with equal-length labels',
    'Update state immediately when toggle changes for responsive UI',
    'Include appropriate ARIA attributes for assistive technologies'
  ];

  const donts = [
    'Don\'t use toggles for actions that should be buttons (e.g., "Save" or "Submit")',
    'Avoid using toggles for mutually exclusive options (use radio buttons instead)',
    'Don\'t use toggles when more than two states are needed',
    'Avoid placing toggles too close together, especially on touch interfaces',
    'Don\'t use vague labels that don\'t clearly indicate what\'s being toggled',
    'Avoid using toggles for destructive actions without confirmation',
    'Don\'t use toggles for options that don\'t take immediate effect'
  ];

  return (
    <UsageTemplate
      installation={installation}
      basicUsage={basicUsage}
      advancedUsage={advancedUsage}
      dos={dos}
      donts={donts}
    >
      <p>
        The Toggle component provides a simple way to control binary states in your application.
        It follows Qwik's pattern of controlled components, where you manage the state and provide
        an onChange$ handler to update it. This makes it easy to integrate with forms and other
        interactive elements while maintaining proper reactivity.
      </p>
    </UsageTemplate>
  );
});
