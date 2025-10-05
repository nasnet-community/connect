import type {
    WirelessConfig,
    MultiMode,
    Wireless,
} from "../../../StarContext/LANType";
import type {
    WANLinks,
    // WANLinkConfig
} from "../../../StarContext/WANType";
import type { Networks, Band } from "../../../StarContext/CommonType";
import type { RouterConfig } from "../../ConfigGenerator";
import { CommandShortner } from "../../utils/ConfigGeneratorUtil";
import type { RouterModels } from "../../../StarContext/ChooseType";

export const DefaultBandToInterfaceName = (band: Band): string => {
    return band === "2.4" ? "wifi2" : "wifi1";
};

export const hasWirelessInterfaces = (
    routerModels: RouterModels[],
): boolean => {
    return routerModels.some(
        (model: RouterModels) =>
            model.Interfaces.Interfaces.wireless &&
            model.Interfaces.Interfaces.wireless.length > 0,
    );
};

export const CheckWireless = (Wireless: Wireless): boolean => {
    if (!Wireless) {
        return false;
    }

    const { SingleMode, MultiMode } = Wireless;

    if (!SingleMode && !MultiMode) {
        return false;
    }

    return true;
};

export const DisableInterfaces = (): RouterConfig => {
    const config: RouterConfig = {
        "/interface wifi": [],
    };

    config["/interface wifi"].push(
        `set [ find default-name=wifi1 ] disabled=yes`,
        `set [ find default-name=wifi2 ] disabled=yes`,
    );

    return config;
};

export function CheckMasters(WANLink: WANLinks) {
    const DomesticInterface =
        WANLink.Domestic?.WANConfigs?.[0]?.InterfaceConfig?.InterfaceName;
    const ForeignInterface =
        WANLink.Foreign?.WANConfigs?.[0]?.InterfaceConfig?.InterfaceName;
    const isWifi2_4: boolean =
        DomesticInterface?.includes("wifi2.4") ||
        ForeignInterface?.includes("wifi2.4") ||
        false;
    const isWifi5: boolean =
        DomesticInterface?.includes("wifi5") ||
        ForeignInterface?.includes("wifi5") ||
        false;
    return {
        isWifi2_4,
        isWifi5,
    };
}

export function Hide(command: string, Hide: boolean) {
    // make the bool yes or no
    const hide = Hide ? "yes" : "no";
    command = `${command} configuration.hide-ssid=${hide}`;
    return command;
}

export function GetWirelessNetworks(MultiMode: MultiMode): Networks[] {
    const networks: Networks[] = [];
    if (MultiMode.Split) {
        networks.push("Split");
    }
    if (MultiMode.Foreign) {
        networks.push("Foreign");
    }
    if (MultiMode.Domestic) {
        networks.push("Domestic");
    }
    if (MultiMode.VPN) {
        networks.push("VPN");
    }
    return networks;
}

export function SSIDListGenerator(SSID: string, SplitBand: boolean) {
    const SSIDList = {
        "2.4": "",
        "5": "",
    };
    if (SplitBand) {
        SSIDList["2.4"] = `${SSID} 2.4`;
        SSIDList["5"] = `${SSID} 5`;
    } else {
        SSIDList["2.4"] = `${SSID}`;
        SSIDList["5"] = `${SSID}`;
    }
    return SSIDList;
}

export function Passphrase(passphrase: string, command: string) {
    return `${command} security.authentication-types=wpa2-psk,wpa3-psk .passphrase="${passphrase}" disabled=no`;
}

export function StationMode(
    SSID: string,
    Password: string,
    Band: Band,
    name?: string,
): RouterConfig {
    const config: RouterConfig = {
        "/interface wifi": [],
    };

    const DInterfaceName = DefaultBandToInterfaceName(Band);
    const command = `set [ find default-name=${DInterfaceName} ] comment="${name} ${Band}WAN" configuration.mode=station .ssid="${SSID}" security.passphrase="${Password}" disabled=no`;
    config["/interface wifi"].push(command);
    return config;
}

// export function StationMode(
//   WANConfig: WANLinkConfig,
//   Link: "Domestic" | "Foreign",
// ): RouterConfig {
//   const config: RouterConfig = {
//     "/interface wifi": [],
//   };

//   const { InterfaceName, WirelessCredentials } = WANConfig.InterfaceConfig;
//   if (!WirelessCredentials) {
//     return config; // Return empty config instead of empty string
//   }

//   // change the interface name to default name wifi1 or wifi2 that was wifi2.4 or wifi5 and wifi5 is wifi1
//   const DInterfaceName = InterfaceName === "wifi5" ? "wifi1" : "wifi2";

//   const { SSID, Password } = WirelessCredentials;
//   const command = `set [ find default-name=${DInterfaceName} ] comment=${Link}WAN configuration.mode=station .ssid="${SSID}" security.passphrase="${Password}" disabled=no`;

//   config["/interface wifi"].push(command);
//   return CommandShortner(config);
// }

