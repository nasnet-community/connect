import { component$ } from "@builder.io/qwik";
import { ExamplesTemplate } from "~/components/Docs/templates";
import {
  BasicTimePickerExample,
  TimeFormatExample,
  WithSecondsExample,
  DisabledTimesExample,
  ControlledExample,
  ResponsiveExample,
  AccessibilityExample,
  StyledVariantsExample,
  TimeRangeValidationExample,
  TimezoneAwareExample,
} from "../Examples";

export default component$(() => {
  const examples = [
    {
      title: "Basic TimePicker",
      description: "Simple time selection with default 24-hour format.",
      component: BasicTimePickerExample,
      code: `const time = useSignal<TimeValue>({ hour: "09", minute: "00" });

return (
  <TimePicker
    time={time.value}
    onChange$={(field, value) => {
      time.value = { ...time.value, [field]: value };
    }}
  />
);`,
    },
    {
      title: "Time Formats",
      description: "Switch between 12-hour and 24-hour formats.",
      component: TimeFormatExample,
      code: `// 24-hour format
<TimePicker
  time={time24.value}
  format="24"
  label="24-hour format"
  onChange$={...}
/>

// 12-hour format with AM/PM
<TimePicker
  time={time12.value}
  format="12"
  label="12-hour format"
  onChange$={...}
/>`,
    },
    {
      title: "With Seconds",
      description: "Include seconds in time selection with custom steps.",
      component: WithSecondsExample,
      code: `<TimePicker
  time={time.value}
  showSeconds
  secondStep={5}
  label="Time with seconds"
  onChange$={...}
/>`,
    },
    {
      title: "Disabled Times",
      description: "Restrict selection to specific time ranges.",
      component: DisabledTimesExample,
      code: `<TimePicker
  time={time.value}
  disabledTimes={{
    hours: [0, 1, 2, 3, 4, 5, 22, 23], // Business hours only
    minutes: [15, 45], // Skip quarter hours
  }}
  label="Business hours only"
  onChange$={...}
/>`,
    },
    {
      title: "Controlled Component",
      description: "Fully controlled time picker with validation.",
      component: ControlledExample,
      code: `const time = useSignal<TimeValue>({ hour: "09", minute: "00" });
const error = useSignal(false);

return (
  <TimePicker
    time={time.value}
    error={error.value}
    errorMessage={error.value ? "Invalid time selection" : undefined}
    onChange$={(field, value) => {
      time.value = { ...time.value, [field]: value };
      // Validate time
      const hour = parseInt(time.value.hour);
      error.value = hour < 9 || hour > 17;
    }}
  />
);`,
    },
    {
      title: "Responsive Design",
      description: "Adaptive sizing for different screen sizes.",
      component: ResponsiveExample,
      code: `<TimePicker
  time={time.value}
  size="sm" // Changes to 'md' on tablets, 'lg' on desktop
  class="sm:size-md lg:size-lg"
  onChange$={...}
/>`,
    },
    {
      title: "Accessibility Features",
      description: "Keyboard navigation and screen reader support.",
      component: AccessibilityExample,
      code: `<TimePicker
  time={time.value}
  label="Meeting time"
  id="meeting-time"
  name="meeting"
  required
  aria-label="Select meeting time"
  onChange$={...}
/>`,
    },
    {
      title: "Styled Variants",
      description: "Different visual styles and sizes.",
      component: StyledVariantsExample,
      code: `// Different variants
<TimePicker variant="default" ... />
<TimePicker variant="outline" ... />
<TimePicker variant="filled" ... />

// Different sizes
<TimePicker size="sm" ... />
<TimePicker size="md" ... />
<TimePicker size="lg" ... />`,
    },
    {
      title: "Time Range Validation",
      description: "Advanced time range validation with duration constraints and real-time feedback.",
      component: TimeRangeValidationExample,
      code: `const startTime = useSignal<TimeValue>({ hour: "09", minute: "00" });
const endTime = useSignal<TimeValue>({ hour: "17", minute: "00" });

const duration = useComputed$(() => {
  const start = timeToMinutes(startTime.value);
  const end = timeToMinutes(endTime.value);
  return end - start;
});

const isValidRange = useComputed$(() => {
  const dur = duration.value;
  return dur >= minDuration && dur <= maxDuration;
});

return (
  <div>
    <TimePicker
      time={startTime.value}
      onChange$={handleStartTimeChange$}
      error={startError.value}
      errorMessage={startErrorMessage.value}
    />
    <TimePicker
      time={endTime.value}
      onChange$={handleEndTimeChange$}
      error={endError.value}
      errorMessage={endErrorMessage.value}
    />
  </div>
);`,
    },
    {
      title: "Timezone-Aware Selection",
      description: "International time selection with timezone conversion and meeting scheduler helper.",
      component: TimezoneAwareExample,
      code: `const localTime = useSignal<TimeValue>({ hour: "14", minute: "30" });
const selectedTimezone = useSignal<TimezoneInfo>(timezones[0]);

const convertToTimezone = (utcMinutes: number, timezone: TimezoneInfo) => {
  const targetMinutes = utcMinutes - (timezone.offset * 60);
  const hours = Math.floor(targetMinutes / 60) % 24;
  const mins = targetMinutes % 60;
  
  return {
    hours: hours < 0 ? hours + 24 : hours,
    minutes: mins < 0 ? mins + 60 : mins,
  };
};

return (
  <TimePicker
    time={localTime.value}
    onChange$={handleTimeChange$}
    format={use24HourFormat.value ? "24" : "12"}
    label="Select Time"
  />
);`,
    },
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        Explore the various features and configurations of the TimePicker component through these interactive examples.
        Each example demonstrates different use cases and patterns.
      </p>
    </ExamplesTemplate>
  );
});