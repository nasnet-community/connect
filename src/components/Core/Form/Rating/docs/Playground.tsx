import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { Rating } from "../Rating";

interface PlaygroundConfig {
  value: number;
  max: number;
  precision: 0.5 | 1;
  size: "sm" | "md" | "lg";
  readOnly: boolean;
  disabled: boolean;
  allowClear: boolean;
  showValue: boolean;
  required: boolean;
  useCustomIcons: boolean;
  useLabels: boolean;
  showLabel: boolean;
  showHelperText: boolean;
  showError: boolean;
  showSuccess: boolean;
  showWarning: boolean;
  theme: "yellow" | "blue" | "green" | "red" | "purple";
}

export const RatingPlayground = component$(() => {
  const config = useStore<PlaygroundConfig>({
    value: 3,
    max: 5,
    precision: 1,
    size: "md",
    readOnly: false,
    disabled: false,
    allowClear: false,
    showValue: false,
    required: false,
    useCustomIcons: false,
    useLabels: false,
    showLabel: true,
    showHelperText: false,
    showError: false,
    showSuccess: false,
    showWarning: false,
    theme: "yellow",
  });

  const hoverValue = useSignal<number | null>(null);
  const isGeneratingCode = useSignal(false);
  const showCode = useSignal(false);
  const generatedCode = useSignal("");

  // Custom icons
  const HeartIcon = component$<{ filled: boolean }>(({ filled }) => (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      stroke-width="2"
      class="h-full w-full"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ));

  const _ThumbIcon = component$<{ filled: boolean }>(({ filled }) => (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      stroke-width="2"
      class="h-full w-full"
    >
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  ));

  const generateCode$ = $(() => {
    isGeneratingCode.value = true;
    updateGeneratedCode();
    
    setTimeout(() => {
      isGeneratingCode.value = false;
      showCode.value = !showCode.value;
    }, 300);
  });

  const updateGeneratedCode = $(() => {
    const props: string[] = [];
    
    if (config.value !== 0) props.push(`value={${config.value}}`);
    if (config.max !== 5) props.push(`max={${config.max}}`);
    if (config.precision !== 1) props.push(`precision={${config.precision}}`);
    if (config.size !== "md") props.push(`size="${config.size}"`);
    if (config.readOnly) props.push("readOnly");
    if (config.disabled) props.push("disabled");
    if (config.allowClear) props.push("allowClear");
    if (config.showValue) props.push("showValue");
    if (config.required) props.push("required");
    
    if (config.useCustomIcons) {
      props.push("icon={<HeartIcon filled={true} />}");
      props.push("emptyIcon={<HeartIcon filled={false} />}");
    }
    
    if (config.useLabels) {
      props.push('labels={["Poor", "Fair", "Good", "Very Good", "Excellent"]}');
    }
    
    if (config.showLabel) props.push('label="Rating Label"');
    if (config.showHelperText) props.push('helperText="Helper text for the rating"');
    if (config.showError) props.push('error="This field is required"');
    if (config.showSuccess) props.push('successMessage="Thank you for rating!"');
    if (config.showWarning) props.push('warningMessage="Consider rating higher"');
    
    if (config.theme !== "yellow") {
      const themeClasses = {
        blue: "text-blue-500",
        green: "text-green-500",
        red: "text-red-500",
        purple: "text-purple-500",
      };
      props.push(`class="${themeClasses[config.theme]}"`);
    }

    props.push("onValueChange$={(value) => console.log('Rating:', value)}");

    const propsString = props.length > 3 
      ? props.map(prop => `  ${prop}`).join("\n")
      : props.join(" ");

    generatedCode.value = `<Rating
${props.length > 3 ? propsString + "\n" : "  " + propsString}
/>`;
  });

  const themeClasses = {
    yellow: "text-yellow-500",
    blue: "text-blue-500", 
    green: "text-green-500",
    red: "text-red-500",
    purple: "text-purple-500",
  };

  const labels = config.useLabels ? ["Poor", "Fair", "Good", "Very Good", "Excellent"] : undefined;

  return (
    <div class="space-y-8 p-6">
      <div class="mb-8">
        <h1 class="mb-2 text-3xl font-bold">Rating Component Playground</h1>
        <p class="text-gray-600 dark:text-gray-400">
          Experiment with different Rating component configurations and see live previews.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Configuration Panel */}
        <div class="space-y-6">
          <h2 class="text-xl font-semibold">Configuration</h2>
          
          <div class="space-y-4 rounded-lg border p-6">
            {/* Basic Properties */}
            <div class="space-y-4">
              <h3 class="font-medium text-gray-900 dark:text-gray-100">Basic Properties</h3>
              
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="mb-1 block text-sm font-medium">Value</label>
                  <input
                    type="number"
                    min="0"
                    max={config.max}
                    step={config.precision}
                    value={config.value}
                    onInput$={(e) => {
                      config.value = parseFloat((e.target as HTMLInputElement).value) || 0;
                    }}
                    class="w-full rounded border px-3 py-1.5 text-sm"
                  />
                </div>
                
                <div>
                  <label class="mb-1 block text-sm font-medium">Max Rating</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={config.max}
                    onInput$={(e) => {
                      const newMax = parseInt((e.target as HTMLInputElement).value) || 5;
                      config.max = newMax;
                      if (config.value > newMax) config.value = newMax;
                    }}
                    class="w-full rounded border px-3 py-1.5 text-sm"
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="mb-1 block text-sm font-medium">Precision</label>
                  <select
                    value={config.precision}
                    onChange$={(e) => {
                      config.precision = parseFloat((e.target as HTMLSelectElement).value) as 0.5 | 1;
                    }}
                    class="w-full rounded border px-3 py-1.5 text-sm"
                  >
                    <option value="1">Full Stars</option>
                    <option value="0.5">Half Stars</option>
                  </select>
                </div>
                
                <div>
                  <label class="mb-1 block text-sm font-medium">Size</label>
                  <select
                    value={config.size}
                    onChange$={(e) => {
                      config.size = (e.target as HTMLSelectElement).value as "sm" | "md" | "lg";
                    }}
                    class="w-full rounded border px-3 py-1.5 text-sm"
                  >
                    <option value="sm">Small</option>
                    <option value="md">Medium</option>
                    <option value="lg">Large</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="mb-1 block text-sm font-medium">Theme</label>
                <select
                  value={config.theme}
                  onChange$={(e) => {
                    config.theme = (e.target as HTMLSelectElement).value as PlaygroundConfig["theme"];
                  }}
                  class="w-full rounded border px-3 py-1.5 text-sm"
                >
                  <option value="yellow">Yellow (Default)</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="red">Red</option>
                  <option value="purple">Purple</option>
                </select>
              </div>
            </div>

            {/* Behavior Options */}
            <div class="space-y-3">
              <h3 class="font-medium text-gray-900 dark:text-gray-100">Behavior</h3>
              
              <div class="grid grid-cols-2 gap-2">
                <label class="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={config.readOnly}
                    onChange$={(e) => {
                      config.readOnly = (e.target as HTMLInputElement).checked;
                      if (config.readOnly) config.disabled = false;
                    }}
                  />
                  Read Only
                </label>
                
                <label class="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={config.disabled}
                    onChange$={(e) => {
                      config.disabled = (e.target as HTMLInputElement).checked;
                      if (config.disabled) config.readOnly = false;
                    }}
                  />
                  Disabled
                </label>
                
                <label class="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={config.allowClear}
                    onChange$={(e) => {
                      config.allowClear = (e.target as HTMLInputElement).checked;
                    }}
                  />
                  Allow Clear
                </label>
                
                <label class="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={config.showValue}
                    onChange$={(e) => {
                      config.showValue = (e.target as HTMLInputElement).checked;
                    }}
                  />
                  Show Value
                </label>
                
                <label class="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={config.required}
                    onChange$={(e) => {
                      config.required = (e.target as HTMLInputElement).checked;
                    }}
                  />
                  Required
                </label>
                
                <label class="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={config.useCustomIcons}
                    onChange$={(e) => {
                      config.useCustomIcons = (e.target as HTMLInputElement).checked;
                    }}
                  />
                  Custom Icons
                </label>
                
                <label class="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={config.useLabels}
                    onChange$={(e) => {
                      config.useLabels = (e.target as HTMLInputElement).checked;
                    }}
                  />
                  Custom Labels
                </label>
              </div>
            </div>

            {/* Display Options */}
            <div class="space-y-3">
              <h3 class="font-medium text-gray-900 dark:text-gray-100">Display Elements</h3>
              
              <div class="grid grid-cols-2 gap-2">
                <label class="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={config.showLabel}
                    onChange$={(e) => {
                      config.showLabel = (e.target as HTMLInputElement).checked;
                    }}
                  />
                  Show Label
                </label>
                
                <label class="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={config.showHelperText}
                    onChange$={(e) => {
                      config.showHelperText = (e.target as HTMLInputElement).checked;
                    }}
                  />
                  Helper Text
                </label>
              </div>

              <div class="space-y-2">
                <span class="text-sm font-medium">Messages (only one active at a time):</span>
                <div class="grid grid-cols-3 gap-2">
                  <label class="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="message"
                      checked={config.showError}
                      onChange$={() => {
                        config.showError = true;
                        config.showSuccess = false;
                        config.showWarning = false;
                      }}
                    />
                    Error
                  </label>
                  
                  <label class="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="message"
                      checked={config.showSuccess}
                      onChange$={() => {
                        config.showError = false;
                        config.showSuccess = true;
                        config.showWarning = false;
                      }}
                    />
                    Success
                  </label>
                  
                  <label class="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="message"
                      checked={config.showWarning}
                      onChange$={() => {
                        config.showError = false;
                        config.showSuccess = false;
                        config.showWarning = true;
                      }}
                    />
                    Warning
                  </label>
                  
                  <label class="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="message"
                      checked={!config.showError && !config.showSuccess && !config.showWarning}
                      onChange$={() => {
                        config.showError = false;
                        config.showSuccess = false;
                        config.showWarning = false;
                      }}
                    />
                    None
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold">Live Preview</h2>
            <button
              onClick$={generateCode$}
              disabled={isGeneratingCode.value}
              class="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
            >
              {isGeneratingCode.value ? (
                <>
                  <div class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Generating...
                </>
              ) : (
                <>
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  {showCode.value ? "Hide Code" : "Show Code"}
                </>
              )}
            </button>
          </div>

          <div class="rounded-lg border p-6 bg-white dark:bg-gray-800">
            <div class="space-y-4">
              {/* Live Component */}
              <div class="rounded-lg border-2 border-dashed border-gray-200 p-8 dark:border-gray-700">
                <Rating
                  value={config.value}
                  max={config.max}
                  precision={config.precision}
                  size={config.size}
                  readOnly={config.readOnly}
                  disabled={config.disabled}
                  allowClear={config.allowClear}
                  showValue={config.showValue}
                  required={config.required}
                  icon={config.useCustomIcons ? <HeartIcon filled={true} /> : undefined}
                  emptyIcon={config.useCustomIcons ? <HeartIcon filled={false} /> : undefined}
                  labels={labels}
                  label={config.showLabel ? "Rating Label" : undefined}
                  helperText={config.showHelperText ? "Helper text for the rating" : undefined}
                  error={config.showError ? "This field is required" : undefined}
                  successMessage={config.showSuccess ? "Thank you for rating!" : undefined}
                  warningMessage={config.showWarning ? "Consider rating higher" : undefined}
                  class={themeClasses[config.theme]}
                  onValueChange$={(value) => {
                    config.value = value || 0;
                  }}
                  onHoverChange$={(value) => {
                    hoverValue.value = value;
                  }}
                />
              </div>

              {/* Current State Display */}
              <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
                <h3 class="mb-2 font-medium">Current State</h3>
                <div class="space-y-1 text-sm">
                  <div class="flex justify-between">
                    <span>Value:</span>
                    <span class="font-mono">{config.value}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Hover Value:</span>
                    <span class="font-mono">{hoverValue.value ?? "null"}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Configuration:</span>
                    <span class="font-mono">
                      {config.max} stars, {config.precision === 0.5 ? "half" : "full"} precision
                    </span>
                  </div>
                </div>
              </div>

              {/* Code Example */}
              {showCode.value && (
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <h3 class="font-medium">Generated Code</h3>
                    <button
                      onClick$={$(() => {
                        navigator.clipboard.writeText(generatedCode.value);
                      })}
                      class="text-sm text-blue-500 hover:text-blue-600"
                    >
                      Copy to Clipboard
                    </button>
                  </div>
                  <pre class="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100">
                    <code>{generatedCode.value}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Accessibility Info */}
          <div class="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <h3 class="mb-2 font-medium text-blue-900 dark:text-blue-200">
              Accessibility Features
            </h3>
            <ul class="space-y-1 text-sm text-blue-800 dark:text-blue-300">
              <li>• Full keyboard navigation with arrow keys</li>
              <li>• ARIA slider role and proper labels</li>
              <li>• Screen reader friendly value announcements</li>
              <li>• Focus management and visual indicators</li>
              <li>• Support for custom labels and descriptions</li>
            </ul>
          </div>

          {/* Usage Tips */}
          <div class="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 class="mb-2 font-medium text-green-900 dark:text-green-200">
              Usage Tips
            </h3>
            <ul class="space-y-1 text-sm text-green-800 dark:text-green-300">
              <li>• Use half-star precision for more granular ratings</li>
              <li>• Enable allowClear for optional ratings</li>
              <li>• Provide custom labels for better accessibility</li>
              <li>• Use different sizes based on context</li>
              <li>• Consider success/warning messages for feedback</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});

export default RatingPlayground;