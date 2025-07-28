import type { PropDetail, EventDetail, MethodDetail } from "../templates";

/**
 * Interface for component documentation data
 */
export interface ComponentDocumentationData {
  // Basic component information
  name: string;
  description: string;
  importStatement: string;

  // Overview section
  overview: {
    description: string;
    keyFeatures?: string[];
    whenToUse?: string[];
    whenNotToUse?: string[];
    componentIntegration?: string;
    customization?: string;
  };

  // API Reference section
  api: {
    props?: PropDetail[];
    events?: EventDetail[];
    methods?: MethodDetail[];
    cssVariables?: {
      name: string;
      description: string;
      defaultValue?: string;
    }[];
    dataAttributes?: { name: string; description: string }[];
  };

  // Examples section
  examples?: {
    title: string;
    description?: string;
    code: string;
    component: any; // The actual component to render
  }[];

  // Usage section
  usage?: {
    guidelines?: {
      title: string;
      description: string;
      code?: string;
      component?: any; // The actual component to render
      type: "do" | "dont";
    }[];
    bestPractices?: {
      title: string;
      description: string;
    }[];
    accessibilityTips?: {
      title: string;
      description: string;
    }[];
    performanceTips?: string[];
  };

  // Playground section
  playground?: {
    properties: {
      type: "text" | "select" | "number" | "boolean" | "color";
      name: string;
      label: string;
      defaultValue: any;
      options?: { label: string; value: string | number | boolean }[];
      min?: number;
      max?: number;
      step?: number;
    }[];
    defaultCode: string;
    component: any; // The actual component
  };
}

/**
 * Type for accessing a specific component documentation path
 */
export type ComponentDocPath = keyof ComponentDocumentationData;

/**
 * Interface for component documentation metadata
 */
export interface ComponentMetadata {
  name: string;
  path: string;
  category:
    | "layout"
    | "input"
    | "form"
    | "dataDisplay"
    | "navigation"
    | "feedback"
    | "typography"
    | "other";
  description: string;
}

/**
 * Component category information
 */
export interface ComponentCategory {
  id: string;
  name: string;
  description: string;
  components: ComponentMetadata[];
}

/**
 * All component categories
 */
export const COMPONENT_CATEGORIES: ComponentCategory[] = [
  {
    id: "layout",
    name: "Layout",
    description:
      "Components for creating layouts and organizing content on the page.",
    components: [],
  },
  {
    id: "input",
    name: "Input",
    description:
      "Components for collecting user input through various interactive elements.",
    components: [],
  },
  {
    id: "form",
    name: "Form",
    description: "Form-related components for data collection and user input.",
    components: [],
  },
  {
    id: "dataDisplay",
    name: "Data Display",
    description:
      "Components for displaying data in various formats and structures.",
    components: [],
  },
  {
    id: "navigation",
    name: "Navigation",
    description: "Components for navigating within the application.",
    components: [],
  },
  {
    id: "feedback",
    name: "Feedback",
    description: "Components for providing feedback to users.",
    components: [],
  },
  {
    id: "typography",
    name: "Typography",
    description: "Components for text styling and presentation.",
    components: [],
  },
  {
    id: "other",
    name: "Other",
    description: "Additional components that don't fit into other categories.",
    components: [],
  },
];
