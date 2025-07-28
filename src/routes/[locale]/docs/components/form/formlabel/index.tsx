import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { ComponentPage } from "~/components/Docs/ComponentPage";
import {
  APIReference,
  Examples,
  Overview,
  Playground,
  Usage,
  componentIntegration,
  customization,
} from "~/components/Core/Form/FormLabel/docs";

export default component$(() => {
  return (
    <ComponentPage
      name="FormLabel"
      description="A semantic label component for form controls with proper accessibility features."
      Overview={Overview}
      Examples={Examples}
      APIReference={APIReference}
      Usage={Usage}
      Playground={Playground}
      ComponentIntegration={componentIntegration}
      Customization={customization}
    />
  );
});

export const head: DocumentHead = {
  title: "FormLabel Component | Connect UI",
  meta: [
    {
      name: "description",
      content:
        "The FormLabel component provides a standardized way to label form controls with appropriate styling and accessibility features.",
    },
  ],
};
