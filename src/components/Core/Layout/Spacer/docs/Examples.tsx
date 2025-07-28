import { component$ } from "@builder.io/qwik";
import {
  ExamplesTemplate,
  type Example,
} from "~/components/Docs/templates/ExamplesTemplate";

// Import examples
import { SpacerBasic } from "./examples/SpacerBasic";
import { SpacerSizes } from "./examples/SpacerSizes";
import { SpacerHorizontal } from "./examples/SpacerHorizontal";
import { SpacerFlexible } from "./examples/SpacerFlexible";
import { SpacerResponsive } from "./examples/SpacerResponsive";
import { SpacerHideOnMobile } from "./examples/SpacerHideOnMobile";

export const SpacerExamples = component$(() => {
  const examples: Example[] = [
    {
      title: "Basic Spacer",
      description: "The basic vertical spacer adds space between elements.",
      component: <SpacerBasic />,
    },
    {
      title: "Size Variants",
      description:
        "Spacers come in multiple sizes: xs, sm, md, lg, xl, 2xl, 3xl, and 4xl.",
      component: <SpacerSizes />,
    },
    {
      title: "Horizontal Spacer",
      description:
        "Use the horizontal prop to create horizontal spacing between elements in a flex container.",
      component: <SpacerHorizontal />,
    },
    {
      title: "Flexible Spacer",
      description:
        "Use isFlexible prop to create a spacer that grows to fill available space, pushing content apart.",
      component: <SpacerFlexible />,
    },
    {
      title: "Responsive Sizing",
      description: "Spacers can have different sizes at different breakpoints.",
      component: <SpacerResponsive />,
    },
    {
      title: "Hide on Mobile",
      description:
        "Hide a spacer on mobile screens to create more compact layouts on small devices.",
      component: <SpacerHideOnMobile />,
    },
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p class="mb-4">
        The following examples demonstrate various ways to use the Spacer
        component to create consistent spacing in your layouts.
      </p>
    </ExamplesTemplate>
  );
});

export default SpacerExamples;
