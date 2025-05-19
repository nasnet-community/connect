import { component$ } from '@builder.io/qwik';
import { ExamplesTemplate } from '~/components/Docs/templates';

// Import examples
import BasicList from '../Examples/BasicList';
import ListVariants from '../Examples/ListVariants';
import DefinitionList from '../Examples/DefinitionList';
import MarkerStyles from '../Examples/MarkerStyles';
import SizesAndSpacing from '../Examples/SizesAndSpacing';
import NestedLists from '../Examples/NestedLists';
import InteractiveLists from '../Examples/InteractiveLists';
import AccessibleLists from '../Examples/AccessibleLists';

export default component$(() => {
  const examples = [
    {
      title: 'Basic List',
      description: 'Simple unordered list with default styling.',
      component: <BasicList />
    },
    {
      title: 'List Variants',
      description: 'Different types of lists: unordered, ordered, and definition lists.',
      component: <ListVariants />
    },
    {
      title: 'Definition List',
      description: 'List for term-description pairs with proper semantic markup.',
      component: <DefinitionList />
    },
    {
      title: 'Marker Styles',
      description: 'Different marker styles for unordered and ordered lists.',
      component: <MarkerStyles />
    },
    {
      title: 'Sizes and Spacing',
      description: 'Lists with different text sizes and spacing between items.',
      component: <SizesAndSpacing />
    },
    {
      title: 'Nested Lists',
      description: 'Hierarchical lists with proper indentation and styling.',
      component: <NestedLists />
    },
    {
      title: 'Interactive Lists',
      description: 'Lists with active, disabled, and interactive items.',
      component: <InteractiveLists />
    },
    {
      title: 'Accessible Lists',
      description: 'Lists with proper accessibility attributes and structure.',
      component: <AccessibleLists />
    }
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The following examples demonstrate various configurations and use cases for the List
        component. Each example showcases different features and customization options to help you
        implement lists that best suit your application's needs.
      </p>
    </ExamplesTemplate>
  );
});
