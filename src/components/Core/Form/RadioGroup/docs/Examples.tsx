import { component$ } from "@builder.io/qwik";
import { ExamplesTemplate, type Example } from "~/components/Docs/templates";
import BasicRadioGroup from "../Examples/BasicRadioGroup";
import RadioGroupDirections from "../Examples/RadioGroupDirections";
import RadioGroupStates from "../Examples/RadioGroupStates";
import RadioGroupInForm from "../Examples/RadioGroupInForm";

/**
 * RadioGroup component examples documentation using the standard template
 */
export default component$(() => {
  const examples: Example[] = [
    {
      title: "Basic RadioGroup",
      description:
        "A simple RadioGroup with a set of options. This example demonstrates the standard implementation of a radio group.",
      component: <BasicRadioGroup />,
    },
    {
      title: "RadioGroup Directions",
      description:
        "RadioGroup with different layout directions, including horizontal and vertical options.",
      component: <RadioGroupDirections />,
    },
    {
      title: "RadioGroup States",
      description:
        "Various states of the RadioGroup component including normal, disabled, and error states.",
      component: <RadioGroupStates />,
    },
    {
      title: "RadioGroup in a Form",
      description:
        "Integration of RadioGroup within a form, demonstrating how it works with form submission and validation.",
      component: <RadioGroupInForm />,
    },
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The RadioGroup component offers various configurations to meet different
        use cases. These examples showcase the component's flexibility, from
        basic implementation to form integration and different layout options.
      </p>
    </ExamplesTemplate>
  );
});
