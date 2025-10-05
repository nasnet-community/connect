import type { RouterConfig } from "../../../ConfigGenerator";
import type { OpenVpnClientConfig } from "../../../../StarContext/Utils/VPNClientType";
import {
    CommandShortner,
    mergeConfigurations,
    mergeMultipleConfigs,
} from "../../../utils/ConfigGeneratorUtil";
import { GenerateOpenVPNCertificateScript } from "./../VPNClientScripts";
import { BaseVPNConfig, GenerateVCInterfaceName } from "./../VPNClientUtils";


// OpenVPN Client

export const OpenVPNClient = (config: OpenVpnClientConfig): RouterConfig => {
    const routerConfig: RouterConfig = {
        "/interface ovpn-client": [],
    };

    const {
        Name,
        Server,
        Mode,
        Protocol,
        Credentials,
        AuthType,
        Auth,
        Cipher,
        TlsVersion,
        Certificates,
        VerifyServerCertificate,
        RouteNoPull,
    } = config;

    const interfaceName = GenerateVCInterfaceName(Name, "OpenVPN");

    let command = `add name=${interfaceName} connect-to="${Server.Address}"`;

    if (Server.Port) {
        command += ` port=${Server.Port}`;
    }

    if (Protocol) {
        command += ` protocol=${Protocol}`;
    }

    if (Mode) {
        command += ` mode=${Mode}`;
    }

    if (Credentials && AuthType !== "Certificate") {
        command += ` user="${Credentials.Username}" password="${Credentials.Password}"`;
    }

    command += ` auth=${Auth}`;

    if (Cipher) {
        command += ` cipher=${Cipher}`;
    }

    if (TlsVersion) {
        command += ` tls-version=${TlsVersion}`;
    }

    if (
        !Certificates?.ClientCertificateContent &&
        Certificates?.ClientCertificateName
    ) {
        command += ` certificate=${Certificates.ClientCertificateName}`;
    }

    if (VerifyServerCertificate !== undefined) {
        command += ` verify-server-certificate=${VerifyServerCertificate ? "yes" : "no"}`;
    }

    if (RouteNoPull !== undefined) {
        command += ` add-default-route=${RouteNoPull ? "no" : "yes"}`;
    }

    command += ` disabled=no`;

    routerConfig["/interface ovpn-client"].push(command);

    return CommandShortner(routerConfig);
};

export const OpenVPNClientWrapper = ( configs: OpenVpnClientConfig[] ): RouterConfig => {
    const routerConfigs: RouterConfig[] = [];

    configs.forEach((ovpnConfig) => {
        let vpnConfig = OpenVPNClient(ovpnConfig);

        // Add certificate script if certificates are provided
        if (ovpnConfig.Certificates) {
            const certScript = GenerateOpenVPNCertificateScript(ovpnConfig);
            vpnConfig = mergeConfigurations(vpnConfig, certScript);
        }

        const interfaceName = GenerateVCInterfaceName(ovpnConfig.Name, "OpenVPN");
        const endpointAddress = ovpnConfig.Server.Address;

        const baseConfig = BaseVPNConfig(
            interfaceName,
            endpointAddress,
            ovpnConfig.Name,
        );

        routerConfigs.push(mergeConfigurations(vpnConfig, baseConfig));
    });

    return mergeMultipleConfigs(...routerConfigs);
};