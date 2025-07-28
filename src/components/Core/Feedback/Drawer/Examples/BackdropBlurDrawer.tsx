import { component$, useSignal } from "@builder.io/qwik";
import { Drawer } from "../Drawer";
import { Button } from "~/components/Core";

/**
 * Example demonstrating different backdrop blur effects.
 * Shows how the theme utilities provide consistent blur styling.
 */
export const BackdropBlurDrawer = component$(() => {
  const isOpen = useSignal(false);
  const blurType = useSignal<"light" | "medium" | "heavy">("medium");

  const blurOptions = [
    {
      value: "light" as const,
      label: "Light Blur",
      description: "Subtle backdrop blur with light overlay",
    },
    {
      value: "medium" as const,
      label: "Medium Blur",
      description: "Balanced blur effect for most use cases",
    },
    {
      value: "heavy" as const,
      label: "Heavy Blur",
      description: "Strong blur for maximum focus",
    },
  ];

  return (
    <div class="flex flex-col gap-4">
      <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
        {blurOptions.map((option) => (
          <Button
            key={option.value}
            onClick$={() => {
              blurType.value = option.value;
              isOpen.value = true;
            }}
            variant={blurType.value === option.value ? "primary" : "outline"}
            class="flex h-auto flex-col py-3"
          >
            <span class="font-medium">{option.label}</span>
            <span class="mt-1 text-xs opacity-70">{option.description}</span>
          </Button>
        ))}
      </div>

      <Drawer
        isOpen={isOpen.value}
        onClose$={() => (isOpen.value = false)}
        placement="right"
        size="md"
        backdropBlur={blurType.value}
        enableSwipeGestures={true}
        showDragHandle={false}
        mobileAnimation={true}
      >
        <div q:slot="header">
          <h2 class="text-xl font-semibold">Backdrop Blur Demo</h2>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Current blur: <span class="font-medium">{blurType.value}</span>
          </p>
        </div>

        <div class="space-y-6 p-6">
          <div class="rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 dark:from-purple-900/20 dark:to-pink-900/20">
            <h3 class="mb-3 text-lg font-semibold">Blur Effect Showcase</h3>
            <p class="leading-relaxed text-gray-700 dark:text-gray-300">
              The backdrop blur creates depth and focus by applying different
              levels of background blur. Notice how the content behind this
              drawer becomes more or less visible based on the blur intensity.
            </p>
          </div>

          <div class="grid grid-cols-1 gap-4">
            {blurOptions.map((option) => (
              <div
                key={option.value}
                class={[
                  "rounded-lg border-2 p-4 transition-all",
                  blurType.value === option.value
                    ? "border-blue-300 bg-blue-50 dark:border-blue-600 dark:bg-blue-900/20"
                    : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800",
                ]}
              >
                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="font-medium">{option.label}</h4>
                    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {option.description}
                    </p>
                  </div>
                  {blurType.value === option.value && (
                    <div class="h-3 w-3 rounded-full bg-blue-500"></div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div class="rounded-lg bg-amber-50 p-4 dark:bg-amber-900/20">
            <div class="flex items-start gap-3">
              <div class="text-xl text-amber-500">💡</div>
              <div>
                <h4 class="font-medium text-amber-900 dark:text-amber-100">
                  Pro Tip
                </h4>
                <p class="mt-1 text-sm text-amber-800 dark:text-amber-200">
                  Close this drawer and try different blur levels to see how
                  they affect the background visibility and overall feel.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div q:slot="footer" class="flex items-center justify-between">
          <div class="flex gap-2">
            {blurOptions.map((option) => (
              <button
                key={option.value}
                onClick$={() => (blurType.value = option.value)}
                class={[
                  "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                  blurType.value === option.value
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700",
                ]}
              >
                {option.value}
              </button>
            ))}
          </div>
          <Button
            onClick$={() => (isOpen.value = false)}
            variant="primary"
            size="sm"
          >
            Done
          </Button>
        </div>
      </Drawer>

      {/* Background content to demonstrate blur effect */}
      <div class="mt-8 rounded-xl bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20">
        <h3 class="mb-3 text-lg font-semibold">Background Content</h3>
        <p class="mb-4 text-gray-700 dark:text-gray-300">
          This colorful background helps demonstrate the blur effect. Open the
          drawer with different blur settings to see how it affects this
          content.
        </p>
        <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              class="aspect-square flex items-center justify-center rounded-lg bg-gradient-to-br from-white/50 to-white/20 text-2xl"
            >
              {["🎨", "🌈", "✨", "🎭", "🎪", "🎨", "🌟", "🎊"][i]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default BackdropBlurDrawer;
