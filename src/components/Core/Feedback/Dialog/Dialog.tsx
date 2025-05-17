import { component$, Slot } from '@builder.io/qwik';
import type { DialogProps } from './Dialog.types';
import { useDialog } from './useDialog';

/**
 * Dialog Component
 * 
 * An accessible dialog/modal component that follows WAI-ARIA best practices.
 */
export const Dialog = component$<DialogProps>((props) => {
  const {
    size = 'md',
    closeButtonAriaLabel = 'Close dialog',
    isCentered = true,
    disableAnimation = false,
    hasBackdrop = true,
    class: className,
    contentClass,
    backdropClass,
    zIndex = 1050,
    ariaDescription,
    title
  } = props;

  const {
    dialogId,
    isOpenSignal,
    dialogRef,
    handleClose$,
    handleOutsideClick$
  } = useDialog(props);

  const ariaLabelId = `${dialogId}-title`;
  const ariaDescriptionId = `${dialogId}-description`;

  // Size classes for the dialog
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4'
  };

  return (
    <>
      {isOpenSignal.value && (
        <div
          class={`fixed inset-0 z-[${zIndex}] overflow-y-auto`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title || props.ariaLabel ? ariaLabelId : undefined}
          aria-describedby={ariaDescription ? ariaDescriptionId : undefined}
          aria-label={!title && props.ariaLabel ? props.ariaLabel : undefined}
        >
          {/* Backdrop */}
          {hasBackdrop && (
            <div
              class={`fixed inset-0 bg-black/50 ${disableAnimation ? '' : 'animate-fadeIn'} ${backdropClass || ''}`}
              onClick$={handleOutsideClick$}
              data-testid="dialog-backdrop"
            ></div>
          )}
          
          {/* Dialog centering container */}
          <div
            class={`fixed inset-0 overflow-y-auto ${isCentered ? 'flex items-center justify-center' : 'pt-16'}`}
          >
            {/* Dialog */}
            <div
              ref={dialogRef}
              id={dialogId}
              class={`
                relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full 
                ${sizeClasses[size]} 
                ${isCentered ? 'my-8 mx-auto' : 'mx-auto mb-6'} 
                ${disableAnimation ? '' : 'animate-dialogIn'} 
                ${className || ''}
              `}
              data-testid="dialog"
            >
              {/* Title (if provided via prop) */}
              {title && (
                <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3
                    id={ariaLabelId}
                    class="text-lg font-medium text-gray-900 dark:text-white"
                  >
                    {title}
                  </h3>
                  {props.hasCloseButton !== false && (
                    <button
                      type="button"
                      class="absolute top-4 right-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                      onClick$={handleClose$}
                      aria-label={closeButtonAriaLabel}
                    >
                      <svg
                        class="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
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
              )}
              
              {/* Content */}
              <div class={`${contentClass || ''}`}>
                {/* Header slot */}
                <Slot name="header" />
                
                {/* Description (if provided) */}
                {ariaDescription && (
                  <div id={ariaDescriptionId} class="sr-only">
                    {ariaDescription}
                  </div>
                )}
                
                {/* Default slot (body) */}
                <Slot />
                
                {/* Footer slot */}
                <Slot name="footer" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});
