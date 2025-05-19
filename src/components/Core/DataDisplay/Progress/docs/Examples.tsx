import { component$ } from '@builder.io/qwik';
import { ExamplesTemplate } from '~/components/Docs/templates';

// Import examples
import BasicProgressBar from '../Examples/BasicProgressBar';
import ProgressBarVariants from '../Examples/ProgressBarVariants';
import BasicSpinner from '../Examples/BasicSpinner';
import SpinnerVariants from '../Examples/SpinnerVariants';

export default component$(() => {
  const examples = [
    {
      title: 'Basic Progress Bar',
      description: 'Standard progress bars for tracking operation progress.',
      component: <BasicProgressBar />
    },
    {
      title: 'Progress Bar Variants',
      description: 'Different styles, colors, and configurations of progress bars.',
      component: <ProgressBarVariants />
    },
    {
      title: 'Basic Spinner',
      description: 'Spinners for indicating loading states.',
      component: <BasicSpinner />
    },
    {
      title: 'Spinner Variants',
      description: 'Different types, sizes, and colors of spinners.',
      component: <SpinnerVariants />
    }
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        Progress indicators are essential for providing users with feedback during operations
        that take time to complete. The following examples demonstrate various configurations 
        of both ProgressBar and Spinner components to suit different use cases.
      </p>
    </ExamplesTemplate>
  );
});
