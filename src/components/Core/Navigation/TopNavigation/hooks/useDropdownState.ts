import { useSignal, $ } from "@builder.io/qwik";

export interface UseDropdownStateProps {
  hasItems: boolean;
  isDisabled: boolean;
}

export function useDropdownState(props: UseDropdownStateProps) {
  const { hasItems, isDisabled } = props;

  // State for dropdown visibility
  const isDropdownOpen = useSignal(false);

  // Handle dropdown mouse events
  const handleDropdownEnter$ = $(() => {
    if (!isDisabled && hasItems) {
      isDropdownOpen.value = true;
    }
  });

  const handleDropdownLeave$ = $(() => {
    if (hasItems) {
      isDropdownOpen.value = false;
    }
  });

  const handleToggleDropdown$ = $(() => {
    if (!isDisabled && hasItems) {
      isDropdownOpen.value = !isDropdownOpen.value;
    }
  });

  return {
    isDropdownOpen,
    handleDropdownEnter$,
    handleDropdownLeave$,
    handleToggleDropdown$,
  };
}
