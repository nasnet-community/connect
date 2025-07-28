import { component$ } from "@builder.io/qwik";
import { Skeleton, SkeletonAvatar, SkeletonText } from "../index";

export const SkeletonSizes = component$(() => {
  const sizes = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;
  const avatarValidSizes = ["xs", "sm", "md", "lg", "xl"] as const;
  const avatarSizes = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 56,
    "2xl": 64,
  };

  return (
    <div class="space-y-8">
      {/* Rectangular Skeletons with different sizes */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Rectangular Skeleton Sizes
        </h3>
        <div class="space-y-4">
          {sizes.map((size) => (
            <div key={size} class="flex items-center gap-4">
              <span class="w-12 text-sm font-medium text-gray-600 dark:text-gray-400">
                {size.toUpperCase()}
              </span>
              <Skeleton
                variant="rectangular"
                width={`${avatarSizes[size] * 4}px`}
                height={`${avatarSizes[size]}px`}
                animation="pulse"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Avatar Skeletons with different sizes */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Avatar Skeleton Sizes
        </h3>
        <div class="flex flex-wrap items-end gap-4">
          {avatarValidSizes.map((size) => (
            <div key={size} class="flex flex-col items-center gap-2">
              <SkeletonAvatar size={size} shape="circle" />
              <span class="text-xs text-gray-600 dark:text-gray-400">
                {size}
              </span>
            </div>
          ))}
          <div class="flex flex-col items-center gap-2">
            <SkeletonAvatar size={64} shape="circle" />
            <span class="text-xs text-gray-600 dark:text-gray-400">
              2xl (64px)
            </span>
          </div>
        </div>
      </div>

      {/* Text Skeletons with different line heights */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Text Skeleton with Different Spacing
        </h3>
        <div class="grid gap-6 md:grid-cols-3">
          <div>
            <h4 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Small Spacing
            </h4>
            <SkeletonText lines={3} spacing="sm" />
          </div>
          <div>
            <h4 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Medium Spacing
            </h4>
            <SkeletonText lines={3} spacing="md" />
          </div>
          <div>
            <h4 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Large Spacing
            </h4>
            <SkeletonText lines={3} spacing="lg" />
          </div>
        </div>
      </div>

      {/* Custom sized skeletons */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Custom Sized Skeletons
        </h3>
        <div class="space-y-4">
          <Skeleton
            variant="rounded"
            width="100%"
            height="200px"
            animation="wave"
            aria-label="Large content placeholder"
          />
          <div class="flex gap-4">
            <Skeleton
              variant="circular"
              width={80}
              height={80}
              animation="pulse"
              aria-label="Profile picture placeholder"
            />
            <div class="flex-1 space-y-2">
              <Skeleton variant="text" width="60%" height={24} />
              <Skeleton variant="text" width="100%" height={16} />
              <Skeleton variant="text" width="80%" height={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
