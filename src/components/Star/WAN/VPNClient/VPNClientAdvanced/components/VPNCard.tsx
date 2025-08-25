import { component$, type QRL } from "@builder.io/qwik";
import { Card, Alert, Input } from "~/components/Core";
import type { VPNConfig } from "../types/VPNClientAdvancedTypes";

export interface VPNCardProps {
  vpn: VPNConfig;
  index: number;
  isExpanded?: boolean;
  showPriority?: boolean;
  canRemove?: boolean;
  validationErrors?: Record<string, string[]>;
  onUpdate$?: QRL<(id: string, updates: Partial<VPNConfig>) => void>;
  onRemove$?: QRL<(id: string) => void>;
  onToggleExpanded$?: QRL<(id: string) => void>;
  onTest$?: QRL<(id: string) => void>;
  children?: any;
}

export const VPNCard = component$<VPNCardProps>(({
  vpn,
  index,
  isExpanded = false,
  showPriority = false,
  canRemove = true,
  validationErrors = {},
  onUpdate$,
  onRemove$,
  onToggleExpanded$,
  onTest$,
  children
}) => {
  const hasErrors = Object.keys(validationErrors).some(key => 
    key.startsWith(`vpn-${vpn.id}`) && validationErrors[key].length > 0
  );

  const getStatusColor = () => {
    if (hasErrors) return "border-red-300 bg-red-50 dark:border-red-600 dark:bg-red-900/10";
    if (!vpn.enabled) return "border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800/50";
    return "border-green-300 bg-green-50 dark:border-green-600 dark:bg-green-900/10";
  };

  const getVPNTypeIcon = (type: string) => {
    switch (type) {
      case "Wireguard":
        return "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z";
      case "OpenVPN":
        return "M12 2L3 7l9 5 9-5-9-5zM3 17l9 5 9-5M3 12l9 5 9-5";
      case "L2TP":
      case "PPTP":
      case "SSTP":
      case "IKeV2":
        return "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z";
      default:
        return "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z";
    }
  };

  const getStatusIcon = () => {
    if (hasErrors) {
      return (
        <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
      );
    }
    if (!vpn.enabled) {
      return (
        <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      );
    }
    return (
      <svg class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
      </svg>
    );
  };

  return (
    <Card class={`transition-all duration-200 hover:shadow-md ${getStatusColor()}`}>
      <div class="p-4">
        {/* Header */}
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            {/* Priority Number */}
            {showPriority && (
              <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30">
                <span class="text-sm font-semibold text-primary-700 dark:text-primary-300">
                  {vpn.priority || index + 1}
                </span>
              </div>
            )}

            {/* VPN Type Icon */}
            <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <svg class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={getVPNTypeIcon(vpn.type)} />
              </svg>
            </div>

            {/* VPN Info */}
            <div class="flex-1">
              <div class="flex items-center space-x-2">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                  {vpn.name}
                </h3>
                {getStatusIcon()}
              </div>
              <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                  {vpn.type}
                </span>
                {vpn.assignedLink && (
                  <span class="text-gray-600 dark:text-gray-400">
                    → {vpn.assignedLink}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div class="flex items-center space-x-2">
            {/* Test Connection */}
            {onTest$ && (
              <button
                onClick$={() => onTest$(vpn.id)}
                class="rounded-lg border border-blue-300 bg-blue-50 px-3 py-2 text-sm text-blue-600 hover:bg-blue-100 dark:border-blue-600 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
                title={$localize`Test Connection`}
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            )}

            {/* Toggle Enabled */}
            {onUpdate$ && (
              <button
                onClick$={() => onUpdate$(vpn.id, { enabled: !vpn.enabled })}
                class={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  vpn.enabled
                    ? "border border-yellow-300 bg-yellow-50 text-yellow-600 hover:bg-yellow-100 dark:border-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400"
                    : "border border-green-300 bg-green-50 text-green-600 hover:bg-green-100 dark:border-green-600 dark:bg-green-900/20 dark:text-green-400"
                }`}
                title={vpn.enabled ? $localize`Disable` : $localize`Enable`}
              >
                {vpn.enabled ? $localize`Disable` : $localize`Enable`}
              </button>
            )}

            {/* Expand/Collapse */}
            {onToggleExpanded$ && (
              <button
                onClick$={() => onToggleExpanded$(vpn.id)}
                class="rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                title={isExpanded ? $localize`Collapse` : $localize`Expand`}
              >
                <svg class={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}

            {/* Remove */}
            {canRemove && onRemove$ && (
              <button
                onClick$={() => onRemove$(vpn.id)}
                class="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-600 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-600 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                title={$localize`Remove VPN`}
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Validation Errors */}
        {hasErrors && (
          <div class="mt-4">
            {Object.entries(validationErrors)
              .filter(([key]) => key.startsWith(`vpn-${vpn.id}`))
              .map(([key, errors]) => (
                <Alert key={key} status="error" class="mb-2">
                  {errors.join(", ")}
                </Alert>
              ))
            }
          </div>
        )}

        {/* Expanded Content */}
        {isExpanded && (
          <div class="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
            {/* Name Input Field */}
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {$localize`Connection Name`}
              </label>
              <Input
                type="text"
                value={vpn.name}
                onInput$={(event: Event, value: string) => {
                  if (onUpdate$) {
                    onUpdate$(vpn.id, { name: value });
                  }
                }}
                placeholder={$localize`Enter a custom name for this VPN connection`}
                class="w-full"
              />
            </div>
            {children && children}
          </div>
        )}

        {/* Quick Info when collapsed */}
        {!isExpanded && vpn.config && (
          <div class="mt-3 text-sm text-gray-600 dark:text-gray-400">
            {vpn.type === "Wireguard" && vpn.config.PeerEndpointAddress && (
              <p>{$localize`Server:`} {vpn.config.PeerEndpointAddress}:{vpn.config.PeerEndpointPort || 51820}</p>
            )}
            {vpn.type === "OpenVPN" && vpn.config.Server.Address && (
              <p>{$localize`Server:`} {vpn.config.Server.Address}:{vpn.config.Server.Port || "1194"}</p>
            )}
            {vpn.type === "L2TP" && vpn.config.Server.Address && (
              <p>{$localize`Server:`} {vpn.config.Server.Address}</p>
            )}
            {vpn.type === "PPTP" && vpn.config.ConnectTo && (
              <p>{$localize`Server:`} {vpn.config.ConnectTo}</p>
            )}
            {vpn.type === "SSTP" && vpn.config.Server.Address && (
              <p>{$localize`Server:`} {vpn.config.Server.Address}:{vpn.config.Server.Port || "443"}</p>
            )}
            {vpn.type === "IKeV2" && vpn.config.ServerAddress && (
              <p>{$localize`Server:`} {vpn.config.ServerAddress}</p>
            )}
          </div>
        )}
      </div>
    </Card>
  );
});