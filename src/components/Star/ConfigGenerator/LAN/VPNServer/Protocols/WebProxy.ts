import type { RouterConfig } from "../../../ConfigGenerator";
import type { HTTPProxyServerConfig } from "~/components/Star/StarContext/Utils/VPNServerType";



export const WebProxyServer = (config: HTTPProxyServerConfig): RouterConfig => {
    if (!config.enabled) {
        return {};
    }

    const routerConfig: RouterConfig = {
        "/ip proxy": [
            `set anonymous=yes enabled=yes port=${config.Port}`
        ],
    };

    return routerConfig;
};

export const WebProxyServerUsers = (): RouterConfig => {
    const config: RouterConfig = {

    }

    return config

}

export const WebProxyServerFirewall = (): RouterConfig => {
    const config: RouterConfig = {

    }

    return config

}

export const WebProxyServerWrapper = (): RouterConfig => {
    const config: RouterConfig = {

    }

    return config

}

















