import { component$ } from "@builder.io/qwik";
import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard } from "../index";

export const BasicSkeleton = component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="mb-4 text-lg font-semibold">Basic Skeleton</h3>
        <Skeleton width="100%" height={40} />
      </div>

      <div>
        <h3 class="mb-4 text-lg font-semibold">Text Skeleton</h3>
        <SkeletonText lines={4} />
      </div>

      <div>
        <h3 class="mb-4 text-lg font-semibold">Avatar Skeleton</h3>
        <div class="flex gap-4">
          <SkeletonAvatar size="sm" />
          <SkeletonAvatar size="md" />
          <SkeletonAvatar size="lg" />
        </div>
      </div>

      <div>
        <h3 class="mb-4 text-lg font-semibold">Card Skeleton</h3>
        <SkeletonCard />
      </div>
    </div>
  );
});
