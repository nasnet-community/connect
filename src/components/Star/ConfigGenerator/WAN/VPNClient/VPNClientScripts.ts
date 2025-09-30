import type { RouterConfig } from "../../ConfigGenerator";
import type { OpenVpnClientConfig } from "../../../StarContext/Utils/VPNClientType";

export const GenerateOpenVPNCertificateScript = (
    config: OpenVpnClientConfig,
): RouterConfig => {
    const certs = config.Certificates;
    if (!certs) return {};

    let scriptSource = "";
    const caCertName = certs.CaCertificateName || "ovpn-ca-cert";
    const clientCertName = certs.ClientCertificateName || "ovpn-client-cert";

    const escapeContent = (content: string) =>
        content.replace(/[\\$"]/g, "\\$&").replace(/\n/g, "\\n");

    const addFileWithContent = (fileName: string, content: string) => {
        scriptSource += `:if ([:len [/file find name="${fileName}"]] > 0) do={ /file remove [find name="${fileName}"] };\n`;
        scriptSource += `/file set [find name=[/file add name="${fileName}"]] contents="${escapeContent(content)}";\n`;
    };

    if (certs.CaCertificateContent) {
        const caFileName = `${caCertName}.crt`;
        addFileWithContent(caFileName, certs.CaCertificateContent);
        scriptSource += `/certificate import file-name="${caFileName}" name="${caCertName}";\n`;
    }

    if (certs.ClientCertificateContent) {
        const clientCertFileName = `${clientCertName}.pem`;
        const clientCertFileContent =
            (certs.ClientKeyContent ? `${certs.ClientKeyContent}\\n` : "") +
            certs.ClientCertificateContent;
        addFileWithContent(clientCertFileName, clientCertFileContent);
        scriptSource += `/certificate import file-name="${clientCertFileName}" name="${clientCertName}";\n`;
        scriptSource += `:if ([:len [/interface ovpn-client find where name="ovpn-client"]] > 0) do={ /interface ovpn-client set [find where name="ovpn-client"] certificate=${clientCertName} };\n`;
    }

    if (!scriptSource) return {};

    const scriptName = "InstallOVPN-Certs";
    const finalScript = `:log info "Running ${scriptName}";\n${scriptSource}:log info "Finished ${scriptName}";`;

    const routerConfig: RouterConfig = {
        "/system script": [
            `add name=${scriptName} source="${finalScript}" policy=read,write,test`,
        ],
        "/system scheduler": [
            `add name=Sched-${scriptName} on-event=${scriptName} interval=1s start-time=startup`,
            `:delay 5s;`,
            `/system scheduler remove [find name="Sched-${scriptName}"];`,
            `/system script remove [find name="${scriptName}"];`,
        ],
    };

    return routerConfig;
};
