import { useContext } from "@builder.io/qwik";
import { ToastServiceContext } from "./ToastContainer";
import type { ToastService } from "./Toast.types";

/**
 * Custom hook to use the toast service from anywhere in the application
 *
 * @returns The toast service methods
 *
 * @example
 * ```tsx
 * const toast = useToast();
 *
 * return (
 *   <button
 *     onClick$={() => toast.success('Operation completed successfully!')}
 *   >
 *     Save Changes
 *   </button>
 * );
 * ```
 */
export function useToast(): ToastService {
  const toastService = useContext(ToastServiceContext);

  if (!toastService) {
    throw new Error(
      "useToast() must be used within a ToastContainer. " +
        "Make sure ToastContainer is rendered at the root of your application.",
    );
  }

  return toastService;
}

export default useToast;
