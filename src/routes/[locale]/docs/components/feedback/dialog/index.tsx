import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { ComponentPage } from "~/components/Docs/ComponentPage";
import {
  Overview,
  Examples,
  APIReference,
  Usage,
  Playground,
  componentIntegration,
  customization,
} from "~/components/Core/Feedback/Dialog/docs";

export default component$(() => {
  return (
    <ComponentPage
      name="Dialog"
      description="A modal dialog component for displaying content that requires user attention or interaction."
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
  title: "Dialog Component",
  meta: [
    {
      name: "description",
      content:
        "Dialog component for displaying modal content that requires user attention or interaction in Qwik applications.",
    },
    {
      name: "keywords",
      content:
        "dialog, modal, popup, overlay, confirmation, form dialog, Qwik UI, Connect, design system",
    },
  ],
};
