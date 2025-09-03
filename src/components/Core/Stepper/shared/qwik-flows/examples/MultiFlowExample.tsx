import { component$, useSignal, $ } from "@builder.io/qwik";
import { useQwikFlows, when, QwikStepUtils } from "../index";
import type { QwikStepDefinition, QwikStepFlow } from "../types";
import type { StepProps } from "~/types/step";

// Mock step components for different platforms
const PlatformSelectionStep = component$((props: StepProps) => (
  <div>
    <h2>Choose Your Platform</h2>
    <p>Select which platform you want to configure</p>
    <button onClick$={() => props.onComplete$()}>Continue</button>
  </div>
));

const AndroidSetupStep = component$((props: StepProps) => (
  <div>
    <h2>Android Setup</h2>
    <p>Configure Android-specific settings</p>
    <button onClick$={() => props.onComplete$()}>Next</button>
  </div>
));

const AndroidPermissionsStep = component$((props: StepProps) => (
  <div>
    <h2>Android Permissions</h2>
    <p>Grant required permissions for Android</p>
    <button onClick$={() => props.onComplete$()}>Next</button>
  </div>
));

const AndroidNotificationsStep = component$((props: StepProps) => (
  <div>
    <h2>Android Notifications</h2>
    <p>Configure push notifications for Android</p>
    <button onClick$={() => props.onComplete$()}>Complete</button>
  </div>
));

const IOSSetupStep = component$((props: StepProps) => (
  <div>
    <h2>iOS Setup</h2>
    <p>Configure iOS-specific settings</p>
    <button onClick$={() => props.onComplete$()}>Next</button>
  </div>
));

const IOSProfileStep = component$((props: StepProps) => (
  <div>
    <h2>iOS Profile Installation</h2>
    <p>Install the iOS configuration profile</p>
    <button onClick$={() => props.onComplete$()}>Next</button>
  </div>
));

const IOSCertificateStep = component$((props: StepProps) => (
  <div>
    <h2>iOS Certificate</h2>
    <p>Install security certificate for iOS</p>
    <button onClick$={() => props.onComplete$()}>Complete</button>
  </div>
));

const WebSetupStep = component$((props: StepProps) => (
  <div>
    <h2>Web Configuration</h2>
    <p>Configure web browser settings</p>
    <button onClick$={() => props.onComplete$()}>Next</button>
  </div>
));

const WebExtensionStep = component$((props: StepProps) => (
  <div>
    <h2>Browser Extension</h2>
    <p>Install the required browser extension</p>
    <button onClick$={() => props.onComplete$()}>Complete</button>
  </div>
));

/**
 * Example: Multi-flow system with platform-specific steps
 * 
 * This demonstrates:
 * - Multiple flows with different activation conditions
 * - Platform-specific step sequences
 * - Shared steps across all flows
 * - Dynamic flow switching based on user selection
 * 
 * Similar to how Choose.tsx handles MikroTik vs OpenWRT flows
 */
