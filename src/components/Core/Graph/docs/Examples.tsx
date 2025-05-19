import { component$ } from "@builder.io/qwik";
import { ExamplesTemplate } from "~/components/Docs/templates";
import { NetworkGraphExample } from "~/components/Core/Graph/Example/Example";
import { NetworkTrafficExample } from "~/components/Core/Graph/Example/TrafficExample";
import { ConnectionTypeExample } from "~/components/Core/Graph/Example/ConnectionTypeExample";

export const GraphExamples = component$(() => {
  const examples = [
    {
      title: "Basic Network Graph",
      description: "A basic network topology visualization with users, routers, and internet connections. Shows the default node styling and connection animations.",
      component: <NetworkGraphExample />
    },
    {
      title: "Network Traffic Types",
      description: "Demonstrates different traffic types flowing through a network with different color coding and animation patterns.",
      component: <NetworkTrafficExample />
    },
    {
      title: "Connection Types",
      description: "Showcases different physical connection types between network devices with appropriate visual styling.",
      component: <ConnectionTypeExample />
    }
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The following examples demonstrate various features of the Graph component, from basic usage to advanced configurations.
        Each example showcases different aspects of the component's functionality.
      </p>
    </ExamplesTemplate>
  );
});

export default GraphExamples; 