import { component$ } from "@builder.io/qwik";
import { ComponentPage } from "~/components/Docs/ComponentPage";
import {
  ToggleOverview,
  ToggleExamples,
  ToggleAPIReference,
  ToggleUsage,
  TogglePlayground,
} from "~/components/Core/Toggle/docs";

export default component$(() => {
  return (
    <ComponentPage
      name="Toggle"
      description="A binary toggle component for switching between two states, typically on/off or enabled/disabled."
      Overview={<ToggleOverview />}
      Examples={<ToggleExamples />}
      APIReference={<ToggleAPIReference />}
      Usage={<ToggleUsage />}
      Playground={<TogglePlayground />}
    />
  );
});