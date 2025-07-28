import { component$, useSignal } from "@builder.io/qwik";
import { AspectRatio } from "..";

/**
 * Custom AspectRatio examples demonstrating advanced usage and custom ratios
 */
export const CustomAspectRatioExamples = component$(() => {
  const customWidth = useSignal(16);
  const customHeight = useSignal(9);

  return (
    <div class="space-y-8 p-4">
      <h2 class="mb-4 text-2xl font-bold">Custom AspectRatio Examples</h2>

      {/* Custom Ratio Examples */}
      <section>
        <h3 class="mb-3 text-xl font-semibold">Custom Ratios</h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* 2.35:1 Anamorphic */}
          <div>
            <h4 class="mb-2 text-sm font-medium">Anamorphic (2.35:1)</h4>
            <AspectRatio customRatio={2.35} bgColor="#000">
              <div class="flex h-full items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 p-4 text-center text-white">
                Cinema Scope
              </div>
            </AspectRatio>
          </div>

          {/* 5:4 Classic Monitor */}
          <div>
            <h4 class="mb-2 text-sm font-medium">Classic Monitor (5:4)</h4>
            <AspectRatio customRatio={5 / 4} bgColor="#f3f4f6">
              <div class="flex h-full items-center justify-center bg-gray-700 p-4 text-center text-white">
                5:4 Display
              </div>
            </AspectRatio>
          </div>

          {/* 32:9 Super Ultrawide */}
          <div>
            <h4 class="mb-2 text-sm font-medium">Super Ultrawide (32:9)</h4>
            <AspectRatio customRatio={32 / 9} bgColor="#1f2937">
              <div class="flex h-full items-center justify-center bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 p-4 text-center text-white">
                Dual Monitor Setup
              </div>
            </AspectRatio>
          </div>

          {/* 2:3 Portrait Photo */}
          <div>
            <h4 class="mb-2 text-sm font-medium">Portrait Photo (2:3)</h4>
            <AspectRatio customRatio={2 / 3} maxWidth="250px" bgColor="#fef3c7">
              <div class="flex h-full items-center justify-center bg-amber-600 p-4 text-center text-white">
                Portrait Photo
              </div>
            </AspectRatio>
          </div>

          {/* 1:2.39 Film */}
          <div>
            <h4 class="mb-2 text-sm font-medium">Panavision (1:2.39)</h4>
            <AspectRatio
              customRatio={1 / 2.39}
              maxWidth="200px"
              bgColor="#1e1e1e"
            >
              <div class="flex h-full items-center justify-center bg-red-700 p-4 text-center text-white">
                Film Format
              </div>
            </AspectRatio>
          </div>

          {/* A4 Paper Ratio */}
          <div>
            <h4 class="mb-2 text-sm font-medium">A4 Paper (1:√2)</h4>
            <AspectRatio
              customRatio={1 / Math.sqrt(2)}
              maxWidth="250px"
              bgColor="#fff"
            >
              <div class="flex h-full items-center justify-center border-2 border-gray-300 p-4 text-center">
                A4 Document
              </div>
            </AspectRatio>
          </div>
        </div>
      </section>

      {/* Interactive Custom Ratio */}
      <section>
        <h3 class="mb-3 text-xl font-semibold">Interactive Custom Ratio</h3>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <label class="flex items-center gap-2">
              Width:
              <input
                type="number"
                min="1"
                max="32"
                value={customWidth.value}
                onInput$={(e) =>
                  (customWidth.value =
                    parseInt((e.target as HTMLInputElement).value) || 16)
                }
                class="w-20 rounded border px-2 py-1"
              />
            </label>
            <span class="text-lg font-medium">:</span>
            <label class="flex items-center gap-2">
              Height:
              <input
                type="number"
                min="1"
                max="32"
                value={customHeight.value}
                onInput$={(e) =>
                  (customHeight.value =
                    parseInt((e.target as HTMLInputElement).value) || 9)
                }
                class="w-20 rounded border px-2 py-1"
              />
            </label>
            <span class="text-sm text-gray-600">
              Ratio: {(customWidth.value / customHeight.value).toFixed(3)}
            </span>
          </div>

          <div class="max-w-lg">
            <AspectRatio
              customRatio={customWidth.value / customHeight.value}
              bgColor="#e0e7ff"
            >
              <div class="flex h-full flex-col items-center justify-center bg-indigo-600 p-4 text-center text-white">
                <div class="text-2xl font-bold">
                  {customWidth.value}:{customHeight.value}
                </div>
                <div class="mt-1 text-sm">Custom Ratio</div>
              </div>
            </AspectRatio>
          </div>
        </div>
      </section>

      {/* Advanced Overflow Modes */}
      <section>
        <h3 class="mb-3 text-xl font-semibold">Advanced Overflow Modes</h3>
        <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
          {(["cover", "contain", "fill", "scale-down"] as const).map((mode) => (
            <div key={mode}>
              <h4 class="mb-2 text-sm font-medium capitalize">{mode}</h4>
              <AspectRatio ratio="square" overflow={mode} bgColor="#f5f5f5">
                <img
                  src="https://via.placeholder.com/300x200/3b82f6/ffffff?text=Test+Image"
                  alt={`${mode} example`}
                  class={`h-full w-full object-${mode}`}
                />
              </AspectRatio>
            </div>
          ))}
        </div>
      </section>

      {/* Complex Layouts */}
      <section>
        <h3 class="mb-3 text-xl font-semibold">Complex Layouts</h3>

        {/* Card with AspectRatio Image */}
        <div class="mb-6">
          <h4 class="mb-2 text-sm font-medium">
            Card Component with AspectRatio
          </h4>
          <div class="max-w-sm overflow-hidden rounded-lg bg-white shadow-lg">
            <AspectRatio ratio="photo">
              <img
                src="https://via.placeholder.com/600x400/10b981/ffffff?text=Card+Image"
                alt="Card"
                class="h-full w-full object-cover"
              />
            </AspectRatio>
            <div class="p-4">
              <h3 class="mb-2 text-lg font-semibold">Product Card</h3>
              <p class="text-sm text-gray-600">
                This card uses AspectRatio to maintain consistent image
                dimensions.
              </p>
              <button class="mt-4 rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Masonry-like Grid */}
        <div>
          <h4 class="mb-2 text-sm font-medium">Mixed Ratio Grid</h4>
          <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div class="md:col-span-2">
              <AspectRatio ratio="landscape">
                <div class="flex h-full items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 p-4 font-semibold text-white">
                  Wide Item
                </div>
              </AspectRatio>
            </div>
            <div>
              <AspectRatio ratio="square">
                <div class="flex h-full items-center justify-center bg-gradient-to-br from-purple-400 to-pink-500 p-4 font-semibold text-white">
                  Square
                </div>
              </AspectRatio>
            </div>
            <div class="md:row-span-2">
              <AspectRatio ratio="portrait">
                <div class="flex h-full items-center justify-center bg-gradient-to-br from-yellow-400 to-orange-500 p-4 font-semibold text-white">
                  Tall Item
                </div>
              </AspectRatio>
            </div>
            <div>
              <AspectRatio ratio="square">
                <div class="flex h-full items-center justify-center bg-gradient-to-br from-red-400 to-pink-500 p-4 font-semibold text-white">
                  Square
                </div>
              </AspectRatio>
            </div>
            <div class="md:col-span-2">
              <AspectRatio ratio="video">
                <div class="flex h-full items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-500 p-4 font-semibold text-white">
                  Video Item
                </div>
              </AspectRatio>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Considerations */}
      <section>
        <h3 class="mb-3 text-xl font-semibold">Performance & Loading States</h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Skeleton Loading */}
          <div>
            <h4 class="mb-2 text-sm font-medium">Skeleton Loading State</h4>
            <AspectRatio ratio="video" bgColor="#e5e7eb">
              <div class="h-full w-full animate-pulse">
                <div class="h-full rounded bg-gray-300"></div>
              </div>
            </AspectRatio>
          </div>

          {/* Lazy Loading Image */}
          <div>
            <h4 class="mb-2 text-sm font-medium">
              Lazy Loading with Placeholder
            </h4>
            <AspectRatio ratio="video" bgColor="#f3f4f6">
              <img
                src="https://via.placeholder.com/1920x1080/6366f1/ffffff?text=High+Resolution+Image"
                alt="Lazy loaded"
                loading="lazy"
                class="h-full w-full object-cover"
              />
            </AspectRatio>
          </div>
        </div>
      </section>

      {/* Artistic Compositions */}
      <section>
        <h3 class="mb-3 text-xl font-semibold">Artistic Compositions</h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Overlapping Elements */}
          <div>
            <h4 class="mb-2 text-sm font-medium">Overlapping Design</h4>
            <div class="relative">
              <AspectRatio ratio="landscape" class="relative z-10">
                <img
                  src="https://via.placeholder.com/800x600/1e40af/ffffff?text=Main+Image"
                  alt="Main"
                  class="h-full w-full rounded-lg object-cover shadow-lg"
                />
              </AspectRatio>
              <div class="absolute -bottom-4 -right-4 z-20 w-32">
                <AspectRatio ratio="square">
                  <img
                    src="https://via.placeholder.com/200x200/dc2626/ffffff?text=Badge"
                    alt="Badge"
                    class="h-full w-full rounded-full border-4 border-white object-cover shadow-lg"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>

          {/* Split Screen Effect */}
          <div>
            <h4 class="mb-2 text-sm font-medium">Split Screen Effect</h4>
            <AspectRatio ratio="video" class="overflow-hidden rounded-lg">
              <div class="flex h-full">
                <div class="flex w-1/2 items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 font-bold text-white">
                  LEFT
                </div>
                <div class="flex w-1/2 items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-500 font-bold text-white">
                  RIGHT
                </div>
              </div>
            </AspectRatio>
          </div>
        </div>
      </section>

      {/* Responsive Behavior Examples */}
      <section>
        <h3 class="mb-3 text-xl font-semibold">Responsive Behavior</h3>
        <div class="space-y-6">
          {/* Responsive Constraints */}
          <div>
            <h4 class="mb-2 text-sm font-medium">
              Responsive Width Constraints
            </h4>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
              <AspectRatio
                ratio="square"
                maxWidth="100%"
                class="md:max-w-[200px]"
                bgColor="#fee2e2"
              >
                <div class="flex h-full items-center justify-center bg-red-500 p-4 text-center text-white">
                  Mobile: 100%
                  <br />
                  Desktop: 200px
                </div>
              </AspectRatio>

              <AspectRatio
                ratio="square"
                maxWidth="100%"
                class="md:max-w-[250px]"
                bgColor="#dbeafe"
              >
                <div class="flex h-full items-center justify-center bg-blue-500 p-4 text-center text-white">
                  Mobile: 100%
                  <br />
                  Desktop: 250px
                </div>
              </AspectRatio>

              <AspectRatio
                ratio="square"
                maxWidth="100%"
                class="md:max-w-[300px]"
                bgColor="#d1fae5"
              >
                <div class="flex h-full items-center justify-center bg-green-500 p-4 text-center text-white">
                  Mobile: 100%
                  <br />
                  Desktop: 300px
                </div>
              </AspectRatio>
            </div>
          </div>

          {/* Adaptive Layouts */}
          <div>
            <h4 class="mb-2 text-sm font-medium">Adaptive Layout Grid</h4>
            <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {Array.from({ length: 12 }, (_, i) => (
                <AspectRatio key={i} ratio="square">
                  <div
                    class={`
                    ${i % 3 === 0 ? "bg-red-500" : i % 3 === 1 ? "bg-green-500" : "bg-blue-500"}
                    flex h-full items-center justify-center font-bold text-white
                  `}
                  >
                    {i + 1}
                  </div>
                </AspectRatio>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});
