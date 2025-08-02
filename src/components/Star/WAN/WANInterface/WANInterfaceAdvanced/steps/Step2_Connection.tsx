import { component$, $ } from "@builder.io/qwik";
import type { WANWizardState } from "../../../../StarContext/WANType";
import { LinkBox } from "../components/LinkBox/LinkBox";
import { LinkBoxContent } from "../components/LinkBox/LinkBoxContent";
import { ConnectionTypeSelector } from "../components/fields/ConnectionTypeSelector";
import { PPPoEFields } from "../components/fields/PPPoEFields";
import { StaticIPFields } from "../components/fields/StaticIPFields";
import type { UseWANAdvancedReturn } from "../hooks/useWANAdvanced";

export interface Step2Props {
  wizardState: WANWizardState;
  wizardActions: UseWANAdvancedReturn;
}

export const Step2_Connection = component$<Step2Props>(
  ({ wizardState, wizardActions }) => {
    const getLinkErrors = (linkId: string) => {
      return Object.entries(wizardState.validationErrors)
        .filter(([key]) => key.startsWith(`link-${linkId}`))
        .map(([, errors]) => errors)
        .flat();
    };

    const getFieldErrors = (linkId: string, field: string) => {
      return wizardState.validationErrors[`link-${linkId}-${field}`] || [];
    };

    return (
      <div class="space-y-6">
        {/* Header */}
        <div>
          <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
            {$localize`Connection Configuration`}
          </h2>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {$localize`Configure how each WAN link connects to the internet`}
          </p>
        </div>

        {/* Link Boxes */}
        <div class="space-y-4">
          {wizardState.links.map((link) => (
            <LinkBox
              key={link.id}
              link={link}
              canRemove={false}
              errors={getLinkErrors(link.id)}
            >
              <LinkBoxContent>
                {/* Connection Type Selection */}
                <ConnectionTypeSelector
                  connectionType={link.connectionType}
                  interfaceType={link.interfaceType}
                  onUpdate$={$((type) =>
                    wizardActions.updateLink$(link.id, {
                      connectionType: type,
                    }),
                  )}
                  mode={wizardState.mode}
                />

                {/* PPPoE Configuration */}
                {link.connectionType === "PPPoE" && (
                  <PPPoEFields
                    config={link.connectionConfig?.pppoe}
                    onUpdate$={$((config) =>
                      wizardActions.updateLink$(link.id, {
                        connectionConfig: {
                          ...link.connectionConfig,
                          pppoe: config,
                        },
                      }),
                    )}
                    errors={{
                      username: getFieldErrors(link.id, "pppoe-username"),
                      password: getFieldErrors(link.id, "pppoe-password"),
                    }}
                  />
                )}

                {/* Static IP Configuration */}
                {link.connectionType === "Static" && (
                  <StaticIPFields
                    config={link.connectionConfig?.static}
                    onUpdate$={$((config) =>
                      wizardActions.updateLink$(link.id, {
                        connectionConfig: {
                          ...link.connectionConfig,
                          static: config,
                        },
                      }),
                    )}
                    errors={{
                      ipAddress: getFieldErrors(link.id, "static-ip"),
                      subnet: getFieldErrors(link.id, "static-subnet"),
                      gateway: getFieldErrors(link.id, "static-gateway"),
                      primaryDns: getFieldErrors(link.id, "static-dns1"),
                      secondaryDns: getFieldErrors(link.id, "static-dns2"),
                    }}
                  />
                )}

                {/* DHCP Info */}
                {link.connectionType === "DHCP" && (
                  <div class="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <svg
                          class="h-5 w-5 text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div class="ml-3">
                        <p class="text-sm text-green-700 dark:text-green-300">
                          {$localize`DHCP will automatically configure IP settings from your ISP`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* LTE Info */}
                {link.connectionType === "LTE" && (
                  <div class="rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <svg
                          class="h-5 w-5 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div class="ml-3">
                        <p class="text-sm text-blue-700 dark:text-blue-300">
                          {$localize`LTE connection uses the APN settings configured in Step 1`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </LinkBoxContent>
            </LinkBox>
          ))}
        </div>
      </div>
    );
  },
);
