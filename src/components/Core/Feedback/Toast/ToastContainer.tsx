import {
  component$,
  useStore,
  $,
  useVisibleTask$,
  useContextProvider,
  createContextId,
} from "@builder.io/qwik";
import type {
  ToastContainerProps,
  ToastProps,
  ToastService,
  ToastOptions,
  ToastPosition,
} from "./Toast.types";
import { Toast } from "./Toast";

/**
 * Context for the toast service
 */
export const ToastServiceContext =
  createContextId<ToastService>("toast-service");

/**
 * ToastContainer component that manages and displays toast notifications
 *
 * Follows accessibility best practices:
 * - Uses appropriate ARIA landmarks and roles
 * - Maintains focus management
 * - Supports keyboard navigation
 * - Ensures notifications are announced to screen readers
 *
 * @example
 * ```tsx
 * <ToastContainer
 *   position="bottom-right"
 *   limit={5}
 *   defaultDuration={3000}
 * />
 * ```
 */
export const ToastContainer = component$<ToastContainerProps>(
  ({
    position = "bottom-right",
    limit = 3,
    gap = "md",
    gutter = "md",
    defaultDuration = 5000,
    zIndex = 9999,
    class: className,
    children,
  }) => {
    // Store for toasts
    const toasts = useStore<{ items: ToastProps[] }>({
      items: [],
    });

    // Position style values
    const positionStyles: Record<ToastPosition, string> = {
      "top-left": "top-0 left-0 flex-col items-start",
      "top-center": "top-0 left-1/2 -translate-x-1/2 flex-col items-center",
      "top-right": "top-0 right-0 flex-col items-end",
      "bottom-left": "bottom-0 left-0 flex-col-reverse items-start",
      "bottom-center":
        "bottom-0 left-1/2 -translate-x-1/2 flex-col-reverse items-center",
      "bottom-right": "bottom-0 right-0 flex-col-reverse items-end",
    };

    // Gap and gutter size values
    const gapSizes = {
      sm: "gap-2",
      md: "gap-3",
      lg: "gap-4",
    };

    const gutterSizes = {
      sm: "p-2",
      md: "p-4",
      lg: "p-6",
    };

    // Toast service implementation
    const toastService: ToastService = {
      // Show a generic toast
      show: $(async ({ id, ...options }: ToastOptions): Promise<string> => {
        const toastId =
          id || `toast-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        // Add new toast to the array
        toasts.items = [
          ...toasts.items,
          {
            id: toastId,
            createdAt: Date.now(),
            duration: options.duration ?? defaultDuration,
            ...options,
          },
        ];

        // Limit the number of toasts if needed
        if (limit && toasts.items.length > limit) {
          toasts.items = toasts.items.slice(-limit);
        }

        return toastId;
      }),

      // Show an info toast
      info: $(
        async (
          message: string,
          options?: Partial<ToastOptions>,
        ): Promise<string> => {
          return toastService.show({
            message,
            status: "info",
            ...options,
          });
        },
      ),

      // Show a success toast
      success: $(
        async (
          message: string,
          options?: Partial<ToastOptions>,
        ): Promise<string> => {
          return toastService.show({
            message,
            status: "success",
            ...options,
          });
        },
      ),

      // Show a warning toast
      warning: $(
        async (
          message: string,
          options?: Partial<ToastOptions>,
        ): Promise<string> => {
          return toastService.show({
            message,
            status: "warning",
            ...options,
          });
        },
      ),

      // Show an error toast
      error: $(
        async (
          message: string,
          options?: Partial<ToastOptions>,
        ): Promise<string> => {
          return toastService.show({
            message,
            status: "error",
            ...options,
          });
        },
      ),

      // Show a loading toast
      loading: $(
        async (
          message: string,
          options?: Partial<ToastOptions>,
        ): Promise<string> => {
          return toastService.show({
            message,
            loading: true,
            persistent: true,
            ...options,
          });
        },
      ),

      // Dismiss a toast by ID
      dismiss: $((id: string): void => {
        toasts.items = toasts.items.filter((toast) => toast.id !== id);
      }),

      // Dismiss all toasts
      dismissAll: $(() => {
        toasts.items = [];
      }),

      // Update an existing toast
      update: $((id: string, options: Partial<ToastOptions>): void => {
        toasts.items = toasts.items.map((toast) =>
          toast.id === id ? { ...toast, ...options } : toast,
        );
      }),

      // Get all current toasts
      getToasts: $(() => {
        return [...toasts.items];
      }),
    };

    // Provide toast service to child components
    useContextProvider(ToastServiceContext, toastService);

    // Sort toasts by creation time
    const sortedToasts = useStore({
      get items() {
        return [...toasts.items].sort((a, b) => {
          // Sort by creation time
          const aTime = a.createdAt || 0;
          const bTime = b.createdAt || 0;
          return aTime - bTime;
        });
      },
    });

    // Handle toast dismiss
    const handleDismiss$ = $((id: string) => {
      toastService.dismiss(id);
    });

    // Add keyboard shortcuts for toast management
    useVisibleTask$(({ cleanup }) => {
      const handleKeyDown = (event: KeyboardEvent) => {
        // Alt+T to focus on the first toast (common accessibility pattern)
        if (
          event.altKey &&
          event.key === "t" &&
          sortedToasts.items.length > 0
        ) {
          const toastElement = document.getElementById(
            sortedToasts.items[0].id,
          );
          if (toastElement) {
            toastElement.focus();
          }
        }

        // Escape key to dismiss all toasts when focused on a toast
        if (
          event.key === "Escape" &&
          document.activeElement?.getAttribute("role") === "status"
        ) {
          toastService.dismissAll();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      cleanup(() => {
        document.removeEventListener("keydown", handleKeyDown);
      });
    });

    return (
      <div
        role="region"
        aria-label="Notifications"
        class={`fixed flex ${positionStyles[position]} ${gapSizes[gap]} ${gutterSizes[gutter]} pointer-events-none z-[${zIndex}] ${className || ""}`}
        data-testid="toast-container"
      >
        {children}

        {sortedToasts.items.map((toast) => (
          <div key={toast.id} class="pointer-events-auto w-full">
            <Toast
              {...toast}
              position={toast.position || position}
              onDismiss$={handleDismiss$}
            />
          </div>
        ))}
      </div>
    );
  },
);

export default ToastContainer;
