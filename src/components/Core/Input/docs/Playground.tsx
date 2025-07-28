import { component$, useSignal, $ } from "@builder.io/qwik";
import { PlaygroundTemplate } from "~/components/Docs/templates";
import { Input, RadioInput } from "~/components/Core/Input";

export default component$(() => {
  // Input playground state
  const inputType = useSignal("text");
  const inputSize = useSignal("md");
  const inputValidation = useSignal("default");
  const inputValue = useSignal("");
  const inputLabel = useSignal("Label Text");
  const inputPlaceholder = useSignal("Enter text...");
  const inputHelperText = useSignal("Helper text");
  const inputErrorMessage = useSignal("This field has an error");
  const inputWarningMessage = useSignal("This is a warning");
  const inputDisabled = useSignal(false);
  const inputRequired = useSignal(false);
  const inputReadonly = useSignal(false);
  const inputAnimate = useSignal(true);
  const inputHasPrefix = useSignal(false);
  const inputHasSuffix = useSignal(false);

  // RadioInput playground state
  const radioValue = useSignal("");
  const radioSize = useSignal("md");
  const radioValidation = useSignal("default");
  const radioDirection = useSignal("vertical");
  const radioLabel = useSignal("Radio Group Label");
  const radioDisabled = useSignal(false);
  const radioRequired = useSignal(false);
  const radioAnimate = useSignal(true);

  const radioOptions = [
    { value: "option1", label: "Option 1", description: "First option description" },
    { value: "option2", label: "Option 2", description: "Second option description" },
    { value: "option3", label: "Option 3", description: "Third option description" },
  ];

  const handleInputChange$ = $((_: any, value: string) => {
    inputValue.value = value;
  });

  const handleRadioChange$ = $((_: any, value: string) => {
    radioValue.value = value;
  });

  const inputControls = [
    {
      label: "Type",
      type: "select",
      value: inputType,
      options: [
        { value: "text", label: "Text" },
        { value: "email", label: "Email" },
        { value: "password", label: "Password" },
        { value: "number", label: "Number" },
        { value: "tel", label: "Tel" },
        { value: "url", label: "URL" },
        { value: "search", label: "Search" },
        { value: "date", label: "Date" },
        { value: "time", label: "Time" },
      ],
    },
    {
      label: "Size",
      type: "select",
      value: inputSize,
      options: [
        { value: "sm", label: "Small" },
        { value: "md", label: "Medium" },
        { value: "lg", label: "Large" },
        { value: "xl", label: "Extra Large" },
      ],
    },
    {
      label: "Validation",
      type: "select",
      value: inputValidation,
      options: [
        { value: "default", label: "Default" },
        { value: "valid", label: "Valid" },
        { value: "invalid", label: "Invalid" },
        { value: "warning", label: "Warning" },
      ],
    },
    {
      label: "Label",
      type: "text",
      value: inputLabel,
    },
    {
      label: "Placeholder",
      type: "text",
      value: inputPlaceholder,
    },
    {
      label: "Helper Text",
      type: "text",
      value: inputHelperText,
    },
    {
      label: "Error Message",
      type: "text",
      value: inputErrorMessage,
    },
    {
      label: "Warning Message",
      type: "text",
      value: inputWarningMessage,
    },
    {
      label: "Disabled",
      type: "boolean",
      value: inputDisabled,
    },
    {
      label: "Required",
      type: "boolean",
      value: inputRequired,
    },
    {
      label: "Readonly",
      type: "boolean",
      value: inputReadonly,
    },
    {
      label: "Animate",
      type: "boolean",
      value: inputAnimate,
    },
    {
      label: "Has Prefix",
      type: "boolean",
      value: inputHasPrefix,
    },
    {
      label: "Has Suffix",
      type: "boolean",
      value: inputHasSuffix,
    },
  ];

  const radioControls = [
    {
      label: "Size",
      type: "select",
      value: radioSize,
      options: [
        { value: "sm", label: "Small" },
        { value: "md", label: "Medium" },
        { value: "lg", label: "Large" },
        { value: "xl", label: "Extra Large" },
      ],
    },
    {
      label: "Validation",
      type: "select",
      value: radioValidation,
      options: [
        { value: "default", label: "Default" },
        { value: "valid", label: "Valid" },
        { value: "invalid", label: "Invalid" },
        { value: "warning", label: "Warning" },
      ],
    },
    {
      label: "Direction",
      type: "select",
      value: radioDirection,
      options: [
        { value: "vertical", label: "Vertical" },
        { value: "horizontal", label: "Horizontal" },
      ],
    },
    {
      label: "Label",
      type: "text",
      value: radioLabel,
    },
    {
      label: "Disabled",
      type: "boolean",
      value: radioDisabled,
    },
    {
      label: "Required",
      type: "boolean",
      value: radioRequired,
    },
    {
      label: "Animate",
      type: "boolean",
      value: radioAnimate,
    },
  ];

  const inputComponent = (
    <Input
      type={inputType.value as any}
      size={inputSize.value as any}
      validation={inputValidation.value as any}
      value={inputValue.value}
      label={inputLabel.value}
      placeholder={inputPlaceholder.value}
      helperText={inputValidation.value === "default" ? inputHelperText.value : undefined}
      errorMessage={inputValidation.value === "invalid" ? inputErrorMessage.value : undefined}
      warningMessage={inputValidation.value === "warning" ? inputWarningMessage.value : undefined}
      disabled={inputDisabled.value}
      required={inputRequired.value}
      readonly={inputReadonly.value}
      animate={inputAnimate.value}
      hasPrefixSlot={inputHasPrefix.value}
      hasSuffixSlot={inputHasSuffix.value}
      onChange$={handleInputChange$}
    >
      {inputHasPrefix.value && <span q:slot="prefix">🔍</span>}
      {inputHasSuffix.value && <span q:slot="suffix">✕</span>}
    </Input>
  );

  const radioComponent = (
    <RadioInput
      name="playground-radio"
      size={radioSize.value as any}
      validation={radioValidation.value as any}
      direction={radioDirection.value as any}
      value={radioValue.value}
      label={radioLabel.value}
      options={radioOptions}
      disabled={radioDisabled.value}
      required={radioRequired.value}
      animate={radioAnimate.value}
      onChange$={handleRadioChange$}
    />
  );

  const playgroundSections = [
    {
      title: "Input Component",
      description: "Interactive input component with various configuration options",
      component: inputComponent,
      controls: inputControls,
    },
    {
      title: "RadioInput Component", 
      description: "Radio input group component with customizable options and styling",
      component: radioComponent,
      controls: radioControls,
    },
  ];

  return (
    <PlaygroundTemplate
      title="Input Components Playground"
      description="Experiment with different Input and RadioInput configurations"
      sections={playgroundSections}
    />
  );
});