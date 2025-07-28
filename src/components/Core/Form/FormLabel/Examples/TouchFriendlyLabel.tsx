import { component$, useSignal } from "@builder.io/qwik";
import { FormLabel } from "../index";

export default component$(() => {
  const deviceType = useSignal<"mobile" | "tablet" | "desktop">("mobile");
  const isTouch = useSignal(true);

  return (
    <div class="space-y-8">
      <div class="rounded-lg bg-gradient-to-r from-green-50 to-blue-50 p-4 dark:from-green-900/20 dark:to-blue-900/20">
        <h3 class="mb-3 text-lg font-semibold">Touch-Optimized Mobile Interactions</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-300">
          Demonstrates FormLabel optimizations for touch devices including larger tap targets,
          improved spacing, and mobile-first interaction patterns.
        </p>
        
        <div class="flex flex-wrap gap-2">
          <button
            class={[
              "rounded px-3 py-2 text-xs font-medium transition-all duration-200 active:scale-95",
              deviceType.value === "mobile"
                ? "bg-green-100 text-green-800 shadow-green dark:bg-green-800 dark:text-green-100"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
            ].join(" ")}
            onClick$={() => {
              deviceType.value = "mobile";
              isTouch.value = true;
            }}
          >
            📱 Mobile View
          </button>
          <button
            class={[
              "rounded px-3 py-2 text-xs font-medium transition-all duration-200 active:scale-95",
              deviceType.value === "tablet"
                ? "bg-green-100 text-green-800 shadow-green dark:bg-green-800 dark:text-green-100"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
            ].join(" ")}
            onClick$={() => {
              deviceType.value = "tablet";
              isTouch.value = true;
            }}
          >
            📱 Tablet View
          </button>
          <button
            class={[
              "rounded px-3 py-2 text-xs font-medium transition-all duration-200 active:scale-95",
              deviceType.value === "desktop"
                ? "bg-green-100 text-green-800 shadow-green dark:bg-green-800 dark:text-green-100"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
            ].join(" ")}
            onClick$={() => {
              deviceType.value = "desktop";
              isTouch.value = false;
            }}
          >
            💻 Desktop View
          </button>
        </div>
      </div>

      <div class="space-y-8">
        <div>
          <h4 class="mb-4 text-base font-medium">Touch-Optimized Labels</h4>
          <p class="mb-4 text-sm text-gray-600 dark:text-gray-300">
            Labels with enhanced touch targets and mobile-friendly spacing
          </p>
          
          <div class="space-y-4">
            <div>
              <FormLabel 
                for="touch-basic" 
                size="md" 
                touchOptimized={true}
                fluidSize="auto"
              >
                Touch-Optimized Label
              </FormLabel>
              <input
                id="touch-basic"
                type="text"
                class="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-base touch:py-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-800"
                placeholder="Larger touch target"
              />
              <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Minimum 44px touch target height for accessibility
              </p>
            </div>

            <div class="grid gap-4 mobile:grid-cols-1 tablet:grid-cols-2">
              <div>
                <FormLabel 
                  for="touch-email" 
                  size="md" 
                  touchOptimized={true}
                  required
                >
                  Email Address
                </FormLabel>
                <input
                  id="touch-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  class="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-base touch:py-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <FormLabel 
                  for="touch-phone" 
                  size="md" 
                  touchOptimized={true}
                >
                  Phone Number
                </FormLabel>
                <input
                  id="touch-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  class="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-base touch:py-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="border-t pt-6">
          <h4 class="mb-4 text-base font-medium">Mobile Form Patterns</h4>
          <p class="mb-4 text-sm text-gray-600 dark:text-gray-300">
            Common mobile form layouts with touch-optimized labels
          </p>
          
          <div class="rounded-lg border-2 border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
            <div class="mb-4">
              <h5 class="text-lg font-semibold">Quick Registration</h5>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Mobile-optimized form with touch-friendly controls
              </p>
            </div>

            <div class="space-y-4">
              <div>
                <FormLabel 
                  for="mobile-name" 
                  size="md" 
                  touchOptimized={true}
                  required
                >
                  Full Name
                </FormLabel>
                <input
                  id="mobile-name"
                  type="text"
                  autoComplete="name"
                  class="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-4 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <FormLabel 
                  for="mobile-email-reg" 
                  size="md" 
                  touchOptimized={true}
                  required
                >
                  Email Address
                </FormLabel>
                <input
                  id="mobile-email-reg"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  class="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-4 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <FormLabel 
                  for="mobile-password" 
                  size="md" 
                  touchOptimized={true}
                  required
                >
                  Password
                </FormLabel>
                <input
                  id="mobile-password"
                  type="password"
                  autoComplete="new-password"
                  class="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-4 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600"
                  placeholder="Create a secure password"
                />
                <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Must be at least 8 characters with numbers and symbols
                </div>
              </div>

              <button
                type="submit"
                class="mt-6 flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-4 text-base font-medium text-white transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.98] dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>

        <div class="border-t pt-6">
          <h4 class="mb-4 text-base font-medium">Touch Gestures & Interactions</h4>
          <p class="mb-4 text-sm text-gray-600 dark:text-gray-300">
            Demonstrates touch-specific interactions and feedback
          </p>
          
          <div class="space-y-4">
            <div class="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <FormLabel 
                for="gesture-input" 
                size="md" 
                touchOptimized={true}
                class="cursor-pointer"
              >
                Tap to Focus Input
              </FormLabel>
              <input
                id="gesture-input"
                type="text"
                class="mt-2 block w-full rounded-lg border border-blue-300 px-4 py-4 text-base transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 active:scale-[0.99] dark:border-blue-600"
                placeholder="Large tap target with visual feedback"
              />
              <div class="mt-2 text-sm text-blue-600 dark:text-blue-400">
                ✨ Try tapping the label to focus the input
              </div>
            </div>

            <div class="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
              <FormLabel 
                for="tactile-input" 
                size="md" 
                touchOptimized={true}
              >
                Tactile Feedback Input
              </FormLabel>
              <input
                id="tactile-input"
                type="text"
                class="mt-2 block w-full rounded-lg border border-green-300 px-4 py-4 text-base transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:ring-offset-2 focus:shadow-lg active:scale-[0.99] dark:border-green-600"
                placeholder="Enhanced with press animations"
              />
              <div class="mt-2 text-sm text-green-600 dark:text-green-400">
                🎯 Notice the subtle scale animation on tap
              </div>
            </div>
          </div>
        </div>

        <div class="border-t pt-6">
          <h4 class="mb-4 text-base font-medium">Safe Area & Mobile Layout</h4>
          <p class="mb-4 text-sm text-gray-600 dark:text-gray-300">
            Responsive to mobile device safe areas and notches
          </p>
          
          <div class="rounded-lg border border-gray-300 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-800">
            <div class="mb-3 text-sm font-medium">Mobile Device Simulation</div>
            <div 
              class="mx-auto max-w-sm rounded-[2rem] border-4 border-gray-800 bg-black p-2 dark:border-gray-200"
              style="min-height: 400px;"
            >
              <div class="h-full rounded-[1.5rem] bg-white p-4 pt-safe-top pb-safe-bottom dark:bg-gray-900">
                <div class="space-y-4">
                  <div class="text-center">
                    <h6 class="text-sm font-medium">Mobile Form</h6>
                  </div>
                  
                  <div>
                    <FormLabel 
                      for="safe-name" 
                      size="sm" 
                      touchOptimized={true}
                      fluidSize="fluid"
                    >
                      Name
                    </FormLabel>
                    <input
                      id="safe-name"
                      type="text"
                      class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-3 text-sm dark:border-gray-600"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <FormLabel 
                      for="safe-email" 
                      size="sm" 
                      touchOptimized={true}
                      fluidSize="fluid"
                    >
                      Email
                    </FormLabel>
                    <input
                      id="safe-email"
                      type="email"
                      class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-3 text-sm dark:border-gray-600"
                      placeholder="email@example.com"
                    />
                  </div>
                  
                  <button
                    type="button"
                    class="w-full rounded-lg bg-blue-600 py-3 text-sm font-medium text-white active:scale-95"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <div class="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
              Form respects device safe areas (top notch, bottom home indicator)
            </div>
          </div>
        </div>

        <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
          <h4 class="mb-3 text-sm font-medium">Touch Optimization Features</h4>
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <h5 class="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">Touch Targets</h5>
              <ul class="space-y-1 text-xs text-gray-700 dark:text-gray-300">
                <li>✓ Minimum 44px tap targets</li>
                <li>✓ Enhanced padding for touch</li>
                <li>✓ Visual press feedback</li>
                <li>✓ Safe area respecting</li>
              </ul>
            </div>
            <div>
              <h5 class="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">Mobile UX</h5>
              <ul class="space-y-1 text-xs text-gray-700 dark:text-gray-300">
                <li>✓ Appropriate input types</li>
                <li>✓ Auto-complete attributes</li>
                <li>✓ Input mode optimization</li>
                <li>✓ Smooth animations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});