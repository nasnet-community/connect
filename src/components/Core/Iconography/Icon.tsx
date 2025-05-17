import { component$, useStyles$ } from '@builder.io/qwik';
import type { IconProps } from './Icon.types';

/**
 * Icon component for the Connect design system.
 * 
 * This component provides a consistent interface for rendering icons from
 * the @qwikest/icons library with support for various sizes, colors, and accessibility features.
 */
const Icon = component$<IconProps>((props) => {
  const {
    icon,
    size = 'md',
    color = 'current',
    fixedWidth = false,
    class: className = '',
    label,
  } = props;

  // CSS for the icon component
  useStyles$(`
    .icon-fixed-width {
      width: 1em;
      text-align: center;
    }
  `);

  // Generate size classes
  const sizeClasses = {
    'xs': 'w-3 h-3',
    'sm': 'w-4 h-4',
    'md': 'w-5 h-5',
    'lg': 'w-6 h-6',
    'xl': 'w-8 h-8',
    '2xl': 'w-10 h-10',
  }[size];

  // Generate color classes
  const colorClasses = {
    'inherit': '',
    'current': 'text-current',
    'primary': 'text-primary',
    'secondary': 'text-secondary',
    'success': 'text-success',
    'warning': 'text-warning',
    'error': 'text-error',
    'info': 'text-info',
    'muted': 'text-muted',
  }[color];

  // Combine all classes
  const combinedClasses = [
    'inline-block',
    sizeClasses,
    colorClasses,
    fixedWidth ? 'icon-fixed-width' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <span 
      class={combinedClasses}
      aria-hidden={!label ? 'true' : undefined}
      {...(label ? { 'aria-label': label, role: 'img' } : {})}
    >
      {icon}
    </span>
  );
});

export default Icon;
