import { $, component$, type QRL } from "@builder.io/qwik";
import { LuInfo, LuCheck } from "@qwikest/icons/lucide";
import { Button, Badge } from "~/components/Core";
import { type RouterData } from "./Constants";

interface SimpleRouterCardProps {
  router: RouterData;
  isSelected: boolean;
  isDisabled?: boolean;
  badge?: string;
  badgeVariant?: "default" | "primary" | "success" | "warning" | "info";
  onSelect$: QRL<(model: string) => void>;
  onViewDetails$: QRL<(router: RouterData) => void>;
}

export const SimpleRouterCard = component$<SimpleRouterCardProps>((props) => {
  const { 
    router, 
    isSelected, 
    isDisabled = false, 
    badge, 
    badgeVariant = "default", 
    onSelect$,
    onViewDetails$
  } = props;

  const handleClick = $(() => {
    if (!isDisabled) {
      onSelect$(router.model);
    }
  });

  const handleDetailsClick = $((event?: Event) => {
    event?.preventDefault();
    event?.stopPropagation();
    onViewDetails$(router);
  });

  // Get the first image for display
  const primaryImage = router.images?.[0] || "/images/routers/placeholder.png";

  return (
    <div
      class={`
        relative group h-full min-h-[280px] flex flex-col
        rounded-xl border-2 overflow-hidden
        transition-all duration-300 cursor-pointer
        ${!isDisabled ? 'hover:-translate-y-1 hover:shadow-lg' : 'cursor-not-allowed opacity-60'}
        ${isSelected 
          ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/50 shadow-md' 
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-primary-300'
        }
      `}
      onClick$={handleClick}
    >
      {/* Selection indicator */}
      {isSelected && !isDisabled && (
        <div class="absolute top-3 right-3 z-20">
          <div class="flex items-center gap-1 px-2 py-1 rounded-full bg-primary-500 shadow-md">
            <LuCheck class="h-3 w-3 text-white" />
            <span class="text-xs font-semibold text-white">{$localize`Selected`}</span>
          </div>
        </div>
      )}

      {/* Badge */}
      {badge && (
        <div class="absolute top-3 left-3 z-10">
          <Badge
            color={badgeVariant}
            size="sm"
            variant="solid"
          >
            {badge}
          </Badge>
        </div>
      )}

      {/* Router Image */}
      <div class="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div class="w-full h-32 flex items-center justify-center">
          <img
            src={primaryImage}
            alt={router.title}
            class="max-w-full max-h-full object-contain filter hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError$={(event) => {
              // Fallback to placeholder if image fails to load
              (event.target as HTMLImageElement).src = "/images/routers/placeholder.png";
            }}
          />
        </div>
      </div>

      {/* Router Info */}
      <div class="p-4 bg-white dark:bg-gray-900">
        <div class="mb-3">
          <h3 class="font-bold text-gray-900 dark:text-white text-sm leading-tight line-clamp-2" title={router.title}>
            {router.title}
          </h3>
        </div>

        {/* View Details Button */}
        <div 
          onClick$={(event) => {
            event.stopPropagation();
          }}
        >
          <Button
            onClick$={handleDetailsClick}
            disabled={isDisabled}
            variant={isSelected ? "primary" : "outline"}
            size="sm"
            class="w-full text-xs"
          >
            <LuInfo class="h-3 w-3 mr-1" />
            {$localize`View Details`}
          </Button>
        </div>
      </div>
    </div>
  );
});