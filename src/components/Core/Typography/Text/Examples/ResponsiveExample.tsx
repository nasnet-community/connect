import { component$ } from "@builder.io/qwik";
import { Text } from "../Text";
import { Heading } from "../../Heading";
import { Link } from "../../Link";
import { InlineCode } from "../../CodeDisplay";

/**
 * Enhanced Responsive Example - Demonstrates all new Typography features
 */
export const ResponsiveExample = component$(() => {
  return (
    <div class="space-y-12 p-6 bg-surface-light-DEFAULT dark:bg-surface-dark-DEFAULT rounded-lg">
      {/* Header Section */}
      <div class="space-y-4">
        <Heading 
          level={1} 
          fontFamily="display"
          responsiveSize={{
            base: "fluid-lg",
            md: "fluid-xl", 
            lg: "fluid-2xl"
          }}
          color="primary"
          highContrast={false}
        >
          Enhanced Typography System
        </Heading>
        
        <Text 
          variant="paragraph"
          color="secondary"
          responsiveSize={{
            base: "sm",
            md: "base", 
            lg: "lg"
          }}
        >
          Explore the comprehensive enhancements to our typography components, featuring fluid responsive sizing, 
          advanced color systems, accessibility improvements, and modern interaction patterns.
        </Text>
      </div>

      {/* Fluid Typography Demo */}
      <section class="space-y-6">
        <Heading level={2} color="accent">Fluid Typography</Heading>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4 p-4 bg-surface-light-secondary dark:bg-surface-dark-secondary rounded-md">
            <Text variant="label" weight="semibold" color="info">Responsive Scaling</Text>
            <Text 
              variant="body"
              size="fluid-base"
              color="primary"
            >
              This text uses fluid-base sizing that scales smoothly between viewport sizes.
            </Text>
            <Text 
              variant="body"
              size="fluid-lg"
              color="accent"
            >
              This larger text demonstrates fluid-lg scaling for enhanced readability.
            </Text>
          </div>
          
          <div class="space-y-4 p-4 bg-surface-light-tertiary dark:bg-surface-dark-tertiary rounded-md">
            <Text variant="label" weight="semibold" color="warning">Advanced Breakpoints</Text>
            <Text 
              responsiveSize={{
                "2xs": "xs",
                "mobile": "sm", 
                "tablet": "base",
                "desktop": "lg"
              }}
              color="primary"
            >
              Custom breakpoint targeting: 2xs → mobile → tablet → desktop
            </Text>
          </div>
        </div>
      </section>

      {/* Enhanced Color System */}
      <section class="space-y-6">
        <Heading level={2} color="accent">Enhanced Color System</Heading>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="space-y-3 p-4 bg-surface-light-secondary dark:bg-surface-dark-secondary rounded-md">
            <Text variant="label" weight="semibold" color="primary-light">Surface Colors</Text>
            <Text color="surface-light" theme="light">Surface Light Text</Text>
            <Text color="surface-dark" theme="dark">Surface Dark Text</Text>
            <Text color="surface-dim" theme="dim">Surface Dim Text</Text>
          </div>
          
          <div class="space-y-3 p-4 bg-surface-light-tertiary dark:bg-surface-dark-tertiary rounded-md">
            <Text variant="label" weight="semibold" color="secondary-light">Semantic Colors</Text>
            <Text color="success">Success message text</Text>
            <Text color="warning">Warning notification</Text>
            <Text color="error">Error state indicator</Text>
            <Text color="info">Information display</Text>
          </div>
          
          <div class="space-y-3 p-4 bg-primary-50 dark:bg-primary-950 rounded-md">
            <Text variant="label" weight="semibold" color="contrast-high">Contrast Variants</Text>
            <Text color="contrast-medium">Medium contrast text</Text>
            <Text color="contrast-high">High contrast text</Text>
            <Text color="primary-light">Primary light variant</Text>
            <Text color="primary-dark">Primary dark variant</Text>
          </div>
        </div>
      </section>

      {/* Accessibility Features */}
      <section class="space-y-6">
        <Heading level={2} color="accent">Accessibility Enhancements</Heading>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4 p-4 bg-surface-light-secondary dark:bg-surface-dark-secondary rounded-md">
            <Text variant="label" weight="semibold" color="info">High Contrast Mode</Text>
            <Text 
              variant="body"
              highContrast={true}
              color="primary"
            >
              This text automatically adjusts for high contrast accessibility needs.
            </Text>
            <InlineCode highContrast={true}>console.log("accessible code")</InlineCode>
          </div>
          
          <div class="space-y-4 p-4 bg-surface-light-tertiary dark:bg-surface-dark-tertiary rounded-md">
            <Text variant="label" weight="semibold" color="success">Motion Preferences</Text>
            <Text 
              variant="body"
              reduceMotion={true}
              color="primary"
            >
              Respects user's reduced motion preferences for smoother accessibility.
            </Text>
            <Link 
              href="#demo"
              reduceMotion={true}
              underline="animate"
              color="accent"
            >
              Motion-safe animated link
            </Link>
          </div>
        </div>
      </section>

      {/* Touch Optimization */}
      <section class="space-y-6">
        <Heading level={2} color="accent">Touch & Mobile Optimization</Heading>
        
        <div class="space-y-4 p-4 bg-surface-light-secondary dark:bg-surface-dark-secondary rounded-md">
          <Text variant="label" weight="semibold" color="warning">Touch-Optimized Elements</Text>
          
          <div class="flex flex-wrap gap-4">
            <Link 
              href="#touch"
              variant="button"
              touchOptimized={true}
              rippleEffect={true}
              color="primary"
            >
              Touch Button
            </Link>
            
            <Text 
              variant="body"
              touchOptimized={true}
              color="accent"
              onClick$={() => console.log("Touch interaction")}
            >
              Touch-enabled text
            </Text>
            
            <InlineCode 
              touchOptimized={true}
              size="base"
            >
              touch-code
            </InlineCode>
          </div>
        </div>
      </section>

      {/* RTL Support */}
      <section class="space-y-6">
        <Heading level={2} color="accent">RTL & Internationalization</Heading>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4 p-4 bg-surface-light-secondary dark:bg-surface-dark-secondary rounded-md">
            <Text variant="label" weight="semibold" color="info">RTL Text Direction</Text>
            <Text 
              direction="rtl"
              align="start"
              fontFamily="sans-rtl"
              color="primary"
            >
              هذا نص تجريبي باللغة العربية يدعم الاتجاه من اليمين إلى اليسار
            </Text>
          </div>
          
          <div class="space-y-4 p-4 bg-surface-light-tertiary dark:bg-surface-dark-tertiary rounded-md">
            <Text variant="label" weight="semibold" color="success">Logical Properties</Text>
            <Text 
              align="start"
              color="primary"
            >
              Text aligned to "start" (left in LTR, right in RTL)
            </Text>
            <Text 
              align="end"
              color="secondary"
            >
              Text aligned to "end" (right in LTR, left in RTL)
            </Text>
          </div>
        </div>
      </section>

      {/* Advanced Features Demo */}
      <section class="space-y-6">
        <Heading level={2} color="accent">Advanced Features</Heading>
        
        <div class="space-y-6">
          <div class="p-4 bg-surface-light-secondary dark:bg-surface-dark-secondary rounded-md">
            <Text variant="label" weight="semibold" color="info" class="mb-4">Container Responsive</Text>
            <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 p-4 resize overflow-auto">
              <Text 
                containerResponsive={true}
                responsiveSize={{
                  base: "sm",
                  md: "lg"
                }}
                color="primary"
              >
                This text responds to its container size, not just viewport size. Try resizing this container!
              </Text>
            </div>
          </div>
          
          <div class="p-4 bg-surface-light-tertiary dark:bg-surface-dark-tertiary rounded-md">
            <Text variant="label" weight="semibold" color="warning" class="mb-4">Print Optimization</Text>
            <Text 
              printOptimized={true}
              color="primary"
            >
              This text is optimized for print media with appropriate colors and sizing.
            </Text>
            <Text variant="caption" color="tertiary" class="mt-2">
              Use your browser's print preview to see the print-optimized styling.
            </Text>
          </div>
        </div>
      </section>

      {/* Responsive Hero Text */}
      <div class="space-y-4">
        <Text variant="label" weight="semibold" color="accent">Responsive Hero Text</Text>
        <div class="border-l-4 border-blue-500 pl-4">
          <Text 
            variant="body" 
            weight="bold"
            responsiveSize={{
              base: "lg",
              sm: "xl", 
              md: "2xl",
              lg: "2xl",
              xl: "2xl"
            }}
          >
            Welcome to Our Platform
          </Text>
          <Text 
            variant="body" 
            color="secondary"
            responsiveSize={{
              base: "sm",
              sm: "base",
              md: "lg"
            }}
            class="mt-2"
          >
            Experience the future of web development with our responsive design system
          </Text>
        </div>
      </div>

      {/* Progressive Text Sizing */}
      <div class="space-y-4">
        <Text variant="label" weight="semibold" color="accent">Progressive Text Scaling</Text>
        <div class="space-y-4 border border-gray-200 dark:border-gray-700 rounded p-4">
          <Text 
            variant="paragraph"
            responsiveSize={{
              base: "xs",
              sm: "sm",
              md: "base",
              lg: "lg",
              xl: "xl"
            }}
          >
            This text grows progressively: xs → sm → base → lg → xl
          </Text>
          
          <Text 
            variant="paragraph"
            responsiveSize={{
              base: "xl",
              sm: "lg",
              md: "base",
              lg: "sm",
              xl: "xs"
            }}
          >
            This text shrinks progressively: xl → lg → base → sm → xs
          </Text>
        </div>
      </div>

      {/* Responsive Content Layout */}
      <div class="space-y-4">
        <Text variant="label" weight="semibold" color="accent">Responsive Content Layout</Text>
        <div class="border-l-4 border-green-500 pl-4">
          <Text 
            variant="body"
            weight="semibold"
            responsiveSize={{
              base: "base",
              md: "lg"
            }}
          >
            Article Title That Adapts to Screen Size
          </Text>
          
          <Text 
            variant="paragraph"
            responsiveSize={{
              base: "sm",
              md: "base"
            }}
            class="mt-3"
          >
            This paragraph demonstrates how body text can be optimized for different devices. 
            On mobile devices, it uses smaller text to fit more content, while on larger 
            screens it increases in size for better readability.
          </Text>
          
          <Text 
            variant="caption"
            responsiveSize={{
              base: "xs",
              md: "sm"
            }}
            class="mt-2"
          >
            Published on March 15, 2024 • 5 min read
          </Text>
        </div>
      </div>

      {/* Complex Responsive Navigation */}
      <div class="space-y-4">
        <Text variant="label" weight="semibold" color="accent">Responsive Navigation Menu</Text>
        <div class="flex flex-wrap gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded">
          <Text 
            variant="body"
            weight="medium"
            responsiveSize={{
              base: "xs",
              sm: "sm",
              lg: "base"
            }}
            class="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
          >
            Home
          </Text>
          <Text 
            variant="body"
            weight="medium"
            responsiveSize={{
              base: "xs",
              sm: "sm", 
              lg: "base"
            }}
            class="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
          >
            Products
          </Text>
          <Text 
            variant="body"
            weight="medium"
            responsiveSize={{
              base: "xs",
              sm: "sm",
              lg: "base"
            }}
            class="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
          >
            About
          </Text>
          <Text 
            variant="body"
            weight="medium"
            responsiveSize={{
              base: "xs",
              sm: "sm",
              lg: "base"
            }}
            class="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
          >
            Contact
          </Text>
        </div>
      </div>

      {/* Mobile-First Approach */}
      <div class="space-y-4">
        <Text variant="label" weight="semibold" color="accent">Mobile-First Responsive Design</Text>
        <div class="border-l-4 border-purple-500 pl-4 space-y-3">
          <Text 
            variant="body"
            weight="semibold"
            responsiveSize={{
              base: "sm",     // Start small for mobile
              sm: "base",     // Slightly larger on small tablets
              md: "lg",       // Larger on tablets
              lg: "xl"        // Largest on desktop
            }}
          >
            Mobile-First Header
          </Text>
          
          <Text 
            variant="paragraph"
            responsiveSize={{
              base: "xs",     // Very small on mobile for space efficiency
              sm: "sm",       // Normal small on small screens
              md: "base"      // Standard size on larger screens
            }}
          >
            This demonstrates a mobile-first approach where we start with the smallest size 
            and progressively enhance for larger screens. This ensures optimal readability 
            across all devices while maintaining performance.
          </Text>
        </div>
      </div>

      {/* Breakpoint Visualization */}
      <div class="space-y-4">
        <Text variant="label" weight="semibold" color="accent">Current Breakpoint Indicator</Text>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <div class="p-3 bg-red-100 dark:bg-red-900 rounded sm:hidden">
            <Text variant="body" weight="semibold" size="xs">Base ({'<'} 640px)</Text>
          </div>
          <div class="p-3 bg-orange-100 dark:bg-orange-900 rounded hidden sm:block md:hidden">
            <Text variant="body" weight="semibold" size="sm">SM (640px+)</Text>
          </div>
          <div class="p-3 bg-yellow-100 dark:bg-yellow-900 rounded hidden md:block lg:hidden">
            <Text variant="body" weight="semibold" size="base">MD (768px+)</Text>
          </div>
          <div class="p-3 bg-green-100 dark:bg-green-900 rounded hidden lg:block xl:hidden">
            <Text variant="body" weight="semibold" size="lg">LG (1024px+)</Text>
          </div>
          <div class="p-3 bg-blue-100 dark:bg-blue-900 rounded hidden xl:block">
            <Text variant="body" weight="semibold" size="xl">XL (1280px+)</Text>
          </div>
        </div>
      </div>

      <div class="mt-8 p-4 bg-gray-100 dark:bg-gray-900 rounded">
        <Text size="sm" color="tertiary">
          <Text weight="semibold">📱 Responsive Design Tip:</Text> Use the responsiveSize prop to create 
          text that adapts to different screen sizes. Start with mobile-first sizing and progressively 
          enhance for larger screens to ensure optimal readability across all devices.
        </Text>
      </div>
    </div>
  );
});

export default ResponsiveExample;