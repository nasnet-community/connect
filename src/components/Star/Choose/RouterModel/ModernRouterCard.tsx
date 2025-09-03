import { $, component$, type QRL, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { LuInfo, LuCheck, LuWifi, LuZap, LuCpu, LuMemoryStick, LuRouter } from "@qwikest/icons/lucide";
import { Button, Badge } from "~/components/Core";
import { type RouterData } from "./Constants";

interface ModernRouterCardProps {
  router: RouterData;
  isSelected: boolean;
  isDisabled?: boolean;
  badge?: string;
  badgeVariant?: "default" | "primary" | "success" | "warning" | "info";
  onSelect$: QRL<(model: string) => void>;
  onViewDetails$: QRL<(router: RouterData) => void>;
}

export const ModernRouterCard = component$<ModernRouterCardProps>((props) => {
  const { 
    router, 
    isSelected, 
    isDisabled = false, 
    badge, 
    badgeVariant = "default", 
    onSelect$,
    onViewDetails$
  } = props;

  const cardRef = useSignal<HTMLDivElement>();
  const isHovered = useSignal(false);

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

  // Mouse tracking for 3D effect
  const handleMouseMove = $((event: MouseEvent) => {
    if (!cardRef.value || isDisabled) return;
    
    const rect = cardRef.value.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / centerY * -5; // Max 5 degrees
    const rotateY = (x - centerX) / centerX * 5;   // Max 5 degrees
    
    cardRef.value.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${isHovered.value ? '10px' : '0px'})`;
  });

  const handleMouseEnter = $(() => {
    isHovered.value = true;
  });

  const handleMouseLeave = $(() => {
    isHovered.value = false;
    if (cardRef.value) {
      cardRef.value.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }
  });

  // Add floating animation
  useVisibleTask$(() => {
    if (cardRef.value) {
      const randomDelay = Math.random() * 2000;
      cardRef.value.style.animationDelay = `${randomDelay}ms`;
    }
  });

  // Get the first image for display
  const primaryImage = router.images?.[0] || "/images/routers/placeholder.png";

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

  return (
    <div
      ref={cardRef}
      class={`
        group relative h-full min-h-[320px] cursor-pointer
        transform-gpu transition-all duration-500 ease-out
        animate-float
        ${!isDisabled ? 'hover:scale-[1.02]' : 'cursor-not-allowed opacity-60'}
        ${isSelected ? 'animate-pulse-slow' : ''}
      `}
      onMouseMove$={handleMouseMove}
      onMouseEnter$={handleMouseEnter}
      onMouseLeave$={handleMouseLeave}
      onClick$={handleClick}
    >
      {/* Glassmorphism Container */}
      <div
        class={`
          relative h-full rounded-2xl overflow-hidden
          transition-all duration-500 ease-out
          ${isSelected 
            ? 'bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 backdrop-blur-md border-2 border-gradient-to-r from-purple-400/50 via-blue-400/50 to-pink-400/50' 
            : 'bg-white/5 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 hover:bg-white/10 hover:border-white/30'
          }
          shadow-xl hover:shadow-2xl hover:shadow-purple-500/25
          before:absolute before:inset-0 before:rounded-2xl
          ${isSelected 
            ? 'before:bg-gradient-to-br before:from-purple-500/20 before:via-blue-500/20 before:to-pink-500/20 before:animate-gradient-shift' 
            : 'before:bg-gradient-to-br before:from-transparent before:to-white/5'
          }
        `}
      >
        {/* Animated Background Pattern */}
        <div class="absolute inset-0 opacity-5">
          <div class="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 animate-gradient-rotate" />
        </div>

        {/* Selection Ring */}
        {isSelected && (
          <div class="absolute inset-0 rounded-2xl">
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 opacity-30 animate-pulse blur-sm" />
            <div class="absolute inset-[2px] rounded-2xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 backdrop-blur-sm" />
          </div>
        )}

        {/* Selection Indicator */}
        {isSelected && !isDisabled && (
          <div class="absolute top-4 right-4 z-30">
            <div class="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg animate-bounce-subtle">
              <LuCheck class="h-3 w-3 text-white animate-scale-in" />
              <span class="text-xs font-semibold text-white">{$localize`Selected`}</span>
            </div>
          </div>
        )}

        {/* Badge */}
        {badge && (
          <div class="absolute top-4 left-4 z-20">
            <div class="backdrop-blur-sm bg-white/20 dark:bg-black/20 rounded-lg">
              <Badge
                color={badgeVariant}
                size="sm"
                variant="solid"
              >
                {badge}
              </Badge>
            </div>
          </div>
        )}

        {/* Content Container */}
        <div class="relative h-full flex flex-col z-10">
          
          {/* Header with Icon */}
          <div class="p-4 pb-2">
            <div class="flex items-center gap-2 mb-2">
              <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-white/20">
                <div class="text-purple-400 dark:text-purple-300">
                  {getIcon(router.icon)}
                </div>
              </div>
              <div class="flex items-center gap-1 text-xs text-white/70">
                {router.isWireless && <LuWifi class="h-3 w-3" />}
                {router.isLTE && <LuZap class="h-3 w-3" />}
              </div>
            </div>
            <h3 class="font-bold text-gray-900 dark:text-white text-sm leading-tight line-clamp-2" title={router.title}>
              {router.title}
            </h3>
          </div>

          {/* Router Image - Floating Effect */}
          <div class="flex-1 flex items-center justify-center p-4 relative">
            <div class="relative group">
              {/* Glow Effect */}
              <div class="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Image Container */}
              <div class="relative w-32 h-24 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                <img
                  src={primaryImage}
                  alt={router.title}
                  class="max-w-full max-h-full object-contain filter drop-shadow-lg"
                  loading="lazy"
                  onError$={(event) => {
                    (event.target as HTMLImageElement).src = "/images/routers/placeholder.png";
                  }}
                />
              </div>
            </div>
          </div>

          {/* Quick Specs on Hover */}
          <div class="absolute top-16 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none">
            <div class="bg-black/40 backdrop-blur-md rounded-lg p-2 text-xs text-white space-y-1">
              <div class="flex items-center gap-1">
                <LuCpu class="h-3 w-3" />
                <span class="truncate">{router.specs.CPU}</span>
              </div>
              <div class="flex items-center gap-1">
                <LuMemoryStick class="h-3 w-3" />
                <span class="truncate">{router.specs.RAM}</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div class="p-4 pt-2">
            <div onClick$={(event) => event.stopPropagation()}>
              <Button
                onClick$={handleDetailsClick}
                disabled={isDisabled}
                variant={isSelected ? "primary" : "outline"}
                size="sm"
                class={`
                  w-full text-xs font-medium transition-all duration-300
                  ${isSelected 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl' 
                    : 'bg-white/10 backdrop-blur-sm border-white/20 text-gray-700 dark:text-white hover:bg-white/20 hover:border-white/30'
                  }
                  group-hover:scale-[1.02] hover:shadow-lg
                `}
              >
                <LuInfo class="h-3 w-3 mr-1" />
                {$localize`View Details`}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Particles Effect for Selected State */}
      {isSelected && (
        <div class="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              class={`
                absolute w-1 h-1 bg-purple-400 rounded-full opacity-60
                animate-float-particle
              `}
              style={`
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${i * 0.5}s;
                animation-duration: ${2 + Math.random() * 2}s;
              `}
            />
          ))}
        </div>
      )}
    </div>
  );
});