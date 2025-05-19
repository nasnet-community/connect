import { component$, Slot, useVisibleTask$, $ } from "@builder.io/qwik";
import { useResponsiveDetection, useCategoryExpansion, useToggleCallback } from "./hooks";
import { DocsSidebarOverlay, DocsSidebarHeader, DocsSidebarContent } from "./components";
import type { DocsSideNavigationProps } from "./types";

export const DocsSideNavigation = component$<DocsSideNavigationProps>((props) => {
  const { 
    categories, 
    title = "Documentation", 
    class: className = "", 
    activePath,
    sidebarVisible = true,
    renderFullLayout = false
  } = props;
  
  const { isMobile, isCompact } = useResponsiveDetection();
  
  const { 
    activeHref, 
    expandedCategories, 
    toggleCategory$ 
  } = useCategoryExpansion(categories, activePath);
  
  const toggleSidebar$ = useToggleCallback(props.onToggleSidebar$);
  
  // Add a scroll lock when sidebar is open on mobile
  useVisibleTask$(({ track }) => {
    const isMobileVal = track(() => isMobile.value);
    const sidebarVal = track(() => sidebarVisible);
    
    if (isMobileVal && sidebarVal) {
      // Lock scroll when sidebar is open on mobile
      document.body.style.overflow = 'hidden';
    } else {
      // Reset scroll when sidebar is closed or on desktop
      document.body.style.overflow = '';
    }
    
    // Cleanup
    return () => {
      document.body.style.overflow = '';
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
      <div class="bg-slate-50 dark:bg-slate-900 min-h-screen">
        <div class="container mx-auto px-4 py-4 md:py-6">
          <div class="flex flex-col md:flex-row gap-4 relative">
            {/* Mobile overlay - only when sidebar is visible */}
            {sidebarVisible && isMobile.value && (
              <DocsSidebarOverlay onClick$={handleToggleButtonClick$} />
            )}
            
            {/* Mobile toggle button - fixed, only when sidebar is closed */}
            {isMobile.value && !sidebarVisible && (
              <button
                onClick$={handleToggleButtonClick$}
                class="fixed left-4 top-4 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-primary-500 hover:bg-primary-600 text-white shadow-md transition-colors duration-200"
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
                ${isMobile.value 
                  ? 'fixed inset-0 z-40 pt-0' 
                  : 'flex-shrink-0 transition-all duration-300'
                }
                ${!sidebarVisible && isMobile.value 
                  ? 'opacity-0 pointer-events-none' 
                  : 'opacity-100 pointer-events-auto'
                }
                ${sidebarVisible 
                  ? (isMobile.value ? 'w-full h-full' : 'w-72') 
                  : (isMobile.value ? 'w-0' : 'w-2')
                }
                relative
              `}
            >
              {/* The actual sidebar content container */}
              <div
                class={`
                  h-full bg-slate-50 dark:bg-slate-900 shadow-lg
                  transition-all duration-300 overflow-auto
                  ${isMobile.value ? 'w-[85%] max-w-[320px]' : 'w-full'}
                  ${isMobile.value && !sidebarVisible ? 'transform -translate-x-full' : ''}
                  ${isMobile.value ? 'pt-14' : 'pt-14'}
                  rounded-r-lg
                `}
              >
                {/* Toggle button - for desktop (redesigned) - only when sidebar is open */}
                {!isMobile.value && sidebarVisible && (
                  <div class="absolute top-3 left-3 z-10 transition-all duration-300">
                    <button
                      onClick$={handleToggleButtonClick$}
                      class="
                        flex items-center justify-center gap-2
                        px-4 py-2 rounded-full
                        transition-all duration-300
                        bg-primary-50 hover:bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:hover:bg-primary-900/50 dark:text-primary-400
                        shadow-sm
                      "
                      aria-label="Close sidebar"
                    >
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        class="transition-transform duration-300 rotate-180"
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
                <div class={`p-4 ${!sidebarVisible && !isMobile.value ? 'hidden' : ''}`}>
                  {/* Mobile header and close button */}
                  {isMobile.value && <DocsSidebarHeader title={title} onClose$={handleToggleButtonClick$} />}
                  
                  {/* Title for desktop */}
                  {!isMobile.value && (
                    <div class="mb-6 pl-10">
                      <h2 class="text-xl font-bold text-slate-800 dark:text-white">{title}</h2>
                      <div class="h-0.5 w-16 bg-primary-500 mt-2"></div>
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
                  class="absolute left-0 top-3 z-20 flex items-center justify-center w-10 h-10 p-1.5 rounded-r-full bg-primary-500 hover:bg-primary-600 text-white shadow-sm transition-colors"
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
            <div class={`flex-1 transition-all ${sidebarVisible ? '' : 'md:ml-8'}`}>
              <div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-4 md:p-5">
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
}); 