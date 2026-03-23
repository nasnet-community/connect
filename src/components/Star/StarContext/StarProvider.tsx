import {
  component$,
  useContextProvider,
  useStore,
  $,
  Slot,
  useVisibleTask$,
  isDev,
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
      Firmware: "MikroTik" as FirmwareType,
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

  // Expose a minimal state snapshot for browser E2E tests running in dev mode.
  // This keeps Playwright assertions focused on actual stored wizard state.
  useVisibleTask$(({ track }) => {
    if (!isDev || typeof window === "undefined" || !(window as any).__PLAYWRIGHT_TEST__) {
      return;
    }

    const chooseSnapshot = () => ({
      Mode: state.Choose.Mode,
      Firmware: state.Choose.Firmware,
      RouterMode: state.Choose.RouterMode,
      WANLinkType: state.Choose.WANLinkType,
      TrunkInterfaceType: state.Choose.TrunkInterfaceType,
      RouterModels: state.Choose.RouterModels.map((routerModel) => ({
        Model: routerModel.Model,
        isMaster: routerModel.isMaster,
        MasterSlaveInterface: routerModel.MasterSlaveInterface,
        isCHR: routerModel.isCHR,
        cpuArch: routerModel.cpuArch,
      })),
    });

    track(() => JSON.stringify(chooseSnapshot()));

    (window as any).__NASNET_TEST_STATE__ = {
      Choose: chooseSnapshot(),
    };
  });

  useContextProvider(StarContext, contextValue);

  return <Slot />;
});
