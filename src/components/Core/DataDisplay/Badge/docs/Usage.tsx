import { component$ } from '@builder.io/qwik';
import { UsageTemplate } from '~/components/Docs/templates/UsageTemplate';

export default component$(() => {
  const bestPractices = [
    {
      title: 'Use the appropriate color for semantic meaning',
      description: 'Choose badge colors that match their semantic purpose. This helps users quickly understand the meaning of the badge without reading its content.',
      example: 
`// Good practice - using semantic colors
<Badge color="success">Completed</Badge>
<Badge color="warning">Pending</Badge>
<Badge color="error">Failed</Badge>
<Badge color="info">In Progress</Badge>

// Less effective - colors don't match meaning
<Badge color="success">Failed</Badge> // Misleading
<Badge color="error">Completed</Badge> // Confusing`
    },
    {
      title: 'Keep badge content short and concise',
      description: 'Badges are designed for small pieces of information. Keep content brief and use truncation for longer text when necessary.',
      example:
`// Good practice - concise content
<Badge>New</Badge>
<Badge>5</Badge>
<Badge>Featured</Badge>

// Better for longer content - use truncation
<Badge truncate maxWidth="100px">
  This is a very long badge that will be truncated
</Badge>

// Or consider alternative components for longer content
// <Tooltip>...</Tooltip> or <Card>...</Card>`
    },
    {
      title: 'Group related badges',
      description: 'Use BadgeGroup to organize related badges with consistent spacing and alignment.',
      example:
`// Good practice - grouping related badges
<BadgeGroup>
  <Badge>React</Badge>
  <Badge>TypeScript</Badge>
  <Badge>Tailwind</Badge>
</BadgeGroup>

// Less organized approach
<div>
  <Badge class="mr-2 mb-2">React</Badge>
  <Badge class="mr-2 mb-2">TypeScript</Badge>
  <Badge class="mb-2">Tailwind</Badge>
</div>`
    },
    {
      title: 'Use the appropriate variant for the context',
      description: 'Choose the badge variant based on the visual hierarchy needed in your design.',
      example:
`// Solid badges for high emphasis
<Badge variant="solid" color="primary">Featured</Badge>

// Soft badges for medium emphasis
<Badge variant="soft" color="info">New</Badge>

// Outline badges for low emphasis
<Badge variant="outline" color="secondary">Optional</Badge>`
    }
  ];

  const accessibilityGuidelines = [
    {
      title: 'Ensure proper contrast',
      description: 'Badge text should have sufficient contrast with its background to meet WCAG 2.1 AA standards (4.5:1 for normal text).',
      example:
`// Good contrast examples
<Badge color="primary">Primary</Badge> // Good contrast
<Badge variant="soft" color="success">Success</Badge> // Good contrast

// Consider using the outline variant on light backgrounds
// for better contrast
<div class="bg-gray-100 p-4">
  <Badge variant="outline" color="primary">Primary</Badge>
</div>`
    },
    {
      title: 'Use appropriate ARIA attributes',
      description: 'Ensure badges have the proper ARIA role for their purpose. The default role is "status", but you might want to use other roles depending on context.',
      example:
`// For status information
<Badge role="status">New</Badge>

// For counters or metrics
<Badge role="meter" aria-valuetext="5 unread messages">5</Badge>

// For dismissible badges
<Badge 
  dismissible 
  onDismiss$={() => handleDismiss()} 
  role="button"
  aria-label="Remove filter"
>
  Filter Active
</Badge>`
    },
    {
      title: 'Provide meaningful tooltips',
      description: 'Use tooltips to provide additional context for badges with abbreviated or non-obvious content.',
      example:
`// Adding tooltips for clarity
<Badge tooltip="5 unread notifications">5</Badge>

<Badge tooltip="Updated 5 minutes ago">New</Badge>

<Badge tooltip="Premium feature requires subscription">
  <span>PRO</span>
</Badge>`
    }
  ];

  const commonPatterns = [
    {
      title: 'Status indicators',
      description: 'Use badges to indicate the status of items or processes.',
      example:
`<div class="flex items-center justify-between p-4 border rounded">
  <span>Deploy to production</span>
  <Badge color="success">Completed</Badge>
</div>

<div class="flex items-center justify-between p-4 border rounded mt-2">
  <span>Update dependencies</span>
  <Badge color="warning">In Progress</Badge>
</div>

<div class="flex items-center justify-between p-4 border rounded mt-2">
  <span>Database migration</span>
  <Badge color="error">Failed</Badge>
</div>`
    },
    {
      title: 'Feature tags',
      description: 'Use badges to highlight features or attributes of an item.',
      example:
`<div class="p-4 border rounded">
  <div class="flex items-center mb-2">
    <h3 class="text-lg font-semibold">Enterprise Plan</h3>
    <Badge variant="soft" color="primary" class="ml-2">Popular</Badge>
  </div>
  <p class="mb-4">Complete solution for growing businesses</p>
  <div class="space-y-2">
    <div class="flex">
      <span>✓</span>
      <span class="ml-2">Unlimited projects</span>
    </div>
    <div class="flex">
      <span>✓</span>
      <span class="ml-2">Priority support</span>
      <Badge variant="soft" color="success" size="sm" class="ml-2">New</Badge>
    </div>
  </div>
</div>`
    },
    {
      title: 'Notification counters',
      description: 'Use badges to display notification or item counts.',
      example:
`<div class="flex items-center">
  <button class="relative p-2">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
    <Badge color="error" size="sm" class="absolute -top-1 -right-1">8</Badge>
  </button>
  
  <button class="relative p-2 ml-4">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
    <Badge color="primary" size="sm" class="absolute -top-1 -right-1">24</Badge>
  </button>
</div>`
    }
  ];

  return (
    <UsageTemplate
      bestPractices={bestPractices}
      accessibilityGuidelines={accessibilityGuidelines}
      commonPatterns={commonPatterns}
    />
  );
});
