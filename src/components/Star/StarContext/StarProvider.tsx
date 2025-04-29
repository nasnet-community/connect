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
import type { GameConfig } from "./ExtraType";

export const StarContextProvider = component$(() => {
  const state = useStore<StarState>({
    Choose: {
      Mode: "easy",
      Firmware:"MikroTik" ,
      RouterMode: "" ,
      RouterModel: {
        Model: [],
        Interfaces: {
          "hAP AX2": [
            "ether1",
            "ether2",
            "ether3",
            "ether4",
            "ether5",
            "wifi5",
            "wifi2.4",
          ],
          "hAP AX3": [
            "ether1",
            "ether2",
            "ether3",
            "ether4",
            "ether5",
            "wifi5",
            "wifi2.4",
          ],
          RB5009: [
            "ether1",
            "ether2",
            "ether3",
            "ether4",
            "ether5",
            "ether6",
            "ether7",
            "ether8",
          ],
        },
      },
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
    ExtraConfig: {
      RouterIdentity: "",
      isRomon: false,
      services: {
        api: "Disable",
        apissl: "Disable",
        ftp: "Disable",
        ssh: "Disable",
        telnet: "Disable",
        winbox: "Enable",
        web: "Disable",
        webssl: "Disable",
      },
      Timezone: "Asia/Tehran",
      AutoReboot: {
        isAutoReboot: false,
        RebootTime: "",
      },
      Update: {
        isAutoReboot: false,
        UpdateTime: "",
        UpdateInterval: "",
      },
      isCertificate: false,
      isNTP: false,
      isGraphing: false,
      isDDNS: false,
      isLetsEncrypt: false,
      Games: [] as GameConfig[],
    },
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
