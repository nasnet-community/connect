import { routeLoader$ } from "@builder.io/qwik-city";

import Overview from "./Overview";
import Examples from "./Examples";
import APIReference from "./APIReference";
import Usage from "./Usage";
import Playground from "./Playground";

export const useDocumentationLoader = routeLoader$(() => {
  return {
    title: "Tooltip",
    description:
      "A small informative message that appears when a user hovers over, focuses on, or clicks an element.",
    githubLink:
      "https://github.com/your-org/connect/tree/main/src/components/Core/DataDisplay/Tooltip",
    NPMLink: "https://www.npmjs.com/package/@your-org/core-components",
    sections: [
      {
        title: "Overview",
        description: "Introduction to the Tooltip component",
        slug: "",
      },
      {
        title: "Examples",
        description: "Various usage examples and patterns",
        slug: "examples",
      },
      {
        title: "API Reference",
        description: "Technical details, props, methods, and events",
        slug: "api-reference",
      },
      {
        title: "Usage",
        description: "Guidelines for proper component implementation",
        slug: "usage",
      },
      {
        title: "Playground",
        description: "Interactive component editor",
        slug: "playground",
      },
    ],
  };
});

export { Overview, Examples, APIReference, Usage, Playground };
