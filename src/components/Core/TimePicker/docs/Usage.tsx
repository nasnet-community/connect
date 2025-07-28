import { component$ } from "@builder.io/qwik";
import { UsageTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const _usageExamples = [
    {
      title: "Basic Usage",
      description: "Simple time picker with default 24-hour format.",
      code: `import { component$, useSignal } from "@builder.io/qwik";
import { TimePicker, type TimeValue } from "~/components/Core/TimePicker";

export default component$(() => {
  const time = useSignal<TimeValue>({ hour: "09", minute: "00" });

  return (
    <TimePicker
      time={time.value}
      onChange$={(field, value) => {
        time.value = { ...time.value, [field]: value };
      }}
    />
  );
});`,
    },
    {
      title: "12-Hour Format with AM/PM",
      description: "Time picker using 12-hour format with period selector.",
      code: `import { component$, useSignal } from "@builder.io/qwik";
import { TimePicker, type TimeValue } from "~/components/Core/TimePicker";

export default component$(() => {
  const time = useSignal<TimeValue>({ 
    hour: "09", 
    minute: "00", 
    period: "AM" 
  });

  return (
    <TimePicker
      time={time.value}
      format="12"
      onChange$={(field, value) => {
        time.value = { ...time.value, [field]: value };
      }}
    />
  );
});`,
    },
    {
      title: "With Seconds",
      description: "Include seconds selection in the time picker.",
      code: `import { component$, useSignal } from "@builder.io/qwik";
import { TimePicker, type TimeValue } from "~/components/Core/TimePicker";

export default component$(() => {
  const time = useSignal<TimeValue>({ 
    hour: "14", 
    minute: "30", 
    second: "00" 
  });

  return (
    <TimePicker
      time={time.value}
      showSeconds
      secondStep={10}
      onChange$={(field, value) => {
        time.value = { ...time.value, [field]: value };
      }}
    />
  );
});`,
    },
    {
      title: "Custom Steps",
      description: "Configure minute and second intervals.",
      code: `import { component$, useSignal } from "@builder.io/qwik";
import { TimePicker, type TimeValue } from "~/components/Core/TimePicker";

export default component$(() => {
  const time = useSignal<TimeValue>({ hour: "10", minute: "00" });

  return (
    <TimePicker
      time={time.value}
      minuteStep={15} // 00, 15, 30, 45
      onChange$={(field, value) => {
        time.value = { ...time.value, [field]: value };
      }}
    />
  );
});`,
    },
    {
      title: "Disabled Times",
      description: "Disable specific hours, minutes, or seconds.",
      code: `import { component$, useSignal } from "@builder.io/qwik";
import { TimePicker, type TimeValue } from "~/components/Core/TimePicker";

export default component$(() => {
  const time = useSignal<TimeValue>({ hour: "09", minute: "00" });

  return (
    <TimePicker
      time={time.value}
      disabledTimes={{
        hours: [0, 1, 2, 3, 4, 5, 22, 23], // Disable night hours
        minutes: [15, 45], // Disable specific minutes
      }}
      onChange$={(field, value) => {
        time.value = { ...time.value, [field]: value };
      }}
    />
  );
});`,
    },
    {
      title: "With Clear Button",
      description: "Add a clear button to reset the time.",
      code: `import { component$, useSignal } from "@builder.io/qwik";
import { TimePicker, type TimeValue } from "~/components/Core/TimePicker";

export default component$(() => {
  const time = useSignal<TimeValue>({ hour: "12", minute: "00" });

  return (
    <TimePicker
      time={time.value}
      showClearButton
      onChange$={(field, value) => {
        time.value = { ...time.value, [field]: value };
      }}
      onClear$={() => {
        time.value = { hour: "00", minute: "00" };
      }}
    />
  );
});`,
    },
    {
      title: "Form Integration",
      description: "Use TimePicker within a form with validation.",
      code: `import { component$, useSignal } from "@builder.io/qwik";
import { TimePicker, type TimeValue } from "~/components/Core/TimePicker";

export default component$(() => {
  const time = useSignal<TimeValue>({ hour: "09", minute: "00" });
  const error = useSignal(false);
  const errorMessage = useSignal("");

  return (
    <form
      onSubmit$={(e) => {
        e.preventDefault();
        // Validate time
        const hour = parseInt(time.value.hour);
        if (hour < 9 || hour > 17) {
          error.value = true;
          errorMessage.value = "Please select a time between 9 AM and 5 PM";
          return;
        }
        error.value = false;
        // Submit form
      }}
    >
      <TimePicker
        time={time.value}
        label="Appointment Time"
        name="appointment"
        required
        error={error.value}
        errorMessage={errorMessage.value}
        onChange$={(field, value) => {
          time.value = { ...time.value, [field]: value };
          error.value = false; // Clear error on change
        }}
      />
      <button type="submit" class="mt-4">
        Submit
      </button>
    </form>
  );
});`,
    },
    {
      title: "Different Variants",
      description: "Use different visual styles for the time picker.",
      code: `import { component$, useSignal } from "@builder.io/qwik";
import { TimePicker, type TimeValue } from "~/components/Core/TimePicker";

export default component$(() => {
  const time1 = useSignal<TimeValue>({ hour: "09", minute: "00" });
  const time2 = useSignal<TimeValue>({ hour: "10", minute: "30" });
  const time3 = useSignal<TimeValue>({ hour: "14", minute: "15" });

  return (
    <div class="space-y-4">
      <TimePicker
        time={time1.value}
        variant="default"
        label="Default Variant"
        onChange$={(field, value) => {
          time1.value = { ...time1.value, [field]: value };
        }}
      />
      
      <TimePicker
        time={time2.value}
        variant="outline"
        label="Outline Variant"
        onChange$={(field, value) => {
          time2.value = { ...time2.value, [field]: value };
        }}
      />
      
      <TimePicker
        time={time3.value}
        variant="filled"
        label="Filled Variant"
        onChange$={(field, value) => {
          time3.value = { ...time3.value, [field]: value };
        }}
      />
    </div>
  );
});`,
    },
    {
      title: "Different Sizes",
      description: "Available in small, medium, and large sizes.",
      code: `import { component$, useSignal } from "@builder.io/qwik";
import { TimePicker, type TimeValue } from "~/components/Core/TimePicker";

export default component$(() => {
  const time = useSignal<TimeValue>({ hour: "15", minute: "45" });

  return (
    <div class="space-y-4">
      <TimePicker
        time={time.value}
        size="sm"
        label="Small Size"
        onChange$={(field, value) => {
          time.value = { ...time.value, [field]: value };
        }}
      />
      
      <TimePicker
        time={time.value}
        size="md"
        label="Medium Size (Default)"
        onChange$={(field, value) => {
          time.value = { ...time.value, [field]: value };
        }}
      />
      
      <TimePicker
        time={time.value}
        size="lg"
        label="Large Size"
        onChange$={(field, value) => {
          time.value = { ...time.value, [field]: value };
        }}
      />
    </div>
  );
});`,
    },
    {
      title: "Time Range Selection",
      description: "Use two TimePickers for selecting a time range.",
      code: `import { component$, useSignal, useComputed$ } from "@builder.io/qwik";
import { TimePicker, type TimeValue } from "~/components/Core/TimePicker";

export default component$(() => {
  const startTime = useSignal<TimeValue>({ hour: "09", minute: "00" });
  const endTime = useSignal<TimeValue>({ hour: "17", minute: "00" });
  
  const duration = useComputed$(() => {
    const start = parseInt(startTime.value.hour) * 60 + parseInt(startTime.value.minute);
    const end = parseInt(endTime.value.hour) * 60 + parseInt(endTime.value.minute);
    const diff = end - start;
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return \`\${hours}h \${minutes}m\`;
  });

  return (
    <div class="space-y-4">
      <div class="grid gap-4 sm:grid-cols-2">
        <TimePicker
          time={startTime.value}
          label="Start Time"
          onChange$={(field, value) => {
            startTime.value = { ...startTime.value, [field]: value };
          }}
        />
        
        <TimePicker
          time={endTime.value}
          label="End Time"
          onChange$={(field, value) => {
            endTime.value = { ...endTime.value, [field]: value };
          }}
        />
      </div>
      
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Duration: {duration.value}
      </p>
    </div>
  );
});`,
    },
  ];

  return (
    <UsageTemplate>
      <p>
        The TimePicker component provides a flexible and accessible way to select time values. 
        It supports various formats, step intervals, and visual styles to match your application's needs.
      </p>
      
      <h3 class="mb-2 mt-6 text-lg font-semibold">Import</h3>
      <pre class="rounded-lg bg-gray-900 p-4 text-sm text-gray-100">
        <code>{`import { TimePicker, type TimeValue } from "~/components/Core/TimePicker";`}</code>
      </pre>

      <h3 class="mb-2 mt-6 text-lg font-semibold">TimeValue Type</h3>
      <p class="mb-2">
        The TimeValue interface defines the structure of the time object:
      </p>
      <pre class="rounded-lg bg-gray-900 p-4 text-sm text-gray-100">
        <code>{`interface TimeValue {
  hour: string;      // "00"-"23" for 24h, "01"-"12" for 12h
  minute: string;    // "00"-"59"
  second?: string;   // "00"-"59" (optional)
  period?: "AM" | "PM"; // Only for 12h format
}`}</code>
      </pre>
    </UsageTemplate>
  );
});