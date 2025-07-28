import { component$, useSignal } from "@builder.io/qwik";
import { FormLabel } from "../index";

export default component$(() => {
  const fluidMode = useSignal<"static" | "auto" | "fluid">("static");

  return (
    <div class="space-y-8">
      <div class="rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-4 dark:from-purple-900/20 dark:to-pink-900/20">
        <h3 class="mb-3 text-lg font-semibold">Label Size Variants</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-300">
          Explore different label sizes with static, auto-responsive, and fluid typography options.
          Each size maintains proper hierarchy while adapting to different screen sizes.
        </p>
        
        <div class="flex flex-wrap gap-2">
          <button
            class={[
              "rounded px-3 py-1.5 text-xs font-medium transition-all duration-200 active:scale-95",
              fluidMode.value === "static"
                ? "bg-purple-100 text-purple-800 shadow-sm dark:bg-purple-800 dark:text-purple-100"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
            ].join(" ")}
            onClick$={() => fluidMode.value = "static"}
          >
            Static Sizing
          </button>
          <button
            class={[
              "rounded px-3 py-1.5 text-xs font-medium transition-all duration-200 active:scale-95",
              fluidMode.value === "auto"
                ? "bg-purple-100 text-purple-800 shadow-sm dark:bg-purple-800 dark:text-purple-100"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
            ].join(" ")}
            onClick$={() => fluidMode.value = "auto"}
          >
            Auto Responsive
          </button>
          <button
            class={[
              "rounded px-3 py-1.5 text-xs font-medium transition-all duration-200 active:scale-95",
              fluidMode.value === "fluid"
                ? "bg-purple-100 text-purple-800 shadow-sm dark:bg-purple-800 dark:text-purple-100"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
            ].join(" ")}
            onClick$={() => fluidMode.value = "fluid"}
          >
            Fluid Typography
          </button>
        </div>
      </div>

      <div class="space-y-8">
        <div>
          <h4 class="mb-4 text-base font-medium">Small Size Labels</h4>
          <div class="space-y-4">
            <div>
              <h5 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                {fluidMode.value === "static" && "Static Small (12px)"}
                {fluidMode.value === "auto" && "Auto Small (12px → 14px)"}
                {fluidMode.value === "fluid" && "Fluid Small (12px → 14px smooth)"}
              </h5>
              <FormLabel 
                for="field-sm" 
                size="sm" 
                fluidSize={fluidMode.value === "static" ? undefined : fluidMode.value as "auto" | "fluid"}
              >
                Small Label Text
              </FormLabel>
              <input
                id="field-sm"
                type="text"
                class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 mobile:py-2 tablet:py-1.5 dark:border-gray-600 dark:bg-gray-900"
                placeholder="Small input field"
              />
              <small class="mt-1 block text-xs text-gray-500 dark:text-gray-400">
                Compact label perfect for dense forms or secondary information
              </small>
            </div>

            <div class="grid gap-4 mobile:grid-cols-1 tablet:grid-cols-2">
              <div>
                <FormLabel 
                  for="compact-email" 
                  size="sm" 
                  fluidSize={fluidMode.value === "static" ? undefined : fluidMode.value as "auto" | "fluid"}
                  required
                >
                  Email
                </FormLabel>
                <input
                  id="compact-email"
                  type="email"
                  class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm dark:border-gray-600 dark:bg-gray-900"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <FormLabel 
                  for="compact-phone" 
                  size="sm" 
                  fluidSize={fluidMode.value === "static" ? undefined : fluidMode.value as "auto" | "fluid"}
                >
                  Phone
                </FormLabel>
                <input
                  id="compact-phone"
                  type="tel"
                  class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm dark:border-gray-600 dark:bg-gray-900"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="border-t pt-6">
          <h4 class="mb-4 text-base font-medium">Medium Size Labels (Default)</h4>
          <div class="space-y-4">
            <div>
              <h5 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                {fluidMode.value === "static" && "Static Medium (14px)"}
                {fluidMode.value === "auto" && "Auto Medium (14px → 16px)"}
                {fluidMode.value === "fluid" && "Fluid Medium (14px → 16px smooth)"}
              </h5>
              <FormLabel 
                for="field-md" 
                size="md" 
                fluidSize={fluidMode.value === "static" ? undefined : fluidMode.value as "auto" | "fluid"}
              >
                Medium Label Text
              </FormLabel>
              <input
                id="field-md"
                type="text"
                class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 mobile:py-2.5 tablet:py-2 dark:border-gray-600 dark:bg-gray-900"
                placeholder="Medium input field"
              />
              <small class="mt-1 block text-xs text-gray-500 mobile:text-sm tablet:text-xs dark:text-gray-400">
                Standard label size for most form controls and general use
              </small>
            </div>

            <div>
              <FormLabel 
                for="standard-bio" 
                size="md" 
                fluidSize={fluidMode.value === "static" ? undefined : fluidMode.value as "auto" | "fluid"}
              >
                Biography
              </FormLabel>
              <textarea
                id="standard-bio"
                rows={3}
                class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-900"
                placeholder="Tell us about yourself..."
              ></textarea>
            </div>
          </div>
        </div>

        <div class="border-t pt-6">
          <h4 class="mb-4 text-base font-medium">Large Size Labels</h4>
          <div class="space-y-4">
            <div>
              <h5 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                {fluidMode.value === "static" && "Static Large (16px)"}
                {fluidMode.value === "auto" && "Auto Large (16px → 20px)"}
                {fluidMode.value === "fluid" && "Fluid Large (16px → 18px smooth)"}
              </h5>
              <FormLabel 
                for="field-lg" 
                size="lg" 
                fluidSize={fluidMode.value === "static" ? undefined : fluidMode.value as "auto" | "fluid"}
              >
                Large Label Text
              </FormLabel>
              <input
                id="field-lg"
                type="text"
                class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2.5 text-base transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 mobile:py-3 tablet:py-2.5 desktop:text-lg dark:border-gray-600 dark:bg-gray-900"
                placeholder="Large input field"
              />
              <small class="mt-1 block text-sm text-gray-500 mobile:text-base tablet:text-sm dark:text-gray-400">
                Prominent label for important form sections or hero forms
              </small>
            </div>

            <div>
              <FormLabel 
                for="hero-search" 
                size="lg" 
                fluidSize={fluidMode.value === "static" ? undefined : fluidMode.value as "auto" | "fluid"}
                class="sr-only"
              >
                Search
              </FormLabel>
              <div class="relative">
                <input
                  id="hero-search"
                  type="search"
                  class="block w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 text-base placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 mobile:py-4 tablet:py-3 dark:border-gray-600 dark:bg-gray-900"
                  placeholder="Search for anything..."
                />
                <div class="absolute inset-y-0 left-0 flex items-center pl-4">
                  <span class="h-5 w-5 text-gray-400" aria-hidden="true">🔍</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t pt-6">
          <h4 class="mb-4 text-base font-medium">Size Comparison Overview</h4>
          <div class="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
            <div class="space-y-6">
              <div class="grid gap-6 mobile:grid-cols-1 tablet:grid-cols-3">
                <div class="text-center">
                  <div class="mb-2 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                    <FormLabel 
                      for="compare-sm" 
                      size="sm" 
                      fluidSize={fluidMode.value === "static" ? undefined : fluidMode.value as "auto" | "fluid"}
                    >
                      Small
                    </FormLabel>
                    <input
                      id="compare-sm"
                      type="text"
                      class="mt-1 block w-full rounded border border-gray-300 px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-900"
                      placeholder="Small"
                    />
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    Dense layouts, metadata
                  </div>
                </div>

                <div class="text-center">
                  <div class="mb-2 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                    <FormLabel 
                      for="compare-md" 
                      size="md" 
                      fluidSize={fluidMode.value === "static" ? undefined : fluidMode.value as "auto" | "fluid"}
                    >
                      Medium
                    </FormLabel>
                    <input
                      id="compare-md"
                      type="text"
                      class="mt-1 block w-full rounded border border-blue-300 px-3 py-2 dark:border-blue-600 dark:bg-gray-900"
                      placeholder="Medium"
                    />
                  </div>
                  <div class="text-xs text-blue-600 dark:text-blue-400">
                    Standard forms, default
                  </div>
                </div>

                <div class="text-center">
                  <div class="mb-2 rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
                    <FormLabel 
                      for="compare-lg" 
                      size="lg" 
                      fluidSize={fluidMode.value === "static" ? undefined : fluidMode.value as "auto" | "fluid"}
                    >
                      Large
                    </FormLabel>
                    <input
                      id="compare-lg"
                      type="text"
                      class="mt-1 block w-full rounded border border-purple-300 px-3 py-2.5 text-base dark:border-purple-600 dark:bg-gray-900"
                      placeholder="Large"
                    />
                  </div>
                  <div class="text-xs text-purple-600 dark:text-purple-400">
                    Hero sections, emphasis
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
          <h4 class="mb-3 text-sm font-medium">Size Configuration Reference</h4>
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <h5 class="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">Static Sizes</h5>
              <ul class="space-y-1 text-xs text-gray-700 dark:text-gray-300">
                <li><code>sm:</code> 12px fixed</li>
                <li><code>md:</code> 14px fixed</li>
                <li><code>lg:</code> 16px fixed</li>
              </ul>
            </div>
            <div>
              <h5 class="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">Auto Responsive</h5>
              <ul class="space-y-1 text-xs text-gray-700 dark:text-gray-300">
                <li><code>sm:</code> 12px → 14px</li>
                <li><code>md:</code> 14px → 16px</li>
                <li><code>lg:</code> 16px → 20px</li>
              </ul>
            </div>
            <div>
              <h5 class="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">Fluid Typography</h5>
              <ul class="space-y-1 text-xs text-gray-700 dark:text-gray-300">
                <li><code>sm:</code> clamp() scaling</li>
                <li><code>md:</code> clamp() scaling</li>
                <li><code>lg:</code> clamp() scaling</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
