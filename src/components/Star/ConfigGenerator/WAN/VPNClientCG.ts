import type { RouterConfig } from "../ConfigGenerator";
import type {
    WireguardClientConfig,
    OpenVpnClientConfig,
    PptpClientConfig,
    L2tpClientConfig,
    SstpClientConfig,
    Ike2ClientConfig,
    VPNClient,
} from "../../StarContext/Utils/VPNClientType";

export const RouteToVPN = (InterfaceName: string, EndpointAddress: string): RouterConfig =>{
    const config: RouterConfig = {
        "/ip route": []
    };

    config["/ip route"].push(
        `add comment="Route-to-VPN" disabled=no distance=1 dst-address=0.0.0.0/0 gateway=${InterfaceName} pref-src=""\\
             routing-table=to-VPN scope=30 suppress-hw-offload=no target-scope=10`,
        `add comment="Route-to-FRN" disabled=no distance=1 dst-address=${EndpointAddress} gateway=192.168.1.1 pref-src=""\\
             routing-table=main scope=30 suppress-hw-offload=no target-scope=10`,
      );

    return config
}

export const InterfaceList = (InterfaceName: string): RouterConfig =>{
    const config: RouterConfig = {
        "/interface list member": []
    };

    config["/interface list member"].push(
        `add interface="${InterfaceName}" list="WAN"`,
        `add interface="${InterfaceName}" list="FRN-WAN"`,
      );

    return config
}

export const AddressList = (InterfaceName: string, Address: string): RouterConfig =>{
    const config: RouterConfig = {
        "/ip address": []
    };

    config["/ip address"].push(
        `add address=${Address} interface=${InterfaceName}`,
    );

    return config
}

export const DNSVPN = (DNS: string, DomesticLink: boolean): RouterConfig =>{
    const config: RouterConfig = {
        "/ip firewall nat": []
    };

    if(DomesticLink){
        config["/ip firewall nat"].push(
            `add action=dst-nat chain=dstnat comment="DNS VPN" dst-port=53 protocol=udp\\
                 src-address-list=VPN-Local to-addresses=${DNS}`,
            `add action=dst-nat chain=dstnat comment="DNS VPN" dst-port=53 protocol=tcp\\
                 src-address-list=VPN-Local to-addresses=${DNS}`,
            `add action=dst-nat chain=dstnat comment="DNS Split" dst-port=53 protocol=udp\\
                 src-address-list=Split-Local to-addresses=${DNS}`,
            `add action=dst-nat chain=dstnat comment="DNS Split" dst-port=53 protocol=tcp\\
                 src-address-list=Split-Local to-addresses=${DNS}`,
        );
    } else {
        config["/ip firewall nat"].push(
            `add action=dst-nat chain=dstnat comment="DNS VPN" dst-port=53 protocol=udp\\
                 src-address-list=VPN-Local to-addresses=${DNS}`,
            `add action=dst-nat chain=dstnat comment="DNS VPN" dst-port=53 protocol=tcp\\
                 src-address-list=VPN-Local to-addresses=${DNS}`,
        );
    }

    return config
}

export const BaseVPNConfig = (InterfaceName: string, EndpointAddress: string, DNS: string, DomesticLink: boolean): RouterConfig =>{
    const config: RouterConfig = {
        "/ip address": [],
        "/ip firewall nat": [],
        "/interface list member": [],
        "/ip route": [],
    };
    
    // call the functions and add the output of the functions to the config
    // const addressConfig = AddressList(InterfaceName, EndpointAddress);
    // config["/ip address"].push(...addressConfig["/ip address"]);
    
    const dnsConfig = DNSVPN(DNS, DomesticLink);
    config["/ip firewall nat"].push(...dnsConfig["/ip firewall nat"]);
    
    const interfaceListConfig = InterfaceList(InterfaceName);
    config["/interface list member"].push(...interfaceListConfig["/interface list member"]);
    
    const routeConfig = RouteToVPN(InterfaceName, EndpointAddress);
    config["/ip route"].push(...routeConfig["/ip route"]);

    return config;
}

