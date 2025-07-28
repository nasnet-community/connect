import { component$, useSignal, $ } from "@builder.io/qwik";
import { ConfigFileInput, VPNConfigFileSection } from "../index";

export default component$(() => {
  const mobileConfig = useSignal("");
  const tabletConfig = useSignal("");
  const desktopConfig = useSignal("");
  const adaptiveConfig = useSignal("");
  const currentViewport = useSignal<"mobile" | "tablet" | "desktop">("desktop");

  const handleConfigChange = $((section: string, value: string) => {
    switch (section) {
      case "mobile":
        mobileConfig.value = value;
        break;
      case "tablet":
        tabletConfig.value = value;
        break;
      case "desktop":
        desktopConfig.value = value;
        break;
      case "adaptive":
        adaptiveConfig.value = value;
        break;
    }
  });

  const handleFileUpload = $((section: string, event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        handleConfigChange(section, content);
      };
      reader.readAsText(file);
    }
  });

  const loadSampleConfig = $((section: string) => {
    const sampleConfig = `# Sample VPN Configuration for ${section}
[Interface]
PrivateKey = sample-private-key-for-${section}
Address = 10.0.0.2/32
DNS = 1.1.1.1

[Peer]
PublicKey = sample-public-key-for-${section}
Endpoint = ${section}-vpn.example.com:51820
AllowedIPs = 0.0.0.0/0
PersistentKeepalive = 25`;
    
    handleConfigChange(section, sampleConfig);
  });

  return (
    <div class="space-y-8">
      {/* Header */}
      <div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Responsive Layout Examples
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          These examples demonstrate how the FileInput components adapt to different screen sizes and devices.
        </p>
        
        {/* Viewport Simulator */}
        <div class="mt-4">
          <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Simulate viewport:
          </label>
          <div class="flex gap-2">
            {(["mobile", "tablet", "desktop"] as const).map((viewport) => (
              <button
                key={viewport}
                onClick$={() => (currentViewport.value = viewport)}
                class={`rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  currentViewport.value === viewport
                    ? "border-primary-500 bg-primary-50 text-primary-700 dark:border-primary-400 dark:bg-primary-950/20 dark:text-primary-300"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-700"
                }`}
              >
                {viewport.charAt(0).toUpperCase() + viewport.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <div class="mb-4 flex items-center justify-between">
          <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100">
            Mobile Layout (320px - 767px)
          </h4>
          <button
            onClick$={() => loadSampleConfig("mobile")}
            class="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Load Sample
          </button>
        </div>
        
        <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Optimized for touch interactions with larger buttons and simplified layout.
        </div>

        {/* Mobile viewport simulation */}
        <div class={`mx-auto transition-all duration-300 ${
          currentViewport.value === "mobile" 
            ? "max-w-sm border-2 border-primary-200 dark:border-primary-800" 
            : "max-w-none"
        }`}>
          <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
            <ConfigFileInput
              config={mobileConfig.value}
              onConfigChange$={(value) => handleConfigChange("mobile", value)}
              onFileUpload$={(event) => handleFileUpload("mobile", event)}
              vpnType="Wireguard"
              placeholder="Mobile-optimized placeholder text..."
              class="mobile-layout"
            />
          </div>
        </div>

        {/* Mobile-specific features */}
        <div class="mt-4 grid gap-2 text-xs text-gray-500 dark:text-gray-400">
          <div class="flex items-center">
            <svg class="mr-2 h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            Touch-optimized button sizes (min 44px height)
          </div>
          <div class="flex items-center">
            <svg class="mr-2 h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            Stacked vertical layout for narrow screens
          </div>
          <div class="flex items-center">
            <svg class="mr-2 h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            Larger text areas for easier typing
          </div>
        </div>
      </div>

      {/* Tablet Layout */}
      <div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <div class="mb-4 flex items-center justify-between">
          <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100">
            Tablet Layout (768px - 1023px)
          </h4>
          <button
            onClick$={() => loadSampleConfig("tablet")}
            class="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Load Sample
          </button>
        </div>
        
        <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Balanced layout with some horizontal organization while maintaining touch-friendliness.
        </div>

        {/* Tablet viewport simulation */}
        <div class={`mx-auto transition-all duration-300 ${
          currentViewport.value === "tablet" 
            ? "max-w-2xl border-2 border-primary-200 dark:border-primary-800" 
            : "max-w-none"
        }`}>
          <div class="rounded-lg bg-gray-50 p-6 dark:bg-gray-900">
            <VPNConfigFileSection
              protocolName="WireGuard"
              acceptedExtensions=".conf"
              configValue={tabletConfig.value}
              onConfigChange$={(value) => handleConfigChange("tablet", value)}
              onFileUpload$={(event, _element) => handleFileUpload("tablet", event)}
              placeholder="Tablet-optimized placeholder with more detailed instructions..."
            />
          </div>
        </div>

        {/* Tablet-specific features */}
        <div class="mt-4 grid gap-2 text-xs text-gray-500 dark:text-gray-400">
          <div class="flex items-center">
            <svg class="mr-2 h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            Flexible row layout that adapts to available space
          </div>
          <div class="flex items-center">
            <svg class="mr-2 h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            Enhanced drag & drop area with better visual feedback
          </div>
          <div class="flex items-center">
            <svg class="mr-2 h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            Medium-sized controls balancing usability and space
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <div class="mb-4 flex items-center justify-between">
          <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100">
            Desktop Layout (1024px+)
          </h4>
          <button
            onClick$={() => loadSampleConfig("desktop")}
            class="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Load Sample
          </button>
        </div>
        
        <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Full-featured layout with horizontal organization and maximum screen real estate utilization.
        </div>

        {/* Desktop layout */}
        <div class={`transition-all duration-300 ${
          currentViewport.value === "desktop" 
            ? "border-2 border-primary-200 dark:border-primary-800 rounded-lg" 
            : ""
        }`}>
          <div class="rounded-lg bg-gray-50 p-6 dark:bg-gray-900">
            <div class="grid gap-6 lg:grid-cols-2">
              {/* Left column - Basic input */}
              <div>
                <h5 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Basic Input
                </h5>
                <ConfigFileInput
                  config={desktopConfig.value}
                  onConfigChange$={(value) => handleConfigChange("desktop", value)}
                  onFileUpload$={(event) => handleFileUpload("desktop", event)}
                  vpnType="OpenVPN"
                  placeholder="Desktop configuration with enhanced features..."
                />
              </div>

              {/* Right column - Advanced input */}
              <div>
                <h5 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Advanced Input with Drag & Drop
                </h5>
                <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-600">
                  <VPNConfigFileSection
                    protocolName="OpenVPN"
                    acceptedExtensions=".ovpn,.conf"
                    configValue={desktopConfig.value}
                    onConfigChange$={(value) => handleConfigChange("desktop", value)}
                    onFileUpload$={(event, _element) => handleFileUpload("desktop", event)}
                    placeholder="Desktop drag & drop area with full features..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop-specific features */}
        <div class="mt-4 grid gap-2 text-xs text-gray-500 dark:text-gray-400">
          <div class="flex items-center">
            <svg class="mr-2 h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            Multi-column layouts with side-by-side comparisons
          </div>
          <div class="flex items-center">
            <svg class="mr-2 h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            Keyboard shortcuts and enhanced accessibility
          </div>
          <div class="flex items-center">
            <svg class="mr-2 h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            Larger text areas and more detailed interfaces
          </div>
        </div>
      </div>

      {/* Adaptive Layout */}
      <div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <div class="mb-4 flex items-center justify-between">
          <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100">
            Adaptive Layout (Auto-Responsive)
          </h4>
          <button
            onClick$={() => loadSampleConfig("adaptive")}
            class="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Load Sample
          </button>
        </div>
        
        <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          This component automatically adapts to the current viewport size using CSS breakpoints.
          Resize your browser window to see the adaptive behavior.
        </div>

        <div class="rounded-lg bg-gray-50 p-6 dark:bg-gray-900">
          <VPNConfigFileSection
            protocolName="WireGuard"
            acceptedExtensions=".conf"
            configValue={adaptiveConfig.value}
            onConfigChange$={(value) => handleConfigChange("adaptive", value)}
            onFileUpload$={(event, _element) => handleFileUpload("adaptive", event)}
            placeholder="This input adapts automatically to your screen size. Try resizing your browser window to see the responsive behavior in action..."
          />
        </div>

        {/* Breakpoint indicators */}
        <div class="mt-4 grid gap-2 md:grid-cols-3">
          <div class="rounded-md bg-red-50 p-3 dark:bg-red-950/20 sm:hidden">
            <div class="text-xs font-medium text-red-800 dark:text-red-300">
              📱 Mobile View (&lt; 640px)
            </div>
            <div class="text-xs text-red-600 dark:text-red-400">
              Stacked layout, large touch targets
            </div>
          </div>
          
          <div class="hidden rounded-md bg-yellow-50 p-3 dark:bg-yellow-950/20 sm:block md:hidden">
            <div class="text-xs font-medium text-yellow-800 dark:text-yellow-300">
              📱 Tablet View (640px - 768px)
            </div>
            <div class="text-xs text-yellow-600 dark:text-yellow-400">
              Flexible layout, medium controls
            </div>
          </div>
          
          <div class="hidden rounded-md bg-green-50 p-3 dark:bg-green-950/20 md:block">
            <div class="text-xs font-medium text-green-800 dark:text-green-300">
              🖥️ Desktop View (768px+)
            </div>
            <div class="text-xs text-green-600 dark:text-green-400">
              Horizontal layout, full features
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Guidelines */}
      <div class="rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-950/20">
        <h4 class="mb-3 text-sm font-semibold text-blue-800 dark:text-blue-300">
          Responsive Design Guidelines
        </h4>
        
        <div class="grid gap-4 md:grid-cols-2">
          <div>
            <h5 class="mb-2 text-xs font-medium text-blue-700 dark:text-blue-400">
              Mobile First Approach
            </h5>
            <ul class="space-y-1 text-xs text-blue-600 dark:text-blue-500">
              <li>• Touch-optimized interactions</li>
              <li>• Minimum 44px touch targets</li>
              <li>• Simplified vertical layouts</li>
              <li>• Larger text and input areas</li>
            </ul>
          </div>
          
          <div>
            <h5 class="mb-2 text-xs font-medium text-blue-700 dark:text-blue-400">
              Progressive Enhancement
            </h5>
            <ul class="space-y-1 text-xs text-blue-600 dark:text-blue-500">
              <li>• Add horizontal layouts on larger screens</li>
              <li>• Enhanced drag & drop on desktop</li>
              <li>• More detailed interfaces with more space</li>
              <li>• Keyboard navigation support</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Configuration Comparison */}
      {(mobileConfig.value || tabletConfig.value || desktopConfig.value || adaptiveConfig.value) && (
        <div class="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
          <h4 class="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
            Configuration Comparison
          </h4>
          
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Mobile", config: mobileConfig.value },
              { name: "Tablet", config: tabletConfig.value },
              { name: "Desktop", config: desktopConfig.value },
              { name: "Adaptive", config: adaptiveConfig.value },
            ].map(({ name, config }) => (
              <div key={name} class="rounded-md border border-gray-200 bg-white p-3 dark:border-gray-600 dark:bg-gray-800">
                <div class="mb-2 flex items-center justify-between">
                  <h5 class="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {name}
                  </h5>
                  <span class={`inline-flex h-2 w-2 rounded-full ${
                    config ? "bg-green-400" : "bg-gray-300 dark:bg-gray-600"
                  }`} />
                </div>
                <div class="text-xs text-gray-500">
                  {config 
                    ? `${config.length} chars, ${config.split('\n').length} lines`
                    : "No configuration"
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});