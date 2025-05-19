import { component$ } from '@builder.io/qwik';
import { ExamplesTemplate } from '~/components/Docs/templates';

// Import examples
import Basic from '../Examples/Basic';
import WithIcons from '../Examples/WithIcons';
import Variants from '../Examples/Variants';
import Sizes from '../Examples/Sizes';
import VerticalOrientation from '../Examples/VerticalOrientation';
import WithState from '../Examples/WithState';
import AccessibleUsage from '../Examples/AccessibleUsage';

export default component$(() => {
  const examples = [
    {
      title: 'Basic Usage',
      description: 'A simple horizontal tab navigation with default styling.',
      component: <Basic />
    },
    {
      title: 'With Icons',
      description: 'Tabs with icons to enhance visual recognition.',
      component: <WithIcons />
    },
    {
      title: 'Visual Variants',
      description: 'Different visual styles for the tab navigation.',
      component: <Variants />
    },
    {
      title: 'Size Options',
      description: 'Tabs in different sizes to fit various layout needs.',
      component: <Sizes />
    },
    {
      title: 'Vertical Orientation',
      description: 'Tabs arranged vertically instead of horizontally.',
      component: <VerticalOrientation />
    },
    {
      title: 'Interactive State Management',
      description: 'Example of managing tab state and content switching.',
      component: <WithState />
    },
    {
      title: 'Accessible Implementation',
      description: 'Properly implemented tabs with accessibility features.',
      component: <AccessibleUsage />
    }
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The following examples demonstrate various configurations and use cases for the TabNavigation
        component. Each example showcases different features and customization options to help you
        implement tabs that best suit your application's needs.
      </p>
    </ExamplesTemplate>
  );
});
