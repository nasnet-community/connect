import { createStepperContext } from "~/components/Core/Stepper/CStepper";
import type { VPNType } from "../../../StarContext/CommonType";
import type { VSCredentials } from "../../../StarContext/Utils/VPNServerType";

// Context data for VPN Server settings
export interface VPNServerContextData {
  enabledProtocols: Record<VPNType, boolean>;
  expandedSections: Record<string, boolean>;
  users: VSCredentials[];
  isValid: { value: boolean };
  stepState: {
    protocols: boolean;
    config: boolean;
    users: boolean;
  };
  preventStepRecalculation?: boolean;
  savedStepIndex?: number;
}

export const VPNServerContextId =
  createStepperContext<VPNServerContextData>("vpn-server");