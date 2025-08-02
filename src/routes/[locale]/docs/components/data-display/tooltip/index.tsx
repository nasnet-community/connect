import { component$ } from "@builder.io/qwik";
import { ComponentPage } from "~/components/Docs/ComponentPage";
import {
  Overview,
  Examples,
  APIReference,
  Usage,
  Playground,
} from "~/components/Core/DataDisplay/Tooltip/docs";

export default component$(() => {
  return (
    <ComponentPage
      name="Tooltip"
      description="A small informative message that appears when a user hovers over, focuses on, or clicks an element"
      Overview={Overview}
      Examples={Examples}
      APIReference={APIReference}
      Usage={Usage}
      Playground={Playground}
    />
  );
});
