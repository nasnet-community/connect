import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import {
  PlaygroundTemplate,
  type PropertyControl,
} from "~/components/Docs/templates";
import { Alert } from "../";
import { Card } from "~/components/Core";

/**
 * Enhanced Alert component playground with theme switcher and mobile simulation
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
      status: "info",
      title: "Alert Title",
      message: "This is an alert message providing additional information.",
      dismissible: false,
      icon: true,
      size: "md",
      variant: "solid",
      subtle: false,
      loading: false,
      animation: "fadeIn",
    },
    mobileOptimized: {
      status: "warning",
      title: "Mobile Alert",
      message: "This alert is optimized for mobile viewing with larger touch targets and responsive text.",
      dismissible: true,
      icon: true,
      size: "lg",
      variant: "solid",
      subtle: false,
      loading: false,
      animation: "slideUp",
    },
    desktopOptimized: {
      status: "success",
      title: "Desktop Alert",
      message: "This alert is optimized for desktop with compact spacing and subtle styling.",
      dismissible: true,
      icon: true,
      size: "sm",
      variant: "outline",
      subtle: true,
      loading: false,
      animation: "scaleUp",
    },
    formError: {
      status: "error",
      title: "Form Validation Error",
      message: "Please correct the highlighted fields before submitting.",
      dismissible: false,
      icon: true,
      size: "md",
      variant: "solid",
      subtle: false,
      loading: false,
      animation: "slideDown",
    },
  };

  // Define the AlertDemo component that will be controlled by the playground
  const AlertDemo = component$<{
    status: "info" | "success" | "warning" | "error";
    title: string;
    message: string;
    dismissible: boolean;
    icon: boolean;
    size: "sm" | "md" | "lg";
    variant: "solid" | "outline" | "subtle";
    subtle: boolean;
    loading: boolean;
    animation: "fadeIn" | "slideUp" | "slideDown" | "scaleUp";
  }>((props) => {
    // Apply mobile view simulation
    const containerClass = isMobileView.value
      ? "w-full max-w-sm mx-auto p-2 rounded-lg border-2 border-dashed border-blue-300 bg-blue-50/20"
      : "p-4 rounded-md bg-gray-100 dark:bg-gray-800";

    return (
      <div class={containerClass}>
        {isMobileView.value && (
          <div class="mb-2 text-xs text-blue-600 font-medium text-center dark:text-blue-400">
            📱 Mobile Simulation
          </div>
        )}
        <Alert
          status={props.status}
          title={props.title || undefined}
          message={props.message || undefined}
          dismissible={props.dismissible}
          icon={props.icon}
          size={props.size}
          variant={props.subtle ? "subtle" : props.variant}
          loading={props.loading}
          animation={props.animation}
        />
      </div>
    );
  });

  // Define the controls for the playground
  const properties: PropertyControl[] = [
    {
      type: "select",
      name: "status",
      label: "Status",
      options: [
        { label: "Info", value: "info" },
        { label: "Success", value: "success" },
        { label: "Warning", value: "warning" },
        { label: "Error", value: "error" },
      ],
      defaultValue: "info",
    },
    {
      type: "text",
      name: "title",
      label: "Title",
      defaultValue: "Alert Title",
    },
    {
      type: "text",
      name: "message",
      label: "Message",
      defaultValue: "This is an alert message providing additional information.",
    },
    {
      type: "boolean",
      name: "dismissible",
      label: "Dismissible",
      defaultValue: false,
    },
    {
      type: "boolean",
      name: "icon",
      label: "Show Icon",
      defaultValue: true,
    },
    {
      type: "select",
      name: "size",
      label: "Size",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
      defaultValue: "md",
    },
    {
      type: "select",
      name: "variant",
      label: "Variant",
      options: [
        { label: "Solid", value: "solid" },
        { label: "Outline", value: "outline" },
        { label: "Subtle", value: "subtle" },
      ],
      defaultValue: "solid",
    },
    {
      type: "boolean",
      name: "subtle",
      label: "Use Subtle Variant",
      defaultValue: false,
    },
    {
      type: "boolean",
      name: "loading",
      label: "Loading State",
      defaultValue: false,
    },
    {
      type: "select",
      name: "animation",
      label: "Animation",
      options: [
        { label: "Fade In", value: "fadeIn" },
        { label: "Slide Up", value: "slideUp" },
        { label: "Slide Down", value: "slideDown" },
        { label: "Scale Up", value: "scaleUp" },
      ],
      defaultValue: "fadeIn",
    },
  ];

  return (
    <div class="space-y-6">
      {/* Enhanced Controls Section */}
      <Card elevation="md" class="overflow-hidden">
        <div class="border-b border-gray-200 p-4 dark:border-gray-700">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Interactive Alert Playground
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
                    // This would trigger preset application in a real implementation
                  }}
                >
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Responsive Design Guidelines */}
      <Card elevation="md" class="overflow-hidden">
        <div class="border-b border-gray-200 p-4 dark:border-gray-700">
          <h4 class="text-md font-semibold text-gray-900 dark:text-white">
            📱 Responsive Design Features
          </h4>
        </div>
        <div class="p-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 class="font-medium text-gray-900 dark:text-white mb-2">Mobile Optimizations:</h5>
              <ul class="text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Touch-friendly dismiss buttons (44px minimum)</li>
                <li>• Responsive text sizing and padding</li>
                <li>• Safe area padding for notched devices</li>
                <li>• Optimized animations for touch interactions</li>
              </ul>
            </div>
            <div>
              <h5 class="font-medium text-gray-900 dark:text-white mb-2">Theme Integration:</h5>
              <ul class="text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Automatic dark mode support</li>
                <li>• Consistent color tokens across themes</li>
                <li>• High contrast mode compatibility</li>
                <li>• System preference detection</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* Standard Playground */}
      <PlaygroundTemplate component={AlertDemo} properties={properties} />
    </div>
  );
});
