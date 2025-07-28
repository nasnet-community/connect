import { component$ } from "@builder.io/qwik";
import { useSignal } from "@builder.io/qwik";
import { PinInput } from "../PinInput";

export const BasicPinInput = component$(() => {
  const pin1 = useSignal("");
  const pin2 = useSignal("");
  const pin3 = useSignal("");
  const pin4 = useSignal("");
  const pin5 = useSignal("");
  const pin6 = useSignal("");

  return (
    <div class="space-y-6">
      <div>
        <h3 class="mb-4 text-lg font-medium">Basic PIN Input</h3>
        <PinInput
          label="Enter verification code"
          value={pin1.value}
          onValueChange$={(val) => (pin1.value = val)}
          helperText="A 4-digit code was sent to your email"
        />
        <p class="text-text-secondary mt-2 text-sm">
          Current value: {pin1.value || "(empty)"}
        </p>
      </div>

      <div>
        <h3 class="mb-4 text-lg font-medium">6-Digit PIN</h3>
        <PinInput
          label="Enter 6-digit code"
          value={pin2.value}
          onValueChange$={(val) => (pin2.value = val)}
          length={6}
          helperText="Enter the 6-digit verification code"
        />
      </div>

      <div>
        <h3 class="mb-4 text-lg font-medium">Alphanumeric PIN</h3>
        <PinInput
          label="Enter product key"
          value={pin3.value}
          onValueChange$={(val) => (pin3.value = val)}
          type="alphanumeric"
          length={5}
          helperText="Letters and numbers allowed"
        />
      </div>

      <div>
        <h3 class="mb-4 text-lg font-medium">Masked PIN (Password Style)</h3>
        <PinInput
          label="Enter secure PIN"
          value={pin4.value}
          onValueChange$={(val) => (pin4.value = val)}
          mask={true}
          helperText="Your input is hidden for security"
        />
      </div>

      <div>
        <h3 class="mb-4 text-lg font-medium">With Completion Handler</h3>
        <PinInput
          label="Auto-submit PIN"
          value={pin5.value}
          onValueChange$={(val) => (pin5.value = val)}
          onComplete$={(val) => {
            alert(`PIN complete: ${val}`);
          }}
          helperText="Form will auto-submit when complete"
        />
      </div>

      <div>
        <h3 class="mb-4 text-lg font-medium">Error State</h3>
        <PinInput
          label="Verification code"
          value={pin6.value}
          onValueChange$={(val) => (pin6.value = val)}
          error="Invalid verification code. Please try again."
        />
      </div>

      <div>
        <h3 class="mb-4 text-lg font-medium">Size Variants</h3>
        <div class="space-y-4">
          <PinInput
            label="Small"
            value={pin1.value}
            onValueChange$={(val) => (pin1.value = val)}
            size="sm"
          />
          <PinInput
            label="Medium (Default)"
            value={pin2.value}
            onValueChange$={(val) => (pin2.value = val)}
            size="md"
          />
          <PinInput
            label="Large"
            value={pin3.value}
            onValueChange$={(val) => (pin3.value = val)}
            size="lg"
          />
        </div>
      </div>

      <div>
        <h3 class="mb-4 text-lg font-medium">Disabled State</h3>
        <PinInput
          label="Disabled PIN"
          value="1234"
          disabled
          helperText="This PIN input is disabled"
        />
      </div>

      <div>
        <h3 class="mb-4 text-lg font-medium">Compact Spacing</h3>
        <PinInput
          label="Compact PIN"
          value={pin1.value}
          onValueChange$={(val) => (pin1.value = val)}
          spaced={false}
          helperText="Inputs are closer together"
        />
      </div>
    </div>
  );
});
