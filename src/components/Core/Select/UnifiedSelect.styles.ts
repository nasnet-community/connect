/**
 * Tailwind class utilities for the Unified Select component
 */

export const styles = {
  // Common base styles
  selectContainer: "w-full",
  
  selectLabel: "mb-2 block text-sm font-medium text-text-secondary dark:text-text-dark-secondary",
  
  selectRequired: "ml-1 text-error",
  
  helperText: "mt-2 text-sm text-text-muted dark:text-text-dark-muted",
  
  errorMessage: "mt-2 text-sm text-error dark:text-error-300",

  // Native select mode styles
  nativeSelect: "block w-full rounded-md border border-border bg-surface-default px-3 py-2 text-text-default shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default dark:focus:border-primary-500 dark:focus:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-surface-muted dark:disabled:bg-surface-dark-muted",
  
  nativeSizeSm: "text-xs px-2.5 py-1.5",
  nativeSizeMd: "text-sm px-3 py-2",
  nativeSizeLg: "text-base px-4 py-2.5",
  
  nativeStateValid: "border-success focus:border-success focus:ring-success dark:border-success dark:focus:border-success dark:focus:ring-success",
  nativeStateInvalid: "border-error focus:border-error focus:ring-error dark:border-error dark:focus:border-error dark:focus:ring-error",

  // Custom select mode styles
  customSelect: "relative w-full",
  
  selectButton: "w-full border rounded-md transition-colors flex items-center justify-between focus:outline-none focus:ring-2 appearance-none shadow-sm",
  
  selectButtonDefault: "border-border bg-surface-default text-text-default focus:border-primary-500 focus:ring-primary-500 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default dark:focus:border-primary-500 dark:focus:ring-primary-500",
  selectButtonValid: "border-success bg-surface-default text-text-default focus:border-success focus:ring-success dark:border-success dark:bg-surface-dark dark:text-text-dark-default dark:focus:border-success dark:focus:ring-success",
  selectButtonInvalid: "border-error bg-surface-default text-text-default focus:border-error focus:ring-error dark:border-error dark:bg-surface-dark dark:text-text-dark-default dark:focus:border-error dark:focus:ring-error",
  
  buttonSizeSm: "text-xs px-2.5 py-1.5",
  buttonSizeMd: "text-sm px-3 py-2",
  buttonSizeLg: "text-base px-4 py-2.5",
  
  buttonDisabled: "cursor-not-allowed opacity-60 bg-surface-muted dark:bg-surface-dark-muted",
  
  placeholder: "text-text-muted dark:text-text-dark-muted",
  
  icon: "h-5 w-5 text-text-muted dark:text-text-dark-muted transition-transform duration-200",
  iconOpen: "rotate-180",
  
  clearButton: "p-1 mr-1 text-text-muted hover:text-text-default focus:outline-none dark:text-text-dark-muted dark:hover:text-text-dark-default",
  clearIcon: "h-4 w-4",
  
  dropdown: "absolute z-50 mt-1 w-full rounded-md bg-surface-default dark:bg-surface-dark shadow-lg border border-border dark:border-border-dark focus:outline-none",
  
  searchContainer: "p-2 sticky top-0 bg-surface-default dark:bg-surface-dark border-b border-border dark:border-border-dark z-10",
  searchInput: "block w-full border border-border dark:border-border-dark rounded-md text-sm pl-10 pr-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-surface-default dark:bg-surface-dark text-text-default dark:text-text-dark-default",
  searchIcon: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-text-muted",
  
  optionsContainer: "overflow-auto max-h-[300px]",
  
  groupHeader: "px-3 py-2 text-xs font-semibold text-text-muted dark:text-text-dark-muted bg-surface-secondary dark:bg-surface-dark-secondary sticky top-0 z-10",
  
  option: "px-3 py-2 cursor-pointer hover:bg-surface-hover dark:hover:bg-surface-dark-hover flex items-center text-text-default dark:text-text-dark-default",
  optionDisabled: "opacity-50 cursor-not-allowed hover:bg-transparent dark:hover:bg-transparent",
  optionSelected: "bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300",
  
  checkbox: "mr-2 flex h-4 w-4 items-center justify-center rounded border border-border dark:border-border-dark",
  checkboxSelected: "text-primary-500 dark:text-primary-400",
  
  noResults: "px-3 py-2 text-sm text-text-muted dark:text-text-dark-muted"
};

/**
 * Utility functions for combining classes based on component state
 */
export const getSelectNativeClass = (
  size: 'sm' | 'md' | 'lg' = 'md',
  validation: 'default' | 'valid' | 'invalid' = 'default'
) => {
  const classes = [styles.nativeSelect];
  
  // Add size-specific classes
  if (size === 'sm') classes.push(styles.nativeSizeSm);
  else if (size === 'md') classes.push(styles.nativeSizeMd);
  else if (size === 'lg') classes.push(styles.nativeSizeLg);
  
  // Add validation state classes
  if (validation === 'valid') classes.push(styles.nativeStateValid);
  else if (validation === 'invalid') classes.push(styles.nativeStateInvalid);
  
  return classes.join(' ');
};

export const getSelectButtonClass = (
  size: 'sm' | 'md' | 'lg' = 'md',
  validation: 'default' | 'valid' | 'invalid' = 'default',
  disabled: boolean = false
) => {
  const classes = [styles.selectButton];
  
  // Add base style based on validation state
  if (validation === 'valid') classes.push(styles.selectButtonValid);
  else if (validation === 'invalid') classes.push(styles.selectButtonInvalid);
  else classes.push(styles.selectButtonDefault);
  
  // Add size-specific classes
  if (size === 'sm') classes.push(styles.buttonSizeSm);
  else if (size === 'md') classes.push(styles.buttonSizeMd);
  else if (size === 'lg') classes.push(styles.buttonSizeLg);
  
  // Add disabled state
  if (disabled) classes.push(styles.buttonDisabled);
  
  return classes.join(' ');
};
