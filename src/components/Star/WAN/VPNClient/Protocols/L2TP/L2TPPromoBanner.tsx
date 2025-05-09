import { component$, type QRL } from "@builder.io/qwik";
import type { L2TPCredentials } from "~/utils/supabaseClient";
import { useL2TPPromoBanner } from "./useL2TPPromoBanner";
import { ErrorMessage } from "~/components/Core";

interface L2TPPromoBannerProps {
  onCredentialsReceived$: QRL<(credentials: L2TPCredentials) => void>;
}

declare global {
  interface Window {
    onCaptchaLoaded: () => void;
    onCaptchaSuccess: (token: string) => void;
    onCaptchaExpired: () => void;
    onCaptchaError: () => void;
    grecaptcha: any;
  }
}

export const L2TPPromoBanner = component$<L2TPPromoBannerProps>(
  ({ onCredentialsReceived$ }) => {
    const {
      isLoading,
      hasError,
      errorMessage,
      captchaToken,
      requestCredentials$
    } = useL2TPPromoBanner(onCredentialsReceived$);
    
    return (
      <div class="mb-6 bg-gradient-to-r from-primary-600/5 to-primary-400/10 dark:from-primary-800/20 dark:to-primary-600/30 rounded-xl overflow-hidden shadow-lg border border-primary-200 dark:border-primary-800 backdrop-blur-sm">
        <div class="p-5">
          {/* Promotional content with feature highlights */}
          <div class="flex flex-col lg:flex-row items-center gap-6">
            <div class="flex-1 flex items-center">
              {/* VPN Security Icon */}
              <div class="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-inner p-3 mr-4 text-white">
                <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              
              {/* Promotional Text and Feature List */}
              <div>
                <div class="flex items-center">
                  <h3 class="text-lg sm:text-xl font-bold text-text-default dark:text-text-dark-default">
                    6 Months FREE VPN Access
                  </h3>
                </div>
                <p class="mt-1 text-sm text-text-muted dark:text-text-dark-muted max-w-lg">
                  Get instantly configured L2TP credentials for secure and private browsing. No registration required.
                </p>
                
                {/* Feature Highlights */}
                <ul class="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-text-muted dark:text-text-dark-muted">
                  <li class="flex items-center">
                    <svg class="h-3.5 w-3.5 text-green-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited bandwidth
                  </li>
                  <li class="flex items-center">
                    <svg class="h-3.5 w-3.5 text-green-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    No throttling
                  </li>
                  <li class="flex items-center">
                    <svg class="h-3.5 w-3.5 text-green-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Global servers
                  </li>
                  <li class="flex items-center">
                    <svg class="h-3.5 w-3.5 text-green-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Auto-configuration
                  </li>
                </ul>
              </div>
            </div>
            
            {/* reCAPTCHA and Action Button */}
            <div class="flex-shrink-0 flex flex-col items-center gap-3 w-full sm:w-auto">
              {/* reCAPTCHA container */}
              <div id="recaptcha-container" class="mx-auto"></div>
              
              {/* Get Credentials Button */}
              <button 
                onClick$={requestCredentials$}
                disabled={isLoading.value || !captchaToken.value}
                class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg
                       bg-gradient-to-r from-primary-600 to-primary-500 text-white font-medium
                       shadow-lg hover:shadow-xl hover:from-primary-700 hover:to-primary-600 
                       focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                       transition-all duration-200 transform hover:-translate-y-0.5
                       disabled:opacity-70 disabled:pointer-events-none"
                aria-label="Get Free VPN Credentials"
              >
                {isLoading.value ? (
                  <div class="flex items-center">
                    {/* Loading spinner */}
                    <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div class="flex items-center">
                    <span>Get Free Credentials</span>
                    {/* Arrow icon */}
                    <svg class="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </div>
                )}
              </button>
            </div>
          </div>
          
          {/* Error Message Display */}
          {hasError.value && (
            <ErrorMessage 
              message={errorMessage.value} 
              title={$localize`Credential Request Error`}
              class="mt-4"
            />
          )}
        </div>
      </div>
    );
  }
); 