export const WireguardClient = (config: WireguardClientConfig): RouterConfig => {
    const routerConfig: RouterConfig = {
        "/interface wireguard": [],
        "/interface wireguard peers": [],
        "/ip address": [],
        "/ip route": [],
    };

    const {
        InterfacePrivateKey,
        InterfaceAddress,
        InterfaceListenPort,
        InterfaceMTU,
        PeerPublicKey,
        PeerEndpointAddress,
        PeerEndpointPort,
        PeerAllowedIPs,
        PeerPresharedKey,
        PeerPersistentKeepalive
    } = config;

    let interfaceCommand = `add name=wireguard-client private-key="${InterfacePrivateKey}"`;
    
    if (InterfaceListenPort) {
        interfaceCommand += ` listen-port=${InterfaceListenPort}`;
    }
    
    if (InterfaceMTU) {
        interfaceCommand += ` mtu=${InterfaceMTU}`;
    }
    
    routerConfig["/interface wireguard"].push(interfaceCommand);

    let peerCommand = `add interface=wireguard-client public-key="${PeerPublicKey}" \\
         endpoint-address=${PeerEndpointAddress} endpoint-port=${PeerEndpointPort} \\
         allowed-address=${PeerAllowedIPs}`;
    
    if (PeerPresharedKey) {
        peerCommand += ` preshared-key="${PeerPresharedKey}"`;
    }
    
    if (PeerPersistentKeepalive) {
        peerCommand += ` persistent-keepalive=${PeerPersistentKeepalive}s`;
    }
    
    routerConfig["/interface wireguard peers"].push(peerCommand);

    routerConfig["/ip address"].push(
        `add address=${InterfaceAddress} interface=wireguard-client`
    );

    routerConfig["/ip route"].push(
        `add dst-address=${PeerEndpointAddress}/32 gateway=[/ip dhcp-client get [find] gateway] \\
         comment="WireGuard endpoint route"`
    );

    return routerConfig;
};

export const OpenVPNClient = (config: OpenVpnClientConfig): RouterConfig =>{
    const routerConfig: RouterConfig = {
        "/interface ovpn-client": [],
    };

    const { 
        Server,
        Mode,
        Protocol,
        Credentials,
        AuthType,
        Auth,
        Cipher,
        TlsVersion,
        ClientCertificateName,
        VerifyServerCertificate,
        RouteNoPull,
    } = config;

    let command = `add name=ovpn-client connect-to=${Server.Address}`;
    
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
    
    if (ClientCertificateName) {
        command += ` certificate=${ClientCertificateName}`;
    }
    
    if (VerifyServerCertificate !== undefined) {
        command += ` verify-server-certificate=${VerifyServerCertificate ? 'yes' : 'no'}`;
    }
    
    if (RouteNoPull !== undefined) {
        command += ` add-default-route=${RouteNoPull ? 'no' : 'yes'}`;
    }
    
    command += ` disabled=no`;

    routerConfig["/interface ovpn-client"].push(command);

    return routerConfig;
}

export const PPTPClient = (config: PptpClientConfig): RouterConfig =>{
    const routerConfig: RouterConfig = {
        "/interface pptp-client": [],
    };

    const { 
        ConnectTo,
        Credentials,
        AuthMethod,
        KeepaliveTimeout,
        DialOnDemand,
        KeepAlive,
    } = config;

    let command = `add name=pptp-client connect-to=${ConnectTo}`;
    command += ` user="${Credentials.Username}" password="${Credentials.Password}"`;
    
    if (AuthMethod && AuthMethod.length > 0) {
        command += ` allow=${AuthMethod.join(',')}`;
    }
    
    if (KeepaliveTimeout) {
        command += ` keepalive-timeout=${KeepaliveTimeout}`;
    }
    
    if (DialOnDemand !== undefined) {
        command += ` dial-on-demand=${DialOnDemand ? 'yes' : 'no'}`;
    }
    
    if (KeepAlive) {
        command += ` keepalive=${KeepAlive}`;
    }
    
    command += ` disabled=no`;

    routerConfig["/interface pptp-client"].push(command);

    return routerConfig;
}

