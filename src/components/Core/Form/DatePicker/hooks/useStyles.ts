export interface UseStylesResult {
  containerClasses: string;
  inputClasses: string;
}

export function useStyles(
  size: string,
  disabled: boolean,
  fullWidth: boolean,
  errorMessage: string | undefined,
  isFocused: { value: boolean },
  containerClass?: string,
  inputClass?: string
): UseStylesResult {
  
  // Determine container classes
  const containerClasses = [
    'datepicker-container',
    `datepicker-${size}`,
    fullWidth ? 'w-full' : '',
    disabled ? 'opacity-60 cursor-not-allowed' : '',
    containerClass || ''
  ].filter(Boolean).join(' ');
  
  // Determine input classes
  const inputClasses = [
    'datepicker-input',
    `input-${size}`,
    errorMessage ? 'input-error' : '',
    isFocused.value ? 'input-focused' : '',
    disabled ? 'input-disabled' : '',
    inputClass || ''
  ].filter(Boolean).join(' ');
  
  return {
    containerClasses,
    inputClasses
  };
} 