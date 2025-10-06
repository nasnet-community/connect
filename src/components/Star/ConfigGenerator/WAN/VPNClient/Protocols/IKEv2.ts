import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import type { Ike2ClientConfig } from "~/components/Star/StarContext";
import {
    CommandShortner,
    mergeConfigurations,
    mergeMultipleConfigs,
} from "~/components/Star/ConfigGenerator";
import { BaseVPNConfig, GenerateVCInterfaceName } from "~/components/Star/ConfigGenerator";












// IKeV2 Utility Functions

export const IKeV2Profile = ( config: Ike2ClientConfig, profileName: string ): string => {
    const profileParams = [
        `name=${profileName}`,
        `enc-algorithm=${config.EncAlgorithm?.join(",") || "aes-256,aes-192,aes-128"}`,
        `hash-algorithm=${config.HashAlgorithm?.join(",") || "sha256,sha1"}`,
        `dh-group=${config.DhGroup?.join(",") || "modp2048,modp1536"}`,
        `lifetime=${config.Lifetime || "8h"}`,
        `nat-traversal=${config.NatTraversal !== false ? "yes" : "no"}`,
    ];

    if (config.DpdInterval) {
        profileParams.push(`dpd-interval=${config.DpdInterval}`);
    }

    return `add ${profileParams.join(" ")}`;
};

export const IKeV2Proposal = ( config: Ike2ClientConfig, proposalName: string ): string => {
    const phase2EncAlgorithms = config.EncAlgorithm?.map((alg) => {
        switch (alg) {
            case "aes-128":
                return "aes-128-cbc";
            case "aes-192":
                return "aes-192-cbc";
            case "aes-256":
                return "aes-256-cbc";
            default:
                return alg;
        }
    }) || ["aes-256-cbc", "aes-192-cbc", "aes-128-cbc"];

    const proposalParams = [
        `name=${proposalName}`,
        `pfs-group=${config.PfsGroup || "modp2048"}`,
        `enc-algorithms=${phase2EncAlgorithms.join(",")}`,
        `auth-algorithms=${config.HashAlgorithm?.join(",") || "sha256,sha1"}`,
        `lifetime=${config.ProposalLifetime || "30m"}`,
    ];

    return `add ${proposalParams.join(" ")}`;
};

export const IKeV2Peer = ( config: Ike2ClientConfig, peerName: string, profileName: string ): string => {
    const peerParams = [
        `name=${peerName}`,
        `address=${config.ServerAddress}`,
        `profile=${profileName}`,
        "exchange-mode=ike2",
    ];

    if (config.Port && config.Port !== 500) {
        peerParams.push(`port=${config.Port}`);
    }

    if (config.LocalAddress) {
        peerParams.push(`local-address=${config.LocalAddress}`);
    }

    peerParams.push(
        `send-initial-contact=${config.SendInitialContact !== false ? "yes" : "no"}`,
    );

    return `add ${peerParams.join(" ")}`;
};

export const IKeV2Identity = ( config: Ike2ClientConfig, peerName: string, modeConfigName: string, policyGroupName: string ): string => {
    const identityParams = [
        `peer=${peerName}`,
        `auth-method=${config.AuthMethod}`,
    ];

    switch (config.AuthMethod) {
        case "pre-shared-key":
            if (!config.PresharedKey) {
                throw new Error(
                    "PresharedKey is required when AuthMethod is pre-shared-key",
                );
            }
            identityParams.push(`secret="${config.PresharedKey}"`);
            break;

        case "eap":
            if (!config.Credentials) {
                throw new Error(
                    "Credentials are required when AuthMethod is eap",
                );
            }

            identityParams.push(
                `eap-methods=${config.EapMethods?.join(",") || "eap-mschapv2"}`,
            );
            identityParams.push(`username="${config.Credentials.Username}"`);
            identityParams.push(`password="${config.Credentials.Password}"`);

            if (config.ClientCertificateName) {
                identityParams.push(
                    `certificate=${config.ClientCertificateName}`,
                );
            }
            break;

        case "digital-signature":
            if (!config.ClientCertificateName) {
                throw new Error(
                    "ClientCertificateName is required when AuthMethod is digital-signature",
                );
            }
            identityParams.push(`certificate=${config.ClientCertificateName}`);
            break;
    }

    // Add identity configuration parameters
    if (config.MyIdType && config.MyId) {
        identityParams.push(`my-id=${config.MyIdType}:${config.MyId}`);
    } else {
        identityParams.push("my-id=auto");
    }

    if (config.RemoteIdType && config.RemoteId) {
        identityParams.push(
            `remote-id=${config.RemoteIdType}:${config.RemoteId}`,
        );
    } else {
        identityParams.push(`remote-id=fqdn:${config.ServerAddress}`);
    }

    if (config.EnableModeConfig !== false) {
        identityParams.push(`mode-config=${modeConfigName}`);
    }

    identityParams.push(
        `generate-policy=${config.GeneratePolicy || "port-strict"}`,
    );
    identityParams.push(`policy-template-group=${policyGroupName}`);

    return `add ${identityParams.join(" ")}`;
};

