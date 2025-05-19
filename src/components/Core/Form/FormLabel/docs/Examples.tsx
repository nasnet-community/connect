import { component$ } from '@builder.io/qwik';
import { ExamplesTemplate, type Example } from '~/components/Docs/templates';
import BasicLabel from '../Examples/BasicLabel';
import LabelSizes from '../Examples/LabelSizes';
import LabelStates from '../Examples/LabelStates';
import LabelAccessibility from '../Examples/LabelAccessibility';

/**
 * FormLabel component examples documentation using the standard template
 */
export default component$(() => {
  const examples: Example[] = [
    {
      title: "Basic Label",
      description: "Standard form labels for different input types. Labels are properly associated with their inputs using the 'for' attribute.",
      component: <BasicLabel />
    },
    {
      title: "Label Sizes",
      description: "FormLabel comes in three different sizes: small, medium (default), and large. Choose the right size based on your form design.",
      component: <LabelSizes />
    },
    {
      title: "Label States",
      description: "Labels can visually reflect different states including default, required, disabled, error, success, and warning states to match input validation.",
      component: <LabelStates />
    },
    {
      title: "Accessibility Features",
      description: "Examples of accessibility implementations including standard labels, screen reader only labels, and required field indicators with ARIA attributes.",
      component: <LabelAccessibility />
    }
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The FormLabel component provides a consistent way to label form controls with appropriate 
        styling and accessibility features. These examples demonstrate the component's flexibility
        in different contexts and states.
      </p>
      <p class="mt-2">
        All examples follow accessibility best practices by properly associating labels with their 
        respective input fields, ensuring that your forms are usable by everyone, including those 
        using assistive technologies.
      </p>
    </ExamplesTemplate>
  );
}); 