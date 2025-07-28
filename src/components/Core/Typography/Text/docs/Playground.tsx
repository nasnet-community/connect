import { component$, useSignal } from "@builder.io/qwik";
import { Text } from "../Text";

/**
 * Interactive playground for the Text component
 * 
 * Live editor for testing component variations and configurations
 */
export const Playground = component$(() => {
  // Control states
  const variant = useSignal<"body" | "paragraph" | "caption" | "label" | "code" | "quote">("body");
  const size = useSignal<"xs" | "sm" | "base" | "lg" | "xl" | "2xl">("base");
  const weight = useSignal<"light" | "normal" | "medium" | "semibold" | "bold" | "extrabold">("normal");
  const align = useSignal<"left" | "center" | "right">("left");
  const color = useSignal<"primary" | "secondary" | "tertiary" | "inverse" | "accent" | "success" | "warning" | "error" | "info" | "subtle">("primary");
  const transform = useSignal<"none" | "uppercase" | "lowercase" | "capitalize">("none");
  const decoration = useSignal<"none" | "underline" | "line-through">("none");
  const truncate = useSignal(false);
  const maxLines = useSignal(1);
  const italic = useSignal(false);
  const monospace = useSignal(false);
  const interactive = useSignal(false);
  const customText = useSignal("This is sample text for the playground. You can modify the controls below to see how different props affect the text appearance and behavior.");

  // Responsive controls
  const useResponsive = useSignal(false);
  const responsiveBase = useSignal<"xs" | "sm" | "base" | "lg" | "xl" | "2xl">("base");
  const responsiveMd = useSignal<"xs" | "sm" | "base" | "lg" | "xl" | "2xl">("lg");
  const responsiveLg = useSignal<"xs" | "sm" | "base" | "lg" | "xl" | "2xl">("xl");

  return (
    <div class="space-y-8 p-6">
      {/* Header */}
      <section class="space-y-4">
        <Text variant="body" as="h1" size="2xl" weight="bold" class="text-3xl md:text-4xl">
          Text Playground
        </Text>
        
        <Text variant="paragraph" color="secondary">
          Interactive playground to experiment with the Text component. Adjust the controls below
          to see how different properties affect the text appearance and behavior in real-time.
        </Text>
      </section>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preview */}
        <section class="space-y-4">
          <Text variant="body" as="h2" size="lg" weight="semibold">
            Preview
          </Text>
          
          <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 min-h-[200px] flex items-center justify-center">
            <div class="w-full max-w-md">
              <Text
                variant={variant.value}
                size={useResponsive.value ? undefined : size.value}
                responsiveSize={useResponsive.value ? {
                  base: responsiveBase.value,
                  md: responsiveMd.value,
                  lg: responsiveLg.value
                } : undefined}
                weight={weight.value}
                align={align.value}
                color={color.value}
                transform={transform.value}
                decoration={decoration.value}
                truncate={truncate.value}
                maxLines={maxLines.value}
                italic={italic.value}
                monospace={monospace.value}
                onClick$={interactive.value ? () => alert('Text clicked!') : undefined}
              >
                {customText.value}
              </Text>
            </div>
          </div>

          {/* Generated Code */}
          <div class="space-y-2">
            <Text variant="label" weight="medium">Generated Code</Text>
            <div class="bg-gray-900 dark:bg-gray-950 text-green-400 p-4 rounded-lg overflow-x-auto">
              <Text variant="code" color="accent" class="text-sm whitespace-pre">
{`<Text
  variant="${variant.value}"${useResponsive.value ? `
  responsiveSize={{
    base: "${responsiveBase.value}",
    md: "${responsiveMd.value}",
    lg: "${responsiveLg.value}"
  }}` : `
  size="${size.value}"`}
  weight="${weight.value}"
  align="${align.value}"
  color="${color.value}"${transform.value !== "none" ? `
  transform="${transform.value}"` : ""}${decoration.value !== "none" ? `
  decoration="${decoration.value}"` : ""}${truncate.value ? `
  truncate={true}
  maxLines={${maxLines.value}}` : ""}${italic.value ? `
  italic={true}` : ""}${monospace.value ? `
  monospace={true}` : ""}${interactive.value ? `
  onClick$={() => handleClick()}` : ""}
>
  ${customText.value}
</Text>`}
              </Text>
            </div>
          </div>
        </section>

        {/* Controls */}
        <section class="space-y-6">
          <Text variant="body" as="h2" size="lg" weight="semibold">
            Controls
          </Text>

          {/* Text Content */}
          <div class="space-y-2">
            <Text variant="label" weight="medium">Text Content</Text>
            <textarea
              value={customText.value}
              onInput$={(e) => customText.value = (e.target as HTMLTextAreaElement).value}
              class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
              rows={3}
            />
          </div>

          {/* Variant */}
          <div class="space-y-2">
            <Text variant="label" weight="medium">Variant</Text>
            <select
              value={variant.value}
              onChange$={(e) => variant.value = (e.target as HTMLSelectElement).value as any}
              class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
            >
              <option value="body">Body</option>
              <option value="paragraph">Paragraph</option>
              <option value="caption">Caption</option>
              <option value="label">Label</option>
              <option value="code">Code</option>
              <option value="quote">Quote</option>
            </select>
          </div>

          {/* Responsive Sizing Toggle */}
          <div class="space-y-3">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={useResponsive.value}
                onChange$={(e) => useResponsive.value = (e.target as HTMLInputElement).checked}
                class="w-4 h-4"
              />
              <Text variant="label" weight="medium">Use Responsive Sizing</Text>
            </label>

            {useResponsive.value ? (
              <div class="grid grid-cols-3 gap-3">
                <div class="space-y-1">
                  <Text variant="caption" color="secondary">Base (Mobile)</Text>
                  <select
                    value={responsiveBase.value}
                    onChange$={(e) => responsiveBase.value = (e.target as HTMLSelectElement).value as any}
                    class="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                  >
                    <option value="xs">xs</option>
                    <option value="sm">sm</option>
                    <option value="base">base</option>
                    <option value="lg">lg</option>
                    <option value="xl">xl</option>
                    <option value="2xl">2xl</option>
                  </select>
                </div>
                <div class="space-y-1">
                  <Text variant="caption" color="secondary">MD (Tablet)</Text>
                  <select
                    value={responsiveMd.value}
                    onChange$={(e) => responsiveMd.value = (e.target as HTMLSelectElement).value as any}
                    class="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                  >
                    <option value="xs">xs</option>
                    <option value="sm">sm</option>
                    <option value="base">base</option>
                    <option value="lg">lg</option>
                    <option value="xl">xl</option>
                    <option value="2xl">2xl</option>
                  </select>
                </div>
                <div class="space-y-1">
                  <Text variant="caption" color="secondary">LG (Desktop)</Text>
                  <select
                    value={responsiveLg.value}
                    onChange$={(e) => responsiveLg.value = (e.target as HTMLSelectElement).value as any}
                    class="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                  >
                    <option value="xs">xs</option>
                    <option value="sm">sm</option>
                    <option value="base">base</option>
                    <option value="lg">lg</option>
                    <option value="xl">xl</option>
                    <option value="2xl">2xl</option>
                  </select>
                </div>
              </div>
            ) : (
              <div class="space-y-2">
                <Text variant="label" weight="medium">Size</Text>
                <select
                  value={size.value}
                  onChange$={(e) => size.value = (e.target as HTMLSelectElement).value as any}
                  class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                >
                  <option value="xs">xs (12px)</option>
                  <option value="sm">sm (14px)</option>
                  <option value="base">base (16px)</option>
                  <option value="lg">lg (18px)</option>
                  <option value="xl">xl (20px)</option>
                  <option value="2xl">2xl (24px)</option>
                </select>
              </div>
            )}
          </div>

          {/* Weight */}
          <div class="space-y-2">
            <Text variant="label" weight="medium">Weight</Text>
            <select
              value={weight.value}
              onChange$={(e) => weight.value = (e.target as HTMLSelectElement).value as any}
              class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
            >
              <option value="light">Light (300)</option>
              <option value="normal">Normal (400)</option>
              <option value="medium">Medium (500)</option>
              <option value="semibold">Semibold (600)</option>
              <option value="bold">Bold (700)</option>
              <option value="extrabold">Extrabold (800)</option>
            </select>
          </div>

          {/* Alignment */}
          <div class="space-y-2">
            <Text variant="label" weight="medium">Alignment</Text>
            <select
              value={align.value}
              onChange$={(e) => align.value = (e.target as HTMLSelectElement).value as any}
              class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>

          {/* Color */}
          <div class="space-y-2">
            <Text variant="label" weight="medium">Color</Text>
            <select
              value={color.value}
              onChange$={(e) => color.value = (e.target as HTMLSelectElement).value as any}
              class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="tertiary">Tertiary</option>
              <option value="subtle">Subtle</option>
              <option value="inverse">Inverse</option>
              <option value="accent">Accent</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
              <option value="info">Info</option>
            </select>
          </div>

          {/* Transform */}
          <div class="space-y-2">
            <Text variant="label" weight="medium">Transform</Text>
            <select
              value={transform.value}
              onChange$={(e) => transform.value = (e.target as HTMLSelectElement).value as any}
              class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
            >
              <option value="none">None</option>
              <option value="uppercase">Uppercase</option>
              <option value="lowercase">Lowercase</option>
              <option value="capitalize">Capitalize</option>
            </select>
          </div>

          {/* Decoration */}
          <div class="space-y-2">
            <Text variant="label" weight="medium">Decoration</Text>
            <select
              value={decoration.value}
              onChange$={(e) => decoration.value = (e.target as HTMLSelectElement).value as any}
              class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
            >
              <option value="none">None</option>
              <option value="underline">Underline</option>
              <option value="line-through">Line Through</option>
            </select>
          </div>

          {/* Truncation */}
          <div class="space-y-3">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={truncate.value}
                onChange$={(e) => truncate.value = (e.target as HTMLInputElement).checked}
                class="w-4 h-4"
              />
              <Text variant="label" weight="medium">Enable Truncation</Text>
            </label>

            {truncate.value && (
              <div class="space-y-2">
                <Text variant="label" weight="medium">Max Lines</Text>
                <input
                  type="number"
                  min="1"
                  max="6"
                  value={maxLines.value}
                  onInput$={(e) => maxLines.value = parseInt((e.target as HTMLInputElement).value)}
                  class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                />
              </div>
            )}
          </div>

          {/* Style Options */}
          <div class="space-y-3">
            <Text variant="label" weight="medium">Style Options</Text>
            
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={italic.value}
                onChange$={(e) => italic.value = (e.target as HTMLInputElement).checked}
                class="w-4 h-4"
              />
              <Text variant="body">Italic</Text>
            </label>

            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={monospace.value}
                onChange$={(e) => monospace.value = (e.target as HTMLInputElement).checked}
                class="w-4 h-4"
              />
              <Text variant="body">Monospace</Text>
            </label>

            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={interactive.value}
                onChange$={(e) => interactive.value = (e.target as HTMLInputElement).checked}
                class="w-4 h-4"
              />
              <Text variant="body">Interactive (onClick)</Text>
            </label>
          </div>

          {/* Reset Button */}
          <button
            onClick$={() => {
              variant.value = "body";
              size.value = "base";
              weight.value = "normal";
              align.value = "left";
              color.value = "primary";
              transform.value = "none";
              decoration.value = "none";
              truncate.value = false;
              maxLines.value = 1;
              italic.value = false;
              monospace.value = false;
              interactive.value = false;
              useResponsive.value = false;
              responsiveBase.value = "base";
              responsiveMd.value = "lg";
              responsiveLg.value = "xl";
              customText.value = "This is sample text for the playground. You can modify the controls below to see how different props affect the text appearance and behavior.";
            }}
            class="w-full p-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            <Text variant="body" weight="medium">Reset to Defaults</Text>
          </button>
        </section>
      </div>

      {/* Usage Tips */}
      <section class="space-y-4">
        <Text variant="body" as="h2" size="lg" weight="semibold">
          Usage Tips
        </Text>
        
        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <ul class="space-y-2">
            <li class="flex items-start gap-2">
              <Text color="info" class="mt-0.5">💡</Text>
              <Text variant="body" color="info">
                Try different combinations to see how properties interact with each other
              </Text>
            </li>
            <li class="flex items-start gap-2">
              <Text color="info" class="mt-0.5">📱</Text>
              <Text variant="body" color="info">
                Use responsive sizing to test how text adapts across different screen sizes
              </Text>
            </li>
            <li class="flex items-start gap-2">
              <Text color="info" class="mt-0.5">✂️</Text>
              <Text variant="body" color="info">
                Test truncation with longer text to see how it handles overflow
              </Text>
            </li>
            <li class="flex items-start gap-2">
              <Text color="info" class="mt-0.5">🎨</Text>
              <Text variant="body" color="info">
                Experiment with color variants to match your design system
              </Text>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
});