import { component$ } from "@builder.io/qwik";
import { ExamplesTemplate } from "~/components/Docs/templates";

// Import example components
import { BasicInput } from "../Examples/BasicInput";
import { InputSizes } from "../Examples/InputSizes";
import { InputStates } from "../Examples/InputStates";
import { InputWithSlots } from "../Examples/InputWithSlots";
import { RadioInputDemo } from "../Examples/RadioInputDemo";
import { FormIntegration } from "../Examples/FormIntegration";

export default component$(() => {
  const examples = [
    {
      title: "Basic Input",
      description: "Simple input usage with label and placeholder",
      component: BasicInput,
    },
    {
      title: "Input Sizes",
      description: "Different sizes from small to extra large with mobile optimization",
      component: InputSizes,
    },
    {
      title: "Validation States",
      description: "Various validation states with error, warning, and success feedback",
      component: InputStates,
    },
    {
      title: "Prefix and Suffix Slots",
      description: "Using prefix and suffix slots for icons and additional content",
      component: InputWithSlots,
    },
    {
      title: "Radio Input",
      description: "Radio button group with options and descriptions",
      component: RadioInputDemo,
    },
    {
      title: "Form Integration",
      description: "Integration with forms and validation workflows",
      component: FormIntegration,
    },
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Input Component Examples
      </h2>
      <p class="text-gray-600 dark:text-gray-300">
        Explore different ways to use the Input and RadioInput components
      </p>
    </ExamplesTemplate>
  );
});