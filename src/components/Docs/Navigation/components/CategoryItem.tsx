import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { PropFunction } from "@builder.io/qwik";
import { DocsSideNavigationCategory } from "../types";

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
    onToggleCategory$
  } = props;
  
  const isCategoryExpanded = expandedCategories[category.id] || false;
  const hasActiveLink = (category.links?.some(link => link.href === activeHref || 
    link.subComponents?.some(subComp => subComp.href === activeHref))) || false;
  const hasSubcategories = category.subcategories && category.subcategories.length > 0;
  const hasContentToToggle = hasSubcategories || (category.links && category.links.length > 0);
  
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
      category.links.forEach(link => {
        if (link.subComponents?.some(subComp => subComp.href === activeHref)) {
          expandedLinks.value = {
            ...expandedLinks.value,
            [link.href]: true
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
      [linkHref]: !expandedLinks.value[linkHref]
    };
  });
  
  return (
    <div class={`space-y-1 ${isCompact ? 'mb-4' : ''} ${level > 0 ? 'ml-3' : ''}`}>
      {/* Category heading with toggle */}
      <div 
        onClick$={handleToggleCategory$}
        class={`
          text-sm font-medium flex justify-between items-center cursor-pointer p-2 rounded-md 
          hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors
          ${isCompact && hasActiveLink ? 'bg-slate-100 dark:bg-slate-700/50' : ''}
          ${isCompact 
            ? 'text-slate-700 dark:text-slate-200 mb-1 py-3 border-b border-slate-100 dark:border-slate-800' 
            : 'text-slate-500 dark:text-slate-400 uppercase tracking-wide'
          }
          ${level > 0 ? 'text-sm' : ''}
          ${hasContentToToggle ? 'cursor-pointer' : 'cursor-default'}
          ${hasActiveLink ? 'text-primary-700 dark:text-primary-400 font-medium' : ''}
        `}
        role={hasContentToToggle ? "button" : undefined}
        aria-expanded={hasContentToToggle ? isExpanded.value : undefined}
      >
        <span>{category.name}</span>
        {hasContentToToggle && (
          <svg 
            class={`w-4 h-4 transition-transform duration-200 ${isExpanded.value ? 'rotate-180' : ''} ${hasActiveLink ? 'text-primary-500' : ''}`} 
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
          ${!isExpanded.value ? 'max-h-0 opacity-0' : 'max-h-[2000px] opacity-100'}
        `}
        aria-hidden={!isExpanded.value}
      >
        {/* Render links if any */}
        {category.links?.map((link) => {
          const isActive = link.href === activeHref;
          const hasSubComponents = link.subComponents && link.subComponents.length > 0;
          const isLinkExpanded = expandedLinks.value[link.href] || false;
          const hasActiveSubComponent = link.subComponents?.some(subComp => subComp.href === activeHref) || false;
          
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
                      group flex items-center px-3 py-2 rounded-md text-sm transition-colors flex-grow
                      ${isCompact ? 'pl-4 py-3' : ''}
                      ${level > 0 ? 'pl-4' : ''}
                      ${isLinkActive ? 
                        'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300 font-medium' : 
                        'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50'
                      }
                    `}
                    onClick$={hasSubComponents ? $((e) => {
                      e.preventDefault();
                      toggleSubComponents$(e, link.href);
                    }) : undefined}
                  >
                    {/* Active indicator */}
                    <div 
                      class={`
                        mr-2 h-1.5 w-1.5 rounded-full transition-all duration-200
                        ${isLinkActive ? 
                          'bg-primary-500 dark:bg-primary-400' : 
                          'bg-transparent group-hover:bg-slate-300 dark:group-hover:bg-slate-600'
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
                        p-2 text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400
                        transition-colors duration-200
                        ${hasActiveSubComponent ? 'text-primary-600 dark:text-primary-400' : ''}
                      `}
                      aria-label={isLinkExpanded ? "Collapse" : "Expand"}
                      aria-expanded={isLinkExpanded}
                      type="button"
                    >
                      <svg 
                        class={`w-3 h-3 transition-transform duration-200 ${isLinkExpanded ? 'rotate-180' : ''}`} 
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
                      ml-6 mt-1 space-y-1 overflow-hidden transition-all duration-300
                      ${isLinkExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
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
                              group flex items-center px-3 py-1.5 rounded-md text-xs transition-colors w-full
                              ${isSubCompActive ? 
                                'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300 font-medium' : 
                                'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700/50'
                              }
                            `}
                          >
                            {/* Active indicator */}
                            <div 
                              class={`
                                mr-2 h-1 w-1 rounded-full transition-all duration-200
                                ${isSubCompActive ? 
                                  'bg-primary-500 dark:bg-primary-400' : 
                                  'bg-transparent group-hover:bg-slate-300 dark:group-hover:bg-slate-600'
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