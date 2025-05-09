
export type ValidationState = "default" | "valid" | "invalid";
export type InputSize = "sm" | "md" | "lg";

export type ChangeHandler<T = HTMLElement> = (event: Event, element: T) => void;
export type ClickHandler = () => void;

export interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

export type ConfigMethod = "file" | "manual";

export interface VPNCredentials {
  server: string;
  username: string;
  password: string;
  [key: string]: string;
} 