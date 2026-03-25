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
    class: className = "",
  }) => {
    const cardStyle = getCardStyleByStatus(status);

    return (
      <div
        key={link.id}
        class={`
          relative rounded-xl border transition-all duration-200
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
          <div class="space-y-6 border-t border-gray-200 p-6 dark:border-gray-700">
            <Slot />
          </div>
        )}
      </div>
    );
  },
);
