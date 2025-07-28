import { component$ } from "@builder.io/qwik";
import {
  UsageTemplate,
  type UsageGuideline,
  type BestPractice,
  type AccessibilityTip,
} from "~/components/Docs/templates";

/**
 * PinInput component usage guidelines and best practices
 */
export default component$(() => {
  const guidelines: UsageGuideline[] = [
    {
      title: "Choose Appropriate Length",
      description: "Set the length based on your specific use case. Most verification codes are 4-6 digits, while product keys may be longer.",
      example: "Use length={6} for TOTP codes, length={4} for SMS verification, length={5} for product keys."
    },
    {
      title: "Select Correct Input Type",
      description: "Use 'numeric' for codes that only contain numbers, 'alphanumeric' for codes that include letters and numbers.",
      example: "type='numeric' for PIN codes and OTP, type='alphanumeric' for license keys and activation codes."
    },
    {
      title: "Provide Clear Context",
      description: "Always include descriptive labels and helper text to explain what the user should enter and where to find it.",
      example: "Label: 'Verification Code', Helper: 'Enter the 6-digit code sent to your email address.'"
    },
    {
      title: "Enable Auto-completion",
      description: "Use the onComplete$ callback to automatically proceed or validate when all fields are filled.",
      example: "Auto-submit forms, trigger validation, or advance to the next step when PIN entry is complete."
    }
  ];

  const bestPractices: BestPractice[] = [
    {
      title: "User Experience",
      description: "Best practices for optimal user experience with PinInput",
      category: "User Experience",
      practices: [
        {
          title: "Auto-focus First Input",
          description: "Enable autoFocus (default) so users can immediately start typing without clicking.",
          correct: "autoFocus={true} for immediate input readiness",
          incorrect: "Requiring users to click into the first field"
        },
        {
          title: "Support Paste Operations",
          description: "Allow users to paste complete codes for faster entry, especially on mobile devices.",
          correct: "Built-in paste support distributes characters across inputs",
          incorrect: "Forcing users to type each digit individually"
        },
        {
          title: "Provide Visual Feedback",
          description: "Use appropriate sizing and clear visual states for filled vs empty inputs.",
          correct: "size='lg' for mobile interfaces, clear placeholder characters",
          incorrect: "Too small inputs or unclear empty state indicators"
        }
      ]
    },
    {
      title: "Security",
      description: "Security considerations for PinInput implementation", 
      category: "Security",
      practices: [
        {
          title: "Mask Sensitive PINs",
          description: "Use the mask prop for security-sensitive PIN entries like banking or payment confirmation.",
          correct: "mask={true} for financial and security PINs",
          incorrect: "Showing sensitive PIN digits in plain text"
        },
        {
          title: "Clear on Errors",
          description: "Clear the PIN input when validation fails to prevent partial correct entries.",
          correct: "Reset value on invalid PIN to force complete re-entry",
          incorrect: "Leaving partially correct PIN visible after error"
        },
        {
          title: "Limit Attempts",
          description: "Implement attempt limiting and account lockout for security-critical PINs.",
          correct: "Disable component after 3-5 failed attempts",
          incorrect: "Allowing unlimited PIN entry attempts"
        }
      ]
    },
    {
      title: "Mobile Optimization",
      description: "Mobile-specific best practices for PinInput",
      category: "Mobile Optimization",
      practices: [
        {
          title: "Use Large Touch Targets",
          description: "Use size='lg' on mobile devices for better finger-friendly interaction.",
          correct: "size='lg' for mobile, size='md' for desktop",
          incorrect: "Using small inputs that are hard to tap accurately"
        },
        {
          title: "Trigger Numeric Keyboard",
          description: "For numeric PINs, ensure mobile devices show the numeric keypad.",
          correct: "type='numeric' automatically sets inputMode='numeric'",
          incorrect: "Showing full QWERTY keyboard for digit-only input"
        },
        {
          title: "Optimize Spacing",
          description: "Adjust spacing for mobile screens to prevent accidental touches.",
          correct: "spaced={true} for adequate finger spacing on mobile",
          incorrect: "Too tight spacing causing input errors on touch devices"
        }
      ]
    }
  ];

  const accessibilityTips: AccessibilityTip[] = [
    {
      title: "Descriptive Labels",
      description: "Provide clear labels and ARIA descriptions for screen reader users.",
      implementation: `<PinInput
  label="Two-Factor Authentication Code"
  ariaLabel="Enter 6-digit authentication code"
  helperText="Check your authenticator app for the code"
/>`
    },
    {
      title: "Error Announcements",
      description: "Ensure error messages are announced to screen readers when validation fails.",
      implementation: `<PinInput
  error="Invalid code. Please check and try again."
  aria-invalid={hasError}
  onValueChange$={(value) => {
    if (hasError) {
      // Clear error when user starts typing
      clearError();
    }
  }}
/>`
    },
    {
      title: "Keyboard Navigation",
      description: "Support full keyboard navigation including arrow keys and standard edit keys.",
      implementation: `// Built-in keyboard support:
// - Arrow Left/Right: Navigate between inputs
// - Backspace: Clear current, move to previous if empty
// - Delete: Clear current input
// - Home/End: Jump to first/last input
// - Ctrl+V: Paste operation`
    },
    {
      title: "Focus Management",
      description: "Manage focus appropriately during auto-advance and error states.",
      implementation: `<PinInput
  autoFocus={true}
  selectOnFocus={true}
  onComplete$={(value) => {
    // Validate and handle errors
    if (!isValid(value)) {
      // Reset and refocus first input
      resetPin();
      focusFirstInput();
    }
  }}
/>`
    }
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
    >
      <div class="mb-8">
        <h2 class="mb-4 text-xl font-semibold text-text-default dark:text-text-dark-default">
          When to Use PinInput
        </h2>
        <div class="grid gap-4 md:grid-cols-2">
          <div class="rounded-lg border border-success-200 dark:border-success-800 bg-success-50 dark:bg-success-950 p-4">
            <h3 class="mb-2 font-medium text-success-800 dark:text-success-200">
              ✅ Perfect For
            </h3>
            <ul class="space-y-1 text-sm text-success-700 dark:text-success-300">
              <li>• Two-factor authentication codes (TOTP, SMS)</li>
              <li>• Email and phone verification codes</li>
              <li>• Security PINs for banking and payments</li>
              <li>• Product keys and license codes</li>
              <li>• Game codes and voucher redemption</li>
              <li>• Short sequential data entry (3-10 characters)</li>
            </ul>
          </div>
          
          <div class="rounded-lg border border-warning-200 dark:border-warning-800 bg-warning-50 dark:bg-warning-950 p-4">
            <h3 class="mb-2 font-medium text-warning-800 dark:text-warning-200">
              ⚠️ Consider Alternatives For
            </h3>
            <ul class="space-y-1 text-sm text-warning-700 dark:text-warning-300">
              <li>• Long text input (use Input or TextArea)</li>
              <li>• Passwords (use PasswordField)</li>
              <li>• Credit card numbers (use specialized input)</li>
              <li>• Multi-line data entry</li>
              <li>• Complex validation requirements</li>
              <li>• Very long codes (&gt;10 characters)</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="mb-4 text-xl font-semibold text-text-default dark:text-text-dark-default">
          Common Implementation Patterns
        </h2>
        
        <div class="space-y-6">
          <div>
            <h3 class="mb-3 text-lg font-medium text-text-default dark:text-text-dark-default">
              Two-Factor Authentication
            </h3>
            <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
              <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
                <code>{`const [totpCode, setTotpCode] = useSignal("");
const [isVerifying, setIsVerifying] = useSignal(false);
const [error, setError] = useSignal("");

<PinInput
  label="Authentication Code"
  value={totpCode.value}
  length={6}
  type="numeric"
  size="lg"
  disabled={isVerifying.value}
  error={error.value}
  onValueChange$={(value) => {
    setTotpCode(value);
    if (error.value) setError(""); // Clear error on input
  }}
  onComplete$={async (value) => {
    setIsVerifying(true);
    try {
      await verifyTOTP(value);
      navigateToSecureArea();
    } catch (err) {
      setError("Invalid code. Please try again.");
      setTotpCode(""); // Clear on error
    } finally {
      setIsVerifying(false);
    }
  }}
  helperText="Enter the 6-digit code from your authenticator app"
  required
/>`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h3 class="mb-3 text-lg font-medium text-text-default dark:text-text-dark-default">
              Product Key Activation
            </h3>
            <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
              <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
                <code>{`const [productKey, setProductKey] = useSignal("");
const [validationStatus, setValidationStatus] = useSignal("");

<PinInput
  label="Product Key"
  value={productKey.value}
  length={5}
  type="alphanumeric"
  spaced={false}
  placeholder="-"
  size="lg"
  onValueChange$={(value) => {
    setProductKey(value.toUpperCase()); // Normalize to uppercase
    setValidationStatus("");
  }}
  onComplete$={async (value) => {
    const formatted = value.toUpperCase();
    try {
      const result = await validateProductKey(formatted);
      if (result.valid) {
        setValidationStatus("Valid license key");
        await activateLicense(formatted);
      } else {
        setValidationStatus("Invalid license key");
      }
    } catch (err) {
      setValidationStatus("Unable to validate. Please try again.");
    }
  }}
  helperText="Enter your 5-character product key"
  class="font-mono tracking-wider"
/>`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h3 class="mb-3 text-lg font-medium text-text-default dark:text-text-dark-default">
              Secure Banking PIN
            </h3>
            <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
              <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
                <code>{`const [securePin, setSecurePin] = useSignal("");
const [attempts, setAttempts] = useSignal(0);
const [isLocked, setIsLocked] = useSignal(false);

<PinInput
  label="Security PIN"
  value={securePin.value}
  length={4}
  type="numeric"
  mask={true}
  size="lg"
  disabled={isLocked.value}
  error={
    isLocked.value 
      ? "Account locked. Contact support." 
      : attempts.value > 0 
        ? \`Invalid PIN. \${3 - attempts.value} attempts remaining.\`
        : ""
  }
  onValueChange$={(value) => {
    setSecurePin(value);
  }}
  onComplete$={async (value) => {
    try {
      await validateSecurePin(value);
      // Reset attempts on success
      setAttempts(0);
      proceedToSecureTransaction();
    } catch (err) {
      const newAttempts = attempts.value + 1;
      setAttempts(newAttempts);
      setSecurePin(""); // Clear PIN on error
      
      if (newAttempts >= 3) {
        setIsLocked(true);
        await lockAccount();
      }
    }
  }}
  helperText={
    isLocked.value 
      ? "Account has been locked for security"
      : "Enter your 4-digit security PIN"
  }
  required
/>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="mb-4 text-xl font-semibold text-text-default dark:text-text-dark-default">
          Mobile-Specific Considerations
        </h2>
        <div class="grid gap-4 md:grid-cols-2">
          <div class="space-y-3">
            <h3 class="font-medium text-text-default dark:text-text-dark-default">
              Touch Optimization
            </h3>
            <ul class="space-y-2 text-sm text-text-secondary dark:text-text-dark-secondary">
              <li>• Use size="lg" for better touch targets</li>
              <li>• Ensure adequate spacing between inputs</li>
              <li>• Test on actual devices for finger accessibility</li>
              <li>• Consider haptic feedback for successful entry</li>
            </ul>
          </div>
          <div class="space-y-3">
            <h3 class="font-medium text-text-default dark:text-text-dark-default">
              Keyboard Behavior
            </h3>
            <ul class="space-y-2 text-sm text-text-secondary dark:text-text-dark-secondary">
              <li>• Numeric inputs trigger number keypad</li>
              <li>• Alphanumeric shows appropriate keyboard</li>
              <li>• Auto-advance reduces tap requirements</li>
              <li>• Paste support for received codes</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="mb-4 text-xl font-semibold text-text-default dark:text-text-dark-default">
          Security Best Practices
        </h2>
        
        <div class="space-y-4">
          <div class="rounded-lg border border-error-200 dark:border-error-800 bg-error-50 dark:bg-error-950 p-4">
            <h3 class="mb-2 font-medium text-error-800 dark:text-error-200">
              🔒 Security Guidelines
            </h3>
            <ul class="space-y-1 text-sm text-error-700 dark:text-error-300">
              <li>• Use mask={true} for sensitive PIN entries</li>
              <li>• Implement attempt limiting (3-5 attempts maximum)</li>
              <li>• Clear input values on validation failure</li>
              <li>• Avoid logging or storing PIN values in plain text</li>
              <li>• Implement proper session timeout</li>
              <li>• Use HTTPS for all PIN-related communications</li>
            </ul>
          </div>
          
          <div class="rounded-lg border border-info-200 dark:border-info-800 bg-info-50 dark:bg-info-950 p-4">
            <h3 class="mb-2 font-medium text-info-800 dark:text-info-200">
              💡 UX Security Balance
            </h3>
            <ul class="space-y-1 text-sm text-info-700 dark:text-info-300">
              <li>• Provide clear error messages without revealing system details</li>
              <li>• Show remaining attempts to help users succeed</li>
              <li>• Offer account recovery options when locked</li>
              <li>• Consider progressive delays instead of immediate lockout</li>
              <li>• Provide alternative authentication methods</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="rounded-lg border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-950 p-6">
        <h2 class="mb-4 text-xl font-semibold text-primary-800 dark:text-primary-200">
          Implementation Checklist
        </h2>
        <div class="grid gap-4 md:grid-cols-2">
          <div>
            <h3 class="mb-2 font-medium text-primary-800 dark:text-primary-200">
              Basic Setup
            </h3>
            <ul class="space-y-1 text-sm text-primary-700 dark:text-primary-300">
              <li>☐ Set appropriate length for your use case</li>
              <li>☐ Choose correct input type (numeric/alphanumeric)</li>
              <li>☐ Add descriptive label and helper text</li>
              <li>☐ Implement onValueChange$ and onComplete$ handlers</li>
            </ul>
          </div>
          <div>
            <h3 class="mb-2 font-medium text-primary-800 dark:text-primary-200">
              Advanced Features
            </h3>
            <ul class="space-y-1 text-sm text-primary-700 dark:text-primary-300">
              <li>☐ Enable masking for sensitive data</li>
              <li>☐ Add error handling and validation</li>
              <li>☐ Test keyboard navigation and paste support</li>
              <li>☐ Verify mobile keyboard behavior</li>
            </ul>
          </div>
        </div>
      </div>
    </UsageTemplate>
  );
});