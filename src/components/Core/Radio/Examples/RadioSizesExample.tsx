import { component$, useSignal } from "@builder.io/qwik";
import { Radio, RadioGroup } from "../index";

export const RadioSizesExample = component$(() => {
  const smallSelected = useSignal("sm1");
  const mediumSelected = useSignal("md1");
  const largeSelected = useSignal("lg1");

  return (
    <div class="space-y-8">
      <div>
        <h3 class="mb-4 text-lg font-medium text-gray-900 dark:text-white">
          Small Size Radio Buttons
        </h3>
        <div class="space-y-2">
          <Radio
            name="small-size"
            value="sm1"
            label="Small option 1"
            size="sm"
            checked={smallSelected.value === "sm1"}
            onChange$={(value) => (smallSelected.value = value)}
          />
          <Radio
            name="small-size"
            value="sm2"
            label="Small option 2"
            size="sm"
            checked={smallSelected.value === "sm2"}
            onChange$={(value) => (smallSelected.value = value)}
          />
          <Radio
            name="small-size"
            value="sm3"
            label="Small option 3"
            size="sm"
            checked={smallSelected.value === "sm3"}
            onChange$={(value) => (smallSelected.value = value)}
          />
        </div>
        <div class="mt-2 text-xs text-gray-500">
          Selected: {smallSelected.value}
        </div>
      </div>

      <div>
        <h3 class="mb-4 text-lg font-medium text-gray-900 dark:text-white">
          Medium Size Radio Buttons (Default)
        </h3>
        <div class="space-y-2">
          <Radio
            name="medium-size"
            value="md1"
            label="Medium option 1"
            size="md"
            checked={mediumSelected.value === "md1"}
            onChange$={(value) => (mediumSelected.value = value)}
          />
          <Radio
            name="medium-size"
            value="md2"
            label="Medium option 2"
            size="md"
            checked={mediumSelected.value === "md2"}
            onChange$={(value) => (mediumSelected.value = value)}
          />
          <Radio
            name="medium-size"
            value="md3"
            label="Medium option 3"
            size="md"
            checked={mediumSelected.value === "md3"}
            onChange$={(value) => (mediumSelected.value = value)}
          />
        </div>
        <div class="mt-2 text-sm text-gray-500">
          Selected: {mediumSelected.value}
        </div>
      </div>

      <div>
        <h3 class="mb-4 text-lg font-medium text-gray-900 dark:text-white">
          Large Size Radio Buttons
        </h3>
        <div class="space-y-3">
          <Radio
            name="large-size"
            value="lg1"
            label="Large option 1"
            size="lg"
            checked={largeSelected.value === "lg1"}
            onChange$={(value) => (largeSelected.value = value)}
          />
          <Radio
            name="large-size"
            value="lg2"
            label="Large option 2"
            size="lg"
            checked={largeSelected.value === "lg2"}
            onChange$={(value) => (largeSelected.value = value)}
          />
          <Radio
            name="large-size"
            value="lg3"
            label="Large option 3"
            size="lg"
            checked={largeSelected.value === "lg3"}
            onChange$={(value) => (largeSelected.value = value)}
          />
        </div>
        <div class="mt-2 text-base text-gray-500">
          Selected: {largeSelected.value}
        </div>
      </div>
    </div>
  );
});

export const RadioGroupSizesExample = component$(() => {
  const smallGroupValue = useSignal("option1");
  const mediumGroupValue = useSignal("option2");
  const largeGroupValue = useSignal("option3");

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  return (
    <div class="space-y-8">
      <RadioGroup
        name="small-group"
        label="Small Radio Group"
        size="sm"
        options={options}
        value={smallGroupValue.value}
        onChange$={(value) => (smallGroupValue.value = value)}
      />

      <RadioGroup
        name="medium-group"
        label="Medium Radio Group (Default)"
        size="md"
        options={options}
        value={mediumGroupValue.value}
        onChange$={(value) => (mediumGroupValue.value = value)}
      />

      <RadioGroup
        name="large-group"
        label="Large Radio Group"
        size="lg"
        options={options}
        value={largeGroupValue.value}
        onChange$={(value) => (largeGroupValue.value = value)}
      />
    </div>
  );
});

export const ResponsiveSizeExample = component$(() => {
  const responsiveValue = useSignal("mobile");

  const deviceOptions = [
    { value: "mobile", label: "Mobile Device" },
    { value: "tablet", label: "Tablet Device" },
    { value: "desktop", label: "Desktop Device" },
  ];

  return (
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        Responsive Radio Group
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        This radio group uses responsive sizing: small on mobile, medium on tablet, large on desktop
      </p>
      
      <div class="sm:size-md lg:size-lg size-sm">
        <RadioGroup
          name="responsive"
          label="Target Device"
          options={deviceOptions}
          value={responsiveValue.value}
          onChange$={(value) => (responsiveValue.value = value)}
          class="space-y-2 sm:space-y-3 lg:space-y-4"
        />
      </div>

      <div class="rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Selected device: <span class="font-medium">{responsiveValue.value}</span>
        </p>
      </div>
    </div>
  );
});

export default RadioSizesExample;