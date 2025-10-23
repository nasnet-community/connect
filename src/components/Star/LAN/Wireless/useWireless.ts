import { $, useContext, useSignal, useStore, useTask$ } from "@builder.io/qwik";
import type { NetworkKey, Networks as LocalNetworks, ExtraWirelessInterface } from "./type";
import { generatePasswordFromAPI, generateSSIDFromAPI } from "~/utils/api";
import { StarContext } from "~/components/Star/StarContext";
import type { WirelessConfig, WifiTarget, Networks } from "~/components/Star/StarContext";
import { getExtraNetworks, isBaseNetwork } from "./networkUtils";

// Helper to determine wireless network based on enabled base networks
export const determineWirelessNetwork = (networks: Networks): { wifiTarget: WifiTarget; networkName: string } => {
  const baseNetworks = networks.BaseNetworks;

  // Priority 1: Split network
  if (baseNetworks?.Split) {
    return { wifiTarget: "Split", networkName: "Split" };
  }

  // Priority 2: VPN network
  if (baseNetworks?.VPN) {
    return { wifiTarget: "SingleVPN", networkName: "VPN" };
  }

  // Priority 3: Domestic network
  if (baseNetworks?.Domestic) {
    return { wifiTarget: "SingleDomestic", networkName: "Domestic" };
  }

  // Priority 4: Foreign network
  if (baseNetworks?.Foreign) {
    return { wifiTarget: "SingleForeign", networkName: "Foreign" };
  }

  // Fallback to Split
  return { wifiTarget: "Split", networkName: "Split" };
};

