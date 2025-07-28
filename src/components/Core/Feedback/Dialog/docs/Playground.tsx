import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import {
  PlaygroundTemplate,
  type PropertyControl,
} from "~/components/Docs/templates";
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "../";
import { Button } from "~/components/Core/button";
import { Card } from "~/components/Core";

/**
 * Dialog component playground using the standard template
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
      size: "md",
      hasTitle: true,
      title: "Dialog Title",
      fullscreenOnMobile: false,
      backdropVariant: "medium",
      elevation: "elevated",
    },
    mobileOptimized: {
      size: "full",
      hasTitle: true,
      title: "Mobile Dialog",
      fullscreenOnMobile: true,
      backdropVariant: "heavy",
      elevation: "elevated",
    },
    desktopCompact: {
      size: "sm",
      hasTitle: true,
      title: "Compact Dialog",
      fullscreenOnMobile: false,
      backdropVariant: "light",
      elevation: "base",
    },
  };

  // Define the DialogDemo component that will be controlled by the playground
  const DialogDemo = component$<{
    size: "sm" | "md" | "lg" | "xl" | "full";
    hasTitle: boolean;
    title: string;
    closeOnOutsideClick: boolean;
    closeOnEsc: boolean;
    hasCloseButton: boolean;
    isCentered: boolean;
    disableAnimation: boolean;
    hasBackdrop: boolean;
    scrollable: boolean;
    hasFooter: boolean;
    fullscreenOnMobile: boolean;
    backdropVariant: "light" | "medium" | "heavy";
    elevation: "base" | "elevated" | "depressed";
    mobileBreakpoint: "mobile" | "tablet";
  }>((props) => {
    const isDialogOpen = useSignal(false);

    return (
      <div class="flex flex-col items-center">
        <Button onClick$={() => (isDialogOpen.value = true)} class="mb-4">
          Open Dialog
        </Button>

        <Dialog
          isOpen={isDialogOpen.value}
          onClose$={() => (isDialogOpen.value = false)}
          size={props.size}
          closeOnOutsideClick={props.closeOnOutsideClick}
          closeOnEsc={props.closeOnEsc}
          hasCloseButton={props.hasCloseButton}
          isCentered={props.isCentered}
          disableAnimation={props.disableAnimation}
          hasBackdrop={props.hasBackdrop}
          scrollable={props.scrollable}
          title={props.hasTitle ? props.title : undefined}
          fullscreenOnMobile={props.fullscreenOnMobile}
          backdropVariant={props.backdropVariant}
          elevation={props.elevation}
          mobileBreakpoint={props.mobileBreakpoint}
        >
          {props.hasTitle && !props.title && (
            <DialogHeader>Dialog Title</DialogHeader>
          )}

          <DialogBody scrollable={props.scrollable}>
            <div class="space-y-4">
              <p>This is a dialog that demonstrates configurable options.</p>
              <p>
                You can customize the behavior and appearance of this dialog
                using the controls provided in the playground.
              </p>

              {props.scrollable && (
                <>
                  {/* Add extra content to demonstrate scrolling */}
                  {Array.from({ length: 10 }).map((_, index) => (
                    <div
                      key={index}
                      class="rounded bg-gray-100 p-3 dark:bg-gray-700"
                    >
                      <h4 class="font-medium">Section {index + 1}</h4>
                      <p>
                        This additional content demonstrates scrollable
                        behavior. When there is a lot of content, the dialog
                        body will scroll while keeping the header and footer
                        fixed.
                      </p>
                    </div>
                  ))}
                </>
              )}
            </div>
          </DialogBody>

          {props.hasFooter && (
            <DialogFooter>
              <div class="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick$={() => (isDialogOpen.value = false)}
                >
                  Cancel
                </Button>
                <Button onClick$={() => (isDialogOpen.value = false)}>
                  Confirm
                </Button>
              </div>
            </DialogFooter>
          )}
        </Dialog>

        {/* Enhanced state display with mobile features */}
        <div class="mt-8 w-full rounded-md border bg-gray-50 p-4 text-sm dark:bg-gray-800">
          <div class="mb-3 flex items-center justify-between">
            <p class="font-medium">Current Dialog State:</p>
            {isMobileView.value && (
              <span class="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                📱 Mobile View
              </span>
            )}
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            <p>
              Dialog is:{" "}
              <span class="font-mono font-semibold">
                {isDialogOpen.value ? "Open" : "Closed"}
              </span>
            </p>
            <p>
              Size: <span class="font-mono">{props.size}</span>
            </p>
            <p>
              Fullscreen on Mobile:{" "}
              <span class="font-mono">{props.fullscreenOnMobile ? "Yes" : "No"}</span>
            </p>
            <p>
              Backdrop Variant: <span class="font-mono">{props.backdropVariant}</span>
            </p>
            <p>
              Elevation: <span class="font-mono">{props.elevation}</span>
            </p>
            <p>
              Mobile Breakpoint: <span class="font-mono">{props.mobileBreakpoint}</span>
            </p>
            <p>
              Close on Outside Click:{" "}
              <span class="font-mono">
                {props.closeOnOutsideClick ? "Yes" : "No"}
              </span>
            </p>
            <p>
              Close on Esc:{" "}
              <span class="font-mono">{props.closeOnEsc ? "Yes" : "No"}</span>
            </p>
            <p>
              Has Close Button:{" "}
              <span class="font-mono">{props.hasCloseButton ? "Yes" : "No"}</span>
            </p>
            <p>
              Is Centered:{" "}
              <span class="font-mono">{props.isCentered ? "Yes" : "No"}</span>
            </p>
            <p>
              Animation:{" "}
              <span class="font-mono">
                {props.disableAnimation ? "Disabled" : "Enabled"}
              </span>
            </p>
            <p>
              Has Footer:{" "}
              <span class="font-mono">{props.hasFooter ? "Yes" : "No"}</span>
            </p>
          </div>
        </div>
      </div>
    );
  });

  // Define the controls for the playground
  const properties: PropertyControl[] = [
    {
      type: "select",
      name: "size",
      label: "Size",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Extra Large", value: "xl" },
        { label: "Full Width", value: "full" },
      ],
      defaultValue: "md",
    },
    {
      type: "boolean",
      name: "hasTitle",
      label: "Show Title",
      defaultValue: true,
    },
    {
      type: "text",
      name: "title",
      label: "Title Text",
      defaultValue: "Dialog Title",
    },
    {
      type: "boolean",
      name: "closeOnOutsideClick",
      label: "Close on Outside Click",
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
      name: "isCentered",
      label: "Center Vertically",
      defaultValue: true,
    },
    {
      type: "boolean",
      name: "disableAnimation",
      label: "Disable Animation",
      defaultValue: false,
    },
    {
      type: "boolean",
      name: "hasBackdrop",
      label: "Show Backdrop",
      defaultValue: true,
    },
    {
      type: "boolean",
      name: "scrollable",
      label: "Scrollable Content",
      defaultValue: false,
    },
    {
      type: "boolean",
      name: "hasFooter",
      label: "Show Footer",
      defaultValue: true,
    },
    {
      type: "boolean",
      name: "fullscreenOnMobile",
      label: "Fullscreen on Mobile",
      defaultValue: false,
    },
    {
      type: "select",
      name: "backdropVariant",
      label: "Backdrop Variant",
      options: [
        { label: "Light", value: "light" },
        { label: "Medium", value: "medium" },
        { label: "Heavy", value: "heavy" },
      ],
      defaultValue: "medium",
    },
    {
      type: "select",
      name: "elevation",
      label: "Surface Elevation",
      options: [
        { label: "Base", value: "base" },
        { label: "Elevated", value: "elevated" },
        { label: "Depressed", value: "depressed" },
      ],
      defaultValue: "elevated",
    },
    {
      type: "select",
      name: "mobileBreakpoint",
      label: "Mobile Breakpoint",
      options: [
        { label: "Mobile", value: "mobile" },
        { label: "Tablet", value: "tablet" },
      ],
      defaultValue: "mobile",
    },
  ];

  return (
    <div class="space-y-6">
      {/* Enhanced Controls Section */}
      <Card elevation="md" class="overflow-hidden">
        <div class="border-b border-gray-200 p-4 dark:border-gray-700">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Interactive Dialog Playground
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
                    ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
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

      {/* Mobile Features Guide */}
      <Card elevation="md" class="overflow-hidden">
        <div class="border-b border-gray-200 p-4 dark:border-gray-700">
          <h4 class="text-md font-semibold text-gray-900 dark:text-white">
            📱 Mobile Dialog Features
          </h4>
        </div>
        <div class="p-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 class="font-medium text-gray-900 dark:text-white mb-2">Mobile Optimizations:</h5>
              <ul class="text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Fullscreen mode for small screens</li>
                <li>• Touch-friendly close buttons and interactions</li>
                <li>• Safe area padding for notched devices</li>
                <li>• Responsive sizing with configurable breakpoints</li>
              </ul>
            </div>
            <div>
              <h5 class="font-medium text-gray-900 dark:text-white mb-2">Advanced Features:</h5>
              <ul class="text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Configurable backdrop blur intensity</li>
                <li>• Surface elevation for depth perception</li>
                <li>• Smooth animations optimized for touch</li>
                <li>• Accessibility focus management</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* Standard Playground */}
      <PlaygroundTemplate component={DialogDemo} properties={properties} />
    </div>
  );
});
