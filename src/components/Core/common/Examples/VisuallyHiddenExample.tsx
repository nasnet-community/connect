import { component$, useSignal } from "@builder.io/qwik";
import { VisuallyHidden } from "../VisuallyHidden";
import { HiArrowRightOutline, HiInformationCircleOutline } from "@qwikest/icons/heroicons";

export const BasicVisuallyHiddenExample = component$(() => {
  return (
    <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Basic VisuallyHidden Usage
      </h3>
      
      <div class="space-y-3">
        <p class="text-gray-600 dark:text-gray-400">
          The following content includes text that is hidden visually but available to screen readers:
        </p>
        
        <div class="rounded-md bg-blue-50 p-4 dark:bg-blue-950">
          <div class="flex items-start space-x-3">
            <HiInformationCircleOutline class="h-5 w-5 text-blue-500 dark:text-blue-400" />
            <div>
              <h4 class="font-medium text-blue-900 dark:text-blue-100">
                Important Information
                <VisuallyHidden> - This content requires immediate attention</VisuallyHidden>
              </h4>
              <p class="text-sm text-blue-800 dark:text-blue-200">
                This message has additional context for screen reader users.
              </p>
            </div>
          </div>
        </div>
        
        <div class="text-sm text-gray-500 dark:text-gray-400">
          <strong>Screen reader users will hear:</strong> "Important Information - This content requires immediate attention"
          <br />
          <strong>Visual users will see:</strong> "Important Information"
        </div>
      </div>
    </div>
  );
});

export const SkipLinkExample = component$(() => {
  const showFocusIndicator = useSignal(false);
  
  return (
    <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Skip Link Implementation
      </h3>
      
      <div class="space-y-3">
        <p class="text-gray-600 dark:text-gray-400">
          Tab through this example to see the skip link appear:
        </p>
        
        <div class="relative min-h-[100px] rounded-md border-2 border-dashed border-gray-300 p-4 dark:border-gray-600">
          <VisuallyHidden>
            <a
              href="#main-content"
              class="focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 
                     focus:rounded-md focus:bg-primary-500 focus:px-3 focus:py-2 focus:text-white
                     focus:shadow-lg focus:ring-2 focus:ring-primary-400 focus:ring-offset-2
                     dark:focus:bg-primary-400 dark:focus:text-gray-900"
              onFocus$={() => showFocusIndicator.value = true}
              onBlur$={() => showFocusIndicator.value = false}
            >
              Skip to main content
            </a>
          </VisuallyHidden>
          
          <nav class="mb-4">
            <ul class="flex space-x-4">
              <li><a href="#" class="text-blue-600 hover:text-blue-800 dark:text-blue-400">Home</a></li>
              <li><a href="#" class="text-blue-600 hover:text-blue-800 dark:text-blue-400">About</a></li>
              <li><a href="#" class="text-blue-600 hover:text-blue-800 dark:text-blue-400">Services</a></li>
              <li><a href="#" class="text-blue-600 hover:text-blue-800 dark:text-blue-400">Contact</a></li>
            </ul>
          </nav>
          
          <main id="main-content">
            <h4 class="font-medium text-gray-900 dark:text-gray-100">Main Content</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              This is the main content that keyboard users can skip to.
            </p>
          </main>
          
          {showFocusIndicator.value && (
            <div class="absolute bottom-2 right-2 rounded bg-green-100 px-2 py-1 text-xs text-green-800 dark:bg-green-900 dark:text-green-200">
              Skip link is focused!
            </div>
          )}
        </div>
        
        <div class="text-sm text-gray-500 dark:text-gray-400">
          <strong>Instructions:</strong> Press Tab to focus the skip link. It will become visible when focused.
        </div>
      </div>
    </div>
  );
});

export const ScreenReaderAnnouncementExample = component$(() => {
  const notificationCount = useSignal(3);
  const showStatus = useSignal(false);
  
  return (
    <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Screen Reader Announcements
      </h3>
      
      <div class="space-y-3">
        <p class="text-gray-600 dark:text-gray-400">
          Provide additional context that helps screen reader users understand the interface:
        </p>
        
        <div class="space-y-4">
          {/* Status indicator with screen reader context */}
          <div class="flex items-center space-x-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
              <span class="text-sm font-medium text-red-600 dark:text-red-400">
                {notificationCount.value}
              </span>
            </div>
            <div>
              <p class="font-medium text-gray-900 dark:text-gray-100">
                Notifications
                <VisuallyHidden>
                  - You have {notificationCount.value} unread {notificationCount.value === 1 ? 'notification' : 'notifications'}
                </VisuallyHidden>
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Click to view all notifications
              </p>
            </div>
          </div>
          
          {/* Button with additional context */}
          <button
            onClick$={() => {
              notificationCount.value = 0;
              showStatus.value = true;
              setTimeout(() => showStatus.value = false, 3000);
            }}
            class="flex items-center space-x-2 rounded-md bg-primary-500 px-4 py-2 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            <span>Mark all as read</span>
            <HiArrowRightOutline class="h-4 w-4" />
            <VisuallyHidden>
              - This will clear all {notificationCount.value} notifications
            </VisuallyHidden>
          </button>
          
          {/* Live region for status updates */}
          <div aria-live="polite" aria-atomic="true">
            <VisuallyHidden>
              {showStatus.value && "All notifications have been marked as read"}
            </VisuallyHidden>
            {showStatus.value && (
              <div class="rounded-md bg-green-50 p-3 dark:bg-green-950">
                <p class="text-sm text-green-800 dark:text-green-200">
                  All notifications marked as read!
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div class="text-sm text-gray-500 dark:text-gray-400">
          <strong>Screen reader experience:</strong> Additional context is provided about the number of notifications
          and what actions will do, making the interface more informative for assistive technology users.
        </div>
      </div>
    </div>
  );
});