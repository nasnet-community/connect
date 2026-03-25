// import type { RouterConfig } from "../ConfigGenerator";
import type { Subnets } from "~/components/Star/StarContext";

export const GetNetworks = (subnets: Subnets): string[] => {
    const networks: string[] = [];

    // Iterate over the values of BaseNetworks, not the keys
    Object.values(subnets.BaseSubnets).forEach((network) => {
        if (network.name) {
            networks.push(network.name);
        }
    });

    return networks;
};
