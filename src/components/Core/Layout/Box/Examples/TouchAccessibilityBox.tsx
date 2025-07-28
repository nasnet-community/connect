import { component$ } from "@builder.io/qwik";
import { Box } from "../index";

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="mb-4 text-lg font-semibold">Touch Target Sizes</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Different touch target sizes optimized for mobile accessibility
        </p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Box
            padding="sm"
            backgroundColor="surface"
            borderRadius="md"
            touchTarget="sm"
            borderWidth="thin"
            borderColor="muted"
            class="text-center cursor-pointer flex items-center justify-center"
            tabIndex={0}
          >
            <div>
              <p class="text-xs font-semibold">Small</p>
              <p class="text-xs text-gray-500">32px</p>
            </div>
          </Box>
          
          <Box
            padding="md"
            backgroundColor="surface"
            borderRadius="md"
            touchTarget="md"
            borderWidth="thin"
            borderColor="primary"
            class="text-center cursor-pointer flex items-center justify-center"
            tabIndex={0}
          >
            <div>
              <p class="text-xs font-semibold">Medium</p>
              <p class="text-xs text-gray-500">44px</p>
            </div>
          </Box>
          
          <Box
            padding="lg"
            backgroundColor="surface"
            borderRadius="md"
            touchTarget="lg"
            borderWidth="thin"
            borderColor="success"
            class="text-center cursor-pointer flex items-center justify-center"
            tabIndex={0}
          >
            <div>
              <p class="text-xs font-semibold">Large</p>
              <p class="text-xs text-gray-500">48px</p>
            </div>
          </Box>
          
          <Box
            padding="lg"
            backgroundColor="surface"
            borderRadius="md"
            touchTarget="accessible"
            borderWidth="thin"
            borderColor="info"
            class="text-center cursor-pointer flex items-center justify-center"
            tabIndex={0}
          >
            <div>
              <p class="text-xs font-semibold">Accessible</p>
              <p class="text-xs text-gray-500">44px+</p>
            </div>
          </Box>
        </div>
      </div>

      <div>
        <h3 class="mb-4 text-lg font-semibold">Mobile-Safe Layout</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Respects mobile safe areas and provides touch manipulation
        </p>
        <Box
          padding={{
            base: {
              top: "safe-top",
              bottom: "safe-bottom",
              x: "lg"
            }
          }}
          backgroundColor="primary"
          borderRadius="xl"
          mobileSafe={true}
          touchOptimized={true}
          class="text-white min-h-[100px] flex items-center justify-center relative"
        >
          <div class="text-center">
            <p class="font-semibold">Mobile-Safe Container</p>
            <p class="text-sm opacity-90 mt-1">
              Automatically handles safe areas and touch optimization
            </p>
          </div>
          <div class="absolute top-2 right-2 text-xs opacity-75">
            Safe Areas Respected
          </div>
        </Box>
      </div>

      <div>
        <h3 class="mb-4 text-lg font-semibold">Interactive Touch Feedback</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Enhanced touch feedback with proper cursor behavior
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Box
            padding="lg"
            backgroundColor="secondary"
            borderRadius="lg"
            touchTarget="accessible"
            touchOptimized={true}
            focusStyle="ring"
            class="text-white text-center cursor-pointer transition-all duration-200 hover:bg-secondary-600 active:scale-[0.95] select-none"
            tabIndex={0}
            role="button"
            aria-label="Interactive button with touch feedback"
          >
            <p class="font-semibold">Touch & Hold</p>
            <p class="text-sm opacity-90">Optimized feedback</p>
          </Box>
          
          <Box
            padding="lg"
            backgroundColor="success"
            borderRadius="lg"
            touchTarget="accessible"
            touchOptimized={true}
            focusStyle="glow"
            class="text-white text-center cursor-pointer transition-all duration-200 hover:bg-success-600 active:scale-[0.95] select-none"
            tabIndex={0}
            role="button"
            aria-label="Interactive card with glow focus"
          >
            <p class="font-semibold">Tap Me</p>
            <p class="text-sm opacity-90">Glow focus style</p>
          </Box>
        </div>
      </div>

      <div>
        <h3 class="mb-4 text-lg font-semibold">Accessibility Focus Indicators</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Clear focus indicators for keyboard and screen reader users
        </p>
        <div class="space-y-4">
          <Box
            padding="md"
            backgroundColor="surface"
            borderRadius="md"
            focusStyle="ring"
            touchTarget="md"
            class="cursor-pointer"
            tabIndex={0}
            role="button"
            aria-label="Button with ring focus indicator"
          >
            <div class="flex items-center space-x-3">
              <div class="w-4 h-4 bg-primary rounded-full"></div>
              <span>Ring Focus Indicator (Tab to see)</span>
            </div>
          </Box>
          
          <Box
            padding="md"
            backgroundColor="surface"
            borderRadius="md"
            focusStyle="outline"
            touchTarget="md"
            class="cursor-pointer"
            tabIndex={0}
            role="button"
            aria-label="Button with outline focus indicator"
          >
            <div class="flex items-center space-x-3">
              <div class="w-4 h-4 bg-secondary rounded-full"></div>
              <span>Outline Focus Indicator</span>
            </div>
          </Box>
          
          <Box
            padding="md"
            backgroundColor="surface"
            borderRadius="md"
            focusStyle="glow"
            touchTarget="md"
            class="cursor-pointer"
            tabIndex={0}
            role="button"
            aria-label="Button with glow focus indicator"
          >
            <div class="flex items-center space-x-3">
              <div class="w-4 h-4 bg-info rounded-full"></div>
              <span>Glow Focus Indicator</span>
            </div>
          </Box>
        </div>
      </div>

      <div>
        <h3 class="mb-4 text-lg font-semibold">Responsive Touch Targets</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Touch targets that adapt based on device capabilities
        </p>
        <Box
          padding={{
            base: "sm",
            md: "md",
            lg: "lg"
          }}
          backgroundColor="warning"
          borderRadius="lg"
          touchTarget="accessible"
          touchOptimized={true}
          class="text-black cursor-pointer transition-all duration-200 hover:bg-warning-400 active:bg-warning-600"
          tabIndex={0}
          role="button"
          aria-label="Responsive touch target that adapts to screen size"
        >
          <div class="text-center">
            <p class="font-semibold">Adaptive Touch Target</p>
            <p class="text-sm opacity-75">
              Automatically adjusts size for mobile vs desktop
            </p>
          </div>
        </Box>
      </div>

      <div>
        <h3 class="mb-4 text-lg font-semibold">ARIA-Enhanced Interactive Elements</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Proper ARIA attributes for screen readers and assistive technology
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Box
            padding="lg"
            backgroundColor="surface"
            borderRadius="lg"
            borderWidth="thin"
            borderColor="primary"
            touchTarget="accessible"
            focusStyle="ring"
            class="cursor-pointer"
            tabIndex={0}
            role="article"
            aria-label="Important announcement card"
            aria-describedby="announcement-desc"
          >
            <div>
              <h4 class="font-semibold text-primary">Announcement</h4>
              <p id="announcement-desc" class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                This card uses proper ARIA labels and roles for accessibility
              </p>
            </div>
          </Box>
          
          <Box
            padding="lg"
            backgroundColor="surface"
            borderRadius="lg"
            borderWidth="thin"
            borderColor="success"
            touchTarget="accessible"
            focusStyle="glow"
            class="cursor-pointer"
            tabIndex={0}
            role="region"
            aria-labelledby="status-title"
            aria-live="polite"
          >
            <div>
              <h4 id="status-title" class="font-semibold text-success">Status Update</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Live region that announces changes to screen readers
              </p>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
});