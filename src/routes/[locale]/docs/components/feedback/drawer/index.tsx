import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { ComponentPage } from '~/components/Docs/ComponentPage';
import {
  Overview,
  Examples,
  APIReference,
  Usage,
  Playground
} from '~/components/Core/Feedback/Drawer/docs';

export default component$(() => {
  return (
    <ComponentPage
      name="Drawer"
      description="A panel that slides in from the edge of the screen, containing supplementary content."
      Overview={Overview}
      Examples={Examples}
      APIReference={APIReference}
      Usage={Usage}
      Playground={Playground}
      ComponentIntegration="Drawer components integrate well with navigation systems, forms, and filtering interfaces where additional options or content needs to be accessible without leaving the current context."
      Customization="Drawers can be customized through placement (top, right, bottom, left), size, backdrop options, and animation settings."
      defaultTab="overview"
    />
  );
});

export const head: DocumentHead = {
  title: 'Drawer Component',
  meta: [
    {
      name: 'description',
      content: 'Drawer component provides a sliding panel that appears from the edge of the screen, used to display supplementary content.'
    }
  ]
}; 