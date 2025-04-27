import { createContextId, type QRL } from "@builder.io/qwik";
import type { ChooseState } from "./ChooseType";
import type { WANState } from "./WANType";
import type { LANState } from "./LANType";
import type { ExtraConfigState } from "./ExtraType";
import type { VPNType } from "./CommonType";



export interface StarState {
  Choose: ChooseState;
  WAN: WANState;
  LAN: LANState;
  ExtraConfig: ExtraConfigState;
  ShowConfig: Record<string, unknown>;
}

export interface StarContextType {
  state: StarState;
  updateChoose$: QRL<(data: Partial<ChooseState>) => void>;
  updateWAN$: QRL<(data: Partial<WANState>) => void>;
  updateLAN$: QRL<(data: Partial<StarState["LAN"]>) => void>;
  updateExtraConfig$: QRL<(data: Partial<ExtraConfigState>) => void>;
  updateShowConfig$: QRL<(data: Partial<StarState["ShowConfig"]>) => void>;
}

export const StarContext = createContextId<StarContextType>("star-context");

export type { VPNType };
