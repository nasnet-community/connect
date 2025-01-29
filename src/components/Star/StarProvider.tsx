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
  type GameConfig,
} from "./StarContext";

export const StarContextProvider = component$(() => {
  const state = useStore<StarState>({
    Mode: "easy",
    Choose: {
      Firmware: {
        Name: "",
      },
      RouterMode: {
        Mode: "",
      },
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
      Easy: {
        isWifi2_4: false,
        isWifi5: false,
        Foreign: {
          interface: "",
          WirelessCredentials: {
            SSID: "",
            Password: "",
          },
        },
        Domestic: {
          interface: "",
          WirelessCredentials: {
            SSID: "",
            Password: "",
          },
        },
        VPNClient: {
          VPNType: "",
          Wireguard: [],
          OpenVPN: "",
          PPTP: "",
          L2TP: "",
          SSTP: "",
          IKeV2: "",
        },
      },
    },
    LAN: {
      Wireless: {
        isWireless: false,
        isMultiSSID: "",
        SingleMode: {
          WirelessCredentials: {
            SSID: "",
            Password: "",
          },
        },
        MultiMode: {
          SamePassword: "",
          isSamePassword: false,
          Starlink: {
            SSID: "",
            Password: "",
          },
          Domestic: {
            SSID: "",
            Password: "",
          },
          Split: {
            SSID: "",
            Password: "",
          },
          VPN: {
            SSID: "",
            Password: "",
          },
        },
      },
      VPNServer: {
        Wireguard: false,
        OpenVPN: false,
        PPTP: false,
        L2TP: false,
        SSTP: false,
        IKeV2: false,
        Users: [],
        OpenVPNConfig: {
          Passphrase: "",
        },
      },
      Subnet: {
        LANSubnet: "",
        VLANSubnets: [],
        DHCPServer: {
          enabled: false,
          poolStart: "",
          poolEnd: "",
          leaseTime: "",
        },
      },
      Interfaces: {
        LAN: [],
        VLAN: [],
        Bridge: [],
      },
    },
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
    updateMode$: $((mode) => {
      state.Mode = mode;
    }),
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
