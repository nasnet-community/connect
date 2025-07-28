import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { Rating } from "../Rating";

interface Product {
  id: number;
  name: string;
  rating: number;
  reviews: number;
}

export const AdvancedRatingExample = component$(() => {
  const products = useStore<Product[]>([
    { id: 1, name: "Laptop Pro X", rating: 4.5, reviews: 128 },
    { id: 2, name: "Wireless Mouse", rating: 4, reviews: 89 },
    { id: 3, name: "USB-C Hub", rating: 3.5, reviews: 45 },
    { id: 4, name: "Mechanical Keyboard", rating: 5, reviews: 234 },
  ]);

  const userRatings = useStore<
    Record<number, number> & { satisfaction?: number }
  >({});
  const hoveredProduct = useSignal<number | null>(null);

  const handleRating$ = $(async (productId: number, value: number | null) => {
    if (value !== null) {
      userRatings[productId] = value;
    } else {
      delete userRatings[productId];
    }
  });

  return (
    <div class="space-y-8 p-6">
      <h2 class="text-2xl font-bold">Advanced Rating Examples</h2>

      {/* Product ratings list */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Product Ratings</h3>
        <div class="space-y-3">
          {products.map((product) => (
            <div
              key={product.id}
              class="rounded-lg border p-4 transition-shadow hover:shadow-md"
              onMouseEnter$={() => (hoveredProduct.value = product.id)}
              onMouseLeave$={() => (hoveredProduct.value = null)}
            >
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <h4 class="font-medium">{product.name}</h4>
                  <div class="mt-2 flex items-center gap-4">
                    <Rating
                      value={product.rating}
                      precision={0.5}
                      readOnly
                      size="sm"
                      showValue
                    />
                    <span class="text-sm text-gray-500">
                      ({product.reviews} reviews)
                    </span>
                  </div>
                </div>
                <div class="ml-4">
                  <p class="mb-1 text-sm text-gray-600">Your rating:</p>
                  <Rating
                    value={userRatings[product.id] || 0}
                    onValueChange$={(value) => handleRating$(product.id, value)}
                    size="sm"
                    allowClear
                    labels={["Poor", "Fair", "Good", "Very Good", "Excellent"]}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rating statistics */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Rating Statistics</h3>
        <div class="rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
          <div class="flex items-center gap-8">
            <div class="text-center">
              <div class="text-4xl font-bold">4.3</div>
              <Rating
                value={4.3}
                precision={0.5}
                readOnly
                size="lg"
                class="mt-2"
              />
              <p class="mt-1 text-sm text-gray-600">Average rating</p>
            </div>
            <div class="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => {
                const percentage =
                  stars === 5
                    ? 45
                    : stars === 4
                      ? 30
                      : stars === 3
                        ? 15
                        : stars === 2
                          ? 7
                          : 3;
                return (
                  <div key={stars} class="flex items-center gap-2">
                    <span class="w-2 text-sm">{stars}</span>
                    <Rating value={stars} readOnly size="sm" class="w-20" />
                    <div class="h-2 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        class="h-full bg-yellow-500 transition-all duration-300"
                        style={`width: ${percentage}%`}
                      />
                    </div>
                    <span class="w-10 text-right text-sm text-gray-600">
                      {percentage}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Form integration example */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Form Integration</h3>
        <form class="max-w-md space-y-4">
          <div>
            <label class="mb-1 block text-sm font-medium">
              Overall Satisfaction
            </label>
            <Rating
              name="satisfaction"
              defaultValue={0}
              required
              error={
                userRatings.satisfaction === 0
                  ? "Please rate your satisfaction"
                  : undefined
              }
              labels={[
                "Very Unsatisfied",
                "Unsatisfied",
                "Neutral",
                "Satisfied",
                "Very Satisfied",
              ]}
            />
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium">
              Recommendation Likelihood
            </label>
            <Rating
              name="recommendation"
              max={10}
              defaultValue={0}
              showValue
              helperText="How likely are you to recommend us? (0-10)"
            />
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium">
              Service Quality
            </label>
            <Rating
              name="service"
              precision={0.5}
              defaultValue={0}
              allowClear
              successMessage="Thank you for rating our service!"
            />
          </div>

          <button
            type="submit"
            class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Submit Feedback
          </button>
        </form>
      </div>

      {/* Custom styling example */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Custom Styling</h3>
        <div class="space-y-3">
          <Rating
            value={4}
            readOnly
            label="Gold stars"
            class="text-yellow-600"
          />
          <Rating value={3} readOnly label="Blue stars" class="text-blue-500" />
          <Rating
            value={5}
            readOnly
            label="Green stars"
            class="text-green-500"
          />
          <Rating
            value={4}
            readOnly
            label="Gradient effect"
            class="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
          />
        </div>
      </div>

      {/* Interactive demo */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Interactive Demo</h3>
        <div class="rounded-lg bg-gray-50 p-6 dark:bg-gray-900">
          <InteractiveRatingDemo />
        </div>
      </div>
    </div>
  );
});

const InteractiveRatingDemo = component$(() => {
  const config = useStore({
    value: 3,
    max: 5,
    precision: 1 as 0.5 | 1,
    size: "md" as "sm" | "md" | "lg",
    readOnly: false,
    disabled: false,
    allowClear: false,
    showValue: false,
  });

  const hoverValue = useSignal<number | null>(null);

  return (
    <div class="space-y-6">
      <div class="rounded-lg border bg-white p-4 dark:bg-gray-800">
        <Rating
          value={config.value}
          max={config.max}
          precision={config.precision}
          size={config.size}
          readOnly={config.readOnly}
          disabled={config.disabled}
          allowClear={config.allowClear}
          showValue={config.showValue}
          onValueChange$={(value) => {
            config.value = value || 0;
          }}
          onHoverChange$={(value) => {
            hoverValue.value = value;
          }}
          label="Interactive Rating"
          helperText={
            hoverValue.value
              ? `Hovering: ${hoverValue.value}`
              : "Try hovering over the stars"
          }
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="mb-1 block text-sm font-medium">Max Rating</label>
          <input
            type="number"
            min="1"
            max="10"
            value={config.max}
            onInput$={(e) => {
              config.max = parseInt((e.target as HTMLInputElement).value) || 5;
            }}
            class="w-full rounded border px-3 py-1"
          />
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium">Precision</label>
          <select
            value={config.precision}
            onChange$={(e) => {
              config.precision = parseFloat(
                (e.target as HTMLSelectElement).value,
              ) as 0.5 | 1;
            }}
            class="w-full rounded border px-3 py-1"
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
              config.size = (e.target as HTMLSelectElement).value as
                | "sm"
                | "md"
                | "lg";
            }}
            class="w-full rounded border px-3 py-1"
          >
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
          </select>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium">Current Value</label>
          <input
            type="number"
            min="0"
            max={config.max}
            step={config.precision}
            value={config.value}
            onInput$={(e) => {
              config.value =
                parseFloat((e.target as HTMLInputElement).value) || 0;
            }}
            class="w-full rounded border px-3 py-1"
          />
        </div>
      </div>

      <div class="space-y-2">
        <label class="flex items-center gap-2">
          <input
            type="checkbox"
            checked={config.readOnly}
            onChange$={(e) => {
              config.readOnly = (e.target as HTMLInputElement).checked;
            }}
          />
          <span class="text-sm">Read Only</span>
        </label>

        <label class="flex items-center gap-2">
          <input
            type="checkbox"
            checked={config.disabled}
            onChange$={(e) => {
              config.disabled = (e.target as HTMLInputElement).checked;
            }}
          />
          <span class="text-sm">Disabled</span>
        </label>

        <label class="flex items-center gap-2">
          <input
            type="checkbox"
            checked={config.allowClear}
            onChange$={(e) => {
              config.allowClear = (e.target as HTMLInputElement).checked;
            }}
          />
          <span class="text-sm">Allow Clear</span>
        </label>

        <label class="flex items-center gap-2">
          <input
            type="checkbox"
            checked={config.showValue}
            onChange$={(e) => {
              config.showValue = (e.target as HTMLInputElement).checked;
            }}
          />
          <span class="text-sm">Show Value</span>
        </label>
      </div>
    </div>
  );
});
