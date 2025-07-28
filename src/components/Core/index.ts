/**
 * @file Core component library index
 *
 * This file exports all Core components and types
 * organized by category.
 * It serves as the main entry point for importing components from the design system.
 */

//-------------------------------
// Layout primitives
export * from "./Layout";

//-------------------------------
// Utility Exports
//-------------------------------
import * as CoreUtils from "./common";
export { CoreUtils };

// Visually Hidden (accessibility helper)
import { VisuallyHidden } from "./common/VisuallyHidden";
export { VisuallyHidden };

//-------------------------------
// Typography Components
//-------------------------------
export * from "./Typography";

//-------------------------------
// Button Components
//-------------------------------
export * from "./button";

//-------------------------------
// Icon Components
//-------------------------------
export * from "./Iconography";

//-------------------------------
// Form Components
//-------------------------------

// Field Components
import { Field } from "./Form/Field/Field";
import { FormLabel } from "./Form/FormLabel/FormLabel";
import { FormHelperText } from "./Form/FormHelperText/FormHelperText";
import { FormErrorMessage } from "./Form/FormErrorMessage/FormErrorMessage";
import { Container as FormContainer } from "./Form/Container/Container";

// Input Components
import { Input } from "./Input/Input";
import { PasswordField } from "./Form/PasswordField/PasswordField";

// TextArea Component
export * from "./Form/TextArea";

// Select Components
import { UnifiedSelect } from "./Select/UnifiedSelect";

// Checkbox Components
import { Checkbox } from "./Form/Checkbox/Checkbox";
import { CheckboxGroup } from "./Form/Checkbox/CheckboxGroup";

// Radio Components
import { Radio } from "./Radio/Radio";
import { RadioGroup as RadioGroupOriginal } from "./Radio/RadioGroup";
// Using Form/RadioGroup as the primary implementation
// The original RadioGroup is still available as RadioGroupOriginal for backwards compatibility
export * from "./Form/RadioGroup";

// Toggle/Switch Components
// Primary Toggle component for binary states
// Note: Toggle exports ResponsiveSize which conflicts with Typography ResponsiveSize
// Export individual components to avoid naming conflicts
export { Toggle } from "./Toggle/Toggle";
export type { ToggleProps, ToggleSize, ToggleColor, LabelPosition } from "./Toggle/Toggle.types";
// Rename Toggle's ResponsiveSize to avoid conflict with Typography's ResponsiveSize
export type { ResponsiveSize as ToggleResponsiveSize } from "./Toggle/Toggle.types";

// @deprecated Switch components - use Toggle instead for new code
export * from "./Switch";
import { ConfigMethodToggle } from "./Switch/ConfigMethodToggle";

// Time Picker
export * from "./TimePicker";
import { TimePicker } from "./TimePicker/Timepicker";

// Date Picker
export * from "./Form/DatePicker";

// Slider Component
export * from "./Form/Slider";

// File Upload Component
export * from "./Form/FileUpload";

// File Input Components
import { ConfigFileInput } from "./FileInput/ConfigFileInput/ConfigFileInput";
import { VPNConfigFileSection } from "./FileInput/VPNConfigFileSection/VPNConfigFileSection";

//-------------------------------
// DataDisplay Components
//-------------------------------
export * from "./DataDisplay";

// Re-export commonly used DataDisplay components for convenience
// IMPORTANT: Use these components instead of creating custom implementations
// Note: These are exported in the main export object below
import { Spinner } from "./DataDisplay/Progress/Spinner";
import { ProgressBar } from "./DataDisplay/Progress/ProgressBar";

//-------------------------------
// Media Components
//-------------------------------
export * from "./Media";

//-------------------------------
// Feedback Components
//-------------------------------
import { Alert } from "./Feedback/Alert/Alert";
import { ErrorMessage } from "./Feedback/ErrorMessage/ErrorMessage";
import { PromoBanner } from "./Feedback/PromoBanner/PromoBanner";
import { Dialog } from "./Feedback/Dialog/Dialog";
import { Drawer } from "./Feedback/Drawer/Drawer";

//-------------------------------
// Layout Components
//-------------------------------
// Card component is now exported from DataDisplay
// Updated: Modal component is being replaced by Dialog component
// For backwards compatibility we'll keep the export but mark as deprecated
export * from "./Modal";

// Navigation
import { TabNavigation } from "./Navigation/TabNavigation/TabNavigation";

// Stepper Components
export * from "./Stepper";
export * from "./Stepper/CStepper";
// Import specific stepper components if needed
import { StateViewer } from "./Stepper/StateViewer/StateViewer";

// Graph Components
export * from "./Graph";

/**
 * Main component exports
 *
 * Components are organized by category and named using consistent conventions.
 * Some components are renamed for backward compatibility or clarity.
 *
 * @example
 * // Import multiple components
 * import { FormField, Button, Checkbox } from "~/components/Core";
 *
 * // Use in a component
 * <FormField label="Name" helperText="Enter your full name">
 *   <Input type="text" name="name" />
 * </FormField>
 */
