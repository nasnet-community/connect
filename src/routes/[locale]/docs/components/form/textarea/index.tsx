import { component$ } from '@builder.io/qwik';
import { ComponentPage } from "~/components/Docs/ComponentPage";
import { Overview, Examples, APIReference, Usage, Playground } from '~/components/Core/Form/TextArea/docs';

export default component$(() => {
  return (
    <ComponentPage
      name="TextArea"
      description="A multi-line text input component with auto-resizing, character counting, and other enhanced features."
      Overview={Overview}
      Examples={Examples}
      APIReference={APIReference}
      Usage={Usage}
      Playground={Playground}
    />
  );
}); 