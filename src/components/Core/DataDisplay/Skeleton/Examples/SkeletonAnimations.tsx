import { component$, useSignal } from "@builder.io/qwik";
import { Skeleton, SkeletonCard, SkeletonAvatar, SkeletonText } from "../index";

export const SkeletonAnimations = component$(() => {
  const animationSpeed = useSignal("normal");

  return (
    <div class="space-y-8">
      {/* Animation Types */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Animation Types
        </h3>
        <div class="grid gap-6 md:grid-cols-3">
          {/* Pulse Animation */}
          <div>
            <h4 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              Pulse Animation
            </h4>
            <div class="space-y-3">
              <Skeleton
                variant="rectangular"
                width="100%"
                height={60}
                animation="pulse"
              />
              <SkeletonText lines={3} animation="pulse" />
              <div class="flex gap-2">
                <SkeletonAvatar size="sm" animation="pulse" />
                <SkeletonAvatar size="sm" animation="pulse" />
                <SkeletonAvatar size="sm" animation="pulse" />
              </div>
            </div>
          </div>

          {/* Wave Animation */}
          <div>
            <h4 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              Wave Animation
            </h4>
            <div class="space-y-3">
              <Skeleton
                variant="rectangular"
                width="100%"
                height={60}
                animation="wave"
              />
              <SkeletonText lines={3} animation="wave" />
              <div class="flex gap-2">
                <SkeletonAvatar size="sm" animation="wave" />
                <SkeletonAvatar size="sm" animation="wave" />
                <SkeletonAvatar size="sm" animation="wave" />
              </div>
            </div>
          </div>

          {/* No Animation */}
          <div>
            <h4 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              No Animation
            </h4>
            <div class="space-y-3">
              <Skeleton
                variant="rectangular"
                width="100%"
                height={60}
                animation="none"
              />
              <SkeletonText lines={3} animation="none" />
              <div class="flex gap-2">
                <SkeletonAvatar size="sm" animation="none" />
                <SkeletonAvatar size="sm" animation="none" />
                <SkeletonAvatar size="sm" animation="none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Speed Control */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Animation Speed Variations
        </h3>
        <div class="mb-4 flex gap-2">
          {["slow", "normal", "fast"].map((speed) => (
            <button
              key={speed}
              onClick$={() => (animationSpeed.value = speed)}
              class={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                animationSpeed.value === speed
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {speed.charAt(0).toUpperCase() + speed.slice(1)}
            </button>
          ))}
        </div>
        <div
          class={`space-y-4 ${
            animationSpeed.value === "slow"
              ? "[&_.animate-pulse]:animate-[pulse_3s_ease-in-out_infinite]"
              : animationSpeed.value === "fast"
                ? "[&_.animate-pulse]:animate-[pulse_0.75s_ease-in-out_infinite]"
                : ""
          }`}
        >
          <SkeletonCard animation="pulse" />
        </div>
      </div>

      {/* Staggered Loading Animation */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Staggered Loading
        </h3>
        <div class="space-y-3">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              class="flex items-center gap-4"
              style={`animation-delay: ${index * 100}ms`}
            >
              <SkeletonAvatar size="md" animation="pulse" />
              <div class="flex-1 space-y-2">
                <Skeleton
                  variant="text"
                  width="40%"
                  height={20}
                  animation="pulse"
                />
                <Skeleton
                  variant="text"
                  width="70%"
                  height={16}
                  animation="pulse"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Complex Loading Patterns */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Complex Loading Patterns
        </h3>
        <div class="grid gap-6 md:grid-cols-2">
          {/* Social Media Post Skeleton */}
          <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <div class="mb-4 flex items-start gap-3">
              <SkeletonAvatar size="md" animation="pulse" />
              <div class="flex-1 space-y-2">
                <Skeleton variant="text" width="30%" height={16} />
                <Skeleton variant="text" width="20%" height={14} />
              </div>
              <Skeleton
                variant="circular"
                width={24}
                height={24}
                animation="pulse"
              />
            </div>
            <SkeletonText lines={3} animation="wave" />
            <Skeleton
              variant="rounded"
              width="100%"
              height={200}
              animation="wave"
              class="mt-4"
            />
            <div class="mt-4 flex gap-4">
              <Skeleton
                variant="text"
                width={60}
                height={20}
                animation="pulse"
              />
              <Skeleton
                variant="text"
                width={60}
                height={20}
                animation="pulse"
              />
              <Skeleton
                variant="text"
                width={60}
                height={20}
                animation="pulse"
              />
            </div>
          </div>

          {/* E-commerce Product Skeleton */}
          <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <Skeleton
              variant="rounded"
              width="100%"
              height={200}
              animation="wave"
            />
            <div class="mt-4 space-y-3">
              <Skeleton
                variant="text"
                width="70%"
                height={24}
                animation="pulse"
              />
              <div class="flex items-center gap-2">
                <Skeleton variant="text" width={80} height={16} />
                <Skeleton variant="text" width={60} height={16} />
              </div>
              <SkeletonText lines={2} spacing="sm" animation="pulse" />
              <div class="flex items-center justify-between pt-2">
                <Skeleton variant="text" width={80} height={28} />
                <Skeleton
                  variant="rounded"
                  width={100}
                  height={36}
                  animation="pulse"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skeleton with Custom Animation */}
      <div>
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Custom Animation Effects
        </h3>
        <div class="space-y-4">
          {/* Breathing effect */}
          <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <h4 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              Breathing Effect
            </h4>
            <div class="space-y-3">
              <div class="h-4 w-full animate-[breathe_4s_ease-in-out_infinite] rounded bg-gray-300 dark:bg-gray-600" />
              <div class="h-4 w-4/5 animate-[breathe_4s_ease-in-out_infinite_0.5s] rounded bg-gray-300 dark:bg-gray-600" />
              <div class="h-4 w-3/5 animate-[breathe_4s_ease-in-out_infinite_1s] rounded bg-gray-300 dark:bg-gray-600" />
            </div>
          </div>

          {/* Progressive reveal */}
          <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <h4 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              Progressive Reveal
            </h4>
            <div class="space-y-3">
              <div class="h-4 w-full animate-[slideIn_0.5s_ease-out] rounded bg-gray-300 dark:bg-gray-600" />
              <div class="h-4 w-4/5 animate-[slideIn_0.5s_ease-out_0.1s_both] rounded bg-gray-300 dark:bg-gray-600" />
              <div class="h-4 w-3/5 animate-[slideIn_0.5s_ease-out_0.2s_both] rounded bg-gray-300 dark:bg-gray-600" />
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes breathe {
            0%, 100% {
              opacity: 0.4;
              transform: scale(1);
            }
            50% {
              opacity: 0.8;
              transform: scale(1.02);
            }
          }
          
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
    </div>
  );
});
