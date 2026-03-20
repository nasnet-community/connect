import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { CStepMeta } from "../types";
import type { JSX } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import { StepperProgressDisplay } from "../../shared/components/StepperProgressDisplay";

export interface CStepperProgressProps {
  steps: CStepMeta[];
  activeStep: number;
  onStepClick$: QRL<(index: number) => void>;
  customIcons?: Record<number, JSX.Element>; // Custom icons for specific steps by id
  useNumbers?: boolean; // Whether to use numbers instead of icons for completed steps
  allowSkipSteps?: boolean; // Whether to allow skipping to completed steps
  interactive?: boolean;
  showMobileLayout?: boolean;
  compact?: boolean;
}

export const CStepperProgress = component$((props: CStepperProgressProps) => {
  const {
    steps,
    activeStep,
    onStepClick$,
    customIcons = {},
    useNumbers = false,
    allowSkipSteps = false,
    interactive = true,
    showMobileLayout = true,
    compact = false,
  } = props;

  const rootClass = compact
    ? "pt-2.5 pb-1.5 flex flex-col items-center justify-center w-full"
    : "pt-2 pb-8 flex flex-col items-center w-full";
  const desktopMinHeight = compact ? "58px" : "80px";

  const containerRef = useSignal<Element>();
  const scrollContainerRef = useSignal<HTMLDivElement>();
  const hasShownScrollHint = useSignal(false);

  // Auto-scroll to active step for 6+ steps
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => activeStep);

    // Only apply scroll behavior if we have more than 5 steps
    if (steps.length > 5 && scrollContainerRef.value) {
      const activeStepEl = scrollContainerRef.value.querySelector(`[data-step-index="${activeStep}"]`);
      if (activeStepEl) {
        activeStepEl.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  });

  // Show scroll hint animation on mount (only once for 6+ steps)
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (steps.length > 5 && scrollContainerRef.value && !hasShownScrollHint.value) {
      hasShownScrollHint.value = true;

      // Delay to ensure component is fully rendered
      setTimeout(() => {
        if (scrollContainerRef.value) {
          // Subtle scroll right to hint scrollability
          scrollContainerRef.value.scrollBy({ left: 100, behavior: 'smooth' });

          // Scroll back after a brief pause
          setTimeout(() => {
            if (scrollContainerRef.value) {
              scrollContainerRef.value.scrollBy({ left: -100, behavior: 'smooth' });
            }
          }, 800);
        }
      }, 500);
    }
  });
  
  return (
    <div class={rootClass} ref={containerRef}>
      {/* Mobile view: vertical stepper */}
      <div class={`${showMobileLayout ? "flex" : "hidden"} justify-center w-full sm:hidden`}>
        <div class="w-full max-w-xs pl-2">
          <StepperProgressDisplay
            steps={steps}
            activeStep={activeStep}
            onStepClick$={onStepClick$}
            customIcons={customIcons}
            useNumbers={useNumbers}
            allowSkipSteps={allowSkipSteps}
            interactive={interactive}
            orientation="vertical"
          />
        </div>
      </div>

      {/* Desktop view: horizontal stepper */}
      <div class="hidden sm:flex justify-center w-full px-2">
        {/* For 5 or fewer steps: use existing full-width layout */}
        {steps.length <= 5 ? (
          <StepperProgressDisplay
            steps={steps}
            activeStep={activeStep}
            onStepClick$={onStepClick$}
            customIcons={customIcons}
            useNumbers={useNumbers}
            allowSkipSteps={allowSkipSteps}
            interactive={interactive}
            compact={compact}
            orientation="horizontal"
          />
        ) : (
          /* For 6+ steps: use scrollable container */
          <div class="relative w-full" style={{ minHeight: desktopMinHeight }}>
            {/* Scrollable container with snap */}
            <div
              ref={scrollContainerRef}
              class="overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgb(209 213 219) transparent"
              }}
            >
              <StepperProgressDisplay
                steps={steps}
                activeStep={activeStep}
                onStepClick$={onStepClick$}
                customIcons={customIcons}
                useNumbers={useNumbers}
                allowSkipSteps={allowSkipSteps}
                interactive={interactive}
                compact={compact}
                orientation="horizontal"
                scrollable={true}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}); 
