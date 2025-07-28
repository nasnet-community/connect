import { component$ } from "@builder.io/qwik";
import {
  APIReferenceTemplate,
  type PropDefinition,
  type EventDefinition,
  type TypeDefinition,
} from "~/components/Docs/templates";

/**
 * PinInput component API reference documentation
 */
export default component$(() => {
  const props: PropDefinition[] = [
    {
      name: "value",
      type: "string",
      defaultValue: '""',
      description: "Current value of the PIN input. Each character represents one input field.",
      required: false,
      example: '"1234"'
    },
    {
      name: "onValueChange$",
      type: "QRL<(value: string) => void>",
      defaultValue: "undefined",
      description: "Callback fired when the PIN value changes. Called on every character input or deletion.",
      required: false,
      example: "(value) => console.log(value)"
    },
    {
      name: "onComplete$",
      type: "QRL<(value: string) => void>",
      defaultValue: "undefined", 
      description: "Callback fired when all input fields are filled. Useful for auto-submission.",
      required: false,
      example: "(value) => submitForm(value)"
    },
    {
      name: "length",
      type: "number",
      defaultValue: "4",
      description: "Number of input fields to display. Supports 2-10 inputs for practical use cases.",
      required: false,
      example: "6"
    },
    {
      name: "type",
      type: '"numeric" | "alphanumeric"',
      defaultValue: '"numeric"',
      description: "Type of input validation. Numeric allows only digits 0-9, alphanumeric allows letters and numbers.",
      required: false,
      example: '"alphanumeric"'
    },
    {
      name: "mask",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to mask the input like a password field. Shows dots instead of actual characters.",
      required: false,
      example: "true"
    },
    {
      name: "label",
      type: "string",
      defaultValue: "undefined",
      description: "Label text displayed above the input group. Used for accessibility and form structure.",
      required: false,
      example: '"Verification Code"'
    },
    {
      name: "helperText",
      type: "string",
      defaultValue: "undefined",
      description: "Helper text displayed below the inputs. Provides additional context or instructions.",
      required: false,
      example: '"Enter the code sent to your email"'
    },
    {
      name: "error",
      type: "string",
      defaultValue: "undefined",
      description: "Error message to display. When present, the component shows error styling.",
      required: false,
      example: '"Invalid code. Please try again."'
    },
    {
      name: "id",
      type: "string",
      defaultValue: "auto-generated",
      description: "HTML id attribute for the first input. Other inputs get sequential ids.",
      required: false,
      example: '"verification-code"'
    },
    {
      name: "name",
      type: "string",
      defaultValue: "undefined",
      description: "HTML name attribute for form submission. Creates a hidden input with the combined value.",
      required: false,
      example: '"pin_code"'
    },
    {
      name: "required",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the PIN input is required for form validation. Applies to the first input.",
      required: false,
      example: "true"
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Whether all input fields are disabled. Prevents user interaction and shows disabled styling.",
      required: false,
      example: "true"
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      defaultValue: '"md"',
      description: "Size variant of the input fields. Affects height, width, and font size.",
      required: false,
      example: '"lg"'
    },
    {
      name: "autoFocus",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to automatically focus the first input when the component mounts.",
      required: false,
      example: "false"
    },
    {
      name: "selectOnFocus",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to select all text when an input receives focus. Useful for easy replacement.",
      required: false,
      example: "false"
    },
    {
      name: "placeholder",
      type: "string",
      defaultValue: '"○"',
      description: "Placeholder character shown in empty input fields. Should be a single character.",
      required: false,
      example: '"●"'
    },
    {
      name: "spaced",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to add spacing between input fields. False creates a more compact layout.",
      required: false,
      example: "false"
    },
    {
      name: "ariaLabel",
      type: "string",
      defaultValue: "undefined",
      description: "ARIA label for the input group. Falls back to label prop if not provided.",
      required: false,
      example: '"Enter security PIN"'
    },
    {
      name: "class",
      type: "string",
      defaultValue: "undefined",
      description: "Additional CSS classes to apply to the component container.",
      required: false,
      example: '"custom-pin-input"'
    }
  ];

  const events: EventDefinition[] = [
    {
      name: "onValueChange$",
      parameters: [
        { name: "value", type: "string", description: "Current combined value of all inputs" }
      ],
      description: "Fired whenever the PIN value changes. This includes character entry, deletion, and paste operations.",
      example: `onValueChange$={(value) => {
  console.log("Current PIN:", value);
  setFormData({ ...formData, pin: value });
}}`
    },
    {
      name: "onComplete$",
      parameters: [
        { name: "value", type: "string", description: "Complete PIN value when all fields are filled" }
      ],
      description: "Fired when all input fields contain valid characters. Ideal for triggering auto-submission or validation.",
      example: `onComplete$={async (value) => {
  console.log("PIN completed:", value);
  await validatePin(value);
  if (isValid) {
    await submitForm();
  }
}}`
    }
  ];

  const types: TypeDefinition[] = [
    {
      name: "PinInputSize",
      definition: '"sm" | "md" | "lg"',
      description: "Available size variants for the PIN input component"
    },
    {
      name: "PinInputType", 
      definition: '"numeric" | "alphanumeric"',
      description: "Input validation types determining which characters are allowed"
    },
    {
      name: "PinInputProps",
      definition: `{
  value?: string;
  onValueChange$?: QRL<(value: string) => void>;
  onComplete$?: QRL<(value: string) => void>;
  length?: number;
  type?: PinInputType;
  mask?: boolean;
  label?: string;
  helperText?: string;
  error?: string;
  id?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  size?: PinInputSize;
  autoFocus?: boolean;
  selectOnFocus?: boolean;
  placeholder?: string;
  spaced?: boolean;
  ariaLabel?: string;
  class?: string;
}`,
      description: "Complete props interface for the PinInput component"
    }
  ];

  return (
    <APIReferenceTemplate
      title="PinInput API Reference"
      description="Complete API documentation for the PinInput component including props, events, and TypeScript definitions."
      props={props}
      events={events}
      types={types}
    >
      {/* Usage Examples */}
      <div class="mb-8">
        <h2 class="mb-4 text-xl font-semibold text-text-default dark:text-text-dark-default">
          Common Usage Patterns
        </h2>
        
        <div class="space-y-6">
          {/* Basic Usage */}
          <div>
            <h3 class="mb-3 text-lg font-medium text-text-default dark:text-text-dark-default">
              Basic PIN Input
            </h3>
            <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
              <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
                <code>{`const verificationCode = useSignal("");

<PinInput
  label="Verification Code"
  value={verificationCode.value}
  onValueChange$={(value) => {
    verificationCode.value = value;
  }}
  helperText="Enter the 4-digit code"
/>`}</code>
              </pre>
            </div>
          </div>

          {/* Advanced Usage */}
          <div>
            <h3 class="mb-3 text-lg font-medium text-text-default dark:text-text-dark-default">
              Advanced Configuration
            </h3>
            <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
              <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
                <code>{`const securePin = useSignal("");
const isSubmitting = useSignal(false);

<PinInput
  label="Security PIN"
  value={securePin.value}
  length={6}
  type="numeric"
  mask={true}
  size="lg"
  required={true}
  disabled={isSubmitting.value}
  onValueChange$={(value) => {
    securePin.value = value;
    // Clear any previous errors
    clearErrors();
  }}
  onComplete$={async (value) => {
    isSubmitting.value = true;
    try {
      await validateSecurePin(value);
      await proceedToNextStep();
    } catch (error) {
      setError("Invalid PIN. Please try again.");
    } finally {
      isSubmitting.value = false;
    }
  }}
  error={errorMessage.value}
  helperText="Enter your 6-digit security PIN"
  ariaLabel="Security PIN for account verification"
/>`}</code>
              </pre>
            </div>
          </div>

          {/* Form Integration */}
          <div>
            <h3 class="mb-3 text-lg font-medium text-text-default dark:text-text-dark-default">
              Form Integration
            </h3>
            <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
              <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
                <code>{`const formData = useStore({
  email: "",
  verificationCode: "",
  productKey: ""
});

<form preventdefault:submit onSubmit$={handleSubmit}>
  <PinInput
    name="verification_code"
    label="Email Verification"
    value={formData.verificationCode}
    length={6}
    type="numeric"
    required={true}
    onValueChange$={(value) => {
      formData.verificationCode = value;
    }}
  />
  
  <PinInput
    name="product_key"
    label="Product Key"
    value={formData.productKey}
    length={5}
    type="alphanumeric"
    spaced={false}
    placeholder="-"
    onValueChange$={(value) => {
      formData.productKey = value;
    }}
  />
  
  <button type="submit">Submit</button>
</form>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Accessibility Notes */}
      <div class="mb-8">
        <h2 class="mb-4 text-xl font-semibold text-text-default dark:text-text-dark-default">
          Accessibility Implementation
        </h2>
        <div class="space-y-4">
          <div class="rounded-lg border border-info-200 dark:border-info-800 bg-info-50 dark:bg-info-950 p-4">
            <h3 class="mb-2 font-medium text-info-800 dark:text-info-200">
              Keyboard Navigation
            </h3>
            <ul class="space-y-1 text-sm text-info-700 dark:text-info-300">
              <li>• <kbd>Arrow Left/Right</kbd> - Navigate between inputs</li>
              <li>• <kbd>Backspace</kbd> - Clear current input, move to previous if empty</li>
              <li>• <kbd>Delete</kbd> - Clear current input</li>
              <li>• <kbd>Home</kbd> - Jump to first input</li>
              <li>• <kbd>End</kbd> - Jump to last input</li>
              <li>• <kbd>Ctrl+V</kbd> - Paste multi-character content</li>
            </ul>
          </div>
          
          <div class="rounded-lg border border-success-200 dark:border-success-800 bg-success-50 dark:bg-success-950 p-4">
            <h3 class="mb-2 font-medium text-success-800 dark:text-success-200">
              Screen Reader Support
            </h3>
            <ul class="space-y-1 text-sm text-success-700 dark:text-success-300">
              <li>• Each input announces its position ("Digit 1 of 4")</li>
              <li>• Group role identifies the input collection</li>
              <li>• Error states are announced with aria-invalid</li>
              <li>• Value changes are announced in real-time</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Browser Support */}
      <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4">
        <h2 class="mb-3 text-lg font-medium text-text-default dark:text-text-dark-default">
          Browser Support
        </h2>
        <div class="grid gap-4 md:grid-cols-2">
          <div>
            <h3 class="mb-2 text-sm font-medium text-text-default dark:text-text-dark-default">
              Desktop Browsers
            </h3>
            <ul class="space-y-1 text-sm text-text-secondary dark:text-text-dark-secondary">
              <li>• Chrome 90+ (Full support)</li>
              <li>• Firefox 88+ (Full support)</li>
              <li>• Safari 14+ (Full support)</li>
              <li>• Edge 90+ (Full support)</li>
            </ul>
          </div>
          <div>
            <h3 class="mb-2 text-sm font-medium text-text-default dark:text-text-dark-default">
              Mobile Browsers
            </h3>
            <ul class="space-y-1 text-sm text-text-secondary dark:text-text-dark-secondary">
              <li>• iOS Safari 14+ (Full support)</li>
              <li>• Chrome Mobile 90+ (Full support)</li>
              <li>• Samsung Internet 15+ (Full support)</li>
              <li>• Firefox Mobile 88+ (Full support)</li>
            </ul>
          </div>
        </div>
      </div>
    </APIReferenceTemplate>
  );
});