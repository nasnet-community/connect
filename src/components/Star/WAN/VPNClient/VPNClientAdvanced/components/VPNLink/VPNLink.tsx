import { component$, type QRL, $ } from "@builder.io/qwik";
import type { VPNClientConfig } from "../../types/VPNClientAdvancedTypes";
import { VPNLinkHeader } from "./VPNLinkHeader";
import { VPNLinkContent } from "./VPNLinkContent";

export interface VPNLinkProps {
  vpn: VPNClientConfig;
  index: number;
  isExpanded?: boolean;
  canRemove?: boolean;
  validationErrors?: Record<string, string[]>;
  onUpdate$?: QRL<(id: string, updates: Partial<VPNClientConfig>) => void>;
  onRemove$?: QRL<(id: string) => void>;
  onToggleExpand$?: QRL<(id: string) => void>;
  onMoveUp$?: QRL<(id: string) => void>;
  onMoveDown$?: QRL<(id: string) => void>;
}

export const VPNLink = component$<VPNLinkProps>(
  ({
    vpn,
    index,
    isExpanded = false,
    canRemove = true,
    validationErrors = {},
    onUpdate$,
    onRemove$,
    onToggleExpand$,
    onMoveUp$,
    onMoveDown$,
  }) => {
    // Get validation errors for this VPN
    const vpnErrors = Object.keys(validationErrors)
      .filter((key) => key.startsWith(`vpn-${vpn.id}`))
      .reduce((acc, key) => {
        acc[key] = validationErrors[key];
        return acc;
      }, {} as Record<string, string[]>);

    const hasErrors = Object.keys(vpnErrors).length > 0;

    const handleToggleExpand$ = $(() => {
      if (onToggleExpand$) {
        onToggleExpand$(vpn.id);
      }
    });

    const handleUpdate$ = $((updates: Partial<VPNClientConfig>) => {
      if (onUpdate$) {
        onUpdate$(vpn.id, updates);
      }
    });

    const handleRemove$ = $(() => {
      if (onRemove$ && canRemove) {
        onRemove$(vpn.id);
      }
    });

    const handleMoveUp$ = $(() => {
      if (onMoveUp$) {
        onMoveUp$(vpn.id);
      }
    });

    const handleMoveDown$ = $(() => {
      if (onMoveDown$) {
        onMoveDown$(vpn.id);
      }
    });

    // Get link status similar to WANInterface pattern
    const getLinkStatus = () => {
      if (hasErrors) return "error";
      
      // Check if VPN is fully configured
      const hasBasicInfo = Boolean(vpn.name) && Boolean(vpn.type);
      const hasConnection = Boolean(vpn.connectionConfig);
      
      if (hasBasicInfo && hasConnection) return "complete";
      if (hasBasicInfo || hasConnection) return "partial";
      return "incomplete";
    };

    const linkStatus = getLinkStatus();

    const getCardStyle = () => {
      switch (linkStatus) {
        case "complete":
          return "border-green-300 bg-white hover:border-green-400 hover:shadow-md dark:border-green-700 dark:bg-gray-800 dark:hover:border-green-600";
        case "error":
          return "border-red-300 bg-red-50 hover:border-red-400 hover:shadow-md dark:border-red-700 dark:bg-red-950/20 dark:hover:border-red-600";
        case "partial":
          return "border-yellow-300 bg-yellow-50 hover:border-yellow-400 hover:shadow-md dark:border-yellow-700 dark:bg-yellow-950/20 dark:hover:border-yellow-600";
        default:
          return "border-gray-200 bg-gray-50 hover:border-gray-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50 dark:hover:border-gray-600";
      }
    };

    return (
      <div
        class={`
          group relative rounded-xl border-2 transition-all duration-200 hover:scale-[1.02]
          ${getCardStyle()}
        `}
      >
        {/* Status Indicator */}
        <div class="absolute top-3 right-3 z-10">
          {linkStatus === "complete" && (
            <div class="flex h-3 w-3 items-center justify-center rounded-full bg-green-500 shadow-sm">
              <div class="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></div>
            </div>
          )}
          {linkStatus === "error" && (
            <div class="flex h-3 w-3 items-center justify-center rounded-full bg-red-500 shadow-sm">
              <div class="h-1.5 w-1.5 rounded-full bg-white"></div>
            </div>
          )}
          {linkStatus === "partial" && (
            <div class="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-500 shadow-sm">
              <div class="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></div>
            </div>
          )}
        </div>

        {/* Header */}
        <VPNLinkHeader
          vpn={vpn}
          index={index}
          isExpanded={isExpanded}
          hasErrors={hasErrors}
          canRemove={canRemove}
          onToggleExpand$={handleToggleExpand$}
          onRemove$={handleRemove$}
          onMoveUp$={handleMoveUp$}
          onMoveDown$={handleMoveDown$}
        />

        {/* Content */}
        {isExpanded && (
          <VPNLinkContent
            vpn={vpn}
            validationErrors={vpnErrors}
            onUpdate$={handleUpdate$}
          />
        )}

        {/* Hover Glow Effect */}
        <div class="absolute inset-0 rounded-xl opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none bg-gradient-to-r from-primary-500/5 to-transparent"></div>
      </div>
    );
  }
);