import { component$ } from "@builder.io/qwik";
import { ComponentPage } from "~/components/Docs/ComponentPage";
import {
  Overview,
  Examples,
  APIReference,
  Usage,
  Playground,
} from "~/components/Core/DataDisplay/List/docs";

export default component$(() => {
  return (
    <ComponentPage
      name="List"
      description="A component for displaying content in ordered, unordered, and definition list formats"
      Overview={<Overview />}
      Examples={<Examples />}
      APIReference={<APIReference />}
      Usage={<Usage />}
      Playground={<Playground />}
    />
  );
});
