import { component$ } from "@builder.io/qwik";

import Overview from "./Overview";
import Examples from "./Examples";
import APIReference from "./APIReference";
import Usage from "./Usage";
import Playground from "./Playground";

export default component$(() => {
  return <div>Input Documentation Index</div>;
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
  name: "Input",
  category: "Form",
  description:
    "A versatile input component with validation states, prefix/suffix slots, and comprehensive accessibility features.",
  repository: "src/components/Core/Input",
  features: [
    "Multiple input types (text, email, password, number, tel, url, search, date, time)",
    "Four sizes (sm, md, lg, xl) with mobile-optimized touch targets",
    "Validation states (default, valid, invalid, warning) with proper styling",
    "Prefix and suffix slot support for icons and actions",
    "Dark mode and light mode support",
    "RTL language support with logical properties",
    "Smooth animations and transitions",
    "Touch-friendly interactions for mobile devices",
    "Comprehensive accessibility with ARIA attributes",
    "Fluid width option and responsive design",
    "Custom styling support with Tailwind classes",
  ],
  accessibility: [
    "Proper ARIA attributes for screen readers",
    "Keyboard navigation support",
    "Focus management with visible focus indicators",
    "Error messages properly associated with inputs",
    "Required field indicators with aria-label",
    "High contrast mode support",
  ],
  responsive: [
    "Mobile-first design with touch-friendly targets",
    "Responsive sizing using Tailwind breakpoints",
    "Minimum height ensures touch accessibility",
    "Logical properties for RTL languages",
    "Safe area support for mobile devices",
  ],
};