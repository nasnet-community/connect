import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import type { RouterModels, WirelessConfig, Subnets, ExtraConfigState } from "~/components/Star/StarContext";
import { mergeMultipleConfigs } from "~/components/Star/ConfigGenerator";
import { 
    createBridgesForNetworks,
    commentTrunkInterface,
    createVLANsOnTrunkInterface,
    addVLANsToBridges,
    createDHCPClientsOnBridges,
    SlaveExtraCG,
    addSlaveInterfacesToBridge,
    configureSlaveWireless
} from "./SlaveUtils";


export const SlaveCG = (
    slaveRouter: RouterModels,
    subnets?: Subnets,
    wirelessConfigs?: WirelessConfig[],
    extraConfig?: ExtraConfigState
): RouterConfig => {
    // Validate slave router
    if (slaveRouter.isMaster) {
        throw new Error("SlaveCG can only generate configuration for slave routers (isMaster must be false)");
    }

    // If slave has no trunk interface configured, return empty
    if (!slaveRouter.MasterSlaveInterface) {
        return {};
    }

    const trunkInterface = slaveRouter.MasterSlaveInterface;
    const configs: RouterConfig[] = [];

    // 1. Create bridges for all networks
    if (subnets) {
        configs.push(createBridgesForNetworks(subnets));
    }

    // 2. Comment the trunk interface
    configs.push(commentTrunkInterface(trunkInterface));

    // 3. Create VLANs on trunk interface
    if (subnets) {
        configs.push(createVLANsOnTrunkInterface(subnets, trunkInterface));
    }

    // 4. Add VLANs to their corresponding bridges
    if (subnets) {
        configs.push(addVLANsToBridges(subnets, trunkInterface));
    }

    // 5. Add available interfaces to bridge
    const slaveInterfaces = addSlaveInterfacesToBridge([slaveRouter], subnets);
    if (Object.keys(slaveInterfaces).length > 0) {
        configs.push(slaveInterfaces);
    }

    // 6. Configure wireless if WirelessConfig exists
    if (wirelessConfigs && wirelessConfigs.length > 0) {
        const wirelessConfig = configureSlaveWireless(
            wirelessConfigs,
            [slaveRouter],
            subnets
        );
        if (Object.keys(wirelessConfig).length > 0) {
            configs.push(wirelessConfig);
        }
    }

    // 7. Create DHCP clients on all bridges
    if (subnets) {
        configs.push(createDHCPClientsOnBridges(subnets));
    }

    // 8. Generate extra configuration (identity, services, scheduling, NTP, graphing, etc.)
    if (extraConfig) {
        configs.push(SlaveExtraCG(extraConfig));
    }

    // Filter out empty configs and merge
    const validConfigs = configs.filter(c => Object.keys(c).length > 0);
    return validConfigs.length === 0 ? {} : mergeMultipleConfigs(...validConfigs);
};

