import { component$ } from "@builder.io/qwik";
import { UsageTemplate } from "~/components/Docs/templates/UsageTemplate";
import type {
  BestPractice,
  AccessibilityTip,
  UsageGuideline,
} from "~/components/Docs/templates/UsageTemplate";

export default component$(() => {
  const guidelines: UsageGuideline[] = [
    {
      title: "Use appropriate card variants for content context",
      description: "Choose card variants that match the semantic meaning and visual hierarchy of your content",
      type: "do",
      code: `<Card variant="default">Regular content</Card>
<Card variant="elevated">Featured or important content</Card>
<Card variant="success">Success messages and confirmations</Card>
<Card variant="warning">Important notices and cautions</Card>
<Card variant="error">Error messages and critical alerts</Card>
<Card variant="info">General information and tips</Card>
<Card variant="glass">Overlay content on images/gradients</Card>
<Card variant="gradient">Hero sections and CTAs</Card>`,
    },
    {
      title: "Use consistent card structure with slots",
      description: "Maintain consistent layouts with proper slot usage",
      type: "do",
      code: `<Card hasHeader hasFooter>
  <div q:slot="header">Card Title</div>
  <p>Main content</p>
  <div q:slot="footer">Additional information</div>
</Card>`,
    },
    {
      title: "Show loading states during data fetching",
      description: "Provide visual feedback during async operations",
      type: "do",
      code: `const isLoading = useSignal(true);

<Card loading={isLoading.value}>
  {data.value ? <DataContent data={data.value} /> : null}
</Card>`,
    },
    {
      title: "Misuse semantic variants for visual purposes only",
      description:
        "Don't use semantic variants purely for colors without matching context",
      type: "dont",
      code: `<Card variant="error">Regular content</Card> // Misleading - not an error
<Card variant="success">Default message</Card> // No success context
<Card variant="gradient">Error message</Card> // Wrong semantic meaning`,
    },
    {
      title: "Custom card styling without slots",
      description:
        "Creating inconsistent card layouts makes your UI less predictable",
      type: "dont",
      code: `<Card>
  <div class="p-3 border-b">Card Title</div>
  <p class="p-4">Main content</p>
  <div class="p-3 border-t">Additional information</div>
</Card>`,
    },
  ];

  const bestPractices: BestPractice[] = [
    {
      title: "Group related content",
      description:
        "Cards should contain related information that logically belongs together. Don't mix unrelated content in a single card.",
    },
    {
      title: "Use semantic variants appropriately",
      description:
        "Match variant choice to content meaning: success for confirmations, error for failures, warning for cautions, info for neutral messages.",
    },
    {
      title: "Maintain consistent card structure",
      description:
        "For collections of cards, maintain consistent internal structure to help users scan content more effectively.",
    },
    {
      title: "Leverage responsive features",
      description:
        "Use container queries (containerClass) for responsive behavior based on card container width rather than viewport size.",
    },
    {
      title: "Use appropriate padding and spacing",
      description:
        "Consider content density when using cards. Use the noPadding prop for media content, but ensure text content has sufficient padding.",
    },
    {
      title: "Provide clear visual hierarchy",
      description:
        "When using cards with headers and footers, maintain a clear visual distinction between different sections.",
    },
    {
      title: "Consider special effects thoughtfully",
      description:
        "Use glass variant for overlay effects on backgrounds, and gradient variant sparingly for featured content or CTAs.",
    },
  ];

  const accessibilityTips: AccessibilityTip[] = [
    {
      title: "Maintain heading hierarchy",
      description:
        "Use proper heading levels (h1-h6) within cards to ensure screen readers can navigate content correctly.",
    },
    {
      title: "Use ARIA attributes for complex cards",
      description:
        "Add appropriate ARIA attributes like aria-labelledby to improve accessibility of complex card layouts.",
    },
    {
      title: "Make interactive cards keyboard accessible",
      description:
        "If a card is clickable, ensure it can be accessed via keyboard navigation by using semantic elements like <a> or <button>.",
    },
    {
      title: "Provide sufficient color contrast",
      description:
        "Ensure sufficient color contrast between card elements and their background colors, especially for text content.",
    },
  ];

  const performanceTips = [
    "For large collections of cards, consider implementing virtual scrolling to improve performance.",
    "Use the loading state with skeleton UI patterns when fetching data to improve perceived performance.",
    "Lazy load images within cards to reduce initial page load time.",
    "Use container queries sparingly and optimize container classes for performance.",
    "Consider using default or bordered variants for most content to avoid CSS complexity.",
    "Group semantic variant usage to minimize style recalculations in dynamic interfaces.",
    "For glass and gradient variants, consider performance impact on lower-end devices.",
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
      performanceTips={performanceTips}
    >
      <p>
        Cards are versatile containers that help organize related content into
        cohesive units. They provide visual separation while maintaining
        consistent styling across your application.
      </p>
      <p class="mt-3">
        This guide covers best practices for implementing cards in your
        interface, with a focus on consistent structure, appropriate variant
        usage, and accessibility considerations.
      </p>
    </UsageTemplate>
  );
});
