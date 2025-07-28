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
