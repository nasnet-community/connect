import { component$, Slot, useVisibleTask$, $ } from "@builder.io/qwik";
import {
  useResponsiveDetection,
  useCategoryExpansion,
  useToggleCallback,
} from "./hooks";
import {
  DocsSidebarOverlay,
  DocsSidebarHeader,
  DocsSidebarContent,
} from "./components";
import type { DocsSideNavigationProps } from "./types";

export const DocsSideNavigation = component$<DocsSideNavigationProps>(
  (props) => {
    const {
      categories,
      title = "Documentation",
      class: className = "",
      activePath,
      sidebarVisible = true,
      renderFullLayout = false,
    } = props;

    const { isMobile, isCompact } = useResponsiveDetection();

    const { activeHref, expandedCategories, toggleCategory$ } =
      useCategoryExpansion(categories, activePath);

    const toggleSidebar$ = useToggleCallback(props.onToggleSidebar$);

    // Add a scroll lock when sidebar is open on mobile
    useVisibleTask$(({ track }) => {
      const isMobileVal = track(() => isMobile.value);
      const sidebarVal = track(() => sidebarVisible);

      if (isMobileVal && sidebarVal) {
        // Lock scroll when sidebar is open on mobile
        document.body.style.overflow = "hidden";
      } else {
        // Reset scroll when sidebar is closed or on desktop
        document.body.style.overflow = "";
      }

      // Cleanup
      return () => {
        document.body.style.overflow = "";
      };
    });

    // Handle toggle button click
    const handleToggleButtonClick$ = $(() => {
      if (toggleSidebar$) {
        toggleSidebar$();
      }
    });

    // If we're rendering the full layout with content
    if (renderFullLayout) {
      return (
        <div class="min-h-screen bg-surface-light-secondary dark:bg-surface-dark-DEFAULT">
          <div class="container mx-auto px-4 py-4 md:py-6">
            <div class="relative flex flex-col gap-4 md:flex-row">
              {/* Mobile overlay - only when sidebar is visible */}
              {sidebarVisible && isMobile.value && (
                <DocsSidebarOverlay onClick$={handleToggleButtonClick$} />
              )}

              {/* Mobile toggle button - fixed, only when sidebar is closed */}
              {isMobile.value && !sidebarVisible && (
                <button
                  onClick$={handleToggleButtonClick$}
                  class="fixed start-4 top-4 z-mobile-nav flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white shadow-mobile-nav transition-colors duration-200 hover:bg-primary-600 active:animate-press touch:cursor-touch"
                  aria-label="Open menu"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 6L15 12L9 18"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              )}

              {/* Sidebar - the container is always present in the DOM */}
              <div
                class={`
                ${
                  isMobile.value
                    ? "fixed inset-0 z-40 pt-0"
                    : "flex-shrink-0 transition-all duration-300"
                }
                ${
                  !sidebarVisible && isMobile.value
                    ? "pointer-events-none opacity-0"
                    : "pointer-events-auto opacity-100"
                }
                ${
                  sidebarVisible
                    ? isMobile.value
                      ? "h-full w-full"
                      : "w-72 lg:w-80"
                    : isMobile.value
                      ? "w-0"
                      : "w-2"
                }
                relative
              `}
              >
                {/* The actual sidebar content container */}
                <div
                  class={`
                  h-full overflow-auto bg-surface-light-DEFAULT shadow-lg
                  transition-all duration-300 dark:bg-surface-dark-secondary
                  ${isMobile.value ? "w-[85%] max-w-[320px]" : "w-full"}
                  ${isMobile.value && !sidebarVisible ? "animate-slide-out-start transform" : "animate-slide-in-start"}
                  ${isMobile.value ? "pt-14" : "pt-14"}
                  rounded-e-lg border-e border-gray-200 dark:border-gray-700
                `}
                >
                  {/* Toggle button - for desktop (redesigned) - only when sidebar is open */}
                  {!isMobile.value && sidebarVisible && (
                    <div class="absolute start-3 top-3 z-10 transition-all duration-300">
                      <button
                        onClick$={handleToggleButtonClick$}
                        class="
                        flex items-center justify-center gap-2
                        rounded-full bg-primary-50 px-4
                        py-2 text-primary-600
                        shadow-sm transition-all duration-300 hover:bg-primary-100 dark:bg-primary-900/30 dark:text-primary-400
                        dark:hover:bg-primary-900/50 can-hover:hover:animate-lift
                      "
                        aria-label="Close sidebar"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          class="rotate-180 transition-transform duration-300"
                        >
                          <path
                            d="M9 6L15 12L9 18"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <span class="text-sm font-medium">Hide</span>
                      </button>
                    </div>
                  )}

                  {/* Sidebar inner content */}
                  <div
                    class={`p-4 ${!sidebarVisible && !isMobile.value ? "hidden" : ""}`}
                  >
                    {/* Mobile header and close button */}
                    {isMobile.value && (
                      <DocsSidebarHeader
                        title={title}
                        onClose$={handleToggleButtonClick$}
                      />
                    )}

                    {/* Title for desktop */}
                    {!isMobile.value && (
                      <div class="mb-6 ps-10">
                        <h2 class="text-xl font-bold text-gray-900 dark:text-white">
                          {title}
                        </h2>
                        <div class="mt-2 h-0.5 w-16 bg-primary-500 rounded-full"></div>
                      </div>
                    )}

                    <DocsSidebarContent
                      categories={categories}
                      activeHref={activeHref.value}
                      expandedCategories={expandedCategories.value}
                      isCompact={isCompact.value}
                      title={title}
                      class={className}
                      onToggleCategory$={toggleCategory$}
                    />
                  </div>
                </div>

                {/* Collapsed state toggle button - primary color button */}
                {!isMobile.value && !sidebarVisible && (
                  <button
                    onClick$={handleToggleButtonClick$}
                    class="absolute start-0 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-e-full bg-primary-500 p-1.5 text-white shadow-sm transition-colors hover:bg-primary-600 can-hover:hover:animate-lift"
                    aria-label="Open sidebar"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 6L15 12L9 18"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {/* Main content */}
              <div
                class={`flex-1 transition-all duration-300 ${sidebarVisible ? "" : "md:ms-8"}`}
              >
                <div class="rounded-lg border border-gray-200 bg-surface-light-DEFAULT p-4 shadow-sm md:p-5 dark:border-gray-700 dark:bg-surface-dark-DEFAULT">
                  <Slot />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <DocsSidebarContent
        categories={categories}
        activeHref={activeHref.value}
        expandedCategories={expandedCategories.value}
        isCompact={isCompact.value}
        title={title}
        class={className}
        onToggleCategory$={toggleCategory$}
      />
    );
  },
);
