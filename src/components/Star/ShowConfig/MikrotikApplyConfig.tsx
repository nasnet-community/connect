import { component$, useSignal, useContext, $ } from "@builder.io/qwik";
import { StarContext } from "../StarContext/StarContext";
import { ConfigGenerator } from "../ConfigGenerator/ConfigGenerator";


export const MikrotikApplyConfig = component$(() => {
  const ctx = useContext(StarContext);
  const routerIp = useSignal("");
  const username = useSignal("admin");
  const password = useSignal("");
  const isApplying = useSignal(false);
  const statusMessage = useSignal("");
  const showPassword = useSignal(false);
  const useHttps = useSignal(true);
  const applyMethod = useSignal<"direct" | "script">("script");
  const requiredServices = ["api", "www-ssl", "www"];
  
  const validateInput = $(() => {
    if (!routerIp.value) return "Router IP address is required";
    if (!username.value) return "Username is required";
    if (!password.value) return "Password is required";
    return null;
  });

  const applyConfig = $(async () => {
    const error = await validateInput();
    if (error) {
      statusMessage.value = error;
      return;
    }

    isApplying.value = true;
    statusMessage.value = "Connecting to router...";

    try {
      const protocol = useHttps.value ? "https" : "http";
      const baseUrl = `${protocol}://${routerIp.value}/rest`;
      const auth = btoa(`${username.value}:${password.value}`);
      const headers = {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      };

      if (applyMethod.value === "script") {
        await applyViaScript(baseUrl, headers);
      } else {
        await applyDirectly(baseUrl, headers);
      }
    } catch (error) {
      console.error("Error applying configuration:", error);
      statusMessage.value = `Failed to apply configuration: ${error instanceof Error ? error.message : String(error)}`;
    } finally {
      isApplying.value = false;
    }
  });


  const applyViaScript = $(async (baseUrl: string, headers: HeadersInit) => {
    const scriptContent = ConfigGenerator(ctx.state);
    
    statusMessage.value = "Creating configuration script on router...";
    
    const createScriptResponse = await fetch(`${baseUrl}/system/script`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        name: "apply_config",
        source: scriptContent,
        policy: "ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon"
      })
    });

    if (!createScriptResponse.ok) {
      const errorData = await createScriptResponse.json();
      throw new Error(`Failed to create script: ${errorData.message || createScriptResponse.statusText}`);
    }

    statusMessage.value = "Applying configuration...";
    const runScriptResponse = await fetch(`${baseUrl}/system/script/run`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        ".id": "apply_config"
      })
    });

    if (!runScriptResponse.ok) {
      const errorData = await runScriptResponse.json();
      throw new Error(`Failed to run script: ${errorData.message || runScriptResponse.statusText}`);
    }

    statusMessage.value = "Configuration successfully applied to router!";
  });


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const applyDirectly = $(async (_baseUrl: string, _headers: HeadersInit) => {
    statusMessage.value = "Direct API application is not yet implemented";
  });

  return (
    <div class="mt-6 rounded-xl bg-surface-secondary dark:bg-surface-dark-secondary overflow-hidden">
      <div class="border-b border-gray-200 bg-surface/50 p-6 dark:border-gray-700 dark:bg-surface-dark/50">
        <h4 class="flex items-center gap-3 text-xl font-semibold text-text dark:text-text-dark-default">
          <svg 
            class="h-6 w-6 text-primary" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M5 13l4 4L19 7" 
            />
          </svg>
          {$localize`Apply Configuration Directly`}
        </h4>
      </div>

      <div class="p-6 space-y-6">
        <div class="max-w-3xl">
          <div class="rounded-lg bg-surface p-6 shadow-sm dark:bg-surface-dark">
            <h5 class="text-primary mb-4 flex items-center gap-2 text-lg font-medium">
              <svg
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {$localize`Router Connection Details`}
            </h5>
            
            <div class="space-y-4 mb-6">
              <div>
                <label for="router-ip" class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary mb-1">
                  {$localize`Router IP Address`}
                </label>
                <input 
                  id="router-ip"
                  type="text" 
                  placeholder="192.168.1.1" 
                  value={routerIp.value}
                  onInput$={(e) => routerIp.value = (e.target as HTMLInputElement).value}
                  class="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-surface-dark-secondary dark:focus:border-primary"
                />
              </div>
              
              <div>
                <label for="username" class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary mb-1">
                  {$localize`Username`}
                </label>
                <input 
                  id="username"
                  type="text" 
                  value={username.value}
                  onInput$={(e) => username.value = (e.target as HTMLInputElement).value}
                  class="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-surface-dark-secondary dark:focus:border-primary"
                />
              </div>
              
              <div>
                <label for="password" class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary mb-1">
                  {$localize`Password`}
                </label>
                <div class="relative">
                  <input 
                    id="password"
                    type={showPassword.value ? "text" : "password"}
                    value={password.value}
                    onInput$={(e) => password.value = (e.target as HTMLInputElement).value}
                    class="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-surface-dark-secondary dark:focus:border-primary"
                  />
                  <button 
                    type="button"
                    onClick$={() => showPassword.value = !showPassword.value}
                    class="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <svg 
                      class="h-5 w-5 text-gray-400" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      {showPassword.value ? (
                        <path 
                          stroke-linecap="round" 
                          stroke-linejoin="round" 
                          stroke-width="2" 
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" 
                        />
                      ) : (
                        <path 
                          stroke-linecap="round" 
                          stroke-linejoin="round" 
                          stroke-width="2" 
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                        />
                      )}
                      {!showPassword.value && (
                        <path 
                          stroke-linecap="round" 
                          stroke-linejoin="round" 
                          stroke-width="2" 
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                        />
                      )}
                    </svg>
                  </button>
                </div>
              </div>
              
              <div class="flex items-center space-x-3">
                <div class="flex items-center">
                  <input
                    id="https"
                    type="radio"
                    checked={useHttps.value}
                    onClick$={() => useHttps.value = true}
                    class="h-4 w-4 text-primary focus:ring-primary"
                  />
                  <label for="https" class="ml-2 text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                    {$localize`HTTPS`}
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    id="http"
                    type="radio"
                    checked={!useHttps.value}
                    onClick$={() => useHttps.value = false}
                    class="h-4 w-4 text-primary focus:ring-primary"
                  />
                  <label for="http" class="ml-2 text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                    {$localize`HTTP`}
                  </label>
                </div>
              </div>

              <div class="flex items-center space-x-3">
                <div class="flex items-center">
                  <input
                    id="script-method"
                    type="radio"
                    checked={applyMethod.value === "script"}
                    onClick$={() => applyMethod.value = "script"}
                    class="h-4 w-4 text-primary focus:ring-primary"
                  />
                  <label for="script-method" class="ml-2 text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                    {$localize`Apply via Script`}
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    id="direct-method"
                    type="radio"
                    checked={applyMethod.value === "direct"}
                    onClick$={() => applyMethod.value = "direct"}
                    class="h-4 w-4 text-primary focus:ring-primary"
                  />
                  <label for="direct-method" class="ml-2 text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                    {$localize`Apply Directly (API)`}
                  </label>
                </div>
              </div>
            </div>

            <div class="mt-6 space-y-4">
              <div class="bg-amber-50 dark:bg-amber-900/30 border-l-4 border-amber-500 p-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm text-amber-800 dark:text-amber-200">
                      {$localize`Your router must have the following services enabled:`}
                    </p>
                    <ul class="mt-2 list-disc list-inside text-xs text-amber-700 dark:text-amber-300">
                      {requiredServices.map((service) => (
                        <li key={service}>{service}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <button
                onClick$={applyConfig}
                disabled={isApplying.value}
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isApplying.value ? (
                  <div class="flex items-center space-x-2">
                    <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{$localize`Applying Configuration...`}</span>
                  </div>
                ) : (
                  <span>{$localize`Apply Configuration to Router`}</span>
                )}
              </button>
              
              {statusMessage.value && (
                <div class={`mt-4 p-3 rounded-md text-sm ${
                  statusMessage.value.includes("success") 
                    ? "bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-200" 
                    : statusMessage.value.includes("Failed") || statusMessage.value.includes("Error")
                    ? "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                    : "bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                }`}>
                  {statusMessage.value}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}); 