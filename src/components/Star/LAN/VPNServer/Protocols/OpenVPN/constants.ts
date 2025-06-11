import type { NetworkProtocol, LayerMode, TLSVersion } from "../../../../StarContext/CommonType";
import type { OvpnAuthMethod, OvpnCipher } from "../../../../StarContext/Utils/VPNServerType";





export const protocols: {value: NetworkProtocol, label: string}[] = [
    { value: "tcp", label: "TCP" },
    { value: "udp", label: "UDP" }
  ];

  export const modes: {value: LayerMode, label: string}[] = [
    { value: "ip", label: "IP (Layer 3)" },
    { value: "ethernet", label: "Ethernet (Layer 2)" }
  ];

  export const authMethods: {value: OvpnAuthMethod, label: string}[] = [
    { value: "md5", label: "MD5" },
    { value: "sha1", label: "SHA1" },
    { value: "sha256", label: "SHA256" },
    { value: "sha512", label: "SHA512" },
    { value: "null", label: "None" }
  ];

  export const ciphers: {value: OvpnCipher, label: string}[] = [
    { value: "aes128-cbc", label: "AES-128-CBC" },
    { value: "aes128-gcm", label: "AES-128-GCM" },
    { value: "aes192-cbc", label: "AES-192-CBC" },
    { value: "aes192-gcm", label: "AES-192-GCM" },
    { value: "aes256-cbc", label: "AES-256-CBC" },
    { value: "aes256-gcm", label: "AES-256-GCM" },
    { value: "blowfish128", label: "Blowfish-128" },
    { value: "null", label: "None" }
  ];

  export const tlsVersions: {value: TLSVersion, label: string}[] = [
    { value: "any", label: "Any" },
    { value: "only-1.2", label: "TLS 1.2 Only" },
    { value: "only-1.3", label: "TLS 1.3 Only" }
  ];