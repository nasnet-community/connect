import { component$ } from "@builder.io/qwik";
import APIReferenceTemplate from "../../../../Docs/templates/APIReferenceTemplate";

export default component$(() => {
  const serverFormFieldProps = [
    {
      name: "label",
      type: "string",
      defaultValue: "",
      description: "The label text displayed for the form field.",
      required: true,
    },
    {
      name: "required",
      type: "boolean",
      defaultValue: "false",
      description:
        "When true, shows a required indicator (*) next to the label.",
      required: false,
    },
    {
      name: "errorMessage",
      type: "string",
      defaultValue: "",
      description:
        "Error message to display when validation fails. Will be shown in red text below the input.",
      required: false,
    },
    {
      name: "class",
      type: "string",
      defaultValue: '""',
      description:
        "Additional CSS classes to apply to the form field container.",
      required: false,
    },
    {
      name: "inline",
      type: "boolean",
      defaultValue: "false",
      description:
        "When true, displays the label and input in a horizontal layout instead of the default vertical layout.",
      required: false,
    },
  ];

  const serverButtonProps = [
    {
      name: "type",
      type: '"button" | "submit" | "reset"',
      defaultValue: '"button"',
      description: "The HTML button type attribute.",
      required: false,
    },
    {
      name: "variant",
      type: '"primary" | "secondary" | "tertiary" | "ghost" | "link"',
      defaultValue: '"primary"',
      description: "The visual style variant of the button.",
      required: false,
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      defaultValue: '"md"',
      description: "The size of the button.",
      required: false,
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description:
        "When true, disables the button and applies disabled styling.",
      required: false,
    },
    {
      name: "class",
      type: "string",
      defaultValue: '""',
      description: "Additional CSS classes to apply to the button.",
      required: false,
    },
  ];

  const selectProps = [
    {
      name: "options",
      type: "Array<{ value: string, label: string }>",
      defaultValue: "[]",
      description: "Array of options to display in the select dropdown.",
      required: true,
    },
    {
      name: "value",
      type: "string",
      defaultValue: "",
      description: "The currently selected value.",
      required: false,
    },
    {
      name: "placeholder",
      type: "string",
      defaultValue: '"Select an option"',
      description: "Placeholder text displayed when no option is selected.",
      required: false,
    },
    {
      name: "name",
      type: "string",
      defaultValue: "",
      description: "The name attribute for the select element.",
      required: false,
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "When true, disables the select dropdown.",
      required: false,
    },
    {
      name: "required",
      type: "boolean",
      defaultValue: "false",
      description: "When true, makes the select field required.",
      required: false,
    },
  ];

  return (
    <APIReferenceTemplate>
      <div class="space-y-10">
        <div>
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            ServerFormField
          </h2>
          <p class="mb-4 text-gray-700 dark:text-gray-300">
            The main component for creating form fields in server components. It
            provides the structure for labels, input elements (inserted via the
            Slot), and error messages.
          </p>

          <h3 class="mb-2 mt-4 text-lg font-semibold text-gray-900 dark:text-white">
            Import
          </h3>
          <div class="mb-4 rounded-md bg-gray-50 p-3 dark:bg-gray-800">
            <pre class="whitespace-pre text-sm text-gray-800 dark:text-gray-200">
              {`import { ServerFormField } from "@/components/Core/Form/ServerField";`}
            </pre>
          </div>

          <h3 class="mb-2 mt-6 text-lg font-semibold text-gray-900 dark:text-white">
            Props
          </h3>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    Default
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    Required
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-900">
                {serverFormFieldProps.map((prop, index) => (
                  <tr
                    key={index}
                    class={
                      index % 2 === 0
                        ? "bg-white dark:bg-gray-900"
                        : "bg-gray-50 dark:bg-gray-800"
                    }
                  >
                    <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                      {prop.name}
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {prop.type}
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {prop.defaultValue}
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {prop.description}
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {prop.required ? "Yes" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            ServerButton
          </h2>
          <p class="mb-4 text-gray-700 dark:text-gray-300">
            A server component version of the Button component, used for form
            submissions and actions.
          </p>

          <h3 class="mb-2 mt-4 text-lg font-semibold text-gray-900 dark:text-white">
            Import
          </h3>
          <div class="mb-4 rounded-md bg-gray-50 p-3 dark:bg-gray-800">
            <pre class="whitespace-pre text-sm text-gray-800 dark:text-gray-200">
              {`import { ServerButton } from "@/components/Core/Form/ServerField";`}
            </pre>
          </div>

          <h3 class="mb-2 mt-6 text-lg font-semibold text-gray-900 dark:text-white">
            Props
          </h3>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    Default
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    Required
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-900">
                {serverButtonProps.map((prop, index) => (
                  <tr
                    key={index}
                    class={
                      index % 2 === 0
                        ? "bg-white dark:bg-gray-900"
                        : "bg-gray-50 dark:bg-gray-800"
                    }
                  >
                    <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                      {prop.name}
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {prop.type}
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {prop.defaultValue}
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {prop.description}
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {prop.required ? "Yes" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Select
          </h2>
          <p class="mb-4 text-gray-700 dark:text-gray-300">
            A server component version of a select dropdown, used in
            server-rendered forms.
          </p>

          <h3 class="mb-2 mt-4 text-lg font-semibold text-gray-900 dark:text-white">
            Import
          </h3>
          <div class="mb-4 rounded-md bg-gray-50 p-3 dark:bg-gray-800">
            <pre class="whitespace-pre text-sm text-gray-800 dark:text-gray-200">
              {`import { Select } from "@/components/Core/Form/ServerField";`}
            </pre>
          </div>

          <h3 class="mb-2 mt-6 text-lg font-semibold text-gray-900 dark:text-white">
            Props
          </h3>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    Default
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    Required
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-900">
                {selectProps.map((prop, index) => (
                  <tr
                    key={index}
                    class={
                      index % 2 === 0
                        ? "bg-white dark:bg-gray-900"
                        : "bg-gray-50 dark:bg-gray-800"
                    }
                  >
                    <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                      {prop.name}
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {prop.type}
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {prop.defaultValue}
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {prop.description}
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {prop.required ? "Yes" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </APIReferenceTemplate>
  );
});
