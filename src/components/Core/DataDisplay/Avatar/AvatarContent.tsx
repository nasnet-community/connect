import { component$ } from "@builder.io/qwik";
import type { AvatarProps } from "./Avatar.types";
import type { Signal, QRL } from "@builder.io/qwik";

export interface AvatarContentProps {
  props: AvatarProps;
  imageLoaded: Signal<boolean>;
  imageError: Signal<boolean>;
  handleImageLoad$: QRL<() => void>;
  handleImageError$: QRL<() => void>;
  statusClasses: string;
  statusPositionClasses: string;
  statusSize: string;
}

export const AvatarContent = component$<AvatarContentProps>((props) => {
  const {
    props: avatarProps,
    imageLoaded,
    imageError,
    handleImageLoad$,
    handleImageError$,
    statusClasses,
    statusPositionClasses,
    statusSize,
  } = props;

  const {
    variant = "image",
    src,
    alt = "Avatar",
    initials,
    status = "none",
    size = "md",
    loading = false,
    icon,
  } = avatarProps;

  // Get dimensions based on size for accessibility and performance
  const getDimensions = (size: string) => {
    const dimensionMap = {
      xs: { width: 24, height: 24 },
      sm: { width: 32, height: 32 },
      md: { width: 40, height: 40 },
      lg: { width: 48, height: 48 },
      xl: { width: 64, height: 64 },
      "2xl": { width: 80, height: 80 },
    };
    return dimensionMap[size as keyof typeof dimensionMap];
  };

  const { width, height } = getDimensions(size);

  // Get display content based on variant and loading state
  if (loading) {
    return null;
  }

  return (
    <>
      {variant === "image" && src && !imageError.value ? (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          class={`h-full w-full object-cover ${!imageLoaded.value ? "hidden" : ""}`}
          onLoad$={handleImageLoad$}
          onError$={handleImageError$}
        />
      ) : variant === "initials" ||
        (variant === "image" && (!src || imageError.value) && initials) ? (
        <span class="text-center font-medium">
          {initials?.substring(0, 2).toUpperCase()}
        </span>
      ) : (
        <span
          class={`flex items-center justify-center ${
            size === "xs"
              ? "h-3 w-3"
              : size === "sm"
                ? "h-4 w-4"
                : size === "md"
                  ? "h-5 w-5"
                  : size === "lg"
                    ? "h-6 w-6"
                    : size === "xl"
                      ? "h-8 w-8"
                      : "h-10 w-10"
          }`}
        >
          {icon || (
            <div class="h-full w-full">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          )}
        </span>
      )}

      {status !== "none" && (
        <span
          class={`absolute block ${statusSize} ${statusClasses} ${statusPositionClasses} rounded-full ring-2 ring-white dark:ring-gray-800`}
          aria-hidden="true"
        />
      )}

      {variant === "image" &&
        src &&
        !imageLoaded.value &&
        !imageError.value && (
          <div class="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div class="h-1/2 w-1/2 animate-pulse">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </div>
          </div>
        )}
    </>
  );
});