export const L2TPClient = (config: L2tpClientConfig): RouterConfig =>{
    const routerConfig: RouterConfig = {
        "/interface l2tp-client": [],
    };

    const { 
        Server,
        Credentials,
        UseIPsec,
        IPsecSecret,
        AuthMethod,
        ProtoVersion,
        FastPath,
        keepAlive,
        DialOnDemand,
        CookieLength,
        DigestHash,
        CircuitId,
    } = config;

    let command = `add name=l2tp-client connect-to=${Server.Address}`;

    if (Server.Port) {
        command += ` port=${Server.Port}`;
    }

    command += ` user="${Credentials.Username}" password="${Credentials.Password}"`;
    
    if (UseIPsec !== undefined) {
        command += ` use-ipsec=${UseIPsec ? 'yes' : 'no'}`;
    }
    
    if (IPsecSecret) {
        command += ` ipsec-secret="${IPsecSecret}"`;
    }
    
    if (AuthMethod && AuthMethod.length > 0) {
        command += ` allow=${AuthMethod.join(',')}`;
    }
    
    if (ProtoVersion) {
        command += ` l2tp-proto-version=${ProtoVersion}`;
    }
    
    if (FastPath !== undefined) {
        command += ` fast-path=${FastPath ? 'yes' : 'no'}`;
    }
    
    if (keepAlive) {
        command += ` keepalive=${keepAlive}`;
    }
    
    if (DialOnDemand !== undefined) {
        command += ` dial-on-demand=${DialOnDemand ? 'yes' : 'no'}`;
    }
    
    if (CookieLength !== undefined) {
        command += ` cookie-length=${CookieLength}`;
    }
    
    if (DigestHash) {
        command += ` digest-hash=${DigestHash}`;
    }
    
    if (CircuitId) {
        command += ` circuit-id="${CircuitId}"`;
    }
    
    command += ` disabled=no`;

    routerConfig["/interface l2tp-client"].push(command);

    return routerConfig;
}

