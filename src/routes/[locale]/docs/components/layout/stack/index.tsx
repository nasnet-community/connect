import { component$ } from "@builder.io/qwik";
import { ComponentPage } from "~/components/Docs/ComponentPage";
import {
  StackOverview,
  StackExamples,
  StackAPIReference,
  StackUsage,
  StackPlayground,
} from "~/components/Core/Layout/Stack/docs";

export default component$(() => {
  return (
    <ComponentPage
      name="Stack"
      description="A layout component for arranging elements vertically or horizontally with consistent spacing."
      Overview={<StackOverview />}
      Examples={<StackExamples />}
      APIReference={<StackAPIReference />}
      Usage={<StackUsage />}
      Playground={<StackPlayground />}
    />
  );
});
