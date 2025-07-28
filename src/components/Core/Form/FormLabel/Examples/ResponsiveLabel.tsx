import { component$ } from "@builder.io/qwik";
import { FormLabel } from "../index";

export default component$(() => {
  return (
    <div class="space-y-8">
      <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
        <h3 class="mb-3 text-lg font-semibold">Responsive Breakpoint Examples</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-300">
          Resize your browser to see how labels adapt to different screen sizes using
          tailwind config breakpoints (mobile: 360px, tablet: 768px, desktop: 1280px).
        </p>
      </div>

      <div class="space-y-6">
        <div>
          <h4 class="mb-3 text-base font-medium">Auto-Responsive Sizing</h4>
          <p class="mb-3 text-sm text-gray-600 dark:text-gray-300">
            Labels automatically adjust size based on screen breakpoints
          </p>
          
          <FormLabel for="responsive-small" size="sm" fluidSize="auto">
            Small Label (xs → sm → sm)
          </FormLabel>
          <input
            id="responsive-small"
            type="text"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm mobile:py-2 tablet:py-2 dark:border-gray-700"
            placeholder="Auto-responsive small input"
          />

          <div class="mt-3">
            <FormLabel for="responsive-medium" size="md" fluidSize="auto">
              Medium Label (sm → base → base)
            </FormLabel>
            <input
              id="responsive-medium"
              type="text"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 mobile:py-2 tablet:py-2.5 dark:border-gray-700"
              placeholder="Auto-responsive medium input"
            />
          </div>

          <div class="mt-3">
            <FormLabel for="responsive-large" size="lg" fluidSize="auto">
              Large Label (base → lg → xl)
            </FormLabel>
            <input
              id="responsive-large"
              type="text"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-base mobile:py-2.5 tablet:py-3 tablet:text-lg dark:border-gray-700"
              placeholder="Auto-responsive large input"
            />
          </div>
        </div>

        <div class="border-t pt-6">
          <h4 class="mb-3 text-base font-medium">Touch-Optimized for Mobile</h4>
          <p class="mb-3 text-sm text-gray-600 dark:text-gray-300">
            Labels with touch optimization provide better mobile interaction
          </p>
          
          <FormLabel 
            for="touch-optimized" 
            size="md" 
            touchOptimized={true}
            fluidSize="auto"
          >
            Touch-Optimized Label
          </FormLabel>
          <input
            id="touch-optimized"
            type="text"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-3 touch:py-4 dark:border-gray-700"
            placeholder="Touch-friendly input"
          />
        </div>

        <div class="border-t pt-6">
          <h4 class="mb-3 text-base font-medium">Device-Specific Form Layouts</h4>
          <p class="mb-3 text-sm text-gray-600 dark:text-gray-300">
            Forms that adapt their layout based on device capabilities
          </p>
          
          <div class="grid gap-4 mobile:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3">
            <div>
              <FormLabel for="mobile-first" size="sm" fluidSize="auto">
                Mobile-First Field
              </FormLabel>
              <input
                id="mobile-first"
                type="text"
                class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 mobile:py-2 tablet:py-1.5 dark:border-gray-700"
                placeholder="Mobile optimized"
              />
            </div>
            
            <div class="tablet:block mobile:hidden">
              <FormLabel for="tablet-visible" size="md" fluidSize="auto">
                Tablet+ Visible
              </FormLabel>
              <input
                id="tablet-visible"
                type="text"
                class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700"
                placeholder="Tablet and up"
              />
            </div>
            
            <div class="desktop:block mobile:hidden tablet:hidden">
              <FormLabel for="desktop-only" size="lg" fluidSize="auto">
                Desktop Only Field
              </FormLabel>
              <input
                id="desktop-only"
                type="text"
                class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700"
                placeholder="Desktop only"
              />
            </div>
          </div>
        </div>

        <div class="border-t pt-6">
          <h4 class="mb-3 text-base font-medium">Responsive State Indicators</h4>
          <p class="mb-3 text-sm text-gray-600 dark:text-gray-300">
            Error and success states that adapt to screen size
          </p>
          
          <div class="space-y-4">
            <div>
              <FormLabel 
                for="responsive-error" 
                size="md" 
                fluidSize="auto" 
                error 
                required
              >
                Error State (Responsive)
              </FormLabel>
              <input
                id="responsive-error"
                type="email"
                class="mt-1 block w-full rounded-md border border-red-500 px-3 py-2 mobile:py-2.5 tablet:py-2 dark:border-red-500"
                placeholder="Enter email"
                aria-invalid="true"
              />
              <p class="mt-1 text-xs text-red-600 mobile:text-sm tablet:text-xs dark:text-red-400">
                Please enter a valid email address
              </p>
            </div>
            
            <div>
              <FormLabel 
                for="responsive-success" 
                size="md" 
                fluidSize="auto" 
                success
              >
                Success State (Responsive)
              </FormLabel>
              <input
                id="responsive-success"
                type="email"
                class="mt-1 block w-full rounded-md border border-green-500 px-3 py-2 mobile:py-2.5 tablet:py-2 dark:border-green-500"
                placeholder="john@example.com"
                value="john@example.com"
              />
              <p class="mt-1 text-xs text-green-600 mobile:text-sm tablet:text-xs dark:text-green-400">
                Email address is valid
              </p>
            </div>
          </div>
        </div>

        <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
          <h4 class="mb-2 text-sm font-medium">Responsive Breakpoints Used:</h4>
          <ul class="space-y-1 text-sm text-gray-600 dark:text-gray-300">
            <li><code class="rounded bg-gray-200 px-1 dark:bg-gray-700">mobile:</code> 360px - Small phones and up</li>
            <li><code class="rounded bg-gray-200 px-1 dark:bg-gray-700">tablet:</code> 768px - Tablets and up</li>
            <li><code class="rounded bg-gray-200 px-1 dark:bg-gray-700">desktop:</code> 1280px - Desktop and up</li>
            <li><code class="rounded bg-gray-200 px-1 dark:bg-gray-700">touch:</code> Touch-capable devices</li>
          </ul>
        </div>
      </div>
    </div>
  );
});