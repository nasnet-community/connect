import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { ComponentPage } from '../../../../../../components/Docs/ComponentPage';
import { 
  Overview, 
  Examples, 
  APIReference, 
  Usage, 
  Playground 
} from '../../../../../../components/Core/Form/ServerField/docs';

export default component$(() => {
  return (
    <ComponentPage
      name="ServerField"
      description="ServerField components provide layout structure for form elements in server-rendered forms where minimal JavaScript is required, supporting both vertical and inline layouts with validation error handling."
      Overview={Overview}
      Examples={Examples}
      APIReference={APIReference}
      Usage={Usage}
      Playground={Playground}
      defaultTab="overview"
    />
  );
});

export const head: DocumentHead = {
  title: 'ServerField Component - Connect Design System',
  meta: [
    {
      name: 'description',
      content: 'ServerField components provide layout structure for form elements in server-rendered forms where minimal JavaScript is required.'
    }
  ]
};
