import { $, useContext, useSignal } from "@builder.io/qwik";
import { StarContext } from "../../StarContext";

export const useWANInterface = (mode: "Foreign" | "Domestic") => {
  const starContext = useContext(StarContext);
  const selectedInterface = useSignal("");
  const ssid = useSignal("");
  const password = useSignal("");
  const isValid = useSignal(false);

  const validateForm = $(() => {
    if (!selectedInterface.value) {
      isValid.value = false;
      return false;
    }

    if (selectedInterface.value.startsWith("wifi")) {
      if (!ssid.value || !password.value || password.value.length < 8) {
        isValid.value = false;
        return false;
      }
    }

    isValid.value = true;
    return true;
  });

  const updateStarContext = $(() => {
    const otherMode = mode === "Foreign" ? "Domestic" : "Foreign";
    const otherInterface = starContext.state.WAN.Easy[otherMode].interface;

    const isCurrentWifi2_4 = selectedInterface.value === "wifi2.4";
    const isCurrentWifi5 = selectedInterface.value === "wifi5";
    const isOtherWifi2_4 = otherInterface === "wifi2.4";
    const isOtherWifi5 = otherInterface === "wifi5";

    starContext.updateWAN$({
      Easy: {
        ...starContext.state.WAN.Easy,
        isWifi2_4: isCurrentWifi2_4 || isOtherWifi2_4,
        isWifi5: isCurrentWifi5 || isOtherWifi5,
        [mode]: {
          ...starContext.state.WAN.Easy[mode],
          interface: selectedInterface.value,
          WirelessCredentials: {
            SSID: ssid.value,
            Password: password.value,
          },
        },
      },
    });
  });

  const handleInterfaceSelect = $((value: string) => {
    selectedInterface.value = value;

    if (!value.startsWith("wifi")) {
      ssid.value = "";
      password.value = "";
    }

    updateStarContext();
    validateForm();
  });

  const handleSSIDChange = $((value: string) => {
    ssid.value = value;
    updateStarContext();
    validateForm();
  });

  const handlePasswordChange = $((value: string) => {
    password.value = value;
    updateStarContext();
    validateForm();
  });

  return {
    selectedInterface,
    ssid,
    password,
    isValid,
    validateForm,
    handleInterfaceSelect,
    handleSSIDChange,
    handlePasswordChange,
  };
};
