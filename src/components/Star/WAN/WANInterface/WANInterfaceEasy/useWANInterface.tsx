import { $, useContext, useSignal, useTask$ } from "@builder.io/qwik";
import { StarContext } from "../../../StarContext/StarContext";
import type { InterfaceConfig } from "../../../StarContext/WANType";
import type {
  LTE,
  Sfp,
  Wireless,
  Ethernet,
} from "../../../StarContext/CommonType";

export const useWANInterface = (mode: "Foreign" | "Domestic") => {
  const starContext = useContext(StarContext);
  const selectedInterfaceType = useSignal("");
  const selectedInterface = useSignal("");
  const ssid = useSignal("");
  const password = useSignal("");
  const apn = useSignal("");
  const lteUsername = useSignal("");
  const ltePassword = useSignal("");
  const isValid = useSignal(false);

  // Define validateForm first before using it in useTask$
  const validateForm = $(() => {
    if (!selectedInterfaceType.value || !selectedInterface.value) {
      isValid.value = false;
      return false;
    }

    if (selectedInterfaceType.value === "Wireless") {
      if (!ssid.value || !password.value || password.value.length < 8) {
        isValid.value = false;
        return false;
      }
    }

    if (selectedInterfaceType.value === "LTE") {
      if (!apn.value) {
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
    if (interfaceData && interfaceData.WANConfigs?.[0]) {
      const interfaceConfig = interfaceData.WANConfigs[0].InterfaceConfig;
      
      if (interfaceConfig.InterfaceName && selectedInterface.value === "") {
        selectedInterface.value = interfaceConfig.InterfaceName;
        
        // Determine interface type from interface name
        if (interfaceConfig.InterfaceName.includes("wifi") || interfaceConfig.InterfaceName.includes("wlan")) {
          selectedInterfaceType.value = "Wireless";
        } else if (interfaceConfig.InterfaceName.includes("lte")) {
          selectedInterfaceType.value = "LTE";
        } else if (interfaceConfig.InterfaceName.includes("sfp")) {
          selectedInterfaceType.value = "SFP";
        } else {
          selectedInterfaceType.value = "Ethernet";
        }
      }

      if (interfaceConfig.WirelessCredentials) {
        if (interfaceConfig.WirelessCredentials.SSID && ssid.value === "") {
          ssid.value = interfaceConfig.WirelessCredentials.SSID;
        }

        if (
          interfaceConfig.WirelessCredentials.Password &&
          password.value === ""
        ) {
          password.value = interfaceConfig.WirelessCredentials.Password;
        }
      }

      if (interfaceConfig.lteSettings) {
        if (interfaceConfig.lteSettings.apn && apn.value === "") {
          apn.value = interfaceConfig.lteSettings.apn;
        }
        if (interfaceConfig.lteSettings.username && lteUsername.value === "") {
          lteUsername.value = interfaceConfig.lteSettings.username;
        }
        if (interfaceConfig.lteSettings.password && ltePassword.value === "") {
          ltePassword.value = interfaceConfig.lteSettings.password;
        }
      }
    }

    // Run validation whenever state changes
    validateForm();
  });

  const updateStarContext = $(() => {
    const otherMode = mode === "Foreign" ? "Domestic" : "Foreign";
    const otherInterface =
      starContext.state.WAN.WANLink[otherMode]?.WANConfigs?.[0]?.InterfaceConfig.InterfaceName || "";

    const isCurrentWifi2_4 =
      selectedInterface.value.includes("2.4") ||
      selectedInterface.value.includes("2ghz");
    const isCurrentWifi5 =
      selectedInterface.value.includes("5") ||
      selectedInterface.value.includes("5ghz");
    const isOtherWifi2_4 =
      otherInterface.includes("2.4") || otherInterface.includes("2ghz");
    const isOtherWifi5 =
      otherInterface.includes("5") || otherInterface.includes("5ghz");

    const updateData = {
      WANLink: {
        ...starContext.state.WAN.WANLink,
        isWifi2_4: isCurrentWifi2_4 || isOtherWifi2_4,
        isWifi5: isCurrentWifi5 || isOtherWifi5,
      },
    };

    const modeConfig: InterfaceConfig = {
      InterfaceName: selectedInterface.value as Ethernet | Wireless | Sfp | LTE,
    };

    if (selectedInterfaceType.value === "Wireless") {
      modeConfig.WirelessCredentials = {
        SSID: ssid.value,
        Password: password.value,
      };
    }

    if (selectedInterfaceType.value === "LTE") {
      modeConfig.lteSettings = {
        apn: apn.value,
        username: lteUsername.value || undefined,
        password: ltePassword.value || undefined,
      };
    }

    // Create proper WANLink structure
    const currentWANLink = starContext.state.WAN.WANLink[mode] || { WANConfigs: [] };
    const existingConfig = currentWANLink.WANConfigs?.[0] || { name: `${mode} Link`, InterfaceConfig: { InterfaceName: selectedInterface.value } };
    
    updateData.WANLink[mode] = {
      ...currentWANLink,
      WANConfigs: [{
        ...existingConfig,
        InterfaceConfig: {
          ...existingConfig.InterfaceConfig,
          InterfaceName: modeConfig.InterfaceName,
          WirelessCredentials: modeConfig.WirelessCredentials,
          lteSettings: modeConfig.lteSettings,
        }
      }]
    };

    starContext.updateWAN$(updateData);
  });

  const handleInterfaceTypeSelect = $((type: string) => {
    selectedInterfaceType.value = type;
    selectedInterface.value = ""; // Reset interface when type changes
    
    // Clear type-specific fields when type changes
    if (type !== "Wireless") {
      ssid.value = "";
      password.value = "";
    }
    if (type !== "LTE") {
      apn.value = "";
      lteUsername.value = "";
      ltePassword.value = "";
    }
    
    validateForm();
  });

  const handleInterfaceSelect = $((value: string) => {
    selectedInterface.value = value;
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

  const handleAPNChange = $((value: string) => {
    apn.value = value;
    updateStarContext();
    validateForm();
  });

  const handleLTEUsernameChange = $((value: string) => {
    lteUsername.value = value;
    updateStarContext();
    validateForm();
  });

  const handleLTEPasswordChange = $((value: string) => {
    ltePassword.value = value;
    updateStarContext();
    validateForm();
  });

  return {
    selectedInterfaceType,
    selectedInterface,
    ssid,
    password,
    apn,
    lteUsername,
    ltePassword,
    isValid,
    validateForm,
    handleInterfaceTypeSelect,
    handleInterfaceSelect,
    handleSSIDChange,
    handlePasswordChange,
    handleAPNChange,
    handleLTEUsernameChange,
    handleLTEPasswordChange,
  };
};
