import { component$, $, useSignal } from '@builder.io/qwik';
import { PromoBanner } from '~/components/Core/Feedback/PromoBanner';
import type { VPNCredentials } from '~/components/Core/Feedback/PromoBanner';

export const InteractivePromoBanner = component$(() => {
  const receivedCredentials = useSignal<VPNCredentials | null>(null);
  
  const handleCredentials = $((credentials: VPNCredentials) => {
    receivedCredentials.value = credentials;
  });
  
  return (
    <div class="space-y-4">
      <PromoBanner
        title="Get Free Wireguard VPN Access"
        description="Click the button below to receive your free VPN credentials. This special offer is available for a limited time!"
        provider="WireGuard"
        imageUrl="/images/vpn/wireguard-logo.png"
        onCredentialsReceived$={handleCredentials}
      />
      
      {receivedCredentials.value && (
        <div class="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h4 class="font-medium text-lg mb-2">Your VPN Credentials:</h4>
          <div class="space-y-1 text-sm">
            <p><strong>Server:</strong> {receivedCredentials.value.server}</p>
            <p><strong>Username:</strong> {receivedCredentials.value.username}</p>
            <p><strong>Password:</strong> {receivedCredentials.value.password}</p>
          </div>
        </div>
      )}
    </div>
  );
}); 