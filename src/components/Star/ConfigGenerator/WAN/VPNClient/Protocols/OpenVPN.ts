import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import type { OpenVpnClientConfig } from "~/components/Star/StarContext";
import {
    CommandShortner,
    mergeConfigurations,
    mergeMultipleConfigs,
} from "~/components/Star/ConfigGenerator";
// import { GenerateOpenVPNCertificateScript } from "~/components/Star/ConfigGenerator";
import { BaseVPNConfig, GenerateVCInterfaceName } from "~/components/Star/ConfigGenerator";
import { ScriptGenerator } from "~/components/Star/ConfigGenerator/utils/ScriptSchedule";


export interface OpenVPNImportConfig {
    /** Full content of the .ovpn configuration file */
    ovpnContent: string;
    /** Desired name for the OpenVPN interface */
    interfaceName: string;
    /** OpenVPN username for authentication */
    ovpnUser: string;
    /** OpenVPN password for authentication */
    ovpnPassword: string;
    /** Certificate key passphrase (can be empty string) */
    keyPassphrase: string;
    /** Temporary filename for the .ovpn file (default: "temp-import.ovpn") */
    tempFileName?: string;
    /** VPN connection name for script naming */
    vpnName: string;
}

export const GenerateOpenVPNImportScript = (
    config: OpenVPNImportConfig,
): RouterConfig => {
    const {
        ovpnContent,
        interfaceName,
        ovpnUser,
        ovpnPassword,
        keyPassphrase,
        tempFileName = "temp-import.ovpn",
        vpnName,
    } = config;

    // Build the script content as RouterConfig
    const scriptContent: RouterConfig = {
        "": [
            "# MikroTik OpenVPN Client Import Script",
            "# This script imports an OpenVPN configuration file and sets up the client",
            "",
            "# Variable Declarations",
            `:local ovpnContent "${ovpnContent}"`,
            `:local interfaceName "${interfaceName}"`,
            `:local ovpnUser "${ovpnUser}"`,
            `:local ovpnPassword "${ovpnPassword}"`,
            `:local keyPassphrase "${keyPassphrase}"`,
            `:local tempFileName "${tempFileName}"`,
            "",
            ':log info "OpenVPN Import Script: Starting import process..."',
            "",
            "# Step 1: Pre-flight checks - Verify interface name is not already in use",
            ':log info "OpenVPN Import Script: Checking if interface \'$interfaceName\' already exists..."',
            ":do {",
            "    :local interfaceExists [/interface/ovpn-client/find name=$interfaceName]",
            "    :if ([:len $interfaceExists] > 0) do={",
            '        :log error "OpenVPN Import Script: Interface \'$interfaceName\' already exists. Please remove it first or choose a different name."',
            '        :error "Interface \'$interfaceName\' already exists"',
            "    }",
            '    :log info "OpenVPN Import Script: Interface name is available."',
            "} on-error={",
            '    :log error "OpenVPN Import Script: Failed to check interface existence."',
            '    :error "Failed to check interface existence"',
            "}",
            "",
            "# Step 2: Create temporary .ovpn file",
            ':log info "OpenVPN Import Script: Creating temporary file \'$tempFileName\'..."',
            "",
            "# Step 2a: Create empty file",
            ":do {",
            "    /file print file=$tempFileName",
            "    :delay 1s",
            '    :log info "OpenVPN Import Script: File print command executed."',
            "} on-error={",
            '    :log error "OpenVPN Import Script: Failed to execute file print command."',
            '    :error "Failed to create temporary file"',
            "}",
            "",
            "# Step 2b: Verify .txt file was created and rename to .ovpn",
            ":local txtFileName ($tempFileName . \".txt\")",
            ':log info "OpenVPN Import Script: Looking for file \'$txtFileName\'..."',
            "",
            ":do {",
            "    :local txtFile [/file find name=$txtFileName]",
            "    :if ([:len $txtFile] = 0) do={",
            '        :log error "OpenVPN Import Script: File \'$txtFileName\' was not created."',
            '        :error "File not created"',
            "    }",
            '    :log info "OpenVPN Import Script: Found file \'$txtFileName\', renaming to \'$tempFileName\'..."',
            "    /file set $txtFile name=$tempFileName",
            "    :delay 500ms",
            "} on-error={",
            '    :log error "OpenVPN Import Script: Failed to rename file from .txt to .ovpn extension."',
            '    :error "Failed to rename file"',
            "}",
            "",
            "# Step 2c: Verify .ovpn file exists",
            ":do {",
            "    :local ovpnFile [/file find name=$tempFileName]",
            "    :if ([:len $ovpnFile] = 0) do={",
            '        :log error "OpenVPN Import Script: File \'$tempFileName\' does not exist after rename."',
            '        :error "File not found after rename"',
            "    }",
            '    :log info "OpenVPN Import Script: File \'$tempFileName\' exists, setting contents..."',
            "} on-error={",
            '    :log error "OpenVPN Import Script: Failed to verify renamed file."',
            '    :error "Failed to verify file"',
            "}",
            "",
            "# Step 2d: Set file contents",
            ":do {",
            "    /file set $tempFileName contents=$ovpnContent",
            "    :delay 1s",
            '    :log info "OpenVPN Import Script: File contents set, verifying..."',
            "    :local fileSize [/file get [/file find name=$tempFileName] size]",
            '    :log info "OpenVPN Import Script: File \'$tempFileName\' created successfully with size: $fileSize bytes"',
            "    :if ($fileSize = 0) do={",
            '        :log error "OpenVPN Import Script: File has zero size, content was not set properly."',
            '        :error "File content is empty"',
            "    }",
            "} on-error={",
            '    :log error "OpenVPN Import Script: Failed to set file contents."',
            "    :do {",
            "        /file remove $tempFileName",
            "    } on-error={}",
            '    :error "Failed to set file contents"',
            "}",
            "",
            ':log info "OpenVPN Import Script: Temporary file created successfully."',
            "",
            "# Step 2.5: Track existing certificates before import",
            ':log info "OpenVPN Import Script: Recording existing certificates..."',
            ':local existingCerts [:toarray ""]',
            ":do {",
            "    :foreach cert in=[/certificate find] do={",
            "        :set existingCerts ($existingCerts, [/certificate get $cert name])",
            "    }",
            '    :log info "OpenVPN Import Script: Found $[:len $existingCerts] existing certificates"',
            "} on-error={",
            '    :log warning "OpenVPN Import Script: Failed to list existing certificates, continuing anyway..."',
            "}",
            "",
            "# Step 3: Import OpenVPN configuration",
            ':log info "OpenVPN Import Script: Importing OpenVPN configuration from file..."',
            ':log info "OpenVPN Import Script: Listing files before import..."',
            ":do {",
            "    /file print detail where name=$tempFileName",
            "} on-error={}",
            "",
            ":local importSuccess false",
            ':local importedInterfaceName ""',
            "",
            ":do {",
            "    /interface/ovpn-client/import-ovpn-configuration file-name=$tempFileName ovpn-user=$ovpnUser ovpn-password=$ovpnPassword key-passphrase=$keyPassphrase skip-cert-import=no",
            "    :set importSuccess true",
            "    :delay 3s",
            '    :log info "OpenVPN Import Script: Import command completed, checking for created interface..."',
            "    :local allInterfaces [/interface/ovpn-client/find]",
            "    :if ([:len $allInterfaces] > 0) do={",
            "        :local lastInterface [:pick $allInterfaces ([:len $allInterfaces] - 1)]",
            "        :set importedInterfaceName [/interface/ovpn-client/get $lastInterface name]",
            '        :log info "OpenVPN Import Script: Found interface: $importedInterfaceName"',
            "    } else={",
            '        :log warning "OpenVPN Import Script: No interfaces found after import."',
            "    }",
            "} on-error={",
            '    :log error "OpenVPN Import Script: Failed to import OpenVPN configuration."',
            '    :error "Failed to import OpenVPN configuration"',
            "}",
            "",
            ":if ($importSuccess = false) do={",
            '    :log error "OpenVPN Import Script: Import process failed."',
            '    :error "Import process failed"',
            "}",
            "",
            ':log info "OpenVPN Import Script: Configuration imported successfully. Interface name: $importedInterfaceName"',
            ':log info "OpenVPN Import Script: Waiting for certificates to be fully imported..."',
            "    :delay 3s",
            "",
            "# Step 4: Rename the interface to the desired name",
            ":if ([:len $importedInterfaceName] > 0) do={",
            "    :if ($importedInterfaceName != $interfaceName) do={",
            '        :log info "OpenVPN Import Script: Renaming interface from \'$importedInterfaceName\' to \'$interfaceName\'..."',
            "        :do {",
            "            /interface/ovpn-client/set [find name=$importedInterfaceName] name=$interfaceName use-peer-dns=no route-nopull=no add-default-route=no disabled=no",
            '            :log info "OpenVPN Import Script: Interface renamed successfully to \'$interfaceName\'."',
            "        } on-error={",
            '            :log error "OpenVPN Import Script: Failed to rename interface."',
            '            :error "Failed to rename interface"',
            "        }",
            "    } else={",
            '        :log info "OpenVPN Import Script: Interface already has the desired name \'$interfaceName\'."',
            "    }",
            "} else={",
            '    :log warning "OpenVPN Import Script: Could not determine imported interface name. Please rename manually."',
            "}",
            "",
            "# Step 5: Detect and assign newly imported certificates",
            ':log info "OpenVPN Import Script: Checking for newly imported certificates..."',
            "    :delay 3s",
            ':local newClientCert ""',
            ":do {",
            '    :log info "OpenVPN Import Script: Comparing certificate lists..."',
            "    :foreach cert in=[/certificate find] do={",
            "        :local certName [/certificate get $cert name]",
            "        :local isNewCert true",
            "        ",
            "        # Check if certificate existed before import",
            "        :foreach existingCert in=$existingCerts do={",
            "            :if ($certName = $existingCert) do={",
            "                :set isNewCert false",
            "            }",
            "        }",
            "        ",
            "        # If it's a new certificate, check if it's a client cert",
            "        :if ($isNewCert = true) do={",
            "            :local certCA [/certificate get $cert ca]",
            "            :local certPrivateKey [/certificate get $cert private-key]",
            '            :log info "OpenVPN Import Script: Found new certificate: $certName (CA=$certCA, Has-Private-Key=$certPrivateKey)"',
            "            ",
            "            # Client certificates have a private key",
            "            # CA certificates typically do NOT have private keys",
            "            :if ($certPrivateKey = true) do={",
            "                :set newClientCert $certName",
            '                :log info "OpenVPN Import Script: Identified client certificate: $certName"',
            "            }",
            "        }",
            "    }",
            "} on-error={",
            '    :log error "OpenVPN Import Script: Failed to detect new certificates"',
            "}",
            "",
            "# Step 5b: Assign client certificate to interface if found",
            ":if ([:len $newClientCert] > 0) do={",
            '    :log info "OpenVPN Import Script: Assigning certificate \'$newClientCert\' to interface \'$interfaceName\'..."',
            "    :do {",
            "        /interface/ovpn-client/set [find name=$interfaceName] certificate=$newClientCert",
            '        :log info "OpenVPN Import Script: Certificate assigned successfully"',
            "    } on-error={",
            '        :log error "OpenVPN Import Script: Failed to assign certificate to interface"',
            '        :error "Failed to assign certificate"',
            "    }",
            "} else={",
            '    :log warning "OpenVPN Import Script: No new client certificate detected. Interface may not work correctly without a certificate."',
            "}",
            "",
            "# Script completed successfully",
            ':log info "OpenVPN Import Script: Import process completed successfully!"',
            ':log info "OpenVPN Import Script: Interface \'$interfaceName\' is now configured."',
            ':put "OpenVPN client \'$interfaceName\' imported successfully!"',
        ],
    };

    // Use ScriptGenerator to wrap the script content
    const dynamicScriptName = `OpenVPN-Import-${vpnName}`;
    const scriptConfig = ScriptGenerator({
        ScriptContent: scriptContent,
        scriptName: dynamicScriptName,
    });

    // Add the command to run the script
    const runCommand: RouterConfig = {
        "/system script": [
            `run "${dynamicScriptName}"`,
            `:delay 10s`
        ],
    };

    // Merge script definition with run command
    return mergeConfigurations(scriptConfig, runCommand);
};



