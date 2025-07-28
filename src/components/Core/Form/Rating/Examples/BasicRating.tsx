import { component$, useSignal } from "@builder.io/qwik";
import { Rating } from "../Rating";

export const BasicRatingExample = component$(() => {
  const rating1 = useSignal(3);
  const rating2 = useSignal(2.5);
  const rating3 = useSignal(4);
  const rating4 = useSignal(0);
  const rating5 = useSignal(3);

  return (
    <div class="space-y-8 p-6">
      {/* Basic rating */}
      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Basic Rating</h3>
        <Rating
          value={rating1.value}
          onValueChange$={(value) => {
            rating1.value = value || 0;
          }}
          label="Rate your experience"
        />
        <p class="text-sm text-gray-600">Selected: {rating1.value} stars</p>
      </div>

      {/* Half-star rating */}
      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Half-Star Precision</h3>
        <Rating
          value={rating2.value}
          precision={0.5}
          onValueChange$={(value) => {
            rating2.value = value || 0;
          }}
          label="Rate with half stars"
          showValue
        />
      </div>

      {/* Different sizes */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Size Variants</h3>
        <Rating value={3} size="sm" label="Small" readOnly />
        <Rating value={3} size="md" label="Medium (default)" readOnly />
        <Rating value={3} size="lg" label="Large" readOnly />
      </div>

      {/* With clear functionality */}
      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Allow Clear</h3>
        <Rating
          value={rating3.value}
          allowClear
          onValueChange$={(value) => {
            rating3.value = value || 0;
          }}
          label="Click same star to clear"
          helperText="You can clear the rating by clicking the current value"
        />
      </div>

      {/* With custom labels */}
      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Custom Labels</h3>
        <Rating
          value={rating4.value}
          labels={["Terrible", "Bad", "OK", "Good", "Excellent"]}
          onValueChange$={(value) => {
            rating4.value = value || 0;
          }}
          label="How was your meal?"
          showValue
        />
      </div>

      {/* Form states */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Form States</h3>

        <Rating
          value={2}
          label="With error"
          error="Please rate at least 3 stars"
          required
        />

        <Rating
          value={4}
          label="With success"
          successMessage="Thank you for your feedback!"
        />

        <Rating
          value={3}
          label="With warning"
          warningMessage="Your rating seems lower than usual"
        />

        <Rating
          value={3}
          label="Disabled"
          disabled
          helperText="This rating is disabled"
        />
      </div>

      {/* Read-only display */}
      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Read-Only Display</h3>
        <Rating
          value={4.5}
          precision={0.5}
          readOnly
          label="Average user rating"
          showValue
        />
      </div>

      {/* Custom max rating */}
      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Custom Maximum</h3>
        <Rating
          value={rating5.value}
          max={10}
          onValueChange$={(value) => {
            rating5.value = value || 0;
          }}
          label="Rate out of 10"
          showValue
        />
      </div>

      {/* Keyboard navigation info */}
      <div class="mt-8 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
        <h3 class="mb-2 text-lg font-semibold">Keyboard Navigation</h3>
        <ul class="space-y-1 text-sm">
          <li>• Arrow keys: Navigate between ratings</li>
          <li>• Number keys (0-5): Jump to specific rating</li>
          <li>• Home/End: Jump to first/last rating</li>
          <li>• Delete/Backspace: Clear rating (if allowClear is enabled)</li>
        </ul>
      </div>
    </div>
  );
});

export const CustomIconRatingExample = component$(() => {
  const rating = useSignal(3);

  // Custom heart icon
  const HeartIcon = component$<{ filled: boolean }>(({ filled }) => {
    return (
      <svg
        viewBox="0 0 24 24"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        stroke-width="2"
        class="h-full w-full"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    );
  });

  // Custom thumbs up icon
  const ThumbIcon = component$<{ filled: boolean }>(({ filled }) => {
    return (
      <svg
        viewBox="0 0 24 24"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        stroke-width="2"
        class="h-full w-full"
      >
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
      </svg>
    );
  });

  return (
    <div class="space-y-6 p-6">
      <h3 class="text-lg font-semibold">Custom Icons</h3>

      <div class="space-y-4">
        <Rating
          value={rating.value}
          onValueChange$={(value) => {
            rating.value = value || 0;
          }}
          icon={<HeartIcon filled={true} />}
          emptyIcon={<HeartIcon filled={false} />}
          label="Rate with hearts"
          class="text-red-500"
        />

        <Rating
          value={3}
          readOnly
          icon={<ThumbIcon filled={true} />}
          emptyIcon={<ThumbIcon filled={false} />}
          label="Thumbs rating"
          class="text-blue-500"
        />
      </div>
    </div>
  );
});
