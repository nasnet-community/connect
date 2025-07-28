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
} from "~/components/Core/Form/DatePicker/docs";

export default component$(() => {
  return (
    <ComponentPage
      name="DatePicker"
      description="A component for selecting dates and date ranges with a calendar interface."
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

export const head: DocumentHead = {
  title: "DatePicker Component - Connect UI",
  meta: [
    {
      name: "description",
      content:
        "DatePicker component for selecting dates and date ranges with a calendar interface.",
    },
  ],
};
