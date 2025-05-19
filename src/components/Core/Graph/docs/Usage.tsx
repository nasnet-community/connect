import { component$ } from "@builder.io/qwik";
import { UsageTemplate } from "~/components/Docs/templates";

export const Usage = component$(() => {
  return (
    <UsageTemplate>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Basic Usage Example</h3>
      <p class="mb-4">Here's how to use the Graph component with the essential props:</p>
      <pre class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-x-auto text-sm">
        <code>{`import { Graph, createNode } from "~/components/Core/Graph";
import type { GraphConnection } from "~/components/Core/Graph";

// Create nodes
const nodes = [
  createNode("User", "user1", 50, 100, { label: "Client" }),
  createNode("WirelessRouter", "router", 180, 100, { label: "Router" }),
  createNode("DomesticWAN", "wan", 310, 100, { label: "Internet" })
];

// Create connections
const connections: GraphConnection[] = [
  { 
    from: "user1", 
    to: "router",
    color: "#f59e0b",
    animated: true
  },
  { 
    from: "router", 
    to: "wan",
    color: "#84cc16",
    animated: true,
    label: "Internet Connection"
  }
];

// Render the Graph component
<Graph 
  nodes={nodes}
  connections={connections}
  title="Simple Network"
  onNodeClick$={(node) => console.log('Node clicked:', node)}
/>`}</code>
      </pre>
    </UsageTemplate>
  );
});

export default Usage; 