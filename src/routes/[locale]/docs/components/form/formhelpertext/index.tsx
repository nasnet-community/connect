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
} from "~/components/Core/Form/FormHelperText/docs";

export default component$(() => {
  return (
    <ComponentPage
      name="FormHelperText"
      description="A component for providing supplementary information and guidance for form fields."
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
  title: "FormHelperText Component | Connect UI",
  meta: [
    {
      name: "description",
      content:
        "The FormHelperText component provides contextual assistance and guidance for form fields with support for different visual states and accessibility features.",
    },
  ],
};
