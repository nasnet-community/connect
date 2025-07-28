import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
import type { StatLabelProps } from "./Stat.types";

export const StatLabel = component$<StatLabelProps>((props) => {
  const { secondary = false, class: className, ...restProps } = props;

  useStylesScoped$(`
    .stat-label {
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      color: var(--text-secondary);
      transition: color 0.2s ease;
    }

    .stat-label--primary {
      font-size: var(--font-size-base);
      color: var(--text-primary);
    }

    /* Size modifiers from parent Stat component */
    .stat--sm .stat-label {
      font-size: var(--font-size-xs);
    }

    .stat--sm .stat-label--primary {
      font-size: var(--font-size-sm);
    }

    .stat--lg .stat-label {
      font-size: var(--font-size-base);
    }

    .stat--lg .stat-label--primary {
      font-size: var(--font-size-lg);
    }

    /* Dark mode */
    @media (prefers-color-scheme: dark) {
      .stat-label {
        color: var(--dark-text-secondary);
      }

      .stat-label--primary {
        color: var(--dark-text-primary);
      }
    }
  `);

  const classes = ["stat-label", !secondary && "stat-label--primary", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div class={classes} {...restProps}>
      <Slot />
    </div>
  );
});
