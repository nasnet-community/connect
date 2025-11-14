import type { AuthMethod, TLSVersion, NetworkProtocol, LayerMode, VPNType } from "../CommonType";


export type VSNetwork = "Domestic" | "Split" | "Foreign" | "VPN";




// BaseVPNServerConfig

export interface IPSec {
    UseIpsec: "yes" | "no" | "required";
    IpsecSecret?: string;
}

export interface PacketSize {
    MaxMtu?: number;
    MaxMru?: number;
    mrru?: "disabled" | number;
}

export interface BaseVPNServerConfig {
    enabled: boolean;
    DefaultProfile?: string;
    KeepaliveTimeout?: number;
    Authentication?: AuthMethod[];
    PacketSize?: PacketSize;
    VSNetwork?: VSNetwork;
}


// Pptp


export interface PptpServerConfig extends BaseVPNServerConfig {

}


// L2tp


export interface L2TPV3 {
    l2tpv3CircuitId?: string;
    l2tpv3CookieLength?: 0 | 4 | 8;
    l2tpv3DigestHash?: "md5" | "none" | "sha1";
    l2tpv3EtherInterfaceList: string;
}

export interface L2tpServerConfig extends BaseVPNServerConfig {
    IPsec: IPSec;
    allowFastPath?: boolean;
    maxSessions?: "unlimited" | number;
    OneSessionPerHost?: boolean;
    L2TPV3: L2TPV3;
    acceptProtoVersion?: "all" | "l2tpv2" | "l2tpv3";
    callerIdType?: "ip-address" | "number";
}


// Sstp


export interface SstpServerConfig extends BaseVPNServerConfig {
    Certificate: string;
    Port?: number;
    ForceAes?: boolean;
    Pfs?: boolean;
    Ciphers?: 'aes256-gcm-sha384' | 'aes256-sha';
    VerifyClientCertificate?: boolean;
    TlsVersion?: TLSVersion;
}


// OpenVpn


export type OvpnAuthMethod =
    | "md5" 
    | "sha1" 
    | "null" 
    | "sha256" 
    | "sha512" 
    | "sha384";
export type OvpnCipher =
    | "null"
    | "aes128-cbc"
    | "aes192-cbc"
    | "aes256-cbc"
    | "aes128-gcm"
    | "aes192-gcm"
    | "aes256-gcm"
    | "blowfish128";

export interface OVPNServerEncryption {
    Auth?: OvpnAuthMethod[];
    UserAuthMethod?: "mschap2" | "pap";
    Cipher?: OvpnCipher[];
    TlsVersion?: "any" | "only-1.2";
}

export interface OVPNServerV6 {
    EnableTunIPv6?: boolean;
    IPv6PrefixLength?: number;
    TunServerIPv6?: string;
}

export interface OVPNServerCertificate {
    Certificate: string;
    RequireClientCertificate?: boolean;
    CertificateKeyPassphrase?: string;
}

export interface OVPNServerAddress {
    Netmask?: number;
    MacAddress?: string;
    MaxMtu?: number;
    AddressPool?: string;
}

export interface OpenVpnServerConfig extends BaseVPNServerConfig {
    name: string;
    Port?: number;
    Protocol?: NetworkProtocol;
    Mode?: LayerMode;
    VRF?: string;
    RedirectGetway?: "def1" | "disabled" | "ipv6";
    PushRoutes?: string;
    RenegSec?: number;
    Encryption: OVPNServerEncryption;
    IPV6: OVPNServerV6;
    Certificate: OVPNServerCertificate;
    Address: OVPNServerAddress;
}


// Ikev2


interface IpsecPolicyGroupConfig {
    name: string;
    comment?: string;
}

export type IpsecPolicyAction =
    | "discard" 
    | "encrypt" 
    | "none";
export type IpsecPolicyLevel =
    | "require" 
    | "unique" 
    | "use";
export type IpsecPolicyProtocol =
    | "all" 
    | "icmp" 
    | "tcp" 
    | "udp" 
    | string;

