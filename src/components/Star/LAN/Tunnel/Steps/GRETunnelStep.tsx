import { component$, $, useTask$ } from "@builder.io/qwik";
import { useStepperContext } from "~/components/Core/Stepper/CStepper/hooks/useStepperContext";
import { TunnelContextId } from "../Tunnel";
import {
  HiLockClosedOutline,
  HiPlusCircleOutline,
  HiTrashOutline,
} from "@qwikest/icons/heroicons";
import type { GreTunnelConfig } from "../../../StarContext/Utils/TunnelType";
import { Card } from "~/components/Core/Card";
import { Button } from "~/components/Core/button";
import { Input } from "~/components/Core/Input";
import { Field } from "~/components/Core/Form/Field";

export const GRETunnelStep = component$(() => {
  const stepper = useStepperContext(TunnelContextId);

  // Skip this step if a different protocol was selected - moved to useTask$

  // Handler to add a new GRE tunnel
  const addTunnel$ = $(() => {
    const newTunnel: GreTunnelConfig = {
      type: "gre",
      name: `gre-tunnel-${stepper.data.gre.length + 1}`,
      localAddress: "",
      remoteAddress: "",
      NetworkType: "VPN",
    };

    stepper.data.gre.push(newTunnel);
  });

  // Handler to remove a tunnel
  const removeTunnel$ = $((index: number) => {
    stepper.data.gre.splice(index, 1);
  });

  // Handler to update a tunnel property
  const updateTunnelField$ = $(
    (index: number, field: keyof GreTunnelConfig, value: any) => {
      if (index >= 0 && index < stepper.data.gre.length) {
        (stepper.data.gre[index] as any)[field] = value;
      }
    },
  );

  // Validate all tunnels and update step completion status
  const validateTunnels$ = $(() => {
    let isValid = true;

    // If there are no tunnels, the step is still valid
    if (stepper.data.gre.length === 0) {
      return true;
    }

    // Check if all tunnels have required fields
    for (const tunnel of stepper.data.gre) {
      if (!tunnel.name || !tunnel.remoteAddress) {
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
      stepper.data.selectedProtocol !== "gre"
    ) {
      stepper.completeStep$();
      return;
    }

    // Track tunnels to revalidate when they change
    track(() => stepper.data.gre.length);
    for (let i = 0; i < stepper.data.gre.length; i++) {
      const tunnel = stepper.data.gre[i];
      track(() => tunnel.name);
      track(() => tunnel.remoteAddress);
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
    stepper.data.selectedProtocol !== "gre"
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
                {$localize`GRE Tunnels`}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {$localize`Configure Generic Routing Encapsulation tunnels for protocol-agnostic tunneling`}
              </p>
            </div>
          </div>

          <Button onClick$={addTunnel$} variant="outline" leftIcon>
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
              <div class="mb-4 flex items-center justify-between">
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
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
});
