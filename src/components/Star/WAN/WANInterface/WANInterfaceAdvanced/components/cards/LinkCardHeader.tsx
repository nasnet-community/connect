import { component$, type QRL, $ } from "@builder.io/qwik";
import type { WANWizardState } from "../../types";
import type { LinkStatus } from "../../utils/linkHelpers";
import { getInterfaceIcon, getConnectionIcon } from "../../utils/iconMappings";
import { getStatusColorClass } from "../../utils/displayFormatters";
import { StatusIndicator } from "../common/StatusIndicator";

export interface LinkCardHeaderProps {
  link: WANWizardState["links"][0];
  status: LinkStatus;
  errorCount: number;
  isExpanded: boolean;
  onToggle$: QRL<() => void>;
  onRemove$?: QRL<() => void>;
  showRemove?: boolean;
  iconType?: "interface" | "connection";
}

export const LinkCardHeader = component$<LinkCardHeaderProps>(
  ({ 
    link, 
    status, 
    errorCount, 
    isExpanded, 
    onToggle$, 
    onRemove$, 
    showRemove = false,
    iconType = "interface" 
  }) => {
    const statusColors = getStatusColorClass(status);
    const iconPath = iconType === "interface" 
      ? getInterfaceIcon(link.interfaceType || "Ethernet")
      : getConnectionIcon(link.connectionType);
    
    return (
      <div 
        class="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        onClick$={onToggle$}
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            {/* Icon */}
            <div class={`h-10 w-10 rounded-lg flex items-center justify-center ${statusColors.bg}`}>
              <svg 
                class={`h-5 w-5 ${statusColors.text}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="1.5" 
                  d={iconPath} 
                />
              </svg>
            </div>
            
            {/* Name and Info */}
            <div>
              <h3 class={`font-medium ${
                status === 'complete' 
                  ? 'text-green-900 dark:text-green-100' 
                  : status === 'incomplete'
                  ? 'text-gray-600 dark:text-gray-400'
                  : 'text-gray-900 dark:text-white'
              }`}>
                {link.name}
              </h3>
              <p class={`text-sm ${
                status === 'incomplete'
                  ? 'text-gray-400 dark:text-gray-500'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {link.interfaceType || 'Not configured'}
                {link.interfaceName && ` • ${link.interfaceName}`}
                {link.connectionType && ` • ${link.connectionType}`}
              </p>
            </div>
          </div>
          
          {/* Right side */}
          <div class="flex items-center gap-3">
            <StatusIndicator 
              status={status} 
              errorCount={errorCount} 
              size="md" 
            />
            
            {showRemove && onRemove$ && (
              <button
                onClick$={$((e: Event) => {
                  e.stopPropagation();
                  onRemove$();
                })}
                class="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                  />
                </svg>
              </button>
            )}
            
            <svg 
              class={`h-5 w-5 text-gray-400 transition-transform ${
                isExpanded ? 'rotate-90' : ''
              }`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }
);