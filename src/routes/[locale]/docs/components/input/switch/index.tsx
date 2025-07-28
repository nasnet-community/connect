import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { ComponentPage } from "~/components/Docs/ComponentPage";
import {
  Overview as SwitchOverview,
  Examples as SwitchExamples,
  APIReference as SwitchAPIReference,
  Usage as SwitchUsage,
  Playground as SwitchPlayground,
} from "~/components/Core/Switch/docs";

export default component$(() => {
  return (
    <ComponentPage
      name="Switch"
      description="A toggle switch component for enabling or disabling states"
      Overview={<SwitchOverview />}
      Examples={<SwitchExamples />}
      APIReference={<SwitchAPIReference />}
      Usage={<SwitchUsage />}
      Playground={<SwitchPlayground />}
    />
  );
});

export const head: DocumentHead = {
  title: "Switch Component",
  meta: [
    {
      name: "description",
      content:
        "A toggle switch component for enabling or disabling states in the Connect design system.",
    },
    {
      name: "keywords",
      content:
        "switch, toggle, checkbox, form, input, on/off, Qwik UI, Connect, design system",
    },
  ],
};
