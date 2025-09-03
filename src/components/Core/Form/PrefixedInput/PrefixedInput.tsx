import { component$, $, useSignal, useId } from "@builder.io/qwik";
import type { PrefixedInputProps, VariantConfig, AnimationConfig } from "./PrefixedInput.types";

/**
 * PrefixedInput - Modern, professional input component with integrated prefix design
 * 
 * Features multiple visual variants, smooth animations, and interactive elements.
 * Supports glass morphism, gradients, and elevated designs for modern UIs.
 * 
 * @example
 * <PrefixedInput
 *   prefix="wg-server-"
 *   value="main"
 *   onChange$={handleChange}
 *   variant="glass"
 *   animate={true}
 *   label="Interface Name"
 *   placeholder="Enter name"
 * />
 */
export const PrefixedInput = component$<PrefixedInputProps>(({
  // Core props
  prefix,
  value = "",
  onChange$,
  label,
  placeholder = "",
  disabled = false,
  required = false,
  errorMessage,
  helperText,
  
  // Modern design props
  variant = "default",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  prefixVariant = "solid",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  color = "default",
  size = "md",
  animate = true,
  animationType = "smooth",
  
  // Interactive features
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  showTooltip = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  tooltipText,
  copyable = false,
  prefixIcon,
  
  // Accessibility
  id: propId,
  name,
  "aria-describedby": ariaDescribedBy,
  "data-testid": dataTestId,
  
  // Styling
  class: className,
  prefixClass,
  containerClass,
  
  // Events
  onFocus$,
  onBlur$,
  onInput$,
  
  ...otherProps
}) => {
  
  const autoId = useId();
  const inputId = propId || `prefixed-input-${autoId}`;
  const isFocused = useSignal(false);
  const isHovered = useSignal(false);

  // Size configurations
  const sizeConfigs = {
    sm: {
      container: "min-h-[2rem]",
      prefix: "px-2.5 py-1.5 text-xs",
      input: "px-2.5 py-1.5 text-xs pl-0",
      label: "text-xs",
      helper: "text-xs mt-1",
      prefixWidth: "min-w-[3rem]"
    },
    md: {
      container: "min-h-[2.5rem]",
      prefix: "px-3 py-2 text-sm",
      input: "px-3 py-2 text-sm pl-0",
      label: "text-sm",
      helper: "text-sm mt-1.5",
      prefixWidth: "min-w-[4rem]"
    },
    lg: {
      container: "min-h-[3rem]",
      prefix: "px-4 py-2.5 text-base",
      input: "px-4 py-2.5 text-base pl-0",
      label: "text-base",
      helper: "text-sm mt-2",
      prefixWidth: "min-w-[5rem]"
    }
  };

  const sizeConfig = sizeConfigs[size];

  // Modern variant configurations
  const variantConfigs: Record<string, VariantConfig> = {
    default: {
      container: [
        "bg-white dark:bg-gray-800",
        "border border-gray-300 dark:border-gray-600",
        "shadow-sm hover:shadow-md",
        "focus-within:shadow-lg focus-within:border-primary-500",
        "dark:focus-within:border-primary-400",
      ].join(" "),
      prefix: [
        "bg-gray-50 dark:bg-gray-900/50",
        "border-r border-gray-300 dark:border-gray-600",
        "text-gray-700 dark:text-gray-300",
      ].join(" "),
      input: [
        "bg-transparent",
        "text-gray-900 dark:text-gray-100",
        "placeholder-gray-500 dark:placeholder-gray-400",
      ].join(" "),
      focus: "ring-2 ring-primary-500/20 dark:ring-primary-400/20",
      hover: "border-gray-400 dark:border-gray-500"
    },
    
    elevated: {
      container: [
        "bg-white dark:bg-gray-800",
        "border border-gray-200 dark:border-gray-700",
        "shadow-lg hover:shadow-xl",
        "focus-within:shadow-2xl focus-within:border-primary-500",
        "dark:focus-within:border-primary-400",
        "transform hover:-translate-y-0.5",
      ].join(" "),
      prefix: [
        "bg-gradient-to-r from-gray-50 to-gray-100",
        "dark:from-gray-900/80 dark:to-gray-800/80",
        "border-r border-gray-300 dark:border-gray-600",
        "text-gray-800 dark:text-gray-200 font-semibold",
      ].join(" "),
      input: [
        "bg-transparent",
        "text-gray-900 dark:text-gray-100",
        "placeholder-gray-500 dark:placeholder-gray-400",
      ].join(" "),
      focus: "ring-4 ring-primary-500/30 dark:ring-primary-400/30",
      hover: "border-primary-300 dark:border-primary-600"
    },
    
    glass: {
      container: [
        "bg-white/80 dark:bg-gray-800/80",
        "backdrop-blur-lg",
        "border border-white/30 dark:border-gray-700/50",
        "shadow-xl shadow-gray-500/10 dark:shadow-gray-900/30",
        "focus-within:bg-white/90 dark:focus-within:bg-gray-800/90",
        "focus-within:border-primary-400/50",
      ].join(" "),
      prefix: [
        "bg-white/50 dark:bg-gray-900/50",
        "backdrop-blur-sm",
        "border-r border-white/30 dark:border-gray-600/50",
        "text-gray-800 dark:text-gray-200",
      ].join(" "),
      input: [
        "bg-transparent",
        "text-gray-900 dark:text-gray-100",
        "placeholder-gray-600 dark:placeholder-gray-400",
      ].join(" "),
      focus: "ring-2 ring-white/40 dark:ring-gray-400/40",
      hover: "bg-white/85 dark:bg-gray-800/85"
    },
    
    gradient: {
      container: [
        "bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700",
        "dark:from-primary-600 dark:via-primary-700 dark:to-primary-800",
        "border border-transparent",
        "shadow-lg shadow-primary-500/30 dark:shadow-primary-900/30",
        "focus-within:shadow-xl focus-within:shadow-primary-500/40",
        "p-[1px]", // For inner border effect
      ].join(" "),
      prefix: [
        "bg-white/90 dark:bg-gray-800/90",
        "border-r border-primary-300/50 dark:border-primary-600/50",
        "text-primary-700 dark:text-primary-300 font-semibold",
        "backdrop-blur-sm",
      ].join(" "),
      input: [
        "bg-white dark:bg-gray-800",
        "text-gray-900 dark:text-gray-100",
        "placeholder-primary-600/60 dark:placeholder-primary-400/60",
      ].join(" "),
      focus: "ring-2 ring-primary-300/50 dark:ring-primary-500/50",
      hover: "shadow-primary-500/40 dark:shadow-primary-700/40"
    },
    
    bordered: {
      container: [
        "bg-transparent",
        "border-2 border-gray-300 dark:border-gray-600",
        "focus-within:border-primary-500 dark:focus-within:border-primary-400",
        "hover:border-gray-400 dark:hover:border-gray-500",
      ].join(" "),
      prefix: [
        "bg-transparent",
        "border-r-2 border-gray-300 dark:border-gray-600",
        "text-gray-700 dark:text-gray-300 font-medium",
      ].join(" "),
      input: [
        "bg-transparent",
        "text-gray-900 dark:text-gray-100",
        "placeholder-gray-500 dark:placeholder-gray-400",
      ].join(" "),
      focus: "border-primary-500 dark:border-primary-400",
      hover: "border-gray-400 dark:border-gray-500"
    },
    
    minimal: {
      container: [
        "bg-transparent",
        "border-b-2 border-gray-300 dark:border-gray-600",
        "focus-within:border-primary-500 dark:focus-within:border-primary-400",
        "rounded-none",
      ].join(" "),
      prefix: [
        "bg-transparent",
        "border-r border-gray-300 dark:border-gray-600",
        "text-gray-600 dark:text-gray-400",
      ].join(" "),
      input: [
        "bg-transparent",
        "text-gray-900 dark:text-gray-100",
        "placeholder-gray-500 dark:placeholder-gray-400",
      ].join(" "),
      focus: "border-primary-500 dark:border-primary-400",
      hover: "border-gray-400 dark:border-gray-500"
    }
  };

  // Animation configurations
  const animationConfigs: Record<string, AnimationConfig> = {
    subtle: {
      transition: "transition-all duration-200 ease-in-out",
      focus: "transform scale-[1.02]",
      hover: "transform scale-[1.01]",
      loading: "animate-pulse"
    },
    smooth: {
      transition: "transition-all duration-300 ease-out",
      focus: "transform scale-[1.02] rotate-0",
      hover: "transform scale-[1.01]",
      loading: "animate-bounce"
    },
    energetic: {
      transition: "transition-all duration-150 ease-in-out",
      focus: "transform scale-[1.03] rotate-1",
      hover: "transform scale-[1.02]",
      loading: "animate-spin"
    }
  };

  const variantConfig = variantConfigs[variant];
  const animationConfig = animate ? animationConfigs[animationType] : { transition: "", focus: "", hover: "", loading: "" };

  // Event handlers
  const handleFocus$ = $((event: FocusEvent) => {
    isFocused.value = true;
    onFocus$?.(event);
  });

  const handleBlur$ = $((event: FocusEvent) => {
    isFocused.value = false;
    onBlur$?.(event);
  });

  const handleInput$ = $((event: Event) => {
    const target = event.target as HTMLInputElement;
    onChange$?.(event, target.value);
    onInput$?.(event, target.value);
  });

  const handleMouseEnter$ = $(() => {
    isHovered.value = true;
  });

  const handleMouseLeave$ = $(() => {
    isHovered.value = false;
  });

  // Copy functionality
  const handleCopy$ = $(() => {
    if (copyable && value) {
      const fullValue = `${prefix}${value}`;
      navigator.clipboard.writeText(fullValue);
    }
  });

  // Dynamic classes
  const containerClasses = [
    // Base structure
    "relative flex items-stretch rounded-lg overflow-hidden",
    sizeConfig.container,
    
    // Variant styles
    variantConfig.container,
    
    // Animation
    animationConfig.transition,
    
    // States
    isFocused.value ? variantConfig.focus : "",
    isHovered.value ? variantConfig.hover : "",
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-text",
    
    // Custom classes
    containerClass,
  ].filter(Boolean).join(" ");

  const prefixClasses = [
    // Base structure
    "flex items-center justify-center font-mono select-none shrink-0",
    sizeConfig.prefix,
    sizeConfig.prefixWidth,
    
    // Variant styles
    variantConfig.prefix,
    
    // Custom classes
    prefixClass,
  ].filter(Boolean).join(" ");

  const inputClasses = [
    // Base structure
    "flex-1 outline-none border-0 focus:outline-none focus:ring-0",
    sizeConfig.input,
    
    // Variant styles
    variantConfig.input,
    
    // Custom classes
    className,
  ].filter(Boolean).join(" ");

  return (
    <div class="space-y-2">
      {/* Label */}
      {label && (
        <label 
          for={inputId}
          class={`block font-medium ${sizeConfig.label} text-gray-900 dark:text-gray-100`}
        >
          {label}
          {required && <span class="ml-1 text-error-500">*</span>}
        </label>
      )}

      {/* Main Container */}
      <div 
        class={containerClasses}
        onMouseEnter$={handleMouseEnter$}
        onMouseLeave$={handleMouseLeave$}
        data-testid={dataTestId}
      >
        {/* Prefix Section */}
        <div class={prefixClasses}>
          {prefixIcon && <span class="mr-1">{prefixIcon}</span>}
          {prefix}
        </div>
        
        {/* Input Section */}
        <input
          id={inputId}
          name={name}
          type="text"
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-describedby={ariaDescribedBy}
          class={inputClasses}
          onFocus$={handleFocus$}
          onBlur$={handleBlur$}
          onInput$={handleInput$}
          {...otherProps}
        />
        
        {/* Copy Button */}
        {copyable && value && (
          <button
            type="button"
            class="px-3 text-xs font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            onClick$={handleCopy$}
            title="Copy full value"
          >
            Copy
          </button>
        )}
      </div>

      {/* Helper Text / Error */}
      {(helperText || errorMessage) && (
        <div class={sizeConfig.helper}>
          {errorMessage ? (
            <p class="text-error-600 dark:text-error-400">{errorMessage}</p>
          ) : (
            <p class="text-gray-500 dark:text-gray-400">{helperText}</p>
          )}
        </div>
      )}
    </div>
  );
});