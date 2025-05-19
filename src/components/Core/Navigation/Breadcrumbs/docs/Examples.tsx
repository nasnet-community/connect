import { component$ } from '@builder.io/qwik';
import { ExamplesTemplate } from '~/components/Docs/templates';

// Import examples
import Basic from '../Examples/Basic';
import WithIcons from '../Examples/WithIcons';
import Truncation from '../Examples/Truncation';
import Separators from '../Examples/Separators';
import CustomStyling from '../Examples/CustomStyling';
import AccessibleUsage from '../Examples/AccessibleUsage';

export default component$(() => {
  const examples = [
    {
      title: 'Basic Usage',
      description: 'A simple breadcrumb trail showing the navigation path.',
      component: <Basic />
    },
    {
      title: 'With Icons',
      description: 'Breadcrumbs with icons to provide additional visual cues.',
      component: <WithIcons />
    },
    {
      title: 'Truncation',
      description: 'Control how many items are displayed before truncation occurs.',
      component: <Truncation />
    },
    {
      title: 'Separators',
      description: 'Different separator options to customize the appearance.',
      component: <Separators />
    },
    {
      title: 'Styling and Customization',
      description: 'Examples of custom styling applied to breadcrumbs.',
      component: <CustomStyling />
    },
    {
      title: 'Accessible Implementation',
      description: 'Properly implemented breadcrumbs with accessibility features.',
      component: <AccessibleUsage />
    }
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The following examples demonstrate the various ways you can use and customize the Breadcrumbs component.
        From basic usage to advanced configurations, these examples showcase the component's versatility.
      </p>
    </ExamplesTemplate>
  );
});
