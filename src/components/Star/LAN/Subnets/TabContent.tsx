import { component$ } from "@builder.io/qwik";
import type { SubnetConfig } from "./types";
import { SubnetCard } from "./SubnetCard";
import {
  LuShield,
  LuNetwork,
  LuRoute,
  LuHome,
  LuGlobe,
  LuLock,
} from "@qwikest/icons/lucide";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

import type { QRL } from "@builder.io/qwik";

interface TabContentProps {
  category:
    | "base"
    | "vpn"
    | "tunnel"
    | "wan-domestic"
    | "wan-foreign"
    | "vpn-client";
  configs: SubnetConfig[];
  values: Record<string, number | null>;
  onChange$: QRL<(key: string, value: number | null) => void>;
  errors: Record<string, string>;
}

/**
 * Tab content component for rendering subnet configurations by category
 * Provides consistent rendering with proper icons and descriptions
 */
export const TabContent = component$<TabContentProps>(
  ({ category, configs, values, onChange$, errors }) => {
    const locale = useMessageLocale();

    // Tab metadata mapping
    const tabMetadata = {
      base: {
        title: semanticMessages.subnets_section_base({}, { locale }),
        description: semanticMessages.subnets_tab_base_description(
          {},
          { locale },
        ),
        icon: <LuNetwork class="h-6 w-6" />,
      },
      "wan-domestic": {
        title: semanticMessages.subnets_section_wan_domestic({}, { locale }),
        description: semanticMessages.subnets_tab_wan_domestic_description(
          {},
          { locale },
        ),
        icon: <LuHome class="h-6 w-6" />,
      },
      "wan-foreign": {
        title: semanticMessages.subnets_section_wan_foreign({}, { locale }),
        description: semanticMessages.subnets_tab_wan_foreign_description(
          {},
          { locale },
        ),
        icon: <LuGlobe class="h-6 w-6" />,
      },
      "vpn-client": {
        title: semanticMessages.subnets_section_vpn_client({}, { locale }),
        description: semanticMessages.subnets_tab_vpn_client_description(
          {},
          { locale },
        ),
        icon: <LuLock class="h-6 w-6" />,
      },
      vpn: {
        title: semanticMessages.subnets_section_vpn_server({}, { locale }),
        description: semanticMessages.subnets_tab_vpn_server_description(
          {},
          { locale },
        ),
        icon: <LuShield class="h-6 w-6" />,
      },
      tunnel: {
        title: semanticMessages.subnets_section_tunnel({}, { locale }),
        description: semanticMessages.subnets_tab_tunnel_description(
          {},
          { locale },
        ),
        icon: <LuRoute class="h-6 w-6" />,
      },
    };

    const metadata = tabMetadata[category];

    // Handle empty or undefined configs
    if (configs.length === 0) {
      return (
        <div class="animate-in fade-in flex min-h-[400px] flex-col items-center justify-center duration-300">
          <div class="mb-4 rounded-full bg-gray-100 p-4 dark:bg-gray-800">
            {metadata.icon}
          </div>
          <h3 class="mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">
            {semanticMessages.subnets_empty_category_title(
              { category: metadata.title },
              { locale },
            )}
          </h3>
          <p class="max-w-md text-center text-sm text-gray-500 dark:text-gray-400">
            {semanticMessages.subnets_empty_category_description(
              {},
              { locale },
            )}
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
  },
);
