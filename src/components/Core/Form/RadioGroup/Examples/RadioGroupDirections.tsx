import { component$, useSignal } from "@builder.io/qwik";
import { RadioGroup } from "../index";

export default component$(() => {
  const horizontalValue = useSignal("apple");
  const verticalValue = useSignal("firefox");

  const fruitOptions = [
    { value: "apple", label: "Apple" },
    { value: "orange", label: "Orange" },
    { value: "banana", label: "Banana" },
    { value: "grape", label: "Grape" },
  ];

  const browserOptions = [
    { value: "chrome", label: "Chrome" },
    { value: "firefox", label: "Firefox" },
    { value: "safari", label: "Safari" },
    { value: "edge", label: "Edge" },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h3 class="mb-3 text-sm font-semibold">Horizontal Layout (Default)</h3>
        <RadioGroup
          options={fruitOptions}
          value={horizontalValue.value}
          name="fruit-radio"
          label="Select a fruit"
          direction="horizontal"
          onChange$={(value) => (horizontalValue.value = value)}
        />
      </div>

      <div>
        <h3 class="mb-3 text-sm font-semibold">Vertical Layout</h3>
        <RadioGroup
          options={browserOptions}
          value={verticalValue.value}
          name="browser-radio"
          label="Select a browser"
          direction="vertical"
          onChange$={(value) => (verticalValue.value = value)}
        />
      </div>
    </div>
  );
});
