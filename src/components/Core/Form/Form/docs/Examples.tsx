import { component$ } from '@builder.io/qwik';
import { ExamplesTemplate, type Example } from '~/components/Docs/templates';
import BasicForm from '../Examples/BasicForm';
import DynamicForm from '../Examples/DynamicForm';
import FormLayouts from '../Examples/FormLayouts';
import FormValidation from '../Examples/FormValidation';
import QwikCityIntegration from '../Examples/QwikCityIntegration';

/**
 * Form component examples documentation using the standard template
 */
export default component$(() => {
  const examples: Example[] = [
    {
      title: "Basic Form",
      description: "The simplest implementation of a form with standard fields. This example demonstrates the basic usage of the Form component with automatic form state management.",
      component: <BasicForm />
    },
    {
      title: "Form Validation",
      description: "Forms with validation rules applied to fields. This example shows how to implement client-side validation with different validation rules and custom error messages.",
      component: <FormValidation />
    },
    {
      title: "Form Layouts",
      description: "Different layout options for organizing form fields. This example demonstrates various form layouts including standard, inline, and grid layouts for different screen sizes.",
      component: <FormLayouts />
    },
    {
      title: "Dynamic Form Fields",
      description: "Forms with dynamically added or removed fields. This example shows how to work with dynamic form fields and conditional rendering based on user input.",
      component: <DynamicForm />
    },
    {
      title: "Qwik City Integration",
      description: "Integration with Qwik City actions for server-side form processing. This example demonstrates how to connect the form with server actions for real server-side validation and processing.",
      component: <QwikCityIntegration />
    }
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The Form component is versatile and can be used in various ways. Here are examples that showcase different features and use cases.
        Each example demonstrates a specific aspect of the Form component's capabilities, from basic usage to advanced integration patterns.
      </p>
    </ExamplesTemplate>
  );
}); 