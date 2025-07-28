import { component$, useSignal, useStore, $, type QRL } from "@builder.io/qwik";
import { Rating } from "../Rating";

/**
 * ValidationRating Example
 * 
 * Demonstrates advanced validation scenarios with real-time feedback:
 * - Required field validation with custom messages
 * - Conditional validation based on rating value
 * - Real-time validation feedback
 * - Form integration with validation states
 * - Custom validation rules and logic
 * - Multi-field validation dependencies
 * - Async validation scenarios
 */
export const ValidationRatingExample = component$(() => {
  const basicRating = useSignal(0);
  const conditionalRating = useSignal(0);
  const formRating = useSignal(0);
  const asyncRating = useSignal(0);
  const dependentRating1 = useSignal(0);
  const dependentRating2 = useSignal(0);
  const customRuleRating = useSignal(0);

  return (
    <div class="space-y-8 p-6">
      <div class="mb-6">
        <h2 class="text-2xl font-bold">Validation Rating Examples</h2>
        <p class="text-gray-600">
          Advanced validation scenarios with real-time feedback and custom validation rules.
        </p>
      </div>

      {/* Basic Required Validation */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Basic Required Validation</h3>
        <p class="text-sm text-gray-600">
          Simple required field validation with immediate feedback.
        </p>
        
        <div class="grid gap-6 lg:grid-cols-2">
          <div class="space-y-3">
            <Rating
              value={basicRating.value}
              onValueChange$={(value) => {
                basicRating.value = value || 0;
              }}
              label="Rate this product (Required)"
              required
              error={basicRating.value === 0 ? "Please provide a rating" : undefined}
              successMessage={basicRating.value > 0 ? "Thank you for your rating!" : undefined}
              size="lg"
              showValue
              helperText="This field is required for submission"
            />
          </div>
          
          <div class="space-y-3">
            <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
              <h4 class="mb-2 font-medium text-sm">Validation State</h4>
              <div class="space-y-1 text-sm">
                <div>Value: <span class="font-mono">{basicRating.value}</span></div>
                <div>Required: <span class="font-mono">true</span></div>
                <div>Valid: <span class={basicRating.value > 0 ? "text-green-600" : "text-red-600"}>
                  {basicRating.value > 0 ? "✅ Yes" : "❌ No"}
                </span></div>
                <div>Message: <span class="italic">
                  {basicRating.value === 0 ? "Please provide a rating" : "Thank you for your rating!"}
                </span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conditional Validation */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Conditional Validation Rules</h3>
        <p class="text-sm text-gray-600">
          Validation rules that change based on the rating value with contextual feedback.
        </p>
        
        <ConditionalValidationDemo value={conditionalRating} />
      </div>

      {/* Form Integration Validation */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Form Integration Validation</h3>
        <p class="text-sm text-gray-600">
          Rating validation within a form context with submit handling.
        </p>
        
        <FormValidationDemo value={formRating} />
      </div>

      {/* Async Validation */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Asynchronous Validation</h3>
        <p class="text-sm text-gray-600">
          Simulated server-side validation with loading states and delayed feedback.
        </p>
        
        <AsyncValidationDemo value={asyncRating} />
      </div>

      {/* Dependent Field Validation */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Dependent Field Validation</h3>
        <p class="text-sm text-gray-600">
          Validation that depends on multiple rating fields with cross-field rules.
        </p>
        
        <DependentValidationDemo 
          rating1={dependentRating1} 
          rating2={dependentRating2} 
        />
      </div>

      {/* Custom Validation Rules */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Custom Validation Rules</h3>
        <p class="text-sm text-gray-600">
          Complex business logic validation with custom rules and messages.
        </p>
        
        <CustomRuleValidationDemo value={customRuleRating} />
      </div>

      {/* Real-time Validation Feedback */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Real-time Validation Feedback</h3>
        <RealTimeValidationDemo />
      </div>

      {/* Validation Best Practices */}
      <div class="mt-8 rounded-lg bg-green-50 p-6 dark:bg-green-900/20">
        <h3 class="mb-4 text-lg font-semibold text-green-800 dark:text-green-200">
          Validation Best Practices
        </h3>
        <div class="space-y-3 text-sm text-green-700 dark:text-green-300">
          <div>
            <strong>Immediate Feedback:</strong> Provide validation feedback as soon as 
            the user interacts with the rating, not just on form submission.
          </div>
          <div>
            <strong>Clear Messages:</strong> Use specific, actionable error messages 
            that tell users exactly what they need to do.
          </div>
          <div>
            <strong>Progressive Enhancement:</strong> Start with basic HTML validation 
            and enhance with JavaScript for better UX.
          </div>
          <div>
            <strong>Success Feedback:</strong> Show positive feedback when validation 
            passes to confirm the user's action was successful.
          </div>
          <div>
            <strong>Accessibility:</strong> Ensure validation messages are announced 
            to screen readers and linked to the form field.
          </div>
          <div>
            <strong>Contextual Help:</strong> Provide helper text that explains 
            validation requirements before users encounter errors.
          </div>
        </div>
      </div>

      {/* Validation Testing Suite */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Validation Testing Suite</h3>
        <ValidationTestingSuite />
      </div>
    </div>
  );
});

/* ===============================
   VALIDATION DEMO COMPONENTS
   =============================== */

/**
 * Conditional Validation Demo Component
 * Shows validation rules that change based on rating value
 */
const ConditionalValidationDemo = component$<{ value: any }>(({ value }) => {
  const rating = useSignal(0);
  const validationMode = useSignal<"lenient" | "standard" | "strict">("standard");

  const getValidationMessage = (): { type: "error" | "warning" | "success"; message: string } | null => {
    if (rating.value === 0) {
      return { type: "error", message: "Please provide a rating to continue" };
    }

    switch (validationMode.value) {
      case "lenient":
        if (rating.value >= 1) {
          return { type: "success", message: "Thank you for your feedback!" };
        }
        break;
      
      case "standard":
        if (rating.value < 2) {
          return { type: "warning", message: "Low ratings require additional feedback" };
        }
        if (rating.value >= 3) {
          return { type: "success", message: "Great! Thanks for the positive rating" };
        }
        break;
      
      case "strict":
        if (rating.value < 3) {
          return { type: "error", message: "Rating must be at least 3 stars for this survey" };
        }
        if (rating.value >= 4) {
          return { type: "success", message: "Excellent! High-quality feedback received" };
        }
        break;
    }

    return null;
  };

  const validation = getValidationMessage();

  return (
    <div class="grid gap-6 lg:grid-cols-2">
      <div class="space-y-4">
        <div>
          <label class="mb-2 block text-sm font-medium">Validation Mode</label>
          <div class="space-y-2">
            {[
              { value: "lenient", label: "Lenient (Any rating accepted)" },
              { value: "standard", label: "Standard (Warnings for low ratings)" },
              { value: "strict", label: "Strict (Minimum 3 stars required)" },
            ].map((mode) => (
              <label key={mode.value} class="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="validation-mode"
                  value={mode.value}
                  checked={validationMode.value === mode.value}
                  onChange$={() => {
                    validationMode.value = mode.value as typeof validationMode.value;
                  }}
                />
                {mode.label}
              </label>
            ))}
          </div>
        </div>

        <Rating
          value={rating.value}
          onValueChange$={(val) => {
            rating.value = val || 0;
            value.value = val || 0;
          }}
          label="Conditional validation rating"
          error={validation?.type === "error" ? validation.message : undefined}
          warningMessage={validation?.type === "warning" ? validation.message : undefined}
          successMessage={validation?.type === "success" ? validation.message : undefined}
          size="lg"
          showValue
          precision={0.5}
        />
      </div>

      <div class="space-y-4">
        <h4 class="font-medium">Validation Logic</h4>
        <div class="rounded-lg bg-gray-50 p-4 text-sm dark:bg-gray-800">
          <div class="space-y-2">
            <div><strong>Mode:</strong> {validationMode.value}</div>
            <div><strong>Current Rating:</strong> {rating.value}/5</div>
            <div><strong>Validation Status:</strong></div>
            <div class="ml-4 space-y-1">
              {validationMode.value === "lenient" && (
                <>
                  <div>• Any rating ≥ 1: ✅ Success</div>
                  <div>• No rating: ❌ Error</div>
                </>
              )}
              {validationMode.value === "standard" && (
                <>
                  <div>• Rating &lt; 2: ⚠️ Warning</div>
                  <div>• Rating ≥ 3: ✅ Success</div>
                  <div>• No rating: ❌ Error</div>
                </>
              )}
              {validationMode.value === "strict" && (
                <>
                  <div>• Rating &lt; 3: ❌ Error</div>
                  <div>• Rating ≥ 4: ✅ Success</div>
                  <div>• Rating 3: ℹ️ Acceptable</div>
                </>
              )}
            </div>
            <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
              <strong>Current Result:</strong>
              <div class={`mt-1 ${
                validation?.type === "error" ? "text-red-600" :
                validation?.type === "warning" ? "text-yellow-600" :
                validation?.type === "success" ? "text-green-600" : "text-gray-600"
              }`}>
                {validation ? `${validation.type.toUpperCase()}: ${validation.message}` : "No validation message"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

/**
 * Form Validation Demo Component
 * Shows rating validation within a form context
 */
const FormValidationDemo = component$<{ value: any }>(({ value }) => {
  const formData = useStore({
    overall: 0,
    quality: 0,
    service: 0,
    recommendation: 0,
    submitted: false,
    errors: {} as Record<string, string>
  });

  const validateForm$ = $(() => {
    const errors: Record<string, string> = {};
    
    if (formData.overall === 0) {
      errors.overall = "Overall rating is required";
    }
    
    if (formData.quality === 0) {
      errors.quality = "Quality rating is required";
    }
    
    if (formData.service === 0) {
      errors.service = "Service rating is required";
    }
    
    if (formData.recommendation === 0) {
      errors.recommendation = "Recommendation rating is required";
    }
    
    // Business rule: Overall rating can't be much higher than component ratings
    if (formData.overall > 0 && formData.quality > 0 && formData.service > 0) {
      const avgComponent = (formData.quality + formData.service) / 2;
      if (formData.overall > avgComponent + 1) {
        errors.overall = "Overall rating seems inconsistent with component ratings";
      }
    }
    
    formData.errors = errors;
    return Object.keys(errors).length === 0;
  });

  const handleSubmit$ = $(async (event: Event) => {
    event.preventDefault();
    
    if (await validateForm$()) {
      formData.submitted = true;
      // Simulate form submission
      setTimeout(() => {
        formData.submitted = false;
      }, 3000);
    }
  });

  return (
    <form 
      onSubmit$={handleSubmit$} 
      class="space-y-6 rounded-lg border border-gray-200 p-6 dark:border-gray-700"
    >
      <h4 class="font-medium">Product Review Form</h4>
      
      <div class="grid gap-6 md:grid-cols-2">
        <div class="space-y-6">
          <Rating
            value={formData.overall}
            onValueChange$={(val) => { 
              formData.overall = val || 0; 
              value.value = val || 0; 
            }}
            label="Overall Rating"
            required
            error={formData.errors.overall}
            size="md"
            showValue
            precision={0.5}
          />

          <Rating
            value={formData.quality}
            onValueChange$={(val) => { formData.quality = val || 0; }}
            label="Product Quality"
            required
            error={formData.errors.quality}
            size="md"
            showValue
            precision={0.5}
          />
        </div>

        <div class="space-y-6">
          <Rating
            value={formData.service}
            onValueChange$={(val) => { formData.service = val || 0; }}
            label="Customer Service"
            required
            error={formData.errors.service}
            size="md"
            showValue
            precision={0.5}
          />

          <Rating
            value={formData.recommendation}
            onValueChange$={(val) => { formData.recommendation = val || 0; }}
            label="Would Recommend"
            required
            error={formData.errors.recommendation}
            size="md"
            showValue
            precision={0.5}
            labels={["Never", "Unlikely", "Maybe", "Likely", "Definitely"]}
          />
        </div>
      </div>

      <div class="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
        <div class="text-sm text-gray-600">
          {Object.keys(formData.errors).length > 0 && (
            <span class="text-red-600">
              {Object.keys(formData.errors).length} validation error(s)
            </span>
          )}
          {Object.keys(formData.errors).length === 0 && formData.overall > 0 && (
            <span class="text-green-600">All fields valid ✓</span>
          )}
        </div>
        
        <button
          type="submit"
          disabled={formData.submitted}
          class={`rounded px-4 py-2 text-sm font-medium transition-colors ${
            formData.submitted
              ? "bg-green-500 text-white"
              : Object.keys(formData.errors).length === 0 && formData.overall > 0
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {formData.submitted ? "Submitted ✓" : "Submit Review"}
        </button>
      </div>

      {formData.submitted && (
        <div class="rounded-lg bg-green-50 p-4 text-green-800 dark:bg-green-900/20 dark:text-green-200">
          <div class="font-medium">Review Submitted Successfully!</div>
          <div class="text-sm mt-1">
            Overall: {formData.overall}★ | Quality: {formData.quality}★ | 
            Service: {formData.service}★ | Recommendation: {formData.recommendation}★
          </div>
        </div>
      )}
    </form>
  );
});

/**
 * Async Validation Demo Component
 * Simulates server-side validation with loading states
 */
const AsyncValidationDemo = component$<{ value: any }>(({ value }) => {
  const rating = useSignal(0);
  const isValidating = useSignal(false);
  const validationResult = useSignal<{ type: "error" | "success"; message: string } | null>(null);

  const performAsyncValidation$ = $(async (newRating: number) => {
    if (newRating === 0) {
      validationResult.value = null;
      return;
    }

    isValidating.value = true;
    validationResult.value = null;

    // Simulate server validation delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate server validation logic
    if (newRating <= 2) {
      validationResult.value = {
        type: "error",
        message: "Server validation: Low ratings require manager approval"
      };
    } else {
      validationResult.value = {
        type: "success",
        message: "Server validation: Rating approved and saved"
      };
    }

    isValidating.value = false;
  });

  return (
    <div class="grid gap-6 lg:grid-cols-2">
      <div class="space-y-4">
        <Rating
          value={rating.value}
          onValueChange$={async (val) => {
            rating.value = val || 0;
            value.value = val || 0;
            await performAsyncValidation$(val || 0);
          }}
          label="Rating with server validation"
          error={validationResult.value?.type === "error" ? validationResult.value.message : undefined}
          successMessage={validationResult.value?.type === "success" ? validationResult.value.message : undefined}
          size="lg"
          showValue
          precision={0.5}
          helperText="Rating will be validated on the server"
        />

        {isValidating.value && (
          <div class="flex items-center gap-2 text-sm text-blue-600">
            <div class="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
            Validating rating on server...
          </div>
        )}
      </div>

      <div class="space-y-4">
        <h4 class="font-medium">Async Validation Status</h4>
        <div class="rounded-lg bg-gray-50 p-4 text-sm dark:bg-gray-800">
          <div class="space-y-2">
            <div><strong>Current Rating:</strong> {rating.value}/5</div>
            <div><strong>Validation State:</strong> {
              isValidating.value ? "🔄 Validating..." :
              validationResult.value ? "✅ Complete" : "⏳ Pending"
            }</div>
            <div><strong>Server Response:</strong></div>
            <div class="ml-4 mt-2 p-2 rounded bg-gray-100 dark:bg-gray-700">
              {isValidating.value ? (
                <span class="text-blue-600">Checking with server...</span>
              ) : validationResult.value ? (
                <span class={validationResult.value.type === "error" ? "text-red-600" : "text-green-600"}>
                  {validationResult.value.message}
                </span>
              ) : (
                <span class="text-gray-500">No validation performed yet</span>
              )}
            </div>
          </div>
        </div>

        <div class="text-xs text-gray-600">
          <strong>Simulation Details:</strong>
          <div>• 1.5 second delay to simulate network request</div>
          <div>• Ratings ≤ 2 trigger server validation error</div>
          <div>• Ratings &gt; 2 pass server validation</div>
        </div>
      </div>
    </div>
  );
});

/**
 * Dependent Validation Demo Component
 * Shows validation that depends on multiple fields
 */
const DependentValidationDemo = component$<{ 
  rating1: any; 
  rating2: any; 
}>(({ rating1, rating2 }) => {
  const primaryRating = useSignal(0);
  const secondaryRating = useSignal(0);

  const getDependentValidation = () => {
    if (primaryRating.value === 0 && secondaryRating.value === 0) {
      return { primary: null, secondary: null };
    }

    const messages = { primary: null as string | null, secondary: null as string | null };

    // Rule 1: Secondary rating should not be much higher than primary
    if (primaryRating.value > 0 && secondaryRating.value > primaryRating.value + 1.5) {
      messages.secondary = "Secondary rating seems too high compared to primary rating";
    }

    // Rule 2: If primary is very low, secondary should be explained
    if (primaryRating.value > 0 && primaryRating.value <= 2 && secondaryRating.value === 0) {
      messages.secondary = "Please rate secondary aspect when primary rating is low";
    }

    // Rule 3: Very high ratings should be consistent
    if (primaryRating.value >= 4.5 && secondaryRating.value > 0 && secondaryRating.value < 3) {
      messages.secondary = "Secondary rating seems inconsistent with high primary rating";
    }

    // Rule 4: Both ratings required for submission
    if (primaryRating.value > 0 && secondaryRating.value === 0) {
      messages.secondary = "Secondary rating required when primary rating is provided";
    }
    if (secondaryRating.value > 0 && primaryRating.value === 0) {
      messages.primary = "Primary rating required when secondary rating is provided";
    }

    return messages;
  };

  const validation = getDependentValidation();
  const consistency = primaryRating.value > 0 && secondaryRating.value > 0 
    ? Math.abs(primaryRating.value - secondaryRating.value) <= 1.5 
    : null;

  return (
    <div class="space-y-6">
      <div class="grid gap-6 lg:grid-cols-2">
        <div class="space-y-4">
          <Rating
            value={primaryRating.value}
            onValueChange$={(val) => {
              primaryRating.value = val || 0;
              rating1.value = val || 0;
            }}
            label="Primary Rating (Product Quality)"
            error={validation.primary || undefined}
            size="lg"
            showValue
            precision={0.5}
            required
          />

          <Rating
            value={secondaryRating.value}
            onValueChange$={(val) => {
              secondaryRating.value = val || 0;
              rating2.value = val || 0;
            }}
            label="Secondary Rating (Value for Money)"
            error={validation.secondary || undefined}
            size="lg"
            showValue
            precision={0.5}
            required
          />
        </div>

        <div class="space-y-4">
          <h4 class="font-medium">Cross-Field Validation</h4>
          
          <div class="rounded-lg bg-gray-50 p-4 text-sm dark:bg-gray-800">
            <div class="space-y-3">
              <div>
                <strong>Ratings:</strong>
                <div class="ml-4">
                  <div>Primary: {primaryRating.value}/5</div>
                  <div>Secondary: {secondaryRating.value}/5</div>
                </div>
              </div>
              
              <div>
                <strong>Consistency Check:</strong>
                <div class="ml-4">
                  {consistency === null ? (
                    <span class="text-gray-500">Not applicable</span>
                  ) : consistency ? (
                    <span class="text-green-600">✅ Ratings are consistent</span>
                  ) : (
                    <span class="text-yellow-600">⚠️ Large difference between ratings</span>
                  )}
                </div>
              </div>

              <div>
                <strong>Validation Rules:</strong>
                <div class="ml-4 space-y-1 text-xs">
                  <div>• Secondary ≤ Primary + 1.5</div>
                  <div>• Both required if either is provided</div>
                  <div>• Low primary requires secondary explanation</div>
                  <div>• High ratings should be consistent</div>
                </div>
              </div>

              <div>
                <strong>Current Issues:</strong>
                <div class="ml-4">
                  {!validation.primary && !validation.secondary ? (
                    <span class="text-green-600">No validation errors</span>
                  ) : (
                    <div class="space-y-1 text-red-600">
                      {validation.primary && <div>• {validation.primary}</div>}
                      {validation.secondary && <div>• {validation.secondary}</div>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

/**
 * Custom Rule Validation Demo Component
 * Complex business logic validation
 */
const CustomRuleValidationDemo = component$<{ value: any }>(({ value }) => {
  const rating = useSignal(0);
  const userType = useSignal<"new" | "returning" | "premium">("returning");
  const hasComment = useSignal(false);

  const getCustomValidation = () => {
    if (rating.value === 0) {
      return { type: "error", message: "Rating is required" };
    }

    // Business Rule 1: New users must rate 3+ or provide comment
    if (userType.value === "new" && rating.value < 3 && !hasComment.value) {
      return { 
        type: "error", 
        message: "New users with ratings below 3 stars must provide additional feedback" 
      };
    }

    // Business Rule 2: Premium users can't rate below 2 (data quality)
    if (userType.value === "premium" && rating.value < 2) {
      return { 
        type: "error", 
        message: "Premium users typically provide higher quality ratings. Please reconsider or contact support." 
      };
    }

    // Business Rule 3: Returning users with 1-star need comment
    if (userType.value === "returning" && rating.value === 1 && !hasComment.value) {
      return { 
        type: "warning", 
        message: "Very low ratings from returning users should include explanation" 
      };
    }

    // Success states
    if (rating.value >= 4) {
      return { 
        type: "success", 
        message: `Great ${userType.value} user feedback! Thank you for the high rating.` 
      };
    }

    if (rating.value >= 3) {
      return { 
        type: "success", 
        message: "Good rating received and processed" 
      };
    }

    return null;
  };

  const validation = getCustomValidation();

  return (
    <div class="grid gap-6 lg:grid-cols-2">
      <div class="space-y-4">
        <div>
          <label class="mb-2 block text-sm font-medium">User Type</label>
          <div class="space-y-2">
            {[
              { value: "new", label: "New User", desc: "First-time user" },
              { value: "returning", label: "Returning User", desc: "Has used service before" },
              { value: "premium", label: "Premium User", desc: "Paid subscription user" },
            ].map((type) => (
              <label key={type.value} class="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="user-type"
                  value={type.value}
                  checked={userType.value === type.value}
                  onChange$={() => {
                    userType.value = type.value as typeof userType.value;
                  }}
                />
                <div>
                  <div class="font-medium">{type.label}</div>
                  <div class="text-xs text-gray-600">{type.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label class="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={hasComment.value}
              onChange$={(e) => {
                hasComment.value = (e.target as HTMLInputElement).checked;
              }}
            />
            User provided additional comment
          </label>
        </div>

        <Rating
          value={rating.value}
          onValueChange$={(val) => {
            rating.value = val || 0;
            value.value = val || 0;
          }}
          label="Custom business rule rating"
          error={validation?.type === "error" ? validation.message : undefined}
          warningMessage={validation?.type === "warning" ? validation.message : undefined}
          successMessage={validation?.type === "success" ? validation.message : undefined}
          size="lg"
          showValue
          precision={0.5}
        />
      </div>

      <div class="space-y-4">
        <h4 class="font-medium">Business Rules</h4>
        
        <div class="rounded-lg bg-gray-50 p-4 text-sm dark:bg-gray-800">
          <div class="space-y-3">
            <div>
              <strong>Active Rules for {userType.value} users:</strong>
            </div>
            
            <div class="space-y-2 text-xs">
              {userType.value === "new" && (
                <div class="border-l-2 border-blue-500 pl-2">
                  <strong>New User Rules:</strong>
                  <div>• Ratings below 3★ require additional feedback</div>
                  <div>• All ratings welcome to gather initial feedback</div>
                </div>
              )}
              
              {userType.value === "returning" && (
                <div class="border-l-2 border-green-500 pl-2">
                  <strong>Returning User Rules:</strong>
                  <div>• 1★ ratings should include explanation</div>
                  <div>• Standard validation applies</div>
                </div>
              )}
              
              {userType.value === "premium" && (
                <div class="border-l-2 border-purple-500 pl-2">
                  <strong>Premium User Rules:</strong>
                  <div>• Enhanced data quality standards</div>
                  <div>• Ratings below 2★ require review</div>
                  <div>• Priority feedback processing</div>
                </div>
              )}
            </div>

            <div class="pt-2 border-t border-gray-200 dark:border-gray-600">
              <strong>Current Status:</strong>
              <div class="mt-1">
                <div>User Type: {userType.value}</div>
                <div>Rating: {rating.value}/5</div>
                <div>Has Comment: {hasComment.value ? "Yes" : "No"}</div>
                <div class={`mt-2 font-medium ${
                  validation?.type === "error" ? "text-red-600" :
                  validation?.type === "warning" ? "text-yellow-600" :
                  validation?.type === "success" ? "text-green-600" : "text-gray-600"
                }`}>
                  {validation ? validation.message : "No active validation"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

/**
 * Real-time Validation Feedback Demo Component
 * Shows immediate validation feedback as user interacts
 */
const RealTimeValidationDemo = component$(() => {
  const rating = useSignal(0);
  const interactions = useSignal(0);
  const validationHistory = useSignal<Array<{ timestamp: string; rating: number; message: string; type: string }>>([]);

  const addValidationEntry$ = $((newRating: number, message: string, type: string) => {
    const entry = {
      timestamp: new Date().toLocaleTimeString(),
      rating: newRating,
      message,
      type
    };
    validationHistory.value = [entry, ...validationHistory.value.slice(0, 9)];
  });

  const handleRatingChange$ = $(async (newRating: number | null) => {
    rating.value = newRating || 0;
    interactions.value++;

    let message = "";
    let type = "";

    if (newRating === null || newRating === 0) {
      message = "Rating cleared - validation pending";
      type = "info";
    } else if (newRating <= 1) {
      message = "Very low rating - requires immediate attention";
      type = "error";
    } else if (newRating <= 2) {
      message = "Low rating - consider additional feedback";
      type = "warning";
    } else if (newRating <= 3) {
      message = "Average rating - acceptable";
      type = "neutral";
    } else if (newRating <= 4) {
      message = "Good rating - positive feedback";
      type = "success";
    } else {
      message = "Excellent rating - customer satisfaction achieved";
      type = "success";
    }

    await addValidationEntry$(newRating || 0, message, type);
  });

  const getRealTimeMessage = () => {
    if (rating.value === 0) return null;
    
    if (rating.value <= 1) {
      return { type: "error", message: "Very low rating requires manager escalation" };
    } else if (rating.value <= 2) {
      return { type: "warning", message: "Low rating - customer recovery needed" };
    } else if (rating.value >= 4) {
      return { type: "success", message: "Excellent feedback - customer satisfied!" };
    }
    
    return { type: "info", message: "Standard rating received" };
  };

  const realtimeValidation = getRealTimeMessage();

  return (
    <div class="grid gap-6 lg:grid-cols-2">
      <div class="space-y-4">
        <Rating
          value={rating.value}
          onValueChange$={handleRatingChange$}
          label="Real-time validation rating"
          error={realtimeValidation?.type === "error" ? realtimeValidation.message : undefined}
          warningMessage={realtimeValidation?.type === "warning" ? realtimeValidation.message : undefined}
          successMessage={realtimeValidation?.type === "success" ? realtimeValidation.message : undefined}
          size="lg"
          showValue
          precision={0.5}
          helperText="Validation feedback appears immediately as you interact"
        />

        <div class="rounded-lg bg-blue-50 p-4 text-sm dark:bg-blue-900/20">
          <div class="space-y-2">
            <div><strong>Real-time Metrics:</strong></div>
            <div>Total Interactions: {interactions.value}</div>
            <div>Current Rating: {rating.value}/5</div>
            <div>Validation Status: {realtimeValidation ? realtimeValidation.type : "none"}</div>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h4 class="font-medium">Validation History</h4>
          <button
            onClick$={() => { 
              validationHistory.value = [];
              interactions.value = 0;
            }}
            class="text-xs text-blue-600 hover:text-blue-800"
          >
            Clear History
          </button>
        </div>
        
        <div class="max-h-48 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs dark:border-gray-700 dark:bg-gray-800">
          {validationHistory.value.length === 0 ? (
            <div class="text-gray-500">Start rating to see real-time validation feedback...</div>
          ) : (
            <div class="space-y-2">
              {validationHistory.value.map((entry, index) => (
                <div key={index} class="border-b border-gray-200 pb-2 last:border-b-0 dark:border-gray-600">
                  <div class="flex items-center justify-between">
                    <span class="font-mono text-gray-500">{entry.timestamp}</span>
                    <span class="font-medium">{entry.rating}★</span>
                  </div>
                  <div class={`mt-1 ${
                    entry.type === "error" ? "text-red-600" :
                    entry.type === "warning" ? "text-yellow-600" :
                    entry.type === "success" ? "text-green-600" :
                    "text-blue-600"
                  }`}>
                    {entry.message}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

/**
 * Validation Testing Suite Component
 * Comprehensive testing tool for validation scenarios
 */
const ValidationTestingSuite = component$(() => {
  const testResults = useStore<Record<string, boolean>>({});
  const currentTest = useSignal("required-validation");
  
  const tests = {
    "required-validation": "Required Field Validation",
    "conditional-rules": "Conditional Business Rules",
    "cross-field": "Cross-Field Dependencies",
    "async-validation": "Asynchronous Validation",
    "edge-cases": "Edge Case Handling",
  };

  return (
    <div class="space-y-4">
      <div class="flex flex-wrap gap-2">
        {Object.entries(tests).map(([key, name]) => (
          <button
            key={key}
            onClick$={() => { currentTest.value = key; }}
            class={`rounded px-3 py-1 text-sm transition-colors ${
              currentTest.value === key
                ? "bg-blue-500 text-white"
                : testResults[key] === true
                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200"
                : testResults[key] === false
                ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200"
                : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            }`}
          >
            {name}
            {testResults[key] === true && " ✓"}
            {testResults[key] === false && " ✗"}
          </button>
        ))}
      </div>
      
      <div class="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
        {currentTest.value === "required-validation" && (
          <RequiredValidationTest onResult={$((passed) => { testResults["required-validation"] = passed; })} />
        )}
        {currentTest.value === "conditional-rules" && (
          <ConditionalRulesTest onResult={$((passed) => { testResults["conditional-rules"] = passed; })} />
        )}
        {currentTest.value === "cross-field" && (
          <CrossFieldTest onResult={$((passed) => { testResults["cross-field"] = passed; })} />
        )}
        {currentTest.value === "async-validation" && (
          <AsyncValidationTest onResult={$((passed) => { testResults["async-validation"] = passed; })} />
        )}
        {currentTest.value === "edge-cases" && (
          <EdgeCasesTest onResult={$((passed) => { testResults["edge-cases"] = passed; })} />
        )}
      </div>
    </div>
  );
});

// Individual test components
const RequiredValidationTest = component$<{ onResult: QRL<(passed: boolean) => void> }>(({ onResult }) => {
  const testRating = useSignal(0);
  const testPassed = useSignal<boolean | null>(null);
  

  return (
    <div class="space-y-4">
      <h4 class="font-medium">Required Field Validation Test</h4>
      <p class="text-sm text-gray-600">
        Test that required validation works correctly. Try submitting without a rating, then with a rating.
      </p>
      
      <Rating
        value={testRating.value}
        onValueChange$={(val) => { 
          testRating.value = val || 0;
          if (val && val > 0) {
            testPassed.value = true;
            onResult(true);
          }
        }}
        label="Required test rating"
        required
        error={testRating.value === 0 ? "This field is required" : undefined}
        successMessage={testRating.value > 0 ? "Required validation passed!" : undefined}
        size="md"
        showValue
      />
      
      <div class="text-sm">
        <strong>Test Status:</strong> {
          testPassed.value === null ? "Not started" :
          testPassed.value ? "✅ Passed" : "❌ Failed"
        }
      </div>
    </div>
  );
});

const ConditionalRulesTest = component$<{ onResult: QRL<(passed: boolean) => void> }>(({ onResult }) => {
  const testRating = useSignal(0);
  const testMode = useSignal<"strict" | "lenient">("strict");
  const testsPassed = useSignal(0);
  const totalTests = 2;
  

  const checkTest$ = $(() => {
    let passed = 0;
    
    // Test 1: Strict mode with rating < 3 should show error
    if (testMode.value === "strict" && testRating.value > 0 && testRating.value < 3) {
      passed++;
    }
    
    // Test 2: Lenient mode should accept any rating > 0
    if (testMode.value === "lenient" && testRating.value > 0) {
      passed++;
    }
    
    testsPassed.value = passed;
    onResult(passed === totalTests);
  });

  return (
    <div class="space-y-4">
      <h4 class="font-medium">Conditional Rules Test</h4>
      <p class="text-sm text-gray-600">
        Test conditional validation rules. Switch between modes and try different ratings.
      </p>
      
      <div class="flex gap-4">
        <label class="flex items-center gap-2 text-sm">
          <input
            type="radio"
            name="test-mode"
            checked={testMode.value === "strict"}
            onChange$={() => { 
              testMode.value = "strict"; 
              checkTest$();
            }}
          />
          Strict Mode
        </label>
        <label class="flex items-center gap-2 text-sm">
          <input
            type="radio"
            name="test-mode"
            checked={testMode.value === "lenient"}
            onChange$={() => { 
              testMode.value = "lenient"; 
              checkTest$();
            }}
          />
          Lenient Mode
        </label>
      </div>
      
      <Rating
        value={testRating.value}
        onValueChange$={(val) => { 
          testRating.value = val || 0;
          checkTest$();
        }}
        label="Conditional validation test"
        error={testMode.value === "strict" && testRating.value > 0 && testRating.value < 3 
          ? "Strict mode requires 3+ stars" : undefined}
        successMessage={testRating.value > 0 ? "Conditional validation working!" : undefined}
        size="md"
        showValue
      />
      
      <div class="text-sm">
        <strong>Tests Passed:</strong> {testsPassed.value}/{totalTests}
      </div>
    </div>
  );
});

const CrossFieldTest = component$<{ onResult: QRL<(passed: boolean) => void> }>(({ onResult }) => {
  const rating1 = useSignal(0);
  const rating2 = useSignal(0);
  const testPassed = useSignal(false);
  

  const checkCrossField$ = $(() => {
    // Test passes if both ratings are provided and consistent
    const both_provided = rating1.value > 0 && rating2.value > 0;
    const consistent = Math.abs(rating1.value - rating2.value) <= 1.5;
    const passed = both_provided && consistent;
    
    testPassed.value = passed;
    onResult(passed);
  });

  return (
    <div class="space-y-4">
      <h4 class="font-medium">Cross-Field Validation Test</h4>
      <p class="text-sm text-gray-600">
        Test that ratings validate against each other. Both fields should be filled and consistent.
      </p>
      
      <div class="grid gap-4 md:grid-cols-2">
        <Rating
          value={rating1.value}
          onValueChange$={(val) => { 
            rating1.value = val || 0;
            checkCrossField$();
          }}
          label="Primary rating"
          size="md"
          showValue
        />
        
        <Rating
          value={rating2.value}
          onValueChange$={(val) => { 
            rating2.value = val || 0;
            checkCrossField$();
          }}
          label="Secondary rating"
          size="md"
          showValue
        />
      </div>
      
      <div class="text-sm">
        <strong>Test Status:</strong> {testPassed.value ? "✅ Passed" : "❌ Failed"}
        <div class="text-xs text-gray-600 mt-1">
          Requires both ratings to be provided and within 1.5 stars of each other
        </div>
      </div>
    </div>
  );
});

const AsyncValidationTest = component$<{ onResult: QRL<(passed: boolean) => void> }>(({ onResult }) => {
  const testRating = useSignal(0);
  const isValidating = useSignal(false);
  const testPassed = useSignal(false);
  

  const performAsyncTest$ = $(async (rating: number) => {
    if (rating === 0) return;
    
    isValidating.value = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    isValidating.value = false;
    
    testPassed.value = true;
    onResult(true);
  });

  return (
    <div class="space-y-4">
      <h4 class="font-medium">Async Validation Test</h4>
      <p class="text-sm text-gray-600">
        Test asynchronous validation with loading states. Rate something to trigger async validation.
      </p>
      
      <Rating
        value={testRating.value}
        onValueChange$={(val) => {
          testRating.value = val || 0;
          performAsyncTest$(val || 0);
        }}
        label="Async validation test"
        size="md"
        showValue
      />
      
      {isValidating.value && (
        <div class="flex items-center gap-2 text-sm text-blue-600">
          <div class="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
          Async validation in progress...
        </div>
      )}
      
      <div class="text-sm">
        <strong>Test Status:</strong> {
          isValidating.value ? "🔄 Running..." :
          testPassed.value ? "✅ Passed" : "❌ Not started"
        }
      </div>
    </div>
  );
});

const EdgeCasesTest = component$<{ onResult: QRL<(passed: boolean) => void> }>(({ onResult }) => {
  const edgeCases = useStore({
    zeroRating: false,
    maxRating: false,
    rapidChanges: false,
    clearRating: false
  });

  const testRating = useSignal(0);
  const changeCount = useSignal(0);
  

  const checkEdgeCases$ = $(() => {
    const allPassed = Object.values(edgeCases).every(v => v);
    onResult(allPassed);
  });

  return (
    <div class="space-y-4">
      <h4 class="font-medium">Edge Cases Test</h4>
      <p class="text-sm text-gray-600">
        Test edge cases: rate 0, rate max (5), make rapid changes, clear rating.
      </p>
      
      <Rating
        value={testRating.value}
        onValueChange$={(val) => {
          const newRating = val || 0;
          testRating.value = newRating;
          changeCount.value++;
          
          // Check edge cases
          if (newRating === 0) edgeCases.zeroRating = true;
          if (newRating === 5) edgeCases.maxRating = true;
          if (changeCount.value >= 5) edgeCases.rapidChanges = true;
          if (val === null) edgeCases.clearRating = true;
          
          checkEdgeCases$();
        }}
        label="Edge case test rating"
        allowClear
        size="md"
        showValue
      />
      
      <div class="grid grid-cols-2 gap-2 text-sm">
        <div class={edgeCases.zeroRating ? "text-green-600" : "text-gray-600"}>
          {edgeCases.zeroRating ? "✅" : "◯"} Zero rating
        </div>
        <div class={edgeCases.maxRating ? "text-green-600" : "text-gray-600"}>
          {edgeCases.maxRating ? "✅" : "◯"} Max rating (5)
        </div>
        <div class={edgeCases.rapidChanges ? "text-green-600" : "text-gray-600"}>
          {edgeCases.rapidChanges ? "✅" : "◯"} Rapid changes ({changeCount.value}/5)
        </div>
        <div class={edgeCases.clearRating ? "text-green-600" : "text-gray-600"}>
          {edgeCases.clearRating ? "✅" : "◯"} Clear rating
        </div>
      </div>
    </div>
  );
});