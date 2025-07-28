import { $, useSignal, useTask$, type QRL } from "@builder.io/qwik";
import type {
  AutocompleteOption,
  AutocompleteProps,
} from "../Autocomplete.types";

export interface UseAutocompleteReturn {
  inputId: string;
  dropdownId: string;
  inputValue: string;
  isOpen: boolean;
  highlightedIndex: number;
  filteredOptions: AutocompleteOption[];
  handleInputChange$: QRL<(event: Event) => void>;
  handleInputFocus$: QRL<() => void>;
  handleInputBlur$: QRL<() => void>;
  handleKeyDown$: QRL<(event: KeyboardEvent) => void>;
  handleOptionClick$: QRL<(option: AutocompleteOption) => void>;
  handleClear$: QRL<() => void>;
  setHighlightedIndex$: QRL<(index: number) => void>;
  sizeClasses: {
    container: string;
    input: string;
    dropdown: string;
    option: string;
    clearButton: string;
  };
}

export function useAutocomplete(
  props: AutocompleteProps,
): UseAutocompleteReturn {
  const {
    options,
    value,
    onValueChange$,
    onInputChange$,
    inputValue: controlledInputValue,
    id,
    disabled = false,
    size = "md",
    allowCustomValue = true,
    filterOptions = true,
    filterFunction$,
    openOnFocus = true,
    closeOnSelect = true,
    minCharsToSearch = 0,
    open: controlledOpen,
  } = props;

  const inputId =
    id || `autocomplete-${Math.random().toString(36).slice(2, 9)}`;
  const dropdownId = `${inputId}-dropdown`;

  const internalInputValue = useSignal("");
  const internalOpen = useSignal(false);
  const highlightedIndex = useSignal(-1);
  const blurTimeout = useSignal<number | null>(null);

  const inputValue = controlledInputValue ?? internalInputValue.value;
  const isOpen = controlledOpen?.value ?? internalOpen.value;

  // Size classes mapping with mobile-first responsive design
  const sizeClasses = {
    sm: {
      container: "text-sm mobile:text-sm tablet:text-sm",
      input: "h-9 mobile:h-10 text-sm px-2 pr-8 mobile:px-3 mobile:pr-10",
      dropdown: "text-sm mobile:text-sm",
      option: "px-2 py-1.5 mobile:px-3 mobile:py-2 text-sm",
      clearButton: "w-6 h-6 mobile:w-8 mobile:h-8",
    },
    md: {
      container: "text-base mobile:text-base tablet:text-base",
      input: "h-10 mobile:h-11 px-3 pr-10 mobile:px-4 mobile:pr-12",
      dropdown: "text-base mobile:text-base",
      option: "px-3 py-2 mobile:px-4 mobile:py-2.5",
      clearButton: "w-8 h-8 mobile:w-9 mobile:h-9",
    },
    lg: {
      container: "text-lg mobile:text-lg tablet:text-xl",
      input: "h-12 mobile:h-14 text-lg px-4 pr-12 mobile:px-5 mobile:pr-14",
      dropdown: "text-lg mobile:text-lg tablet:text-xl",
      option: "px-4 py-2.5 mobile:px-5 mobile:py-3 text-lg mobile:text-lg",
      clearButton: "w-10 h-10 mobile:w-11 mobile:h-11",
    },
  }[size];

  // Update input value when value prop changes
  useTask$(({ track }) => {
    track(() => value);
    if (value !== undefined) {
      const selectedOption = options.find((opt) => opt.value === value);
      if (selectedOption) {
        internalInputValue.value = selectedOption.label;
      } else if (allowCustomValue) {
        internalInputValue.value = value;
      }
    } else {
      internalInputValue.value = "";
    }
  });

  const defaultFilter = $(
    (option: AutocompleteOption, searchValue: string): boolean => {
      return option.label.toLowerCase().includes(searchValue.toLowerCase());
    },
  );

  const getFilteredOptions = $(async (): Promise<AutocompleteOption[]> => {
    if (!filterOptions || inputValue.length < minCharsToSearch) {
      return options;
    }

    const filterFn = filterFunction$ || defaultFilter;
    const filtered: AutocompleteOption[] = [];

    for (const option of options) {
      if (await filterFn(option, inputValue)) {
        filtered.push(option);
      }
    }

    return filtered;
  });

  const filteredOptions = useSignal<AutocompleteOption[]>([]);

  // Update filtered options when input value changes
  useTask$(async ({ track }) => {
    track(() => inputValue);
    track(() => options);
    filteredOptions.value = await getFilteredOptions();
  });

  const setOpen = $(async (open: boolean) => {
    if (controlledOpen) {
      controlledOpen.value = open;
    } else {
      internalOpen.value = open;
    }

    if (open) {
      highlightedIndex.value = -1;
    }
  });

  const handleInputChange$ = $(async (event: Event) => {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;

    if (controlledInputValue === undefined) {
      internalInputValue.value = newValue;
    }

    await onInputChange$?.(newValue);

    if (!isOpen && newValue.length >= minCharsToSearch) {
      await setOpen(true);
    }

    // Clear the selected value if input doesn't match any option
    const matchingOption = options.find((opt) => opt.label === newValue);
    if (!matchingOption && !allowCustomValue) {
      await onValueChange$?.("");
    } else if (allowCustomValue) {
      await onValueChange$?.(newValue);
    }
  });

  const handleInputFocus$ = $(async () => {
    if (blurTimeout.value !== null) {
      clearTimeout(blurTimeout.value);
      blurTimeout.value = null;
    }

    if (openOnFocus && !disabled) {
      await setOpen(true);
    }
  });

  const handleInputBlur$ = $(async () => {
    // Delay closing to allow click on options
    blurTimeout.value = window.setTimeout(async () => {
      await setOpen(false);

      // Set custom value on blur if allowed
      if (
        allowCustomValue &&
        inputValue &&
        !options.find((opt) => opt.label === inputValue)
      ) {
        await onValueChange$?.(inputValue);
      }
    }, 200);
  });

  const handleKeyDown$ = $(async (event: KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          await setOpen(true);
        } else {
          const maxIndex = filteredOptions.value.length - 1;
          highlightedIndex.value = Math.min(
            highlightedIndex.value + 1,
            maxIndex,
          );
        }
        break;

      case "ArrowUp":
        event.preventDefault();
        if (isOpen) {
          highlightedIndex.value = Math.max(highlightedIndex.value - 1, -1);
        }
        break;

      case "Enter":
        event.preventDefault();
        if (isOpen && highlightedIndex.value >= 0) {
          const option = filteredOptions.value[highlightedIndex.value];
          if (option && !option.disabled) {
            await handleOptionClick$(option);
          }
        } else if (allowCustomValue && inputValue) {
          await onValueChange$?.(inputValue);
          await setOpen(false);
        }
        break;

      case "Escape":
        event.preventDefault();
        if (isOpen) {
          await setOpen(false);
        } else {
          // Clear input on second escape
          internalInputValue.value = "";
          await onValueChange$?.("");
        }
        break;

      case "Tab":
        if (isOpen) {
          await setOpen(false);
        }
        break;
    }
  });

  const handleOptionClick$ = $(async (option: AutocompleteOption) => {
    if (option.disabled) return;

    internalInputValue.value = option.label;
    await onValueChange$?.(option.value);

    if (closeOnSelect) {
      await setOpen(false);
    }

    // Focus back to input
    const input = document.getElementById(inputId) as HTMLInputElement;
    input.focus();
  });

  const handleClear$ = $(async () => {
    internalInputValue.value = "";
    await onValueChange$?.("");
    await onInputChange$?.("");

    // Focus back to input
    const input = document.getElementById(inputId) as HTMLInputElement;
    input.focus();
  });

  const setHighlightedIndex$ = $(async (index: number) => {
    highlightedIndex.value = index;
  });

  return {
    inputId,
    dropdownId,
    inputValue,
    isOpen,
    highlightedIndex: highlightedIndex.value,
    filteredOptions: filteredOptions.value,
    handleInputChange$,
    handleInputFocus$,
    handleInputBlur$,
    handleKeyDown$,
    handleOptionClick$,
    handleClear$,
    setHighlightedIndex$,
    sizeClasses,
  };
}
