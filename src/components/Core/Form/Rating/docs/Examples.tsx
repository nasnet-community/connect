import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { Rating } from "../Rating";

export const RatingExamples = component$(() => {
  return (
    <div class="space-y-12 p-6">
      <div class="mb-8">
        <h1 class="mb-2 text-3xl font-bold">Rating Component Examples</h1>
        <p class="text-gray-600 dark:text-gray-400">
          Comprehensive examples showcasing all Rating component features and use cases.
        </p>
      </div>

      {/* Basic Usage */}
      <BasicUsageExamples />

      {/* Size Variants */}
      <SizeVariantsExamples />

      {/* Precision Modes */}
      <PrecisionModeExamples />

      {/* Custom Icons */}
      <CustomIconsExamples />

      {/* Form Integration */}
      <FormIntegrationExamples />

      {/* Read-only Display */}
      <ReadOnlyDisplayExamples />

      {/* Error States */}
      <ErrorStatesExamples />

      {/* Custom Labels */}
      <CustomLabelsExamples />

      {/* Advanced Features */}
      <AdvancedFeaturesExamples />

      {/* Real-world Scenarios */}
      <RealWorldScenariosExamples />
    </div>
  );
});

const BasicUsageExamples = component$(() => {
  const _basicRating = useSignal(0);
  const controlledRating = useSignal(3);

  return (
    <section class="space-y-6">
      <div>
        <h2 class="mb-2 text-2xl font-semibold">Basic Usage</h2>
        <p class="text-gray-600 dark:text-gray-400">
          Simple rating components with default configuration.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div class="space-y-4 rounded-lg border p-6">
          <h3 class="font-medium">Uncontrolled Rating</h3>
          <Rating
            defaultValue={3}
            label="Rate your experience"
            helperText="Click to rate from 1 to 5 stars"
          />
          <pre class="overflow-x-auto rounded bg-gray-100 p-3 text-sm dark:bg-gray-800">
{`<Rating
  defaultValue={3}
  label="Rate your experience"
  helperText="Click to rate from 1 to 5 stars"
/>`}
          </pre>
        </div>

        <div class="space-y-4 rounded-lg border p-6">
          <h3 class="font-medium">Controlled Rating</h3>
          <Rating
            value={controlledRating.value}
            onValueChange$={(value) => {
              controlledRating.value = value || 0;
            }}
            label="Controlled rating"
            showValue
          />
          <p class="text-sm text-gray-600">Current value: {controlledRating.value}</p>
          <pre class="overflow-x-auto rounded bg-gray-100 p-3 text-sm dark:bg-gray-800">
{`const rating = useSignal(3);

<Rating
  value={rating.value}
  onValueChange$={(value) => {
    rating.value = value || 0;
  }}
  label="Controlled rating"
  showValue
/>`}
          </pre>
        </div>
      </div>
    </section>
  );
});

const SizeVariantsExamples = component$(() => {
  return (
    <section class="space-y-6">
      <div>
        <h2 class="mb-2 text-2xl font-semibold">Size Variants</h2>
        <p class="text-gray-600 dark:text-gray-400">
          Different sizes for various use cases and layouts.
        </p>
      </div>

      <div class="space-y-6 rounded-lg border p-6">
        <div class="space-y-4">
          <div>
            <h3 class="mb-2 font-medium">Small Size</h3>
            <Rating value={4} size="sm" label="Small rating" readOnly />
            <p class="mt-1 text-sm text-gray-600">Perfect for compact layouts and lists</p>
          </div>

          <div>
            <h3 class="mb-2 font-medium">Medium Size (Default)</h3>
            <Rating value={4} size="md" label="Medium rating" readOnly />
            <p class="mt-1 text-sm text-gray-600">Standard size for most use cases</p>
          </div>

          <div>
            <h3 class="mb-2 font-medium">Large Size</h3>
            <Rating value={4} size="lg" label="Large rating" readOnly />
            <p class="mt-1 text-sm text-gray-600">Prominent display for important ratings</p>
          </div>
        </div>

        <pre class="overflow-x-auto rounded bg-gray-100 p-3 text-sm dark:bg-gray-800">
{`<Rating value={4} size="sm" label="Small rating" readOnly />
<Rating value={4} size="md" label="Medium rating" readOnly />
<Rating value={4} size="lg" label="Large rating" readOnly />`}
        </pre>
      </div>
    </section>
  );
});

