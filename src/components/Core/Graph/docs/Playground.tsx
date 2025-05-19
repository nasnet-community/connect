import { component$ } from "@builder.io/qwik";
import { PlaygroundTemplate } from "~/components/Docs/templates";
import { Graph } from "~/components/Core/Graph/Graph";
import { createNode } from "~/components/Core/Graph/Node/NodeTypes";
import type { GraphConfig, GraphConnection } from "~/components/Core/Graph/types";

// Define the Graph component for preview
const GraphComponent = component$((props: {
  nodeSize?: number;
  animate?: boolean;
  showTitle?: boolean;
  connectionColor?: string;
  connectionWidth?: number;
  connectionLabel?: string;
  dashed?: boolean;
}) => {
  // Create nodes
  const nodes = [
    createNode("User", "user1", 50, 100, { 
      label: "Client",
      size: props.nodeSize || 22
    }),
    createNode("WirelessRouter", "router", 180, 100, { 
      label: "Router",
      size: props.nodeSize || 22
    }),
    createNode("DomesticWAN", "wan", 310, 100, { 
      label: "Internet",
      size: props.nodeSize || 22
    })
  ];

  // Create connections
  const connections: GraphConnection[] = [
    { 
      from: "user1", 
      to: "router",
      color: props.connectionColor || "#f59e0b",
      animated: props.animate,
      width: props.connectionWidth,
      dashed: props.dashed
    },
    { 
      from: "router", 
      to: "wan",
      color: props.connectionColor || "#84cc16",
      animated: props.animate,
      label: props.connectionLabel || "",
      width: props.connectionWidth,
      dashed: props.dashed
    }
  ];

  // Graph config
  const config: GraphConfig = {
    height: "300px",
    viewBox: "0 0 400 200",
    preserveAspectRatio: "xMidYMid meet",
    showLegend: false
  };

  return (
    <Graph 
      nodes={nodes}
      connections={connections}
      title={props.showTitle ? "Network Graph" : undefined}
      config={config}
    />
  );
});

export const Playground = component$(() => {
  // Define the properties that can be adjusted in the playground
  const properties = [
    {
      type: "number" as const,
      name: "nodeSize",
      label: "Node Size",
      defaultValue: 22,
      min: 10,
      max: 40,
      step: 2
    },
    {
      type: "boolean" as const,
      name: "animate",
      label: "Animate Connections",
      defaultValue: true
    },
    {
      type: "boolean" as const,
      name: "showTitle",
      label: "Show Title",
      defaultValue: true
    },
    {
      type: "color" as const,
      name: "connectionColor",
      label: "Connection Color",
      defaultValue: "#3b82f6"
    },
    {
      type: "number" as const,
      name: "connectionWidth",
      label: "Connection Width",
      defaultValue: 2,
      min: 1,
      max: 5,
      step: 0.5
    },
    {
      type: "text" as const,
      name: "connectionLabel",
      label: "Connection Label",
      defaultValue: "Internet Connection"
    },
    {
      type: "boolean" as const,
      name: "dashed",
      label: "Dashed Connections",
      defaultValue: false
    }
  ];

  return (
    <PlaygroundTemplate
      component={GraphComponent}
      properties={properties}
    />
  );
});

export default Playground; 