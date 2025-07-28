import { component$ } from "@builder.io/qwik";
import { APIReferenceTemplate } from "~/components/Docs/templates/APIReferenceTemplate";
import type { PropDetail } from "~/components/Docs/templates/APIReferenceTemplate";

export default component$(() => {
  const statProps: PropDetail[] = [
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: "Controls the overall size of the stat component.",
    },
    {
      name: "variant",
      type: "'default' | 'bordered' | 'elevated'",
      defaultValue: "'default'",
      description: "Visual style variant of the stat component.",
    },
    {
      name: "align",
      type: "'left' | 'center' | 'right'",
      defaultValue: "'left'",
      description: "Text alignment within the stat component.",
    },
    {
      name: "loading",
      type: "boolean",
      defaultValue: "false",
      description: "Shows loading skeleton state when true.",
    },
    {
      name: "animate",
      type: "boolean",
      defaultValue: "false",
      description: "Enables animation effects for child components.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the stat container.",
    },
  ];

  const statNumberProps: PropDetail[] = [
    {
      name: "value",
      type: "number | string",
      required: true,
      description: "The numeric value to display.",
    },
    {
      name: "format",
      type: "'number' | 'currency' | 'percent' | 'custom'",
      defaultValue: "'number'",
      description: "Formatting style for the number display.",
    },
    {
      name: "decimals",
      type: "number",
      defaultValue: "0",
      description: "Number of decimal places to display.",
    },
    {
      name: "prefix",
      type: "string",
      description: "Text to display before the number.",
    },
    {
      name: "suffix",
      type: "string",
      description: "Text to display after the number.",
    },
    {
      name: "locale",
      type: "string",
      defaultValue: "'en-US'",
      description: "Locale for number formatting.",
    },
    {
      name: "currency",
      type: "string",
      defaultValue: "'USD'",
      description: "Currency code when format is 'currency'.",
    },
    {
      name: "animate",
      type: "boolean",
      defaultValue: "false",
      description: "Enables count-up animation for the number.",
    },
    {
      name: "animationDuration",
      type: "number",
      defaultValue: "2000",
      description: "Duration of count-up animation in milliseconds.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes for the number element.",
    },
  ];

  const statLabelProps: PropDetail[] = [
    {
      name: "secondary",
      type: "boolean",
      defaultValue: "false",
      description: "Applies secondary text styling to the label.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes for the label element.",
    },
  ];

  const statIconProps: PropDetail[] = [
    {
      name: "position",
      type: "'left' | 'right' | 'top'",
      defaultValue: "'left'",
      description: "Position of the icon relative to stat content.",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "Inherited from parent Stat",
      description: "Size of the icon container.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes for the icon container.",
    },
  ];

  const statTrendProps: PropDetail[] = [
    {
      name: "value",
      type: "number",
      required: true,
      description: "The trend value (positive or negative).",
    },
    {
      name: "direction",
      type: "'up' | 'down' | 'neutral'",
      defaultValue: "Calculated from value",
      description: "Explicit trend direction override.",
    },
    {
      name: "showIcon",
      type: "boolean",
      defaultValue: "true",
      description: "Shows trend direction icon when true.",
    },
    {
      name: "format",
      type: "'percent' | 'number'",
      defaultValue: "'percent'",
      description: "Formatting style for the trend value.",
    },
    {
      name: "decimals",
      type: "number",
      defaultValue: "1",
      description: "Number of decimal places to display.",
    },
    {
      name: "label",
      type: "string",
      description: "Additional label text for the trend.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes for the trend element.",
    },
  ];

  const statGroupProps: PropDetail[] = [
    {
      name: "columns",
      type: "1 | 2 | 3 | 4 | 5 | 6",
      defaultValue: "3",
      description: "Number of columns in the stat group grid.",
    },
    {
      name: "gap",
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: "Gap size between stat items.",
    },
    {
      name: "responsive",
      type: "boolean",
      defaultValue: "true",
      description: "Enables responsive column behavior on smaller screens.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes for the group container.",
    },
  ];

  const cssVariables: Array<{
    name: string;
    defaultValue?: string;
    description: string;
  }> = [
    {
      name: "--stat-bg",
      description: "Background color of the stat component.",
    },
    {
      name: "--stat-border",
      description: "Border color for bordered variant.",
    },
    {
      name: "--stat-shadow",
      description: "Box shadow for elevated variant.",
    },
    {
      name: "--stat-number-color",
      description: "Color of the stat number.",
    },
    {
      name: "--stat-label-color",
      description: "Color of the stat label.",
    },
    {
      name: "--stat-trend-up",
      description: "Color for positive trends.",
    },
    {
      name: "--stat-trend-down",
      description: "Color for negative trends.",
    },
    {
      name: "--stat-trend-neutral",
      description: "Color for neutral trends.",
    },
  ];

  return (
    <div class="space-y-12">
      <section>
        <h2 class="mb-4 text-2xl font-bold">Stat Component API</h2>
        <APIReferenceTemplate props={statProps} cssVariables={cssVariables} />
      </section>

      <section>
        <h2 class="mb-4 text-2xl font-bold">StatNumber API</h2>
        <APIReferenceTemplate props={statNumberProps} />
      </section>

      <section>
        <h2 class="mb-4 text-2xl font-bold">StatLabel API</h2>
        <APIReferenceTemplate props={statLabelProps} />
      </section>

      <section>
        <h2 class="mb-4 text-2xl font-bold">StatIcon API</h2>
        <APIReferenceTemplate props={statIconProps} />
      </section>

      <section>
        <h2 class="mb-4 text-2xl font-bold">StatTrend API</h2>
        <APIReferenceTemplate props={statTrendProps} />
      </section>

      <section>
        <h2 class="mb-4 text-2xl font-bold">StatGroup API</h2>
        <APIReferenceTemplate props={statGroupProps} />
      </section>

      <section>
        <h3 class="mb-3 text-lg font-semibold">Hooks</h3>
        <div class="space-y-4">
          <div>
            <h4 class="mb-2 font-mono text-sm font-semibold">useStat</h4>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              Hook for managing stat component state and number
              formatting/animation.
            </p>
            <pre class="mt-2 rounded bg-gray-100 p-3 text-sm dark:bg-gray-800">
              {`const { formattedValue, animatedValue } = useStat({
  format: "currency",
  decimals: 2,
  currency: "USD",
  animate: true,
  animationDuration: 2000,
});`}
            </pre>
          </div>

          <div>
            <h4 class="mb-2 font-mono text-sm font-semibold">useStatGroup</h4>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              Hook for managing stat group layout and responsive behavior.
            </p>
            <pre class="mt-2 rounded bg-gray-100 p-3 text-sm dark:bg-gray-800">
              {`const { gridClass, itemClass } = useStatGroup({
  columns: 4,
  gap: "md",
  responsive: true,
});`}
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-3 text-lg font-semibold">Accessibility</h3>
        <ul class="list-inside list-disc space-y-2 text-sm">
          <li>
            Stat components use semantic HTML elements for proper structure.
          </li>
          <li>
            Numbers are announced correctly to screen readers with proper
            formatting.
          </li>
          <li>Loading states are communicated through aria-busy attributes.</li>
          <li>Trend indicators include aria-label for directional context.</li>
          <li>
            Animation can be disabled for users who prefer reduced motion.
          </li>
        </ul>
      </section>
    </div>
  );
});
