import { component$ } from '@builder.io/qwik';
import { UsageTemplate, type UsageGuideline, type BestPractice, type AccessibilityTip } from '~/components/Docs/templates';

/**
 * Container component usage documentation using the standard template
 */
export default component$(() => {
  const guidelines: UsageGuideline[] = [
    {
      title: "Use appropriate size for content type",
      description: "Choose a container size that works well for your content type and reading experience.",
      code: `// For text content and articles
<Container maxWidth="md">
  <article>Article content goes here...</article>
</Container>

// For dashboards and data-rich interfaces
<Container maxWidth="2xl">
  <div class="grid grid-cols-3 gap-4">Dashboard panels...</div>
</Container>`,
      type: "do"
    },
    {
      title: "Apply consistent padding",
      description: "Use consistent padding settings throughout your application for visual harmony.",
      code: `// For main content sections
<Container paddingX="md" paddingY="lg">
  <main>Main content...</main>
</Container>

// For nested sections
<Container paddingX="sm" paddingY="sm">
  <section>Subsection content...</section>
</Container>`,
      type: "do"
    },
    {
      title: "Use fluid containers for full-width sections",
      description: "For sections that should span the full width while maintaining padding, use fluid containers.",
      code: `// Hero section with edge-to-edge background
<Container maxWidth="fluid" paddingX="lg" paddingY="xl">
  <div class="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-8">
    <h1 class="text-3xl text-white">Welcome to our platform</h1>
  </div>
</Container>`,
      type: "do"
    },
    {
      title: "Don't apply excessive nesting",
      description: "Avoid nesting too many containers, which can lead to unnecessary padding and complexity.",
      code: `// Don't do this:
<Container maxWidth="lg">
  <Container maxWidth="md">
    <Container maxWidth="sm">
      Content goes here...
    </Container>
  </Container>
</Container>

// Better approach - use one container:
<Container maxWidth="sm">
  Content goes here...
</Container>`,
      type: "dont"
    },
    {
      title: "Don't use containers for small UI components",
      description: "Small UI components don't need Container wrappers, which add unnecessary structure.",
      code: `// Don't do this:
<Container maxWidth="xs">
  <button>Click me</button>
</Container>

// Better approach:
<button class="mx-auto block">Click me</button>`,
      type: "dont"
    },
    {
      title: "Don't override Container system with custom widths",
      description: "Avoid using custom width styles that conflict with the Container's width system.",
      code: `// Don't do this:
<Container maxWidth="md" class="w-[800px]">
  Content goes here...
</Container>

// Better approach - use the appropriate size:
<Container maxWidth="lg">
  Content goes here...
</Container>`,
      type: "dont"
    }
  ];

  const bestPractices: BestPractice[] = [
    {
      title: "Maintain consistent container sizes",
      description: "Use the same container sizes for similar content types throughout your application for visual consistency."
    },
    {
      title: "Consider reading width",
      description: "For text-heavy content, use narrower containers (md or smaller) to improve readability. Long lines of text are harder to read."
    },
    {
      title: "Use horizontal centering for focused content",
      description: "Keep the centered prop true (default) for main content sections to create a balanced, focused layout."
    },
    {
      title: "Apply appropriate padding for breathing room",
      description: "Use paddingX for consistent horizontal spacing, especially for content near the edges of the container."
    },
    {
      title: "Match container size to content purpose",
      description: "Use smaller containers for focused content and larger ones for rich, multi-column layouts."
    },
    {
      title: "Use fixedWidth strategically",
      description: "Only use fixedWidth when the content absolutely needs consistent width across all screen sizes."
    }
  ];

  const accessibilityTips: AccessibilityTip[] = [
    {
      title: "Use semantic landmarks when appropriate",
      description: "When a Container represents a significant page section, use role=\"region\" with an appropriate aria-label."
    },
    {
      title: "Ensure sufficient spacing for touch targets",
      description: "For touch interfaces, ensure that interactive elements within containers have sufficient spacing (at least 44px)."
    },
    {
      title: "Maintain reading width for users with cognitive impairments",
      description: "Using appropriately sized containers helps users with cognitive impairments by limiting line length for better comprehension."
    },
    {
      title: "Test with screen magnification",
      description: "Verify that container layouts work well when users significantly magnify the screen (up to 200%)."
    },
    {
      title: "Consider content reflow",
      description: "Ensure content inside containers reflows properly when users zoom in, without requiring horizontal scrolling."
    },
    {
      title: "Maintain logical content structure",
      description: "Container layout should support a logical reading order that makes sense when navigating with a keyboard or screen reader."
    }
  ];

  const performanceTips = [
    "The Container component has minimal performance impact with no JavaScript overhead",
    "For scrolling lists with many containers, consider virtualizing the content",
    "Avoid unnecessary nesting of containers to reduce DOM complexity",
    "Use responsive container behavior (default) to reduce CSS complexity on mobile devices",
    "For repeated containers with the same props, consider creating a wrapper component"
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
      performanceTips={performanceTips}
    >
      <p>
        The Container component is a fundamental layout building block that helps
        maintain consistent content width and spacing throughout your application.
        When used effectively, it creates a visual rhythm and improves readability
        across different screen sizes.
      </p>
      <p class="mt-2">
        Containers are most effective when they're used consistently and with purpose.
        By selecting the appropriate size, padding, and alignment options, you can
        create layouts that guide the user's attention and organize content effectively.
      </p>
    </UsageTemplate>
  );
});
