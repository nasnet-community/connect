import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { ComponentPage } from '~/components/Docs/ComponentPage';
import { 
  FlexOverview,
  FlexExamples,
  FlexAPIReference,
  FlexUsage,
  FlexPlayground
} from '~/components/Core/Layout/Flex/docs';

export default component$(() => {
  return (
    <ComponentPage
      name="Flex"
      description="A layout component for one-dimensional layouts using Flexbox"
      Overview={<FlexOverview />}
      Examples={<FlexExamples />}
      APIReference={<FlexAPIReference />}
      Usage={<FlexUsage />}
      Playground={<FlexPlayground />}
    />
  );
});

export const head: DocumentHead = {
  title: 'Flex Component',
  meta: [
    {
      name: 'description',
      content: 'A layout component for one-dimensional layouts using the CSS Flexbox module in the Connect design system.'
    },
    {
      name: 'keywords',
      content: 'flex, flexbox, layout, responsive, direction, align, justify, gap, Qwik UI, Connect, design system'
    }
  ]
};
