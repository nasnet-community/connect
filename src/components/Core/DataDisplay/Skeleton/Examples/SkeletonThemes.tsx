import { component$, useSignal } from "@builder.io/qwik";
import { Skeleton, SkeletonCard, SkeletonAvatar, SkeletonText } from "../index";

export const SkeletonThemes = component$(() => {
  const isDark = useSignal(false);

  return (
    <div class="space-y-8">
      {/* Theme Toggle */}
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Theme Variations
        </h3>
        <button
          onClick$={() => (isDark.value = !isDark.value)}
          class="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          Toggle Theme Preview
        </button>
      </div>

      {/* Light/Dark Theme Comparison */}
      <div class="grid gap-6 lg:grid-cols-2">
        {/* Light Theme */}
        <div class="rounded-lg border border-gray-200 bg-white p-6">
          <h4 class="mb-4 text-sm font-medium text-gray-900">Light Theme</h4>
          <div class="space-y-4">
            <div class="flex items-start gap-4">
              <SkeletonAvatar size="lg" />
              <div class="flex-1 space-y-2">
                <Skeleton variant="text" width="60%" height={20} />
                <SkeletonText lines={3} spacing="sm" />
              </div>
            </div>
            <div class="flex gap-2">
              <Skeleton variant="rounded" width={80} height={32} />
              <Skeleton variant="rounded" width={80} height={32} />
            </div>
          </div>
        </div>

        {/* Dark Theme */}
        <div class="rounded-lg border border-gray-700 bg-gray-900 p-6">
          <h4 class="mb-4 text-sm font-medium text-white">Dark Theme</h4>
          <div class="space-y-4">
            <div class="flex items-start gap-4">
              <div class="h-12 w-12 animate-pulse rounded-full bg-gray-700" />
              <div class="flex-1 space-y-2">
                <div class="h-5 w-3/5 animate-pulse rounded bg-gray-700" />
                <div class="space-y-2">
                  <div class="h-4 animate-pulse rounded bg-gray-700" />
                  <div class="h-4 animate-pulse rounded bg-gray-700" />
                  <div class="h-4 w-4/5 animate-pulse rounded bg-gray-700" />
                </div>
              </div>
            </div>
            <div class="flex gap-2">
              <div class="h-8 w-20 animate-pulse rounded bg-gray-700" />
              <div class="h-8 w-20 animate-pulse rounded bg-gray-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Themed Cards */}
      <div>
        <h4 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Themed Card Skeletons
        </h4>
        <div class="grid gap-4 md:grid-cols-3">
          {/* Default theme */}
          <div>
            <h5 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Default
            </h5>
            <SkeletonCard animation="pulse" />
          </div>

          {/* Primary theme simulation */}
          <div>
            <h5 class="mb-2 text-sm font-medium text-blue-700 dark:text-blue-300">
              Primary Accent
            </h5>
            <div class="rounded-lg border-2 border-blue-100 bg-blue-50/50 p-4 dark:border-blue-900 dark:bg-blue-950/20">
              <SkeletonCard hasMedia={false} animation="wave" />
            </div>
          </div>

          {/* Success theme simulation */}
          <div>
            <h5 class="mb-2 text-sm font-medium text-green-700 dark:text-green-300">
              Success Accent
            </h5>
            <div class="rounded-lg border-2 border-green-100 bg-green-50/50 p-4 dark:border-green-900 dark:bg-green-950/20">
              <SkeletonCard hasMedia={false} animation="pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Contrast Examples */}
      <div>
        <h4 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          High Contrast Skeletons
        </h4>
        <div class="space-y-4">
          {/* High contrast for accessibility */}
          <div class="rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
            <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
              High contrast for better visibility
            </p>
            <div class="space-y-3">
              <div class="h-4 w-full animate-pulse rounded bg-gray-400 dark:bg-gray-500" />
              <div class="h-4 w-4/5 animate-pulse rounded bg-gray-400 dark:bg-gray-500" />
              <div class="h-4 w-3/5 animate-pulse rounded bg-gray-400 dark:bg-gray-500" />
            </div>
          </div>

          {/* Low contrast for subtle loading */}
          <div class="rounded-lg bg-gray-50 p-6 dark:bg-gray-900">
            <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Low contrast for subtle loading states
            </p>
            <div class="space-y-3">
              <div class="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
              <div class="h-4 w-4/5 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
              <div class="h-4 w-3/5 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
            </div>
          </div>
        </div>
      </div>

      {/* Custom Themed Skeleton */}
      <div>
        <h4 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Custom Themed Loading States
        </h4>
        <div class="grid gap-4 md:grid-cols-2">
          {/* Gradient skeleton */}
          <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <h5 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              Gradient Skeleton
            </h5>
            <div class="space-y-3">
              <div class="h-12 w-12 animate-pulse rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700" />
              <div class="h-4 animate-pulse rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700" />
              <div class="h-4 w-4/5 animate-pulse rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700" />
            </div>
          </div>

          {/* Shimmer effect skeleton */}
          <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <h5 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              Shimmer Effect
            </h5>
            <div class="space-y-3">
              <div class="relative h-12 w-12 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div class="shimmer absolute inset-0" />
              </div>
              <div class="relative h-4 overflow-hidden rounded bg-gray-200 dark:bg-gray-700">
                <div class="shimmer absolute inset-0" />
              </div>
              <div class="relative h-4 w-4/5 overflow-hidden rounded bg-gray-200 dark:bg-gray-700">
                <div class="shimmer absolute inset-0" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .shimmer {
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.4),
              transparent
            );
            animation: shimmer 1.5s infinite;
          }
          
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          
          .dark .shimmer {
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.1),
              transparent
            );
          }
        `}
      </style>
    </div>
  );
});
