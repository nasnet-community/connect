import { component$ } from '@builder.io/qwik';
import { ComponentPage } from '~/components/Docs/ComponentPage';
import { ListOverview, ListExamples, ListAPIReference, ListUsage, ListPlayground } from '~/components/Core/DataDisplay/List/docs';

export default component$(() => {
  return (
    <ComponentPage
      name="List"
      description="A component for displaying content in ordered, unordered, and definition list formats"
      Overview={<ListOverview />}
      Examples={<ListExamples />}
      APIReference={<ListAPIReference />}
      Usage={<ListUsage />}
      Playground={<ListPlayground />}
    />
  );
});
