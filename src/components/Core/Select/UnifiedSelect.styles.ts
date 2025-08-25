/**
 * Enhanced Tailwind class utilities for the Unified Select component
 * Optimized for mobile, tablet, and desktop with semantic color tokens
 */

export const styles = {
  // Common base styles with semantic colors
  selectContainer: "w-full",

  // Enhanced typography with fluid scaling and device optimization
  selectLabel:
    "mb-2 block text-sm mobile:text-base tablet:text-sm desktop:text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200",

  selectRequired: "ms-1 text-error-600 dark:text-error-400",

  helperText: "mt-2 text-sm mobile:text-base tablet:text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200",

  errorMessage: "mt-2 text-sm mobile:text-base tablet:text-sm text-error-600 dark:text-error-400 transition-colors duration-200",

  // Native select mode styles with enhanced responsive design
  nativeSelect:
    "block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm transition-all duration-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:focus:border-primary-400 dark:focus:ring-primary-400/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-gray-50 dark:disabled:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 mobile:text-base tablet:text-sm desktop:text-sm",

  // Enhanced responsive size classes with touch-optimized targets
  nativeSizeSm: "text-xs px-2.5 py-1.5 mobile:min-h-[44px] mobile:px-3 mobile:py-2.5 mobile:text-base tablet:text-xs tablet:px-2.5 tablet:py-1.5 desktop:text-xs",
  nativeSizeMd: "text-sm px-3 py-2 mobile:min-h-[48px] mobile:px-4 mobile:py-3 mobile:text-base tablet:px-3 tablet:py-2 desktop:text-sm",
  nativeSizeLg: "text-base px-4 py-2.5 mobile:min-h-[52px] mobile:px-5 mobile:py-3.5 mobile:text-lg tablet:px-4 tablet:py-2.5 desktop:text-base",

  nativeStateValid:
    "border-success-500 dark:border-success-400 focus:border-success-500 dark:focus:border-success-400 focus:ring-success-500/20 dark:focus:ring-success-400/20",
  nativeStateInvalid:
    "border-error-500 dark:border-error-400 focus:border-error-500 dark:focus:border-error-400 focus:ring-error-500/20 dark:focus:ring-error-400/20",

  // Enhanced custom select mode styles with semantic colors
  customSelect: "relative w-full",

  selectButton:
    "w-full border rounded-md transition-all duration-200 flex items-center justify-between focus:outline-none focus:ring-2 appearance-none shadow-sm hover:shadow-md can-hover:hover:shadow-md touch:active:scale-[0.98] motion-safe:transition-transform",

  selectButtonDefault:
    "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 hover:border-gray-400 dark:hover:border-gray-500",
  selectButtonValid:
    "border-success-500 dark:border-success-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-success-500 dark:focus:border-success-400 focus:ring-success-500/20 dark:focus:ring-success-400/20",
  selectButtonInvalid:
    "border-error-500 dark:border-error-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-error-500 dark:focus:border-error-400 focus:ring-error-500/20 dark:focus:ring-error-400/20",

  // Enhanced responsive button sizes with optimal touch targets
  buttonSizeSm: "text-xs px-2.5 py-1.5 mobile:min-h-[44px] mobile:px-3 mobile:py-2.5 mobile:text-base tablet:text-xs tablet:px-2.5 tablet:py-1.5 desktop:text-xs desktop:px-2.5 desktop:py-1.5",
  buttonSizeMd: "text-sm px-3 py-2 mobile:min-h-[48px] mobile:px-4 mobile:py-3 mobile:text-base tablet:px-3 tablet:py-2 tablet:text-sm desktop:text-sm desktop:px-3 desktop:py-2",
  buttonSizeLg: "text-base px-4 py-2.5 mobile:min-h-[52px] mobile:px-5 mobile:py-3.5 mobile:text-lg tablet:px-4 tablet:py-2.5 tablet:text-base desktop:text-base desktop:px-4 desktop:py-2.5",

  buttonDisabled:
    "cursor-not-allowed opacity-60 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600",

  placeholder: "text-gray-500 dark:text-gray-400",

  icon: "h-5 w-5 mobile:h-6 mobile:w-6 text-gray-400 dark:text-gray-500 transition-transform duration-200",
  iconOpen: "rotate-180",

  clearButton:
    "p-1 me-1 rounded-md text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors duration-200 touch:min-h-[32px] touch:min-w-[32px]",
  clearIcon: "h-4 w-4 mobile:h-5 mobile:w-5",

  dropdown:
    "absolute z-dropdown mt-1 w-full rounded-md bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-600 focus:outline-none mobile:fixed mobile:inset-x-0 mobile:bottom-0 mobile:mt-0 mobile:rounded-t-2xl mobile:rounded-b-none mobile:max-h-[85vh] mobile:shadow-2xl tablet:absolute tablet:rounded-md desktop:max-h-[400px] transition-all duration-300 ease-out motion-reduce:transition-none",

  dropdownBelow:
    "top-full origin-top animate-scale-up motion-reduce:animate-none",

  dropdownAbove:
    "bottom-full origin-bottom mb-1 mt-0 animate-scale-up motion-reduce:animate-none",

  searchContainer:
    "p-2 sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600 z-10 mobile:p-4 backdrop-blur-sm bg-white/95 dark:bg-gray-800/95",
  searchInput:
    "block w-full border border-gray-300 dark:border-gray-600 rounded-md text-sm ps-10 pe-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 focus:border-primary-500 dark:focus:border-primary-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 mobile:py-2.5 mobile:text-base transition-all duration-200",
  searchIcon:
    "pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-gray-400 dark:text-gray-500",

  optionsContainer: "overflow-auto max-h-[300px] mobile:max-h-[calc(85vh-120px)] tablet:max-h-[400px] desktop:max-h-[500px] overscroll-contain scrollbar-thin scrollbar-track-gray-100 dark:scrollbar-track-gray-700 scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500",

  groupHeader:
    "px-3 py-2 mobile:px-4 mobile:py-2.5 text-xs mobile:text-sm font-semibold text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 sticky top-0 z-10 backdrop-blur-sm",

  option:
    "px-3 py-2 mobile:px-4 mobile:py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center text-gray-900 dark:text-gray-100 mobile:min-h-[48px] tablet:min-h-[40px] desktop:min-h-[36px] transition-colors duration-150 can-hover:hover:bg-gray-50 can-hover:dark:hover:bg-gray-700/50 touch:active:bg-gray-100 touch:dark:active:bg-gray-600/50",
  optionDisabled:
    "opacity-50 cursor-not-allowed hover:bg-transparent dark:hover:bg-transparent touch:active:bg-transparent",
  optionSelected:
    "bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900/30",

  checkbox:
    "me-2 mobile:me-3 flex h-4 w-4 mobile:h-5 mobile:w-5 items-center justify-center rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800",
  checkboxSelected: "text-primary-500 dark:text-primary-400 border-primary-500 dark:border-primary-400 bg-primary-50 dark:bg-primary-900/20",

  noResults: "px-3 py-4 mobile:px-4 mobile:py-6 text-sm mobile:text-base text-gray-500 dark:text-gray-400 text-center italic",

  // Enhanced mobile-specific styles with better UX
  mobileBackdrop: "mobile:fixed mobile:inset-0 mobile:bg-black/50 mobile:z-[1040] tablet:hidden backdrop-blur-sm",
  mobileHandle: "mobile:block mobile:w-12 mobile:h-1.5 mobile:bg-gray-300 dark:mobile:bg-gray-600 mobile:rounded-full mobile:mx-auto mobile:mb-4 mobile:mt-2 tablet:hidden",
  mobileHeader: "mobile:flex mobile:items-center mobile:justify-between mobile:p-4 mobile:pb-2 mobile:border-b mobile:border-gray-200 dark:mobile:border-gray-600 tablet:hidden",
  mobileCloseButton: "mobile:p-2 mobile:rounded-lg mobile:hover:bg-gray-100 dark:mobile:hover:bg-gray-700 mobile:transition-colors mobile:duration-200 mobile:min-h-[44px] mobile:min-w-[44px] mobile:flex mobile:items-center mobile:justify-center",
  
  // Loading state styles
  loadingOverlay: "absolute inset-0 bg-white/80 dark:bg-gray-800/80 flex items-center justify-center backdrop-blur-sm z-20",
  loadingContainer: "flex items-center space-x-2 text-gray-600 dark:text-gray-400",
  
  // Focus management styles
  focusRing: "focus-visible:ring-2 focus-visible:ring-primary-500/20 dark:focus-visible:ring-primary-400/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-800",
  
  // High contrast mode support
  highContrast: "high-contrast:border-2 high-contrast:border-black high-contrast:bg-white high-contrast:text-black",
};

