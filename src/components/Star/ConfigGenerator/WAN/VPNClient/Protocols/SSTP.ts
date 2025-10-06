import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import type { SstpClientConfig } from "~/components/Star/StarContext";
import {
    CommandShortner,
    mergeConfigurations,
    mergeMultipleConfigs,
} from "~/components/Star/ConfigGenerator";
import { BaseVPNConfig, GenerateVCInterfaceName } from "~/components/Star/ConfigGenerator";


// SSTP Client

export const SSTPClient = (config: SstpClientConfig): RouterConfig => {
    const routerConfig: RouterConfig = {
        "/interface sstp-client": [],
    };

    const {
        Name,
        Server,
        Credentials,
        AuthMethod,
        Ciphers,
        TlsVersion,
        Proxy,
        SNI,
        PFS,
        DialOnDemand,
        KeepAlive,
        VerifyServerCertificate,
        VerifyServerAddressFromCertificate,
        ClientCertificateName,
    } = config;

    const interfaceName = GenerateVCInterfaceName(Name, "SSTP");

    let command = `add name=${interfaceName} connect-to=${Server.Address}`;

    // if (Server.Port) {
    //     command += ` port=${Server.Port}`;
    // }

    // command += ` user="${Credentials.Username}" password="${Credentials.Password}"`;
    command += ` user="${Credentials.Username}" `;

    if (AuthMethod && AuthMethod.length > 0) {
        command += ` authentication=${AuthMethod.join(",")}`;
    }

    if (Ciphers && Ciphers.length > 0) {
        command += ` ciphers=${Ciphers.join(",")}`;
    }

    if (TlsVersion) {
        command += ` tls-version=${TlsVersion}`;
    }

    if (Proxy) {
        command += ` http-proxy=${Proxy.Address} proxy-port=${Proxy.Port || 8080}`;
    }

    if (SNI !== undefined) {
        command += ` add-sni=${SNI ? "yes" : "no"}`;
    }

    if (PFS) {
        command += ` pfs=${PFS}`;
    }

    if (DialOnDemand !== undefined) {
        command += ` dial-on-demand=${DialOnDemand ? "yes" : "no"}`;
    }

    if (KeepAlive) {
        command += ` keepalive=${KeepAlive}`;
    }

    if (VerifyServerCertificate !== undefined) {
        command += ` verify-server-certificate=${VerifyServerCertificate ? "yes" : "no"}`;
    }

    if (VerifyServerAddressFromCertificate !== undefined) {
        command += ` verify-server-address-from-certificate=${VerifyServerAddressFromCertificate ? "yes" : "no"}`;
    }

    if (ClientCertificateName) {
        command += ` certificate=${ClientCertificateName}`;
    }

    command += ` disabled=no`;

    routerConfig["/interface sstp-client"].push(command);

    return CommandShortner(routerConfig);
};

export const SSTPClientWrapper = ( configs: SstpClientConfig[] ): RouterConfig => {
    const routerConfigs: RouterConfig[] = [];

    configs.forEach((sstpConfig) => {
        const vpnConfig = SSTPClient(sstpConfig);
        const interfaceName = GenerateVCInterfaceName(sstpConfig.Name, "SSTP");
        const endpointAddress = sstpConfig.Server.Address;

        const baseConfig = BaseVPNConfig(
            interfaceName,
            endpointAddress,
            sstpConfig.Name,
        );

        routerConfigs.push(mergeConfigurations(vpnConfig, baseConfig));
    });

    return mergeMultipleConfigs(...routerConfigs);
};