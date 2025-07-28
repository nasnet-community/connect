import { component$ } from "@builder.io/qwik";
import {
  UsageTemplate,
  type UsageGuideline,
  type BestPractice,
  type AccessibilityTip,
} from "~/components/Docs/templates/UsageTemplate";
import CodeExample from "~/components/Docs/CodeExample";

export const SpacerUsage = component$(() => {
  const guidelines: UsageGuideline[] = [
    {
      title: "Use for consistent spacing",
      description:
        "Use Spacer to maintain consistent spacing between UI elements.",
      code: `<Box padding="md">Content above</Box>
<Spacer size="md" />
<Box padding="md">Content below</Box>`,
      type: "do",
    },
    {
      title: "Use flexible spacers to push content apart",
      description:
        "Use isFlexible to push content to the edges of a container.",
      code: `<Flex>
  <Box>Left aligned</Box>
  <Spacer horizontal isFlexible />
  <Box>Right aligned</Box>
</Flex>`,
      type: "do",
    },
    {
      title: "Use multiple consecutive spacers",
      description:
        "Avoid using multiple spacers in a row. Use a single spacer with the appropriate size.",
      code: `<Box>Content</Box>
<Spacer size="sm" />
<Spacer size="sm" /> {/* Avoid this */}
<Box>Content</Box>`,
      type: "dont",
    },
    {
      title: "Use for layout structure",
      description:
        "Don't use Spacer to create complex layouts. Use Grid or Flex instead.",
      code: `<Spacer />
<div>
  <Spacer /> {/* Avoid using spacers for layout structure */}
  <div>Content</div>
  <Spacer />
</div>
<Spacer />`,
      type: "dont",
    },
  ];

  const bestPractices: BestPractice[] = [
    {
      title: "Use consistent spacing",
      description:
        "Maintain design consistency by using the predefined spacer sizes.",
    },
    {
      title: "Responsive spacing",
      description:
        "Use responsive sizes for different viewports to maintain visual hierarchy.",
    },
    {
      title: "Combine with layout components",
      description:
        "Use Spacer with other layout components like Stack, Flex, and Grid for complex layouts.",
    },
  ];

  const accessibilityTips: AccessibilityTip[] = [
    {
      title: "Semantic meaning",
      description:
        'Spacers are presentational elements with aria-hidden="true" to indicate they have no semantic role.',
    },
    {
      title: "Visual spacing",
      description:
        "Ensure adequate spacing for readability without creating excessive gaps that might confuse screen reader users.",
    },
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
      performanceTips={[
        "Spacers are lightweight components with minimal impact on performance.",
        "Consider using CSS alternatives for fixed layouts where spacing will never change.",
      ]}
    >
      <div class="mb-5">
        <h3 class="mb-3 text-lg font-medium">Installation</h3>
        <p class="mb-3">
          The Spacer component is part of the Connect design system. No
          additional installation is required if you're already using the
          Connect package.
        </p>

        <h3 class="mb-3 mt-5 text-lg font-medium">Importing</h3>
        <CodeExample
          code={`import { Spacer } from '~/components/Core/Layout/Spacer';`}
          language="tsx"
        />

        <h3 class="mb-3 mt-5 text-lg font-medium">Basic Usage</h3>
        <p class="mb-3">
          Use the Spacer component to add consistent spacing between elements in
          your layout.
        </p>
        <CodeExample
          code={`<Box padding="md">Content above</Box>
<Spacer size="md" />
<Box padding="md">Content below</Box>`}
          language="tsx"
        />

        <h3 class="mb-3 mt-5 text-lg font-medium">Horizontal Spacing</h3>
        <p class="mb-3">
          Use the horizontal prop to create horizontal spacing in flex layouts.
        </p>
        <CodeExample
          code={`<Flex>
  <Box padding="md">Left content</Box>
  <Spacer horizontal size="md" />
  <Box padding="md">Right content</Box>
</Flex>`}
          language="tsx"
        />

        <h3 class="mb-3 mt-5 text-lg font-medium">Responsive Spacing</h3>
        <p class="mb-3">
          Create different spacing for different viewport sizes.
        </p>
        <CodeExample
          code={`<Box padding="md">Content above</Box>
<Spacer 
  size={{
    base: 'sm', // Small on mobile
    md: 'lg'    // Large on medium screens and up
  }} 
/>
<Box padding="md">Content below</Box>`}
          language="tsx"
        />
      </div>
    </UsageTemplate>
  );
});

export default SpacerUsage;
