import { component$ } from '@builder.io/qwik';
import { ExamplesTemplate } from '~/components/Docs/templates/ExamplesTemplate';
import StackBasic from './examples/StackBasic';
import StackDirection from './examples/StackDirection';
import StackSpacing from './examples/StackSpacing';
import StackAlignment from './examples/StackAlignment';
import StackJustify from './examples/StackJustify';
import StackDividers from './examples/StackDividers';
import StackResponsive from './examples/StackResponsive';

export const StackExamples = component$(() => {
  const examples = [
    {
      title: 'Basic Stack',
      description: 'A simple vertical Stack with default spacing.',
      component: StackBasic
    },
    {
      title: 'Stack Direction',
      description: 'Stack can arrange items vertically (column) or horizontally (row).',
      component: StackDirection
    },
    {
      title: 'Stack Spacing',
      description: 'Control the spacing between stack items using the spacing prop.',
      component: StackSpacing
    },
    {
      title: 'Stack Alignment',
      description: 'Control how items are aligned along the cross axis using the align prop.',
      component: StackAlignment
    },
    {
      title: 'Stack Justification',
      description: 'Control how items are positioned along the main axis using the justify prop.',
      component: StackJustify
    },
    {
      title: 'Stack with Dividers',
      description: 'Add dividers between stack items with the dividers prop.',
      component: StackDividers
    },
    {
      title: 'Responsive Stack',
      description: 'Change the stack direction at different breakpoints using responsive props.',
      component: StackResponsive
    }
  ];

  return <ExamplesTemplate examples={examples} />;
});

export default StackExamples;
