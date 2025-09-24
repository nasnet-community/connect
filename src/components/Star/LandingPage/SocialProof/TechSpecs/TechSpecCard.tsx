import { component$, useSignal } from "@builder.io/qwik";
import { getIcon, type IconName } from "../../utils/iconMapper";

interface Spec {
  label: string;
  value: string;
  highlight?: boolean;
  progress?: number;
}

interface TechSpecCardProps {
  category: string;
  icon: IconName;
  color: string;
  specs: Spec[];
  index: number;
  isActive?: boolean;
}

export const TechSpecCard = component$<TechSpecCardProps>(({
  category,
  icon,
  color,
  specs,
  index: _index,
  isActive = false
}) => {
  const Icon = getIcon(icon);
  const isHovered = useSignal(false);
  const mouseX = useSignal(0);
  const mouseY = useSignal(0);

  return (
    <div
      class="relative group"
      onMouseEnter$={() => isHovered.value = true}
      onMouseLeave$={() => isHovered.value = false}
      onMouseMove$={(e) => {
        const target = e.currentTarget as HTMLElement | null;
        if (!target) return;
        const rect = target.getBoundingClientRect();
        mouseX.value = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        mouseY.value = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      }}
    >
      {/* Glow Effect */}
      <div class={`absolute inset-0 rounded-2xl bg-gradient-to-br ${color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />

      {/* Card with 3D Transform */}
      <div
        class={`
          relative p-8 rounded-2xl border transition-all duration-500
          ${isActive
            ? 'bg-gradient-to-br from-white/15 to-white/5 border-cyan-500/50 shadow-2xl shadow-cyan-500/20'
            : 'bg-gradient-to-br from-white/10 to-white/5 border-white/20 hover:border-white/40'
          }
          backdrop-blur-xl group-hover:shadow-2xl
        `}
        style={isHovered.value ? {
          transform: `perspective(1000px) rotateX(${-mouseY.value}deg) rotateY(${mouseX.value}deg) translateZ(10px)`,
          transition: 'transform 0.1s ease-out'
        } : {}}
      >
        {/* Animated Background Pattern */}
        <div class="absolute inset-0 opacity-5">
          <div class="absolute inset-0" style={`
            background-image: repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255, 255, 255, 0.1) 10px,
              rgba(255, 255, 255, 0.1) 20px
            );
          `} />
        </div>

        {/* Category Header with Icon */}
        <div class="relative mb-8">
          {/* Icon Container with Pulse Effect */}
          <div class="relative inline-block mb-4">
            <div class={`absolute inset-0 rounded-xl bg-gradient-to-br ${color} opacity-20 animate-pulse`} />
            <div class={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
              <Icon class="h-7 w-7 text-white" />
            </div>
            {isActive && (
              <div class="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
            )}
          </div>

          <h3 class="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
            {category}
          </h3>
        </div>

        {/* Specs List with Progress Bars */}
        <div class="space-y-4">
          {specs.map((spec, idx) => (
            <div key={idx} class="relative">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  {spec.label}
                </span>
                <span class={`text-sm font-bold transition-all duration-300 ${
                  spec.highlight
                    ? 'text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text'
                    : 'text-white group-hover:text-cyan-300'
                }`}>
                  {spec.value}
                </span>
              </div>

              {/* Animated Progress Bar */}
              {spec.progress !== undefined && (
                <div class="relative h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    class="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: isHovered.value ? `${spec.progress}%` : '0%',
                    }}
                  >
                    <div class="absolute inset-0 animate-shimmer" style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent); background-size: 200% 100%;" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Interactive Hover Indicator */}
        <div class={`absolute bottom-4 right-4 transition-all duration-300 ${isHovered.value ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
          <div class="flex items-center gap-1">
            <span class="text-xs text-cyan-400">Explore</span>
            <svg class="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="none">
              <path d="M13 7l5 5m0 0l-5 5m5-5H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </div>
        </div>

        {/* Particle Effects on Hover */}
        {isHovered.value && (
          <div class="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                class="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float-particle"
                style={`
                  left: ${20 + i * 30}%;
                  top: ${80}%;
                  animation-delay: ${i * 0.2}s;
                `}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
});