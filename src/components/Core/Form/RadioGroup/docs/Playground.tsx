import { component$, useSignal } from "@builder.io/qwik";
import {
  PlaygroundTemplate,
  type PropertyControl,
} from "~/components/Docs/templates";
import { RadioGroup } from "../RadioGroup";

/**
 * RadioGroup component playground using the standard template
 */
export default component$(() => {
  const selectedValue = useSignal("option1");

  // Define the RadioGroupDemo component that will be controlled by the playground
  const RadioGroupDemo = component$<{
    label: string;
    required: boolean;
    disabled: boolean;
    error: string;
    direction: "horizontal" | "vertical";
  }>((props) => {
    const options = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
      { value: "option4", label: "Option 4" },
    ];

    return (
      <div class="mx-auto w-full max-w-md">
        <RadioGroup
          options={options}
          value={selectedValue.value}
          onChange$={(value: string) => (selectedValue.value = value)}
          name="playground-radio-group"
          label={props.label || undefined}
          required={props.required}
          disabled={props.disabled}
          error={props.error || undefined}
          direction={props.direction}
        />

        <div class="bg-surface-secondary dark:bg-surface-dark-secondary mt-4 rounded p-2 text-sm">
          <p>Selected value: {selectedValue.value}</p>
        </div>
      </div>
    );
  });

  // Define the controls for the playground
  const properties: PropertyControl[] = [
    {
      type: "text",
      name: "label",
      label: "Group Label",
      defaultValue: "Select an option",
    },
    {
      type: "boolean",
      name: "required",
      label: "Required",
      defaultValue: false,
    },
    {
      type: "boolean",
      name: "disabled",
      label: "Disabled",
      defaultValue: false,
    },
    {
      type: "text",
      name: "error",
      label: "Error Message",
      defaultValue: "",
    },
    {
      type: "select",
      name: "direction",
      label: "Direction",
      options: [
        { label: "Vertical", value: "vertical" },
        { label: "Horizontal", value: "horizontal" },
      ],
      defaultValue: "vertical",
    },
  ];

  return (
    <PlaygroundTemplate component={RadioGroupDemo} properties={properties} />
  );
});
