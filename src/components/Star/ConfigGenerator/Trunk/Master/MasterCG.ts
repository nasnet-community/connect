import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import type { ChooseState, WirelessConfig } from "~/components/Star/StarContext";
import { mergeMultipleConfigs } from "~/components/Star/ConfigGenerator";
import { generateBaseNetworkVLANs, generateAdditionalNetworkVLANs, generateVPNClientNetworkVLANs, generateWirelessTrunkInterface, addTrunkInterfaceToBridge } from "./MasterUtil";





export const MasterCG = (choose: ChooseState, wirelessConfigs?: WirelessConfig[] ): RouterConfig => {
    // Only generate for Trunk Mode
    if (choose.RouterMode !== "Trunk Mode") {
        return {};
    }

    // Find master router
    const masterRouter = choose.RouterModels.find(router => router.isMaster === true);

    // If no master router or no trunk interface configured, return empty
    if (!masterRouter || !masterRouter.MasterSlaveInterface) {
        return {};
    }

    const trunkInterface = masterRouter.MasterSlaveInterface;
    const configs: RouterConfig[] = [];

    // Check if trunk interface is wireless
    const isWirelessTrunk = trunkInterface.includes("wifi");

    if (isWirelessTrunk) {
        // Generate wireless trunk station interfaces if wireless configs are provided
        if (wirelessConfigs && wirelessConfigs.length > 0) {
            configs.push(generateWirelessTrunkInterface(wirelessConfigs));
        }

        // For wireless trunk, generate VLANs on both 2.4GHz and 5GHz interfaces
        const wirelessInterfaces = ["wifi2.4-Trunk", "wifi5-Trunk"];
        
        for (const wifiInterface of wirelessInterfaces) {
            configs.push(generateBaseNetworkVLANs(choose, wifiInterface));
            configs.push(generateAdditionalNetworkVLANs(choose, wifiInterface));
            configs.push(generateVPNClientNetworkVLANs(choose, wifiInterface));
        }
        
        // Add trunk wireless interfaces to Split or VPN bridge
        configs.push(addTrunkInterfaceToBridge(choose, trunkInterface));
    } else {
        // For wired trunk, generate VLANs on the single trunk interface
        configs.push(generateBaseNetworkVLANs(choose, trunkInterface));
        configs.push(generateAdditionalNetworkVLANs(choose, trunkInterface));
        configs.push(generateVPNClientNetworkVLANs(choose, trunkInterface));
        
        // Add trunk wired interface to Split or VPN bridge
        configs.push(addTrunkInterfaceToBridge(choose, trunkInterface));
    }

    // Filter out empty configs and merge
    const validConfigs = configs.filter(c => Object.keys(c).length > 0);
    return validConfigs.length === 0 ? {} : mergeMultipleConfigs(...validConfigs);
};
