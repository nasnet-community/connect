import { component$ } from "@builder.io/qwik";
import { ExamplesTemplate, type Example } from "~/components/Docs/templates";

// Import examples
import BasicContainer from "../Examples/BasicContainer";
import ContainerSizes from "../Examples/ContainerSizes";
import ContainerPadding from "../Examples/ContainerPadding";
import ContainerAlignment from "../Examples/ContainerAlignment";

/**
 * Container component examples documentation using the standard template
 */
export default component$(() => {
  const examples: Example[] = [
    {
      title: "Basic Container",
      description:
        "A simple container with default settings to constrain content width.",
      component: <BasicContainer />,
    },
    {
      title: "Container Sizes",
      description:
        "Different container width options from extra small to full width and fluid.",
      component: <ContainerSizes />,
    },
    {
      title: "Container Padding",
      description:
        "Various padding options to control the space between container edges and content.",
      component: <ContainerPadding />,
    },
    {
      title: "Container Alignment",
      description:
        "Controls for container centering and alignment within its parent element.",
      component: <ContainerAlignment />,
    },
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The Container component is a fundamental layout building block for
        creating consistent, responsive designs. These examples demonstrate how
        to use the Container component's various features to constrain content
        width and apply proper spacing.
      </p>
      <p class="mt-2">
        By default, containers are responsive and apply their max-width
        constraint only at the designated breakpoint and above. This allows
        content to use the full available width on smaller screens while
        maintaining a comfortable reading width on larger displays.
      </p>
    </ExamplesTemplate>
  );
});
