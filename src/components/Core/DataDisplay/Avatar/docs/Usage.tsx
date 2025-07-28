import { component$ } from "@builder.io/qwik";
import { UsageTemplate } from "~/components/Docs/templates/UsageTemplate";

export default component$(() => {
  const guidelines = [
    {
      title: "Use appropriate sizing",
      description:
        "Choose avatar sizes that match their importance and context in the UI. Use larger sizes for profile pages and smaller sizes for comments or lists.",
      code: `// For a profile page or header
<Avatar size="xl">
  <img src="https://i.pravatar.cc/300" alt="User profile" />
</Avatar>

// For comments or dense lists
<Avatar size="sm">
  <img src="https://i.pravatar.cc/300" alt="User profile" />
</Avatar>`,
      type: "do" as const,
    },
    {
      title: "Provide fallbacks",
      description:
        "Always ensure avatars have fallback content (initials or icon) if images fail to load. This ensures users still see visual representations even when images are unavailable.",
      code: `// With fallback initials when image fails to load
// The avatar will automatically fall back to initials
// if the image fails to load
<Avatar>
  <img 
    src="https://example.com/possibly-invalid-url.jpg" 
    alt="John Doe" 
  />
  JD
</Avatar>`,
      type: "do" as const,
    },
    {
      title: "Use meaningful alt text",
      description:
        "When using image avatars, provide descriptive alt text for accessibility. This helps screen reader users understand who the avatar represents.",
      code: `// Good practice for accessibility
<Avatar>
  <img 
    src="https://i.pravatar.cc/300" 
    alt="Profile picture of John Doe, Project Manager" 
  />
</Avatar>

// Avoid generic descriptions
<Avatar>
  <img 
    src="https://i.pravatar.cc/300" 
    alt="Avatar" // Not descriptive enough
  />
</Avatar>`,
      type: "do" as const,
    },
    {
      title: "Be consistent with shapes",
      description:
        "Maintain consistent avatar shapes throughout your application for visual harmony. Choose one shape and use it consistently across your UI.",
      code: `// Example of consistent application
<Card>
  <div class="flex items-center gap-4">
    <Avatar shape="circle">
      <img src="https://i.pravatar.cc/300?img=1" alt="Author" />
    </Avatar>
    <div>
      <h3>Article Title</h3>
      <p>Written by John Doe</p>
    </div>
  </div>
</Card>

// In comments section, using the same shape
<div class="space-y-4">
  {comments.map(comment => (
    <div class="flex gap-2">
      <Avatar shape="circle">
        <img src={comment.authorAvatar} alt={comment.authorName} />
      </Avatar>
      <div>{comment.text}</div>
    </div>
  ))}
</div>`,
      type: "do" as const,
    },
  ];

  const bestPractices = guidelines.map((item) => ({
    title: item.title,
    description: item.description,
  }));

  const accessibilityTips = [
    {
      title: "Provide descriptive labels",
      description:
        "Ensure avatars have proper aria-label attributes to describe their purpose for screen readers.",
      code: `// Good for accessibility
<Avatar ariaLabel="Profile of John Doe, Online Status">
  <img src="https://i.pravatar.cc/300" alt="John Doe" />
</Avatar>

// For interactive avatars
<Avatar 
  clickable={true} 
  onClick$={() => console.log('Avatar clicked')}
  ariaLabel="View John Doe's profile"
>
  <img src="https://i.pravatar.cc/300" alt="John Doe" />
</Avatar>`,
    },
    {
      title: "Color contrast for initials",
      description:
        "Ensure initials avatars have sufficient color contrast between text and background for readability.",
      code: `// Good contrast combinations
<div class="flex gap-4">
  <Avatar variant="initials" initials="JD" color="primary" />
  <Avatar variant="initials" initials="AB" color="info" />
  <Avatar variant="initials" initials="CD" color="success" />
</div>`,
    },
    {
      title: "Avoid relying solely on status colors",
      description:
        "Don't rely only on color to convey status. Consider adding tooltips or additional text for clarity.",
      code: `// Better practice with tooltip context
<div class="relative group">
  <Avatar 
    status="online" 
    ariaLabel="John Doe, Online"
  >
    <img src="https://i.pravatar.cc/300" alt="John Doe" />
  </Avatar>
  <div class="absolute hidden group-hover:block bg-gray-800 text-white p-2 rounded text-xs -bottom-8 left-1/2 transform -translate-x-1/2">
    Online
  </div>
</div>`,
    },
  ];

  // Remove example field from accessibilityTips as it's not part of the interface
  const accessibilityGuidelines = accessibilityTips.map((item) => ({
    title: item.title,
    description: item.description,
  }));

  // Remove code field from best practices and common patterns as they're not part of their interfaces
  const bestPracticesForTemplate = bestPractices.map((item) => ({
    title: item.title,
    description: item.description,
  }));

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPracticesForTemplate}
      accessibilityTips={accessibilityGuidelines}
    />
  );
});
