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
} from '~/components/Core/Form/RadioGroup/docs';

export default component$(() => {
  return (
    <ComponentPage
      name="RadioGroup"
      description="A form control that allows users to select a single option from a set of mutually exclusive choices."
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