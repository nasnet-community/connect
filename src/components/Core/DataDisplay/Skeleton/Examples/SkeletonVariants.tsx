import { component$ } from "@builder.io/qwik";
import { Skeleton, SkeletonAvatar, SkeletonCard } from "../index";

export const SkeletonVariants = component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="mb-4 text-lg font-semibold">Animation Variants</h3>
        <div class="space-y-4">
          <div>
            <p class="mb-2 text-sm text-gray-600">Pulse Animation (default)</p>
            <Skeleton width="100%" height={40} animation="pulse" />
          </div>
          <div>
            <p class="mb-2 text-sm text-gray-600">Wave Animation</p>
            <Skeleton width="100%" height={40} animation="wave" />
          </div>
          <div>
            <p class="mb-2 text-sm text-gray-600">No Animation</p>
            <Skeleton width="100%" height={40} animation="none" />
          </div>
        </div>
      </div>

      <div>
        <h3 class="mb-4 text-lg font-semibold">Shape Variants</h3>
        <div class="flex items-center gap-4">
          <div>
            <p class="mb-2 text-sm text-gray-600">Text (default)</p>
            <Skeleton variant="text" width={100} />
          </div>
          <div>
            <p class="mb-2 text-sm text-gray-600">Circular</p>
            <Skeleton variant="circular" width={60} height={60} />
          </div>
          <div>
            <p class="mb-2 text-sm text-gray-600">Rectangular</p>
            <Skeleton variant="rectangular" width={100} height={60} />
          </div>
          <div>
            <p class="mb-2 text-sm text-gray-600">Rounded</p>
            <Skeleton variant="rounded" width={100} height={60} />
          </div>
        </div>
      </div>

      <div>
        <h3 class="mb-4 text-lg font-semibold">Avatar Shapes</h3>
        <div class="flex gap-4">
          <div>
            <p class="mb-2 text-sm text-gray-600">Circle</p>
            <SkeletonAvatar shape="circle" size="lg" />
          </div>
          <div>
            <p class="mb-2 text-sm text-gray-600">Square</p>
            <SkeletonAvatar shape="square" size="lg" />
          </div>
          <div>
            <p class="mb-2 text-sm text-gray-600">Rounded</p>
            <SkeletonAvatar shape="rounded" size="lg" />
          </div>
        </div>
      </div>

      <div>
        <h3 class="mb-4 text-lg font-semibold">Card Variants</h3>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p class="mb-2 text-sm text-gray-600">Full Card</p>
            <SkeletonCard />
          </div>
          <div>
            <p class="mb-2 text-sm text-gray-600">Card without Media</p>
            <SkeletonCard hasMedia={false} />
          </div>
          <div>
            <p class="mb-2 text-sm text-gray-600">Card with Actions</p>
            <SkeletonCard hasActions={true} />
          </div>
          <div>
            <p class="mb-2 text-sm text-gray-600">Simple Card</p>
            <SkeletonCard
              hasMedia={false}
              hasDescription={false}
              hasActions={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
});
