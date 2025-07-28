import { component$ } from "@builder.io/qwik";
import { UsageTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const importExample = `import { 
  Skeleton, 
  SkeletonText, 
  SkeletonAvatar, 
  SkeletonCard 
} from '~/components/Core/DataDisplay';`;

  const basicExample = `// Basic text skeleton
<SkeletonText lines={3} />

// Avatar skeleton
<SkeletonAvatar size="lg" />

// Custom skeleton
<Skeleton width={200} height={100} variant="rounded" />

// Card skeleton
<SkeletonCard showMedia showActions />`;

  const responsiveExample = `// Mobile-optimized skeleton
<div class="space-y-4">
  {/* Avatar + text combination */}
  <div class="flex items-center gap-3">
    <SkeletonAvatar size="md" class="flex-shrink-0" />
    <div class="flex-1">
      <SkeletonText lines={2} fontSize="sm" />
    </div>
  </div>
  
  {/* Responsive card grid */}
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {[1, 2, 3].map((i) => (
      <SkeletonCard key={i} mediaHeight="mobile:150 tablet:200" />
    ))}
  </div>
</div>`;

  const themeExample = `// Dark mode aware skeleton
<Skeleton 
  variant="rectangular"
  animation="shimmer"
  class="bg-gray-200 dark:bg-gray-700"
  width="100%"
  height={48}
/>

// With custom theme colors
<SkeletonText 
  class="bg-primary-100 dark:bg-primary-900"
  lines={2}
/>`;

  const loadingExample = `// Real-world loading example
const UserProfile = component$(() => {
  const userData = useResource$(async () => {
    const response = await fetch('/api/user');
    return response.json();
  });

  return (
    <Resource
      value={userData}
      onPending={() => (
        <div class="space-y-4">
          <SkeletonAvatar size="xl" />
          <SkeletonText lines={3} />
        </div>
      )}
      onResolved={(user) => (
        <div class="space-y-4">
          <img src={user.avatar} alt={user.name} />
          <div>
            <h2>{user.name}</h2>
            <p>{user.bio}</p>
          </div>
        </div>
      )}
    />
  );
});`;

  const bestPractices = [
    {
      title: "Match Content Structure",
      description:
        "Ensure skeleton layouts closely match the actual content to prevent jarring transitions.",
    },
    {
      title: "Use Appropriate Animations",
      description:
        "Choose animations based on context - pulse for simple content, shimmer for premium feel.",
    },
    {
      title: "Consider Loading Time",
      description:
        "Only show skeletons for content that takes more than 300ms to load.",
    },
    {
      title: "Maintain Consistency",
      description:
        "Use the same skeleton styles throughout your application for a cohesive experience.",
    },
    {
      title: "Responsive Design",
      description:
        "Ensure skeletons adapt to different screen sizes just like your actual content.",
    },
    {
      title: "Accessible Loading States",
      description:
        "Include proper ARIA labels and roles for screen reader users.",
    },
  ];

  const accessibilityTips = [
    { title: "Add status role", description: "Add role='status' and aria-live='polite' to skeleton containers" },
    { title: "Provide aria-label", description: "Provide aria-label describing what content is loading" },
    { title: "Use aria-busy", description: "Use aria-busy='true' on parent containers during loading" },
    { title: "Ensure color contrast", description: "Ensure color contrast meets WCAG standards in both light and dark modes" },
    { title: "Alternative indicators", description: "Consider providing alternative text-based loading indicators for screen readers" },
  ];

  const performanceTips = [
    "Use CSS animations instead of JavaScript for better performance",
    "Lazy load skeleton components that aren't immediately visible",
    "Minimize the number of DOM elements in complex skeleton layouts",
    "Use skeleton components instead of spinners for better perceived performance",
    "Consider using skeleton screens during route transitions",
  ];

  return (
    <UsageTemplate
      installation={importExample}
      basicUsage={basicExample}
      guidelines={[
        {
          title: "Responsive Skeletons",
          code: responsiveExample,
          description:
            "Create skeleton layouts that adapt to mobile, tablet, and desktop screens.",
        },
        {
          title: "Theme Support",
          code: themeExample,
          description:
            "Skeletons that automatically adapt to light and dark themes.",
        },
        {
          title: "Loading States",
          code: loadingExample,
          description:
            "Real-world example using skeletons during data fetching.",
        },
      ]}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
      performanceTips={performanceTips}
    />
  );
});