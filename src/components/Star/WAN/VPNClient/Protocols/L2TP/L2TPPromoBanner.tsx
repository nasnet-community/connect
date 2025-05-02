import { component$, $, type QRL, useSignal } from "@builder.io/qwik";
import {
  getL2TPCredentials,
  getReferrerFromURL,
  getPlatformInfo,
  type L2TPCredentials
} from "~/utils/supabaseClient";

interface L2TPPromoBannerProps {
  onCredentialsReceived$: QRL<(credentials: L2TPCredentials) => void>;
}

export const L2TPPromoBanner = component$<L2TPPromoBannerProps>(
  ({ onCredentialsReceived$ }) => {
    const isLoading = useSignal(false);
    const hasError = useSignal(false);
    const errorMessage = useSignal("");
    
    const requestCredentials = $(async () => {
      isLoading.value = true;
      hasError.value = false;
      errorMessage.value = "";
      
      try {
        // Get referrer from URL params
        const referrer = getReferrerFromURL();
        
        // Get platform info
        const platform = getPlatformInfo();
        
        // Call Supabase Edge Function
        const response = await getL2TPCredentials(platform, referrer);
        
        if (!response.success || !response.credentials) {
          throw new Error(response.error || "Failed to get credentials");
        }
        
        // Call the provided callback with the credentials
        await onCredentialsReceived$(response.credentials);
        
      } catch (err) {
        hasError.value = true;
        errorMessage.value = err instanceof Error 
          ? err.message 
          : "An unexpected error occurred";
      } finally {
        isLoading.value = false;
      }
    });
    
    return (
      <div class="mb-6 rounded-lg border-2 border-dashed border-primary-500 overflow-hidden">
        <div class="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/40 p-5">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center">
              <div class="rounded-full bg-primary-100 p-3 mr-3 dark:bg-primary-900">
                <svg class="h-6 w-6 text-primary-600 dark:text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-text-default dark:text-text-dark-default">
                  6 Months FREE VPN Access
                </h3>
                <p class="text-sm text-text-muted dark:text-text-dark-muted">
                  Get auto-configured L2TP credentials for your OpenWRT router
                </p>
              </div>
            </div>
            
            <button 
              onClick$={requestCredentials}
              disabled={isLoading.value}
              class="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-primary-600 text-white 
                     font-medium shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 
                     focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-150
                     disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading.value ? (
                <>
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  Get Free Credentials
                  <svg class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </>
              )}
            </button>
          </div>
          
          {hasError.value && (
            <div class="mt-3 p-3 bg-red-100 text-red-700 rounded-lg dark:bg-red-900/40 dark:text-red-300">
              <p class="text-sm">{errorMessage.value}</p>
              <p class="text-xs mt-1">Please try again or configure manually below.</p>
            </div>
          )}
        </div>
      </div>
    );
  }
); 