import { component$ } from "@builder.io/qwik";
import { ExamplesTemplate, type Example } from "~/components/Docs/templates";
import { BasicPinInput } from "../Examples/BasicPinInput";

/**
 * PinInput component examples documentation
 */
export default component$(() => {
  const examples: Example[] = [
    {
      title: "Basic PIN Input",
      description: "Fundamental PIN input patterns including different lengths, types, and basic states. Shows core functionality and common configurations.",
      component: <BasicPinInput />,
      code: `import { component$, useSignal } from "@builder.io/qwik";
import { PinInput } from "~/components/Core/Form";

export default component$(() => {
  const verificationCode = useSignal("");

  return (
    <PinInput
      label="Verification Code"
      value={verificationCode.value}
      length={4}
      type="numeric"
      onValueChange$={(value) => {
        verificationCode.value = value;
      }}
      onComplete$={(value) => {
        console.log("PIN completed:", value);
      }}
      helperText="Enter the 4-digit code sent to your email"
    />
  );
});`
    },
    {
      title: "Two-Factor Authentication",
      description: "TOTP and SMS verification code input with real-time validation and auto-submission patterns.",
      component: (
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <p class="mb-4 text-text-secondary dark:text-text-dark-secondary">
            Complete 2FA implementation with error handling:
          </p>
          <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
            <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
              <code>{`const [totpCode, setTotpCode] = useSignal("");
const [isVerifying, setIsVerifying] = useSignal(false);
const [error, setError] = useSignal("");
const [attempts, setAttempts] = useSignal(0);

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
      // Success - redirect to dashboard
      navigateToSecureArea();
    } catch (err) {
      const newAttempts = attempts.value + 1;
      setAttempts(newAttempts);
      setTotpCode(""); // Clear on error
      
      if (newAttempts >= 3) {
        setError("Too many failed attempts. Please wait 5 minutes.");
        setTimeout(() => setAttempts(0), 300000); // Reset after 5 min
      } else {
        setError(\`Invalid code. \${3 - newAttempts} attempts remaining.\`);
      }
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
      )
    },
    {
      title: "Product Key & License Activation",
      description: "Alphanumeric product key entry with formatting, validation, and activation workflows.",
      component: (
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <p class="mb-4 text-text-secondary dark:text-text-dark-secondary">
            Product key entry with auto-formatting and validation:
          </p>
          <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
            <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
              <code>{`const [productKey, setProductKey] = useSignal("");
const [validationState, setValidationState] = useSignal("idle");
const [licenseInfo, setLicenseInfo] = useSignal(null);

<PinInput
  label="Product License Key"
  value={productKey.value}
  length={5}
  type="alphanumeric"
  spaced={false}
  placeholder="-"
  size="lg"
  disabled={validationState.value === "validating"}
  error={
    validationState.value === "invalid" 
      ? "Invalid license key. Please check and try again."
      : ""
  }
  onValueChange$={(value) => {
    // Auto-format to uppercase
    const formatted = value.toUpperCase();
    setProductKey(formatted);
    setValidationState("idle");
  }}
  onComplete$={async (value) => {
    const formatted = value.toUpperCase();
    setValidationState("validating");
    
    try {
      const result = await validateLicenseKey(formatted);
      
      if (result.valid) {
        setLicenseInfo(result.license);
        setValidationState("valid");
        
        // Auto-activate license
        await activateLicense(formatted, result.license);
        showSuccessNotification("License activated successfully!");
      } else {
        setValidationState("invalid");
        setProductKey(""); // Clear invalid key
      }
    } catch (error) {
      setValidationState("invalid");
      setProductKey("");
    }
  }}
  helperText={
    validationState.value === "validating"
      ? "Validating license key..."
      : "Enter your 5-character product key (e.g., ABC12)"
  }
  class="font-mono tracking-wider"
/>`}</code>
            </pre>
          </div>
        </div>
      )
    },
    {
      title: "Secure Banking PIN",
      description: "Masked PIN input with attempt limiting, progressive delays, and account security features.",
      component: (
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <p class="mb-4 text-text-secondary dark:text-text-dark-secondary">
            High-security PIN entry with comprehensive protection:
          </p>
          <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
            <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
              <code>{`const [securePin, setSecurePin] = useSignal("");
const [attempts, setAttempts] = useSignal(0);
const [isLocked, setIsLocked] = useSignal(false);
const [lockoutTimer, setLockoutTimer] = useSignal(0);
const [isProcessing, setIsProcessing] = useSignal(false);

<PinInput
  label="Security PIN"
  value={securePin.value}
  length={4}
  type="numeric"
  mask={true}
  size="lg"
  disabled={isLocked.value || isProcessing.value}
  error={
    isLocked.value 
      ? \`Account locked. Try again in \${Math.ceil(lockoutTimer.value / 60)} minutes.\`
      : attempts.value > 0 
        ? \`Invalid PIN. \${3 - attempts.value} attempts remaining.\`
        : ""
  }
  onValueChange$={(value) => {
    setSecurePin(value);
  }}
  onComplete$={async (value) => {
    setIsProcessing(true);
    
    try {
      // Add deliberate delay for security
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const isValid = await validateSecurePin(value);
      
      if (isValid) {
        // Success - reset attempts and proceed
        setAttempts(0);
        setSecurePin("");
        showSuccessMessage("PIN verified successfully");
        proceedToSecureTransaction();
      } else {
        // Failed attempt
        const newAttempts = attempts.value + 1;
        setAttempts(newAttempts);
        setSecurePin(""); // Clear PIN
        
        if (newAttempts >= 3) {
          // Lock account with progressive delay
          const lockDuration = Math.min(newAttempts * 5, 30) * 60; // 5-30 min
          setIsLocked(true);
          setLockoutTimer(lockDuration);
          
          // Start countdown timer
          const timer = setInterval(() => {
            setLockoutTimer(prev => {
              if (prev <= 1) {
                clearInterval(timer);
                setIsLocked(false);
                setAttempts(0);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
          
          await logSecurityEvent("pin_lockout", { attempts: newAttempts });
        }
      }
    } catch (error) {
      showErrorMessage("Unable to verify PIN. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }}
  helperText={
    isLocked.value 
      ? "Account locked for security. Please wait or contact support."
      : isProcessing.value
        ? "Verifying PIN..."
        : "Enter your 4-digit security PIN"
  }
  required
/>`}</code>
            </pre>
          </div>
        </div>
      )
    },
    {
      title: "Mobile-Optimized PIN Entry",
      description: "Touch-friendly PIN input with haptic feedback, responsive sizing, and mobile-specific optimizations.",
      component: (
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <p class="mb-4 text-text-secondary dark:text-text-dark-secondary">
            Mobile-first PIN input with enhanced touch experience:
          </p>
          <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
            <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
              <code>{`const [mobilePin, setMobilePin] = useSignal("");
const [isMobile, setIsMobile] = useSignal(false);

// Detect mobile device
useVisibleTask$(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
  };
  checkMobile();
  window.addEventListener('resize', checkMobile);
  return () => window.removeEventListener('resize', checkMobile);
});

// Haptic feedback for mobile
const triggerHaptic = $(() => {
  if (isMobile.value && 'vibrate' in navigator) {
    navigator.vibrate(50); // Short vibration
  }
});

<PinInput
  label="Mobile PIN"
  value={mobilePin.value}
  length={4}
  type="numeric"
  size={isMobile.value ? "lg" : "md"}
  placeholder={isMobile.value ? "●" : "○"}
  onValueChange$={(value) => {
    setMobilePin(value);
    triggerHaptic(); // Haptic feedback on input
  }}
  onComplete$={async (value) => {
    // Double haptic feedback on completion
    if (isMobile.value && 'vibrate' in navigator) {
      navigator.vibrate([50, 100, 50]);
    }
    
    // Process PIN
    await processMobilePIN(value);
  }}
  helperText={
    isMobile.value 
      ? "Tap the digits below or use your device keypad"
      : "Enter your 4-digit PIN"
  }
  class={[
    isMobile.value && "touch-manipulation",
    "transition-all duration-200"
  ]}
/>

{/* Optional: Custom numeric keypad for mobile */}
{isMobile.value && (
  <div class="mt-4 grid grid-cols-3 gap-3 max-w-xs mx-auto">
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, "clear", 0, "delete"].map((key) => (
      <button
        key={key}
        type="button"
        onClick$={() => {
          if (key === "clear") {
            setMobilePin("");
          } else if (key === "delete") {
            setMobilePin(prev => prev.slice(0, -1));
          } else if (mobilePin.value.length < 4) {
            setMobilePin(prev => prev + key);
          }
          triggerHaptic();
        }}
        class={[
          "h-12 w-12 rounded-full border border-border dark:border-border-dark",
          "bg-surface-light-DEFAULT dark:bg-surface-dark-DEFAULT",
          "text-text-default dark:text-text-dark-default",
          "font-medium text-lg touch-manipulation",
          "active:scale-95 transition-transform duration-100",
          "hover:bg-surface-light-secondary dark:hover:bg-surface-dark-secondary",
          (key === "clear" || key === "delete") && "text-sm bg-surface-light-tertiary dark:bg-surface-dark-tertiary"
        ]}
      >
        {key === "clear" ? "CLR" : key === "delete" ? "DEL" : key}
      </button>
    ))}
  </div>
)}`}</code>
            </pre>
          </div>
        </div>
      )
    },
    {
      title: "Multi-Step Verification Flow",
      description: "Complex verification workflow with multiple PIN inputs, progress tracking, and error recovery.",
      component: (
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <p class="mb-4 text-text-secondary dark:text-text-dark-secondary">
            Advanced multi-step verification with progress tracking:
          </p>
          <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
            <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
              <code>{`const [currentStep, setCurrentStep] = useSignal(1);
const [verificationData, setVerificationData] = useStore({
  emailCode: "",
  phoneCode: "",
  backupCode: ""
});
const [stepErrors, setStepErrors] = useStore({
  email: "",
  phone: "",
  backup: ""
});

const steps = [
  { id: 1, title: "Email Verification", field: "emailCode", length: 6 },
  { id: 2, title: "Phone Verification", field: "phoneCode", length: 4 },
  { id: 3, title: "Backup Code", field: "backupCode", length: 8 }
];

const currentStepData = steps.find(s => s.id === currentStep.value);

<div class="space-y-6">
  {/* Progress indicator */}
  <div class="flex justify-between mb-6">
    {steps.map(step => (
      <div
        key={step.id}
        class={[
          "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium",
          step.id < currentStep.value 
            ? "bg-success-500 text-white" 
            : step.id === currentStep.value 
              ? "bg-primary-500 text-white"
              : "bg-surface-light-tertiary dark:bg-surface-dark-tertiary text-text-secondary dark:text-text-dark-secondary"
        ]}
      >
        {step.id < currentStep.value ? "✓" : step.id}
      </div>
    ))}
  </div>

  {/* Current step PIN input */}
  <PinInput
    label={currentStepData.title}
    value={verificationData[currentStepData.field]}
    length={currentStepData.length}
    type={currentStepData.field === "backupCode" ? "alphanumeric" : "numeric"}
    size="lg"
    error={stepErrors[currentStepData.field.replace("Code", "")]}
    onValueChange$={(value) => {
      verificationData[currentStepData.field] = value;
      // Clear error when user starts typing
      const errorField = currentStepData.field.replace("Code", "");
      stepErrors[errorField] = "";
    }}
    onComplete$={async (value) => {
      try {
        // Verify current step
        await verifyStep(currentStep.value, value);
        
        if (currentStep.value < steps.length) {
          // Move to next step
          setCurrentStep(currentStep.value + 1);
        } else {
          // All steps completed
          await completeVerification(verificationData);
          showSuccessMessage("Verification completed successfully!");
        }
      } catch (error) {
        const errorField = currentStepData.field.replace("Code", "");
        stepErrors[errorField] = error.message;
        verificationData[currentStepData.field] = ""; // Clear on error
      }
    }}
    helperText={getStepHelperText(currentStep.value)}
    autoFocus={true}
  />

  {/* Step navigation */}
  <div class="flex justify-between">
    <button
      type="button"
      onClick$={() => {
        if (currentStep.value > 1) {
          setCurrentStep(currentStep.value - 1);
        }
      }}
      disabled={currentStep.value === 1}
      class="px-4 py-2 text-sm font-medium rounded-md border border-border dark:border-border-dark disabled:opacity-50"
    >
      Previous
    </button>
    
    <button
      type="button"
      onClick$={() => {
        // Skip current step (if allowed)
        if (currentStep.value < steps.length) {
          setCurrentStep(currentStep.value + 1);
        }
      }}
      class="px-4 py-2 text-sm font-medium text-text-secondary dark:text-text-dark-secondary"
    >
      Skip This Step
    </button>
  </div>
</div>`}</code>
            </pre>
          </div>
        </div>
      )
    }
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <div class="mb-8">
        <p class="text-text-secondary dark:text-text-dark-secondary">
          The PinInput component provides secure, user-friendly input for verification codes, PINs, and 
          sequential data. These examples demonstrate real-world implementation patterns from basic usage 
          to complex multi-step verification flows.
        </p>
      </div>

      <div class="mb-8 rounded-lg border border-info-200 dark:border-info-800 bg-info-50 dark:bg-info-950 p-4">
        <h3 class="mb-2 font-medium text-info-800 dark:text-info-200">
          💡 Implementation Tips
        </h3>
        <ul class="space-y-1 text-sm text-info-700 dark:text-info-300">
          <li>• Set appropriate length based on your verification system (4-6 for most codes)</li>
          <li>• Use type="numeric" for digits only, "alphanumeric" for mixed content</li>
          <li>• Enable masking for sensitive PINs with mask={true}</li>
          <li>• Implement onComplete$ for automatic validation and progression</li>
          <li>• Clear values on validation errors to prevent partial entries</li>
          <li>• Use size="lg" for mobile-first interfaces</li>
          <li>• Provide clear error messages with attempt limits</li>
          <li>• Consider haptic feedback for enhanced mobile experience</li>
        </ul>
      </div>

      <div class="mb-8 rounded-lg border border-success-200 dark:border-success-800 bg-success-50 dark:bg-success-950 p-4">
        <h3 class="mb-2 font-medium text-success-800 dark:text-success-200">
          ✅ Security Best Practices
        </h3>
        <ul class="space-y-1 text-sm text-success-700 dark:text-success-300">
          <li>• Always validate PIN/codes on the server side</li>
          <li>• Implement attempt limiting with progressive delays</li>
          <li>• Clear sensitive values from memory after use</li>
          <li>• Use HTTPS for all verification communications</li>
          <li>• Log security events for monitoring and audit</li>
          <li>• Provide account recovery options for locked accounts</li>
          <li>• Consider implementing CAPTCHA after failed attempts</li>
          <li>• Use secure random number generation for codes</li>
        </ul>
      </div>

      <div class="mb-8 rounded-lg border border-warning-200 dark:border-warning-800 bg-warning-50 dark:bg-warning-950 p-4">
        <h3 class="mb-2 font-medium text-warning-800 dark:text-warning-200">
          ⚠️ Common Pitfalls
        </h3>
        <ul class="space-y-1 text-sm text-warning-700 dark:text-warning-300">
          <li>• Not clearing PIN values after validation errors</li>
          <li>• Missing server-side validation (trusting client only)</li>
          <li>• Poor error messages that reveal system information</li>
          <li>• Allowing unlimited verification attempts</li>
          <li>• Not implementing proper session timeout</li>
          <li>• Using GET requests for sensitive PIN data</li>
          <li>• Storing PIN values in browser localStorage</li>
          <li>• Missing accessibility features for screen readers</li>
        </ul>
      </div>

      <div class="rounded-lg border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-950 p-4">
        <h3 class="mb-2 font-medium text-primary-800 dark:text-primary-200">
          🚀 Advanced Features
        </h3>
        <ul class="space-y-1 text-sm text-primary-700 dark:text-primary-300">
          <li>• Paste support for quick code entry from clipboard</li>
          <li>• Full keyboard navigation with arrow keys and shortcuts</li>
          <li>• Auto-focus management for seamless user experience</li>
          <li>• Mobile haptic feedback for enhanced touch interaction</li>
          <li>• Progressive security delays and account protection</li>
          <li>• Multi-step verification workflows with progress tracking</li>
          <li>• Custom virtual keypads for specialized input</li>
          <li>• Real-time validation with debounced server calls</li>
        </ul>
      </div>
    </ExamplesTemplate>
  );
});