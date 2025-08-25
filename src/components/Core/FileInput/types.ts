import type { QRL, Signal } from "@builder.io/qwik";

/**
 * Supported VPN protocol types
 */
export type VPNProtocolType = "OpenVPN" | "Wireguard" | "L2TP" | "PPTP" | "SSTP" | "IKEv2";

/**
 * File validation result
 */
export interface FileValidationResult {
  isValid: boolean;
  errors: string[];
  warnings?: string[];
}

/**
 * File upload error types
 */
export type FileUploadErrorType = 
  | "FILE_TOO_LARGE"
  | "INVALID_FORMAT"
  | "READ_ERROR"
  | "NETWORK_ERROR"
  | "VALIDATION_ERROR"
  | "UNKNOWN_ERROR";

/**
 * File upload error details
 */
export interface FileUploadError {
  type: FileUploadErrorType;
  message: string;
  details?: string;
  retryable?: boolean;
}

/**
 * File reading options for chunked reading
 */
export interface FileReadOptions {
  chunkSize?: number;
  onProgress?: (progress: number) => void;
  signal?: AbortSignal;
}

/**
 * Configuration validation options
 */
export interface ConfigValidationOptions {
  /** Validate configuration format */
  validateFormat?: boolean;
  /** Check for required fields */
  checkRequiredFields?: boolean;
  /** Validate network addresses */
  validateNetworkAddresses?: boolean;
  /** Custom validation function */
  customValidator?: QRL<(config: string) => FileValidationResult>;
}

/**
 * Base props for all FileInput components
 */
export interface FileInputBaseProps {
  /** Additional CSS classes */
  class?: string;
  /** Disable the input */
  disabled?: boolean;
  /** Show loading state */
  isLoading?: boolean;
  /** Error state */
  error?: FileUploadError | null;
  /** Unique identifier */
  id?: string;
  /** Test identifier for testing */
  testId?: string;
}

/**
 * Props for ConfigFileInput component
 */
export interface ConfigFileInputProps extends FileInputBaseProps {
  /** Current configuration value */
  config: string;
  /** Configuration change handler */
  onConfigChange$: QRL<(value: string) => void>;
  /** File upload handler */
  onFileUpload$: QRL<(event: Event) => void>;
  /** Custom placeholder text */
  placeholder?: string;
  /** VPN protocol type */
  vpnType?: VPNProtocolType;
  /** Maximum file size in bytes */
  maxFileSize?: number;
  /** Validation options */
  validationOptions?: ConfigValidationOptions;
  /** Show character count */
  showCharCount?: boolean;
  /** Enable auto-resize for textarea */
  autoResize?: boolean;
}

/**
 * Props for VPNConfigFileSection component
 */
export interface VPNConfigFileSectionProps extends FileInputBaseProps {
  /** Protocol display name */
  protocolName: string;
  /** Accepted file extensions */
  acceptedExtensions: string;
  /** Current configuration value */
  configValue: string;
  /** Configuration change handler */
  onConfigChange$: QRL<(value: string) => void>;
  /** File upload handler */
  onFileUpload$: QRL<(event: Event, element: HTMLInputElement) => void>;
  /** Custom placeholder text */
  placeholder?: string;
  /** Upload in progress */
  isUploading?: boolean;
  /** Upload progress percentage (0-100) */
  uploadProgress?: number;
  /** Enable chunked file reading */
  enableChunkedReading?: boolean;
  /** File read options */
  fileReadOptions?: FileReadOptions;
  /** Validation options */
  validationOptions?: ConfigValidationOptions;
  /** Show drop zone hint */
  showDropHint?: boolean;
  /** Custom drop zone message */
  dropZoneMessage?: string;
}

/**
 * Props for FileInputError component
 */
export interface FileInputErrorProps {
  /** Error object */
  error: FileUploadError;
  /** Retry handler */
  onRetry$?: QRL<() => void>;
  /** Dismiss handler */
  onDismiss$?: QRL<() => void>;
  /** Auto-dismiss after milliseconds */
  autoDismissMs?: number;
  /** Error display variant */
  variant?: "inline" | "toast" | "banner";
}

/**
 * Props for FileInputSkeleton component
 */
export interface FileInputSkeletonProps {
  /** Skeleton variant */
  variant?: "simple" | "advanced";
  /** Show animation */
  animate?: boolean;
  /** Number of lines to show */
  lines?: number;
}

/**
 * Props for FileTypeIcon component
 */
export interface FileTypeIconProps {
  /** File extension or VPN type */
  fileType: string | VPNProtocolType;
  /** Icon size */
  size?: "sm" | "md" | "lg";
  /** Additional CSS classes */
  class?: string;
}

/**
 * File information after processing
 */
export interface FileInfo {
  /** File name */
  name: string;
  /** File size in bytes */
  size: number;
  /** File type/extension */
  type: string;
  /** Last modified date */
  lastModified: Date;
  /** File content */
  content?: string;
}

/**
 * Configuration parsing result
 */
export interface ConfigParseResult {
  /** Parsed configuration sections */
  sections: Map<string, Record<string, string>>;
  /** Raw configuration */
  raw: string;
  /** Detected protocol type */
  detectedProtocol?: VPNProtocolType;
  /** Parsing warnings */
  warnings?: string[];
}

/**
 * Hook return type for file input logic
 */
export interface UseFileInputReturn {
  /** Current configuration */
  config: Signal<string>;
  /** Loading state */
  isLoading: Signal<boolean>;
  /** Error state */
  error: Signal<FileUploadError | null>;
  /** File info */
  fileInfo: Signal<FileInfo | null>;
  /** Handle configuration change */
  handleConfigChange$: QRL<(value: string) => void>;
  /** Handle file upload */
  handleFileUpload$: QRL<(event: Event) => Promise<void>>;
  /** Handle paste */
  handlePaste$: QRL<() => Promise<void>>;
  /** Clear configuration */
  clearConfig$: QRL<() => void>;
  /** Validate configuration */
  validateConfig$: QRL<() => Promise<FileValidationResult>>;
}

/**
 * Context for FileInput components
 */
export interface FileInputContextValue {
  /** Shared configuration state */
  config: Signal<string>;
  /** Shared error state */
  error: Signal<FileUploadError | null>;
  /** Shared loading state */
  isLoading: Signal<boolean>;
  /** Global validation options */
  validationOptions?: ConfigValidationOptions;
  /** Global file size limit */
  maxFileSize?: number;
}