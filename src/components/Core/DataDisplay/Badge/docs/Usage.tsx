import { component$ } from "@builder.io/qwik";
import { UsageTemplate } from "~/components/Docs/templates/UsageTemplate";

export default component$(() => {
  const bestPractices = [
    {
      title: "Use the appropriate color for semantic meaning",
      description:
        "Choose badge colors that match their semantic purpose. This helps users quickly understand the meaning of the badge without reading its content.",
      example: `// Good practice - using semantic colors
<Badge color="success">Completed</Badge>
<Badge color="warning">Pending</Badge>
<Badge color="error">Failed</Badge>
<Badge color="info">In Progress</Badge>

// Less effective - colors don't match meaning
<Badge color="success">Failed</Badge> // Misleading
<Badge color="error">Completed</Badge> // Confusing`,
    },
    {
      title: "Keep badge content short and concise",
      description:
        "Badges are designed for small pieces of information. Keep content brief and use truncation for longer text when necessary.",
      example: `// Good practice - concise content
<Badge>New</Badge>
<Badge>5</Badge>
<Badge>Featured</Badge>

// Better for longer content - use truncation
<Badge truncate maxWidth="100px">
  This is a very long badge that will be truncated
</Badge>

// Or consider alternative components for longer content
// <Tooltip>...</Tooltip> or <Card>...</Card>`,
    },
    {
      title: "Group related badges",
      description:
        "Use BadgeGroup to organize related badges with consistent spacing and alignment.",
      example: `// Good practice - grouping related badges
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
</div>`,
    },
    {
      title: "Use the appropriate variant for the context",
      description:
        "Choose the badge variant based on the visual hierarchy needed in your design.",
      example: `// Solid badges for high emphasis
<Badge variant="solid" color="primary">Featured</Badge>

// Soft badges for medium emphasis
<Badge variant="soft" color="info">New</Badge>

// Outline badges for low emphasis
<Badge variant="outline" color="secondary">Optional</Badge>`,
    },
  ];

  const accessibilityGuidelines = [
    {
      title: "Ensure proper contrast",
      description:
        "Badge text should have sufficient contrast with its background to meet WCAG 2.1 AA standards (4.5:1 for normal text).",
      example: `// Good contrast examples
<Badge color="primary">Primary</Badge> // Good contrast
<Badge variant="soft" color="success">Success</Badge> // Good contrast

// Consider using the outline variant on light backgrounds
// for better contrast
<div class="bg-gray-100 p-4">
  <Badge variant="outline" color="primary">Primary</Badge>
</div>`,
    },
    {
      title: "Use appropriate ARIA attributes",
      description:
        'Ensure badges have the proper ARIA role for their purpose. The default role is "status", but you might want to use other roles depending on context.',
      example: `// For status information
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
</Badge>`,
    },
    {
      title: "Provide meaningful tooltips",
      description:
        "Use tooltips to provide additional context for badges with abbreviated or non-obvious content.",
      example: `// Adding tooltips for clarity
<Badge tooltip="5 unread notifications">5</Badge>

<Badge tooltip="Updated 5 minutes ago">New</Badge>

<Badge tooltip="Premium feature requires subscription">
  <span>PRO</span>
</Badge>`,
    },
  ];

  // Convert to the expected format
  const guidelines = [
    ...bestPractices.map((practice) => ({
      type: "do" as const,
      title: practice.title,
      description: practice.description,
      code: practice.example,
    })),
  ];

  const accessibilityTips = accessibilityGuidelines.map((guideline) => ({
    title: guideline.title,
    description: guideline.description,
  }));

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
    >
      <div class="mb-4">
        <h2 class="mb-2 text-xl font-semibold">Badge Usage Guidelines</h2>
        <p class="text-gray-600 dark:text-gray-400">
          Learn how to effectively use the Badge component in your applications,
          including best practices, accessibility considerations, and common
          patterns.
        </p>
      </div>
    </UsageTemplate>
  );
});
