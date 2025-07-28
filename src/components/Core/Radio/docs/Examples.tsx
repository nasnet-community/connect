import { component$, useSignal } from "@builder.io/qwik";
import { ExamplesTemplate } from "~/components/Docs/templates";
import { Radio, RadioGroup } from "../index";
import { 
  FormValidationExample, 
  PerformanceOptimizedExample, 
  ComplexLayoutExample 
} from "../Examples/RealWorldExample";

// Basic Radio Example
const BasicRadioExample = component$(() => {
  const selectedValue = useSignal("option1");

  return (
    <div class="space-y-3">
      <Radio
        name="basic"
        value="option1"
        label="Option 1"
        checked={selectedValue.value === "option1"}
        onChange$={(value) => (selectedValue.value = value)}
      />
      <Radio
        name="basic"
        value="option2"
        label="Option 2"
        checked={selectedValue.value === "option2"}
        onChange$={(value) => (selectedValue.value = value)}
      />
      <Radio
        name="basic"
        value="option3"
        label="Option 3"
        checked={selectedValue.value === "option3"}
        onChange$={(value) => (selectedValue.value = value)}
      />
    </div>
  );
});

// Radio Group Example
const RadioGroupExample = component$(() => {
  const selectedOption = useSignal("react");

  const frameworkOptions = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "qwik", label: "Qwik" },
  ];

  return (
    <RadioGroup
      name="framework"
      label="Choose your framework"
      options={frameworkOptions}
      value={selectedOption.value}
      onChange$={(value) => (selectedOption.value = value)}
    />
  );
});

// Size Variants Example
const SizeVariantsExample = component$(() => {
  const small = useSignal("sm1");
  const medium = useSignal("md1");
  const large = useSignal("lg1");

  return (
    <div class="space-y-6">
      <div>
        <p class="mb-2 text-sm font-medium">Small Size</p>
        <div class="space-y-2">
          <Radio
            name="size-small"
            value="sm1"
            label="Small Option 1"
            size="sm"
            checked={small.value === "sm1"}
            onChange$={(value) => (small.value = value)}
          />
          <Radio
            name="size-small"
            value="sm2"
            label="Small Option 2"
            size="sm"
            checked={small.value === "sm2"}
            onChange$={(value) => (small.value = value)}
          />
        </div>
      </div>

      <div>
        <p class="mb-2 text-sm font-medium">Medium Size (Default)</p>
        <div class="space-y-2">
          <Radio
            name="size-medium"
            value="md1"
            label="Medium Option 1"
            size="md"
            checked={medium.value === "md1"}
            onChange$={(value) => (medium.value = value)}
          />
          <Radio
            name="size-medium"
            value="md2"
            label="Medium Option 2"
            size="md"
            checked={medium.value === "md2"}
            onChange$={(value) => (medium.value = value)}
          />
        </div>
      </div>

      <div>
        <p class="mb-2 text-sm font-medium">Large Size</p>
        <div class="space-y-2">
          <Radio
            name="size-large"
            value="lg1"
            label="Large Option 1"
            size="lg"
            checked={large.value === "lg1"}
            onChange$={(value) => (large.value = value)}
          />
          <Radio
            name="size-large"
            value="lg2"
            label="Large Option 2"
            size="lg"
            checked={large.value === "lg2"}
            onChange$={(value) => (large.value = value)}
          />
        </div>
      </div>
    </div>
  );
});

// Horizontal Layout Example
const HorizontalLayoutExample = component$(() => {
  const selectedPayment = useSignal("card");

  const paymentOptions = [
    { value: "card", label: "Credit Card" },
    { value: "paypal", label: "PayPal" },
    { value: "bank", label: "Bank Transfer" },
    { value: "crypto", label: "Cryptocurrency" },
  ];

  return (
    <RadioGroup
      name="payment"
      label="Payment Method"
      options={paymentOptions}
      value={selectedPayment.value}
      direction="horizontal"
      onChange$={(value) => (selectedPayment.value = value)}
    />
  );
});

// With Helper Text and Error Example
const WithHelperAndErrorExample = component$(() => {
  const selectedShipping = useSignal("");
  const showError = useSignal(true);

  const shippingOptions = [
    { value: "standard", label: "Standard Shipping (5-7 days)" },
    { value: "express", label: "Express Shipping (2-3 days)" },
    { value: "overnight", label: "Overnight Shipping (1 day)" },
  ];

  return (
    <div class="space-y-4">
      <RadioGroup
        name="shipping"
        label="Shipping Method"
        helperText="Select your preferred shipping speed"
        options={shippingOptions}
        value={selectedShipping.value}
        required
        onChange$={(value) => {
          selectedShipping.value = value;
          showError.value = false;
        }}
      />

      <RadioGroup
        name="shipping-error"
        label="Delivery Options"
        error={showError.value ? "Please select a delivery option" : ""}
        options={[
          { value: "home", label: "Home Delivery" },
          { value: "office", label: "Office Delivery" },
          { value: "pickup", label: "Store Pickup" },
        ]}
        value=""
        required
      />
    </div>
  );
});

