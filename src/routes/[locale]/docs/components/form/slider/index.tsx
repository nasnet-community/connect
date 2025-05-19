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
} from '~/components/Core/Form/Slider/docs';

export default component$(() => {
  return (
    <ComponentPage
      name="Slider"
      description="An interactive component for selecting values or ranges with a draggable thumb."
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
  title: 'Slider Component | Connect UI',
  meta: [
    {
      name: 'description',
      content: 'The Slider component provides an interactive control for selecting numeric values or ranges by dragging a thumb along a track.'
    }
  ]
}; 