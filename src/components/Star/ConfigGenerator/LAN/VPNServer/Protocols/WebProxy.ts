import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import type { HTTPProxyServerConfig } from "~/components/Star/StarContext";



export const WebProxyServer = (config: HTTPProxyServerConfig): RouterConfig => {
    if (!config.enabled) {
        return {};
    }

    const routerConfig: RouterConfig = {
        "/ip proxy": [
            `set anonymous=yes enabled=yes port=${config.Port}`
        ],
    };

    // Add access list configuration if AllowedIPAddresses are specified
    if (config.AllowedIPAddresses && config.AllowedIPAddresses.length > 0) {
        const accessCommands = config.AllowedIPAddresses
            .filter(ip => ip.trim() !== "") // Filter out empty strings
            .map((ip, index) =>
                `add action=allow comment="Allowed IP ${index + 1}" \\
    dst-port=${config.Port} src-address=${ip.trim()}`
            );

        if (accessCommands.length > 0) {
            routerConfig["/ip proxy access"] = [
                "# Configure allowed IP addresses for HTTP Proxy",
                ...accessCommands
            ];
        }
    }

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

















