import {
  component$,
  useComputed$,
  Slot,
  useContextProvider,
} from "@builder.io/qwik";
import type { PopoverProps } from "./Popover.types";
import { PopoverContext, usePopover } from "./usePopover";
import {
  cn,
  getTouchTargetClasses,
  getSurfaceElevation,
  getResponsiveSizeClasses,
  getAnimationClasses,
} from "../utils/theme";

/**
 * Popover Component - A container that combines trigger and content
 */
export const Popover = component$<PopoverProps>((props) => {
  const {
    size = "md",
    disableAnimation = false,
    zIndex = 1000,
    class: className,
    contentClass,
    triggerClass,
    mobileFullscreen = false,
    touchOptimized = true,
    surfaceElevation = "elevated",
    animationType = "fadeIn",
  } = props;

  const {
    state,
    handleTriggerHover$,
    handleTriggerLeave$,
    handleContentHover$,
    handleContentLeave$,
  } = usePopover(props);

  // Calculate responsive size classes
  const sizeClasses = useComputed$(() => {
    if (mobileFullscreen) {
      return "mobile:w-full mobile:max-w-full mobile:mx-2 tablet:max-w-sm desktop:max-w-md";
    }
    return getResponsiveSizeClasses(size, "dialog");
  });

  // Calculate touch target classes
  const touchClasses = useComputed$(() => {
    return touchOptimized ? getTouchTargetClasses(size) : "";
  });

  // Calculate surface elevation classes
  const surfaceClasses = useComputed$(() => {
    return getSurfaceElevation(surfaceElevation);
  });

  // Calculate animation classes
  const animationClasses = useComputed$(() => {
    return disableAnimation ? "" : getAnimationClasses(animationType);
  });

  // Provide the context for child components
  useContextProvider(PopoverContext, state);

  return (
    <div class={`relative inline-block ${className || ""}`}>
      {/* Trigger */}
      <div
        ref={state.triggerRef}
        class={cn(
          touchOptimized && "touch-manipulation",
          touchClasses.value,
          triggerClass
        )}
        onClick$={props.trigger === "click" ? state.togglePopover : undefined}
        onFocus$={props.trigger === "focus" ? state.openPopover : undefined}
        onBlur$={props.trigger === "focus" ? state.closePopover : undefined}
        onMouseEnter$={handleTriggerHover$}
        onMouseLeave$={handleTriggerLeave$}
        aria-describedby={state.popoverId}
        aria-expanded={state.isOpen.value ? "true" : "false"}
      >
        <Slot name="trigger" />
      </div>

      {/* Content */}
      {state.isOpen.value && (
        <div
          ref={state.contentRef}
          id={state.popoverId}
          role="tooltip"
          aria-label={props.ariaLabel}
          class={cn(
            "absolute rounded-md border p-4",
            `z-[${zIndex}]`,
            surfaceClasses.value,
            sizeClasses.value,
            animationClasses.value,
            mobileFullscreen && "mobile:fixed mobile:inset-x-0 mobile:bottom-0 mobile:top-auto mobile:rounded-t-xl mobile:rounded-b-none",
            contentClass
          )}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
          onMouseEnter$={handleContentHover$}
          onMouseLeave$={handleContentLeave$}
        >
          {props.hasArrow && (
            <div
              ref={state.arrowRef}
              class={cn(
                "absolute h-4 w-4 rotate-45 transform border",
                surfaceClasses.value,
                mobileFullscreen && "mobile:hidden"
              )}
              style={{
                position: "absolute",
              }}
            ></div>
          )}
          <div class="relative z-10">
            <Slot />
          </div>
        </div>
      )}
    </div>
  );
});
