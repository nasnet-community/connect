import { component$, useComputed$, useSignal } from "@builder.io/qwik";
import { PlaygroundTemplate } from "~/components/Docs/templates";
import { RadioGroup } from "../index";
import type { RadioOption } from "../Radio.types";

export default component$(() => {
  // Create reactive signals for the playground state
  const playgroundState = useSignal({
    value: "option1",
    size: "md",
    direction: "vertical" as "vertical" | "horizontal",
    disabled: false,
    required: false,
    showLabel: true,
    showHelperText: true,
    showError: false,
    customOptions: false,
  });

  // Define properties for the playground controls
  const properties = [
    {
      type: "select" as const,
      name: "size",
      label: "Size",
      defaultValue: "md",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
    },
    {
      type: "select" as const,
      name: "direction",
      label: "Direction",
      defaultValue: "vertical",
      options: [
        { label: "Vertical", value: "vertical" },
        { label: "Horizontal", value: "horizontal" },
      ],
    },
    {
      type: "boolean" as const,
      name: "disabled",
      label: "Disabled",
      defaultValue: false,
    },
    {
      type: "boolean" as const,
      name: "required",
      label: "Required",
      defaultValue: false,
    },
    {
      type: "boolean" as const,
      name: "showLabel",
      label: "Show Label",
      defaultValue: true,
    },
    {
      type: "boolean" as const,
      name: "showHelperText",
      label: "Show Helper Text",
      defaultValue: true,
    },
    {
      type: "boolean" as const,
      name: "showError",
      label: "Show Error",
      defaultValue: false,
    },
    {
      type: "boolean" as const,
      name: "customOptions",
      label: "Custom Options",
      defaultValue: false,
    },
  ];

  // Define radio options based on customOptions state
  const radioOptions = useComputed$<RadioOption[]>(() => {
    if (playgroundState.value.customOptions) {
      return [
        { value: "basic", label: "Basic Plan - $9/month" },
        { value: "pro", label: "Pro Plan - $29/month", disabled: false },
        { value: "enterprise", label: "Enterprise - Contact Sales", disabled: true },
      ];
    }
    return [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
      { value: "option4", label: "Option 4" },
    ];
  });

  // Generate code preview
  const codePreview = useComputed$(() => {
    const props = [];
    
    props.push(`  name="example"`);
    props.push(`  value="${playgroundState.value.value}"`);
    props.push(`  options={${JSON.stringify(radioOptions.value, null, 2).split('\n').join('\n  ')}}`);
    
    if (playgroundState.value.showLabel) {
      props.push(`  label="Select an option"`);
    }
    
    if (playgroundState.value.size !== "md") {
      props.push(`  size="${playgroundState.value.size}"`);
    }
    
    if (playgroundState.value.direction !== "vertical") {
      props.push(`  direction="${playgroundState.value.direction}"`);
    }
    
    if (playgroundState.value.disabled) {
      props.push(`  disabled`);
    }
    
    if (playgroundState.value.required) {
      props.push(`  required`);
    }
    
    if (playgroundState.value.showHelperText) {
      props.push(`  helperText="Choose the option that best suits your needs"`);
    }
    
    if (playgroundState.value.showError) {
      props.push(`  error="Please select an option to continue"`);
    }
    
    props.push(`  onChange$={(value) => console.log('Selected:', value)}`);
    
    return `<RadioGroup\n${props.join('\n')}\n/>`;
  });

  // Render component function
  const renderComponent = (props: any) => {
    // Update playground state from props
    Object.assign(playgroundState.value, props);
    
    return (
      <RadioGroup
        name="playground"
        value={playgroundState.value.value}
        options={radioOptions.value}
        label={props.showLabel ? "Select an option" : undefined}
        helperText={props.showHelperText ? "Choose the option that best suits your needs" : undefined}
        error={props.showError ? "Please select an option to continue" : undefined}
        size={props.size as "sm" | "md" | "lg"}
        direction={props.direction as "vertical" | "horizontal"}
        disabled={props.disabled}
        required={props.required}
        onChange$={(value) => {
          playgroundState.value = { ...playgroundState.value, value };
        }}
      />
    );
  };

  return (
    <PlaygroundTemplate
      properties={properties}
      renderComponent={renderComponent}
      initialProps={playgroundState.value}
      code={codePreview}
    >
      <p class="mb-4">
        Experiment with the Radio component's various properties using the
        controls above. The preview updates in real-time as you modify the
        settings, and the code snippet shows how to implement the current
        configuration.
      </p>
      
      <div class="mt-4 space-y-2">
        <h4 class="font-medium">Tips:</h4>
        <ul class="list-inside list-disc space-y-1 text-sm">
          <li>Try different sizes to see how they affect touch targets</li>
          <li>Toggle between vertical and horizontal layouts</li>
          <li>Enable "Custom Options" to see a real-world example with pricing</li>
          <li>Combine error state with required to see validation behavior</li>
          <li>Test disabled state at both group and option level</li>
        </ul>
      </div>
    </PlaygroundTemplate>
  );
});