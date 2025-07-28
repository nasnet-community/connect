import { component$ } from "@builder.io/qwik";
import { Divider } from "~/components/Core/Layout/Divider";

export const DividerOrientation = component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <p class="mb-2">Horizontal divider (default)</p>
        <Divider />
      </div>

      <div class="flex h-20">
        <div class="w-1/2">
          <p>Left content</p>
        </div>
        <Divider orientation="vertical" />
        <div class="w-1/2 pl-4">
          <p>Right content</p>
        </div>
      </div>
    </div>
  );
});
