import { $, component$, type QRL } from "@builder.io/qwik";
import { 
  LuRouter, 
  LuWifi, 
  LuInfo, 
  LuCheck, 
  LuCpu,
  LuMemoryStick
} from "@qwikest/icons/lucide";
import { Badge } from "~/components/Core";
import { type RouterData } from "./Constants";
import { RouterCardCapabilities } from "./RouterCardCapabilities";

interface RouterCardProps {
  router: RouterData;
  isSelected: boolean;
  isDisabled?: boolean;
  badge?: string;
  badgeVariant?: "default" | "primary" | "success" | "warning" | "info";
  onSelect$: QRL<(model: string) => void>;
  onViewDetails$: QRL<(router: RouterData) => void>;
}

export const RouterCard = component$<RouterCardProps>((props) => {
  const { 
    router, 
    isSelected, 
    isDisabled = false, 
    badge, 
    badgeVariant = "default", 
    onSelect$,
    onViewDetails$
  } = props;

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "wifi":
        return <LuWifi class="h-4 w-4" />;
      case "router":
        return <LuRouter class="h-4 w-4" />;
      default:
        return <LuRouter class="h-4 w-4" />;
    }
  };

  const handleClick = $(() => {
    if (!isDisabled) {
      onSelect$(router.model);
    }
  });

  const handleDetailsClick = $((event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    onViewDetails$(router);
  });

  return (
    <div
      class={`
        relative group h-full min-h-[220px] flex flex-col
        rounded-xl overflow-hidden
        transition-all duration-300
        ${!isDisabled ? 'cursor-pointer hover:-translate-y-1 hover:scale-[1.02]' : 'cursor-not-allowed opacity-60'}
        ${isSelected 
          ? 'ring-2 ring-primary-500/60 shadow-lg shadow-primary-500/20' 
          : 'shadow-md hover:shadow-lg'
        }
      `}
      onClick$={handleClick}
    >
      {/* Simple background */}
      <div class={`
        absolute inset-0 
        ${isSelected 
          ? 'bg-gradient-to-br from-primary-50 to-white dark:from-primary-950 dark:to-gray-900' 
          : 'bg-white dark:bg-gray-900'
        }
      `} />
      
      {/* Content container */}
      <div class="relative flex flex-col h-full p-4">
        {/* Badges */}
        <div class="absolute right-3 top-3 z-10 flex flex-col gap-1">
          {badge && (
            <Badge
              color={badgeVariant}
              size="sm"
              variant="solid"
            >
              {badge}
            </Badge>
          )}
          {isSelected && !isDisabled && (
            <div class="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500 shadow-md">
              <LuCheck class="h-3 w-3 text-white" />
              <span class="text-xs font-semibold text-white">{$localize`Selected`}</span>
            </div>
          )}
        </div>

        {/* Header with icon and title */}
        <div class="mb-3">
          <div class="flex items-start gap-3">
            {/* Icon container */}
            <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 shadow-md">
              <div class="text-white">
                {getIcon(router.icon)}
              </div>
            </div>
            
            {/* Title and description */}
            <div class="flex-1">
              <h3 class="text-base font-bold text-gray-900 dark:text-white mb-1 leading-tight break-words" title={router.title}>
                {router.title}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {router.description}
              </p>
            </div>
          </div>
        </div>


        {/* Key Specs - Compact display */}
        <div class="mb-3 grid grid-cols-2 gap-2 text-xs">
          <div class="flex items-center gap-1">
            <LuCpu class="h-3 w-3 text-blue-500" />
            <span class="text-gray-600 dark:text-gray-400 truncate">{router.specs.CPU}</span>
          </div>
          <div class="flex items-center gap-1">
            <LuMemoryStick class="h-3 w-3 text-purple-500" />
            <span class="text-gray-600 dark:text-gray-400 truncate">{router.specs.RAM}</span>
          </div>
        </div>


        {/* Capabilities */}
        <div class="mb-3">
          <RouterCardCapabilities router={router} compact={true} />
        </div>


        {/* Action button */}
        <div 
          class="mt-auto"
          onClick$={(event) => {
            event.stopPropagation();
          }}
        >
          <button
            type="button"
            onClick$={handleDetailsClick}
            disabled={isDisabled}
            class={`
              w-full rounded-lg px-3 py-2 font-medium text-sm
              transition-colors duration-200
              ${isSelected 
                ? 'bg-primary-500 text-white hover:bg-primary-600' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-500 hover:text-white'
              }
              flex items-center justify-center gap-2
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            <LuInfo class="h-3 w-3" />
            <span>{$localize`View Details`}</span>
          </button>
        </div>
      </div>

    </div>
  );
});