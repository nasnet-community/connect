import { component$ } from "@builder.io/qwik";
import { UsageTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const guidelines = [
    {
      title: "Use meaningful content hierarchy",
      description:
        "Use meaningful content hierarchy within cards (heading, body text, actions)",
      type: "do" as const,
    },
    {
      title: "Group related information",
      description: "Group related information together in a single card",
      type: "do" as const,
    },
    {
      title: "Use consistent layouts",
      description: "Use consistent card layouts across your application",
      type: "do" as const,
    },
    {
      title: "Include clear indicators",
      description:
        "Include clear visual or textual indicators for interactive cards",
      type: "do" as const,
    },
    {
      title: "Use proper card components",
      description:
        "Use CardHeader, CardBody, CardFooter components for proper spacing",
      type: "do" as const,
    },
    {
      title: "Maintain sufficient contrast",
      description: "Maintain sufficient contrast between card and background",
      type: "do" as const,
    },
    {
      title: "Follow logical tab order",
      description:
        "Follow a logical tab order for interactive elements inside cards",
      type: "do" as const,
    },
    {
      title: "Avoid nesting cards",
      description:
        "Nest cards within other cards (avoid excessive container nesting)",
      type: "dont" as const,
    },
    {
      title: "Avoid inconsistent heights",
      description: "Create cards with inconsistent heights in the same row",
      type: "dont" as const,
    },
    {
      title: "Don't overcrowd cards",
      description: "Overcrowd cards with too much content or too many actions",
      type: "dont" as const,
    },
    {
      title: "Don't use for simple content",
      description:
        "Use cards for simple inline content that doesn't need separation",
      type: "dont" as const,
    },
    {
      title: "Avoid over-interactive cards",
      description:
        "Make entire cards interactive when only a specific element should be clickable",
      type: "dont" as const,
    },
    {
      title: "Keep interaction consistent",
      description: "Use an inconsistent interaction model across similar cards",
      type: "dont" as const,
    },
    {
      title: "Don't hide critical info",
      description:
        "Hide critical information inside collapsed or non-obvious card sections",
      type: "dont" as const,
    },
  ];

  const accessibilityTips = [
    {
      title: "Keyboard Navigation",
      description:
        "Ensure interactive cards can receive focus with keyboard navigation. Use tabIndex={0} for interactive cards that aren't naturally focusable.",
    },
    {
      title: "ARIA Attributes",
      description:
        "Use aria-labelledby to associate cards with their headers and aria-describedby for longer descriptions. Add appropriate role attributes when needed.",
    },
    {
      title: "Interactive Elements",
      description:
        "If a card contains multiple interactive elements, ensure each is individually focusable. For cards that act as a single interactive unit, apply appropriate aria attributes.",
    },
    {
      title: "Focus Indicators",
      description:
        "Ensure focus states are clearly visible for interactive cards and elements within cards.",
    },
    {
      title: "Image Accessibility",
      description:
        "Always provide alt text for images in CardMedia components. For decorative images, use empty alt attributes.",
    },
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      accessibilityTips={accessibilityTips}
    >
      <h3 class="mb-2 text-lg font-semibold">Implementation Guidelines</h3>
      <p class="mb-4">
        Cards are versatile components that can be used in various contexts
        throughout your application. When implementing cards, consider the
        following guidelines to ensure they're used effectively:
      </p>

      <h4 class="mb-1 mt-4 font-medium">Content Structure</h4>
      <p class="mb-2">
        Cards should follow a consistent content structure to make them easy to
        scan and understand:
      </p>
      <ul class="mb-4 ml-6 list-disc">
        <li>
          Start with a clear, concise header that describes the card's content
        </li>
        <li>Use the body for more detailed information</li>
        <li>Place actions in the footer for easy discovery</li>
        <li>
          When using media, ensure it enhances rather than distracts from the
          content
        </li>
      </ul>

      <h4 class="mb-1 mt-4 font-medium">Visual Hierarchy</h4>
      <p class="mb-2">
        Establish a clear visual hierarchy within and across cards:
      </p>
      <ul class="mb-4 ml-6 list-disc">
        <li>
          Use consistent typography styles for similar content across cards
        </li>
        <li>Apply sufficient contrast between the card and its background</li>
        <li>Use elevation thoughtfully to create depth when needed</li>
        <li>Group related cards visually through spacing and alignment</li>
      </ul>

      <h4 class="mb-1 mt-4 font-medium">Interaction Design</h4>
      <p class="mb-2">
        When cards are interactive, make their behavior clear to users:
      </p>
      <ul class="mb-4 ml-6 list-disc">
        <li>Use hover effects to indicate interactivity</li>
        <li>
          Be consistent with interaction patterns (e.g., if one product card
          links to a detail page, all similar cards should behave the same way)
        </li>
        <li>
          For cards with multiple interactive elements, ensure each element has
          a clear purpose
        </li>
        <li>
          Consider using the entire card as a clickable target for the primary
          action
        </li>
      </ul>

      <h4 class="mb-1 mt-4 font-medium">Responsive Behavior</h4>
      <p class="mb-2">
        Design cards to work well across different screen sizes:
      </p>
      <ul class="mb-4 ml-6 list-disc">
        <li>Use grid layouts that reflow based on screen width</li>
        <li>Consider stacking cards vertically on smaller screens</li>
        <li>Ensure touch targets are large enough on mobile devices</li>
        <li>Test card layouts across different breakpoints</li>
      </ul>
    </UsageTemplate>
  );
});
