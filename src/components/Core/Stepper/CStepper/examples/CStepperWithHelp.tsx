import { component$, $, useSignal } from "@builder.io/qwik";
import { CStepper } from "../CStepper";
import type { CStepMeta } from "../types";

/**
 * Example CStepper component with help modal functionality
 * Demonstrates how to implement help content for steps
 */

// Example step components
const Step1Component = component$(() => (
  <div class="space-y-4">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Account Information</h3>
    <div class="grid gap-4 md:grid-cols-2">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Full Name
        </label>
        <input 
          type="text" 
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
          placeholder="Enter your full name"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email Address
        </label>
        <input 
          type="email" 
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
          placeholder="Enter your email"
        />
      </div>
    </div>
  </div>
));

const Step2Component = component$(() => (
  <div class="space-y-4">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Profile Setup</h3>
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Profile Picture
      </label>
      <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
        <p class="text-gray-500 dark:text-gray-400">Click to upload or drag and drop</p>
      </div>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Bio
      </label>
      <textarea 
        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
        rows={4}
        placeholder="Tell us about yourself..."
      />
    </div>
  </div>
));

const Step3Component = component$(() => (
  <div class="space-y-4">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Preferences</h3>
    <div class="space-y-3">
      <div class="flex items-center">
        <input 
          type="checkbox" 
          id="notifications" 
          class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        />
        <label for="notifications" class="ml-2 block text-sm text-gray-900 dark:text-white">
          Email notifications
        </label>
      </div>
      <div class="flex items-center">
        <input 
          type="checkbox" 
          id="marketing" 
          class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        />
        <label for="marketing" class="ml-2 block text-sm text-gray-900 dark:text-white">
          Marketing communications
        </label>
      </div>
    </div>
  </div>
));

export const CStepperWithHelp = component$(() => {
  const completionMessage = useSignal<string>('');

  // Define steps with comprehensive help content
  const steps: CStepMeta[] = [
    {
      id: 1,
      title: "Account Information",
      description: "Set up your basic account details",
      component: Step1Component,
      isComplete: false,
      
      // Help content for this step
      helpTitle: "Setting Up Your Account",
      helpData: {
        title: "Account Information Help",
        description: "This step collects your basic account information that will be used throughout the platform.",
        sections: [
          {
            title: "Full Name",
            content: "Enter your legal full name as it appears on official documents. This will be used for verification and communication purposes.",
            type: "info" as const,
          },
          {
            title: "Email Address",
            content: "Use a valid email address that you check regularly. This will be your primary means of communication and account recovery.",
            type: "tip" as const,
          },
          {
            title: "Privacy Notice",
            content: "Your personal information is encrypted and stored securely. We never share your data with third parties without your explicit consent.",
            type: "warning" as const,
          },
        ],
        externalLinks: [
          {
            title: "Privacy Policy",
            url: "#privacy",
          },
          {
            title: "Terms of Service",
            url: "#terms",
          }
        ]
      }
    },
    {
      id: 2,
      title: "Profile Setup",
      description: "Customize your profile appearance",
      component: Step2Component,
      isComplete: false,
      
      // Help content for this step
      helpTitle: "Creating Your Profile",
      helpData: {
        title: "Profile Setup Guide",
        description: "Make your profile stand out with a great photo and compelling bio.",
        sections: [
          {
            title: "Profile Picture Tips",
            content: "Upload a clear, professional photo. Square images work best. Supported formats: JPG, PNG, WebP. Maximum size: 5MB.",
            type: "tip" as const,
          },
          {
            title: "Writing a Great Bio",
            content: "Keep it concise but informative. Mention your interests, expertise, or what makes you unique. Aim for 2-3 sentences.",
            type: "example" as const,
          },
          {
            title: "Image Guidelines",
            content: "Please ensure your profile picture is appropriate and represents you professionally. Avoid logos or branded content.",
            type: "warning" as const,
          },
        ],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example video URL
      }
    },
    {
      id: 3,
      title: "Preferences",
      description: "Configure your notification settings",
      component: Step3Component,
      isComplete: false,
      
      // Help content for this step  
      helpTitle: "Managing Your Preferences",
      helpData: {
        title: "Notification Preferences",
        description: "Control how and when you receive communications from us.",
        sections: [
          {
            title: "Email Notifications",
            content: "Choose to receive important updates, security alerts, and system notifications via email. Highly recommended for account security.",
            type: "info" as const,
          },
          {
            title: "Marketing Communications",
            content: "Opt-in to receive news about new features, tips, and promotional offers. You can unsubscribe at any time.",
            type: "tip" as const,
          },
          {
            title: "Privacy Control",
            content: "You can change these preferences at any time from your account settings. Your choices are saved automatically.",
            type: "example" as const,
          },
        ]
      }
    }
  ];

  const handleStepComplete$ = $((stepId: number) => {
    console.log(`Step ${stepId} completed`);
  });

  const handleComplete$ = $(() => {
    completionMessage.value = '🎉 Congratulations! Your account setup is complete. Welcome aboard!';
    console.log('All steps completed!');
  });

  const handleHelpOpen$ = $((stepId: number) => {
    console.log(`Help opened for step ${stepId}`);
  });

  const handleHelpClose$ = $((stepId: number) => {
    console.log(`Help closed for step ${stepId}`);
  });

  return (
    <div class="max-w-4xl mx-auto p-6">
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Account Setup Wizard
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Complete these steps to set up your new account
        </p>
        
        {/* Help Instructions */}
        <div class="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-950/50 dark:to-secondary-950/50 rounded-lg p-4 border border-primary-200 dark:border-primary-800">
          <div class="flex items-center justify-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
            <svg class="w-4 h-4 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              Click the <span class="font-semibold">help button (❓)</span> in the navigation or press 
              <kbd class="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded">?</kbd> 
              for step-specific guidance
            </span>
          </div>
        </div>
      </div>

      {/* Completion Message */}
      {completionMessage.value && (
        <div class="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <p class="text-green-800 dark:text-green-200 font-medium">
              {completionMessage.value}
            </p>
          </div>
        </div>
      )}

      {/* CStepper with Help System */}
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <CStepper
          steps={steps}
          activeStep={0}
          onStepComplete$={handleStepComplete$}
          onComplete$={handleComplete$}
          allowSkipSteps={true}
          
          // Enable help system
          enableHelp={true}
          helpOptions={{
            enableKeyboardShortcuts: true,
            autoShowHelpOnFirstStep: false,
            onHelpOpen$: handleHelpOpen$,
            onHelpClose$: handleHelpClose$,
          }}
        />
      </div>
      
      {/* Feature Information */}
      <div class="mt-8 grid gap-4 md:grid-cols-3">
        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <h3 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Smart Help System</h3>
          <p class="text-sm text-blue-700 dark:text-blue-300">
            Context-aware help content with examples, tips, and video tutorials for each step.
          </p>
        </div>
        
        <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg p-4 border border-green-200 dark:border-green-800">
          <h3 class="font-semibold text-green-900 dark:text-green-100 mb-2">⌨️ Keyboard Shortcuts</h3>
          <p class="text-sm text-green-700 dark:text-green-300">
            Press <code class="bg-green-100 dark:bg-green-900 px-1 rounded">?</code> to open help, 
            <code class="bg-green-100 dark:bg-green-900 px-1 rounded">Esc</code> to close.
          </p>
        </div>
        
        <div class="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
          <h3 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">🎨 Modern Design</h3>
          <p class="text-sm text-purple-700 dark:text-purple-300">
            Beautiful glassmorphism design with smooth animations and mobile-responsive layout.
          </p>
        </div>
      </div>
    </div>
  );
});