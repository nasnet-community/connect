import { component$ } from "@builder.io/qwik";
import { ComponentPage } from "~/components/Docs/ComponentPage";
import {
  Overview,
  Examples,
  APIReference,
  Usage,
  Playground,
  componentIntegration,
  customization,
} from "~/components/Core/Graph/docs";

export default component$(() => {
  return (
    <ComponentPage
      name="Graph Component"
      description="Interactive network graph visualization for displaying node relationships, network topologies, and traffic flows"
      Overview={Overview}
      Examples={Examples}
      APIReference={APIReference}
      Usage={Usage}
      Playground={Playground}
      ComponentIntegration={componentIntegration}
      Customization={customization}
      defaultTab="overview"
    />
  );
});
