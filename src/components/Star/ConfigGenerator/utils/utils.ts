// import type { RouterConfig } from "../ConfigGenerator";
import type { Subnets } from "../../StarContext/LANType";

export const GetNetworks = (subnets: Subnets): string[] => {
    const networks: string[] = [];

    // Iterate over the values of BaseNetworks, not the keys
    Object.values(subnets.BaseNetworks).forEach((network) => {
        if (network && network.name) {
            networks.push(network.name);
        }
    });

    return networks;
};
