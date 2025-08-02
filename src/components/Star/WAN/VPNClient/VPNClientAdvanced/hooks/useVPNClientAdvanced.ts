import type { QRL } from "@builder.io/qwik";
import type {
  VPNConfig,
  VPNClientAdvancedState,
  NewVPNConfig,
  VPNType,
} from "../types/VPNClientAdvancedTypes";

export interface UseVPNClientAdvancedReturn {
  state: VPNClientAdvancedState;
  addVPN$: QRL<(config: NewVPNConfig) => void>;
  removeVPN$: QRL<(id: string) => void>;
  updateVPN$: QRL<(id: string, updates: Partial<VPNConfig>) => Promise<void>>;
  setPriorities$: QRL<(priorities: string[]) => void>;
  resetVPNs$: QRL<() => void>;
  moveVPNPriority$: QRL<(id: string, direction: "up" | "down") => void>;
  generateVPNName$: QRL<(type: VPNType, index: number) => string>;
  minVPNCount: number;
  validateVPN$?: QRL<(vpn: VPNConfig) => Promise<any>>;
  validateAll$?: QRL<(state: VPNClientAdvancedState) => Promise<any>>;
  applyConfiguration$?: QRL<() => Promise<void>>;
}
