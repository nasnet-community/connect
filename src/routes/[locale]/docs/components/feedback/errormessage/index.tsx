import { component$ } from '@builder.io/qwik';
import { ComponentPage } from '~/components/Docs';
import {
  Overview,
  Examples,
  APIReference,
  Usage,
  Playground,
} from '~/components/Core/Feedback/ErrorMessage/docs';

export default component$(() => {
  return (
    <ComponentPage
      name="ErrorMessage"
      description="A component for displaying error messages to users in a clear, accessible way."
      Overview={Overview}
      Examples={Examples}
      APIReference={APIReference}
      Usage={Usage}
      Playground={Playground}
      defaultTab="overview"
    />
  );
}); 