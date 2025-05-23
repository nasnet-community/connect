import { component$, $ } from "@builder.io/qwik";
import { useStepperContext } from "~/components/Core/Stepper/CStepper/hooks/useStepperContext";
import { TunnelContextId } from "../Tunnel";
import { HiLockClosedOutline, HiPlusCircleOutline, HiTrashOutline } from "@qwikest/icons/heroicons";
import type { GreTunnelConfig } from "../../../StarContext/LANType";
import { Card } from "~/components/Core/Card";
import { Button } from "~/components/Core/button";
import { Input } from "~/components/Core/Input";
import { ServerFormField, Select } from "~/components/Core/Form/ServerField";

export const GRETunnelStep = component$(() => {
  const stepper = useStepperContext(TunnelContextId);
  
  // Skip this step if a different protocol was selected
  if (stepper.data.selectedProtocol && stepper.data.selectedProtocol !== 'gre') {
    stepper.completeStep$();
    return null;
  }
  
  // Handler to add a new GRE tunnel
  const addTunnel$ = $(() => {
    const newTunnel: GreTunnelConfig = {
      type: 'gre',
      name: `gre-tunnel-${stepper.data.gre.length + 1}`,
      localAddress: "",
      remoteAddress: "",
    };
    
    stepper.data.gre.push(newTunnel);
  });
  
  // Handler to remove a tunnel
  const removeTunnel$ = $((index: number) => {
    stepper.data.gre.splice(index, 1);
  });
  
  // Handler to update a tunnel property
  const updateTunnelField$ = $((index: number, field: keyof GreTunnelConfig, value: any) => {
    if (index >= 0 && index < stepper.data.gre.length) {
      (stepper.data.gre[index] as any)[field] = value;
    }
  });
  
  // Validate all tunnels and update step completion status
  const validateTunnels$ = $(() => {
    let isValid = true;
    
    // If there are no tunnels, the step is still valid
    if (stepper.data.gre.length === 0) {
      stepper.completeStep$();
      return true;
    }
    
    // Check if all tunnels have required fields
    for (const tunnel of stepper.data.gre) {
      if (!tunnel.name || !tunnel.localAddress || !tunnel.remoteAddress) {
        isValid = false;
        break;
      }
    }
    
    if (isValid) {
      stepper.completeStep$();
    }
    
    return isValid;
  });
  
  // Validate tunnels whenever the component renders to update completion status
  validateTunnels$();

  return (
    <div class="space-y-6">
      <Card>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <HiLockClosedOutline class="h-6 w-6 text-primary-500 dark:text-primary-400" />
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {$localize`GRE Tunnels`}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {$localize`Configure Generic Routing Encapsulation tunnels for protocol-agnostic tunneling`}
              </p>
            </div>
          </div>
          
          <Button
            onClick$={addTunnel$}
            variant="outline"
            leftIcon
          >
            <HiPlusCircleOutline q:slot="leftIcon" class="h-5 w-5" />
            {$localize`Add Tunnel`}
          </Button>
        </div>
      </Card>
      
      {stepper.data.gre.length === 0 ? (
        <Card>
          <p class="text-center text-gray-500 dark:text-gray-400">
            {$localize`No GRE tunnels configured. Click "Add Tunnel" to create one.`}
          </p>
        </Card>
      ) : (
        <div class="space-y-4">
          {stepper.data.gre.map((tunnel, index) => (
            <Card key={index}>
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-md font-medium text-gray-900 dark:text-white">
                  {$localize`GRE Tunnel ${index + 1}`}
                </h4>
                <Button
                  onClick$={() => removeTunnel$(index)}
                  variant="ghost"
                  leftIcon
                  class="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  <HiTrashOutline q:slot="leftIcon" class="h-5 w-5" />
                  {$localize`Remove`}
                </Button>
              </div>
              
              <div class="grid gap-4 md:grid-cols-2">
                {/* Name */}
                <ServerFormField label={$localize`Name`} required>
                  <Input
                    type="text"
                    value={tunnel.name}
                    onChange$={(e, value) => updateTunnelField$(index, 'name', value)}
                    placeholder={$localize`Enter tunnel name`}
                  />
                </ServerFormField>

                {/* MTU */}
                <ServerFormField label={$localize`MTU`}>
                  <Input
                    type="number"
                    value={tunnel.mtu?.toString() || ""}
                    onChange$={(e, value) => {
                      updateTunnelField$(index, 'mtu', value ? parseInt(value) : undefined);
                    }}
                    placeholder={$localize`Enter MTU (optional)`}
                  />
                </ServerFormField>

                {/* Local Address */}
                <ServerFormField label={$localize`Local Address`} required>
                  <Input
                    type="text"
                    value={tunnel.localAddress}
                    onChange$={(e, value) => updateTunnelField$(index, 'localAddress', value)}
                    placeholder={$localize`Enter local address`}
                  />
                </ServerFormField>

                {/* Remote Address */}
                <ServerFormField label={$localize`Remote Address`} required>
                  <Input
                    type="text"
                    value={tunnel.remoteAddress}
                    onChange$={(e, value) => updateTunnelField$(index, 'remoteAddress', value)}
                    placeholder={$localize`Enter remote address`}
                  />
                </ServerFormField>

                {/* IPsec Secret */}
                <ServerFormField label={$localize`IPsec Secret`}>
                  <Input
                    type="text"
                    value={tunnel.ipsecSecret || ""}
                    onChange$={(e, value) => updateTunnelField$(index, 'ipsecSecret', value)}
                    placeholder={$localize`Enter IPsec secret (optional)`}
                  />
                </ServerFormField>

                {/* Keepalive */}
                <ServerFormField label={$localize`Keepalive`}>
                  <Input
                    type="text"
                    value={tunnel.keepalive || ""}
                    onChange$={(e, value) => updateTunnelField$(index, 'keepalive', value)}
                    placeholder={$localize`Enter keepalive (optional)`}
                  />
                </ServerFormField>
              </div>

              {/* DSCP and Clamp TCP MSS */}
              <div class="mt-4 grid gap-4 md:grid-cols-2">
                <ServerFormField label={$localize`DSCP`}>
                  <Select
                    value={typeof tunnel.dscp === 'number' ? tunnel.dscp.toString() : (tunnel.dscp || '')}
                    onChange$={(value) => {
                      updateTunnelField$(index, 'dscp', value === 'inherit' ? 'inherit' : (parseInt(value) || undefined));
                    }}
                    options={[
                      { value: "", label: $localize`Default` },
                      { value: "inherit", label: $localize`Inherit` }
                    ].concat(Array.from({ length: 64 }, (_, i) => ({ value: i.toString(), label: i.toString() })))}
                  />
                </ServerFormField>

                <div class="flex items-center mt-7">
                  <input
                    type="checkbox"
                    id={`clampTcpMss-${index}`}
                    checked={tunnel.clampTcpMss || false}
                    onChange$={(e) => updateTunnelField$(index, 'clampTcpMss', (e.target as HTMLInputElement).checked)}
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-500 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <label
                    for={`clampTcpMss-${index}`}
                    class="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {$localize`Clamp TCP MSS`}
                  </label>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      

    </div>
  );
}); 