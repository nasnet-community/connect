import { component$, useSignal, $ } from "@builder.io/qwik";
import { useQwikBooleanSteps, QwikStepUtils } from "../index";
import type { StepProps } from "~/types/step";

// Simple step components
const IntroStep = component$((props: StepProps) => (
  <div class="p-4 border rounded">
    <h3>Introduction</h3>
    <p>Welcome to the setup process!</p>
    <button onClick$={() => props.onComplete$()} class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
      Start
    </button>
  </div>
));

const PersonalInfoStep = component$((props: StepProps) => (
  <div class="p-4 border rounded">
    <h3>Personal Information</h3>
    <p>Please provide your personal details.</p>
    <button onClick$={() => props.onComplete$()} class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
      Continue
    </button>
  </div>
));

const PreferencesStep = component$((props: StepProps) => (
  <div class="p-4 border rounded">
    <h3>Preferences</h3>
    <p>Set your preferences and notifications.</p>
    <button onClick$={() => props.onComplete$()} class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
      Save
    </button>
  </div>
));

const AdvancedStep = component$((props: StepProps) => (
  <div class="p-4 border rounded">
    <h3>Advanced Settings</h3>
    <p>Configure advanced options (only for power users).</p>
    <button onClick$={() => props.onComplete$()} class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
      Complete
    </button>
  </div>
));

const NotificationStep = component$((props: StepProps) => (
  <div class="p-4 border rounded">
    <h3>Notifications</h3>
    <p>Configure your notification preferences.</p>
    <button onClick$={() => props.onComplete$()} class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
      Finish
    </button>
  </div>
));

/**
 * Example: Simple boolean-based conditional steps
 * 
 * This demonstrates the useQwikBooleanSteps hook which provides
 * a simpler API for basic show/hide logic based on boolean values.
 * 
 * Perfect for simpler use cases where you don't need the full
 * complexity of the multi-flow system.
 */
export const BooleanStepsExample = component$(() => {
  // Simple state flags
  const showPreferences = useSignal(false);
  const isAdvancedUser = useSignal(false);
  const wantsNotifications = useSignal(false);

  // Base steps that are always shown
  const baseSteps = [
    QwikStepUtils.createAlwaysVisibleStep(1, "Introduction", IntroStep),
    QwikStepUtils.createAlwaysVisibleStep(2, "Personal Info", PersonalInfoStep),
  ];

  // Conditional steps with boolean logic
  const conditionalSteps = [
    {
      step: QwikStepUtils.createAlwaysVisibleStep(3, "Preferences", PreferencesStep),
      when: "showPreferences",
      truthy: true,
    },
    {
      step: QwikStepUtils.createAlwaysVisibleStep(4, "Advanced Settings", AdvancedStep),
      when: "isAdvancedUser", 
      truthy: true,
    },
    {
      step: QwikStepUtils.createAlwaysVisibleStep(5, "Notifications", NotificationStep),
      when: "wantsNotifications",
      truthy: true,
    },
  ];

  // Build context from simple boolean flags
  const context = {
    showPreferences: showPreferences.value,
    isAdvancedUser: isAdvancedUser.value,
    wantsNotifications: wantsNotifications.value,
  };

  // Use the simple boolean hook
  const steps = useQwikBooleanSteps(
    baseSteps,
    conditionalSteps,
    context,
    {
      maxSteps: 10, // Optional: limit total steps
    }
  );

  return (
    <div class="max-w-2xl mx-auto p-6 space-y-6">
      <h1 class="text-3xl font-bold">Boolean Steps Example</h1>
      <p class="text-gray-600">
        This demonstrates simple conditional steps using boolean flags.
        Toggle the options below to see steps appear and disappear.
      </p>
      
      {/* Simple boolean controls */}
      <div class="border p-4 rounded bg-yellow-50">
        <h3 class="font-semibold mb-3">Toggle Options</h3>
        <div class="space-y-2">
          <label class="flex items-center">
            <input
              type="checkbox"
              checked={showPreferences.value}
              onChange$={(e) => {
                const target = e.target as HTMLInputElement;
                showPreferences.value = target.checked;
              }}
              class="mr-2"
            />
            Show Preferences Step
          </label>
          
          <label class="flex items-center">
            <input
              type="checkbox"
              checked={isAdvancedUser.value}
              onChange$={(e) => {
                const target = e.target as HTMLInputElement;
                isAdvancedUser.value = target.checked;
              }}
              class="mr-2"
            />
            I'm an Advanced User
          </label>
          
          <label class="flex items-center">
            <input
              type="checkbox"
              checked={wantsNotifications.value}
              onChange$={(e) => {
                const target = e.target as HTMLInputElement;
                wantsNotifications.value = target.checked;
              }}
              class="mr-2"
            />
            Enable Notifications Step
          </label>
        </div>
      </div>

      {/* Display steps */}
      <div class="space-y-4">
        <h3 class="font-semibold text-lg">
          Current Steps ({steps.length} total)
        </h3>
        
        {steps.map((step, index) => (
          <div key={step.id} class="border rounded-lg overflow-hidden">
            <div class="bg-gray-50 px-4 py-2 border-b">
              <div class="flex items-center justify-between">
                <span class="font-medium">
                  Step {index + 1}: {step.title}
                </span>
                <span class="text-sm text-gray-500">ID: {step.id}</span>
              </div>
            </div>
            
            <div class="p-4">
              {/* Render the step component */}
              <step.component 
                isComplete={step.isComplete}
                onComplete$={$(() => {
                  console.log(`Step ${step.id} completed`);
                })}
              />
            </div>
          </div>
        ))}
        
        {steps.length === 0 && (
          <div class="text-center text-gray-500 py-8 border-2 border-dashed border-gray-200 rounded-lg">
            No steps available - this shouldn't happen since base steps are always visible
          </div>
        )}
      </div>

      {/* Explanation */}
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 class="font-semibold text-blue-800 mb-2">How it works:</h4>
        <ul class="text-blue-700 space-y-1 text-sm">
          <li>• <strong>Base steps:</strong> Always visible (Introduction, Personal Info)</li>
          <li>• <strong>Conditional steps:</strong> Appear based on boolean flags</li>
          <li>• <strong>Simple API:</strong> Just specify field name and true/false condition</li>
          <li>• <strong>Automatic sorting:</strong> Steps maintain proper order by priority and ID</li>
        </ul>
      </div>

      {/* Context display */}
      <details class="border rounded p-4 bg-gray-50">
        <summary class="cursor-pointer font-medium">Current Context</summary>
        <pre class="mt-2 text-sm overflow-auto">
          {JSON.stringify(context, null, 2)}
        </pre>
      </details>
    </div>
  );
});