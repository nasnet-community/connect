import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
import type { StatProps } from "./Stat.types";

export const Stat = component$<StatProps>((props) => {
  const {
    size = "md",
    variant = "default",
    align = "left",
    loading = false,
    animate = false,
    class: className,
    ...restProps
  } = props;

  useStylesScoped$(`
    .stat {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-2);
      transition: all 0.2s ease;
    }

    /* Size variants */
    .stat--sm {
      gap: var(--spacing-1);
    }

    .stat--md {
      gap: var(--spacing-2);
    }

    .stat--lg {
      gap: var(--spacing-3);
    }

    /* Visual variants */
    .stat--default {
      background: transparent;
    }

    .stat--bordered {
      padding: var(--spacing-4);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
    }

    .stat--elevated {
      padding: var(--spacing-4);
      background: var(--bg-secondary);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
    }

    .stat--elevated:hover {
      box-shadow: var(--shadow-md);
    }

    /* Alignment */
    .stat--left {
      align-items: flex-start;
      text-align: left;
    }

    .stat--center {
      align-items: center;
      text-align: center;
    }

    .stat--right {
      align-items: flex-end;
      text-align: right;
    }

    /* Loading state */
    .stat--loading {
      opacity: 0.6;
      pointer-events: none;
    }

    .stat--loading::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      animation: shimmer 2s infinite;
    }

    /* Animation */
    .stat--animate {
      animation: fadeIn 0.3s ease-out;
    }

    @keyframes shimmer {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Dark mode */
    @media (prefers-color-scheme: dark) {
      .stat--bordered {
        border-color: var(--dark-border-color);
      }

      .stat--elevated {
        background: var(--dark-bg-secondary);
      }
    }
  `);

  const statClasses = [
    "stat",
    `stat--${size}`,
    `stat--${variant}`,
    `stat--${align}`,
    loading && "stat--loading",
    animate && "stat--animate",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div class={statClasses} {...restProps}>
      <Slot />
    </div>
  );
});
