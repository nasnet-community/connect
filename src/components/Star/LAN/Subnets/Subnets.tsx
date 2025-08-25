import {
  component$,
  useContext,
  useSignal,
  $,
  useComputed$,
  useTask$,
  type QRL,
} from "@builder.io/qwik";
import { StarContext } from "~/components/Star/StarContext/StarContext";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormField,
  Input,
  Button,
} from "~/components/Core";
import type { StepProps } from "~/types/step";
import { LuShield } from "@qwikest/icons/lucide";
import { SubnetsHeader } from "./SubnetsHeader";

interface SubnetInput {
  key: string;
  label: string;
  placeholder: string;
  value: string;
  description?: string;
  category: "base" | "vpn" | "tunnel";
  isRequired?: boolean;
}

// Helper component to display subnet mask
const SubnetMaskDisplay = component$<{
  subnet: string;
  getSubnetMask: QRL<(prefix: number) => string>;
}>(({ subnet, getSubnetMask }) => {
  const maskText = useSignal("");
  
  useTask$(async ({ track }) => {
    track(() => subnet);
    if (subnet) {
      const [, prefix] = subnet.split("/");
      if (prefix) {
        maskText.value = await getSubnetMask(parseInt(prefix));
      }
    }
  });
  
  return (
    <div class="text-xs text-gray-500 dark:text-gray-400">
      {$localize`Subnet mask`}: {maskText.value}
    </div>
  );
});

