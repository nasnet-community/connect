import { component$ } from '@builder.io/qwik';
import { ExamplesTemplate, type Example } from '~/components/Docs/templates';
import BasicCheckbox from '../Examples/BasicCheckbox';
import CheckboxSizes from '../Examples/CheckboxSizes';
import CheckboxStates from '../Examples/CheckboxStates';
import CheckboxHelperText from '../Examples/CheckboxHelperText';
import CheckboxGroup from '../Examples/CheckboxGroup';

/**
 * Checkbox component examples documentation using the standard template
 */
export default component$(() => {
  const examples: Example[] = [
    {
      title: "Basic Checkbox",
      description: "Simple checkbox with a label. This example demonstrates the standard implementation of a checkbox.",
      component: <BasicCheckbox />
    },
    {
      title: "Checkbox Sizes",
      description: "Different size variants of the Checkbox component including small, medium, and large.",
      component: <CheckboxSizes />
    },
    {
      title: "Checkbox States",
      description: "Various states of the Checkbox component including normal, disabled, error, and indeterminate states.",
      component: <CheckboxStates />
    },
    {
      title: "Checkbox with Helper Text",
      description: "Checkbox with additional helper text, required indicators, and inline usage without a container.",
      component: <CheckboxHelperText />
    },
    {
      title: "Checkbox Group",
      description: "A group of related checkboxes managed together, with both vertical and horizontal layouts.",
      component: <CheckboxGroup />
    }
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The Checkbox component offers a range of customization options to fit different use cases.
        These examples showcase the component's flexibility, from basic usage to more advanced patterns
        like groups and different states.
      </p>
    </ExamplesTemplate>
  );
}); 