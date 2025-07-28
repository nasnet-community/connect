import { component$ } from "@builder.io/qwik";
import type { SpinnerProps } from "./Spinner.types";
import { useSpinner } from "./useSpinner";

/**
 * Spinner component for indicating loading states
 */
export const Spinner = component$<SpinnerProps>((props) => {
  const {
    sizeClasses,
    colorClasses,
    labelPositionClasses,
    labelSpacingClasses,
    animationDuration,
    centeredClass,
    variant,
    showLabel,
    label,
    labelClass,
    className,
    ariaLabel,
    speed,
  } = useSpinner(props);

  return (
    <div class={`inline-flex ${labelPositionClasses} ${centeredClass}`}>
      {renderSpinnerVariant(variant, {
        sizeClasses,
        colorClasses,
        animationDuration,
        className,
        ariaLabel,
        speed,
      })}

      {showLabel && (
        <SpinnerLabel
          spacingClass={labelSpacingClasses}
          labelClass={labelClass}
          label={label}
        />
      )}
    </div>
  );
});

// Spinner Label component
const SpinnerLabel = component$<{
  spacingClass: string;
  labelClass: string;
  label: string;
}>((props) => {
  const { spacingClass, labelClass, label } = props;

  return <span class={`${spacingClass} ${labelClass}`}>{label}</span>;
});

// Border spinner component
const BorderSpinner = component$<{
  sizeClasses: string;
  colorClasses: string;
  animationDuration: string;
  className: string;
  ariaLabel: string;
}>((props) => {
  const { sizeClasses, colorClasses, animationDuration, className, ariaLabel } =
    props;

  return (
    <div
      class={`inline-block animate-spin rounded-full ${sizeClasses} ${colorClasses} ${className}`}
      style={{ animationDuration }}
      role="status"
      aria-label={ariaLabel}
    />
  );
});

// Grow spinner component
const GrowSpinner = component$<{
  sizeClasses: string;
  colorClasses: string;
  animationDuration: string;
  className: string;
  ariaLabel: string;
}>((props) => {
  const { sizeClasses, colorClasses, animationDuration, className, ariaLabel } =
    props;

  return (
    <div
      class={`inline-block animate-pulse rounded-full ${sizeClasses} ${colorClasses} ${className}`}
      style={{ animationDuration }}
      role="status"
      aria-label={ariaLabel}
    />
  );
});

// Dots spinner component
const DotsSpinner = component$<{
  sizeClasses: string;
  colorClasses: string;
  animationDuration: string;
  className: string;
  ariaLabel: string;
  speed: number;
}>((props) => {
  const {
    sizeClasses,
    colorClasses,
    animationDuration,
    className,
    ariaLabel,
    speed,
  } = props;

  return (
    <div
      class={`inline-flex space-x-1.5 ${sizeClasses} ${colorClasses} ${className}`}
      role="status"
      aria-label={ariaLabel}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          class="h-2 w-2 animate-bounce rounded-full bg-current"
          style={{
            animationDuration,
            animationDelay: `${i * (speed / 3)}ms`,
          }}
        />
      ))}
    </div>
  );
});

// Bars spinner component
const BarsSpinner = component$<{
  sizeClasses: string;
  colorClasses: string;
  animationDuration: string;
  className: string;
  ariaLabel: string;
  speed: number;
}>((props) => {
  const {
    sizeClasses,
    colorClasses,
    animationDuration,
    className,
    ariaLabel,
    speed,
  } = props;

  return (
    <div
      class={`inline-flex items-end space-x-1 ${sizeClasses} ${colorClasses} ${className}`}
      role="status"
      aria-label={ariaLabel}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          class="animate-grow-y w-1.5 rounded-t-sm bg-current"
          style={{
            height: "100%",
            animationDuration,
            animationDelay: `${i * (speed / 5)}ms`,
          }}
        />
      ))}
    </div>
  );
});

// Circle spinner component
const CircleSpinner = component$<{
  sizeClasses: string;
  colorClasses: string;
  animationDuration: string;
  className: string;
  ariaLabel: string;
}>((props) => {
  const { sizeClasses, colorClasses, animationDuration, className, ariaLabel } =
    props;

  return (
    <svg
      class={`animate-spin ${sizeClasses} ${colorClasses} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      style={{ animationDuration }}
      role="status"
      aria-label={ariaLabel}
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
});

// Helper function to render the appropriate spinner variant
function renderSpinnerVariant(variant: string, props: any) {
  switch (variant) {
    case "border":
      return <BorderSpinner {...props} />;
    case "grow":
      return <GrowSpinner {...props} />;
    case "dots":
      return <DotsSpinner {...props} />;
    case "bars":
      return <BarsSpinner {...props} />;
    case "circle":
      return <CircleSpinner {...props} />;
    default:
      return <BorderSpinner {...props} />;
  }
}
