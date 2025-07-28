import { component$, useSignal } from "@builder.io/qwik";
import { Heading } from "../Heading";
import type { HeadingLevel, HeadingWeight, HeadingAlignment, HeadingColor } from "../Heading.types";

/**
 * Interactive Playground for the Heading component
 * 
 * Allows users to experiment with different prop combinations in real-time
 */
export const Playground = component$(() => {
  // State for all configurable props
  const level = useSignal<HeadingLevel>(2);
  const weight = useSignal<HeadingWeight>("semibold");
  const align = useSignal<HeadingAlignment>("left");
  const color = useSignal<HeadingColor>("primary");
  const truncate = useSignal(false);
  const maxLines = useSignal(1);
  const text = useSignal("Customize This Heading");
  const useResponsive = useSignal(false);
  const responsiveBase = useSignal<HeadingLevel>(3);
  const responsiveMd = useSignal<HeadingLevel>(2);
  const responsiveLg = useSignal<HeadingLevel>(1);

  return (
    <div class="space-y-8 p-6">
      {/* Header */}
      <section class="space-y-4">
        <Heading level={1} class="text-3xl md:text-4xl">
          Heading Playground
        </Heading>
        
        <p class="text-base text-gray-700 dark:text-gray-300">
          Experiment with different Heading configurations in real-time.
        </p>
      </section>

      {/* Preview Area */}
      <section class="space-y-4">
        <Heading level={2} class="text-xl mb-4">
          Preview
        </Heading>
        
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 min-h-[200px] flex items-center justify-center">
          <div class="w-full max-w-3xl">
            <Heading
              level={level.value}
              weight={weight.value}
              align={align.value}
              color={color.value}
              truncate={truncate.value}
              maxLines={maxLines.value}
              responsiveSize={useResponsive.value ? {
                base: responsiveBase.value,
                md: responsiveMd.value,
                lg: responsiveLg.value
              } : undefined}
            >
              {text.value}
            </Heading>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section class="space-y-6">
        <Heading level={2} class="text-xl mb-4">
          Controls
        </Heading>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Text Input */}
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Text Content
            </label>
            <input
              type="text"
              value={text.value}
              onInput$={(e) => text.value = (e.target as HTMLInputElement).value}
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Level Select */}
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Level
            </label>
            <select
              value={level.value}
              onChange$={(e) => level.value = Number((e.target as HTMLSelectElement).value) as HeadingLevel}
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value={1}>Level 1 (h1)</option>
              <option value={2}>Level 2 (h2)</option>
              <option value={3}>Level 3 (h3)</option>
              <option value={4}>Level 4 (h4)</option>
              <option value={5}>Level 5 (h5)</option>
              <option value={6}>Level 6 (h6)</option>
            </select>
          </div>

          {/* Weight Select */}
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Weight
            </label>
            <select
              value={weight.value}
              onChange$={(e) => weight.value = (e.target as HTMLSelectElement).value as HeadingWeight}
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="light">Light</option>
              <option value="normal">Normal</option>
              <option value="medium">Medium</option>
              <option value="semibold">Semibold</option>
              <option value="bold">Bold</option>
              <option value="extrabold">Extrabold</option>
            </select>
          </div>

          {/* Alignment Select */}
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Alignment
            </label>
            <select
              value={align.value}
              onChange$={(e) => align.value = (e.target as HTMLSelectElement).value as HeadingAlignment}
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>

          {/* Color Select */}
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Color
            </label>
            <select
              value={color.value}
              onChange$={(e) => color.value = (e.target as HTMLSelectElement).value as HeadingColor}
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="tertiary">Tertiary</option>
              <option value="inverse">Inverse</option>
              <option value="accent">Accent</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
              <option value="info">Info</option>
            </select>
          </div>

          {/* Truncate Toggle */}
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <input
                type="checkbox"
                checked={truncate.value}
                onChange$={(e) => truncate.value = (e.target as HTMLInputElement).checked}
                class="rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
              />
              Enable Truncation
            </label>
            {truncate.value && (
              <input
                type="number"
                min="1"
                max="6"
                value={maxLines.value}
                onInput$={(e) => maxLines.value = Number((e.target as HTMLInputElement).value)}
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Max lines"
              />
            )}
          </div>
        </div>

        {/* Responsive Size Controls */}
        <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              checked={useResponsive.value}
              onChange$={(e) => useResponsive.value = (e.target as HTMLInputElement).checked}
              class="rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
            />
            Enable Responsive Sizing
          </label>

          {useResponsive.value && (
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mobile (base)
                </label>
                <select
                  value={responsiveBase.value}
                  onChange$={(e) => responsiveBase.value = Number((e.target as HTMLSelectElement).value) as HeadingLevel}
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value={1}>h1</option>
                  <option value={2}>h2</option>
                  <option value={3}>h3</option>
                  <option value={4}>h4</option>
                  <option value={5}>h5</option>
                  <option value={6}>h6</option>
                </select>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tablet (md)
                </label>
                <select
                  value={responsiveMd.value}
                  onChange$={(e) => responsiveMd.value = Number((e.target as HTMLSelectElement).value) as HeadingLevel}
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value={1}>h1</option>
                  <option value={2}>h2</option>
                  <option value={3}>h3</option>
                  <option value={4}>h4</option>
                  <option value={5}>h5</option>
                  <option value={6}>h6</option>
                </select>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Desktop (lg)
                </label>
                <select
                  value={responsiveLg.value}
                  onChange$={(e) => responsiveLg.value = Number((e.target as HTMLSelectElement).value) as HeadingLevel}
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value={1}>h1</option>
                  <option value={2}>h2</option>
                  <option value={3}>h3</option>
                  <option value={4}>h4</option>
                  <option value={5}>h5</option>
                  <option value={6}>h6</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Code Output */}
      <section class="space-y-4">
        <Heading level={2} class="text-xl mb-4">
          Generated Code
        </Heading>
        
        <div class="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-gray-100">
            <code>{`<Heading
  level={${level.value}}
  weight="${weight.value}"
  align="${align.value}"
  color="${color.value}"${truncate.value ? `
  truncate={${truncate.value}}${maxLines.value > 1 ? `
  maxLines={${maxLines.value}}` : ''}` : ''}${useResponsive.value ? `
  responsiveSize={{
    base: ${responsiveBase.value},
    md: ${responsiveMd.value},
    lg: ${responsiveLg.value}
  }}` : ''}
>
  ${text.value}
</Heading>`}</code>
          </pre>
        </div>
      </section>
    </div>
  );
});