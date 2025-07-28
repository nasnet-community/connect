import { component$ } from "@builder.io/qwik";
import { Tooltip } from "~/components/Core/DataDisplay/Tooltip";
import { Button } from "~/components/Core/button";

export default component$(() => {
  return (
    <div class="flex flex-col gap-8">
      <div>
        <h3 class="mb-2 text-sm font-medium">Accessible Tooltips</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          These examples demonstrate tooltips that follow accessibility best
          practices with proper ARIA attributes and keyboard navigation support.
        </p>

        <div class="mb-6 flex flex-wrap gap-4">
          <Tooltip content="Information about this field" placement="top">
            <Button
              aria-label="More information"
              aria-describedby="tooltip-description"
            >
              Hover for Info
            </Button>
          </Tooltip>

          <Tooltip
            content="Click-triggered tooltip with keyboard focus support"
            trigger={["click", "focus"]}
            color="primary"
          >
            <Button aria-label="Help" aria-haspopup="dialog">
              Click or Focus
            </Button>
          </Tooltip>
        </div>

        <div class="rounded-md border border-gray-200 p-4 dark:border-gray-700">
          <form>
            <div class="mb-4">
              <label for="username" class="mb-1 block text-sm font-medium">
                Username
                <Tooltip
                  content="Enter your username (minimum 4 characters)"
                  placement="right"
                >
                  <span
                    class="ml-1 inline-flex h-4 w-4 cursor-help items-center justify-center rounded-full bg-gray-200 text-xs font-bold dark:bg-gray-700"
                    aria-label="Username help"
                  >
                    ?
                  </span>
                </Tooltip>
              </label>
              <input
                id="username"
                type="text"
                class="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600"
                aria-describedby="username-help"
              />
            </div>

            <div class="mb-4">
              <label for="password" class="mb-1 block text-sm font-medium">
                Password
                <Tooltip
                  content="Password must be at least 8 characters with uppercase, lowercase, number, and special character"
                  placement="right"
                >
                  <span
                    class="ml-1 inline-flex h-4 w-4 cursor-help items-center justify-center rounded-full bg-gray-200 text-xs font-bold dark:bg-gray-700"
                    aria-label="Password requirements"
                  >
                    ?
                  </span>
                </Tooltip>
              </label>
              <input
                id="password"
                type="password"
                class="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600"
                aria-describedby="password-help"
              />
            </div>
          </form>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Keyboard Navigation Example</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Tab through these buttons and press Enter or Space to activate
          tooltips
        </p>

        <div class="flex gap-3">
          <Tooltip content="First tooltip" trigger={["focus", "hover"]}>
            <Button>Button 1</Button>
          </Tooltip>

          <Tooltip content="Second tooltip" trigger={["focus", "hover"]}>
            <Button>Button 2</Button>
          </Tooltip>

          <Tooltip content="Third tooltip" trigger={["focus", "hover"]}>
            <Button>Button 3</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
});
