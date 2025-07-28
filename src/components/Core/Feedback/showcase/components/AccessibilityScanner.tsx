import { component$, useSignal, useVisibleTask$, $, type QRL } from "@builder.io/qwik";
import {
  HiEyeOutline,
  HiXMarkOutline,
  HiExclamationTriangleOutline,
  HiInformationCircleOutline,
  HiXCircleOutline,
  HiCheckCircleOutline,
} from "@qwikest/icons/heroicons";
import { Card } from "../../../Card/Card";
import type { AccessibilityIssue } from "../types";

interface AccessibilityScannerProps {
  onClose: QRL<() => void>;
}

export const AccessibilityScanner = component$<AccessibilityScannerProps>(
  ({ onClose }) => {
    const issues = useSignal<AccessibilityIssue[]>([]);
    const isScanning = useSignal(false);
    const showOverlay = useSignal(false);

    const scanAccessibility = $(() => {
      isScanning.value = true;
      const foundIssues: AccessibilityIssue[] = [];

      // Color contrast check
      const elements = document.querySelectorAll("*");
      elements.forEach((element) => {
        const styles = window.getComputedStyle(element);
        const color = styles.color;
        const backgroundColor = styles.backgroundColor;
        
        if (color && backgroundColor && backgroundColor !== "rgba(0, 0, 0, 0)") {
          // Simplified contrast check (in real implementation, would use proper contrast ratio calculation)
          const textIsLight = color.includes("255") || color.includes("white");
          const bgIsLight = backgroundColor.includes("255") || backgroundColor.includes("white");
          
          if (textIsLight === bgIsLight) {
            foundIssues.push({
              type: "warning",
              element: element.tagName.toLowerCase(),
              description: "Low color contrast detected",
              recommendation: "Ensure text has sufficient contrast ratio (4.5:1 for normal text)",
              wcagLevel: "AA",
            });
          }
        }
      });

      // Alt text check
      const images = document.querySelectorAll("img");
      images.forEach((img) => {
        if (!img.alt || img.alt.trim() === "") {
          foundIssues.push({
            type: "error",
            element: "img",
            description: "Image missing alt text",
            recommendation: "Add descriptive alt text for screen readers",
            wcagLevel: "A",
          });
        }
      });

      // ARIA labels check
      const interactiveElements = document.querySelectorAll("button, input, select, textarea, [role='button']");
      interactiveElements.forEach((element) => {
        const hasLabel = element.getAttribute("aria-label") || 
                        element.getAttribute("aria-labelledby") ||
                        element.textContent?.trim();
        
        if (!hasLabel) {
          foundIssues.push({
            type: "warning",
            element: element.tagName.toLowerCase(),
            description: "Interactive element lacks accessible name",
            recommendation: "Add aria-label or ensure element has visible text",
            wcagLevel: "A",
          });
        }
      });

      // Focus indicators check
      const focusableElements = document.querySelectorAll("button, input, select, textarea, a[href], [tabindex]");
      focusableElements.forEach((element) => {
        const styles = window.getComputedStyle(element, ":focus");
        const outline = styles.outline;
        const boxShadow = styles.boxShadow;
        
        if (outline === "none" && !boxShadow.includes("inset")) {
          foundIssues.push({
            type: "warning",
            element: element.tagName.toLowerCase(),
            description: "Missing focus indicator",
            recommendation: "Add visible focus styles for keyboard navigation",
            wcagLevel: "AA",
          });
        }
      });

      issues.value = foundIssues.slice(0, 10); // Limit to 10 issues for demo
      isScanning.value = false;
    });

    useVisibleTask$(() => {
      scanAccessibility();
    });

    const IssueIcon = component$<{ type: AccessibilityIssue["type"] }>(({ type }) => {
      const icons = {
        error: HiXCircleOutline,
        warning: HiExclamationTriangleOutline,
        info: HiInformationCircleOutline,
      };
      const Icon = icons[type];
      
      const colors = {
        error: "text-red-600",
        warning: "text-yellow-600",
        info: "text-blue-600",
      };
      
      return <Icon class={`h-4 w-4 ${colors[type]}`} />;
    });

    const WCAGBadge = component$<{ level: AccessibilityIssue["wcagLevel"] }>(({ level }) => (
      <span class="inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">
        WCAG {level}
      </span>
    ));

    return (
      <>
        <div class="fixed top-20 right-6 z-50 w-96">
          <Card class="p-4">
            <div class="mb-4 flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <HiEyeOutline class="h-5 w-5 text-[var(--showcase-primary)]" />
                <h3 class="text-lg font-semibold text-[var(--showcase-text)]">
                  Accessibility Scanner
                </h3>
              </div>
              <button
                onClick$={onClose}
                class="rounded p-1 text-[var(--showcase-text)]/70 hover:bg-[var(--showcase-surface)] hover:text-[var(--showcase-text)]"
              >
                <HiXMarkOutline class="h-4 w-4" />
              </button>
            </div>

            <div class="mb-4 flex items-center justify-between">
              <div class="text-sm text-[var(--showcase-text)]/70">
                {isScanning.value ? "Scanning..." : `${issues.value.length} issues found`}
              </div>
              <div class="flex space-x-2">
                <button
                  onClick$={scanAccessibility}
                  disabled={isScanning.value}
                  class="rounded bg-[var(--showcase-primary)] px-3 py-1 text-xs text-white hover:bg-[var(--showcase-primary)]/90 disabled:opacity-50"
                >
                  {isScanning.value ? "Scanning..." : "Rescan"}
                </button>
                <button
                  onClick$={() => showOverlay.value = !showOverlay.value}
                  class={{
                    "rounded px-3 py-1 text-xs font-medium": true,
                    "bg-[var(--showcase-accent)] text-white": showOverlay.value,
                    "bg-gray-100 text-gray-700": !showOverlay.value,
                  }}
                >
                  {showOverlay.value ? "Hide Overlay" : "Show Overlay"}
                </button>
              </div>
            </div>

            <div class="max-h-80 space-y-2 overflow-y-auto">
              {issues.value.length === 0 && !isScanning.value && (
                <div class="flex items-center space-x-2 rounded-lg bg-green-50 p-3 text-green-700">
                  <HiCheckCircleOutline class="h-4 w-4" />
                  <span class="text-sm">No accessibility issues found!</span>
                </div>
              )}

              {issues.value.map((issue, index) => (
                <div key={index} class="rounded-lg border border-[var(--showcase-border)] bg-[var(--showcase-surface)] p-3">
                  <div class="mb-2 flex items-start justify-between">
                    <div class="flex items-center space-x-2">
                      <IssueIcon type={issue.type} />
                      <span class="text-sm font-medium text-[var(--showcase-text)]">
                        {issue.element}
                      </span>
                    </div>
                    <WCAGBadge level={issue.wcagLevel} />
                  </div>
                  
                  <p class="mb-2 text-sm text-[var(--showcase-text)]/70">
                    {issue.description}
                  </p>
                  
                  <p class="text-xs text-[var(--showcase-text)]/50">
                    💡 {issue.recommendation}
                  </p>
                </div>
              ))}
            </div>

            <div class="mt-4 pt-4 border-t border-[var(--showcase-border)]">
              <div class="text-xs text-[var(--showcase-text)]/50">
                <div class="mb-2 font-medium">WCAG Guidelines:</div>
                <div class="space-y-1">
                  <div>• A: Essential accessibility</div>
                  <div>• AA: Standard compliance</div>
                  <div>• AAA: Enhanced accessibility</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Accessibility Overlay */}
        {showOverlay.value && (
          <div class="fixed inset-0 z-40 pointer-events-none">
            <style>
              {`
                .a11y-highlight {
                  outline: 2px solid #ef4444 !important;
                  outline-offset: 2px !important;
                }
                .a11y-highlight::after {
                  content: "⚠️";
                  position: absolute;
                  top: -10px;
                  right: -10px;
                  background: #ef4444;
                  color: white;
                  font-size: 12px;
                  padding: 2px 4px;
                  border-radius: 4px;
                  pointer-events: none;
                }
              `}
            </style>
          </div>
        )}
      </>
    );
  }
);