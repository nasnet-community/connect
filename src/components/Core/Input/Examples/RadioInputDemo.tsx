import { component$, useSignal, $ } from "@builder.io/qwik";
import { RadioInput } from "~/components/Core/Input";

export const RadioInputDemo = component$(() => {
  const subscriptionPlan = useSignal("");
  const deliveryOption = useSignal("");
  const paymentMethod = useSignal("");
  const notificationPreference = useSignal("");

  const handleSubscriptionChange$ = $((_: any, value: string) => {
    subscriptionPlan.value = value;
  });

  const handleDeliveryChange$ = $((_: any, value: string) => {
    deliveryOption.value = value;
  });

  const handlePaymentChange$ = $((_: any, value: string) => {
    paymentMethod.value = value;
  });

  const handleNotificationChange$ = $((_: any, value: string) => {
    notificationPreference.value = value;
  });

  const subscriptionOptions = [
    {
      value: "basic",
      label: "Basic Plan",
      description: "$9.99/month - Essential features for getting started",
    },
    {
      value: "pro",
      label: "Pro Plan",
      description: "$19.99/month - Advanced features for power users",
    },
    {
      value: "enterprise",
      label: "Enterprise Plan",
      description: "$49.99/month - Full feature set with priority support",
    },
  ];

  const deliveryOptions = [
    {
      value: "standard",
      label: "Standard Delivery",
      description: "5-7 business days - Free",
    },
    {
      value: "express",
      label: "Express Delivery",
      description: "2-3 business days - $9.99",
    },
    {
      value: "overnight",
      label: "Overnight Delivery",
      description: "Next business day - $24.99",
    },
  ];

  const paymentOptions = [
    {
      value: "credit",
      label: "Credit Card",
      description: "Visa, MasterCard, American Express",
    },
    {
      value: "paypal",
      label: "PayPal",
      description: "Pay with your PayPal account",
    },
    {
      value: "bank",
      label: "Bank Transfer",
      description: "Direct bank transfer (ACH)",
    },
  ];

  const notificationOptions = [
    {
      value: "all",
      label: "All Notifications",
    },
    {
      value: "important",
      label: "Important Only",
    },
    {
      value: "none",
      label: "No Notifications",
    },
  ];

  return (
    <div class="space-y-8 p-6">
      <div class="mb-4">
        <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          RadioInput Component Examples
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Radio button groups with different layouts, sizes, and validation states.
        </p>
      </div>

      <div class="space-y-8">
        <div>
          <h4 class="mb-4 text-sm font-medium text-gray-700 dark:text-gray-300">
            Vertical Layout with Descriptions
          </h4>
          <RadioInput
            name="subscription"
            label="Choose Your Subscription Plan"
            value={subscriptionPlan.value}
            options={subscriptionOptions}
            required
            helperText="Select the plan that best fits your needs"
            onChange$={handleSubscriptionChange$}
          />
        </div>

        <div>
          <h4 class="mb-4 text-sm font-medium text-gray-700 dark:text-gray-300">
            Horizontal Layout
          </h4>
          <RadioInput
            name="notifications"
            label="Notification Preferences"
            value={notificationPreference.value}
            options={notificationOptions}
            direction="horizontal"
            onChange$={handleNotificationChange$}
          />
        </div>

        <div>
          <h4 class="mb-4 text-sm font-medium text-gray-700 dark:text-gray-300">
            Different Sizes
          </h4>
          <div class="space-y-4">
            <RadioInput
              name="delivery-sm"
              label="Small Size"
              size="sm"
              value=""
              options={deliveryOptions.slice(0, 2)}
            />
            <RadioInput
              name="delivery-md"
              label="Medium Size (Default)"
              size="md"
              value=""
              options={deliveryOptions.slice(0, 2)}
            />
            <RadioInput
              name="delivery-lg"
              label="Large Size"
              size="lg"
              value=""
              options={deliveryOptions.slice(0, 2)}
            />
          </div>
        </div>

        <div>
          <h4 class="mb-4 text-sm font-medium text-gray-700 dark:text-gray-300">
            Validation States
          </h4>
          <div class="space-y-6">
            <RadioInput
              name="payment-valid"
              label="Payment Method (Valid)"
              value="credit"
              options={paymentOptions}
              validation="valid"
              helperText="Payment method has been verified"
            />

            <RadioInput
              name="payment-invalid"
              label="Payment Method (Invalid)"
              value=""
              options={paymentOptions}
              validation="invalid"
              errorMessage="Please select a payment method to continue"
              required
            />

            <RadioInput
              name="payment-warning"
              label="Payment Method (Warning)"
              value="bank"
              options={paymentOptions}
              validation="warning"
              warningMessage="Bank transfers may take 3-5 business days to process"
            />
          </div>
        </div>

        <div>
          <h4 class="mb-4 text-sm font-medium text-gray-700 dark:text-gray-300">
            Disabled State
          </h4>
          <RadioInput
            name="delivery-disabled"
            label="Delivery Options (Disabled)"
            value={deliveryOption.value}
            options={deliveryOptions}
            disabled
            helperText="Delivery options are not available for this product"
            onChange$={handleDeliveryChange$}
          />
        </div>

        <div>
          <h4 class="mb-4 text-sm font-medium text-gray-700 dark:text-gray-300">
            Individual Option Disabled
          </h4>
          <RadioInput
            name="payment-partial-disabled"
            label="Payment Methods"
            value={paymentMethod.value}
            options={[
              ...paymentOptions.slice(0, 2),
              {
                ...paymentOptions[2],
                disabled: true,
                description: "Bank transfer temporarily unavailable",
              },
            ]}
            onChange$={handlePaymentChange$}
          />
        </div>

        <div>
          <h4 class="mb-4 text-sm font-medium text-gray-700 dark:text-gray-300">
            Without Group Label
          </h4>
          <RadioInput
            name="standalone"
            value=""
            options={[
              { value: "yes", label: "Yes, I agree to the terms" },
              { value: "no", label: "No, I need more information" },
            ]}
            direction="horizontal"
          />
        </div>
      </div>

      <div class="mt-8 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
        <h4 class="mb-2 font-medium text-gray-900 dark:text-white">Selected Values:</h4>
        <pre class="text-sm text-gray-600 dark:text-gray-400">
          {JSON.stringify(
            {
              subscriptionPlan: subscriptionPlan.value,
              deliveryOption: deliveryOption.value,
              paymentMethod: paymentMethod.value,
              notificationPreference: notificationPreference.value,
            },
            null,
            2
          )}
        </pre>
      </div>

      <div class="mt-6 grid gap-4 md:grid-cols-2">
        <div class="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
          <h4 class="mb-2 font-medium text-green-900 dark:text-green-100">
            ♿ Accessibility Features
          </h4>
          <ul class="space-y-1 text-sm text-green-800 dark:text-green-200">
            <li>• Proper fieldset and legend elements</li>
            <li>• ARIA attributes for screen readers</li>
            <li>• Keyboard navigation (Tab, Arrow keys)</li>
            <li>• Focus management and visual indicators</li>
          </ul>
        </div>

        <div class="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <h4 class="mb-2 font-medium text-blue-900 dark:text-blue-100">
            📱 Mobile Optimized
          </h4>
          <ul class="space-y-1 text-sm text-blue-800 dark:text-blue-200">
            <li>• Touch-friendly radio button sizing</li>
            <li>• Responsive layout options</li>
            <li>• Optimized spacing for mobile screens</li>
            <li>• Support for RTL languages</li>
          </ul>
        </div>
      </div>
    </div>
  );
});