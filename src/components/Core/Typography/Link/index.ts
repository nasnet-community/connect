/**
 * The Link component provides consistent styling for both internal and external links
 * with automatic handling of routing and security features
 *
 * @example
 * ```tsx
 * import { Link } from "~/components/Core/Typography";
 *
 * // Internal link (uses Qwik routing)
 * <Link href="/about">About Us</Link>
 *
 * // External link (automatic security attributes)
 * <Link href="https://qwik.builder.io/">Qwik Documentation</Link>
 * ```
 */
export { Link } from "./Link";
export type {
  LinkProps,
  LinkColor,
  LinkSize,
  LinkUnderline,
  LinkVariant,
  LinkWeight,
} from "./Link.types";
