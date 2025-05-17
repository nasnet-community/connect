import { component$, useSignal } from '@builder.io/qwik';
import { Alert } from './Alert';

export default component$(() => {
  const showSuccessAlert = useSignal(true);
  const showWarningAlert = useSignal(true);
  const showErrorAlert = useSignal(true);

  return (
    <div class="space-y-6 p-6">
      <h2 class="text-xl font-semibold mb-4">Alert Component Examples</h2>
      
      {/* Basic Alerts */}
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Basic Alerts</h3>
        
        <Alert status="info">
          This is an informational alert with default styling.
        </Alert>
        
        <Alert status="success">
          Operation completed successfully. Your changes have been saved.
        </Alert>
        
        <Alert status="warning">
          Warning: This action cannot be undone once confirmed.
        </Alert>
        
        <Alert status="error">
          Error: Failed to save your changes. Please try again.
        </Alert>
      </div>
      
      {/* Alerts with titles */}
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Alerts with Titles</h3>
        
        <Alert status="info" title="Account Information">
          Your account was created on January 15, 2023.
        </Alert>
        
        <Alert status="success" title="Payment Successful">
          Your payment of $24.99 was processed successfully.
        </Alert>
        
        <Alert status="warning" title="License Expiring">
          Your license will expire in 7 days. Please renew soon.
        </Alert>
        
        <Alert status="error" title="Connection Failed">
          Unable to establish connection to the server. Check your network settings.
        </Alert>
      </div>
      
      {/* Subtle Alerts */}
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Subtle Alerts</h3>
        
        <Alert status="info" subtle>
          This is a subtle informational alert with reduced visual prominence.
        </Alert>
        
        <Alert status="success" subtle>
          This is a subtle success alert for less intrusive notifications.
        </Alert>
      </div>
      
      {/* Dismissible Alerts */}
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Dismissible Alerts</h3>
        
        {showSuccessAlert.value && (
          <Alert 
            status="success" 
            dismissible 
            onDismiss$={() => {
              showSuccessAlert.value = false;
            }}
          >
            This success alert can be dismissed by clicking the X button.
          </Alert>
        )}
        
        {showWarningAlert.value && (
          <Alert 
            status="warning" 
            dismissible 
            title="Important Notice"
            onDismiss$={() => {
              showWarningAlert.value = false;
            }}
          >
            This warning alert with a title can be dismissed.
          </Alert>
        )}
        
        {showErrorAlert.value && (
          <Alert 
            status="error" 
            dismissible 
            subtle
            onDismiss$={() => {
              showErrorAlert.value = false;
            }}
          >
            This is a subtle error alert that can be dismissed.
          </Alert>
        )}
        
        {(!showSuccessAlert.value && !showWarningAlert.value && !showErrorAlert.value) && (
          <button 
            onClick$={() => {
              showSuccessAlert.value = true;
              showWarningAlert.value = true;
              showErrorAlert.value = true;
            }}
            class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Reset Alerts
          </button>
        )}
      </div>
      
      {/* Icon Variants */}
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Alert Icon Variants</h3>
        
        <Alert status="info" icon={false} title="No Icon">
          This alert appears without an icon for a cleaner look.
        </Alert>
        
        <Alert status="success" loading title="Loading">
          This alert shows a loading spinner instead of the default icon.
        </Alert>
        
        <Alert 
          status="info" 
          icon={(
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
          )}
          title="Custom Icon"
        >
          This alert uses a custom icon instead of the default.
        </Alert>
      </div>
      
      {/* Size Variants */}
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Alert Size Variants</h3>
        
        <Alert status="info" size="sm" title="Small Alert">
          This is a small-sized alert with reduced padding and font size.
        </Alert>
        
        <Alert status="info" size="md" title="Medium Alert (Default)">
          This is a medium-sized alert (default size).
        </Alert>
        
        <Alert status="info" size="lg" title="Large Alert">
          This is a large-sized alert with increased padding and font size.
        </Alert>
      </div>
      
      {/* Variant Styles */}
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Alert Style Variants</h3>
        
        <Alert status="info" variant="solid" title="Solid Variant (Default)">
          This is the default solid variant of the alert.
        </Alert>
        
        <Alert status="success" variant="outline" title="Outline Variant">
          This is an outline variant with transparent background.
        </Alert>
        
        <Alert status="warning" variant="solid" subtle title="Subtle Solid Variant">
          This is a subtle solid variant with reduced contrast.
        </Alert>
        
        <Alert status="error" variant="outline" title="Outline Error Variant">
          This is an outline variant for the error state.
        </Alert>
      </div>
      
      {/* Auto-Closing Alerts */}
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Auto-Closing Alerts</h3>
        
        <Alert 
          status="info" 
          title="Auto-Closing Alert"
          autoCloseDuration={5000}
          dismissible
        >
          This alert will automatically dismiss after 5 seconds.
        </Alert>
      </div>
      
      {/* Alert with Message Prop */}
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Alert with Message Prop</h3>
        
        <Alert 
          status="success" 
          title="Success"
          message="This alert uses the message prop instead of children."
        />
      </div>
    </div>
  );
});