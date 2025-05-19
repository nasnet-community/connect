import { component$ } from '@builder.io/qwik';
import { UsageTemplate } from '~/components/Docs/templates';

export default component$(() => {
  const installation = `
// Import the Divider component
import { Divider } from '~/components/Core/Layout/Divider';
`;

  const basicUsage = `
// Basic horizontal divider
<Divider />

// Divider with custom styling
<Divider
  thickness="thin"
  variant="dashed"
  color="primary"
/>

// Divider with a label
<Divider label="Section Title" />

// Vertical divider
<div class="flex h-40">
  <div class="w-1/2">
    <p>Left content</p>
  </div>
  <Divider orientation="vertical" />
  <div class="w-1/2 pl-4">
    <p>Right content</p>
  </div>
</div>
`;

  const advancedUsage = `
// Divider with custom label positioning
<Divider 
  label="Start" 
  labelPosition="start" 
  color="primary" 
/>

<Divider 
  label="End" 
  labelPosition="end" 
  color="secondary" 
/>

// Controlling spacing around the divider
<p>Tight content</p>
<Divider spacing="none" />
<p>No extra space around this divider</p>

<p>Content with breathing room</p>
<Divider spacing="lg" />
<p>Large gap around this divider</p>

// Combining multiple properties
<Divider
  orientation="horizontal"
  thickness="thick"
  variant="dotted"
  color="primary"
  label="Important Section"
  labelPosition="center"
  spacing="xl"
  class="my-custom-class"
/>

// Using with sections in a page
<h2 class="text-xl font-bold">Section 1</h2>
<p>Content for section 1...</p>

<Divider 
  label="Section 2" 
  thickness="thick" 
  color="primary" 
  spacing="lg" 
/>

<h2 class="text-xl font-bold">Section 2</h2>
<p>Content for section 2...</p>

// Creating a visual separator in a card
<div class="p-4 border rounded-lg shadow-sm">
  <h3 class="font-medium">Card Title</h3>
  <p>Card description and details...</p>
  
  <Divider spacing="md" />
  
  <div class="flex justify-end">
    <button class="px-4 py-2 bg-primary text-white rounded">Action</button>
  </div>
</div>
`;

  const dos = [
    'Use dividers to create clear visual separation between content sections',
    'Use labeled dividers to provide context for different content sections',
    'Match divider styles to your design system\'s visual language',
    'Adjust spacing around dividers to create visual rhythm',
    'Use vertical dividers to separate side-by-side content',
    'Choose the appropriate thickness based on the level of separation needed',
    'Keep divider colors subtle unless you need to highlight a specific separation'
  ];

  const donts = [
    'Don\'t overuse dividers as they can create visual clutter',
    'Avoid using dividers when white space alone could provide sufficient separation',
    'Don\'t use overly thick dividers in dense interfaces',
    'Avoid using dividers with competing colors or styles on the same page',
    'Don\'t rely solely on dividers for page structure or content organization',
    'Avoid using vertical dividers in narrow or responsive layouts where they may break',
    'Don\'t use dividers between every element in a list or group'
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
        Dividers are simple yet effective UI elements that help organize content and improve readability.
        They create visual boundaries between different sections, helping users understand the content
        structure and hierarchy. While horizontal dividers are more common, vertical dividers are useful
        for side-by-side content separation.
      </p>
      
      <p class="mt-4">
        Use dividers strategically to enhance your layout without creating visual clutter. 
        A well-placed divider can significantly improve the user experience by making content 
        easier to scan and understand.
      </p>
    </UsageTemplate>
  );
});
