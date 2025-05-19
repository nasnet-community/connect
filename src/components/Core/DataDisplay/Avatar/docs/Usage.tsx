import { component$ } from '@builder.io/qwik';
import { UsageTemplate } from '~/components/Docs/templates/UsageTemplate';

export default component$(() => {
  const bestPractices = [
    {
      title: 'Use appropriate sizing',
      description: 'Choose avatar sizes that match their importance and context in the UI. Use larger sizes for profile pages and smaller sizes for comments or lists.',
      example: 
`// For a profile page or header
<Avatar size="xl">
  <img src="https://i.pravatar.cc/300" alt="User profile" />
</Avatar>

// For comments or dense lists
<Avatar size="sm">
  <img src="https://i.pravatar.cc/300" alt="User profile" />
</Avatar>`
    },
    {
      title: 'Provide fallbacks',
      description: 'Always ensure avatars have fallback content (initials or icon) if images fail to load. This ensures users still see visual representations even when images are unavailable.',
      example:
`// With fallback initials when image fails to load
// The avatar will automatically fall back to initials
// if the image fails to load
<Avatar>
  <img 
    src="https://example.com/possibly-invalid-url.jpg" 
    alt="John Doe" 
  />
  JD
</Avatar>`
    },
    {
      title: 'Use meaningful alt text',
      description: 'When using image avatars, provide descriptive alt text for accessibility. This helps screen reader users understand who the avatar represents.',
      example:
`// Good practice for accessibility
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
</Avatar>`
    },
    {
      title: 'Be consistent with shapes',
      description: 'Maintain consistent avatar shapes throughout your application for visual harmony. Choose one shape and use it consistently across your UI.',
      example:
`// Example of consistent application
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
</div>`
    }
  ];

  const accessibilityGuidelines = [
    {
      title: 'Provide descriptive labels',
      description: 'Ensure avatars have proper aria-label attributes to describe their purpose for screen readers.',
      example:
`// Good for accessibility
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
</Avatar>`
    },
    {
      title: 'Color contrast for initials',
      description: 'Ensure initials avatars have sufficient color contrast between text and background for readability.',
      example:
`// Good contrast combinations
<div class="flex gap-4">
  <Avatar variant="initials" initials="JD" color="primary" />
  <Avatar variant="initials" initials="AB" color="info" />
  <Avatar variant="initials" initials="CD" color="success" />
</div>`
    },
    {
      title: 'Avoid relying solely on status colors',
      description: 'Don\'t rely only on color to convey status. Consider adding tooltips or additional text for clarity.',
      example:
`// Better practice with tooltip context
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
</div>`
    }
  ];

  const commonPatterns = [
    {
      title: 'User card with avatar',
      description: 'Display a user card with avatar and basic information.',
      example:
`<Card class="p-4 max-w-md">
  <div class="flex items-center gap-4">
    <Avatar size="lg">
      <img src="https://i.pravatar.cc/300" alt="Jane Doe" />
    </Avatar>
    <div>
      <h3 class="font-bold text-lg">Jane Doe</h3>
      <p class="text-gray-600 dark:text-gray-300">Product Designer</p>
      <div class="flex items-center text-sm mt-1">
        <span class="bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200 px-2 py-0.5 rounded-full">Available for hire</span>
      </div>
    </div>
  </div>
</Card>`
    },
    {
      title: 'Avatar group in team display',
      description: 'Show a team or group of contributors with avatar stacking.',
      example:
`<div class="p-4 border rounded-lg dark:border-gray-700">
  <h3 class="font-medium mb-2">Project Team</h3>
  <div class="flex items-center justify-between">
    <AvatarGroup max={5} total={8}>
      <Avatar bordered={true}>
        <img src="https://i.pravatar.cc/300?img=1" alt="Team Member 1" />
      </Avatar>
      <Avatar bordered={true}>
        <img src="https://i.pravatar.cc/300?img=2" alt="Team Member 2" />
      </Avatar>
      <Avatar bordered={true}>
        <img src="https://i.pravatar.cc/300?img=3" alt="Team Member 3" />
      </Avatar>
      <Avatar bordered={true}>
        <img src="https://i.pravatar.cc/300?img=4" alt="Team Member 4" />
      </Avatar>
      <Avatar bordered={true}>
        <img src="https://i.pravatar.cc/300?img=5" alt="Team Member 5" />
      </Avatar>
    </AvatarGroup>
    <button class="text-blue-500 text-sm">View All</button>
  </div>
</div>`
    },
    {
      title: 'User status with avatar',
      description: 'Display user status information along with their avatar.',
      example:
`<div class="flex items-center space-x-3 p-3 border rounded-lg dark:border-gray-700">
  <Avatar status="online" statusPosition="bottom-right">
    <img src="https://i.pravatar.cc/300?img=8" alt="Lisa Smith" />
  </Avatar>
  <div>
    <h4 class="font-medium">Lisa Smith</h4>
    <div class="flex items-center">
      <div class="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
      <span class="text-sm text-gray-600 dark:text-gray-400">Online</span>
    </div>
  </div>
</div>`
    }
  ];

  return (
    <UsageTemplate
      bestPractices={bestPractices}
      accessibilityGuidelines={accessibilityGuidelines}
      commonPatterns={commonPatterns}
    />
  );
});
