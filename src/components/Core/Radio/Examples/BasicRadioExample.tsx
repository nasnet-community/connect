import { component$, useSignal } from "@builder.io/qwik";
import { Radio } from "../Radio";

export const BasicRadioExample = component$(() => {
  const selectedOption = useSignal("option1");

  return (
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        Basic Radio Buttons
      </h3>
      
      <div class="space-y-3">
        <Radio
          name="basic-example"
          value="option1"
          label="First option"
          checked={selectedOption.value === "option1"}
          onChange$={(value) => (selectedOption.value = value)}
        />
        <Radio
          name="basic-example"
          value="option2"
          label="Second option"
          checked={selectedOption.value === "option2"}
          onChange$={(value) => (selectedOption.value = value)}
        />
        <Radio
          name="basic-example"
          value="option3"
          label="Third option"
          checked={selectedOption.value === "option3"}
          onChange$={(value) => (selectedOption.value = value)}
        />
      </div>

      <div class="mt-4 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Selected: <span class="font-medium">{selectedOption.value}</span>
        </p>
      </div>
    </div>
  );
});

export const RadioWithoutLabelsExample = component$(() => {
  const selectedValue = useSignal("a");

  return (
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        Radio Buttons with ARIA Labels
      </h3>
      
      <div class="flex space-x-4">
        <Radio
          name="rating"
          value="a"
          aria-label="Excellent rating"
          checked={selectedValue.value === "a"}
          onChange$={(value) => (selectedValue.value = value)}
        />
        <Radio
          name="rating"
          value="b"
          aria-label="Good rating"
          checked={selectedValue.value === "b"}
          onChange$={(value) => (selectedValue.value = value)}
        />
        <Radio
          name="rating"
          value="c"
          aria-label="Average rating"
          checked={selectedValue.value === "c"}
          onChange$={(value) => (selectedValue.value = value)}
        />
      </div>

      <div class="mt-4 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Selected rating: <span class="font-medium">{selectedValue.value}</span>
        </p>
      </div>
    </div>
  );
});

export const RequiredRadioExample = component$(() => {
  const agreement = useSignal("");

  return (
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        Required Radio Button
      </h3>
      
      <div class="space-y-3">
        <Radio
          name="agreement"
          value="agree"
          label="I agree to the terms and conditions"
          required
          checked={agreement.value === "agree"}
          onChange$={(value) => (agreement.value = value)}
        />
        <Radio
          name="agreement"
          value="disagree"
          label="I do not agree to the terms and conditions"
          required
          checked={agreement.value === "disagree"}
          onChange$={(value) => (agreement.value = value)}
        />
      </div>

      <div class="mt-4 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Agreement status: {agreement.value || "Not selected"}
        </p>
      </div>
    </div>
  );
});

export default BasicRadioExample;