import { component$ } from "@builder.io/qwik";
import { ComponentPage } from "~/components/Docs/ComponentPage";
import {
  RadioOverview,
  RadioExamples,
  RadioAPIReference,
  RadioUsage,
  RadioPlayground,
} from "~/components/Core/Radio/docs";

export default component$(() => {
  return (
    <ComponentPage
      name="Radio"
      description="A radio button component for selecting a single option from a set of choices."
      Overview={<RadioOverview />}
      Examples={<RadioExamples />}
      APIReference={<RadioAPIReference />}
      Usage={<RadioUsage />}
      Playground={<RadioPlayground />}
    />
  );
});