const PrecisionModeExamples = component$(() => {
  const fullStarRating = useSignal(3);
  const halfStarRating = useSignal(3.5);

  return (
    <section class="space-y-6">
      <div>
        <h2 class="mb-2 text-2xl font-semibold">Precision Modes</h2>
        <p class="text-gray-600 dark:text-gray-400">
          Full star and half star precision options.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div class="space-y-4 rounded-lg border p-6">
          <h3 class="font-medium">Full Star Precision</h3>
          <Rating
            value={fullStarRating.value}
            precision={1}
            onValueChange$={(value) => {
              fullStarRating.value = value || 0;
            }}
            label="Full stars only"
            showValue
          />
          <p class="text-sm text-gray-600">Only whole star values (1, 2, 3, 4, 5)</p>
          <pre class="overflow-x-auto rounded bg-gray-100 p-3 text-sm dark:bg-gray-800">
{`<Rating
  precision={1}
  value={rating.value}
  onValueChange$={(value) => {
    rating.value = value || 0;
  }}
  showValue
/>`}
          </pre>
        </div>

        <div class="space-y-4 rounded-lg border p-6">
          <h3 class="font-medium">Half Star Precision</h3>
          <Rating
            value={halfStarRating.value}
            precision={0.5}
            onValueChange$={(value) => {
              halfStarRating.value = value || 0;
            }}
            label="Half stars allowed"
            showValue
          />
          <p class="text-sm text-gray-600">Allows half-star values (1.5, 2.5, 3.5, etc.)</p>
          <pre class="overflow-x-auto rounded bg-gray-100 p-3 text-sm dark:bg-gray-800">
{`<Rating
  precision={0.5}
  value={rating.value}
  onValueChange$={(value) => {
    rating.value = value || 0;
  }}
  showValue
/>`}
          </pre>
        </div>
      </div>
    </section>
  );
});

