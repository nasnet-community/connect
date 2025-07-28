import type { JSXChildren } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { BreadcrumbItem as BreadcrumbItemType } from "./Breadcrumbs.types";

export interface BreadcrumbItemProps {
  item: BreadcrumbItemType;
  isLast: boolean;
  isEllipsis: boolean;
  separatorContent: JSXChildren;
}

export const BreadcrumbItem = component$<BreadcrumbItemProps>(
  ({ item, isLast, isEllipsis, separatorContent }) => {
    return (
      <li class={`flex items-center ${item.class || ""}`}>
        {/* Render the breadcrumb item */}
        {item.isCurrent || !item.href ? (
          <span
            class={`
              inline-flex items-center
              min-h-[44px] px-2 py-2 mobile:px-1.5 mobile:py-1.5
              touch-manipulation
              ${item.isCurrent 
                ? "font-semibold text-gray-900 dark:text-white" 
                : "text-gray-500 dark:text-gray-400"
              } 
              ${isEllipsis ? "px-1 min-h-0" : ""}
              motion-safe:transition-colors motion-safe:duration-200
            `}
            aria-current={item.isCurrent ? "page" : undefined}
          >
            {item.icon && <span class="mr-1 text-current">{item.icon}</span>}
            {item.label}
          </span>
        ) : (
          <Link
            href={item.href}
            class={`
              inline-flex items-center
              min-h-[44px] px-2 py-2 mobile:px-1.5 mobile:py-1.5
              rounded-md
              touch-manipulation
              text-primary-600 dark:text-primary-400
              hover:text-primary-700 dark:hover:text-primary-300
              hover:bg-primary-50 dark:hover:bg-primary-900/10
              focus-visible:outline-none focus-visible:ring-2 
              focus-visible:ring-primary-500 focus-visible:ring-offset-2
              dark:focus-visible:ring-offset-gray-900
              motion-safe:transition-all motion-safe:duration-200
              ${isEllipsis ? "px-1 min-h-0" : ""}
              can-hover:hover:underline
              active:scale-95 motion-safe:active:transition-transform
            `}
            aria-current={item.isCurrent ? "page" : undefined}
          >
            {item.icon && <span class="mr-1 text-current">{item.icon}</span>}
            {item.label}
          </Link>
        )}

        {/* Render the separator if not the last item */}
        {!isLast && (
          <span
            class="
              mx-1 mobile:mx-0.5 tablet:mx-1 desktop:mx-2
              text-gray-400 dark:text-gray-500
              select-none
            "
            aria-hidden="true"
          >
            {separatorContent}
          </span>
        )}
      </li>
    );
  },
);
