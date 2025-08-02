import { component$ } from "@builder.io/qwik";
import { ComponentPage } from "~/components/Docs/ComponentPage";
import {
  Overview,
  Examples,
  APIReference,
  Usage,
  Playground,
} from "~/components/Core/Iconography";

export default component$(() => {
  return (
    <ComponentPage
      name="Iconography"
      description="A comprehensive icon system for building consistent and accessible user interfaces."
      Overview={Overview}
      Examples={Examples}
      APIReference={APIReference}
      Usage={Usage}
      Playground={Playground}
      ComponentIntegration="The Iconography system integrates seamlessly with all Connect components, providing consistent icon usage across buttons, inputs, navigation elements, and more. Icons automatically adapt to component sizes and states."
      Customization="Icons can be customized through size props, CSS classes, and inline styles. The system supports both monochrome and multi-color icons, with automatic theme adaptation for dark mode."
    />
  );
});