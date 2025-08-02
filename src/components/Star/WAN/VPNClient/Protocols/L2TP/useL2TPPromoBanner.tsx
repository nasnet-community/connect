import { $, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import {
  getL2TPCredentials,
  getReferrerFromURL,
  getOrCreateSessionId,
  type L2TPCredentials,
} from "~/utils/supabaseClient";

declare global {
  interface Window {
    onCaptchaLoaded: () => void;
    onCaptchaSuccess: (token: string) => void;
    onCaptchaExpired: () => void;
    onCaptchaError: () => void;
    grecaptcha: any;
  }
}

export interface UseL2TPPromoBannerResult {
  isLoading: { value: boolean };
  hasError: { value: boolean };
  errorMessage: { value: string };
  captchaToken: { value: string };
  isCaptchaLoaded: { value: boolean };
  captchaWidgetId: { value: number | null };
  requestCredentials$: QRL<() => Promise<void>>;
}

export const useL2TPPromoBanner = (
  onCredentialsReceived$: QRL<(credentials: L2TPCredentials) => void>,
): UseL2TPPromoBannerResult => {
  const isLoading = useSignal(false);
  const hasError = useSignal(false);
  const errorMessage = useSignal("");
  const captchaToken = useSignal("");
  const isCaptchaLoaded = useSignal(false);
  const captchaWidgetId = useSignal<number | null>(null);

  useVisibleTask$(() => {
    window.onCaptchaLoaded = () => {
      console.log("reCAPTCHA loaded");
      isCaptchaLoaded.value = true;

      if (window.grecaptcha && !captchaWidgetId.value) {
        captchaWidgetId.value = window.grecaptcha.render(
          "recaptcha-container",
          {
            sitekey: import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY,
            callback: "onCaptchaSuccess",
            "expired-callback": "onCaptchaExpired",
            "error-callback": "onCaptchaError",
          },
        );
      }
    };

    window.onCaptchaSuccess = (token: string) => {
      console.log("reCAPTCHA success");
      captchaToken.value = token;
    };

    window.onCaptchaExpired = () => {
      console.log("reCAPTCHA expired");
      captchaToken.value = "";
    };

    window.onCaptchaError = () => {
      console.log("reCAPTCHA error");
      captchaToken.value = "";
    };

    const script = document.createElement("script");
    script.src =
      "https://www.google.com/recaptcha/api.js?onload=onCaptchaLoaded&render=explicit";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      window.onCaptchaLoaded = () => {};
      window.onCaptchaSuccess = () => {};
      window.onCaptchaExpired = () => {};
      window.onCaptchaError = () => {};
    };
  });

  const validateCaptcha = $(async (token: string): Promise<boolean> => {
    if (!token) return false;

    try {
      const usedTokens = sessionStorage.getItem("usedCaptchaTokens")
        ? JSON.parse(sessionStorage.getItem("usedCaptchaTokens") || "[]")
        : [];

      if (usedTokens.includes(token)) {
        console.error("Token already used");
        return false;
      }

      usedTokens.push(token);
      sessionStorage.setItem("usedCaptchaTokens", JSON.stringify(usedTokens));

      return true;
    } catch (error) {
      console.error("Error validating captcha:", error);
      return false;
    }
  });

  const requestCredentials$ = $(async () => {
    if (!captchaToken.value) {
      errorMessage.value = "Please complete the CAPTCHA verification first";
      hasError.value = true;
      return;
    }

    const isValidCaptcha = await validateCaptcha(captchaToken.value);
    if (!isValidCaptcha) {
      errorMessage.value = "CAPTCHA validation failed. Please try again.";
      hasError.value = true;

      if (window.grecaptcha && captchaWidgetId.value !== null) {
        window.grecaptcha.reset(captchaWidgetId.value);
        captchaToken.value = "";
      }
      return;
    }

    isLoading.value = true;
    hasError.value = false;
    errorMessage.value = "";

    try {
      console.log("Requesting L2TP credentials...");

      const referrer = getReferrerFromURL();
      console.log("Referrer:", referrer);

      const platform = "NNC";
      console.log("Platform:", platform);

      const sessionId = getOrCreateSessionId();
      console.log("Session ID:", sessionId);

      const response = await getL2TPCredentials(platform, referrer, sessionId);
      console.log("Response from server:", response);

      if (!response.success || !response.credentials) {
        throw new Error(
          response.error ||
            response.error_detail ||
            "Failed to get credentials",
        );
      }

      const completeCredentials: L2TPCredentials = {
        id: response.request_id || crypto.randomUUID(),
        username: response.credentials.username,
        password: response.credentials.password,
        server: response.credentials.server,
        created_at: new Date().toISOString(),
        expiry_date: response.credentials.expiry_date,
        platform,
        referrer,
        session_id: sessionId,
      };

      console.log("Credentials processed successfully");

      await onCredentialsReceived$(completeCredentials);

      if (window.grecaptcha && captchaWidgetId.value !== null) {
        window.grecaptcha.reset(captchaWidgetId.value);
        captchaToken.value = "";
      }
    } catch (err) {
      console.error("L2TP credentials error:", err);
      hasError.value = true;

      if (err instanceof Error) {
        if (err.message.includes("Failed to fetch")) {
          errorMessage.value =
            "Network error: Unable to connect to the VPN service. Please check your internet connection.";
        } else if (
          err.message.includes("Bad Request") ||
          err.message.includes("400")
        ) {
          errorMessage.value =
            "Invalid request: The server couldn't process your request. This might be a temporary issue. Please try again later.";
        } else if (err.message.includes("no_credentials_available")) {
          errorMessage.value =
            "No VPN credentials are currently available. Please try again later.";
        } else {
          errorMessage.value = err.message;
        }
      } else {
        errorMessage.value = "An unexpected error occurred";
      }
    } finally {
      isLoading.value = false;
    }
  });

  return {
    isLoading,
    hasError,
    errorMessage,
    captchaToken,
    isCaptchaLoaded,
    captchaWidgetId,
    requestCredentials$,
  };
};
