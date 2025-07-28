import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { PinInput } from "../PinInput";

/**
 * TOTP Authentication Example
 * 
 * Demonstrates two-factor authentication with TOTP codes including
 * real-time validation, error handling, and attempt limiting.
 */

export default component$(() => {
  // Authentication state
  const authState = useStore({
    totpCode: "",
    isVerifying: false,
    isAuthenticated: false,
    error: "",
    attempts: 0,
    lockoutTime: 0,
  });

  const backupCode = useSignal("");
  const showBackupInput = useSignal(false);

  // Simulate TOTP verification
  const verifyTOTP = $(async (code: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Demo: "123456" is valid, others are invalid
    return code === "123456";
  });

  // Simulate backup code verification
  const verifyBackupCode = $(async (code: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return code.toUpperCase() === "BACKUP123";
  });

  // Handle TOTP completion
  const handleTOTPComplete = $(async (value: string) => {
    authState.isVerifying = true;
    authState.error = "";

    try {
      const isValid = await verifyTOTP(value);
      
      if (isValid) {
        authState.isAuthenticated = true;
        authState.attempts = 0;
        authState.totpCode = "";
      } else {
        authState.attempts++;
        authState.totpCode = "";
        
        if (authState.attempts >= 3) {
          authState.error = "Too many failed attempts. Account locked for 5 minutes.";
          authState.lockoutTime = 300; // 5 minutes
          
          // Start countdown
          const timer = setInterval(() => {
            authState.lockoutTime--;
            if (authState.lockoutTime <= 0) {
              clearInterval(timer);
              authState.attempts = 0;
              authState.error = "";
            }
          }, 1000);
        } else {
          authState.error = `Invalid code. ${3 - authState.attempts} attempts remaining.`;
        }
      }
    } catch (error) {
      authState.error = "Verification failed. Please try again.";
    } finally {
      authState.isVerifying = false;
    }
  });

  // Handle backup code completion
  const handleBackupComplete = $(async (value: string) => {
    try {
      const isValid = await verifyBackupCode(value);
      
      if (isValid) {
        authState.isAuthenticated = true;
        authState.attempts = 0;
        backupCode.value = "";
        showBackupInput.value = false;
      } else {
        authState.error = "Invalid backup code. Please try again.";
        backupCode.value = "";
      }
    } catch (error) {
      authState.error = "Backup verification failed. Please try again.";
    }
  });

  // Reset authentication
  const resetAuth = $(() => {
    authState.isAuthenticated = false;
    authState.totpCode = "";
    authState.error = "";
    authState.attempts = 0;
    authState.lockoutTime = 0;
    backupCode.value = "";
    showBackupInput.value = false;
  });

  // Toggle backup code input
  const toggleBackupInput = $(() => {
    showBackupInput.value = !showBackupInput.value;
    authState.error = "";
  });

  return (
    <div class="space-y-8 p-6">
      <div class="mb-6">
        <h2 class="mb-2 text-2xl font-bold text-text-default dark:text-text-dark-default">
          Two-Factor Authentication
        </h2>
        <p class="text-text-secondary dark:text-text-dark-secondary">
          Secure authentication with TOTP codes and backup recovery options.
        </p>
      </div>

      {!authState.isAuthenticated ? (
        <div class="max-w-md mx-auto">
          {/* TOTP Input */}
          {!showBackupInput.value && (
            <div class="space-y-6">
              <div class="text-center">
                <div class="w-16 h-16 mx-auto mb-4 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <svg class="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 class="text-lg font-medium text-text-default dark:text-text-dark-default">
                  Verify Your Identity
                </h3>
                <p class="mt-2 text-sm text-text-secondary dark:text-text-dark-secondary">
                  Enter the 6-digit code from your authenticator app
                </p>
              </div>

              <PinInput
                label="Authentication Code"
                value={authState.totpCode}
                length={6}
                type="numeric"
                size="lg"
                disabled={authState.isVerifying || authState.lockoutTime > 0}
                error={authState.error}
                onValueChange$={(value) => {
                  authState.totpCode = value;
                  if (authState.error) authState.error = "";
                }}
                onComplete$={handleTOTPComplete}
                placeholder="0"
                helperText={
                  authState.lockoutTime > 0
                    ? `Account locked. Try again in ${Math.ceil(authState.lockoutTime / 60)} minutes.`
                    : authState.isVerifying
                      ? "Verifying authentication code..."
                      : "Enter the code from your authenticator app"
                }
                required
                autoFocus
              />

              <div class="text-center">
                <button
                  type="button"
                  onClick$={toggleBackupInput}
                  disabled={authState.lockoutTime > 0}
                  class="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 disabled:opacity-50"
                >
                  Can't access your authenticator? Use backup code
                </button>
              </div>
            </div>
          )}

          {/* Backup Code Input */}
          {showBackupInput.value && (
            <div class="space-y-6">
              <div class="text-center">
                <div class="w-16 h-16 mx-auto mb-4 bg-warning-100 dark:bg-warning-900 rounded-full flex items-center justify-center">
                  <svg class="w-8 h-8 text-warning-600 dark:text-warning-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 class="text-lg font-medium text-text-default dark:text-text-dark-default">
                  Use Backup Code
                </h3>
                <p class="mt-2 text-sm text-text-secondary dark:text-text-dark-secondary">
                  Enter one of your backup recovery codes
                </p>
              </div>

              <PinInput
                label="Backup Code"
                value={backupCode.value}
                length={9}
                type="alphanumeric"
                size="lg"
                spaced={false}
                error={authState.error}
                onValueChange$={(value) => {
                  backupCode.value = value.toUpperCase();
                  if (authState.error) authState.error = "";
                }}
                onComplete$={handleBackupComplete}
                placeholder="-"
                helperText="Enter a 9-character backup code (e.g., ABC-123-XYZ)"
                class="font-mono"
                autoFocus
              />

              <div class="text-center">
                <button
                  type="button"
                  onClick$={toggleBackupInput}
                  class="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                >
                  ← Back to authenticator code
                </button>
              </div>
            </div>
          )}

          {/* Demo Instructions */}
          <div class="mt-8 rounded-lg border border-info-200 dark:border-info-800 bg-info-50 dark:bg-info-950 p-4">
            <h4 class="mb-2 text-sm font-medium text-info-800 dark:text-info-200">
              Demo Instructions
            </h4>
            <div class="text-xs text-info-700 dark:text-info-300 space-y-1">
              <p>• <strong>Valid TOTP:</strong> 123456</p>
              <p>• <strong>Valid Backup:</strong> BACKUP123</p>
              <p>• Any other codes will show error handling</p>
              <p>• 3 failed attempts will lock the account</p>
            </div>
          </div>
        </div>
      ) : (
        /* Success State */
        <div class="max-w-md mx-auto text-center">
          <div class="w-20 h-20 mx-auto mb-6 bg-success-100 dark:bg-success-900 rounded-full flex items-center justify-center">
            <svg class="w-10 h-10 text-success-600 dark:text-success-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h3 class="text-xl font-medium text-text-default dark:text-text-dark-default mb-2">
            Authentication Successful!
          </h3>
          <p class="text-text-secondary dark:text-text-dark-secondary mb-6">
            You have been successfully authenticated and can now access your secure account.
          </p>
          
          <div class="space-y-4">
            <div class="rounded-lg border border-success-200 dark:border-success-800 bg-success-50 dark:bg-success-950 p-4">
              <h4 class="text-sm font-medium text-success-800 dark:text-success-200 mb-2">
                Secure Session Active
              </h4>
              <div class="text-xs text-success-700 dark:text-success-300 space-y-1">
                <p>• Session expires in 30 minutes</p>
                <p>• All actions are logged for security</p>
                <p>• You can now access protected resources</p>
              </div>
            </div>
            
            <button
              type="button"
              onClick$={resetAuth}
              class="w-full rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
            >
              Reset Demo
            </button>
          </div>
        </div>
      )}

      {/* Security Features */}
      <div class="mt-12 rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
        <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
          Security Features
        </h3>
        <div class="grid gap-4 md:grid-cols-2">
          <div class="space-y-3">
            <h4 class="font-medium text-text-default dark:text-text-dark-default">
              Authentication Protection
            </h4>
            <ul class="space-y-1 text-sm text-text-secondary dark:text-text-dark-secondary">
              <li>• Rate limiting with progressive delays</li>
              <li>• Account lockout after failed attempts</li>
              <li>• Automatic session timeout</li>
              <li>• Audit logging for security events</li>
            </ul>
          </div>
          <div class="space-y-3">
            <h4 class="font-medium text-text-default dark:text-text-dark-default">
              Recovery Options
            </h4>
            <ul class="space-y-1 text-sm text-text-secondary dark:text-text-dark-secondary">
              <li>• Backup recovery codes</li>
              <li>• Alternative authentication methods</li>
              <li>• Account recovery procedures</li>
              <li>• Contact support options</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});