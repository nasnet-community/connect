import { component$ } from "@builder.io/qwik";
import { FormLabel } from "../index";

export default component$(() => {
  return (
    <div class="space-y-8">
      <div class="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4 dark:from-blue-900/20 dark:to-indigo-900/20">
        <h3 class="mb-3 text-lg font-semibold">Fluid Typography Examples</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-300">
          Fluid typography scales smoothly with viewport size using CSS clamp() function.
          Resize your browser to see the smooth scaling effect.
        </p>
        <div class="rounded bg-white/60 p-2 text-xs dark:bg-gray-800/60">
          <strong>Note:</strong> Fluid typography uses viewport-based scaling between minimum and maximum sizes
        </div>
      </div>

      <div class="space-y-8">
        <div>
          <h4 class="mb-4 text-base font-medium">Fluid Size Comparison</h4>
          <div class="grid gap-6 lg:grid-cols-2">
            <div class="space-y-4">
              <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300">Standard Static Sizing</h5>
              
              <div>
                <FormLabel for="static-small" size="sm">
                  Small Static Label (12px)
                </FormLabel>
                <input
                  id="static-small"
                  type="text"
                  class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm dark:border-gray-700"
                  placeholder="Static small input"
                />
              </div>

              <div>
                <FormLabel for="static-medium" size="md">
                  Medium Static Label (14px)
                </FormLabel>
                <input
                  id="static-medium"
                  type="text"
                  class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700"
                  placeholder="Static medium input"
                />
              </div>

              <div>
                <FormLabel for="static-large" size="lg">
                  Large Static Label (16px)
                </FormLabel>
                <input
                  id="static-large"
                  type="text"
                  class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-base dark:border-gray-700"
                  placeholder="Static large input"
                />
              </div>
            </div>

            <div class="space-y-4">
              <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300">Fluid Responsive Sizing</h5>
              
              <div>
                <FormLabel for="fluid-small" size="sm" fluidSize="fluid">
                  Small Fluid Label (scales)
                </FormLabel>
                <input
                  id="fluid-small"
                  type="text"
                  class="mt-1 block w-full rounded-md border border-blue-300 px-3 py-1.5 text-sm dark:border-blue-700"
                  placeholder="Fluid small input"
                />
              </div>

              <div>
                <FormLabel for="fluid-medium" size="md" fluidSize="fluid">
                  Medium Fluid Label (scales)
                </FormLabel>
                <input
                  id="fluid-medium"
                  type="text"
                  class="mt-1 block w-full rounded-md border border-blue-300 px-3 py-2 dark:border-blue-700"
                  placeholder="Fluid medium input"
                />
              </div>

              <div>
                <FormLabel for="fluid-large" size="lg" fluidSize="fluid">
                  Large Fluid Label (scales)
                </FormLabel>
                <input
                  id="fluid-large"
                  type="text"
                  class="mt-1 block w-full rounded-md border border-blue-300 px-3 py-2 text-base dark:border-blue-700"
                  placeholder="Fluid large input"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="border-t pt-6">
          <h4 class="mb-4 text-base font-medium">Fluid Typography with Form States</h4>
          <p class="mb-4 text-sm text-gray-600 dark:text-gray-300">
            Form validation states with fluid typography scaling
          </p>
          
          <div class="space-y-4">
            <div>
              <FormLabel 
                for="fluid-error" 
                size="md" 
                fluidSize="fluid" 
                error 
                required
              >
                Error State with Fluid Text
              </FormLabel>
              <input
                id="fluid-error"
                type="email"
                class="mt-1 block w-full rounded-md border border-red-500 px-3 py-2 dark:border-red-500"
                placeholder="Enter email address"
                aria-invalid="true"
              />
              <p class="mt-1 text-fluid-xs text-red-600 dark:text-red-400">
                This error message also uses fluid typography for consistent scaling
              </p>
            </div>

            <div>
              <FormLabel 
                for="fluid-success" 
                size="md" 
                fluidSize="fluid" 
                success
              >
                Success State with Fluid Text
              </FormLabel>
              <input
                id="fluid-success"
                type="email"
                class="mt-1 block w-full rounded-md border border-green-500 px-3 py-2 dark:border-green-500"
                value="user@example.com"
                placeholder="Enter email address"
              />
              <p class="mt-1 text-fluid-xs text-green-600 dark:text-green-400">
                Success message with fluid typography scaling
              </p>
            </div>

            <div>
              <FormLabel 
                for="fluid-warning" 
                size="md" 
                fluidSize="fluid" 
                warning
              >
                Warning State with Fluid Text
              </FormLabel>
              <input
                id="fluid-warning"
                type="password"
                class="mt-1 block w-full rounded-md border border-yellow-500 px-3 py-2 dark:border-yellow-500"
                placeholder="Enter password"
              />
              <p class="mt-1 text-fluid-xs text-yellow-600 dark:text-yellow-400">
                Warning: Password strength is low. Consider using a stronger password.
              </p>
            </div>
          </div>
        </div>

        <div class="border-t pt-6">
          <h4 class="mb-4 text-base font-medium">Complex Form with Fluid Typography</h4>
          <p class="mb-4 text-sm text-gray-600 dark:text-gray-300">
            A complete form demonstrating fluid typography throughout
          </p>
          
          <div class="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
            <div class="mb-6">
              <h5 class="text-fluid-lg font-semibold text-gray-900 dark:text-gray-100">
                User Registration Form
              </h5>
              <p class="mt-1 text-fluid-sm text-gray-600 dark:text-gray-400">
                This form uses fluid typography throughout for optimal readability at any screen size
              </p>
            </div>

            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <FormLabel for="fluid-fname" size="sm" fluidSize="fluid" required>
                  First Name
                </FormLabel>
                <input
                  id="fluid-fname"
                  type="text"
                  class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700"
                  placeholder="John"
                />
              </div>

              <div>
                <FormLabel for="fluid-lname" size="sm" fluidSize="fluid" required>
                  Last Name
                </FormLabel>
                <input
                  id="fluid-lname"
                  type="text"
                  class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div class="mt-4">
              <FormLabel for="fluid-email-reg" size="md" fluidSize="fluid" required>
                Email Address
              </FormLabel>
              <input
                id="fluid-email-reg"
                type="email"
                class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700"
                placeholder="john.doe@example.com"
              />
              <p class="mt-1 text-fluid-xs text-gray-500 dark:text-gray-400">
                We'll never share your email with anyone else.
              </p>
            </div>

            <div class="mt-4">
              <FormLabel for="fluid-bio" size="md" fluidSize="fluid">
                Bio (Optional)
              </FormLabel>
              <textarea
                id="fluid-bio"
                rows={3}
                class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700"
                placeholder="Tell us a bit about yourself..."
              ></textarea>
              <p class="mt-1 text-fluid-xs text-gray-500 dark:text-gray-400">
                Brief description for your profile. Maximum 500 characters.
              </p>
            </div>
          </div>
        </div>

        <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
          <h4 class="mb-3 text-sm font-medium">Fluid Typography Scaling Information</h4>
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <h5 class="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">Small Fluid</h5>
              <code class="text-xs text-gray-700 dark:text-gray-300">clamp(0.75rem, 2vw, 0.875rem)</code>
              <p class="text-xs text-gray-600 dark:text-gray-400">12px → 14px</p>
            </div>
            <div>
              <h5 class="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">Medium Fluid</h5>
              <code class="text-xs text-gray-700 dark:text-gray-300">clamp(0.875rem, 2.5vw, 1rem)</code>
              <p class="text-xs text-gray-600 dark:text-gray-400">14px → 16px</p>
            </div>
            <div>
              <h5 class="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">Large Fluid</h5>
              <code class="text-xs text-gray-700 dark:text-gray-300">clamp(1rem, 3vw, 1.125rem)</code>
              <p class="text-xs text-gray-600 dark:text-gray-400">16px → 18px</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});