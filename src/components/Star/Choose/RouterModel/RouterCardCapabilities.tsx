import { component$ } from "@builder.io/qwik";
import { LuWifi, LuSmartphone, LuZap, LuCrown, LuUsb, LuNetwork, LuContainer, LuSatellite, LuSignal } from "@qwikest/icons/lucide";
import { type RouterData, hasUSBPort, has25GigPort, isDockerCapable, isStarlinkMiniCompatible, isDomesticLinkAlternative } from "./Constants";

interface RouterCardCapabilitiesProps {
  router: RouterData;
  compact?: boolean;
}

export const RouterCardCapabilities = component$<RouterCardCapabilitiesProps>((props) => {
  const { router, compact = false } = props;

  const capabilities = [
    {
      enabled: router.isWireless,
      icon: LuWifi,
      label: "Wi-Fi",
      color: "success" as const,
      detail: router.specs["Wi-Fi"],
      gradient: "from-green-400 to-emerald-600",
    },
    {
      enabled: router.isLTE,
      icon: LuSmartphone,
      label: "LTE/5G",
      color: "info" as const,
      detail: "Mobile Network",
      gradient: "from-blue-400 to-indigo-600",
    },
    {
      enabled: router.isSFP,
      icon: LuZap,
      label: "SFP+",
      color: "warning" as const,
      detail: "Fiber Optic",
      gradient: "from-amber-400 to-orange-600",
    },
    {
      enabled: hasUSBPort(router),
      icon: LuUsb,
      label: "USB",
      color: "secondary" as const,
      detail: "USB Port",
      gradient: "from-purple-400 to-violet-600",
    },
    {
      enabled: has25GigPort(router),
      icon: LuNetwork,
      label: "2.5G",
      color: "primary" as const,
      detail: "2.5G Ethernet",
      gradient: "from-cyan-400 to-blue-600",
    },
    {
      enabled: isDockerCapable(router),
      icon: LuContainer,
      label: "Docker",
      color: "info" as const,
      detail: "Container Ready",
      gradient: "from-indigo-400 to-purple-600",
    },
    {
      enabled: isStarlinkMiniCompatible(router),
      icon: LuSatellite,
      label: "Starlink",
      color: "warning" as const,
      detail: "Starlink Mini",
      gradient: "from-orange-400 to-red-600",
    },
    {
      enabled: isDomesticLinkAlternative(router),
      icon: LuSignal,
      label: "No DSL",
      color: "success" as const,
      detail: "No Domestic Link",
      gradient: "from-emerald-400 to-green-600",
    },
    {
      enabled: router.canBeMaster,
      icon: LuCrown,
      label: "Master",
      color: "primary" as const,
      detail: "Primary Router",
      gradient: "from-yellow-400 to-amber-600",
    },
  ];

  const enabledCapabilities = capabilities.filter(cap => cap.enabled);

  if (compact) {
    // Compact view for card preview - limit to most important capabilities
    const priorityOrder = ['Starlink', 'Docker', '2.5G', 'USB', 'LTE/5G', 'Wi-Fi', 'SFP+', 'Master'];
    const compactCapabilities = enabledCapabilities
      .sort((a, b) => priorityOrder.indexOf(a.label) - priorityOrder.indexOf(b.label))
      .slice(0, 4); // Limit to 4 badges maximum

    return (
      <div class="flex flex-wrap gap-1.5">
        {compactCapabilities.map((cap) => {
          const Icon = cap.icon;
          return (
            <div
              key={cap.label}
              class="group/cap relative"
              title={cap.detail}
            >
              <div
                class={`
                  relative flex items-center gap-1 px-2 py-1 rounded-full
                  bg-gradient-to-r ${cap.gradient} 
                  transform transition-all duration-300
                  hover:scale-110 hover:shadow-lg
                  before:absolute before:inset-0 before:rounded-full
                  before:bg-white/20 before:blur-sm
                  before:scale-0 before:transition-transform before:duration-300
                  hover:before:scale-100
                `}
              >
                <Icon class="h-3 w-3 text-white animate-pulse-slow" />
                <span class="text-xs font-medium text-white">
                  {cap.label}
                </span>
              </div>
              
              {/* Glow effect on hover */}
              <div
                class={`
                  absolute inset-0 rounded-full bg-gradient-to-r ${cap.gradient}
                  blur-xl opacity-0 group-hover/cap:opacity-50
                  transition-opacity duration-300 pointer-events-none
                `}
              />
            </div>
          );
        })}
      </div>
    );
  }

  // Full view with details
  return (
    <div class="grid grid-cols-3 gap-2">
      {capabilities.map((cap) => {
        const Icon = cap.icon;
        const isEnabled = cap.enabled;
        
        return (
          <div
            key={cap.label}
            class={`
              relative group/cap overflow-hidden rounded-lg
              ${isEnabled ? 'cursor-default' : 'opacity-40 cursor-not-allowed'}
            `}
          >
            {/* Background gradient */}
            <div
              class={`
                absolute inset-0 bg-gradient-to-br ${isEnabled ? cap.gradient : 'from-gray-400 to-gray-600'}
                opacity-10 group-hover/cap:opacity-20 transition-opacity duration-300
              `}
            />
            
            {/* Content */}
            <div class="relative px-3 py-2 flex items-center gap-2">
              <div
                class={`
                  flex items-center justify-center w-8 h-8 rounded-lg
                  ${isEnabled 
                    ? `bg-gradient-to-br ${cap.gradient} shadow-lg` 
                    : 'bg-gray-400'
                  }
                  transform transition-all duration-300
                  ${isEnabled ? 'group-hover/cap:scale-110 group-hover/cap:rotate-3' : ''}
                `}
              >
                <Icon class="h-4 w-4 text-white" />
              </div>
              
              <div class="flex-1">
                <p class="text-xs font-semibold text-text dark:text-text-dark-default">
                  {cap.label}
                </p>
                <p class="text-xs text-text-secondary/70 dark:text-text-dark-secondary/70">
                  {isEnabled ? cap.detail : 'Not Available'}
                </p>
              </div>
              
              {/* Status indicator */}
              <div
                class={`
                  w-2 h-2 rounded-full
                  ${isEnabled 
                    ? `bg-gradient-to-br ${cap.gradient} animate-pulse` 
                    : 'bg-gray-400'
                  }
                `}
              />
            </div>
            
            {/* Hover effect line */}
            {isEnabled && (
              <div
                class={`
                  absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${cap.gradient}
                  w-0 group-hover/cap:w-full transition-all duration-500
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
});