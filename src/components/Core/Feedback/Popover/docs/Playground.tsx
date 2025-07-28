import { component$, useSignal, $ } from "@builder.io/qwik";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/Core/Feedback/Popover";
import type {
  PopoverPlacement,
  PopoverSize,
} from "~/components/Core/Feedback/Popover";

export default component$(() => {
  // Configuration options
  const triggerType = useSignal<"click" | "hover" | "focus" | "manual">(
    "click",
  );
  const placement = useSignal<PopoverPlacement>("bottom");
  const size = useSignal<PopoverSize>("md");
  const hasArrow = useSignal(true);
  const isOpen = useSignal(false);

  // Content options
  const title = useSignal("Popover Title");
  const content = useSignal(
    "This is customizable popover content. You can change various properties using the controls below.",
  );
  const showImage = useSignal(false);

  const togglePopover = $(() => {
    if (triggerType.value === "manual") {
      isOpen.value = !isOpen.value;
    }
  });

  // Available placements
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

  // Available sizes
  const sizes: PopoverSize[] = ["sm", "md", "lg"];

  // Available trigger types
  const triggerTypes = ["click", "hover", "focus", "manual"];

  return (
    <div class="space-y-8">
      {/* Demo Area */}
      <div class="flex min-h-[200px] items-center justify-center rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
        <Popover
          trigger={triggerType.value}
          placement={placement.value}
          size={size.value}
          hasArrow={hasArrow.value}
          isOpen={triggerType.value === "manual" ? isOpen.value : undefined}
          onOpen$={$(() => {
            if (triggerType.value === "manual") {
              isOpen.value = true;
            }
          })}
          onClose$={$(() => {
            if (triggerType.value === "manual") {
              isOpen.value = false;
            }
          })}
        >
          <PopoverTrigger>
            <button class="rounded-md bg-primary-500 px-4 py-2 text-white transition-colors hover:bg-primary-600">
              {triggerType.value === "click"
                ? "Click me"
                : triggerType.value === "hover"
                  ? "Hover me"
                  : triggerType.value === "focus"
                    ? "Focus me"
                    : isOpen.value
                      ? "Popover is open"
                      : "Popover is closed"}
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <div class="p-4">
              {title.value && <h4 class="mb-2 font-semibold">{title.value}</h4>}

              {showImage.value && (
                <div class="mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww&w=200&q=80"
                    alt="Sample"
                    class="max-h-[120px] w-full rounded-md object-cover"
                  />
                </div>
              )}

              <p class="text-sm text-gray-600 dark:text-gray-300">
                {content.value}
              </p>
            </div>
          </PopoverContent>
        </Popover>

        {triggerType.value === "manual" && (
          <button
            onClick$={togglePopover}
            class="ml-4 rounded-md bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
          >
            {isOpen.value ? "Close" : "Open"} Popover
          </button>
        )}
      </div>

      {/* Controls */}
      <div class="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <h2 class="mb-4 text-xl font-semibold">Popover Configuration</h2>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left column - Component Options */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium">Component Options</h3>

            {/* Trigger Type */}
            <div>
              <label class="mb-2 block text-sm font-medium">Trigger Type</label>
              <div class="flex flex-wrap gap-2">
                {triggerTypes.map((type) => (
                  <button
                    key={type}
                    onClick$={() => {
                      triggerType.value = type as any;
                    }}
                    class={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                      triggerType.value === type
                        ? "border-primary-500 bg-primary-500 text-white"
                        : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Placement */}
            <div>
              <label class="mb-2 block text-sm font-medium">Placement</label>
              <div class="grid grid-cols-3 gap-2">
                {placements.map((pos) => (
                  <button
                    key={pos}
                    onClick$={() => {
                      placement.value = pos;
                    }}
                    class={`rounded-md border px-2 py-1.5 text-xs transition-colors ${
                      placement.value === pos
                        ? "border-primary-500 bg-primary-500 text-white"
                        : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700"
                    }`}
                  >
                    {pos}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <label class="mb-2 block text-sm font-medium">Size</label>
              <div class="flex gap-2">
                {sizes.map((sizeOption) => (
                  <button
                    key={sizeOption}
                    onClick$={() => {
                      size.value = sizeOption;
                    }}
                    class={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                      size.value === sizeOption
                        ? "border-primary-500 bg-primary-500 text-white"
                        : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700"
                    }`}
                  >
                    {sizeOption.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Show Arrow */}
            <div>
              <label class="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={hasArrow.value}
                  onChange$={() => (hasArrow.value = !hasArrow.value)}
                />
                <span class="text-sm font-medium">Show Arrow</span>
              </label>
            </div>
          </div>

          {/* Right column - Content Options */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium">Content Options</h3>

            {/* Title */}
            <div>
              <label class="mb-1 block text-sm font-medium">Title</label>
              <input
                type="text"
                value={title.value}
                onInput$={(e) =>
                  (title.value = (e.target as HTMLInputElement).value)
                }
                class="w-full rounded-md border bg-white p-2 dark:border-gray-600 dark:bg-gray-700"
              />
            </div>

            {/* Content */}
            <div>
              <label class="mb-1 block text-sm font-medium">Content</label>
              <textarea
                value={content.value}
                onInput$={(e) =>
                  (content.value = (e.target as HTMLTextAreaElement).value)
                }
                rows={3}
                class="w-full rounded-md border bg-white p-2 dark:border-gray-600 dark:bg-gray-700"
              ></textarea>
            </div>

            {/* Show Image */}
            <div>
              <label class="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={showImage.value}
                  onChange$={() => (showImage.value = !showImage.value)}
                />
                <span class="text-sm font-medium">Include Image</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
