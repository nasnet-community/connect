import type { WirelessConfig, MultiMode, Wireless } from "../../StarContext/LANType";
import type { WANLink, WANConfig } from "../../StarContext/WANType";
import type { Networks, Band } from "../../StarContext/CommonType";
import type { RouterConfig } from "../ConfigGenerator";

export type MasterType = "wifi-2.4" | "wifi-5" | "wifi2.4-SplitLAN" | "wifi5-SplitLAN";

export function CheckMasters(WANLink: WANLink) {
    const Domestic = WANLink.Domestic?.InterfaceName;
    const Foreign = WANLink.Foreign.InterfaceName;
    const isWifi2_4:boolean = Domestic?.includes("wifi-2.4") || Foreign?.includes("wifi-2.4");
    const isWifi5:boolean = Domestic?.includes("wifi-5") || Foreign?.includes("wifi-5");
    return {
        isWifi2_4,
        isWifi5
    }
}

export function Hide(command: string, Hide: boolean){
    command = `${command} hide-ssid=${Hide}`;
    return command;
}

export function GetNetworks(MultiMode: MultiMode): Networks[] {
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

export function SSIDListGenerator(SSID: string, SplitBand: boolean){
    const SSIDList = {
        "2.4": "",
        "5": "",
    }
    if(SplitBand){
        SSIDList["2.4"] = `${SSID} 2.4`;
        SSIDList["5"] = `${SSID} 5`;
    } else {
        SSIDList["2.4"] = `${SSID}`;
        SSIDList["5"] = `${SSID}`;
    }
    return SSIDList;
}

export function Passphrase(passphrase: string, command: string) {
    return `${command} security.authentication-types=wpa2-psk,wpa3-psk .passphrase="${passphrase}" disabled=no`
}

export function StationMode(WANConfig: WANConfig, Link: "Domestic" | "Foreign"){
    const {InterfaceName, WirelessCredentials} = WANConfig;
    if(!WirelessCredentials) { return "";}
    const {SSID, Password} = WirelessCredentials;
    const command = `set ${InterfaceName} comment=${Link}WAN configuration.mode=station .ssid="${SSID}" disabled=no security.passphrase="${Password}"`;
    return command;
}

export function MasterInterface(Network: Networks, Band: Band, WANLink: WANLink, FirstNetwork: Networks){
    const {isWifi2_4, isWifi5} = CheckMasters(WANLink);
    if( Network === FirstNetwork ){
        if( Band === "2.4" && isWifi2_4 ){
            return "wifi-2.4"
        }
        if( Band === "5" && isWifi5 ){
            return "wifi-5"
        }
    } else {
        if( Band === "2.4" && isWifi2_4 ){
            return `wifi2.4-${Network}LAN`
        }
        if( Band === "5" && isWifi5 ){
            return `wifi5-${Network}LAN`
        }
    }
}

export function Slave(Network: Networks, Band: Band, WirelessConfig: WirelessConfig, WANLink: WANLink, FirstNetwork: Networks){
    const {SSID, Password, isHide, SplitBand} = WirelessConfig;
    const SSIDList = SSIDListGenerator(SSID, SplitBand);
    const Master = MasterInterface(Network, Band, WANLink, FirstNetwork);
    let command = `
                add  
                configuration.mode=ap 
                .ssid="${SSIDList[Band]}" 
                master-interface="${Master}" 
                name="wifi${Band}-${Network}LAN"
                comment="${Network}LAN"
                `;
    command = Passphrase(Password, command);
    command = Hide(command, isHide);
    return command;
}

export function Master(Network: Networks, Band: Band, WirelessConfig: WirelessConfig){
    const {SSID, Password, isHide, SplitBand} = WirelessConfig;
    const SSIDList = SSIDListGenerator(SSID, SplitBand);
    let command = `
                set 
                [ find name=wifi${Band} ] 
                configuration.country=Japan 
                .mode=ap 
                .ssid="${SSIDList[Band]}" 
                name="wifi${Band}-${Network}LAN"
                comment="${Network}LAN"
                `;
    command = Passphrase(Password, command);
    command = Hide(command, isHide);
    return command;
}

export const WirelessBridgePortsSingle = (DomesticLink: boolean): RouterConfig => {
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
}

export const WirelessBridgePortsMulti = (Wireless: Wireless): RouterConfig => {
    const config: RouterConfig = {
        "/interface bridge port": [],
    };
    const { MultiMode } = Wireless;

    if(!MultiMode){ return config;}

    const Networks = Object.keys(MultiMode);
    // shorten the Networks array to only convert the options to "Split", "DOM", "FRN", "VPN"
    const Networkss = Networks.map(Network => Network === "Split" ? "Split" : Network === "Domestic" ? "DOM" : Network === "Foreign" ? "FRN" : Network === "VPN" ? "VPN" : "");

    for(const Network of Networkss){
        config["/interface bridge port"].push(
            `add bridge=LANBridgeSplit interface=wifi2.4-${Network}LAN`,
            `add bridge=LANBridgeSplit interface=wifi5-${Network}LAN`,
        );
    }
    return config;
}

export const SingleSSID = (SingleMode: WirelessConfig, WANLink: WANLink, DomesticLink: boolean): RouterConfig => {
    const config: RouterConfig = {
        "/interface wifi": [],
    };
    
    const {isWifi2_4, isWifi5} = CheckMasters(WANLink);
    const Network = DomesticLink ? "Split" : "VPN";
    
    // Configure 2.4GHz band
    if(isWifi2_4) {
        // If this is already a master interface, we'll use slave configuration
        config["/interface wifi"].push(
            Slave(Network, "2.4", SingleMode, WANLink, Network)
        );
    } else {
        // Otherwise, configure as master
        config["/interface wifi"].push(
            Master(Network, "2.4", SingleMode)
        );
    }
    
    // Configure 5GHz band
    if(isWifi5) {
        // If this is already a master interface, we'll use slave configuration
        config["/interface wifi"].push(
            Slave(Network, "5", SingleMode, WANLink, Network)
        );
    } else {
        // Otherwise, configure as master
        config["/interface wifi"].push(
            Master(Network, "5", SingleMode)
        );
    }
    
    return config;
}

export const MultiSSID = (MultiMode: MultiMode, WANLink: WANLink): RouterConfig => {
    const config: RouterConfig = {
        "/interface wifi": [],
    };
    
    const networks = GetNetworks(MultiMode);
    const firstNetwork = networks[0] || "Split";
    
    for(const network of networks) {
        const wirelessConfig = MultiMode[network];
        if(!wirelessConfig) continue;
        
        const {isWifi2_4, isWifi5} = CheckMasters(WANLink);
        
        // Configure 2.4GHz band
        if(isWifi2_4) {
            config["/interface wifi"].push(
                Slave(network, "2.4", wirelessConfig, WANLink, firstNetwork)
            );
        } else {
            config["/interface wifi"].push(
                Master(network, "2.4", wirelessConfig)
            );
        }
        
        // Configure 5GHz band
        if(isWifi5) {
            config["/interface wifi"].push(
                Slave(network, "5", wirelessConfig, WANLink, firstNetwork)
            );
        } else {
            config["/interface wifi"].push(
                Master(network, "5", wirelessConfig)
            );
        }
    }
    
    return config;
}

export const CheckWireless = (Wireless: Wireless): boolean => {

    if (!Wireless) {
        return false;
    }
    
    const { SingleMode, MultiMode } = Wireless;
    
    if (!SingleMode && !MultiMode) {
        return false;
    }
    
    return true;
}

export function WirelessConfig(Wireless: Wireless, WANLink: WANLink, DomesticLink: boolean) {
    const {SingleMode, MultiMode} = Wireless;
    const config: RouterConfig = {
        "/interface wifi": [],
        "/interface bridge port": [],
    };

    if(!CheckWireless(Wireless)){
        return config;
    }

    
    if (SingleMode) {
        const singleSSIDConfig = SingleSSID(SingleMode, WANLink, DomesticLink);
        const bridgePortsConfig = WirelessBridgePortsSingle(DomesticLink);
        
        // Merge configurations
        if (singleSSIDConfig["/interface wifi"]) {
            config["/interface wifi"] = [...config["/interface wifi"], ...singleSSIDConfig["/interface wifi"]];
        }
        
        if (bridgePortsConfig["/interface bridge port"]) {
            config["/interface bridge port"] = [...config["/interface bridge port"], ...bridgePortsConfig["/interface bridge port"]];
        }
    } else if (MultiMode) {
        const multiSSIDConfig = MultiSSID(MultiMode, WANLink);
        const bridgePortsConfig = WirelessBridgePortsMulti(Wireless);
        
        // Merge configurations
        if (multiSSIDConfig["/interface wifi"]) {
            config["/interface wifi"] = [...config["/interface wifi"], ...multiSSIDConfig["/interface wifi"]];
        }
        
        if (bridgePortsConfig["/interface bridge port"]) {
            config["/interface bridge port"] = [...config["/interface bridge port"], ...bridgePortsConfig["/interface bridge port"]];
        }
    }
    
    return config;
}














