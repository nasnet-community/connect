import { component$ } from '@builder.io/qwik';
import { ExamplesTemplate } from '~/components/Docs/templates';

// Import examples
import BasicToggle from '../Examples/BasicToggle';
import ToggleSizes from '../Examples/ToggleSizes';
import ToggleLabels from '../Examples/ToggleLabels';
import ToggleStates from '../Examples/ToggleStates';
import ToggleInForm from '../Examples/ToggleInForm';

export default component$(() => {
  const examples = [
    {
      title: 'Basic Toggle',
      description: 'A simple toggle switch with default settings.',
      component: <BasicToggle />
    },
    {
      title: 'Toggle Sizes',
      description: 'Toggles are available in three sizes: small, medium (default), and large.',
      component: <ToggleSizes />
    },
    {
      title: 'Label Positions',
      description: 'Labels can be positioned on the left or right side of the toggle, or omitted entirely.',
      component: <ToggleLabels />
    },
    {
      title: 'Toggle States',
      description: 'Toggles can be in various states: checked, unchecked, disabled, or required.',
      component: <ToggleStates />
    },
    {
      title: 'Toggle in a Form',
      description: 'Example of toggles used in a form context for user preferences.',
      component: <ToggleInForm />
    }
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The following examples demonstrate various configurations and use cases for the Toggle
        component. Each example showcases different features and customization options to help you
        implement toggles that best suit your application's needs.
      </p>
    </ExamplesTemplate>
  );
});
