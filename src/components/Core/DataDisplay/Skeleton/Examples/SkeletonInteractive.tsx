import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { Skeleton, SkeletonAvatar, SkeletonText } from "../index";

export const SkeletonInteractive = component$(() => {
  const isLoading = useSignal(true);
  const loadingProgress = useSignal(0);
  const showPartial = useSignal(false);
  const selectedItems = useSignal<number[]>([]);

  // Simulate progressive loading
  useTask$(({ track }) => {
    track(() => isLoading.value);

    if (isLoading.value) {
      const interval = setInterval(() => {
        loadingProgress.value += 10;
        if (loadingProgress.value >= 100) {
          clearInterval(interval);
          isLoading.value = false;
        }
      }, 300);

      return () => clearInterval(interval);
    } else {
      loadingProgress.value = 0;
    }
  });

  const mockData = [
    { id: 1, name: "John Doe", role: "Developer", avatar: "JD" },
    { id: 2, name: "Jane Smith", role: "Designer", avatar: "JS" },
    { id: 3, name: "Mike Johnson", role: "Manager", avatar: "MJ" },
  ];

  return (
    <div class="space-y-8">
      {/* Interactive Loading Toggle */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Interactive Loading States
        </h3>
        <div class="mb-4 flex flex-wrap gap-2">
          <button
            onClick$={() => (isLoading.value = !isLoading.value)}
            class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            {isLoading.value ? "Stop Loading" : "Start Loading"}
          </button>
          <button
            onClick$={() => (showPartial.value = !showPartial.value)}
            class="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            {showPartial.value ? "Hide Partial" : "Show Partial"}
          </button>
        </div>

        {/* Progress Bar */}
        {isLoading.value && (
          <div class="mb-6">
            <div class="mb-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Loading...</span>
              <span>{loadingProgress.value}%</span>
            </div>
            <div class="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                class="h-full bg-blue-600 transition-all duration-300"
                style={`width: ${loadingProgress.value}%`}
              />
            </div>
          </div>
        )}

        {/* Content with Loading State */}
        <div class="grid gap-4 md:grid-cols-3">
          {mockData.map((item, index) => (
            <div
              key={item.id}
              class="rounded-lg border border-gray-200 p-4 transition-all dark:border-gray-700"
            >
              {isLoading.value || (showPartial.value && index > 0) ? (
                <div class="space-y-3">
                  <div class="flex items-center gap-3">
                    <SkeletonAvatar size="md" />
                    <div class="flex-1 space-y-2">
                      <Skeleton variant="text" width="80%" height={20} />
                      <Skeleton variant="text" width="60%" height={16} />
                    </div>
                  </div>
                  <Skeleton variant="rounded" width="100%" height={32} />
                </div>
              ) : (
                <div class="space-y-3">
                  <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-medium text-white">
                      {item.avatar}
                    </div>
                    <div>
                      <h4 class="font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </h4>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        {item.role}
                      </p>
                    </div>
                  </div>
                  <button class="w-full rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                    View Profile
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Selectable Loading Items */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Selective Loading States
        </h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Click items to toggle their loading state
        </p>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <button
              key={item}
              onClick$={() => {
                if (selectedItems.value.includes(item)) {
                  selectedItems.value = selectedItems.value.filter(
                    (i) => i !== item,
                  );
                } else {
                  selectedItems.value = [...selectedItems.value, item];
                }
              }}
              class={`rounded-lg border-2 p-4 transition-all ${
                selectedItems.value.includes(item)
                  ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/20"
                  : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
              }`}
            >
              {selectedItems.value.includes(item) ? (
                <div class="space-y-2">
                  <Skeleton
                    variant="circular"
                    width={48}
                    height={48}
                    class="mx-auto"
                  />
                  <Skeleton variant="text" width="100%" height={16} />
                  <Skeleton
                    variant="text"
                    width="80%"
                    height={14}
                    class="mx-auto"
                  />
                </div>
              ) : (
                <div class="space-y-2 text-center">
                  <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-lg font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                    {item}
                  </div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">
                    Item {item}
                  </p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">
                    Click to load
                  </p>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Skeleton with Error State */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Loading States with Actions
        </h3>
        <div class="space-y-4">
          {["loading", "error", "success"].map((state) => (
            <div
              key={state}
              class="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
            >
              <div class="flex items-start gap-4">
                {state === "loading" ? (
                  <>
                    <SkeletonAvatar size="lg" shape="rounded" />
                    <div class="flex-1 space-y-2">
                      <Skeleton variant="text" width="40%" height={24} />
                      <SkeletonText lines={2} spacing="sm" />
                      <div class="flex gap-2 pt-2">
                        <Skeleton variant="rounded" width={80} height={32} />
                        <Skeleton variant="rounded" width={80} height={32} />
                      </div>
                    </div>
                  </>
                ) : state === "error" ? (
                  <>
                    <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/20">
                      <svg
                        class="h-6 w-6 text-red-600 dark:text-red-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div class="flex-1">
                      <h4 class="text-lg font-medium text-gray-900 dark:text-white">
                        Failed to load
                      </h4>
                      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Something went wrong. Please try again.
                      </p>
                      <div class="mt-3 flex gap-2">
                        <button class="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700">
                          Retry
                        </button>
                        <button class="rounded-lg bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
                      <svg
                        class="h-6 w-6 text-green-600 dark:text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div class="flex-1">
                      <h4 class="text-lg font-medium text-gray-900 dark:text-white">
                        Successfully loaded
                      </h4>
                      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Your content has been loaded successfully.
                      </p>
                      <div class="mt-3 flex gap-2">
                        <button class="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700">
                          View
                        </button>
                        <button class="rounded-lg bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                          Close
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
