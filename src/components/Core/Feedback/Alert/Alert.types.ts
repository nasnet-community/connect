import type { QRL, JSXNode } from '@builder.io/qwik';

export type AlertStatus = 'info' | 'success' | 'warning' | 'error';
export type AlertSize = 'sm' | 'md' | 'lg';
export type AlertVariant = 'solid' | 'outline';

export interface AlertProps {
  status?: AlertStatus;
  title?: string;
  message?: string;
  dismissible?: boolean;
  onDismiss$?: QRL<() => void>;
  icon?: boolean | JSXNode;
  size?: AlertSize;
  variant?: AlertVariant;
  subtle?: boolean;
  autoCloseDuration?: number;
  loading?: boolean;
  id?: string;
  class?: string;
  children?: JSX.Element;
}
