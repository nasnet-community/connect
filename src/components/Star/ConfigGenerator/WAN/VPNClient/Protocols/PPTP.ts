import type { RouterConfig } from "../../../ConfigGenerator";
import type { PptpClientConfig } from "../../../../StarContext/Utils/VPNClientType";
import {
    CommandShortner,
    mergeConfigurations,
    mergeMultipleConfigs,
} from "../../../utils/ConfigGeneratorUtil";
import { BaseVPNConfig, GenerateVCInterfaceName } from "./../VPNClientUtils";



















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

    let command = `add name=${interfaceName} connect-to="${ConnectTo}"`;
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

export const PPTPClientWrapper = ( configs: PptpClientConfig[] ): RouterConfig => {
    const routerConfigs: RouterConfig[] = [];

    configs.forEach((pptpConfig) => {
        const vpnConfig = PPTPClient(pptpConfig);
        const interfaceName = GenerateVCInterfaceName(pptpConfig.Name, "PPTP");
        const endpointAddress = pptpConfig.ConnectTo;

        const baseConfig = BaseVPNConfig(
            interfaceName,
            endpointAddress,
            pptpConfig.Name,
        );

        routerConfigs.push(mergeConfigurations(vpnConfig, baseConfig));
    });

    return mergeMultipleConfigs(...routerConfigs);
};