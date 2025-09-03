import { $, component$, type QRL } from "@builder.io/qwik";
import { LuInfo, LuCheck, LuRouter, LuWifi } from "@qwikest/icons/lucide";
import { Button } from "~/components/Core";
import { type RouterData } from "./Constants";

interface ClassyRouterCardProps {
  router: RouterData;
  isSelected: boolean;
  isDisabled?: boolean;
  badge?: string;
  badgeVariant?: "default" | "primary" | "success" | "warning" | "info";
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

  const primaryImage = router.images?.[0] || "/images/routers/placeholder.png";

  const _getIcon = (iconType: string) => {
    switch (iconType) {
      case "wifi":
        return <LuWifi class="h-4 w-4" />;
      case "router":
        return <LuRouter class="h-4 w-4" />;
      default:
        return <LuRouter class="h-4 w-4" />;
    }
  };

  return (
    <div
      class={`
        group relative h-full min-h-[320px] cursor-pointer
        transition-all duration-300 ease-out
        ${!isDisabled ? '' : 'cursor-not-allowed opacity-60'}
      `}
      onClick$={handleClick}
    >
      {/* Enhanced Modern Container */}
      <div
        class={`
          relative h-full rounded-3xl overflow-visible backdrop-blur-xl
          transition-all duration-500 ease-out transform
          ${isSelected 
            ? 'bg-gradient-to-br from-primary-50/40 via-secondary-50/40 to-primary-100/30 border-2 border-primary-400/70 shadow-2xl shadow-primary-500/30 scale-105' 
            : 'bg-white/15 dark:bg-gray-900/15 border border-gray-200/20 dark:border-gray-700/20 hover:bg-white/25 hover:border-primary-300/50 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/20'
          }
          shadow-xl group
        `}
      >
        {/* Enhanced Background Pattern - Covers Entire Card */}
        <div class="absolute inset-0 opacity-15">
          <div class={`
            absolute inset-0 transition-all duration-700
            ${isSelected 
              ? 'bg-gradient-to-br from-primary-600/25 via-secondary-600/25 to-primary-700/25' 
              : 'bg-gradient-to-br from-primary-600/12 via-primary-600/12 to-primary-700/12 group-hover:from-primary-500/18 group-hover:via-primary-600/18 group-hover:to-primary-700/18'
            }
          `} />
        </div>

        {/* Enhanced Selection Overlay - Full Card Coverage */}
        {isSelected && (
          <div class="absolute inset-0 rounded-3xl z-5">
            <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-400/18 via-secondary-400/18 to-primary-500/18 backdrop-blur-sm animate-pulse" />
            <div class="absolute inset-[2px] rounded-3xl border border-primary-300/60" />
            {/* Animated Ring */}
            <div class="absolute inset-0 rounded-3xl border-2 border-primary-400/40 animate-ping" />
          </div>
        )}

        {/* Modern Selection Badge */}
        {isSelected && !isDisabled && (
          <div class="absolute top-6 right-6 z-30">
            <div class="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 shadow-lg shadow-primary-500/50 backdrop-blur-sm border border-white/20">
              <LuCheck class="h-4 w-4 text-white animate-bounce" />
              <span class="text-sm font-bold text-white tracking-wide">{$localize`Selected`}</span>
            </div>
          </div>
        )}


        {/* Content Container with Enhanced Background Visibility */}
        <div class="relative h-full flex flex-col z-10">
          
          {/* Simplified Header - Removed for minimal design */}

          {/* Router Image - Modern Glow Presentation */}
          <div class="flex-1 flex items-center justify-center p-8 relative overflow-visible">
            <div class="relative group">
              {/* Animated Glow Background */}
              <div class={`
                absolute inset-0 rounded-2xl blur-xl scale-110 opacity-40 transition-all duration-500 group-hover:opacity-70 group-hover:scale-125
                ${isSelected 
                  ? 'bg-gradient-to-br from-primary-400/60 via-secondary-400/60 to-primary-500/60' 
                  : 'bg-gradient-to-br from-primary-400/40 via-primary-500/40 to-primary-600/40'
                }
                animate-pulse
              `} />
              
              {/* Secondary Glow Layer */}
              <div class={`
                absolute inset-0 rounded-3xl blur-2xl scale-125 opacity-20 transition-all duration-700 group-hover:opacity-40
                ${isSelected 
                  ? 'bg-gradient-to-r from-primary-300/50 to-secondary-300/50' 
                  : 'bg-gradient-to-r from-primary-300/40 to-primary-400/40'
                }
              `} />
              
              {/* Floating Image Container */}
              <div class="relative w-36 h-28 flex items-center justify-center transform transition-all duration-300 group-hover:scale-[1.5] group-hover:-rotate-1 group-hover:z-50">
                {/* Glass Effect Behind Image */}
                <div class="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-xl" />
                
                <img
                  src={primaryImage}
                  alt={router.title}
                  class="relative z-10 max-w-full max-h-full object-contain filter drop-shadow-2xl transition-all duration-300 group-hover:drop-shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                  loading="lazy"
                  onError$={(event) => {
                    (event.target as HTMLImageElement).src = "/images/routers/placeholder.png";
                  }}
                />
                
                {/* Reflection Effect */}
                <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full blur-sm opacity-60" />
              </div>
            </div>
          </div>

          {/* Enhanced Router Name */}
          <div class="px-6 pb-6 mt-6">
            <h3 class={`
              font-bold text-xl text-center leading-tight transition-all duration-300
              ${isSelected 
                ? 'text-gray-900 dark:text-white drop-shadow-sm' 
                : 'text-gray-800 dark:text-gray-100 group-hover:text-gray-900 group-hover:dark:text-white'
              }
            `} title={router.title}>
              {router.title}
            </h3>
          </div>

          {/* Modern Action Button */}
          <div class="px-6 pb-6">
            <div onClick$={(event) => event.stopPropagation()}>
              <Button
                onClick$={handleDetailsClick}
                disabled={isDisabled}
                variant={isSelected ? "primary" : "outline"}
                size="sm"
                class={`
                  w-full text-sm font-bold transition-all duration-500 transform group-hover:scale-105
                  ${isSelected 
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 text-white border-0' 
                    : 'bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-gray-300/30 dark:border-gray-600/30 text-gray-700 dark:text-gray-200 hover:bg-white/50 hover:border-primary-400/50 hover:text-primary-700 hover:dark:text-primary-300 hover:shadow-lg'
                  }
                  rounded-2xl py-3
                `}
              >
                <LuInfo class="h-4 w-4 mr-2" />
                {$localize`View Details`}
              </Button>
            </div>
          </div>
        </div>

        {/* Modern Border Accent */}
        {isSelected && (
          <>
            <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-1.5 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-b-2xl shadow-lg shadow-primary-400/50" />
            <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-t-2xl opacity-60" />
          </>
        )}
      </div>
    </div>
  );
});