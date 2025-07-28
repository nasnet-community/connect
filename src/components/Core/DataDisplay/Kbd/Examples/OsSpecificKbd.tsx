import { component$, useSignal } from "@builder.io/qwik";
import { Kbd, KbdGroup } from "../index";

export const OsSpecificKbd = component$(() => {
  const selectedOs = useSignal<"mac" | "windows" | "linux">("mac");

  return (
    <div class="space-y-8">
      {/* OS Selector */}
      <section>
        <h3 class="mb-4 text-lg font-semibold">Select Operating System</h3>
        <div class="mb-6 flex gap-4">
          <button
            onClick$={() => (selectedOs.value = "mac")}
            class={`rounded px-4 py-2 ${
              selectedOs.value === "mac"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            macOS
          </button>
          <button
            onClick$={() => (selectedOs.value = "windows")}
            class={`rounded px-4 py-2 ${
              selectedOs.value === "windows"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            Windows
          </button>
          <button
            onClick$={() => (selectedOs.value = "linux")}
            class={`rounded px-4 py-2 ${
              selectedOs.value === "linux"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            Linux
          </button>
        </div>
      </section>

      {/* OS-Specific Keys */}
      <section>
        <h3 class="mb-4 text-lg font-semibold">OS-Specific Key Display</h3>
        <div class="space-y-3">
          <div class="flex max-w-md items-center justify-between">
            <span>Command/Control</span>
            <Kbd osSpecific forceOs={selectedOs.value}>
              Cmd
            </Kbd>
          </div>
          <div class="flex max-w-md items-center justify-between">
            <span>Option/Alt</span>
            <Kbd osSpecific forceOs={selectedOs.value}>
              Option
            </Kbd>
          </div>
          <div class="flex max-w-md items-center justify-between">
            <span>Shift</span>
            <Kbd osSpecific forceOs={selectedOs.value}>
              Shift
            </Kbd>
          </div>
          <div class="flex max-w-md items-center justify-between">
            <span>Control</span>
            <Kbd osSpecific forceOs={selectedOs.value}>
              Ctrl
            </Kbd>
          </div>
          <div class="flex max-w-md items-center justify-between">
            <span>Enter/Return</span>
            <Kbd osSpecific forceOs={selectedOs.value}>
              Enter
            </Kbd>
          </div>
          <div class="flex max-w-md items-center justify-between">
            <span>Delete/Backspace</span>
            <Kbd osSpecific forceOs={selectedOs.value}>
              Delete
            </Kbd>
          </div>
        </div>
      </section>

      {/* OS-Specific Shortcuts */}
      <section>
        <h3 class="mb-4 text-lg font-semibold">OS-Specific Shortcuts</h3>
        <div class="space-y-3">
          <div class="flex max-w-md items-center justify-between">
            <span>Copy</span>
            <KbdGroup
              keys={["Cmd", "C"]}
              osSpecific
              forceOs={selectedOs.value}
            />
          </div>
          <div class="flex max-w-md items-center justify-between">
            <span>Paste</span>
            <KbdGroup
              keys={["Cmd", "V"]}
              osSpecific
              forceOs={selectedOs.value}
            />
          </div>
          <div class="flex max-w-md items-center justify-between">
            <span>Select All</span>
            <KbdGroup
              keys={["Cmd", "A"]}
              osSpecific
              forceOs={selectedOs.value}
            />
          </div>
          <div class="flex max-w-md items-center justify-between">
            <span>Find</span>
            <KbdGroup
              keys={["Cmd", "F"]}
              osSpecific
              forceOs={selectedOs.value}
            />
          </div>
          <div class="flex max-w-md items-center justify-between">
            <span>Spotlight/Search</span>
            <KbdGroup
              keys={["Cmd", "Space"]}
              osSpecific
              forceOs={selectedOs.value}
            />
          </div>
        </div>
      </section>

      {/* Auto-Detection Example */}
      <section>
        <h3 class="mb-4 text-lg font-semibold">Auto-Detection (Current OS)</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          These keys will automatically show the correct symbol for your current
          OS:
        </p>
        <div class="space-y-3">
          <div class="flex items-center gap-4">
            <span>Without OS detection:</span>
            <KbdGroup keys={["Cmd", "Shift", "P"]} />
          </div>
          <div class="flex items-center gap-4">
            <span>With OS detection:</span>
            <KbdGroup keys={["Cmd", "Shift", "P"]} osSpecific />
          </div>
        </div>
      </section>

      {/* Symbol Reference */}
      <section>
        <h3 class="mb-4 text-lg font-semibold">macOS Symbol Reference</h3>
        <div class="grid max-w-md grid-cols-2 gap-4">
          <div class="flex items-center justify-between">
            <span>Command</span>
            <Kbd osSpecific forceOs="mac">
              Cmd
            </Kbd>
          </div>
          <div class="flex items-center justify-between">
            <span>Option</span>
            <Kbd osSpecific forceOs="mac">
              Option
            </Kbd>
          </div>
          <div class="flex items-center justify-between">
            <span>Control</span>
            <Kbd osSpecific forceOs="mac">
              Ctrl
            </Kbd>
          </div>
          <div class="flex items-center justify-between">
            <span>Shift</span>
            <Kbd osSpecific forceOs="mac">
              Shift
            </Kbd>
          </div>
          <div class="flex items-center justify-between">
            <span>Caps Lock</span>
            <Kbd osSpecific forceOs="mac">
              Caps
            </Kbd>
          </div>
          <div class="flex items-center justify-between">
            <span>Tab</span>
            <Kbd osSpecific forceOs="mac">
              Tab
            </Kbd>
          </div>
          <div class="flex items-center justify-between">
            <span>Escape</span>
            <Kbd osSpecific forceOs="mac">
              Esc
            </Kbd>
          </div>
          <div class="flex items-center justify-between">
            <span>Space</span>
            <Kbd osSpecific forceOs="mac">
              Space
            </Kbd>
          </div>
        </div>
      </section>
    </div>
  );
});
