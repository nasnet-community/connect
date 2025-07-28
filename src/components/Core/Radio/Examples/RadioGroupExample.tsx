import { component$, useSignal } from "@builder.io/qwik";
import { RadioGroup } from "../RadioGroup";

export const SimpleRadioGroupExample = component$(() => {
  const selectedFramework = useSignal("react");

  const frameworkOptions = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue.js" },
    { value: "angular", label: "Angular" },
    { value: "qwik", label: "Qwik" },
    { value: "svelte", label: "Svelte" },
  ];

  return (
    <div class="space-y-4">
      <RadioGroup
        name="framework"
        label="Choose your preferred framework"
        options={frameworkOptions}
        value={selectedFramework.value}
        onChange$={(value) => (selectedFramework.value = value)}
      />

      <div class="rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Selected framework: <span class="font-medium">{selectedFramework.value}</span>
        </p>
      </div>
    </div>
  );
});

export const RadioGroupWithHelperExample = component$(() => {
  const selectedPlan = useSignal("");

  const planOptions = [
    { value: "basic", label: "Basic Plan - $9/month" },
    { value: "pro", label: "Pro Plan - $29/month" },
    { value: "enterprise", label: "Enterprise Plan - Contact us" },
  ];

  return (
    <div class="space-y-4">
      <RadioGroup
        name="subscription"
        label="Choose your subscription plan"
        helperText="You can change your plan at any time from your account settings"
        options={planOptions}
        value={selectedPlan.value}
        required
        onChange$={(value) => (selectedPlan.value = value)}
      />

      <div class="rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Selected plan: {selectedPlan.value || "None selected"}
        </p>
      </div>
    </div>
  );
});

export const RadioGroupWithErrorExample = component$(() => {
  const selectedShipping = useSignal("");
  const showError = useSignal(true);

  const shippingOptions = [
    { value: "standard", label: "Standard Shipping (5-7 days) - Free" },
    { value: "express", label: "Express Shipping (2-3 days) - $15" },
    { value: "overnight", label: "Overnight Shipping (1 day) - $30" },
  ];

  return (
    <div class="space-y-4">
      <RadioGroup
        name="shipping"
        label="Select shipping method"
        error={showError.value ? "Please select a shipping method to continue" : ""}
        options={shippingOptions}
        value={selectedShipping.value}
        required
        onChange$={(value) => {
          selectedShipping.value = value;
          showError.value = false;
        }}
      />

      <div class="flex space-x-2">
        <button
          class="rounded-md bg-primary-600 px-3 py-1 text-sm text-white hover:bg-primary-700"
          onClick$={() => {
            if (!selectedShipping.value) {
              showError.value = true;
            }
          }}
        >
          Validate
        </button>
        <button
          class="rounded-md bg-gray-600 px-3 py-1 text-sm text-white hover:bg-gray-700"
          onClick$={() => {
            selectedShipping.value = "";
            showError.value = false;
          }}
        >
          Reset
        </button>
      </div>

      <div class="rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Selected shipping: {selectedShipping.value || "None selected"}
        </p>
      </div>
    </div>
  );
});

export const HorizontalRadioGroupExample = component$(() => {
  const selectedTheme = useSignal("light");

  const themeOptions = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "auto", label: "Auto" },
  ];

  return (
    <div class="space-y-4">
      <RadioGroup
        name="theme"
        label="Theme preference"
        direction="horizontal"
        options={themeOptions}
        value={selectedTheme.value}
        onChange$={(value) => (selectedTheme.value = value)}
      />

      <div class="rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Selected theme: <span class="font-medium">{selectedTheme.value}</span>
        </p>
      </div>
    </div>
  );
});

export default SimpleRadioGroupExample;