// OpenVPN Client

export const OpenVPNClient = (config: OpenVpnClientConfig): RouterConfig => {
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
        OVPNFileContent,
        keyPassphrase,
    } = config;

    const interfaceName = GenerateVCInterfaceName(Name, "OpenVPN");

    // If OVPN file content is provided, use the import script instead of manual config
    if (OVPNFileContent) {
        return GenerateOpenVPNImportScript({
            ovpnContent: OVPNFileContent,
            interfaceName: interfaceName,
            ovpnUser: Credentials?.Username || "",
            ovpnPassword: Credentials?.Password || "",
            keyPassphrase: keyPassphrase || "",
            tempFileName: `${interfaceName}-import.ovpn`,
            vpnName: Name,
        });
    }

    // Use manual configuration
    const routerConfig: RouterConfig = {
        "/interface ovpn-client": [],
    };

    let command = `add name="${interfaceName}" connect-to="${Server.Address}" comment="${Name} OpenVPN"`;

    if (Server.Port) {
        command += ` port=${Server.Port}`;
    }

    if (Protocol) {
        command += ` protocol="${Protocol}"`;
    }

    if (Mode) {
        command += ` mode=ethernet`;
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
        command += ` certificate="${Certificates.ClientCertificateName}"`;
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

export const OpenVPNClientWrapper = ( configs: OpenVpnClientConfig[], checkIPMap?: Map<string, string> ): RouterConfig => {
    const routerConfigs: RouterConfig[] = [];

    configs.forEach((ovpnConfig) => {
        const interfaceName = GenerateVCInterfaceName(ovpnConfig.Name, "OpenVPN");
        
        // Generate the VPN configuration (handles both file import and manual config)
        const vpnConfig = OpenVPNClient(ovpnConfig);

        // Add certificate script if certificates are provided and not using file import
        if (ovpnConfig.Certificates && !ovpnConfig.OVPNFileContent) {
            // const certScript = GenerateOpenVPNCertificateScript(ovpnConfig);
            // vpnConfig = mergeConfigurations(vpnConfig, certScript);
        }

        const endpointAddress = ovpnConfig.Server.Address;
        
        // Use pre-assigned checkIP from map, or fallback to old behavior for backwards compatibility
        const checkIP = checkIPMap?.get(ovpnConfig.Name);

        const baseConfig = BaseVPNConfig(
            interfaceName,
            endpointAddress,
            ovpnConfig.Name,
            ovpnConfig.WanInterface,
            checkIP,
        );

        routerConfigs.push(mergeConfigurations(vpnConfig, baseConfig));
    });

    return mergeMultipleConfigs(...routerConfigs);
};