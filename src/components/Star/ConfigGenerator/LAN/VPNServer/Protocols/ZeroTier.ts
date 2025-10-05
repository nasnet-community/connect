import type { RouterConfig } from "../../../ConfigGenerator";
import type { ZeroTierServerConfig } from "~/components/Star/StarContext/Utils/VPNServerType";








export const ZeroTierServer = (config: ZeroTierServerConfig): RouterConfig => {
    if (!config.enabled) {
        return {};
    }

    const routerConfig: RouterConfig = {
        "/zerotier": [
            "set zt1 disabled=no"
        ],
        "/zerotier interface": [
            `add allow-default=no allow-global=no allow-managed=yes disabled=no \\
    instance=zt1 name=zerotier1 network=${config.ZeroTierNetworkID}`
        ],
    };

    return routerConfig;
};


export const ZeroTierServerUsers = (): RouterConfig => {
    const config: RouterConfig = {

    }

    return config

}


export const ZeroTierServerFirewall = (config: ZeroTierServerConfig): RouterConfig => {
    if (!config.enabled) {
        return {};
    }

    const routerConfig: RouterConfig = {
        "/ip firewall filter": [
            "",
            "# ZeroTier - Accept forwarded traffic from ZeroTier interface",
            `add action=accept chain=forward comment="Accept ZeroTier forwarded traffic" \\
    in-interface=zerotier1`,
            "",
            "# ZeroTier - Accept input traffic from ZeroTier interface",
            `add action=accept chain=input comment="Accept ZeroTier input traffic" \\
    in-interface=zerotier1`
        ],
    };

    return routerConfig;
};


export const ZeroTierServerWrapper = (): RouterConfig => {
    const config: RouterConfig = {

    }

    return config

}

















