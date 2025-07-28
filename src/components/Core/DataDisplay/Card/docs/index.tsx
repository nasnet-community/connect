import { component$ } from "@builder.io/qwik";

import Overview from "./Overview";
import Examples from "./Examples";
import APIReference from "./APIReference";
import Usage from "./Usage";
import Playground from "./Playground";

export default component$(() => {
  return <div>Card Documentation Index</div>;
});

export { Overview, Examples, APIReference, Usage, Playground };

export const componentIntegration = {
  labels: {
    overview: "Overview",
    examples: "Examples",
    apiReference: "API Reference",
    usage: "Usage Guidelines",
    playground: "Playground",
  },
  components: {
    overview: Overview,
    examples: Examples,
    apiReference: APIReference,
    usage: Usage,
    playground: Playground,
  },
};

export const customization = {
  name: "Card",
  category: "DataDisplay",
  description:
    "A flexible container for displaying content and actions in a contained, styled box.",
  repository: "src/components/Core/DataDisplay/Card",
  features: [
    "Composable structure with header, body, footer, and media sections",
    "Multiple visual variants and elevation options",
    "Interactive states and hover effects",
    "Configurable border radius and dimensions",
    "Link capability for navigation",
  ],
};
