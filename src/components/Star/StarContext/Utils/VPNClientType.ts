import type {
  //  VPNType,
  AuthMethod,
  TLSVersion,
  NetworkProtocol,
  LayerMode,
  Server,
  Credentials,
} from "../CommonType";

// Wireguard

export interface WireguardClientConfig {
  name?: string;
  InterfacePrivateKey: string;
  InterfaceAddress: string;
  InterfaceListenPort?: number;
  InterfaceMTU?: number;
  InterfaceDNS?: string;
  PeerPublicKey: string;
  PeerEndpointAddress: string;
  PeerEndpointPort: number;
  PeerAllowedIPs: string;
  PeerPresharedKey?: string;
  PeerPersistentKeepalive?: number;
}

// OpenVPN

export interface OpenVpnClientCertificates {
  ClientCertificateName?: string;
  CaCertificateName?: string;
  CaCertificateContent?: string;
  ClientCertificateContent?: string;
  ClientKeyContent?: string;
}

export interface OpenVpnClientConfig {
  name?: string;
  Server: Server;
  Mode?: LayerMode;
  Protocol?: NetworkProtocol;
  Credentials?: Credentials;
  AuthType: "Credentials" | "Certificate" | "CredentialsCertificate";
  Auth: "md5" | "sha1" | "null" | "sha256" | "sha512";
  Cipher?:
    | "null"
    | "aes128-cbc"
    | "aes128-gcm"
    | "aes192-cbc"
    | "aes192-gcm"
    | "aes256-cbc"
    | "aes256-gcm"
    | "blowfish128";
  TlsVersion?: TLSVersion;
  Certificates?: OpenVpnClientCertificates;
  VerifyServerCertificate?: boolean;
  RouteNoPull?: boolean;
}

// PPTP

export interface PptpClientConfig {
  name?: string;
  ConnectTo: string;
  Credentials: Credentials;
  AuthMethod?: AuthMethod[];
  KeepaliveTimeout?: number;
  DialOnDemand?: boolean;
}

// L2TP

export interface L2tpClientConfig {
  name?: string;
  Server: Server;
  Credentials: Credentials;
  UseIPsec?: boolean;
  IPsecSecret?: string;
  AuthMethod?: AuthMethod[];
  ProtoVersion?: "l2tpv2" | "l2tpv3-ip" | "l2tpv3-udp";
  FastPath?: boolean;
  keepAlive?: string;
  DialOnDemand?: boolean;
  CookieLength?: 0 | 4 | 8;
  DigestHash?: "md5" | "none" | "sha1";
  CircuitId?: string;
}

// SSTP

export type SSTPCiphers = "aes256-gcm-sha384" | "aes256-sha";

export interface SstpClientConfig {
  name?: string;
  Server: Server;
  Credentials: Credentials;
  AuthMethod?: AuthMethod[];
  Ciphers?: SSTPCiphers[];
  TlsVersion?: TLSVersion;
  Proxy?: Server | null;
  SNI?: boolean;
  PFS?: "yes" | "no" | "required";
  DialOnDemand?: boolean;
  KeepAlive?: number;
  VerifyServerCertificate?: boolean;
  VerifyServerAddressFromCertificate?: boolean;
  ClientCertificateName?: string;
}

// IKeV2

export type IkeV2AuthMethod = "pre-shared-key" | "digital-signature" | "eap";
export type IkeV2EapMethod =
  | "eap-mschapv2"
  | "eap-peap"
  | "eap-tls"
  | "eap-ttls";
export type IkeV2EncAlgorithm =
  | "aes-128"
  | "aes-192"
  | "aes-256"
  | "3des"
  | "blowfish"
  | "camellia-128"
  | "camellia-192"
  | "camellia-256";
export type IkeV2HashAlgorithm =
  | "md5"
  | "sha1"
  | "sha256"
  | "sha384"
  | "sha512";
export type IkeV2DhGroup =
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
export type IkeV2PfsGroup =
  | "none"
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
export type IkeV2PolicyAction = "encrypt" | "discard" | "none";
export type IkeV2PolicyLevel = "require" | "use" | "unique";
export type IkeV2GeneratePolicy = "no" | "port-strict" | "port-override";

export interface Ike2ClientConfig {
  name?: string;
  ServerAddress: string;
  AuthMethod: IkeV2AuthMethod;

  PresharedKey?: string;
  Credentials?: Credentials;
  ClientCertificateName?: string;

  CaCertificateName?: string;

  EapMethods?: IkeV2EapMethod[];

  EncAlgorithm?: IkeV2EncAlgorithm[];
  HashAlgorithm?: IkeV2HashAlgorithm[];
  DhGroup?: IkeV2DhGroup[];
  Lifetime?: string;
  NatTraversal?: boolean;
  DpdInterval?: string;

  PfsGroup?: IkeV2PfsGroup;
  ProposalLifetime?: string;

  PolicySrcAddress?: string;
  PolicyDstAddress?: string;
  PolicyAction?: IkeV2PolicyAction;
  PolicyLevel?: IkeV2PolicyLevel;

  EnableModeConfig?: boolean;
  RequestAddressPool?: boolean;
  SrcAddressList?: string;
  ConnectionMark?: string;

  MyIdType?: "auto" | "fqdn" | "user-fqdn" | "ip" | "asn1dn" | "key-id";
  MyId?: string;
  RemoteIdType?: "auto" | "fqdn" | "user-fqdn" | "ip" | "asn1dn" | "key-id";
  RemoteId?: string;
  GeneratePolicy?: IkeV2GeneratePolicy;

  Port?: number;
  LocalAddress?: string;
  SendInitialContact?: boolean;

  ProfileName?: string;
  PeerName?: string;
  ProposalName?: string;
  PolicyGroupName?: string;
  ModeConfigName?: string;
}

export interface VPNClient {
  Wireguard?: WireguardClientConfig;
  OpenVPN?: OpenVpnClientConfig;
  PPTP?: PptpClientConfig;
  L2TP?: L2tpClientConfig;
  SSTP?: SstpClientConfig;
  IKeV2?: Ike2ClientConfig;
}
