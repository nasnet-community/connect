import {
  component$,
  useContext,
  useSignal,
  $,
  useComputed$,
  useStore,
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
  Alert,
  Checkbox,
} from "~/components/Core";
import type { StepProps } from "~/types/step";
import { LuNetwork, LuInfo, LuSettings2, LuShield } from "@qwikest/icons/lucide";

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

export const Subnets = component$<StepProps>(({ onComplete$ }) => {
  const starContext = useContext(StarContext);
  const isDomesticLink = starContext.state.Choose.DomesticLink;
  const tempSubnets = useSignal<Record<string, string>>({});
  const validationErrors = useSignal<Record<string, string>>({});
  
  // Advanced mode settings
  const advancedSettings = useStore({
    enableOverlapCheck: true,
    customPrefixSize: false,
    autoSuggest: true,
    showAdvancedOptions: false,
  });

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

  // Check if two subnets overlap
  const checkOverlap = $((subnet1: string, subnet2: string): boolean => {
    if (!subnet1 || !subnet2) return false;
    
    const [ip1, prefix1Str] = subnet1.split("/");
    const [ip2, prefix2Str] = subnet2.split("/");
    const prefix1 = parseInt(prefix1Str);
    const prefix2 = parseInt(prefix2Str);
    
    const parts1 = ip1.split(".").map(Number);
    const parts2 = ip2.split(".").map(Number);
    
    const ip1Int = (parts1[0] << 24) | (parts1[1] << 16) | (parts1[2] << 8) | parts1[3];
    const ip2Int = (parts2[0] << 24) | (parts2[1] << 16) | (parts2[2] << 8) | parts2[3];
    
    const mask1 = (0xffffffff << (32 - prefix1)) >>> 0;
    const mask2 = (0xffffffff << (32 - prefix2)) >>> 0;
    
    const network1 = (ip1Int & mask1) >>> 0;
    const network2 = (ip2Int & mask2) >>> 0;
    
    const commonMask = Math.min(prefix1, prefix2);
    const checkMask = (0xffffffff << (32 - commonMask)) >>> 0;
    
    return (network1 & checkMask) === (network2 & checkMask);
  });

  // Validate CIDR format with advanced checks
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

    // Advanced checks for prefix size
    if (advancedSettings.customPrefixSize) {
      if (maskNum < 16) {
        return $localize`Subnet mask too large (minimum /16)`;
      }
      if (maskNum > 30) {
        return $localize`Subnet mask too small (maximum /30)`;
      }
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

    // Auto-suggest network address if enabled
    if (advancedSettings.autoSuggest && value && value.includes("/")) {
      const [ip, prefix] = value.split("/");
      if (ip && prefix) {
        const prefixNum = parseInt(prefix);
        if (!isNaN(prefixNum) && prefixNum >= 8 && prefixNum <= 32) {
          const networkAddr = await getNetworkAddress(ip, prefixNum);
          if (networkAddr !== ip) {
            tempSubnets.value = {
              ...tempSubnets.value,
              [key]: `${networkAddr}/${prefix}`,
            };
          }
        }
      }
    }
  });

  // Validate all inputs
  const validateAll$ = $(async (): Promise<boolean> => {
    const errors: Record<string, string> = {};
    let isValid = true;
    const allSubnets: { key: string; value: string }[] = [];

    // First pass: validate format
    for (const input of subnetInputs.value) {
      const value = tempSubnets.value[input.key] || (input.isRequired ? input.placeholder : "");
      if (value) {
        const error = await validateCIDR(value, input.isRequired);
        if (error) {
          errors[input.key] = error;
          isValid = false;
        } else {
          allSubnets.push({ key: input.key, value });
        }
      } else if (input.isRequired) {
        errors[input.key] = $localize`This subnet is required`;
        isValid = false;
      }
    }

    // Second pass: check for overlaps if enabled
    if (advancedSettings.enableOverlapCheck && isValid) {
      for (let i = 0; i < allSubnets.length; i++) {
        for (let j = i + 1; j < allSubnets.length; j++) {
          if (await checkOverlap(allSubnets[i].value, allSubnets[j].value)) {
            errors[allSubnets[j].key] = $localize`Overlaps with ${allSubnets[i].key} network`;
            isValid = false;
          }
        }
      }
    }

    validationErrors.value = errors;
    return isValid;
  });

  // Handle save
  const handleSave$ = $(async () => {
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
        {/* Header Card */}
        <Card>
          <CardHeader>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <LuNetwork class="h-6 w-6 text-primary-500" />
                <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">
                  {$localize`Advanced Network Subnets Configuration`}
                </h2>
              </div>
              <div class="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick$={() => {
                    advancedSettings.showAdvancedOptions = !advancedSettings.showAdvancedOptions;
                  }}
                >
                  <LuSettings2 class="h-4 w-4 mr-2" />
                  {$localize`Advanced Options`}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <Alert
              status="info"
              size="sm"
              icon={<LuInfo class="h-4 w-4" />}
            >
              <p class="text-sm">
                {$localize`Configure subnet addresses for each network segment. Subnets are automatically validated for proper CIDR notation and checked for overlaps.`}
              </p>
            </Alert>

            {/* Advanced Options */}
            {advancedSettings.showAdvancedOptions && (
              <div class="mt-4 space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {$localize`Advanced Settings`}
                </h3>
                <div class="space-y-3">
                  <Checkbox
                    checked={advancedSettings.enableOverlapCheck}
                    onChange$={(checked: boolean) => {
                      advancedSettings.enableOverlapCheck = checked;
                    }}
                    label={$localize`Enable subnet overlap detection`}
                  />
                  <Checkbox
                    checked={advancedSettings.customPrefixSize}
                    onChange$={(checked: boolean) => {
                      advancedSettings.customPrefixSize = checked;
                    }}
                    label={$localize`Enforce prefix size limits (/16 to /30)`}
                  />
                  <Checkbox
                    checked={advancedSettings.autoSuggest}
                    onChange$={(checked: boolean) => {
                      advancedSettings.autoSuggest = checked;
                    }}
                    label={$localize`Auto-correct to network address`}
                  />
                </div>
              </div>
            )}
          </CardBody>
        </Card>

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
      </div>
    </div>
  );
});
