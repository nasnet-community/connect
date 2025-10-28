import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import type { PptpClientConfig } from "~/components/Star/StarContext";
import {
    CommandShortner,
    mergeConfigurations,
    mergeMultipleConfigs,
} from "~/components/Star/ConfigGenerator";
import { BaseVPNConfig, GenerateVCInterfaceName } from "~/components/Star/ConfigGenerator";



















// PPTP Client

export const PPTPClient = (config: PptpClientConfig): RouterConfig => {
    const routerConfig: RouterConfig = {
        "/interface pptp-client": [],
    };

    const {
        Name,
        ConnectTo,
        Credentials,
        AuthMethod,
        KeepaliveTimeout,
        DialOnDemand,
    } = config;

    const interfaceName = GenerateVCInterfaceName(Name, "PPTP");

    let command = `add name="${interfaceName}" connect-to="${ConnectTo}" comment="${Name} PPTP"`;
    command += ` user="${Credentials.Username}" password="${Credentials.Password}"`;

    if (AuthMethod && AuthMethod.length > 0) {
        command += ` allow=${AuthMethod.join(",")}`;
    }

    if (KeepaliveTimeout) {
        command += ` keepalive-timeout=${KeepaliveTimeout}`;
    }

    if (DialOnDemand !== undefined) {
        command += ` dial-on-demand=${DialOnDemand ? "yes" : "no"}`;
    }

    command += ` disabled=no`;

    routerConfig["/interface pptp-client"].push(command);

    return CommandShortner(routerConfig);
};

export const PPTPClientWrapper = ( configs: PptpClientConfig[], checkIPMap?: Map<string, string> ): RouterConfig => {
    const routerConfigs: RouterConfig[] = [];

    configs.forEach((pptpConfig) => {
        const vpnConfig = PPTPClient(pptpConfig);
        const interfaceName = GenerateVCInterfaceName(pptpConfig.Name, "PPTP");
        const endpointAddress = pptpConfig.ConnectTo;
        
        // Use pre-assigned checkIP from map, or fallback to old behavior for backwards compatibility
        const checkIP = checkIPMap?.get(pptpConfig.Name);

        const baseConfig = BaseVPNConfig(
            interfaceName,
            endpointAddress,
            pptpConfig.Name,
            pptpConfig.WanInterface,
            checkIP,
        );

        routerConfigs.push(mergeConfigurations(vpnConfig, baseConfig));
    });

    return mergeMultipleConfigs(...routerConfigs);
};