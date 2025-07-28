import type { QRL, JSXChildren, JSXOutput } from "@builder.io/qwik";
import type {
  FeedbackStatus,
  FeedbackSize,
  FeedbackVariant,
} from "../utils/theme";

export type AlertStatus = FeedbackStatus;
export type AlertSize = FeedbackSize;
export type AlertVariant = FeedbackVariant;

export interface AlertProps {
  status?: AlertStatus;
  title?: string;
  message?: string;
  dismissible?: boolean;
  onDismiss$?: QRL<() => void>;
  icon?: boolean | JSXOutput;
  size?: AlertSize;
  variant?: AlertVariant;
  autoCloseDuration?: number;
  loading?: boolean;
  id?: string;
  class?: string;
  children?: JSXChildren;
  animation?: "fadeIn" | "slideUp" | "slideDown" | "scaleUp";
}
