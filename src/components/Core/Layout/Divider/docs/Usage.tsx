import { component$ } from "@builder.io/qwik";
import { UsageTemplate } from "~/components/Docs/templates";
import Divider from "../Divider";

export default component$(() => {
  const guidelines = [
    {
      title: "Clear visual separation",
      description:
        "Use dividers to create clear visual boundaries between content sections",
      type: "do" as const,
      code: `<div>
  <h2>Section 1</h2>
  <p>Content for section 1...</p>
  <Divider />
  <h2>Section 2</h2>
  <p>Content for section 2...</p>
</div>`,
    },
    {
      title: "Labeled dividers for context",
      description:
        "Use labeled dividers to provide context for different content sections",
      type: "do" as const,
      component: <Divider label="Important Section" color="primary" />,
    },
    {
      title: "Match design system styles",
      description:
        "Match divider styles to your design system's visual language",
      type: "do" as const,
      component: <Divider variant="dashed" color="secondary" />,
    },
    {
      title: "Adjust spacing for rhythm",
      description: "Adjust spacing around dividers to create visual rhythm",
      type: "do" as const,
      component: <Divider spacing="lg" />,
    },
    {
      title: "Use vertical dividers appropriately",
      description: "Use vertical dividers to separate side-by-side content",
      type: "do" as const,
      code: `<div class="flex h-40">
  <div class="w-1/2">Left content</div>
  <Divider orientation="vertical" />
  <div class="w-1/2">Right content</div>
</div>`,
    },
    {
      title: "Don't overuse dividers",
      description: "Avoid overusing dividers as they can create visual clutter",
      type: "dont" as const,
      code: `// Don't do this
<div>
  <p>Item 1</p>
  <Divider />
  <p>Item 2</p>
  <Divider />
  <p>Item 3</p>
  <Divider />
  <p>Item 4</p>
</div>`,
    },
    {
      title: "Don't replace white space unnecessarily",
      description:
        "Avoid using dividers when white space alone could provide sufficient separation",
      type: "dont" as const,
    },
    {
      title: "Don't use overly thick dividers",
      description: "Avoid using overly thick dividers in dense interfaces",
      type: "dont" as const,
      component: (
        <div class="space-y-1 text-sm">
          <p>Dense content</p>
          <Divider thickness="thick" />
          <p>More dense content</p>
        </div>
      ),
    },
    {
      title: "Don't use competing styles",
      description:
        "Avoid using dividers with competing colors or styles on the same page",
      type: "dont" as const,
      component: (
        <div class="space-y-2">
          <Divider color="primary" variant="solid" />
          <Divider color="secondary" variant="dashed" />
          <Divider color="muted" variant="dotted" />
        </div>
      ),
    },
  ];

  const bestPractices = [
    {
      title: "Choose appropriate thickness",
      description:
        "Select thickness based on the level of separation needed - thin for subtle separation, thick for major section breaks",
    },
    {
      title: "Keep colors subtle",
      description:
        "Keep divider colors subtle unless you need to highlight a specific separation",
    },
    {
      title: "Test responsive behavior",
      description:
        "Test vertical dividers in narrow viewports to ensure they don't break your layout",
    },
    {
      title: "Consider semantic meaning",
      description:
        "Use dividers to reinforce content hierarchy and semantic structure",
    },
  ];

  const accessibilityTips = [
    {
      title: "Proper ARIA role",
      description:
        "The component uses role='separator' by default, which is semantically correct for dividers",
    },
    {
      title: "Orientation attribute",
      description:
        "The aria-orientation attribute is automatically set based on the orientation prop",
    },
    {
      title: "Don't rely solely on dividers",
      description:
        "Don't rely solely on visual dividers for content organization - ensure proper heading structure",
    },
  ];

  const performanceTips = [
    "Dividers are lightweight components with minimal rendering overhead",
    "CSS classes are generated efficiently using object-based conditionals",
    "No JavaScript interactions or state management overhead",
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
      performanceTips={performanceTips}
    >
      <p>
        Dividers are simple yet effective UI elements that help organize content
        and improve readability. They create visual boundaries between different
        sections, helping users understand the content structure and hierarchy.
        While horizontal dividers are more common, vertical dividers are useful
        for side-by-side content separation.
      </p>

      <p class="mt-4">
        Use dividers strategically to enhance your layout without creating
        visual clutter. A well-placed divider can significantly improve the user
        experience by making content easier to scan and understand.
      </p>
    </UsageTemplate>
  );
});
