import type { QRL, JSXOutput } from "@builder.io/qwik";

export type ToastStatus = "info" | "success" | "warning" | "error";
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";
export type ToastSize = "sm" | "md" | "lg";

export interface ToastProps {
  id: string;
  status?: ToastStatus;
  title?: string;
  message?: string;
  dismissible?: boolean;
  onDismiss$?: QRL<(id: string) => void>;
  icon?: boolean | JSXOutput;
  size?: ToastSize;
  duration?: number;
  loading?: boolean;
  persistent?: boolean;
  actionLabel?: string;
  onAction$?: QRL<(id: string) => void>;
  ariaLive?: "assertive" | "polite" | "off";
  ariaLabel?: string;
  class?: string;
  children?: JSXOutput;
  createdAt?: number;
  position?: ToastPosition;
  swipeable?: boolean;
  variant?: "solid" | "outline" | "subtle";
}

export interface ToastContainerProps {
  position?: ToastPosition;
  limit?: number;
  gap?: "sm" | "md" | "lg";
  gutter?: "sm" | "md" | "lg";
  defaultDuration?: number;
  zIndex?: number;
  class?: string;
  children?: JSXOutput;
}

export interface ToastOptions extends Omit<ToastProps, "id"> {
  id?: string;
}

export interface ToastService {
  show: QRL<(options: ToastOptions) => Promise<string>>;
  info: QRL<
    (message: string, options?: Partial<ToastOptions>) => Promise<string>
  >;
  success: QRL<
    (message: string, options?: Partial<ToastOptions>) => Promise<string>
  >;
  warning: QRL<
    (message: string, options?: Partial<ToastOptions>) => Promise<string>
  >;
  error: QRL<
    (message: string, options?: Partial<ToastOptions>) => Promise<string>
  >;
  loading: QRL<
    (message: string, options?: Partial<ToastOptions>) => Promise<string>
  >;
  dismiss: QRL<(id: string) => void>;
  dismissAll: QRL<() => void>;
  update: QRL<(id: string, options: Partial<ToastOptions>) => void>;
  getToasts: QRL<() => ToastProps[]>;
}
