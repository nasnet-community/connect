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
import type { Mode, FrimwareType, RouterModeType } from "./ChooseType";

export const StarContextProvider = component$(() => {
  const state = useStore<StarState>({
    Choose: {
      Mode: "" as Mode,
      Firmware:"" as FrimwareType,
      RouterMode: "" as RouterModeType,
      RouterModels: [],
    },
    WAN: {
      WANLink: {
        isWifi2_4: false,
        isWifi5: false,
        Foreign: {
          InterfaceName: "",
        },
      },
    },
    LAN: {},
    ExtraConfig: {},
    ShowConfig: {},
  });

  const contextValue: StarContextType = {
    state,
    updateChoose$: $((data) => {
      Object.assign(state.Choose, data);
    }),
    updateWAN$: $((data) => {
      Object.assign(state.WAN, data);
    }),
    updateLAN$: $((data) => {
      Object.assign(state.LAN, data);
    }),
    updateExtraConfig$: $((data) => {
      Object.assign(state.ExtraConfig, data);
    }),
    updateShowConfig$: $((data) => {
      Object.assign(state.ShowConfig, data);
    }),
  };

  useContextProvider(StarContext, contextValue);

  return <Slot />;
});
