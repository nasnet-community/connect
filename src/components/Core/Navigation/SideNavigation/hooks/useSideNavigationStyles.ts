import { useComputed$ } from '@builder.io/qwik';
import type { SideNavigationProps } from '../SideNavigation.types';

export interface UseSideNavigationStylesProps {
  isCollapsed: boolean;
  size: SideNavigationProps['size'];
}

export function useSideNavigationStyles(props: UseSideNavigationStylesProps) {
  const { isCollapsed, size } = props;
  
  // Width class based on collapse state and size
  const widthClass = useComputed$(() => {
    if (isCollapsed) {
      return 'w-16';
    }
    
    // Width depends on the size
    switch (size) {
      case 'sm': return 'w-48';
      case 'lg': return 'w-64';
      case 'md':
      default: return 'w-56';
    }
  });
  
  return { widthClass };
} 