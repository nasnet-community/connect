import { component$, useSignal, useTask$, $ } from "@builder.io/qwik";
import { SkeletonText, SkeletonAvatar } from "../index";

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  bio: string;
}

export const SkeletonWithData = component$(() => {
  const isLoading = useSignal(true);
  const user = useSignal<User | null>(null);

  // Simulate data loading
  useTask$(async ({ track }) => {
    track(() => isLoading.value);

    if (isLoading.value) {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Set mock data
      user.value = {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: "https://i.pravatar.cc/150?u=john",
        bio: "Software engineer passionate about building great user experiences. Love working with modern web technologies and always eager to learn new things.",
      };

      isLoading.value = false;
    }
  });

  const handleReload = $(() => {
    isLoading.value = true;
    user.value = null;
  });

  return (
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold">User Profile Card</h3>
        <button
          onClick$={handleReload}
          class="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          Reload Data
        </button>
      </div>

      {isLoading.value ? (
        <div class="max-w-md">
          {/* Loading skeleton */}
          <div class="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
            <div class="flex items-start gap-4">
              <SkeletonAvatar size="xl" />
              <div class="flex-1 space-y-3">
                <SkeletonText lines={2} spacing="sm" lastLineWidth="60%" />
              </div>
            </div>
            <div class="mt-6">
              <SkeletonText lines={3} />
            </div>
          </div>
        </div>
      ) : (
        <div class="max-w-md">
          {/* Actual content */}
          <div class="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
            <div class="flex items-start gap-4">
              <img
                src={user.value?.avatar}
                alt={user.value?.name}
                width={56}
                height={56}
                class="h-14 w-14 rounded-full"
              />
              <div class="flex-1">
                <h4 class="text-lg font-semibold">{user.value?.name}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {user.value?.email}
                </p>
              </div>
            </div>
            <div class="mt-6">
              <p class="text-gray-700 dark:text-gray-300">{user.value?.bio}</p>
            </div>
          </div>
        </div>
      )}

      <div class="mt-8">
        <h3 class="mb-4 text-lg font-semibold">List Example</h3>
        <div class="space-y-4">
          {isLoading.value
            ? // Loading skeletons for list items
              Array.from({ length: 3 }, (_, i) => (
                <div
                  key={i}
                  class="flex items-center gap-3 rounded-lg bg-white p-4 dark:bg-gray-800"
                >
                  <SkeletonAvatar size="sm" />
                  <div class="flex-1">
                    <SkeletonText lines={2} spacing="sm" />
                  </div>
                </div>
              ))
            : // Actual list items
              Array.from({ length: 3 }, (_, i) => (
                <div
                  key={i}
                  class="flex items-center gap-3 rounded-lg bg-white p-4 dark:bg-gray-800"
                >
                  <img
                    src={`https://i.pravatar.cc/40?u=${i}`}
                    alt={`User ${i + 1}`}
                    width={32}
                    height={32}
                    class="h-8 w-8 rounded-full"
                  />
                  <div class="flex-1">
                    <p class="font-medium">User {i + 1}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      user{i + 1}@example.com
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
});