interface IpsecPolicyTemplateConfig {
    group: string; // Name of IpsecPolicyGroupConfig. Mandatory.
    proposal: string; // Name of IpsecProposalConfig. Mandatory.
    srcAddress?: string; // Default: "0.0.0.0/0"
    dstAddress?: string; // Default: "0.0.0.0/0"
    protocol?: IpsecPolicyProtocol; // Default: 'all'
    srcPort?: "any" | number; // Default: 'any'
    dstPort?: "any" | number; // Default: 'any'
    action?: IpsecPolicyAction; // Default: 'encrypt'
    level?: IpsecPolicyLevel; // Default: 'require'
    ipsecProtocols?: "ah" | "esp"; // Default: 'esp'
    tunnel?: boolean; // Default: false. Should be true for tunnel mode.
    comment?: string;
    disabled?: boolean;
}

interface IpsecModeConfigItem {
    address?: string; // Single IP for initiator
    addressPool?: string; // Name of IpPoolConfig. Default: 'none'
    addressPrefixLength?: number; // For address
    comment?: string;
    name: string; // Name of this mode-config policy
    responder?: boolean; // Default: false. Should be true for server providing config.
    staticDns?: string; // Comma-separated IPs. Default: ""
    splitInclude?: string; // Comma-separated IP prefixes. Default: ""
    srcAddressList?: string; // address list name
    splitDns?: string; // list of DNS names
    systemDns?: boolean; // Default: false
}

export interface IPsecPeer {
    address?: string;
    comment?: string;
    disabled?: boolean;
    exchangeMode?: "ike" | "ike2"; // default: ike2
    localAddress?: string;
    name: string;
    passive?: boolean;
    port?: number;
    profile: string;
    sendInitialContact?: boolean;
}

export type IpsecIdentityAuthMethod =
    | "digital-signature"
    | "eap"
    | "eap-radius"
    | "pre-shared-key"
    | "pre-shared-key-xauth"
    | "rsa-key"
    | "rsa-signature-hybrid";

export type IpsecIdentityEapMethod =
    | "eap-mschapv2"
    | "eap-peap"
    | "eap-tls"
    | "eap-ttls";
export type IpsecIdentityMatchBy =
    | "remote-id" 
    | "certificate";
export type IpsecIdentityGeneratePolicy =
    | "no" 
    | "port-override" 
    | "port-strict";
export type IpsecIdentityMyIdType =
    | "auto"
    | "address"
    | "fqdn"
    | "user-fqdn"
    | "key-id";
export type IpsecIdentityRemoteIdType =
    | "auto"
    | "fqdn"
    | "user-fqdn"
    | "key-id"
    | "ignore";

interface IpsecIdentityConfig {
    authMethod: IpsecIdentityAuthMethod; // Default: 'pre-shared-key'
    certificate?: string; // For 'digital-signature' or EAP with certs
    comment?: string;
    disabled?: boolean;
    eapMethods?: IpsecIdentityEapMethod | string; // Default: 'eap-tls'. String for comma-sep list.
    generatePolicy?: IpsecIdentityGeneratePolicy; // Default: 'no'. 'port-strict' common for road warriors.
    key?: string; // Name of private key
    matchBy?: IpsecIdentityMatchBy; // Default: 'remote-id'
    modeConfig?: string; // Name of IpsecModeConfigItem. Default: 'none'
    myId?: IpsecIdentityMyIdType; // Default: 'auto'
    notrackChain?: string;
    password?: string; // For XAuth or EAP
    peer: string; // Name of IpsecPeerConfig. Mandatory.
    policyTemplateGroup?: string; // Default: 'default'. Used if generatePolicy enabled.
    remoteCertificate?: string; // For 'match-by=certificate'
    remoteId?: IpsecIdentityRemoteIdType; // Default: 'auto'
    remoteKey?: string; // Name of public key
    secret?: string; // For 'pre-shared-key'
    username?: string; // For XAuth or EAP
}

export type IpsecAuthAlgorithmPhase2 =
    | "md5" 
    | "null" 
    | "sha1" 
    | "sha256" 
    | "sha512";
export type IpsecEncAlgorithmPhase2 =
    | "null"
    | "des"
    | "3des"
    | "aes-128-cbc"
    | "aes-128-ctr"
    | "aes-128-gcm"
    | "aes-192-cbc"
    | "aes-192-ctr"
    | "aes-192-gcm"
    | "aes-256-cbc"
    | "aes-256-ctr"
    | "aes-256-gcm"
    | "blowfish"
    | "camellia-128"
    | "camellia-192"
    | "camellia-256"
    | "twofish";