export function Slave(
    Network: Networks,
    Band: Band,
    WirelessConfig: WirelessConfig,
): RouterConfig {
    const config: RouterConfig = {
        "/interface wifi": [],
    };

    const { SSID, Password, isHide, SplitBand } = WirelessConfig;
    const SSIDList = SSIDListGenerator(SSID, SplitBand);
    const Master = Band === "2.4" ? "wifi2" : "wifi1";
    const MMaster = `[ find default-name=${Master} ]`;
    let command = `add configuration.mode=ap .ssid="${SSIDList[Band]}" master-interface=${MMaster} name="wifi${Band}-${Network}LAN" comment="${Network}LAN"`;
    command = Hide(command, isHide);
    command = Passphrase(Password, command);

    config["/interface wifi"].push(command);

    return CommandShortner(config);
}

export function Master(
    Network: Networks,
    Band: Band,
    WirelessConfig: WirelessConfig,
): RouterConfig {
    const { SSID, Password, isHide, SplitBand } = WirelessConfig;
    const SSIDList = SSIDListGenerator(SSID, SplitBand);
    const DefaultName = Band === "2.4" ? "wifi2" : "wifi1";
    let command = `set [ find default-name=${DefaultName} ] configuration.country=Japan .mode=ap .ssid="${SSIDList[Band]}" name="wifi${Band}-${Network}LAN" comment="${Network}LAN"`;
    command = Hide(command, isHide);
    command = Passphrase(Password, command);

    const config: RouterConfig = {
        "/interface wifi": [command],
    };
    return CommandShortner(config);
}

export const WirelessBridgePortsSingle = (
    DomesticLink: boolean,
): RouterConfig => {
    const config: RouterConfig = {
        "/interface bridge port": [],
    };
    if (DomesticLink) {
        config["/interface bridge port"].push(
            `add bridge=LANBridgeSplit interface=wifi2.4-SplitLAN`,
            `add bridge=LANBridgeSplit interface=wifi5-SplitLAN`,
        );
    } else {
        config["/interface bridge port"].push(
            `add bridge=LANBridgeVPN interface=wifi2.4-VPNLAN`,
            `add bridge=LANBridgeVPN interface=wifi5-VPNLAN`,
        );
    }
    return config;
};

export const WirelessBridgePortsMulti = (wireless: Wireless): RouterConfig => {
    const config: RouterConfig = {
        "/interface bridge port": [],
    };

    if (!wireless.MultiMode) {
        return config;
    }

    const Networks = Object.keys(wireless.MultiMode);
    // Use full network names for interface naming
    const NetworkNames = Networks.map((Network) =>
        Network === "Split"
            ? "Split"
            : Network === "Domestic"
              ? "Domestic"
              : Network === "Foreign"
                ? "Foreign"
                : Network === "VPN"
                  ? "VPN"
                  : "",
    );

    // Map network types to bridge names (matching the full bridge naming)
    const bridgeNameMap: Record<string, string> = {
        Foreign: "LANBridgeFRN",
        Domestic: "LANBridgeDOM",
        VPN: "LANBridgeVPN",
        Split: "LANBridgeSplit",
    };

    for (const Network of NetworkNames) {
        if (Network) {
            // Only add if Network is not empty
            const bridgeName = bridgeNameMap[Network] || Network;
            config["/interface bridge port"].push(
                `add bridge=${bridgeName} interface=wifi2.4-${Network}LAN`,
                `add bridge=${bridgeName} interface=wifi5-${Network}LAN`,
            );
        }
    }
    return config;
};

export const WirelessInterfaceListSingle = (
    DomesticLink: boolean,
): RouterConfig => {
    const config: RouterConfig = {
        "/interface list member": [],
    };

    if (DomesticLink) {
        config["/interface list member"].push(
            `add interface=wifi2.4-SplitLAN list=Split-LAN`,
            `add interface=wifi5-SplitLAN list=Split-LAN`,
            `add interface=wifi2.4-SplitLAN list=LAN`,
            `add interface=wifi5-SplitLAN list=LAN`,
        );
    } else {
        config["/interface list member"].push(
            `add interface=wifi2.4-VPNLAN list=VPN-LAN`,
            `add interface=wifi5-VPNLAN list=VPN-LAN`,
            `add interface=wifi2.4-VPNLAN list=LAN`,
            `add interface=wifi5-VPNLAN list=LAN`,
        );
    }
    return config;
};

export const WirelessInterfaceListMulti = (
    wireless: Wireless,
): RouterConfig => {
    const config: RouterConfig = {
        "/interface list member": [],
    };

    if (!wireless.MultiMode) {
        return config;
    }

    const networks = GetWirelessNetworks(wireless.MultiMode);

    for (const network of networks) {
        // Convert network names to their appropriate list names and full interface names
        let listName: string;
        let interfaceName: string;

        switch (network) {
            case "Split":
                listName = "Split-LAN";
                interfaceName = "Split";
                break;
            case "Domestic":
                listName = "DOM-LAN";
                interfaceName = "Domestic";
                break;
            case "Foreign":
                listName = "FRN-LAN";
                interfaceName = "Foreign";
                break;
            case "VPN":
                listName = "VPN-LAN";
                interfaceName = "VPN";
                break;
            default:
                continue;
        }

        // Add both 2.4GHz and 5GHz interfaces to their respective network lists
        config["/interface list member"].push(
            `add interface=wifi2.4-${interfaceName}LAN list=${listName}`,
            `add interface=wifi5-${interfaceName}LAN list=${listName}`,
            `add interface=wifi2.4-${interfaceName}LAN list=LAN`,
            `add interface=wifi5-${interfaceName}LAN list=LAN`,
        );
    }

    return config;
};
