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
} from "~/components/Core/Navigation/Breadcrumbs/docs";

export default component$(() => {
  return (
    <ComponentPage
      name="Breadcrumbs"
      description="A navigation component that shows the hierarchical path to the current page, helping users understand their location within the website structure."
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
