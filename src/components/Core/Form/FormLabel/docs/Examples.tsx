import { component$ } from "@builder.io/qwik";
import { ExamplesTemplate, type Example } from "~/components/Docs/templates";
import BasicLabel from "../Examples/BasicLabel";
import LabelSizes from "../Examples/LabelSizes";
import LabelStates from "../Examples/LabelStates";
import LabelAccessibility from "../Examples/LabelAccessibility";
import ResponsiveLabel from "../Examples/ResponsiveLabel";
import FluidTypographyLabel from "../Examples/FluidTypographyLabel";
import ThemeIntegrationLabel from "../Examples/ThemeIntegrationLabel";
import TouchFriendlyLabel from "../Examples/TouchFriendlyLabel";

/**
 * FormLabel component examples documentation using the standard template
 */
export default component$(() => {
  const examples: Example[] = [
    {
      title: "Basic Label",
      description:
        "Standard form labels for different input types with enhanced responsive features and better tailwind config integration. Labels are properly associated with their inputs using semantic HTML.",
      component: <BasicLabel />,
    },
    {
      title: "Label Sizes",
      description:
        "FormLabel comes in three different sizes with fluid typography support: small, medium (default), and large. Includes static, auto-responsive, and fluid typography modes for optimal scaling.",
      component: <LabelSizes />,
    },
    {
      title: "Responsive Design",
      description:
        "Demonstrates responsive breakpoint behavior using tailwind config values. Labels automatically adapt to mobile (360px), tablet (768px), and desktop (1280px) breakpoints with touch optimization.",
      component: <ResponsiveLabel />,
    },
    {
      title: "Fluid Typography",
      description:
        "Showcases fluid typography scaling using CSS clamp() functions from the tailwind config. Typography scales smoothly between viewport sizes for optimal readability across all devices.",
      component: <FluidTypographyLabel />,
    },
    {
      title: "Theme Integration",
      description:
        "Advanced theme integration with semantic color tokens, surface variants, and theme switching. Demonstrates how labels work with light, dark, and high contrast modes using the comprehensive design system.",
      component: <ThemeIntegrationLabel />,
    },
    {
      title: "Touch-Friendly Mobile",
      description:
        "Mobile-optimized interactions with touch-friendly tap targets, enhanced spacing, and safe area support. Includes examples for mobile form patterns and gesture-based interactions.",
      component: <TouchFriendlyLabel />,
    },
    {
      title: "Label States",
      description:
        "Labels can visually reflect different states including default, required, disabled, error, success, and warning states with improved theme integration and semantic color usage.",
      component: <LabelStates />,
    },
    {
      title: "Accessibility Features",
      description:
        "Comprehensive accessibility implementations including standard labels, screen reader only labels, required field indicators with ARIA attributes, and mobile accessibility enhancements.",
      component: <LabelAccessibility />,
    },
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The FormLabel component provides a comprehensive solution for labeling form controls
        with advanced responsive design, fluid typography, and accessibility features. These examples
        demonstrate the component's extensive capabilities across different devices and use cases.
      </p>
      <p class="mt-2">
        All examples utilize the tailwind config's design token system including responsive breakpoints,
        fluid typography, semantic colors, and surface tokens. The component seamlessly adapts to
        mobile, tablet, and desktop experiences while maintaining accessibility standards.
      </p>
      <p class="mt-2">
        The enhanced examples showcase touch optimization, theme integration, and responsive behavior
        that ensures your forms work beautifully across all devices and user preferences.
      </p>
    </ExamplesTemplate>
  );
});
