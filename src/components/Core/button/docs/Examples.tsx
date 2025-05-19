import { component$ } from '@builder.io/qwik';
import { ExamplesTemplate } from '~/components/Docs/templates';

// Import examples
import { 
  BasicButtonExample,
  ButtonSizesExample,
  ButtonStateExample,
  ButtonIconExample,
  ButtonTypeExample, 
  ButtonColorExample,
  ButtonWithEventExample
} from '../Examples/ButtonExample';

export default component$(() => {
  const examples = [
    {
      title: 'Basic Button Variants',
      description: 'Button comes in four variants: primary (default), secondary, outline, and ghost.',
      component: <BasicButtonExample />
    },
    {
      title: 'Button Sizes',
      description: 'Buttons are available in three sizes: small, medium (default), and large.',
      component: <ButtonSizesExample />
    },
    {
      title: 'Button States',
      description: 'Buttons can be in normal, disabled, or loading states.',
      component: <ButtonStateExample />
    },
    {
      title: 'Buttons with Icons',
      description: 'Buttons can include icons on the left, right, or both sides.',
      component: <ButtonIconExample />
    },
    {
      title: 'Button Types',
      description: 'Semantic button types for forms: button, submit, and reset.',
      component: <ButtonTypeExample />
    },
    {
      title: 'Button Colors',
      description: 'Buttons can be customized with different colors using additional classes.',
      component: <ButtonColorExample />
    },
    {
      title: 'Interactive Buttons',
      description: 'Buttons can trigger actions when clicked.',
      component: <ButtonWithEventExample />
    }
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The following examples demonstrate various configurations and use cases for the Button
        component. Each example showcases different features and customization options to help you
        implement buttons that best suit your application's needs.
      </p>
    </ExamplesTemplate>
  );
});
