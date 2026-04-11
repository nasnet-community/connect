import { component$ } from "@builder.io/qwik";

export interface AdvancedSummaryBannerProps {
  title: string;
  description?: string;
  class?: string;
}

export const AdvancedSummaryBanner = component$<AdvancedSummaryBannerProps>(
  ({ title, description, class: className }) => {
    const classes = [
      "relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 px-6 py-5 text-white md:px-7 md:py-6",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div class={classes}>
        <div class="relative z-10 max-w-3xl">
          <h2 class="text-2xl font-bold tracking-tight md:text-[2rem]">
            {title}
          </h2>
          {description && (
            <p class="mt-1 text-sm text-primary-100 md:text-base">
              {description}
            </p>
          )}
        </div>

        <div class="absolute inset-0 opacity-5">
          <div class="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white"></div>
          <div class="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white"></div>
        </div>
      </div>
    );
  },
);
