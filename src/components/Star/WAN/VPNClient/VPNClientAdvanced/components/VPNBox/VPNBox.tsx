import { component$, type QRL, $ } from "@builder.io/qwik";
import type { VPNClientConfig } from "../../types/VPNClientAdvancedTypes";
import { VPNBoxHeader } from "./VPNBoxHeader";
import { VPNBoxContent } from "./VPNBoxContent";

export interface VPNBoxProps {
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

export const VPNBox = component$<VPNBoxProps>(
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

    return (
      <div
        class={[
          "group relative rounded-xl border transition-all duration-200",
          {
            "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20": hasErrors,
            "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600": !hasErrors,
          },
        ]}
      >
        {/* Header */}
        <VPNBoxHeader
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
          <VPNBoxContent
            vpn={vpn}
            validationErrors={vpnErrors}
            onUpdate$={handleUpdate$}
          />
        )}

        {/* Error Summary */}
        {hasErrors && (
          <div class="border-t border-red-200 bg-red-50 px-6 py-3 dark:border-red-800 dark:bg-red-900/20">
            <div class="flex items-start gap-3">
              <svg
                class="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                  clip-rule="evenodd"
                />
              </svg>
              <div class="flex-1">
                <p class="text-sm font-medium text-red-800 dark:text-red-200">
                  {$localize`Configuration Issues`}
                </p>
                <div class="mt-1 space-y-1">
                  {Object.values(vpnErrors).flat().map((error, errorIndex) => (
                    <p key={errorIndex} class="text-sm text-red-700 dark:text-red-300">
                      • {error}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);
