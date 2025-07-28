import { component$ } from "@builder.io/qwik";
import { ExamplesTemplate } from "~/components/Docs/templates";

// Import examples
import {
  BasicButtonExample,
  ButtonSizesExample,
  ButtonStateExample,
  ButtonIconExample,
  ButtonTypeExample,
  ButtonWithEventExample,
} from "../Examples/ButtonExample";
import {
  SemanticVariantsBasicExample,
  SemanticVariantsWithIconsExample,
} from "../Examples/SemanticVariantsExample";
import {
  ResponsiveButtonExample,
} from "../Examples/ResponsiveButtonsExample";
import {
  HorizontalButtonGroupExample,
  ResponsiveButtonGroupExample,
} from "../Examples/ButtonGroupExample";
import {
  IconOnlyAccessibilityExample,
} from "../Examples/AccessibilityExample";
import {
  ComplexLoadingStatesExample,
  ButtonStateTransitionsExample,
  CompoundButtonExample,
} from "../Examples/AdvancedStatesExample";

export default component$(() => {
  const examples = [
    {
      title: "Basic Button Variants",
      description:
        "Button comes in four variants: primary (default), secondary, outline, and ghost.",
      component: <BasicButtonExample />,
    },
    {
      title: "Semantic Variants",
      description:
        "Semantic button variants for different message types: success, error, warning, and info.",
      component: <SemanticVariantsBasicExample />,
    },
    {
      title: "Button Sizes",
      description:
        "Buttons are available in three sizes: small, medium (default), and large.",
      component: <ButtonSizesExample />,
    },
    {
      title: "Button States",
      description: "Buttons can be in normal, disabled, or loading states.",
      component: <ButtonStateExample />,
    },
    {
      title: "Buttons with Icons",
      description:
        "Buttons can include icons on the left, right, or both sides.",
      component: <ButtonIconExample />,
    },
    {
      title: "Semantic Variants with Icons",
      description:
        "Semantic variants combined with icons for enhanced visual communication.",
      component: <SemanticVariantsWithIconsExample />,
    },
    {
      title: "Responsive Buttons",
      description:
        "Buttons that adapt to different screen sizes with fullWidth and responsive props.",
      component: <ResponsiveButtonExample />,
    },
    {
      title: "Button Groups",
      description: "Grouped buttons with proper spacing and mixed variants.",
      component: <HorizontalButtonGroupExample />,
    },
    {
      title: "Responsive Button Groups",
      description:
        "Button groups that stack on mobile for better touch interaction.",
      component: <ResponsiveButtonGroupExample />,
    },
    {
      title: "Accessibility Features",
      description:
        "Buttons with proper ARIA labels and keyboard navigation support.",
      component: <IconOnlyAccessibilityExample />,
    },
    {
      title: "Loading States",
      description:
        "Complex loading states with custom text and accessibility features.",
      component: <ComplexLoadingStatesExample />,
    },
    {
      title: "State Transitions",
      description:
        "Buttons that change appearance based on state with smooth transitions.",
      component: <ButtonStateTransitionsExample />,
    },
    {
      title: "Compound Buttons",
      description: "Buttons with badges, counts, and additional information.",
      component: <CompoundButtonExample />,
    },
    {
      title: "Button Types",
      description:
        "Semantic button types for forms: button, submit, and reset.",
      component: <ButtonTypeExample />,
    },
    {
      title: "Interactive Buttons",
      description: "Buttons can trigger actions when clicked.",
      component: <ButtonWithEventExample />,
    },
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The following examples demonstrate various configurations and use cases
        for the Button component. Each example showcases different features and
        customization options to help you implement buttons that best suit your
        application's needs.
      </p>
    </ExamplesTemplate>
  );
});
