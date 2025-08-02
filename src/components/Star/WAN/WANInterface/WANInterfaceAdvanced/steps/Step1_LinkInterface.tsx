import { component$, $ } from "@builder.io/qwik";
import type { WANWizardState } from "../../../../StarContext/WANType";
import { LinkBox } from "../components/LinkBox/LinkBox";
import { LinkBoxContent } from "../components/LinkBox/LinkBoxContent";
import { InterfaceSelector } from "../components/fields/InterfaceSelector";
import { WirelessFields } from "../components/fields/WirelessFields";
import { LTEFields } from "../components/fields/LTEFields";
import { VLANMACFields } from "../components/fields/VLANMACFields";
import type { UseWANAdvancedReturn } from "../hooks/useWANAdvanced";

export interface Step1Props {
  wizardState: WANWizardState;
  wizardActions: UseWANAdvancedReturn;
}

export const Step1_LinkInterface = component$<Step1Props>(
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

    const usedInterfaces = wizardState.links
      .map((l) => l.interfaceName)
      .filter(Boolean);

    return (
      <div class="space-y-6">
        {/* Header with Add Link button */}
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
              {$localize`WAN Link Configuration`}
            </h2>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {$localize`Configure your WAN interfaces and their settings`}
            </p>
          </div>

          <button
            onClick$={wizardActions.addLink$}
            class="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 
                 py-2 text-sm font-medium text-white shadow-sm 
                 hover:bg-primary-700 focus:outline-none focus:ring-2 
                 focus:ring-primary-500 focus:ring-offset-2"
          >
            <svg
              class="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            {$localize`Add WAN Link`}
          </button>
        </div>

        {/* Link Boxes */}
        <div class="space-y-4">
          {wizardState.links.map((link) => (
            <LinkBox
              key={link.id}
              link={link}
              onRemove$={$(() => wizardActions.removeLink$(link.id))}
              canRemove={wizardState.links.length > 1}
              errors={getLinkErrors(link.id)}
            >
              <LinkBoxContent>
                {/* Interface Selection */}
                <InterfaceSelector
                  link={link}
                  onUpdate$={$((updates) =>
                    wizardActions.updateLink$(link.id, updates),
                  )}
                  usedInterfaces={usedInterfaces}
                  mode={wizardState.mode}
                />

                {/* Wireless Settings */}
                {link.interfaceType === "Wireless" && (
                  <WirelessFields
                    credentials={link.wirelessCredentials}
                    onUpdate$={$((creds) =>
                      wizardActions.updateLink$(link.id, {
                        wirelessCredentials: creds,
                      }),
                    )}
                    errors={{
                      ssid: getFieldErrors(link.id, "ssid"),
                      password: getFieldErrors(link.id, "password"),
                    }}
                  />
                )}

                {/* LTE Settings */}
                {link.interfaceType === "LTE" && (
                  <LTEFields
                    settings={link.lteSettings}
                    onUpdate$={$((settings) =>
                      wizardActions.updateLink$(link.id, {
                        lteSettings: settings,
                      }),
                    )}
                    errors={{
                      apn: getFieldErrors(link.id, "apn"),
                    }}
                  />
                )}

                {/* Advanced Settings (VLAN/MAC) */}
                {wizardState.mode === "advanced" && (
                  <VLANMACFields
                    vlanConfig={link.vlanConfig}
                    macAddress={link.macAddress}
                    onUpdateVLAN$={$((config) =>
                      wizardActions.updateLink$(link.id, {
                        vlanConfig: config,
                      }),
                    )}
                    onUpdateMAC$={$((config) =>
                      wizardActions.updateLink$(link.id, {
                        macAddress: config,
                      }),
                    )}
                    errors={{
                      vlan: getFieldErrors(link.id, "vlan"),
                      mac: getFieldErrors(link.id, "mac"),
                    }}
                  />
                )}
              </LinkBoxContent>
            </LinkBox>
          ))}
        </div>

        {/* Info message for easy mode */}
        {wizardState.mode === "easy" && (
          <div class="mt-4 rounded-lg bg-info-50 p-4 dark:bg-info-900/20">
            <p class="text-sm text-info-700 dark:text-info-300">
              {$localize`In Easy Mode, DHCP connection type will be used by default. Switch to Advanced Mode for more options.`}
            </p>
          </div>
        )}
      </div>
    );
  },
);
