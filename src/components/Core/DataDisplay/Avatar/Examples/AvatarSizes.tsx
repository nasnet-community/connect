import { component$ } from "@builder.io/qwik";
import { Avatar } from "~/components/Core/DataDisplay/Avatar";

export const AvatarSizes = component$(() => {
  return (
    <div class="flex flex-row items-end gap-4">
      <Avatar size="xs" src="https://i.pravatar.cc/300" alt="Extra Small Avatar" />

      <Avatar size="sm" src="https://i.pravatar.cc/300" alt="Small Avatar" />

      <Avatar size="md" src="https://i.pravatar.cc/300" alt="Medium Avatar" />

      <Avatar size="lg" src="https://i.pravatar.cc/300" alt="Large Avatar" />

      <Avatar size="xl" src="https://i.pravatar.cc/300" alt="Extra Large Avatar" />

      <Avatar size="2xl" src="https://i.pravatar.cc/300" alt="2X Large Avatar" />
    </div>
  );
});
