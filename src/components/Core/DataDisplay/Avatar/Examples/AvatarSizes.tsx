import { component$ } from "@builder.io/qwik";
import { Avatar } from "~/components/Core/DataDisplay/Avatar";

export const AvatarSizes = component$(() => {
  return (
    <div class="flex flex-row items-end gap-4">
      <Avatar size="xs">
        <img src="https://i.pravatar.cc/300" alt="Extra Small Avatar" />
      </Avatar>

      <Avatar size="sm">
        <img src="https://i.pravatar.cc/300" alt="Small Avatar" />
      </Avatar>

      <Avatar size="md">
        <img src="https://i.pravatar.cc/300" alt="Medium Avatar" />
      </Avatar>

      <Avatar size="lg">
        <img src="https://i.pravatar.cc/300" alt="Large Avatar" />
      </Avatar>

      <Avatar size="xl">
        <img src="https://i.pravatar.cc/300" alt="Extra Large Avatar" />
      </Avatar>

      <Avatar size="2xl">
        <img src="https://i.pravatar.cc/300" alt="2X Large Avatar" />
      </Avatar>
    </div>
  );
});
