import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates";
import { PinInput } from "../PinInput";

/**
 * PinInput component overview and introduction
 */
export default component$(() => {
  return (
    <OverviewTemplate
      title="PinInput Overview"
      description="A specialized input component designed for entering sequential data like verification codes, PINs, and security tokens with intelligent navigation and validation."
    >
      {/* Hero Example */}
      <div class="mb-8 rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
        <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
          Interactive Demo
        </h3>
        <div class="max-w-md">
          <PinInput
            label="Verification Code"
            helperText="Enter the 4-digit code sent to your email"
            placeholder="○"
            size="lg"
            onValueChange$={(value) => console.log("PIN changed:", value)}
            onComplete$={(value) => console.log("PIN completed:", value)}
          />
        </div>
        <p class="mt-4 text-sm text-text-secondary dark:text-text-dark-secondary">
          Try typing, pasting, or using arrow keys to navigate between inputs.
        </p>
      </div>

      {/* Key Features */}
      <div class="mb-8">
        <h2 class="mb-4 text-xl font-semibold text-text-default dark:text-text-dark-default">
          Key Features
        </h2>
        <div class="grid gap-6 md:grid-cols-2">
          <div class="space-y-4">
            <div class="rounded-lg border border-success-200 dark:border-success-800 bg-success-50 dark:bg-success-950 p-4">
              <h3 class="mb-2 font-medium text-success-800 dark:text-success-200">
                🎯 Smart Input Validation
              </h3>
              <p class="text-sm text-success-700 dark:text-success-300">
                Automatically validates input based on type (numeric/alphanumeric) and prevents invalid characters from being entered.
              </p>
            </div>
            
            <div class="rounded-lg border border-info-200 dark:border-info-800 bg-info-50 dark:bg-info-950 p-4">
              <h3 class="mb-2 font-medium text-info-800 dark:text-info-200">
                ⚡ Intelligent Navigation
              </h3>
              <p class="text-sm text-info-700 dark:text-info-300">
                Auto-advances to the next input on entry, supports arrow key navigation, and handles backspace intelligently.
              </p>
            </div>
          </div>
          
          <div class="space-y-4">
            <div class="rounded-lg border border-warning-200 dark:border-warning-800 bg-warning-50 dark:bg-warning-950 p-4">
              <h3 class="mb-2 font-medium text-warning-800 dark:text-warning-200">
                📋 Clipboard Support
              </h3>
              <p class="text-sm text-warning-700 dark:text-warning-300">
                Paste multi-character codes directly. The component automatically distributes characters across inputs.
              </p>
            </div>
            
            <div class="rounded-lg border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-950 p-4">
              <h3 class="mb-2 font-medium text-primary-800 dark:text-primary-200">
                🔒 Security Options
              </h3>
              <p class="text-sm text-primary-700 dark:text-primary-300">
                Mask sensitive inputs with password-style hiding and provide secure form submission.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Scenarios */}
      <div class="mb-8">
        <h2 class="mb-4 text-xl font-semibold text-text-default dark:text-text-dark-default">
          Common Use Cases
        </h2>
        <div class="grid gap-4 md:grid-cols-3">
          <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4">
            <h3 class="mb-2 font-medium text-text-default dark:text-text-dark-default">
              Two-Factor Authentication
            </h3>
            <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
              Perfect for entering TOTP codes, SMS verification codes, and authenticator app tokens.
            </p>
            <div class="mt-3">
              <PinInput
                length={6}
                type="numeric"
                size="sm"
                placeholder="0"
                onValueChange$={() => {}}
              />
            </div>
          </div>
          
          <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4">
            <h3 class="mb-2 font-medium text-text-default dark:text-text-dark-default">
              Product Key Entry
            </h3>
            <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
              Ideal for software licenses, activation codes, and alphanumeric product keys.
            </p>
            <div class="mt-3">
              <PinInput
                length={5}
                type="alphanumeric"
                size="sm"
                placeholder="○"
                onValueChange$={() => {}}
              />
            </div>
          </div>
          
          <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4">
            <h3 class="mb-2 font-medium text-text-default dark:text-text-dark-default">
              Security PINs
            </h3>
            <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
              Secure PIN entry for banking, payment confirmation, and sensitive operations.
            </p>
            <div class="mt-3">
              <PinInput
                length={4}
                type="numeric"
                mask={true}
                size="sm"
                placeholder="●"
                onValueChange$={() => {}}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Design Principles */}
      <div class="mb-8">
        <h2 class="mb-4 text-xl font-semibold text-text-default dark:text-text-dark-default">
          Design Principles
        </h2>
        <div class="space-y-4">
          <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4">
            <h3 class="mb-2 font-medium text-text-default dark:text-text-dark-default">
              User Experience First
            </h3>
            <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
              The component prioritizes ease of use with automatic navigation, paste support, and clear visual feedback. Users can complete input tasks quickly and efficiently.
            </p>
          </div>
          
          <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4">
            <h3 class="mb-2 font-medium text-text-default dark:text-text-dark-default">
              Accessibility Built-in
            </h3>
            <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
              Full keyboard navigation, screen reader support, and ARIA attributes ensure the component works for all users, including those using assistive technologies.
            </p>
          </div>
          
          <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4">
            <h3 class="mb-2 font-medium text-text-default dark:text-text-dark-default">
              Mobile Optimized
            </h3>
            <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
              Touch-friendly sizing, appropriate virtual keyboards, and responsive design ensure excellent mobile experience across all device sizes.
            </p>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div class="mb-8">
        <h2 class="mb-4 text-xl font-semibold text-text-default dark:text-text-dark-default">
          Getting Started
        </h2>
        <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
          <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
            <code>{`import { PinInput } from "~/components/Core/Form";

export default component$(() => {
  const verificationCode = useSignal("");

  return (
    <PinInput
      label="Verification Code"
      value={verificationCode.value}
      length={6}
      type="numeric"
      onValueChange$={(value) => {
        verificationCode.value = value;
      }}
      onComplete$={(value) => {
        // Handle completed input
        submitVerificationCode(value);
      }}
      helperText="Enter the 6-digit code sent to your email"
    />
  );
});`}</code>
          </pre>
        </div>
      </div>

      {/* Performance */}
      <div class="rounded-lg border border-info-200 dark:border-info-800 bg-info-50 dark:bg-info-950 p-4">
        <h2 class="mb-2 text-lg font-medium text-info-800 dark:text-info-200">
          Performance Considerations
        </h2>
        <ul class="space-y-1 text-sm text-info-700 dark:text-info-300">
          <li>• Component uses efficient event handling to minimize re-renders</li>
          <li>• Input validation is performed client-side for immediate feedback</li>
          <li>• Paste operations are optimized to handle large clipboard content</li>
          <li>• Focus management is debounced to prevent excessive DOM manipulation</li>
          <li>• Auto-completion callbacks are called only when all inputs are filled</li>
        </ul>
      </div>
    </OverviewTemplate>
  );
});