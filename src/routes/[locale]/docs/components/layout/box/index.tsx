import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { ComponentPage } from "~/components/Docs/ComponentPage";
import {
  BoxOverview,
  BoxExamples,
  BoxAPIReference,
  BoxUsage,
  BoxPlayground,
} from "~/components/Core/Layout/Box/docs";

export default component$(() => {
  return (
    <ComponentPage
      name="Box"
      description="Fundamental layout container with spacing and styling options"
      Overview={BoxOverview}
      Examples={BoxExamples}
      APIReference={BoxAPIReference}
      Usage={BoxUsage}
      Playground={BoxPlayground}
    />
  );
});

export const head: DocumentHead = {
  title: "Box Component",
  meta: [
    {
      name: "description",
      content:
        "A fundamental layout container with spacing and styling options in the Connect design system.",
    },
    {
      name: "keywords",
      content:
        "box, container, layout, padding, margin, styling, Qwik UI, Connect, design system",
    },
  ],
};
