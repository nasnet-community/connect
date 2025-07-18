import { component$, useSignal, useStore, $, type QRL, useId, useVisibleTask$ } from "@builder.io/qwik";
import { HiChevronDownOutline, HiXMarkOutline, HiMagnifyingGlassOutline } from "@qwikest/icons/heroicons";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

export type SelectSize = "sm" | "md" | "lg";
export type ValidationState = "default" | "valid" | "invalid";

export interface SelectProps {
  options: SelectOption[];
  id?: string;
  name?: string;
  value?: string | string[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  size?: SelectSize;
  validation?: ValidationState;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  class?: string;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  maxHeight?: string;
  onChange$?: QRL<(value: string | string[]) => void>;
}

export const Select = component$<SelectProps>(
  ({
    options = [],
    id,
    name,
    value = "",
    placeholder = "Select an option",
    disabled = false,
    required = false,
    size = "md",
    validation = "default",
    label,
    helperText,
    errorMessage,
    multiple = false,
    searchable = false,
    clearable = true,
    onChange$,
    ...props
  }) => {
    const uniqueId = useId();
    const selectId = id || `select-${uniqueId}`;
    
    const isOpen = useSignal(false);
    const searchQuery = useSignal("");
    
    const selection = useStore<{ values: string[] }>({
      values: Array.isArray(value) ? value : value ? [value] : [],
    });
    
    useVisibleTask$(({ track }) => {
      const trackedValue = track(() => value);
      selection.values = Array.isArray(trackedValue) 
        ? trackedValue 
        : trackedValue 
          ? [trackedValue] 
          : [];
    });

    const sizeClasses = {
      sm: "text-xs px-2.5 py-1.5",
      md: "text-sm px-3 py-2",
      lg: "text-base px-4 py-2.5",
    };

    const validationClasses = {
      default:
        "border-gray-300 bg-white text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500",
      valid:
        "border-green-500 bg-white text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-green-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500",
      invalid:
        "border-red-500 bg-white text-gray-900 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-500 dark:focus:ring-red-500",
    };

    const toggleDropdown$ = $(() => {
      if (!disabled) {
        isOpen.value = !isOpen.value;
        
        if (!isOpen.value) {
          searchQuery.value = "";
        }
      }
    });
    
    const clearSelection$ = $((e: MouseEvent) => {
      e.stopPropagation();
      
      selection.values = [];
      
      onChange$?.(multiple ? [] : "");
    });

    const handleClickOutside$ = $((event: Event) => {
      const target = event.target as HTMLElement;
      
      if (target.closest("[data-select-toggle]") || 
          target.closest("[data-clear-button]")) {
        return;
      }
      
      if (!target.closest(`#select-container-${uniqueId}`)) {
        isOpen.value = false;
        searchQuery.value = "";
      }
    });

    const selectOption$ = $((optionValue: string) => {
      if (multiple) {
        const index = selection.values.indexOf(optionValue);
        if (index > -1) {
          selection.values.splice(index, 1);
        } else {
          selection.values.push(optionValue);
        }
      } else {
        selection.values = [optionValue];
        isOpen.value = false;
      }
      
      onChange$?.(multiple ? selection.values : selection.values[0] || "");
    });

    const handleSearch$ = $((event: Event) => {
      const target = event.target as HTMLInputElement;
      searchQuery.value = target.value;
    });

    const getFilteredOptions = () => {
      if (!searchQuery.value) {
        return options;
      }
      
      const query = searchQuery.value.toLowerCase();
      return options.filter((option) => 
        !option.disabled && option.label.toLowerCase().includes(query)
      );
    };

    const getGroupedOptions = () => {
      const filteredOptions = getFilteredOptions();
      const groupedOptions: Record<string, SelectOption[]> = {};
      
      filteredOptions.forEach(option => {
        const group = option.group || '';
        if (!groupedOptions[group]) {
          groupedOptions[group] = [];
        }
        groupedOptions[group].push(option);
      });
      
      return groupedOptions;
    };

    const isOptionSelected = (optionValue: string) => {
      return selection.values.includes(optionValue);
    };

    const getDisplayText = () => {
      if (selection.values.length === 0) {
        return placeholder;
      }
      
      if (multiple) {
        return `${selection.values.length} selected`;
      }
      
      const selectedOption = options.find(opt => opt.value === selection.values[0]);
      return selectedOption?.label || selection.values[0];
    };

    const baseClasses = "w-full border rounded-lg focus:outline-none focus:ring-2 appearance-none transition-colors";

    return (
      <div class="w-full" id={`select-container-${uniqueId}`}>
        {label && (
          <label
            for={selectId}
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            {label}
            {required && <span class="ml-1 text-red-500">*</span>}
          </label>
        )}
        
        <div class="relative">
          {/* Main select button */}
          <button
            id={selectId}
            type="button"
            data-select-toggle
            class={[
              baseClasses,
              sizeClasses[size],
              validationClasses[validation],
              disabled ? "cursor-not-allowed opacity-60 bg-gray-100 dark:bg-gray-800" : "",
              props.class,
              "flex items-center justify-between",
            ].filter(Boolean).join(" ")}
            aria-haspopup="listbox"
            aria-expanded={isOpen.value}
            disabled={disabled}
            onClick$={toggleDropdown$}
          >
            <div class="flex-1 text-left truncate">
              <span class={selection.values.length === 0 ? "text-gray-500 dark:text-gray-400" : ""}>
                {getDisplayText()}
              </span>
            </div>
            
            <div class="flex items-center">
              {/* Clear button */}
              {clearable && selection.values.length > 0 && (
                <button
                  type="button"
                  class="mr-1 p-1 text-gray-400 hover:text-gray-600 focus:outline-none dark:hover:text-gray-300"
                  aria-label="Clear selection"
                  onClick$={clearSelection$}
                  data-clear-button
                >
                  <HiXMarkOutline class="h-4 w-4" />
                </button>
              )}
              
              {/* Dropdown icon */}
              <HiChevronDownOutline 
                class={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen.value ? 'rotate-180' : ''}`} 
              />
            </div>
          </button>
          
          {/* Dropdown */}
          {isOpen.value && (
            <div 
              class="absolute z-50 mt-1 w-full rounded-md bg-white dark:bg-gray-800 shadow-lg focus:outline-none"
              role="listbox"
              aria-labelledby={selectId}
              aria-multiselectable={multiple}
            >
              {/* Search input */}
              {searchable && (
                <div class="p-2 sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-10">
                  <div class="relative">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <HiMagnifyingGlassOutline class="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      class="block w-full border border-gray-300 dark:border-gray-600 rounded-md text-sm pl-10 pr-3 py-1.5 
                            focus:outline-none focus:ring-2 focus:ring-primary-500 
                            bg-white dark:bg-gray-700 dark:text-white"
                      placeholder="Search..."
                      value={searchQuery.value}
                      onInput$={handleSearch$}
                    />
                  </div>
                </div>
              )}
              
              {/* Options list */}
              <div class="overflow-auto max-h-[300px]">
                {Object.entries(getGroupedOptions()).map(([group, groupOptions]) => (
                  <div key={group || "default"}>
                    {group && (
                      <div class="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 sticky top-0 z-10">
                        {group}
                      </div>
                    )}
                    
                    {groupOptions.map((option) => (
                      <div 
                        key={option.value}
                        class={[
                          "px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center",
                          option.disabled ? "opacity-50 cursor-not-allowed" : "",
                          isOptionSelected(option.value) ? "bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300" : ""
                        ].filter(Boolean).join(" ")}
                        role="option"
                        aria-selected={isOptionSelected(option.value)}
                        onClick$={() => !option.disabled && selectOption$(option.value)}
                      >
                        {multiple && (
                          <span class="mr-2 flex h-4 w-4 items-center justify-center rounded border border-gray-300 dark:border-gray-600">
                            {isOptionSelected(option.value) && (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3 text-primary-500 dark:text-primary-400">
                                <path d="M20 6 9 17l-5-5"></path>
                              </svg>
                            )}
                          </span>
                        )}
                        {option.label}
                      </div>
                    ))}
                  </div>
                ))}
                
                {getFilteredOptions().length === 0 && (
                  <div class="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                    No options found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Error message */}
        {validation === "invalid" && errorMessage && (
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            {errorMessage}
          </p>
        )}
        
        {/* Helper text */}
        {helperText && validation !== "invalid" && (
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}
        
        {/* Hidden native select for form submission */}
        <select
          id={`native-${selectId}`}
          name={name}
          class="sr-only"
          required={required}
          disabled={disabled}
          multiple={multiple}
          aria-hidden="true"
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              selected={isOptionSelected(option.value)}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Click outside handler */}
        <div 
          window:onClick$={handleClickOutside$} 
          class="hidden"
        />
      </div>
    );
  }
); 