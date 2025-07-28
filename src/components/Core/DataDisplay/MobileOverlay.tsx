import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import type { JSXChildren, QRL } from "@builder.io/qwik";

interface MobileOverlayProps {
  children?: JSXChildren;
  isOpen: boolean;
  onClose$?: QRL<() => void>;
  class?: string;
  backdropBlur?: boolean;
  safeArea?: boolean;
}

/**
 * Mobile overlay component with backdrop blur and safe area support
 */
export const MobileOverlay = component$<MobileOverlayProps>((props) => {
  const {
    children,
    isOpen,
    onClose$,
    class: className = "",
    backdropBlur = true,
    safeArea = true,
  } = props;

  const overlayRef = useSignal<HTMLDivElement>();


  // Prevent body scroll when overlay is open
  useVisibleTask$(({ track }) => {
    track(() => isOpen);

    if (typeof document !== "undefined") {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }

      return () => {
        document.body.style.overflow = "";
      };
    }
  });

  if (!isOpen) return null;

  const overlayClasses = [
    "fixed inset-0 z-modal",
    "flex items-end justify-center",
    "animate-fade-in",
    backdropBlur ? "backdrop-blur-md bg-black/30" : "bg-black/50",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const contentClasses = [
    "w-full max-w-lg",
    "bg-white dark:bg-gray-800",
    "rounded-t-xl",
    "shadow-mobile-nav",
    "animate-slide-up",
    "max-h-[90vh] overflow-y-auto",
    safeArea ? "pb-safe-bottom" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div 
      ref={overlayRef} 
      class={overlayClasses}
      {...(onClose$ && { 
        onClick$: $((event: MouseEvent) => {
          if (event.target === overlayRef.value) {
            onClose$();
          }
        })
      })}
    >
      <div class={contentClasses}>
        {/* Drag handle for visual feedback */}
        <div class="flex justify-center py-3">
          <div class="h-1 w-8 rounded-full bg-gray-300 dark:bg-gray-600" />
        </div>

        {children}
      </div>
    </div>
  );
});
