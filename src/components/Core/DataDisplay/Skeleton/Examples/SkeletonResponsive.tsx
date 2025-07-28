import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Skeleton, SkeletonCard, SkeletonAvatar, SkeletonText } from "../index";

export const SkeletonResponsive = component$(() => {
  const isMobile = useSignal(false);
  const isTablet = useSignal(false);

  useVisibleTask$(() => {
    const checkScreenSize = () => {
      isMobile.value = window.innerWidth < 640;
      isTablet.value = window.innerWidth >= 640 && window.innerWidth < 1024;
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  });

  return (
    <div class="space-y-8">
      {/* Responsive Grid Layout */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Responsive Grid Skeleton
        </h3>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <SkeletonCard
              key={item}
              hasMedia={!isMobile.value}
              mediaHeight={isMobile.value ? undefined : 150}
              animation="pulse"
            />
          ))}
        </div>
      </div>

      {/* Responsive List Item */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Responsive List Items
        </h3>
        <div class="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              class="flex flex-col gap-4 rounded-lg border border-gray-200 p-4 sm:flex-row sm:items-center dark:border-gray-700"
            >
              <SkeletonAvatar
                size={isMobile.value ? "md" : "lg"}
                shape="rounded"
              />
              <div class="flex-1 space-y-2">
                <Skeleton
                  variant="text"
                  width={isMobile.value ? "100%" : "40%"}
                  height={20}
                />
                <SkeletonText lines={isMobile.value ? 2 : 1} spacing="sm" />
              </div>
              {!isMobile.value && (
                <Skeleton
                  variant="rounded"
                  width={100}
                  height={36}
                  aria-label="Action button placeholder"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Responsive Table/Card View */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Responsive Table/Card View
        </h3>
        {isMobile.value ? (
          // Mobile: Card view
          <div class="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                class="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
              >
                <div class="mb-3 flex items-center justify-between">
                  <Skeleton variant="text" width="60%" height={20} />
                  <Skeleton variant="circular" width={24} height={24} />
                </div>
                <SkeletonText lines={2} spacing="sm" />
              </div>
            ))}
          </div>
        ) : (
          // Desktop: Table view
          <div class="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
            <table class="w-full">
              <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                  {["Name", "Description", "Status", "Actions"].map(
                    (header) => (
                      <th key={header} class="px-4 py-3 text-left">
                        <Skeleton variant="text" width="80%" height={16} />
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((row) => (
                  <tr
                    key={row}
                    class="border-t border-gray-200 dark:border-gray-700"
                  >
                    <td class="px-4 py-3">
                      <div class="flex items-center gap-3">
                        <SkeletonAvatar size="sm" />
                        <Skeleton variant="text" width={120} height={16} />
                      </div>
                    </td>
                    <td class="px-4 py-3">
                      <SkeletonText lines={2} spacing="sm" />
                    </td>
                    <td class="px-4 py-3">
                      <Skeleton variant="rounded" width={80} height={24} />
                    </td>
                    <td class="px-4 py-3">
                      <div class="flex gap-2">
                        <Skeleton variant="circular" width={32} height={32} />
                        <Skeleton variant="circular" width={32} height={32} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Responsive Media Gallery */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Responsive Media Gallery
        </h3>
        <div class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
            <Skeleton
              key={item}
              variant="rounded"
              width="100%"
              height={isMobile.value ? 100 : isTablet.value ? 120 : 150}
              animation="wave"
            />
          ))}
        </div>
      </div>

      {/* Current Screen Size Indicator */}
      <div class="rounded-lg bg-gray-100 p-4 text-center dark:bg-gray-800">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Current view:{" "}
          {isMobile.value ? "Mobile" : isTablet.value ? "Tablet" : "Desktop"}
        </p>
        <p class="mt-1 text-xs text-gray-500 dark:text-gray-500">
          Resize the window to see responsive behavior
        </p>
      </div>
    </div>
  );
});
