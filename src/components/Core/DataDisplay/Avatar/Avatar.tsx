import { component$ } from '@builder.io/qwik';
import type { AvatarProps, AvatarGroupProps } from './Avatar.types';
import { useAvatar } from './hooks/useAvatar';
import { AvatarContent } from './AvatarContent';

/**
 * Avatar component for user representation
 */
export const Avatar = component$<AvatarProps>((props) => {
  const {
    class: className = '',
    id,
    alt = 'Avatar',
    ariaLabel,
    href,
    target = '_self',
    clickable = false,
    loading = false,
    onClick$
  } = props;

  // Use the custom hook
  const {
    imageLoaded,
    imageError,
    handleImageLoad$,
    handleImageError$,
    handleClick$,
    avatarClasses,
    statusClasses,
    statusPositionClasses,
    statusSize
  } = useAvatar(props, onClick$);

  // Combined classes
  const classes = `${avatarClasses} ${className}`;

  // Content for all variants
  const avatarContent = (
    <AvatarContent
      props={props}
      imageLoaded={imageLoaded}
      imageError={imageError}
      handleImageLoad$={handleImageLoad$}
      handleImageError$={handleImageError$}
      statusClasses={statusClasses}
      statusPositionClasses={statusPositionClasses}
      statusSize={statusSize}
    />
  );

  // Render as link if href is provided
  if (href && !loading) {
    return (
      <a
        href={href}
        target={target}
        class={classes}
        id={id}
        aria-label={ariaLabel || alt}
      >
        {avatarContent}
      </a>
    );
  }

  // Render as button if clickable
  if (clickable && !loading) {
    return (
      <button
        type="button"
        class={classes}
        onClick$={handleClick$}
        id={id}
        disabled={loading}
        aria-label={ariaLabel || alt}
      >
        {avatarContent}
      </button>
    );
  }

  // Render as standard avatar
  return (
    <div
      class={classes}
      id={id}
      aria-label={ariaLabel || alt}
    >
      {avatarContent}
    </div>
  );
});

/**
 * AvatarGroup component for displaying multiple avatars
 */
export const AvatarGroup = component$<AvatarGroupProps>((props) => {
  const {
    max = 5,
    size = 'md',
    shape = 'circle',
    bordered = true,
    spacing = 'md',
    class: className = '',
    total,
  } = props;

  // Calculate the negative margin for overlapping avatars
  const spacingClasses = {
    sm: '-ml-1',
    md: '-ml-2',
    lg: '-ml-3',
  }[spacing];

  // Calculate remaining count
  const remainingCount = total && total > max ? total - max : undefined;

  // Create classes for the avatar group
  const avatarGroupClasses = [
    'flex items-center',
    className,
  ].filter(Boolean).join(' ');

  // Create classes for the "more" avatar
  const moreAvatarClasses = [
    'flex items-center justify-center font-medium',
    {
      circle: 'rounded-full',
      square: 'rounded-none',
      rounded: 'rounded-md',
    }[shape],
    'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    bordered ? 'border-2 border-white dark:border-gray-800' : '',
    {
      xs: 'h-6 w-6 text-xs',
      sm: 'h-8 w-8 text-xs',
      md: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-base',
      xl: 'h-16 w-16 text-lg',
      '2xl': 'h-20 w-20 text-xl',
    }[size],
  ].filter(Boolean).join(' ');

  return (
    <div class={avatarGroupClasses}>
      <div class="flex">
        {/* Render children with modified props */}
        <div class="flex items-center">
          <div class="flex items-center">
            <slot />
          </div>
          
          {/* Render the "more" avatar if there are more avatars than max */}
          {remainingCount !== undefined && (
            <div class={`${spacingClasses} ${moreAvatarClasses}`}>
              +{remainingCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
