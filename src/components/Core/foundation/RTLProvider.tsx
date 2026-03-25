import {
  component$,
  useTask$,
  Slot,
  useVisibleTask$,
  useStore,
  $,
} from "@builder.io/qwik";
import { isBrowser } from "@builder.io/qwik/build";

export type RTLDirection = "rtl" | "ltr";
export type RTLLanguage = "ar" | "fa" | "he" | "ur" | "auto";

export interface RTLProviderProps {
  /**
   * The desired text direction.
   * - 'rtl': Right-to-left
   * - 'ltr': Left-to-right (default)
   */
  direction?: RTLDirection;

  /**
   * Language code to automatically set direction.
   * Supported languages: Arabic (ar), Persian/Farsi (fa), Hebrew (he), Urdu (ur)
   * If set to 'auto', will detect from browser/document.
   */
  language?: RTLLanguage;

  /**
   * If true, will respect the user's browser language settings
   * to determine direction. Overrides direction and language props.
   * Default: false
   */
  useUserPreference?: boolean;
}

/**
 * RTLProvider
 *
 * A component that provides RTL (Right-to-Left) text direction support.
 * This component sets the appropriate HTML attributes and CSS classes
 * to support RTL languages like Arabic and Persian/Farsi.
 *
 * @example
 * ```tsx
 * // Basic usage with explicit direction
 * <RTLProvider direction="rtl">
 *   <div>This content will be displayed RTL</div>
 * </RTLProvider>
 *
 * // Usage with language code
 * <RTLProvider language="ar">
 *   <div>Arabic content with automatic RTL</div>
 * </RTLProvider>
 *
 * // Using browser preference
 * <RTLProvider useUserPreference={true}>
 *   <div>Content will follow user's browser language settings</div>
 * </RTLProvider>
 * ```
 */
export const RTLProvider = component$<RTLProviderProps>(
  ({ direction = "ltr", language = "auto", useUserPreference = false }) => {
    const state = useStore({
      currentDirection: direction,
    });

    // Create serializable version for use inside useTask$
    const checkIsRTL = $((lang: string): boolean => {
      const rtlLanguages = ["ar", "fa", "he", "ur"];
      return rtlLanguages.some((rtlLang) => lang.startsWith(rtlLang));
    });

    // Determine direction from language
    useTask$(async ({ track }) => {
      // Track the language and useUserPreference props to react to changes
      track(() => language);
      track(() => useUserPreference);
      track(() => direction);
      if (useUserPreference && isBrowser) {
        // Use the browser's language setting
        const userLanguage =
          window.navigator.language ||
          (window.navigator as any).userLanguage ||
          "en";
        // Since checkIsRTL is wrapped with $(), we need to await its result
        const isRTL = await checkIsRTL(userLanguage);
        state.currentDirection = isRTL ? "rtl" : "ltr";
      } else if (language !== "auto") {
        // Use the specified language
        // Since checkIsRTL is wrapped with $(), we need to await its result
        const isRTL = await checkIsRTL(language);
        state.currentDirection = isRTL ? "rtl" : "ltr";
      } else {
        // Use the explicitly provided direction
        state.currentDirection = direction;
      }
    });

    // Apply the direction to the HTML element
    // We need to use useVisibleTask$ here because we're directly manipulating the DOM
    // which can only be done on the client side
    useVisibleTask$(({ track }) => {
      // Track the current direction and language to react to changes
      const currentDirection = track(() => state.currentDirection);
      const currentLanguage = track(() => language);

      if (isBrowser) {
        document.documentElement.setAttribute("dir", currentDirection);

        // Add direction as a class for CSS targeting
        if (currentDirection === "rtl") {
          document.documentElement.classList.add("rtl");
          document.documentElement.classList.remove("ltr");
        } else {
          document.documentElement.classList.add("ltr");
          document.documentElement.classList.remove("rtl");
        }

        // Set the lang attribute based on language prop if specified
        if (currentLanguage !== "auto") {
          document.documentElement.setAttribute("lang", currentLanguage);
        }
      }

      // Cleanup function
      return () => {
        if (isBrowser) {
          // Only reset if we're unmounting the root RTLProvider
          const hasParentRTL = document.querySelector(
            '[data-rtl-parent="true"]',
          );
          if (!hasParentRTL) {
            document.documentElement.setAttribute("dir", "ltr");
            document.documentElement.classList.remove("rtl");
            document.documentElement.classList.add("ltr");
          }
        }
      };
    });

    return (
      <div
        data-rtl-provider={true}
        data-rtl-direction={state.currentDirection}
        dir={state.currentDirection}
      >
        <Slot />
      </div>
    );
  },
);

export default RTLProvider;
