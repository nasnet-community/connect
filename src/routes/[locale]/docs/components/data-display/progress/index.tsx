import { component$ } from '@builder.io/qwik';
import { ComponentPage } from '~/components/Docs/ComponentPage';
import ProgressDocs from '~/components/Core/DataDisplay/Progress/docs';

export default component$(() => {
  return (
    <ComponentPage
      title="Progress"
      subtitle="Progress indicators provide visual feedback about ongoing operations and processes"
      category="DataDisplay"
      componentName="Progress"
    >
      <ProgressDocs />
    </ComponentPage>
  );
});
