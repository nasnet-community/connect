import { component$ } from "@builder.io/qwik";
import { ExamplesTemplate } from "~/components/Docs/templates";

// Import examples
import Basic from "../Examples/Basic";
import WithIcons from "../Examples/WithIcons";
import WithHeader from "../Examples/WithHeader";
import NestedItems from "../Examples/NestedItems";
import Responsive from "../Examples/Responsive";

export default component$(() => {
  const examples = [
    {
      title: "Basic Usage",
      description: "A simple side navigation with flat navigation items.",
      component: <Basic />,
    },
    {
      title: "With Icons",
      description: "Side navigation with icons to enhance visual recognition.",
      component: <WithIcons />,
    },
    {
      title: "With Header",
      description: "Side navigation with a custom header for branding.",
      component: <WithHeader />,
    },
    {
      title: "Nested Navigation Items",
      description:
        "Hierarchical navigation with expandable sections and nested items.",
      component: <NestedItems />,
    },
    {
      title: "Responsive Navigation",
      description:
        "Mobile-friendly side navigation that transforms into an off-canvas menu.",
      component: <Responsive />,
    },
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The following examples demonstrate various configurations and use cases
        for the SideNavigation component. From simple flat navigation to complex
        hierarchical structures, these examples showcase the flexibility and
        features of the component.
      </p>
    </ExamplesTemplate>
  );
});
