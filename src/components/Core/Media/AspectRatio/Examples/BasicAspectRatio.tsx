import { component$, useSignal } from "@builder.io/qwik";
import { AspectRatio } from "..";

/**
 * Basic AspectRatio examples demonstrating different preset ratios and basic usage
 * Enhanced with mobile-first responsive design and dark mode support
 */
export const BasicAspectRatioExamples = component$(() => {
  const isDarkMode = useSignal(false);

  return (
    <div class={`space-y-6 p-4 sm:p-6 lg:p-8 ${isDarkMode.value ? "dark bg-surface-dark" : "bg-surface-light"}`}>
      {/* Header with Dark Mode Toggle */}
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl lg:text-3xl">
          Basic AspectRatio Examples
        </h2>
        <label class="flex items-center gap-2 rounded-lg bg-surface-secondary p-2 dark:bg-surface-dark-secondary">
          <input
            type="checkbox"
            checked={isDarkMode.value}
            onChange$={(_, target) => {
              isDarkMode.value = target.checked;
            }}
            class="rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
            Dark Mode
          </span>
        </label>
      </div>

      {/* Preset Ratios Grid */}
      <section>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white sm:text-xl">
          Preset Ratios
        </h3>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Square (1:1) */}
          <div class="space-y-2">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Square (1:1)
            </h4>
            <AspectRatio 
              ratio="square" 
              bgColor="bg-surface-secondary dark:bg-surface-dark-secondary"
              class="ring-1 ring-gray-200 dark:ring-gray-700"
            >
              <div class="flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 p-3 text-center text-white shadow-inner sm:p-4">
                <span class="text-xs font-medium sm:text-sm">Square Content</span>
              </div>
            </AspectRatio>
          </div>

          {/* Video (16:9) */}
          <div class="space-y-2">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Video (16:9)
            </h4>
            <AspectRatio 
              ratio="video" 
              bgColor="bg-surface-secondary dark:bg-surface-dark-secondary"
              class="ring-1 ring-gray-200 dark:ring-gray-700"
            >
              <div class="flex items-center justify-center bg-gradient-to-br from-green-500 to-green-600 p-3 text-center text-white shadow-inner sm:p-4">
                <span class="text-xs font-medium sm:text-sm">Video Ratio</span>
              </div>
            </AspectRatio>
          </div>

          {/* Ultrawide (21:9) */}
          <div class="space-y-2">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Ultrawide (21:9)
            </h4>
            <AspectRatio 
              ratio="ultrawide" 
              bgColor="bg-surface-secondary dark:bg-surface-dark-secondary"
              class="ring-1 ring-gray-200 dark:ring-gray-700"
            >
              <div class="flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-600 p-3 text-center text-white shadow-inner sm:p-4">
                <span class="text-xs font-medium sm:text-sm">Ultrawide Display</span>
              </div>
            </AspectRatio>
          </div>

          {/* Portrait (9:16) */}
          <div class="space-y-2">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Portrait (9:16)
            </h4>
            <AspectRatio 
              ratio="portrait" 
              bgColor="bg-surface-secondary dark:bg-surface-dark-secondary"
              maxWidth="mobile:full tablet:200px"
              class="ring-1 ring-gray-200 dark:ring-gray-700"
            >
              <div class="flex items-center justify-center bg-gradient-to-br from-pink-500 to-pink-600 p-3 text-center text-white shadow-inner sm:p-4">
                <span class="text-xs font-medium sm:text-sm">Portrait</span>
              </div>
            </AspectRatio>
          </div>

          {/* Landscape (4:3) */}
          <div class="space-y-2">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Landscape (4:3)
            </h4>
            <AspectRatio 
              ratio="landscape" 
              bgColor="bg-surface-secondary dark:bg-surface-dark-secondary"
              class="ring-1 ring-gray-200 dark:ring-gray-700"
            >
              <div class="flex items-center justify-center bg-gradient-to-br from-warning-500 to-warning-600 p-3 text-center text-white shadow-inner sm:p-4">
                <span class="text-xs font-medium sm:text-sm">Landscape View</span>
              </div>
            </AspectRatio>
          </div>

          {/* Photo (3:2) */}
          <div class="space-y-2">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Photo (3:2)
            </h4>
            <AspectRatio 
              ratio="photo" 
              bgColor="bg-surface-secondary dark:bg-surface-dark-secondary"
              class="ring-1 ring-gray-200 dark:ring-gray-700"
            >
              <div class="flex items-center justify-center bg-gradient-to-br from-indigo-500 to-indigo-600 p-3 text-center text-white shadow-inner sm:p-4">
                <span class="text-xs font-medium sm:text-sm">Photo Format</span>
              </div>
            </AspectRatio>
          </div>

          {/* Golden Ratio (1.618:1) */}
          <div class="space-y-2">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Golden Ratio (1.618:1)
            </h4>
            <AspectRatio 
              ratio="golden" 
              bgColor="bg-surface-secondary dark:bg-surface-dark-secondary"
              class="ring-1 ring-gray-200 dark:ring-gray-700"
            >
              <div class="flex items-center justify-center bg-gradient-to-br from-red-500 to-red-600 p-3 text-center text-white shadow-inner sm:p-4">
                <span class="text-xs font-medium sm:text-sm">Golden Ratio</span>
              </div>
            </AspectRatio>
          </div>
        </div>
      </section>

      {/* Image Examples */}
      <section>
        <h3 class="mb-3 text-xl font-semibold">With Images</h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Cover Overflow */}
          <div>
            <h4 class="mb-2 text-sm font-medium">Cover Overflow (Default)</h4>
            <AspectRatio ratio="video" overflow="cover">
              <img
                src="https://via.placeholder.com/800x600/3b82f6/ffffff?text=Cover+Image"
                alt="Cover example"
                class="h-full w-full object-cover"
              />
            </AspectRatio>
          </div>

          {/* Contain Overflow */}
          <div>
            <h4 class="mb-2 text-sm font-medium">Contain Overflow</h4>
            <AspectRatio ratio="video" overflow="contain" bgColor="#1f2937">
              <img
                src="https://via.placeholder.com/600x800/10b981/ffffff?text=Contain+Image"
                alt="Contain example"
                class="h-full w-full object-contain"
              />
            </AspectRatio>
          </div>
        </div>
      </section>

      {/* Size Constraints */}
      <section>
        <h3 class="mb-3 text-xl font-semibold">Size Constraints</h3>
        <div class="space-y-4">
          {/* Max Width Example */}
          <div>
            <h4 class="mb-2 text-sm font-medium">With Max Width (300px)</h4>
            <AspectRatio ratio="square" maxWidth="300px" bgColor="#ecfdf5">
              <div class="bg-emerald-500 p-4 text-center text-white">
                Max Width 300px
              </div>
            </AspectRatio>
          </div>

          {/* Min Width Example */}
          <div>
            <h4 class="mb-2 text-sm font-medium">With Min Width (200px)</h4>
            <AspectRatio ratio="video" minWidth="200px" bgColor="#fef2f2">
              <div class="bg-red-500 p-4 text-center text-white">
                Min Width 200px
              </div>
            </AspectRatio>
          </div>

          {/* Both Constraints */}
          <div>
            <h4 class="mb-2 text-sm font-medium">
              With Both Min (250px) and Max (400px) Width
            </h4>
            <AspectRatio
              ratio="landscape"
              minWidth="250px"
              maxWidth="400px"
              bgColor="#f0f9ff"
            >
              <div class="bg-sky-500 p-4 text-center text-white">
                Constrained Width
              </div>
            </AspectRatio>
          </div>
        </div>
      </section>

      {/* Centering Examples */}
      <section>
        <h3 class="mb-3 text-xl font-semibold">Centering Content</h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Centered (Default) */}
          <div>
            <h4 class="mb-2 text-sm font-medium">Centered Content (Default)</h4>
            <AspectRatio ratio="square" bgColor="#f3e8ff">
              <div class="rounded-lg bg-purple-600 p-4 text-white">
                Centered
              </div>
            </AspectRatio>
          </div>

          {/* Not Centered */}
          <div>
            <h4 class="mb-2 text-sm font-medium">Not Centered</h4>
            <AspectRatio ratio="square" centered={false} bgColor="#fefce8">
              <div class="rounded-lg bg-yellow-600 p-4 text-white">
                Not Centered
              </div>
            </AspectRatio>
          </div>
        </div>
      </section>

      {/* Custom Classes and Styles */}
      <section>
        <h3 class="mb-3 text-xl font-semibold">Custom Styling</h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Custom Class */}
          <div>
            <h4 class="mb-2 text-sm font-medium">With Custom Class</h4>
            <AspectRatio
              ratio="video"
              class="overflow-hidden rounded-lg shadow-lg"
              bgColor="#fff"
            >
              <div class="flex h-full items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-center text-white">
                Custom Styled
              </div>
            </AspectRatio>
          </div>

          {/* Inline Styles */}
          <div>
            <h4 class="mb-2 text-sm font-medium">With Inline Styles</h4>
            <AspectRatio
              ratio="video"
              style={{ border: "2px solid #3b82f6", borderRadius: "8px" }}
              bgColor="#eff6ff"
            >
              <div class="p-4 text-center font-semibold text-blue-600">
                Inline Styled
              </div>
            </AspectRatio>
          </div>
        </div>
      </section>
    </div>
  );
});
