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
} from '~/components/Core/Form/FileUpload/docs';

export default component$(() => {
  return (
    <ComponentPage
      name="FileUpload"
      description="A versatile file upload component with drag and drop support, validation, and progress tracking."
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
  title: 'FileUpload Component | Connect UI',
  meta: [
    {
      name: 'description',
      content: 'The FileUpload component provides a user-friendly interface for selecting and uploading files with comprehensive validation and progress tracking.'
    }
  ]
}; 