import { useSignal, $ } from '@builder.io/qwik';
import type { QRL } from '@builder.io/qwik';

export interface UseSideNavigationStateProps {
  isCollapsed?: boolean;
  onToggleCollapse$?: QRL<() => void>;
  isMobileOpen?: boolean;
  onCloseMobile$?: QRL<() => void>;
}

export function useSideNavigationState(props: UseSideNavigationStateProps) {
  const {
    isCollapsed: propIsCollapsed = false,
    onToggleCollapse$,
    onCloseMobile$
  } = props;
  
  // Internal collapsed state (respects the prop value)
  const isCollapsed = useSignal(propIsCollapsed);
  
  // Handle collapse toggle
  const handleToggleCollapse$ = $(() => {
    isCollapsed.value = !isCollapsed.value;
    onToggleCollapse$?.();
  });
  
  // Handle mobile close
  const handleCloseMobile$ = $(() => {
    onCloseMobile$?.();
  });
  
  return {
    isCollapsed,
    handleToggleCollapse$,
    handleCloseMobile$
  };
} 