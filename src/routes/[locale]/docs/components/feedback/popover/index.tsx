import { component$ } from '@builder.io/qwik';
import { ComponentPage } from '~/components/Docs';
import {
  Overview,
  Examples,
  APIReference,
  Usage,
  Playground,
} from '~/components/Core/Feedback/Popover/docs';

export default component$(() => {
  return (
    <ComponentPage
      name="Popover"
      description="A floating component that displays contextual information or interactive content triggered by user interaction."
      Overview={Overview}
      Examples={Examples}
      APIReference={APIReference}
      Usage={Usage}
      Playground={Playground}
      defaultTab="overview"
    />
  );
}); 