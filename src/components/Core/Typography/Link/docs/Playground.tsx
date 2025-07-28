import { component$, useSignal, useComputed$ } from "@builder.io/qwik";
import { Link } from "../Link";
import type { LinkVariant, LinkSize, LinkWeight, LinkColor, LinkUnderline } from "../Link.types";

/**
 * Playground documentation for the Link component
 * 
 * Live editor for testing component variations and configurations
 */
export const Playground = component$(() => {
  // Control signals
  const href = useSignal("/example");
  const text = useSignal("Example Link");
  const variant = useSignal<LinkVariant>("standard");
  const size = useSignal<LinkSize>("base");
  const weight = useSignal<LinkWeight>("medium");
  const color = useSignal<LinkColor>("primary");
  const underline = useSignal<LinkUnderline>("hover");
  const external = useSignal(false);
  const newTab = useSignal(false);
  const disabled = useSignal(false);
  const active = useSignal(false);
  const truncate = useSignal(false);
  const secure = useSignal(true);
  const prefixIcon = useSignal("");
  const suffixIcon = useSignal("");
  const ariaLabel = useSignal("");
  const customClass = useSignal("");

  // Generate code preview
  const generateCode = useComputed$(() => {
    const props = [];
    
    if (href.value !== "/example") props.push(`href="${href.value}"`);
    if (variant.value !== "standard") props.push(`variant="${variant.value}"`);
    if (size.value !== "base") props.push(`size="${size.value}"`);
    if (weight.value !== "medium") props.push(`weight="${weight.value}"`);
    if (color.value !== "primary") props.push(`color="${color.value}"`);
    if (underline.value !== "hover") props.push(`underline="${underline.value}"`);
    if (external.value) props.push("external");
    if (newTab.value) props.push("newTab");
    if (disabled.value) props.push("disabled");
    if (active.value) props.push("active");
    if (truncate.value) props.push("truncate");
    if (!secure.value) props.push("secure={false}");
    if (prefixIcon.value) props.push(`prefixIcon="${prefixIcon.value}"`);
    if (suffixIcon.value) props.push(`suffixIcon="${suffixIcon.value}"`);
    if (ariaLabel.value) props.push(`ariaLabel="${ariaLabel.value}"`);
    if (customClass.value) props.push(`class="${customClass.value}"`);
    
    const propsString = props.length > 0 ? ` ${props.join(" ")}` : "";
    return `<Link${propsString}>${text.value}</Link>`;
  });

  return (
    <div class="space-y-8 p-6">
      {/* Header */}
      <section class="space-y-4">
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
          Playground
        </h1>
        <p class="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Interactive playground to test different Link configurations and see live results.
        </p>
      </section>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <section class="space-y-6">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">
            Controls
          </h2>
          
          <div class="space-y-4">
            {/* Basic Props */}
            <div class="space-y-3">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">Basic Properties</h3>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Href
                </label>
                <input
                  type="text"
                  value={href.value}
                  onInput$={(e) => href.value = (e.target as HTMLInputElement).value}
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                  placeholder="/example"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Link Text
                </label>
                <input
                  type="text"
                  value={text.value}
                  onInput$={(e) => text.value = (e.target as HTMLInputElement).value}
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                  placeholder="Link text"
                />
              </div>
            </div>

            {/* Style Props */}
            <div class="space-y-3">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">Style Properties</h3>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Variant
                </label>
                <select
                  value={variant.value}
                  onChange$={(e) => variant.value = (e.target as HTMLSelectElement).value as LinkVariant}
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                >
                  <option value="standard">Standard</option>
                  <option value="button">Button</option>
                  <option value="nav">Navigation</option>
                  <option value="subtle">Subtle</option>
                  <option value="icon">Icon</option>
                  <option value="breadcrumb">Breadcrumb</option>
                </select>
              </div>
              
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Size
                  </label>
                  <select
                    value={size.value}
                    onChange$={(e) => size.value = (e.target as HTMLSelectElement).value as LinkSize}
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="xs">Extra Small</option>
                    <option value="sm">Small</option>
                    <option value="base">Base</option>
                    <option value="lg">Large</option>
                    <option value="xl">Extra Large</option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Weight
                  </label>
                  <select
                    value={weight.value}
                    onChange$={(e) => weight.value = (e.target as HTMLSelectElement).value as LinkWeight}
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="normal">Normal</option>
                    <option value="medium">Medium</option>
                    <option value="semibold">Semibold</option>
                    <option value="bold">Bold</option>
                  </select>
                </div>
              </div>
              
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Color
                  </label>
                  <select
                    value={color.value}
                    onChange$={(e) => color.value = (e.target as HTMLSelectElement).value as LinkColor}
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="tertiary">Tertiary</option>
                    <option value="inverse">Inverse</option>
                    <option value="accent">Accent</option>
                    <option value="inherit">Inherit</option>
                    <option value="success">Success</option>
                    <option value="error">Error</option>
                    <option value="warning">Warning</option>
                    <option value="info">Info</option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Underline
                  </label>
                  <select
                    value={underline.value}
                    onChange$={(e) => underline.value = (e.target as HTMLSelectElement).value as LinkUnderline}
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="none">None</option>
                    <option value="hover">Hover</option>
                    <option value="always">Always</option>
                    <option value="animate">Animate</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Icon Props */}
            <div class="space-y-3">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">Icons</h3>
              
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Prefix Icon
                  </label>
                  <input
                    type="text"
                    value={prefixIcon.value}
                    onInput$={(e) => prefixIcon.value = (e.target as HTMLInputElement).value}
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                    placeholder="⚙️"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Suffix Icon
                  </label>
                  <input
                    type="text"
                    value={suffixIcon.value}
                    onInput$={(e) => suffixIcon.value = (e.target as HTMLInputElement).value}
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                    placeholder="↗"
                  />
                </div>
              </div>
            </div>

            {/* Boolean Props */}
            <div class="space-y-3">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">Behavior</h3>
              
              <div class="grid grid-cols-2 gap-4">
                <label class="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={external.value}
                    onChange$={(e) => external.value = (e.target as HTMLInputElement).checked}
                    class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span class="text-sm text-gray-700 dark:text-gray-300">External</span>
                </label>
                
                <label class="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newTab.value}
                    onChange$={(e) => newTab.value = (e.target as HTMLInputElement).checked}
                    class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span class="text-sm text-gray-700 dark:text-gray-300">New Tab</span>
                </label>
                
                <label class="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={disabled.value}
                    onChange$={(e) => disabled.value = (e.target as HTMLInputElement).checked}
                    class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span class="text-sm text-gray-700 dark:text-gray-300">Disabled</span>
                </label>
                
                <label class="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={active.value}
                    onChange$={(e) => active.value = (e.target as HTMLInputElement).checked}
                    class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span class="text-sm text-gray-700 dark:text-gray-300">Active</span>
                </label>
                
                <label class="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={truncate.value}
                    onChange$={(e) => truncate.value = (e.target as HTMLInputElement).checked}
                    class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span class="text-sm text-gray-700 dark:text-gray-300">Truncate</span>
                </label>
                
                <label class="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={secure.value}
                    onChange$={(e) => secure.value = (e.target as HTMLInputElement).checked}
                    class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span class="text-sm text-gray-700 dark:text-gray-300">Secure</span>
                </label>
              </div>
            </div>

            {/* Accessibility Props */}
            <div class="space-y-3">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">Accessibility & Styling</h3>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  ARIA Label
                </label>
                <input
                  type="text"
                  value={ariaLabel.value}
                  onInput$={(e) => ariaLabel.value = (e.target as HTMLInputElement).value}
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                  placeholder="Descriptive label"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Custom Class
                </label>
                <input
                  type="text"
                  value={customClass.value}
                  onInput$={(e) => customClass.value = (e.target as HTMLInputElement).value}
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                  placeholder="Additional CSS classes"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Preview & Code */}
        <section class="space-y-6">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">
            Preview
          </h2>
          
          {/* Live Preview */}
          <div class="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
            <div class={`${truncate.value ? 'max-w-xs' : ''}`}>
              <Link
                href={href.value}
                variant={variant.value}
                size={size.value}
                weight={weight.value}
                color={color.value}
                underline={underline.value}
                external={external.value || undefined}
                newTab={newTab.value || undefined}
                disabled={disabled.value}
                active={active.value}
                truncate={truncate.value}
                secure={secure.value}
                prefixIcon={prefixIcon.value || undefined}
                suffixIcon={suffixIcon.value || undefined}
                ariaLabel={ariaLabel.value || undefined}
                class={customClass.value || undefined}
              >
                {text.value}
              </Link>
            </div>
          </div>
          
          {/* Generated Code */}
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Generated Code
            </h3>
            <div class="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <pre class="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
                <code>{generateCode.value}</code>
              </pre>
            </div>
            <button
              onClick$={() => {
                navigator.clipboard.writeText(generateCode.value);
              }}
              class="mt-2 px-3 py-1 text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
            >
              Copy Code
            </button>
          </div>
          
          {/* Quick Presets */}
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Quick Presets
            </h3>
            <div class="grid grid-cols-2 gap-2">
              <button
                onClick$={() => {
                  variant.value = "standard";
                  color.value = "primary";
                  size.value = "base";
                  weight.value = "medium";
                  underline.value = "hover";
                  external.value = false;
                  disabled.value = false;
                  active.value = false;
                  truncate.value = false;
                  prefixIcon.value = "";
                  suffixIcon.value = "";
                }}
                class="px-3 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Default
              </button>
              
              <button
                onClick$={() => {
                  variant.value = "button";
                  color.value = "primary";
                  size.value = "base";
                  weight.value = "medium";
                }}
                class="px-3 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Button
              </button>
              
              <button
                onClick$={() => {
                  variant.value = "nav";
                  color.value = "primary";
                  active.value = true;
                }}
                class="px-3 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Navigation
              </button>
              
              <button
                onClick$={() => {
                  variant.value = "icon";
                  prefixIcon.value = "⚙️";
                  color.value = "secondary";
                }}
                class="px-3 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Icon Link
              </button>
              
              <button
                onClick$={() => {
                  href.value = "https://example.com";
                  external.value = true;
                  suffixIcon.value = "↗";
                  text.value = "External Link";
                }}
                class="px-3 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                External
              </button>
              
              <button
                onClick$={() => {
                  variant.value = "breadcrumb";
                  color.value = "secondary";
                  size.value = "sm";
                }}
                class="px-3 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Breadcrumb
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
});