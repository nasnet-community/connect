import {
  component$,
  useId,
  useSignal,
  $,
  useVisibleTask$,
  useComputed$,
  useOnWindow,
  useTask$,
} from "@builder.io/qwik";
import type { SelectProps, SelectOption } from "./UnifiedSelect.types";

// Re-export the types for use in stories and other components
export type {
  SelectProps,
  SelectOption,
  SelectSize,
} from "./UnifiedSelect.types";
import {
  styles,
  getSelectNativeClass,
  getSelectButtonClass,
} from "./UnifiedSelect.styles";
import { Spinner } from "../DataDisplay/Progress/Spinner";

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
    loading = false,
    loadingText = "Loading options...",
    class: className = "",
    onChange$,
    onOpenChange$,
  } = props;
  
  // Use a signal to track the current value for better reactivity
  const currentValue = useSignal(value);
  
  // Update currentValue when props.value changes
  useTask$(({ track }) => {
    track(() => props.value);
    if (props.value !== undefined) {
      currentValue.value = props.value;
    }
  });

  // State for custom select mode
  const isOpen = useSignal(false);
  const containerRef = useSignal<HTMLDivElement>();
  const searchValue = useSignal("");
  const debouncedSearchValue = useSignal("");
  const isMobile = useSignal(false);
  const buttonRef = useSignal<HTMLButtonElement>();
  const dropdownRef = useSignal<HTMLDivElement>();
  
  // Viewport positioning state
  const dropdownPosition = useSignal<{
    placement: 'above' | 'below';
    maxHeight: string;
    width: string;
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
  }>({ 
    placement: 'below', 
    maxHeight: '300px', 
    width: '100%' 
  });
  const searchInputRef = useSignal<HTMLInputElement>();
  const optionsContainerRef = useSignal<HTMLDivElement>();
  
  // Keyboard navigation state
  const focusedOptionIndex = useSignal(-1);
  const announceText = useSignal("");
  const lastSearchLength = useSignal(0);

  // Debounce search input with 300ms delay
  useTask$(({ track, cleanup }) => {
    track(() => searchValue.value);
    
    // Clear any existing timeout when searchValue changes
    const timeoutId = setTimeout(() => {
      debouncedSearchValue.value = searchValue.value;
    }, 300);
    
    // Cleanup function to clear timeout if component unmounts or searchValue changes again
    cleanup(() => clearTimeout(timeoutId));
  });

  // Filter options based on debounced search value
  const filteredOptions = useComputed$(() => {
    if (!searchable || !debouncedSearchValue.value) return options;

    return options.filter((option) =>
      option.label.toLowerCase().includes(debouncedSearchValue.value.toLowerCase()),
    );
  });

  // Keyboard navigation helpers
  const getSelectableOptions = $(() => {
    return filteredOptions.value.filter(option => !option.disabled);
  });

  const announceOption = $((option: SelectOption) => {
    // Inline the isSelected logic for serialization
    const isOptionSelected = Array.isArray(value) 
      ? value.includes(option.value) 
      : value === option.value;
    const selectedText = isOptionSelected ? "selected" : "not selected";
    announceText.value = `${option.label}, ${selectedText}`;
  });

  const announceSearchResults = $((count: number) => {
    if (count === 0) {
      announceText.value = "No options found";
    } else {
      announceText.value = `${count} option${count === 1 ? '' : 's'} available`;
    }
  });

  const scrollOptionIntoView = $((index: number) => {
    if (!optionsContainerRef.value) return;
    
    const options = optionsContainerRef.value.querySelectorAll('[role="option"]:not([aria-disabled="true"])');
    const option = options[index] as HTMLElement;
    
    if (option) {
      const container = optionsContainerRef.value;
      const optionTop = option.offsetTop;
      const optionBottom = optionTop + option.offsetHeight;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      
      if (optionTop < containerScrollTop) {
        container.scrollTop = optionTop;
      } else if (optionBottom > containerScrollTop + containerHeight) {
        container.scrollTop = optionBottom - containerHeight;
      }
    }
  });

  const moveFocus = $(async (direction: 'up' | 'down' | 'first' | 'last') => {
    const selectableOptions = await getSelectableOptions();
    if (selectableOptions.length === 0) return;

    let newIndex = focusedOptionIndex.value;

    switch (direction) {
      case 'down':
        newIndex = newIndex < selectableOptions.length - 1 ? newIndex + 1 : 0;
        break;
      case 'up':
        newIndex = newIndex > 0 ? newIndex - 1 : selectableOptions.length - 1;
        break;
      case 'first':
        newIndex = 0;
        break;
      case 'last':
        newIndex = selectableOptions.length - 1;
        break;
    }

    focusedOptionIndex.value = newIndex;
    await scrollOptionIntoView(newIndex);
    await announceOption(selectableOptions[newIndex]);
  });

  const selectFocusedOption = $(async () => {
    const selectableOptions = await getSelectableOptions();
    if (focusedOptionIndex.value >= 0 && focusedOptionIndex.value < selectableOptions.length) {
      const option = selectableOptions[focusedOptionIndex.value];
      await handleSelectOption(option);
    }
  });

  // Focus trap implementation
  const trapFocus = $((e: KeyboardEvent) => {
    if (!isOpen.value || !dropdownRef.value) return;

    const focusableElements = dropdownRef.value.querySelectorAll(
      'input, button, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  });

  // Compute selected value(s) label for display
  const displayValue = useComputed$(() => {
    const val = currentValue.value;
    if (!val) return "";

    if (Array.isArray(val)) {
      if (val.length === 0) return "";

      const selectedLabels = options
        .filter((opt) => val.includes(opt.value))
        .map((opt) => opt.label);

      return selectedLabels.join(", ");
    }

    const selectedOption = options.find((opt) => opt.value === val);
    return selectedOption ? selectedOption.label : "";
  });

  // Check if mobile device and handle orientation changes
  useVisibleTask$(() => {
    const checkMobile = () => {
      isMobile.value = window.innerWidth < 768;
      // Recalculate position on orientation change for mobile
      if (isOpen.value && !isMobile.value) {
        setTimeout(() => calculateDropdownPosition(), 100);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    window.addEventListener("orientationchange", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("orientationchange", checkMobile);
    };
  });

  // Viewport positioning utilities
  const calculateDropdownPosition = $(() => {
    if (!buttonRef.value || !containerRef.value || isMobile.value) {
      return;
    }

    const buttonRect = buttonRef.value.getBoundingClientRect();
    const _containerRect = containerRef.value.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    
    // Calculate available space with safe area considerations
    const safeAreaTop = 20; // Account for status bars, etc.
    const safeAreaBottom = 20;
    const safeAreaSides = 16;
    
    const spaceAbove = buttonRect.top - safeAreaTop;
    const spaceBelow = viewportHeight - buttonRect.bottom - safeAreaBottom;
    
    // Dropdown dimensions with dynamic calculation
    const baseOptionHeight = 48; // Height per option in pixels
    const paddingHeight = searchable ? 120 : 80; // Account for search input and padding
    const maxVisibleOptions = 8; // Maximum options to show before scrolling
    const actualOptionCount = Math.min(filteredOptions.value.length, maxVisibleOptions);
    const estimatedDropdownHeight = actualOptionCount * baseOptionHeight + paddingHeight;
    
    // Calculate preferred dropdown width
    const minDropdownWidth = 200;
    const maxDropdownWidth = Math.min(viewportWidth - 2 * safeAreaSides, 500);
    const dropdownWidth = Math.max(
      Math.min(buttonRect.width, maxDropdownWidth), 
      minDropdownWidth
    );
    
    // Determine placement with improved logic
    let placement: 'above' | 'below' = 'below';
    let maxHeight = '300px';
    
    // Minimum height to show at least 4 options properly
    const minRequiredHeight = Math.max(200, baseOptionHeight * 4 + paddingHeight * 0.5);
    
    // Improved placement logic: switch to 'above' more readily when space below is insufficient
    if ((spaceBelow < minRequiredHeight && spaceAbove > spaceBelow) || 
        (spaceBelow < estimatedDropdownHeight * 0.6 && spaceAbove > estimatedDropdownHeight * 0.6)) {
      placement = 'above';
      maxHeight = `${Math.min(spaceAbove, 500)}px`;
    } else {
      placement = 'below';
      // Ensure minimum height even if space is limited, but allow expansion to viewport edge if needed
      maxHeight = `${Math.max(Math.min(spaceBelow, 500), Math.min(minRequiredHeight, spaceBelow + 20))}px`;
    }
    
    // Final minimum height enforcement
    const absoluteMinHeight = Math.min(180, baseOptionHeight * 3 + 40);
    if (parseInt(maxHeight) < absoluteMinHeight) {
      maxHeight = `${absoluteMinHeight}px`;
    }
    
    // Calculate horizontal positioning with better overflow handling
    let left: string | undefined;
    let right: string | undefined;
    let width = `${dropdownWidth}px`;
    
    // Check for left overflow
    if (buttonRect.left < safeAreaSides) {
      left = `${safeAreaSides}px`;
      width = `${Math.min(dropdownWidth, viewportWidth - 2 * safeAreaSides)}px`;
    }
    // Check for right overflow
    else if (buttonRect.left + dropdownWidth > viewportWidth - safeAreaSides) {
      const availableWidth = viewportWidth - 2 * safeAreaSides;
      
      if (buttonRect.right >= dropdownWidth + safeAreaSides) {
        // Align dropdown right edge with button right edge
        right = `${viewportWidth - buttonRect.right}px`;
        width = `${Math.min(dropdownWidth, buttonRect.right - safeAreaSides)}px`;
      } else {
        // Align dropdown to right edge of viewport with margin
        right = `${safeAreaSides}px`;
        width = `${availableWidth}px`;
      }
    } else {
      // Normal left alignment
      left = `${buttonRect.left}px`;
    }
    
    // Update position state
    dropdownPosition.value = {
      placement,
      maxHeight,
      width,
      left,
      right,
      top: placement === 'below' ? `${buttonRect.bottom + 4}px` : undefined,
      bottom: placement === 'above' ? `${viewportHeight - buttonRect.top + 4}px` : undefined,
    };
  });

  // Update dropdown position when opened or window resizes
  useVisibleTask$(({ track }) => {
    track(() => isOpen.value);
    track(() => filteredOptions.value.length);
    
    if (isOpen.value && !isMobile.value) {
      // Use setTimeout to ensure DOM is updated
      setTimeout(() => calculateDropdownPosition(), 0);
    }
  });

  // Listen for window resize and scroll events
  useOnWindow('resize', calculateDropdownPosition);
  useOnWindow('scroll', calculateDropdownPosition);

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
        // Clear search when closing dropdown
        if (searchable) {
          searchValue.value = "";
          debouncedSearchValue.value = "";
        }
      }
    };

    const handleKeyDown = async (event: KeyboardEvent) => {
      if (!isOpen.value) return;

      switch (event.key) {
        case "Escape":
          event.preventDefault();
          isOpen.value = false;
          if (onOpenChange$) {
            onOpenChange$(false);
          }
          focusedOptionIndex.value = -1;
          buttonRef.value?.focus();
          break;
        
        case "ArrowDown":
          event.preventDefault();
          await moveFocus('down');
          break;
        
        case "ArrowUp":
          event.preventDefault();
          await moveFocus('up');
          break;
        
        case "Home":
          event.preventDefault();
          await moveFocus('first');
          break;
        
        case "End":
          event.preventDefault();
          await moveFocus('last');
          break;
        
        case "Enter":
        case " ": // Space key
          if (document.activeElement === searchInputRef.value) {
            // Let search input handle space normally
            if (event.key === " ") return;
          }
          event.preventDefault();
          await selectFocusedOption();
          break;
        
        case "Tab":
          await trapFocus(event);
          break;
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  // Handle search results announcements and focus reset
  useTask$(({ track }) => {
    track(() => filteredOptions.value);
    track(() => isOpen.value);
    
    if (isOpen.value && searchable) {
      // Reset focused option when search results change
      focusedOptionIndex.value = -1;
      
      // Announce search results for screen readers
      if (lastSearchLength.value !== filteredOptions.value.length) {
        announceSearchResults(filteredOptions.value.length);
        lastSearchLength.value = filteredOptions.value.length;
      }
    }
  });

  // Handle dropdown open/close focus management
  useTask$(({ track }) => {
    track(() => isOpen.value);
    
    if (isOpen.value) {
      // Focus search input if searchable, otherwise prepare for keyboard navigation
      if (searchable && searchInputRef.value) {
        setTimeout(() => searchInputRef.value?.focus(), 0);
      } else {
        // Initialize focus on first option if no search
        focusedOptionIndex.value = 0;
        const selectableOptions = filteredOptions.value.filter(opt => !opt.disabled);
        if (selectableOptions.length > 0) {
          announceOption(selectableOptions[0]);
        }
      }
    } else {
      // Reset state when dropdown closes
      focusedOptionIndex.value = -1;
      searchValue.value = "";
      announceText.value = "";
    }
  });

  // Helper function to render option content
  const renderOption = (option: SelectOption, isOptionSelected: boolean) => {
    // We'll simplify to use only the default rendering for now
    // Custom renderers can be implemented with proper Qwik patterns later
    return <span class={isOptionSelected ? "font-medium" : ""}>{option.label}</span>;
  };

  // Handle option selection
  const handleSelectOption = $((option: SelectOption) => {
    if (option.disabled) return;

    // Safely capture onChange$ to avoid lexical scope issues
    const safeOnChange$ = onChange$;

    if (multiple) {
      const val = currentValue.value;
      const currentValues = Array.isArray(val) ? [...val] : [];

      if (currentValues.includes(option.value)) {
        // Remove the value if already selected
        const newValues = currentValues.filter((v) => v !== option.value);
        currentValue.value = newValues;
        if (safeOnChange$) {
          safeOnChange$(newValues);
        }
      } else {
        // Add the value
        const newValues = [...currentValues, option.value];
        currentValue.value = newValues;
        if (safeOnChange$) {
          safeOnChange$(newValues);
        }
      }
    } else {
      currentValue.value = option.value;
      if (safeOnChange$) {
        safeOnChange$(option.value);
      }
      isOpen.value = false;
      // Call onOpenChange$ callback when closing after selection
      if (onOpenChange$) {
        onOpenChange$(false);
      }
    }
  });

  // Clear selection
  const handleClear = $((e: MouseEvent) => {
    e.stopPropagation();
    // Safely capture onChange$ to avoid lexical scope issues
    const safeOnChange$ = onChange$;
    const newValue = multiple ? [] : "";
    currentValue.value = newValue;
    if (safeOnChange$) {
      safeOnChange$(newValue);
    }
  });

  // Handle search input with immediate response for clearing
  const _handleSearchInput = $((inputValue: string) => {
    searchValue.value = inputValue;
    
    // Immediate clear for better UX - if user clears search, show all options immediately
    if (inputValue === "") {
      debouncedSearchValue.value = "";
    }
  });

  // Toggle dropdown
  const toggleDropdown = $(() => {
    if (!disabled && !loading) {
      const newOpenState = !isOpen.value;
      isOpen.value = newOpenState;
      if (newOpenState && searchable) {
        searchValue.value = "";
        debouncedSearchValue.value = "";
      }
      // Call onOpenChange$ callback if provided
      if (onOpenChange$) {
        onOpenChange$(newOpenState);
      }
    }
  });

  // Check if a value is selected
  const isSelected = (optionValue: string): boolean => {
    const val = currentValue.value;
    if (Array.isArray(val)) {
      return val.includes(optionValue);
    }
    return val === optionValue;
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
          value={Array.isArray(currentValue.value) ? currentValue.value[0] : currentValue.value}
          multiple={multiple}
          onChange$={(e) => {
            const target = e.target as HTMLSelectElement;
            if (multiple) {
              const selectedOptions = Array.from(target.selectedOptions).map(
                (opt) => opt.value,
              );
              currentValue.value = selectedOptions;
              onChange$?.(selectedOptions);
            } else {
              currentValue.value = target.value;
              onChange$?.(target.value);
            }
          }}
        >
          {placeholder && !required && (
            <option value="" disabled>
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

        {errorMessage && <div class={styles.errorMessage}>{errorMessage}</div>}
      </div>
    );
  }

  // Render custom select mode
  return (
    <div class={`${styles.selectContainer} ${className} ${isOpen.value ? 'relative z-50' : ''}`} ref={containerRef}>
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
          ref={buttonRef}
          class={`${getSelectButtonClass(size, validation, disabled || loading)} ${styles.focusRing}`}
          disabled={disabled || loading}
          onClick$={toggleDropdown}
          onKeyDown$={async (e) => {
            switch (e.key) {
              case "Enter":
              case " ": // Space
                e.preventDefault();
                if (!isOpen.value) {
                  isOpen.value = true;
                  focusedOptionIndex.value = -1;
                }
                break;
              case "ArrowDown":
                e.preventDefault();
                if (!isOpen.value) {
                  isOpen.value = true;
                  focusedOptionIndex.value = -1;
                } else {
                  await moveFocus('down');
                }
                break;
              case "ArrowUp":
                e.preventDefault();
                if (!isOpen.value) {
                  isOpen.value = true;
                  focusedOptionIndex.value = -1;
                } else {
                  await moveFocus('up');
                }
                break;
              case "Home":
                if (isOpen.value) {
                  e.preventDefault();
                  await moveFocus('first');
                }
                break;
              case "End":
                if (isOpen.value) {
                  e.preventDefault();
                  await moveFocus('last');
                }
                break;
            }
          }}
          aria-haspopup="listbox"
          aria-expanded={isOpen.value}
          aria-label={`${label || placeholder}${required ? " (required)" : ""}`}
          aria-owns={isOpen.value ? `${id}-listbox` : undefined}
          aria-describedby={`${helperText ? `${id}-helper` : ""} ${errorMessage ? `${id}-error` : ""} ${loading ? `${id}-loading` : ""}`}
          aria-invalid={errorMessage ? "true" : "false"}
          aria-required={required}
          aria-activedescendant={
            isOpen.value && focusedOptionIndex.value >= 0 
              ? `${id}-option-${focusedOptionIndex.value}` 
              : undefined
          }
        >
          <span class={!displayValue.value ? styles.placeholder : ""}>
            {loading ? loadingText : (displayValue.value || placeholder)}
          </span>
          
          {/* Loading indicator for button */}
          {loading && (
            <div class="absolute inset-y-0 end-12 flex items-center">
              <Spinner size="sm" aria-hidden="true" />
            </div>
          )}

          <div class="flex items-center">
            {clearable && displayValue.value && !disabled && (
              <button
                type="button"
                class={`${styles.clearButton} ${styles.focusRing}`}
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
          <>
            {/* Enhanced mobile backdrop with gesture support */}
            {isMobile.value && (
              <div 
                class={styles.mobileBackdrop}
                onClick$={() => {
                  isOpen.value = false;
                  if (onOpenChange$) {
                    onOpenChange$(false);
                  }
                }}
                onTouchStart$={(e) => {
                  // Allow swipe down to close
                  const startY = e.touches[0].clientY;
                  const handleTouchMove = (moveE: TouchEvent) => {
                    const currentY = moveE.touches[0].clientY;
                    const diff = currentY - startY;
                    if (diff > 100) { // Swipe down threshold
                      isOpen.value = false;
                      if (onOpenChange$) {
                        onOpenChange$(false);
                      }
                      document.removeEventListener('touchmove', handleTouchMove);
                    }
                  };
                  document.addEventListener('touchmove', handleTouchMove, { passive: true });
                  
                  // Cleanup on touch end
                  const handleTouchEnd = () => {
                    document.removeEventListener('touchmove', handleTouchMove);
                    document.removeEventListener('touchend', handleTouchEnd);
                  };
                  document.addEventListener('touchend', handleTouchEnd, { once: true });
                }}
              />
            )}
            
            <div 
              ref={dropdownRef}
              id={`${id}-listbox`}
              class={`${styles.dropdown} ${dropdownPosition.value.placement === 'above' ? styles.dropdownAbove : styles.dropdownBelow} bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg rounded-md`} 
              role="listbox" 
              aria-label={label}
              aria-multiselectable={multiple ? "true" : "false"}
              style={isMobile.value ? 
                { zIndex: "1050" } : 
                {
                  maxHeight: dropdownPosition.value.maxHeight,
                  zIndex: '1000'
                }
              }
            >
              {/* Enhanced mobile header with handle */}
              {isMobile.value && (
                <div class={styles.mobileHeader}>
                  <div class={styles.mobileHandle} />
                  <div class="flex items-center justify-between w-full">
                    <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">{label || "Select option"}</h3>
                    <button
                      class={`${styles.mobileCloseButton} ${styles.focusRing}`}
                      onClick$={() => {
                        isOpen.value = false;
                        if (onOpenChange$) {
                          onOpenChange$(false);
                        }
                      }}
                      aria-label="Close selection"
                    >
                      <svg
                        class="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              
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
                    ref={searchInputRef}
                    type="text"
                    class={`${styles.searchInput} ${styles.focusRing}`}
                    placeholder="Search options..."
                    value={searchValue.value}
                    role="combobox"
                    aria-autocomplete="list"
                    aria-expanded={isOpen.value}
                    aria-owns={`${id}-listbox`}
                    aria-describedby={helperText ? `${id}-helper` : undefined}
                    aria-activedescendant={
                      focusedOptionIndex.value >= 0 
                        ? `${id}-option-${focusedOptionIndex.value}` 
                        : undefined
                    }
                    onInput$={(e) => {
                      const value = (e.target as HTMLInputElement).value;
                      searchValue.value = value;
                    }}
                    onKeyDown$={async (e) => {
                      switch (e.key) {
                        case "ArrowDown":
                          e.preventDefault();
                          await moveFocus('down');
                          break;
                        case "ArrowUp":
                          e.preventDefault();
                          await moveFocus('up');
                          break;
                        case "Home":
                          if (!e.ctrlKey) {
                            e.preventDefault();
                            await moveFocus('first');
                          }
                          break;
                        case "End":
                          if (!e.ctrlKey) {
                            e.preventDefault();
                            await moveFocus('last');
                          }
                          break;
                        case "Enter":
                          e.preventDefault();
                          await selectFocusedOption();
                          break;
                        case "Escape":
                          e.preventDefault();
                          isOpen.value = false;
                          if (onOpenChange$) {
                            onOpenChange$(false);
                          }
                          buttonRef.value?.focus();
                          break;
                      }
                    }}
                  />
                </div>
              </div>
            )}

            <div 
              class={`${styles.optionsContainer} bg-white dark:bg-gray-800`} 
              ref={optionsContainerRef}
              style={{
                maxHeight: isMobile.value ? '60vh' : dropdownPosition.value.maxHeight
              }}
            >
              {filteredOptions.value.length === 0 ? (
                <div class={styles.noResults}>
                  {props.noResultsText || "No options found"}
                </div>
              ) : (
                <>
                  {/* Group options by group property if any options have it */}
                  {(() => {
                    // Check if any options have group property
                    const hasGroups = filteredOptions.value.some(
                      (opt) => opt.group,
                    );

                    if (hasGroups) {
                      // Organize options by groups
                      const groups: Record<string, SelectOption[]> = {};

                      // Add ungrouped options to a special group
                      const ungroupedOptions = filteredOptions.value.filter(
                        (opt) => !opt.group,
                      );
                      if (ungroupedOptions.length > 0) {
                        groups["__ungrouped__"] = ungroupedOptions;
                      }

                      // Add grouped options
                      filteredOptions.value.forEach((opt) => {
                        if (opt.group) {
                          if (!groups[opt.group]) {
                            groups[opt.group] = [];
                          }
                          groups[opt.group].push(opt);
                        }
                      });

                      // Render groups and their options
                      return Object.entries(groups).map(
                        ([groupName, groupOptions]) => (
                          <div key={groupName}>
                            {groupName !== "__ungrouped__" && (
                              <div class={styles.groupHeader}>{groupName}</div>
                            )}
                            {groupOptions.map((option, _optionIndex) => {
                              const globalIndex = filteredOptions.value.indexOf(option);
                              return (
                              <div
                                key={option.value}
                                id={`${id}-option-${globalIndex}`}
                                class={`
                                ${styles.option}
                                ${option.disabled ? styles.optionDisabled : ""}
                                ${isSelected(option.value) ? styles.optionSelected : ""}
                                ${focusedOptionIndex.value === globalIndex ? "bg-gray-100 dark:bg-gray-600" : ""}
                              `}
                                role="option"
                                aria-selected={isSelected(option.value)}
                                aria-disabled={option.disabled}
                                onClick$={() => !option.disabled && handleSelectOption(option)}
                                onMouseEnter$={() => {
                                  if (!option.disabled) {
                                    focusedOptionIndex.value = globalIndex;
                                  }
                                }}
                              >
                                {multiple && props.showCheckboxes !== false && (
                                  <div
                                    class={`
                                  ${styles.checkbox}
                                  ${isSelected(option.value) ? styles.checkboxSelected : ""}
                                `}
                                  >
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
                              );
                            })}
                          </div>
                        ),
                      );
                    } else {
                      // If no groups, render options directly
                      return filteredOptions.value.map((option, optionIndex) => (
                        <div
                          key={option.value}
                          id={`${id}-option-${optionIndex}`}
                          class={`
                            ${styles.option}
                            ${option.disabled ? styles.optionDisabled : ""}
                            ${isSelected(option.value) ? styles.optionSelected : ""}
                            ${focusedOptionIndex.value === optionIndex ? "bg-gray-100 dark:bg-gray-600" : ""}
                          `}
                          role="option"
                          aria-selected={isSelected(option.value)}
                          aria-disabled={option.disabled}
                          onClick$={() => !option.disabled && handleSelectOption(option)}
                          onMouseEnter$={() => {
                            if (!option.disabled) {
                              focusedOptionIndex.value = optionIndex;
                            }
                          }}
                        >
                          {multiple && props.showCheckboxes !== false && (
                            <div
                              class={`
                              ${styles.checkbox}
                              ${isSelected(option.value) ? styles.checkboxSelected : ""}
                            `}
                            >
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
          </>
        )}
      </div>

      {helperText && !errorMessage && (
        <div id={`${id}-helper`} class={styles.helperText}>{helperText}</div>
      )}

      {errorMessage && (
        <div id={`${id}-error`} class={styles.errorMessage} role="alert" aria-live="polite">
          <svg class="inline h-4 w-4 me-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          {errorMessage}
        </div>
      )}

      {/* Hidden input for form submission */}
      {name && (
        <input
          type="hidden"
          name={name}
          value={Array.isArray(currentValue.value) ? currentValue.value.join(",") : currentValue.value}
        />
      )}
    </div>
  );
});

export default UnifiedSelect;
