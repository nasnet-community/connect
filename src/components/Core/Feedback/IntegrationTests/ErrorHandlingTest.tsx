import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "../Dialog";
import { Drawer, DrawerHeader, DrawerContent, DrawerFooter } from "../Drawer";
import { Popover, PopoverTrigger, PopoverContent } from "../Popover";
import { Alert } from "../Alert";
import { ErrorMessage } from "../ErrorMessage";
import { useToast } from "../Toast";
import { Button } from "../../button";

/**
 * ErrorHandlingTest - Tests ErrorMessage with other feedback components
 * 
 * Integration scenarios tested:
 * 1. Multiple error states displayed simultaneously
 * 2. ErrorMessage component interaction with other feedback types
 * 3. Error propagation and dismissal across nested components
 * 4. Error severity layering and priority management
 * 5. Accessibility for screen readers with multiple errors
 */
export const ErrorHandlingTest = component$(() => {
  const isDialogOpen = useSignal(false);
  const isDrawerOpen = useSignal(false);
  const isPopoverOpen = useSignal(false);
  const toast = useToast();

  const errorStates = useStore({
    systemError: false,
    validationErrors: [] as Array<{ id: string; field: string; message: string }>,
    networkError: false,
    userError: false,
    criticalError: false,
    warningAlerts: [] as Array<{ id: string; message: string }>,
    infoMessages: [] as Array<{ id: string; message: string }>,
  });

  const formData = useStore({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const triggerSystemError = $(async () => {
    errorStates.systemError = true;
    await toast.error("System error occurred! Check error messages below.", {
      duration: 0,
      persistent: true,
      position: "top-center"
    });
  });

  const triggerValidationErrors = $(() => {
    const errors = [];
    
    if (!formData.username.trim()) {
      errors.push({ id: "username", field: "Username", message: "Username is required" });
    }
    
    if (!formData.email.includes("@")) {
      errors.push({ id: "email", field: "Email", message: "Please enter a valid email address" });
    }
    
    if (formData.password.length < 8) {
      errors.push({ id: "password", field: "Password", message: "Password must be at least 8 characters" });
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.push({ id: "confirmPassword", field: "Confirm Password", message: "Passwords do not match" });
    }

    errorStates.validationErrors = errors;
    
    if (errors.length > 0) {
      toast.error(`${errors.length} validation error${errors.length > 1 ? 's' : ''} found`, {
        duration: 4000,
        position: "top-right"
      });
    }
  });

  const simulateNetworkError = $(async () => {
    errorStates.networkError = true;
    await toast.error("Network connection failed", {
      duration: 0,
      persistent: true,
      position: "bottom-center",
      actionLabel: "Retry",
      onAction$: $(async (_id: string) => {
        await toast.info("Retrying connection...");
        setTimeout(() => {
          errorStates.networkError = false;
          toast.success("Connection restored!");
        }, 2000);
      })
    });
  });

  const triggerCriticalError = $(async () => {
    errorStates.criticalError = true;
    isDialogOpen.value = true;
    await toast.error("Critical system error - immediate attention required!", {
      duration: 0,
      persistent: true,
      position: "top-center"
    });
  });

  const addWarningAlert = $(() => {
    const id = Date.now().toString();
    errorStates.warningAlerts.push({
      id,
      message: `Warning: This is warning message #${errorStates.warningAlerts.length + 1}`
    });
  });

  const removeWarningAlert = $((id: string) => {
    errorStates.warningAlerts = errorStates.warningAlerts.filter(alert => alert.id !== id);
  });

  const clearAllErrors = $(() => {
    errorStates.systemError = false;
    errorStates.validationErrors = [];
    errorStates.networkError = false;
    errorStates.userError = false;
    errorStates.criticalError = false;
    errorStates.warningAlerts = [];
    errorStates.infoMessages = [];
    toast.dismissAll();
  });

  const testErrorHierarchy = $(async () => {
    // Demonstrate error priority and layering
    errorStates.systemError = true;
    await new Promise(resolve => setTimeout(resolve, 300));
    
    triggerValidationErrors();
    await new Promise(resolve => setTimeout(resolve, 300));
    
    simulateNetworkError();
    await new Promise(resolve => setTimeout(resolve, 300));
    
    addWarningAlert();
    await new Promise(resolve => setTimeout(resolve, 300));
    
    await toast.info("Multiple error types are now active - observe the hierarchy", {
      duration: 5000,
      position: "bottom-right"
    });
  });

  return (
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
      <div class="max-w-6xl mx-auto space-y-6">
        {/* Error Testing Control Panel */}
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Error Handling Integration Test
          </h2>
          
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            This test demonstrates how ErrorMessage components interact with other feedback components,
            error state management, and accessibility features.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <Button
              onClick$={triggerSystemError}
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              System Error
            </Button>
            <Button
              onClick$={triggerValidationErrors}
              class="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded"
            >
              Validation Errors
            </Button>
            <Button
              onClick$={simulateNetworkError}
              class="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
            >
              Network Error
            </Button>
            <Button
              onClick$={triggerCriticalError}
              class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
            >
              Critical Error
            </Button>
          </div>

          <div class="flex gap-3 flex-wrap">
            <Button
              onClick$={testErrorHierarchy}
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Test Error Hierarchy
            </Button>
            <Button
              onClick$={addWarningAlert}
              class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            >
              Add Warning
            </Button>
            <Button
              onClick$={clearAllErrors}
              class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              Clear All Errors
            </Button>
          </div>
        </div>

        {/* System Error Display */}
        {errorStates.systemError && (
          <ErrorMessage
            message="A critical system error has occurred. Please contact support if this persists."
            title="System Error"
            dismissible={true}
            onDismiss$={() => errorStates.systemError = false}
            size="lg"
            variant="solid"
            showIcon={true}
            animate={true}
          />
        )}

        {/* Network Error Display */}
        {errorStates.networkError && (
          <Alert
            status="error"
            title="Network Connection Error"
            message="Unable to connect to the server. Please check your internet connection and try again."
            dismissible={true}
            onDismiss$={() => errorStates.networkError = false}
            size="md"
            variant="solid"
          />
        )}

        {/* Warning Alerts */}
        {errorStates.warningAlerts.map((alert) => (
          <Alert
            key={alert.id}
            status="warning"
            title="Warning"
            message={alert.message}
            dismissible={true}
            onDismiss$={() => removeWarningAlert(alert.id)}
            size="md"
            variant="outline"
          />
        ))}

        {/* Form with Validation Errors */}
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Form with Error Validation
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                value={formData.username}
                onInput$={(e) => formData.username = (e.target as HTMLInputElement).value}
                class={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errorStates.validationErrors.some(e => e.id === "username")
                    ? "border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-900/20"
                    : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 bg-white dark:bg-gray-700"
                } text-gray-900 dark:text-gray-100`}
                placeholder="Enter username"
              />
              {errorStates.validationErrors
                .filter(e => e.id === "username")
                .map((error) => (
                  <ErrorMessage
                    key={error.id}
                    message={error.message}
                    size="sm"
                    variant="subtle"
                    displayMode="inline"
                    showIcon={true}
                  />
                ))}
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onInput$={(e) => formData.email = (e.target as HTMLInputElement).value}
                class={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errorStates.validationErrors.some(e => e.id === "email")
                    ? "border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-900/20"
                    : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 bg-white dark:bg-gray-700"
                } text-gray-900 dark:text-gray-100`}
                placeholder="Enter email"
              />
              {errorStates.validationErrors
                .filter(e => e.id === "email")
                .map((error) => (
                  <ErrorMessage
                    key={error.id}
                    message={error.message}
                    size="sm"
                    variant="subtle"
                    displayMode="inline"
                    showIcon={true}
                  />
                ))}
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onInput$={(e) => formData.password = (e.target as HTMLInputElement).value}
                class={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errorStates.validationErrors.some(e => e.id === "password")
                    ? "border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-900/20"
                    : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 bg-white dark:bg-gray-700"
                } text-gray-900 dark:text-gray-100`}
                placeholder="Enter password"
              />
              {errorStates.validationErrors
                .filter(e => e.id === "password")
                .map((error) => (
                  <ErrorMessage
                    key={error.id}
                    message={error.message}
                    size="sm"
                    variant="subtle"
                    displayMode="inline"
                    showIcon={true}
                  />
                ))}
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onInput$={(e) => formData.confirmPassword = (e.target as HTMLInputElement).value}
                class={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errorStates.validationErrors.some(e => e.id === "confirmPassword")
                    ? "border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-900/20"
                    : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 bg-white dark:bg-gray-700"
                } text-gray-900 dark:text-gray-100`}
                placeholder="Confirm password"
              />
              {errorStates.validationErrors
                .filter(e => e.id === "confirmPassword")
                .map((error) => (
                  <ErrorMessage
                    key={error.id}
                    message={error.message}
                    size="sm"
                    variant="subtle"
                    displayMode="inline"
                    showIcon={true}
                  />
                ))}
            </div>
          </div>

          <Button
            onClick$={triggerValidationErrors}
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Validate Form
          </Button>
        </div>

        {/* Error Summary Panel */}
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Error State Summary
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class={`p-4 rounded-lg border ${
              errorStates.systemError || errorStates.criticalError
                ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
            }`}>
              <h4 class="font-medium text-red-900 dark:text-red-100 mb-2">
                Critical Errors: {(errorStates.systemError ? 1 : 0) + (errorStates.criticalError ? 1 : 0)}
              </h4>
              <ul class="text-sm text-red-700 dark:text-red-300 space-y-1">
                {errorStates.systemError && <li>• System Error Active</li>}
                {errorStates.criticalError && <li>• Critical Error Active</li>}
              </ul>
            </div>

            <div class={`p-4 rounded-lg border ${
              errorStates.validationErrors.length > 0 || errorStates.networkError
                ? "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800"
                : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
            }`}>
              <h4 class="font-medium text-orange-900 dark:text-orange-100 mb-2">
                Standard Errors: {errorStates.validationErrors.length + (errorStates.networkError ? 1 : 0)}
              </h4>
              <ul class="text-sm text-orange-700 dark:text-orange-300 space-y-1">
                {errorStates.validationErrors.length > 0 && (
                  <li>• {errorStates.validationErrors.length} Validation Error{errorStates.validationErrors.length > 1 ? 's' : ''}</li>
                )}
                {errorStates.networkError && <li>• Network Error Active</li>}
              </ul>
            </div>

            <div class={`p-4 rounded-lg border ${
              errorStates.warningAlerts.length > 0
                ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
                : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
            }`}>
              <h4 class="font-medium text-yellow-900 dark:text-yellow-100 mb-2">
                Warnings: {errorStates.warningAlerts.length}
              </h4>
              <ul class="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                {errorStates.warningAlerts.map((alert, index) => (
                  <li key={alert.id}>• Warning #{index + 1}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Integration Test Actions */}
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Integration Test Actions
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick$={() => isDrawerOpen.value = true}
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Test Errors in Drawer
            </Button>

            <Popover
              isOpen={isPopoverOpen.value}
              onOpen$={() => isPopoverOpen.value = true}
              onClose$={() => isPopoverOpen.value = false}
              placement="top"
              trigger="click"
              hasArrow={true}
            >
              <PopoverTrigger>
                <Button class="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
                  Test Errors in Popover
                </Button>
              </PopoverTrigger>

              <PopoverContent class="w-80 p-4 space-y-3">
                <h4 class="font-semibold text-gray-900 dark:text-gray-100">
                  Popover Error Test
                </h4>
                
                <ErrorMessage
                  message="This error occurred within a popover component."
                  title="Popover Error"
                  size="sm"
                  variant="outline"
                  showIcon={true}
                />

                <Alert
                  status="warning"
                  message="Warning: Nested feedback components in popover."
                  size="sm"
                  variant="subtle"
                />

                <Button
                  onClick$={async () => {
                    await toast.error("Error toast from popover");
                  }}
                  class="w-full bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm"
                >
                  Trigger Error Toast
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* Critical Error Dialog */}
      <Dialog
        isOpen={isDialogOpen.value}
        onClose$={() => {
          isDialogOpen.value = false;
          errorStates.criticalError = false;
        }}
        size="md"
        closeOnOutsideClick={false}
        closeOnEsc={false}
        hasCloseButton={false}
        ariaLabel="Critical error dialog"
      >
        <DialogHeader>
          <h3 class="text-lg font-semibold text-red-600 dark:text-red-400">
            🚨 Critical System Error
          </h3>
        </DialogHeader>

        <DialogBody class="space-y-4">
          <ErrorMessage
            message="A critical system error has occurred that requires immediate attention. The system may be unstable."
            title="Critical Error Details"
            size="md"
            variant="solid"
            showIcon={true}
            dismissible={false}
          />

          <Alert
            status="error"
            title="Immediate Action Required"
            message="Please save any unsaved work and restart the application."
            size="md"
            variant="solid"
          />

          <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h5 class="font-medium mb-2 text-gray-900 dark:text-gray-100">Error Details:</h5>
            <ul class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• Error Code: ERR_CRITICAL_001</li>
              <li>• Time: {new Date().toLocaleString()}</li>
              <li>• Component: ErrorHandlingTest</li>
              <li>• Severity: Critical</li>
            </ul>
          </div>
        </DialogBody>

        <DialogFooter>
          <div class="flex gap-3 justify-end">
            <Button
              onClick$={() => {
                errorStates.criticalError = false;
                isDialogOpen.value = false;
                toast.success("Critical error acknowledged and cleared");
              }}
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Acknowledge Error
            </Button>
          </div>
        </DialogFooter>
      </Dialog>

      {/* Error Testing Drawer */}
      <Drawer
        isOpen={isDrawerOpen.value}
        onClose$={() => isDrawerOpen.value = false}
        placement="right"
        size="lg"
        hasOverlay={true}
        closeOnOverlayClick={true}
      >
        <DrawerHeader>
          <h3 class="text-lg font-semibold">Error Testing in Drawer</h3>
        </DrawerHeader>

        <DrawerContent class="p-4 space-y-4">
          <ErrorMessage
            message="This is an error message displayed within a drawer component."
            title="Drawer Error Test"
            dismissible={true}
            size="md"
            variant="solid"
            showIcon={true}
          />

          <Alert
            status="error"
            title="Alert Error in Drawer"
            message="This alert shows error status within the drawer context."
            dismissible={true}
            size="md"
            variant="outline"
          />

          <div class="space-y-3">
            <Button
              onClick$={() => toast.error("Error toast from drawer")}
              class="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Trigger Error Toast from Drawer
            </Button>

            <Button
              onClick$={() => {
                errorStates.userError = true;
                toast.warning("User error triggered from drawer");
              }}
              class="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded"
            >
              Trigger User Error
            </Button>
          </div>

          {errorStates.userError && (
            <ErrorMessage
              message="User error: Invalid action performed from drawer."
              title="User Error"
              dismissible={true}
              onDismiss$={() => errorStates.userError = false}
              size="md"
              variant="outline"
              showIcon={true}
            />
          )}
        </DrawerContent>

        <DrawerFooter>
          <Button
            onClick$={() => isDrawerOpen.value = false}
            class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            Close Drawer
          </Button>
        </DrawerFooter>
      </Drawer>
    </div>
  );
});