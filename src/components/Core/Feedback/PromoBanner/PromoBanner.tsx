import { component$ } from "@builder.io/qwik";
import type { PromoBannerProps } from './PromoBanner.types';
import { usePromoBanner } from './usePromoBanner';

/**
 * PromoBanner component for displaying promotional content with optional action.
 * 
 * @example
 * ```tsx
 * <PromoBanner
 *   title="Get 30 days free VPN!"
 *   description="Sign up today to receive a month of premium VPN service at no cost."
 *   provider="ExpressVPN"
 *   imageUrl="/images/vpn-promo.jpg"
 *   onCredentialsReceived$={handleCredentials}
 * />
 * ```
 */
export const PromoBanner = component$<PromoBannerProps>(({
  title,
  description,
  provider,
  imageUrl,
  bgColorClass = "bg-secondary-500/10",
  onCredentialsReceived$,
  class: className,
}) => {
  // Use the hook to manage state and credentials
  const { loading, success, getCredentials$ } = usePromoBanner({
    onCredentialsReceived$
  });

  return (
    <div class={`rounded-lg overflow-hidden ${bgColorClass} ${className || ""}`}>
      <div class="flex flex-col md:flex-row items-center">
        {imageUrl && (
          <div class="w-full md:w-1/3 p-4">
            <img 
              src={imageUrl} 
              alt={`${provider} VPN`}
              class="w-full h-auto rounded"
            />
          </div>
        )}
        
        <div class={`p-6 flex-1 ${!imageUrl ? 'w-full' : ''}`}>
          <h3 class="text-lg font-bold text-text-default dark:text-text-dark-default">
            {title}
          </h3>
          
          <p class="mt-2 text-text-secondary dark:text-text-dark-secondary">
            {description}
          </p>
          
          {onCredentialsReceived$ && !success.value && (
            <button
              onClick$={getCredentials$}
              class="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg 
                hover:bg-primary-600 transition-colors"
              disabled={loading.value}
            >
              {loading.value ? $localize`Loading...` : $localize`Get Free Access`}
            </button>
          )}
          
          {success.value && (
            <div class="mt-4 px-4 py-2 bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300 rounded-lg">
              {$localize`Credentials sent! Check your account.`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}); 