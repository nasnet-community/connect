import { component$ } from '@builder.io/qwik';
import { UsageTemplate } from '~/components/Docs/templates';

export default component$(() => {
  const installation = `
// Import the Button component
import { Button } from '~/components/Core/button';
`;

  const basicUsage = `
// Basic button with default settings
<Button>Click me</Button>

// Button with different variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// Button sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Button with event handler
<Button 
  onClick$={() => {
    console.log('Button clicked!');
  }}
>
  Click Handler
</Button>
`;

  const advancedUsage = `
// Button with icon on the left
<Button leftIcon>
  <span q:slot="leftIcon">
    <HiCheckOutline class="h-4 w-4" />
  </span>
  With Left Icon
</Button>

// Button with icon on the right
<Button rightIcon>
  Proceed
  <span q:slot="rightIcon">
    <HiArrowRightOutline class="h-4 w-4" />
  </span>
</Button>

// Button with loading state
<Button loading>Processing</Button>

// Button with custom styling
<Button class="bg-purple-600 hover:bg-purple-700">
  Custom Color
</Button>

// Button for form submission
<form>
  <Button type="submit">Submit Form</Button>
</form>

// Button with accessibility label
<Button aria-label="Close dialog">
  <span q:slot="leftIcon">
    <HiXMarkOutline class="h-4 w-4" />
  </span>
</Button>

// Button with conditional disabled state
<Button 
  disabled={!formIsValid} 
  onClick$={submitForm$}
>
  Save Changes
</Button>

// Button with combined features
<Button 
  variant="outline" 
  size="lg" 
  leftIcon 
  onClick$={handleClick$}
  class="text-blue-600 border-blue-600"
>
  <span q:slot="leftIcon">
    <HiDocumentDuplicateOutline class="h-5 w-5" />
  </span>
  Clone Document
</Button>
`;

  const dos = [
    'Use clear, action-oriented labels that describe what happens when clicked',
    'Select the appropriate variant based on the action\'s importance',
    'Include icons when they enhance the button\'s meaning or scanability',
    'Use loading states for actions that take time to complete',
    'Apply proper aria-label attributes for buttons with only icon content',
    'Maintain color contrast ratios for accessibility compliance',
    'Use consistent button styling and sizing throughout your application'
  ];

  const donts = [
    'Don\'t use overly long button labels that might wrap onto multiple lines',
    'Avoid using too many primary buttons in a single view (dilutes importance)',
    'Don\'t use buttons for simple navigation when a link would suffice',
    'Avoid placing buttons with conflicting actions next to each other without visual distinction',
    'Don\'t disable buttons without providing feedback about why they\'re disabled',
    'Avoid relying solely on color to convey button meaning',
    'Don\'t change a button\'s label while in the loading state (use loading prop instead)'
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
        The Button component serves as a foundational interactive element for triggering actions
        within your application. Its flexible design allows it to be customized for various use cases
        while maintaining consistency in behavior and accessibility.
      </p>
    </UsageTemplate>
  );
});
