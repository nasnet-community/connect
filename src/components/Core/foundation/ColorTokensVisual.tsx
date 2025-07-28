import { component$ } from "@builder.io/qwik";

interface ColorSampleProps {
  name: string;
  value: string;
  foreground?: string;
  textColor?: string;
}

export const ColorSample = component$<ColorSampleProps>(
  ({ name, value, foreground, textColor }) => {
    return (
      <div class="flex flex-col">
        <div
          class="flex h-20 w-full items-end rounded-lg p-2"
          style={{ backgroundColor: value }}
        >
          {foreground && (
            <div
              class="rounded-md px-3 py-1 text-sm font-medium"
              style={{
                backgroundColor: foreground,
                color: textColor || "inherit",
              }}
            >
              Text
            </div>
          )}
        </div>
        <div class="mt-2">
          <div class="text-sm font-medium">{name}</div>
          <div class="text-xs text-neutral-500">{value}</div>
        </div>
      </div>
    );
  },
);

export const ColorTokensVisual = component$(() => {
  return (
    <div class="space-y-8">
      <section>
        <h2 class="mb-4 text-2xl font-semibold">Primary Colors</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <ColorSample name="primary-50" value="#FEF9E7" />
          <ColorSample name="primary-100" value="#FDF3CF" />
          <ColorSample name="primary-200" value="#FCE7A0" />
          <ColorSample name="primary-300" value="#FADB71" />
          <ColorSample name="primary-400" value="#F7CF42" />
          <ColorSample
            name="primary-500"
            value="#EFC729"
            foreground="#FFFFFF"
          />
          <ColorSample
            name="primary-600"
            value="#D1AC13"
            foreground="#FFFFFF"
          />
          <ColorSample
            name="primary-700"
            value="#A6890F"
            foreground="#FFFFFF"
          />
          <ColorSample
            name="primary-800"
            value="#7A660B"
            foreground="#FFFFFF"
          />
          <ColorSample
            name="primary-900"
            value="#4E4207"
            foreground="#FFFFFF"
          />
        </div>
      </section>

      <section>
        <h2 class="mb-4 text-2xl font-semibold">Secondary Colors</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <ColorSample name="secondary-50" value="#EEF4FA" />
          <ColorSample name="secondary-100" value="#DCE8F5" />
          <ColorSample name="secondary-200" value="#B9D1EB" />
          <ColorSample name="secondary-300" value="#96BAE1" />
          <ColorSample name="secondary-400" value="#73A3D7" />
          <ColorSample
            name="secondary-500"
            value="#4972BA"
            foreground="#FFFFFF"
          />
          <ColorSample
            name="secondary-600"
            value="#3B5B95"
            foreground="#FFFFFF"
          />
          <ColorSample
            name="secondary-700"
            value="#2D4470"
            foreground="#FFFFFF"
          />
          <ColorSample
            name="secondary-800"
            value="#1F2D4B"
            foreground="#FFFFFF"
          />
          <ColorSample
            name="secondary-900"
            value="#111726"
            foreground="#FFFFFF"
          />
        </div>
      </section>

      <section>
        <h2 class="mb-4 text-2xl font-semibold">Neutral Colors</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <ColorSample name="neutral-50" value="#F8FAFC" />
          <ColorSample name="neutral-100" value="#F1F5F9" />
          <ColorSample name="neutral-200" value="#E2E8F0" />
          <ColorSample name="neutral-300" value="#CBD5E1" />
          <ColorSample name="neutral-400" value="#94A3B8" />
          <ColorSample
            name="neutral-500"
            value="#64748B"
            foreground="#FFFFFF"
          />
          <ColorSample
            name="neutral-600"
            value="#475569"
            foreground="#FFFFFF"
          />
          <ColorSample
            name="neutral-700"
            value="#334155"
            foreground="#FFFFFF"
          />
          <ColorSample
            name="neutral-800"
            value="#1E293B"
            foreground="#FFFFFF"
          />
          <ColorSample
            name="neutral-900"
            value="#0F172A"
            foreground="#FFFFFF"
          />
        </div>
      </section>

      <section>
        <h2 class="mb-4 text-2xl font-semibold">Surface Colors</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <ColorSample name="surface" value="#FFFFFF" />
          <ColorSample name="surface-secondary" value="#F8FAFC" />
          <ColorSample name="surface-tertiary" value="#F1F5F9" />
          <ColorSample name="surface-disabled" value="#E2E8F0" />
          <ColorSample
            name="surface-dark"
            value="#1E293B"
            foreground="#F8FAFC"
          />
          <ColorSample
            name="surface-dark-secondary"
            value="#0F172A"
            foreground="#F8FAFC"
          />
          <ColorSample
            name="surface-dark-tertiary"
            value="#334155"
            foreground="#F8FAFC"
          />
          <ColorSample
            name="surface-dark-disabled"
            value="#334155"
            foreground="#94A3B8"
          />
        </div>
      </section>

      <section>
        <h2 class="mb-4 text-2xl font-semibold">Background Colors</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ColorSample name="background" value="#F1F5F9" />
          <ColorSample
            name="background-dark"
            value="#0F172A"
            foreground="#F8FAFC"
          />
        </div>
      </section>

      <section>
        <h2 class="mb-4 text-2xl font-semibold">Border Colors</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <ColorSample name="border" value="#E2E8F0" />
          <ColorSample name="border-secondary" value="#CBD5E1" />
          <ColorSample name="border-subtle" value="#F1F5F9" />
          <ColorSample
            name="border-dark"
            value="#334155"
            foreground="#F8FAFC"
          />
          <ColorSample
            name="border-dark-secondary"
            value="#475569"
            foreground="#F8FAFC"
          />
          <ColorSample
            name="border-dark-subtle"
            value="#1E293B"
            foreground="#F8FAFC"
          />
        </div>
      </section>

      <section>
        <h2 class="mb-4 text-2xl font-semibold">Text Colors</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <ColorSample
            name="text"
            value="#0F172A"
            foreground="#FFFFFF"
            textColor="#0F172A"
          />
          <ColorSample
            name="text-secondary"
            value="#475569"
            foreground="#FFFFFF"
            textColor="#475569"
          />
          <ColorSample
            name="text-muted"
            value="#64748B"
            foreground="#FFFFFF"
            textColor="#64748B"
          />
          <ColorSample
            name="text-disabled"
            value="#94A3B8"
            foreground="#FFFFFF"
            textColor="#94A3B8"
          />
          <ColorSample
            name="text-dark-default"
            value="#F8FAFC"
            foreground="#0F172A"
            textColor="#F8FAFC"
          />
          <ColorSample
            name="text-dark-secondary"
            value="#CBD5E1"
            foreground="#0F172A"
            textColor="#CBD5E1"
          />
          <ColorSample
            name="text-dark-muted"
            value="#94A3B8"
            foreground="#0F172A"
            textColor="#94A3B8"
          />
          <ColorSample
            name="text-dark-disabled"
            value="#475569"
            foreground="#0F172A"
            textColor="#475569"
          />
        </div>
      </section>

      <section>
        <h2 class="mb-4 text-2xl font-semibold">Semantic Colors: Success</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <ColorSample name="success-50" value="#F0FDF4" />
          <ColorSample name="success-100" value="#DCFCE7" />
          <ColorSample name="success-200" value="#BBF7D0" />
          <ColorSample name="success-300" value="#86EFAC" />
          <ColorSample name="success-400" value="#4ADE80" />
          <ColorSample
            name="success-500"
            value="#22C55E"
            foreground="#FFFFFF"
          />
          <ColorSample
            name="success-600"
            value="#16A34A"
            foreground="#FFFFFF"
          />
          <ColorSample
            name="success-700"
            value="#15803D"
            foreground="#FFFFFF"
          />
          <ColorSample
            name="success-800"
            value="#166534"
            foreground="#FFFFFF"
          />
          <ColorSample
            name="success-900"
            value="#14532D"
            foreground="#FFFFFF"
          />
          <ColorSample
            name="success-surface"
            value="#F0FDF4"
            foreground="#16A34A"
            textColor="#16A34A"
          />
        </div>
      </section>

      <section>
        <h2 class="mb-4 text-2xl font-semibold">Semantic Colors: Warning</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <ColorSample name="warning-50" value="#FEFCE8" />
          <ColorSample name="warning-100" value="#FEF9C3" />
          <ColorSample name="warning-200" value="#FEF08A" />
          <ColorSample name="warning-300" value="#FDE047" />
          <ColorSample name="warning-400" value="#FACC15" />
          <ColorSample
            name="warning-500"
            value="#EAB308"
            foreground="#713F12"
            textColor="#713F12"
          />
          <ColorSample
            name="warning-600"
            value="#CA8A04"
            foreground="#FFFFFF"
          />
          <ColorSample
            name="warning-700"
            value="#A16207"
            foreground="#FFFFFF"
          />
          <ColorSample
            name="warning-800"
            value="#854D0E"
            foreground="#FFFFFF"
          />
          <ColorSample
            name="warning-900"
            value="#713F12"
            foreground="#FFFFFF"
          />
          <ColorSample
            name="warning-surface"
            value="#FEFCE8"
            foreground="#CA8A04"
            textColor="#CA8A04"
          />
        </div>
      </section>

      <section>
        <h2 class="mb-4 text-2xl font-semibold">Semantic Colors: Error</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <ColorSample name="error-50" value="#FEF2F2" />
          <ColorSample name="error-100" value="#FEE2E2" />
          <ColorSample name="error-200" value="#FECACA" />
          <ColorSample name="error-300" value="#FCA5A5" />
          <ColorSample name="error-400" value="#F87171" />
          <ColorSample name="error-500" value="#EF4444" foreground="#FFFFFF" />
          <ColorSample name="error-600" value="#DC2626" foreground="#FFFFFF" />
          <ColorSample name="error-700" value="#B91C1C" foreground="#FFFFFF" />
          <ColorSample name="error-800" value="#991B1B" foreground="#FFFFFF" />
          <ColorSample name="error-900" value="#7F1D1D" foreground="#FFFFFF" />
          <ColorSample
            name="error-surface"
            value="#FEF2F2"
            foreground="#DC2626"
            textColor="#DC2626"
          />
        </div>
      </section>

      <section>
        <h2 class="mb-4 text-2xl font-semibold">Semantic Colors: Info</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <ColorSample name="info-50" value="#F0F9FF" />
          <ColorSample name="info-100" value="#E0F2FE" />
          <ColorSample name="info-200" value="#BAE6FD" />
          <ColorSample name="info-300" value="#7DD3FC" />
          <ColorSample name="info-400" value="#38BDF8" />
          <ColorSample name="info-500" value="#0EA5E9" foreground="#FFFFFF" />
          <ColorSample name="info-600" value="#0284C7" foreground="#FFFFFF" />
          <ColorSample name="info-700" value="#0369A1" foreground="#FFFFFF" />
          <ColorSample name="info-800" value="#075985" foreground="#FFFFFF" />
          <ColorSample name="info-900" value="#0C4A6E" foreground="#FFFFFF" />
          <ColorSample
            name="info-surface"
            value="#F0F9FF"
            foreground="#0EA5E9"
            textColor="#0EA5E9"
          />
        </div>
      </section>

      <div class="mt-8 rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
        <h3 class="mb-4 text-xl font-medium">How to Use This Component</h3>
        <p class="mb-3">
          This component provides a visual reference for all color tokens in the
          design system. It can be imported and used in documentation or
          Storybook.
        </p>
        <pre class="overflow-x-auto rounded-md bg-neutral-50 p-3 text-sm dark:bg-neutral-800">
          {`import { ColorTokensVisual } from 'path/to/ColorTokensVisual';

// In your component or documentation
<ColorTokensVisual />`}
        </pre>
      </div>
    </div>
  );
});

export default ColorTokensVisual;
