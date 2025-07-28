import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
import type { StatGroupProps } from "./Stat.types";

export const StatGroup = component$<StatGroupProps>((props) => {
  const {
    columns = 3,
    gap = "md",
    responsive = true,
    class: className,
    ...restProps
  } = props;

  useStylesScoped$(`
    .stat-group {
      display: grid;
      width: 100%;
    }

    /* Column layouts */
    .stat-group--1 {
      grid-template-columns: 1fr;
    }

    .stat-group--2 {
      grid-template-columns: repeat(2, 1fr);
    }

    .stat-group--3 {
      grid-template-columns: repeat(3, 1fr);
    }

    .stat-group--4 {
      grid-template-columns: repeat(4, 1fr);
    }

    .stat-group--5 {
      grid-template-columns: repeat(5, 1fr);
    }

    .stat-group--6 {
      grid-template-columns: repeat(6, 1fr);
    }

    /* Gap variants */
    .stat-group--gap-sm {
      gap: var(--spacing-2);
    }

    .stat-group--gap-md {
      gap: var(--spacing-4);
    }

    .stat-group--gap-lg {
      gap: var(--spacing-6);
    }

    /* Responsive breakpoints */
    .stat-group--responsive {
      grid-template-columns: 1fr;
    }

    @media (min-width: 640px) {
      .stat-group--responsive.stat-group--2,
      .stat-group--responsive.stat-group--3,
      .stat-group--responsive.stat-group--4,
      .stat-group--responsive.stat-group--5,
      .stat-group--responsive.stat-group--6 {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 768px) {
      .stat-group--responsive.stat-group--3,
      .stat-group--responsive.stat-group--4,
      .stat-group--responsive.stat-group--5,
      .stat-group--responsive.stat-group--6 {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (min-width: 1024px) {
      .stat-group--responsive.stat-group--4 {
        grid-template-columns: repeat(4, 1fr);
      }

      .stat-group--responsive.stat-group--5 {
        grid-template-columns: repeat(5, 1fr);
      }

      .stat-group--responsive.stat-group--6 {
        grid-template-columns: repeat(6, 1fr);
      }
    }

    /* Divider styles for bordered stats */
    .stat-group > .stat--bordered:not(:last-child) {
      position: relative;
    }

    .stat-group > .stat--bordered:not(:last-child)::after {
      content: "";
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(50%, -50%);
      width: 1px;
      height: 60%;
      background: var(--border-color);
      opacity: 0.5;
    }

    /* Remove divider on last item in row */
    @media (min-width: 640px) {
      .stat-group--responsive.stat-group--2 > .stat--bordered:nth-child(2n)::after,
      .stat-group--responsive.stat-group--3 > .stat--bordered:nth-child(2n)::after,
      .stat-group--responsive.stat-group--4 > .stat--bordered:nth-child(2n)::after,
      .stat-group--responsive.stat-group--5 > .stat--bordered:nth-child(2n)::after,
      .stat-group--responsive.stat-group--6 > .stat--bordered:nth-child(2n)::after {
        display: none;
      }
    }

    @media (min-width: 768px) {
      .stat-group--responsive.stat-group--3 > .stat--bordered:nth-child(3n)::after,
      .stat-group--responsive.stat-group--4 > .stat--bordered:nth-child(3n)::after,
      .stat-group--responsive.stat-group--5 > .stat--bordered:nth-child(3n)::after,
      .stat-group--responsive.stat-group--6 > .stat--bordered:nth-child(3n)::after {
        display: none;
      }
    }

    @media (min-width: 1024px) {
      .stat-group--responsive.stat-group--4 > .stat--bordered:nth-child(4n)::after {
        display: none;
      }

      .stat-group--responsive.stat-group--5 > .stat--bordered:nth-child(5n)::after {
        display: none;
      }

      .stat-group--responsive.stat-group--6 > .stat--bordered:nth-child(6n)::after {
        display: none;
      }
    }

    /* Dark mode */
    @media (prefers-color-scheme: dark) {
      .stat-group > .stat--bordered:not(:last-child)::after {
        background: var(--dark-border-color);
      }
    }
  `);

  const classes = [
    "stat-group",
    `stat-group--${columns}`,
    `stat-group--gap-${gap}`,
    responsive && "stat-group--responsive",
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
