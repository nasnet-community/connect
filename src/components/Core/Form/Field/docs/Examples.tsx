import { component$ } from '@builder.io/qwik';
import { ExamplesTemplate, type Example } from '~/components/Docs/templates';
import BasicField from '../Examples/BasicField';
import FieldTypes from '../Examples/FieldTypes';
import FieldLayouts from '../Examples/FieldLayouts';
import FieldSizes from '../Examples/FieldSizes';
import FieldStates from '../Examples/FieldStates';
import FieldWithSlots from '../Examples/FieldWithSlots';

/**
 * Field component examples documentation using the standard template
 */
export default component$(() => {
  const examples: Example[] = [
    {
      title: "Basic Field",
      description: "Basic implementation of a text field with a label. This example demonstrates the standard usage of the Field component.",
      component: <BasicField />
    },
    {
      title: "Field Types",
      description: "Different input types supported by the Field component. This example showcases how to use various HTML input types with the Field component.",
      component: <FieldTypes />
    },
    {
      title: "Field Layouts",
      description: "Various layout options for the Field component. This example demonstrates different ways to arrange labels and inputs.",
      component: <FieldLayouts />
    },
    {
      title: "Field Sizes",
      description: "Size variants of the Field component. This example shows the different size options available for the Field component.",
      component: <FieldSizes />
    },
    {
      title: "Field States",
      description: "Different states of the Field component including error, success, and disabled states. This example demonstrates how the Field component handles various states.",
      component: <FieldStates />
    },
    {
      title: "Field with Slots",
      description: "Using slots to customize the Field component with additional content. This example shows how to extend the Field component with custom elements.",
      component: <FieldWithSlots />
    }
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The Field component is versatile and can be used in various ways. Here are examples that showcase different features and use cases.
        Each example demonstrates a specific aspect of the Field component's capabilities, from basic usage to advanced customization.
      </p>
    </ExamplesTemplate>
  );
}); 