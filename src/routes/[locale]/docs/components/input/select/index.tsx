import { component$ } from '@builder.io/qwik';
import { ComponentPage } from "~/components/Docs/ComponentPage";
import {
  Overview,
  Examples,
  APIReference,
  Usage,
  Playground,
  componentIntegration,
  customization
} from '~/components/Core/Select/docs';

export default component$(() => {
  return (
    <ComponentPage
      name="Select"
      description="A customizable dropdown selection component with support for searching, grouping, and multiple selection."
      Overview={Overview}
      Examples={Examples}
      APIReference={APIReference}
      Usage={Usage}
      Playground={Playground}
      ComponentIntegration={componentIntegration}
      Customization={customization}
      defaultTab="overview"
    />
  );
}); 