import { component$ } from '@builder.io/qwik';
import { ExamplesTemplate } from '~/components/Docs/templates';

// Import examples
import Basic from '../Examples/Basic';
import WithIcons from '../Examples/WithIcons';
import WithDropdowns from '../Examples/WithDropdowns';
import Responsive from '../Examples/Responsive';
import WithActions from '../Examples/WithActions';
import AccessibleUsage from '../Examples/AccessibleUsage';

export default component$(() => {
  const examples = [
    {
      title: 'Basic Usage',
      description: 'Simple horizontal navigation bar with basic styling.',
      component: <Basic />
    },
    {
      title: 'With Icons',
      description: 'Navigation items with icons for enhanced visual recognition.',
      component: <WithIcons />
    },
    {
      title: 'With Dropdown Menus',
      description: 'Navigation with dropdown menus for organizing hierarchical content.',
      component: <WithDropdowns />
    },
    {
      title: 'Responsive Navigation',
      description: 'Navigation that adapts to different screen sizes with a mobile menu.',
      component: <Responsive />
    },
    {
      title: 'With Action Buttons',
      description: 'Navigation with additional action buttons such as sign in/sign up.',
      component: <WithActions />
    },
    {
      title: 'Accessible Implementation',
      description: 'Navigation with proper accessibility attributes and keyboard navigation.',
      component: <AccessibleUsage />
    }
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The following examples demonstrate various configurations and use cases for the TopNavigation
        component. Each example showcases different features and customization options to help you
        implement navigation that best suits your application's needs.
      </p>
    </ExamplesTemplate>
  );
});
