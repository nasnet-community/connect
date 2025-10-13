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
import type { Mode, FirmwareType, RouterModeType, WANLinkType } from "./ChooseType";

export const StarContextProvider = component$(() => {
  const state = useStore<StarState>({
    Choose: {
      Mode: "" as Mode,
      Firmware: "" as FirmwareType,
      RouterMode: "" as RouterModeType,
      WANLinkType: "" as WANLinkType,
      RouterModels: [],
      Networks: {}
    },
    WAN: {
      WANLink: {},
    },
    LAN: {},
    ExtraConfig: {
      RUI: {
        Timezone: "",
        IPAddressUpdate: { interval: "", time: "" },
      },
    },
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
