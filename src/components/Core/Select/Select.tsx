import { component$, useSignal, useStore, $, type QRL, useId } from "@builder.io/qwik";

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
  onChange$?: QRL<(value: string | string[]) => void>;
}

export const Select = component$<SelectProps>(
  ({
    options,
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
    onChange$,
    ...props
  }) => {
    const uniqueId = useId();
    const selectId = id || `select-${uniqueId}`;
    
    const isOpen = useSignal(false);
    const searchQuery = useSignal("");
    
    const selectedValues = useStore<{ values: string[] }>({
      values: Array.isArray(value) ? value : value ? [value] : [],
    });

    const baseClasses = "block w-full border rounded-lg focus:outline-none focus:ring-2 appearance-none transition-colors";

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

    const disabledClasses = disabled
      ? "cursor-not-allowed opacity-60 bg-gray-100 dark:bg-gray-800"
      : "";

    const toggleSelect$ = $(() => {
      if (!disabled) {
        isOpen.value = !isOpen.value;
      }
    });

    const handleClickOutside$ = $((event: Event) => {
      const target = event.target as HTMLElement;
      if (!target.closest(`#select-container-${uniqueId}`)) {
        isOpen.value = false;
      }
    });

    const selectOption$ = $((optionValue: string) => {
      if (multiple) {
        const index = selectedValues.values.indexOf(optionValue);
        if (index > -1) {
          selectedValues.values.splice(index, 1);
        } else {
          selectedValues.values.push(optionValue);
        }
      } else {
        selectedValues.values = [optionValue];
        isOpen.value = false;
      }
      
      onChange$?.(multiple ? selectedValues.values : selectedValues.values[0] || "");
    });

    const handleSearch$ = $((event: Event) => {
      const target = event.target as HTMLInputElement;
      searchQuery.value = target.value;
    });

    const filteredOptions = options.filter((option) => 
      !searchQuery.value || option.label.toLowerCase().includes(searchQuery.value.toLowerCase())
    );

    // Group options by group property if defined
    const groupedOptions: Record<string, SelectOption[]> = {};
    filteredOptions.forEach(option => {
      const group = option.group || '';
      if (!groupedOptions[group]) {
        groupedOptions[group] = [];
      }
      groupedOptions[group].push(option);
    });

    const isOptionSelected = (optionValue: string) => selectedValues.values.includes(optionValue);

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
          <button
            id={selectId}
            type="button"
            class={[
              baseClasses,
              sizeClasses[size],
              validationClasses[validation],
              disabledClasses,
              props.class,
              "flex items-center justify-between"
            ].filter(Boolean).join(" ")}
            aria-haspopup="listbox"
            aria-expanded={isOpen.value}
            disabled={disabled}
            onClick$={toggleSelect$}
          >
            <div class="flex-1 flex-wrap text-left flex gap-1">
              {selectedValues.values.length === 0 ? (
                <span class="text-gray-500 dark:text-gray-400">{placeholder}</span>
              ) : (
                <>
                  {multiple ? (
                    selectedValues.values.map(val => {
                      const selectedOption = options.find(opt => opt.value === val);
                      return (
                        <span 
                          key={val}
                          class="px-2 py-0.5 text-xs inline-flex items-center rounded-md bg-gray-100 dark:bg-gray-700"
                        >
                          {selectedOption?.label || val}
                          <button 
                            type="button" 
                            class="ml-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            onClick$={(e) => {
                              e.stopPropagation();
                              selectOption$(val);
                            }}
                          >
                            <span class="sr-only">Remove</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M18 6 6 18"></path>
                              <path d="m6 6 12 12"></path>
                            </svg>
                          </button>
                        </span>
                      );
                    })
                  ) : (
                    <span>{options.find(opt => opt.value === selectedValues.values[0])?.label || selectedValues.values[0]}</span>
                  )}
                </>
              )}
            </div>
            <svg
              class="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          
          {isOpen.value && (
            <div 
              class="absolute z-10 mt-1 w-full rounded-md bg-white dark:bg-gray-800 shadow-lg max-h-60 overflow-auto focus:outline-none"
              role="listbox"
              aria-labelledby={selectId}
              aria-multiselectable={multiple}
            >
              {searchable && (
                <div class="p-2 sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <input
                    type="text"
                    class="block w-full border border-gray-300 dark:border-gray-600 rounded-md text-sm px-3 py-1.5 
                           focus:outline-none focus:ring-2 focus:ring-primary-500 
                           bg-white dark:bg-gray-700 dark:text-white"
                    placeholder="Search..."
                    value={searchQuery.value}
                    onInput$={handleSearch$}
                  />
                </div>
              )}
              
              <ul class="py-1">
                {Object.keys(groupedOptions).map(group => (
                  <>
                    {group && (
                      <li class="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900">
                        {group}
                      </li>
                    )}
                    {groupedOptions[group].map((option) => (
                      <li 
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
                      </li>
                    ))}
                  </>
                ))}
                
                {filteredOptions.length === 0 && (
                  <li class="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                    No options found
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
        
        {validation === "invalid" && errorMessage && (
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            {errorMessage}
          </p>
        )}
        
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
          window:click$={handleClickOutside$} 
          class="hidden"
        />
      </div>
    );
  }
); 