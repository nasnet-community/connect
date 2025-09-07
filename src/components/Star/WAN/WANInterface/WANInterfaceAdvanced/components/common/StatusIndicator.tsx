import { component$ } from "@builder.io/qwik";
import type { LinkStatus } from "../../utils/linkHelpers";

export interface StatusIndicatorProps {
  status: LinkStatus;
  errorCount?: number;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  showText?: boolean;
}

export const StatusIndicator = component$<StatusIndicatorProps>(
  ({ status, errorCount = 0, size = "md", showIcon = true, showText = false }) => {
    const sizeClasses = {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
    };
    
    const getStatusText = () => {
      if (errorCount > 0) {
        return `${errorCount} issue${errorCount > 1 ? 's' : ''}`;
      }
      switch (status) {
        case "complete":
          return "Complete";
        case "partial":
          return "Partial";
        case "error":
          return "Error";
        default:
          return "Incomplete";
      }
    };
    
    return (
      <div class="flex items-center gap-2">
        {showIcon && status === "complete" && errorCount === 0 && (
          <svg 
            class={`${sizeClasses[size]} text-green-600 dark:text-green-400`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fill-rule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
              clip-rule="evenodd" 
            />
          </svg>
        )}
        
        {(showText || errorCount > 0) && (
          <span class={`text-xs font-medium ${
            errorCount > 0 
              ? "text-red-600 dark:text-red-400" 
              : status === "complete"
              ? "text-green-600 dark:text-green-400"
              : status === "partial"
              ? "text-yellow-600 dark:text-yellow-400"
              : "text-gray-600 dark:text-gray-400"
          }`}>
            {getStatusText()}
          </span>
        )}
      </div>
    );
  }
);