/**
 * Newsletter Subscription API
 *
 * Handles newsletter subscription functionality with Supabase Edge Functions
 */

// Environment variables
const SUPABASE_BASE_URL = import.meta.env.VITE_SUPABASE_BASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const NEWSLETTER_FUNCTION_PATH =
  import.meta.env.VITE_NEWSLETTER_FUNCTION_PATH || "/functions/v1/newsletter";
const REQUEST_TIMEOUT = parseInt(
  import.meta.env.VITE_API_TIMEOUT || "30000",
  10,
);

// Newsletter subscription interfaces
export interface NewsletterSubscriptionRequest {
  email: string;
  userUUID: string;
}

export interface NewsletterSubscriptionResponse {
  success: boolean;
  message?: string;
  error?: string;
  error_detail?: string;
}

export async function subscribeToNewsletter(
  email: string,
  userUUID: string,
): Promise<NewsletterSubscriptionResponse> {
  try {
    if (!SUPABASE_BASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error("Supabase configuration not found");
    }

    const url = `${SUPABASE_BASE_URL}${NEWSLETTER_FUNCTION_PATH}`;

    const requestBody: NewsletterSubscriptionRequest = {
      email: email.toLowerCase().trim(),
      userUUID,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const responseText = await response.text();

    if (!response.ok) {
      if (response.status === 429) {
        // Rate limited
        return {
          success: false,
          error: "Too many requests",
          error_detail: "Please wait before trying again",
        };
      }
      if (response.status === 403) {
        // Unauthorized
        return {
          success: false,
          error: "Request blocked",
          error_detail: "Request was blocked by security policies",
        };
      }
      // All other errors return generic message
      return {
        success: false,
        error: "Subscription failed",
        error_detail: "Please try again later",
      };
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      return {
        success: false,
        error: "Subscription failed",
        error_detail: "Invalid server response",
      };
    }

    return data;
  } catch (error: unknown) {
    return {
      success: false,
      error: "Subscription failed",
      error_detail: "Please try again later",
    };
  }
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254 && email.length >= 5;
}

/**
 * Twilio SendGrid Newsletter Subscription
 * 
 * Subscribes an email to the newsletter using Twilio SendGrid API.
 * This function calls the server-side API endpoint that handles SendGrid integration.
 */

export interface SendGridSubscriptionRequest {
  email: string;
  firstName?: string;
  lastName?: string;
  source?: string;
}

export interface SendGridSubscriptionResponse {
  success: boolean;
  message?: string;
  jobId?: string;
  error?: string;
  details?: string;
}

/**
 * Subscribe to newsletter using Twilio SendGrid
 * 
 * @param email - Email address to subscribe
 * @param options - Optional subscriber information
 * @returns Promise with subscription response
 * 
 * @example
 * ```typescript
 * const result = await subscribeToNewsletterSendGrid('user@example.com', {
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   source: 'homepage-newsletter'
 * });
 * ```
 */
export async function subscribeToNewsletterSendGrid(
  email: string,
  options?: Omit<SendGridSubscriptionRequest, 'email'>
): Promise<SendGridSubscriptionResponse> {
  try {
    // Validate email
    if (!validateEmail(email)) {
      return {
        success: false,
        error: "Invalid email address",
        details: "Please enter a valid email address",
      };
    }

    // Prepare request body
    const requestBody: SendGridSubscriptionRequest = {
      email: email.toLowerCase().trim(),
      ...options,
    };

    // In development mode, simulate success if API is not available
    // Temporarily disabled to test actual SendGrid API
    // if (import.meta.env.DEV) {
    //   console.log("Development mode: Simulating newsletter subscription for:", email);
    //   // Simulate a short delay like a real API call
    //   await new Promise(resolve => setTimeout(resolve, 1000));
    //   return {
    //     success: true,
    //     message: "Successfully subscribed to newsletter (dev mode)",
    //     jobId: "dev-" + Date.now(),
    //   };
    // }

    // Call the server-side API endpoint
    console.log("SendGrid API Request:", {
      url: "/api/newsletter/subscribe",
      method: "POST",
      body: requestBody,
    });

    const response = await fetch("/api/newsletter/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    // Check if response is ok before trying to parse JSON
    if (!response.ok) {
      // Try to parse error response, but handle if it's not JSON
      let errorData: SendGridSubscriptionResponse | null = null;
      try {
        errorData = await response.json() as SendGridSubscriptionResponse;
      } catch {
        // Response is not JSON
        console.warn("API response is not JSON");
      }

      return {
        success: false,
        error: errorData?.error || "Subscription failed",
        details: errorData?.details || `Server error: ${response.status}`,
      };
    }

    // Parse successful response
    const data = await response.json() as SendGridSubscriptionResponse;
    console.log("SendGrid subscription successful! Job ID:", data.jobId);
    return data;
  } catch (error) {
    console.error("Newsletter subscription error:", error);

    // Check if it's a network error (endpoint not found)
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        success: false,
        error: "Service unavailable",
        details: "Newsletter service is currently unavailable. Please try again later.",
      };
    }

    return {
      success: false,
      error: "Network error",
      details: "Please check your connection and try again",
    };
  }
}
