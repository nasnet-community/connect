import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { PinInput } from "../PinInput";

/**
 * Secure Banking PIN Example
 * 
 * Demonstrates high-security PIN entry with progressive lockout,
 * attempt limiting, security logging, and account protection features.
 */

export default component$(() => {
  // Security state
  const securityState = useStore({
    pin: "",
    attempts: 0,
    isLocked: false,
    lockoutDuration: 0,
    isProcessing: false,
    lastAttemptTime: 0,
    sessionId: "",
  });

  // Transaction state
  const transactionState = useStore({
    isAuthenticated: false,
    amount: 0,
    recipient: "",
    transactionId: "",
  });

  const securityLogs = useSignal<Array<{ time: string; event: string; details: string }>>([]);

  // Generate session ID
  const generateSessionId = $(() => {
    return 'sess_' + Math.random().toString(36).substr(2, 9);
  });

  // Security logging
  const logSecurityEvent = $((event: string, details: string) => {
    const timestamp = new Date().toLocaleTimeString();
    securityLogs.value = [
      { time: timestamp, event, details },
      ...securityLogs.value.slice(0, 4) // Keep last 5 events
    ];
  });

  // Simulate PIN validation with realistic delay
  const validatePin = $(async (pin: string): Promise<boolean> => {
    // Security delay to prevent brute force
    const delay = Math.min(securityState.attempts * 500 + 1000, 3000);
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Demo: any PIN except "1234", "0000", "1111" is valid
    const weakPins = ["1234", "0000", "1111", "2222", "1212"];
    return !weakPins.includes(pin);
  });

  // Handle PIN completion
  const handlePinComplete = $(async (value: string) => {
    securityState.isProcessing = true;
    securityState.pin = "";
    securityState.lastAttemptTime = Date.now();

    if (!securityState.sessionId) {
      securityState.sessionId = await generateSessionId();
    }

    try {
      logSecurityEvent("PIN_ATTEMPT", `Session: ${securityState.sessionId}`);
      
      const isValid = await validatePin(value);
      
      if (isValid) {
        // Successful authentication
        securityState.attempts = 0;
        transactionState.isAuthenticated = true;
        transactionState.amount = 2500.00;
        transactionState.recipient = "John Smith";
        transactionState.transactionId = "TXN_" + Math.random().toString(36).substr(2, 8).toUpperCase();
        
        logSecurityEvent("AUTH_SUCCESS", "PIN verified successfully");
      } else {
        // Failed authentication
        securityState.attempts++;
        
        if (securityState.attempts >= 3) {
          // Progressive lockout
          const baseLockout = 5 * 60; // 5 minutes base
          const progressiveLockout = Math.min(securityState.attempts - 2, 5) * 5 * 60; // +5 min per additional attempt
          securityState.lockoutDuration = baseLockout + progressiveLockout;
          securityState.isLocked = true;
          
          logSecurityEvent("ACCOUNT_LOCKED", `Lockout duration: ${Math.ceil(securityState.lockoutDuration / 60)} minutes`);
          
          // Start countdown timer
          const timer = setInterval(() => {
            securityState.lockoutDuration--;
            if (securityState.lockoutDuration <= 0) {
              clearInterval(timer);
              securityState.isLocked = false;
              securityState.attempts = 0;
              logSecurityEvent("LOCKOUT_EXPIRED", "Account unlocked");
            }
          }, 1000);
        } else {
          logSecurityEvent("PIN_FAILED", `Attempts: ${securityState.attempts}/3`);
        }
      }
    } catch (error) {
      logSecurityEvent("SYSTEM_ERROR", "PIN validation failed");
    } finally {
      securityState.isProcessing = false;
    }
  });

  // Complete transaction
  const completeTransaction = $(() => {
    logSecurityEvent("TRANSACTION_COMPLETE", `ID: ${transactionState.transactionId}`);
    // Reset to initial state
    resetDemo();
  });

  // Reset demo
  const resetDemo = $(() => {
    securityState.pin = "";
    securityState.attempts = 0;
    securityState.isLocked = false;
    securityState.lockoutDuration = 0;
    securityState.isProcessing = false;
    securityState.sessionId = "";
    transactionState.isAuthenticated = false;
    securityLogs.value = [];
  });

  // Get error message
  const getErrorMessage = () => {
    if (securityState.isLocked) {
      const minutes = Math.ceil(securityState.lockoutDuration / 60);
      return `Account locked for security. Please wait ${minutes} minute${minutes > 1 ? 's' : ''} or contact support.`;
    }
    if (securityState.attempts > 0) {
      const remaining = 3 - securityState.attempts;
      return `Invalid PIN. ${remaining} attempt${remaining > 1 ? 's' : ''} remaining before account lockout.`;
    }
    return "";
  };

  // Get helper text
  const getHelperText = () => {
    if (securityState.isLocked) {
      return "Contact customer support at 1-800-BANK if you need immediate assistance.";
    }
    if (securityState.isProcessing) {
      return "Verifying PIN... Please wait.";
    }
    return "Enter your 4-digit security PIN to authorize this transaction.";
  };

  return (
    <div class="space-y-8 p-6">
      <div class="mb-6">
        <h2 class="mb-2 text-2xl font-bold text-text-default dark:text-text-dark-default">
          Secure Banking PIN Authorization
        </h2>
        <p class="text-text-secondary dark:text-text-dark-secondary">
          High-security PIN entry with comprehensive protection against unauthorized access.
        </p>
      </div>

      {!transactionState.isAuthenticated ? (
        <div class="max-w-2xl mx-auto">
          {/* Transaction Details */}
          <div class="mb-8 rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
            <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
              Transaction Authorization Required
            </h3>
            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <h4 class="text-sm font-medium text-text-default dark:text-text-dark-default mb-2">
                  Transaction Details
                </h4>
                <div class="space-y-1 text-sm text-text-secondary dark:text-text-dark-secondary">
                  <p><strong>Type:</strong> Wire Transfer</p>
                  <p><strong>Amount:</strong> $2,500.00 USD</p>
                  <p><strong>Recipient:</strong> John Smith</p>
                  <p><strong>Account:</strong> ***1234</p>
                </div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-text-default dark:text-text-dark-default mb-2">
                  Security Status
                </h4>
                <div class="space-y-1 text-sm text-text-secondary dark:text-text-dark-secondary">
                  <p><strong>Session:</strong> {securityState.sessionId || "Not started"}</p>
                  <p><strong>Attempts:</strong> {securityState.attempts}/3</p>
                  <p><strong>Status:</strong> {securityState.isLocked ? "Locked" : "Active"}</p>
                  <p><strong>IP:</strong> 192.168.1.100</p>
                </div>
              </div>
            </div>
          </div>

          {/* PIN Entry */}
          <div class="text-center mb-8">
            <div class="w-20 h-20 mx-auto mb-4 bg-error-100 dark:bg-error-900 rounded-full flex items-center justify-center">
              <svg class="w-10 h-10 text-error-600 dark:text-error-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 class="text-xl font-medium text-text-default dark:text-text-dark-default mb-2">
              Security Authorization
            </h3>
            <p class="text-text-secondary dark:text-text-dark-secondary">
              Please enter your security PIN to authorize this transaction
            </p>
          </div>

          <div class="max-w-md mx-auto">
            <PinInput
              label="Security PIN"
              value={securityState.pin}
              length={4}
              type="numeric"
              mask={true}
              size="lg"
              disabled={securityState.isLocked || securityState.isProcessing}
              error={getErrorMessage()}
              onValueChange$={(value) => {
                securityState.pin = value;
              }}
              onComplete$={handlePinComplete}
              placeholder="●"
              helperText={getHelperText()}
              required
              autoFocus={!securityState.isLocked}
            />

            {/* Security Warnings */}
            {securityState.attempts > 0 && !securityState.isLocked && (
              <div class="mt-4 rounded-md bg-warning-50 dark:bg-warning-950 border border-warning-200 dark:border-warning-800 p-3">
                <div class="flex">
                  <svg class="w-5 h-5 text-warning-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  <div class="ml-3">
                    <p class="text-sm text-warning-700 dark:text-warning-300">
                      <strong>Security Alert:</strong> Multiple failed attempts detected. Your account will be temporarily locked after {3 - securityState.attempts} more failed attempt{3 - securityState.attempts !== 1 ? 's' : ''}.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {securityState.isLocked && (
              <div class="mt-4 rounded-md bg-error-50 dark:bg-error-950 border border-error-200 dark:border-error-800 p-3">
                <div class="flex">
                  <svg class="w-5 h-5 text-error-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.681-.056-1.351-.166-2A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clip-rule="evenodd" />
                  </svg>
                  <div class="ml-3">
                    <p class="text-sm text-error-700 dark:text-error-300">
                      <strong>Account Locked:</strong> For your security, this account has been temporarily locked. 
                      Time remaining: {Math.floor(securityState.lockoutDuration / 60)}:{(securityState.lockoutDuration % 60).toString().padStart(2, '0')}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Authenticated State */
        <div class="max-w-2xl mx-auto">
          <div class="text-center mb-8">
            <div class="w-20 h-20 mx-auto mb-4 bg-success-100 dark:bg-success-900 rounded-full flex items-center justify-center">
              <svg class="w-10 h-10 text-success-600 dark:text-success-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-xl font-medium text-text-default dark:text-text-dark-default mb-2">
              Authorization Successful
            </h3>
            <p class="text-text-secondary dark:text-text-dark-secondary">
              Your transaction has been authorized and is being processed
            </p>
          </div>

          <div class="rounded-lg border border-success-200 dark:border-success-800 bg-success-50 dark:bg-success-950 p-6">
            <h4 class="text-lg font-medium text-success-800 dark:text-success-200 mb-4">
              Transaction Confirmed
            </h4>
            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <h5 class="text-sm font-medium text-success-800 dark:text-success-200 mb-2">
                  Transaction Details
                </h5>
                <div class="space-y-1 text-sm text-success-700 dark:text-success-300">
                  <p><strong>ID:</strong> {transactionState.transactionId}</p>
                  <p><strong>Amount:</strong> ${transactionState.amount.toFixed(2)}</p>
                  <p><strong>Recipient:</strong> {transactionState.recipient}</p>
                  <p><strong>Status:</strong> Processing</p>
                </div>
              </div>
              <div>
                <h5 class="text-sm font-medium text-success-800 dark:text-success-200 mb-2">
                  Security Info
                </h5>
                <div class="space-y-1 text-sm text-success-700 dark:text-success-300">
                  <p><strong>Auth Time:</strong> {new Date().toLocaleTimeString()}</p>
                  <p><strong>Session:</strong> {securityState.sessionId}</p>
                  <p><strong>Method:</strong> PIN Authorization</p>
                  <p><strong>Device:</strong> Verified</p>
                </div>
              </div>
            </div>
            <div class="mt-6 flex gap-3">
              <button
                type="button"
                onClick$={completeTransaction}
                class="rounded-md bg-success-600 px-4 py-2 text-sm font-medium text-white hover:bg-success-700"
              >
                Complete Transaction
              </button>
              <button
                type="button"
                onClick$={resetDemo}
                class="rounded-md border border-success-300 dark:border-success-700 px-4 py-2 text-sm font-medium text-success-800 dark:text-success-200 hover:bg-success-100 dark:hover:bg-success-900"
              >
                Start New Demo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Security Event Log */}
      {securityLogs.value.length > 0 && (
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
            Security Event Log
          </h3>
          <div class="space-y-2">
            {securityLogs.value.map((log, index) => (
              <div key={index} class="flex items-center space-x-3 text-sm font-mono">
                <span class="text-text-tertiary dark:text-text-dark-tertiary">{log.time}</span>
                <span class="px-2 py-1 rounded text-xs font-medium bg-surface-light-tertiary dark:bg-surface-dark-tertiary">
                  {log.event}
                </span>
                <span class="text-text-secondary dark:text-text-dark-secondary">{log.details}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Demo Instructions */}
      <div class="rounded-lg border border-info-200 dark:border-info-800 bg-info-50 dark:bg-info-950 p-6">
        <h3 class="mb-4 text-lg font-medium text-info-800 dark:text-info-200">
          Demo Instructions
        </h3>
        <div class="grid gap-4 md:grid-cols-2">
          <div>
            <h4 class="mb-2 text-sm font-medium text-info-800 dark:text-info-200">
              Weak PINs (Will Fail)
            </h4>
            <ul class="space-y-1 text-sm text-info-700 dark:text-info-300">
              <li>• <code>1234</code> - Sequential pattern</li>
              <li>• <code>0000</code> - Repeated digits</li>
              <li>• <code>1111</code> - Same digit</li>
              <li>• <code>2222</code> - Predictable pattern</li>
            </ul>
          </div>
          <div>
            <h4 class="mb-2 text-sm font-medium text-info-800 dark:text-info-200">
              Valid PINs (Will Succeed)
            </h4>
            <ul class="space-y-1 text-sm text-info-700 dark:text-info-300">
              <li>• Any other 4-digit combination</li>
              <li>• Example: <code>9876</code>, <code>4521</code>, <code>8139</code></li>
              <li>• 3 failed attempts will lock the account</li>
              <li>• Lockout duration increases with attempts</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Security Features */}
      <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
        <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
          Security Features Implemented
        </h3>
        <div class="grid gap-6 md:grid-cols-3">
          <div>
            <h4 class="mb-3 text-sm font-medium text-text-default dark:text-text-dark-default">
              Access Control
            </h4>
            <ul class="space-y-1 text-sm text-text-secondary dark:text-text-dark-secondary">
              <li>• PIN masking for privacy</li>
              <li>• Progressive attempt delays</li>
              <li>• Account lockout protection</li>
              <li>• Session timeout handling</li>
            </ul>
          </div>
          <div>
            <h4 class="mb-3 text-sm font-medium text-text-default dark:text-text-dark-default">
              Monitoring & Logging
            </h4>
            <ul class="space-y-1 text-sm text-text-secondary dark:text-text-dark-secondary">
              <li>• Real-time security events</li>
              <li>• Attempt tracking</li>
              <li>• Session management</li>
              <li>• Audit trail generation</li>
            </ul>
          </div>
          <div>
            <h4 class="mb-3 text-sm font-medium text-text-default dark:text-text-dark-default">
              Risk Mitigation
            </h4>
            <ul class="space-y-1 text-sm text-text-secondary dark:text-text-dark-secondary">
              <li>• Weak PIN detection</li>
              <li>• Brute force protection</li>
              <li>• Progressive lockout timing</li>
              <li>• Transaction authorization</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});