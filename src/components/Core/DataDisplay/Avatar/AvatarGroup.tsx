import { component$, Slot } from "@builder.io/qwik";
import type { AvatarGroupProps } from "./Avatar.types";
import { useAvatarGroup } from "./hooks/useAvatarGroup";

/**
 * AvatarGroup component for displaying multiple avatars
 */
export const AvatarGroup = component$<AvatarGroupProps>((props) => {
  const { class: className = "" } = props;

  const {
    spacingClasses,
    avatarGroupClasses,
    moreAvatarClasses,
    remainingCount,
  } = useAvatarGroup(props, className);

  return (
    <div class={avatarGroupClasses}>
      <div class="flex">
        {/* Render children with modified props */}
        <div class="flex items-center">
          <div class="flex items-center">
            <Slot />
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
