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
} from '~/components/Core/Form/PasswordField/docs';

export default component$(() => {
  return (
    <ComponentPage
      name="PasswordField"
      description="A secure input field for password entry with visibility toggle and strength indicators."
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

export const head: DocumentHead = {
  title: 'PasswordField Component - Connect UI',
  meta: [
    {
      name: 'description',
      content:
        'PasswordField component for secure password entry with visibility toggle and strength indicators.',
    },
  ],
}; 