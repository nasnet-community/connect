import {
  component$,
} from "@builder.io/qwik";
import type { SubnetConfig } from "./types";
import { SubnetCard } from "./SubnetCard";
import {
  LuShield,
  LuNetwork,
  LuRoute,
  LuHome,
  LuGlobe,
  LuLock
} from "@qwikest/icons/lucide";

import type { QRL } from "@builder.io/qwik";

interface TabContentProps {
  category: "base" | "vpn" | "tunnel" | "wan-domestic" | "wan-foreign" | "vpn-client";
  configs: SubnetConfig[];
  values: Record<string, number | null>;
  onChange$: QRL<(key: string, value: number | null) => void>;
  errors: Record<string, string>;
}

/**
 * Tab content component for rendering subnet configurations by category
 * Provides consistent rendering with proper icons and descriptions
 */
export const TabContent = component$<TabContentProps>(({
  category,
  configs,
  values,
  onChange$,
  errors,
}) => {
  // Tab metadata mapping
  const tabMetadata = {
    base: {
      title: $localize`Base Networks`,
      description: $localize`Core network segments for your router configuration`,
      icon: <LuNetwork class="h-6 w-6" />,
    },
    "wan-domestic": {
      title: $localize`Domestic WAN Networks`,
      description: $localize`Multiple domestic WAN link subnets for routing segregation`,
      icon: <LuHome class="h-6 w-6" />,
    },
    "wan-foreign": {
      title: $localize`Foreign WAN Networks`,
      description: $localize`Multiple foreign WAN link subnets for international routing`,
      icon: <LuGlobe class="h-6 w-6" />,
    },
    "vpn-client": {
      title: $localize`VPN Client Networks`,
      description: $localize`Dedicated subnets for multiple VPN client connections`,
      icon: <LuLock class="h-6 w-6" />,
    },
    vpn: {
      title: $localize`VPN Server Networks`,
      description: $localize`Dedicated subnets for VPN client connections`,
      icon: <LuShield class="h-6 w-6" />,
    },
    tunnel: {
      title: $localize`Tunnel Networks`,
      description: $localize`Point-to-point tunnel connections with /30 subnets`,
      icon: <LuRoute class="h-6 w-6" />,
    },
  };

  const metadata = tabMetadata[category];

  // Handle empty or undefined configs
  if (!configs || configs.length === 0) {
    return (
      <div class="flex flex-col items-center justify-center min-h-[400px] animate-in fade-in duration-300">
        <div class="mb-4 p-4 rounded-full bg-gray-100 dark:bg-gray-800">
          {metadata.icon}
        </div>
        <h3 class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          {$localize`No ${metadata.title} Configured`}
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 text-center max-w-md">
          {$localize`No configurations available for this category. Configure the related features in previous steps to see subnet options here.`}
        </p>
      </div>
    );
  }

  // Render subnet card with animation
  return (
    <div class="animate-in slide-in-from-right-4 duration-500">
      <SubnetCard
        title={metadata.title}
        description={metadata.description}
        icon={metadata.icon}
        category={category}
        configs={configs}
        values={values}
        onChange$={onChange$}
        errors={errors}
      />
    </div>
  );
});