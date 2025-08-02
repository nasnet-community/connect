import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { ComponentPage } from "~/components/Docs/ComponentPage";
import {
  ContainerOverview,
  ContainerExamples,
  ContainerAPIReference,
  ContainerUsage,
  ContainerPlayground,
} from "~/components/Core/Layout/Container/docs";

export default component$(() => {
  return (
    <ComponentPage
      name="Container"
      description="A layout component for constraining content width and providing consistent padding"
      Overview={ContainerOverview}
      Examples={ContainerExamples}
      APIReference={ContainerAPIReference}
      Usage={ContainerUsage}
      Playground={ContainerPlayground}
    />
  );
});

export const head: DocumentHead = {
  title: "Container Component",
  meta: [
    {
      name: "description",
      content:
        "Container component for constraining content width and providing consistent padding across various screen sizes.",
    },
    {
      name: "keywords",
      content:
        "container, layout, responsive, width, padding, Qwik UI, Connect, design system",
    },
  ],
};
