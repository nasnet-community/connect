import { component$, useStore, $ } from "@builder.io/qwik";
import { RadioGroup } from "../RadioGroup";

/**
 * Real-world Radio examples showcasing practical usage patterns,
 * form validation, performance optimizations, and complex layouts
 */

export const FormValidationExample = component$(() => {
  const formState = useStore({
    subscription: "",
    paymentMethod: "",
    shippingSpeed: "",
    errors: {
      subscription: "",
      paymentMethod: "",
      shippingSpeed: "",
    },
    isSubmitting: false,
    hasSubmitted: false,
  });

  const subscriptionOptions = [
    { value: "free", label: "Free Plan - $0/month", disabled: false },
    { value: "basic", label: "Basic Plan - $9/month" },
    { value: "pro", label: "Pro Plan - $29/month" },
    { value: "enterprise", label: "Enterprise Plan - Contact Sales" },
  ];

  const paymentOptions = [
    { value: "card", label: "Credit Card" },
    { value: "paypal", label: "PayPal" },
    { value: "bank", label: "Bank Transfer" },
    { value: "crypto", label: "Cryptocurrency" },
  ];

  const shippingOptions = [
    { value: "standard", label: "Standard (5-7 days) - Free" },
    { value: "express", label: "Express (2-3 days) - $15" },
    { value: "overnight", label: "Overnight (1 day) - $30" },
  ];

  const validateField = $((field: string, value: string) => {
    switch (field) {
      case "subscription":
        formState.errors.subscription = !value ? "Please select a subscription plan" : "";
        break;
      case "paymentMethod":
        formState.errors.paymentMethod = !value ? "Please select a payment method" : "";
        break;
      case "shippingSpeed":
        formState.errors.shippingSpeed = !value ? "Please select shipping speed" : "";
        break;
    }
  });

  const handleSubmit = $(async () => {
    formState.hasSubmitted = true;
    formState.isSubmitting = true;

    // Validate all fields
    await validateField("subscription", formState.subscription);
    await validateField("paymentMethod", formState.paymentMethod);
    await validateField("shippingSpeed", formState.shippingSpeed);

    const hasErrors = Object.values(formState.errors).some(error => error !== "");

    if (!hasErrors) {
      // Simulate API call
      setTimeout(() => {
        formState.isSubmitting = false;
        alert("Form submitted successfully!");
      }, 2000);
    } else {
      formState.isSubmitting = false;
    }
  });

  return (
    <div class="max-w-2xl space-y-8">
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
        Advanced Form Validation Example
      </h3>
      
      <form 
        class="space-y-6"
        onSubmit$={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        preventdefault:submit
      >
        {/* Subscription Selection */}
        <div class="space-y-2">
          <RadioGroup
            name="subscription"
            label="Choose Your Subscription Plan"
            helperText="Select the plan that best fits your needs"
            error={formState.hasSubmitted ? formState.errors.subscription : ""}
            required
            size="md"
            options={subscriptionOptions}
            value={formState.subscription}
            onChange$={(value) => {
              formState.subscription = value;
              if (formState.hasSubmitted) {
                validateField("subscription", value);
              }
            }}
            variant="filled"
            animation={{
              enabled: true,
              duration: 200,
              easing: "ease-out"
            }}
          />
        </div>

        {/* Payment Method */}
        <div class="space-y-2">
          <RadioGroup
            name="payment"
            label="Payment Method"
            helperText="Choose your preferred payment option"
            error={formState.hasSubmitted ? formState.errors.paymentMethod : ""}
            required
            direction="horizontal"
            size="md"
            options={paymentOptions}
            value={formState.paymentMethod}
            onChange$={(value) => {
              formState.paymentMethod = value;
              if (formState.hasSubmitted) {
                validateField("paymentMethod", value);
              }
            }}
            gridLayout={{
              columns: 2,
              responsive: {
                mobile: 1,
                tablet: 2,
                desktop: 4
              }
            }}
            spacing={{
              gap: "md",
              responsive: {
                mobile: "sm",
                tablet: "md",
                desktop: "lg"
              }
            }}
          />
        </div>

        {/* Shipping Speed */}
        <div class="space-y-2">
          <RadioGroup
            name="shipping"
            label="Shipping Speed"
            helperText="Faster shipping options available"
            error={formState.hasSubmitted ? formState.errors.shippingSpeed : ""}
            required
            size="lg"
            options={shippingOptions}
            value={formState.shippingSpeed}
            onChange$={(value) => {
              formState.shippingSpeed = value;
              if (formState.hasSubmitted) {
                validateField("shippingSpeed", value);
              }
            }}
            responsive={true}
            responsiveSizes={{
              mobile: "lg",
              tablet: "md",
              desktop: "md"
            }}
            staggeredAnimation={true}
          />
        </div>

        {/* Submit Button */}
        <div class="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            onClick$={() => {
              // Reset form
              formState.subscription = "";
              formState.paymentMethod = "";
              formState.shippingSpeed = "";
              formState.errors = { subscription: "", paymentMethod: "", shippingSpeed: "" };
              formState.hasSubmitted = false;
            }}
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={formState.isSubmitting}
            class="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-primary-500 dark:hover:bg-primary-600"
          >
            {formState.isSubmitting ? "Submitting..." : "Submit Order"}
          </button>
        </div>
      </form>

      {/* Form State Debug Info */}
      <div class="rounded-md bg-gray-100 p-4 dark:bg-gray-800">
        <h4 class="font-medium text-gray-900 dark:text-white mb-2">Form State:</h4>
        <div class="space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <p><strong>Subscription:</strong> {formState.subscription || "None selected"}</p>
          <p><strong>Payment:</strong> {formState.paymentMethod || "None selected"}</p>
          <p><strong>Shipping:</strong> {formState.shippingSpeed || "None selected"}</p>
        </div>
      </div>
    </div>
  );
});

