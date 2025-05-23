import { component$, useId, useSignal, $, useVisibleTask$, useComputed$ } from "@builder.io/qwik";
import type { SelectProps, SelectOption } from "./UnifiedSelect.types";

// Re-export the types for use in stories and other components
export type { SelectProps, SelectOption, SelectSize } from "./UnifiedSelect.types";
import { styles, getSelectNativeClass, getSelectButtonClass } from "./UnifiedSelect.styles";

/**
 * Unified Select component that combines features from both Select and VPNSelect
 * Supports both native and custom UI modes
 */
export const UnifiedSelect = component$<SelectProps>((props) => {
  const selectId = useId();
  const {
    id = selectId,
    options = [],
    value = "",
    placeholder = "Select an option",
    disabled = false,
    required = false,
    name,
    size = "md",
    validation = "default",
    label,
    helperText,
    errorMessage,
    multiple = false,
    mode = "custom",
    clearable = true,
    searchable = false,
    class: className = "",
    onChange$,
  } = props;

  // State for custom select mode
  const isOpen = useSignal(false);
  const containerRef = useSignal<HTMLDivElement>();
  const searchValue = useSignal("");
  
  // Compute selected value(s) label for display
  const displayValue = useComputed$(() => {
    if (!value) return "";
    
    if (Array.isArray(value)) {
      if (value.length === 0) return "";
      
      const selectedLabels = options
        .filter(opt => value.includes(opt.value))
        .map(opt => opt.label);
        
      return selectedLabels.join(", ");
    }
    
    const selectedOption = options.find(opt => opt.value === value);
    return selectedOption ? selectedOption.label : "";
  });
  
  // Close dropdown when clicking outside
  useVisibleTask$(({ track }) => {
    track(() => containerRef.value);
    if (!containerRef.value) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.value && 
        !containerRef.value.contains(event.target as Node) && 
        isOpen.value
      ) {
        isOpen.value = false;
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });
  
  // Filter options based on search value
  const filteredOptions = useComputed$(() => {
    if (!searchable || !searchValue.value) return options;
    
    return options.filter(option => 
      option.label.toLowerCase().includes(searchValue.value.toLowerCase())
    );
  });
  
  // Helper function to render option content
  const renderOption = (option: SelectOption, isSelected: boolean) => {
    // We'll simplify to use only the default rendering for now
    // Custom renderers can be implemented with proper Qwik patterns later
    return <span class={isSelected ? "font-medium" : ""}>{option.label}</span>;
  };
  
  // Handle option selection
  const handleSelectOption = $((option: SelectOption) => {
    if (option.disabled) return;
    
    // Safely capture onChange$ to avoid lexical scope issues
    const safeOnChange$ = onChange$;
    
    if (multiple) {
      const currentValues = Array.isArray(value) ? [...value] : [];
      
      if (currentValues.includes(option.value)) {
        // Remove the value if already selected
        const newValues = currentValues.filter(v => v !== option.value);
        if (safeOnChange$) {
          safeOnChange$(newValues);
        }
      } else {
        // Add the value
        const newValues = [...currentValues, option.value];
        if (safeOnChange$) {
          safeOnChange$(newValues);
        }
      }
    } else {
      if (safeOnChange$) {
        safeOnChange$(option.value);
      }
      isOpen.value = false;
    }
  });
  
  // Clear selection
  const handleClear = $((e: MouseEvent) => {
    e.stopPropagation();
    // Safely capture onChange$ to avoid lexical scope issues
    const safeOnChange$ = onChange$;
    if (safeOnChange$) {
      safeOnChange$(multiple ? [] : "");
    }
  });
  
  // Toggle dropdown
  const toggleDropdown = $(() => {
    if (!disabled) {
      isOpen.value = !isOpen.value;
      if (isOpen.value && searchable) {
        searchValue.value = "";
      }
    }
  });
  
  // Check if a value is selected
  const isSelected = (optionValue: string): boolean => {
    if (Array.isArray(value)) {
      return value.includes(optionValue);
    }
    return value === optionValue;
  };
  
  // Render native select mode
  if (mode === "native") {
    return (
      <div class={`${styles.selectContainer} ${className}`}>
        {label && (
          <label for={id} class={styles.selectLabel}>
            {label}
            {required && <span class={styles.selectRequired}>*</span>}
          </label>
        )}
        
        <select
          id={id}
          name={name}
          required={required}
          disabled={disabled}
          class={getSelectNativeClass(size, validation)}
          value={Array.isArray(value) ? value[0] : value}
          multiple={multiple}
          onChange$={(e) => {
            const target = e.target as HTMLSelectElement;
            if (multiple) {
              const selectedOptions = Array.from(target.selectedOptions).map(opt => opt.value);
              onChange$?.(selectedOptions);
            } else {
              onChange$?.(target.value);
            }
          }}
        >
          {placeholder && !required && (
            <option value="" disabled={required}>
              {placeholder}
            </option>
          )}
          
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {helperText && !errorMessage && (
          <div class={styles.helperText}>{helperText}</div>
        )}
        
        {errorMessage && (
          <div class={styles.errorMessage}>{errorMessage}</div>
        )}
      </div>
    );
  }
  
  // Render custom select mode
  return (
    <div 
      class={`${styles.selectContainer} ${className}`} 
      ref={containerRef}
    >
      {label && (
        <label for={id} class={styles.selectLabel}>
          {label}
          {required && <span class={styles.selectRequired}>*</span>}
        </label>
      )}
      
      <div class={styles.customSelect}>
        <button
          id={id}
          type="button"
          class={getSelectButtonClass(size, validation, disabled)}
          disabled={disabled}
          onClick$={toggleDropdown}
          aria-haspopup="listbox"
          aria-expanded={isOpen.value}
        >
          <span class={!displayValue.value ? styles.placeholder : ""}>
            {displayValue.value || placeholder}
          </span>
          
          <div class="flex items-center">
            {clearable && displayValue.value && !disabled && (
              <button
                type="button"
                class={styles.clearButton}
                onClick$={handleClear}
                aria-label="Clear selection"
              >
                <svg 
                  class={styles.clearIcon} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
            
            <svg
              class={`${styles.icon} ${isOpen.value ? styles.iconOpen : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </button>
        
        {isOpen.value && (
          <div class={styles.dropdown} role="listbox" aria-label={label}>
            {searchable && (
              <div class={styles.searchContainer}>
                <div class="relative">
                  <div class={styles.searchIcon}>
                    <svg
                      class="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    class={styles.searchInput}
                    placeholder="Search..."
                    value={searchValue.value}
                    onInput$={(e) => {
                      searchValue.value = (e.target as HTMLInputElement).value;
                    }}
                  />
                </div>
              </div>
            )}
            
            <div class={styles.optionsContainer}>
              {filteredOptions.value.length === 0 ? (
                <div class={styles.noResults}>
                  {props.noResultsText || "No options found"}
                </div>
              ) : (
                <>
                  {/* Group options by group property if any options have it */}
                  {(() => {
                    // Check if any options have group property
                    const hasGroups = filteredOptions.value.some(opt => opt.group);
                    
                    if (hasGroups) {
                      // Organize options by groups
                      const groups: Record<string, SelectOption[]> = {};
                      
                      // Add ungrouped options to a special group
                      const ungroupedOptions = filteredOptions.value.filter(opt => !opt.group);
                      if (ungroupedOptions.length > 0) {
                        groups['__ungrouped__'] = ungroupedOptions;
                      }
                      
                      // Add grouped options
                      filteredOptions.value.forEach(opt => {
                        if (opt.group) {
                          if (!groups[opt.group]) {
                            groups[opt.group] = [];
                          }
                          groups[opt.group].push(opt);
                        }
                      });
                      
                      // Render groups and their options
                      return Object.entries(groups).map(([groupName, groupOptions]) => (
                        <div key={groupName}>
                          {groupName !== '__ungrouped__' && (
                            <div class={styles.groupHeader}>{groupName}</div>
                          )}
                          {groupOptions.map((option) => (
                            <div
                              key={option.value}
                              class={`
                                ${styles.option}
                                ${option.disabled ? styles.optionDisabled : ""}
                                ${isSelected(option.value) ? styles.optionSelected : ""}
                              `}
                              role="option"
                              aria-selected={isSelected(option.value)}
                              onClick$={() => handleSelectOption(option)}
                            >
                              {multiple && props.showCheckboxes !== false && (
                                <div class={`
                                  ${styles.checkbox}
                                  ${isSelected(option.value) ? styles.checkboxSelected : ""}
                                `}>
                                  {isSelected(option.value) && (
                                    <svg
                                      class="h-3 w-3"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd"
                                      />
                                    </svg>
                                  )}
                                </div>
                              )}
                              
                              {renderOption(option, isSelected(option.value))}
                            </div>
                          ))}
                        </div>
                      ));
                    } else {
                      // If no groups, render options directly
                      return filteredOptions.value.map((option) => (
                        <div
                          key={option.value}
                          class={`
                            ${styles.option}
                            ${option.disabled ? styles.optionDisabled : ""}
                            ${isSelected(option.value) ? styles.optionSelected : ""}
                          `}
                          role="option"
                          aria-selected={isSelected(option.value)}
                          onClick$={() => handleSelectOption(option)}
                        >
                          {multiple && props.showCheckboxes !== false && (
                            <div class={`
                              ${styles.checkbox}
                              ${isSelected(option.value) ? styles.checkboxSelected : ""}
                            `}>
                              {isSelected(option.value) && (
                                <svg
                                  class="h-3 w-3"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              )}
                            </div>
                          )}
                          
                          <span>{option.label}</span>
                        </div>
                      ));
                    }
                  })()} 
                </>
              )}
            </div>
          </div>
        )}
      </div>
      
      {helperText && !errorMessage && (
        <div class={styles.helperText}>{helperText}</div>
      )}
      
      {errorMessage && (
        <div class={styles.errorMessage}>{errorMessage}</div>
      )}
      
      {/* Hidden input for form submission */}
      {name && (
        <input 
          type="hidden" 
          name={name} 
          value={Array.isArray(value) ? value.join(",") : value} 
        />
      )}
    </div>
  );
});

export default UnifiedSelect;
