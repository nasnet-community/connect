import { useSignal, $ } from "@builder.io/qwik";

export interface UseMobileMenuStateProps {
  isMobileMenuOpen?: boolean;
}

export function useMobileMenuState({
  isMobileMenuOpen: initialState = false,
}: UseMobileMenuStateProps = {}) {
  const isMobileMenuOpen = useSignal(initialState);

  const toggleMobileMenu$ = $(() => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
  });

  const closeMobileMenu$ = $(() => {
    isMobileMenuOpen.value = false;
  });

  return {
    isMobileMenuOpen,
    toggleMobileMenu$,
    closeMobileMenu$,
  };
}
