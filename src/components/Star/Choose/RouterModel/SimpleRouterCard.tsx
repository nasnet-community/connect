import { $, component$, type QRL } from "@builder.io/qwik";
import { LuInfo, LuCheck } from "@qwikest/icons/lucide";
import { Button, Badge } from "~/components/Core";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";
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
  const locale = useMessageLocale();
  const {
    router,
    isSelected,
    isDisabled = false,
    badge,
    badgeVariant = "default",
    onSelect$,
    onViewDetails$,
  } = props;

  const handleClick = $(() => {
    if (!isDisabled) {
      onSelect$(router.model);
    }
  });

  const handleDetailsClick = $(() => {
    void onViewDetails$(router);
  });

  // Get the first image for display
  const primaryImage = router.images?.[0] || "/images/routers/placeholder.png";

  return (
    <div
      class={`
        group relative flex h-full min-h-[280px] cursor-pointer
        flex-col overflow-hidden rounded-xl
        border-2 transition-all duration-300
        ${!isDisabled ? "hover:-translate-y-1 hover:shadow-lg" : "cursor-not-allowed opacity-60"}
        ${
          isSelected
            ? "border-primary-500 bg-primary-50 shadow-md dark:bg-primary-950/50"
            : "border-gray-200 bg-white hover:border-primary-300 dark:border-gray-700 dark:bg-gray-900"
        }
      `}
      onClick$={handleClick}
    >
      {/* Selection indicator */}
      {isSelected && !isDisabled && (
        <div class="absolute right-3 top-3 z-20">
          <div class="flex items-center gap-1 rounded-full bg-primary-500 px-2 py-1 shadow-md">
            <LuCheck class="h-3 w-3 text-white" />
            <span class="text-xs font-semibold text-white">
              {semanticMessages.star_selection_card_selected({}, { locale })}
            </span>
          </div>
        </div>
      )}

      {/* Badge */}
      {badge && (
        <div class="absolute left-3 top-3 z-10">
          <Badge color={badgeVariant} size="sm" variant="solid">
            {badge}
          </Badge>
        </div>
      )}

      {/* Router Image */}
      <div class="flex flex-1 items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6 dark:from-gray-800 dark:to-gray-900">
        <div class="flex h-32 w-full items-center justify-center">
          <img
            src={primaryImage}
            alt={router.title}
            width="192"
            height="128"
            class="max-h-full max-w-full object-contain filter transition-transform duration-300 hover:scale-105"
            loading="lazy"
            onError$={(event) => {
              // Fallback to placeholder if image fails to load
              (event.target as HTMLImageElement).src =
                "/images/routers/placeholder.png";
            }}
          />
        </div>
      </div>

      {/* Router Info */}
      <div class="bg-white p-4 dark:bg-gray-900">
        <div class="mb-3">
          <h3
            class="line-clamp-2 text-sm font-bold leading-tight text-gray-900 dark:text-white"
            title={router.title}
          >
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
            <LuInfo class="mr-1 h-3 w-3" />
            {semanticMessages.router_view_details({}, { locale })}
          </Button>
        </div>
      </div>
    </div>
  );
});
