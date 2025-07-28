import { component$, useSignal, $ } from "@builder.io/qwik";
import { TimePicker, type TimeValue } from "../Timepicker";

/**
 * Responsive Example - Demonstrates TimePicker adaptability across devices
 * Shows different sizes for mobile, tablet, and desktop breakpoints
 */
export const ResponsiveExample = component$(() => {
  const mobileTime = useSignal<TimeValue>({ hour: "09", minute: "00" });
  const tabletTime = useSignal<TimeValue>({ hour: "14", minute: "30", period: "PM" });
  const desktopTime = useSignal<TimeValue>({ hour: "18", minute: "45", second: "30" });
  const adaptiveTime = useSignal<TimeValue>({ hour: "12", minute: "15" });

  const handleMobileChange$ = $((field: keyof TimeValue, value: string) => {
    mobileTime.value = { ...mobileTime.value, [field]: value };
  });

  const handleTabletChange$ = $((field: keyof TimeValue, value: string) => {
    tabletTime.value = { ...tabletTime.value, [field]: value };
  });

  const handleDesktopChange$ = $((field: keyof TimeValue, value: string) => {
    desktopTime.value = { ...desktopTime.value, [field]: value };
  });

  const handleAdaptiveChange$ = $((field: keyof TimeValue, value: string) => {
    adaptiveTime.value = { ...adaptiveTime.value, [field]: value };
  });

  const clearAdaptiveTime$ = $(() => {
    adaptiveTime.value = { hour: "00", minute: "00" };
  });

  return (
    <div class="space-y-8 p-6 bg-white dark:bg-gray-800 rounded-lg">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          Responsive TimePicker Examples
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          These examples demonstrate how the TimePicker component adapts to different screen sizes 
          and touch interactions across mobile, tablet, and desktop devices.
        </p>
      </div>

      {/* Mobile-Optimized TimePicker */}
      <div class="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50">
        <div class="flex items-center gap-2">
          <span class="text-2xl">📱</span>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Mobile-First Design
          </h3>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Small size with touch-friendly interactions for mobile devices
        </p>
        
        <div class="max-w-md">
          <TimePicker
            time={mobileTime.value}
            onChange$={handleMobileChange$}
            size="sm"
            label="Appointment Time"
            format="24"
            class="w-full"
          />
        </div>
        
        <div class="text-sm text-gray-500 dark:text-gray-400">
          Selected: {mobileTime.value.hour}:{mobileTime.value.minute}
        </div>
      </div>

      {/* Tablet-Optimized TimePicker */}
      <div class="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-blue-50 dark:bg-blue-900/20">
        <div class="flex items-center gap-2">
          <span class="text-2xl">📱</span>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Tablet Experience
          </h3>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Medium size perfect for tablet interfaces with 12-hour format
        </p>
        
        <div class="max-w-lg">
          <TimePicker
            time={tabletTime.value}
            onChange$={handleTabletChange$}
            size="md"
            label="Meeting Time"
            format="12"
            variant="outline"
            class="w-full"
          />
        </div>
        
        <div class="text-sm text-gray-500 dark:text-gray-400">
          Selected: {tabletTime.value.hour}:{tabletTime.value.minute} {tabletTime.value.period}
        </div>
      </div>

      {/* Desktop-Optimized TimePicker */}
      <div class="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-green-50 dark:bg-green-900/20">
        <div class="flex items-center gap-2">
          <span class="text-2xl">🖥️</span>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Desktop Interface
          </h3>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Large size with full features including seconds for desktop applications
        </p>
        
        <div class="max-w-xl">
          <TimePicker
            time={desktopTime.value}
            onChange$={handleDesktopChange$}
            size="lg"
            label="Server Backup Time"
            format="24"
            variant="filled"
            showSeconds={true}
            class="w-full"
          />
        </div>
        
        <div class="text-sm text-gray-500 dark:text-gray-400">
          Selected: {desktopTime.value.hour}:{desktopTime.value.minute}:{desktopTime.value.second || "00"}
        </div>
      </div>

      {/* Adaptive Layout using Tailwind Responsive Classes */}
      <div class="space-y-4 p-4 border-2 border-primary-200 dark:border-primary-800 rounded-lg bg-primary-50 dark:bg-primary-900/20">
        <div class="flex items-center gap-2">
          <span class="text-2xl">🔄</span>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Fully Adaptive Layout
          </h3>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Responsive size and layout that adapts based on screen width using Tailwind breakpoints
        </p>
        
        {/* Container with responsive padding and width */}
        <div class="
          w-full 
          sm:max-w-sm 
          md:max-w-md 
          lg:max-w-lg 
          xl:max-w-xl
          mx-auto
          px-2
          sm:px-4
          md:px-6
        ">
          <TimePicker
            time={adaptiveTime.value}
            onChange$={handleAdaptiveChange$}
            // Use a single size but let container handle responsiveness
            size="md"
            label="Adaptive Time Selector"
            format="24"
            variant="default"
            showClearButton={true}
            onClear$={clearAdaptiveTime$}
            class="w-full"
          />
        </div>
        
        <div class="text-center text-sm text-gray-500 dark:text-gray-400">
          Selected: {adaptiveTime.value.hour}:{adaptiveTime.value.minute}
        </div>
      </div>

      {/* Multi-Screen Layout Grid */}
      <div class="space-y-4">
        <div class="flex items-center gap-2">
          <span class="text-2xl">📐</span>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Multi-Screen Layout Demo
          </h3>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Grid layout that stacks on mobile and spreads on larger screens
        </p>
        
        {/* Responsive grid layout */}
        <div class="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          xl:grid-cols-3 
          gap-4 
          md:gap-6
        ">
          {/* Card 1 - Always visible */}
          <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 class="mb-3 font-medium text-gray-900 dark:text-white">Start Time</h4>
            <TimePicker
              time={{ hour: "09", minute: "00" }}
              onChange$={$(() => {})}
              size="sm"
              format="12"
              class="w-full"
            />
          </div>
          
          {/* Card 2 - Hidden on mobile, visible on md+ */}
          <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 class="mb-3 font-medium text-gray-900 dark:text-white">Break Time</h4>
            <TimePicker
              time={{ hour: "12", minute: "30", period: "PM" }}
              onChange$={$(() => {})}
              size="sm"
              format="12"
              class="w-full"
            />
          </div>
          
          {/* Card 3 - Hidden on mobile/tablet, visible on xl+ */}
          <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 class="mb-3 font-medium text-gray-900 dark:text-white">End Time</h4>
            <TimePicker
              time={{ hour: "17", minute: "00" }}
              onChange$={$(() => {})}
              size="sm"
              format="24"
              class="w-full"
            />
          </div>
        </div>
      </div>

      {/* Touch-Friendly Features */}
      <div class="space-y-4 p-4 border border-orange-200 dark:border-orange-800 rounded-lg bg-orange-50 dark:bg-orange-900/20">
        <div class="flex items-center gap-2">
          <span class="text-2xl">👆</span>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Touch-Friendly Features
          </h3>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Enhanced for touch interactions with larger tap targets and gesture support
        </p>
        
        <div class="max-w-md">
          <TimePicker
            time={{ hour: "15", minute: "30" }}
            onChange$={$(() => {})}
            size="lg"
            label="Touch-Optimized Timer"
            format="24"
            variant="filled"
            minuteStep={15}
            class="w-full"
          />
        </div>
        
        <div class="text-xs text-orange-600 dark:text-orange-400 space-y-1">
          <p>✓ Large touch targets (lg size)</p>
          <p>✓ 15-minute intervals for easier selection</p>
          <p>✓ Filled variant for better visual feedback</p>
          <p>✓ Keyboard navigation support</p>
        </div>
      </div>

      {/* Responsive Behavior Summary */}
      <div class="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 class="font-medium text-blue-900 dark:text-blue-100 mb-2">
          📋 Responsive Design Guidelines
        </h4>
        <div class="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <p><strong>Mobile (sm):</strong> Use size="sm", stack vertically, touch-friendly spacing</p>
          <p><strong>Tablet (md):</strong> Use size="md", allow horizontal layouts, balanced feature set</p>
          <p><strong>Desktop (lg+):</strong> Use size="lg", full features, multi-column layouts</p>
          <p><strong>Container:</strong> Use responsive max-widths and padding for optimal viewing</p>
          <p><strong>Interaction:</strong> Consider touch vs. mouse input patterns</p>
        </div>
      </div>
    </div>
  );
});

export default ResponsiveExample;