export const SSTPClient = (config: SstpClientConfig): RouterConfig =>{
    const routerConfig: RouterConfig = {
        "/interface sstp-client": [],
    };

    const { 
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

    let command = `add name=sstp-client connect-to=${Server.Address}`;
    
    if (Server.Port) {
        command += ` port=${Server.Port}`;
    }
    
    command += ` user="${Credentials.Username}" password="${Credentials.Password}"`;
    
    if (AuthMethod && AuthMethod.length > 0) {
        command += ` authentication=${AuthMethod.join(',')}`;
    }
    
    if (Ciphers && Ciphers.length > 0) {
        command += ` ciphers=${Ciphers.join(',')}`;
    }
    
    if (TlsVersion) {
        command += ` tls-version=${TlsVersion}`;
    }
    
    if (Proxy) {
        command += ` proxy=${Proxy.Address}:${Proxy.Port || 8080}`;
    }
    
    if (SNI !== undefined) {
        command += ` add-sni=${SNI ? 'yes' : 'no'}`;
    }
    
    if (PFS) {
        command += ` pfs=${PFS}`;
    }
    
    if (DialOnDemand !== undefined) {
        command += ` dial-on-demand=${DialOnDemand ? 'yes' : 'no'}`;
    }
    
    if (KeepAlive) {
        command += ` keepalive=${KeepAlive}`;
    }
    
    if (VerifyServerCertificate !== undefined) {
        command += ` verify-server-certificate=${VerifyServerCertificate ? 'yes' : 'no'}`;
    }
    
    if (VerifyServerAddressFromCertificate !== undefined) {
        command += ` verify-server-address-from-certificate=${VerifyServerAddressFromCertificate ? 'yes' : 'no'}`;
    }
    
    if (ClientCertificateName) {
        command += ` certificate=${ClientCertificateName}`;
    }
    
    command += ` disabled=no`;

    routerConfig["/interface sstp-client"].push(command);

    return routerConfig;
}

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
    const profileName = config.ProfileName || 'ike2-profile';
    const peerName = config.PeerName || 'ike2-peer';
    const proposalName = config.ProposalName || 'ike2-proposal';
    const policyGroupName = config.PolicyGroupName || 'ike2-policies';
    const modeConfigName = config.ModeConfigName || 'ike2-modeconf';

    // 1. Create IPsec Profile (Phase 1 parameters)
    let profileCommand = `add name=${profileName}`;
    
    // Add encryption algorithms
    if (config.EncAlgorithm && config.EncAlgorithm.length > 0) {
        profileCommand += ` enc-algorithm=${config.EncAlgorithm.join(',')}`;
    } else {
        profileCommand += ` enc-algorithm=aes-256,aes-192,aes-128`;
    }
    
    // Add hash algorithms
    if (config.HashAlgorithm && config.HashAlgorithm.length > 0) {
        profileCommand += ` hash-algorithm=${config.HashAlgorithm.join(',')}`;
    } else {
        profileCommand += ` hash-algorithm=sha256,sha1`;
    }
    
    // Add DH groups
    if (config.DhGroup && config.DhGroup.length > 0) {
        profileCommand += ` dh-group=${config.DhGroup.join(',')}`;
    } else {
        profileCommand += ` dh-group=modp2048,modp1536`;
    }
    
    // Add lifetime
    if (config.Lifetime) {
        profileCommand += ` lifetime=${config.Lifetime}`;
    } else {
        profileCommand += ` lifetime=8h`;
    }
    
    // Add NAT traversal
    profileCommand += ` nat-traversal=${config.NatTraversal !== false ? 'yes' : 'no'}`;
    
    // Add DPD interval
    if (config.DpdInterval) {
        profileCommand += ` dpd-interval=${config.DpdInterval}`;
    }
    
    routerConfig["/ip ipsec profile"].push(profileCommand);

    // 2. Create IPsec Proposal (Phase 2 parameters)
    let proposalCommand = `add name=${proposalName}`;
    
    // Add PFS group
    proposalCommand += ` pfs-group=${config.PfsGroup || 'modp2048'}`;
    
    // Add encryption algorithms for phase 2
    if (config.EncAlgorithm && config.EncAlgorithm.length > 0) {
        const phase2Enc = config.EncAlgorithm.map(alg => {
            // Convert phase 1 algorithms to phase 2 format
            switch (alg) {
                case 'aes-128': return 'aes-128-cbc';
                case 'aes-192': return 'aes-192-cbc';
                case 'aes-256': return 'aes-256-cbc';
                default: return alg;
            }
        });
        proposalCommand += ` enc-algorithms=${phase2Enc.join(',')}`;
    } else {
        proposalCommand += ` enc-algorithms=aes-256-cbc,aes-192-cbc,aes-128-cbc`;
    }
    
    // Add auth algorithms
    if (config.HashAlgorithm && config.HashAlgorithm.length > 0) {
        proposalCommand += ` auth-algorithms=${config.HashAlgorithm.join(',')}`;
    } else {
        proposalCommand += ` auth-algorithms=sha256,sha1`;
    }
    
    // Add lifetime
    if (config.ProposalLifetime) {
        proposalCommand += ` lifetime=${config.ProposalLifetime}`;
    } else {
        proposalCommand += ` lifetime=30m`;
    }
    
    routerConfig["/ip ipsec proposal"].push(proposalCommand);

    // 3. Create Policy Group (if needed)
    routerConfig["/ip ipsec policy group"].push(
        `add name=${policyGroupName}`
    );

    // 4. Create Mode Config (for road warrior setups)
    if (config.EnableModeConfig !== false) {
        let modeConfigCommand = `add name=${modeConfigName} responder=no`;
        
        if (config.SrcAddressList) {
            modeConfigCommand += ` src-address-list=${config.SrcAddressList}`;
        }
        
        if (config.ConnectionMark) {
            modeConfigCommand += ` connection-mark=${config.ConnectionMark}`;
        }
        
        routerConfig["/ip ipsec mode-config"].push(modeConfigCommand);
    }

    // 5. Create IPsec Peer
    let peerCommand = `add name=${peerName} address=${config.ServerAddress} profile=${profileName} exchange-mode=ike2`;
    
    if (config.Port && config.Port !== 500) {
        peerCommand += ` port=${config.Port}`;
    }
    
    if (config.LocalAddress) {
        peerCommand += ` local-address=${config.LocalAddress}`;
    }
    
    peerCommand += ` send-initial-contact=${config.SendInitialContact !== false ? 'yes' : 'no'}`;
    
    routerConfig["/ip ipsec peer"].push(peerCommand);

    // 6. Create IPsec Identity
    let identityCommand = `add peer=${peerName} auth-method=${config.AuthMethod}`;
    
    // Add authentication-specific parameters
    switch (config.AuthMethod) {
        case 'pre-shared-key':
            if (!config.PresharedKey) {
                throw new Error('PresharedKey is required when AuthMethod is pre-shared-key');
            }
            identityCommand += ` secret="${config.PresharedKey}"`;
            break;
            
        case 'eap':
            if (!config.Credentials) {
                throw new Error('Credentials are required when AuthMethod is eap');
            }
            
            // Add EAP methods
            if (config.EapMethods && config.EapMethods.length > 0) {
                identityCommand += ` eap-methods=${config.EapMethods.join(',')}`;
            } else {
                identityCommand += ` eap-methods=eap-mschapv2`;
            }
            
            identityCommand += ` username="${config.Credentials.Username}" password="${config.Credentials.Password}"`;
            
            // Add certificate if specified (for EAP-TLS)
            if (config.ClientCertificateName) {
                identityCommand += ` certificate=${config.ClientCertificateName}`;
            }
            break;
            
        case 'digital-signature':
            if (!config.ClientCertificateName) {
                throw new Error('ClientCertificateName is required when AuthMethod is digital-signature');
            }
            identityCommand += ` certificate=${config.ClientCertificateName}`;
            break;
    }
    
    // Add identity parameters
    if (config.MyIdType && config.MyId) {
        identityCommand += ` my-id=${config.MyIdType}:${config.MyId}`;
    } else {
        identityCommand += ` my-id=auto`;
    }
    
    if (config.RemoteIdType && config.RemoteId) {
        identityCommand += ` remote-id=${config.RemoteIdType}:${config.RemoteId}`;
    } else {
        identityCommand += ` remote-id=fqdn:${config.ServerAddress}`;
    }
    
    // Add mode-config if enabled
    if (config.EnableModeConfig !== false) {
        identityCommand += ` mode-config=${modeConfigName}`;
    }
    
    // Add policy generation
    if (config.GeneratePolicy) {
        identityCommand += ` generate-policy=${config.GeneratePolicy}`;
    } else {
        identityCommand += ` generate-policy=port-strict`;
    }
    
    // Add policy template group
    identityCommand += ` policy-template-group=${policyGroupName}`;
    
    routerConfig["/ip ipsec identity"].push(identityCommand);

    // 7. Create IPsec Policy Template
    let policyCommand = `add group=${policyGroupName} template=yes`;
    
    // Add source and destination addresses
    policyCommand += ` src-address=${config.PolicySrcAddress || '0.0.0.0/0'}`;
    policyCommand += ` dst-address=${config.PolicyDstAddress || '0.0.0.0/0'}`;
    
    // Add proposal
    policyCommand += ` proposal=${proposalName}`;
    
    // Add action and level
    policyCommand += ` action=${config.PolicyAction || 'encrypt'}`;
    policyCommand += ` level=${config.PolicyLevel || 'require'}`;
    
    routerConfig["/ip ipsec policy"].push(policyCommand);

    return routerConfig;
};

