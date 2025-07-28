import { component$ } from "@builder.io/qwik";
import type { ProgressBarProps } from "./ProgressBar.types";
import { useProgressBar } from "./useProgressBar";

/**
 * ProgressBar component for displaying progress of a task or process
 */
export const ProgressBar = component$<ProgressBarProps>((props) => {
  const {
    normalizedValue,
    normalizedBuffer,
    formattedValue,
    heightClasses,
    bgColorClasses,
    bufferColorClasses,
    variantClasses,
    shapeClasses,
    animationClasses,
    valueLabelClasses,
    valueLabelSizeClasses,
    min,
    max,
    value,
    indeterminate,
    showValue,
    valuePosition,
    fullWidth,
    className,
    ariaLabel,
  } = useProgressBar(props);

  return (
    <div class={`relative ${fullWidth ? "w-full" : "w-auto"} ${className}`}>
      <ProgressBarContainer
        heightClasses={heightClasses}
        bgColorClasses={bgColorClasses}
        shapeClasses={shapeClasses}
        min={min}
        max={max}
        value={value}
        ariaLabel={ariaLabel}
        formattedValue={formattedValue}
        indeterminate={indeterminate}
      >
        {/* Buffer bar */}
        {normalizedBuffer !== undefined && (
          <BufferBar
            bufferColorClasses={bufferColorClasses}
            width={normalizedBuffer}
          />
        )}

        {/* Progress bar */}
        <ProgressTrack
          variantClasses={variantClasses}
          animationClasses={animationClasses}
          width={normalizedValue}
          indeterminate={indeterminate}
        >
          {/* Value label inside the progress bar */}
          {showValue && valuePosition === "inside" && normalizedValue > 10 && (
            <ValueLabel
              labelClasses={valueLabelClasses}
              sizeClasses={valueLabelSizeClasses}
              value={formattedValue}
            />
          )}
        </ProgressTrack>

        {/* Center value label */}
        {showValue && valuePosition === "center" && (
          <ValueLabel
            labelClasses={valueLabelClasses}
            sizeClasses={valueLabelSizeClasses}
            value={formattedValue}
          />
        )}

        {/* Custom content inside the progress bar */}
        {props.children}
      </ProgressBarContainer>

      {/* Right-aligned value label */}
      {showValue && valuePosition === "right" && (
        <ValueLabel
          labelClasses={valueLabelClasses}
          sizeClasses={valueLabelSizeClasses}
          value={formattedValue}
        />
      )}
    </div>
  );
});

// Progress container component
const ProgressBarContainer = component$<{
  heightClasses: string;
  bgColorClasses: string;
  shapeClasses: string;
  min: number;
  max: number;
  value: number;
  ariaLabel?: string;
  formattedValue: string;
  indeterminate: boolean;
  children?: any;
}>((props) => {
  const {
    heightClasses,
    bgColorClasses,
    shapeClasses,
    min,
    max,
    value,
    ariaLabel,
    formattedValue,
    indeterminate,
    children,
  } = props;

  return (
    <div
      class={`relative ${heightClasses} ${bgColorClasses} overflow-hidden ${shapeClasses}`}
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : value}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-label={ariaLabel}
      aria-valuetext={formattedValue}
      aria-busy={indeterminate}
    >
      {children}
    </div>
  );
});

// Buffer bar component
const BufferBar = component$<{
  bufferColorClasses: string;
  width: number;
}>((props) => {
  const { bufferColorClasses, width } = props;

  return (
    <div
      class={`transition-width absolute left-0 top-0 h-full ${bufferColorClasses}`}
      style={{ width: `${width}%` }}
    />
  );
});

// Progress track component
const ProgressTrack = component$<{
  variantClasses: string;
  animationClasses: string;
  width: number;
  indeterminate: boolean;
  children?: any;
}>((props) => {
  const { variantClasses, animationClasses, width, indeterminate, children } =
    props;

  return (
    <div
      class={`transition-width h-full ${variantClasses} ${animationClasses}`}
      style={{
        width: indeterminate ? "40%" : `${width}%`,
      }}
    >
      {children}
    </div>
  );
});

// Value label component
const ValueLabel = component$<{
  labelClasses: string;
  sizeClasses: string;
  value: string;
}>((props) => {
  const { labelClasses, sizeClasses, value } = props;

  return <span class={`${labelClasses} ${sizeClasses}`}>{value}</span>;
});
