import { component$, Slot } from "@builder.io/qwik";
import type { BadgeProps, BadgeGroupProps } from "./Badge.types";
import { useBadge } from "./hooks/useBadge";
import { BadgeContent } from "./BadgeContent";

/**
 * Badge/Tag component for displaying short status descriptors
 */
export const Badge = component$<BadgeProps>((props) => {
  const {
    variant = "solid",
    size = "md",
    color = "default",
    dismissible = false,
    dot = false,
    dotPosition = "start",
    class: className = "",
    id,
    role = "status",
    disabled = false,
    href,
    target = "_self",
    tooltip,
    startIcon,
    endIcon,
  } = props;

  // Use the badge hook
  const { classes, dotClasses, handleDismiss$ } = useBadge(props, className);

  // Prepare content props
  const contentProps = {
    startIcon,
    endIcon,
    dot,
    dotPosition,
    dotClasses,
    dismissible,
    handleDismiss$,
    disabled,
    size,
    variant,
    color,
    truncate: props.truncate,
  };

  // Render as link if href is provided
  if (href && !disabled) {
    return (
      <a
        href={href}
        target={target}
        class={classes}
        id={id}
        role={role}
        title={tooltip}
      >
        <BadgeContent {...contentProps} />
      </a>
    );
  }

  // Render as standard badge
  return (
    <span class={classes} id={id} role={role} title={tooltip}>
      <BadgeContent {...contentProps} />
    </span>
  );
});
/**
 * BadgeGroup component for grouping multiple badges
 */
export const BadgeGroup = component$<BadgeGroupProps>((props) => {
  const {
    spacing = "md",
    wrap = true,
    align = "start",
    class: className = "",
  } = props;

  // Spacing between badges
  const spacingClasses = {
    sm: "gap-1",
    md: "gap-2",
    lg: "gap-3",
  }[spacing];

  // Alignment classes - using logical alignment
  const alignClasses = {
    start: "justify-start",
    center: "justify-center", 
    end: "justify-end",
  }[align];

  // Combined classes
  const classes = [
    "inline-flex",
    wrap ? "flex-wrap" : "flex-nowrap",
    spacingClasses,
    alignClasses,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div class={classes}>
      <Slot />
    </div>
  );
});
