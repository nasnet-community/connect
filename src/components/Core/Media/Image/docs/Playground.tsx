import { component$, useSignal } from "@builder.io/qwik";
import { Image } from "..";
import type { ImageFit, PlaceholderType } from "../Image.types";

export default component$(() => {
  // Playground state
  const imageSrc = useSignal<string>("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600");
  const alt = useSignal<string>("Mountain landscape with lake reflection");
  const width = useSignal<number>(400);
  const height = useSignal<number>(300);
  const objectFit = useSignal<ImageFit>("cover");
  const placeholder = useSignal<PlaceholderType>("skeleton");
  const placeholderSrc = useSignal<string>("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=50&blur=2");
  const rounded = useSignal<boolean>(false);
  const roundedSize = useSignal<"sm" | "md" | "lg" | "xl" | "full">("md");
  const loading = useSignal<"lazy" | "eager">("lazy");
  const priority = useSignal<boolean>(false);
  const retryOnError = useSignal<boolean>(true);
  const isDarkMode = useSignal<boolean>(false);
  const forceError = useSignal<boolean>(false);
  const showSpinner = useSignal<boolean>(true);

  const objectFitOptions: ImageFit[] = ["cover", "contain", "fill", "none", "scale-down"];
  const placeholderOptions: PlaceholderType[] = ["skeleton", "blur", "spinner", "custom"];
  const roundedSizeOptions: ("sm" | "md" | "lg" | "xl" | "full")[] = ["sm", "md", "lg", "xl", "full"];

  const sampleImages = [
    {
      name: "Landscape",
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600",
      blurUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=50&blur=2",
      alt: "Mountain landscape with lake reflection",
    },
    {
      name: "Portrait",
      url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600",
      blurUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&blur=2",
      alt: "Professional headshot of a woman",
    },
    {
      name: "Technology",
      url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600",
      blurUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=50&blur=2",
      alt: "Modern tech workspace with laptop and gadgets",
    },
    {
      name: "Architecture", 
      url: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=800&h=600",
      blurUrl: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=50&blur=2",
      alt: "Modern building architecture with geometric patterns",
    },
  ];

  const customPlaceholderContent = (
    <div class="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900">
      <div class="text-center">
        <div class="mb-2 text-2xl">🖼️</div>
        <div class="text-sm font-medium text-gray-600 dark:text-gray-400">Custom Placeholder</div>
      </div>
    </div>
  );

  const getCurrentSrc = () => {
    if (forceError.value) {
      return "https://invalid-url.example.com/broken-image.jpg";
    }
    return imageSrc.value;
  };

  return (
    <div class={`space-y-6 p-6 ${isDarkMode.value ? "dark bg-surface-dark" : "bg-surface-light"}`}>
      <div class="flex flex-col gap-6 xl:flex-row">
        {/* Controls Panel */}
        <div class="w-full space-y-4 xl:w-1/3">
          <div class="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Image Playground
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

            {/* Sample Images */}
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Sample Images
              </label>
              <div class="grid grid-cols-2 gap-2">
                {sampleImages.map((image) => (
                  <button
                    key={image.name}
                    onClick$={() => {
                      imageSrc.value = image.url;
                      placeholderSrc.value = image.blurUrl;
                      alt.value = image.alt;
                      forceError.value = false;
                    }}
                    class={`rounded-md border p-2 text-xs transition-colors ${
                      imageSrc.value === image.url
                        ? "border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    {image.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Image URL */}
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Custom Image URL
              </label>
              <input
                type="url"
                value={imageSrc.value}
                onChange$={(_, target) => {
                  imageSrc.value = target.value;
                  forceError.value = false;
                }}
                class="block w-full rounded-md border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Alt Text */}
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Alt Text
              </label>
              <input
                type="text"
                value={alt.value}
                onChange$={(_, target) => {
                  alt.value = target.value;
                }}
                class="block w-full rounded-md border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="Descriptive alt text"
              />
            </div>

            {/* Dimensions */}
            <div class="grid grid-cols-2 gap-2">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Width
                </label>
                <input
                  type="number"
                  min="50"
                  max="800"
                  value={width.value}
                  onChange$={(_, target) => {
                    width.value = parseInt(target.value) || 400;
                  }}
                  class="block w-full rounded-md border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Height
                </label>
                <input
                  type="number"
                  min="50"
                  max="600"
                  value={height.value}
                  onChange$={(_, target) => {
                    height.value = parseInt(target.value) || 300;
                  }}
                  class="block w-full rounded-md border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Object Fit */}
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Object Fit
              </label>
              <select
                value={objectFit.value}
                onChange$={(_, target) => {
                  objectFit.value = target.value as ImageFit;
                }}
                class="block w-full rounded-md border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                {objectFitOptions.map((option) => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Placeholder Type */}
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Placeholder Type
              </label>
              <select
                value={placeholder.value}
                onChange$={(_, target) => {
                  placeholder.value = target.value as PlaceholderType;
                }}
                class="block w-full rounded-md border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                {placeholderOptions.map((option) => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Blur Placeholder URL */}
            {placeholder.value === "blur" && (
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Blur Placeholder URL
                </label>
                <input
                  type="url"
                  value={placeholderSrc.value}
                  onChange$={(_, target) => {
                    placeholderSrc.value = target.value;
                  }}
                  class="block w-full rounded-md border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Low quality blur image URL"
                />
              </div>
            )}

            {/* Show Spinner for spinner placeholder */}
            {placeholder.value === "spinner" && (
              <div class="space-y-2">
                <label class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showSpinner.value}
                    onChange$={(_, target) => {
                      showSpinner.value = target.checked;
                    }}
                    class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Show Spinner
                  </span>
                </label>
              </div>
            )}

            {/* Rounded Corners */}
            <div class="space-y-2">
              <label class="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rounded.value}
                  onChange$={(_, target) => {
                    rounded.value = target.checked;
                  }}
                  class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Rounded Corners
                </span>
              </label>
              {rounded.value && (
                <select
                  value={roundedSize.value}
                  onChange$={(_, target) => {
                    roundedSize.value = target.value as "sm" | "md" | "lg" | "xl" | "full";
                  }}
                  class="block w-full rounded-md border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  {roundedSizeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Loading Options */}
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Loading Behavior
              </label>
              <select
                value={loading.value}
                onChange$={(_, target) => {
                  loading.value = target.value as "lazy" | "eager";
                  if (target.value === "eager") {
                    priority.value = false;
                  }
                }}
                class="block w-full rounded-md border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="lazy">Lazy Loading</option>
                <option value="eager">Eager Loading</option>
              </select>
            </div>

            {/* Priority Loading */}
            <div class="space-y-2">
              <label class="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={priority.value}
                  disabled={loading.value === "eager"}
                  onChange$={(_, target) => {
                    priority.value = target.checked;
                  }}
                  class="rounded border-gray-300 text-primary-600 focus:ring-primary-500 disabled:opacity-50"
                />
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Priority Loading {loading.value === "eager" && "(Auto with eager)"}
                </span>
              </label>
            </div>

            {/* Error Handling */}
            <div class="space-y-2">
              <label class="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={retryOnError.value}
                  onChange$={(_, target) => {
                    retryOnError.value = target.checked;
                  }}
                  class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Retry on Error
                </span>
              </label>
            </div>

            {/* Force Error */}
            <div class="space-y-2">
              <label class="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={forceError.value}
                  onChange$={(_, target) => {
                    forceError.value = target.checked;
                  }}
                  class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Force Error (Testing)
                </span>
              </label>
            </div>
          </div>

          {/* Code Preview */}
          <div class="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <h4 class="mb-2 text-sm font-semibold text-gray-900 dark:text-white">Generated Code</h4>
            <pre class="overflow-x-auto rounded bg-gray-100 p-3 text-xs text-gray-800 dark:bg-gray-900 dark:text-gray-200">
              <code>{`<Image
  src="${getCurrentSrc()}"
  alt="${alt.value}"
  width={${width.value}}
  height={${height.value}}
  objectFit="${objectFit.value}"
  placeholder="${placeholder.value}"${placeholder.value === "blur" ? `\n  placeholderSrc="${placeholderSrc.value}"` : ""}${placeholder.value === "custom" ? `\n  placeholderContent={<CustomContent />}` : ""}${rounded.value ? `\n  rounded={true}\n  roundedSize="${roundedSize.value}"` : ""}
  loading="${loading.value}"${priority.value ? `\n  priority={true}` : ""}${retryOnError.value ? `\n  retryOnError={true}` : ""}${placeholder.value === "spinner" && !showSpinner.value ? `\n  showSpinner={false}` : ""}
  class="your-custom-classes"
/>`}</code>
            </pre>
          </div>
        </div>

        {/* Preview Panel */}
        <div class="w-full space-y-4 xl:w-2/3">
          <div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Live Preview
            </h3>
            
            {/* Desktop Preview */}
            <div class="mb-6">
              <h4 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Desktop View</h4>
              <div class="flex justify-center">
                <div style={{ width: `${width.value}px`, height: `${height.value}px` }}>
                  <Image
                    src={getCurrentSrc()}
                    alt={alt.value}
                    width={width.value}
                    height={height.value}
                    objectFit={objectFit.value}
                    placeholder={placeholder.value}
                    placeholderSrc={placeholder.value === "blur" ? placeholderSrc.value : undefined}
                    placeholderContent={placeholder.value === "custom" ? customPlaceholderContent : undefined}
                    rounded={rounded.value}
                    roundedSize={rounded.value ? roundedSize.value : undefined}
                    loading={loading.value}
                    priority={priority.value}
                    retryOnError={retryOnError.value}
                    showSpinner={showSpinner.value}
                    class="border border-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>
            </div>

            {/* Tablet Preview */}
            <div class="mb-6">
              <h4 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Tablet View</h4>
              <div class="flex justify-center">
                <div style={{ width: `${Math.min(width.value, 350)}px`, height: `${Math.min(height.value, 263)}px` }}>
                  <Image
                    src={getCurrentSrc()}
                    alt={alt.value}
                    width={Math.min(width.value, 350)}
                    height={Math.min(height.value, 263)}
                    objectFit={objectFit.value}
                    placeholder={placeholder.value}
                    placeholderSrc={placeholder.value === "blur" ? placeholderSrc.value : undefined}
                    placeholderContent={placeholder.value === "custom" ? customPlaceholderContent : undefined}
                    rounded={rounded.value}
                    roundedSize={rounded.value ? roundedSize.value : undefined}
                    loading={loading.value}
                    priority={priority.value}
                    retryOnError={retryOnError.value}
                    showSpinner={showSpinner.value}
                    class="border border-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>
            </div>

            {/* Mobile Preview */}
            <div>
              <h4 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Mobile View</h4>
              <div class="flex justify-center">
                <div style={{ width: `${Math.min(width.value, 280)}px`, height: `${Math.min(height.value, 210)}px` }}>
                  <Image
                    src={getCurrentSrc()}
                    alt={alt.value}
                    width={Math.min(width.value, 280)}
                    height={Math.min(height.value, 210)}
                    objectFit={objectFit.value}
                    placeholder={placeholder.value}
                    placeholderSrc={placeholder.value === "blur" ? placeholderSrc.value : undefined}
                    placeholderContent={placeholder.value === "custom" ? customPlaceholderContent : undefined}
                    rounded={rounded.value}
                    roundedSize={rounded.value ? roundedSize.value : undefined}
                    loading={loading.value}
                    priority={priority.value}
                    retryOnError={retryOnError.value}
                    showSpinner={showSpinner.value}
                    class="border border-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Performance & Accessibility Tips */}
          <div class="grid gap-4 md:grid-cols-2">
            <div class="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <h4 class="mb-2 text-sm font-semibold text-gray-900 dark:text-white">Performance Tips</h4>
              <ul class="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                <li>• Use lazy loading for images below the fold</li>
                <li>• Enable priority loading for critical above-the-fold images</li>
                <li>• Optimize image sizes for different screen densities</li>
                <li>• Use appropriate placeholder types for better UX</li>
                <li>• Consider WebP format for modern browsers</li>
              </ul>
            </div>

            <div class="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <h4 class="mb-2 text-sm font-semibold text-gray-900 dark:text-white">Accessibility Tips</h4>
              <ul class="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                <li>• Always provide descriptive alt text</li>
                <li>• Use empty alt="" for decorative images</li>
                <li>• Ensure sufficient color contrast for text overlays</li>
                <li>• Test with screen readers regularly</li>
                <li>• Consider users with slow connections</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});