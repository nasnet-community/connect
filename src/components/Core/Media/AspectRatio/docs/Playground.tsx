import { component$, useSignal } from "@builder.io/qwik";
import { AspectRatio } from "..";
import type { AspectRatioPreset, OverflowMode } from "../AspectRatio.types";

export default component$(() => {
  // Playground state
  const selectedRatio = useSignal<AspectRatioPreset>("video");
  const customRatio = useSignal<number>(16 / 9);
  const useCustom = useSignal<boolean>(false);
  const overflow = useSignal<OverflowMode>("cover");
  const centered = useSignal<boolean>(true);
  const bgColor = useSignal<string>("#f3f4f6");
  const maxWidth = useSignal<string>("400px");
  const contentType = useSignal<"color" | "image" | "text">("color");
  const isDarkMode = useSignal<boolean>(false);

  const presetOptions: AspectRatioPreset[] = [
    "square",
    "video",
    "ultrawide", 
    "portrait",
    "landscape",
    "photo",
    "golden",
  ];

  const overflowOptions: OverflowMode[] = ["cover", "contain", "fill", "scale-down"];

  const colorOptions = [
    { name: "Gray 100", value: "#f3f4f6", dark: "#374151" },
    { name: "Blue 500", value: "#3b82f6", dark: "#1d4ed8" },
    { name: "Green 500", value: "#10b981", dark: "#047857" },
    { name: "Purple 500", value: "#8b5cf6", dark: "#6d28d9" },
    { name: "Red 500", value: "#ef4444", dark: "#dc2626" },
    { name: "Yellow 500", value: "#eab308", dark: "#ca8a04" },
  ];

  const renderContent = () => {
    const baseClasses = "w-full h-full flex items-center justify-center text-white font-semibold";
    
    switch (contentType.value) {
      case "color":
        return (
          <div class={`${baseClasses} bg-gradient-to-br from-primary-500 to-secondary-500`}>
            <span class="text-center px-4">
              Aspect Ratio: {useCustom.value ? customRatio.value.toFixed(2) : selectedRatio.value}
            </span>
          </div>
        );
      
      case "image":
        return (
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600"
            alt="Mountain landscape"
            class="w-full h-full object-cover"
          />
        );
      
      case "text":
        return (
          <div class={`${baseClasses} bg-surface-light dark:bg-surface-dark p-6 text-gray-900 dark:text-gray-100`}>
            <div class="text-center space-y-2">
              <h3 class="text-lg font-bold">Content Title</h3>
              <p class="text-sm opacity-75">
                This is sample content that demonstrates how text flows within the aspect ratio container.
              </p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div class={`space-y-6 p-6 ${isDarkMode.value ? "dark bg-surface-dark" : "bg-surface-light"}`}>
      <div class="flex flex-col gap-6 lg:flex-row">
        {/* Controls Panel */}
        <div class="w-full space-y-4 lg:w-1/3">
          <div class="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Playground Controls
            </h3>

            {/* Dark Mode Toggle */}
            <div class="mb-4">
              <label class="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isDarkMode.value}
                  onChange$={(_, target) => {
                    isDarkMode.value = target.checked;
                  }}
                  class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Dark Mode
                </span>
              </label>
            </div>

            {/* Aspect Ratio Selection */}
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Aspect Ratio
              </label>
              <div class="space-y-2">
                <label class="flex items-center gap-2">
                  <input
                    type="radio"
                    name="ratioType"
                    checked={!useCustom.value}
                    onChange$={() => {
                      useCustom.value = false;
                    }}
                    class="text-primary-600 focus:ring-primary-500"
                  />
                  <span class="text-sm text-gray-700 dark:text-gray-300">Preset</span>
                </label>
                {!useCustom.value && (
                  <select
                    value={selectedRatio.value}
                    onChange$={(_, target) => {
                      selectedRatio.value = target.value as AspectRatioPreset;
                    }}
                    class="block w-full rounded-md border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    {presetOptions.map((option) => (
                      <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              
              <div class="space-y-2">
                <label class="flex items-center gap-2">
                  <input
                    type="radio"
                    name="ratioType"
                    checked={useCustom.value}
                    onChange$={() => {
                      useCustom.value = true;
                    }}
                    class="text-primary-600 focus:ring-primary-500"
                  />
                  <span class="text-sm text-gray-700 dark:text-gray-300">Custom</span>
                </label>
                {useCustom.value && (
                  <input
                    type="number"
                    min="0.1"
                    max="10"
                    step="0.1"
                    value={customRatio.value}
                    onChange$={(_, target) => {
                      customRatio.value = parseFloat(target.value) || 1;
                    }}
                    class="block w-full rounded-md border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., 1.5"
                  />
                )}
              </div>
            </div>

            {/* Content Type */}
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Content Type
              </label>
              <select
                value={contentType.value}
                onChange$={(_, target) => {
                  contentType.value = target.value as "color" | "image" | "text";
                }}
                class="block w-full rounded-md border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="color">Gradient Background</option>
                <option value="image">Sample Image</option>
                <option value="text">Text Content</option>
              </select>
            </div>

            {/* Overflow Mode */}
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Overflow Mode
              </label>
              <select
                value={overflow.value}
                onChange$={(_, target) => {
                  overflow.value = target.value as OverflowMode;
                }}
                class="block w-full rounded-md border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                {overflowOptions.map((option) => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Background Color */}
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Background Color
              </label>
              <div class="grid grid-cols-3 gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.name}
                    onClick$={() => {
                      bgColor.value = isDarkMode.value ? color.dark : color.value;
                    }}
                    class={`h-8 w-full rounded border-2 ${
                      bgColor.value === (isDarkMode.value ? color.dark : color.value)
                        ? "border-primary-500"
                        : "border-gray-300"
                    }`}
                    style={{
                      backgroundColor: isDarkMode.value ? color.dark : color.value,
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Centered Toggle */}
            <div class="space-y-2">
              <label class="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={centered.value}
                  onChange$={(_, target) => {
                    centered.value = target.checked;
                  }}
                  class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Center Content
                </span>
              </label>
            </div>

            {/* Max Width */}
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Max Width
              </label>
              <input
                type="text"
                value={maxWidth.value}
                onChange$={(_, target) => {
                  maxWidth.value = target.value;
                }}
                class="block w-full rounded-md border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="e.g., 400px, 50%, 20rem"
              />
            </div>
          </div>

          {/* Code Preview */}
          <div class="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <h4 class="mb-2 text-sm font-semibold text-gray-900 dark:text-white">Generated Code</h4>
            <pre class="overflow-x-auto rounded bg-gray-100 p-3 text-xs text-gray-800 dark:bg-gray-900 dark:text-gray-200">
              <code>{`<AspectRatio
  ${useCustom.value ? `customRatio={${customRatio.value}}` : `ratio="${selectedRatio.value}"`}
  overflow="${overflow.value}"
  centered={${centered.value}}
  bgColor="${bgColor.value}"
  maxWidth="${maxWidth.value}"
  class="your-custom-classes"
>
  {/* Your content here */}
</AspectRatio>`}</code>
            </pre>
          </div>
        </div>

        {/* Preview Panel */}
        <div class="w-full space-y-4 lg:w-2/3">
          <div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Live Preview
            </h3>
            
            {/* Desktop Preview */}
            <div class="mb-6">
              <h4 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Desktop View</h4>
              <div class="mx-auto" style={{ maxWidth: "600px" }}>
                <AspectRatio
                  ratio={useCustom.value ? undefined : selectedRatio.value}
                  customRatio={useCustom.value ? customRatio.value : undefined}
                  overflow={overflow.value}
                  centered={centered.value}
                  bgColor={bgColor.value}
                  maxWidth={maxWidth.value}
                  class="border border-gray-300 dark:border-gray-600"
                >
                  {renderContent()}
                </AspectRatio>
              </div>
            </div>

            {/* Tablet Preview */}
            <div class="mb-6">
              <h4 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Tablet View</h4>
              <div class="mx-auto" style={{ maxWidth: "400px" }}>
                <AspectRatio
                  ratio={useCustom.value ? undefined : selectedRatio.value}
                  customRatio={useCustom.value ? customRatio.value : undefined}
                  overflow={overflow.value}
                  centered={centered.value}
                  bgColor={bgColor.value}
                  maxWidth={maxWidth.value}
                  class="border border-gray-300 dark:border-gray-600"
                >
                  {renderContent()}
                </AspectRatio>
              </div>
            </div>

            {/* Mobile Preview */}
            <div>
              <h4 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Mobile View</h4>
              <div class="mx-auto" style={{ maxWidth: "280px" }}>
                <AspectRatio
                  ratio={useCustom.value ? undefined : selectedRatio.value}
                  customRatio={useCustom.value ? customRatio.value : undefined}
                  overflow={overflow.value}
                  centered={centered.value}
                  bgColor={bgColor.value}
                  maxWidth={maxWidth.value}
                  class="border border-gray-300 dark:border-gray-600"
                >
                  {renderContent()}
                </AspectRatio>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div class="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <h4 class="mb-2 text-sm font-semibold text-gray-900 dark:text-white">Tips</h4>
            <ul class="space-y-1 text-xs text-gray-600 dark:text-gray-400">
              <li>• Use 'video' (16:9) ratio for embedded videos and hero sections</li>
              <li>• Use 'square' ratio for profile pictures and thumbnails</li>
              <li>• Use 'cover' overflow for images that should fill the container</li>
              <li>• Use 'contain' overflow when content must be fully visible</li>
              <li>• Set maxWidth to prevent extremely large containers on wide screens</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});