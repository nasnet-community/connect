import { component$ } from "@builder.io/qwik";
import { ExamplesTemplate } from "~/components/Docs/templates";

// Import example components
import {
  BasicVisuallyHiddenExample,
  SkipLinkExample,
  ScreenReaderAnnouncementExample,
} from "../Examples/VisuallyHiddenExample";
import {
  ClassNamesBasicExample,
  ConditionalClassesExample,
  ResponsiveClassesExample,
  ThemeAwareClassesExample,
} from "../Examples/UtilityExamples";
import {
  TypeDefinitionsExample,
  ValidationStateExample,
  OptionInterfaceExample,
} from "../Examples/TypesExample";
import {
  ResponsiveUtilitiesExample,
  MobileOptimizedExample,
  TouchFriendlyExample,
} from "../Examples/ResponsiveExample";

export default component$(() => {
  const examples = [
    {
      title: "Basic VisuallyHidden Usage",
      description:
        "Hide content visually while keeping it accessible to screen readers and keyboard navigation.",
      component: <BasicVisuallyHiddenExample />,
    },
    {
      title: "Skip Link Implementation",
      description:
        "Create accessible skip links that appear when focused, allowing keyboard users to bypass navigation.",
      component: <SkipLinkExample />,
    },
    {
      title: "Screen Reader Announcements",
      description:
        "Provide contextual information to screen reader users without cluttering the visual interface.",
      component: <ScreenReaderAnnouncementExample />,
    },
    {
      title: "Basic className Merging",
      description:
        "Use the classNames utility to merge class strings while filtering out falsy values.",
      component: <ClassNamesBasicExample />,
    },
    {
      title: "Conditional Class Application",
      description:
        "Apply classes conditionally based on component state, props, or other variables.",
      component: <ConditionalClassesExample />,
    },
    {
      title: "Responsive Class Management",
      description:
        "Combine responsive design classes for different screen sizes using Tailwind breakpoints.",
      component: <ResponsiveClassesExample />,
    },
    {
      title: "Theme-Aware Styling",
      description:
        "Apply different classes based on the current theme (light/dark mode) for consistent styling.",
      component: <ThemeAwareClassesExample />,
    },
    {
      title: "Type Definitions in Practice",
      description:
        "Demonstrate how to use the common type definitions in real components for better type safety.",
      component: <TypeDefinitionsExample />,
    },
    {
      title: "Validation States",
      description:
        "Use ValidationState types to create consistent form validation UI across components.",
      component: <ValidationStateExample />,
    },
    {
      title: "Option Interface Usage",
      description:
        "Implement dropdown and select components using the standardized Option interface.",
      component: <OptionInterfaceExample />,
    },
    {
      title: "Responsive Utilities",
      description:
        "Create components that adapt seamlessly to different device sizes and orientations.",
      component: <ResponsiveUtilitiesExample />,
    },
    {
      title: "Mobile-Optimized Components",
      description:
        "Build mobile-first components with touch-friendly interactions and optimized layouts.",
      component: <MobileOptimizedExample />,
    },
    {
      title: "Touch-Friendly Interactions",
      description:
        "Implement components with appropriate touch targets and gesture support for mobile devices.",
      component: <TouchFriendlyExample />,
    },
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The following examples showcase the versatility and power of the common utilities module.
        Each example demonstrates real-world usage patterns that you can adapt for your specific
        needs. These utilities are designed to work together seamlessly, providing a solid
        foundation for building accessible, responsive, and maintainable components.
      </p>
      
      <div class="mt-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
        <h3 class="font-medium text-blue-900 dark:text-blue-100">💡 Pro Tip</h3>
        <p class="mt-1 text-sm text-blue-800 dark:text-blue-200">
          These utilities are most powerful when combined. For example, use <code>classNames</code> with
          responsive classes and theme-aware styling, while ensuring accessibility with 
          <code>VisuallyHidden</code> and proper type safety with our TypeScript definitions.
        </p>
      </div>
    </ExamplesTemplate>
  );
});