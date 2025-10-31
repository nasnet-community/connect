import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import type { L2tpClientConfig } from "~/components/Star/StarContext";
import {
    CommandShortner,
    mergeConfigurations,
    mergeMultipleConfigs,
} from "~/components/Star/ConfigGenerator";
import { BaseVPNConfig, GenerateVCInterfaceName } from "~/components/Star/ConfigGenerator";

// L2TP Client

export const L2TPClient = (config: L2tpClientConfig): RouterConfig => {
    const routerConfig: RouterConfig = {
        "/interface l2tp-client": [],
    };

    const {
        Name,
        Server,
        Credentials,
        UseIPsec,
        IPsecSecret,
        AuthMethod,
        ProtoVersion,
        keepAlive,
        DialOnDemand,
        CookieLength,
        DigestHash,
        CircuitId,
    } = config;

    const interfaceName = GenerateVCInterfaceName(Name, "L2TP");

    // if port exist add it to the server address
    // let ServerAddress = Server.Address;
    // if (Server.Port) {
    //     ServerAddress += `:${Server.Port}`;
    // }

    // let command = `add name=l2tp-client connect-to=${ServerAddress}`;
    let command = `add name="${interfaceName}" connect-to="${Server.Address}" comment="${Name} L2TP" random-source-port=yes`;

    command += ` user="${Credentials.Username}" password="${Credentials.Password}"`;

    if (UseIPsec !== undefined) {
        command += ` use-ipsec=${UseIPsec ? "yes" : "no"}`;
    }

    if (IPsecSecret) {
        command += ` ipsec-secret="${IPsecSecret}"`;
    }

    // FastPath must be disabled when IPsec is enabled, enabled otherwise
    if (UseIPsec === true) {
        command += ` allow-fast-path=no`;
    } else {
        command += ` allow-fast-path=yes`;
    }

    if (AuthMethod && AuthMethod.length > 0) {
        command += ` allow=${AuthMethod.join(",")}`;
    }

    if (ProtoVersion) {
        command += ` l2tp-proto-version=${ProtoVersion}`;
    }

    // make the keepalive timeout a number
    const keepAliveTimeout = parseInt(keepAlive || "0");

    if (keepAliveTimeout) {
        command += ` keepalive-timeout=${keepAliveTimeout}`;
    }

    if (DialOnDemand !== undefined) {
        command += ` dial-on-demand=${DialOnDemand ? "yes" : "no"}`;
    }

    if (CookieLength !== undefined) {
        command += ` l2tpv3-cookie-length=${CookieLength}`;
    }

    if (DigestHash) {
        command += ` l2tpv3-digest-hash=${DigestHash}`;
    }

    if (CircuitId) {
        command += ` l2tpv3-circuit-id="${CircuitId}"`;
    }

    command += ` disabled=no`;

    routerConfig["/interface l2tp-client"].push(command);

    return CommandShortner(routerConfig);
};

export const L2TPClientWrapper = ( configs: L2tpClientConfig[], checkIPMap?: Map<string, string> ): RouterConfig => {
    const routerConfigs: RouterConfig[] = [];

    configs.forEach((l2tpConfig) => {
        const vpnConfig = L2TPClient(l2tpConfig);
        const interfaceName = GenerateVCInterfaceName(l2tpConfig.Name, "L2TP");
        const endpointAddress = l2tpConfig.Server.Address;
        
        // Use pre-assigned checkIP from map, or fallback to old behavior for backwards compatibility
        const checkIP = checkIPMap?.get(l2tpConfig.Name);

        const baseConfig = BaseVPNConfig(
            interfaceName,
            endpointAddress,
            l2tpConfig.Name,
            l2tpConfig.WanInterface,
            checkIP,
        );

        routerConfigs.push(mergeConfigurations(vpnConfig, baseConfig));
    });

    return mergeMultipleConfigs(...routerConfigs);
};