import { component$, useSignal } from "@builder.io/qwik";
import { Checkbox } from "../index";

export default component$(() => {
  const termsChecked = useSignal(false);
  const newsletterChecked = useSignal(false);
  const inlineChecked = useSignal(false);

  return (
    <div class="space-y-6">
      <div>
        <h3 class="mb-2 text-sm font-semibold">Checkbox with Helper Text</h3>
        <Checkbox
          checked={termsChecked.value}
          onChange$={(checked) => (termsChecked.value = checked)}
          label="Accept terms and conditions"
          helperText="By checking this box, you agree to our Terms of Service and Privacy Policy."
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Checkbox with Required Field</h3>
        <Checkbox
          checked={newsletterChecked.value}
          onChange$={(checked) => (newsletterChecked.value = checked)}
          label="Subscribe to newsletter"
          helperText="Receive updates about products and services."
          required
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Inline Checkbox</h3>
        <div class="flex items-center gap-2">
          <Checkbox
            checked={inlineChecked.value}
            onChange$={(checked) => (inlineChecked.value = checked)}
            inline
            aria-label="Inline checkbox example"
          />
          <span class="text-sm">
            This checkbox has no built-in label (using inline mode)
          </span>
        </div>
      </div>
    </div>
  );
});