export const IKeV2Policy = ( config: Ike2ClientConfig, policyGroupName: string, proposalName: string ): string => {
    const policyParams = [
        `group=${policyGroupName}`,
        "template=yes",
        `src-address=${config.PolicySrcAddress || "0.0.0.0/0"}`,
        `dst-address=${config.PolicyDstAddress || "0.0.0.0/0"}`,
        `proposal=${proposalName}`,
        `action=${config.PolicyAction || "encrypt"}`,
        `level=${config.PolicyLevel || "require"}`,
    ];

    return `add ${policyParams.join(" ")}`;
};

export const IKeV2ModeConfig = ( config: Ike2ClientConfig, modeConfigName: string ): string | null => {
    if (config.EnableModeConfig === false) {
        return null;
    }

    const modeConfigParams = [`name=${modeConfigName}`, "responder=no"];

    if (config.SrcAddressList) {
        modeConfigParams.push(`src-address-list=${config.SrcAddressList}`);
    }

    if (config.ConnectionMark) {
        modeConfigParams.push(`connection-mark=${config.ConnectionMark}`);
    }

    return `add ${modeConfigParams.join(" ")}`;
};

// IKeV2 Client

export const IKeV2Client = (config: Ike2ClientConfig): RouterConfig => {
    const routerConfig: RouterConfig = {
        "/ip ipsec profile": [],
        "/ip ipsec proposal": [],
        "/ip ipsec peer": [],
        "/ip ipsec identity": [],
        "/ip ipsec policy": [],
        "/ip ipsec policy group": [],
        "/ip ipsec mode-config": [],
    };

    // Use provided names or defaults
    const profileName = config.ProfileName || "ike2-profile";
    const peerName = config.PeerName || "ike2-peer";
    const proposalName = config.ProposalName || "ike2-proposal";
    const policyGroupName = config.PolicyGroupName || "ike2-policies";
    const modeConfigName = config.ModeConfigName || "ike2-modeconf";

    // Create IPsec Profile (Phase 1 parameters)
    routerConfig["/ip ipsec profile"].push(IKeV2Profile(config, profileName));

    // Create IPsec Proposal (Phase 2 parameters)
    routerConfig["/ip ipsec proposal"].push(
        IKeV2Proposal(config, proposalName),
    );

    // Create Policy Group
    routerConfig["/ip ipsec policy group"].push(`add name=${policyGroupName}`);

    // Create Mode Config (for road warrior setups)
    const modeConfigCommand = IKeV2ModeConfig(config, modeConfigName);
    if (modeConfigCommand) {
        routerConfig["/ip ipsec mode-config"].push(modeConfigCommand);
    }

    // Create IPsec Peer
    routerConfig["/ip ipsec peer"].push(
        IKeV2Peer(config, peerName, profileName),
    );

    // Create IPsec Identity
    routerConfig["/ip ipsec identity"].push(
        IKeV2Identity(config, peerName, modeConfigName, policyGroupName),
    );

    // Create IPsec Policy Template
    routerConfig["/ip ipsec policy"].push(
        IKeV2Policy(config, policyGroupName, proposalName),
    );

    return CommandShortner(routerConfig);
};


export const IKeV2ClientWrapper = ( configs: Ike2ClientConfig[] ): RouterConfig => {
    const routerConfigs: RouterConfig[] = [];

    configs.forEach((ikev2Config) => {
        const vpnConfig = IKeV2Client(ikev2Config);
        const interfaceName = GenerateVCInterfaceName(ikev2Config.Name, "IKeV2");
        const endpointAddress = ikev2Config.ServerAddress;

        const baseConfig = BaseVPNConfig(
            interfaceName,
            endpointAddress,
            ikev2Config.Name,
        );

        routerConfigs.push(mergeConfigurations(vpnConfig, baseConfig));
    });

    return mergeMultipleConfigs(...routerConfigs);
};