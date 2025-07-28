import { component$ } from "@builder.io/qwik";
import { Divider } from "../index";

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="mb-2 text-lg font-semibold">Divider Line Styles</h3>
        <div class="space-y-6">
          <div>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              Solid (Default)
            </p>
            <Divider variant="solid" />
          </div>

          <div>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">Dashed</p>
            <Divider variant="dashed" />
          </div>

          <div>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">Dotted</p>
            <Divider variant="dotted" />
          </div>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-semibold">Divider Thickness</h3>
        <div class="space-y-6">
          <div>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              Thin (Default)
            </p>
            <Divider thickness="thin" />
          </div>

          <div>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">Medium</p>
            <Divider thickness="medium" />
          </div>

          <div>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">Thick</p>
            <Divider thickness="thick" />
          </div>
        </div>
      </div>
    </div>
  );
});
