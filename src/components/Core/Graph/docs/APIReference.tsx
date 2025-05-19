import { component$ } from "@builder.io/qwik";
import { APIReferenceTemplate } from "~/components/Docs/templates";

export const APIReference = component$(() => {
  const props = [
    {
      name: "nodes",
      type: "GraphNode[]",
      defaultValue: "[]",
      description: "Array of nodes to render in the graph",
      required: true
    },
    {
      name: "connections",
      type: "GraphConnection[]",
      defaultValue: "[]",
      description: "Array of connections between nodes",
      required: true
    },
    {
      name: "title",
      type: "string",
      defaultValue: '"Network Graph"',
      description: "Optional title for the graph"
    },
    {
      name: "config",
      type: "GraphConfig",
      defaultValue: "defaultConfig",
      description: "Configuration options for the graph"
    },
    {
      name: "onNodeClick$",
      type: "QRL<(node: GraphNode) => void>",
      description: "Event handler for node click events"
    },
    {
      name: "onConnectionClick$",
      type: "QRL<(connection: GraphConnection) => void>",
      description: "Event handler for connection click events"
    }
  ];

  const cssVariables = [
    {
      name: "--node-size",
      defaultValue: "22px",
      description: "Base size for graph nodes"
    },
    {
      name: "--connection-width",
      defaultValue: "2px",
      description: "Base width for graph connections"
    }
  ];

  return (
    <APIReferenceTemplate
      props={props}
      cssVariables={cssVariables}
    />
  );
});

export default APIReference; 