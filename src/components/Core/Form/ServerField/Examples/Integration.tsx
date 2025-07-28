import { component$, useSignal } from "@builder.io/qwik";
import { ServerFormField } from "../ServerFormField";
import { Select } from "../Select";
import { ServerButton } from "../ServerButton";

export default component$(() => {
  const selectedDevice = useSignal("");

  return (
    <form class="space-y-4">
      <ServerFormField label="Full Name" required={true}>
        <input
          type="text"
          class="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          placeholder="Enter your full name"
        />
      </ServerFormField>

      <ServerFormField label="Device Type" required={true}>
        <Select
          value={selectedDevice.value}
          onChange$={(value) => {
            selectedDevice.value = value;
          }}
          options={[
            { value: "router", label: "Router" },
            { value: "switch", label: "Switch" },
            { value: "accessPoint", label: "Access Point" },
          ]}
          placeholder="Select device type"
        />
      </ServerFormField>

      <ServerFormField label="Enable Advanced Mode" inline={true}>
        <input
          type="checkbox"
          class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
        />
      </ServerFormField>

      <div class="pt-2">
        <ServerButton
          type="submit"
          onClick$={() => console.log("Form submitted")}
          primary={true}
        >
          Save Configuration
        </ServerButton>
      </div>
    </form>
  );
});
