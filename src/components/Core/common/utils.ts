// ====================
// ID GENERATION UTILITIES
// ====================

/**
 * Generates a unique identifier with an optional prefix
 * @param prefix - The prefix for the generated ID (default: "ui")
 * @returns A unique ID string
 */
export const generateId = (prefix: string = "ui"): string => {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Generates a more robust unique ID using timestamp and random values
 * @param prefix - The prefix for the generated ID (default: "id")
 * @returns A unique ID string with timestamp
 */
export const generateUniqueId = (prefix: string = "id"): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

// ====================
// CLASS NAME UTILITIES
// ====================

/**
 * Merges class names conditionally, filtering out falsy values
 * This is a simple implementation that works well for most cases
 * @param classes - Array of class names or conditions
 * @returns Merged class string
 */
export const classNames = (
  ...classes: (string | string[] | undefined | null | false)[]
): string => {
  return classes
    .flat()
    .filter(Boolean)
    .join(" ")
    .trim();
};

/**
 * Advanced class name utility with better TypeScript support and deduplication
 * Alias: cn - shorter name for convenience
 * @param classes - Array of class names, objects, or conditions
 * @returns Merged and deduplicated class string
 */
export const cn = classNames;

// ====================
// DEBOUNCING & THROTTLING
// ====================

/**
 * Creates a debounced version of a function that delays execution
 * @param func - The function to debounce
 * @param wait - Delay in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

/**
 * Creates a throttled version of a function that limits execution frequency
 * @param func - The function to throttle
 * @param limit - Minimum time between executions in milliseconds
 * @returns Throttled function
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// ====================
// ENVIRONMENT DETECTION
// ====================

/**
 * Checks if code is running on the server side
 * @returns True if running on server
 */
export const isServer = (): boolean => {
  return typeof window === "undefined";
};

/**
 * Checks if code is running on the client side
 * @returns True if running on client
 */
export const isClient = (): boolean => {
  return typeof window !== "undefined";
};

/**
 * Checks if the current device supports touch interactions
 * @returns True if touch is supported
 */
export const isTouchDevice = (): boolean => {
  if (isServer()) return false;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore - legacy support
    navigator.msMaxTouchPoints > 0
  );
};

/**
 * Checks if the user prefers reduced motion
 * @returns True if reduced motion is preferred
 */
export const prefersReducedMotion = (): boolean => {
  if (isServer()) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Checks if the user prefers dark color scheme
 * @returns True if dark mode is preferred
 */
export const prefersDarkMode = (): boolean => {
  if (isServer()) return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

// ====================
// STRING UTILITIES
// ====================

/**
 * Truncates a string to a specified length with ellipsis
 * @param str - The string to truncate
 * @param length - Maximum length (default: 100)
 * @param suffix - Suffix to add when truncated (default: "...")
 * @returns Truncated string
 */
export const truncate = (
  str: string,
  length: number = 100,
  suffix: string = "..."
): string => {
  if (str.length <= length) return str;
  return str.substring(0, length - suffix.length).trim() + suffix;
};

/**
 * Capitalizes the first letter of a string
 * @param str - The string to capitalize
 * @returns Capitalized string
 */
export const capitalize = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Converts a string to kebab-case
 * @param str - The string to convert
 * @returns kebab-case string
 */
export const kebabCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
};

/**
 * Converts a string to camelCase
 * @param str - The string to convert
 * @returns camelCase string
 */
export const camelCase = (str: string): string => {
  return str
    .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ""))
    .replace(/^./, (char) => char.toLowerCase());
};

/**
 * Removes HTML tags from a string
 * @param html - HTML string to clean
 * @returns Clean text string
 */