export const Subnets = component$<StepProps>(({ onComplete$, onDisabled$ }) => {
  const starContext = useContext(StarContext);
  const isDomesticLink = starContext.state.Choose.DomesticLink;
  const tempSubnets = useSignal<Record<string, string>>({});
  const validationErrors = useSignal<Record<string, string>>({});
  
  // Check if subnets are already configured
  const hasSubnetsConfigured = !!(starContext.state.LAN.Subnets && Object.keys(starContext.state.LAN.Subnets).length > 0);
  
  // Enable/disable state - default true if subnets are configured, otherwise true (enabled by default)
  const subnetsEnabled = useSignal(hasSubnetsConfigured || true);

  // Initialize temp subnets from context
  useComputed$(() => {
    const existingSubnets = starContext.state.LAN.Subnets || {};
    tempSubnets.value = { ...existingSubnets };
  });

  // Compute required subnet inputs
  const subnetInputs = useComputed$<SubnetInput[]>(() => {
    const inputs: SubnetInput[] = [];

    // Base network subnets based on DomesticLink
    if (isDomesticLink) {
      inputs.push(
        {
          key: "Split",
          label: $localize`Split Network`,
          placeholder: "192.168.10.0/24",
          value: tempSubnets.value["Split"] || "",
          description: $localize`Network for mixed traffic (domestic and foreign)`,
          category: "base",
          isRequired: true,
        },
        {
          key: "Domestic",
          label: $localize`Domestic Network`,
          placeholder: "192.168.20.0/24",
          value: tempSubnets.value["Domestic"] || "",
          description: $localize`Network for domestic-only traffic`,
          category: "base",
          isRequired: true,
        },
      );
    } else {
      inputs.push(
        {
          key: "VPN",
          label: $localize`VPN Network`,
          placeholder: "192.168.10.0/24",
          value: tempSubnets.value["VPN"] || "",
          description: $localize`Primary network for VPN traffic`,
          category: "base",
          isRequired: true,
        },
        {
          key: "Foreign",
          label: $localize`Foreign Network`,
          placeholder: "192.168.30.0/24",
          value: tempSubnets.value["Foreign"] || "",
          description: $localize`Network for foreign/international traffic`,
          category: "base",
          isRequired: true,
        },
      );
    }

    // Add subnets for enabled VPN servers
    const vpnServers = starContext.state.LAN.VPNServer;
    if (
      vpnServers?.WireguardServers &&
      vpnServers.WireguardServers.length > 0
    ) {
      inputs.push({
        key: "Wireguard",
        label: $localize`WireGuard Network`,
        placeholder: "192.168.40.0/24",
        value: tempSubnets.value["Wireguard"] || "",
        description: $localize`Subnet for WireGuard VPN clients`,
        category: "vpn",
        isRequired: false,
      });
    }
    if (vpnServers?.OpenVpnServer && vpnServers.OpenVpnServer.length > 0) {
      inputs.push({
        key: "OpenVPN",
        label: $localize`OpenVPN Network`,
        placeholder: "192.168.41.0/24",
        value: tempSubnets.value["OpenVPN"] || "",
        description: $localize`Subnet for OpenVPN clients`,
        category: "vpn",
        isRequired: false,
      });
    }
    if (vpnServers?.L2tpServer?.enabled) {
      inputs.push({
        key: "L2TP",
        label: $localize`L2TP Network`,
        placeholder: "192.168.42.0/24",
        value: tempSubnets.value["L2TP"] || "",
        description: $localize`Subnet for L2TP/IPSec VPN clients`,
        category: "vpn",
        isRequired: false,
      });
    }
    if (vpnServers?.PptpServer?.enabled) {
      inputs.push({
        key: "PPTP",
        label: $localize`PPTP Network`,
        placeholder: "192.168.43.0/24",
        value: tempSubnets.value["PPTP"] || "",
        description: $localize`Subnet for PPTP VPN clients`,
        category: "vpn",
        isRequired: false,
      });
    }
    if (vpnServers?.SstpServer?.enabled) {
      inputs.push({
        key: "SSTP",
        label: $localize`SSTP Network`,
        placeholder: "192.168.44.0/24",
        value: tempSubnets.value["SSTP"] || "",
        description: $localize`Subnet for SSTP VPN clients`,
        category: "vpn",
        isRequired: false,
      });
    }
    if (vpnServers?.Ikev2Server) {
      inputs.push({
        key: "IKev2",
        label: $localize`IKEv2 Network`,
        placeholder: "192.168.45.0/24",
        value: tempSubnets.value["IKev2"] || "",
        description: $localize`Subnet for IKEv2 VPN clients`,
        category: "vpn",
        isRequired: false,
      });
    }

    // Add subnets for tunnels
    const tunnels = starContext.state.LAN.Tunnel;
    if (tunnels?.Eoip) {
      tunnels.Eoip.forEach((tunnel, index) => {
        inputs.push({
          key: tunnel.name || `Tunnel${index + 1}`,
          label: $localize`${tunnel.name || `Tunnel ${index + 1}`} Network`,
          placeholder: `192.168.${50 + index}.0/24`,
          value: tempSubnets.value[tunnel.name || `Tunnel${index + 1}`] || "",
          description: $localize`Subnet for EoIP tunnel: ${tunnel.name || `Tunnel ${index + 1}`}`,
          category: "tunnel",
          isRequired: false,
        });
      });
    }
    if (tunnels?.Gre) {
      tunnels.Gre.forEach((tunnel, index) => {
        inputs.push({
          key: tunnel.name || `GRE${index + 1}`,
          label: $localize`${tunnel.name || `GRE ${index + 1}`} Network`,
          placeholder: `192.168.${60 + index}.0/24`,
          value: tempSubnets.value[tunnel.name || `GRE${index + 1}`] || "",
          description: $localize`Subnet for GRE tunnel: ${tunnel.name || `GRE ${index + 1}`}`,
          category: "tunnel",
          isRequired: false,
        });
      });
    }

    return inputs;
  });

  // Get subnet mask from CIDR prefix
  const getSubnetMask = $((prefix: number): string => {
    const mask = (0xffffffff << (32 - prefix)) >>> 0;
    return [
      (mask >>> 24) & 0xff,
      (mask >>> 16) & 0xff,
      (mask >>> 8) & 0xff,
      mask & 0xff,
    ].join(".");
  });

  // Calculate network address from IP and prefix
  const getNetworkAddress = $((ip: string, prefix: number): string => {
    const parts = ip.split(".").map(Number);
    const mask = (0xffffffff << (32 - prefix)) >>> 0;
    const ipInt =
      (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
    const networkInt = (ipInt & mask) >>> 0;
    return [
      (networkInt >>> 24) & 0xff,
      (networkInt >>> 16) & 0xff,
      (networkInt >>> 8) & 0xff,
      networkInt & 0xff,
    ].join(".");
  });


  // Validate CIDR format
  const validateCIDR = $(async (value: string, isRequired: boolean = true): Promise<string | null> => {
    if (!value) {
      return isRequired ? $localize`Subnet is required` : null;
    }
    const cidrRegex = /^(\d{1,3}\.){3}\d{1,3}\/\d{1,2}$/;
    if (!cidrRegex.test(value)) {
      return $localize`Invalid CIDR format (e.g., 192.168.1.0/24)`;
    }

    // Validate IP parts
    const [ip, mask] = value.split("/");
    const parts = ip.split(".");
    for (const part of parts) {
      const num = parseInt(part);
      if (num < 0 || num > 255) {
        return $localize`Invalid IP address`;
      }
    }

    // Validate mask
    const maskNum = parseInt(mask);
    if (maskNum < 8 || maskNum > 32) {
      return $localize`Invalid subnet mask (8-32)`;
    }

    // Check if IP is the network address
    const networkAddr = await getNetworkAddress(ip, maskNum);
    if (networkAddr !== ip) {
      return $localize`Please use the network address: ${networkAddr}/${maskNum}`;
    }

    return null;
  });

  // Handle input change
  const handleInputChange$ = $(async (key: string, value: string) => {
    tempSubnets.value = {
      ...tempSubnets.value,
      [key]: value,
    };

    // Clear error when user types
    if (validationErrors.value[key]) {
      validationErrors.value = {
        ...validationErrors.value,
        [key]: "",
      };
    }
  });

  // Validate all inputs
  const validateAll$ = $(async (): Promise<boolean> => {
    const errors: Record<string, string> = {};
    let isValid = true;

    // Validate format for each input
    for (const input of subnetInputs.value) {
      const value = tempSubnets.value[input.key] || (input.isRequired ? input.placeholder : "");
      if (value) {
        const error = await validateCIDR(value, input.isRequired);
        if (error) {
          errors[input.key] = error;
          isValid = false;
        }
      } else if (input.isRequired) {
        errors[input.key] = $localize`This subnet is required`;
        isValid = false;
      }
    }

    validationErrors.value = errors;
    return isValid;
  });

  // Handle save
  const handleSave$ = $(async () => {
    if (!subnetsEnabled.value) {
      // Clear subnets when disabled
      await starContext.updateLAN$({ Subnets: {} });
      if (onComplete$) {
        onComplete$();
      }
      return;
    }

    const isValid = await validateAll$();
    if (!isValid) {
      return;
    }

    // Use placeholders for required empty values, skip optional empty values
    const finalSubnets: Record<string, string> = {};
    for (const input of subnetInputs.value) {
      const value = tempSubnets.value[input.key];
      if (value) {
        finalSubnets[input.key] = value;
      } else if (input.isRequired) {
        finalSubnets[input.key] = input.placeholder;
      }
    }

    // Update context
    await starContext.updateLAN$({ Subnets: finalSubnets });

    // Complete step
    if (onComplete$) {
      onComplete$();
    }
  });

  // Group subnets by category
  const groupedSubnets = useComputed$(() => {
    const groups = {
      base: [] as SubnetInput[],
      vpn: [] as SubnetInput[],
      tunnel: [] as SubnetInput[],
    };
    
    subnetInputs.value.forEach((input) => {
      groups[input.category].push(input);
    });
    
    return groups;
  });

  return (
    <div class="container mx-auto w-full max-w-6xl p-4">
      <div class="space-y-6">
        {/* Header with enable/disable toggle */}
        <SubnetsHeader
          subnetsEnabled={subnetsEnabled}
          onToggle$={$(async (enabled: boolean) => {
            if (!enabled && onDisabled$) {
              await onDisabled$();
            }
          })}
        />

        {/* Message when subnets are disabled */}
        {!subnetsEnabled.value ? (
          <div class="space-y-4">
            <div class="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center dark:border-gray-700 dark:bg-gray-800">
              <p class="text-gray-700 dark:text-gray-300">
                {$localize`Network subnets configuration is currently disabled. Enable it using the toggle above to configure subnet settings.`}
              </p>
            </div>
            <Card>
              <CardFooter>
                <div class="flex items-center justify-end w-full">
                  <Button
                    onClick$={handleSave$}
                    size="lg"
                  >
                    {$localize`Save & Continue`}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        ) : (

          <>
            {/* Base Networks */}
            {groupedSubnets.value.base.length > 0 && (
          <Card>
            <CardHeader>
              <div class="flex items-center gap-2">
                <LuShield class="h-5 w-5 text-primary-500" />
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                  {$localize`Base Networks`}
                </h3>
              </div>
            </CardHeader>
            <CardBody>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groupedSubnets.value.base.map((input) => (
                  <FormField
                    key={input.key}
                    label={input.label}
                    required={input.isRequired}
                    helperText={input.description}
                    error={validationErrors.value[input.key]}
                  >
                    <div class="space-y-2">
                      <Input
                        type="text"
                        value={tempSubnets.value[input.key] || ""}
                        placeholder={input.placeholder}
                        onInput$={(e) =>
                          handleInputChange$(
                            input.key,
                            (e.target as HTMLInputElement).value,
                          )
                        }
                        validation={
                          validationErrors.value[input.key] ? "invalid" : "default"
                        }
                      />
                      {tempSubnets.value[input.key] && !validationErrors.value[input.key] && (
                        <SubnetMaskDisplay
                          subnet={tempSubnets.value[input.key]}
                          getSubnetMask={getSubnetMask}
                        />
                      )}
                    </div>
                  </FormField>
                ))}
              </div>
            </CardBody>
          </Card>
        )}

            {/* VPN Networks */}
            {groupedSubnets.value.vpn.length > 0 && (
          <Card>
            <CardHeader>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                {$localize`VPN Server Networks`}
              </h3>
            </CardHeader>
            <CardBody>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groupedSubnets.value.vpn.map((input) => (
                  <FormField
                    key={input.key}
                    label={input.label}
                    required={input.isRequired}
                    helperText={input.description}
                    error={validationErrors.value[input.key]}
                  >
                    <Input
                      type="text"
                      value={tempSubnets.value[input.key] || ""}
                      placeholder={input.placeholder}
                      onInput$={(e) =>
                        handleInputChange$(
                          input.key,
                          (e.target as HTMLInputElement).value,
                        )
                      }
                      validation={
                        validationErrors.value[input.key] ? "invalid" : "default"
                      }
                    />
                  </FormField>
                ))}
              </div>
            </CardBody>
          </Card>
        )}

            {/* Tunnel Networks */}
            {groupedSubnets.value.tunnel.length > 0 && (
          <Card>
            <CardHeader>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                {$localize`Tunnel Networks`}
              </h3>
            </CardHeader>
            <CardBody>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groupedSubnets.value.tunnel.map((input) => (
                  <FormField
                    key={input.key}
                    label={input.label}
                    required={input.isRequired}
                    helperText={input.description}
                    error={validationErrors.value[input.key]}
                  >
                    <Input
                      type="text"
                      value={tempSubnets.value[input.key] || ""}
                      placeholder={input.placeholder}
                      onInput$={(e) =>
                        handleInputChange$(
                          input.key,
                          (e.target as HTMLInputElement).value,
                        )
                      }
                      validation={
                        validationErrors.value[input.key] ? "invalid" : "default"
                      }
                    />
                  </FormField>
                ))}
              </div>
            </CardBody>
          </Card>
        )}

            {/* Action Footer */}
            <Card>
              <CardFooter>
                <div class="flex items-center justify-between w-full">
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    {Object.keys(validationErrors.value).length > 0 && (
                      <span class="text-red-500">
                        {$localize`Please fix ${Object.keys(validationErrors.value).length} error(s) before continuing`}
                      </span>
                    )}
                  </div>
                  <Button
                    onClick$={handleSave$}
                    size="lg"
                    disabled={Object.keys(validationErrors.value).length > 0}
                  >
                    {$localize`Save & Continue`}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </>
        )}
      </div>
    </div>
  );
});
