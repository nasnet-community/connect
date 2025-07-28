import { component$, useSignal, $ } from "@builder.io/qwik";
import {
  HiBookOpenOutline,
  HiCheckCircleOutline,
  HiXCircleOutline,
  HiLightBulbOutline,
  HiCodeBracketOutline,
  HiEyeOutline,
} from "@qwikest/icons/heroicons";
import { Card } from "../../../Card/Card";
import { Alert } from "../../Alert/Alert";
import { Toast } from "../../Toast/Toast";
import { ErrorMessage } from "../../ErrorMessage/ErrorMessage";
interface BestPracticesSectionProps {}

export const BestPracticesSection = component$<BestPracticesSectionProps>(
  () => {
    const activeSection = useSignal<string>("usage");

    const getIcon = $((iconName: string, className?: string) => {
      switch (iconName) {
        case "book":
          return <HiBookOpenOutline class={className} />;
        case "eye":
          return <HiEyeOutline class={className} />;
        case "lightbulb":
          return <HiLightBulbOutline class={className} />;
        case "code":
          return <HiCodeBracketOutline class={className} />;
        default:
          return null;
      }
    });

    const practiceCategories = [
      {
        id: "usage",
        title: "Usage Guidelines",
        iconName: "book",
        description: "When and how to use each feedback component effectively",
        practices: [
          {
            title: "Alert Component",
            dos: [
              "Use for important system messages that require user attention",
              "Choose appropriate status colors (info, success, warning, error)",
              "Include clear, actionable titles and messages",
              "Make alerts dismissible when appropriate",
            ],
            donts: [
              "Don't use alerts for temporary notifications (use Toast instead)",
              "Avoid overly technical language in error messages",
              "Don't stack multiple alerts without considering user experience",
              "Avoid auto-dismissing critical error alerts",
            ],
            example: (
              <Alert
                status="success"
                title="Settings Saved"
                message="Your network configuration has been successfully updated."
                dismissible
              />
            ),
          },
          {
            title: "Toast Component",
            dos: [
              "Use for temporary, non-critical notifications",
              "Position appropriately for the user's context",
              "Set reasonable auto-dismiss durations (3-7 seconds)",
              "Enable swipe-to-dismiss on mobile devices",
            ],
            donts: [
              "Don't use toasts for critical errors that require user action",
              "Avoid blocking the user interface with toast positioning",
              "Don't make toast duration too short for users to read",
              "Avoid showing too many toasts simultaneously",
            ],
            example: (
              <Toast
                id="toast-example-1"
                message="File uploaded successfully"
                status="success"
                position="top-right"
                duration={4000}
              />
            ),
          },
          {
            title: "Error Message Component",
            dos: [
              "Use for form validation and input-specific errors",
              "Provide clear, helpful error descriptions",
              "Position errors close to the related input fields",
              "Use appropriate icons to enhance understanding",
            ],
            donts: [
              "Don't use generic error messages without context",
              "Avoid technical jargon that users won't understand",
              "Don't hide error messages behind interactions",
              "Avoid overwhelming users with multiple error messages",
            ],
            example: (
              <ErrorMessage
                title="Invalid Email"
                message="Please enter a valid email address (e.g., user@example.com)"
                variant="solid"
                dismissible
              />
            ),
          },
        ],
      },
      {
        id: "accessibility",
        title: "Accessibility Best Practices",
        iconName: "eye",
        description: "Ensuring components are usable by everyone",
        practices: [
          {
            title: "Color and Contrast",
            dos: [
              "Ensure text has at least 4.5:1 contrast ratio against backgrounds",
              "Use color alongside other indicators (icons, text)",
              "Test components in high contrast mode",
              "Provide theme variants for different accessibility needs",
            ],
            donts: [
              "Don't rely solely on color to convey information",
              "Avoid low contrast color combinations",
              "Don't ignore color blindness considerations",
              "Avoid using red and green as the only differentiators",
            ],
            example: (
              <div class="space-y-2">
                <Alert
                  status="error"
                  message="High contrast error message with icon"
                  variant="solid"
                />
                <Alert
                  status="success"
                  message="Clear success indication with proper contrast"
                  variant="solid"
                />
              </div>
            ),
          },
          {
            title: "Keyboard Navigation",
            dos: [
              "Ensure all interactive elements are keyboard accessible",
              "Provide visible focus indicators",
              "Support standard keyboard shortcuts (Escape, Tab, Enter)",
              "Implement proper focus management in modals",
            ],
            donts: [
              "Don't trap focus without providing escape routes",
              "Avoid removing focus indicators without alternatives",
              "Don't ignore keyboard-only users",
              "Avoid complex keyboard interaction patterns",
            ],
            example: (
              <Alert
                status="info"
                message="This alert can be dismissed with the Escape key"
                dismissible
                class="focus-within:ring-2 focus-within:ring-blue-500"
              />
            ),
          },
          {
            title: "Screen Reader Support",
            dos: [
              "Use appropriate ARIA labels and roles",
              "Provide meaningful text alternatives",
              "Announce dynamic content changes",
              "Structure content logically with proper headings",
            ],
            donts: [
              "Don't rely on visual-only indicators",
              "Avoid missing or incorrect ARIA attributes",
              "Don't ignore screen reader testing",
              "Avoid complex interactive patterns without proper ARIA",
            ],
            example: (
              <ErrorMessage
                message="Screen readers will announce this error appropriately"
                variant="solid"
                aria-live="polite"
              />
            ),
          },
        ],
      },
      {
        id: "mobile",
        title: "Mobile Optimization",
        iconName: "lightbulb",
        description: "Best practices for mobile and touch interfaces",
        practices: [
          {
            title: "Touch Targets",
            dos: [
              "Make interactive elements at least 44×44px",
              "Provide adequate spacing between touch targets",
              "Use visual feedback for touch interactions",
              "Consider thumb-friendly positioning",
            ],
            donts: [
              "Don't make touch targets too small",
              "Avoid placing important actions at screen edges",
              "Don't ignore touch feedback and states",
              "Avoid clustering small interactive elements",
            ],
            example: (
              <Alert
                status="warning"
                message="Notice the large, touch-friendly dismiss button"
                dismissible
                class="touch-target-example"
              />
            ),
          },
          {
            title: "Responsive Design",
            dos: [
              "Use fluid layouts that adapt to screen sizes",
              "Test on actual mobile devices, not just emulators",
              "Consider different orientations",
              "Optimize for one-handed use",
            ],
            donts: [
              "Don't assume desktop interaction patterns work on mobile",
              "Avoid fixed layouts that don't scale",
              "Don't ignore landscape orientation",
              "Avoid requiring two-handed interactions",
            ],
            example: (
              <div class="space-y-2">
                <Toast
                  id="responsive-toast-demo"
                  message="This toast adapts to mobile screen sizes"
                  status="info"
                  position="bottom-center"
                />
              </div>
            ),
          },
        ],
      },
      {
        id: "performance",
        title: "Performance Considerations",
        iconName: "code",
        description: "Optimizing component performance and user experience",
        practices: [
          {
            title: "Animation and Transitions",
            dos: [
              "Use CSS transforms for smooth animations",
              "Implement hardware acceleration with transform3d",
              "Keep animations under 300ms for micro-interactions",
              "Provide reduced motion alternatives",
            ],
            donts: [
              "Don't animate layout properties (width, height, top, left)",
              "Avoid long or complex animation chains",
              "Don't ignore user motion preferences",
              "Avoid blocking animations during critical interactions",
            ],
            example: (
              <Alert
                status="info"
                message="This alert uses optimized fade-in animation"
                dismissible
                class="animate-fade-in"
              />
            ),
          },
          {
            title: "Component Lifecycle",
            dos: [
              "Clean up event listeners and timers",
              "Use lazy loading for non-critical components",
              "Implement proper error boundaries",
              "Optimize re-rendering with proper dependencies",
            ],
            donts: [
              "Don't create memory leaks with uncleaned resources",
              "Avoid loading all components upfront",
              "Don't ignore error states",
              "Avoid unnecessary re-renders",
            ],
            example: (
              <Toast
                id="lifecycle-toast-demo"
                message="This toast cleans up its timer when dismissed"
                status="success"
                duration={3000}
                onDismiss$={() => console.log("Toast cleaned up properly")}
              />
            ),
          },
        ],
      },
    ];

    const PracticeItem = component$<{
      title: string;
      dos: string[];
      donts: string[];
      example: any;
    }>(({ title, dos, donts, example }) => (
      <Card class="p-6">
        <h4 class="mb-4 text-lg font-semibold text-[var(--showcase-text)]">
          {title}
        </h4>

        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <div class="mb-3 flex items-center space-x-2">
              <HiCheckCircleOutline class="h-5 w-5 text-green-600" />
              <h5 class="font-medium text-green-700">Do's</h5>
            </div>
            <ul class="space-y-2">
              {dos.map((item, index) => (
                <li key={index} class="flex items-start space-x-2 text-sm">
                  <span class="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                  <span class="text-[var(--showcase-text)]/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div class="mb-3 flex items-center space-x-2">
              <HiXCircleOutline class="h-5 w-5 text-red-600" />
              <h5 class="font-medium text-red-700">Don'ts</h5>
            </div>
            <ul class="space-y-2">
              {donts.map((item, index) => (
                <li key={index} class="flex items-start space-x-2 text-sm">
                  <span class="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 flex-shrink-0" />
                  <span class="text-[var(--showcase-text)]/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div class="mt-6 pt-6 border-t border-[var(--showcase-border)]">
          <h6 class="mb-3 text-sm font-medium text-[var(--showcase-text)]">
            Example Implementation
          </h6>
          <div class="rounded border border-[var(--showcase-border)] bg-[var(--showcase-bg)] p-4">
            {example}
          </div>
        </div>
      </Card>
    ));

    return (
      <div class="space-y-8">
        {/* Header */}
        <div class="text-center">
          <h2 class="mb-4 text-3xl font-bold text-[var(--showcase-text)]">
            Best Practices & Guidelines
          </h2>
          <p class="mx-auto max-w-2xl text-[var(--showcase-text)]/70">
            Comprehensive guidelines for implementing feedback components effectively,
            accessibly, and with optimal user experience across all devices.
          </p>
        </div>

        {/* Navigation */}
        <Card class="p-4">
          <div class="flex flex-wrap gap-2">
            {practiceCategories.map((category) => (
              <button
                key={category.id}
                onClick$={() => activeSection.value = category.id}
                class={{
                  "flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium transition-all": true,
                  "bg-[var(--showcase-primary)] text-white": activeSection.value === category.id,
                  "bg-[var(--showcase-surface)] text-[var(--showcase-text)] hover:bg-[var(--showcase-surface)]": activeSection.value !== category.id,
                }}
              >
                {getIcon(category.iconName, "h-4 w-4")}
                <span>{category.title}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Active Section Content */}
        {practiceCategories.map((category) => (
          activeSection.value === category.id && (
            <div key={category.id} class="space-y-6">
              <Card class="p-6">
                <div class="flex items-start space-x-4">
                  <div class="rounded-lg bg-[var(--showcase-primary)]/10 p-3">
                    {getIcon(category.iconName, "h-6 w-6 text-[var(--showcase-primary)]")}
                  </div>
                  <div>
                    <h3 class="text-xl font-semibold text-[var(--showcase-text)]">
                      {category.title}
                    </h3>
                    <p class="mt-1 text-[var(--showcase-text)]/70">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Card>

              <div class="space-y-6">
                {category.practices.map((practice, index) => (
                  <PracticeItem
                    key={index}
                    title={practice.title}
                    dos={practice.dos}
                    donts={practice.donts}
                    example={practice.example}
                  />
                ))}
              </div>
            </div>
          )
        ))}

        {/* Quick Reference */}
        <Card class="p-6">
          <h3 class="mb-4 text-xl font-semibold text-[var(--showcase-text)]">
            Quick Reference Checklist
          </h3>
          
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h4 class="mb-3 font-medium text-[var(--showcase-text)]">
                Before Implementation
              </h4>
              <div class="space-y-2 text-sm">
                <label class="flex items-center space-x-2">
                  <input type="checkbox" class="rounded" />
                  <span>Choose appropriate component type</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input type="checkbox" class="rounded" />
                  <span>Consider mobile and tablet layouts</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input type="checkbox" class="rounded" />
                  <span>Plan for accessibility requirements</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input type="checkbox" class="rounded" />
                  <span>Review content and messaging</span>
                </label>
              </div>
            </div>

            <div>
              <h4 class="mb-3 font-medium text-[var(--showcase-text)]">
                After Implementation
              </h4>
              <div class="space-y-2 text-sm">
                <label class="flex items-center space-x-2">
                  <input type="checkbox" class="rounded" />
                  <span>Test with keyboard navigation</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input type="checkbox" class="rounded" />
                  <span>Verify screen reader compatibility</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input type="checkbox" class="rounded" />
                  <span>Check color contrast ratios</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input type="checkbox" class="rounded" />
                  <span>Test on actual mobile devices</span>
                </label>
              </div>
            </div>
          </div>
        </Card>

        {/* Resources */}
        <Card class="p-6">
          <h3 class="mb-4 text-xl font-semibold text-[var(--showcase-text)]">
            External Resources
          </h3>
          
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h4 class="mb-2 font-medium text-[var(--showcase-text)]">
                Accessibility Guidelines
              </h4>
              <ul class="space-y-1 text-sm text-[var(--showcase-text)]/70">
                <li>• WCAG 2.1 AA Guidelines</li>
                <li>• WAI-ARIA Authoring Practices</li>
                <li>• Section 508 Compliance</li>
                <li>• Mobile Accessibility Guidelines</li>
              </ul>
            </div>
            
            <div>
              <h4 class="mb-2 font-medium text-[var(--showcase-text)]">
                Design Systems
              </h4>
              <ul class="space-y-1 text-sm text-[var(--showcase-text)]/70">
                <li>• Material Design Guidelines</li>
                <li>• Apple Human Interface Guidelines</li>
                <li>• Carbon Design System</li>
                <li>• Atlassian Design System</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    );
  }
);