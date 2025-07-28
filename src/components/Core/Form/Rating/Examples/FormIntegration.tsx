import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { Rating } from "../Rating";

interface FormData {
  productRating: number;
  serviceRating: number;
  overallSatisfaction: number;
  recommendationScore: number;
  comments: string;
}

export const FormIntegrationExample = component$(() => {
  const formData = useStore<FormData>({
    productRating: 0,
    serviceRating: 0,
    overallSatisfaction: 0,
    recommendationScore: 0,
    comments: "",
  });

  const errors = useStore<Partial<Record<keyof FormData, string>>>({});
  const isSubmitting = useSignal(false);
  const isSubmitted = useSignal(false);

  const validateForm = $(() => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (formData.productRating === 0) {
      newErrors.productRating = "Please rate the product";
    }

    if (formData.serviceRating === 0) {
      newErrors.serviceRating = "Please rate our service";
    }

    if (formData.overallSatisfaction === 0) {
      newErrors.overallSatisfaction = "Overall satisfaction rating is required";
    }

    if (formData.recommendationScore < 7 && !formData.comments.trim()) {
      newErrors.comments = "Please provide feedback for scores below 7";
    }

    Object.assign(errors, newErrors);
    return Object.keys(newErrors).length === 0;
  });

  const handleSubmit$ = $(async (event: SubmitEvent) => {
    event.preventDefault();

    const isValid = await validateForm();
    if (!isValid) return;

    isSubmitting.value = true;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Submitting form data:", formData);
      isSubmitted.value = true;
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      isSubmitting.value = false;
    }
  });

  const resetForm$ = $(() => {
    Object.assign(formData, {
      productRating: 0,
      serviceRating: 0,
      overallSatisfaction: 0,
      recommendationScore: 0,
      comments: "",
    });
    Object.assign(errors, {});
    isSubmitted.value = false;
  });

  if (isSubmitted.value) {
    return (
      <div class="mx-auto max-w-md p-6">
        <div class="space-y-4 text-center">
          <div class="text-6xl text-green-600">✓</div>
          <h2 class="text-2xl font-bold text-green-800">Thank You!</h2>
          <p class="text-gray-600">
            Your feedback has been submitted successfully.
          </p>
          <button
            onClick$={resetForm$}
            class="rounded-lg bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
          >
            Submit Another Review
          </button>
        </div>
      </div>
    );
  }

  return (
    <div class="mx-auto max-w-md p-6">
      <div class="mb-6">
        <h2 class="mb-2 text-2xl font-bold">Customer Feedback</h2>
        <p class="text-gray-600">
          Help us improve by rating your experience with our service.
        </p>
      </div>

      <form onSubmit$={handleSubmit$} class="space-y-6">
        {/* Product Rating */}
        <div>
          <Rating
            name="productRating"
            value={formData.productRating}
            onValueChange$={(value) => {
              formData.productRating = value || 0;
              delete errors.productRating;
            }}
            label="Product Quality"
            error={errors.productRating}
            required
            labels={["Poor", "Fair", "Good", "Very Good", "Excellent"]}
            helperText="How would you rate the quality of our product?"
          />
        </div>

        {/* Service Rating */}
        <div>
          <Rating
            name="serviceRating"
            value={formData.serviceRating}
            precision={0.5}
            onValueChange$={(value) => {
              formData.serviceRating = value || 0;
              delete errors.serviceRating;
            }}
            label="Customer Service"
            error={errors.serviceRating}
            required
            showValue
            helperText="Rate our customer service (half stars allowed)"
          />
        </div>

        {/* Overall Satisfaction */}
        <div>
          <Rating
            name="overallSatisfaction"
            value={formData.overallSatisfaction}
            onValueChange$={(value) => {
              formData.overallSatisfaction = value || 0;
              delete errors.overallSatisfaction;
            }}
            label="Overall Satisfaction"
            error={errors.overallSatisfaction}
            required
            allowClear
            successMessage={
              formData.overallSatisfaction >= 4
                ? "Thank you for the positive feedback!"
                : undefined
            }
            warningMessage={
              formData.overallSatisfaction > 0 &&
              formData.overallSatisfaction < 3
                ? "We're sorry to hear about your experience"
                : undefined
            }
          />
        </div>

        {/* Recommendation Score (NPS style) */}
        <div>
          <Rating
            name="recommendationScore"
            value={formData.recommendationScore}
            max={10}
            onValueChange$={(value) => {
              formData.recommendationScore = value || 0;
              // Clear comments error if score is high enough
              if ((value || 0) >= 7 && errors.comments) {
                delete errors.comments;
              }
            }}
            label="Recommendation Likelihood"
            showValue
            helperText="How likely are you to recommend us to a friend? (0-10)"
            class={
              formData.recommendationScore >= 9
                ? "text-green-500"
                : formData.recommendationScore >= 7
                  ? "text-yellow-500"
                  : formData.recommendationScore > 0
                    ? "text-red-500"
                    : ""
            }
          />
        </div>

        {/* Comments (conditional) */}
        {formData.recommendationScore > 0 &&
          formData.recommendationScore < 7 && (
            <div>
              <label class="mb-2 block text-sm font-medium">
                Comments
                <span class="ml-1 text-red-500">*</span>
              </label>
              <textarea
                value={formData.comments}
                onInput$={(e) => {
                  formData.comments = (e.target as HTMLTextAreaElement).value;
                  delete errors.comments;
                }}
                placeholder="Please tell us how we can improve..."
                rows={4}
                class={`w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
                  errors.comments ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.comments && (
                <p class="mt-1 text-sm text-red-500">{errors.comments}</p>
              )}
            </div>
          )}

        {/* Submit Button */}
        <div class="pt-4">
          <button
            type="submit"
            disabled={isSubmitting.value}
            class={`w-full rounded-lg px-4 py-3 font-medium transition-colors ${
              isSubmitting.value
                ? "cursor-not-allowed bg-gray-400"
                : "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            } text-white`}
          >
            {isSubmitting.value ? (
              <span class="flex items-center justify-center gap-2">
                <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                    fill="none"
                  />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Feedback"
            )}
          </button>
        </div>
      </form>

      {/* Summary */}
      <div class="mt-8 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
        <h3 class="mb-2 font-medium">Current Ratings:</h3>
        <div class="space-y-1 text-sm">
          <div>Product: {formData.productRating}/5</div>
          <div>Service: {formData.serviceRating}/5</div>
          <div>Overall: {formData.overallSatisfaction}/5</div>
          <div>Recommend: {formData.recommendationScore}/10</div>
        </div>
      </div>
    </div>
  );
});
