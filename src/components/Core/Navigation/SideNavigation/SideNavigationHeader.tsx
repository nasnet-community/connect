import type { QRL } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import type { JSXChildren } from "@builder.io/qwik";

export interface SideNavigationHeaderProps {
  title?: string;
  header?: JSXChildren;
  isCollapsed: boolean;
  isCollapsible: boolean;
  headerClass: string;
  toggleButtonClass: string;
  onToggleCollapse$: QRL<() => void>;
}

export const SideNavigationHeader = component$<SideNavigationHeaderProps>(
  (props) => {
    const {
      title,
      header,
      isCollapsed,
      isCollapsible,
      headerClass,
      toggleButtonClass,
      onToggleCollapse$,
    } = props;

    if (!title && !header && !isCollapsible) return null;

    return (
      <div class={headerClass}>
        {!isCollapsed && title && (
          <h2 class="font-medium text-gray-800 dark:text-gray-200">{title}</h2>
        )}

        {!isCollapsed && !title && header && <div class="w-full">{header}</div>}

        {/* Collapse toggle button */}
        {isCollapsible && (
          <button
            type="button"
            onClick$={onToggleCollapse$}
            class={toggleButtonClass}
            aria-label={
              isCollapsed ? "Expand navigation" : "Collapse navigation"
            }
            title={isCollapsed ? "Expand" : "Collapse"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-5 w-5"
              style={{ transform: isCollapsed ? "rotate(180deg)" : "" }}
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    );
  },
);
