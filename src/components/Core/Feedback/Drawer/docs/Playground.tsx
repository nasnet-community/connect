import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import {
  PlaygroundTemplate,
  type PropertyControl,
} from "~/components/Docs/templates";
import { Drawer, DrawerHeader, DrawerContent, DrawerFooter } from "../";
import { Button, Card } from "~/components/Core";

/**
 * Enhanced Drawer component playground with gesture demonstrations and mobile controls
 */
export default component$(() => {
  const isDarkMode = useSignal(false);
  const isMobileView = useSignal(false);
  const presetConfig = useSignal("default");

  // Apply theme changes to document
  useVisibleTask$(({ track }) => {
    track(() => isDarkMode.value);
    if (typeof document !== "undefined") {
      if (isDarkMode.value) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  });

  // Define preset configurations
  const presets = {
    default: {
      placement: "right",
      size: "md",
      hasOverlay: true,
      enableSwipeGestures: false,
      backdropBlur: "medium",
      showDragHandle: false,
    },
    mobileOptimized: {
      placement: "bottom",
      size: "lg",
      hasOverlay: true,
      enableSwipeGestures: true,
      backdropBlur: "heavy",
      showDragHandle: true,
    },
    desktopSidebar: {
      placement: "left",
      size: "sm",
      hasOverlay: false,
      enableSwipeGestures: false,
      backdropBlur: "light",
      showDragHandle: false,
    },
    fullScreenMobile: {
      placement: "bottom",
      size: "full",
      hasOverlay: true,
      enableSwipeGestures: true,
      backdropBlur: "heavy",
      showDragHandle: true,
    },
  };

  // Define the DrawerDemo component that will be controlled by the playground
  const DrawerDemo = component$<{
    placement: "left" | "right" | "top" | "bottom";
    size: "xs" | "sm" | "md" | "lg" | "xl" | "full";
    hasOverlay: boolean;
    closeOnOverlayClick: boolean;
    closeOnEsc: boolean;
    hasCloseButton: boolean;
    enableSwipeGestures: boolean;
    swipeThreshold: number;
    showDragHandle: boolean;
    backdropBlur: "light" | "medium" | "heavy";
    responsiveSize: "sm" | "md" | "lg";
    mobileAnimation: boolean;
  }>((props) => {
    const isDrawerOpen = useSignal(false);

    const openDrawer = $(() => {
      isDrawerOpen.value = true;
    });

    const closeDrawer = $(() => {
      isDrawerOpen.value = false;
    });

    // Apply mobile view simulation
    const containerClass = isMobileView.value
      ? "w-full max-w-sm mx-auto p-2 rounded-lg border-2 border-dashed border-purple-300 bg-purple-50/20"
      : "p-4";

    return (
      <div class={containerClass}>
        {isMobileView.value && (
          <div class="mb-2 text-xs text-purple-600 font-medium text-center dark:text-purple-400">
            📱 Mobile Simulation
          </div>
        )}

        <div class="flex flex-col items-center space-y-4">
          <Button onClick$={openDrawer}>
            Open {props.placement} Drawer
          </Button>

          {/* Gesture simulation indicator */}
          {props.enableSwipeGestures && (
            <div class="text-xs text-gray-600 dark:text-gray-400 text-center p-2 bg-blue-50 rounded border dark:bg-blue-900/20">
              👆 Swipe gestures enabled - Try swiping to close when opened
            </div>
          )}

          <Drawer
            isOpen={isDrawerOpen.value}
            onClose$={closeDrawer}
            placement={props.placement}
            size={props.size}
            hasOverlay={props.hasOverlay}
            closeOnOverlayClick={props.closeOnOverlayClick}
            closeOnEsc={props.closeOnEsc}
            hasCloseButton={props.hasCloseButton}
            enableSwipeGestures={props.enableSwipeGestures}
            swipeThreshold={props.swipeThreshold}
            showDragHandle={props.showDragHandle}
            backdropBlur={props.backdropBlur}
            responsiveSize={props.responsiveSize}
            mobileAnimation={props.mobileAnimation}
          >
            <DrawerHeader>
              <h3 class="text-lg font-semibold">
                Enhanced Drawer Playground
              </h3>
            </DrawerHeader>

            <DrawerContent>
              <div class="space-y-4 p-4">
                <p>This drawer demonstrates advanced features including:</p>

                <div class="space-y-3">
                  <div class="p-3 bg-gray-50 rounded-lg dark:bg-gray-800">
                    <h4 class="font-medium mb-1">Current Configuration:</h4>
                    <ul class="text-sm space-y-1">
                      <li><strong>Placement:</strong> {props.placement}</li>
                      <li><strong>Size:</strong> {props.size}</li>
                      <li><strong>Swipe Gestures:</strong> {props.enableSwipeGestures ? "Enabled" : "Disabled"}</li>
                      <li><strong>Backdrop Blur:</strong> {props.backdropBlur}</li>
                      <li><strong>Drag Handle:</strong> {props.showDragHandle ? "Visible" : "Hidden"}</li>
                    </ul>
                  </div>

                  {props.enableSwipeGestures && (
                    <div class="p-3 bg-blue-50 rounded-lg dark:bg-blue-900/20">
                      <h4 class="font-medium mb-1 text-blue-900 dark:text-blue-100">
                        🏃‍♂️ Gesture Controls:
                      </h4>
                      <ul class="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                        <li>• Swipe {props.placement === "left" ? "left" : props.placement === "right" ? "right" : props.placement === "top" ? "up" : "down"} to close</li>
                        <li>• Swipe threshold: {props.swipeThreshold}px</li>
                        <li>• Velocity-based detection for smooth interactions</li>
                      </ul>
                    </div>
                  )}

                  {props.showDragHandle && (
                    <div class="p-3 bg-green-50 rounded-lg dark:bg-green-900/20">
                      <h4 class="font-medium mb-1 text-green-900 dark:text-green-100">
                        📏 Drag Handle Features:
                      </h4>
                      <ul class="text-sm text-green-800 dark:text-green-200 space-y-1">
                        <li>• Visual indicator for swipe interactions</li>
                        <li>• Touch-friendly 44px minimum target size</li>
                        <li>• Consistent with mobile design patterns</li>
                      </ul>
                    </div>
                  )}

                  <div class="p-3 bg-yellow-50 rounded-lg dark:bg-yellow-900/20">
                    <h4 class="font-medium mb-1 text-yellow-900 dark:text-yellow-100">
                      🎨 Theme Integration:
                    </h4>
                    <ul class="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                      <li>• Automatic dark mode support</li>
                      <li>• Configurable backdrop blur intensity</li>
                      <li>• Responsive sizing across breakpoints</li>
                    </ul>
                  </div>
                </div>
              </div>
            </DrawerContent>

            <DrawerFooter>
              <div class="flex justify-end gap-2">
                <Button variant="outline" onClick$={closeDrawer}>
                  Cancel
                </Button>
                <Button onClick$={closeDrawer}>
                  Done
                </Button>
              </div>
            </DrawerFooter>
          </Drawer>

        </div>
      </div>
    );
  });

  // Define the controls for the playground
  const properties: PropertyControl[] = [
    {
      type: "select",
      name: "placement",
      label: "Placement",
      options: [
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
        { label: "Top", value: "top" },
        { label: "Bottom", value: "bottom" },
      ],
      defaultValue: "right",
    },
    {
      type: "select",
      name: "size",
      label: "Size",
      options: [
        { label: "Extra Small", value: "xs" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Extra Large", value: "xl" },
        { label: "Full", value: "full" },
      ],
      defaultValue: "md",
    },
    {
      type: "boolean",
      name: "hasOverlay",
      label: "Show Overlay",
      defaultValue: true,
    },
    {
      type: "boolean",
      name: "closeOnOverlayClick",
      label: "Close on Overlay Click",
      defaultValue: true,
    },
    {
      type: "boolean",
      name: "closeOnEsc",
      label: "Close on Esc Key",
      defaultValue: true,
    },
    {
      type: "boolean",
      name: "hasCloseButton",
      label: "Show Close Button",
      defaultValue: true,
    },
    {
      type: "boolean",
      name: "enableSwipeGestures",
      label: "Enable Swipe Gestures",
      defaultValue: false,
    },
    {
      type: "number",
      name: "swipeThreshold",
      label: "Swipe Threshold (px)",
      defaultValue: 50,
      min: 20,
      max: 200,
    },
    {
      type: "boolean",
      name: "showDragHandle",
      label: "Show Drag Handle",
      defaultValue: false,
    },
    {
      type: "select",
      name: "backdropBlur",
      label: "Backdrop Blur",
      options: [
        { label: "Light", value: "light" },
        { label: "Medium", value: "medium" },
        { label: "Heavy", value: "heavy" },
      ],
      defaultValue: "medium",
    },
    {
      type: "select",
      name: "responsiveSize",
      label: "Responsive Size",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
      defaultValue: "md",
    },
    {
      type: "boolean",
      name: "mobileAnimation",
      label: "Mobile Animations",
      defaultValue: true,
    },
  ];

  return (
    <div class="space-y-6">
      {/* Enhanced Controls Section */}
      <Card elevation="md" class="overflow-hidden">
        <div class="border-b border-gray-200 p-4 dark:border-gray-700">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Interactive Drawer Playground
            </h3>
            
            {/* Theme and View Controls */}
            <div class="flex flex-wrap gap-3">
              {/* Theme Toggle */}
              <button
                class={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isDarkMode.value
                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
                onClick$={() => (isDarkMode.value = !isDarkMode.value)}
              >
                {isDarkMode.value ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>

              {/* Mobile View Toggle */}
              <button
                class={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isMobileView.value
                    ? "bg-purple-100 text-purple-800 hover:bg-purple-200"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                } dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600`}
                onClick$={() => (isMobileView.value = !isMobileView.value)}
              >
                {isMobileView.value ? "💻 Desktop View" : "📱 Mobile View"}
              </button>
            </div>
          </div>
        </div>

        {/* Preset Configurations */}
        <div class="border-b border-gray-200 p-4 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
          <div class="flex flex-col sm:flex-row sm:items-center gap-3">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Quick Presets:
            </label>
            <div class="flex flex-wrap gap-2">
              {Object.entries(presets).map(([key]) => (
                <button
                  key={key}
                  class={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    presetConfig.value === key
                      ? "bg-primary-100 text-primary-800 border border-primary-300"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  } dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600`}
                  onClick$={() => {
                    presetConfig.value = key;
                  }}
                >
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Gesture Features Guide */}
      <Card elevation="md" class="overflow-hidden">
        <div class="border-b border-gray-200 p-4 dark:border-gray-700">
          <h4 class="text-md font-semibold text-gray-900 dark:text-white">
            👆 Touch Gesture Features
          </h4>
        </div>
        <div class="p-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 class="font-medium text-gray-900 dark:text-white mb-2">Swipe Gestures:</h5>
              <ul class="text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Direction-aware swipe detection</li>
                <li>• Configurable threshold for activation</li>
                <li>• Velocity-based smooth animations</li>
                <li>• Visual feedback during interactions</li>
              </ul>
            </div>
            <div>
              <h5 class="font-medium text-gray-900 dark:text-white mb-2">Mobile Optimizations:</h5>
              <ul class="text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Bottom placement for thumb accessibility</li>
                <li>• Backdrop blur for depth perception</li>
                <li>• Drag handles for gesture indication</li>
                <li>• Safe area padding for notched devices</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* Standard Playground */}
      <PlaygroundTemplate component={DrawerDemo} properties={properties} />
    </div>
  );
});