export const MultiFlowExample = component$(() => {
  // Application state
  const selectedPlatform = useSignal<"android" | "ios" | "web" | undefined>(undefined);
  const isAdvancedMode = useSignal(false);

  // Define all step definitions with serializable conditions
  const stepDefinitions: QwikStepDefinition[] = [
    // Shared platform selection step (always visible)
    QwikStepUtils.createAlwaysVisibleStep(1, "Platform Selection", PlatformSelectionStep, {
      priority: 10,
    }),

    // Android-specific steps
    QwikStepUtils.createConditionalStep(
      10, "Android Setup", AndroidSetupStep,
      when.field("platform").equals("android"),
      { priority: 20, dependencies: ["platform"], flowId: "android" }
    ),

    QwikStepUtils.createConditionalStep(
      11, "Android Permissions", AndroidPermissionsStep,
      when.field("platform").equals("android"),
      { priority: 30, dependencies: ["platform"], flowId: "android" }
    ),

    QwikStepUtils.createConditionalStep(
      12, "Android Notifications", AndroidNotificationsStep,
      when.and(
        when.field("platform").equals("android"),
        when.field("advancedMode").truthy()
      ),
      { priority: 40, dependencies: ["platform", "advancedMode"], flowId: "android" }
    ),

    // iOS-specific steps
    QwikStepUtils.createConditionalStep(
      20, "iOS Setup", IOSSetupStep,
      when.field("platform").equals("ios"),
      { priority: 20, dependencies: ["platform"], flowId: "ios" }
    ),

    QwikStepUtils.createConditionalStep(
      21, "iOS Profile", IOSProfileStep,
      when.field("platform").equals("ios"),
      { priority: 30, dependencies: ["platform"], flowId: "ios" }
    ),

    QwikStepUtils.createConditionalStep(
      22, "iOS Certificate", IOSCertificateStep,
      when.and(
        when.field("platform").equals("ios"),
        when.field("advancedMode").truthy()
      ),
      { priority: 40, dependencies: ["platform", "advancedMode"], flowId: "ios" }
    ),

    // Web-specific steps
    QwikStepUtils.createConditionalStep(
      30, "Web Setup", WebSetupStep,
      when.field("platform").equals("web"),
      { priority: 20, dependencies: ["platform"], flowId: "web" }
    ),

    QwikStepUtils.createConditionalStep(
      31, "Browser Extension", WebExtensionStep,
      when.field("platform").equals("web"),
      { priority: 30, dependencies: ["platform"], flowId: "web" }
    ),
  ];

  // Define flows for different platforms
  const flowDefinitions: QwikStepFlow[] = [
    QwikStepUtils.createFlow(
      "android",
      "Android Configuration Flow",
      stepDefinitions.filter(step => step.flowId === "android" || !step.flowId),
      {
        condition: when.field("platform").equals("android"),
        dependencies: ["platform"],
        priority: 10,
      }
    ),

    QwikStepUtils.createFlow(
      "ios",
      "iOS Configuration Flow", 
      stepDefinitions.filter(step => step.flowId === "ios" || !step.flowId),
      {
        condition: when.field("platform").equals("ios"),
        dependencies: ["platform"],
        priority: 20,
      }
    ),

    QwikStepUtils.createFlow(
      "web",
      "Web Configuration Flow",
      stepDefinitions.filter(step => step.flowId === "web" || !step.flowId),
      {
        condition: when.field("platform").equals("web"),
        dependencies: ["platform"],
        priority: 30,
      }
    ),
  ];

  // Build context from current state
  const buildContext = () => ({
    platform: selectedPlatform.value,
    advancedMode: isAdvancedMode.value,
  });

  // Use the multi-flow system
  const {
    activeFlows,
    visibleSteps,
    setStepCompletion$,
  } = useQwikFlows({
    flows: flowDefinitions,
    context: buildContext(),
    defaultFlow: "android", // Default to Android flow if none match
    options: {
      preserveCompletion: true,
      debug: true, // Enable for learning
    },
  });

  const handleStepComplete = $((stepId: number) => {
    setStepCompletion$(stepId, true);
  });

  return (
    <div class="max-w-2xl mx-auto p-6 space-y-6">
      <h1 class="text-3xl font-bold">Multi-Flow Platform Setup Example</h1>
      
      {/* Controls to demonstrate flow switching */}
      <div class="border p-4 rounded bg-blue-50">
        <h3 class="font-semibold mb-3">Configuration Controls</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Platform:</label>
            <select 
              value={selectedPlatform.value || ""}
              onChange$={(e) => {
                const target = e.target as HTMLSelectElement;
                selectedPlatform.value = target.value as "android" | "ios" | "web" | undefined;
              }}
              class="w-full border rounded px-3 py-2"
            >
              <option value="">Select Platform...</option>
              <option value="android">Android</option>
              <option value="ios">iOS</option>
              <option value="web">Web</option>
            </select>
          </div>
          
          <div class="flex items-center">
            <label class="flex items-center">
              <input
                type="checkbox"
                checked={isAdvancedMode.value}
                onChange$={(e) => {
                  const target = e.target as HTMLInputElement;
                  isAdvancedMode.value = target.checked;
                }}
                class="mr-2"
              />
              Advanced Mode (adds extra steps)
            </label>
          </div>
        </div>
      </div>

      {/* Flow status */}
      <div class="border p-4 rounded bg-green-50">
        <h3 class="font-semibold mb-2">Active Flows:</h3>
        {activeFlows.value.length > 0 ? (
          <div class="flex flex-wrap gap-2">
            {activeFlows.value.map((flowId) => (
              <span key={flowId} class="px-2 py-1 bg-green-200 text-green-800 rounded text-sm">
                {flowId}
              </span>
            ))}
          </div>
        ) : (
          <span class="text-gray-500">No flows active</span>
        )}
      </div>

      {/* Step sequence */}
      <div class="space-y-3">
        <h3 class="font-semibold text-lg">
          Step Sequence ({visibleSteps.value.length} steps)
        </h3>
        
        {visibleSteps.value.length > 0 ? (
          <div class="space-y-2">
            {visibleSteps.value.map((step, index) => (
              <div 
                key={step.id}
                class={`p-4 border rounded-lg transition-colors ${
                  step.isComplete 
                    ? 'bg-green-50 border-green-300' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div class="flex justify-between items-center">
                  <div>
                    <span class="inline-block w-6 h-6 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center justify-center mr-3">
                      {index + 1}
                    </span>
                    <span class="font-medium">{step.title}</span>
                    {step.flowId && (
                      <span class="ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                        {step.flowId}
                      </span>
                    )}
                  </div>
                  <button
                    onClick$={() => handleStepComplete(step.id)}
                    disabled={step.isComplete}
                    class="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {step.isComplete ? 'Completed ✓' : 'Complete Step'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div class="text-center text-gray-500 py-12 border-2 border-dashed border-gray-200 rounded-lg">
            Select a platform above to see the configuration steps
          </div>
        )}
      </div>

      {/* Debug info */}
      <details class="border rounded p-4 bg-gray-50">
        <summary class="cursor-pointer font-medium">Debug Information</summary>
        <div class="mt-3 text-sm space-y-2">
          <div><strong>Context:</strong> {JSON.stringify(buildContext(), null, 2)}</div>
          <div><strong>Total Step Definitions:</strong> {stepDefinitions.length}</div>
          <div><strong>Total Flows:</strong> {flowDefinitions.length}</div>
        </div>
      </details>
    </div>
  );
});