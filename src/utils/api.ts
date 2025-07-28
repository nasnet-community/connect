/**
 * API Utilities - Main Module
 *
 * Re-exports all functionality from specialized modules for backward compatibility
 */

// ===== EXTERNAL API SERVICES =====
export { generatePasswordFromAPI, generateSSIDFromAPI } from "./apiServices";

// ===== NEWSLETTER API =====
export type {
  NewsletterSubscriptionRequest,
  NewsletterSubscriptionResponse,
} from "./newsletterAPI";

export {
  subscribeToNewsletter,
  validateEmail as validateEmailNewsletter,
} from "./newsletterAPI";

// ===== FINGERPRINTING & UUID GENERATION =====
export {
  generateUserUUID,
  clearStoredUUID,
  getStoredUUID,
  getSecurityInfo,
  forceRegenerateUUID,
} from "./fingerprinting";

// ===== SECURITY DETECTION =====
export {
  detectSuspiciousEnvironment,
  verifyApplicationEnvironment,
} from "./securityDetection";

// ===== VALIDATION UTILITIES =====
export { checkClientRateLimit, validateEmail } from "./validation";

// ===== SUPABASE CLIENT UTILITIES =====
export type {
  L2TPCredentials,
  L2TPCredentialsResponse,
} from "./supabaseClient";

export {
  getL2TPCredentials,
  getReferrerFromURL,
  getOrCreateSessionId,
  formatExpiryDate,
} from "./supabaseClient";

// ===== AUTHENTICATION UTILITIES =====
export type { AuthState } from "./auth";

export {
  getSupabaseClient,
  getSupabaseServiceClient,
  checkAuth,
  requireAuth,
} from "./auth";
