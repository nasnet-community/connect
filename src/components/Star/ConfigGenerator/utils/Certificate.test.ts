import { describe, expect, it } from "vitest";
import type { AllCertConfig } from "./Certificate";
import {
    AddCert,
    AllCert,
    CheckCGNAT,
    DiagnosticLetsEncrypt,
    DiagnosticLetsEncryptAdvanced,
    ExportCert,
    InitLetsEncrypt,
    LetsEncrypt,
    PrivateCert,
    PublicCert,
    RenewalLetsEncrypt,
    SimpleLetsEncryptRenewal,
} from "./Certificate";
import { SConfigGenerator } from "./ConfigGeneratorUtil";

describe("Certificate utilities", () => {
    // Verifies the CGNAT helper builds both a script and recurring scheduler for the selected WAN interface.
    it("builds the CGNAT monitoring bundle", () => {
        const result = CheckCGNAT("pppoe-out1");
        const configString = SConfigGenerator(result);

        expect(result["/system script"]).toHaveLength(1);
        expect(result["/system scheduler"]).toHaveLength(1);
        expect(configString).toContain("pppoe-out1");
        expect(configString).toContain('name="CGNAT-Check"');
        expect(configString).toContain("run CGNAT-Check");
    });

    // Verifies the initial Let's Encrypt helper produces the one-time startup script with ACME preparation steps.
    it("builds the initial Let's Encrypt acquisition script", () => {
        const result = InitLetsEncrypt();
        const configString = SConfigGenerator(result);

        expect(result["/system script"]).toHaveLength(1);
        expect(result["/system scheduler"]).toHaveLength(1);
        expect(configString).toContain('name="Init-LetsEncrypt"');
        expect(configString).toContain("LE-Initial-Cert-HTTP-Challenge");
        expect(configString).toContain("enable-ssl-certificate");
    });

    // Verifies the renewal helper preserves the current certificate name, threshold, and daily scheduler defaults.
    it("builds the renewal Let's Encrypt script with custom parameters", () => {
        const result = RenewalLetsEncrypt("EdgeCert", 15);
        const configString = SConfigGenerator(result);

        expect(result["/system script"]).toHaveLength(1);
        expect(result["/system scheduler"]).toHaveLength(1);
        expect(configString).toContain('name="Renewal-LetsEncrypt"');
        expect(configString).toContain("EdgeCert");
        expect(configString).toContain("daysBeforeExpiryToRenew 15");
        expect(configString).toContain("start-time=03:00:00");
    });

    // Verifies the combined Let's Encrypt helper currently merges both init and renewal bundles into one config.
    it("merges initial and renewal Let's Encrypt configs", () => {
        const result = LetsEncrypt("RouterCert", 21, "01:00:00");
        const scriptCommands = result["/system script"].join("\n");
        const schedulerCommands = result["/system scheduler"].join("\n");

        expect(result["/system script"]).toHaveLength(2);
        expect(result["/system scheduler"]).toHaveLength(2);
        expect(scriptCommands).toContain('name="Init-LetsEncrypt"');
        expect(scriptCommands).toContain('name="Renewal-LetsEncrypt"');
        expect(schedulerCommands).toContain("name=Init-LetsEncrypt");
        expect(schedulerCommands).toContain("name=Renewal-LetsEncrypt");
    });

    // Verifies the public CA updater includes both the self-cleaning update script and the CRL startup scheduler.
    it("builds the public certificate update bundle", () => {
        const result = PublicCert();
        const configString = SConfigGenerator(result);

        expect(result["/system script"]).toHaveLength(1);
        expect(result["/system scheduler"].length).toBeGreaterThanOrEqual(2);
        expect(configString).toContain('name="Public-Cert-Update"');
        expect(configString).toContain("google-roots-public");
        expect(configString).toContain("cacert-bundle-public");
        expect(configString).toContain("certificate-bundle-public");
        expect(configString).toContain("CRL-Download-Startup");
    });

    // Verifies the private CA helper uses the provided key size and validity while keeping the one-time wrapper.
    it("builds the private certificate setup bundle", () => {
        const result = PrivateCert(4096, 7300);
        const configString = SConfigGenerator(result);

        expect(result["/system script"]).toHaveLength(1);
        expect(result["/system scheduler"]).toHaveLength(1);
        expect(configString).toContain('name="Private-Cert-Setup"');
        expect(configString).toContain(":global KEYSIZE 4096;");
        expect(configString).toContain(":global DAYSVALID 7300;");
        expect(configString).toContain(
            "remove [find name=Private-Cert-Setup];",
        );
    });

    // Verifies the export helper carries the configured password into the generated certificate export script.
    it("builds the client certificate export bundle", () => {
        const result = ExportCert("SecurePass123");
        const configString = SConfigGenerator(result);

        expect(result["/system script"]).toHaveLength(1);
        expect(result["/system scheduler"]).toHaveLength(1);
        expect(configString).toContain('name="Export-Client-Cert"');
        expect(configString).toContain("SecurePass123");
        expect(configString).toContain("client_certificate.p12");
    });

    // Verifies the VPN assignment helper preserves manual target certificate selection in the generated script.
    it("builds the VPN certificate assignment bundle", () => {
        const result = AddCert("CompanyVPNCert");
        const configString = SConfigGenerator(result);

        expect(result["/system script"]).toHaveLength(1);
        expect(result["/system scheduler"]).toHaveLength(1);
        expect(configString).toContain('name="Add-VPN-Cert"');
        expect(configString).toContain("CompanyVPNCert");
        expect(configString).toContain(
            "Smart VPN Certificate Assignment Script",
        );
    });

    // Verifies the all-in-one helper documents custom values in the top-level comment block and merges the component bundles.
    it("builds the aggregated certificate management bundle", () => {
        const config: AllCertConfig = {
            wanInterfaceName: "pppoe-out1",
            certNameToRenew: "PartialCert",
            daysBeforeExpiryToRenew: 15,
            renewalStartTime: "01:30:00",
            keySize: 4096,
            daysValid: 7300,
            certPassword: "bundle-pass",
            checkServerCert: true,
            targetCertificateName: "CompanyVPNCert",
        };
        const result = AllCert(config);
        const configString = SConfigGenerator(result);

        expect(result["/system script"].length).toBeGreaterThanOrEqual(8);
        expect(result["/system scheduler"].length).toBeGreaterThanOrEqual(9);
        expect(configString).toContain(
            "Complete Certificate Management Configuration Bundle with OpenVPN",
        );
        expect(configString).toContain("# - WAN Interface: pppoe-out1");
        expect(configString).toContain(
            "# - Let's Encrypt Certificate: PartialCert",
        );
        expect(configString).toContain("# - Renewal Time: 01:30:00");
        expect(configString).toContain("# - Public Cert Validation: Enabled");
        expect(configString).toContain("bundle-pass");
        expect(configString).toContain("CompanyVPNCert");
    });

    // Verifies the enhanced diagnostic helper keeps the forum reference and recurring diagnostic scheduler.
    it("builds the enhanced diagnostic Let's Encrypt bundle", () => {
        const result = DiagnosticLetsEncrypt();
        const configString = SConfigGenerator(result);

        expect(result["/system script"]).toHaveLength(1);
        expect(result["/system scheduler"]).toHaveLength(1);
        expect(configString).toContain('name="LE-Enhanced-Diagnostic"');
        expect(configString).toContain(
            "forum.mikrotik.com/viewtopic.php?t=189289",
        );
        expect(configString).toContain("DNS propagation verification");
    });

    // Verifies the simplified renewal helper preserves either the supplied DNS name or the auto-detect branch.
    it("builds the simplified renewal bundle", () => {
        const result = SimpleLetsEncryptRenewal("vpn.example.com");
        const configString = SConfigGenerator(result);

        expect(result["/system script"]).toHaveLength(1);
        expect(result["/system scheduler"]).toHaveLength(1);
        expect(configString).toContain('name="Simple-LE-Renewal"');
        expect(configString).toContain("vpn.example.com");
        expect(configString).toContain(
            "enable-ssl-certificate dns-name=\\$dnsNameToUse",
        );
    });

    // Verifies the advanced diagnostic helper keeps the expected script name and expanded network checks.
    it("builds the advanced diagnostic Let's Encrypt bundle", () => {
        const result = DiagnosticLetsEncryptAdvanced();
        const configString = SConfigGenerator(result);

        expect(result["/system script"]).toHaveLength(1);
        expect(result["/system scheduler"]).toHaveLength(1);
        expect(configString).toContain('name="LE-Advanced-Diagnostic"');
        expect(configString).toContain(
            "Advanced Let's Encrypt Diagnostic Script",
        );
        expect(configString).toContain(
            "Test 1: Enhanced internet connectivity check",
        );
        expect(configString).toContain(
            "Advanced Let's Encrypt Diagnostic Completed",
        );
    });
});
