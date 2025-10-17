// import type { RouterConfig } from "../ConfigGenerator";
import type { Subnets } from "~/components/Star/StarContext";

export const GetNetworks = (subnets: Subnets): string[] => {
    const networks: string[] = [];

    // Check if BaseSubnets exists before iterating
    if (!subnets.BaseSubnets) {
        return networks;
    }

    // Iterate over the values of BaseNetworks, not the keys
    Object.values(subnets.BaseSubnets).forEach((network) => {
        if (network && network.name) {
            networks.push(network.name);
        }
    });

    return networks;
};
