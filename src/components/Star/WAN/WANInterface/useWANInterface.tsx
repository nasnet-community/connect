import { $, useContext, useSignal } from "@builder.io/qwik";
import { StarContext } from "../../StarContext/StarContext";
import type { WANConfig } from "../../StarContext/WANType";

export const useWANInterface = (mode: "Foreign" | "Domestic") => {
  const starContext = useContext(StarContext);
  const selectedInterface = useSignal("");
  const ssid = useSignal("");
  const password = useSignal("");
  const isValid = useSignal(false);

  // Initialize from context if values exist
  if (starContext.state.WAN.WANLink[mode]) {
    const interfaceData = starContext.state.WAN.WANLink[mode];
    if (interfaceData.InterfaceName && selectedInterface.value === "") {
      selectedInterface.value = interfaceData.InterfaceName;
    }
    
    if (interfaceData.WirelessCredentials) {
      if (interfaceData.WirelessCredentials.SSID && ssid.value === "") {
        ssid.value = interfaceData.WirelessCredentials.SSID;
      }
      
      if (interfaceData.WirelessCredentials.Password && password.value === "") {
        password.value = interfaceData.WirelessCredentials.Password;
      }
    }
  }

  const validateForm = $(() => {
    if (!selectedInterface.value) {
      isValid.value = false;
      return false;
    }

    if (selectedInterface.value.startsWith("wlan")) {
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
    const otherInterface = starContext.state.WAN.WANLink[otherMode]?.InterfaceName || "";

    const isCurrentWifi2_4 = selectedInterface.value.includes("2.4") || selectedInterface.value.includes("2ghz");
    const isCurrentWifi5 = selectedInterface.value.includes("5") || selectedInterface.value.includes("5ghz");
    const isOtherWifi2_4 = otherInterface.includes("2.4") || otherInterface.includes("2ghz");
    const isOtherWifi5 = otherInterface.includes("5") || otherInterface.includes("5ghz");

    // Create update object
    const updateData = {
      WANLink: {
        ...starContext.state.WAN.WANLink,
        isWifi2_4: isCurrentWifi2_4 || isOtherWifi2_4,
        isWifi5: isCurrentWifi5 || isOtherWifi5,
      }
    };

    // Create the mode-specific config
    const modeConfig: WANConfig = {
      InterfaceName: selectedInterface.value
    };

    // Only add wireless credentials if it's a wireless interface
    if (selectedInterface.value.startsWith("wlan")) {
      modeConfig.WirelessCredentials = {
        SSID: ssid.value,
        Password: password.value
      };
    }

    // Add the mode config to the update
    updateData.WANLink[mode] = {
      ...starContext.state.WAN.WANLink[mode],
      ...modeConfig
    };

    // Update the context
    starContext.updateWAN$(updateData);
  });

  const handleInterfaceSelect = $((value: string) => {
    selectedInterface.value = value;

    if (!value.startsWith("wlan")) {
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

  // Initial validation
  validateForm();

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
