import { component$ } from '@builder.io/qwik';
import { ComponentPage } from '~/components/Docs';
import {
  Overview,
  Examples,
  APIReference,
  Usage,
  Playground,
} from '~/components/Core/Feedback/Toast/docs';

export default component$(() => {
  return (
    <ComponentPage
      name="Toast"
      description="A toast component for displaying notifications, alerts, and feedback messages in a non-intrusive way."
      Overview={Overview}
      Examples={Examples}
      APIReference={APIReference}
      Usage={Usage}
      Playground={Playground}
      defaultTab="overview"
    />
  );
}); 