export const useWirelessForm = () => {
  const starContext = useContext(StarContext);

  // Check if we're in easy mode
  const isEasyMode = starContext.state.Choose.Mode === "easy";

  // Signal to store whether router has both wireless bands (2.4GHz and 5GHz)
  const hasBothBandsSignal = useSignal(false);

  // Check if router has both wireless bands (2.4GHz and 5GHz)
  const hasBothBands = $((): boolean => {
    const routerModels = starContext.state.Choose.RouterModels;

    // Check all router models for wireless interfaces
    for (const model of routerModels) {
      const wirelessInterfaces = model.Interfaces.Interfaces.wireless;

      if (wirelessInterfaces && wirelessInterfaces.length > 0) {
        const has24 = wirelessInterfaces.some(iface => iface.includes("2.4"));
        const has5 = wirelessInterfaces.some(iface => iface.includes("5"));

        // If any router has both bands, return true
        if (has24 && has5) {
          return true;
        }
      }
    }

    return false;
  });

  // Update hasBothBandsSignal when RouterModels change
  useTask$(async ({ track }) => {
    track(() => starContext.state.Choose.RouterModels);
    hasBothBandsSignal.value = await hasBothBands();
  });

  // Wireless should be enabled by default
  const wirelessEnabled = useSignal(true);
  const isMultiSSID = useSignal(false);
  const ssid = useSignal("");
  const password = useSignal("");
  const isHide = useSignal(false);
  const isDisabled = useSignal(false);
  // In easy mode (Single SSID), splitBand should default to false
  const splitBand = useSignal(false);
  const isLoading = useSignal<Record<string, boolean>>({});
  const isFormValid = useSignal(false);

  const networks = useStore<LocalNetworks>({
    foreign: {
      ssid: "",
      password: "",
      isHide: false,
      isDisabled: false,
      splitBand: isEasyMode,
    },
    domestic: {
      ssid: "",
      password: "",
      isHide: false,
      isDisabled: false,
      splitBand: isEasyMode,
    },
    split: {
      ssid: "",
      password: "",
      isHide: false,
      isDisabled: false,
      splitBand: isEasyMode,
    },
    vpn: {
      ssid: "",
      password: "",
      isHide: false,
      isDisabled: false,
      splitBand: isEasyMode,
    },
  });

  // Extra wireless interfaces state
  const extraInterfaces = useStore<ExtraWirelessInterface[]>([]);

  const buildWirelessConfigArray = $(() => {
    const isDomesticLinkEnabled = (starContext.state.Choose.WANLinkType === "domestic" || starContext.state.Choose.WANLinkType === "both");
    const wirelessConfigs: WirelessConfig[] = [];

    if (!networks.foreign.isDisabled) {
      wirelessConfigs.push({
        SSID: networks.foreign.ssid,
        Password: networks.foreign.password,
        isHide: networks.foreign.isHide,
        isDisabled: networks.foreign.isDisabled,
        SplitBand: networks.foreign.splitBand,
        WifiTarget: "Foreign",
        NetworkName: "foreign-network",
      });
    }

    // Only include domestic and split networks if DomesticLink is enabled
    if (isDomesticLinkEnabled && !networks.domestic.isDisabled) {
      wirelessConfigs.push({
        SSID: networks.domestic.ssid,
        Password: networks.domestic.password,
        isHide: networks.domestic.isHide,
        isDisabled: networks.domestic.isDisabled,
        SplitBand: networks.domestic.splitBand,
        WifiTarget: "Domestic",
        NetworkName: "domestic-network",
      });
    }

    if (isDomesticLinkEnabled && !networks.split.isDisabled) {
      wirelessConfigs.push({
        SSID: networks.split.ssid,
        Password: networks.split.password,
        isHide: networks.split.isHide,
        isDisabled: networks.split.isDisabled,
        SplitBand: networks.split.splitBand,
        WifiTarget: "Split",
        NetworkName: "split-network",
      });
    }

    if (!networks.vpn.isDisabled) {
      wirelessConfigs.push({
        SSID: networks.vpn.ssid,
        Password: networks.vpn.password,
        isHide: networks.vpn.isHide,
        isDisabled: networks.vpn.isDisabled,
        SplitBand: networks.vpn.splitBand,
        WifiTarget: "VPN",
        NetworkName: "vpn-network",
      });
    }

    return wirelessConfigs;
  });

  const checkSamePassword = $(async () => {
    if (!isMultiSSID.value) return;
    const wirelessConfigs = await buildWirelessConfigArray();
    starContext.updateLAN$({ Wireless: wirelessConfigs });
  });

  const generateAllPasswords = $(async () => {
    try {
      isLoading.value = { ...isLoading.value, allPasswords: true };
      const commonPassword = await generatePasswordFromAPI();

      const isDomesticLinkEnabled = (starContext.state.Choose.WANLinkType === "domestic" || starContext.state.Choose.WANLinkType === "both");

      // Only set passwords for available networks based on DomesticLink setting
      const availableNetworks = isDomesticLinkEnabled
        ? ["foreign", "domestic", "split", "vpn"]
        : ["foreign", "vpn"];

      availableNetworks.forEach((network) => {
        networks[network as NetworkKey].password = commonPassword;
      });

      const wirelessConfigs = await buildWirelessConfigArray();
      starContext.updateLAN$({ Wireless: wirelessConfigs });
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
    const isDomesticLinkEnabled = (starContext.state.Choose.WANLinkType === "domestic" || starContext.state.Choose.WANLinkType === "both");

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

  // === EXTRA WIRELESS INTERFACES MANAGEMENT ===

  const addExtraInterface = $(() => {
    const availableNetworks = getExtraNetworks(starContext.state.Choose.Networks);

    // Find first unassigned network
    const assignedNetworks = extraInterfaces.map(i => i.targetNetworkName);
    const firstAvailable = availableNetworks.find(
      net => !assignedNetworks.includes(net.name)
    );

    if (firstAvailable) {
      const newInterface: ExtraWirelessInterface = {
        id: `extra-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        targetNetworkName: firstAvailable.name,
        ssid: "",
        password: "",
        isHide: false,
        isDisabled: false,
        splitBand: isEasyMode,
      };
      extraInterfaces.push(newInterface);
    }
  });

  const removeExtraInterface = $((id: string) => {
    const index = extraInterfaces.findIndex(i => i.id === id);
    if (index !== -1) {
      extraInterfaces.splice(index, 1);
    }
  });

  const updateExtraInterfaceField = $((
    id: string,
    field: keyof ExtraWirelessInterface,
    value: any
  ) => {
    const interface_ = extraInterfaces.find(i => i.id === id);
    if (interface_) {
      (interface_ as any)[field] = value;
    }
  });

  const selectExtraNetwork = $((id: string, networkName: string) => {
    const interface_ = extraInterfaces.find(i => i.id === id);
    if (interface_) {
      interface_.targetNetworkName = networkName;
    }
  });

  const generateExtraSSID = $(async (id: string) => {
    try {
      isLoading.value = { ...isLoading.value, [`${id}-ssid`]: true };
      const interface_ = extraInterfaces.find(i => i.id === id);
      if (interface_) {
        interface_.ssid = await generateSSIDFromAPI();
      }
    } catch (error) {
      console.error("Failed to generate extra SSID:", error);
    } finally {
      isLoading.value = { ...isLoading.value, [`${id}-ssid`]: false };
    }
  });

  const generateExtraPassword = $(async (id: string) => {
    try {
      isLoading.value = { ...isLoading.value, [`${id}-password`]: true };
      const interface_ = extraInterfaces.find(i => i.id === id);
      if (interface_) {
        interface_.password = await generatePasswordFromAPI();
      }
    } catch (error) {
      console.error("Failed to generate extra password:", error);
    } finally {
      isLoading.value = { ...isLoading.value, [`${id}-password`]: false };
    }
  });

  useTask$(async () => {
    const wirelessConfig = starContext.state.LAN.Wireless;

    if (wirelessConfig && Array.isArray(wirelessConfig) && wirelessConfig.length > 0) {
      // Check if it's multi-SSID (more than one config)
      isMultiSSID.value = wirelessConfig.length > 1;

      if (isMultiSSID.value) {
        // Multi-mode: map array items to network store
        wirelessConfig.forEach((config) => {
          const networkKey: NetworkKey =
            config.WifiTarget === "Foreign" ? "foreign" :
            config.WifiTarget === "Domestic" ? "domestic" :
            config.WifiTarget === "Split" ? "split" :
            "vpn";

          networks[networkKey] = {
            ssid: config.SSID,
            password: config.Password,
            isHide: config.isHide,
            isDisabled: config.isDisabled,
            splitBand: config.SplitBand || false,
          };
        });
      } else {
        // Single mode: use first config
        const config = wirelessConfig[0];
        ssid.value = config.SSID;
        password.value = config.Password;
        isHide.value = config.isHide;
        isDisabled.value = config.isDisabled;
        splitBand.value = config.SplitBand || false;
      }

      // Override splitBand to false if router only has one band
      if (!(await hasBothBands())) {
        if (isMultiSSID.value) {
          // Multi-mode: force all network splitBand to false
          networks.foreign.splitBand = false;
          networks.domestic.splitBand = false;
          networks.split.splitBand = false;
          networks.vpn.splitBand = false;
        } else {
          // Single mode: force splitBand to false
          splitBand.value = false;
        }
      }
    }
  });

  // Handle DomesticLink changes - disable domestic and split networks when DomesticLink is false
  useTask$(({ track }) => {
    const isDomesticLinkEnabled = track(
      () => (starContext.state.Choose.WANLinkType === "domestic" || starContext.state.Choose.WANLinkType === "both"),
    );

    if (!isDomesticLinkEnabled) {
      // Disable domestic and split networks when DomesticLink is false
      networks.domestic.isDisabled = true;
      networks.split.isDisabled = true;
    }
  });

  // Enforce splitBand=false when router only has one wireless band
  useTask$(async ({ track }) => {
    // Track RouterModels changes
    track(() => starContext.state.Choose.RouterModels);

    // Check if router has both bands
    const bothBands = await hasBothBands();

    // If only one band exists, force all splitBand values to false
    if (!bothBands) {
      // Single SSID mode
      splitBand.value = false;

      // Multi SSID mode - all networks
      networks.foreign.splitBand = false;
      networks.domestic.splitBand = false;
      networks.split.splitBand = false;
      networks.vpn.splitBand = false;

      // Extra wireless interfaces
      extraInterfaces.forEach((extraInterface) => {
        extraInterface.splitBand = false;
      });
    }
  });

  useTask$(async ({ track }) => {
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
      const wirelessConfigs = await buildWirelessConfigArray();
      starContext.updateLAN$({ Wireless: wirelessConfigs });
    } else {
      // Single mode: determine network based on enabled base networks
      const { wifiTarget, networkName } = determineWirelessNetwork(starContext.state.Choose.Networks);

      starContext.updateLAN$({
        Wireless: [{
          SSID: ssid.value,
          Password: password.value,
          isHide: isHide.value,
          isDisabled: isDisabled.value,
          SplitBand: splitBand.value,
          WifiTarget: wifiTarget,
          NetworkName: networkName,
        }],
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
      const isDomesticLinkEnabled = (starContext.state.Choose.WANLinkType === "domestic" || starContext.state.Choose.WANLinkType === "both");

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

      // Validate extra interfaces
      const enabledExtraInterfaces = extraInterfaces.filter(
        (interface_) => !interface_.isDisabled
      );

      const allExtraInterfacesValid = enabledExtraInterfaces.every(
        (interface_) =>
          interface_.targetNetworkName.trim() !== "" &&
          interface_.ssid.trim() !== "" &&
          interface_.password.trim() !== ""
      );

      isFormValid.value =
        atLeastOneEnabled &&
        allEnabledNetworksFieldsFilled &&
        allExtraInterfacesValid;
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
    // Track extra interfaces for validation
    track(() =>
      extraInterfaces
        .map((i) => i.targetNetworkName + i.ssid + i.password + i.isDisabled)
        .join(""),
    );
    validateForm();
  });

  // Load extra wireless interfaces from state
  useTask$(async () => {
    const wirelessConfig = starContext.state.LAN.Wireless;

    if (wirelessConfig && Array.isArray(wirelessConfig) && wirelessConfig.length > 0) {
      // Filter for extra interfaces (NetworkName not in base networks)
      const extras = wirelessConfig.filter(config => !isBaseNetwork(config.NetworkName));

      // Only load if we don't have extras yet (to avoid overwriting user changes)
      if (extras.length > 0 && extraInterfaces.length === 0) {
        extraInterfaces.splice(0, extraInterfaces.length);
        const bothBands = await hasBothBands();
        extras.forEach(config => {
          extraInterfaces.push({
            id: `extra-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            targetNetworkName: config.NetworkName,
            ssid: config.SSID,
            password: config.Password,
            isHide: config.isHide,
            isDisabled: config.isDisabled,
            // Override splitBand to false if router only has one band
            splitBand: bothBands ? (config.SplitBand || false) : false,
          });
        });
      }
    }
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
    // Extra wireless interfaces
    extraInterfaces,
    addExtraInterface,
    removeExtraInterface,
    updateExtraInterfaceField,
    selectExtraNetwork,
    generateExtraSSID,
    generateExtraPassword,
    // Band check
    hasBothBands: hasBothBandsSignal,
  };
};
