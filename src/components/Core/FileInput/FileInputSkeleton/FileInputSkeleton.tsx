import { component$ } from "@builder.io/qwik";
import type { FileInputSkeletonProps } from "../types";

/**
 * FileInputSkeleton Component
 * 
 * Displays a loading skeleton for file input components during data fetching
 * or processing operations. Supports different variants for simple and advanced layouts.
 */
export const FileInputSkeleton = component$<FileInputSkeletonProps>(({
  variant = "simple",
  animate = true,
  lines = 4,
}) => {
  const animationClass = animate ? "animate-pulse" : "";
  
  // Simple variant - ConfigFileInput skeleton
  if (variant === "simple") {
    return (
      <div class={`space-y-4 ${animationClass}`}>
        {/* Textarea skeleton */}
        <div class="relative">
          <div class="h-32 w-full rounded-lg bg-gray-200 dark:bg-gray-700 sm:h-40 lg:h-48">
            {/* Lines inside textarea */}
            <div class="p-4 space-y-2">
              {Array.from({ length: lines }).map((_, index) => (
                <div
                  key={index}
                  class="h-3 rounded bg-gray-300 dark:bg-gray-600"
                  style={{
                    width: `${Math.random() * 40 + 60}%`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Buttons skeleton */}
        <div class="flex gap-2 sm:gap-3">
          <div class="h-10 w-24 rounded-lg bg-gray-300 dark:bg-gray-600 sm:w-28" />
          <div class="h-10 w-24 rounded-lg bg-gray-300 dark:bg-gray-600 sm:w-28" />
        </div>
      </div>
    );
  }
  
  // Advanced variant - VPNConfigFileSection skeleton
  return (
    <div class={`rounded-lg border border-gray-200 bg-surface-light p-4 dark:border-gray-700 dark:bg-surface-dark sm:p-6 ${animationClass}`}>
      {/* Header skeleton */}
      <div class="mb-4">
        <div class="h-6 w-48 rounded bg-gray-300 dark:bg-gray-600" />
        <div class="mt-2 h-4 w-full max-w-md rounded bg-gray-200 dark:bg-gray-700" />
      </div>
      
      <div class="flex flex-col gap-4 tablet:flex-row tablet:gap-6">
        {/* Textarea with label skeleton */}
        <div class="flex-1">
          <div class="mb-2 h-4 w-24 rounded bg-gray-300 dark:bg-gray-600" />
          <div class="relative h-48 w-full rounded-lg bg-gray-200 dark:bg-gray-700">
            {/* Drop zone overlay skeleton */}
            <div class="absolute inset-0 flex items-center justify-center opacity-50">
              <div class="text-center">
                <div class="mx-auto mb-3 h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-600" />
                <div class="mx-auto h-4 w-40 rounded bg-gray-300 dark:bg-gray-600" />
                <div class="mx-auto mt-2 h-3 w-24 rounded bg-gray-300 dark:bg-gray-600" />
              </div>
            </div>
            
            {/* Lines inside textarea */}
            <div class="p-4 space-y-2">
              {Array.from({ length: lines }).map((_, index) => (
                <div
                  key={index}
                  class="h-3 rounded bg-gray-300 dark:bg-gray-600"
                  style={{
                    width: `${Math.random() * 30 + 70}%`,
                    opacity: 0.5,
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Helper text skeleton */}
          <div class="mt-2 h-3 w-64 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        
        {/* Action buttons skeleton */}
        <div class="flex gap-2 mobile:w-full tablet:w-auto tablet:flex-col tablet:gap-3">
          <div class="h-10 flex-1 rounded-lg bg-gray-300 dark:bg-gray-600 tablet:flex-initial tablet:w-32" />
          <div class="h-10 flex-1 rounded-lg bg-gray-300 dark:bg-gray-600 tablet:flex-initial tablet:w-32" />
        </div>
      </div>
    </div>
  );
});