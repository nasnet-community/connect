import { component$ } from "@builder.io/qwik";
import { ExamplesTemplate } from "~/components/Docs/templates";

// Import examples
import Basic from "../Examples/Basic";
import WithPageSizeSelector from "../Examples/WithPageSizeSelector";
import WithPageInput from "../Examples/WithPageInput";
import CompactView from "../Examples/CompactView";
import CustomStyling from "../Examples/CustomStyling";
import AccessibleUsage from "../Examples/AccessibleUsage";

export default component$(() => {
  const examples = [
    {
      title: "Basic Usage",
      description:
        "Standard pagination with page numbers and navigation buttons.",
      component: <Basic />,
    },
    {
      title: "With Page Size Selector",
      description:
        "Pagination with options to change the number of items per page.",
      component: <WithPageSizeSelector />,
    },
    {
      title: "With Page Input",
      description:
        "Pagination with direct page input for quick navigation to specific pages.",
      component: <WithPageInput />,
    },
    {
      title: "Compact View",
      description:
        "Streamlined pagination for limited space with only next/previous buttons.",
      component: <CompactView />,
    },
    {
      title: "Custom Styling",
      description: "Customized pagination with different colors and spacing.",
      component: <CustomStyling />,
    },
    {
      title: "Accessible Implementation",
      description:
        "Pagination with enhanced accessibility features for screen readers.",
      component: <AccessibleUsage />,
    },
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The following examples demonstrate various configurations of the
        Pagination component. Each example showcases different features and
        customization options to help you implement pagination that best suits
        your application's needs.
      </p>
    </ExamplesTemplate>
  );
});
