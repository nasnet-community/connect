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
import type { Ethernet } from "./CommonType";

export const StarContextProvider = component$(() => {
  const state = useStore<StarState>({
    Choose: {
      Mode: "easy" as Mode,
      Firmware:"" as FrimwareType,
      RouterMode: "" as RouterModeType,
      DometicLink: null as unknown as boolean,
      RouterModels: [],
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