export const VPNClientWrapper = (vpnClient: VPNClient, DomesticLink: boolean): RouterConfig =>{
    const { Wireguard, OpenVPN, PPTP, L2TP, SSTP, IKeV2 } = vpnClient;

    let vpnConfig: RouterConfig = {};
    let interfaceName = "";
    let endpointAddress = "";
    let dns = "";

    if(Wireguard){
        vpnConfig = WireguardClient(Wireguard);
        interfaceName = "wireguard-client";
        endpointAddress = Wireguard.PeerEndpointAddress;
        dns = Wireguard.InterfaceDNS || "1.1.1.1";
    } else if(OpenVPN){
        vpnConfig = OpenVPNClient(OpenVPN);
        interfaceName = "ovpn-client";
        endpointAddress = OpenVPN.Server.Address;
        dns = "1.1.1.1";
    } else if(PPTP){
        vpnConfig = PPTPClient(PPTP);
        interfaceName = "pptp-client";
        endpointAddress = PPTP.ConnectTo;
        dns = "1.1.1.1";
    } else if(L2TP){
        vpnConfig = L2TPClient(L2TP);
        interfaceName = "l2tp-client";
        endpointAddress = L2TP.Server.Address;
        dns = "1.1.1.1";
    } else if(SSTP){
        vpnConfig = SSTPClient(SSTP);
        interfaceName = "sstp-client";
        endpointAddress = SSTP.Server.Address;
        dns = "1.1.1.1";
    } else if(IKeV2){
        vpnConfig = IKeV2Client(IKeV2);
        interfaceName = "ike2-client";
        endpointAddress = IKeV2.ServerAddress;
        dns = "1.1.1.1";
    }

    if (interfaceName && endpointAddress) {
        const baseConfig = BaseVPNConfig(interfaceName, endpointAddress, dns, DomesticLink);
        
        Object.keys(baseConfig).forEach(key => {
            if (vpnConfig[key]) {
                vpnConfig[key] = [...vpnConfig[key], ...baseConfig[key]];
            } else {
                vpnConfig[key] = baseConfig[key];
            }
        });
    }

    return vpnConfig;
}
