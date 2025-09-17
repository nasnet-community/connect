import { component$, type QRL, Slot } from "@builder.io/qwik";
import type { WANWizardState } from "../../types";
import type { LinkStatus } from "../../utils/linkHelpers";
import { getCardStyleByStatus } from "../../utils/displayFormatters";
import { LinkCardHeader } from "./LinkCardHeader";

export interface LinkCardProps {
  link: WANWizardState["links"][0];
  status: LinkStatus;
  errorCount: number;
  isExpanded: boolean;
  onToggle$: QRL<() => void>;
  onRemove$?: QRL<() => void>;
  showRemove?: boolean;
  iconType?: "interface" | "connection";
  class?: string;
}

export const LinkCard = component$<LinkCardProps>(
  ({ 
    link, 
    status, 
    errorCount, 
    isExpanded, 
    onToggle$, 
    onRemove$, 
    showRemove = false,
    iconType = "interface",
    class: className = ""
  }) => {
    const cardStyle = getCardStyleByStatus(status);
    
    return (
      <div
        key={link.id}
        class={`
          relative transition-all duration-200 rounded-xl border
          ${cardStyle}
          ${className}
        `}
      >
        <LinkCardHeader
          link={link}
          status={status}
          errorCount={errorCount}
          isExpanded={isExpanded}
          onToggle$={onToggle$}
          onRemove$={onRemove$}
          showRemove={showRemove}
          iconType={iconType}
        />
        
        {/* Expandable Content */}
        {isExpanded && (
          <div class="border-t border-gray-200 dark:border-gray-700 p-6 space-y-6">
            <Slot />
          </div>
        )}
      </div>
    );
  }
);