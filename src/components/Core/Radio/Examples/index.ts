/**
 * Radio component examples
 * 
 * This module exports all radio component examples for documentation
 * and demonstration purposes.
 */

// Basic Examples
export { default as BasicRadioExample } from './BasicRadioExample';
export { RadioWithoutLabelsExample, RequiredRadioExample } from './BasicRadioExample';

// Radio Group Examples
export { default as RadioGroupExample } from './RadioGroupExample';

// Size Examples
export { default as RadioSizesExample } from './RadioSizesExample';

// State Examples
export { default as RadioStatesExample } from './RadioStatesExample';
export { 
  DisabledRadioExample,
  CheckedStatesExample,
  RequiredFieldsExample,
  MixedStatesExample
} from './RadioStatesExample';

// Responsive Examples
export { default as ResponsiveRadioExample } from './ResponsiveRadioExample';
export {
  MobileOptimizedExample,
  ResponsiveLayoutExample,
  AdaptiveSizeExample,
  CompactMobileExample,
  BreakpointExample
} from './ResponsiveRadioExample';

// Accessibility Examples
export { default as AccessibilityExample } from './AccessibilityExample';
export {
  AriaLabelsExample,
  KeyboardNavigationExample,
  ScreenReaderExample,
  FocusManagementExample,
  HighContrastExample
} from './AccessibilityExample';

// Custom Styling Examples
export { default as CustomStylingExample } from './CustomStylingExample';
export {
  CustomColorsExample,
  CardStyleExample,
  ButtonStyleExample,
  IconRadioExample,
  GradientStyleExample
} from './CustomStylingExample';

// Enhanced Responsive Examples (New)
export { default as EnhancedResponsiveExample } from './EnhancedResponsiveExample';
export {
  MobileOptimizedRadio,
  ResponsiveSizingExample,
  ThemeVariantsExample,
  AnimationControlExample,
  TouchTargetExample
} from './EnhancedResponsiveExample';

// Real-World Examples (New)
export { default as RealWorldExample } from './RealWorldExample';
export {
  FormValidationExample,
  PerformanceOptimizedExample,
  ComplexLayoutExample
} from './RealWorldExample';

// Advanced Animation Examples (New)
export { default as AdvancedAnimationExample } from './AdvancedAnimationExample';
export {
  MicroInteractionsExample,
  ResponsiveAnimationsExample,
  StaggeredAnimationsExample
} from './AdvancedAnimationExample';

// Container Query Examples (New)
export { default as ContainerQueryExample } from './ContainerQueryExample';
export {
  ContainerBasedResponsivenessExample,
  ContainerQueryBreakpointsExample,
  NestedContainerExample
} from './ContainerQueryExample';

/**
 * Note: The radioExamples object has been removed to avoid circular dependencies.
 * Import the examples directly from their respective files as needed.
 */

/**
 * Example categories for documentation organization
 */
export const exampleCategories = [
  {
    title: 'Basic Usage',
    description: 'Fundamental radio button implementations',
    examples: ['BasicRadioExample', 'RadioWithoutLabelsExample', 'RequiredRadioExample'],
  },
  {
    title: 'Radio Groups',
    description: 'Grouped radio button collections',
    examples: ['RadioGroupExample'],
  },
  {
    title: 'Sizes & Variants',
    description: 'Different size options and visual variants',
    examples: ['RadioSizesExample'],
  },
  {
    title: 'States & Validation',
    description: 'Various states including disabled, checked, and required',
    examples: ['DisabledRadioExample', 'CheckedStatesExample', 'RequiredFieldsExample', 'MixedStatesExample'],
  },
  {
    title: 'Responsive Design',
    description: 'Mobile-first and adaptive layouts',
    examples: ['MobileOptimizedExample', 'ResponsiveLayoutExample', 'AdaptiveSizeExample', 'CompactMobileExample', 'BreakpointExample'],
  },
  {
    title: 'Accessibility',
    description: 'WCAG compliant and screen reader optimized examples',
    examples: ['AriaLabelsExample', 'KeyboardNavigationExample', 'ScreenReaderExample', 'FocusManagementExample', 'HighContrastExample'],
  },
  {
    title: 'Custom Styling',
    description: 'Advanced styling techniques and theming',
    examples: ['CustomColorsExample', 'CardStyleExample', 'ButtonStyleExample', 'IconRadioExample', 'GradientStyleExample'],
  },
  {
    title: 'Enhanced Features',
    description: 'New mobile-optimized features with theme integration and animations',
    examples: ['MobileOptimizedRadio', 'ResponsiveSizingExample', 'ThemeVariantsExample', 'AnimationControlExample', 'TouchTargetExample'],
  },
  {
    title: 'Real-World Patterns',
    description: 'Production-ready examples with form validation, performance optimization, and complex layouts',
    examples: ['FormValidationExample', 'PerformanceOptimizedExample', 'ComplexLayoutExample'],
  },
  {
    title: 'Advanced Animations',
    description: 'Micro-interactions, responsive animations, and staggered timing effects using tailwind config',
    examples: ['MicroInteractionsExample', 'ResponsiveAnimationsExample', 'StaggeredAnimationsExample'],
  },
  {
    title: 'Container Queries',
    description: 'Component-level responsive behavior using CSS container queries for adaptive layouts',
    examples: ['ContainerBasedResponsivenessExample', 'ContainerQueryBreakpointsExample', 'NestedContainerExample'],
  },
] as const;