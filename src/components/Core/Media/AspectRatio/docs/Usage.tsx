import { component$ } from "@builder.io/qwik";
import { UsageTemplate } from "~/components/Docs/templates";
import type {
  UsageGuideline,
  BestPractice,
  AccessibilityTip,
} from "~/components/Docs/templates";

export default component$(() => {
  const guidelines: UsageGuideline[] = [
    {
      title: "Choose appropriate preset ratios",
      description:
        "Use semantically meaningful ratios for different content types",
      type: "do",
      code: `// Video content
<AspectRatio ratio="video">
  <iframe src="https://youtube.com/embed/..." />
</AspectRatio>

// Profile pictures
<AspectRatio ratio="square">
  <img src="/profile.jpg" alt="User profile" />
</AspectRatio>

// Photography
<AspectRatio ratio="photo">
  <img src="/landscape.jpg" alt="Mountain landscape" />
</AspectRatio>`,
    },
    {
      title: "Use custom ratios for specific designs",
      description: "Calculate precise ratios for your design requirements",
      type: "do",
      code: `// Banner with 5:1 ratio
<AspectRatio customRatio={5}>
  <div class="bg-gradient-to-r from-blue-500 to-purple-600">
    <h1>Hero Banner</h1>
  </div>
</AspectRatio>

// Card with 1.5:1 ratio
<AspectRatio customRatio={1.5}>
  <CardContent />
</AspectRatio>`,
    },
    {
      title: "Handle content overflow appropriately",
      description:
        "Choose overflow modes based on content type and design intent",
      type: "do",
      code: `// Images that should fill the space
<AspectRatio ratio="square" overflow="cover">
  <img src="/photo.jpg" alt="Profile" />
</AspectRatio>

// Content that must be fully visible
<AspectRatio ratio="video" overflow="contain" bgColor="#000">
  <video src="/video.mp4" />
</AspectRatio>`,
    },
    {
      title: "Set size constraints for responsive design",
      description: "Prevent extreme sizes on different screen sizes",
      type: "do",
      code: `// Prevent cards from becoming too large on wide screens
<AspectRatio 
  ratio="square" 
  maxWidth="400px"
  class="mx-auto"
>
  <CardContent />
</AspectRatio>

// Ensure minimum size on small screens
<AspectRatio 
  ratio="video" 
  minWidth="300px"
  maxWidth="800px"
>
  <VideoPlayer />
</AspectRatio>`,
    },
    {
      title: "Use background colors for content gaps",
      description:
        "Provide appropriate background colors when content doesn't fill the space",
      type: "do",
      code: `// Dark background for video content
<AspectRatio 
  ratio="video" 
  overflow="contain" 
  bgColor="#000000"
>
  <video src="/video.mp4" />
</AspectRatio>

// Brand color for loading states
<AspectRatio 
  ratio="square" 
  bgColor="#f3f4f6"
>
  {isLoading ? <Spinner /> : <Content />}
</AspectRatio>`,
    },
    {
      title: "Don't use fixed pixel ratios",
      description: "Avoid calculating ratios from fixed pixel dimensions",
      type: "dont",
      code: `// Wrong - based on specific pixel sizes
<AspectRatio customRatio={800/600} />

// Better - based on design intent
<AspectRatio ratio="landscape" />
<AspectRatio customRatio={4/3} />`,
    },
    {
      title: "Don't ignore content centering",
      description:
        "Consider whether content should be centered within the aspect ratio",
      type: "dont",
      code: `// May not center content as expected
<AspectRatio centered={false}>
  <div class="small-content">Only uses top-left</div>
</AspectRatio>

// Better - explicitly center when needed
<AspectRatio centered={true}>
  <div class="small-content">Properly centered</div>
</AspectRatio>`,
    },
    {
      title: "Don't use for naturally flowing content",
      description: "Don't constrain content that should grow naturally",
      type: "dont",
      code: `// Wrong - text should flow naturally
<AspectRatio ratio="square">
  <article>
    <h2>Long Article Title</h2>
    <p>This article has varying amounts of text...</p>
  </article>
</AspectRatio>

// Better - let content flow
<article class="prose">
  <h2>Long Article Title</h2>
  <p>This article has varying amounts of text...</p>
</article>`,
    },
  ];

  const bestPractices: BestPractice[] = [
    {
      title: "Consistent aspect ratios in layouts",
      description:
        "Use the same aspect ratio for similar content types throughout your application to create visual consistency and predictable layouts.",
    },
    {
      title: "Performance with media content",
      description:
        "When using AspectRatio with images or videos, ensure media is optimized and consider lazy loading for off-screen content.",
    },
    {
      title: "Responsive breakpoint considerations",
      description:
        "Consider how aspect ratios work at different screen sizes. Sometimes different ratios work better on mobile vs desktop.",
    },
    {
      title: "Content prioritization",
      description:
        "When using 'cover' overflow mode, ensure the most important part of your content remains visible after cropping.",
    },
    {
      title: "Loading states and placeholders",
      description:
        "Use AspectRatio to maintain layout stability while content loads, preventing layout shifts and improving perceived performance.",
    },
  ];

  const accessibilityTips: AccessibilityTip[] = [
    {
      title: "Meaningful content within containers",
      description:
        "Ensure that content within aspect ratio containers remains accessible and provides appropriate alternative text or descriptions.",
    },
    {
      title: "Focus management for interactive content",
      description:
        "When aspect ratio containers include interactive elements, ensure proper focus management and keyboard navigation.",
    },
    {
      title: "Screen reader considerations",
      description:
        "Aspect ratio containers are purely visual - ensure they don't interfere with screen reader navigation or content understanding.",
    },
    {
      title: "Content visibility and contrast",
      description:
        "Ensure that cropped or contained content maintains sufficient contrast ratios and important information remains visible.",
    },
  ];

  const performanceTips = [
    "Use CSS transforms instead of changing aspect ratios dynamically for better performance",
    "Consider the impact of aspect ratio constraints on layout calculation and reflow",
    "Optimize images and media within aspect ratio containers for the expected display size",
    "Use appropriate lazy loading for aspect ratio containers that are off-screen",
    "Consider using CSS aspect-ratio property for simple cases where browser support allows",
    "Avoid excessive nesting of aspect ratio containers as it can impact rendering performance",
    "Use will-change: transform for aspect ratio containers that will be animated",
    "Consider using contain: layout style for better layout performance with multiple containers",
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
      performanceTips={performanceTips}
    >
      <p>
        The AspectRatio component is a powerful tool for creating consistent,
        responsive layouts that maintain their proportions across different
        screen sizes. It's particularly valuable for media content, card
        layouts, and any design that requires specific width-to-height
        relationships.
      </p>
      <p class="mt-3">
        This guide covers best practices for choosing appropriate ratios,
        handling content overflow, and maintaining accessibility while using
        aspect ratio constraints. Following these guidelines will ensure your
        layouts remain visually consistent and functionally robust across all
        devices.
      </p>
    </UsageTemplate>
  );
});
