import { component$, Slot } from "@builder.io/qwik";
import type { JSXChildren, QRL } from "@builder.io/qwik";
import { HiXMarkSolid } from "@qwikest/icons/heroicons";

export interface BadgeContentProps {
  startIcon?: JSXChildren;
  endIcon?: JSXChildren;
  dot?: boolean;
  dotPosition?: "start" | "end";
  dotClasses?: string;
  dismissible?: boolean;
  handleDismiss$?: QRL<() => void>;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "soft" | "outline";
  color?: string;
  truncate?: boolean;
}

export const BadgeContent = component$<BadgeContentProps>((props) => {
  const {
    startIcon,
    endIcon,
    dot = false,
    dotPosition = "start",
    dotClasses = "",
    dismissible = false,
    handleDismiss$,
    disabled = false,
    size = "md",
    variant = "solid",
    color = "default",
    truncate = false,
  } = props;

  return (
    <>
      {dot && dotPosition === "start" && (
        <span
          class={`me-1.5 inline-block h-1.5 w-1.5 rounded-full ${dotClasses}`}
          aria-hidden="true"
        />
      )}

      {startIcon && (
        <span
          class={`me-1 ${size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm"}`}
        >
          {startIcon}
        </span>
      )}

      <span class={truncate ? "truncate" : ""}>
        <Slot />
      </span>

      {endIcon && (
        <span
          class={`ms-1 ${size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm"}`}
        >
          {endIcon}
        </span>
      )}

      {dot && dotPosition === "end" && (
        <span
          class={`ms-1.5 inline-block h-1.5 w-1.5 rounded-full ${dotClasses}`}
          aria-hidden="true"
        />
      )}

      {dismissible && (
        <button
          type="button"
          class={`ms-1 inline-flex items-center justify-center rounded-full p-0.5 
                 ${size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm"}
                 hover:bg-black/10 focus:outline-none
                 focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent dark:hover:bg-white/10
                 ${
                   variant === "solid"
                     ? "focus:ring-white/30"
                     : `focus:ring-${color === "default" ? "gray" : color}-500/50`
                 }`}
          onClick$={handleDismiss$}
          disabled={disabled}
          aria-label="Remove"
        >
          <HiXMarkSolid class="h-3 w-3" />
        </button>
      )}
    </>
  );
});
