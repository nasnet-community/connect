import { component$, useSignal, $ } from '@builder.io/qwik';
import { PromoBanner } from '~/components/Core/Feedback/PromoBanner';
import type { VPNCredentials } from '~/components/Core/Feedback/PromoBanner/PromoBanner.types';

export default component$(() => {
  // Configuration states
  const title = useSignal("Get 30 days free VPN!");
  const description = useSignal("Sign up today to receive a month of premium VPN service at no cost.");
  const provider = useSignal("ExpressVPN");
  const showImage = useSignal(false);
  const customBgColor = useSignal(false);
  const enableCredentials = useSignal(false);
  
  // Dynamic states
  const credentials = useSignal<VPNCredentials | null>(null);
  
  // Handle credentials
  const handleCredentials = $((creds: VPNCredentials) => {
    credentials.value = creds;
  });
  
  // Background color options
  const bgColors = [
    { name: "Default (Light Blue)", value: "bg-secondary-500/10" },
    { name: "Green Gradient", value: "bg-gradient-to-r from-green-500/20 to-teal-500/20" },
    { name: "Blue Gradient", value: "bg-gradient-to-r from-blue-500/20 to-indigo-500/20" },
    { name: "Purple Gradient", value: "bg-gradient-to-r from-purple-500/20 to-pink-500/20" },
    { name: "Gray", value: "bg-gray-100 dark:bg-gray-800" }
  ];
  
  const selectedBgColor = useSignal(bgColors[0].value);
  
  // Provider options with image paths
  const providers = [
    { name: "ExpressVPN", imagePath: "/images/vpn/express-logo.png" },
    { name: "NordVPN", imagePath: "/images/vpn/nord-logo.png" },
    { name: "SurfShark", imagePath: "/images/vpn/surfshark-logo.png" },
    { name: "WireGuard", imagePath: "/images/vpn/wireguard-logo.png" }
  ];

  return (
    <div class="space-y-8">
      {/* Preview Area */}
      <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Preview</h2>
        
        <PromoBanner
          title={title.value}
          description={description.value}
          provider={provider.value}
          imageUrl={showImage.value ? 
            providers.find(p => p.name === provider.value)?.imagePath : 
            undefined}
          bgColorClass={customBgColor.value ? selectedBgColor.value : undefined}
          onCredentialsReceived$={enableCredentials.value ? handleCredentials : undefined}
        />
        
        {/* Show credentials if received */}
        {credentials.value && (
          <div class="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <h4 class="font-medium text-lg mb-2">Received Credentials:</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
              <div><strong>Server:</strong> {credentials.value.server}</div>
              <div><strong>Username:</strong> {credentials.value.username}</div>
              <div><strong>Password:</strong> {credentials.value.password}</div>
            </div>
          </div>
        )}
      </div>
      
      {/* Configuration Controls */}
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Configuration</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Content Configuration */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium">Content</h3>
            
            {/* Title */}
            <div>
              <label class="block text-sm font-medium mb-1">Title</label>
              <input 
                type="text" 
                value={title.value}
                onInput$={(e) => title.value = (e.target as HTMLInputElement).value}
                class="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            
            {/* Description */}
            <div>
              <label class="block text-sm font-medium mb-1">Description</label>
              <textarea 
                value={description.value}
                onInput$={(e) => description.value = (e.target as HTMLTextAreaElement).value}
                rows={3}
                class="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
              ></textarea>
            </div>
            
            {/* Provider */}
            <div>
              <label class="block text-sm font-medium mb-1">Provider</label>
              <select 
                value={provider.value}
                onChange$={(e) => provider.value = (e.target as HTMLSelectElement).value}
                class="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
              >
                {providers.map((p) => (
                  <option key={p.name} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Visual Configuration */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium">Appearance & Behavior</h3>
            
            {/* Show Image */}
            <div>
              <label class="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={showImage.value} 
                  onChange$={() => showImage.value = !showImage.value}
                />
                <span class="text-sm font-medium">Show Provider Image</span>
              </label>
            </div>
            
            {/* Custom Background */}
            <div class="space-y-2">
              <label class="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={customBgColor.value} 
                  onChange$={() => customBgColor.value = !customBgColor.value}
                />
                <span class="text-sm font-medium">Custom Background Color</span>
              </label>
              
              {customBgColor.value && (
                <div>
                  <select 
                    value={selectedBgColor.value}
                    onChange$={(e) => selectedBgColor.value = (e.target as HTMLSelectElement).value}
                    class="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 mt-2"
                  >
                    {bgColors.map((color) => (
                      <option key={color.value} value={color.value}>{color.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            
            {/* Enable Credentials */}
            <div>
              <label class="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={enableCredentials.value} 
                  onChange$={() => {
                    enableCredentials.value = !enableCredentials.value;
                    if (!enableCredentials.value) {
                      credentials.value = null;
                    }
                  }}
                />
                <span class="text-sm font-medium">Enable Credential Retrieval</span>
              </label>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-6">
                Adds a button to request VPN credentials
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Generated Code */}
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Generated Code</h2>
        <pre class="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto text-sm">
          {`import { component$ } from '@builder.io/qwik';
import { PromoBanner } from '~/components/Core/Feedback/PromoBanner';

export default component$(() => {
  return (
    <PromoBanner
      title="${title.value}"
      description="${description.value}"
      provider="${provider.value}"${showImage.value ? `
      imageUrl="${providers.find(p => p.name === provider.value)?.imagePath}"` : ''}${customBgColor.value ? `
      bgColorClass="${selectedBgColor.value}"` : ''}${enableCredentials.value ? `
      onCredentialsReceived$={(credentials) => {
        // Handle the received credentials
        console.log('Received credentials:', credentials);
      }}` : ''}
    />
  );
});`}
        </pre>
      </div>
    </div>
  );
}); 