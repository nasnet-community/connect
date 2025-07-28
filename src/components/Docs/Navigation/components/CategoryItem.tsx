import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { PropFunction } from "@builder.io/qwik";
import type { DocsSideNavigationCategory } from "../types";

export interface CategoryItemProps {
  category: DocsSideNavigationCategory;
  activeHref: string;
  isCompact: boolean;
  expandedCategories: Record<string, boolean>;
  level?: number;
  onToggleCategory$: PropFunction<(categoryId: string) => void>;
}

export const CategoryItem = component$<CategoryItemProps>((props) => {
  const {
    category,
    activeHref,
    isCompact,
    expandedCategories,
    level = 0,
    onToggleCategory$,
  } = props;

  const isCategoryExpanded = expandedCategories[category.id] || false;
  const hasActiveLink =
    category.links?.some(
      (link) =>
        link.href === activeHref ||
        link.subComponents?.some((subComp) => subComp.href === activeHref),
    ) || false;
  const hasSubcategories =
    category.subcategories && category.subcategories.length > 0;
  const hasContentToToggle =
    hasSubcategories || (category.links && category.links.length > 0);

  // Local signal to track expanded state
  const isExpanded = useSignal(isCategoryExpanded);

  // Track expanded state for links with subComponents
  const expandedLinks = useSignal<Record<string, boolean>>({});

  // Keep local state in sync with parent state
  useVisibleTask$(({ track }) => {
    const parentExpanded = track(() => expandedCategories[category.id]);
    isExpanded.value = parentExpanded || false;

    // Auto-expand categories with active subcomponents
    if (hasActiveLink && !isExpanded.value) {
      isExpanded.value = true;
      onToggleCategory$(category.id);
    }

    // Auto-expand links with active subcomponents
    if (category.links) {
      category.links.forEach((link) => {
        if (
          link.subComponents?.some((subComp) => subComp.href === activeHref)
        ) {
          expandedLinks.value = {
            ...expandedLinks.value,
            [link.href]: true,
          };
        }
      });
    }
  });

  // Local function to handle category toggle that captures the onToggleCategory$ in closure
  const handleToggleCategory$ = $((e: Event) => {
    // Only process if we have content to toggle
    if (hasContentToToggle) {
      e.preventDefault();
      e.stopPropagation();
      // Toggle local state first for immediate UI feedback
      isExpanded.value = !isExpanded.value;
      // Update parent state
      onToggleCategory$(category.id);
    }
  });

  // Toggle link's subComponents visibility
  const toggleSubComponents$ = $((e: Event, linkHref: string) => {
    e.preventDefault();
    e.stopPropagation();
    expandedLinks.value = {
      ...expandedLinks.value,
      [linkHref]: !expandedLinks.value[linkHref],
    };
  });

  return (
    <div
      class={`space-y-1 ${isCompact ? "mb-4" : ""} ${level > 0 ? "ms-3" : ""}`}
    >
      {/* Category heading with toggle */}
      <div
        onClick$={handleToggleCategory$}
        class={`
          flex items-center justify-between rounded-md p-2 text-sm font-medium 
          transition-all duration-200 can-hover:hover:bg-gray-100 dark:can-hover:hover:bg-gray-800
          ${isCompact && hasActiveLink ? "bg-gray-100 dark:bg-gray-700/50" : ""}
          ${
            isCompact
              ? "mb-1 border-b border-gray-100 py-3 text-gray-700 dark:border-gray-800 dark:text-gray-200"
              : "uppercase tracking-wide text-gray-500 dark:text-gray-400"
          }
          ${level > 0 ? "text-sm" : ""}
          ${hasContentToToggle ? "cursor-pointer touch:cursor-touch" : "cursor-default"}
          ${hasActiveLink ? "font-medium text-primary-700 dark:text-primary-400" : ""}
          ${hasContentToToggle ? "can-hover:hover:animate-lift" : ""}
        `}
        role={hasContentToToggle ? "button" : undefined}
        aria-expanded={hasContentToToggle ? isExpanded.value : undefined}
      >
        <span>{category.name}</span>
        {hasContentToToggle && (
          <svg
            class={`h-4 w-4 transition-transform duration-200 ${isExpanded.value ? "rotate-180" : ""} ${hasActiveLink ? "text-primary-500" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        )}
      </div>

      {/* Links */}
      <ul
        class={`
          space-y-1
          overflow-hidden transition-all duration-300
          ${!isExpanded.value ? "max-h-0 opacity-0" : "max-h-[2000px] opacity-100"}
        `}
        aria-hidden={!isExpanded.value}
      >
        {/* Render links if any */}
        {category.links?.map((link) => {
          const isActive = link.href === activeHref;
          const hasSubComponents =
            link.subComponents && link.subComponents.length > 0;
          const isLinkExpanded = expandedLinks.value[link.href] || false;
          const hasActiveSubComponent =
            link.subComponents?.some(
              (subComp) => subComp.href === activeHref,
            ) || false;

          // Apply active class if the link is active or has an active subcomponent
          const isLinkActive = isActive || hasActiveSubComponent;

          return (
            <li key={link.href} class="mb-1">
              <div class="flex flex-col">
                {/* Main link */}
                <div class="flex items-center">
                  <Link
                    href={link.href}
                    title={link.label}
                    preventdefault:click={hasSubComponents}
                    class={`
                      group flex flex-grow items-center rounded-md px-3 py-2 text-sm transition-all duration-200
                      ${isCompact ? "py-3 ps-4" : ""}
                      ${level > 0 ? "ps-4" : ""}
                      ${
                        isLinkActive
                          ? "bg-primary-50 font-medium text-primary-700 dark:bg-primary-900/20 dark:text-primary-300"
                          : "text-gray-700 can-hover:hover:bg-gray-100 dark:text-gray-300 dark:can-hover:hover:bg-gray-700/50"
                      }
                      can-hover:hover:animate-scale-up touch:cursor-touch
                    `}
                    onClick$={
                      hasSubComponents
                        ? $((e) => {
                            e.preventDefault();
                            toggleSubComponents$(e, link.href);
                          })
                        : undefined
                    }
                  >
                    {/* Active indicator */}
                    <div
                      class={`
                        me-2 h-1.5 w-1.5 rounded-full transition-all duration-200
                        ${
                          isLinkActive
                            ? "bg-primary-500 dark:bg-primary-400 animate-pulse"
                            : "bg-transparent group-hover:bg-gray-300 dark:group-hover:bg-gray-600"
                        }
                      `}
                    />

                    {/* Label - always show full text */}
                    <span>{link.label}</span>
                  </Link>

                  {/* Dropdown toggle for subComponents - only if not already handled by the link */}
                  {hasSubComponents && (
                    <button
                      onClick$={$((e) => toggleSubComponents$(e, link.href))}
                      class={`
                        p-2 text-gray-500 transition-all duration-200 can-hover:hover:text-primary-600
                        dark:text-gray-400 dark:can-hover:hover:text-primary-400 rounded-md
                        can-hover:hover:bg-gray-100 dark:can-hover:hover:bg-gray-700/50
                        ${hasActiveSubComponent ? "text-primary-600 dark:text-primary-400" : ""}
                        can-hover:hover:animate-lift touch:cursor-touch
                      `}
                      aria-label={isLinkExpanded ? "Collapse" : "Expand"}
                      aria-expanded={isLinkExpanded}
                      type="button"
                    >
                      <svg
                        class={`h-3 w-3 transition-transform duration-200 ${isLinkExpanded ? "rotate-180" : ""}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Sub-components dropdown */}
                {hasSubComponents && (
                  <ul
                    class={`
                      ms-6 mt-1 space-y-1 overflow-hidden transition-all duration-300
                      ${isLinkExpanded ? "max-h-[500px] opacity-100 animate-slide-down" : "max-h-0 opacity-0"}
                    `}
                    aria-hidden={!isLinkExpanded}
                  >
                    {link.subComponents?.map((subComp) => {
                      const isSubCompActive = subComp.href === activeHref;

                      return (
                        <li key={subComp.href}>
                          <Link
                            href={subComp.href}
                            title={subComp.label}
                            class={`
                              group flex w-full items-center rounded-md px-3 py-1.5 text-xs transition-all duration-200
                              ${
                                isSubCompActive
                                  ? "bg-primary-50 font-medium text-primary-700 dark:bg-primary-900/20 dark:text-primary-300"
                                  : "text-gray-600 can-hover:hover:bg-gray-100 dark:text-gray-400 dark:can-hover:hover:bg-gray-700/50"
                              }
                              can-hover:hover:animate-scale-up touch:cursor-touch
                            `}
                          >
                            {/* Active indicator */}
                            <div
                              class={`
                                me-2 h-1 w-1 rounded-full transition-all duration-200
                                ${
                                  isSubCompActive
                                    ? "bg-primary-500 dark:bg-primary-400 animate-pulse"
                                    : "bg-transparent group-hover:bg-gray-300 dark:group-hover:bg-gray-600"
                                }
                              `}
                            />

                            {/* Label */}
                            <span>{subComp.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </li>
          );
        })}

        {/* Render subcategories if any */}
        {category.subcategories?.map((subcategory) => (
          <li key={subcategory.id}>
            <CategoryItem
              category={subcategory}
              activeHref={activeHref}
              isCompact={isCompact}
              expandedCategories={expandedCategories}
              level={level + 1}
              onToggleCategory$={onToggleCategory$}
            />
          </li>
        ))}
      </ul>
    </div>
  );
});
