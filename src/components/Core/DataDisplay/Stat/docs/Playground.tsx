import { component$, useSignal } from "@builder.io/qwik";
import {
  Stat,
  StatNumber,
  StatLabel,
  StatIcon,
  StatTrend,
  type StatProps,
  type StatNumberProps,
  type StatTrendProps,
} from "../index";

export default component$(() => {
  // Stat props
  const variant = useSignal<StatProps["variant"]>("default");
  const size = useSignal<StatProps["size"]>("md");
  const align = useSignal<StatProps["align"]>("left");
  const loading = useSignal(false);
  const animate = useSignal(true);

  // StatNumber props
  const value = useSignal(42350);
  const format = useSignal<StatNumberProps["format"]>("number");
  const decimals = useSignal(0);
  const prefix = useSignal("");
  const suffix = useSignal("");
  const currency = useSignal("USD");

  // StatIcon props
  const showIcon = useSignal(true);
  const iconPosition = useSignal<"left" | "right" | "top">("left");
  const iconEmoji = useSignal("📊");

  // StatTrend props
  const showTrend = useSignal(true);
  const trendValue = useSignal(12.5);
  const trendFormat = useSignal<StatTrendProps["format"]>("percent");
  const trendLabel = useSignal("vs last period");

  return (
    <div class="space-y-8">
      <section>
        <h2 class="mb-4 text-2xl font-bold">Interactive Playground</h2>
        <p class="mb-6 text-gray-700 dark:text-gray-300">
          Experiment with different prop combinations to see how the Stat
          component behaves.
        </p>
      </section>

      {/* Preview */}
      <section class="rounded-lg border p-8 dark:border-gray-700">
        <div class="mb-4 text-center">
          <h3 class="mb-4 text-lg font-semibold">Preview</h3>
        </div>

        <div class="flex justify-center">
          <Stat
            variant={variant.value}
            size={size.value}
            align={align.value}
            loading={loading.value}
            animate={animate.value}
          >
            {showIcon.value && (
              <StatIcon position={iconPosition.value}>
                {iconEmoji.value}
              </StatIcon>
            )}
            <StatNumber
              value={value.value}
              format={format.value}
              decimals={decimals.value}
              prefix={prefix.value}
              suffix={suffix.value}
              currency={currency.value}
              animate={animate.value}
            />
            <StatLabel>Sample Metric</StatLabel>
            {showTrend.value && (
              <StatTrend
                value={trendValue.value}
                format={trendFormat.value}
                label={trendLabel.value}
              />
            )}
          </Stat>
        </div>
      </section>

      {/* Controls */}
      <section class="space-y-6 rounded-lg border p-6 dark:border-gray-700">
        <h3 class="text-lg font-semibold">Controls</h3>

        {/* Stat Component Props */}
        <div>
          <h4 class="mb-3 font-semibold">Stat Component</h4>
          <div class="grid gap-4 md:grid-cols-3">
            <div>
              <label class="mb-1 block text-sm font-medium">Variant</label>
              <select
                class="w-full rounded border px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
                value={variant.value}
                onChange$={(e) =>
                  (variant.value = (e.target as HTMLSelectElement).value as StatProps["variant"])
                }
              >
                <option value="default">Default</option>
                <option value="bordered">Bordered</option>
                <option value="elevated">Elevated</option>
              </select>
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium">Size</label>
              <select
                class="w-full rounded border px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
                value={size.value}
                onChange$={(e) =>
                  (size.value = (e.target as HTMLSelectElement).value as StatProps["size"])
                }
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium">Alignment</label>
              <select
                class="w-full rounded border px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
                value={align.value}
                onChange$={(e) =>
                  (align.value = (e.target as HTMLSelectElement).value as StatProps["align"])
                }
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          </div>

          <div class="mt-4 flex gap-4">
            <label class="flex items-center">
              <input
                type="checkbox"
                class="mr-2"
                checked={loading.value}
                onChange$={(e) => (loading.value = (e.target as HTMLInputElement).checked)}
              />
              <span class="text-sm">Loading</span>
            </label>

            <label class="flex items-center">
              <input
                type="checkbox"
                class="mr-2"
                checked={animate.value}
                onChange$={(e) => (animate.value = (e.target as HTMLInputElement).checked)}
              />
              <span class="text-sm">Animate</span>
            </label>
          </div>
        </div>

        {/* StatNumber Props */}
        <div>
          <h4 class="mb-3 font-semibold">StatNumber Component</h4>
          <div class="grid gap-4 md:grid-cols-3">
            <div>
              <label class="mb-1 block text-sm font-medium">Value</label>
              <input
                type="number"
                class="w-full rounded border px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
                value={value.value}
                onInput$={(e) => (value.value = Number((e.target as HTMLInputElement).value))}
              />
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium">Format</label>
              <select
                class="w-full rounded border px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
                value={format.value}
                onChange$={(e) =>
                  (format.value = (e.target as HTMLSelectElement).value as StatNumberProps["format"])
                }
              >
                <option value="number">Number</option>
                <option value="currency">Currency</option>
                <option value="percent">Percent</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium">Decimals</label>
              <input
                type="number"
                min="0"
                max="10"
                class="w-full rounded border px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
                value={decimals.value}
                onInput$={(e) => (decimals.value = Number((e.target as HTMLInputElement).value))}
              />
            </div>
          </div>

          <div class="mt-4 grid gap-4 md:grid-cols-3">
            <div>
              <label class="mb-1 block text-sm font-medium">Prefix</label>
              <input
                type="text"
                class="w-full rounded border px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
                value={prefix.value}
                onInput$={(e) => (prefix.value = (e.target as HTMLInputElement).value)}
                placeholder="e.g., +"
              />
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium">Suffix</label>
              <input
                type="text"
                class="w-full rounded border px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
                value={suffix.value}
                onInput$={(e) => (suffix.value = (e.target as HTMLInputElement).value)}
                placeholder="e.g., %"
              />
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium">Currency</label>
              <select
                class="w-full rounded border px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
                value={currency.value}
                onChange$={(e) => (currency.value = (e.target as HTMLSelectElement).value)}
                disabled={format.value !== "currency"}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
              </select>
            </div>
          </div>
        </div>

        {/* StatIcon Props */}
        <div>
          <h4 class="mb-3 font-semibold">StatIcon Component</h4>
          <div class="flex items-center gap-4">
            <label class="flex items-center">
              <input
                type="checkbox"
                class="mr-2"
                checked={showIcon.value}
                onChange$={(e) => (showIcon.value = (e.target as HTMLInputElement).checked)}
              />
              <span class="text-sm">Show Icon</span>
            </label>

            {showIcon.value && (
              <>
                <div>
                  <label class="mb-1 block text-sm font-medium">Position</label>
                  <select
                    class="rounded border px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
                    value={iconPosition.value}
                    onChange$={(e) =>
                      (iconPosition.value = (e.target as HTMLSelectElement).value as
                        | "left"
                        | "right"
                        | "top")
                    }
                  >
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="top">Top</option>
                  </select>
                </div>

                <div>
                  <label class="mb-1 block text-sm font-medium">Icon</label>
                  <select
                    class="rounded border px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
                    value={iconEmoji.value}
                    onChange$={(e) => (iconEmoji.value = (e.target as HTMLSelectElement).value)}
                  >
                    <option value="📊">📊 Chart</option>
                    <option value="💰">💰 Money</option>
                    <option value="👥">👥 Users</option>
                    <option value="🎯">🎯 Target</option>
                    <option value="📈">📈 Growth</option>
                    <option value="⚡">⚡ Energy</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </div>

        {/* StatTrend Props */}
        <div>
          <h4 class="mb-3 font-semibold">StatTrend Component</h4>
          <div class="flex items-center gap-4">
            <label class="flex items-center">
              <input
                type="checkbox"
                class="mr-2"
                checked={showTrend.value}
                onChange$={(e) => (showTrend.value = (e.target as HTMLInputElement).checked)}
              />
              <span class="text-sm">Show Trend</span>
            </label>

            {showTrend.value && (
              <>
                <div>
                  <label class="mb-1 block text-sm font-medium">Value</label>
                  <input
                    type="number"
                    step="0.1"
                    class="w-32 rounded border px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
                    value={trendValue.value}
                    onInput$={(e) =>
                      (trendValue.value = Number((e.target as HTMLInputElement).value))
                    }
                  />
                </div>

                <div>
                  <label class="mb-1 block text-sm font-medium">Format</label>
                  <select
                    class="rounded border px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
                    value={trendFormat.value}
                    onChange$={(e) =>
                      (trendFormat.value = (e.target as HTMLSelectElement)
                        .value as StatTrendProps["format"])
                    }
                  >
                    <option value="percent">Percent</option>
                    <option value="number">Number</option>
                  </select>
                </div>

                <div>
                  <label class="mb-1 block text-sm font-medium">Label</label>
                  <input
                    type="text"
                    class="rounded border px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
                    value={trendLabel.value}
                    onInput$={(e) => (trendLabel.value = (e.target as HTMLInputElement).value)}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Generated Code */}
      <section>
        <h3 class="mb-3 text-lg font-semibold">Generated Code</h3>
        <pre class="overflow-x-auto rounded bg-gray-100 p-4 text-sm dark:bg-gray-800">
          {`<Stat 
  variant="${variant.value}"
  size="${size.value}"
  align="${align.value}"${loading.value ? "\n  loading" : ""}${animate.value ? "\n  animate" : ""}
>${showIcon.value ? `\n  <StatIcon position="${iconPosition.value}">${iconEmoji.value}</StatIcon>` : ""}
  <StatNumber 
    value={${value.value}}
    format="${format.value}"${decimals.value > 0 ? `\n    decimals={${decimals.value}}` : ""}${prefix.value ? `\n    prefix="${prefix.value}"` : ""}${suffix.value ? `\n    suffix="${suffix.value}"` : ""}${format.value === "currency" ? `\n    currency="${currency.value}"` : ""}${animate.value ? "\n    animate" : ""}
  />
  <StatLabel>Sample Metric</StatLabel>${showTrend.value ? `\n  <StatTrend \n    value={${trendValue.value}}\n    format="${trendFormat.value}"\n    label="${trendLabel.value}"\n  />` : ""}
</Stat>`}
        </pre>
      </section>
    </div>
  );
});
