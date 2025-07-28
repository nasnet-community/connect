import { component$ } from "@builder.io/qwik";
import type { BreadcrumbsProps } from "./Breadcrumbs.types";
import { useBreadcrumbsResponsive } from "./hooks/useBreadcrumbsResponsive";
import { useDisplayedItems } from "./hooks/useDisplayedItems";
import { BreadcrumbItem } from "./BreadcrumbItem";

/**
 * Breadcrumbs component for providing hierarchical navigation.
 *
 * Implements WAI-ARIA navigation patterns for accessibility.
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/
 */
const Breadcrumbs = component$<BreadcrumbsProps>((props) => {
  const {
    items = [],
    separator = "/",
    maxItems = 3,
    expanderLabel = "...",
    label = "Breadcrumb",
    ...rest
  } = props;

  // Use custom hooks for responsive behavior and item display
  const { screenWidth, isRtl } = useBreadcrumbsResponsive();
  const { displayedItems } = useDisplayedItems(
    items,
    maxItems,
    expanderLabel,
    screenWidth,
  );

  // Choose the visual separator based on the prop
  const separatorContent =
    typeof separator === "string" ? separator : separator;

  return (
    <nav 
      aria-label={label} 
      {...rest} 
      class={`
        text-fluid-xs md:text-fluid-sm
        ${props.class || ""}
      `}
    >
      <ol
        class={`
          flex flex-wrap items-center
          gap-1 mobile:gap-0.5 tablet:gap-1 desktop:gap-2
          ${isRtl.value ? "space-x-reverse" : ""}
        `}
        dir={isRtl.value ? "rtl" : "ltr"}
      >
        {displayedItems.map((item, index) => {
          const isLast = index === displayedItems.length - 1;
          const isEllipsis = item.label === expanderLabel;

          return (
            <BreadcrumbItem
              key={item.id || `breadcrumb-${index}`}
              item={item}
              isLast={isLast}
              isEllipsis={isEllipsis}
              separatorContent={separatorContent}
            />
          );
        })}
      </ol>
    </nav>
  );
});

export default Breadcrumbs;
