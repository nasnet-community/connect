import { component$, useStore, $, useSignal } from "@builder.io/qwik";
import { Autocomplete } from "../Autocomplete";
import type { AutocompleteOption } from "../Autocomplete.types";

/**
 * Form Integration Example
 * 
 * Demonstrates how to integrate Autocomplete with form validation,
 * submission, and state management in real-world scenarios.
 */

// Mock data for form options
const countries: AutocompleteOption[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "au", label: "Australia" },
];

const industries: AutocompleteOption[] = [
  { value: "tech", label: "Technology" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "retail", label: "Retail" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "consulting", label: "Consulting" },
];

const skills: AutocompleteOption[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "nodejs", label: "Node.js" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "php", label: "PHP" },
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  industry: string;
  primarySkill: string;
  company: string;
}

interface FormErrors {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  industry: string;
  primarySkill: string;
  company: string;
}

export default component$(() => {
  // Form state
  const formData = useStore<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    industry: "",
    primarySkill: "",
    company: "",
  });

  const errors = useStore<FormErrors>({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    industry: "",
    primarySkill: "",
    company: "",
  });

  const formState = useStore({
    isSubmitting: false,
    isSubmitted: false,
    hasErrors: false,
  });

  const companyOptions = useSignal<AutocompleteOption[]>([]);
  const isLoadingCompanies = useSignal(false);

  // Validation functions
  const validateRequired = $((value: string, fieldName: string): string => {
    if (!value || value.trim() === "") {
      return `${fieldName} is required`;
    }
    return "";
  });

  const validateEmail = $((email: string): string => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  });

  const validateField = $(async (field: keyof FormData) => {
    switch (field) {
      case "firstName":
        errors.firstName = await validateRequired(formData.firstName, "First name");
        break;
      case "lastName":
        errors.lastName = await validateRequired(formData.lastName, "Last name");
        break;
      case "email":
        errors.email = await validateEmail(formData.email);
        break;
      case "country":
        errors.country = await validateRequired(formData.country, "Country");
        break;
      case "industry":
        errors.industry = await validateRequired(formData.industry, "Industry");
        break;
      case "primarySkill":
        errors.primarySkill = await validateRequired(formData.primarySkill, "Primary skill");
        break;
      case "company":
        errors.company = await validateRequired(formData.company, "Company");
        break;
    }
  });

  const validateForm = $(async () => {
    await validateField("firstName");
    await validateField("lastName");
    await validateField("email");
    await validateField("country");
    await validateField("industry");
    await validateField("primarySkill");
    await validateField("company");

    const hasErrors = Object.values(errors).some(error => error !== "");
    formState.hasErrors = hasErrors;
    return !hasErrors;
  });

  // Mock company search
  const searchCompanies = $(async (query: string) => {
    if (query.length < 2) {
      companyOptions.value = [];
      return;
    }

    isLoadingCompanies.value = true;

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockCompanies = [
      `${query} Inc.`,
      `${query} Technologies`,
      `${query} Solutions`,
      `Global ${query}`,
      `${query} Enterprises`,
    ];

    companyOptions.value = mockCompanies.map((company, index) => ({
      value: `company_${index}`,
      label: company,
    }));

    isLoadingCompanies.value = false;
  });

  // Form submission
  const handleSubmit = $(async () => {
    const isValid = await validateForm();
    if (!isValid) return;

    formState.isSubmitting = true;

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      formState.isSubmitted = true;
      console.log("Form submitted:", formData);
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      formState.isSubmitting = false;
    }
  });

  const resetForm = $(() => {
    Object.keys(formData).forEach(key => {
      (formData as any)[key] = "";
    });
    Object.keys(errors).forEach(key => {
      (errors as any)[key] = "";
    });
    formState.isSubmitted = false;
    formState.hasErrors = false;
  });

  if (formState.isSubmitted) {
    return (
      <div class="max-w-2xl mx-auto p-6">
        <div class="rounded-lg border border-success-200 dark:border-success-800 bg-success-50 dark:bg-success-950 p-6 text-center">
          <div class="mb-4">
            <svg class="mx-auto h-12 w-12 text-success-600 dark:text-success-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 class="mb-2 text-xl font-semibold text-success-800 dark:text-success-200">
            Registration Successful!
          </h2>
          <p class="mb-4 text-success-700 dark:text-success-300">
            Thank you for registering. We'll be in touch soon.
          </p>
          <button
            onClick$={resetForm}
            class="rounded-md bg-success-600 px-4 py-2 text-white hover:bg-success-700 focus:outline-none focus:ring-2 focus:ring-success-500 focus:ring-offset-2"
          >
            Register Another Person
          </button>
        </div>
      </div>
    );
  }

  return (
    <div class="max-w-2xl mx-auto p-6">
      <div class="mb-6">
        <h2 class="mb-2 text-2xl font-bold text-text-default dark:text-text-dark-default">
          Registration Form
        </h2>
        <p class="text-text-secondary dark:text-text-dark-secondary">
          Complete form integration with validation and error handling.
        </p>
      </div>

      <form 
        class="space-y-6"
        preventdefault:submit
        onSubmit$={handleSubmit}
      >
        {/* Personal Information */}
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-text-default dark:text-text-dark-default">
            Personal Information
          </h3>
          
          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <label class="block text-sm font-medium text-text-default dark:text-text-dark-default mb-1">
                First Name *
              </label>
              <input
                type="text"
                value={formData.firstName}
                onInput$={(e) => {
                  formData.firstName = (e.target as HTMLInputElement).value;
                }}
                onBlur$={async () => await validateField("firstName")}
                class={[
                  "w-full rounded-md border px-3 py-2 text-sm transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                  errors.firstName 
                    ? "border-error-500 focus:border-error-500" 
                    : "border-border dark:border-border-dark focus:border-primary-600",
                  "bg-white dark:bg-surface-dark text-text-default dark:text-text-dark-default"
                ].join(" ")}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <p class="mt-1 text-sm text-error-600 dark:text-error-400">
                  {errors.firstName}
                </p>
              )}
            </div>

            <div>
              <label class="block text-sm font-medium text-text-default dark:text-text-dark-default mb-1">
                Last Name *
              </label>
              <input
                type="text"
                value={formData.lastName}
                onInput$={(e) => {
                  formData.lastName = (e.target as HTMLInputElement).value;
                }}
                onBlur$={async () => await validateField("lastName")}
                class={[
                  "w-full rounded-md border px-3 py-2 text-sm transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                  errors.lastName 
                    ? "border-error-500 focus:border-error-500" 
                    : "border-border dark:border-border-dark focus:border-primary-600",
                  "bg-white dark:bg-surface-dark text-text-default dark:text-text-dark-default"
                ].join(" ")}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <p class="mt-1 text-sm text-error-600 dark:text-error-400">
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-text-default dark:text-text-dark-default mb-1">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onInput$={(e) => {
                formData.email = (e.target as HTMLInputElement).value;
              }}
              onBlur$={async () => await validateField("email")}
              class={[
                "w-full rounded-md border px-3 py-2 text-sm transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                errors.email 
                  ? "border-error-500 focus:border-error-500" 
                  : "border-border dark:border-border-dark focus:border-primary-600",
                "bg-white dark:bg-surface-dark text-text-default dark:text-text-dark-default"
              ].join(" ")}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p class="mt-1 text-sm text-error-600 dark:text-error-400">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Location & Industry */}
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-text-default dark:text-text-dark-default">
            Location & Industry
          </h3>

          <div class="grid gap-4 md:grid-cols-2">
            <Autocomplete
              name="country"
              label="Country *"
              value={formData.country}
              options={countries}
              placeholder="Select your country"
              helperText="Choose your country of residence"
              error={errors.country}
              required={true}
              onValueChange$={async (value) => {
                formData.country = value;
                await validateField("country");
              }}
            />

            <Autocomplete
              name="industry"
              label="Industry *"
              value={formData.industry}
              options={industries}
              placeholder="Select your industry"
              helperText="Choose your primary industry"
              error={errors.industry}
              required={true}
              allowCustomValue={true}
              onValueChange$={async (value) => {
                formData.industry = value;
                await validateField("industry");
              }}
            />
          </div>
        </div>

        {/* Skills & Company */}
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-text-default dark:text-text-dark-default">
            Professional Information
          </h3>

          <Autocomplete
            name="primarySkill"
            label="Primary Skill *"
            value={formData.primarySkill}
            options={skills}
            placeholder="Select your primary skill"
            helperText="Choose your strongest technical skill"
            error={errors.primarySkill}
            required={true}
            highlightMatches={true}
            onValueChange$={async (value) => {
              formData.primarySkill = value;
              await validateField("primarySkill");
            }}
          />

          <Autocomplete
            name="company"
            label="Company *"
            value={formData.company}
            options={companyOptions.value}
            loading={isLoadingCompanies.value}
            placeholder="Search for your company"
            helperText="Type to search for your company"
            error={errors.company}
            required={true}
            allowCustomValue={true}
            minCharsToSearch={2}
            loadingText="Searching companies..."
            onInputChange$={searchCompanies}
            onValueChange$={async (value) => {
              formData.company = value;
              await validateField("company");
            }}
          />
        </div>

        {/* Submit Button */}
        <div class="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick$={resetForm}
            class="px-4 py-2 text-sm font-medium text-text-secondary dark:text-text-dark-secondary border border-border dark:border-border-dark rounded-md hover:bg-surface-light-secondary dark:hover:bg-surface-dark-secondary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={formState.isSubmitting}
            class={[
              "px-6 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors",
              formState.isSubmitting
                ? "bg-primary-400 cursor-not-allowed"
                : "bg-primary-600 hover:bg-primary-700"
            ].join(" ")}
          >
            {formState.isSubmitting ? (
              <span class="flex items-center gap-2">
                <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Registration"
            )}
          </button>
        </div>
      </form>
    </div>
  );
});