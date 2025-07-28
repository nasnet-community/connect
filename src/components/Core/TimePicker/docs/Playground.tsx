import { component$, useSignal } from "@builder.io/qwik";
import { PlaygroundTemplate } from "~/components/Docs/templates";
import { TimePicker, type TimeValue } from "../Timepicker";

export default component$(() => {
  // State for the TimePicker
  const time = useSignal<TimeValue>({ hour: "14", minute: "30", second: "00", period: "PM" });
  
  // Configuration options
  const format = useSignal<"12" | "24">("24");
  const showSeconds = useSignal(false);
  const size = useSignal<"sm" | "md" | "lg">("md");
  const variant = useSignal<"default" | "outline" | "filled">("default");
  const disabled = useSignal(false);
  const loading = useSignal(false);
  const error = useSignal(false);
  const showClearButton = useSignal(false);
  const inline = useSignal(false);
  const minuteStep = useSignal<1 | 5 | 10 | 15 | 30>(5);
  const secondStep = useSignal<1 | 5 | 10 | 15 | 30>(5);
  const showLabel = useSignal(true);
  const required = useSignal(false);
  const disableNightHours = useSignal(false);

  const controls = [
    {
      label: "Format",
      type: "select" as const,
      value: format,
      options: [
        { value: "24", label: "24-hour" },
        { value: "12", label: "12-hour" },
      ],
    },
    {
      label: "Show Seconds",
      type: "checkbox" as const,
      value: showSeconds,
    },
    {
      label: "Size",
      type: "select" as const,
      value: size,
      options: [
        { value: "sm", label: "Small" },
        { value: "md", label: "Medium" },
        { value: "lg", label: "Large" },
      ],
    },
    {
      label: "Variant",
      type: "select" as const,
      value: variant,
      options: [
        { value: "default", label: "Default" },
        { value: "outline", label: "Outline" },
        { value: "filled", label: "Filled" },
      ],
    },
    {
      label: "Minute Step",
      type: "select" as const,
      value: minuteStep,
      options: [
        { value: 1, label: "1 minute" },
        { value: 5, label: "5 minutes" },
        { value: 10, label: "10 minutes" },
        { value: 15, label: "15 minutes" },
        { value: 30, label: "30 minutes" },
      ],
    },
    {
      label: "Second Step",
      type: "select" as const,
      value: secondStep,
      options: [
        { value: 1, label: "1 second" },
        { value: 5, label: "5 seconds" },
        { value: 10, label: "10 seconds" },
        { value: 15, label: "15 seconds" },
        { value: 30, label: "30 seconds" },
      ],
      show: showSeconds.value,
    },
    {
      label: "Show Label",
      type: "checkbox" as const,
      value: showLabel,
    },
    {
      label: "Required",
      type: "checkbox" as const,
      value: required,
    },
    {
      label: "Show Clear Button",
      type: "checkbox" as const,
      value: showClearButton,
    },
    {
      label: "Disabled",
      type: "checkbox" as const,
      value: disabled,
    },
    {
      label: "Loading",
      type: "checkbox" as const,
      value: loading,
    },
    {
      label: "Error State",
      type: "checkbox" as const,
      value: error,
    },
    {
      label: "Inline Display",
      type: "checkbox" as const,
      value: inline,
    },
    {
      label: "Disable Night Hours",
      type: "checkbox" as const,
      value: disableNightHours,
    },
  ];

  const code = `<TimePicker
  time={time.value}
  format="${format.value}"${showSeconds.value ? '\n  showSeconds' : ''}
  size="${size.value}"
  variant="${variant.value}"
  minuteStep={${minuteStep.value}}${showSeconds.value ? `\n  secondStep={${secondStep.value}}` : ''}${showLabel.value ? '\n  label="Select Time"' : ''}${required.value ? '\n  required' : ''}${showClearButton.value ? '\n  showClearButton' : ''}${disabled.value ? '\n  disabled' : ''}${loading.value ? '\n  loading' : ''}${error.value ? '\n  error\n  errorMessage="Please select a valid time"' : ''}${inline.value ? '\n  inline' : ''}${disableNightHours.value ? '\n  disabledTimes={{\n    hours: [0, 1, 2, 3, 4, 5, 22, 23]\n  }}' : ''}
  onChange$={(field, value) => {
    time.value = { ...time.value, [field]: value };
  }}${showClearButton.value ? '\n  onClear$={() => {\n    time.value = { hour: "00", minute: "00"' + (showSeconds.value ? ', second: "00"' : '') + ' };\n  }}' : ''}
/>`;

  return (
    <PlaygroundTemplate
      component={() => (
        <div class="flex min-h-[200px] items-center justify-center p-8">
          <TimePicker
            time={time.value}
            format={format.value}
            showSeconds={showSeconds.value}
            size={size.value}
            variant={variant.value}
            minuteStep={minuteStep.value}
            secondStep={secondStep.value}
            label={showLabel.value ? "Select Time" : undefined}
            required={required.value}
            showClearButton={showClearButton.value}
            disabled={disabled.value}
            loading={loading.value}
            error={error.value}
            errorMessage={error.value ? "Please select a valid time" : undefined}
            inline={inline.value}
            disabledTimes={
              disableNightHours.value
                ? { hours: [0, 1, 2, 3, 4, 5, 22, 23] }
                : undefined
            }
            onChange$={(field, value) => {
              time.value = { ...time.value, [field]: value };
            }}
            onClear$={
              showClearButton.value
                ? () => {
                    time.value = { 
                      hour: "00", 
                      minute: "00",
                      ...(showSeconds.value ? { second: "00" } : {}),
                      ...(format.value === "12" ? { period: "AM" } : {}),
                    };
                  }
                : undefined
            }
          />
        </div>
      )}
      controls={controls}
      code={code}
    >
      <p>
        Experiment with the TimePicker component by adjusting the controls below. 
        The code will update in real-time to reflect your configuration.
      </p>
    </PlaygroundTemplate>
  );
});