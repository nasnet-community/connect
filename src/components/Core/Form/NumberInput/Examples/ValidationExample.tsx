import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { NumberInput } from "../NumberInput";

/**
 * Validation Example
 * 
 * Demonstrates real-time validation, form integration, and error handling
 * patterns for NumberInput components with comprehensive validation rules.
 */

export default component$(() => {
  // Form state with various fields requiring validation
  const formData = useStore({
    age: undefined as number | undefined,
    salary: undefined as number | undefined,
    experience: undefined as number | undefined,
    score: undefined as number | undefined,
    discount: undefined as number | undefined,
  });

  const errors = useStore({
    age: "",
    salary: "",
    experience: "",
    score: "",
    discount: "",
  });

  const touchedFields = useStore({
    age: false,
    salary: false,
    experience: false,
    score: false,
    discount: false,
  });

  // Additional example values
  const temperatureValue = useSignal(25);
  const evenNumberValue = useSignal(2);

  // Validation functions
  const validateAge = $((value: number | undefined) => {
    if (!value && touchedFields.age) {
      errors.age = "Age is required";
    } else if (value && value < 18) {
      errors.age = "Must be at least 18 years old";
    } else if (value && value > 120) {
      errors.age = "Please enter a valid age";
    } else {
      errors.age = "";
    }
  });

  const validateSalary = $((value: number | undefined) => {
    if (value && value < 1000) {
      errors.salary = "Salary seems too low for this position";
    } else if (value && value > 1000000) {
      errors.salary = "Please verify this salary amount";
    } else {
      errors.salary = "";
    }
  });

  const validateExperience = $((value: number | undefined) => {
    if (value && formData.age && value > (formData.age - 16)) {
      errors.experience = "Experience cannot exceed working years";
    } else if (value && value < 0) {
      errors.experience = "Experience cannot be negative";
    } else {
      errors.experience = "";
    }
  });

  const validateScore = $((value: number | undefined) => {
    if (!value && touchedFields.score) {
      errors.score = "Score is required";
    } else if (value && (value < 0 || value > 100)) {
      errors.score = "Score must be between 0 and 100";
    } else {
      errors.score = "";
    }
  });

  const validateDiscount = $((value: number | undefined) => {
    if (value && value > 50) {
      errors.discount = "Maximum discount is 50%";
    } else if (value && value < 0) {
      errors.discount = "Discount cannot be negative";
    } else {
      errors.discount = "";
    }
  });

  // Form submission handler
  const handleSubmit = $((event: Event) => {
    event.preventDefault();
    
    // Mark all fields as touched
    touchedFields.age = true;
    touchedFields.salary = true;
    touchedFields.experience = true;
    touchedFields.score = true;
    touchedFields.discount = true;

    // Validate all fields
    validateAge(formData.age);
    validateSalary(formData.salary);
    validateExperience(formData.experience);
    validateScore(formData.score);
    validateDiscount(formData.discount);

    // Check if form is valid
    const hasErrors = Object.values(errors).some(error => error !== "");
    
    if (!hasErrors && formData.age && formData.score !== undefined) {
      alert("Form submitted successfully!");
      console.log("Form data:", formData);
    }
  });

  // Helper to check if form is valid
  const isFormValid = () => {
    return formData.age && 
           formData.score !== undefined && 
           Object.values(errors).every(error => error === "");
  };

  return (
    <div class="space-y-8 p-6">
      <div class="mb-6">
        <h2 class="mb-2 text-2xl font-bold text-text-default dark:text-text-dark-default">
          NumberInput Validation Examples
        </h2>
        <p class="text-text-secondary dark:text-text-dark-secondary">
          Real-time validation, error handling, and form integration patterns for robust user experiences.
        </p>
      </div>

      {/* Main Form Example */}
      <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
        <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
          Job Application Form
        </h3>
        <p class="mb-6 text-sm text-text-secondary dark:text-text-dark-secondary">
          Form with interdependent validation rules and real-time feedback.
        </p>

        <form preventdefault:submit onSubmit$={handleSubmit} class="space-y-6">
          <div class="grid gap-6 md:grid-cols-2">
            {/* Age Field - Required with validation */}
            <NumberInput
              label="Age *"
              value={formData.age}
              min={18}
              max={120}
              step={1}
              required={true}
              error={errors.age}
              onValueChange$={(value) => {
                formData.age = value;
                touchedFields.age = true;
                validateAge(value);
                // Re-validate experience when age changes
                validateExperience(formData.experience);
              }}
              placeholder="Enter your age"
              helperText="Must be between 18 and 120"
              size="lg"
            />

            {/* Experience Field - Dependent on age */}
            <NumberInput
              label="Years of Experience"
              value={formData.experience}
              min={0}
              max={50}
              step={1}
              error={errors.experience}
              onValueChange$={(value) => {
                formData.experience = value;
                touchedFields.experience = true;
                validateExperience(value);
              }}
              placeholder="Years of experience"
              helperText={formData.age ? `Max: ${formData.age - 16} years` : "Based on your age"}
              size="lg"
            />

            {/* Salary Field - Optional with warnings */}
            <NumberInput
              label="Expected Salary (Annual)"
              value={formData.salary}
              min={0}
              max={2000000}
              step={1000}
              precision={0}
              formatValue$={(value) => {
                return new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(value);
              }}
              parseValue$={(value) => {
                const cleaned = value.replace(/[^0-9]/g, '');
                return parseInt(cleaned) || 0;
              }}
              error={errors.salary}
              onValueChange$={(value) => {
                formData.salary = value;
                touchedFields.salary = true;
                validateSalary(value);
              }}
              placeholder="$0"
              helperText="Optional - for HR purposes"
              size="lg"
            />

            {/* Score Field - Required percentage */}
            <NumberInput
              label="Assessment Score *"
              value={formData.score}
              min={0}
              max={100}
              step={0.1}
              precision={1}
              formatValue$={(value) => `${value.toFixed(1)}%`}
              parseValue$={(value) => parseFloat(value.replace('%', '')) || 0}
              required={true}
              error={errors.score}
              onValueChange$={(value) => {
                formData.score = value;
                touchedFields.score = true;
                validateScore(value);
              }}
              placeholder="0.0%"
              helperText="Your assessment test score"
              size="lg"
            />
          </div>

          {/* Discount Field - Conditional validation */}
          <div class="max-w-md">
            <NumberInput
              label="Employee Referral Discount"
              value={formData.discount}
              min={0}
              max={50}
              step={0.5}
              precision={1}
              formatValue$={(value) => `${value.toFixed(1)}%`}
              parseValue$={(value) => parseFloat(value.replace('%', '')) || 0}
              error={errors.discount}
              onValueChange$={(value) => {
                formData.discount = value;
                touchedFields.discount = true;
                validateDiscount(value);
              }}
              placeholder="0.0%"
              helperText="If referred by an employee"
              size="lg"
            />
          </div>

          {/* Form Summary */}
          <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
            <h4 class="mb-2 text-sm font-medium text-text-default dark:text-text-dark-default">
              Form Summary:
            </h4>
            <div class="grid gap-2 text-xs text-text-secondary dark:text-text-dark-secondary">
              <div>Age: {formData.age || "Not provided"}</div>
              <div>Experience: {formData.experience || "Not provided"} years</div>
              <div>Salary: {formData.salary ? `$${formData.salary.toLocaleString()}` : "Not provided"}</div>
              <div>Score: {formData.score !== undefined ? `${formData.score}%` : "Not provided"}</div>
              <div>Discount: {formData.discount || 0}%</div>
            </div>
          </div>

          {/* Submit Button */}
          <div class="flex items-center justify-between">
            <div class="text-sm text-text-secondary dark:text-text-dark-secondary">
              Fields marked with * are required
            </div>
            <button
              type="submit"
              disabled={!isFormValid()}
              class={[
                "rounded-md px-4 py-2 font-medium transition-colors",
                isFormValid()
                  ? "bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
                  : "bg-surface-light-quaternary text-text-tertiary cursor-not-allowed dark:bg-surface-dark-quaternary dark:text-text-dark-tertiary"
              ]}
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>

      {/* Real-time Validation Demo */}
      <div class="space-y-4">
        <h3 class="text-lg font-medium text-text-default dark:text-text-dark-default">
          Real-time Validation Patterns
        </h3>
        
        <div class="grid gap-4 md:grid-cols-2">
          {/* Range Validation */}
          <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4">
            <h4 class="mb-3 text-sm font-medium text-text-default dark:text-text-dark-default">
              Range Validation
            </h4>
            <NumberInput
              label="Temperature (°C)"
              value={temperatureValue.value}
              min={-50}
              max={50}
              step={0.1}
              precision={1}
              onValueChange$={(value) => {
                // Real-time validation as user types
                temperatureValue.value = value || 25;
              }}
              error={
                temperatureValue.value < -50 
                  ? "Too cold! Minimum is -50°C" 
                  : temperatureValue.value > 50 
                    ? "Too hot! Maximum is 50°C" 
                    : ""
              }
              placeholder="25.0"
              helperText="Valid range: -50°C to 50°C"
              clampValueOnBlur={true}
            />
          </div>

          {/* Pattern Validation */}
          <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4">
            <h4 class="mb-3 text-sm font-medium text-text-default dark:text-text-dark-default">
              Custom Validation
            </h4>
            <NumberInput
              label="Even Numbers Only"
              value={evenNumberValue.value}
              min={0}
              max={100}
              step={2}
              onValueChange$={(value) => {
                evenNumberValue.value = value || 2;
              }}
              error={
                evenNumberValue.value % 2 !== 0 
                  ? "Please enter an even number" 
                  : ""
              }
              placeholder="2"
              helperText="Only even numbers allowed"
            />
          </div>
        </div>
      </div>

      {/* Implementation Guide */}
      <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
        <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
          Validation Best Practices
        </h3>
        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <h4 class="mb-3 text-sm font-medium text-text-default dark:text-text-dark-default">
              ✅ Do:
            </h4>
            <ul class="space-y-2 text-sm text-text-secondary dark:text-text-dark-secondary">
              <li>• Validate on value change for immediate feedback</li>
              <li>• Use clampValueOnBlur for out-of-range auto-correction</li>
              <li>• Provide helpful error messages with guidance</li>
              <li>• Show validation state clearly with colors</li>
              <li>• Implement interdependent field validation</li>
              <li>• Mark required fields clearly</li>
            </ul>
          </div>
          <div>
            <h4 class="mb-3 text-sm font-medium text-text-default dark:text-text-dark-default">
              ❌ Don't:
            </h4>
            <ul class="space-y-2 text-sm text-text-secondary dark:text-text-dark-secondary">
              <li>• Show errors before user interaction</li>
              <li>• Use generic "invalid input" messages</li>
              <li>• Validate only on form submission</li>
              <li>• Ignore edge cases (NaN, Infinity)</li>
              <li>• Make error messages too technical</li>
              <li>• Prevent user from typing invalid values</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});