export interface UseBadgeGroupParams {
  layout?: 'horizontal' | 'vertical';
  spacing?: 'sm' | 'md' | 'lg';
}

export interface UseBadgeGroupReturn {
  badgeGroupClasses: string;
}

export function useBadgeGroup(params: UseBadgeGroupParams, className = ''): UseBadgeGroupReturn {
  const {
    layout = 'horizontal',
    spacing = 'md',
  } = params;

  // Determine layout classes
  const layoutClasses = layout === 'horizontal' 
    ? 'flex flex-row flex-wrap' 
    : 'flex flex-col';

  // Determine spacing classes
  const spacingClasses = {
    horizontal: {
      sm: 'gap-1',
      md: 'gap-2',
      lg: 'gap-3',
    },
    vertical: {
      sm: 'gap-1',
      md: 'gap-2',
      lg: 'gap-3',
    },
  }[layout][spacing];

  // Combined classes
  const badgeGroupClasses = [
    layoutClasses,
    spacingClasses,
    className,
  ].filter(Boolean).join(' ');

  return {
    badgeGroupClasses,
  };
} 