import { component$ } from "@builder.io/qwik";
import { UsageTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const doSection = [
    {
      title: "Use tooltips for supplementary information",
      description:
        "Tooltips should provide additional context or explanation that enhances the user experience without being essential for basic functionality.",
      code: `// Good: Tooltip providing extra context
<Tooltip content="Displays all files, including hidden ones">
  <Button>Show All Files</Button>
</Tooltip>

// Good: Tooltip explaining an icon button
<Tooltip content="Edit profile settings">
  <IconButton icon={GearIcon} aria-label="Settings" />
</Tooltip>`,
    },
    {
      title: "Keep tooltip content concise and focused",
      description:
        "Tooltips should be brief and to the point. For longer content, consider using a popover or modal instead.",
      code: `// Good: Concise tooltip
<Tooltip content="Copy to clipboard">
  <IconButton icon={ClipboardIcon} aria-label="Copy" />
</Tooltip>

// Bad: Too much content for a tooltip
<Tooltip content="This will copy the entire contents of the document to your system clipboard so that you can paste it into another application. If the document is protected, you will need administrator permission to complete this action.">
  <IconButton icon={ClipboardIcon} aria-label="Copy" />
</Tooltip>`,
    },
    {
      title: "Make tooltips accessible",
      description:
        "Ensure tooltips are accessible by including proper ARIA attributes and supporting keyboard navigation.",
      code: `// Good: Accessible tooltip implementation
<Tooltip 
  content="Information about this input"
  trigger={["hover", "focus"]} // Support both mouse and keyboard users
>
  <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full bg-gray-200" aria-label="Help">?</span>
</Tooltip>

// For icon buttons, use aria-label for the button itself
<Tooltip content="Add a new item">
  <IconButton 
    icon={PlusIcon} 
    aria-label="Add item" 
  />
</Tooltip>`,
    },
    {
      title: "Position tooltips intelligently",
      description:
        "Choose appropriate tooltip placement to ensure they are visible and don't obscure important content.",
      code: `// Good: Strategic placement based on context
// For top navigation items
<Tooltip content="Account settings" placement="bottom">
  <IconButton icon={UserIcon} />
</Tooltip>

// For side navigation items
<Tooltip content="Dashboard" placement="right">
  <NavItem icon={HomeIcon} />
</Tooltip>

// For form fields
<Tooltip content="Password must be at least 8 characters" placement="top-start">
  <InfoIcon />
</Tooltip>`,
    },
  ];

  const dontSection = [
    {
      title: "Don't use tooltips for essential information",
      description:
        "Don't hide critical information or primary instructions in tooltips. Essential information should be visible at all times.",
      code: `// Bad: Critical information hidden in tooltip
<form>
  <label>Password</label>
  <input type="password" />
  <Tooltip content="Password is required to continue">
    <InfoIcon />
  </Tooltip>
  <Button>Submit</Button>
</form>

// Good: Critical information visible in the UI
<form>
  <label>Password <span class="text-red-500">*</span></label>
  <input type="password" required />
  <p class="text-sm text-gray-500">Password is required to continue</p>
  <Button>Submit</Button>
</form>`,
    },
    {
      title: "Don't nest interactive elements in tooltips",
      description:
        "Avoid including complex interactive elements within tooltips. For interactive content, use a popover or modal instead.",
      code: `// Bad: Complex interactions inside a tooltip
<Tooltip 
  content={
    <div>
      <h3>Change settings</h3>
      <input type="checkbox" id="setting1" /> <label for="setting1">Enable feature</label>
      <Button>Save</Button>
    </div>
  }
>
  <IconButton icon={GearIcon} aria-label="Settings" />
</Tooltip>

// Good: Use a popover for interactive content instead
<Popover
  content={
    <div>
      <h3>Change settings</h3>
      <input type="checkbox" id="setting1" /> <label for="setting1">Enable feature</label>
      <Button>Save</Button>
    </div>
  }
>
  <IconButton icon={GearIcon} aria-label="Settings" />
</Popover>`,
    },
    {
      title: "Don't use tooltips on mobile-focused elements",
      description:
        "Tooltips triggered by hover aren't suitable for mobile interfaces. Consider alternatives like labels or info icons that trigger tooltips on tap.",
      code: `// Bad: Hover tooltip on mobile-focused element
<div class="mobile-app-interface">
  <Tooltip content="Swipe right to like" trigger="hover">
    <Card>User Profile</Card>
  </Tooltip>
</div>

// Good: Mobile-friendly alternative
<div class="mobile-app-interface">
  <Card>
    <div class="flex items-center">
      User Profile
      <Tooltip content="Swipe right to like" trigger="click">
        <InfoIcon class="ml-2" />
      </Tooltip>
    </div>
  </Card>
</div>`,
    },
    {
      title: "Don't overuse tooltips",
      description:
        "Too many tooltips can clutter the interface and decrease their effectiveness. Use them sparingly for truly supplementary information.",
      code: `// Bad: Tooltip overload
<div>
  <Tooltip content="User name">
    <label>Name</label>
  </Tooltip>
  <input type="text" />
  
  <Tooltip content="User email">
    <label>Email</label>
  </Tooltip>
  <input type="email" />
  
  <Tooltip content="User password">
    <label>Password</label>
  </Tooltip>
  <input type="password" />
</div>

// Good: Selective use of tooltips
<div>
  <label>Name</label>
  <input type="text" />
  
  <label>Email</label>
  <input type="email" />
  
  <label>Password</label>
  <input type="password" />
  <Tooltip content="Must be at least 8 characters with one uppercase letter, number, and special character">
    <InfoIcon class="ml-1" />
  </Tooltip>
</div>`,
    },
  ];

  const guidelines = [
    ...doSection.map((item) => ({ ...item, type: "do" as const })),
    ...dontSection.map((item) => ({ ...item, type: "dont" as const })),
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      accessibilityTips={[
        {
          title: "Keyboard Support",
          description:
            'Ensure tooltips are accessible via keyboard navigation by using the "focus" trigger.',
        },
        {
          title: "ARIA Attributes",
          description:
            "Include appropriate ARIA attributes like aria-label on the trigger element when needed.",
        },
        {
          title: "Screen Reader Support",
          description:
            "Use aria-describedby to associate tooltips with the elements they describe.",
        },
        {
          title: "Color Contrast",
          description:
            "Ensure tooltips have sufficient color contrast against their background.",
        },
        {
          title: "Timing",
          description:
            "Tooltips should not disappear too quickly, giving users time to read the content.",
        },
        {
          title: "Icon Labels",
          description:
            "For icon-only buttons, always use tooltips to provide text labels.",
        },
        {
          title: "Interactive Navigation",
          description:
            "Interactive tooltips should be navigable and operable with keyboard alone.",
        },
      ]}
    >
      <p>
        Tooltips provide supplementary information when users hover over, focus
        on, or click an element. They help clarify unfamiliar concepts, explain
        functionality, or provide additional context without cluttering the
        interface.
      </p>
      <h3 class="mb-2 mt-6 text-lg font-medium">Common Use Cases</h3>
      <ul class="mb-4 ml-6 list-disc space-y-2">
        <li>
          <strong>Explaining UI controls:</strong> Use tooltips to explain what
          an icon button or control does, especially for actions with limited
          space for labels.
        </li>
        <li>
          <strong>Form field guidance:</strong> Provide additional information
          about form fields, such as input format requirements or field purpose.
        </li>
        <li>
          <strong>Abbreviated content:</strong> Show full text for truncated
          content or elements that have been shortened due to space constraints.
        </li>
        <li>
          <strong>Feature discovery:</strong> Highlight new or important
          features to users without disrupting their workflow.
        </li>
        <li>
          <strong>Help text:</strong> Provide contextual help for specific
          elements without requiring users to navigate away from their current
          task.
        </li>
      </ul>

      <h3 class="mb-2 mt-6 text-lg font-medium">Tooltip Triggers</h3>
      <p class="mb-2">
        Choose the appropriate trigger method based on context:
      </p>
      <ul class="mb-4 ml-6 list-disc">
        <li>
          <strong>Hover:</strong> The default behavior - best for desktop
          applications when additional information is supplementary.
        </li>
        <li>
          <strong>Focus:</strong> Important for accessibility - ensures keyboard
          users can access tooltip information.
        </li>
        <li>
          <strong>Click:</strong> Better for mobile interfaces or when the
          tooltip contains important information that shouldn't be missed.
        </li>
        <li>
          <strong>Combined triggers:</strong> Often best to use multiple
          triggers, such as
          <code>["hover", "focus"]</code> to support all users.
        </li>
      </ul>
    </UsageTemplate>
  );
});
