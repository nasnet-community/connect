import { component$, useSignal, $ } from "@builder.io/qwik";
import { Button } from "../Button";
import {
  HiPlusMini,
  HiTrashMini,
  HiPencilMini,
  HiArrowDownTrayMini,
  HiInformationCircleMini,
  HiCheckMini,
  HiXMarkMini,
} from "@qwikest/icons/heroicons";

export const IconOnlyAccessibilityExample = component$(() => {
  return (
    <div class="space-y-4">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Icon-only buttons should always include an aria-label for screen readers:
      </p>
      
      <div class="flex gap-4">
        <Button 
          variant="primary" 
          size="sm"
          aria-label="Add new item"
          leftIcon
        >
          <span q:slot="leftIcon">
            <HiPlusMini class="h-4 w-4" />
          </span>
        </Button>
        
        <Button 
          variant="secondary" 
          size="sm"
          aria-label="Edit item"
          leftIcon
        >
          <span q:slot="leftIcon">
            <HiPencilMini class="h-4 w-4" />
          </span>
        </Button>
        
        <Button 
          variant="error" 
          size="sm"
          aria-label="Delete item"
          leftIcon
        >
          <span q:slot="leftIcon">
            <HiTrashMini class="h-4 w-4" />
          </span>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          aria-label="Download file"
          leftIcon
        >
          <span q:slot="leftIcon">
            <HiArrowDownTrayMini class="h-4 w-4" />
          </span>
        </Button>
      </div>
      
      <div class="text-xs text-gray-500 dark:text-gray-400">
        Try using a screen reader to hear the aria-labels
      </div>
    </div>
  );
});

export const KeyboardNavigationExample = component$(() => {
  const focusedIndex = useSignal(-1);
  
  const handleKeyDown = $((event: KeyboardEvent, index: number) => {
    const buttons = document.querySelectorAll('[data-nav-button]');
    
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        const nextIndex = (index + 1) % buttons.length;
        (buttons[nextIndex] as HTMLElement).focus();
        focusedIndex.value = nextIndex;
        break;
      case 'ArrowLeft':
        event.preventDefault();
        const prevIndex = index === 0 ? buttons.length - 1 : index - 1;
        (buttons[prevIndex] as HTMLElement).focus();
        focusedIndex.value = prevIndex;
        break;
      case 'Home':
        event.preventDefault();
        (buttons[0] as HTMLElement).focus();
        focusedIndex.value = 0;
        break;
      case 'End':
        event.preventDefault();
        (buttons[buttons.length - 1] as HTMLElement).focus();
        focusedIndex.value = buttons.length - 1;
        break;
    }
  });
  
  return (
    <div class="space-y-4">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Use arrow keys, Home, and End to navigate between buttons:
      </p>
      
      <div class="flex gap-2" role="toolbar" aria-label="Text formatting options">
        {['Bold', 'Italic', 'Underline', 'Strike'].map((label, index) => (
          <div
            key={label}
            onKeyDown$={(e: KeyboardEvent) => handleKeyDown(e, index)}
          >
            <Button
              variant={focusedIndex.value === index ? 'primary' : 'outline'}
              size="sm"
              onClick$={() => {
                focusedIndex.value = index;
              }}
            >
              {label}
            </Button>
          </div>
        ))}
      </div>
      
      <div class="text-xs text-gray-500 dark:text-gray-400">
        Tab to focus the toolbar, then use arrow keys to navigate
      </div>
    </div>
  );
});

export const DisabledWithTooltipExample = component$(() => {
  const showTooltip = useSignal(false);
  
  return (
    <div class="space-y-4">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Disabled buttons with explanatory tooltips:
      </p>
      
      <div class="flex gap-4 items-start">
        <div 
          class="relative inline-block"
          onMouseEnter$={() => showTooltip.value = true}
          onMouseLeave$={() => showTooltip.value = false}
        >
          <Button 
            disabled 
            variant="primary"
          >
            Save Changes
          </Button>
          {showTooltip.value && (
            <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded whitespace-nowrap">
              No changes to save
              <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          )}
        </div>
        
        <div class="relative inline-block" title="Please complete all required fields">
          <Button disabled variant="secondary">
            Submit Form
          </Button>
        </div>
        
        <div class="relative inline-block" title="You don't have permission to delete">
          <Button disabled variant="error">
            Delete
          </Button>
        </div>
      </div>
      
      <div class="text-xs text-gray-500 dark:text-gray-400">
        Hover over disabled buttons to see why they're disabled
      </div>
    </div>
  );
});

