import { component$, useSignal, $ } from "@builder.io/qwik";
import { Popover } from "../Popover";
import { PopoverContent } from "../PopoverContent";
import { PopoverTrigger } from "../PopoverTrigger";
import type {
  PopoverPlacement,
  PopoverSize,
  PopoverTrigger as TriggerType,
} from "../Popover.types";

export default component$(() => {
  const activePlacement = useSignal<PopoverPlacement>("bottom");
  const activeSize = useSignal<PopoverSize>("md");
  const activeTrigger = useSignal<TriggerType>("click");
  const hasArrow = useSignal(true);
  const isOpen = useSignal(false);

  const placements: PopoverPlacement[] = [
    "top",
    "top-start",
    "top-end",
    "right",
    "right-start",
    "right-end",
    "bottom",
    "bottom-start",
    "bottom-end",
    "left",
    "left-start",
    "left-end",
  ];

  const sizes: PopoverSize[] = ["sm", "md", "lg"];
  const triggers: TriggerType[] = ["click", "hover", "focus", "manual"];

  const handleOpen$ = $(() => {
    console.log("Popover opened");
  });

  const handleClose$ = $(() => {
    console.log("Popover closed");
  });

  return (
    <div class="space-y-12 p-6">
      <h2 class="mb-6 text-2xl font-semibold">Popover Component Examples</h2>

      {/* Basic Popover */}
      <section class="space-y-4">
        <h3 class="text-xl font-medium">Basic Popover</h3>
        <p class="text-gray-600 dark:text-gray-300">
          A simple popover with default configuration.
        </p>

        <div class="mt-4">
          <Popover>
            <PopoverTrigger>
              <button class="rounded-md bg-primary-500 px-4 py-2 text-white transition-colors hover:bg-primary-600">
                Click me
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <div class="p-1">
                <h4 class="font-semibold">Basic Popover</h4>
                <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  This is a basic popover with default settings.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </section>

      {/* Placement Examples */}
      <section class="space-y-4">
        <h3 class="text-xl font-medium">Placement Variations</h3>
        <p class="text-gray-600 dark:text-gray-300">
          Popovers can be positioned in various ways relative to the trigger
          element.
        </p>

        <div class="mt-2 flex flex-wrap gap-3">
          {placements.map((placement) => (
            <button
              key={placement}
              onClick$={() => {
                activePlacement.value = placement;
              }}
              class={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                activePlacement.value === placement
                  ? "border-primary-500 bg-primary-500 text-white"
                  : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700"
              }`}
            >
              {placement}
            </button>
          ))}
        </div>

        <div class="flex h-60 items-center justify-center rounded-lg border border-dashed border-gray-300 p-4 dark:border-gray-600">
          <Popover placement={activePlacement.value} hasArrow={hasArrow.value}>
            <PopoverTrigger>
              <button class="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
                {activePlacement.value} placement
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <div class="p-1">
                <h4 class="font-semibold">
                  Placement: {activePlacement.value}
                </h4>
                <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  This popover is positioned at the {activePlacement.value} of
                  the trigger.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </section>

      {/* Size Variations */}
      <section class="space-y-4">
        <h3 class="text-xl font-medium">Size Variations</h3>
        <p class="text-gray-600 dark:text-gray-300">
          Popovers come in different sizes to suit various content needs.
        </p>

        <div class="mt-2 flex gap-4">
          {sizes.map((size) => (
            <button
              key={size}
              onClick$={() => {
                activeSize.value = size;
              }}
              class={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                activeSize.value === size
                  ? "border-primary-500 bg-primary-500 text-white"
                  : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700"
              }`}
            >
              {size.toUpperCase()}
            </button>
          ))}
        </div>

        <div class="mt-4">
          <Popover size={activeSize.value}>
            <PopoverTrigger>
              <button class="rounded-md bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600">
                {activeSize.value.toUpperCase()} Size Popover
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <div class="p-1">
                <h4 class="font-semibold">
                  Size: {activeSize.value.toUpperCase()}
                </h4>
                <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  This popover uses the {activeSize.value} size variant.
                </p>
                {activeSize.value === "lg" && (
                  <div class="mt-2 text-sm">
                    <p>Larger popovers are great for:</p>
                    <ul class="ml-5 mt-1 list-disc space-y-1">
                      <li>Displaying more complex content</li>
                      <li>Forms and input fields</li>
                      <li>Rich media content</li>
                      <li>Detailed information display</li>
                    </ul>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </section>

      {/* Trigger Variations */}
      <section class="space-y-4">
        <h3 class="text-xl font-medium">Trigger Variations</h3>
        <p class="text-gray-600 dark:text-gray-300">
          Popovers can be triggered in different ways: click, hover, focus, or
          manual control.
        </p>

        <div class="mt-2 flex gap-4">
          {triggers.map((trigger) => (
            <button
              key={trigger}
              onClick$={() => {
                activeTrigger.value = trigger;
              }}
              class={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                activeTrigger.value === trigger
                  ? "border-primary-500 bg-primary-500 text-white"
                  : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700"
              }`}
            >
              {trigger}
            </button>
          ))}
        </div>

        <div class="mt-4 flex flex-wrap gap-6">
          {activeTrigger.value !== "manual" ? (
            <Popover trigger={activeTrigger.value}>
              <PopoverTrigger>
                <button class="rounded-md bg-purple-500 px-4 py-2 text-white transition-colors hover:bg-purple-600">
                  {activeTrigger.value === "click"
                    ? "Click me"
                    : activeTrigger.value === "hover"
                      ? "Hover me"
                      : "Focus me"}
                </button>
              </PopoverTrigger>
              <PopoverContent>
                <div class="p-1">
                  <h4 class="font-semibold">Trigger: {activeTrigger.value}</h4>
                  <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    This popover is triggered by {activeTrigger.value}.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div class="flex items-center gap-3">
              <Popover trigger="manual" isOpen={isOpen.value}>
                <PopoverTrigger>
                  <button class="rounded-md bg-purple-500 px-4 py-2 text-white transition-colors hover:bg-purple-600">
                    Manual trigger
                  </button>
                </PopoverTrigger>
                <PopoverContent>
                  <div class="p-1">
                    <h4 class="font-semibold">Manual Trigger</h4>
                    <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      This popover is controlled manually through state.
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
              <div class="flex gap-2">
                <button
                  onClick$={() => (isOpen.value = true)}
                  class="rounded-md bg-green-500 px-3 py-1.5 text-sm text-white"
                >
                  Open
                </button>
                <button
                  onClick$={() => (isOpen.value = false)}
                  class="rounded-md bg-red-500 px-3 py-1.5 text-sm text-white"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Arrow Toggle */}
      <section class="space-y-4">
        <h3 class="text-xl font-medium">With/Without Arrow</h3>
        <p class="text-gray-600 dark:text-gray-300">
          Popovers can be displayed with or without an arrow pointing to the
          trigger.
        </p>

        <div class="mt-2 flex gap-4">
          <button
            onClick$={() => {
              hasArrow.value = true;
            }}
            class={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
              hasArrow.value
                ? "border-primary-500 bg-primary-500 text-white"
                : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700"
            }`}
          >
            With Arrow
          </button>
          <button
            onClick$={() => {
              hasArrow.value = false;
            }}
            class={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
              !hasArrow.value
                ? "border-primary-500 bg-primary-500 text-white"
                : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700"
            }`}
          >
            Without Arrow
          </button>
        </div>
      </section>

      {/* Callbacks Example */}
      <section class="space-y-4">
        <h3 class="text-xl font-medium">With Callbacks</h3>
        <p class="text-gray-600 dark:text-gray-300">
          Popovers can trigger callbacks when they open or close.
        </p>

        <div class="mt-4">
          <Popover onOpen$={handleOpen$} onClose$={handleClose$}>
            <PopoverTrigger>
              <button class="rounded-md bg-amber-500 px-4 py-2 text-white transition-colors hover:bg-amber-600">
                With Callbacks
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <div class="p-1">
                <h4 class="font-semibold">Callback Example</h4>
                <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  This popover logs messages to the console when opened or
                  closed.
                </p>
                <div class="mt-2 rounded bg-gray-100 p-2 text-xs dark:bg-gray-700">
                  <code>Check your browser console for logs</code>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </section>

      {/* Rich Content Example */}
      <section class="space-y-4">
        <h3 class="text-xl font-medium">Rich Content</h3>
        <p class="text-gray-600 dark:text-gray-300">
          Popovers can contain rich, interactive content like forms or complex
          UI.
        </p>

        <div class="mt-4">
          <Popover size="lg">
            <PopoverTrigger>
              <button class="rounded-md bg-indigo-500 px-4 py-2 text-white transition-colors hover:bg-indigo-600">
                Show Rich Content
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <div class="p-1">
                <h4 class="mb-3 border-b border-gray-200 pb-2 font-semibold dark:border-gray-700">
                  User Profile
                </h4>
                <div class="flex items-start gap-4">
                  <div class="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-xl font-bold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                    JD
                  </div>
                  <div class="flex-1">
                    <div class="space-y-1">
                      <p class="font-medium">John Doe</p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        john.doe@example.com
                      </p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        Product Designer
                      </p>
                    </div>
                    <div class="mt-3 flex gap-2">
                      <button class="rounded bg-primary-100 px-3 py-1 text-sm text-primary-800 dark:bg-primary-800 dark:text-primary-100">
                        View Profile
                      </button>
                      <button class="rounded bg-gray-100 px-3 py-1 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-100">
                        Message
                      </button>
                    </div>
                  </div>
                </div>
                <div class="mt-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    Last active: 10 minutes ago
                  </p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </section>

      {/* Accessibility Information */}
      <section class="mt-12 rounded-lg bg-blue-50 p-5 dark:bg-blue-900/20">
        <h3 class="text-lg font-medium text-blue-800 dark:text-blue-200">
          Accessibility Features
        </h3>
        <ul class="ml-5 mt-3 list-disc space-y-2 text-blue-700 dark:text-blue-300">
          <li>
            <strong>Keyboard Navigation:</strong> Close with Escape key; focus
            is managed appropriately
          </li>
          <li>
            <strong>ARIA Attributes:</strong> Uses{" "}
            <code class="rounded bg-blue-100 px-1 dark:bg-blue-800/50">
              role="tooltip"
            </code>{" "}
            for screen readers
          </li>
          <li>
            <strong>Focus Management:</strong> Content receives focus when
            opened
          </li>
          <li>
            <strong>Multiple Trigger Methods:</strong> Support for click, hover,
            and focus triggers for different use cases
          </li>
          <li>
            <strong>Close on Outside Click:</strong> Allows users to easily
            dismiss the popover
          </li>
        </ul>
      </section>
    </div>
  );
});
