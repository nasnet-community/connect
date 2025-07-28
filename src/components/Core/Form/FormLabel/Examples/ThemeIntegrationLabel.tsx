import { component$, useSignal } from "@builder.io/qwik";
import { FormLabel } from "../index";

export default component$(() => {
  const currentTheme = useSignal<"light" | "dark" | "dim">("light");

  return (
    <div class="space-y-8">
      <div class="rounded-lg bg-gradient-to-r from-primary-50 to-secondary-50 p-4 dark:from-primary-900/20 dark:to-secondary-900/20">
        <h3 class="mb-3 text-lg font-semibold">Advanced Theme Integration</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-300">
          Demonstrates how FormLabel integrates with the comprehensive design token system
          including semantic colors, surface tokens, and theme variants.
        </p>
        
        <div class="flex gap-2">
          <button
            class={[
              "rounded px-3 py-1 text-xs font-medium transition-colors",
              currentTheme.value === "light"
                ? "bg-primary-100 text-primary-800 dark:bg-primary-800 dark:text-primary-100"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
            ].join(" ")}
            onClick$={() => {
              currentTheme.value = "light";
              document.documentElement.setAttribute("data-theme", "light");
            }}
          >
            Light Theme
          </button>
          <button
            class={[
              "rounded px-3 py-1 text-xs font-medium transition-colors",
              currentTheme.value === "dark"
                ? "bg-primary-100 text-primary-800 dark:bg-primary-800 dark:text-primary-100"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
            ].join(" ")}
            onClick$={() => {
              currentTheme.value = "dark";
              document.documentElement.setAttribute("data-theme", "dark");
            }}
          >
            Dark Theme
          </button>
          <button
            class={[
              "rounded px-3 py-1 text-xs font-medium transition-colors",
              currentTheme.value === "dim"
                ? "bg-primary-100 text-primary-800 dark:bg-primary-800 dark:text-primary-100"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
            ].join(" ")}
            onClick$={() => {
              currentTheme.value = "dim";
              document.documentElement.setAttribute("data-theme", "dim");
            }}
          >
            Dim Theme
          </button>
        </div>
      </div>

      <div class="space-y-8">
        <div>
          <h4 class="mb-4 text-base font-medium">Semantic Color Integration</h4>
          <p class="mb-4 text-sm text-gray-600 dark:text-gray-300">
            Labels automatically adapt to semantic color tokens across all theme variants
          </p>
          
          <div class="grid gap-4 md:grid-cols-2">
            <div class="rounded-lg bg-surface-light-secondary p-4 dark:bg-surface-dark-secondary">
              <h5 class="mb-3 text-sm font-medium">Form States with Semantic Colors</h5>
              
              <div class="space-y-3">
                <div>
                  <FormLabel for="theme-default" size="md">
                    Default State
                  </FormLabel>
                  <input
                    id="theme-default"
                    type="text"
                    class="mt-1 block w-full rounded-md border border-gray-300 bg-surface-light px-3 py-2 dark:border-gray-600 dark:bg-surface-dark"
                    placeholder="Uses semantic text tokens"
                  />
                </div>

                <div>
                  <FormLabel for="theme-error" size="md" error required>
                    Error State
                  </FormLabel>
                  <input
                    id="theme-error"
                    type="email"
                    class="mt-1 block w-full rounded-md border border-error-600 bg-error-surface px-3 py-2 text-error-on-surface dark:border-error-400"
                    placeholder="error@example.com"
                    aria-invalid="true"
                  />
                  <p class="mt-1 text-xs text-error-600 dark:text-error-400">
                    Please enter a valid email address
                  </p>
                </div>

                <div>
                  <FormLabel for="theme-success" size="md" success>
                    Success State
                  </FormLabel>
                  <input
                    id="theme-success"
                    type="email"
                    class="mt-1 block w-full rounded-md border border-success-600 bg-success-surface px-3 py-2 text-success-on-surface dark:border-success-400"
                    value="success@example.com"
                    placeholder="success@example.com"
                  />
                  <p class="mt-1 text-xs text-success-600 dark:text-success-400">
                    Email address is valid
                  </p>
                </div>

                <div>
                  <FormLabel for="theme-warning" size="md" warning>
                    Warning State
                  </FormLabel>
                  <input
                    id="theme-warning"
                    type="password"
                    class="mt-1 block w-full rounded-md border border-warning-600 bg-warning-surface px-3 py-2 text-warning-on-surface dark:border-warning-400"
                    placeholder="Enter password"
                  />
                  <p class="mt-1 text-xs text-warning-600 dark:text-warning-400">
                    Password strength: Weak
                  </p>
                </div>
              </div>
            </div>

            <div class="rounded-lg bg-surface-light-tertiary p-4 dark:bg-surface-dark-tertiary">
              <h5 class="mb-3 text-sm font-medium">Brand Color Integration</h5>
              
              <div class="space-y-3">
                <div>
                  <FormLabel for="theme-primary" size="md" class="text-primary-600 dark:text-primary-400">
                    Primary Brand Field
                  </FormLabel>
                  <input
                    id="theme-primary"
                    type="text"
                    class="mt-1 block w-full rounded-md border border-primary-300 bg-primary-50 px-3 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-primary-600 dark:bg-primary-950 dark:focus:border-primary-400 dark:focus:ring-primary-800"
                    placeholder="Primary themed input"
                  />
                </div>

                <div>
                  <FormLabel for="theme-secondary" size="md" class="text-secondary-600 dark:text-secondary-400">
                    Secondary Brand Field
                  </FormLabel>
                  <input
                    id="theme-secondary"
                    type="text"
                    class="mt-1 block w-full rounded-md border border-secondary-300 bg-secondary-50 px-3 py-2 focus:border-secondary-500 focus:ring-2 focus:ring-secondary-200 dark:border-secondary-600 dark:bg-secondary-950 dark:focus:border-secondary-400 dark:focus:ring-secondary-800"
                    placeholder="Secondary themed input"
                  />
                </div>

                <div>
                  <FormLabel for="theme-info" size="md" class="text-info-600 dark:text-info-400">
                    Info Accent Field
                  </FormLabel>
                  <input
                    id="theme-info"
                    type="text"
                    class="mt-1 block w-full rounded-md border border-info-300 bg-info-50 px-3 py-2 focus:border-info-500 focus:ring-2 focus:ring-info-200 dark:border-info-600 dark:bg-info-950 dark:focus:border-info-400 dark:focus:ring-info-800"
                    placeholder="Info themed input"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t pt-6">
          <h4 class="mb-4 text-base font-medium">Surface Token Integration</h4>
          <p class="mb-4 text-sm text-gray-600 dark:text-gray-300">
            Demonstrates how labels work with different surface elevation tokens
          </p>
          
          <div class="space-y-4">
            <div class="rounded-lg bg-surface-light p-4 shadow-sm dark:bg-surface-dark">
              <h5 class="mb-2 text-sm font-medium">Default Surface</h5>
              <FormLabel for="surface-default" size="md">
                Default Surface Label
              </FormLabel>
              <input
                id="surface-default"
                type="text"
                class="mt-1 block w-full rounded-md border border-gray-300 bg-surface-light px-3 py-2 dark:border-gray-600 dark:bg-surface-dark"
                placeholder="Default surface input"
              />
            </div>

            <div class="rounded-lg bg-surface-light-elevated p-4 shadow-md dark:bg-surface-dark-elevated">
              <h5 class="mb-2 text-sm font-medium">Elevated Surface</h5>
              <FormLabel for="surface-elevated" size="md">
                Elevated Surface Label
              </FormLabel>
              <input
                id="surface-elevated"
                type="text"
                class="mt-1 block w-full rounded-md border border-gray-300 bg-surface-light-elevated px-3 py-2 dark:border-gray-600 dark:bg-surface-dark-elevated"
                placeholder="Elevated surface input"
              />
            </div>

            <div class="rounded-lg bg-surface-light-depressed p-4 shadow-inner dark:bg-surface-dark-depressed">
              <h5 class="mb-2 text-sm font-medium">Depressed Surface</h5>
              <FormLabel for="surface-depressed" size="md">
                Depressed Surface Label
              </FormLabel>
              <input
                id="surface-depressed"
                type="text"
                class="mt-1 block w-full rounded-md border border-gray-300 bg-surface-light-depressed px-3 py-2 dark:border-gray-600 dark:bg-surface-dark-depressed"
                placeholder="Depressed surface input"
              />
            </div>
          </div>
        </div>

        <div class="border-t pt-6">
          <h4 class="mb-4 text-base font-medium">High Contrast & Accessibility</h4>
          <p class="mb-4 text-sm text-gray-600 dark:text-gray-300">
            Labels automatically adapt to high contrast preferences and accessibility needs
          </p>
          
          <div class="rounded-lg border-2 border-dashed border-gray-300 p-4 dark:border-gray-600">
            <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Try toggling high contrast mode in your browser/OS to see the automatic adaptations
            </div>
            
            <div class="space-y-3">
              <div>
                <FormLabel 
                  for="hc-field1" 
                  size="md" 
                  class="high-contrast:text-black high-contrast:font-bold dark:high-contrast:text-white"
                >
                  High Contrast Label
                </FormLabel>
                <input
                  id="hc-field1"
                  type="text"
                  class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 high-contrast:border-black high-contrast:bg-white dark:border-gray-600 dark:high-contrast:border-white dark:high-contrast:bg-black"
                  placeholder="High contrast input"
                />
              </div>

              <div>
                <FormLabel 
                  for="hc-field2" 
                  size="md" 
                  error
                  class="high-contrast:text-red-900 high-contrast:font-bold dark:high-contrast:text-red-100"
                >
                  High Contrast Error
                </FormLabel>
                <input
                  id="hc-field2"
                  type="text"
                  class="mt-1 block w-full rounded-md border border-red-500 px-3 py-2 high-contrast:border-red-900 high-contrast:bg-red-50 dark:border-red-400 dark:high-contrast:border-red-100 dark:high-contrast:bg-red-950"
                  placeholder="High contrast error input"
                  aria-invalid="true"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
          <h4 class="mb-3 text-sm font-medium">Theme Token Reference</h4>
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <h5 class="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">Semantic Colors</h5>
              <ul class="space-y-1 text-xs">
                <li><code>error-600/400</code> - Error states</li>
                <li><code>success-600/400</code> - Success states</li>
                <li><code>warning-600/400</code> - Warning states</li>
                <li><code>info-600/400</code> - Info states</li>
              </ul>
            </div>
            <div>
              <h5 class="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">Surface Tokens</h5>
              <ul class="space-y-1 text-xs">
                <li><code>surface-light/dark</code> - Default</li>
                <li><code>surface-light-elevated</code> - Raised</li>
                <li><code>surface-light-depressed</code> - Sunken</li>
                <li><code>surface-light-secondary</code> - Alt</li>
              </ul>
            </div>
            <div>
              <h5 class="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">Brand Colors</h5>
              <ul class="space-y-1 text-xs">
                <li><code>primary-600/400</code> - Primary brand</li>
                <li><code>secondary-600/400</code> - Secondary brand</li>
                <li><code>gray-700/200</code> - Neutral text</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});