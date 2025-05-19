import { component$ } from '@builder.io/qwik';
import { UsageTemplate } from '~/components/Docs/templates/UsageTemplate';
import type { BestPractice, AccessibilityTip, UsageGuideline } from '~/components/Docs/templates/UsageTemplate';

export default component$(() => {
  const guidelines: UsageGuideline[] = [
    {
      title: 'Use appropriate card variants',
      description: 'Choose card variants that match the importance of content',
      type: 'do',
      code: `<Card variant="default">Regular content</Card>
<Card variant="bordered">Important information</Card>
<Card variant="elevated">Call to action content</Card>`
    },
    {
      title: 'Use consistent card structure with slots',
      description: 'Maintain consistent layouts with proper slot usage',
      type: 'do',
      code: `<Card hasHeader hasFooter>
  <div q:slot="header">Card Title</div>
  <p>Main content</p>
  <div q:slot="footer">Additional information</div>
</Card>`
    },
    {
      title: 'Show loading states during data fetching',
      description: 'Provide visual feedback during async operations',
      type: 'do',
      code: `const isLoading = useSignal(true);

<Card loading={isLoading.value}>
  {data.value ? <DataContent data={data.value} /> : null}
</Card>`
    },
    {
      title: 'Inconsistent card styling',
      description: 'Using inappropriate variants creates confusing visual hierarchy',
      type: 'dont',
      code: `<Card variant="elevated">Regular content</Card> // Too prominent 
<Card variant="default">Primary call to action</Card> // Not prominent enough`
    },
    {
      title: 'Custom card styling without slots',
      description: 'Creating inconsistent card layouts makes your UI less predictable',
      type: 'dont',
      code: `<Card>
  <div class="p-3 border-b">Card Title</div>
  <p class="p-4">Main content</p>
  <div class="p-3 border-t">Additional information</div>
</Card>`
    }
  ];

  const bestPractices: BestPractice[] = [
    {
      title: 'Group related content',
      description: 'Cards should contain related information that logically belongs together. Don\'t mix unrelated content in a single card.'
    },
    {
      title: 'Maintain consistent card structure',
      description: 'For collections of cards, maintain consistent internal structure to help users scan content more effectively.'
    },
    {
      title: 'Use appropriate padding and spacing',
      description: 'Consider content density when using cards. Use the noPadding prop for media content, but ensure text content has sufficient padding.'
    },
    {
      title: 'Provide clear visual hierarchy',
      description: 'When using cards with headers and footers, maintain a clear visual distinction between different sections.'
    }
  ];

  const accessibilityTips: AccessibilityTip[] = [
    {
      title: 'Maintain heading hierarchy',
      description: 'Use proper heading levels (h1-h6) within cards to ensure screen readers can navigate content correctly.'
    },
    {
      title: 'Use ARIA attributes for complex cards',
      description: 'Add appropriate ARIA attributes like aria-labelledby to improve accessibility of complex card layouts.'
    },
    {
      title: 'Make interactive cards keyboard accessible',
      description: 'If a card is clickable, ensure it can be accessed via keyboard navigation by using semantic elements like <a> or <button>.'
    },
    {
      title: 'Provide sufficient color contrast',
      description: 'Ensure sufficient color contrast between card elements and their background colors, especially for text content.'
    }
  ];
  
  const performanceTips = [
    'For large collections of cards, consider implementing virtual scrolling to improve performance.',
    'Use the loading state with skeleton UI patterns when fetching data to improve perceived performance.',
    'Lazy load images within cards to reduce initial page load time.'
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
      performanceTips={performanceTips}
    >
      <p>
        Cards are versatile containers that help organize related content into cohesive units. 
        They provide visual separation while maintaining consistent styling across your application.
      </p>
      <p class="mt-3">
        This guide covers best practices for implementing cards in your interface, 
        with a focus on consistent structure, appropriate variant usage, and accessibility considerations.
      </p>
    </UsageTemplate>
  );
});
