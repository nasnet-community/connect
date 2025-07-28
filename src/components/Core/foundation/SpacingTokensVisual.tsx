import { component$ } from "@builder.io/qwik";

interface SpacingSampleProps {
  name: string;
  value: string;
  pxValue: string;
}

export const SpacingSample = component$<SpacingSampleProps>(
  ({ name, value, pxValue }) => {
    return (
      <div class="mb-6 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
        <div class="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-4 py-2 dark:border-neutral-700 dark:bg-neutral-800">
          <span class="font-medium">{name}</span>
          <span class="text-sm text-neutral-500 dark:text-neutral-400">
            {value} ({pxValue})
          </span>
        </div>
        <div class="flex items-center p-4">
          <div class="flex h-16 w-16 items-center justify-center rounded-md bg-primary-500 font-medium text-white">
            Base
          </div>
          <div
            class="flex h-16 items-center justify-center rounded-md bg-secondary-500 font-medium text-white"
            style={{ marginLeft: value, width: value }}
          >
            {name}
          </div>
        </div>
      </div>
    );
  },
);

export const SpacingPreset = component$<{
  title: string;
  class: string;
  pxValue: string;
}>(({ title, class: className, pxValue }) => {
  return (
    <div class="mb-6">
      <div class="mb-2 text-lg font-medium">
        {title}{" "}
        <span class="text-sm font-normal text-neutral-500 dark:text-neutral-400">
          ({pxValue})
        </span>
      </div>
      <div
        class={`rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800 ${className}`}
      >
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              class="aspect-square flex items-center justify-center rounded-md bg-primary-200 font-medium dark:bg-primary-900"
            >
              Item
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export const SpacingUsageExample = component$<{
  title: string;
  description: string;
}>(({ title, description }) => {
  return (
    <div class="mb-8">
      <h3 class="mb-2 text-lg font-medium">{title}</h3>
      <p class="mb-4 text-neutral-600 dark:text-neutral-400">{description}</p>
    </div>
  );
});

export const SpacingTokensVisual = component$(() => {
  return (
    <div class="space-y-12">
      <section>
        <h2 class="mb-6 text-2xl font-semibold">Spacing Scale</h2>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <SpacingSample name="spacing-0" value="0px" pxValue="0px" />
          <SpacingSample name="spacing-px" value="1px" pxValue="1px" />
          <SpacingSample name="spacing-0.5" value="0.125rem" pxValue="2px" />
          <SpacingSample name="spacing-1" value="0.25rem" pxValue="4px" />
          <SpacingSample name="spacing-1.5" value="0.375rem" pxValue="6px" />
          <SpacingSample name="spacing-2" value="0.5rem" pxValue="8px" />
          <SpacingSample name="spacing-2.5" value="0.625rem" pxValue="10px" />
          <SpacingSample name="spacing-3" value="0.75rem" pxValue="12px" />
          <SpacingSample name="spacing-3.5" value="0.875rem" pxValue="14px" />
          <SpacingSample name="spacing-4" value="1rem" pxValue="16px" />
          <SpacingSample name="spacing-5" value="1.25rem" pxValue="20px" />
          <SpacingSample name="spacing-6" value="1.5rem" pxValue="24px" />
          <SpacingSample name="spacing-7" value="1.75rem" pxValue="28px" />
          <SpacingSample name="spacing-8" value="2rem" pxValue="32px" />
          <SpacingSample name="spacing-9" value="2.25rem" pxValue="36px" />
          <SpacingSample name="spacing-10" value="2.5rem" pxValue="40px" />
          <SpacingSample name="spacing-11" value="2.75rem" pxValue="44px" />
          <SpacingSample name="spacing-12" value="3rem" pxValue="48px" />
          <SpacingSample name="spacing-14" value="3.5rem" pxValue="56px" />
          <SpacingSample name="spacing-16" value="4rem" pxValue="64px" />
          <SpacingSample name="spacing-20" value="5rem" pxValue="80px" />
          <SpacingSample name="spacing-24" value="6rem" pxValue="96px" />
          <SpacingSample name="spacing-28" value="7rem" pxValue="112px" />
          <SpacingSample name="spacing-32" value="8rem" pxValue="128px" />
        </div>
      </section>

      <section>
        <h2 class="mb-6 text-2xl font-semibold">Common Uses: Padding</h2>
        <div class="space-y-6">
          <div class="mb-6 rounded-lg border-2 border-dashed border-primary-500 bg-neutral-100 p-0 dark:bg-neutral-800">
            <div class="m-4 rounded-lg bg-neutral-200 p-4 dark:bg-neutral-700">
              <div class="mb-2 font-medium">p-0 (No Padding)</div>
              <p>
                Content with no padding. Notice this actually has a margin to
                show the container.
              </p>
            </div>
          </div>

          <div class="rounded-lg border-2 border-dashed border-primary-500 bg-neutral-100 p-1 dark:bg-neutral-800">
            <div class="h-full w-full rounded-lg bg-neutral-200 p-4 dark:bg-neutral-700">
              <div class="mb-2 font-medium">p-1 (0.25rem, 4px)</div>
              <p>Very tight padding, used for compact UI elements.</p>
            </div>
          </div>

          <div class="rounded-lg border-2 border-dashed border-primary-500 bg-neutral-100 p-2 dark:bg-neutral-800">
            <div class="h-full w-full rounded-lg bg-neutral-200 p-4 dark:bg-neutral-700">
              <div class="mb-2 font-medium">p-2 (0.5rem, 8px)</div>
              <p>
                Compact padding, used for smaller UI elements like badges or
                compact cards.
              </p>
            </div>
          </div>

          <div class="rounded-lg border-2 border-dashed border-primary-500 bg-neutral-100 p-4 dark:bg-neutral-800">
            <div class="h-full w-full rounded-lg bg-neutral-200 p-4 dark:bg-neutral-700">
              <div class="mb-2 font-medium">p-4 (1rem, 16px)</div>
              <p>
                Standard padding for cards, containers, and most UI elements.
              </p>
            </div>
          </div>

          <div class="rounded-lg border-2 border-dashed border-primary-500 bg-neutral-100 p-6 dark:bg-neutral-800">
            <div class="h-full w-full rounded-lg bg-neutral-200 p-4 dark:bg-neutral-700">
              <div class="mb-2 font-medium">p-6 (1.5rem, 24px)</div>
              <p>
                Comfortable padding, used for prominent UI elements and
                containers.
              </p>
            </div>
          </div>

          <div class="rounded-lg border-2 border-dashed border-primary-500 bg-neutral-100 p-8 dark:bg-neutral-800">
            <div class="h-full w-full rounded-lg bg-neutral-200 p-4 dark:bg-neutral-700">
              <div class="mb-2 font-medium">p-8 (2rem, 32px)</div>
              <p>
                Generous padding, used for featured content or important
                sections.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 class="mb-6 text-2xl font-semibold">Common Uses: Margin</h2>

        <div class="rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
          <div class="mb-2 rounded-lg bg-primary-100 p-4 dark:bg-primary-900">
            <div class="font-medium">First element</div>
          </div>

          <div class="mt-2 rounded-lg bg-primary-100 p-4 dark:bg-primary-900">
            <div class="font-medium">mt-2 (0.5rem, 8px)</div>
            <p>Small margin-top for closely related elements.</p>
          </div>

          <div class="mt-4 rounded-lg bg-primary-100 p-4 dark:bg-primary-900">
            <div class="font-medium">mt-4 (1rem, 16px)</div>
            <p>Standard margin-top for separating related content.</p>
          </div>

          <div class="mt-8 rounded-lg bg-primary-100 p-4 dark:bg-primary-900">
            <div class="font-medium">mt-8 (2rem, 32px)</div>
            <p>Large margin-top for clearly separating content sections.</p>
          </div>

          <div class="mt-12 rounded-lg bg-primary-100 p-4 dark:bg-primary-900">
            <div class="font-medium">mt-12 (3rem, 48px)</div>
            <p>Extra large margin-top for major content divisions.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 class="mb-6 text-2xl font-semibold">Common Uses: Gap</h2>

        <SpacingPreset title="gap-2" class="gap-2" pxValue="0.5rem (8px)" />

        <SpacingPreset title="gap-4" class="gap-4" pxValue="1rem (16px)" />

        <SpacingPreset title="gap-6" class="gap-6" pxValue="1.5rem (24px)" />

        <SpacingPreset title="gap-8" class="gap-8" pxValue="2rem (32px)" />
      </section>

      <section>
        <h2 class="mb-6 text-2xl font-semibold">Responsive Spacing Examples</h2>

        <div class="mb-8 rounded-lg border-2 border-dashed border-primary-500 bg-neutral-100 p-4 md:p-6 lg:p-8 dark:bg-neutral-800">
          <div class="rounded-lg bg-neutral-200 p-4 dark:bg-neutral-700">
            <div class="mb-2 font-medium">Responsive padding</div>
            <p>p-4 md:p-6 lg:p-8</p>
            <p>This container uses different padding based on screen size.</p>
          </div>
        </div>

        <div class="space-y-4 rounded-lg bg-neutral-100 p-4 md:space-y-6 lg:space-y-8 dark:bg-neutral-800">
          <div class="rounded-lg bg-secondary-100 p-4 dark:bg-secondary-900">
            <div class="font-medium">Responsive vertical spacing</div>
            <p>space-y-4 md:space-y-6 lg:space-y-8</p>
          </div>

          <div class="rounded-lg bg-secondary-100 p-4 dark:bg-secondary-900">
            <div class="font-medium">Second element</div>
            <p>The gap between elements increases on larger screens.</p>
          </div>

          <div class="rounded-lg bg-secondary-100 p-4 dark:bg-secondary-900">
            <div class="font-medium">Third element</div>
            <p>Creating a comfortable reading experience across devices.</p>
          </div>
        </div>
      </section>

      <div class="mt-8 rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
        <h3 class="mb-4 text-xl font-medium">How to Use This Component</h3>
        <p class="mb-3">
          This component provides a visual reference for spacing tokens in the
          design system. It can be imported and used in documentation or
          Storybook.
        </p>
        <pre class="overflow-x-auto rounded-md bg-neutral-50 p-3 text-sm dark:bg-neutral-800">
          {`import { SpacingTokensVisual } from 'path/to/SpacingTokensVisual';

// In your component or documentation
<SpacingTokensVisual />`}
        </pre>
      </div>
    </div>
  );
});

export default SpacingTokensVisual;
