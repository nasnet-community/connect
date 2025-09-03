import { component$, useSignal, $ } from "@builder.io/qwik";
import { useQwikSteps, when, QwikStepUtils } from "../index";
import type { StepProps } from "~/types/step";

// Example step components
const WelcomeStep = component$((props: StepProps) => (
  <div>
    <h2>Welcome</h2>
    <p>Choose your preferences to get started.</p>
    <button onClick$={() => props.onComplete$()}>Continue</button>
  </div>
));

const NameStep = component$((props: StepProps) => (
  <div>
    <h2>Enter Your Name</h2>
    <input type="text" placeholder="Your name" />
    <button onClick$={() => props.onComplete$()}>Next</button>
  </div>
));

const EmailStep = component$((props: StepProps) => (
  <div>
    <h2>Email Preferences</h2>
    <label><input type="checkbox" /> Newsletter</label>
    <button onClick$={() => props.onComplete$()}>Complete</button>
  </div>
));

const PremiumStep = component$((props: StepProps) => (
  <div>
    <h2>Premium Features</h2>
    <p>You've unlocked premium features!</p>
    <button onClick$={() => props.onComplete$()}>Finish</button>
  </div>
));

/**
 * Example: Basic conditional steps using serializable conditions
 * 
 * This demonstrates:
 * - Simple field-based conditions with string operators
 * - Steps that appear/disappear based on context values
 * - Proper Qwik serialization compliance
 */
export const BasicConditionalSteps = component$(() => {
  // Application state
  const userType = useSignal<"basic" | "premium" | undefined>(undefined);
  const hasEmail = useSignal(false);

  // Step definitions with serializable conditions
  const stepDefinitions = [
    // Always visible welcome step
    QwikStepUtils.createAlwaysVisibleStep(1, "Welcome", WelcomeStep, {
      priority: 10,
    }),

    // Name step - always shown after welcome
    QwikStepUtils.createAlwaysVisibleStep(2, "Your Name", NameStep, {
      priority: 20,
    }),

    // Email step - only if user has email
    QwikStepUtils.createConditionalStep(
      3, "Email Settings", EmailStep,
      when.field("hasEmail").truthy(),
      { priority: 30, dependencies: ["hasEmail"] }
    ),

    // Premium step - only for premium users
    QwikStepUtils.createConditionalStep(
      4, "Premium Features", PremiumStep,
      when.field("userType").equals("premium"),
      { priority: 40, dependencies: ["userType"] }
    ),
  ];

  // Build context from current state
  const buildContext = () => ({
    userType: userType.value,
    hasEmail: hasEmail.value,
  });

  // Use the step system
  const { visibleSteps, setStepCompletion$ } = useQwikSteps({
    steps: stepDefinitions,
    context: buildContext(),
    options: {
      preserveCompletion: true,
      debug: true, // Enable for learning
    },
  });

  const handleStepComplete = $((stepId: number) => {
    setStepCompletion$(stepId, true);
  });

  return (
    <div class="max-w-md mx-auto p-6 space-y-4">
      <h1 class="text-2xl font-bold">Basic Conditional Steps Example</h1>
      
      {/* Controls to demonstrate dynamic behavior */}
      <div class="border p-4 rounded">
        <h3 class="font-semibold mb-2">Controls (Change these to see steps update)</h3>
        <div class="space-y-2">
          <div>
            <label class="block text-sm">User Type:</label>
            <select 
              value={userType.value || ""}
              onChange$={(e) => {
                const target = e.target as HTMLSelectElement;
                userType.value = target.value as "basic" | "premium" | undefined;
              }}
              class="border rounded px-2 py-1"
            >
              <option value="">Select...</option>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
            </select>
          </div>
          
          <div>
            <label class="flex items-center">
              <input
                type="checkbox"
                checked={hasEmail.value}
                onChange$={(e) => {
                  const target = e.target as HTMLInputElement;
                  hasEmail.value = target.checked;
                }}
                class="mr-2"
              />
              Has Email
            </label>
          </div>
        </div>
      </div>

      {/* Display visible steps */}
      <div class="space-y-2">
        <h3 class="font-semibold">Visible Steps ({visibleSteps.value.length}):</h3>
        {visibleSteps.value.map((step) => (
          <div 
            key={step.id}
            class={`p-3 border rounded ${
              step.isComplete ? 'bg-green-50 border-green-300' : 'bg-gray-50'
            }`}
          >
            <div class="flex justify-between items-center">
              <span class="font-medium">{step.title}</span>
              <button
                onClick$={() => handleStepComplete(step.id)}
                disabled={step.isComplete}
                class="px-3 py-1 text-sm bg-blue-500 text-white rounded disabled:bg-gray-300"
              >
                {step.isComplete ? 'Done' : 'Complete'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {visibleSteps.value.length === 0 && (
        <div class="text-center text-gray-500 py-8">
          No steps visible - adjust the controls above
        </div>
      )}
    </div>
  );
});