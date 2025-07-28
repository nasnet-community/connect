import { component$, useSignal } from "@builder.io/qwik";
import { Radio } from "../Radio";

export const MobileOptimizedExample = component$(() => {
  const mobileChoice = useSignal("option1");

  return (
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        Mobile-Optimized Layout
      </h3>
      
      <div class="space-y-4 md:space-y-3">
        <Radio
          name="mobile-optimized"
          value="option1"
          label="Easy to tap on mobile devices"
          size="lg"
          checked={mobileChoice.value === "option1"}
          onChange$={(value) => (mobileChoice.value = value)}
          class="py-2 md:py-0"
        />
        <Radio
          name="mobile-optimized"
          value="option2"
          label="Larger touch targets for accessibility"
          size="lg"
          checked={mobileChoice.value === "option2"}
          onChange$={(value) => (mobileChoice.value = value)}
          class="py-2 md:py-0"
        />
        <Radio
          name="mobile-optimized"
          value="option3"
          label="Improved spacing between options"
          size="lg"
          checked={mobileChoice.value === "option3"}
          onChange$={(value) => (mobileChoice.value = value)}
          class="py-2 md:py-0"
        />
      </div>

      <div class="mt-4 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Selected: <span class="font-medium">{mobileChoice.value}</span>
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          This layout uses larger touch targets and spacing on mobile
        </p>
      </div>
    </div>
  );
});

export const ResponsiveLayoutExample = component$(() => {
  const layoutChoice = useSignal("grid");

  return (
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        Responsive Layout Direction
      </h3>
      
      <fieldset>
        <legend class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Choose Layout Style
        </legend>
        
        {/* Vertical on mobile, horizontal on larger screens */}
        <div class="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-6">
          <Radio
            name="layout"
            value="grid"
            label="Grid Layout"
            checked={layoutChoice.value === "grid"}
            onChange$={(value) => (layoutChoice.value = value)}
          />
          <Radio
            name="layout"
            value="list"
            label="List Layout"
            checked={layoutChoice.value === "list"}
            onChange$={(value) => (layoutChoice.value = value)}
          />
          <Radio
            name="layout"
            value="card"
            label="Card Layout"
            checked={layoutChoice.value === "card"}
            onChange$={(value) => (layoutChoice.value = value)}
          />
        </div>
      </fieldset>

      <div class="mt-4 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Selected Layout: <span class="font-medium">{layoutChoice.value}</span>
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Layout changes from vertical on mobile to horizontal on larger screens
        </p>
      </div>
    </div>
  );
});

export const AdaptiveSizeExample = component$(() => {
  const deviceType = useSignal("mobile");

  return (
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        Adaptive Size Based on Screen
      </h3>
      
      <fieldset class="space-y-3">
        <legend class="text-sm font-medium text-gray-700 dark:text-gray-300">
          Optimize for Device Type
        </legend>
        
        <Radio
          name="device"
          value="mobile"
          label="Mobile Device"
          size="lg"
          checked={deviceType.value === "mobile"}
          onChange$={(value) => (deviceType.value = value)}
          class="sm:hidden"
        />
        <Radio
          name="device"
          value="mobile"
          label="Mobile Device"
          size="md"
          checked={deviceType.value === "mobile"}
          onChange$={(value) => (deviceType.value = value)}
          class="hidden sm:block lg:hidden"
        />
        <Radio
          name="device"
          value="mobile"
          label="Mobile Device"
          size="sm"
          checked={deviceType.value === "mobile"}
          onChange$={(value) => (deviceType.value = value)}
          class="hidden lg:block"
        />
        
        <Radio
          name="device"
          value="tablet"
          label="Tablet Device"
          size="lg"
          checked={deviceType.value === "tablet"}
          onChange$={(value) => (deviceType.value = value)}
          class="sm:hidden"
        />
        <Radio
          name="device"
          value="tablet"
          label="Tablet Device"
          size="md"
          checked={deviceType.value === "tablet"}
          onChange$={(value) => (deviceType.value = value)}
          class="hidden sm:block lg:hidden"
        />
        <Radio
          name="device"
          value="tablet"
          label="Tablet Device"
          size="sm"
          checked={deviceType.value === "tablet"}
          onChange$={(value) => (deviceType.value = value)}
          class="hidden lg:block"
        />
        
        <Radio
          name="device"
          value="desktop"
          label="Desktop Computer"
          size="lg"
          checked={deviceType.value === "desktop"}
          onChange$={(value) => (deviceType.value = value)}
          class="sm:hidden"
        />
        <Radio
          name="device"
          value="desktop"
          label="Desktop Computer"
          size="md"
          checked={deviceType.value === "desktop"}
          onChange$={(value) => (deviceType.value = value)}
          class="hidden sm:block lg:hidden"
        />
        <Radio
          name="device"
          value="desktop"
          label="Desktop Computer"
          size="sm"
          checked={deviceType.value === "desktop"}
          onChange$={(value) => (deviceType.value = value)}
          class="hidden lg:block"
        />
      </fieldset>

      <div class="mt-4 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Selected Device: <span class="font-medium">{deviceType.value}</span>
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Radio size adapts: Large on mobile, Medium on tablet, Small on desktop
        </p>
      </div>
    </div>
  );
});

