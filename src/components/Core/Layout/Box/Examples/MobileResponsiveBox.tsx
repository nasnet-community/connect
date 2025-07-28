import { component$ } from "@builder.io/qwik";
import { Box } from "../index";

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="mb-4 text-lg font-semibold">Mobile-First Responsive Padding</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          This Box uses responsive padding that adapts from mobile to desktop
        </p>
        <Box
          padding={{
            base: "sm",      // Small padding on mobile
            md: "lg",        // Large padding on tablet
            lg: "xl"         // Extra large padding on desktop
          }}
          backgroundColor={{
            base: "primary",     // Primary on mobile
            md: "secondary",     // Secondary on tablet
            lg: "success"        // Success on desktop
          }}
          borderRadius={{
            base: "md",
            lg: "xl"
          }}
          class="text-white transition-all duration-300"
        >
          <p class="text-center">
            Responsive Box: Check padding and colors at different screen sizes
          </p>
        </Box>
      </div>

      <div>
        <h3 class="mb-4 text-lg font-semibold">Touch-Optimized Interactive Box</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Enhanced for mobile touch interactions with proper touch targets
        </p>
        <Box
          padding="md"
          backgroundColor="surface"
          borderRadius="lg"
          touchTarget="accessible"
          focusStyle="ring"
          touchOptimized={true}
          borderWidth="thin"
          borderColor="muted"
          class="cursor-pointer transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
          tabIndex={0}
          role="button"
        >
          <p class="text-center">
            Touch me! Optimized for mobile interactions
          </p>
          <p class="text-xs text-center text-gray-500 mt-1">
            44px minimum touch target with focus styles
          </p>
        </Box>
      </div>

      <div>
        <h3 class="mb-4 text-lg font-semibold">Safe Area Support for Mobile</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Automatically adjusts for mobile safe areas and notches
        </p>
        <Box
          padding={{
            base: { top: "safe-top", bottom: "safe-bottom", x: "md" },
            md: { all: "lg" }
          }}
          backgroundColor="surface-elevated"
          borderRadius="xl"
          mobileSafe={true}
          class="min-h-[120px] flex items-center justify-center"
        >
          <p class="text-center">
            Safe for mobile devices with notches and rounded corners
          </p>
        </Box>
      </div>

      <div>
        <h3 class="mb-4 text-lg font-semibold">Viewport-Based Sizing</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Uses modern viewport units for responsive design
        </p>
        <Box
          padding="lg"
          backgroundColor="info"
          borderRadius="lg"
          viewportHeight="dvh"
          fullWidth={true}
          class="text-white flex items-center justify-center max-h-[200px]"
        >
          <div class="text-center">
            <p class="font-semibold">Dynamic Viewport Height</p>
            <p class="text-sm opacity-90">
              Adapts to mobile browser UI changes
            </p>
          </div>
        </Box>
      </div>

      <div>
        <h3 class="mb-4 text-lg font-semibold">Enhanced Focus States</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Multiple focus styles for better accessibility
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Box
            padding="md"
            backgroundColor="surface"
            borderRadius="md"
            focusStyle="ring"
            touchTarget="md"
            tabIndex={0}
            class="text-center cursor-pointer"
          >
            Ring Focus
          </Box>
          <Box
            padding="md"
            backgroundColor="surface"
            borderRadius="md"
            focusStyle="outline"
            touchTarget="md"
            tabIndex={0}
            class="text-center cursor-pointer"
          >
            Outline Focus
          </Box>
          <Box
            padding="md"
            backgroundColor="surface"
            borderRadius="md"
            focusStyle="glow"
            touchTarget="md"
            tabIndex={0}
            class="text-center cursor-pointer"
          >
            Glow Focus
          </Box>
          <Box
            padding="md"
            backgroundColor="surface"
            borderRadius="md"
            focusStyle="default"
            touchTarget="md"
            tabIndex={0}
            class="text-center cursor-pointer"
          >
            Default Focus
          </Box>
        </div>
      </div>

      <div>
        <h3 class="mb-4 text-lg font-semibold">RTL Support with Logical Properties</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Supports right-to-left languages with logical spacing
        </p>
        <Box
          padding={{
            base: {
              inlineStart: "xl",
              inlineEnd: "sm",
              block: "md"
            }
          }}
          backgroundColor="warning"
          borderRadius="lg"
          supportRtl={true}
          class="text-black"
        >
          <p>
            This Box uses logical properties for RTL support.
            Inline-start has extra padding for directional content.
          </p>
        </Box>
      </div>

      <div>
        <h3 class="mb-4 text-lg font-semibold">Performance Optimized</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          With optimization enabled for better performance
        </p>
        <Box
          padding="lg"
          backgroundColor="surface-alt"
          borderRadius="xl"
          shadow="elevated"
          optimize={true}
          class="relative overflow-hidden"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"></div>
          <div class="relative">
            <p class="font-semibold">Optimized Box Component</p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Class generation is optimized for better performance in large applications
            </p>
          </div>
        </Box>
      </div>
    </div>
  );
});