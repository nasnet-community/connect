import { component$ } from '@builder.io/qwik';
import { Avatar, AvatarGroup } from '~/components/Core/DataDisplay/Avatar';

export const AvatarGroupExample = component$(() => {
  return (
    <div class="flex flex-col gap-6">
      <div>
        <h3 class="text-sm font-medium mb-2">Basic Avatar Group</h3>
        <AvatarGroup>
          <Avatar>
            <img src="https://i.pravatar.cc/300?img=1" alt="User 1" />
          </Avatar>
          <Avatar>
            <img src="https://i.pravatar.cc/300?img=2" alt="User 2" />
          </Avatar>
          <Avatar>
            <img src="https://i.pravatar.cc/300?img=3" alt="User 3" />
          </Avatar>
          <Avatar>
            <img src="https://i.pravatar.cc/300?img=4" alt="User 4" />
          </Avatar>
        </AvatarGroup>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Avatar Group with Max Display</h3>
        <AvatarGroup max={3}>
          <Avatar>
            <img src="https://i.pravatar.cc/300?img=1" alt="User 1" />
          </Avatar>
          <Avatar>
            <img src="https://i.pravatar.cc/300?img=2" alt="User 2" />
          </Avatar>
          <Avatar>
            <img src="https://i.pravatar.cc/300?img=3" alt="User 3" />
          </Avatar>
          <Avatar>
            <img src="https://i.pravatar.cc/300?img=4" alt="User 4" />
          </Avatar>
          <Avatar>
            <img src="https://i.pravatar.cc/300?img=5" alt="User 5" />
          </Avatar>
          <Avatar>
            <img src="https://i.pravatar.cc/300?img=6" alt="User 6" />
          </Avatar>
        </AvatarGroup>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Mixed Avatar Group</h3>
        <AvatarGroup>
          <Avatar>
            <img src="https://i.pravatar.cc/300?img=1" alt="User 1" />
          </Avatar>
          <Avatar>JD</Avatar>
          <Avatar>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Avatar>
        </AvatarGroup>
      </div>
    </div>
  );
});
