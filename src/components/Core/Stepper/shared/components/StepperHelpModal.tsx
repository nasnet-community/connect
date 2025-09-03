import { component$, useSignal, $, type QRL, useVisibleTask$, type Signal } from "@builder.io/qwik";
import type { BaseStepMeta, HelpSection, StepHelpContent } from "../types/base";
import { Dialog } from "~/components/Core/Feedback/Dialog/Dialog";

export interface StepperHelpModalProps {
  isOpen: Signal<boolean>;
  onClose$: QRL<() => void>;
  currentStep?: BaseStepMeta;
  stepTitle: string;
  stepNumber: number;
  totalSteps: number;
}

/**
 * Full-screen help modal component for stepper steps
 * Features modern glassmorphism design with animations
 */
export const StepperHelpModal = component$<StepperHelpModalProps>((props) => {
  const { 
    isOpen, 
    onClose$, 
    currentStep, 
    stepTitle, 
    stepNumber, 
    totalSteps 
  } = props;

  const _modalRef = useSignal<Element>();

  // Handle keyboard shortcuts for help modal
  useVisibleTask$(({ track, cleanup }) => {
    track(() => isOpen.value);
    
    if (!isOpen.value) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose$();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    cleanup(() => document.removeEventListener('keydown', handleKeyDown));
  });

  // Get help content from current step
  const getHelpContent = (): StepHelpContent | null => {
    if (!currentStep) return null;
    
    // Priority: helpData > constructed from individual properties
    if (currentStep.helpData) {
      return currentStep.helpData;
    }
    
    if (currentStep.helpContent || currentStep.helpTitle) {
      return {
        title: currentStep.helpTitle || stepTitle,
        description: typeof currentStep.helpContent === 'string' 
          ? currentStep.helpContent 
          : undefined,
        sections: typeof currentStep.helpContent !== 'string' && currentStep.helpContent
          ? [{ title: 'Content', content: currentStep.helpContent, type: 'info' as const }]
          : undefined
      };
    }
    
    return null;
  };

  const helpContent = getHelpContent();
  
  // Don't render if no help content available
  if (!helpContent) {
    return null;
  }

  // Render help section with appropriate styling
  const renderHelpSection = $((section: HelpSection, index: number) => {
    const getSectionClasses = () => {
      const baseClasses = "rounded-xl p-6 backdrop-blur-sm border transition-all duration-300 hover:shadow-lg";
      
      switch (section.type) {
        case 'tip':
          return `${baseClasses} bg-success-50/80 border-success-200 dark:bg-success-950/50 dark:border-success-800`;
        case 'warning':
          return `${baseClasses} bg-warning-50/80 border-warning-200 dark:bg-warning-950/50 dark:border-warning-800`;
        case 'example':
          return `${baseClasses} bg-info-50/80 border-info-200 dark:bg-info-950/50 dark:border-info-800`;
        default:
          return `${baseClasses} bg-surface-light-secondary/80 border-gray-200 dark:bg-surface-dark-secondary/80 dark:border-gray-700`;
      }
    };

    const getSectionIcon = () => {
      if (section.icon) return section.icon;
      
      const iconClasses = "w-6 h-6 mr-3 flex-shrink-0";
      
      switch (section.type) {
        case 'tip':
          return (
            <svg class={`${iconClasses} text-success-600 dark:text-success-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          );
        case 'warning':
          return (
            <svg class={`${iconClasses} text-warning-600 dark:text-warning-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          );
        case 'example':
          return (
            <svg class={`${iconClasses} text-info-600 dark:text-info-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          );
        default:
          return (
            <svg class={`${iconClasses} text-primary-600 dark:text-primary-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          );
      }
    };

    return (
      <div 
        key={section.id || index}
        class={`${getSectionClasses()} animate-fade-in-up`}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div class="flex items-start">
          {getSectionIcon()}
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {section.title}
            </h3>
            <div class="text-gray-700 dark:text-gray-300 leading-relaxed prose prose-sm dark:prose-invert max-w-none">
              {typeof section.content === 'string' ? (
                <p>{section.content}</p>
              ) : (
                section.content
              )}
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <Dialog
      isOpen={isOpen}
      onClose$={onClose$}
      size="full"
      fullscreenOnMobile={true}
      backdropVariant="heavy"
      class="stepper-help-modal"
      contentClass="h-full"
      ariaLabel={`Help for ${stepTitle}`}
      zIndex={1080}
    >
      <div q:slot="header" class="relative">
        {/* Gradient Header */}
        <div class="bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500 dark:from-primary-600 dark:via-primary-700 dark:to-secondary-600 text-white">
          <div class="px-6 py-6 md:px-8 md:py-8">
            <div class="flex items-center justify-between">
              <div class="flex-1 min-w-0">
                {/* Step indicator */}
                <div class="flex items-center mb-2">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                    Step {stepNumber} of {totalSteps}
                  </span>
                </div>
                
                {/* Title */}
                <h2 class="text-2xl md:text-3xl font-bold text-white mb-1 leading-tight">
                  {helpContent.title || stepTitle}
                </h2>
                
                {/* Description */}
                {helpContent.description && (
                  <p class="text-white/90 text-base md:text-lg leading-relaxed max-w-2xl">
                    {helpContent.description}
                  </p>
                )}
              </div>
              
              {/* Close button */}
              <button
                type="button"
                onClick$={onClose$}
                class="ml-4 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
                aria-label="Close help modal"
              >
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Wave decoration */}
          <div class="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500 dark:from-primary-600 dark:via-primary-700 dark:to-secondary-600">
            <svg class="absolute bottom-0 w-full h-6 text-surface-light-DEFAULT dark:text-surface-dark-DEFAULT" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
              <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
              <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div class="flex-1 overflow-y-auto bg-gradient-to-br from-surface-light-DEFAULT via-surface-light-secondary to-surface-light-tertiary dark:from-surface-dark-DEFAULT dark:via-surface-dark-secondary dark:to-surface-dark-tertiary">
        <div class="container mx-auto px-6 py-8 md:px-8 md:py-12 max-w-4xl">
          {/* Help sections */}
          {helpContent.sections && helpContent.sections.length > 0 && (
            <div class="space-y-6">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <svg class="w-6 h-6 mr-2 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Help & Guidance
              </h3>
              
              {helpContent.sections.map((section, index) => 
                renderHelpSection(section, index)
              )}
            </div>
          )}
          
          {/* Video section */}
          {helpContent.videoUrl && (
            <div class="mt-8">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <svg class="w-6 h-6 mr-2 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Video Tutorial
              </h3>
              
              <div class="rounded-xl overflow-hidden shadow-lg bg-surface-light-elevated dark:bg-surface-dark-elevated p-4 animate-fade-in-up">
                <div class="aspect-video">
                  <iframe 
                    src={helpContent.videoUrl}
                    class="w-full h-full rounded-lg"
                    allowFullscreen
                    title={`Tutorial for ${stepTitle}`}
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* External links */}
          {helpContent.externalLinks && helpContent.externalLinks.length > 0 && (
            <div class="mt-8">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <svg class="w-6 h-6 mr-2 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Additional Resources
              </h3>
              
              <div class="grid gap-4 md:grid-cols-2">
                {helpContent.externalLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-surface-light-elevated/50 dark:bg-surface-dark-elevated/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:border-primary-300 dark:hover:border-primary-600 animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div class="flex items-center">
                      {link.icon && (
                        <div class="flex-shrink-0 mr-3">
                          {link.icon}
                        </div>
                      )}
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {link.title}
                        </p>
                      </div>
                      <svg class="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div q:slot="footer" class="border-t border-gray-200 dark:border-gray-700 bg-surface-light-secondary/50 dark:bg-surface-dark-secondary/50 backdrop-blur-sm">
        <div class="px-6 py-4 md:px-8">
          <div class="flex items-center justify-between">
            <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Press <kbd class="px-2 py-1 text-xs font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded">Esc</kbd> to close
            </div>
            
            <button
              type="button"
              onClick$={onClose$}
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
});