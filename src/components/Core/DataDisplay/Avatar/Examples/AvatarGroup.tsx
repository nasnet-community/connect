import { component$ } from "@builder.io/qwik";
import { Avatar, AvatarGroup } from "~/components/Core/DataDisplay/Avatar";

export const AvatarGroupExample = component$(() => {
  return (
    <div class="flex flex-col gap-6">
      <div>
        <h3 class="mb-2 text-sm font-medium">Basic Avatar Group</h3>
        <AvatarGroup>
          <Avatar src="https://i.pravatar.cc/300?img=1" alt="User 1" />
          <Avatar src="https://i.pravatar.cc/300?img=2" alt="User 2" />
          <Avatar src="https://i.pravatar.cc/300?img=3" alt="User 3" />
          <Avatar src="https://i.pravatar.cc/300?img=4" alt="User 4" />
        </AvatarGroup>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Avatar Group with Max Display</h3>
        <AvatarGroup max={3}>
          <Avatar src="https://i.pravatar.cc/300?img=1" alt="User 1" />
          <Avatar src="https://i.pravatar.cc/300?img=2" alt="User 2" />
          <Avatar src="https://i.pravatar.cc/300?img=3" alt="User 3" />
          <Avatar src="https://i.pravatar.cc/300?img=4" alt="User 4" />
          <Avatar src="https://i.pravatar.cc/300?img=5" alt="User 5" />
          <Avatar src="https://i.pravatar.cc/300?img=6" alt="User 6" />
        </AvatarGroup>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Mixed Avatar Group</h3>
        <AvatarGroup>
          <Avatar src="https://i.pravatar.cc/300?img=1" alt="User 1" />
          <Avatar variant="initials" initials="JD" />
          <Avatar 
            variant="icon"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            }
          />
        </AvatarGroup>
      </div>
    </div>
  );
});
