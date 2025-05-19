import { component$ } from '@builder.io/qwik';
import { ComponentPage } from '~/components/Docs/ComponentPage';
import { 
  SpacerOverview,
  SpacerExamples,
  SpacerAPIReference,
  SpacerUsage,
  SpacerPlayground
} from '~/components/Core/Layout/Spacer/docs';

export default component$(() => {
  return (
    <ComponentPage
      name="Spacer"
      description="A layout component that creates consistent whitespace between UI elements."
      Overview={<SpacerOverview />}
      Examples={<SpacerExamples />}
      APIReference={<SpacerAPIReference />}
      Usage={<SpacerUsage />}
      Playground={<SpacerPlayground />}
    />
  );
});