export const CompactMobileExample = component$(() => {
  const quickAction = useSignal("save");

  return (
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        Compact Mobile Layout
      </h3>
      
      <fieldset>
        <legend class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Quick Actions
        </legend>
        
        {/* Compact grid layout on mobile */}
        <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <div class="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700">
            <Radio
              name="quick-action"
              value="save"
              label="Save"
              size="md"
              checked={quickAction.value === "save"}
              onChange$={(value) => (quickAction.value = value)}
            />
          </div>
          
          <div class="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700">
            <Radio
              name="quick-action"
              value="share"
              label="Share"
              size="md"
              checked={quickAction.value === "share"}
              onChange$={(value) => (quickAction.value = value)}
            />
          </div>
          
          <div class="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700">
            <Radio
              name="quick-action"
              value="export"
              label="Export"
              size="md"
              checked={quickAction.value === "export"}
              onChange$={(value) => (quickAction.value = value)}
            />
          </div>
          
          <div class="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700">
            <Radio
              name="quick-action"
              value="print"
              label="Print"
              size="md"
              checked={quickAction.value === "print"}
              onChange$={(value) => (quickAction.value = value)}
            />
          </div>
        </div>
      </fieldset>

      <div class="mt-4 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Selected Action: <span class="font-medium">{quickAction.value}</span>
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Responsive grid: 1 column on mobile, 2 on tablet, 4 on desktop
        </p>
      </div>
    </div>
  );
});

export const BreakpointExample = component$(() => {
  const viewMode = useSignal("comfortable");

  return (
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        Breakpoint-Based Styling
      </h3>
      
      <fieldset class="space-y-2">
        <legend class="text-sm font-medium text-gray-700 dark:text-gray-300">
          View Density
        </legend>
        
        <Radio
          name="view-mode"
          value="compact"
          label="Compact View"
          size="sm"
          checked={viewMode.value === "compact"}
          onChange$={(value) => (viewMode.value = value)}
          class="md:text-base lg:text-lg"
        />
        
        <Radio
          name="view-mode"
          value="comfortable"
          label="Comfortable View"
          size="md"
          checked={viewMode.value === "comfortable"}
          onChange$={(value) => (viewMode.value = value)}
          class="md:text-base lg:text-lg"
        />
        
        <Radio
          name="view-mode"
          value="spacious"
          label="Spacious View"
          size="lg"
          checked={viewMode.value === "spacious"}
          onChange$={(value) => (viewMode.value = value)}
          class="md:text-base lg:text-lg"
        />
      </fieldset>

      <div class="mt-4 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          View Mode: <span class="font-medium">{viewMode.value}</span>
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Text size adapts at different breakpoints for optimal readability
        </p>
      </div>
    </div>
  );
});

export default MobileOptimizedExample;