import {
  component$,
  useContextProvider,
  useStore,
  $,
  Slot,
} from "@builder.io/qwik";
import {
  StarContext,
  type StarState,
  type StarContextType,
} from "./StarContext";
import type { Mode, FrimwareType, RouterModeType, WANLinkType } from "./ChooseType";
import type { Ethernet } from "./CommonType";

export const StarContextProvider = component$(() => {
  const state = useStore<StarState>({
    Choose: {
      Mode: "" as Mode,
      Firmware: "" as FrimwareType,
      RouterMode: "" as RouterModeType,
      WANLinkType: "both" as WANLinkType,
      RouterModels: [],
      Newsletter: {
        isSubscribed: false,
        userUUID: undefined,
        email: undefined,
      },
    },
    WAN: {
      WANLink: {
        Foreign: {
          InterfaceName: "" as Ethernet,
        },
      },
    },
    LAN: {},
    ExtraConfig: {},
    ShowConfig: {},
  });

  const updateChoose$ = $((data: Partial<typeof state.Choose>) => {
    Object.assign(state.Choose, data);
  });

  const updateWAN$ = $((data: Partial<typeof state.WAN>) => {
    Object.assign(state.WAN, data);
  });

  const updateLAN$ = $((data: Partial<typeof state.LAN>) => {
    Object.assign(state.LAN, data);
  });

  const updateExtraConfig$ = $((data: Partial<typeof state.ExtraConfig>) => {
    Object.assign(state.ExtraConfig, data);
  });

  const updateShowConfig$ = $((data: Partial<typeof state.ShowConfig>) => {
    Object.assign(state.ShowConfig, data);
  });

  const contextValue: StarContextType = {
    state,
    updateChoose$,
    updateWAN$,
    updateLAN$,
    updateExtraConfig$,
    updateShowConfig$,
  };

  useContextProvider(StarContext, contextValue);

  return <Slot />;
});
