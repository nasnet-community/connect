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
  return useContext(ToastServiceContext);
}

export default useToast;
