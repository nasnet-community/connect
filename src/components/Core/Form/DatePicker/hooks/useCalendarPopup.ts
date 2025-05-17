import { useSignal, useVisibleTask$ } from '@builder.io/qwik';
import type { QRL } from '@builder.io/qwik';
import type { DatePickerPlacement } from '../DatePicker.types';

export interface UseCalendarPopupResult {
  calendarRef: { value: HTMLDivElement | undefined };
  calendarContainerClasses: string;
}

export function useCalendarPopup(
  size: string,
  placement: DatePickerPlacement,
  isOpen: { value: boolean },
  inline: boolean,
  inputRef: { value: HTMLInputElement | undefined },
  onClose?: QRL<() => void>,
  calendarClass?: string,
): UseCalendarPopupResult {
  // Calendar ref
  const calendarRef = useSignal<HTMLDivElement>();
  
  // Helper to convert placement to position class
  const placementToPositionClass = (placement: DatePickerPlacement): string => {
    switch (placement) {
      case 'top-start': return 'bottom-full left-0 mb-2';
      case 'top': return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
      case 'top-end': return 'bottom-full right-0 mb-2';
      case 'right-start': return 'left-full top-0 ml-2';
      case 'right': return 'left-full top-1/2 -translate-y-1/2 ml-2';
      case 'right-end': return 'left-full bottom-0 ml-2';
      case 'bottom-start': return 'top-full left-0 mt-2';
      case 'bottom': return 'top-full left-1/2 -translate-x-1/2 mt-2';
      case 'bottom-end': return 'top-full right-0 mt-2';
      case 'left-start': return 'right-full top-0 mr-2';
      case 'left': return 'right-full top-1/2 -translate-y-1/2 mr-2';
      case 'left-end': return 'right-full bottom-0 mr-2';
      default: return 'top-full left-0 mt-2';
    }
  };
  
  // Determine calendar container classes
  const calendarContainerClasses = [
    'datepicker-calendar',
    `calendar-${size}`,
    // isOpen/inline state is handled by the parent component
    // handled in parent: isOpen.value || inline ? 'block' : 'hidden',
    // handled in parent: inline ? 'static' : 'absolute',
    placementToPositionClass(placement),
    calendarClass || ''
  ].filter(Boolean).join(' ');
  
  // Setup outside click handler
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    function handleOutsideClick(event: MouseEvent) {
      const target = event.target as Node;
      
      if (
        isOpen.value && 
        !inline && 
        calendarRef.value && 
        inputRef.value && 
        !calendarRef.value.contains(target) && 
        !inputRef.value.contains(target)
      ) {
        isOpen.value = false;
        
        if (onClose) {
          onClose();
        }
      }
    }
    
    document.addEventListener('mousedown', handleOutsideClick);
    
    cleanup(() => {
      document.removeEventListener('mousedown', handleOutsideClick);
    });
  });
  
  return {
    calendarRef,
    calendarContainerClasses
  };
} 