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
} from "~/components/Core/Feedback/Alert/docs";

export default component$(() => {
  return (
    <ComponentPage
      name="Alert"
      description="A component for displaying status messages, notifications, and feedback."
      Overview={<Overview />}
      Examples={<Examples />}
      APIReference={<APIReference />}
      Usage={<Usage />}
      Playground={<Playground />}
      ComponentIntegration={componentIntegration}
      Customization={customization}
    />
  );
});

export const head: DocumentHead = {
  title: "Alert Component",
  meta: [
    {
      name: "description",
      content:
        "Alert component for displaying status messages, notifications, and feedback in Qwik applications.",
    },
    {
      name: "keywords",
      content:
        "alert, notification, message, feedback, status, info, success, warning, error, Qwik UI, Connect, design system",
    },
  ],
};
