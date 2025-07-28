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
      title: "Always provide meaningful alt text",
      description:
        "Alt text should describe the image content and context for screen readers",
      type: "do",
      code: `<Image 
  src="/profile.jpg" 
  alt="Sarah Johnson, Software Engineer at TechCorp" 
/>

<Image 
  src="/chart.png" 
  alt="Sales increased 25% from Q1 to Q2 2024" 
/>`,
    },
    {
      title: "Use appropriate placeholder types",
      description:
        "Choose placeholder types based on content and user experience needs",
      type: "do",
      code: `// For content images
<Image placeholder="skeleton" />

// For profile pictures with blur effect
<Image 
  placeholder="blur" 
  placeholderSrc="/profile-blur.jpg" 
/>

// For custom loading states
<Image 
  placeholder="custom"
  placeholderContent={<CustomLoader />}
/>`,
    },
    {
      title: "Implement responsive images properly",
      description:
        "Use srcset and sizes for optimal image delivery across devices",
      type: "do",
      code: `<Image
  src="/hero-800w.jpg"
  srcset="/hero-480w.jpg 480w, /hero-800w.jpg 800w, /hero-1200w.jpg 1200w"
  sizes="(max-width: 480px) 480px, (max-width: 800px) 800px, 1200px"
  alt="Hero banner showing our product features"
/>`,
    },
    {
      title: "Use priority loading for critical images",
      description:
        "Enable priority loading for above-the-fold images to improve LCP",
      type: "do",
      code: `// Hero image that's immediately visible
<Image
  src="/hero.jpg"
  alt="Welcome to our platform"
  priority={true}
  fetchPriority="high"
  loading="eager"
/>`,
    },
    {
      title: "Provide fallback images for user content",
      description:
        "Always have fallbacks for user-generated or external images",
      type: "do",
      code: `<Image
  src={user.profileImage}
  alt={\`\${user.name}'s profile picture\`}
  fallbackSrc="/default-avatar.png"
  fallbackAlt="Default user avatar"
  retryOnError={true}
/>`,
    },
    {
      title: "Don't use generic alt text",
      description:
        "Avoid vague or non-descriptive alt text that doesn't help users",
      type: "dont",
      code: `// Too generic
<Image src="/photo.jpg" alt="image" />
<Image src="/chart.png" alt="chart" />

// Better
<Image src="/photo.jpg" alt="Team celebrating project launch in office" />
<Image src="/chart.png" alt="Revenue growth chart showing 40% increase" />`,
    },
    {
      title: "Don't ignore loading performance",
      description:
        "Don't load all images eagerly or use inappropriate placeholder types",
      type: "dont",
      code: `// Loads all images immediately - poor performance
<Image loading="eager" />
<Image loading="eager" />
<Image loading="eager" />

// Better - let lazy loading work
<Image /> // defaults to lazy loading
<Image loading="lazy" />
<Image priority={true} /> // only for critical images`,
    },
    {
      title: "Don't skip error handling",
      description: "Always consider what happens when images fail to load",
      type: "dont",
      code: `// No fallback - broken image experience
<Image src={unreliableSource} alt="Product photo" />

// Better - graceful degradation
<Image 
  src={unreliableSource} 
  alt="Product photo"
  fallbackSrc="/placeholder-product.jpg"
  retryOnError={true}
  maxRetries={2}
/>`,
    },
  ];

  const bestPractices: BestPractice[] = [
    {
      title: "Optimize images before using",
      description:
        "Always optimize images for web use with appropriate compression, format selection (e.g., WebP), and multiple sizes for responsive delivery.",
    },
    {
      title: "Use appropriate aspect ratios",
      description:
        "Maintain consistent aspect ratios for similar content types (e.g., all product images use 1:1, all hero images use 16:9) to prevent layout shifts.",
    },
    {
      title: "Implement progressive enhancement",
      description:
        "Start with a basic image experience and enhance with features like lazy loading, responsive images, and advanced placeholders.",
    },
    {
      title: "Monitor loading performance",
      description:
        "Track Core Web Vitals (LCP, CLS) to ensure your image implementation provides good user experience and SEO performance.",
    },
    {
      title: "Handle different network conditions",
      description:
        "Consider users on slow connections by implementing appropriate retry logic, compression levels, and placeholder strategies.",
    },
  ];

  const accessibilityTips: AccessibilityTip[] = [
    {
      title: "Write descriptive alt text",
      description:
        'Alt text should convey the essential information or function of the image. For decorative images, use empty alt="" to hide from screen readers.',
    },
    {
      title: "Use proper image roles",
      description:
        "Use role='img' for complex images or figures, and provide additional context with aria-describedby when needed.",
    },
    {
      title: "Ensure keyboard accessibility",
      description:
        "If images are interactive (clickable), ensure they're keyboard accessible and have proper focus indicators.",
    },
    {
      title: "Consider color contrast",
      description:
        "For images with text overlays, ensure sufficient color contrast ratios. Provide alternative text formats when needed.",
    },
    {
      title: "Test with screen readers",
      description:
        "Regularly test your image implementations with screen readers to ensure the alt text provides meaningful context.",
    },
  ];

  const performanceTips = [
    "Use modern image formats like WebP or AVIF when supported, with JPEG/PNG fallbacks",
    "Implement proper image sizing to avoid downloading oversized images on mobile devices",
    "Use intersection observer-based lazy loading to reduce initial page load time",
    "Consider using blur-up technique with low-quality image placeholders for perceived performance",
    "Preload critical images that appear above the fold using priority loading",
    "Optimize image compression settings to balance quality and file size",
    "Use CDN or image optimization services for automatic format selection and sizing",
    "Monitor and optimize Cumulative Layout Shift (CLS) by specifying image dimensions",
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
      performanceTips={performanceTips}
    >
      <p>
        The Image component is designed to handle the complexities of modern
        image delivery while maintaining excellent user experience and
        performance. It provides intelligent defaults for common scenarios while
        offering extensive customization for specific needs.
      </p>
      <p class="mt-3">
        This guide covers best practices for implementing images in your
        application, with emphasis on performance optimization, accessibility
        compliance, and graceful error handling. Following these guidelines will
        ensure your images contribute positively to both user experience and
        technical metrics.
      </p>
    </UsageTemplate>
  );
});
