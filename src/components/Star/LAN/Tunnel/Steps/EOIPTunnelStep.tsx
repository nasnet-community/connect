import { component$, $, useTask$ } from "@builder.io/qwik";
import { useStepperContext } from "~/components/Core/Stepper/CStepper/hooks/useStepperContext";
import { TunnelContextId } from "../Tunnel";
import {
  HiLockClosedOutline,
  HiPlusCircleOutline,
  HiTrashOutline,
} from "@qwikest/icons/heroicons";
import type { EoipTunnelConfig } from "../../../StarContext/Utils/TunnelType";
import { Card } from "~/components/Core/Card";
import { Select } from "~/components/Core/Select";
import { Button } from "~/components/Core/button";
import { Input } from "~/components/Core/Input";
import { Field } from "~/components/Core/Form/Field";

export const EOIPTunnelStep = component$(() => {
  const stepper = useStepperContext(TunnelContextId);

  // Skip this step if a different protocol was selected - moved to useTask$

  // Handler to add a new EOIP tunnel
  const addTunnel$ = $(() => {
    const newTunnel: EoipTunnelConfig = {
      type: "eoip",
      name: `eoip-tunnel-${stepper.data.eoip.length + 1}`,
      localAddress: "",
      remoteAddress: "",
      tunnelId: stepper.data.eoip.length + 1,
    };

    stepper.data.eoip.push(newTunnel);
  });

  // Handler to remove a tunnel
  const removeTunnel$ = $((index: number) => {
    stepper.data.eoip.splice(index, 1);
  });

  // Handler to update a tunnel property
  const updateTunnelField$ = $(
    (index: number, field: keyof EoipTunnelConfig, value: any) => {
      if (index >= 0 && index < stepper.data.eoip.length) {
        (stepper.data.eoip[index] as any)[field] = value;
      }
    },
  );

  // Validate all tunnels and update step completion status
  const validateTunnels$ = $(() => {
    let isValid = true;

    // If there are no tunnels, the step is still valid
    if (stepper.data.eoip.length === 0) {
      return true;
    }

    // Check if all tunnels have required fields
    for (const tunnel of stepper.data.eoip) {
      if (
        !tunnel.name ||
        !tunnel.localAddress ||
        !tunnel.remoteAddress ||
        !tunnel.tunnelId
      ) {
        isValid = false;
        break;
      }
    }

    return isValid;
  });

  // Use useTask$ to handle step completion based on protocol selection
  useTask$(({ track }) => {
    // Skip this step if a different protocol was selected
    if (
      stepper.data.selectedProtocol &&
      stepper.data.selectedProtocol !== "eoip"
    ) {
      stepper.completeStep$();
      return;
    }

    // Track tunnels to revalidate when they change
    track(() => stepper.data.eoip.length);
    for (let i = 0; i < stepper.data.eoip.length; i++) {
      const tunnel = stepper.data.eoip[i];
      track(() => tunnel.name);
      track(() => tunnel.localAddress);
      track(() => tunnel.remoteAddress);
      track(() => tunnel.tunnelId);
    }

    // Validate and update step completion
    validateTunnels$().then((isValid) => {
      if (isValid) {
        stepper.completeStep$();
      }
    });
  });

  // Skip rendering if a different protocol was selected
  if (
    stepper.data.selectedProtocol &&
    stepper.data.selectedProtocol !== "eoip"
  ) {
    return null;
  }

  return (
    <div class="space-y-6">
      <Card>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <HiLockClosedOutline class="h-6 w-6 text-primary-500 dark:text-primary-400" />
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {$localize`EOIP Tunnels`}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {$localize`Configure Ethernet over IP tunnels for bridging remote Ethernet segments`}
              </p>
            </div>
          </div>

          <Button onClick$={addTunnel$} variant="outline" leftIcon>
            <HiPlusCircleOutline q:slot="leftIcon" class="h-5 w-5" />
            {$localize`Add Tunnel`}
          </Button>
        </div>
      </Card>

      {stepper.data.eoip.length === 0 ? (
        <Card>
          <p class="text-center text-gray-500 dark:text-gray-400">
            {$localize`No EOIP tunnels configured. Click "Add Tunnel" to create one.`}
          </p>
        </Card>
      ) : (
        <div class="space-y-4">
          {stepper.data.eoip.map((tunnel, index) => (
            <Card key={index}>
              <div class="mb-4 flex items-center justify-between">
                <h4 class="text-md font-medium text-gray-900 dark:text-white">
                  {$localize`EOIP Tunnel ${index + 1}`}
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
                <Field label={$localize`Name`} required>
                  <Input
                    type="text"
                    value={tunnel.name}
                    onChange$={(e, value) =>
                      updateTunnelField$(index, "name", value)
                    }
                    placeholder={$localize`Enter tunnel name`}
                  />
                </Field>

                {/* Tunnel ID */}
                <Field label={$localize`Tunnel ID`} required>
                  <Input
                    type="number"
                    value={tunnel.tunnelId.toString() || "1"}
                    onChange$={(e, value) =>
                      updateTunnelField$(
                        index,
                        "tunnelId",
                        parseInt(value) || 1,
                      )
                    }
                    placeholder={$localize`Enter tunnel ID`}
                  />
                </Field>

                {/* MTU */}
                <Field label={$localize`MTU`}>
                  <Input
                    type="number"
                    value={tunnel.mtu?.toString() || ""}
                    onChange$={(e, value) => {
                      updateTunnelField$(
                        index,
                        "mtu",
                        value ? parseInt(value) : undefined,
                      );
                    }}
                    placeholder={$localize`Enter MTU (optional)`}
                  />
                </Field>

                {/* Local Address */}
                <Field label={$localize`Local Address`} required>
                  <Input
                    type="text"
                    value={tunnel.localAddress}
                    onChange$={(e, value) =>
                      updateTunnelField$(index, "localAddress", value)
                    }
                    placeholder={$localize`Enter local address`}
                  />
                </Field>

                {/* Remote Address */}
                <Field label={$localize`Remote Address`} required>
                  <Input
                    type="text"
                    value={tunnel.remoteAddress}
                    onChange$={(e, value) =>
                      updateTunnelField$(index, "remoteAddress", value)
                    }
                    placeholder={$localize`Enter remote address`}
                  />
                </Field>

                {/* MAC Address */}
                <Field label={$localize`MAC Address`}>
                  <Input
                    type="text"
                    value={tunnel.macAddress || ""}
                    onChange$={(e, value) =>
                      updateTunnelField$(index, "macAddress", value)
                    }
                    placeholder={$localize`Enter MAC address (optional)`}
                  />
                </Field>

                {/* IPsec Secret */}
                <Field label={$localize`IPsec Secret`}>
                  <Input
                    type="text"
                    value={tunnel.ipsecSecret || ""}
                    onChange$={(e, value) =>
                      updateTunnelField$(index, "ipsecSecret", value)
                    }
                    placeholder={$localize`Enter IPsec secret (optional)`}
                  />
                </Field>

                {/* Keepalive */}
                <Field label={$localize`Keepalive`}>
                  <Input
                    type="text"
                    value={tunnel.keepalive || ""}
                    onChange$={(e, value) =>
                      updateTunnelField$(index, "keepalive", value)
                    }
                    placeholder={$localize`Enter keepalive (optional)`}
                  />
                </Field>
              </div>

              {/* ARP and Clamp TCP MSS */}
              <div class="mt-4 grid gap-4 md:grid-cols-2">
                <Field label={$localize`ARP`}>
                  <Select
                    value={tunnel.arp || ""}
                    onChange$={(value) => {
                      updateTunnelField$(index, "arp", value || undefined);
                    }}
                    options={[
                      { value: "", label: $localize`Default` },
                      { value: "enabled", label: $localize`Enabled` },
                      { value: "disabled", label: $localize`Disabled` },
                      { value: "proxy-arp", label: $localize`Proxy ARP` },
                      { value: "reply-only", label: $localize`Reply Only` },
                    ]}
                  />
                </Field>

                <div class="mt-7 flex items-center">
                  <input
                    type="checkbox"
                    id={`clampTcpMss-${index}`}
                    checked={tunnel.clampTcpMss || false}
                    onChange$={(e) =>
                      updateTunnelField$(
                        index,
                        "clampTcpMss",
                        (e.target as HTMLInputElement).checked,
                      )
                    }
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
