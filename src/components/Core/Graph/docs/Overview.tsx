import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates";

export const GraphOverview = component$(() => {
  const keyFeatures = [
    "Customizable nodes with different types and icons",
    "Animated connections with packet animations",
    "Support for different connection types (Ethernet, Wireless, etc.)",
    "Support for different traffic types",
    "Interactive nodes with click events",
    "Expandable view for better visualization",
    "Light and dark mode support",
    "Automatic legends generation",
  ];

  return (
    <OverviewTemplate title="Graph" keyFeatures={keyFeatures}>
      <p>
        The Graph component is a versatile visualization tool for rendering
        network topologies, connection diagrams, and relationship graphs. It's
        designed to visualize nodes and their connections with customizable
        styling, animations, and interactive behaviors.
      </p>
    </OverviewTemplate>
  );
});

export default GraphOverview;
