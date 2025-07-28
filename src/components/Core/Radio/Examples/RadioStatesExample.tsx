import { component$, useSignal, $ } from "@builder.io/qwik";
import { Radio } from "../Radio";

export const DisabledRadioExample = component$(() => {
  const selectedOption = useSignal("option1");

  return (
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        Disabled Radio Buttons
      </h3>
      
      <div class="space-y-3">
        <Radio
          name="disabled-example"
          value="option1"
          label="Available option"
          checked={selectedOption.value === "option1"}
          onChange$={(value) => (selectedOption.value = value)}
        />
        <Radio
          name="disabled-example"
          value="option2"
          label="Disabled option (unchecked)"
          disabled
          checked={selectedOption.value === "option2"}
          onChange$={(value) => (selectedOption.value = value)}
        />
        <Radio
          name="disabled-example"
          value="option3"
          label="Disabled option (checked)"
          disabled
          checked
        />
      </div>

      <div class="mt-4 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Selected: <span class="font-medium">{selectedOption.value}</span>
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Disabled options cannot be changed by user interaction
        </p>
      </div>
    </div>
  );
});

export const CheckedStatesExample = component$(() => {
  const paymentMethod = useSignal("credit");
  const notification = useSignal("email");

  return (
    <div class="space-y-6">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        Checked States Demonstration
      </h3>
      
      <div class="space-y-4">
        <div>
          <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Payment Method
          </h4>
          <div class="space-y-2">
            <Radio
              name="payment"
              value="credit"
              label="Credit Card"
              checked={paymentMethod.value === "credit"}
              onChange$={(value) => (paymentMethod.value = value)}
            />
            <Radio
              name="payment"
              value="paypal"
              label="PayPal"
              checked={paymentMethod.value === "paypal"}
              onChange$={(value) => (paymentMethod.value = value)}
            />
            <Radio
              name="payment"
              value="bank"
              label="Bank Transfer"
              checked={paymentMethod.value === "bank"}
              onChange$={(value) => (paymentMethod.value = value)}
            />
          </div>
        </div>

        <div>
          <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Notification Preference
          </h4>
          <div class="space-y-2">
            <Radio
              name="notification"
              value="email"
              label="Email notifications"
              checked={notification.value === "email"}
              onChange$={(value) => (notification.value = value)}
            />
            <Radio
              name="notification"
              value="sms"
              label="SMS notifications"
              checked={notification.value === "sms"}
              onChange$={(value) => (notification.value = value)}
            />
            <Radio
              name="notification"
              value="none"
              label="No notifications"
              checked={notification.value === "none"}
              onChange$={(value) => (notification.value = value)}
            />
          </div>
        </div>
      </div>

      <div class="mt-4 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Payment Method: <span class="font-medium">{paymentMethod.value}</span>
        </p>
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Notifications: <span class="font-medium">{notification.value}</span>
        </p>
      </div>
    </div>
  );
});

export const RequiredFieldsExample = component$(() => {
  const subscription = useSignal("");
  const privacy = useSignal("");
  const isSubmitted = useSignal(false);

  const handleSubmit$ = $(() => {
    isSubmitted.value = true;
  });

  const hasErrors = isSubmitted.value && (!subscription.value || !privacy.value);

  return (
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        Required Fields with Validation
      </h3>
      
      <form class="space-y-4">
        <div>
          <fieldset class="space-y-2">
            <legend class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Subscription Plan *
            </legend>
            <Radio
              name="subscription"
              value="basic"
              label="Basic Plan ($9/month)"
              required
              checked={subscription.value === "basic"}
              onChange$={(value) => (subscription.value = value)}
            />
            <Radio
              name="subscription"
              value="premium"
              label="Premium Plan ($19/month)"
              required
              checked={subscription.value === "premium"}
              onChange$={(value) => (subscription.value = value)}
            />
            <Radio
              name="subscription"
              value="enterprise"
              label="Enterprise Plan ($49/month)"
              required
              checked={subscription.value === "enterprise"}
              onChange$={(value) => (subscription.value = value)}
            />
          </fieldset>
          {isSubmitted.value && !subscription.value && (
            <p class="text-sm text-red-600 dark:text-red-400 mt-1">
              Please select a subscription plan
            </p>
          )}
        </div>

        <div>
          <fieldset class="space-y-2">
            <legend class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Privacy Settings *
            </legend>
            <Radio
              name="privacy"
              value="public"
              label="Public profile"
              required
              checked={privacy.value === "public"}
              onChange$={(value) => (privacy.value = value)}
            />
            <Radio
              name="privacy"
              value="private"
              label="Private profile"
              required
              checked={privacy.value === "private"}
              onChange$={(value) => (privacy.value = value)}
            />
          </fieldset>
          {isSubmitted.value && !privacy.value && (
            <p class="text-sm text-red-600 dark:text-red-400 mt-1">
              Please select a privacy setting
            </p>
          )}
        </div>

        <button
          type="button"
          onClick$={handleSubmit$}
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>

      <div class="mt-4 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Subscription: <span class="font-medium">{subscription.value || "Not selected"}</span>
        </p>
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Privacy: <span class="font-medium">{privacy.value || "Not selected"}</span>
        </p>
        {hasErrors && (
          <p class="text-sm text-red-600 dark:text-red-400 mt-2">
            Form has validation errors
          </p>
        )}
      </div>
    </div>
  );
});

export const MixedStatesExample = component$(() => {
  const service = useSignal("standard");

  return (
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        Mixed States Example
      </h3>
      
      <fieldset class="space-y-3">
        <legend class="text-sm font-medium text-gray-700 dark:text-gray-300">
          Service Level *
        </legend>
        
        <Radio
          name="service"
          value="basic"
          label="Basic Service"
          required
          checked={service.value === "basic"}
          onChange$={(value) => (service.value = value)}
        />
        
        <Radio
          name="service"
          value="standard"
          label="Standard Service (Recommended)"
          required
          checked={service.value === "standard"}
          onChange$={(value) => (service.value = value)}
        />
        
        <Radio
          name="service"
          value="premium"
          label="Premium Service"
          required
          checked={service.value === "premium"}
          onChange$={(value) => (service.value = value)}
        />
        
        <Radio
          name="service"
          value="enterprise"
          label="Enterprise Service (Contact Sales)"
          disabled
          checked={service.value === "enterprise"}
          onChange$={(value) => (service.value = value)}
        />
      </fieldset>

      <div class="mt-4 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Selected Service: <span class="font-medium">{service.value}</span>
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Enterprise option is disabled - contact sales for availability
        </p>
      </div>
    </div>
  );
});

export default DisabledRadioExample;