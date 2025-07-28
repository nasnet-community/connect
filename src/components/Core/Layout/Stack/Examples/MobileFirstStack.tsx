import { component$ } from "@builder.io/qwik";
import Stack from "../Stack";

/**
 * Example showcasing mobile-first responsive Stack behaviors with
 * adaptive spacing, touch optimization, and safe area support
 */
export const MobileFirstStack = component$(() => {
  return (
    <div class="space-y-8 p-4">
      {/* Mobile Stacking Behavior */}
      <div>
        <h3 class="text-lg font-semibold mb-4">Mobile Stacking Behavior</h3>
        <Stack
          direction={{ base: "row", sm: "column", md: "row" }}
          spacing="adaptive"
          mobileBehavior="stack"
          touchTargetSpacing={true}
          class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
        >
          <div class="bg-blue-100 dark:bg-blue-900 p-3 rounded">Item 1</div>
          <div class="bg-green-100 dark:bg-green-900 p-3 rounded">Item 2</div>
          <div class="bg-purple-100 dark:bg-purple-900 p-3 rounded">Item 3</div>
        </Stack>
      </div>

      {/* Mobile Scroll Behavior */}
      <div>
        <h3 class="text-lg font-semibold mb-4">Mobile Horizontal Scroll</h3>
        <Stack
          direction="row"
          spacing="touch"
          mobileBehavior="scroll"
          scrollSnap={true}
          touchMode="scrollable"
          class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
        >
          <div class="bg-red-100 dark:bg-red-900 p-3 rounded min-w-[120px]">Card 1</div>
          <div class="bg-yellow-100 dark:bg-yellow-900 p-3 rounded min-w-[120px]">Card 2</div>
          <div class="bg-pink-100 dark:bg-pink-900 p-3 rounded min-w-[120px]">Card 3</div>
          <div class="bg-indigo-100 dark:bg-indigo-900 p-3 rounded min-w-[120px]">Card 4</div>
          <div class="bg-teal-100 dark:bg-teal-900 p-3 rounded min-w-[120px]">Card 5</div>
        </Stack>
      </div>

      {/* Safe Area Support */}
      <div>
        <h3 class="text-lg font-semibold mb-4">Safe Area Support</h3>
        <Stack
          direction="column"
          spacing="md"
          mobileSafe={true}
          safeAreaInsets={["top", "bottom"]}
          class="bg-gradient-to-b from-blue-500 to-purple-600 text-white p-4 rounded-lg"
        >
          <div class="bg-white/20 p-3 rounded">Top Content (Safe Area)</div>
          <div class="bg-white/20 p-3 rounded">Middle Content</div>
          <div class="bg-white/20 p-3 rounded">Bottom Content (Safe Area)</div>
        </Stack>
      </div>

      {/* Touch-Friendly Spacing */}
      <div>
        <h3 class="text-lg font-semibold mb-4">Touch-Friendly Spacing</h3>
        <Stack
          direction="column"
          spacing="touch-lg"
          touchTargetSpacing={true}
          focusManagement={true}
          class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
        >
          <button class="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition-colors">
            Touch Button 1
          </button>
          <button class="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition-colors">
            Touch Button 2
          </button>
          <button class="bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-lg transition-colors">
            Touch Button 3
          </button>
        </Stack>
      </div>

      {/* Responsive Spacing */}
      <div>
        <h3 class="text-lg font-semibold mb-4">Responsive Spacing</h3>
        <Stack
          direction="column"
          spacing={{ base: "touch-sm", sm: "md", md: "lg", lg: "xl" }}
          mobileSpacing="safe"
          class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
        >
          <div class="bg-orange-100 dark:bg-orange-900 p-3 rounded">
            Spacing adapts to screen size
          </div>
          <div class="bg-cyan-100 dark:bg-cyan-900 p-3 rounded">
            Mobile: safe spacing
          </div>
          <div class="bg-lime-100 dark:bg-lime-900 p-3 rounded">
            Desktop: larger spacing
          </div>
        </Stack>
      </div>

      {/* Mobile Wrap Behavior */}
      <div>
        <h3 class="text-lg font-semibold mb-4">Mobile Wrap Behavior</h3>
        <Stack
          direction="row"
          spacing="sm"
          mobileBehavior="wrap"
          wrap={{ base: "nowrap", sm: "wrap" }}
          class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
        >
          <div class="bg-rose-100 dark:bg-rose-900 p-3 rounded flex-1 min-w-[100px]">Item A</div>
          <div class="bg-amber-100 dark:bg-amber-900 p-3 rounded flex-1 min-w-[100px]">Item B</div>
          <div class="bg-emerald-100 dark:bg-emerald-900 p-3 rounded flex-1 min-w-[100px]">Item C</div>
          <div class="bg-violet-100 dark:bg-violet-900 p-3 rounded flex-1 min-w-[100px]">Item D</div>
        </Stack>
      </div>
    </div>
  );
});