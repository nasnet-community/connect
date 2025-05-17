import { component$, Slot, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import type { StackProps } from './Stack.types';

const Stack = component$<StackProps>((props) => {
  const {
    direction = 'column',
    spacing = 'md',
    justify = 'start',
    align = 'start',
    wrap = 'nowrap',
    dividers = false,
    dividerColor = 'muted',
    reverse = false,
    supportRtl = true,
    role,
    'aria-label': ariaLabel,
    ...rest
  } = props;

  // Signal to track if we're in RTL mode
  const isRtl = useSignal(false);

  // Check for RTL mode on component mount
  useVisibleTask$(() => {
    const dir = document.documentElement.dir || document.dir;
    isRtl.value = dir === 'rtl';
  });

  // Generate direction classes
  const directionClasses = (() => {
    if (typeof direction === 'string') {
      const flexDirection = direction === 'row' ? 
        (reverse ? 'flex-row-reverse' : 'flex-row') : 
        (reverse ? 'flex-col-reverse' : 'flex-col');
        
      return { [flexDirection]: true };
    }

    // Handle responsive direction
    return {
      [reverse ? 'flex-col-reverse' : 'flex-col']: direction.base === 'column' || !direction.base,
      [reverse ? 'flex-row-reverse' : 'flex-row']: direction.base === 'row',
      
      [`sm:${reverse ? 'flex-col-reverse' : 'flex-col'}`]: direction.sm === 'column',
      [`sm:${reverse ? 'flex-row-reverse' : 'flex-row'}`]: direction.sm === 'row',
      
      [`md:${reverse ? 'flex-col-reverse' : 'flex-col'}`]: direction.md === 'column',
      [`md:${reverse ? 'flex-row-reverse' : 'flex-row'}`]: direction.md === 'row',
      
      [`lg:${reverse ? 'flex-col-reverse' : 'flex-col'}`]: direction.lg === 'column',
      [`lg:${reverse ? 'flex-row-reverse' : 'flex-row'}`]: direction.lg === 'row',
      
      [`xl:${reverse ? 'flex-col-reverse' : 'flex-col'}`]: direction.xl === 'column',
      [`xl:${reverse ? 'flex-row-reverse' : 'flex-row'}`]: direction.xl === 'row',
      
      [`2xl:${reverse ? 'flex-col-reverse' : 'flex-col'}`]: direction['2xl'] === 'column',
      [`2xl:${reverse ? 'flex-row-reverse' : 'flex-row'}`]: direction['2xl'] === 'row',
    };
  })();

  // Determine direction for spacing based on direction prop
  const getBaseDirection = () => {
    if (typeof direction === 'string') {
      return direction;
    }
    return direction.base || 'column';
  };

  // Generate spacing classes
  const spacingClasses = {
    'gap-0': spacing === 'none',
    'gap-1': spacing === 'xs',
    'gap-2': spacing === 'sm',
    'gap-4': spacing === 'md',
    'gap-6': spacing === 'lg',
    'gap-8': spacing === 'xl',
    'gap-10': spacing === '2xl',
    'gap-12': spacing === '3xl',
  };

  // Generate justify classes
  const justifyClasses = {
    'justify-start': justify === 'start',
    'justify-center': justify === 'center',
    'justify-end': justify === 'end',
    'justify-between': justify === 'between',
    'justify-around': justify === 'around',
    'justify-evenly': justify === 'evenly',
  };

  // Generate align classes
  const alignClasses = {
    'items-start': align === 'start',
    'items-center': align === 'center',
    'items-end': align === 'end',
    'items-stretch': align === 'stretch',
    'items-baseline': align === 'baseline',
  };

  // Generate wrap classes
  const wrapClasses = {
    'flex-nowrap': wrap === 'nowrap',
    'flex-wrap': wrap === 'wrap',
    'flex-wrap-reverse': wrap === 'wrap-reverse',
  };

  // Generate RTL classes if supportRtl is true and we're in row mode
  const rtlClasses = (() => {
    if (!supportRtl || (typeof direction === 'string' && direction !== 'row')) {
      return {};
    }

    return {
      'rtl:flex-row-reverse': getBaseDirection() === 'row' && !reverse && isRtl.value,
      'rtl:flex-row': getBaseDirection() === 'row' && reverse && isRtl.value,
    };
  })();

  // Generate divider classes
  const dividerClasses = {
    'divide-y': dividers && getBaseDirection() === 'column',
    'divide-x': dividers && getBaseDirection() === 'row',
    'divide-gray-200 dark:divide-gray-700': dividers && dividerColor === 'default',
    'divide-primary': dividers && dividerColor === 'primary',
    'divide-secondary': dividers && dividerColor === 'secondary',
    'divide-gray-300 dark:divide-gray-600': dividers && dividerColor === 'muted',
  };

  // Combine all classes
  const allClasses = {
    'flex': true,
    ...directionClasses,
    ...spacingClasses,
    ...justifyClasses,
    ...alignClasses,
    ...wrapClasses,
    ...rtlClasses,
    ...dividerClasses,
  };

  // Filter out undefined/null classes
  const classNames = Object.entries(allClasses)
    .filter(([, value]) => value)
    .map(([className]) => className)
    .join(' ');

  // Combine with user-provided classes
  const combinedClassNames = props.class
    ? `${classNames} ${props.class}`
    : classNames;

  return (
    <div 
      {...rest}
      class={combinedClassNames}
      role={role}
      aria-label={ariaLabel}
    >
      <Slot />
    </div>
  );
});

export default Stack;
