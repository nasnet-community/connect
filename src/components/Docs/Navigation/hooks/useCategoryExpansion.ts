import { $, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import type { DocsSideNavigationCategory } from "../types";

/**
 * Hook to manage category expansion and active path tracking
 * @param categories The navigation categories
 * @param initialActivePath Optional initial active path
 * @returns Object with activeHref, expandedCategories, and toggleCategory$ function
 */
export function useCategoryExpansion(
  categories: DocsSideNavigationCategory[],
  initialActivePath?: string,
) {
  const location = useLocation();
  const activeHref = useSignal(initialActivePath || "");
  const expandedCategories = useSignal<Record<string, boolean>>({});
  const toggledCategoryId = useSignal<string | null>(null);

  // Initialize only top-level categories as expanded by default
  useVisibleTask$(({ cleanup }) => {
    // Create an initial state with only top-level categories expanded
    const initialExpandedState: Record<string, boolean> = {};

    // Set only top-level categories as expanded
    categories.forEach((category) => {
      // Set this top-level category as expanded
      initialExpandedState[category.id] = true;

      // Subcategories are NOT expanded by default
    });

    // Update the state
    expandedCategories.value = initialExpandedState;

    // Cleanup function to prevent memory leaks
    cleanup(() => {
      // Clean up any resources if needed
    });
  });

  // Handle toggling categories
  useVisibleTask$(({ track }) => {
    const categoryId = track(() => toggledCategoryId.value);

    if (categoryId) {
      expandedCategories.value = {
        ...expandedCategories.value,
        [categoryId]: !expandedCategories.value[categoryId],
      };
      // Reset after processing
      toggledCategoryId.value = null;
    }
  });

  // Simplified function to expand categories with active link
  const expandCategoriesWithActiveLink$ = $((activePath: string) => {
    if (!activePath) return;

    // Recursive function to check if a category or its subcategories contain the active path
    const checkCategory = (
      category: DocsSideNavigationCategory,
      parentIds: string[] = [],
    ): boolean => {
      let hasActive = false;

      // Check links in this category
      if (category.links) {
        for (const link of category.links) {
          // Check direct match
          if (link.href === activePath) {
            hasActive = true;
            break;
          }

          // Check subComponents
          if (link.subComponents) {
            for (const subComp of link.subComponents) {
              if (subComp.href === activePath) {
                hasActive = true;
                // Ensure the link with subcomponents is expanded
                expandedCategories.value = {
                  ...expandedCategories.value,
                  [`link-${link.href}`]: true,
                };
                break;
              }
            }
            if (hasActive) break;
          }
        }
      }

      // Check subcategories
      if (!hasActive && category.subcategories) {
        for (const subcat of category.subcategories) {
          if (checkCategory(subcat, [...parentIds, category.id])) {
            hasActive = true;
            break;
          }
        }
      }

      // If this category contains the active link, expand it and all parent categories
      if (hasActive) {
        // Expand this category
        expandedCategories.value = {
          ...expandedCategories.value,
          [category.id]: true,
        };

        // Also expand all parent categories in the hierarchy
        parentIds.forEach((id) => {
          expandedCategories.value = {
            ...expandedCategories.value,
            [id]: true,
          };
        });
      }

      return hasActive;
    };

    // Process all top-level categories
    categories.forEach((category) => {
      checkCategory(category);
    });
  });

  // Only update active link automatically if activePath prop is not provided
  useVisibleTask$(({ track }) => {
    // Track URL changes
    const currentPath = track(() => location.url.pathname);
    const locale = location.params.locale || "";

    // If initialActivePath is provided, use it directly
    if (initialActivePath !== undefined) {
      activeHref.value = initialActivePath;
      expandCategoriesWithActiveLink$(initialActivePath);
      return;
    }

    // Find the best matching link
    let bestMatch = "";
    let bestMatchLength = 0;

    // Special case for root docs page
    const rootDocsPath = `/${locale}/docs`;
    if (currentPath === rootDocsPath || currentPath === `${rootDocsPath}/`) {
      activeHref.value = rootDocsPath;
      expandCategoriesWithActiveLink$(rootDocsPath);
      return;
    }

    // Find the link that best matches the current path
    const processCategory = (category: DocsSideNavigationCategory) => {
      // Check links in this category
      if (category.links) {
        for (const link of category.links) {
          if (
            link.href !== rootDocsPath &&
            currentPath.startsWith(link.href) &&
            link.href.length > bestMatchLength
          ) {
            bestMatch = link.href;
            bestMatchLength = link.href.length;
          }

          // Check subComponents
          if (link.subComponents) {
            for (const subComp of link.subComponents) {
              if (
                subComp.href === currentPath ||
                (currentPath.startsWith(subComp.href) &&
                  subComp.href.length > bestMatchLength)
              ) {
                bestMatch = subComp.href;
                bestMatchLength = subComp.href.length;
              }
            }
          }
        }
      }

      // Process subcategories
      if (category.subcategories) {
        for (const subcat of category.subcategories) {
          processCategory(subcat);
        }
      }
    };

    // Process all categories
    categories.forEach(processCategory);

    // Update active link and expand categories
    if (bestMatch) {
      activeHref.value = bestMatch;
      expandCategoriesWithActiveLink$(bestMatch);
    } else if (currentPath.includes(`/${locale}/docs/`)) {
      // Fallback - if we're in the docs section but didn't find a match,
      // use the closest parent section
      const pathParts = currentPath.split("/");
      if (pathParts.length >= 4) {
        const potentialPath = pathParts.slice(0, 4).join("/"); // /[locale]/docs/section
        activeHref.value = potentialPath;
        expandCategoriesWithActiveLink$(potentialPath);
      }
    }
  });

  // Watch for changes to the activePath prop
  useVisibleTask$(({ track }) => {
    const propActivePath = track(() => initialActivePath);
    if (propActivePath !== undefined) {
      activeHref.value = propActivePath;
      expandCategoriesWithActiveLink$(propActivePath);
    }
  });

  // Simple function to toggle a category's expanded state
  const toggleCategory$ = $((categoryId: string) => {
    toggledCategoryId.value = categoryId;
  });

  return {
    activeHref,
    expandedCategories,
    toggleCategory$,
  };
}
