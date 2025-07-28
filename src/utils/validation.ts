/**
 * Validation Utilities
 *
 * Contains validation functions and utility helpers
 */

// Environment variables
const ENABLE_RATE_LIMITING =
  import.meta.env.VITE_ENABLE_RATE_LIMITING === "true";
const RATE_LIMIT_WINDOW = parseInt(
  import.meta.env.VITE_RATE_LIMIT_WINDOW || "30000",
  10,
);
const EMAIL_MAX_LENGTH = parseInt(
  import.meta.env.VITE_EMAIL_MAX_LENGTH || "254",
  10,
);
const EMAIL_MIN_LENGTH = parseInt(
  import.meta.env.VITE_EMAIL_MIN_LENGTH || "5",
  10,
);

// Client-side rate limiting - configurable via environment
export function checkClientRateLimit(): boolean {
  if (!ENABLE_RATE_LIMITING) {
    return true;
  }

  const lastSubmission = localStorage.getItem("last_submission_time");
  const now = Date.now();

  if (lastSubmission) {
    const timeSinceLastSubmission = now - parseInt(lastSubmission, 10);
    if (timeSinceLastSubmission < RATE_LIMIT_WINDOW) {
      return false;
    }
  }

  localStorage.setItem("last_submission_time", now.toString());
  return true;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return (
    emailRegex.test(email) &&
    email.length <= EMAIL_MAX_LENGTH &&
    email.length >= EMAIL_MIN_LENGTH
  );
}