/**
 * Utility functions for combining classes based on component state
 */
export const getSelectNativeClass = (
  size: "sm" | "md" | "lg" = "md",
  validation: "default" | "valid" | "invalid" = "default",
) => {
  const classes = [styles.nativeSelect];

  // Add size-specific classes
  if (size === "sm") classes.push(styles.nativeSizeSm);
  else if (size === "md") classes.push(styles.nativeSizeMd);
  else if (size === "lg") classes.push(styles.nativeSizeLg);

  // Add validation state classes
  if (validation === "valid") classes.push(styles.nativeStateValid);
  else if (validation === "invalid") classes.push(styles.nativeStateInvalid);

  return classes.join(" ");
};

export const getSelectButtonClass = (
  size: "sm" | "md" | "lg" = "md",
  validation: "default" | "valid" | "invalid" = "default",
  disabled: boolean = false,
) => {
  const classes = [styles.selectButton];

  // Add base style based on validation state
  if (validation === "valid") classes.push(styles.selectButtonValid);
  else if (validation === "invalid") classes.push(styles.selectButtonInvalid);
  else classes.push(styles.selectButtonDefault);

  // Add size-specific classes
  if (size === "sm") classes.push(styles.buttonSizeSm);
  else if (size === "md") classes.push(styles.buttonSizeMd);
  else if (size === "lg") classes.push(styles.buttonSizeLg);

  // Add disabled state
  if (disabled) classes.push(styles.buttonDisabled);

  return classes.join(" ");
};
