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
import { Button } from "~/components/Core/button";
import { Input } from "~/components/Core/Input";
import { Field } from "~/components/Core/Form/Field";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export const EOIPTunnelStep = component$(() => {
  const locale = useMessageLocale();
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
      NetworkType: "VPN",
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
      if (!tunnel.name || !tunnel.remoteAddress || !tunnel.tunnelId) {
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
                {semanticMessages.tunnel_step_eoip({}, { locale })}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {semanticMessages.tunnel_step_eoip_description(
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

      {stepper.data.eoip.length === 0 ? (
        <Card>
          <p class="text-center text-gray-500 dark:text-gray-400">
            {semanticMessages.tunnel_no_eoip_configured({}, { locale })}
          </p>
        </Card>
      ) : (
        <div class="space-y-4">
          {stepper.data.eoip.map((tunnel, index) => (
            <Card key={index}>
              <div class="mb-4 flex items-center justify-between">
                <h4 class="text-md font-medium text-gray-900 dark:text-white">
                  {semanticMessages.tunnel_eoip_item_title(
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
                <Field
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
                </Field>

                {/* Tunnel ID */}
                <Field
                  label={semanticMessages.tunnel_field_tunnel_id(
                    {},
                    { locale },
                  )}
                  required
                >
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
                    placeholder={semanticMessages.tunnel_field_tunnel_id_placeholder(
                      {},
                      { locale },
                    )}
                  />
                </Field>

                {/* Remote Address */}
                <Field
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
                </Field>

                {/* IPsec Secret */}
                <Field
                  label={semanticMessages.tunnel_field_ipsec_secret(
                    {},
                    { locale },
                  )}
                >
                  <Input
                    type="text"
                    value={tunnel.ipsecSecret || ""}
                    onChange$={(e, value) =>
                      updateTunnelField$(index, "ipsecSecret", value)
                    }
                    placeholder={semanticMessages.tunnel_field_ipsec_secret_placeholder(
                      {},
                      { locale },
                    )}
                  />
                </Field>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
});
