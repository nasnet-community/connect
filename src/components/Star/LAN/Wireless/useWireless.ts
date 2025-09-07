import { $, useContext, useSignal, useStore, useTask$ } from "@builder.io/qwik";
import type { NetworkKey, Networks } from "./type";
import { generatePasswordFromAPI, generateSSIDFromAPI } from "~/utils/api";
import { StarContext } from "../../StarContext/StarContext";

export const useWirelessForm = () => {
  const starContext = useContext(StarContext);

  // Wireless should be enabled by default
  const wirelessEnabled = useSignal(true);
  const isMultiSSID = useSignal(false);
  const ssid = useSignal("");
  const password = useSignal("");
  const isHide = useSignal(false);
  const isDisabled = useSignal(false);
  const splitBand = useSignal(false);
  const isLoading = useSignal<Record<string, boolean>>({});
  const isFormValid = useSignal(false);

  const networks = useStore<Networks>({
    foreign: {
      ssid: "",
      password: "",
      isHide: false,
      isDisabled: false,
      splitBand: false,
    },
    domestic: {
      ssid: "",
      password: "",
      isHide: false,
      isDisabled: false,
      splitBand: false,
    },
    split: {
      ssid: "",
      password: "",
      isHide: false,
      isDisabled: false,
      splitBand: false,
    },
    vpn: {
      ssid: "",
      password: "",
      isHide: false,
      isDisabled: false,
      splitBand: false,
    },
  });

  const checkSamePassword = $(() => {
    if (!isMultiSSID.value) return;

    const isDomesticLinkEnabled = (starContext.state.Choose.WANLinkType === "domestic-only" || starContext.state.Choose.WANLinkType === "both");
    const enabledNetworks: Record<
      string,
      {
        SSID: string;
        Password: string;
        isHide: boolean;
        isDisabled: boolean;
        SplitBand: boolean;
      }
    > = {};

    if (!networks.foreign.isDisabled) {
      enabledNetworks.Foreign = {
        SSID: networks.foreign.ssid,
        Password: networks.foreign.password,
        isHide: networks.foreign.isHide,
        isDisabled: networks.foreign.isDisabled,
        SplitBand: networks.foreign.splitBand,
      };
    }

    // Only include domestic and split networks if DomesticLink is enabled
    if (isDomesticLinkEnabled && !networks.domestic.isDisabled) {
      enabledNetworks.Domestic = {
        SSID: networks.domestic.ssid,
        Password: networks.domestic.password,
        isHide: networks.domestic.isHide,
        isDisabled: networks.domestic.isDisabled,
        SplitBand: networks.domestic.splitBand,
      };
    }

    if (isDomesticLinkEnabled && !networks.split.isDisabled) {
      enabledNetworks.Split = {
        SSID: networks.split.ssid,
        Password: networks.split.password,
        isHide: networks.split.isHide,
        isDisabled: networks.split.isDisabled,
        SplitBand: networks.split.splitBand,
      };
    }

    if (!networks.vpn.isDisabled) {
      enabledNetworks.VPN = {
        SSID: networks.vpn.ssid,
        Password: networks.vpn.password,
        isHide: networks.vpn.isHide,
        isDisabled: networks.vpn.isDisabled,
        SplitBand: networks.vpn.splitBand,
      };
    }

    starContext.updateLAN$({
      Wireless: {
        MultiMode: enabledNetworks,
      },
    });
  });

  const generateAllPasswords = $(async () => {
    try {
      isLoading.value = { ...isLoading.value, allPasswords: true };
      const commonPassword = await generatePasswordFromAPI();

      const isDomesticLinkEnabled = (starContext.state.Choose.WANLinkType === "domestic-only" || starContext.state.Choose.WANLinkType === "both");

      // Only set passwords for available networks based on DomesticLink setting
      const availableNetworks = isDomesticLinkEnabled
        ? ["foreign", "domestic", "split", "vpn"]
        : ["foreign", "vpn"];

      availableNetworks.forEach((network) => {
        networks[network as NetworkKey].password = commonPassword;
      });

      const enabledNetworks: Record<
        string,
        {
          SSID: string;
          Password: string;
          isHide: boolean;
          isDisabled: boolean;
          SplitBand: boolean;
        }
      > = {};

      if (!networks.foreign.isDisabled) {
        enabledNetworks.Foreign = {
          SSID: networks.foreign.ssid,
          Password: networks.foreign.password,
          isHide: networks.foreign.isHide,
          isDisabled: networks.foreign.isDisabled,
          SplitBand: networks.foreign.splitBand,
        };
      }

      // Only include domestic and split networks if DomesticLink is enabled
      if (isDomesticLinkEnabled && !networks.domestic.isDisabled) {
        enabledNetworks.Domestic = {
          SSID: networks.domestic.ssid,
          Password: networks.domestic.password,
          isHide: networks.domestic.isHide,
          isDisabled: networks.domestic.isDisabled,
          SplitBand: networks.domestic.splitBand,
        };
      }

      if (isDomesticLinkEnabled && !networks.split.isDisabled) {
        enabledNetworks.Split = {
          SSID: networks.split.ssid,
          Password: networks.split.password,
          isHide: networks.split.isHide,
          isDisabled: networks.split.isDisabled,
          SplitBand: networks.split.splitBand,
        };
      }

      if (!networks.vpn.isDisabled) {
        enabledNetworks.VPN = {
          SSID: networks.vpn.ssid,
          Password: networks.vpn.password,
          isHide: networks.vpn.isHide,
          isDisabled: networks.vpn.isDisabled,
          SplitBand: networks.vpn.splitBand,
        };
      }

      starContext.updateLAN$({
        Wireless: {
          MultiMode: enabledNetworks,
        },
      });
    } catch (error) {
      console.error("Failed to generate common password:", error);
    } finally {
      isLoading.value = { ...isLoading.value, allPasswords: false };
    }
  });

  const generateNetworkPassword = $(async (network: NetworkKey) => {
    try {
      isLoading.value = { ...isLoading.value, [`${network}Password`]: true };
      networks[network].password = await generatePasswordFromAPI();
      await checkSamePassword();
    } catch (error) {
      console.error("Failed to generate network password:", error);
    } finally {
      isLoading.value = { ...isLoading.value, [`${network}Password`]: false };
    }
  });

  const toggleNetworkHide = $((network: NetworkKey, value?: boolean) => {
    networks[network].isHide = value !== undefined ? value : !networks[network].isHide;
  });

  const toggleNetworkDisabled = $((network: NetworkKey, value?: boolean) => {
    const isDomesticLinkEnabled = (starContext.state.Choose.WANLinkType === "domestic-only" || starContext.state.Choose.WANLinkType === "both");

    // Don't allow enabling domestic or split networks when DomesticLink is false
    if (
      !isDomesticLinkEnabled &&
      (network === "domestic" || network === "split")
    ) {
      return;
    }

    const newDisabledState = value !== undefined ? value : !networks[network].isDisabled;
    
    if (!newDisabledState) {
      // Enabling the network - just enable it
      networks[network].isDisabled = false;
    } else {
      // Disabling the network - check if we can
      // Count available networks based on DomesticLink setting
      const availableNetworks = isDomesticLinkEnabled
        ? ["foreign", "domestic", "split", "vpn"]
        : ["foreign", "vpn"];

      const enabledCount = availableNetworks
        .map((key) => networks[key as NetworkKey])
        .filter((n) => !n.isDisabled).length;

      if (enabledCount > 1) {
        networks[network].isDisabled = true;
      }
    }
  });

  const toggleNetworkSplitBand = $((network: NetworkKey, value?: boolean) => {
    networks[network].splitBand = value !== undefined ? value : !networks[network].splitBand;
  });

  const toggleSingleHide = $(() => {
    isHide.value = !isHide.value;
  });

  const toggleSingleDisabled = $(() => {
    isDisabled.value = !isDisabled.value;
  });

  const toggleSingleSplitBand = $(() => {
    splitBand.value = !splitBand.value;
  });

  useTask$(() => {
    const wirelessConfig = starContext.state.LAN.Wireless;

    if (wirelessConfig) {
      isMultiSSID.value = !!wirelessConfig.MultiMode;

      if (isMultiSSID.value && wirelessConfig.MultiMode) {
        const multiMode = wirelessConfig.MultiMode;

        if (multiMode.Foreign) {
          networks.foreign = {
            ssid: multiMode.Foreign.SSID,
            password: multiMode.Foreign.Password,
            isHide: multiMode.Foreign.isHide,
            isDisabled: multiMode.Foreign.isDisabled,
            splitBand: multiMode.Foreign.SplitBand || false,
          };
        }

        if (multiMode.Domestic) {
          networks.domestic = {
            ssid: multiMode.Domestic.SSID,
            password: multiMode.Domestic.Password,
            isHide: multiMode.Domestic.isHide,
            isDisabled: multiMode.Domestic.isDisabled,
            splitBand: multiMode.Domestic.SplitBand || false,
          };
        }

        if (multiMode.Split) {
          networks.split = {
            ssid: multiMode.Split.SSID,
            password: multiMode.Split.Password,
            isHide: multiMode.Split.isHide,
            isDisabled: multiMode.Split.isDisabled,
            splitBand: multiMode.Split.SplitBand || false,
          };
        }

        if (multiMode.VPN) {
          networks.vpn = {
            ssid: multiMode.VPN.SSID,
            password: multiMode.VPN.Password,
            isHide: multiMode.VPN.isHide,
            isDisabled: multiMode.VPN.isDisabled,
            splitBand: multiMode.VPN.SplitBand || false,
          };
        }
      } else if (!isMultiSSID.value && wirelessConfig.SingleMode) {
        const singleMode = wirelessConfig.SingleMode;
        ssid.value = singleMode.SSID;
        password.value = singleMode.Password;
        isHide.value = singleMode.isHide;
        isDisabled.value = singleMode.isDisabled;
        splitBand.value = singleMode.SplitBand || false;
      }
    }
  });

  // Handle DomesticLink changes - disable domestic and split networks when DomesticLink is false
  useTask$(({ track }) => {
    const isDomesticLinkEnabled = track(
      () => (starContext.state.Choose.WANLinkType === "domestic-only" || starContext.state.Choose.WANLinkType === "both"),
    );

    if (!isDomesticLinkEnabled) {
      // Disable domestic and split networks when DomesticLink is false
      networks.domestic.isDisabled = true;
      networks.split.isDisabled = true;
    }
  });

  useTask$(({ track }) => {
    // Skip updating wireless config if disabled
    if (!wirelessEnabled.value) {
      starContext.updateLAN$({
        Wireless: undefined,
      });
      return;
    }

    track(() => ({
      isMulti: isMultiSSID.value,
      networks: Object.values(networks)
        .map((n) => n.ssid + n.password + n.isHide + n.isDisabled + n.splitBand)
        .join(""),
      single:
        ssid.value +
        password.value +
        isHide.value +
        isDisabled.value +
        splitBand.value,
    }));

    if (isMultiSSID.value) {
      const isDomesticLinkEnabled = (starContext.state.Choose.WANLinkType === "domestic-only" || starContext.state.Choose.WANLinkType === "both");
      const enabledNetworks: Record<
        string,
        {
          SSID: string;
          Password: string;
          isHide: boolean;
          isDisabled: boolean;
          SplitBand: boolean;
        }
      > = {};

      if (!networks.foreign.isDisabled) {
        enabledNetworks.Foreign = {
          SSID: networks.foreign.ssid,
          Password: networks.foreign.password,
          isHide: networks.foreign.isHide,
          isDisabled: networks.foreign.isDisabled,
          SplitBand: networks.foreign.splitBand,
        };
      }

      // Only include domestic and split networks if DomesticLink is enabled
      if (isDomesticLinkEnabled && !networks.domestic.isDisabled) {
        enabledNetworks.Domestic = {
          SSID: networks.domestic.ssid,
          Password: networks.domestic.password,
          isHide: networks.domestic.isHide,
          isDisabled: networks.domestic.isDisabled,
          SplitBand: networks.domestic.splitBand,
        };
      }

      if (isDomesticLinkEnabled && !networks.split.isDisabled) {
        enabledNetworks.Split = {
          SSID: networks.split.ssid,
          Password: networks.split.password,
          isHide: networks.split.isHide,
          isDisabled: networks.split.isDisabled,
          SplitBand: networks.split.splitBand,
        };
      }

      if (!networks.vpn.isDisabled) {
        enabledNetworks.VPN = {
          SSID: networks.vpn.ssid,
          Password: networks.vpn.password,
          isHide: networks.vpn.isHide,
          isDisabled: networks.vpn.isDisabled,
          SplitBand: networks.vpn.splitBand,
        };
      }

      starContext.updateLAN$({
        Wireless: {
          MultiMode: enabledNetworks,
        },
      });
    } else {
      starContext.updateLAN$({
        Wireless: {
          SingleMode: {
            SSID: ssid.value,
            Password: password.value,
            isHide: isHide.value,
            isDisabled: isDisabled.value,
            SplitBand: splitBand.value,
          },
        },
      });
    }
  });

  const generateSSID = $(async () => {
    try {
      isLoading.value = { ...isLoading.value, singleSSID: true };
      ssid.value = await generateSSIDFromAPI();
    } catch (error) {
      console.error("Failed to generate SSID:", error);
    } finally {
      isLoading.value = { ...isLoading.value, singleSSID: false };
    }
  });

  const generatePassword = $(async () => {
    try {
      isLoading.value = { ...isLoading.value, singlePassword: true };
      password.value = await generatePasswordFromAPI();
    } catch (error) {
      console.error("Failed to generate password:", error);
    } finally {
      isLoading.value = { ...isLoading.value, singlePassword: false };
    }
  });

  const generateNetworkSSID = $(async (network: NetworkKey) => {
    try {
      isLoading.value = { ...isLoading.value, [`${network}SSID`]: true };
      networks[network].ssid = await generateSSIDFromAPI();
    } catch (error) {
      console.error("Failed to generate network SSID:", error);
    } finally {
      isLoading.value = { ...isLoading.value, [`${network}SSID`]: false };
    }
  });

  const validateForm = $(() => {
    // If wireless is disabled, form is always valid
    if (!wirelessEnabled.value) {
      isFormValid.value = true;
      return;
    }

    if (isMultiSSID.value) {
      const isDomesticLinkEnabled = (starContext.state.Choose.WANLinkType === "domestic-only" || starContext.state.Choose.WANLinkType === "both");

      // Filter networks based on DomesticLink setting
      const availableNetworks = isDomesticLinkEnabled
        ? ["foreign", "domestic", "split", "vpn"]
        : ["foreign", "vpn"];

      const enabledNetworks = availableNetworks
        .map((key) => networks[key as NetworkKey])
        .filter((network) => !network.isDisabled);

      const atLeastOneEnabled = enabledNetworks.length > 0;

      const allEnabledNetworksFieldsFilled = enabledNetworks.every(
        (network) =>
          network.ssid.trim() !== "" && network.password.trim() !== "",
      );

      isFormValid.value = atLeastOneEnabled && allEnabledNetworksFieldsFilled;
    } else {
      isFormValid.value =
        ssid.value.trim() !== "" && password.value.trim() !== "";
    }
  });

  useTask$(({ track }) => {
    track(() => wirelessEnabled.value); // Track wireless enabled state
    track(() => ssid.value);
    track(() => password.value);
    track(() => isHide.value);
    track(() => isDisabled.value);
    track(() => splitBand.value);
    track(() =>
      Object.values(networks)
        .map((n) => n.ssid + n.password + n.isHide + n.isDisabled + n.splitBand)
        .join(""),
    );
    track(() => isMultiSSID.value);
    validateForm();
  });

  return {
    wirelessEnabled,
    isMultiSSID,
    ssid,
    password,
    isHide,
    isDisabled,
    splitBand,
    networks,
    isLoading,
    generateSSID,
    generatePassword,
    generateNetworkSSID,
    generateNetworkPassword,
    generateAllPasswords,
    isFormValid,
    toggleNetworkHide,
    toggleNetworkDisabled,
    toggleNetworkSplitBand,
    toggleSingleHide,
    toggleSingleDisabled,
    toggleSingleSplitBand,
  };
};
