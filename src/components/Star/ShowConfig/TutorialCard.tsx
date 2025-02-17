import { component$ } from "@builder.io/qwik";
import type { PropFunction, QwikJSX } from "@builder.io/qwik";

interface TutorialCardProps {
  title: string;
  description: string;
  icon: QwikJSX.Element;
  onClick$: PropFunction<() => void>;
  iconColor: string;
}

export const TutorialCard = component$<TutorialCardProps>(
  ({ title, description, icon, onClick$, iconColor }) => {
    return (
      <div onClick$={onClick$} class="group cursor-pointer">
        <div class="rounded-lg bg-surface p-6 shadow-md transition-transform hover:-translate-y-1 dark:bg-surface-dark">
          <div class="mb-4 flex items-center">
            <div class={`h-8 w-8 ${iconColor}`}>{icon}</div>
            <h3 class="ml-3 text-xl font-semibold text-text dark:text-text-dark-default">
              {title}
            </h3>
          </div>
          <p class="text-text-secondary dark:text-text-dark-secondary">
            {description}
          </p>
        </div>
      </div>
    );
  },
);
