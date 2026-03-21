import { $, component$, useSignal, useTask$, type QRL } from "@builder.io/qwik";
import { LuInfo } from "@qwikest/icons/lucide";
import { Button } from "~/components/Core";
import { type RouterData } from "./Constants";

interface ClassyRouterCardProps {
  router: RouterData;
  isSelected: boolean;
  isDisabled?: boolean;
  badge?: string;
  badgeVariant?: "default" | "primary" | "success" | "warning" | "info";
  toggleOnSelect?: boolean;
  onSelect$: QRL<(model: string) => void>;
  onViewDetails$: QRL<(router: RouterData) => void>;
}

export const ClassyRouterCard = component$<ClassyRouterCardProps>((props) => {
  const { 
    router, 
    isSelected, 
    isDisabled = false, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    badge, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    badgeVariant = "default", 
    toggleOnSelect = false,
    onSelect$,
    onViewDetails$
  } = props;

  const optimisticSelected = useSignal(isSelected);

  useTask$(({ track }) => {
    track(() => isSelected);
    optimisticSelected.value = isSelected;
  });

  const handleClick = $(async () => {
    if (!isDisabled) {
      optimisticSelected.value = toggleOnSelect ? !optimisticSelected.value : true;
      await onSelect$(router.model);
    }
  });

  const handleDetailsClick = $(async (event?: Event) => {
    event?.preventDefault();
    event?.stopPropagation();
    await onViewDetails$(router);
  });

  const primaryImage = router.images?.[0] || "/images/routers/placeholder.png";

  return (
    <div
      class={`
        group relative h-full min-h-[260px] rounded-2xl border backdrop-blur-xl transition-all duration-300
        ${!isDisabled ? "cursor-pointer" : "cursor-not-allowed opacity-60"}
        ${
          optimisticSelected.value
            ? "border-primary-500 bg-primary-500/10 ring-2 ring-primary-500"
            : "border-border/50 bg-white/40 hover:bg-primary-500/5 dark:bg-surface-dark/40"
        }
      `}
      onClick$={handleClick}
    >
      <div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {optimisticSelected.value && !isDisabled && (
        <div class="pointer-events-none absolute right-4 top-4 z-10 rounded-full bg-success/10 px-2 py-1 text-sm text-success dark:bg-success/20 dark:text-success-light">
          {$localize`Selected`}
        </div>
      )}

      <div class="relative flex h-full flex-col p-5 sm:p-6">
        <div class="flex flex-1 items-center justify-center rounded-xl border border-border/40 bg-surface-secondary/40 p-4 dark:border-border-dark/30 dark:bg-surface-dark-secondary/40">
          <img
            src={primaryImage}
            alt={router.title}
            class="max-h-24 max-w-full object-contain sm:max-h-28"
            loading="lazy"
            onError$={(event) => {
              (event.target as HTMLImageElement).src = "/images/routers/placeholder.png";
            }}
          />
        </div>

        <div class="mt-4 space-y-2">
          <h3
            class="text-center text-xl font-semibold text-text transition-colors duration-300 dark:text-text-dark-default group-hover:text-primary-500 dark:group-hover:text-primary-400"
            title={router.title}
          >
            {router.title}
          </h3>
          <p class="text-center text-sm text-text-secondary dark:text-text-dark-secondary">
            {router.description}
          </p>
        </div>

        <div class="pt-4">
          <div onClick$={(event) => event.stopPropagation()}>
            <Button
              onClick$={handleDetailsClick}
              disabled={isDisabled}
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
