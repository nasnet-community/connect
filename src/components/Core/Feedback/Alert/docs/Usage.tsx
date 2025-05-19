import { component$ } from '@builder.io/qwik';
import { UsageTemplate, type UsageGuideline, type BestPractice, type AccessibilityTip } from '~/components/Docs/templates';

/**
 * Alert component usage documentation using the standard template
 */
export default component$(() => {
  const guidelines: UsageGuideline[] = [
    {
      title: "Use appropriate status for the message",
      description: "Match the alert status to the type of message you're communicating.",
      code: `// For general information
<Alert status="info" title="Account Updated" message="Your profile information has been updated." />

// For successful operations
<Alert status="success" title="Payment Successful" message="Your payment has been processed." />

// For warnings
<Alert status="warning" title="Storage Limit" message="You've used 90% of your storage quota." />

// For errors
<Alert status="error" title="Connection Failed" message="Unable to connect to the server." />`,
      type: "do"
    },
    {
      title: "Use clear and concise messaging",
      description: "Keep alert messages brief but informative.",
      code: `// Good - clear and specific
<Alert
  status="success"
  title="Form Submitted"
  message="Your application has been received. We'll review it within 48 hours."
/>

// Good - helpful guidance with error
<Alert 
  status="error"
  title="Invalid Email Format"
  message="Please enter a valid email address (e.g., name@example.com)."
/>`,
      type: "do"
    },
    {
      title: "Use auto-dismiss for non-critical feedback",
      description: "Auto-dismiss success messages and non-critical notifications after users have had time to read them.",
      code: `// Auto-dismiss success notification after 5 seconds
<Alert
  status="success"
  title="File Uploaded"
  message="Your file has been uploaded successfully."
  autoCloseDuration={5000}
/>`,
      type: "do"
    },
    {
      title: "Don't use alerts for complex interactions",
      description: "Avoid using alerts when more complex user interaction is required.",
      code: `// Don't do this - alerts aren't meant for complex interactions
<Alert status="warning">
  <div>
    <p>You're about to delete 5 files.</p>
    <div class="flex gap-2 mt-3">
      <button>Cancel</button>
      <button>Delete All</button>
      <button>Select Files</button>
    </div>
  </div>
</Alert>

// Better approach - use a Dialog component instead
<Dialog
  title="Confirm Deletion"
  content="You're about to delete 5 files. This action cannot be undone."
  primaryAction="Delete All"
  secondaryAction="Cancel"
/>`,
      type: "dont"
    },
    {
      title: "Don't overuse alerts",
      description: "Too many alerts can lead to alert fatigue and cause users to ignore important messages.",
      code: `// Don't do this - too many alerts at once
<div>
  <Alert status="info" message="Your session will timeout in 30 minutes." />
  <Alert status="info" message="New features are available." />
  <Alert status="info" message="You have 3 unread messages." />
  <Alert status="info" message="Weekly maintenance scheduled for Friday." />
</div>

// Better approach - prioritize and combine related information
<Alert status="info" title="System Notifications">
  <ul class="list-disc pl-5">
    <li>Your session will timeout in 30 minutes</li>
    <li>New features are available</li>
    <li>You have 3 unread messages</li>
  </ul>
</Alert>`,
      type: "dont"
    },
    {
      title: "Don't use alerts for marketing or promotional content",
      description: "Alerts are for system feedback and important information, not marketing messages.",
      code: `// Don't do this - alerts aren't for promotional content
<Alert 
  status="info" 
  title="Special Offer!"
  message="Get 50% off all premium features this week only!"
/>

// Better approach - use a dedicated promotional component
<PromoBanner
  title="Special Offer!"
  message="Get 50% off all premium features this week only!"
  ctaText="Learn More"
/>`,
      type: "dont"
    }
  ];

  const bestPractices: BestPractice[] = [
    {
      title: "Position alerts in context",
      description: "Place alerts near the content they relate to, such as above a form that has validation errors."
    },
    {
      title: "Include actionable guidance",
      description: "When showing an error or warning, include guidance on how to resolve the issue or what to do next."
    },
    {
      title: "Use loading state for in-progress feedback",
      description: "When an operation is in progress, use the loading state to provide immediate feedback."
    },
    {
      title: "Make dismissible alerts keyboard accessible",
      description: "Ensure users can dismiss alerts using both mouse and keyboard (Tab navigation and Enter/Space)."
    },
    {
      title: "Match alert visibility to message importance",
      description: "Use solid variants for critical alerts, and subtle or outline variants for less urgent information."
    },
    {
      title: "Use consistent alert patterns",
      description: "Be consistent in how you use alerts throughout your application for similar scenarios."
    }
  ];

  const accessibilityTips: AccessibilityTip[] = [
    {
      title: "Use appropriate ARIA roles",
      description: "The Alert component uses role=\"alert\" by default, which causes screen readers to immediately interrupt and announce the content."
    },
    {
      title: "Provide sufficient reading time",
      description: "For auto-dismissing alerts, ensure there's enough time (at least 5 seconds) for users to read the content."
    },
    {
      title: "Include visual and textual cues",
      description: "Use both icons and text to communicate status, never rely on color alone."
    },
    {
      title: "Consider focus management",
      description: "For critical errors, consider using a non-dismissible alert and moving focus to it when it appears."
    },
    {
      title: "Avoid rapid visual changes",
      description: "Don't rapidly show and hide alerts, which can be disorienting for users with cognitive disabilities."
    },
    {
      title: "Test with screen readers",
      description: "Verify that alerts are properly announced by screen readers, especially for auto-dismissing alerts."
    }
  ];

  const performanceTips = [
    "Use the autoCloseDuration prop to automatically remove alerts from the DOM after they're no longer needed",
    "Avoid showing multiple alerts simultaneously as it can impact rendering performance",
    "Consider using a centralized alert management system for complex applications",
    "When showing alerts based on API responses, handle loading states appropriately to prevent layout shifts"
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
      performanceTips={performanceTips}
    >
      <p>
        Alerts are an important part of your application's communication system. They help inform
        users about the status of operations, provide feedback on actions, and highlight important
        information that requires attention.
      </p>
      <p class="mt-2">
        When used appropriately, alerts enhance the user experience by providing timely, relevant,
        and contextual information. However, overuse or misuse of alerts can lead to alert fatigue,
        where users start ignoring these important messages.
      </p>
    </UsageTemplate>
  );
}); 