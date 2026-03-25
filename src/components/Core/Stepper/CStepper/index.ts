export { useCStepper } from "./hooks/useCStepper";
export { CStepper } from "./CStepper";
export {
  createStepperContext,
  useStepperContext,
} from "./hooks/useStepperContext";
export type { CStepMeta, CStepperProps, CStepperContext } from "./types";

// Export component structure
export { CStep } from "./components/CStep";
export { CStepperContent } from "./components/CStepperContent";
export { CStepperErrors } from "./components/CStepperErrors";
export { CStepperNavigation } from "./components/CStepperNavigation";
export { CStepperProgress } from "./components/CStepperProgress";
export { CStepperManagement } from "./components/CStepperManagement";

// Export context integration
export { useProvideStepperContext } from "./hooks/useProvideStepperContext";
