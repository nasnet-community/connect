import { component$ } from "@builder.io/qwik";
import {
  UsageTemplate,
  type UsageGuideline,
  type BestPractice,
  type AccessibilityTip,
} from "~/components/Docs/templates";

/**
 * Dialog component usage documentation using the standard template
 */
export default component$(() => {
  const guidelines: UsageGuideline[] = [
    {
      title: "Use structured Dialog components",
      description:
        "Follow the recommended pattern with header, body, and footer sections.",
      code: `// Good - Structured dialog using child components
<Dialog isOpen={isOpen.value} onClose$={closeDialog}>
  <DialogHeader>Dialog Title</DialogHeader>
  <DialogBody>
    <p>Dialog content goes here...</p>
  </DialogBody>
  <DialogFooter>
    <Button onClick$={closeDialog}>Close</Button>
  </DialogFooter>
</Dialog>`,
      type: "do",
    },
    {
      title: "Use the right dialog size",
      description:
        "Choose a size that fits your content without excessive empty space or scrolling.",
      code: `// For simple confirmation
<Dialog size="sm" isOpen={isConfirm.value}>
  <DialogBody>
    <p>Are you sure you want to proceed?</p>
  </DialogBody>
  <DialogFooter>
    <Button variant="outline" onClick$={cancel}>Cancel</Button>
    <Button onClick$={confirm}>Confirm</Button>
  </DialogFooter>
</Dialog>

// For forms or more complex content
<Dialog size="lg" isOpen={isFormOpen.value}>
  <DialogHeader>Edit Profile</DialogHeader>
  <DialogBody>
    {/* Form with multiple fields */}
  </DialogBody>
  <DialogFooter>
    <Button onClick$={submit}>Save Changes</Button>
  </DialogFooter>
</Dialog>`,
      type: "do",
    },
    {
      title: "Provide clear primary and secondary actions",
      description:
        "Clearly distinguish between primary and secondary actions in the footer.",
      code: `// Good - Clear primary and secondary actions
<DialogFooter>
  <div class="flex justify-end gap-3">
    <Button variant="outline" onClick$={cancel}>
      Cancel
    </Button>
    <Button onClick$={save}>
      Save Changes
    </Button>
  </div>
</DialogFooter>`,
      type: "do",
    },
    {
      title: "Don't nest dialogs",
      description: "Avoid opening a dialog from within another dialog.",
      code: `// Don't do this - Nested dialogs create poor UX
<Dialog isOpen={isMainDialogOpen.value}>
  <DialogBody>
    <p>Main dialog content</p>
    <Button onClick$={() => openNestedDialog()}>
      Open Another Dialog
    </Button>
  </DialogBody>
</Dialog>

// Better approach - Use sequential dialogs or inline expandable sections
<Dialog isOpen={currentStep.value === 'details'}>
  <DialogBody>
    <p>Step 1 content</p>
  </DialogBody>
  <DialogFooter>
    <Button onClick$={() => { 
      currentStep.value = 'confirm';
    }}>
      Next Step
    </Button>
  </DialogFooter>
</Dialog>`,
      type: "dont",
    },
    {
      title: "Don't overload dialogs with too much content",
      description:
        "Avoid placing too much content or complex interactions in a single dialog.",
      code: `// Don't do this - Dialog with excessive content
<Dialog isOpen={isOpen.value}>
  <DialogBody>
    <div class="space-y-6">
      <h2>Terms and Conditions</h2>
      <div class="h-96 overflow-y-auto text-xs">
        {/* Extremely long text content */}
        {/* Multiple sections */}
        {/* Complex forms */}
      </div>
    </div>
  </DialogBody>
</Dialog>

// Better approach - Use a dedicated page or break into steps
<Dialog isOpen={isOpen.value}>
  <DialogHeader>Terms and Conditions</DialogHeader>
  <DialogBody scrollable={true}>
    <p>Key points summary:</p>
    <ul class="list-disc pl-5">
      <li>Important point 1</li>
      <li>Important point 2</li>
      <li>Important point 3</li>
    </ul>
  </DialogBody>
  <DialogFooter>
    <Button variant="link" onClick$={viewFullTerms}>
      View Full Terms
    </Button>
    <Button onClick$={accept}>Accept</Button>
  </DialogFooter>
</Dialog>`,
      type: "dont",
    },
    {
      title: "Don't use dialogs for non-critical content",
      description:
        "Reserve dialogs for important interactions that require user focus.",
      code: `// Don't do this - Dialog for simple information
<Button onClick$={() => showHelpDialog()}>
  Learn More
</Button>

// Better approach - Use tooltips, expandable sections, or inline help
<div class="relative">
  <Button>Learn More</Button>
  <Tooltip>
    This feature helps you organize your workspace by...
  </Tooltip>
</div>`,
      type: "dont",
    },
  ];

  const bestPractices: BestPractice[] = [
    {
      title: "Clear dialog purpose",
      description:
        "Each dialog should have a single, clear purpose such as confirming an action or collecting specific information.",
    },
    {
      title: "Descriptive titles",
      description:
        "Use concise, descriptive titles that clearly communicate the dialog's purpose or the action being taken.",
    },
    {
      title: "Keep content focused",
      description:
        "Include only the information and controls necessary for the current task to maintain focus and reduce cognitive load.",
    },
    {
      title: "Consistent button placement",
      description:
        "Position action buttons consistently, typically with the primary action on the right and cancel/secondary actions on the left.",
    },
    {
      title: "Control dialog frequency",
      description:
        "Limit the frequency of dialogs to avoid interrupting the user's workflow unnecessarily.",
    },
    {
      title: "Use scrollable content mindfully",
      description:
        "When using scrollable content, ensure important information and actions remain visible without requiring scroll.",
    },
    {
      title: "Animation for visual cues",
      description:
        "Use subtle animations to draw attention to the dialog appearing, but avoid excessive or distracting animations.",
    },
    {
      title: "Error handling within dialogs",
      description:
        "Display validation errors inline within the dialog rather than opening another dialog or redirecting.",
    },
  ];

  const accessibilityTips: AccessibilityTip[] = [
    {
      title: "Proper ARIA roles and attributes",
      description:
        'Ensure the dialog has role="dialog" and aria-modal="true", with appropriate aria-labelledby and aria-describedby attributes.',
    },
    {
      title: "Keyboard navigation",
      description:
        "Ensure all interactive elements within the dialog can be accessed and operated using keyboard navigation.",
    },
    {
      title: "Focus management",
      description:
        "When a dialog opens, focus should move to the first focusable element. When it closes, focus should return to the triggering element.",
    },
    {
      title: "Escape key for closing",
      description:
        "Allow users to close the dialog by pressing the Escape key (unless it would result in data loss).",
    },
    {
      title: "Focus trapping",
      description:
        "Trap keyboard focus within the dialog to prevent users from tabbing to elements behind the dialog.",
    },
    {
      title: "High contrast mode compatibility",
      description:
        "Ensure the dialog is visible and usable in high contrast mode with adequate borders and focus indicators.",
    },
    {
      title: "Screen reader announcements",
      description:
        "When a dialog opens, screen readers should announce the dialog title and description.",
    },
    {
      title: "Touch target sizes",
      description:
        "Ensure all interactive elements in the dialog have adequate touch target sizes (at least 44x44 pixels).",
    },
  ];

  const performanceTips = [
    "Lazy load dialog content when possible to reduce initial load time",
    "Use the disableAnimation prop on low-end devices to improve performance",
    "Consider using a central dialog manager to avoid mounting multiple dialog instances",
    "Unmount dialog content when not in use to reduce DOM size",
    "For complex dialogs with forms, consider code-splitting to load form logic only when needed",
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
      performanceTips={performanceTips}
    >
      <p>
        Dialogs are powerful UI elements that temporarily interrupt the user's
        current task to focus their attention on critical information or
        actions. When implemented thoughtfully, dialogs can enhance the user
        experience by providing clear context and focused interactions.
      </p>
      <p class="mt-2">
        However, because dialogs are disruptive by nature, it's important to use
        them judiciously and follow best practices to ensure they enhance rather
        than hinder the user experience. The guidelines below will help you
        implement dialogs effectively in your application.
      </p>
    </UsageTemplate>
  );
});
