import { component$, useSignal } from "@builder.io/qwik";
import { Image } from "../Image";

export const BasicImage = component$(() => {
  const isDarkMode = useSignal(false);

  return (
    <div class={`space-y-6 p-4 sm:p-6 lg:p-8 ${isDarkMode.value ? "dark bg-surface-dark" : "bg-surface-light"}`}>
      {/* Header with Dark Mode Toggle */}
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl lg:text-3xl">
          Basic Image Examples
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

      {/* Basic Image */}
      <section>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white sm:text-xl">
          Basic Image
        </h3>
        <div class="mx-auto max-w-md">
          <Image
            src="https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400"
            alt="Person smiling in a bright, modern office environment"
            width={400}
            height={300}
            class="rounded-lg shadow-md ring-1 ring-gray-200 dark:ring-gray-700"
            placeholder="skeleton"
            loading="lazy"
          />
        </div>
      </section>

      {/* Rounded Images */}
      <section>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white sm:text-xl">
          Rounded Images
        </h3>
        <div class="flex flex-col gap-6 sm:flex-row sm:gap-8 sm:justify-center">
          <div class="space-y-2 text-center">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Medium Rounded
            </h4>
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200"
              alt="Professional portrait with medium rounded corners"
              width={200}
              height={200}
              rounded
              roundedSize="md"
              class="mx-auto ring-2 ring-gray-200 dark:ring-gray-700"
              placeholder="skeleton"
            />
          </div>
          <div class="space-y-2 text-center">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Fully Rounded (Circle)
            </h4>
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200"
              alt="Professional portrait as circular avatar"
              width={200}
              height={200}
              rounded
              roundedSize="full"
              class="mx-auto ring-2 ring-gray-200 dark:ring-gray-700"
              placeholder="skeleton"
            />
          </div>
        </div>
      </section>

      {/* Object Fit Options */}
      <section>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white sm:text-xl">
          Object Fit Options
        </h3>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div class="space-y-2">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Cover (Default)
            </h4>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Fills container, may crop content
            </p>
            <div class="h-32 w-full overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400"
                alt="Technology workspace with cover object fit"
                objectFit="cover"
                class="h-full w-full ring-1 ring-gray-200 dark:ring-gray-700"
                placeholder="skeleton"
              />
            </div>
          </div>
          
          <div class="space-y-2">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Contain
            </h4>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Fits entirely, may show background
            </p>
            <div class="h-32 w-full overflow-hidden rounded-lg bg-surface-secondary dark:bg-surface-dark-secondary">
              <Image
                src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400"
                alt="Technology workspace with contain object fit"
                objectFit="contain"
                class="h-full w-full ring-1 ring-gray-200 dark:ring-gray-700"
                placeholder="skeleton"
              />
            </div>
          </div>
          
          <div class="space-y-2">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Fill
            </h4>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Stretches to fill, may distort
            </p>
            <div class="h-32 w-full overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400"
                alt="Technology workspace with fill object fit"
                objectFit="fill"
                class="h-full w-full ring-1 ring-gray-200 dark:ring-gray-700"
                placeholder="skeleton"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Performance Features */}
      <section>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white sm:text-xl">
          Performance Features
        </h3>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div class="space-y-2">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Lazy Loading with Skeleton
            </h4>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Loads when entering viewport
            </p>
            <Image
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"
              alt="Mountain landscape with lazy loading"
              width={400}
              height={250}
              loading="lazy"
              placeholder="skeleton"
              class="rounded-lg ring-1 ring-gray-200 dark:ring-gray-700"
            />
          </div>
          
          <div class="space-y-2">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Priority Loading
            </h4>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Loads immediately for critical images
            </p>
            <Image
              src="https://images.unsplash.com/photo-1517404215738-15263e9f9178?w=400"
              alt="Beautiful architecture with priority loading"
              width={400}
              height={250}
              priority={true}
              placeholder="spinner"
              class="rounded-lg ring-1 ring-gray-200 dark:ring-gray-700"
            />
          </div>
        </div>
      </section>

      {/* Mobile Optimization Notice */}
      <div class="rounded-lg border border-info bg-info-surface p-4 dark:border-info-dark dark:bg-info-dark">
        <div class="flex items-start gap-3">
          <div class="text-info text-lg">💡</div>
          <div>
            <h4 class="font-medium text-info-on-surface">Mobile Optimization</h4>
            <p class="mt-1 text-sm text-info-on-surface opacity-90">
              These examples are optimized for mobile devices with touch-friendly interactions, 
              responsive sizing, and performance-conscious loading strategies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});