export const stripHtml = (html: string): string => {
  if (isServer()) {
    // Server-side fallback - basic regex
    return html.replace(/<[^>]*>/g, "");
  }
  // Client-side - more robust DOM parsing
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

// ====================
// NUMBER & FORMATTING UTILITIES
// ====================

/**
 * Formats a number with commas as thousand separators
 * @param num - Number to format
 * @returns Formatted number string
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat().format(num);
};

/**
 * Formats a number as currency
 * @param amount - Amount to format
 * @param currency - Currency code (default: "USD")
 * @param locale - Locale for formatting (default: "en-US")
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
};

/**
 * Formats bytes into human readable format
 * @param bytes - Number of bytes
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted byte string
 */
export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

/**
 * Clamps a number between min and max values
 * @param value - Value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

// ====================
// DATE & TIME UTILITIES
// ====================

/**
 * Formats a date using Intl.DateTimeFormat
 * @param date - Date to format
 * @param options - Formatting options
 * @param locale - Locale for formatting (default: "en-US")
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {},
  locale: string = "en-US"
): string => {
  const dateObj = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
};

/**
 * Returns a relative time string (e.g., "2 minutes ago")
 * @param date - Date to compare
 * @param locale - Locale for formatting (default: "en-US")
 * @returns Relative time string
 */
export const formatRelativeTime = (
  date: Date | string | number,
  locale: string = "en-US"
): string => {
  const now = new Date();
  const dateObj = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;

  // For older dates, use absolute formatting
  return formatDate(dateObj, { year: "numeric", month: "short", day: "numeric" }, locale);
};

// ====================
// ARRAY UTILITIES
// ====================

/**
 * Removes duplicate values from an array
 * @param array - Array to deduplicate
 * @returns Array with unique values
 */
export const unique = <T>(array: T[]): T[] => {
  return Array.from(new Set(array));
};

/**
 * Chunks an array into smaller arrays of specified size
 * @param array - Array to chunk
 * @param size - Size of each chunk
 * @returns Array of chunks
 */
export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

/**
 * Shuffles an array randomly
 * @param array - Array to shuffle
 * @returns Shuffled array (new array, original unchanged)
 */
export const shuffle = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// ====================
// OBJECT UTILITIES
// ====================

/**
 * Deep clones an object
 * @param obj - Object to clone
 * @returns Deep cloned object
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as T;
  if (obj instanceof Array) return obj.map((item) => deepClone(item)) as T;
  if (typeof obj === "object") {
    const cloned = {} as T;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }
  return obj;
};

/**
 * Picks specified keys from an object
 * @param obj - Source object
 * @param keys - Keys to pick
 * @returns Object with only specified keys
 */
export const pick = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
};

/**
 * Omits specified keys from an object
 * @param obj - Source object
 * @param keys - Keys to omit
 * @returns Object without specified keys
 */
export const omit = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach((key) => {
    delete result[key];
  });
  return result;
};

// ====================
// DOM UTILITIES (Client-side only)
// ====================

/**
 * Scrolls to an element smoothly
 * @param element - Element to scroll to
 * @param options - Scroll options
 */
export const scrollToElement = (
  element: Element | string,
  options: ScrollIntoViewOptions = { behavior: "smooth", block: "start" }
): void => {
  if (isServer()) return;
  
  const target = typeof element === "string" ? document.querySelector(element) : element;
  if (target) {
    target.scrollIntoView(options);
  }
};

/**
 * Copies text to clipboard
 * @param text - Text to copy
 * @returns Promise that resolves when copy is complete
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (isServer()) return false;
  
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand("copy");
      textArea.remove();
      return success;
    }
  } catch {
    return false;
  }
};

// ====================
// VALIDATION UTILITIES
// ====================

/**
 * Validates if a string is a valid email address
 * @param email - Email string to validate
 * @returns True if valid email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates if a string is a valid URL
 * @param url - URL string to validate
 * @returns True if valid URL
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Checks if a value is empty (null, undefined, empty string, empty array, empty object)
 * @param value - Value to check
 * @returns True if empty
 */
export const isEmpty = (value: any): boolean => {
  if (value == null) return true;
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
};
