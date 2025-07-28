import { component$ } from "@builder.io/qwik";
import {
  HiSparklesOutline,
  HiDevicePhoneMobileOutline,
  HiBoltOutline,
  HiEyeOutline,
  HiPaintBrushOutline,
  HiCodeBracketOutline,
} from "@qwikest/icons/heroicons";
import { Card } from "../../../Card/Card";
import { Alert } from "../../Alert/Alert";
import { Toast } from "../../Toast/Toast";
import { ErrorMessage } from "../../ErrorMessage/ErrorMessage";
interface HeroSectionProps {}

export const HeroSection = component$<HeroSectionProps>(() => {
  const features = [
    {
      icon: HiDevicePhoneMobileOutline,
      title: "Mobile First",
      description: "Touch gestures, swipe interactions, and mobile-optimized layouts",
      color: "text-blue-600 bg-blue-50",
    },
    {
      icon: HiBoltOutline,
      title: "Performance",
      description: "Real-time monitoring with FPS tracking and memory usage metrics",
      color: "text-green-600 bg-green-50",
    },
    {
      icon: HiEyeOutline,
      title: "Accessibility",
      description: "WCAG compliance scanner with automated issue detection",
      color: "text-purple-600 bg-purple-50",
    },
    {
      icon: HiPaintBrushOutline,
      title: "Theme System",
      description: "Live theme editor with real-time color customization",
      color: "text-pink-600 bg-pink-50",
    },
    {
      icon: HiCodeBracketOutline,
      title: "Code Generator",
      description: "Generate implementation code based on current settings",
      color: "text-orange-600 bg-orange-50",
    },
  ];

  return (
    <div class="space-y-12">
      {/* Hero Header */}
      <div class="text-center">
        <div class="mb-6 flex justify-center">
          <div class="rounded-full bg-gradient-to-r from-[var(--showcase-primary)] to-[var(--showcase-accent)] p-3">
            <HiSparklesOutline class="h-12 w-12 text-white" />
          </div>
        </div>
        
        <h1 class="mb-4 text-4xl font-bold text-[var(--showcase-text)] lg:text-6xl">
          Enhanced Feedback Components
        </h1>
        
        <p class="mx-auto mb-8 max-w-3xl text-lg text-[var(--showcase-text)]/70 lg:text-xl">
          Discover our completely redesigned feedback component system with mobile optimizations,
          touch gestures, responsive design, and comprehensive accessibility features.
        </p>

        {/* Live Demo Preview */}
        <div class="mx-auto max-w-4xl">
          <Card class="overflow-hidden p-8">
            <h3 class="mb-6 text-xl font-semibold text-[var(--showcase-text)]">
              Live Component Preview
            </h3>
            
            <div class="space-y-4">
              <Alert 
                status="info" 
                variant="solid" 
                size="md"
                dismissible
                class="animate-fade-in"
              >
                <div class="flex items-center space-x-2">
                  <HiSparklesOutline class="h-4 w-4" />
                  <span>Welcome to the enhanced feedback components showcase!</span>
                </div>
              </Alert>

              <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <ErrorMessage
                  title="Form Validation"
                  message="This demonstrates responsive error messaging with mobile optimizations"
                  variant="solid"
                  dismissible
                />

                <div class="flex justify-center">
                  <Toast
                    id="hero-toast-example"
                    message="Interactive toast with swipe gestures"
                    status="success"
                    position="top-center"
                    duration={5000}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Features Grid */}
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={index} class="p-6 transition-transform hover:scale-105">
            <div class="mb-4">
              <div class={`inline-flex rounded-lg p-3 ${feature.color}`}>
                <feature.icon class="h-6 w-6" />
              </div>
            </div>
            
            <h3 class="mb-2 text-lg font-semibold text-[var(--showcase-text)]">
              {feature.title}
            </h3>
            
            <p class="text-sm text-[var(--showcase-text)]/70">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <Card class="p-8">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div class="text-center">
            <div class="mb-2 text-3xl font-bold text-[var(--showcase-primary)]">7</div>
            <div class="text-sm text-[var(--showcase-text)]/70">Components</div>
          </div>
          
          <div class="text-center">
            <div class="mb-2 text-3xl font-bold text-[var(--showcase-primary)]">15+</div>
            <div class="text-sm text-[var(--showcase-text)]/70">New Features</div>
          </div>
          
          <div class="text-center">
            <div class="mb-2 text-3xl font-bold text-[var(--showcase-primary)]">100%</div>
            <div class="text-sm text-[var(--showcase-text)]/70">Mobile Ready</div>
          </div>
          
          <div class="text-center">
            <div class="mb-2 text-3xl font-bold text-[var(--showcase-primary)]">WCAG</div>
            <div class="text-sm text-[var(--showcase-text)]/70">AA Compliant</div>
          </div>
        </div>
      </Card>

      {/* Getting Started */}
      <Card class="p-8">
        <h2 class="mb-4 text-2xl font-bold text-[var(--showcase-text)]">
          Getting Started
        </h2>
        
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <h3 class="mb-2 text-lg font-semibold text-[var(--showcase-text)]">
              Basic Usage
            </h3>
            <pre class="rounded bg-[var(--showcase-bg)] p-4 text-sm">
              <code>{`import { Alert, Toast, Dialog } from "~/components/Core/Feedback";

<Alert status="success" variant="solid">
  Success message here
</Alert>`}</code>
            </pre>
          </div>
          
          <div>
            <h3 class="mb-2 text-lg font-semibold text-[var(--showcase-text)]">
              Mobile Optimized
            </h3>
            <pre class="rounded bg-[var(--showcase-bg)] p-4 text-sm">
              <code>{`<Toast
  mobile
  swipeToClose
  position="bottom-center"
  message="Mobile-optimized toast"
/>`}</code>
            </pre>
          </div>
        </div>
      </Card>
    </div>
  );
});