export {
  // Form Field Components
  /**
   * Core form field component with label, helper text, and validation support
   * @param label - Field label text
   * @param helperText - Optional helper text displayed below the field
   * @param error - Optional error message when validation fails
   */
  Field as FormField,

  /**
   * Form label component for form controls
   * @param required - Whether the field is required (adds * indicator)
   */
  FormLabel,

  /**
   * Helper text component for form fields
   * @param text - Helper text content
   */
  FormHelperText,

  /**
   * Error message component for form validation
   * @param message - Error message text
   */
  FormErrorMessage,

  /**
   * Container component for grouping form elements
   */
  FormContainer,

  // Input Components
  /**
   * Base text input component
   * @param type - Input type (text, email, number, etc.)
   * @param value - Current input value
   * @param onInput$ - Handler for input changes
   */
  Input,

  /**
   * Enhanced password field with visibility toggle and strength indicator
   * @param value - Current password value
   * @param showStrength - Whether to show password strength indicator
   */
  PasswordField,

  /**
   * Time picker component
   * @param value - Selected time value
   * @param onChange$ - Handler for time changes
   */
  TimePicker,

  // Select Component
  /**
   * Enhanced select component supporting options, groups, and custom rendering
   * @param options - Array of select options
   * @param value - Current selected value
   * @param onValueChange$ - Handler for selection changes
   */
  UnifiedSelect as Select, // UnifiedSelect with native mode as default for backward compatibility

  // Checkbox Components
  /**
   * Checkbox component for boolean input
   * @param checked - Whether the checkbox is checked
   * @param onChange$ - Handler for checked state changes
   * @param label - Label text
   */
  Checkbox,

  /**
   * Manages a group of related checkbox options
   * @param options - Array of checkbox options
   * @param selected - Array of selected values
   * @param onToggle$ - Handler when an option is toggled
   */
  CheckboxGroup,

  // Radio Components
  /**
   * Individual radio button component
   * @param checked - Whether the radio is checked
   * @param onChange$ - Handler for checked state changes
   * @param value - Radio button value
   */
  Radio,

  /**
   * Manages a group of related radio options
   * @param options - Array of radio options
   * @param value - Current selected value
   * @param onChange$ - Handler for selection changes
   */
  RadioGroupOriginal as RadioGroup,

  // Toggle/Switch Components
  /**
   * Toggle for configuring method selection
   * @param value - Current toggle value
   * @param onChange$ - Handler for value changes
   */
  ConfigMethodToggle,

  // File Input Components
  /**
   * File input component for configuration files
   * @param onFileLoad$ - Handler for file load events
   */
  ConfigFileInput,

  /**
   * Section for VPN configuration file upload
   * @param onFileSelect$ - Handler for file selection
   */
  VPNConfigFileSection,

  // Feedback Components
  /**
   * Alert component for displaying messages with various statuses
   * @param status - Alert status (info, success, warning, error)
   * @param title - Alert title text
   */
  Alert,

  /**
   * Error message component for displaying validation errors
   * @param message - Error message text
   * @deprecated Use Alert component with status="error" instead
   */
  ErrorMessage,

  /**
   * Banner component for promotional messages
   * @param title - Banner title
   * @param description - Banner description
   */
  PromoBanner,

  /**
   * Dialog component for modal dialogs with improved accessibility
   * @param isOpen - Controls dialog visibility
   * @param onClose - Handler for close events
   */
  Dialog,

  /**
   * Drawer component for sliding panels
   * @param isOpen - Controls drawer visibility
   * @param onClose - Handler for close events
   */
  Drawer,

  // Navigation Components
  /**
   * Tab navigation component supporting various styles
   * @param tabs - Array of tab items
   * @param activeTab - ID of the active tab
   * @param onTabChange$ - Handler for tab changes
   * @param variant - Visual style (underline, pills, boxed, minimal)
   */
  TabNavigation,

  // Stepper Components
  /**
   * Component for viewing state of a stepper
   * @param states - Array of state items
   * @param currentState - Current active state
   */
  StateViewer,

  // Loading/Progress Components
  /**
   * Spinner component for indeterminate loading states
   * @param size - Size of the spinner (xs, sm, md, lg, xl)
   * @param variant - Visual style (border, grow, dots, bars, circle)
   * @param color - Color theme (primary, secondary, success, warning, error, info, white)
   * @param label - Optional loading text
   * @param centered - Centers the spinner in its container
   *
   * @example
   * // Basic usage
   * <Spinner />
   *
   * // In a button
   * <button disabled={isLoading}>
   *   {isLoading ? <Spinner size="sm" color="white" /> : <span>Submit</span>}
   * </button>
   *
   * // Full page loading
   * <Spinner centered label="Loading data..." />
   */
  Spinner,

  /**
   * Progress bar component for determinate loading states
   * @param value - Current progress value (0-100)
   * @param max - Maximum value (default: 100)
   * @param showLabel - Whether to show percentage label
   * @param animated - Whether to animate the progress bar
   */
  ProgressBar,
};
