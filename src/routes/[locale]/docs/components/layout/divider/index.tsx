import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { ComponentPage } from "~/components/Docs/ComponentPage";
import {
  DividerOverview,
  DividerExamples,
  DividerAPIReference,
  DividerUsage,
  DividerPlayground,
} from "~/components/Core/Layout/Divider/docs";

export default component$(() => {
  return (
    <ComponentPage
      name="Divider"
      description="A layout component that creates visual separation between content sections"
      Overview={DividerOverview}
      Examples={DividerExamples}
      APIReference={DividerAPIReference}
      Usage={DividerUsage}
      Playground={DividerPlayground}
    />
  );
});

export const head: DocumentHead = {
  title: "Divider Component",
  meta: [
    {
      name: "description",
      content:
        "A layout component that creates visual separation between content sections in the Connect design system.",
    },
    {
      name: "keywords",
      content:
        "divider, separator, horizontal rule, vertical divider, layout, spacing, Qwik UI, Connect, design system",
    },
  ],
};
