import { component$ } from "@builder.io/qwik";
import { Divider } from "../index";

export default component$(() => {
  return (
    <div class="space-y-6">
      <p class="text-gray-700 dark:text-gray-300">Content above the divider</p>

      <Divider />

      <p class="text-gray-700 dark:text-gray-300">Content below the divider</p>
    </div>
  );
});
