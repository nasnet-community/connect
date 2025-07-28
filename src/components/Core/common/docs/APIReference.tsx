import { component$ } from "@builder.io/qwik";
import { APIReferenceTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const apiData = [
    {
      component: "VisuallyHidden",
      description: "Hides content visually while keeping it accessible to screen readers",
      props: [
        {
          name: "class",
          type: "string",
          default: "undefined",
          description: "Additional CSS classes to apply",
        },
        {
          name: "style",
          type: "CSSProperties",
          default: "undefined",
          description: "Additional inline styles to apply",
        },
        {
          name: "...props",
          type: "PropsOf<'span'>",
          default: "undefined",
          description: "All standard span element props are supported",
        },
      ],
      examples: [
        {
          title: "Basic Usage",
          code: `<VisuallyHidden>
  This text is only visible to screen readers
</VisuallyHidden>`,
        },
        {
          title: "Skip Link",
          code: `<VisuallyHidden>
  <a href="#main-content" class="focus:not-sr-only">
    Skip to main content
  </a>
</VisuallyHidden>`,
        },
      ],
    },
    {
      component: "generateId",
      description: "Generates a unique identifier with an optional prefix",
      props: [
        {
          name: "prefix",
          type: "string",
          default: "'ui'",
          description: "Prefix for the generated ID",
        },
      ],
      examples: [
        {
          title: "Basic Usage",
          code: `const id = generateId(); // "ui-a1b2c3d"
const customId = generateId("form"); // "form-x9y8z7w"`,
        },
      ],
    },
    {
      component: "classNames",
      description: "Merges class names conditionally, filtering out falsy values",
      props: [
        {
          name: "...classes",
          type: "(string | undefined | null | false)[]",
          default: "undefined",
          description: "Array of class names or conditions",
        },
      ],
      examples: [
        {
          title: "Conditional Classes",
          code: `const classes = classNames(
  "base-class",
  isActive && "active",
  isDisabled && "disabled",
  customClass
); // "base-class active"`,
        },
      ],
    },
    {
      component: "debounce",
      description: "Creates a debounced version of a function that delays execution",
      props: [
        {
          name: "func",
          type: "Function",
          default: "undefined",
          description: "The function to debounce",
        },
        {
          name: "wait",
          type: "number",
          default: "undefined",
          description: "Delay in milliseconds",
        },
      ],
      examples: [
        {
          title: "Search Input Debouncing",
          code: `const debouncedSearch = debounce((query: string) => {
  performSearch(query);
}, 300);

// In component
<input onInput$={(e) => debouncedSearch(e.target.value)} />`,
        },
      ],
    },
  ];

  const typeDefinitions = [
    {
      name: "ValidationState",
      type: '"default" | "valid" | "invalid"',
      description: "Represents the validation state of form inputs",
    },
    {
      name: "InputSize",
      type: '"sm" | "md" | "lg"',
      description: "Standard size options for input components",
    },
    {
      name: "Option",
      interface: `{
  value: string;
  label: string;
  disabled?: boolean;
}`,
      description: "Common option interface for select/dropdown components",
    },
    {
      name: "ChangeHandler<T>",
      type: "(event: Event, element: T) => void",
      description: "Type-safe change event handler",
    },
    {
      name: "ClickHandler",
      type: "() => void",
      description: "Simple click event handler type",
    },
    {
      name: "ConfigMethod",
      type: '"file" | "manual"',
      description: "Configuration method selection",
    },
    {
      name: "VPNCredentials",
      interface: `{
  server: string;
  username: string;
  password: string;
  [key: string]: string;
}`,
      description: "VPN connection credentials structure",
    },
  ];

  return (
    <APIReferenceTemplate title="Common Module API Reference">
      <div class="space-y-8">
        <section>
          <h2 class="mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Components & Functions
          </h2>
          <div class="space-y-6">
            {apiData.map((item) => (
              <div
                key={item.component}
                class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
              >
                <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {item.component}
                </h3>
                <p class="mb-4 text-gray-600 dark:text-gray-400">{item.description}</p>

                {item.props && (
                  <>
                    <h4 class="mb-2 font-medium text-gray-900 dark:text-gray-100">Props</h4>
                    <div class="mb-4 overflow-x-auto">
                      <table class="w-full text-sm">
                        <thead>
                          <tr class="border-b dark:border-gray-700">
                            <th class="pb-2 text-left">Name</th>
                            <th class="pb-2 text-left">Type</th>
                            <th class="pb-2 text-left">Default</th>
                            <th class="pb-2 text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.props.map((prop) => (
                            <tr key={prop.name} class="border-b dark:border-gray-700">
                              <td class="py-2 font-mono text-xs">{prop.name}</td>
                              <td class="py-2 font-mono text-xs text-blue-600 dark:text-blue-400">
                                {prop.type}
                              </td>
                              <td class="py-2 font-mono text-xs">{prop.default}</td>
                              <td class="py-2 text-gray-600 dark:text-gray-400">
                                {prop.description}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}

                {item.examples && (
                  <>
                    <h4 class="mb-2 font-medium text-gray-900 dark:text-gray-100">Examples</h4>
                    {item.examples.map((example) => (
                      <div key={example.title} class="mb-3">
                        <h5 class="mb-1 text-sm font-medium">{example.title}</h5>
                        <pre class="overflow-x-auto rounded bg-gray-100 p-3 text-xs dark:bg-gray-900">
                          <code>{example.code}</code>
                        </pre>
                      </div>
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 class="mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Type Definitions
          </h2>
          <div class="space-y-4">
            {typeDefinitions.map((type) => (
              <div
                key={type.name}
                class="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
              >
                <h3 class="mb-1 font-mono text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {type.name}
                </h3>
                <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">{type.description}</p>
                <pre class="overflow-x-auto rounded bg-gray-100 p-2 text-xs dark:bg-gray-900">
                  <code class="text-blue-600 dark:text-blue-400">
                    {type.type || type.interface}
                  </code>
                </pre>
              </div>
            ))}
          </div>
        </section>
      </div>
    </APIReferenceTemplate>
  );
});