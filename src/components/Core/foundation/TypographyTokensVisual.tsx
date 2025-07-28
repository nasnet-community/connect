import { component$ } from "@builder.io/qwik";

interface TypographySampleProps {
  name: string;
  class: string;
  fontWeight?: string;
  lineHeight?: string;
  sampleText?: string;
}

export const TypographySample = component$<TypographySampleProps>(
  ({
    name,
    class: className,
    fontWeight = "normal",
    lineHeight = "normal",
    sampleText = "The quick brown fox jumps over the lazy dog",
  }) => {
    return (
      <div class="mb-6 border-b border-neutral-200 pb-6 dark:border-neutral-700">
        <div class="mb-2 flex flex-wrap items-baseline justify-between">
          <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {name}
          </h3>
          <div class="text-sm text-neutral-500 dark:text-neutral-400">
            <span class="mr-3">{className}</span>
            <span class="mr-3">{fontWeight}</span>
            <span>{lineHeight}</span>
          </div>
        </div>
        <p class={`${className} font-${fontWeight} leading-${lineHeight}`}>
          {sampleText}
        </p>
      </div>
    );
  },
);

export const FontWeightSample = component$<{ weight: string; name: string }>(
  ({ weight, name }) => {
    return (
      <div class="flex items-center justify-between border-b border-neutral-200 py-2 dark:border-neutral-700">
        <div class={`font-${weight} text-lg`}>
          The quick brown fox jumps over the lazy dog
        </div>
        <div class="text-sm text-neutral-500 dark:text-neutral-400">
          {name} ({weight})
        </div>
      </div>
    );
  },
);

export const LineHeightSample = component$<{
  lineHeight: string;
  name: string;
  value: string;
}>(({ lineHeight, name, value }) => {
  return (
    <div class="mb-8">
      <div class="mb-2 flex items-baseline justify-between">
        <h3 class="text-lg font-semibold">{name}</h3>
        <div class="text-sm text-neutral-500">
          leading-{lineHeight} ({value})
        </div>
      </div>
      <div
        class={`leading-${lineHeight} rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800`}
      >
        <div class="bg-neutral-200 dark:bg-neutral-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
          <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </div>
    </div>
  );
});