export const LoadingStateAccessibilityExample = component$(() => {
  const loadingStates = useSignal({
    save: false,
    submit: false,
    process: false,
  });
  
  const simulateLoading = $((key: keyof typeof loadingStates.value) => {
    loadingStates.value = { ...loadingStates.value, [key]: true };
    setTimeout(() => {
      loadingStates.value = { ...loadingStates.value, [key]: false };
    }, 3000);
  });
  
  return (
    <div class="space-y-4">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Loading states with screen reader announcements:
      </p>
      
      <div class="flex gap-4">
        <Button 
          variant="primary"
          loading={loadingStates.value.save}
          onClick$={() => simulateLoading('save')}
          aria-live="polite"
          aria-busy={loadingStates.value.save}
        >
          <span class="sr-only">{loadingStates.value.save ? 'Saving...' : 'Save'}</span>
          <span aria-hidden="true">Save</span>
        </Button>
        
        <Button 
          variant="secondary"
          loading={loadingStates.value.submit}
          onClick$={() => simulateLoading('submit')}
          aria-live="polite"
          aria-busy={loadingStates.value.submit}
        >
          <span class="sr-only">{loadingStates.value.submit ? 'Submitting form...' : 'Submit Form'}</span>
          <span aria-hidden="true">Submit Form</span>
        </Button>
        
        <Button 
          variant="info"
          loading={loadingStates.value.process}
          onClick$={() => simulateLoading('process')}
          aria-live="polite"
          aria-busy={loadingStates.value.process}
        >
          <span class="sr-only">{loadingStates.value.process ? 'Processing data...' : 'Process Data'}</span>
          <span aria-hidden="true">Process Data</span>
        </Button>
      </div>
      
      <div class="text-xs text-gray-500 dark:text-gray-400">
        Screen readers will announce the loading state changes
      </div>
    </div>
  );
});

export const FocusManagementExample = component$(() => {
  const dialogOpen = useSignal(false);
  const confirmationStatus = useSignal<'idle' | 'success' | 'error'>('idle');
  
  const handleConfirm = $(() => {
    confirmationStatus.value = 'success';
    setTimeout(() => {
      dialogOpen.value = false;
      confirmationStatus.value = 'idle';
      // Focus returns to the trigger button automatically
    }, 1500);
  });
  
  const handleCancel = $(() => {
    confirmationStatus.value = 'error';
    setTimeout(() => {
      dialogOpen.value = false;
      confirmationStatus.value = 'idle';
    }, 1500);
  });
  
  return (
    <div class="space-y-4">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Focus management example with dialog:
      </p>
      
      <div>
        <Button 
          variant="primary"
          onClick$={() => dialogOpen.value = true}
          aria-haspopup="dialog"
          aria-expanded={dialogOpen.value}
        >
          Open Dialog
        </Button>
      </div>
      
      {dialogOpen.value && (
        <div 
          class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
        >
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm mx-4">
            <h2 id="dialog-title" class="text-lg font-semibold mb-4">
              Confirm Action
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to proceed with this action?
            </p>
            
            {confirmationStatus.value === 'idle' && (
              <div class="flex gap-3 justify-end">
                <Button 
                  variant="secondary"
                  onClick$={handleCancel}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary"
                  onClick$={handleConfirm}
                >
                  Confirm
                </Button>
              </div>
            )}
            
            {confirmationStatus.value === 'success' && (
              <div class="flex items-center justify-center text-success-600 dark:text-success-400">
                <HiCheckMini class="h-5 w-5 mr-2" />
                <span>Action confirmed!</span>
              </div>
            )}
            
            {confirmationStatus.value === 'error' && (
              <div class="flex items-center justify-center text-error-600 dark:text-error-400">
                <HiXMarkMini class="h-5 w-5 mr-2" />
                <span>Action cancelled</span>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div class="text-xs text-gray-500 dark:text-gray-400">
        Focus is trapped in the dialog and returns to the trigger button when closed
      </div>
    </div>
  );
});

export const DescriptiveButtonExample = component$(() => {
  return (
    <div class="space-y-4">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Buttons with additional context for screen readers:
      </p>
      
      <div class="space-y-3">
        <div class="flex items-center gap-3">
          <Button variant="primary" aria-describedby="save-description">
            Save Draft
          </Button>
          <span id="save-description" class="text-sm text-gray-500 dark:text-gray-400">
            <HiInformationCircleMini class="inline h-4 w-4 mr-1" />
            Auto-saves every 30 seconds
          </span>
        </div>
        
        <div class="flex items-center gap-3">
          <Button variant="error" aria-describedby="delete-warning">
            Delete Account
          </Button>
          <span id="delete-warning" class="text-sm text-error-600 dark:text-error-400">
            This action cannot be undone
          </span>
        </div>
        
        <div class="flex items-center gap-3">
          <Button variant="info" aria-describedby="export-info">
            Export Data
          </Button>
          <span id="export-info" class="text-sm text-gray-500 dark:text-gray-400">
            Downloads as CSV file
          </span>
        </div>
      </div>
      
      <div class="text-xs text-gray-500 dark:text-gray-400">
        Screen readers will announce the additional context
      </div>
    </div>
  );
});