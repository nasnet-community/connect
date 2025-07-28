import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { PinInput } from "../PinInput";

/**
 * Product Key Entry Example
 * 
 * Demonstrates product key and license activation with validation,
 * formatting, and license information display.
 */

export default component$(() => {
  // Product key state
  const keyState = useStore({
    productKey: "",
    gameKey: "",
    softwareKey: "",
    isValidating: false,
    error: "",
  });

  // License information
  const licenseInfo = useStore({
    isValid: false,
    productName: "",
    licenseType: "",
    expiryDate: "",
    features: [] as string[],
  });

  const activationSuccess = useSignal(false);

  // Valid demo keys for testing
  const validKeys = {
    product: ["GAME1", "SOFT2", "TRIAL", "DEMO3", "TEST4"],
    licenses: {
      "GAME1": {
        productName: "Ultimate Gaming Suite",
        licenseType: "Professional",
        expiryDate: "2025-12-31",
        features: ["Online multiplayer", "DLC access", "Premium support", "Cloud saves"]
      },
      "SOFT2": {
        productName: "Design Studio Pro",
        licenseType: "Commercial",
        expiryDate: "2026-06-15",
        features: ["Advanced tools", "Team collaboration", "Export formats", "Priority updates"]
      },
      "TRIAL": {
        productName: "Business Analytics",
        licenseType: "Trial",
        expiryDate: "2024-03-01",
        features: ["Basic reports", "30-day trial", "Email support"]
      },
      "DEMO3": {
        productName: "Creative Suite",
        licenseType: "Educational",
        expiryDate: "2025-08-31",
        features: ["Student license", "Full feature set", "Educational resources"]
      },
      "TEST4": {
        productName: "Enterprise Platform",
        licenseType: "Enterprise",
        expiryDate: "2027-01-01",
        features: ["Unlimited users", "Advanced security", "24/7 support", "Custom integrations"]
      }
    }
  };

  // Simulate license validation
  const validateLicense = $(async (key: string) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const upperKey = key.toUpperCase();
    return validKeys.product.includes(upperKey) 
      ? validKeys.licenses[upperKey as keyof typeof validKeys.licenses]
      : null;
  });

  // Handle product key completion
  const handleKeyComplete = $(async (value: string) => {
    keyState.isValidating = true;
    keyState.error = "";
    activationSuccess.value = false;

    try {
      const license = await validateLicense(value);
      
      if (license) {
        licenseInfo.isValid = true;
        licenseInfo.productName = license.productName;
        licenseInfo.licenseType = license.licenseType;
        licenseInfo.expiryDate = license.expiryDate;
        licenseInfo.features = license.features;
        activationSuccess.value = true;
      } else {
        keyState.error = "Invalid product key. Please check and try again.";
        keyState.productKey = "";
        licenseInfo.isValid = false;
      }
    } catch (error) {
      keyState.error = "Unable to validate license. Please try again.";
    } finally {
      keyState.isValidating = false;
    }
  });

  // Reset demo
  const resetDemo = $(() => {
    keyState.productKey = "";
    keyState.gameKey = "";
    keyState.softwareKey = "";
    keyState.error = "";
    keyState.isValidating = false;
    licenseInfo.isValid = false;
    activationSuccess.value = false;
  });

  return (
    <div class="space-y-8 p-6">
      <div class="mb-6">
        <h2 class="mb-2 text-2xl font-bold text-text-default dark:text-text-dark-default">
          Product Key & License Activation
        </h2>
        <p class="text-text-secondary dark:text-text-dark-secondary">
          Enter product keys for software activation with real-time validation and license information.
        </p>
      </div>

      {/* Main Product Key Entry */}
      <div class="max-w-2xl mx-auto">
        <div class="text-center mb-8">
          <div class="w-20 h-20 mx-auto mb-4 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
            <svg class="w-10 h-10 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h3 class="text-xl font-medium text-text-default dark:text-text-dark-default mb-2">
            Activate Your License
          </h3>
          <p class="text-text-secondary dark:text-text-dark-secondary">
            Enter your 5-character product key to activate your software
          </p>
        </div>

        <div class="space-y-6">
          <PinInput
            label="Product Key"
            value={keyState.productKey}
            length={5}
            type="alphanumeric"
            size="lg"
            spaced={false}
            placeholder="-"
            disabled={keyState.isValidating}
            error={keyState.error}
            onValueChange$={(value) => {
              keyState.productKey = value.toUpperCase();
              if (keyState.error) keyState.error = "";
              if (activationSuccess.value) {
                activationSuccess.value = false;
                licenseInfo.isValid = false;
              }
            }}
            onComplete$={handleKeyComplete}
            helperText={
              keyState.isValidating
                ? "Validating license key..."
                : "Enter your 5-character product key (e.g., GAME1)"
            }
            class="font-mono tracking-wider"
            autoFocus
          />

          {/* License Information Display */}
          {licenseInfo.isValid && (
            <div class="rounded-lg border border-success-200 dark:border-success-800 bg-success-50 dark:bg-success-950 p-6">
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                  <svg class="w-8 h-8 text-success-600 dark:text-success-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="flex-1">
                  <h4 class="text-lg font-medium text-success-800 dark:text-success-200 mb-2">
                    License Activated Successfully!
                  </h4>
                  <div class="grid gap-4 md:grid-cols-2">
                    <div>
                      <h5 class="text-sm font-medium text-success-800 dark:text-success-200 mb-1">
                        Product Information
                      </h5>
                      <div class="text-sm text-success-700 dark:text-success-300 space-y-1">
                        <p><strong>Name:</strong> {licenseInfo.productName}</p>
                        <p><strong>License Type:</strong> {licenseInfo.licenseType}</p>
                        <p><strong>Expires:</strong> {licenseInfo.expiryDate}</p>
                        <p><strong>Key:</strong> {keyState.productKey}</p>
                      </div>
                    </div>
                    <div>
                      <h5 class="text-sm font-medium text-success-800 dark:text-success-200 mb-1">
                        Included Features
                      </h5>
                      <ul class="text-sm text-success-700 dark:text-success-300 space-y-1">
                        {licenseInfo.features.map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional Key Format Examples */}
      <div class="space-y-6">
        <h3 class="text-lg font-medium text-text-default dark:text-text-dark-default">
          Different Key Formats
        </h3>

        <div class="grid gap-6 md:grid-cols-2">
          {/* Game Key Format */}
          <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4">
            <h4 class="mb-3 text-sm font-medium text-text-default dark:text-text-dark-default">
              Gaming Platform Key
            </h4>
            <PinInput
              label="Game Key"
              value={keyState.gameKey}
              length={12}
              type="alphanumeric"
              size="md"
              spaced={true}
              placeholder="○"
              onValueChange$={(value) => {
                keyState.gameKey = value.toUpperCase();
              }}
              helperText="12-character game activation key"
              class="font-mono"
            />
          </div>

          {/* Software License */}
          <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4">
            <h4 class="mb-3 text-sm font-medium text-text-default dark:text-text-dark-default">
              Software License
            </h4>
            <PinInput
              label="License Key"
              value={keyState.softwareKey}
              length={8}
              type="alphanumeric"
              size="md"
              spaced={false}
              placeholder="-"
              onValueChange$={(value) => {
                keyState.softwareKey = value.toUpperCase();
              }}
              helperText="8-character software license"
              class="font-mono tracking-wide"
            />
          </div>
        </div>
      </div>

      {/* Valid Demo Keys */}
      <div class="rounded-lg border border-info-200 dark:border-info-800 bg-info-50 dark:bg-info-950 p-6">
        <h3 class="mb-4 text-lg font-medium text-info-800 dark:text-info-200">
          Demo Keys for Testing
        </h3>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(validKeys.licenses).map(([key, license]) => (
            <div key={key} class="rounded-md bg-info-100 dark:bg-info-900 p-3">
              <div class="text-sm">
                <div class="font-mono font-medium text-info-800 dark:text-info-200 mb-1">
                  {key}
                </div>
                <div class="text-info-700 dark:text-info-300 text-xs">
                  {license.productName}
                </div>
                <div class="text-info-600 dark:text-info-400 text-xs">
                  {license.licenseType}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p class="mt-4 text-sm text-info-700 dark:text-info-300">
          Try any of these keys in the main input above to see license activation.
        </p>
      </div>

      {/* Reset Button */}
      <div class="text-center">
        <button
          type="button"
          onClick$={resetDemo}
          class="rounded-md bg-secondary-600 px-6 py-2 text-sm font-medium text-white hover:bg-secondary-700 dark:bg-secondary-500 dark:hover:bg-secondary-600"
        >
          Reset Demo
        </button>
      </div>

      {/* Implementation Guide */}
      <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
        <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
          Implementation Best Practices
        </h3>
        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <h4 class="mb-3 text-sm font-medium text-text-default dark:text-text-dark-default">
              Key Validation
            </h4>
            <ul class="space-y-2 text-sm text-text-secondary dark:text-text-dark-secondary">
              <li>• Always validate keys server-side</li>
              <li>• Check against authorized license database</li>
              <li>• Verify key hasn't been revoked or expired</li>
              <li>• Log activation attempts for audit</li>
              <li>• Rate limit validation requests</li>
            </ul>
          </div>
          <div>
            <h4 class="mb-3 text-sm font-medium text-text-default dark:text-text-dark-default">
              User Experience
            </h4>
            <ul class="space-y-2 text-sm text-text-secondary dark:text-text-dark-secondary">
              <li>• Auto-format keys for readability</li>
              <li>• Support paste for quick entry</li>
              <li>• Provide clear error messages</li>
              <li>• Show license details after activation</li>
              <li>• Offer alternative activation methods</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Security Considerations */}
      <div class="rounded-lg border border-warning-200 dark:border-warning-800 bg-warning-50 dark:bg-warning-950 p-6">
        <h3 class="mb-4 text-lg font-medium text-warning-800 dark:text-warning-200">
          Security Considerations
        </h3>
        <div class="space-y-4">
          <div>
            <h4 class="mb-2 text-sm font-medium text-warning-800 dark:text-warning-200">
              Key Protection
            </h4>
            <ul class="space-y-1 text-sm text-warning-700 dark:text-warning-300">
              <li>• Never store activation keys in client-side code</li>
              <li>• Use HTTPS for all activation communications</li>
              <li>• Implement hardware fingerprinting for key binding</li>
              <li>• Monitor for unusual activation patterns</li>
            </ul>
          </div>
          <div>
            <h4 class="mb-2 text-sm font-medium text-warning-800 dark:text-warning-200">
              Anti-Piracy Measures
            </h4>
            <ul class="space-y-1 text-sm text-warning-700 dark:text-warning-300">
              <li>• Limit number of activations per key</li>
              <li>• Implement periodic license verification</li>
              <li>• Track and revoke compromised keys</li>
              <li>• Use cryptographic signatures for validation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});