import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Skeleton, SkeletonAvatar, SkeletonText } from "../index";

export const SkeletonMobile = component$(() => {
  const isMobile = useSignal(false);
  const deviceType = useSignal("desktop");

  useVisibleTask$(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      isMobile.value = width < 768;
      deviceType.value =
        width < 640 ? "mobile" : width < 1024 ? "tablet" : "desktop";
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  });

  return (
    <div class="space-y-8">
      {/* Mobile App Header Skeleton */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Mobile App Header
        </h3>
        <div class="mx-auto max-w-sm rounded-xl border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900">
          {/* Status Bar */}
          <div class="flex h-6 items-center justify-between bg-gray-100 px-4 text-xs dark:bg-gray-800">
            <div class="flex gap-1">
              <Skeleton variant="text" width={30} height={12} />
              <Skeleton variant="text" width={40} height={12} />
            </div>
            <div class="flex gap-1">
              <Skeleton variant="rectangular" width={16} height={12} />
              <Skeleton variant="rectangular" width={16} height={12} />
              <Skeleton variant="rectangular" width={20} height={12} />
            </div>
          </div>

          {/* App Header */}
          <div class="flex items-center justify-between p-4">
            <Skeleton variant="circular" width={32} height={32} />
            <Skeleton variant="text" width={120} height={24} />
            <Skeleton variant="circular" width={32} height={32} />
          </div>

          {/* Tab Navigation */}
          <div class="flex border-t border-gray-200 dark:border-gray-700">
            {[1, 2, 3, 4].map((tab) => (
              <div key={tab} class="flex-1 p-3 text-center">
                <Skeleton
                  variant="text"
                  width="80%"
                  height={16}
                  class="mx-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Feed Skeleton */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Mobile Social Feed
        </h3>
        <div class="mx-auto max-w-sm space-y-4">
          {[1, 2].map((post) => (
            <div
              key={post}
              class="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
            >
              {/* Post Header */}
              <div class="flex items-center gap-3 p-4">
                <SkeletonAvatar size="sm" />
                <div class="flex-1 space-y-1">
                  <Skeleton variant="text" width="40%" height={16} />
                  <Skeleton variant="text" width="30%" height={14} />
                </div>
                <Skeleton variant="circular" width={20} height={20} />
              </div>

              {/* Post Content */}
              <div class="px-4 pb-2">
                <SkeletonText lines={2} spacing="sm" />
              </div>

              {/* Post Image */}
              <Skeleton variant="rectangular" width="100%" height={200} />

              {/* Post Actions */}
              <div class="flex items-center justify-between p-4">
                <div class="flex gap-4">
                  <Skeleton variant="circular" width={24} height={24} />
                  <Skeleton variant="circular" width={24} height={24} />
                  <Skeleton variant="circular" width={24} height={24} />
                </div>
                <Skeleton variant="circular" width={24} height={24} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile List View */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Mobile List View
        </h3>
        <div class="mx-auto max-w-sm space-y-2 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              class="flex items-center gap-3 border-b border-gray-100 pb-3 last:border-0 last:pb-0 dark:border-gray-800"
            >
              <SkeletonAvatar size="md" shape="rounded" />
              <div class="flex-1 space-y-1">
                <Skeleton variant="text" width="70%" height={18} />
                <Skeleton variant="text" width="50%" height={14} />
              </div>
              <Skeleton variant="rectangular" width={20} height={20} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Card Grid */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Mobile Card Grid
        </h3>
        <div class="mx-auto max-w-sm">
          <div class="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((card) => (
              <div
                key={card}
                class="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900"
              >
                <Skeleton
                  variant="rounded"
                  width="100%"
                  height={100}
                  class="mb-3"
                />
                <Skeleton variant="text" width="80%" height={16} class="mb-1" />
                <Skeleton variant="text" width="60%" height={14} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Mobile Bottom Navigation
        </h3>
        <div class="mx-auto max-w-sm rounded-t-xl border border-b-0 border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900">
          <div class="flex items-center justify-around py-2">
            {[1, 2, 3, 4, 5].map((nav) => (
              <div key={nav} class="flex flex-col items-center gap-1 p-2">
                <Skeleton variant="circular" width={24} height={24} />
                <Skeleton variant="text" width={40} height={10} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Touch Gesture Indicators */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Touch-Optimized Skeletons
        </h3>
        <div class="mx-auto max-w-sm space-y-4">
          {/* Swipeable Card */}
          <div class="relative overflow-hidden rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
            <div class="absolute left-2 top-2 rounded bg-blue-100 px-2 py-1 text-xs text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              Swipe →
            </div>
            <div class="mt-6 flex items-center gap-4">
              <SkeletonAvatar size="lg" />
              <div class="flex-1 space-y-2">
                <Skeleton variant="text" width="60%" height={20} />
                <Skeleton variant="text" width="80%" height={16} />
              </div>
            </div>
          </div>

          {/* Tap Target Skeleton */}
          <div class="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
            <p class="mb-3 text-sm text-gray-600 dark:text-gray-400">
              Large tap targets for mobile
            </p>
            <div class="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((button) => (
                <Skeleton
                  key={button}
                  variant="rounded"
                  width="100%"
                  height={48}
                  aria-label="Touch-optimized button skeleton"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Device Type Indicator */}
      <div class="rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-950/20">
        <p class="text-sm font-medium text-blue-700 dark:text-blue-300">
          Current Device:{" "}
          {deviceType.value.charAt(0).toUpperCase() + deviceType.value.slice(1)}
        </p>
        <p class="mt-1 text-xs text-blue-600 dark:text-blue-400">
          {isMobile.value
            ? "Showing mobile-optimized skeletons"
            : "Resize to mobile view to see optimized layouts"}
        </p>
      </div>
    </div>
  );
});
