import { component$, useSignal, $ } from "@builder.io/qwik";
import { Switch } from "~/components/Core/Switch";

export const FormIntegrationSwitch = component$(() => {
  const newsletter = useSignal(true);
  const notifications = useSignal(false);
  const marketing = useSignal(false);
  const twoFactor = useSignal(true);
  const publicProfile = useSignal(false);
  
  const formData = useSignal<Record<string, boolean>>({});
  const isSubmitted = useSignal(false);

  const handleSubmit$ = $((e: Event) => {
    e.preventDefault();
    formData.value = {
      newsletter: newsletter.value,
      notifications: notifications.value,
      marketing: marketing.value,
      twoFactor: twoFactor.value,
      publicProfile: publicProfile.value,
    };
    isSubmitted.value = true;
    
    // Reset after 3 seconds
    setTimeout(() => {
      isSubmitted.value = false;
    }, 3000);
  });

  return (
    <div class="space-y-6">
      <form onSubmit$={handleSubmit$} class="space-y-6">
        <div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h3 class="mb-4 text-lg font-semibold">Email Preferences</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex-1 pr-4">
                <label class="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Newsletter
                </label>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Receive our weekly newsletter with updates and tips
                </p>
              </div>
              <Switch
                checked={newsletter.value}
                onChange$={(checked) => (newsletter.value = checked)}
                name="newsletter"
                value="yes"
                aria-describedby="newsletter-description"
              />
            </div>

            <div class="flex items-center justify-between">
              <div class="flex-1 pr-4">
                <label class="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Push Notifications
                </label>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Get notified about important updates
                </p>
              </div>
              <Switch
                checked={notifications.value}
                onChange$={(checked) => (notifications.value = checked)}
                name="notifications"
                value="yes"
              />
            </div>

            <div class="flex items-center justify-between">
              <div class="flex-1 pr-4">
                <label class="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Marketing Emails
                </label>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Receive promotional offers and product updates
                </p>
              </div>
              <Switch
                checked={marketing.value}
                onChange$={(checked) => (marketing.value = checked)}
                name="marketing"
                value="yes"
              />
            </div>
          </div>
        </div>

        <div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h3 class="mb-4 text-lg font-semibold">Security Settings</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex-1 pr-4">
                <label class="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Two-Factor Authentication
                  <span class="ml-1 text-xs text-success-600 dark:text-success-400">
                    Recommended
                  </span>
                </label>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch
                checked={twoFactor.value}
                onChange$={(checked) => (twoFactor.value = checked)}
                name="twoFactor"
                value="yes"
                trackClass={twoFactor.value ? "!bg-success-500 dark:!bg-success-600" : ""}
              />
            </div>

            <div class="flex items-center justify-between">
              <div class="flex-1 pr-4">
                <label class="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Public Profile
                </label>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Make your profile visible to other users
                </p>
              </div>
              <Switch
                checked={publicProfile.value}
                onChange$={(checked) => (publicProfile.value = checked)}
                name="publicProfile"
                value="yes"
              />
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-500"
          >
            Save Preferences
          </button>
          
          {isSubmitted.value && (
            <span class="text-sm text-success-600 dark:text-success-400">
              ✓ Settings saved successfully!
            </span>
          )}
        </div>
      </form>

      {isSubmitted.value && (
        <div class="rounded-lg bg-gray-100 p-4 dark:bg-gray-900">
          <h4 class="mb-2 text-sm font-semibold">Form Data:</h4>
          <pre class="text-xs">
            <code>{JSON.stringify(formData.value, null, 2)}</code>
          </pre>
        </div>
      )}

      <div class="text-sm text-gray-600 dark:text-gray-400">
        <p class="font-medium mb-2">Form Integration Features:</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>Each switch has a <code class="text-xs bg-gray-200 dark:bg-gray-700 px-1 rounded">name</code> attribute for form submission</li>
          <li>Values are submitted as part of the form data</li>
          <li>Works with native form validation</li>
          <li>Accessible labels and descriptions</li>
          <li>Visual feedback for recommended settings</li>
        </ul>
      </div>
    </div>
  );
});