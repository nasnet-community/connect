import { component$ } from "@builder.io/qwik";
import { ComponentPage } from "~/components/Docs/ComponentPage";
import {
  Overview,
  Examples,
  APIReference,
  Usage,
  Playground,
} from "~/components/Core/DataDisplay/Table/docs";

export default component$(() => {
  return (
    <ComponentPage
      name="Table"
      description="A component for displaying and organizing data in rows and columns"
      Overview={<Overview />}
      Examples={<Examples />}
      APIReference={<APIReference />}
      Usage={<Usage />}
      Playground={<Playground />}
    />
  );
});
