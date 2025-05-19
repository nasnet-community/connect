import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { ComponentPage } from "~/components/Docs/ComponentPage";
import {
  APIReference,
  Examples,
  Overview,
  Playground,
  Usage,
  componentIntegration,
  customization
} from '~/components/Core/Form/FormErrorMessage/docs';

export default component$(() => {
  return (
    <ComponentPage
      name="FormErrorMessage"
      description="A component for displaying validation errors and form submission errors."
      Overview={Overview}
      Examples={Examples}
      APIReference={APIReference}
      Usage={Usage}
      Playground={Playground}
      ComponentIntegration={componentIntegration}
      Customization={customization}
    />
  );
});

export const head: DocumentHead = {
  title: 'FormErrorMessage Component | Connect UI',
  meta: [
    {
      name: 'description',
      content: 'The FormErrorMessage component provides clear feedback for validation errors in forms with support for different sizes, icons, and animation features.'
    }
  ]
}; 