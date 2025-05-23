import { component$ } from '@builder.io/qwik';
import type { TextAreaProps } from './TextArea.types';
import { FormLabel } from '../FormLabel';
import { FormHelperText } from '../FormHelperText';
import { FormErrorMessage } from '../FormErrorMessage';
import { useTextArea } from './hooks/useTextArea';

/**
 * TextArea component for multi-line text input with auto-resize, character counting, 
 * and validation states.
 * 
 * Integrates with the Form component when used within form context.
 */
export const TextArea = component$<TextAreaProps>((props) => {
  const {
    label,
    labelClass = '',
    messageClass = '',
    id,
    name,
    ...restProps
  } = props;

  const {
    textareaRef,
    charCount,
    textareaHeight,
    effectiveState,
    handleInput$,
    handleChange$,
    handleBlur$,
    handleClear$,
    defaultCharCount$,
    resizeClass,
    containerClasses,
    textareaClasses,
    disabled,
    required,
    showCharCount,
    placeholder,
    minRows,
    helperText,
    hasDescribedBy,
    displayedMessage,
    messageType,
    showClear,
    autoResize,
    charCountFormatter$,
    maxLength,
    currentValue
  } = useTextArea(props);
  
  // Generate a unique ID if not provided
  const inputId = id || (name ? `textarea-${name}` : `textarea-${Math.random().toString(36).substring(2, 11)}`);

  return (
    <div class={containerClasses}>
      {/* Label */}
      {label && (
        <FormLabel
          for={inputId}
          class={labelClass}
          required={required}
        >
          {label}
        </FormLabel>
      )}
      
      {/* Textarea wrapper */}
      <div class="relative">
        <textarea
          {...restProps}
          id={inputId}
          name={name}
          ref={textareaRef}
          value={currentValue.value}
          aria-invalid={effectiveState.value === 'error'}
          aria-required={required}
          aria-describedby={
            hasDescribedBy
              ? `${inputId}-message`
              : undefined
          }
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          rows={minRows}
          class={`${textareaClasses} ${resizeClass}`}
          style={{
            height: autoResize ? textareaHeight.value : undefined,
          }}
          onInput$={handleInput$}
          onChange$={handleChange$}
          onBlur$={handleBlur$}
        />
        
        {/* Clear button */}
        {showClear && currentValue.value && !disabled && (
          <button
            type="button"
            aria-label="Clear input"
            class="absolute right-2 top-2 text-gray-400 hover:text-gray-600 focus:outline-none"
            onClick$={handleClear$}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      
      {/* Character count */}
      {showCharCount && (
        <div class="mt-1 text-right text-sm text-gray-500">
          {charCountFormatter$ ? (
            charCountFormatter$(charCount.value, maxLength)
          ) : (
            defaultCharCount$(charCount.value, maxLength)
          )}
        </div>
      )}
      
      {/* Display appropriate message based on state */}
      {displayedMessage && (
        messageType === 'helper' ? (
          <FormHelperText
            id={`${inputId}-message`}
            class={messageClass}
          >
            {helperText}
          </FormHelperText>
        ) : (
          <FormErrorMessage
            id={`${inputId}-message`}
            class={messageClass}
            data-state={messageType}
          >
            {displayedMessage}
          </FormErrorMessage>
        )
      )}
    </div>
  );
});
