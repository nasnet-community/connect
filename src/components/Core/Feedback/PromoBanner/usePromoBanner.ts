import { $, useSignal, useStore } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { VPNCredentials } from "./PromoBanner.types";

export interface UsePromoBannerParams {
  /** Callback when credentials are received */
  onCredentialsReceived$?: QRL<(credentials: VPNCredentials) => void>;
  /** Mock credentials for development/testing */
  mockCredentials?: VPNCredentials;
  /** Loading state - if true, shows loading indicator during credential fetch */
  initialLoading?: boolean;
}

export interface UsePromoBannerReturn {
  /** Loading state for credential fetch */
  loading: { value: boolean };
  /** Error state if credential fetch fails */
  error: { value: string | null };
  /** Success state when credentials are received */
  success: { value: boolean };
  /** Fetch credentials action */
  getCredentials$: QRL<() => Promise<VPNCredentials | undefined>>;
}

/**
 * Hook for managing promo banner state and credentials
 */
export function usePromoBanner({
  onCredentialsReceived$,
  mockCredentials = {
    server: "vpn.example.com",
    username: "demo_user",
    password: "demo_password",
  },
  initialLoading = false,
}: UsePromoBannerParams = {}): UsePromoBannerReturn {
  // State for the banner
  const loading = useSignal(initialLoading);
  const error = useSignal<string | null>(null);
  const success = useSignal(false);
  const credentials = useStore<VPNCredentials>(mockCredentials);

  // Fetch credentials
  const getCredentials$ = $(async (): Promise<VPNCredentials | undefined> => {
    // Reset states
    loading.value = true;
    error.value = null;
    success.value = false;

    try {
      // In a real application, this would make an API call
      // For this example, we'll use mock credentials after a short delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Invoke the callback with credentials
      if (onCredentialsReceived$) {
        await onCredentialsReceived$(credentials);
      }

      // Update states
      success.value = true;
      return credentials;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to get credentials";
      return undefined;
    } finally {
      loading.value = false;
    }
  });

  return {
    loading,
    error,
    success,
    getCredentials$,
  };
}
