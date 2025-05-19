import { component$ } from '@builder.io/qwik';
import { ComponentPage } from "~/components/Docs/ComponentPage";
import { Overview, Examples, APIReference, Usage, Playground } from '~/components/Core/Form/Form/docs';

export default component$(() => {
  return (
    <ComponentPage
      name="Form"
      description="A component for creating forms with built-in state management, validation, and Qwik City integration."
      Overview={Overview}
      Examples={Examples}
      APIReference={APIReference}
      Usage={Usage}
      Playground={Playground}
    />
  );
}); 