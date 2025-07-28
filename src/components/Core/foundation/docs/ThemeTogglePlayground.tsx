import { component$, useSignal } from "@builder.io/qwik";
import { ThemeToggle } from "../ThemeToggle";

/**
 * Interactive playground for ThemeToggle component
 */
export const ThemeTogglePlayground = component$(() => {
  const containerClass = useSignal("");
  const buttonClass = useSignal("");
  const presetStyle = useSignal("default");

  const presetStyles = {
    default: {
      container: "",
      button: ""
    },
    minimal: {
      container: "",
      button: "p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800"
    },
    bordered: {
      container: "rounded-lg border border-neutral-200 p-1 dark:border-neutral-700",
      button: "p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800"
    },
    filled: {
      container: "",
      button: "rounded-full bg-primary-100 p-3 text-primary-700 hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800"
    },
    outlined: {
      container: "",
      button: "rounded-lg border-2 border-secondary-500 bg-transparent p-2 text-secondary-600 hover:bg-secondary-50 dark:border-secondary-400 dark:text-secondary-400 dark:hover:bg-secondary-950"
    },
    gradient: {
      container: "",
      button: "rounded-md bg-gradient-to-r from-primary-500 to-secondary-500 p-3 text-white shadow-lg hover:shadow-xl"
    },
    mobile: {
      container: "",
      button: "touch-manipulation rounded-lg p-3 min-h-[44px] min-w-[44px] hover:bg-neutral-200 focus:ring-2 focus:ring-primary-500 dark:hover:bg-neutral-700"
    }
  };

  return (
    <div class="space-y-8">
      <section>
        <h2 class="mb-6 text-2xl font-semibold">ThemeToggle Playground</h2>
        <p class="mb-6 text-base text-neutral-600 dark:text-neutral-400">
          Experiment with different styling options and see the results in real-time.
        </p>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Interactive Preview</h3>
        <div class="rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-700 dark:bg-neutral-900">
          <div class="flex items-center justify-center">
            <ThemeToggle 
              class={containerClass.value}
              buttonClass={buttonClass.value}
            />
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Quick Presets</h3>
        <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
          {Object.entries(presetStyles).map(([key, styles]) => (
            <button
              key={key}
              class={`rounded-lg border p-3 text-sm font-medium transition-colors ${
                presetStyle.value === key
                  ? "border-primary-500 bg-primary-50 text-primary-700 dark:border-primary-400 dark:bg-primary-950 dark:text-primary-300"
                  : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-750"
              }`}
              onClick$={() => {
                presetStyle.value = key;
                containerClass.value = styles.container;
                buttonClass.value = styles.button;
              }}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Custom Styling</h3>
        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <label class="mb-2 block text-sm font-medium">
              Container Class
            </label>
            <textarea
              class="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800"
              rows={3}
              placeholder="Enter Tailwind classes for container..."
              value={containerClass.value}
              onInput$={(e) => {
                containerClass.value = (e.target as HTMLTextAreaElement).value;
                presetStyle.value = "custom";
              }}
            />
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium">
              Button Class
            </label>
            <textarea
              class="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800"
              rows={3}
              placeholder="Enter Tailwind classes for button..."
              value={buttonClass.value}
              onInput$={(e) => {
                buttonClass.value = (e.target as HTMLTextAreaElement).value;
                presetStyle.value = "custom";
              }}
            />
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Generated Code</h3>
        <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <pre class="text-sm">
            <code>
              {`<ThemeToggle${containerClass.value ? `\n  class="${containerClass.value}"` : ""}${buttonClass.value ? `\n  buttonClass="${buttonClass.value}"` : ""} />`}
            </code>
          </pre>
        </div>
        <button
          class="mt-3 rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600"
          onClick$={() => {
            const code = `<ThemeToggle${containerClass.value ? `\n  class="${containerClass.value}"` : ""}${buttonClass.value ? `\n  buttonClass="${buttonClass.value}"` : ""} />`;
            navigator.clipboard.writeText(code);
          }}
        >
          Copy Code
        </button>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Style Examples</h3>
        <div class="space-y-6">
          <div>
            <h4 class="mb-3 text-lg font-medium">Different Sizes</h4>
            <div class="flex items-center space-x-6 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
              <div class="text-center">
                <ThemeToggle buttonClass="p-1.5 rounded text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800" />
                <p class="mt-2 text-xs text-neutral-500">Small</p>
              </div>
              <div class="text-center">
                <ThemeToggle buttonClass="p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800" />
                <p class="mt-2 text-xs text-neutral-500">Medium</p>
              </div>
              <div class="text-center">
                <ThemeToggle buttonClass="p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800" />
                <p class="mt-2 text-xs text-neutral-500">Large</p>
              </div>
            </div>
          </div>

          <div>
            <h4 class="mb-3 text-lg font-medium">Different Shapes</h4>
            <div class="flex items-center space-x-6 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
              <div class="text-center">
                <ThemeToggle buttonClass="p-2 rounded-none hover:bg-neutral-100 dark:hover:bg-neutral-800" />
                <p class="mt-2 text-xs text-neutral-500">Square</p>
              </div>
              <div class="text-center">
                <ThemeToggle buttonClass="p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800" />
                <p class="mt-2 text-xs text-neutral-500">Rounded</p>
              </div>
              <div class="text-center">
                <ThemeToggle buttonClass="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800" />
                <p class="mt-2 text-xs text-neutral-500">Circle</p>
              </div>
            </div>
          </div>

          <div>
            <h4 class="mb-3 text-lg font-medium">With Backgrounds</h4>
            <div class="flex items-center space-x-6 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
              <div class="text-center">
                <ThemeToggle buttonClass="p-2 rounded bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700" />
                <p class="mt-2 text-xs text-neutral-500">Neutral</p>
              </div>
              <div class="text-center">
                <ThemeToggle buttonClass="p-2 rounded bg-primary-100 text-primary-700 hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800" />
                <p class="mt-2 text-xs text-neutral-500">Primary</p>
              </div>
              <div class="text-center">
                <ThemeToggle buttonClass="p-2 rounded bg-secondary-100 text-secondary-700 hover:bg-secondary-200 dark:bg-secondary-900 dark:text-secondary-300 dark:hover:bg-secondary-800" />
                <p class="mt-2 text-xs text-neutral-500">Secondary</p>
              </div>
            </div>
          </div>

          <div>
            <h4 class="mb-3 text-lg font-medium">With Borders</h4>
            <div class="flex items-center space-x-6 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
              <div class="text-center">
                <ThemeToggle buttonClass="p-2 rounded border border-neutral-300 hover:bg-neutral-50 dark:border-neutral-600 dark:hover:bg-neutral-800" />
                <p class="mt-2 text-xs text-neutral-500">Light Border</p>
              </div>
              <div class="text-center">
                <ThemeToggle buttonClass="p-2 rounded border-2 border-primary-500 text-primary-600 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-950" />
                <p class="mt-2 text-xs text-neutral-500">Thick Border</p>
              </div>
              <div class="text-center">
                <ThemeToggle buttonClass="p-2 rounded border border-dashed border-secondary-500 text-secondary-600 hover:bg-secondary-50 dark:border-secondary-400 dark:text-secondary-400 dark:hover:bg-secondary-950" />
                <p class="mt-2 text-xs text-neutral-500">Dashed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="mt-8 rounded-lg border border-info-200 bg-info-50 p-6 dark:border-info-800 dark:bg-info-950">
        <h3 class="mb-2 text-lg font-medium text-info-900 dark:text-info-100">
          💡 Playground Tips
        </h3>
        <ul class="space-y-2 text-sm text-info-800 dark:text-info-200">
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-info-500"></span>
            <span>Use the presets as starting points for your custom styling</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-info-500"></span>
            <span>Test your styles in both light and dark modes</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-info-500"></span>
            <span>Consider mobile touch targets (minimum 44px) when customizing</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-info-500"></span>
            <span>Copy the generated code to use in your application</span>
          </li>
        </ul>
      </div>
    </div>
  );
});

export default ThemeTogglePlayground;