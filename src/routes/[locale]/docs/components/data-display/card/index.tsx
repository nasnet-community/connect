import { component$ } from "@builder.io/qwik";
import { ComponentPage } from "~/components/Docs/ComponentPage";
import {
  CardOverview,
  CardExamples,
  CardAPIReference,
  CardUsage,
  CardPlayground,
} from "~/components/Core/Card/docs";

export default component$(() => {
  return (
    <ComponentPage
      name="Card"
      description="A flexible container component for grouping and displaying related content."
      Overview={<CardOverview />}
      Examples={<CardExamples />}
      APIReference={<CardAPIReference />}
      Usage={<CardUsage />}
      Playground={<CardPlayground />}
    />
  );
});
