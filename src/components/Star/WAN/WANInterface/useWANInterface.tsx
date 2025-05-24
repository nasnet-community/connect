import { $, useContext, useSignal, useTask$ } from "@builder.io/qwik";
import { StarContext } from "../../StarContext/StarContext";
import type { WANConfig } from "../../StarContext/WANType";
import type { LTE, Sfp, Wireless, Ethernet } from "../../StarContext/CommonType";


export const useWANInterface = (mode: "Foreign" | "Domestic") => {
  const starContext = useContext(StarContext);
  const selectedInterface = useSignal("");
  const ssid = useSignal("");
  const password = useSignal("");
  const isValid = useSignal(false);

  // Define validateForm first before using it in useTask$
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

  // Move initialization to useTask$ to avoid state mutation during render
  useTask$(({ track }) => {
    // Track state changes to re-run this task when needed
    track(() => starContext.state.WAN.WANLink);
    
    // Initialize values from context if they exist
    const interfaceData = starContext.state.WAN.WANLink[mode];
    if (interfaceData) {
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
    
    // Run validation whenever state changes
    validateForm();
  });

  const updateStarContext = $(() => {
    const otherMode = mode === "Foreign" ? "Domestic" : "Foreign";
    const otherInterface = starContext.state.WAN.WANLink[otherMode]?.InterfaceName || "";

    const isCurrentWifi2_4 = selectedInterface.value.includes("2.4") || selectedInterface.value.includes("2ghz");
    const isCurrentWifi5 = selectedInterface.value.includes("5") || selectedInterface.value.includes("5ghz");
    const isOtherWifi2_4 = otherInterface.includes("2.4") || otherInterface.includes("2ghz");
    const isOtherWifi5 = otherInterface.includes("5") || otherInterface.includes("5ghz");

    const updateData = {
      WANLink: {
        ...starContext.state.WAN.WANLink,
        isWifi2_4: isCurrentWifi2_4 || isOtherWifi2_4,
        isWifi5: isCurrentWifi5 || isOtherWifi5,
      }
    };

    const modeConfig: WANConfig = {
      InterfaceName: selectedInterface.value as Ethernet | Wireless | Sfp | LTE,
    };

    if (selectedInterface.value.startsWith("wifi")) {
      modeConfig.WirelessCredentials = {
        SSID: ssid.value,
        Password: password.value
      };
    }

    updateData.WANLink[mode] = {
      ...starContext.state.WAN.WANLink[mode],
      ...modeConfig
    };

    starContext.updateWAN$(updateData);
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
