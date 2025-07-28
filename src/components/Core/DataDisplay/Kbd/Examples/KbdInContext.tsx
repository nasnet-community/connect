import { component$ } from "@builder.io/qwik";
import { Kbd, KbdGroup } from "../index";

export const KbdInContext = component$(() => {
  return (
    <div class="space-y-8">
      {/* Modal Context */}
      <section class="rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
        <h3 class="mb-4 text-lg font-semibold">Modal Dialog</h3>
        <div class="rounded border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
          <h4 class="mb-2 font-medium">Delete Confirmation</h4>
          <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>
          <div class="flex items-center justify-between">
            <p class="text-xs text-gray-500">
              Press <Kbd size="sm">Esc</Kbd> to cancel
            </p>
            <div class="space-x-2">
              <button class="rounded bg-gray-200 px-4 py-2 text-sm dark:bg-gray-700">
                Cancel{" "}
                <Kbd size="sm" variant="flat">
                  Esc
                </Kbd>
              </button>
              <button class="rounded bg-red-500 px-4 py-2 text-sm text-white">
                Delete{" "}
                <Kbd size="sm" variant="flat">
                  Enter
                </Kbd>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Interface */}
      <section class="rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
        <h3 class="mb-4 text-lg font-semibold">Search Interface</h3>
        <div class="space-y-4">
          <div class="relative">
            <input
              type="text"
              placeholder="Search..."
              class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-20 dark:border-gray-600 dark:bg-gray-900"
            />
            <div class="absolute right-2 top-1/2 -translate-y-1/2">
              <KbdGroup keys={["Cmd", "K"]} size="sm" variant="flat" />
            </div>
          </div>
          <div class="space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <p>
              • Use <Kbd size="sm">↑</Kbd> <Kbd size="sm">↓</Kbd> to navigate
              results
            </p>
            <p>
              • Press <Kbd size="sm">Enter</Kbd> to select
            </p>
            <p>
              • Press <Kbd size="sm">Esc</Kbd> to close
            </p>
          </div>
        </div>
      </section>

      {/* Game Controls */}
      <section class="rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
        <h3 class="mb-4 text-lg font-semibold">Game Controls</h3>
        <div class="grid grid-cols-2 gap-6">
          <div>
            <h4 class="mb-3 font-medium">Movement</h4>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span>Move Forward</span>
                <Kbd>W</Kbd>
              </div>
              <div class="flex justify-between">
                <span>Move Backward</span>
                <Kbd>S</Kbd>
              </div>
              <div class="flex justify-between">
                <span>Strafe Left</span>
                <Kbd>A</Kbd>
              </div>
              <div class="flex justify-between">
                <span>Strafe Right</span>
                <Kbd>D</Kbd>
              </div>
              <div class="flex justify-between">
                <span>Jump</span>
                <Kbd>Space</Kbd>
              </div>
              <div class="flex justify-between">
                <span>Crouch</span>
                <Kbd>Ctrl</Kbd>
              </div>
            </div>
          </div>
          <div>
            <h4 class="mb-3 font-medium">Actions</h4>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span>Primary Fire</span>
                <Kbd variant="flat">Mouse 1</Kbd>
              </div>
              <div class="flex justify-between">
                <span>Secondary Fire</span>
                <Kbd variant="flat">Mouse 2</Kbd>
              </div>
              <div class="flex justify-between">
                <span>Reload</span>
                <Kbd>R</Kbd>
              </div>
              <div class="flex justify-between">
                <span>Interact</span>
                <Kbd>E</Kbd>
              </div>
              <div class="flex justify-between">
                <span>Inventory</span>
                <Kbd>I</Kbd>
              </div>
              <div class="flex justify-between">
                <span>Quick Save</span>
                <Kbd>F5</Kbd>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Editor */}
      <section class="rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
        <h3 class="mb-4 text-lg font-semibold">Code Editor Shortcuts</h3>
        <div class="rounded bg-gray-900 p-4 font-mono text-sm text-gray-100">
          <div class="mb-2">
            <span class="text-green-400">// Quick actions</span>
          </div>
          <div class="space-y-1">
            <div>
              <span class="text-blue-400">Format Document:</span>{" "}
              <KbdGroup keys={["Shift", "Alt", "F"]} variant="flat" size="sm" />
            </div>
            <div>
              <span class="text-blue-400">Go to Definition:</span>{" "}
              <Kbd variant="flat" size="sm">
                F12
              </Kbd>
            </div>
            <div>
              <span class="text-blue-400">Find References:</span>{" "}
              <KbdGroup keys={["Shift", "F12"]} variant="flat" size="sm" />
            </div>
            <div>
              <span class="text-blue-400">Rename Symbol:</span>{" "}
              <Kbd variant="flat" size="sm">
                F2
              </Kbd>
            </div>
          </div>
        </div>
      </section>

      {/* Help Documentation */}
      <section class="rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
        <h3 class="mb-4 text-lg font-semibold">Help Documentation</h3>
        <div class="prose prose-sm max-w-none dark:prose-invert">
          <h4>Navigation</h4>
          <p>
            Use the arrow keys <Kbd size="sm">←</Kbd> <Kbd size="sm">→</Kbd> to
            move between sections, or press <Kbd size="sm">Tab</Kbd> to cycle
            through interactive elements. You can also use{" "}
            <KbdGroup keys={["Cmd", "F"]} size="sm" osSpecific /> to search
            within the page.
          </p>
          <h4>Editing</h4>
          <p>
            To edit a field, click on it or press <Kbd size="sm">Enter</Kbd>{" "}
            when focused. Save your changes with{" "}
            <KbdGroup keys={["Cmd", "S"]} size="sm" osSpecific /> or cancel with{" "}
            <Kbd size="sm">Esc</Kbd>.
          </p>
          <h4>Global Shortcuts</h4>
          <ul>
            <li>
              Open command palette:{" "}
              <KbdGroup keys={["Cmd", "K"]} size="sm" osSpecific />
            </li>
            <li>
              Toggle dark mode:{" "}
              <KbdGroup keys={["Cmd", "Shift", "D"]} size="sm" osSpecific />
            </li>
            <li>
              Show help: <Kbd size="sm">?</Kbd> or <Kbd size="sm">F1</Kbd>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
});
