import { component$, $, useTask$ } from "@builder.io/qwik";
import { useStepperContext } from "~/components/Core/Stepper/CStepper/hooks/useStepperContext";
import { TunnelContextId } from "../Tunnel";
import {
  HiLockClosedOutline,
  HiPlusCircleOutline,
  HiTrashOutline,
} from "@qwikest/icons/heroicons";
import type { VxlanInterfaceConfig } from "../../../StarContext/Utils/TunnelType";
import { Card } from "~/components/Core/Card";
import { Button } from "~/components/Core/button";
import { Input } from "~/components/Core/Input";
import { ServerFormField } from "~/components/Core/Form/ServerField";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export const VXLANTunnelStep = component$(() => {
  const locale = useMessageLocale();
  const stepper = useStepperContext(TunnelContextId);

  // Skip this step if a different protocol was selected
  if (
    stepper.data.selectedProtocol &&
    stepper.data.selectedProtocol !== "vxlan"
  ) {
    // Don't directly call completeStep$ here - move to useTask$
    return null;
  }

  // Handler to add a new VXLAN tunnel
  const addTunnel$ = $(() => {
    const newTunnel: VxlanInterfaceConfig = {
      type: "vxlan",
      name: `vxlan-tunnel-${stepper.data.vxlan.length + 1}`,
      localAddress: "",
      remoteAddress: "",
      vni: stepper.data.vxlan.length + 1,
      bumMode: "unicast",
      NetworkType: "VPN",
    };

    stepper.data.vxlan.push(newTunnel);
  });

  // Handler to remove a tunnel
  const removeTunnel$ = $((index: number) => {
    stepper.data.vxlan.splice(index, 1);
  });

  // Handler to update a tunnel property
  const updateTunnelField$ = $(
    (index: number, field: keyof VxlanInterfaceConfig, value: any) => {
      if (index >= 0 && index < stepper.data.vxlan.length) {
        (stepper.data.vxlan[index] as any)[field] = value;
      }
    },
  );

  // Validate all tunnels and update step completion status
  const validateTunnels$ = $(() => {
    let isValid = true;

    // If there are no tunnels, the step is still valid
    if (stepper.data.vxlan.length === 0) {
      return true;
    }

    // Check if all tunnels have required fields
    for (const tunnel of stepper.data.vxlan) {
      if (!tunnel.name || !tunnel.remoteAddress || !tunnel.vni) {
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
      stepper.data.selectedProtocol !== "vxlan"
    ) {
      stepper.completeStep$();
      return;
    }

    // Track tunnels to revalidate when they change
    track(() => stepper.data.vxlan.length);
    for (let i = 0; i < stepper.data.vxlan.length; i++) {
      const tunnel = stepper.data.vxlan[i];
      track(() => tunnel.name);
      track(() => tunnel.remoteAddress);
      track(() => tunnel.vni);
    }

    // Validate and update step completion
    validateTunnels$().then((isValid) => {
      if (isValid) {
        stepper.completeStep$();
      }
    });
  });

  return (
    <div class="space-y-6">
      <Card>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <HiLockClosedOutline class="h-6 w-6 text-primary-500 dark:text-primary-400" />
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {semanticMessages.tunnel_step_vxlan({}, { locale })}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {semanticMessages.tunnel_vxlan_detail_description(
                  {},
                  {
                    locale,
                  },
                )}
              </p>
            </div>
          </div>

          <Button onClick$={addTunnel$} variant="outline" leftIcon>
            <HiPlusCircleOutline q:slot="leftIcon" class="h-5 w-5" />
            {semanticMessages.tunnel_add({}, { locale })}
          </Button>
        </div>
      </Card>

      {stepper.data.vxlan.length === 0 ? (
        <Card>
          <p class="text-center text-gray-500 dark:text-gray-400">
            {semanticMessages.tunnel_no_vxlan_configured({}, { locale })}
          </p>
        </Card>
      ) : (
        <div class="space-y-4">
          {stepper.data.vxlan.map((tunnel, index) => (
            <Card key={index}>
              <div class="mb-4 flex items-center justify-between">
                <h4 class="text-md font-medium text-gray-900 dark:text-white">
                  {semanticMessages.tunnel_vxlan_item_title(
                    { index: String(index + 1) },
                    { locale },
                  )}
                </h4>
                <Button
                  onClick$={() => removeTunnel$(index)}
                  variant="ghost"
                  leftIcon
                  class="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  <HiTrashOutline q:slot="leftIcon" class="h-5 w-5" />
                  {semanticMessages.shared_remove({}, { locale })}
                </Button>
              </div>

              <div class="grid gap-4 md:grid-cols-2">
                {/* Name */}
                <ServerFormField
                  label={semanticMessages.tunnel_field_name({}, { locale })}
                  required
                >
                  <Input
                    type="text"
                    value={tunnel.name}
                    onChange$={(e, value) =>
                      updateTunnelField$(index, "name", value)
                    }
                    placeholder={semanticMessages.tunnel_field_name_placeholder(
                      {},
                      { locale },
                    )}
                  />
                </ServerFormField>

                {/* VNI */}
                <ServerFormField
                  label={semanticMessages.tunnel_field_vni({}, { locale })}
                  required
                >
                  <Input
                    type="number"
                    value={tunnel.vni.toString() || ""}
                    onChange$={(e, value) =>
                      updateTunnelField$(index, "vni", parseInt(value) || 1)
                    }
                    placeholder={semanticMessages.tunnel_field_vni_placeholder(
                      {},
                      { locale },
                    )}
                  />
                </ServerFormField>

                {/* Port */}
                <ServerFormField
                  label={semanticMessages.shared_port({}, { locale })}
                >
                  <Input
                    type="number"
                    value={tunnel.port?.toString() || ""}
                    onChange$={(e, value) => {
                      updateTunnelField$(
                        index,
                        "port",
                        value ? parseInt(value) : undefined,
                      );
                    }}
                    placeholder={semanticMessages.tunnel_field_port_placeholder(
                      {},
                      { locale },
                    )}
                  />
                </ServerFormField>

                {/* Remote Address */}
                <ServerFormField
                  label={semanticMessages.tunnel_field_remote_address(
                    {},
                    { locale },
                  )}
                  required
                >
                  <Input
                    type="text"
                    value={tunnel.remoteAddress}
                    onChange$={(e, value) =>
                      updateTunnelField$(index, "remoteAddress", value)
                    }
                    placeholder={semanticMessages.tunnel_field_remote_address_placeholder(
                      {},
                      { locale },
                    )}
                  />
                </ServerFormField>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
});
