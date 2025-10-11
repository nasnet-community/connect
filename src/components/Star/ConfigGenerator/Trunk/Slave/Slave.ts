import type { ChooseState, WirelessConfig, RouterModels } from "~/components/Star/StarContext";
import type { Networks } from "~/components/Star/StarContext";
import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import { mergeMultipleConfigs } from "~/components/Star/ConfigGenerator";
import { SlaveWirelessConfig } from "./SlaveWireless";
import {
    getActiveNetworks,
    getTrunkInterface,
    getSlaveRouter,
    getAvailableEthernetInterfaces,
} from "./SlaveUtils";

/**
 * Create bridge configuration for all active networks
 */
const createBridges = (networks: Networks): RouterConfig => {
    const config: RouterConfig = {
        "/interface bridge": [],
    };

    const activeNetworks = getActiveNetworks(networks);

    activeNetworks.forEach((network) => {
        const comment = network.name
            ? `${network.type}-${network.name}`
            : network.type;

        config["/interface bridge"].push(
            `add name=${network.bridgeName} comment="${comment}"`
        );
    });

    return config;
};

/**
 * Create VLAN interfaces on trunk interface
 * VLANs are received from Master router
 */
const createVLANs = (networks: Networks, trunkInterface: string): RouterConfig => {
    const config: RouterConfig = {
        "/interface vlan": [],
    };

    const activeNetworks = getActiveNetworks(networks);

    activeNetworks.forEach((network) => {
        const comment = network.name
            ? `${network.type}-${network.name} Network`
            : `${network.type} Network`;

        config["/interface vlan"].push(
            `add comment="${comment}" interface=${trunkInterface} name=${network.vlanName} vlan-id=${network.vlanId}`
        );
    });

    return config;
};

/**
 * Add VLAN interfaces to bridges
 */
const addVLANsToBridges = (networks: Networks): RouterConfig => {
    const config: RouterConfig = {
        "/interface bridge port": [],
    };

    const activeNetworks = getActiveNetworks(networks);

    activeNetworks.forEach((network) => {
        const comment = network.name
            ? `${network.type}-${network.name} VLAN to Bridge`
            : `${network.type} VLAN to Bridge`;

        config["/interface bridge port"].push(
            `add bridge=${network.bridgeName} interface=${network.vlanName} comment="${comment}"`
        );
    });

    return config;
};

/**
 * Add available ethernet interfaces to bridges
 * Distributes ethernet ports across active networks in round-robin fashion
 */
const addEthernetToBridges = (
    networks: Networks,
    routerModels: RouterModels[]
): RouterConfig => {
    const config: RouterConfig = {
        "/interface bridge port": [],
    };

    const availableEthernets = getAvailableEthernetInterfaces(routerModels);
    if (availableEthernets.length === 0) return config;

    const activeNetworks = getActiveNetworks(networks);
    if (activeNetworks.length === 0) return config;

    // Distribute ethernet interfaces across networks
    // First priority goes to base networks (Split, Domestic, Foreign, VPN)
    const baseNetworks = activeNetworks.filter(n => !n.name);
    const additionalNetworks = activeNetworks.filter(n => n.name);

    // Assign to base networks first
    if (baseNetworks.length > 0) {
        availableEthernets.forEach((ethernet, index) => {
            const network = baseNetworks[index % baseNetworks.length];
            const comment = `${network.type} LAN`;

            config["/interface bridge port"].push(
                `add bridge=${network.bridgeName} interface=${ethernet} comment="${comment}"`
            );
        });
    } else if (additionalNetworks.length > 0) {
        // If no base networks, assign to additional networks
        availableEthernets.forEach((ethernet, index) => {
            const network = additionalNetworks[index % additionalNetworks.length];
            const comment = network.name
                ? `${network.type}-${network.name} LAN`
                : `${network.type} LAN`;

            config["/interface bridge port"].push(
                `add bridge=${network.bridgeName} interface=${ethernet} comment="${comment}"`
            );
        });
    }

    return config;
};

/**
 * Create DHCP client configuration for all bridges
 */
const createDHCPClients = (networks: Networks): RouterConfig => {
    const config: RouterConfig = {
        "/ip dhcp-client": [],
    };

    const activeNetworks = getActiveNetworks(networks);

    activeNetworks.forEach((network) => {
        config["/ip dhcp-client"].push(
            `add interface=${network.bridgeName}`
        );
    });

    return config;
};

/**
 * Create DNS configuration
 */
const createDNSConfig = (): RouterConfig => {
    return {
        "/ip dns": ["set allow-remote-requests=yes"],
    };
};

/**
 * Create system configuration (package updates, routerboard, romon)
 */
const createSystemConfig = (): RouterConfig => {
    return {
        "/system package update": ["set channel=stable"],
        "/system routerboard settings": ["set auto-upgrade=yes"],
        "/tool romon": ["set enabled=yes"],
    };
};

/**
 * Main Slave Router Configuration Generator
 * Creates complete configuration for a slave router in Trunk mode
 *
 * @param choose - Choose state containing router mode and models
 * @param networks - Network configuration
 * @param wirelessConfigs - Wireless configuration array
 * @returns RouterConfig for slave router
 */
export const SlaveCG = (
    choose: ChooseState,
    networks: Networks,
    wirelessConfigs: WirelessConfig[] = []
): RouterConfig => {
    // Only generate for Trunk Mode
    if (choose.RouterMode !== "Trunk Mode") {
        return {};
    }

    // Find slave router
    const slaveRouter = getSlaveRouter(choose.RouterModels);

    // If no slave router, return empty
    if (!slaveRouter) {
        return {};
    }

    // Get trunk interface
    const trunkInterface = getTrunkInterface(choose.RouterModels);

    // If no trunk interface configured, return empty
    if (!trunkInterface) {
        return {};
    }

    const configs: RouterConfig[] = [];

    // 1. Create bridges for all networks
    configs.push(createBridges(networks));

    // 2. Create VLAN interfaces on trunk
    configs.push(createVLANs(networks, trunkInterface));

    // 3. Add VLANs to bridges
    configs.push(addVLANsToBridges(networks));

    // 4. Add ethernet interfaces to bridges
    configs.push(addEthernetToBridges(networks, choose.RouterModels));

    // 5. Configure wireless (if applicable)
    if (wirelessConfigs.length > 0) {
        configs.push(SlaveWirelessConfig(wirelessConfigs, choose.RouterModels));
    }

    // 6. Create DHCP clients
    configs.push(createDHCPClients(networks));

    // 7. Add DNS configuration
    configs.push(createDNSConfig());

    // 8. Add system configuration
    configs.push(createSystemConfig());

    // Filter out empty configs and merge
    const validConfigs = configs.filter(c => Object.keys(c).length > 0);
    return validConfigs.length === 0 ? {} : mergeMultipleConfigs(...validConfigs);
};