export const PerformanceOptimizedExample = component$(() => {
  const selectedValues = useStore({
    category: "",
    subcategory: "",
    priority: "",
  });

  // Memoized options to demonstrate performance optimization
  const categoryOptions = [
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" },
    { value: "books", label: "Books" },
    { value: "home", label: "Home & Garden" },
    { value: "sports", label: "Sports & Outdoors" },
  ];

  // Dynamic subcategories based on category selection
  const getSubcategoryOptions = () => {
    switch (selectedValues.category) {
      case "electronics":
        return [
          { value: "phones", label: "Smartphones" },
          { value: "laptops", label: "Laptops" },
          { value: "tablets", label: "Tablets" },
          { value: "accessories", label: "Accessories" },
        ];
      case "clothing":
        return [
          { value: "mens", label: "Men's Clothing" },
          { value: "womens", label: "Women's Clothing" },
          { value: "kids", label: "Kids' Clothing" },
          { value: "shoes", label: "Shoes" },
        ];
      case "books":
        return [
          { value: "fiction", label: "Fiction" },
          { value: "nonfiction", label: "Non-Fiction" },
          { value: "textbooks", label: "Textbooks" },
          { value: "children", label: "Children's Books" },
        ];
      default:
        return [];
    }
  };

  const priorityOptions = [
    { value: "low", label: "Low Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "high", label: "High Priority" },
    { value: "urgent", label: "Urgent" },
  ];

  return (
    <div class="max-w-2xl space-y-6">
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
        Performance Optimized Multi-Step Selection
      </h3>
      
      <div class="space-y-6">
        {/* Step 1: Category Selection */}
        <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <RadioGroup
            name="category"
            label="Step 1: Select Category"
            helperText="Choose a product category to see available subcategories"
            options={categoryOptions}
            value={selectedValues.category}
            onChange$={(value) => {
              selectedValues.category = value;
              // Reset dependent selections
              selectedValues.subcategory = "";
            }}
            size="md"
            spacing={{ gap: "sm" }}
            animation={{
              enabled: true,
              duration: 150,
              easing: "ease-out"
            }}
          />
        </div>

        {/* Step 2: Subcategory Selection (conditional) */}
        {selectedValues.category && (
          <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <RadioGroup
              name="subcategory"
              label="Step 2: Select Subcategory"
              helperText={`Choose from ${selectedValues.category} options`}
              options={getSubcategoryOptions()}
              value={selectedValues.subcategory}
              onChange$={(value) => {
                selectedValues.subcategory = value;
              }}
              size="md"
              direction="horizontal"
              gridLayout={{
                columns: 2,
                responsive: {
                  mobile: 1,
                  tablet: 2,
                  desktop: 2
                }
              }}
              staggeredAnimation={true}
              animation={{
                enabled: true,
                duration: 200,
                easing: "ease-in-out"
              }}
            />
          </div>
        )}

        {/* Step 3: Priority Selection (conditional) */}
        {selectedValues.subcategory && (
          <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <RadioGroup
              name="priority"
              label="Step 3: Set Priority Level"
              helperText="How urgent is this selection?"
              options={priorityOptions}
              value={selectedValues.priority}
              onChange$={(value) => {
                selectedValues.priority = value;
              }}
              size="md"
              variant="filled"
              responsive={true}
              responsiveSizes={{
                mobile: "lg",
                tablet: "md",
                desktop: "sm"
              }}
              animation={{
                enabled: true,
                duration: 250,
                easing: "ease-out"
              }}
            />
          </div>
        )}

        {/* Results Summary */}
        {selectedValues.priority && (
          <div class="rounded-lg bg-primary-50 p-4 dark:bg-primary-950">
            <h4 class="font-medium text-primary-900 dark:text-primary-100 mb-2">
              Selection Complete! ✅
            </h4>
            <div class="space-y-1 text-sm text-primary-800 dark:text-primary-200">
              <p><strong>Category:</strong> {selectedValues.category}</p>
              <p><strong>Subcategory:</strong> {selectedValues.subcategory}</p>
              <p><strong>Priority:</strong> {selectedValues.priority}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export const ComplexLayoutExample = component$(() => {
  const layoutPrefs = useStore({
    deviceType: "desktop",
    theme: "system",
    language: "en",
    accessibility: "standard",
  });

  const deviceOptions = [
    { value: "mobile", label: "📱 Mobile First" },
    { value: "tablet", label: "📲 Tablet Optimized" },
    { value: "desktop", label: "🖥️ Desktop Experience" },
    { value: "tv", label: "📺 Smart TV Interface" },
  ];

  const themeOptions = [
    { value: "light", label: "☀️ Light Theme" },
    { value: "dark", label: "🌙 Dark Theme" },
    { value: "system", label: "🔄 System Default" },
    { value: "high-contrast", label: "🔍 High Contrast" },
  ];

  const languageOptions = [
    { value: "en", label: "🇺🇸 English" },
    { value: "es", label: "🇪🇸 Español" },
    { value: "fr", label: "🇫🇷 Français" },
    { value: "de", label: "🇩🇪 Deutsch" },
    { value: "ar", label: "🇸🇦 العربية" },
    { value: "zh", label: "🇨🇳 中文" },
  ];

  const accessibilityOptions = [
    { value: "standard", label: "Standard Experience" },
    { value: "enhanced", label: "Enhanced Accessibility" },
    { value: "keyboard-only", label: "Keyboard Navigation Only" },
    { value: "screen-reader", label: "Screen Reader Optimized" },
  ];

  return (
    <div class="max-w-4xl space-y-8">
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
        Complex Multi-Column Layout Configuration
      </h3>
      
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Device Preferences */}
        <div class="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
          <RadioGroup
            name="device"
            label="Device Experience"
            helperText="Optimize interface for your primary device"
            options={deviceOptions}
            value={layoutPrefs.deviceType}
            onChange$={(value) => {
              layoutPrefs.deviceType = value;
            }}
            size="lg"
            spacing={{ gap: "md" }}
            touchTarget={{
              minSize: 48,
              touchPadding: true,
              responsive: {
                mobile: 52,
                tablet: 48,
                desktop: 44
              }
            }}
            animation={{
              enabled: true,
              duration: 200,
              easing: "ease-out"
            }}
          />
        </div>

        {/* Theme Preferences */}
        <div class="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
          <RadioGroup
            name="theme"
            label="Visual Theme"
            helperText="Choose your preferred visual appearance"
            options={themeOptions}
            value={layoutPrefs.theme}
            onChange$={(value) => {
              layoutPrefs.theme = value;
            }}
            size="lg"
            variant="filled"
            spacing={{ gap: "md" }}
            animation={{
              enabled: true,
              duration: 250,
              easing: "ease-in-out"
            }}
          />
        </div>

        {/* Language Preferences */}
        <div class="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
          <RadioGroup
            name="language"
            label="Language & Region"
            helperText="Select your preferred language"
            options={languageOptions}
            value={layoutPrefs.language}
            onChange$={(value) => {
              layoutPrefs.language = value;
            }}
            size="md"
            gridLayout={{
              columns: 2,
              responsive: {
                mobile: 1,
                tablet: 2,
                desktop: 2
              }
            }}
            spacing={{
              gap: "sm",
              responsive: {
                mobile: "xs",
                tablet: "sm",
                desktop: "md"
              }
            }}
            staggeredAnimation={true}
          />
        </div>

        {/* Accessibility Preferences */}
        <div class="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
          <RadioGroup
            name="accessibility"
            label="Accessibility Options"
            helperText="Configure accessibility features"
            options={accessibilityOptions}
            value={layoutPrefs.accessibility}
            onChange$={(value) => {
              layoutPrefs.accessibility = value;
            }}
            size="md"
            variant="outlined"
            showFocusRing={true}
            highContrast={layoutPrefs.accessibility === "enhanced"}
            spacing={{ gap: "md" }}
            animation={{
              enabled: true,
              duration: 300,
              easing: "ease-out"
            }}
          />
        </div>
      </div>

      {/* Live Preview Section */}
      <div class="rounded-lg bg-gradient-to-r from-primary-50 to-secondary-50 p-6 dark:from-primary-950 dark:to-secondary-950">
        <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Configuration Preview
        </h4>
        <div class="grid grid-cols-2 gap-4 text-sm lg:grid-cols-4">
          <div class="space-y-1">
            <p class="font-medium text-gray-700 dark:text-gray-300">Device:</p>
            <p class="text-gray-600 dark:text-gray-400">{layoutPrefs.deviceType}</p>
          </div>
          <div class="space-y-1">
            <p class="font-medium text-gray-700 dark:text-gray-300">Theme:</p>
            <p class="text-gray-600 dark:text-gray-400">{layoutPrefs.theme}</p>
          </div>
          <div class="space-y-1">
            <p class="font-medium text-gray-700 dark:text-gray-300">Language:</p>
            <p class="text-gray-600 dark:text-gray-400">{layoutPrefs.language}</p>
          </div>
          <div class="space-y-1">
            <p class="font-medium text-gray-700 dark:text-gray-300">Accessibility:</p>
            <p class="text-gray-600 dark:text-gray-400">{layoutPrefs.accessibility}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default FormValidationExample;