import { component$, useStylesScoped$ } from "@builder.io/qwik";
import type { StatTrendProps } from "./Stat.types";

export const StatTrend = component$<StatTrendProps>((props) => {
  const {
    value,
    direction,
    showIcon = true,
    format = "percent",
    decimals = 1,
    label,
    class: className,
    ...restProps
  } = props;

  const actualDirection = direction || (value >= 0 ? "up" : "down");
  const isPositive = actualDirection === "up";
  const isNeutral = actualDirection === "neutral";

  useStylesScoped$(`
    .stat-trend {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-1);
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      padding: var(--spacing-1) var(--spacing-2);
      border-radius: var(--radius-sm);
      transition: all 0.2s ease;
    }

    /* Direction variants */
    .stat-trend--up {
      color: var(--color-success);
      background: rgba(34, 197, 94, 0.1);
    }

    .stat-trend--down {
      color: var(--color-error);
      background: rgba(239, 68, 68, 0.1);
    }

    .stat-trend--neutral {
      color: var(--text-secondary);
      background: var(--bg-secondary);
    }

    /* Icon */
    .stat-trend__icon {
      display: inline-flex;
      width: 12px;
      height: 12px;
    }

    .stat-trend__icon svg {
      width: 100%;
      height: 100%;
    }

    /* Arrow icons */
    .stat-trend__icon--up::before {
      content: "▲";
      font-size: 10px;
    }

    .stat-trend__icon--down::before {
      content: "▼";
      font-size: 10px;
    }

    .stat-trend__icon--neutral::before {
      content: "—";
      font-size: 12px;
    }

    /* Value */
    .stat-trend__value {
      font-variant-numeric: tabular-nums;
    }

    /* Label */
    .stat-trend__label {
      color: var(--text-secondary);
      font-weight: var(--font-weight-normal);
    }

    /* Size modifiers from parent */
    .stat--sm .stat-trend {
      font-size: var(--font-size-xs);
      padding: 2px var(--spacing-1);
    }

    .stat--lg .stat-trend {
      font-size: var(--font-size-base);
      padding: var(--spacing-1) var(--spacing-3);
    }

    /* Hover effect */
    .stat-trend:hover {
      transform: scale(1.05);
    }

    /* Dark mode */
    @media (prefers-color-scheme: dark) {
      .stat-trend--up {
        background: rgba(34, 197, 94, 0.15);
      }

      .stat-trend--down {
        background: rgba(239, 68, 68, 0.15);
      }

      .stat-trend--neutral {
        background: var(--dark-bg-secondary);
      }

      .stat-trend__label {
        color: var(--dark-text-secondary);
      }
    }
  `);

  const formatValue = (val: number): string => {
    const absValue = Math.abs(val);
    if (format === "percent") {
      return `${absValue.toFixed(decimals)}%`;
    }
    return absValue.toFixed(decimals);
  };

  const classes = ["stat-trend", `stat-trend--${actualDirection}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div class={classes} {...restProps}>
      {showIcon && (
        <span
          class={`stat-trend__icon stat-trend__icon--${actualDirection}`}
          aria-hidden="true"
        />
      )}
      <span class="stat-trend__value">
        {!isNeutral && (isPositive ? "+" : "")}
        {formatValue(value)}
      </span>
      {label && <span class="stat-trend__label">{label}</span>}
    </div>
  );
});
