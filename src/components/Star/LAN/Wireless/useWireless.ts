import { $, useContext, useSignal, useStore, useTask$ } from "@builder.io/qwik";
import type { NetworkKey, Networks } from "./type";
import { generatePasswordFromAPI, generateSSIDFromAPI } from "~/utils/api";
import { StarContext } from "../../StarContext";

export const useWirelessForm = () => {
  const starContext = useContext(StarContext);
  const isMultiSSID = useSignal(false);
  const ssid = useSignal("");
  const password = useSignal("");
  const isLoading = useSignal<Record<string, boolean>>({});
  const isFormValid = useSignal(false);

  const networks = useStore<Networks>({
    starlink: { ssid: "", password: "" },
    domestic: { ssid: "", password: "" },
    split: { ssid: "", password: "" },
    vpn: { ssid: "", password: "" },
  });

  const checkSamePassword = $(() => {
    if (!isMultiSSID.value) return;

    const passwords = Object.values(networks).map((n) => n.password);
    const commonPassword = passwords[0];
    const areAllPasswordsSame = passwords.every(
      (p) => p === commonPassword && p !== "",
    );

    starContext.updateLAN$({
      Wireless: {
        ...starContext.state.LAN.Wireless,
        SingleMode: {
          WirelessCredentials: {
            SSID: ssid.value,
            Password: password.value,
          },
        },
        MultiMode: {
          ...starContext.state.LAN.Wireless.MultiMode,
          isSamePassword: areAllPasswordsSame,
          SamePassword: areAllPasswordsSame ? commonPassword : "",
        },
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

      starContext.updateLAN$({
        Wireless: {
          ...starContext.state.LAN.Wireless,
          SingleMode: {
            WirelessCredentials: {
              SSID: ssid.value,
              Password: password.value,
            },
          },
          MultiMode: {
            ...starContext.state.LAN.Wireless.MultiMode,
            isSamePassword: true,
            SamePassword: commonPassword,
          },
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

  useTask$(({ track }) => {
    track(() => ({
      isMulti: isMultiSSID.value,
      networks: Object.values(networks)
        .map((n) => n.ssid + n.password)
        .join(""),
      single: ssid.value + password.value,
    }));

    starContext.updateLAN$({
      Wireless: {
        isWireless: true,
        isMultiSSID: isMultiSSID.value,
        SingleMode: {
          WirelessCredentials: {
            SSID: ssid.value,
            Password: password.value,
          },
        },
        MultiMode: {
          isSamePassword:
            starContext.state.LAN.Wireless.MultiMode.isSamePassword,
          SamePassword: starContext.state.LAN.Wireless.MultiMode.SamePassword,
          Starlink: {
            SSID: networks.starlink.ssid,
            Password: networks.starlink.password,
          },
          Domestic: {
            SSID: networks.domestic.ssid,
            Password: networks.domestic.password,
          },
          Split: {
            SSID: networks.split.ssid,
            Password: networks.split.password,
          },
          VPN: {
            SSID: networks.vpn.ssid,
            Password: networks.vpn.password,
          },
        },
      },
    });
  });

  useTask$(({ track }) => {
    track(() =>
      Object.values(networks)
        .map((n) => n.password)
        .join(""),
    );
    checkSamePassword();
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
      isFormValid.value = Object.values(networks).every(
        (network) =>
          network.ssid.trim() !== "" && network.password.trim() !== "",
      );
    } else {
      isFormValid.value =
        ssid.value.trim() !== "" && password.value.trim() !== "";
    }
  });

  useTask$(({ track }) => {
    track(() => ssid.value);
    track(() => password.value);
    track(() =>
      Object.values(networks)
        .map((n) => n.ssid + n.password)
        .join(""),
    );
    track(() => isMultiSSID.value);
    validateForm();
  });

  return {
    isMultiSSID,
    ssid,
    password,
    networks,
    isLoading,
    generateSSID,
    generatePassword,
    generateNetworkSSID,
    generateNetworkPassword,
    generateAllPasswords,
    isFormValid,
  };
};