// Disabled States Example
const DisabledStatesExample = component$(() => {
  const subscription = useSignal("basic");

  const subscriptionOptions = [
    { value: "free", label: "Free Plan", disabled: true },
    { value: "basic", label: "Basic Plan" },
    { value: "pro", label: "Pro Plan" },
    { value: "enterprise", label: "Enterprise Plan", disabled: true },
  ];

  return (
    <div class="space-y-6">
      <RadioGroup
        name="subscription"
        label="Subscription Plan"
        helperText="Some plans are not available in your region"
        options={subscriptionOptions}
        value={subscription.value}
        onChange$={(value) => (subscription.value = value)}
      />

      <RadioGroup
        name="disabled-group"
        label="Disabled Radio Group"
        options={[
          { value: "option1", label: "All options" },
          { value: "option2", label: "Are disabled" },
          { value: "option3", label: "In this group" },
        ]}
        value="option1"
        disabled
      />
    </div>
  );
});

// Custom Styling Example
const CustomStylingExample = component$(() => {
  const theme = useSignal("light");

  return (
    <div class="space-y-4">
      <RadioGroup
        name="theme"
        label="Theme Preference"
        options={[
          { value: "light", label: "Light Theme", class: "text-yellow-600" },
          { value: "dark", label: "Dark Theme", class: "text-gray-800" },
          { value: "auto", label: "System Default", class: "text-blue-600" },
        ]}
        value={theme.value}
        onChange$={(value) => (theme.value = value)}
        class="rounded-lg bg-gray-100 p-4 dark:bg-gray-800"
      />
    </div>
  );
});

// Responsive Example
const ResponsiveExample = component$(() => {
  const device = useSignal("mobile");

  const deviceOptions = [
    { value: "mobile", label: "Mobile" },
    { value: "tablet", label: "Tablet" },
    { value: "desktop", label: "Desktop" },
    { value: "tv", label: "Smart TV" },
  ];

  return (
    <RadioGroup
      name="device"
      label="Target Device"
      options={deviceOptions}
      value={device.value}
      onChange$={(value) => (device.value = value)}
      direction="horizontal"
      class="flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0"
    />
  );
});

export default component$(() => {
  const examples = [
    {
      title: "Basic Radio Buttons",
      description: "Individual radio buttons with state management",
      component: <BasicRadioExample />,
    },
    {
      title: "Radio Group",
      description: "Grouped radio buttons with unified state management",
      component: <RadioGroupExample />,
    },
    {
      title: "Size Variants",
      description: "Radio buttons in different sizes: small, medium, and large",
      component: <SizeVariantsExample />,
    },
    {
      title: "Horizontal Layout",
      description: "Radio group with horizontal arrangement of options",
      component: <HorizontalLayoutExample />,
    },
    {
      title: "Helper Text and Error States",
      description: "Radio groups with helper text and error messages",
      component: <WithHelperAndErrorExample />,
    },
    {
      title: "Disabled States",
      description: "Individual disabled options and fully disabled groups",
      component: <DisabledStatesExample />,
    },
    {
      title: "Custom Styling",
      description: "Radio components with custom CSS classes",
      component: <CustomStylingExample />,
    },
    {
      title: "Responsive Layout",
      description: "Radio group that adapts layout based on screen size",
      component: <ResponsiveExample />,
    },
    {
      title: "Form Validation",
      description: "Advanced form validation with real-time error handling",
      component: <FormValidationExample />,
    },
    {
      title: "Performance Optimized",
      description: "Multi-step selection with dynamic options and conditional rendering",
      component: <PerformanceOptimizedExample />,
    },
    {
      title: "Complex Layout",
      description: "Multi-column configuration interface with responsive grid layouts",
      component: <ComplexLayoutExample />,
    },
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The Radio component provides various configurations and features to
        handle different use cases. Below are examples demonstrating the
        component's capabilities, from basic usage to advanced features like
        custom styling, responsive layouts, form validation, and performance 
        optimization patterns used in production applications.
      </p>
    </ExamplesTemplate>
  );
});