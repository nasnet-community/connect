import { component$, Slot, useSignal, useVisibleTask$ } from "@builder.io/qwik";

export type FormErrorMessageSize = "sm" | "md" | "lg";

export interface FormErrorMessageProps {
  children?: string;

  message?: string;

  size?: FormErrorMessageSize;

  icon?: any;

  id?: string;

  hasTopMargin?: boolean;

  animate?: boolean;

  role?: string;

  "aria-describedby"?: string;

  class?: string;
}

export const FormErrorMessage = component$<FormErrorMessageProps>(
  ({
    children,
    message,
    size = "md",
    icon,
    id,
    hasTopMargin = true,
    animate = true,
    role = "alert",
    "aria-describedby": ariaDescribedby,
    class: className,
  }) => {
    // If no message or children, don't render anything
    if (!message && !children) return null;

    // Track whether the component is mounted for animation
    const isMounted = useSignal(false);

    // Enhanced size classes with responsive typography
    const sizeClasses = {
      sm: "text-xs mobile:text-xs tablet:text-xs desktop:text-xs",
      md: "text-sm mobile:text-sm tablet:text-sm desktop:text-sm",
      lg: "text-base mobile:text-sm tablet:text-base desktop:text-base",
    }[size];

    // Enhanced margin classes with responsive spacing
    const marginClasses = hasTopMargin ? "mt-1 mobile:mt-1.5 tablet:mt-1" : "";

    // Enhanced animation classes with accessibility considerations
    const animationClasses = animate
      ? `motion-safe:transition-all motion-reduce:transition-none duration-200 ease-in-out ${isMounted.value ? "opacity-100 transform-none" : "opacity-0 -translate-y-1"}`
      : "";

    // Run only on the client to handle animation
    useVisibleTask$(() => {
      // Set mounted to true after component mounts
      setTimeout(() => {
        isMounted.value = true;
      }, 10);

      // Set mounted to false before component unmounts
      return () => {
        isMounted.value = false;
      };
    });

    return (
      <p
        id={id}
        class={[
          // Semantic error colors with proper contrast and accessibility
          "text-error-600 dark:text-error-400",
          // Enhanced error states for better visibility
          "selection:bg-error-100 dark:selection:bg-error-900",
          // Typography and spacing with responsive design
          sizeClasses,
          marginClasses,
          // Animations with accessibility considerations
          animationClasses,
          // Enhanced layout for icons with better alignment
          icon ? "flex items-start gap-1.5 mobile:gap-2 tablet:gap-2" : "block",
          // Improved mobile readability with proper line heights
          "leading-5 mobile:leading-6 tablet:leading-5 desktop:leading-5",
          // Better contrast and readability across devices
          "font-medium mobile:font-medium tablet:font-medium desktop:font-medium",
          // Enhanced error visibility in high contrast mode
          "high-contrast:text-error-700 high-contrast:dark:text-error-300",
          "high-contrast:font-semibold",
          // RTL support with logical properties
          "rtl:text-right ltr:text-left",
          // Touch optimization with adequate target sizes
          "mobile:min-h-[20px] tablet:min-h-[18px] desktop:min-h-[16px]",
          // Improved focus accessibility for screen readers
          "focus-within:outline-none focus-within:ring-2 focus-within:ring-error-500",
          "dark:focus-within:ring-error-400 focus-within:ring-offset-2",
          "dark:focus-within:ring-offset-surface-dark-DEFAULT",
          // Motion preferences for accessibility
          "motion-safe:transition-all motion-safe:duration-200",
          "motion-reduce:transition-none",
          // Additional classes
          className || "",
        ].filter(Boolean).join(" ")}
        role={role}
        aria-describedby={ariaDescribedby}
      >
        {icon && <span class="flex-shrink-0 text-current">{icon}</span>}
        <span>
          {message}
          {children}
          <Slot />
        </span>
      </p>
    );
  },
);
