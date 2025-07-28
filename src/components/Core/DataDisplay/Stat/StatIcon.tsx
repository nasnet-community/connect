import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
import type { StatIconProps } from "./Stat.types";

export const StatIcon = component$<StatIconProps>((props) => {
  const {
    position = "top",
    size = "md",
    class: className,
    ...restProps
  } = props;

  useStylesScoped$(`
    .stat-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-secondary);
      transition: all 0.2s ease;
    }

    /* Size variants */
    .stat-icon--sm {
      width: 24px;
      height: 24px;
      font-size: var(--font-size-sm);
    }

    .stat-icon--md {
      width: 32px;
      height: 32px;
      font-size: var(--font-size-base);
    }

    .stat-icon--lg {
      width: 40px;
      height: 40px;
      font-size: var(--font-size-lg);
    }

    /* Position modifiers */
    .stat-icon--top {
      margin-bottom: var(--spacing-2);
    }

    .stat-icon--left {
      margin-right: var(--spacing-2);
    }

    .stat-icon--right {
      margin-left: var(--spacing-2);
    }

    /* When inside elevated variant */
    .stat--elevated .stat-icon {
      background: var(--bg-primary);
      border-radius: var(--radius-sm);
      padding: var(--spacing-2);
    }

    /* Inherit size from parent if not specified */
    .stat--sm .stat-icon:not(.stat-icon--md):not(.stat-icon--lg) {
      width: 24px;
      height: 24px;
      font-size: var(--font-size-sm);
    }

    .stat--lg .stat-icon:not(.stat-icon--sm):not(.stat-icon--md) {
      width: 40px;
      height: 40px;
      font-size: var(--font-size-lg);
    }

    /* Icon wrapper for proper alignment */
    .stat-icon svg {
      width: 100%;
      height: 100%;
    }

    /* Hover effect */
    .stat:hover .stat-icon {
      color: var(--text-primary);
      transform: scale(1.05);
    }

    /* Dark mode */
    @media (prefers-color-scheme: dark) {
      .stat-icon {
        color: var(--dark-text-secondary);
      }

      .stat--elevated .stat-icon {
        background: var(--dark-bg-primary);
      }

      .stat:hover .stat-icon {
        color: var(--dark-text-primary);
      }
    }
  `);

  const classes = [
    "stat-icon",
    `stat-icon--${size}`,
    `stat-icon--${position}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div class={classes} {...restProps}>
      <Slot />
    </div>
  );
});