export type IpsecDhGroup =
    | "modp768"
    | "modp1024"
    | "modp1536"
    | "modp2048"
    | "modp3072"
    | "modp4096"
    | "modp6144"
    | "modp8192"
    | "ecp256"
    | "ecp384"
    | "ecp521";

interface IpsecProposalConfig {
    name: string;
    authAlgorithms?: IpsecAuthAlgorithmPhase2 | string; // Default: 'sha1'
    encAlgorithms?: IpsecEncAlgorithmPhase2 | string; // Default: ['aes-256-cbc','aes-192-cbc','aes-128-cbc']
    lifetime?: string; // e.g., "30m". Default: "30m"
    pfsGroup?: IpsecDhGroup | "none"; // Default: 'modp1024'
    disabled?: boolean;
    comment?: string;
}

export type IpsecHashAlgorithm =
    | "md5" 
    | "sha1" 
    | "sha256" 
    | "sha512";
export type IpsecEncAlgorithmPhase1 =
    | "3des"
    | "aes-128"
    | "aes-192"
    | "aes-256"
    | "blowfish"
    | "camellia-128"
    | "camellia-192"
    | "camellia-256"
    | "des";

interface IpsecProfileConfig {
    name: string;
    hashAlgorithm?: IpsecHashAlgorithm | string; // Default: 'sha1'
    encAlgorithm?: IpsecEncAlgorithmPhase1 | string; // Default: 'aes-128'
    dhGroup?: IpsecDhGroup | string; // Default: ['modp1024','modp2048']
    lifetime?: string; // e.g., "1d", "8h". Default: "1d"
    natTraversal?: boolean; // Default: true
    dpdInterval?: string; // e.g., "8s", "disable-dpd". Default: "8s"
    dpdMaximumFailures?: number; // Default: 4
    lifebytes?: number;
    proposalCheck?: "claim" | "exact" | "obey" | "strict"; // Default: 'obey'
    comment?: string;
}

export interface IpPoolConfig {
    Name: string; // Mandatory
    Ranges: string; // Mandatory - e.g., "192.168.100.2-192.168.100.254"
    NextPool?: string; // Optional - next pool to use when this is exhausted
    comment?: string;
}

export interface Ikev2ServerConfig {
    ipPools?: IpPoolConfig;
    profile: IpsecProfileConfig;
    proposal: IpsecProposalConfig;
    policyGroup?: IpsecPolicyGroupConfig;
    policyTemplates?: IpsecPolicyTemplateConfig;
    peer: IPsecPeer;
    identities: IpsecIdentityConfig;
    modeConfigs?: IpsecModeConfigItem;
    VSNetwork?: VSNetwork;
}


// Wireguard


export interface WireguardInterfaceConfig {
    Name: string;
    PrivateKey: string;
    PublicKey?: string;
    InterfaceAddress: string;
    ListenPort?: number;
    Mtu?: number;
    VSNetwork?: VSNetwork;

}

export interface WireguardPeerClient {
    Address: string;
    DNS: string;
    endpoint: string;
    Keepalive: number;
    ListenPort: number;
}

export interface WireguardPeerConfig {
    PublicKey: string;
    AllowedAddress: string;
    PresharedKey?: string;
    EndpointAddress?: string;
    EndpointPort?: number;
    PersistentKeepalive?: number;
    Responder?: boolean;
    Comment?: string;
    Client?: WireguardPeerClient;
}

export interface WireguardServerConfig {
    Interface: WireguardInterfaceConfig;
    Peers: WireguardPeerConfig[];
}


// Users Credentials


export interface VSCredentials {
    Username: string;
    Password: string;
    VPNType: VPNType[];
}


// VPN Certificate


export interface VPNCertificateConfig {
    CAName: string;
    ServerCertName: string;
    ClientCertTemplate?: string;
    KeySize?: 1024 | 2048 | 4096;
    ValidityDays?: number;
    Organization?: string;
    Country?: string;
    State?: string;
    City?: string;
    Email?: string;
}



// PPP

export interface PPPGeneralAddress{
    Name: string; 
    LocalAddress: string; 
    RemoteAddress: string; 
    RemoteIpv6PrefixPool?: string;
    DHCPv6PDPool?: string;
    DHCPv6LeaseTime?: string;
}

