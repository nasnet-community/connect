import { component$ } from "@builder.io/qwik";
import { ComponentPage } from "~/components/Docs/ComponentPage";
import {
  Overview,
  Examples,
  APIReference,
  Usage,
  Playground,
} from "~/components/Core/Form/Field/docs";

export default component$(() => {
  return (
    <ComponentPage
      name="Field"
      description="A flexible form field component that provides standardized styling, validation, and accessibility for input elements."
      Overview={Overview}
      Examples={Examples}
      APIReference={APIReference}
      Usage={Usage}
      Playground={Playground}
    />
  );
});
