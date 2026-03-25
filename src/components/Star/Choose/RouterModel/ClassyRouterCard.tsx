import { $, component$, useSignal, useTask$, type QRL } from "@builder.io/qwik";
import { LuInfo } from "@qwikest/icons/lucide";
import { Button } from "~/components/Core";
import { type RouterData } from "./Constants";

interface ClassyRouterCardProps {
  router: RouterData;
  isSelected: boolean;
  selectionStateKey?: string;
  isDisabled?: boolean;
  badge?: string;
  badgeVariant?: "default" | "primary" | "success" | "warning" | "info";
  toggleOnSelect?: boolean;
  onSelect$: QRL<(model: string) => void>;
  onViewDetails$: QRL<(router: RouterData) => void>;
}

export const ClassyRouterCard = component$<ClassyRouterCardProps>((props) => {
  const optimisticSelected = useSignal(props.isSelected);

  useTask$(({ track }) => {
    track(() => props.isSelected);
    track(() => props.selectionStateKey);

    const selectedModels = props.selectionStateKey
      ? props.selectionStateKey.split("|").filter(Boolean)
      : [];

    if (props.toggleOnSelect) {
      optimisticSelected.value = selectedModels.includes(props.router.model);
      return;
    }

    if (props.isSelected) {
      optimisticSelected.value = true;
      return;
    }

    if (selectedModels.length > 0) {
      optimisticSelected.value = selectedModels.includes(props.router.model);
    }
  });

  const handleClick = $(() => {
    if (!props.isDisabled) {
      optimisticSelected.value = props.toggleOnSelect
        ? !optimisticSelected.value
        : true;
      void props.onSelect$(props.router.model);
    }
  });

  const handleDetailsClick = $(() => {
    void props.onViewDetails$(props.router);
  });

  const primaryImage =
    props.router.images?.[0] || "/images/routers/placeholder.png";

  return (
    <div
      class={`
        group relative h-full min-h-[260px] rounded-2xl border backdrop-blur-xl transition-all duration-300
        ${!props.isDisabled ? "cursor-pointer" : "cursor-not-allowed opacity-60"}
        ${
          optimisticSelected.value
            ? "border-primary-500 bg-primary-500/10 ring-2 ring-primary-500"
            : "border-border/50 bg-white/40 hover:bg-primary-500/5 dark:bg-surface-dark/40"
        }
      `}
      onClick$={handleClick}
    >
      <div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {optimisticSelected.value && !props.isDisabled && (
        <div class="pointer-events-none absolute right-4 top-4 z-10 rounded-full bg-success/10 px-2 py-1 text-sm text-success dark:bg-success/20 dark:text-success-light">
          {$localize`Selected`}
        </div>
      )}

      <div class="relative flex h-full flex-col p-5 sm:p-6">
        <div class="bg-surface-secondary/40 dark:bg-surface-dark-secondary/40 flex flex-1 items-center justify-center rounded-xl border border-border/40 p-4 dark:border-border-dark/30">
          <img
            src={primaryImage}
            alt={props.router.title}
            width="256"
            height="256"
            class="max-h-24 max-w-full object-contain sm:max-h-28"
            loading="lazy"
            onError$={(event) => {
              (event.target as HTMLImageElement).src =
                "/images/routers/placeholder.png";
            }}
          />
        </div>

        <div class="mt-4 space-y-2">
          <h3
            class="text-center text-xl font-semibold text-text transition-colors duration-300 group-hover:text-primary-500 dark:text-text-dark-default dark:group-hover:text-primary-400"
            title={props.router.title}
          >
            {props.router.title}
          </h3>
          <p class="text-text-secondary dark:text-text-dark-secondary text-center text-sm">
            {props.router.description}
          </p>
        </div>

        <div class="pt-4">
          <div onClick$={(event) => event.stopPropagation()}>
            <Button
              onClick$={handleDetailsClick}
              disabled={props.isDisabled}
              variant="outline"
              size="sm"
              class={`
                w-full rounded-xl py-2.5 text-sm font-bold transition-all duration-300
                ${
                  optimisticSelected.value
                    ? "border-primary-500/30 bg-primary-500/10 text-primary-700 hover:bg-primary-500/15 dark:text-primary-300"
                    : "border-gray-300/30 bg-white/30 text-gray-700 hover:border-primary-400/40 hover:bg-white/45 hover:text-primary-700 dark:border-gray-600/30 dark:bg-gray-800/30 dark:text-gray-200 dark:hover:text-primary-300"
                }
              `}
            >
              <LuInfo class="mr-2 h-4 w-4" />
              {$localize`View Details`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});
