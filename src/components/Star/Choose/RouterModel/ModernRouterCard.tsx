import {
  $,
  component$,
  type QRL,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import {
  LuInfo,
  LuCheck,
  LuWifi,
  LuZap,
  LuCpu,
  LuMemoryStick,
  LuRouter,
} from "@qwikest/icons/lucide";
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
    onViewDetails$,
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

    const rotateX = ((y - centerY) / centerY) * -5; // Max 5 degrees
    const rotateY = ((x - centerX) / centerX) * 5; // Max 5 degrees

    cardRef.value.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${isHovered.value ? "10px" : "0px"})`;
  });

  const handleMouseEnter = $(() => {
    isHovered.value = true;
  });

  const handleMouseLeave = $(() => {
    isHovered.value = false;
    if (cardRef.value) {
      cardRef.value.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
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
        group relative h-full min-h-[320px] transform-gpu
        animate-float cursor-pointer transition-all duration-500
        ease-out
        ${!isDisabled ? "hover:scale-[1.02]" : "cursor-not-allowed opacity-60"}
        ${isSelected ? "animate-pulse-slow" : ""}
      `}
      onMouseMove$={handleMouseMove}
      onMouseEnter$={handleMouseEnter}
      onMouseLeave$={handleMouseLeave}
      onClick$={handleClick}
    >
      {/* Glassmorphism Container */}
      <div
        class={`
          relative h-full overflow-hidden rounded-2xl
          transition-all duration-500 ease-out
          ${
            isSelected
              ? "border-gradient-to-r border-2 bg-gradient-to-br from-purple-400/50 from-purple-500/10 via-blue-400/50 via-blue-500/10 to-pink-400/50 to-pink-500/10 backdrop-blur-md"
              : "border border-white/20 bg-white/5 backdrop-blur-md hover:border-white/30 hover:bg-white/10 dark:border-white/10 dark:bg-white/5"
          }
          shadow-xl before:absolute before:inset-0
          before:rounded-2xl hover:shadow-2xl hover:shadow-purple-500/25
          ${
            isSelected
              ? "before:animate-gradient-shift before:bg-gradient-to-br before:from-purple-500/20 before:via-blue-500/20 before:to-pink-500/20"
              : "before:bg-gradient-to-br before:from-transparent before:to-white/5"
          }
        `}
      >
        {/* Animated Background Pattern */}
        <div class="absolute inset-0 opacity-5">
          <div class="animate-gradient-rotate absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600" />
        </div>

        {/* Selection Ring */}
        {isSelected && (
          <div class="absolute inset-0 rounded-2xl">
            <div class="absolute inset-0 animate-pulse rounded-2xl bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 opacity-30 blur-sm" />
            <div class="absolute inset-[2px] rounded-2xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 backdrop-blur-sm" />
          </div>
        )}

        {/* Selection Indicator */}
        {isSelected && !isDisabled && (
          <div class="absolute right-4 top-4 z-30">
            <div class="animate-bounce-subtle flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-3 py-1.5 shadow-lg">
              <LuCheck class="h-3 w-3 animate-scale-in text-white" />
              <span class="text-xs font-semibold text-white">{$localize`Selected`}</span>
            </div>
          </div>
        )}

        {/* Badge */}
        {badge && (
          <div class="absolute left-4 top-4 z-20">
            <div class="rounded-lg bg-white/20 backdrop-blur-sm dark:bg-black/20">
              <Badge color={badgeVariant} size="sm" variant="solid">
                {badge}
              </Badge>
            </div>
          </div>
        )}

        {/* Content Container */}
        <div class="relative z-10 flex h-full flex-col">
          {/* Header with Icon */}
          <div class="p-4 pb-2">
            <div class="mb-2 flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm">
                <div class="text-purple-400 dark:text-purple-300">
                  {getIcon(router.icon)}
                </div>
              </div>
              <div class="flex items-center gap-1 text-xs text-white/70">
                {router.isWireless && <LuWifi class="h-3 w-3" />}
                {router.isLTE && <LuZap class="h-3 w-3" />}
              </div>
            </div>
            <h3
              class="line-clamp-2 text-sm font-bold leading-tight text-gray-900 dark:text-white"
              title={router.title}
            >
              {router.title}
            </h3>
          </div>

          {/* Router Image - Floating Effect */}
          <div class="relative flex flex-1 items-center justify-center p-4">
            <div class="group relative">
              {/* Glow Effect */}
              <div class="absolute inset-0 scale-110 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

              {/* Image Container */}
              <div class="relative flex h-24 w-32 transform items-center justify-center transition-transform duration-500 group-hover:scale-110">
                <img
                  src={primaryImage}
                  alt={router.title}
                  width="128"
                  height="96"
                  class="max-h-full max-w-full object-contain drop-shadow-lg filter"
                  loading="lazy"
                  onError$={(event) => {
                    (event.target as HTMLImageElement).src =
                      "/images/routers/placeholder.png";
                  }}
                />
              </div>
            </div>
          </div>

          {/* Quick Specs on Hover */}
          <div class="pointer-events-none absolute left-4 right-4 top-16 translate-y-2 transform opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <div class="space-y-1 rounded-lg bg-black/40 p-2 text-xs text-white backdrop-blur-md">
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
                  ${
                    isSelected
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg hover:from-purple-600 hover:to-blue-600 hover:shadow-xl"
                      : "border-white/20 bg-white/10 text-gray-700 backdrop-blur-sm hover:border-white/30 hover:bg-white/20 dark:text-white"
                  }
                  group-hover:scale-[1.02] hover:shadow-lg
                `}
              >
                <LuInfo class="mr-1 h-3 w-3" />
                {$localize`View Details`}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Particles Effect for Selected State */}
      {isSelected && (
        <div class="pointer-events-none absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              class={`
                animate-float-particle absolute h-1 w-1 rounded-full bg-purple-400
                opacity-60
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
