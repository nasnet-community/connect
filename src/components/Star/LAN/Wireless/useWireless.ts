import { $, useContext, useSignal, useStore, useTask$ } from "@builder.io/qwik";
import type { NetworkKey, Networks } from "./type";
import { generatePasswordFromAPI, generateSSIDFromAPI } from "~/utils/api";
import { StarContext } from "../../StarContext/StarContext";

export const useWirelessForm = () => {
  const starContext = useContext(StarContext);
  const isMultiSSID = useSignal(false);
  const ssid = useSignal("");
  const password = useSignal("");
  const isHide = useSignal(false);
  const isDisabled = useSignal(false);
  const isLoading = useSignal<Record<string, boolean>>({});
  const isFormValid = useSignal(false);

  const networks = useStore<Networks>({
    foreign: { ssid: "", password: "", isHide: false, isDisabled: false },
    domestic: { ssid: "", password: "", isHide: false, isDisabled: false },
    split: { ssid: "", password: "", isHide: false, isDisabled: false },
    vpn: { ssid: "", password: "", isHide: false, isDisabled: false },
  });

  const checkSamePassword = $(() => {
    if (!isMultiSSID.value) return;

    const enabledNetworks: Record<string, { SSID: string; Password: string; isHide: boolean; isDisabled: boolean }> = {};
    
    if (!networks.foreign.isDisabled) {
      enabledNetworks.Foreign = {
        SSID: networks.foreign.ssid,
        Password: networks.foreign.password,
        isHide: networks.foreign.isHide,
        isDisabled: networks.foreign.isDisabled,
      };
    }
    
    if (!networks.domestic.isDisabled) {
      enabledNetworks.Domestic = {
        SSID: networks.domestic.ssid,
        Password: networks.domestic.password,
        isHide: networks.domestic.isHide,
        isDisabled: networks.domestic.isDisabled,
      };
    }
    
    if (!networks.split.isDisabled) {
      enabledNetworks.Split = {
        SSID: networks.split.ssid,
        Password: networks.split.password,
        isHide: networks.split.isHide,
        isDisabled: networks.split.isDisabled,
      };
    }
    
    if (!networks.vpn.isDisabled) {
      enabledNetworks.VPN = {
        SSID: networks.vpn.ssid,
        Password: networks.vpn.password,
        isHide: networks.vpn.isHide,
        isDisabled: networks.vpn.isDisabled,
      };
    }

    starContext.updateLAN$({
      Wireless: {
        MultiMode: enabledNetworks
      },
    });
  });

  const generateAllPasswords = $(async () => {
    try {
      isLoading.value = { ...isLoading.value, allPasswords: true };
      const commonPassword = await generatePasswordFromAPI();

      Object.keys(networks).forEach((network) => {
        networks[network as NetworkKey].password = commonPassword;
      });

      const enabledNetworks: Record<string, { SSID: string; Password: string; isHide: boolean; isDisabled: boolean }> = {};
      
      if (!networks.foreign.isDisabled) {
        enabledNetworks.Foreign = {
          SSID: networks.foreign.ssid,
          Password: networks.foreign.password,
          isHide: networks.foreign.isHide,
          isDisabled: networks.foreign.isDisabled,
        };
      }
      
      if (!networks.domestic.isDisabled) {
        enabledNetworks.Domestic = {
          SSID: networks.domestic.ssid,
          Password: networks.domestic.password,
          isHide: networks.domestic.isHide,
          isDisabled: networks.domestic.isDisabled,
        };
      }
      
      if (!networks.split.isDisabled) {
        enabledNetworks.Split = {
          SSID: networks.split.ssid,
          Password: networks.split.password,
          isHide: networks.split.isHide,
          isDisabled: networks.split.isDisabled,
        };
      }
      
      if (!networks.vpn.isDisabled) {
        enabledNetworks.VPN = {
          SSID: networks.vpn.ssid,
          Password: networks.vpn.password,
          isHide: networks.vpn.isHide,
          isDisabled: networks.vpn.isDisabled,
        };
      }

      starContext.updateLAN$({
        Wireless: {
          MultiMode: enabledNetworks
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

  const toggleNetworkHide = $((network: NetworkKey) => {
    networks[network].isHide = !networks[network].isHide;
  });

  const toggleNetworkDisabled = $((network: NetworkKey) => {
    if (!networks[network].isDisabled) {
      const enabledCount = Object.values(networks).filter(n => !n.isDisabled).length;
      
      if (enabledCount > 1) {
        networks[network].isDisabled = true;
      }
    } else {
      networks[network].isDisabled = false;
    }
  });

  const toggleSingleHide = $(() => {
    isHide.value = !isHide.value;
  });

  const toggleSingleDisabled = $(() => {
    isDisabled.value = !isDisabled.value;
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
          };
        }
        
        if (multiMode.Domestic) {
          networks.domestic = {
            ssid: multiMode.Domestic.SSID,
            password: multiMode.Domestic.Password,
            isHide: multiMode.Domestic.isHide,
            isDisabled: multiMode.Domestic.isDisabled,
          };
        }
        
        if (multiMode.Split) {
          networks.split = {
            ssid: multiMode.Split.SSID,
            password: multiMode.Split.Password,
            isHide: multiMode.Split.isHide,
            isDisabled: multiMode.Split.isDisabled,
          };
        }
        
        if (multiMode.VPN) {
          networks.vpn = {
            ssid: multiMode.VPN.SSID,
            password: multiMode.VPN.Password,
            isHide: multiMode.VPN.isHide,
            isDisabled: multiMode.VPN.isDisabled,
          };
        }
      } else if (!isMultiSSID.value && wirelessConfig.SingleMode) {
        const singleMode = wirelessConfig.SingleMode;
        ssid.value = singleMode.SSID;
        password.value = singleMode.Password;
        isHide.value = singleMode.isHide;
        isDisabled.value = singleMode.isDisabled;
      }
    }
  });

  useTask$(({ track }) => {
    track(() => ({
      isMulti: isMultiSSID.value,
      networks: Object.values(networks)
        .map((n) => n.ssid + n.password + n.isHide + n.isDisabled)
        .join(""),
      single: ssid.value + password.value + isHide.value + isDisabled.value,
    }));

    if (isMultiSSID.value) {
      const enabledNetworks: Record<string, { SSID: string; Password: string; isHide: boolean; isDisabled: boolean }> = {};
      
      if (!networks.foreign.isDisabled) {
        enabledNetworks.Foreign = {
          SSID: networks.foreign.ssid,
          Password: networks.foreign.password,
          isHide: networks.foreign.isHide,
          isDisabled: networks.foreign.isDisabled,
        };
      }
      
      if (!networks.domestic.isDisabled) {
        enabledNetworks.Domestic = {
          SSID: networks.domestic.ssid,
          Password: networks.domestic.password,
          isHide: networks.domestic.isHide,
          isDisabled: networks.domestic.isDisabled,
        };
      }
      
      if (!networks.split.isDisabled) {
        enabledNetworks.Split = {
          SSID: networks.split.ssid,
          Password: networks.split.password,
          isHide: networks.split.isHide,
          isDisabled: networks.split.isDisabled,
        };
      }
      
      if (!networks.vpn.isDisabled) {
        enabledNetworks.VPN = {
          SSID: networks.vpn.ssid,
          Password: networks.vpn.password,
          isHide: networks.vpn.isHide,
          isDisabled: networks.vpn.isDisabled,
        };
      }

      starContext.updateLAN$({
        Wireless: {
          MultiMode: enabledNetworks
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
          }
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
    if (isMultiSSID.value) {
      const enabledNetworks = Object.values(networks).filter(
        (network) => !network.isDisabled
      );
      
      const atLeastOneEnabled = enabledNetworks.length > 0;
      
      const allEnabledNetworksFieldsFilled = enabledNetworks.every(
        (network) => network.ssid.trim() !== "" && network.password.trim() !== ""
      );
      
      isFormValid.value = atLeastOneEnabled && allEnabledNetworksFieldsFilled;
    } else {
      isFormValid.value =
        ssid.value.trim() !== "" && password.value.trim() !== "";
    }
  });

  useTask$(({ track }) => {
    track(() => ssid.value);
    track(() => password.value);
    track(() => isHide.value);
    track(() => isDisabled.value);
    track(() =>
      Object.values(networks)
        .map((n) => n.ssid + n.password + n.isHide + n.isDisabled)
        .join(""),
    );
    track(() => isMultiSSID.value);
    validateForm();
  });

  return {
    isMultiSSID,
    ssid,
    password,
    isHide,
    isDisabled,
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
    toggleSingleHide,
    toggleSingleDisabled,
  };
};
