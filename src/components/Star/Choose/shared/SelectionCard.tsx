import { $, component$, type JSXOutput, type PropFunction } from "@builder.io/qwik";

export interface SelectionCardProps {
  value: any;
  isSelected: boolean;
  icon: JSXOutput;
  title: string;
  description: string;
  features: string[];
  footer?: JSXOutput;
  onSelect$: PropFunction<(value: any) => void>;
  disabled?: boolean;
  orientation?: "vertical" | "horizontal";
  media?: JSXOutput;
  class?: string;
  bodyClass?: string;
  mediaClass?: string;
  headingClass?: string;
  featureTextClass?: string;
  overflowVisible?: boolean;
  ignoreClickWithin?: string[];
}

export const SelectionCard = component$((props: SelectionCardProps) => {
  const {
    value,
    isSelected,
    icon,
    title,
    description,
    features,
    footer,
    onSelect$,
    disabled = false,
    orientation = "vertical",
    media,
    class: className,
    bodyClass,
    mediaClass,
    headingClass,
    featureTextClass,
    overflowVisible = false,
    ignoreClickWithin = [],
  } = props;

  const handleClick$ = $((event: Event) => {
    if (disabled) return;

    const target = event.target as HTMLElement | null;
    if (target) {
      for (const selector of ignoreClickWithin) {
        if (target.closest(selector)) {
          return;
        }
      }
    }

    onSelect$(value);
  });

  const rootClasses = [
    "selection-card group relative rounded-2xl border backdrop-blur-xl transition-all duration-300",
    overflowVisible ? "overflow-visible" : "overflow-hidden",
    disabled ? "selection-card-disabled cursor-not-allowed opacity-60" : "cursor-pointer",
    isSelected
      ? "border-primary-500 bg-primary-500/10 ring-2 ring-primary-500"
      : "border-border/50 bg-white/40 hover:bg-primary-500/5 dark:bg-surface-dark/40",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const titleClasses = [
    "text-2xl font-semibold text-text transition-colors duration-300 dark:text-text-dark-default",
    disabled ? "" : "group-hover:text-primary-500 dark:group-hover:text-primary-400",
    headingClass,
  ]
    .filter(Boolean)
    .join(" ");

  const contentClasses =
    orientation === "horizontal"
      ? "flex-1 space-y-6"
      : "space-y-6";

  const bodyClasses = [
    orientation === "horizontal"
      ? "flex flex-col gap-8 p-8 md:flex-row md:items-start"
      : "space-y-6 p-8",
    bodyClass,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div onClick$={handleClick$} class={rootClasses}>
      <div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div class="relative">
        {disabled ? (
          <div class="pointer-events-none absolute right-4 top-4 z-10">
            <span class="rounded-full bg-warning/10 px-2 py-1 text-sm text-warning dark:text-warning-light">
              {$localize`Coming Soon`}
            </span>
          </div>
        ) : (
          isSelected && (
            <div class="pointer-events-none absolute right-4 top-4 z-10 rounded-full bg-success/10 px-2 py-1 text-sm text-success dark:bg-success/20 dark:text-success-light">
              {$localize`Selected`}
            </div>
          )
        )}

        <div class={bodyClasses}>
          <div class={contentClasses}>
            <div class="selection-card-icon flex h-16 w-16 items-center justify-center rounded-xl bg-primary-500/10 text-primary-500 transition-transform duration-300 dark:bg-primary-500/5 dark:text-primary-400">
              {icon}
            </div>

            <div class="space-y-4">
              <div>
                <h3 class={titleClasses}>{title}</h3>
                <p class="mt-3 text-text-secondary dark:text-text-dark-secondary">
                  {description}
                </p>
              </div>

              <div class="space-y-3">
                {features.map((feature) => (
                  <div
                    key={feature}
                    class="flex items-center text-text-secondary dark:text-text-dark-secondary"
                  >
                    <svg
                      class="mr-3 h-5 w-5 text-primary-500 dark:text-primary-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span class={featureTextClass}>{feature}</span>
                  </div>
                ))}
              </div>

              {footer}
            </div>
          </div>

          {media && (
            <div class={orientation === "horizontal" ? `flex-1 ${mediaClass || ""}` : mediaClass || "pt-6"}>
              <div class="selection-card-media relative z-auto overflow-visible">
                {media}
              </div>
            </div>
          )}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={`
          .selection-card:not(.selection-card-disabled):hover:not(:has(.topology-container:hover)) {
            transform: scale(1.01);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }

          .selection-card:not(.selection-card-disabled):hover:not(:has(.topology-container:hover)) .selection-card-icon {
            transform: scale(1.08);
          }
        `}
      />
    </div>
  );
});
