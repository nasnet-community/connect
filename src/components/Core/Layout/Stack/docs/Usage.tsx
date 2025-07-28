import { component$ } from "@builder.io/qwik";
import {
  UsageTemplate,
  type UsageGuideline,
} from "~/components/Docs/templates/UsageTemplate";

export const StackUsage = component$(() => {
  const guidelines: UsageGuideline[] = [
    {
      title: "Use Stack to maintain consistent spacing",
      description:
        "Stack provides consistent spacing between elements and helps create visual hierarchy.",
      type: "do",
    },
    {
      title: "Use direction prop for proper flow",
      description:
        "Control the flow of elements using row or column direction based on your layout needs.",
      type: "do",
    },
    {
      title: "Use responsive direction for mobile-friendly layouts",
      description:
        "Change stack direction at different breakpoints to create layouts that work well on all devices.",
      type: "do",
    },
    {
      title: "Use justify and align props for positioning",
      description:
        "Control how items are positioned and aligned within the stack for perfect layouts.",
      type: "do",
    },
    {
      title: "Use dividers for visual separation",
      description:
        "Add dividers between stack items when you need clear visual separation.",
      type: "do",
    },
    {
      title: "Don't nest too many Stacks deeply",
      description:
        "Deep nesting can lead to complex layouts that are hard to maintain and may cause performance issues.",
      type: "dont",
    },
    {
      title: "Don't use Stack for complex grid layouts",
      description:
        "Use Grid or other layout components when you need more complex two-dimensional layouts.",
      type: "dont",
    },
    {
      title: "Don't use Stack with zero spacing for adjacent elements",
      description:
        "For elements that should be directly adjacent, consider using a container instead of a Stack with zero spacing.",
      type: "dont",
    },
  ];

  const bestPractices = [
    {
      title: "Use appropriate spacing for content type",
      description:
        "Choose spacing based on the relationship between elements. Closely related items should have less spacing.",
    },
    {
      title: "Switch direction at responsive breakpoints",
      description:
        "For mobile-friendly layouts, use column direction on small screens and row direction on larger screens.",
    },
    {
      title: "Set proper alignment",
      description:
        "Ensure items are aligned properly, especially for elements with varying heights or widths.",
    },
    {
      title: "Consider dividers for clarity",
      description:
        "Use dividers when you have a long list of similar items to help users distinguish between them.",
    },
  ];

  const accessibility = [
    {
      title: "Maintain adequate spacing",
      description:
        "Ensure sufficient spacing between interactive elements (minimum 8px) to prevent accidental interactions.",
    },
    {
      title: "Use semantic grouping",
      description:
        "When Stack contains related items that form a logical group, consider adding appropriate ARIA roles.",
    },
    {
      title: "Consider RTL support",
      description:
        "Enable supportRtl prop when your application needs to support right-to-left languages.",
    },
    {
      title: "Focus management",
      description:
        "Ensure proper focus management within stacked interactive elements for keyboard navigation.",
    },
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibility}
    />
  );
});

export default StackUsage;