const CustomIconsExamples = component$(() => {
  const heartRating = useSignal(3);
  const thumbRating = useSignal(4);

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

  const ThumbIcon = component$<{ filled: boolean }>(({ filled }) => (
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

  return (
    <section class="space-y-6">
      <div>
        <h2 class="mb-2 text-2xl font-semibold">Custom Icons</h2>
        <p class="text-gray-600 dark:text-gray-400">
          Replace default stars with custom icons for different contexts.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div class="space-y-4 rounded-lg border p-6">
          <h3 class="font-medium">Heart Rating</h3>
          <Rating
            value={heartRating.value}
            onValueChange$={(value) => {
              heartRating.value = value || 0;
            }}
            icon={<HeartIcon filled={true} />}
            emptyIcon={<HeartIcon filled={false} />}
            label="Rate with hearts"
            class="text-red-500"
            showValue
          />
          <p class="text-sm text-gray-600">Perfect for favorites or love ratings</p>
        </div>

        <div class="space-y-4 rounded-lg border p-6">
          <h3 class="font-medium">Thumbs Rating</h3>
          <Rating
            value={thumbRating.value}
            onValueChange$={(value) => {
              thumbRating.value = value || 0;
            }}
            icon={<ThumbIcon filled={true} />}
            emptyIcon={<ThumbIcon filled={false} />}
            label="Thumbs rating"
            class="text-blue-500"
            showValue
          />
          <p class="text-sm text-gray-600">Great for approval or recommendation ratings</p>
        </div>
      </div>

      <pre class="overflow-x-auto rounded bg-gray-100 p-3 text-sm dark:bg-gray-800">
{`const HeartIcon = component$<{ filled: boolean }>(({ filled }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06..." />
  </svg>
));

<Rating
  icon={<HeartIcon filled={true} />}
  emptyIcon={<HeartIcon filled={false} />}
  class="text-red-500"
  label="Rate with hearts"
/>`}
      </pre>
    </section>
  );
});

const FormIntegrationExamples = component$(() => {
  const formData = useStore({
    satisfaction: 0,
    recommendation: 0,
    service: 0,
  });

  const errors = useStore<{ [key: string]: string }>({});

  const validateField$ = $((field: string, value: number) => {
    if (value === 0) {
      errors[field] = "This rating is required";
    } else {
      delete errors[field];
    }
  });

  return (
    <section class="space-y-6">
      <div>
        <h2 class="mb-2 text-2xl font-semibold">Form Integration</h2>
        <p class="text-gray-600 dark:text-gray-400">
          Using Rating components in forms with validation and submission.
        </p>
      </div>

      <div class="max-w-md space-y-6 rounded-lg border p-6">
        <h3 class="font-medium">Feedback Form</h3>
        
        <form class="space-y-4">
          <Rating
            name="satisfaction"
            value={formData.satisfaction}
            onValueChange$={(value) => {
              formData.satisfaction = value || 0;
              validateField$("satisfaction", value || 0);
            }}
            label="Overall Satisfaction"
            error={errors.satisfaction}
            required
            labels={["Very Poor", "Poor", "Fair", "Good", "Excellent"]}
          />

          <Rating
            name="recommendation"
            value={formData.recommendation}
            max={10}
            onValueChange$={(value) => {
              formData.recommendation = value || 0;
              validateField$("recommendation", value || 0);
            }}
            label="Recommendation Score"
            error={errors.recommendation}
            required
            showValue
            helperText="How likely are you to recommend us? (0-10)"
          />

          <Rating
            name="service"
            value={formData.service}
            precision={0.5}
            onValueChange$={(value) => {
              formData.service = value || 0;
            }}
            label="Service Quality"
            allowClear
            successMessage={formData.service >= 4 ? "Thank you for the positive feedback!" : undefined}
          />

          <button
            type="submit"
            class="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Submit Feedback
          </button>
        </form>
      </div>

      <pre class="overflow-x-auto rounded bg-gray-100 p-3 text-sm dark:bg-gray-800">
{`const formData = useStore({ satisfaction: 0, service: 0 });

<Rating
  name="satisfaction"
  value={formData.satisfaction}
  onValueChange$={(value) => {
    formData.satisfaction = value || 0;
  }}
  label="Overall Satisfaction"
  required
  error={errors.satisfaction}
/>`}
      </pre>
    </section>
  );
});

const ReadOnlyDisplayExamples = component$(() => {
  return (
    <section class="space-y-6">
      <div>
        <h2 class="mb-2 text-2xl font-semibold">Read-only Display</h2>
        <p class="text-gray-600 dark:text-gray-400">
          Displaying existing ratings without user interaction.
        </p>
      </div>

      <div class="space-y-6 rounded-lg border p-6">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div class="space-y-4">
            <h3 class="font-medium">Product Ratings</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm">Laptop Pro X</span>
                <Rating value={4.5} precision={0.5} readOnly size="sm" showValue />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm">Wireless Mouse</span>
                <Rating value={4} readOnly size="sm" showValue />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm">USB-C Hub</span>
                <Rating value={3.5} precision={0.5} readOnly size="sm" showValue />
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="font-medium">Review Summary</h3>
            <div class="text-center">
              <div class="text-4xl font-bold">4.3</div>
              <Rating value={4.3} precision={0.5} readOnly size="lg" class="mt-2" />
              <p class="mt-1 text-sm text-gray-600">Average rating (128 reviews)</p>
            </div>
          </div>
        </div>

        <pre class="overflow-x-auto rounded bg-gray-100 p-3 text-sm dark:bg-gray-800">
{`<Rating 
  value={4.5} 
  precision={0.5} 
  readOnly 
  size="sm" 
  showValue 
/>

<Rating 
  value={4.3} 
  precision={0.5} 
  readOnly 
  size="lg" 
/>`}
        </pre>
      </div>
    </section>
  );
});

const ErrorStatesExamples = component$(() => {
  const ratingWithError = useSignal(0);
  const ratingWithSuccess = useSignal(5);
  const ratingWithWarning = useSignal(2);

  return (
    <section class="space-y-6">
      <div>
        <h2 class="mb-2 text-2xl font-semibold">Error States</h2>
        <p class="text-gray-600 dark:text-gray-400">
          Different message states for user feedback and validation.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div class="space-y-4 rounded-lg border p-6">
          <h3 class="font-medium">Error State</h3>
          <Rating
            value={ratingWithError.value}
            onValueChange$={(value) => {
              ratingWithError.value = value || 0;
            }}
            label="Required Rating"
            error={ratingWithError.value === 0 ? "Please provide a rating" : undefined}
            required
          />
        </div>

        <div class="space-y-4 rounded-lg border p-6">
          <h3 class="font-medium">Success State</h3>
          <Rating
            value={ratingWithSuccess.value}
            onValueChange$={(value) => {
              ratingWithSuccess.value = value || 0;
            }}
            label="Feedback Rating"
            successMessage={ratingWithSuccess.value >= 4 ? "Thank you for the positive feedback!" : undefined}
          />
        </div>

        <div class="space-y-4 rounded-lg border p-6">
          <h3 class="font-medium">Warning State</h3>
          <Rating
            value={ratingWithWarning.value}
            onValueChange$={(value) => {
              ratingWithWarning.value = value || 0;
            }}
            label="Service Rating"
            warningMessage={ratingWithWarning.value > 0 && ratingWithWarning.value < 3 ? "We're sorry about your experience" : undefined}
          />
        </div>
      </div>

      <pre class="overflow-x-auto rounded bg-gray-100 p-3 text-sm dark:bg-gray-800">
{`<Rating
  label="Required Rating"
  error={value === 0 ? "Please provide a rating" : undefined}
  required
/>

<Rating
  label="Feedback Rating"
  successMessage={value >= 4 ? "Thank you!" : undefined}
/>

<Rating
  label="Service Rating"
  warningMessage={value < 3 ? "We're sorry" : undefined}
/>`}
      </pre>
    </section>
  );
});

const CustomLabelsExamples = component$(() => {
  const mealRating = useSignal(0);
  const difficultyRating = useSignal(0);

  return (
    <section class="space-y-6">
      <div>
        <h2 class="mb-2 text-2xl font-semibold">Custom Labels</h2>
        <p class="text-gray-600 dark:text-gray-400">
          Providing context-specific labels for better accessibility and user experience.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div class="space-y-4 rounded-lg border p-6">
          <h3 class="font-medium">Meal Rating</h3>
          <Rating
            value={mealRating.value}
            onValueChange$={(value) => {
              mealRating.value = value || 0;
            }}
            label="How was your meal?"
            labels={["Terrible", "Poor", "Average", "Good", "Excellent"]}
            showValue
          />
          <p class="text-sm text-gray-600">
            {mealRating.value > 0 && `You rated it: ${["Terrible", "Poor", "Average", "Good", "Excellent"][mealRating.value - 1]}`}
          </p>
        </div>

        <div class="space-y-4 rounded-lg border p-6">
          <h3 class="font-medium">Difficulty Rating</h3>
          <Rating
            value={difficultyRating.value}
            onValueChange$={(value) => {
              difficultyRating.value = value || 0;
            }}
            label="Task Difficulty"
            labels={["Very Easy", "Easy", "Medium", "Hard", "Very Hard"]}
            showValue
            class="text-orange-500"
          />
          <p class="text-sm text-gray-600">
            {difficultyRating.value > 0 && `Difficulty: ${["Very Easy", "Easy", "Medium", "Hard", "Very Hard"][difficultyRating.value - 1]}`}
          </p>
        </div>
      </div>

      <pre class="overflow-x-auto rounded bg-gray-100 p-3 text-sm dark:bg-gray-800">
{`<Rating
  label="How was your meal?"
  labels={["Terrible", "Poor", "Average", "Good", "Excellent"]}
  showValue
/>

<Rating
  label="Task Difficulty" 
  labels={["Very Easy", "Easy", "Medium", "Hard", "Very Hard"]}
  class="text-orange-500"
/>`}
      </pre>
    </section>
  );
});

const AdvancedFeaturesExamples = component$(() => {
  const clearableRating = useSignal(3);
  const customMaxRating = useSignal(7);
  const disabledRating = useSignal(4);

  return (
    <section class="space-y-6">
      <div>
        <h2 class="mb-2 text-2xl font-semibold">Advanced Features</h2>
        <p class="text-gray-600 dark:text-gray-400">
          Special features and configurations for specific use cases.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div class="space-y-4 rounded-lg border p-6">
          <h3 class="font-medium">Allow Clear</h3>
          <Rating
            value={clearableRating.value}
            onValueChange$={(value) => {
              clearableRating.value = value || 0;
            }}
            label="Optional Rating"
            allowClear
            helperText="Click the same star to clear"
          />
          <p class="text-sm text-gray-600">
            Current: {clearableRating.value || "Not rated"}
          </p>
        </div>

        <div class="space-y-4 rounded-lg border p-6">
          <h3 class="font-medium">Custom Maximum</h3>
          <Rating
            value={customMaxRating.value}
            max={10}
            onValueChange$={(value) => {
              customMaxRating.value = value || 0;
            }}
            label="Rate out of 10"
            showValue
          />
          <p class="text-sm text-gray-600">10-point scale rating</p>
        </div>

        <div class="space-y-4 rounded-lg border p-6">
          <h3 class="font-medium">Disabled State</h3>
          <Rating
            value={disabledRating.value}
            disabled
            label="Disabled Rating"
            helperText="This rating cannot be changed"
          />
          <p class="text-sm text-gray-600">Interaction disabled</p>
        </div>
      </div>

      <pre class="overflow-x-auto rounded bg-gray-100 p-3 text-sm dark:bg-gray-800">
{`<Rating 
  allowClear 
  label="Optional Rating"
  helperText="Click the same star to clear"
/>

<Rating 
  max={10} 
  label="Rate out of 10" 
  showValue 
/>

<Rating 
  disabled 
  value={4} 
  label="Disabled Rating" 
/>`}
      </pre>
    </section>
  );
});

const RealWorldScenariosExamples = component$(() => {
  const productRatings = useStore([
    { id: 1, name: "Laptop Pro X", rating: 4.5, reviews: 128 },
    { id: 2, name: "Wireless Mouse", rating: 4, reviews: 89 },
    { id: 3, name: "USB-C Hub", rating: 3.5, reviews: 45 },
  ]);

  const userRatings = useStore<Record<number, number>>({});

  return (
    <section class="space-y-6">
      <div>
        <h2 class="mb-2 text-2xl font-semibold">Real-world Scenarios</h2>
        <p class="text-gray-600 dark:text-gray-400">
          Common patterns and implementations in production applications.
        </p>
      </div>

      <div class="space-y-8">
        {/* Product List with Ratings */}
        <div class="rounded-lg border p-6">
          <h3 class="mb-4 font-medium">Product List with Dual Ratings</h3>
          <div class="space-y-4">
            {productRatings.map((product) => (
              <div key={product.id} class="flex items-center justify-between rounded-lg border p-4">
                <div class="flex-1">
                  <h4 class="font-medium">{product.name}</h4>
                  <div class="mt-2 flex items-center gap-4">
                    <div class="flex items-center gap-2">
                      <span class="text-sm text-gray-600">Average:</span>
                      <Rating
                        value={product.rating}
                        precision={0.5}
                        readOnly
                        size="sm"
                        showValue
                      />
                      <span class="text-sm text-gray-500">({product.reviews})</span>
                    </div>
                  </div>
                </div>
                <div class="ml-4">
                  <p class="mb-1 text-sm text-gray-600">Your rating:</p>
                  <Rating
                    value={userRatings[product.id] || 0}
                    onValueChange$={(value) => {
                      userRatings[product.id] = value || 0;
                    }}
                    size="sm"
                    allowClear
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rating Distribution */}
        <div class="rounded-lg border p-6">
          <h3 class="mb-4 font-medium">Rating Distribution Display</h3>
          <div class="flex items-center gap-8">
            <div class="text-center">
              <div class="text-4xl font-bold">4.3</div>
              <Rating value={4.3} precision={0.5} readOnly size="lg" class="mt-2" />
              <p class="mt-1 text-sm text-gray-600">Average rating</p>
            </div>
            <div class="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => {
                const percentage = stars === 5 ? 45 : stars === 4 ? 30 : stars === 3 ? 15 : stars === 2 ? 7 : 3;
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
                    <span class="w-10 text-right text-sm text-gray-600">{percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Multi-step Rating Form */}
        <div class="rounded-lg border p-6">
          <h3 class="mb-4 font-medium">Multi-criteria Evaluation</h3>
          <MultiCriteriaRatingExample />
        </div>
      </div>
    </section>
  );
});

const MultiCriteriaRatingExample = component$(() => {
  const criteria = useStore({
    quality: 0,
    value: 0,
    service: 0,
    delivery: 0,
  });

  const getOverallRating = () => {
    const values = Object.values(criteria).filter(v => v > 0);
    if (values.length === 0) return 0;
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  };

  return (
    <div class="space-y-6">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Rating
          value={criteria.quality}
          onValueChange$={(value) => {
            criteria.quality = value || 0;
          }}
          label="Product Quality"
          precision={0.5}
          showValue
        />

        <Rating
          value={criteria.value}
          onValueChange$={(value) => {
            criteria.value = value || 0;
          }}
          label="Value for Money"
          precision={0.5}
          showValue
        />

        <Rating
          value={criteria.service}
          onValueChange$={(value) => {
            criteria.service = value || 0;
          }}
          label="Customer Service"
          precision={0.5}
          showValue
        />

        <Rating
          value={criteria.delivery}
          onValueChange$={(value) => {
            criteria.delivery = value || 0;
          }}
          label="Delivery Experience"
          precision={0.5}
          showValue
        />
      </div>

      <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
        <div class="flex items-center justify-between">
          <span class="font-medium">Overall Rating:</span>
          <div class="flex items-center gap-2">
            <Rating
              value={getOverallRating()}
              precision={0.1}
              readOnly
              size="sm"
            />
            <span class="text-lg font-bold">{getOverallRating().toFixed(1)}</span>
          </div>
        </div>
      </div>

      <pre class="overflow-x-auto rounded bg-gray-100 p-3 text-sm dark:bg-gray-800">
{`const criteria = useStore({
  quality: 0, value: 0, service: 0, delivery: 0
});

const getOverallRating = () => {
  const values = Object.values(criteria).filter(v => v > 0);
  return values.reduce((sum, val) => sum + val, 0) / values.length;
};

<Rating
  value={criteria.quality}
  onValueChange$={(value) => criteria.quality = value || 0}
  label="Product Quality"
  precision={0.5}
/>`}
      </pre>
    </div>
  );
});

export default RatingExamples;