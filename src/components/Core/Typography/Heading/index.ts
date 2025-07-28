/**
 * Heading Component
 *
 * This file exports the Heading component and related types.
 * Heading provides a consistent way to display headings with proper
 * typography styles, responsive sizing, and semantic flexibility.
 */

import { Heading } from "./Heading";
import type {
  HeadingProps,
  HeadingLevel,
  HeadingWeight,
  HeadingAlignment,
  HeadingColor,
  ResponsiveSize,
} from "./Heading.types";

export {
  Heading,
  // Types
  type HeadingProps,
  type HeadingLevel,
  type HeadingWeight,
  type HeadingAlignment,
  type HeadingColor,
  type ResponsiveSize,
};

export default Heading;
