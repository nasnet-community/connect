import { component$ } from '@builder.io/qwik';
import { UsageTemplate } from '~/components/Docs/templates';

export default component$(() => {
  const installation = `
// Import the components
import { ProgressBar, Spinner } from '~/components/Core/DataDisplay/Progress';
`;

  const basicUsage = `
// Basic ProgressBar
<ProgressBar value={60} />

// ProgressBar with value display and custom color
<ProgressBar 
  value={75} 
  showValue 
  color="success"
/>

// Indeterminate ProgressBar (for unknown duration tasks)
<ProgressBar indeterminate />

// Basic Spinner
<Spinner />

// Spinner with label
<Spinner 
  showLabel 
  label="Loading data..." 
/>

// Custom spinner variant with color
<Spinner 
  variant="dots" 
  color="primary" 
/>
`;

  const advancedUsage = `
// ProgressBar with buffer, useful for media playback
<ProgressBar 
  value={30} 
  buffer={70} 
  showValue 
  valuePosition="inside"
/>

// Custom formatted value
<ProgressBar
  value={4.2}
  max={5}
  showValue
  valueFormat$={(value) => \`\${value}/5 stars\`}
/>

// Animated progress bar with custom styling
<ProgressBar 
  value={85} 
  animation="striped-animated" 
  shape="pill" 
  size="lg" 
  color="secondary" 
/>

// Error state progress bar
<ProgressBar 
  value={60} 
  error 
  showValue 
/>

// Customizable spinner with different animation speed
<Spinner 
  size="lg" 
  variant="circle" 
  color="warning" 
  speed={1.5} 
  centered 
/>

// Spinner with custom positioned label
<Spinner 
  showLabel 
  label="Uploading..." 
  labelPosition="bottom" 
  labelClass="text-xs text-gray-500" 
/>

// Multiple spinners for complex loading states
<div class="flex gap-2 items-center">
  <Spinner size="sm" />
  <span>Loading primary data</span>
</div>
<div class="flex gap-2 items-center mt-2">
  <Spinner size="sm" variant="dots" />
  <span>Fetching related records</span>
</div>
`;

  const dos = [
    'Use ProgressBar when you can determine progress percentage',
    'Use Spinner for operations with unknown duration',
    'Provide informative labels to explain what\'s loading',
    'Add ARIA labels for screen readers',
    'Match color with the action type (e.g., success for completions)',
    'Consider using buffer state for operations with preparatory phases',
    'Use indeterminate state when progress can\'t be calculated'
  ];

  const donts = [
    'Don\'t use multiple animations that could distract users',
    'Avoid spinners that are too large relative to their context',
    'Don\'t use progress indicators for very quick operations (< 300ms)',
    'Avoid using error state without explaining the error',
    'Don\'t place critical information only in animations',
    'Avoid excessive visual noise with too many progress indicators',
    'Don\'t forget to handle completion states appropriately'
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
        Progress components provide visual feedback about operations that take time to complete.
        They help maintain user engagement and provide context about the current state of the
        application. The Connect design system offers two main progress components: ProgressBar
        for operations with known duration or completion percentage, and Spinner for operations
        with unknown duration.
      </p>
    </UsageTemplate>
  );
});
