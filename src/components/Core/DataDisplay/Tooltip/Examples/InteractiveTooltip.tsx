import { component$, useSignal } from "@builder.io/qwik";
import { Tooltip } from "~/components/Core/DataDisplay/Tooltip";
import { Button } from "~/components/Core/button";

export default component$(() => {
  const isOpen = useSignal(false);

  return (
    <div class="flex flex-col gap-8">
      <div>
        <h3 class="mb-2 text-sm font-medium">Interactive Tooltips</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          These tooltips allow users to interact with content inside them
          without the tooltip closing.
        </p>

        <div class="flex flex-wrap gap-4">
          <Tooltip
            content={
              <div class="p-1">
                <p class="mb-2">Select your preferred theme:</p>
                <div class="flex gap-2">
                  <Button size="sm" variant="outline">
                    Light
                  </Button>
                  <Button size="sm" variant="outline">
                    Dark
                  </Button>
                  <Button size="sm" variant="outline">
                    System
                  </Button>
                </div>
              </div>
            }
            interactive={true}
            placement="bottom"
            maxWidth="250px"
            color="secondary"
          >
            <Button>Theme Settings</Button>
          </Tooltip>

          <Tooltip
            content={
              <div class="p-1">
                <p class="mb-2 font-medium">Quick Actions</p>
                <ul class="space-y-1">
                  <li>
                    <button class="w-full rounded px-2 py-1 text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                      Edit Profile
                    </button>
                  </li>
                  <li>
                    <button class="w-full rounded px-2 py-1 text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                      Account Settings
                    </button>
                  </li>
                  <li>
                    <button class="w-full rounded px-2 py-1 text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            }
            interactive={true}
            placement="right"
            maxWidth="200px"
          >
            <Button variant="outline">Menu</Button>
          </Tooltip>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Controlled Tooltip</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          This tooltip's visibility is controlled programmatically.
        </p>

        <div class="flex items-center gap-4">
          <Tooltip
            content="This tooltip is controlled programmatically"
            placement="top"
            color="primary"
            visible={isOpen.value}
            onVisibleChange$={(visible) => (isOpen.value = visible)}
          >
            <Button>Hover Me</Button>
          </Tooltip>

          <Button
            variant={isOpen.value ? "primary" : "outline"}
            onClick$={() => (isOpen.value = !isOpen.value)}
          >
            {isOpen.value ? "Hide Tooltip" : "Show Tooltip"}
          </Button>
        </div>
      </div>
    </div>
  );
});
