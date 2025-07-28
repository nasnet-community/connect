// Image Documentation Exports
export { default as ImageOverview } from "./Overview";
export { default as ImageAPIReference } from "./APIReference";
export { default as ImageExamples } from "./Examples";
export { default as ImageUsage } from "./Usage";
export { default as ImagePlayground } from "./Playground";

// Re-export all as named exports for easier importing
import ImageOverview from "./Overview";
import ImageAPIReference from "./APIReference";
import ImageExamples from "./Examples";
import ImageUsage from "./Usage";
import ImagePlayground from "./Playground";

export {
  ImageOverview as Overview,
  ImageAPIReference as APIReference,
  ImageExamples as Examples,
  ImageUsage as Usage,
  ImagePlayground as Playground,
};

// Documentation navigation structure
export const imageDocNavigation = [
  {
    title: "Overview",
    href: "/docs/components/media/image/overview",
    component: "ImageOverview",
  },
  {
    title: "API Reference",
    href: "/docs/components/media/image/api",
    component: "ImageAPIReference",
  },
  {
    title: "Examples",
    href: "/docs/components/media/image/examples",
    component: "ImageExamples",
  },
  {
    title: "Usage Guidelines",
    href: "/docs/components/media/image/usage",
    component: "ImageUsage",
  },
  {
    title: "Playground",
    href: "/docs/components/media/image/playground",
    component: "ImagePlayground",
  },
] as const;

// Component metadata
export const imageMetadata = {
  name: "Image",
  category: "Media",
  description: "Enhanced image component with lazy loading, placeholders, and error handling",
  version: "1.0.0",
  status: "stable",
  documentation: imageDocNavigation,
} as const;