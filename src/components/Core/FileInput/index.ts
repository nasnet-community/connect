/**
 * FileInput Module
 * 
 * Provides specialized components for handling VPN configuration files
 * with support for upload, paste, drag-and-drop, and validation.
 * 
 * @module FileInput
 */

// Component exports
export * from "./ConfigFileInput";
export * from "./VPNConfigFileSection";

// Type exports
export type {
  VPNProtocolType,
  FileValidationResult,
  FileUploadErrorType,
  FileUploadError,
  FileReadOptions,
  ConfigValidationOptions,
  FileInputBaseProps,
  ConfigFileInputProps,
  VPNConfigFileSectionProps,
  FileInputErrorProps,
  FileInputSkeletonProps,
  FileTypeIconProps,
  FileInfo,
  ConfigParseResult,
  UseFileInputReturn,
  FileInputContextValue,
} from "./types";

// Utility components
export { FileInputError } from "./FileInputError";
export { FileInputSkeleton } from "./FileInputSkeleton";
export { FileTypeIcon } from "./FileTypeIcon";
