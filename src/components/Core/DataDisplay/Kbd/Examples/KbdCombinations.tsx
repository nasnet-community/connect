import { component$ } from "@builder.io/qwik";
import { KbdGroup } from "../index";

export const KbdCombinations = component$(() => {
  return (
    <div class="space-y-8">
      {/* Common Shortcuts */}
      <section>
        <h3 class="mb-4 text-lg font-semibold">Common Shortcuts</h3>
        <div class="space-y-3">
          <div class="flex max-w-md items-center justify-between">
            <span>Copy</span>
            <KbdGroup keys={["Ctrl", "C"]} />
          </div>
          <div class="flex max-w-md items-center justify-between">
            <span>Paste</span>
            <KbdGroup keys={["Ctrl", "V"]} />
          </div>
          <div class="flex max-w-md items-center justify-between">
            <span>Cut</span>
            <KbdGroup keys={["Ctrl", "X"]} />
          </div>
          <div class="flex max-w-md items-center justify-between">
            <span>Undo</span>
            <KbdGroup keys={["Ctrl", "Z"]} />
          </div>
          <div class="flex max-w-md items-center justify-between">
            <span>Redo</span>
            <KbdGroup keys={["Ctrl", "Shift", "Z"]} />
          </div>
        </div>
      </section>

      {/* IDE Shortcuts */}
      <section>
        <h3 class="mb-4 text-lg font-semibold">IDE Shortcuts</h3>
        <div class="space-y-3">
          <div class="flex max-w-md items-center justify-between">
            <span>Command Palette</span>
            <KbdGroup keys={["Ctrl", "Shift", "P"]} />
          </div>
          <div class="flex max-w-md items-center justify-between">
            <span>Quick Open</span>
            <KbdGroup keys={["Ctrl", "P"]} />
          </div>
          <div class="flex max-w-md items-center justify-between">
            <span>Toggle Terminal</span>
            <KbdGroup keys={["Ctrl", "`"]} />
          </div>
          <div class="flex max-w-md items-center justify-between">
            <span>Multi-cursor</span>
            <KbdGroup keys={["Alt", "Click"]} />
          </div>
        </div>
      </section>

      {/* Different Separators */}
      <section>
        <h3 class="mb-4 text-lg font-semibold">Different Separators</h3>
        <div class="space-y-3">
          <div>
            <span class="mr-3 text-sm text-gray-600">Plus (default):</span>
            <KbdGroup keys={["Ctrl", "Alt", "Del"]} />
          </div>
          <div>
            <span class="mr-3 text-sm text-gray-600">Hyphen:</span>
            <KbdGroup keys={["Cmd", "K"]} separator="-" />
          </div>
          <div>
            <span class="mr-3 text-sm text-gray-600">Arrow:</span>
            <KbdGroup keys={["Ctrl", "Tab"]} separator="→" />
          </div>
          <div>
            <span class="mr-3 text-sm text-gray-600">Then:</span>
            <KbdGroup keys={["Ctrl", "K", "Ctrl", "S"]} separator="then" />
          </div>
        </div>
      </section>

      {/* Different Variants */}
      <section>
        <h3 class="mb-4 text-lg font-semibold">Variant Combinations</h3>
        <div class="space-y-3">
          <div>
            <span class="mr-3 text-sm text-gray-600">Raised:</span>
            <KbdGroup keys={["Ctrl", "Shift", "N"]} variant="raised" />
          </div>
          <div>
            <span class="mr-3 text-sm text-gray-600">Flat:</span>
            <KbdGroup keys={["Alt", "Tab"]} variant="flat" />
          </div>
          <div>
            <span class="mr-3 text-sm text-gray-600">Outlined:</span>
            <KbdGroup keys={["Cmd", "Space"]} variant="outlined" />
          </div>
        </div>
      </section>

      {/* Size Variations */}
      <section>
        <h3 class="mb-4 text-lg font-semibold">Size Variations</h3>
        <div class="space-y-3">
          <div>
            <span class="mr-3 text-sm text-gray-600">Small:</span>
            <KbdGroup keys={["Ctrl", "S"]} size="sm" />
          </div>
          <div>
            <span class="mr-3 text-sm text-gray-600">Medium:</span>
            <KbdGroup keys={["Ctrl", "S"]} size="md" />
          </div>
          <div>
            <span class="mr-3 text-sm text-gray-600">Large:</span>
            <KbdGroup keys={["Ctrl", "S"]} size="lg" />
          </div>
        </div>
      </section>
    </div>
  );
});
