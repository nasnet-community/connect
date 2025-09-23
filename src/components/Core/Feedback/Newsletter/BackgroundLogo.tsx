import { component$ } from "@builder.io/qwik";
import logo from "../../../../../public/images/logo.jpg";

export interface BackgroundLogoProps {
  /** Size of the logo in pixels */
  size?: number;
  /** Opacity of the logo (0-1) */
  opacity?: number;
  /** Position of the logo */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "bottom-center" | "center";
  /** Enable floating animation */
  animated?: boolean;
  /** Rotation angle in degrees */
  rotation?: number;
  /** Blur amount in pixels */
  blur?: number;
  /** Custom class names */
  class?: string;
}

/**
 * BackgroundLogo component with enhanced network patterns and effects.
 * Features circuit patterns, floating nodes, and professional styling.
 * Used as a decorative background element in the Newsletter component.
 */
export const BackgroundLogo = component$<BackgroundLogoProps>(
  ({
    size = 800,
    opacity = 0.04,
    position = "bottom-right",
    animated = true,
    rotation = -5,
    blur = 0.5,
    class: className,
  }) => {
    // Get position classes - keeping logo within container bounds
    const getPositionClasses = () => {
      const positions = {
        "top-left": "top-2 start-2",
        "top-right": "top-2 end-2",
        "bottom-left": "bottom-2 start-2",
        "bottom-right": "bottom-2 end-2",
        "bottom-center": "-bottom-12 start-1/2 -translate-x-1/2",
        "center": "top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2",
      };
      return positions[position];
    };

    // Get animation classes
    const getAnimationClasses = () => {
      if (!animated) return "";
      return "animate-float";
    };

    return (
      <>
        {/* Network topology pattern background */}
        <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <svg class="absolute inset-0 w-full h-full opacity-5 dark:opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Network grid pattern */}
              <pattern id="network-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                {/* Grid lines */}
                <line x1="0" y1="0" x2="80" y2="0" stroke="currentColor" stroke-width="0.5" class="text-primary-300 dark:text-primary-700" opacity="0.3" />
                <line x1="0" y1="0" x2="0" y2="80" stroke="currentColor" stroke-width="0.5" class="text-primary-300 dark:text-primary-700" opacity="0.3" />

                {/* Network nodes */}
                <circle cx="0" cy="0" r="2" fill="currentColor" class="text-primary-500" opacity="0.5" />
                <circle cx="80" cy="0" r="2" fill="currentColor" class="text-secondary-500" opacity="0.5" />
                <circle cx="0" cy="80" r="2" fill="currentColor" class="text-secondary-500" opacity="0.5" />
                <circle cx="80" cy="80" r="2" fill="currentColor" class="text-primary-500" opacity="0.5" />
                <circle cx="40" cy="40" r="3" fill="currentColor" class="text-primary-600" opacity="0.6" />

                {/* Connection lines */}
                <line x1="0" y1="0" x2="40" y2="40" stroke="currentColor" stroke-width="0.3" class="text-secondary-400 dark:text-secondary-600" opacity="0.4" />
                <line x1="80" y1="0" x2="40" y2="40" stroke="currentColor" stroke-width="0.3" class="text-secondary-400 dark:text-secondary-600" opacity="0.4" />
                <line x1="0" y1="80" x2="40" y2="40" stroke="currentColor" stroke-width="0.3" class="text-secondary-400 dark:text-secondary-600" opacity="0.4" />
                <line x1="80" y1="80" x2="40" y2="40" stroke="currentColor" stroke-width="0.3" class="text-secondary-400 dark:text-secondary-600" opacity="0.4" />
              </pattern>

              {/* Hexagonal network pattern */}
              <pattern id="hex-network" x="0" y="0" width="60" height="70" patternUnits="userSpaceOnUse">
                <polygon points="30,0 60,17.5 60,52.5 30,70 0,52.5 0,17.5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="0.5"
                  class="text-primary-300 dark:text-primary-700"
                  opacity="0.2" />
              </pattern>

              {/* Gradient definitions */}
              <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="var(--tw-gradient-from)" class="from-primary-500" stop-opacity="0.2" />
                <stop offset="100%" stop-color="var(--tw-gradient-to)" class="to-secondary-500" stop-opacity="0.1" />
              </linearGradient>
            </defs>

            {/* Apply patterns */}
            <rect width="100%" height="100%" fill="url(#network-grid)" />
            <rect width="100%" height="100%" fill="url(#hex-network)" opacity="0.3" />
          </svg>
        </div>

        {/* Main background logo with gradient overlay */}
        <div
          class={`absolute z-0 pointer-events-none select-none ${getPositionClasses()} ${getAnimationClasses()} ${className || ""}`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            opacity: opacity,
            transform: `rotate(${rotation}deg) scale(1.0)`,
            filter: `blur(${blur}px)`,
          }}
        >
          {/* Logo container with mask */}
          <div class="relative w-full h-full">
            {/* Logo image */}
            <img
              src={logo}
              alt=""
              role="presentation"
              width={size}
              height={size}
              loading="lazy"
              class="w-full h-full object-cover rounded-full"
            />

            {/* Premium gradient overlays */}
            <div class="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/30 to-secondary-500/20 mix-blend-overlay" />
            <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-primary-400/10 to-secondary-400/10 mix-blend-color-dodge" />

            {/* Glow effect */}
            {animated && (
              <div class="absolute inset-0 rounded-full bg-gradient-radial from-primary-500/20 to-transparent blur-2xl animate-pulse-slow" />
            )}
          </div>
        </div>

        {/* Network connection lines */}
        {animated && (
          <svg class="absolute inset-0 w-full h-full z-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="var(--tw-gradient-from)" class="from-primary-500" stop-opacity="0" />
                <stop offset="50%" stop-color="var(--tw-gradient-via)" class="via-primary-500" stop-opacity="0.3" />
                <stop offset="100%" stop-color="var(--tw-gradient-to)" class="to-primary-500" stop-opacity="0" />
              </linearGradient>
            </defs>

            {/* Animated connection lines */}
            <line
              x1="10%" y1="20%"
              x2="90%" y2="80%"
              stroke="url(#line-gradient)"
              stroke-width="1"
              class="animate-pulse-network opacity-20"
            />
            <line
              x1="90%" y1="20%"
              x2="10%" y2="80%"
              stroke="url(#line-gradient)"
              stroke-width="1"
              class="animate-pulse-network-delayed opacity-20"
            />
          </svg>
        )}

        {/* Secondary floating network elements for depth */}
        {animated && (
          <>
            {/* Floating network nodes */}
            <div
              class="absolute z-0 pointer-events-none select-none animate-float-delayed"
              style={{
                width: `${size * 0.6}px`,
                height: `${size * 0.6}px`,
                opacity: opacity * 0.5,
                top: position.includes("top") ? "60%" : "10%",
                left: position.includes("left") ? "70%" : "10%",
                transform: `rotate(${rotation + 15}deg)`,
                filter: `blur(${blur * 2}px)`,
              }}
            >
              <div class="w-full h-full rounded-full bg-gradient-to-br from-primary-500/10 to-secondary-500/5">
                {/* Inner network node */}
                <div class="absolute inset-4 rounded-full border border-dashed border-primary-400/20 dark:border-primary-600/20 animate-spin-slow" />
                <div class="absolute inset-8 rounded-full bg-primary-500/10 blur-md" />
              </div>
            </div>

            {/* Tertiary floating element */}
            <div
              class="absolute z-0 pointer-events-none select-none animate-float-reverse"
              style={{
                width: `${size * 0.4}px`,
                height: `${size * 0.4}px`,
                opacity: opacity * 0.3,
                bottom: position.includes("bottom") ? "70%" : "20%",
                right: position.includes("right") ? "80%" : "15%",
                transform: `rotate(${rotation - 20}deg)`,
                filter: `blur(${blur * 3}px)`,
              }}
            >
              <div class="w-full h-full rounded-full bg-gradient-to-tl from-secondary-500/10 to-primary-500/5">
                {/* Inner hexagon shape */}
                <svg class="absolute inset-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)]" viewBox="0 0 100 100">
                  <polygon
                    points="50,10 85,30 85,70 50,90 15,70 15,30"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1"
                    class="text-secondary-400/30 dark:text-secondary-600/30"
                  />
                </svg>
              </div>
            </div>

            {/* Small floating particles */}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                class="absolute z-0 pointer-events-none select-none animate-float-particle"
                style={{
                  width: "8px",
                  height: "8px",
                  opacity: opacity * 0.6,
                  top: `${20 + i * 30}%`,
                  left: `${10 + i * 25}%`,
                  animationDelay: `${i * 1.5}s`,
                }}
              >
                <div class="w-full h-full rounded-full bg-gradient-to-br from-primary-400/40 to-secondary-400/40 blur-sm" />
              </div>
            ))}
          </>
        )}

        {/* Enhanced CSS animations */}
        <style>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(0) rotate(${rotation}deg) scale(1.2);
            }
            50% {
              transform: translateY(-20px) rotate(${rotation + 2}deg) scale(1.25);
            }
          }

          @keyframes float-delayed {
            0%, 100% {
              transform: translateY(0) rotate(${rotation + 15}deg);
            }
            50% {
              transform: translateY(-15px) rotate(${rotation + 17}deg);
            }
          }

          @keyframes float-reverse {
            0%, 100% {
              transform: translateY(0) rotate(${rotation - 20}deg);
            }
            50% {
              transform: translateY(10px) rotate(${rotation - 18}deg);
            }
          }

          @keyframes float-particle {
            0%, 100% {
              transform: translate(0, 0) scale(1);
              opacity: 0.6;
            }
            25% {
              transform: translate(10px, -10px) scale(1.2);
              opacity: 0.8;
            }
            50% {
              transform: translate(-5px, -20px) scale(1);
              opacity: 0.4;
            }
            75% {
              transform: translate(-10px, -10px) scale(0.8);
              opacity: 0.6;
            }
          }

          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes pulse-slow {
            0%, 100% {
              opacity: 0.3;
              transform: scale(1);
            }
            50% {
              opacity: 0.6;
              transform: scale(1.1);
            }
          }

          @keyframes pulse-network {
            0%, 100% {
              opacity: 0.2;
              stroke-dasharray: 0 100;
            }
            50% {
              opacity: 0.4;
              stroke-dasharray: 100 0;
            }
          }

          @keyframes pulse-network-delayed {
            0%, 100% {
              opacity: 0.2;
              stroke-dasharray: 0 100;
            }
            50% {
              opacity: 0.4;
              stroke-dasharray: 100 0;
            }
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          .animate-float-delayed {
            animation: float-delayed 8s ease-in-out infinite;
            animation-delay: 1s;
          }

          .animate-float-reverse {
            animation: float-reverse 7s ease-in-out infinite;
            animation-delay: 2s;
          }

          .animate-float-particle {
            animation: float-particle 10s ease-in-out infinite;
          }

          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }

          .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
          }

          .animate-pulse-network {
            animation: pulse-network 3s ease-in-out infinite;
          }

          .animate-pulse-network-delayed {
            animation: pulse-network-delayed 3s ease-in-out infinite;
            animation-delay: 1.5s;
          }
        `}</style>
      </>
    );
  },
);