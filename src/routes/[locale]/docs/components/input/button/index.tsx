import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { ComponentPage } from "~/components/Docs/ComponentPage";
import {
  ButtonOverview,
  ButtonExamples,
  ButtonAPIReference,
  ButtonUsage,
  ButtonPlayground,
} from "~/components/Core/button/docs";

export default component$(() => {
  return (
    <ComponentPage
      name="Button"
      description="Interactive button component that provides a consistent user experience for actions"
      Overview={ButtonOverview}
      Examples={ButtonExamples}
      APIReference={ButtonAPIReference}
      Usage={ButtonUsage}
      Playground={ButtonPlayground}
    />
  );
});

export const head: DocumentHead = {
  title: "Button Component",
  meta: [
    {
      name: "description",
      content:
        "Interactive button component that provides a consistent user experience for actions.",
    },
    {
      name: "keywords",
      content:
        "button, interactive, action, click, submit, form, Qwik UI, Connect, design system",
    },
  ],
};
