import { component$, useSignal, $ } from "@builder.io/qwik";
import { RadioGroup } from "../index";
import { FormLabel } from "../../FormLabel";
import { FormHelperText } from "../../FormHelperText";
import { Button } from "../../../button";

export default component$(() => {
  const subscriptionPlan = useSignal("monthly");
  const paymentMethod = useSignal("credit");
  const submitted = useSignal(false);
  const formData = useSignal<{ plan: string; payment: string } | null>(null);

  const subscriptionOptions = [
    { value: "monthly", label: "Monthly - $9.99/month" },
    { value: "annual", label: "Annual - $99.99/year (Save 16%)" },
    { value: "lifetime", label: "Lifetime - $299.99 (one-time payment)" },
  ];

  const paymentOptions = [
    { value: "credit", label: "Credit Card" },
    { value: "paypal", label: "PayPal" },
    { value: "bank", label: "Bank Transfer" },
  ];

  const handleSubmit$ = $(() => {
    submitted.value = true;
    formData.value = {
      plan: subscriptionPlan.value,
      payment: paymentMethod.value,
    };
  });

  return (
    <div class="max-w-md rounded-lg border border-border p-6 dark:border-border-dark">
      <h2 class="mb-4 text-lg font-medium">Subscription Form</h2>

      <form preventdefault:submit onSubmit$={handleSubmit$} class="space-y-6">
        <div>
          <FormLabel for="subscription-plan" required>
            Subscription Plan
          </FormLabel>
          <div class="mt-2">
            <RadioGroup
              options={subscriptionOptions}
              value={subscriptionPlan.value}
              name="subscription-plan"
              direction="vertical"
              onChange$={(value) => (subscriptionPlan.value = value)}
            />
          </div>
          <FormHelperText>
            Choose the plan that works best for your needs
          </FormHelperText>
        </div>

        <div>
          <FormLabel for="payment-method" required>
            Payment Method
          </FormLabel>
          <div class="mt-2">
            <RadioGroup
              options={paymentOptions}
              value={paymentMethod.value}
              name="payment-method"
              onChange$={(value) => (paymentMethod.value = value)}
            />
          </div>
          <FormHelperText>Select your preferred payment method</FormHelperText>
        </div>

        <div class="pt-2">
          <Button type="submit" variant="primary">
            Continue to Payment
          </Button>
        </div>
      </form>

      {submitted.value && formData.value && (
        <div class="mt-6 rounded-md border border-success-200 bg-success-50 p-4 dark:border-success-800 dark:bg-success-900/20">
          <h3 class="mb-2 text-sm font-medium text-success-700 dark:text-success-300">
            Form Submitted
          </h3>
          <div class="text-sm">
            <p>
              <span class="font-medium">Plan:</span> {subscriptionPlan.value}
            </p>
            <p>
              <span class="font-medium">Payment method:</span>{" "}
              {paymentMethod.value}
            </p>
          </div>
        </div>
      )}
    </div>
  );
});
