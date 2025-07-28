import { component$ } from "@builder.io/qwik";
import type { SkeletonCardProps } from "./Skeleton.types";
import { Skeleton } from "./Skeleton";
import { SkeletonText } from "./SkeletonText";

/**
 * SkeletonCard component for displaying card loading placeholders
 */
export const SkeletonCard = component$<SkeletonCardProps>((props) => {
  const {
    hasMedia = true,
    mediaHeight = 200,
    hasTitle = true,
    hasDescription = true,
    descriptionLines = 3,
    hasActions = false,
    animation = "pulse",
    class: className = "",
  } = props;

  const cardClasses = [
    "bg-white",
    "dark:bg-gray-800",
    "rounded-lg",
    "shadow-sm",
    "overflow-hidden",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div class={cardClasses} role="status" aria-label="Loading card">
      {hasMedia && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={mediaHeight}
          animation={animation}
        />
      )}

      <div class="space-y-4 p-6">
        {hasTitle && (
          <Skeleton
            variant="text"
            width="60%"
            height={24}
            animation={animation}
          />
        )}

        {hasDescription && (
          <SkeletonText
            lines={descriptionLines}
            animation={animation}
            spacing="sm"
          />
        )}

        {hasActions && (
          <div class="mt-6 flex gap-3">
            <Skeleton
              variant="rounded"
              width={80}
              height={36}
              animation={animation}
            />
            <Skeleton
              variant="rounded"
              width={80}
              height={36}
              animation={animation}
            />
          </div>
        )}
      </div>
    </div>
  );
});