export interface PPPGeneralBridge{
    Bridge?: string;
    BridgeHorizon?: number;
    BridgeLearning?: "default" | "no" | "yes";
    BridgePathCost?: number;
    BridgePortPriority?: number;
    BridgePortVid?: number;
    BridgePortTrusted?: boolean;
}

export interface PPPGeneralFilter{
    IncomingFilter?: string;
    OutgoingFilter?: string;
    AddressList?: string;
    InterfaceList?: string;
}

export interface PPPGeneralOptions{
    DNSServer?: string;
    WINSServer?: string;
    TCPMSS?: "no" | "yes" | "default";
    UPNP?: "no" | "yes" | "default";
}

export interface PPPGeneral{
    Address?: PPPGeneralAddress;
    Bridge?: PPPGeneralBridge;
    Filter?: PPPGeneralFilter;
    Options?: PPPGeneralOptions;
}

export interface PPPProtocol{
    IPv6?: "no" | "yes" | "required" | "default";
    MPLS?: "no" | "yes" | "required" | "default";
    Compression?: "no" | "yes" | "default";
    Encryption?: "no" | "yes" | "required" | "default";

}

export interface PPPLimits{
    SessionTimeout?: number;
    IdleTimeout?: number;
    RateLimit?: string;
    onlyOne?: "no" | "yes" | "default";
}

export type QueueType = 
    | "default" 
    | "default-small"
    | "ethernet-default"
    | "hotspot-default"
    | "multi-queue-ethernet-default"
    | "only-hardware-queue"
    | "pcq-download-default"
    | "pcq-upload-default"
    | "synchronous-default"
    | "wireless-default"


export interface PPPQueueType{
    Rx?: QueueType;
    Tx?: QueueType;
}

export interface PPPQueue{
    InsertionOrder?: "first" | "bottom";
    ParentQueue?: string;
    QueueType?: PPPQueueType;
}

export interface PPPScripts{
    onUp?: string;
    onDown?: string;
}

export interface PPPProfile{
    General?: PPPGeneral;
    Protocol?: PPPProtocol;
    Limits?: PPPLimits;
    Queue?: PPPQueue;
    Scripts?: PPPScripts;
}

export interface PppSecret {
    callerId?: string;
    comment?: string;
    disabled?: boolean;
    limitBytesIn?: number;
    limitBytesOut?: number;
    localAddress?: string;
    name: string;
    password?: string;
    profile?: string;
    remoteAddress?: string;
    remoteIpv6Prefix?: string;
    routes?: string;
    service?: "pptp" | "l2tp" | "sstp" | "ovpn" | "ike2" | "any";
}


// Socks5
export interface Socks5ServerConfig {
    enabled: boolean;
    Port: number;
    Network: VSNetwork;
    VSNetwork?: VSNetwork;
}

// SSH
export interface SSHServerConfig {
    enabled: boolean;
    Network: VSNetwork;
    VSNetwork?: VSNetwork;
}

// HTTP Proxy
export interface HTTPProxyServerConfig {
    enabled: boolean;
    Port: number;
    AllowedIPAddresses: string[];
    Network: VSNetwork;
    VSNetwork?: VSNetwork;
}

// BackToHome
export interface BackToHomeServerConfig {
    enabled: boolean;
    Network: VSNetwork;
    VSNetwork?: VSNetwork;
}

// ZeroTier
export interface ZeroTierServerConfig {
    enabled: boolean;
    Network: VSNetwork;
    ZeroTierNetworkID: string;
    VSNetwork?: VSNetwork;
}









export interface VPNServer {
    Users: VSCredentials[];
    CertificatePassphrase: string;
    PptpServer?: PptpServerConfig;
    L2tpServer?: L2tpServerConfig;
    SstpServer?: SstpServerConfig;
    OpenVpnServer?: OpenVpnServerConfig[];
    Ikev2Server?: Ikev2ServerConfig;
    WireguardServers?: WireguardServerConfig[];
    Socks5Server?: Socks5ServerConfig;
    SSHServer?: SSHServerConfig;
    HTTPProxyServer?: HTTPProxyServerConfig;
    BackToHomeServer?: BackToHomeServerConfig;
    ZeroTierServer?: ZeroTierServerConfig;

}
