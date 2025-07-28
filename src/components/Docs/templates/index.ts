export { OverviewTemplate } from "./OverviewTemplate";
export { ExamplesTemplate } from "./ExamplesTemplate";
export { APIReferenceTemplate } from "./APIReferenceTemplate";
export { UsageTemplate } from "./UsageTemplate";
export { PlaygroundTemplate } from "./PlaygroundTemplate";

// Aliases for backward compatibility
export { OverviewTemplate as ComponentDocTemplate } from "./OverviewTemplate";

// Export interfaces
export type { OverviewTemplateProps } from "./OverviewTemplate";
export type { Example, ExamplesTemplateProps } from "./ExamplesTemplate";
export type {
  PropDetail,
  EventDetail,
  MethodDetail,
  TypeDefinition,
  APIReferenceTemplateProps,
} from "./APIReferenceTemplate";

// Aliases for backward compatibility
export type {
  PropDetail as PropDefinition,
  EventDetail as EventDefinition,
} from "./APIReferenceTemplate";
export type {
  UsageGuideline,
  BestPractice,
  AccessibilityTip,
  UsageTemplateProps,
} from "./UsageTemplate";
export type {
  ControlOption,
  PropertyControl,
  PlaygroundTemplateProps,
} from "./PlaygroundTemplate";

// Documentation index interface for route loaders
export interface DocumentationIndexProps {
  title: string;
  description: string;
  githubLink: string;
  NPMLink: string;
  sections: Array<{
    title: string;
    description: string;
    slug: string;
  }>;
}
