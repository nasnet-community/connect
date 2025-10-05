import type { RouterConfig } from "../../../ConfigGenerator";
import type { 
    BackToHomeServerConfig,
    Credentials 
} from "~/components/Star/StarContext/Utils/VPNServerType";
// import type { Networks } from "~/components/Star/StarContext/CommonType";
// import { mergeMultipleConfigs } from "../../../utils/ConfigGeneratorUtil";










export const BTHServer = (config: BackToHomeServerConfig): RouterConfig => {
    if (!config.enabled) {
        return {};
    }

    const routerConfig: RouterConfig = {
        "/ip cloud": [
            "set back-to-home-vpn=enabled ddns-enabled=yes ddns-update-interval=1m"
        ],
    };

    return routerConfig;
};

export const BTHServerUsers = ( users: Credentials[], _config?: BackToHomeServerConfig ): RouterConfig => {
    const routerConfig: RouterConfig = {
        "/ip cloud back-to-home-user": [],
    };

    // Filter users that have BackToHome in their VPNType array
    const bthUsers = users.filter((user) =>
        user.VPNType.includes("BackToHome")
    );

    // Only add users if there are BackToHome users
    if (bthUsers.length === 0) {
        return {};
    }

    // Add each BackToHome user with allow-lan enabled
    bthUsers.forEach((user) => {
        routerConfig["/ip cloud back-to-home-user"].push(
            `add allow-lan=yes name="${user.Username}" \\
    comment="Back-to-Home VPN User - ${user.Username}"`
        );
    });

    return routerConfig;
};

export const BTHServerFirewall = (): RouterConfig => {
    const config: RouterConfig = {};

    

    return config

}

export const BTHServerWrapper = (): RouterConfig => {
    const config: RouterConfig = {

    }

    return config

}
















