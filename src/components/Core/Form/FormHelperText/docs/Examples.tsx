import { component$ } from '@builder.io/qwik';
import { ExamplesTemplate, type Example } from '~/components/Docs/templates';
import BasicHelperText from '../Examples/BasicHelperText';
import HelperTextSizes from '../Examples/HelperTextSizes';
import HelperTextStates from '../Examples/HelperTextStates';
import HelperTextWithIcons from '../Examples/HelperTextWithIcons';
import HelperTextAccessibility from '../Examples/HelperTextAccessibility';

/**
 * FormHelperText component examples documentation using the standard template
 */
export default component$(() => {
  const examples: Example[] = [
    {
      title: "Basic Helper Text",
      description: "Basic usage of helper text to provide additional information for form fields.",
      component: <BasicHelperText />
    },
    {
      title: "Helper Text Sizes",
      description: "The FormHelperText component is available in three different sizes: small, medium (default), and large.",
      component: <HelperTextSizes />
    },
    {
      title: "Helper Text States",
      description: "Helper text can reflect different states including default, disabled, error, success, and warning states.",
      component: <HelperTextStates />
    },
    {
      title: "Helper Text with Icons",
      description: "Icons can be added to helper text to enhance visual communication and reinforce the message type.",
      component: <HelperTextWithIcons />
    },
    {
      title: "Accessibility Features",
      description: "Examples of proper accessibility implementations including ID association with form fields and screen-reader-only text.",
      component: <HelperTextAccessibility />
    }
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The FormHelperText component provides contextual guidance for form fields. These examples 
        demonstrate the various ways the component can be used to enhance form usability and 
        user experience.
      </p>
      <p class="mt-2">
        Helper text should be concise, helpful, and appropriate for the context. Use different 
        states and icons to convey the nature of the information being presented, and ensure 
        proper accessibility by associating helper text with its corresponding form field.
      </p>
    </ExamplesTemplate>
  );
}); 