import { component$ } from "@builder.io/qwik";
import type { ImageProps } from "./Image.types";
import { useImage } from "./hooks/useImage";
import { Spinner } from "../../DataDisplay/Progress/Spinner/Spinner";

/**
 * Enhanced Image component with lazy loading, responsive sizing, and placeholder support
 *
 * @example
 * // Basic usage
 * <Image src="/path/to/image.jpg" alt="Description" />
 *
 * // With lazy loading and placeholder
 * <Image
 *   src="/path/to/image.jpg"
 *   alt="Description"
 *   loading="lazy"
 *   placeholder="skeleton"
 * />
 *
 * // Responsive with srcset
 * <Image
 *   src="/path/to/image.jpg"
 *   alt="Description"
 *   srcset="/path/to/image-480w.jpg 480w, /path/to/image-800w.jpg 800w"
 *   sizes="(max-width: 600px) 480px, 800px"
 * />
 */
export const Image = component$<ImageProps>((props) => {
  const {
    alt,
    class: className = "",
    id,
    width,
    height,
    srcset,
    sizes,
    sources,
    loading = "lazy",
    decoding = "async",
    priority = false,
    placeholder = "skeleton",
    placeholderSrc,
    placeholderContent,
    showSpinner = true,
    spinnerSize = "md",
    fallbackAlt,
    retryOnError = true,
    maxRetries = 3,
    onClick$,
    role,
    ariaLabel,
    ariaDescribedby,
    fetchPriority,
    referrerPolicy,
    crossOrigin,
  } = props;

  const {
    imageState,
    imageRef,
    handleLoad$,
    handleError$,
    retry$,
    containerClasses,
    imageClasses,
    shouldShowPlaceholder,
    shouldShowImage,
  } = useImage(props);

  // Generate picture element if sources are provided
  if (sources && sources.length > 0) {
    return (
      <div class={`${containerClasses} ${className}`} id={id}>
        {shouldShowPlaceholder && renderPlaceholder()}

        <picture class={shouldShowImage ? "" : "absolute inset-0 opacity-0"}>
          {sources.map((source, index) => (
            <source
              key={index}
              srcset={source.src}
              type={source.type}
              media={source.media}
            />
          ))}
          <img
            ref={imageRef}
            src={imageState.currentSrc}
            alt={alt}
            class={imageClasses}
            width={width as any}
            height={height as any}
            loading={priority ? "eager" : loading}
            decoding={decoding}
            onLoad$={handleLoad$}
            onError$={handleError$}
            onClick$={onClick$}
            role={role}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedby}
            fetchPriority={fetchPriority}
            referrerPolicy={referrerPolicy}
            crossOrigin={crossOrigin}
          />
        </picture>
      </div>
    );
  }

  // Regular img element
  return (
    <div class={`${containerClasses} ${className}`} id={id}>
      {shouldShowPlaceholder && renderPlaceholder()}

      <img
        ref={imageRef}
        src={imageState.currentSrc}
        alt={imageState.hasError && fallbackAlt ? fallbackAlt : alt}
        class={`${imageClasses} ${shouldShowImage ? "" : "opacity-0"}`}
        width={width as any}
        height={height as any}
        srcset={srcset}
        sizes={sizes}
        loading={priority ? "eager" : loading}
        decoding={decoding}
        onLoad$={handleLoad$}
        onError$={handleError$}
        onClick$={onClick$}
        role={role}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        fetchPriority={fetchPriority}
        referrerPolicy={referrerPolicy}
        crossOrigin={crossOrigin}
      />

      {imageState.hasError &&
        retryOnError &&
        imageState.retryCount < maxRetries && (
          <div class="absolute inset-0 flex flex-col items-center justify-center bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700">
            <div class="rounded-lg bg-error-surface p-4 text-center">
              <div class="mb-2 text-error text-lg">⚠️</div>
              <p class="mb-3 text-sm text-error-on-surface">
                Failed to load image
              </p>
              <button
                type="button"
                onClick$={retry$}
                class="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 active:bg-primary-800 touch-manipulation motion-safe:hover:scale-105"
              >
                Retry ({imageState.retryCount + 1}/{maxRetries})
              </button>
            </div>
          </div>
        )}
    </div>
  );

  function renderPlaceholder() {
    switch (placeholder) {
      case "skeleton":
        return (
          <div
            class="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700 motion-safe:animate-skeleton"
            aria-hidden="true"
            role="progressbar"
            aria-label="Loading image..."
          />
        );

      case "blur":
        return placeholderSrc ? (
          <img
            src={placeholderSrc}
            alt=""
            class="absolute inset-0 h-full w-full scale-110 object-cover blur-lg filter transition-opacity duration-300"
            aria-hidden="true"
            loading="eager"
            decoding="sync"
          />
        ) : (
          <div
            class="absolute inset-0 bg-surface-secondary dark:bg-surface-dark-secondary"
            aria-hidden="true"
          />
        );

      case "spinner":
        return showSpinner ? (
          <div class="absolute inset-0 flex items-center justify-center bg-surface-light dark:bg-surface-dark">
            <Spinner 
              size={spinnerSize} 
              class="text-primary-600 dark:text-primary-400"
              aria-label="Loading image..."
            />
          </div>
        ) : (
          <div
            class="absolute inset-0 bg-surface-secondary dark:bg-surface-dark-secondary"
            aria-hidden="true"
          />
        );

      case "custom":
        return placeholderContent ? (
          <div 
            class="absolute inset-0 flex items-center justify-center"
            role="progressbar"
            aria-label="Loading image..."
          >
            {placeholderContent}
          </div>
        ) : (
          <div
            class="absolute inset-0 bg-surface-secondary dark:bg-surface-dark-secondary"
            aria-hidden="true"
          />
        );

      default:
        return (
          <div
            class="absolute inset-0 bg-surface-secondary dark:bg-surface-dark-secondary"
            aria-hidden="true"
          />
        );
    }
  }
});
