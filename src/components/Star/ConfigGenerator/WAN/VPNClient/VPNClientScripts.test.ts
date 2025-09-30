import { describe, it, expect } from "vitest";
import { GenerateOpenVPNCertificateScript } from "./VPNClientScripts";
import type {
    OpenVpnClientConfig,
    OpenVpnClientCertificates,
} from "../../../StarContext/Utils/VPNClientType";

describe("GenerateOpenVPNCertificateScript", () => {
    const mockBaseConfig: Omit<OpenVpnClientConfig, "Certificates"> = {
        Server: { Address: "1.1.1.1" },
        AuthType: "Certificate",
        Auth: "sha256",
    };

    it("should return an empty config if no certificates are provided", () => {
        const config: OpenVpnClientConfig = {
            ...mockBaseConfig,
            Certificates: {},
        };
        const result = GenerateOpenVPNCertificateScript(config);
        expect(result).toEqual({});
    });

    it("should return an empty config if Certificates object is undefined", () => {
        const config: OpenVpnClientConfig = { ...mockBaseConfig };
        const result = GenerateOpenVPNCertificateScript(config);
        expect(result).toEqual({});
    });

    it("should generate a script for a CA certificate only", () => {
        const certificates: OpenVpnClientCertificates = {
            CaCertificateName: "my-ca",
            CaCertificateContent: "---BEGIN CA CERT---",
        };
        const config: OpenVpnClientConfig = {
            ...mockBaseConfig,
            Certificates: certificates,
        };
        const result = GenerateOpenVPNCertificateScript(config);

        expect(result).toHaveProperty("/system script");
        expect(result).toHaveProperty("/system scheduler");

        const scriptCommand = result["/system script"][0];
        expect(scriptCommand).toContain("name=InstallOVPN-Certs");
        expect(scriptCommand).toContain(
            '/file set [find name=[/file add name="my-ca.crt"]] contents="---BEGIN CA CERT---"',
        );
        expect(scriptCommand).toContain(
            '/certificate import file-name="my-ca.crt" name="my-ca"',
        );
    });

    it("should generate a script for a client certificate and key", () => {
        const certificates: OpenVpnClientCertificates = {
            ClientCertificateName: "my-client",
            ClientCertificateContent: "---BEGIN CLIENT CERT---",
            ClientKeyContent: "---BEGIN CLIENT KEY---",
        };
        const config: OpenVpnClientConfig = {
            ...mockBaseConfig,
            Certificates: certificates,
        };
        const result = GenerateOpenVPNCertificateScript(config);

        expect(result).toHaveProperty("/system script");
        const scriptCommand = result["/system script"][0];
        expect(scriptCommand).toContain("name=InstallOVPN-Certs");
        expect(scriptCommand).toContain(
            '/file set [find name=[/file add name="my-client.pem"]] contents="---BEGIN CLIENT KEY---\\\\n---BEGIN CLIENT CERT---"',
        );
        expect(scriptCommand).toContain(
            '/certificate import file-name="my-client.pem" name="my-client"',
        );
        expect(scriptCommand).toContain(
            '/interface ovpn-client set [find where name="ovpn-client"] certificate=my-client',
        );
    });

    it("should generate a script for all certificate types combined", () => {
        const certificates: OpenVpnClientCertificates = {
            CaCertificateName: "my-ca",
            CaCertificateContent: "---BEGIN CA CERT---",
            ClientCertificateName: "my-client",
            ClientCertificateContent: "---BEGIN CLIENT CERT---",
            ClientKeyContent: "---BEGIN CLIENT KEY---",
        };
        const config: OpenVpnClientConfig = {
            ...mockBaseConfig,
            Certificates: certificates,
        };
        const result = GenerateOpenVPNCertificateScript(config);

        expect(result).toHaveProperty("/system script");
        expect(result).toHaveProperty("/system scheduler");

        const scriptCommand = result["/system script"][0];
        expect(scriptCommand).toContain(
            '/file set [find name=[/file add name="my-ca.crt"]]',
        );
        expect(scriptCommand).toContain(
            '/certificate import file-name="my-ca.crt" name="my-ca"',
        );
        expect(scriptCommand).toContain(
            '/file set [find name=[/file add name="my-client.pem"]]',
        );
        expect(scriptCommand).toContain(
            '/certificate import file-name="my-client.pem" name="my-client"',
        );
        expect(scriptCommand).toContain(
            '/interface ovpn-client set [find where name="ovpn-client"] certificate=my-client',
        );

        const schedulerCommands = result["/system scheduler"];
        expect(schedulerCommands).toHaveLength(4);
        expect(schedulerCommands[0]).toContain(
            "name=Sched-InstallOVPN-Certs on-event=InstallOVPN-Certs",
        );
        expect(schedulerCommands[3]).toContain(
            '/system script remove [find name="InstallOVPN-Certs"]',
        );
    });

    it("should use default names when certificate names are not provided", () => {
        const certificates: OpenVpnClientCertificates = {
            CaCertificateContent: "---BEGIN CA CERT---",
            ClientCertificateContent: "---BEGIN CLIENT CERT---",
        };
        const config: OpenVpnClientConfig = {
            ...mockBaseConfig,
            Certificates: certificates,
        };
        const result = GenerateOpenVPNCertificateScript(config);

        const scriptCommand = result["/system script"][0];
        expect(scriptCommand).toContain(
            '/file set [find name=[/file add name="ovpn-ca-cert.crt"]]',
        );
        expect(scriptCommand).toContain(
            '/certificate import file-name="ovpn-ca-cert.crt" name="ovpn-ca-cert"',
        );
        expect(scriptCommand).toContain(
            '/file set [find name=[/file add name="ovpn-client-cert.pem"]]',
        );
        expect(scriptCommand).toContain(
            '/certificate import file-name="ovpn-client-cert.pem" name="ovpn-client-cert"',
        );
    });

    it("should correctly escape special characters in certificate content", () => {
        const certificates: OpenVpnClientCertificates = {
            CaCertificateContent:
                'content with "quotes" and $dollar signs and \\backslashes',
        };
        const config: OpenVpnClientConfig = {
            ...mockBaseConfig,
            Certificates: certificates,
        };
        const result = GenerateOpenVPNCertificateScript(config);

        const scriptCommand = result["/system script"][0];
        expect(scriptCommand).toContain(
            'contents="content with \\"quotes\\" and \\$dollar signs and \\\\backslashes"',
        );
    });
});