export const TypographyTokensVisual = component$(() => {
  return (
    <div class="space-y-12">
      <section>
        <h2 class="mb-6 text-2xl font-semibold">Font Size Tokens</h2>
        <TypographySample
          name="text-xs"
          class="text-xs"
          fontWeight="normal"
          lineHeight="normal"
          sampleText="Font size: 0.75rem (12px) with line height: 1rem (16px)"
        />
        <TypographySample
          name="text-sm"
          class="text-sm"
          fontWeight="normal"
          lineHeight="normal"
          sampleText="Font size: 0.875rem (14px) with line height: 1.25rem (20px)"
        />
        <TypographySample
          name="text-base"
          class="text-base"
          fontWeight="normal"
          lineHeight="normal"
          sampleText="Font size: 1rem (16px) with line height: 1.5rem (24px)"
        />
        <TypographySample
          name="text-lg"
          class="text-lg"
          fontWeight="normal"
          lineHeight="normal"
          sampleText="Font size: 1.125rem (18px) with line height: 1.75rem (28px)"
        />
        <TypographySample
          name="text-xl"
          class="text-xl"
          fontWeight="normal"
          lineHeight="normal"
          sampleText="Font size: 1.25rem (20px) with line height: 1.75rem (28px)"
        />
        <TypographySample
          name="text-2xl"
          class="text-2xl"
          fontWeight="normal"
          lineHeight="normal"
          sampleText="Font size: 1.5rem (24px) with line height: 2rem (32px)"
        />
        <TypographySample
          name="text-3xl"
          class="text-3xl"
          fontWeight="normal"
          lineHeight="normal"
          sampleText="Font size: 1.875rem (30px) with line height: 2.25rem (36px)"
        />
        <TypographySample
          name="text-4xl"
          class="text-4xl"
          fontWeight="normal"
          lineHeight="normal"
          sampleText="Font size: 2.25rem (36px) with line height: 2.5rem (40px)"
        />
        <TypographySample
          name="text-5xl"
          class="text-5xl"
          fontWeight="normal"
          lineHeight="normal"
          sampleText="Font size: 3rem (48px) with line height: 1"
        />
        <TypographySample
          name="text-6xl"
          class="text-6xl"
          fontWeight="normal"
          lineHeight="normal"
          sampleText="Font size: 3.75rem (60px) with line height: 1"
        />
      </section>

      <section>
        <h2 class="mb-6 text-2xl font-semibold">Heading Typography</h2>
        <div class="space-y-6">
          <div>
            <h1 class="text-4xl font-bold">h1: Heading Level 1</h1>
            <p class="mt-1 text-sm text-neutral-500">
              text-4xl (desktop), text-3xl (mobile) with font-bold
            </p>
          </div>
          <div>
            <h2 class="text-3xl font-semibold">h2: Heading Level 2</h2>
            <p class="mt-1 text-sm text-neutral-500">
              text-3xl (desktop), text-2xl (mobile) with font-semibold
            </p>
          </div>
          <div>
            <h3 class="text-2xl font-semibold">h3: Heading Level 3</h3>
            <p class="mt-1 text-sm text-neutral-500">
              text-2xl (desktop), text-xl (mobile) with font-semibold
            </p>
          </div>
          <div>
            <h4 class="text-xl font-medium">h4: Heading Level 4</h4>
            <p class="mt-1 text-sm text-neutral-500">
              text-xl (desktop), text-lg (mobile) with font-medium
            </p>
          </div>
          <div>
            <h5 class="text-lg font-medium">h5: Heading Level 5</h5>
            <p class="mt-1 text-sm text-neutral-500">
              text-lg (desktop), text-base (mobile) with font-medium
            </p>
          </div>
          <div>
            <h6 class="text-base font-medium">h6: Heading Level 6</h6>
            <p class="mt-1 text-sm text-neutral-500">
              text-base (desktop), text-sm (mobile) with font-medium
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 class="mb-6 text-2xl font-semibold">Body Typography</h2>
        <div class="space-y-6">
          <div>
            <p class="text-lg font-normal leading-relaxed">
              Body Large: Used for hero descriptions and featured content.
            </p>
            <p class="mt-1 text-sm text-neutral-500">
              text-lg with font-normal and leading-relaxed
            </p>
          </div>
          <div>
            <p class="text-base font-normal leading-normal">
              Body Default: Used for main content, paragraphs, and descriptions.
              This is the standard text size for most content in the
              application.
            </p>
            <p class="mt-1 text-sm text-neutral-500">
              text-base with font-normal and leading-normal
            </p>
          </div>
          <div>
            <p class="text-sm font-normal leading-normal">
              Body Small: Used for secondary information, captions, and help
              text. This size is great for supporting content that doesn't need
              as much emphasis.
            </p>
            <p class="mt-1 text-sm text-neutral-500">
              text-sm with font-normal and leading-normal
            </p>
          </div>
          <div>
            <p class="text-xs font-normal leading-normal">
              Body XSmall: Used for legal text, footnotes, and fine print. This
              smallest size should be used sparingly to maintain readability.
            </p>
            <p class="mt-1 text-sm text-neutral-500">
              text-xs with font-normal and leading-normal
            </p>
          </div>
          <div>
            <p class="text-xl font-normal leading-relaxed">
              Lead Paragraph: Used for introductory paragraphs and summaries.
              This style adds emphasis to opening content to draw readers in.
            </p>
            <p class="mt-1 text-sm text-neutral-500">
              text-xl with font-normal and leading-relaxed
            </p>
          </div>
          <div>
            <p class="text-xs font-medium leading-tight">
              Caption: Used for image captions and metadata display. The tighter
              line height and medium weight help with emphasis at small sizes.
            </p>
            <p class="mt-1 text-sm text-neutral-500">
              text-xs with font-medium and leading-tight
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 class="mb-6 text-2xl font-semibold">Font Weights</h2>
        <div class="space-y-3">
          <FontWeightSample weight="thin" name="Thin" />
          <FontWeightSample weight="extralight" name="Extra Light" />
          <FontWeightSample weight="light" name="Light" />
          <FontWeightSample weight="normal" name="Normal" />
          <FontWeightSample weight="medium" name="Medium" />
          <FontWeightSample weight="semibold" name="Semi Bold" />
          <FontWeightSample weight="bold" name="Bold" />
          <FontWeightSample weight="extrabold" name="Extra Bold" />
          <FontWeightSample weight="black" name="Black" />
        </div>
      </section>

      <section>
        <h2 class="mb-6 text-2xl font-semibold">Line Heights</h2>
        <div class="space-y-8">
          <LineHeightSample lineHeight="none" name="Leading None" value="1" />
          <LineHeightSample
            lineHeight="tight"
            name="Leading Tight"
            value="1.25"
          />
          <LineHeightSample
            lineHeight="snug"
            name="Leading Snug"
            value="1.375"
          />
          <LineHeightSample
            lineHeight="normal"
            name="Leading Normal"
            value="1.5"
          />
          <LineHeightSample
            lineHeight="relaxed"
            name="Leading Relaxed"
            value="1.625"
          />
          <LineHeightSample lineHeight="loose" name="Leading Loose" value="2" />
        </div>
      </section>

      <div class="mt-8 rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
        <h3 class="mb-4 text-xl font-medium">How to Use This Component</h3>
        <p class="mb-3">
          This component provides a visual reference for all typography tokens
          in the design system. It can be imported and used in documentation or
          Storybook.
        </p>
        <pre class="overflow-x-auto rounded-md bg-neutral-50 p-3 text-sm dark:bg-neutral-800">
          {`import { TypographyTokensVisual } from 'path/to/TypographyTokensVisual';

// In your component or documentation
<TypographyTokensVisual />`}
        </pre>
      </div>
    </div>
  );
});

export default TypographyTokensVisual;
