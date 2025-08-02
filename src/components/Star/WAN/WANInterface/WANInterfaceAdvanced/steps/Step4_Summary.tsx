import { component$, type QRL, $ } from "@builder.io/qwik";
import type { WANWizardState } from "../../../../StarContext/WANType";
import { ValidationMessage } from "../components/common/ValidationMessage";

export interface Step4Props {
  wizardState: WANWizardState;
  onEdit$: QRL<(step: number) => void>;
  onValidate$: QRL<() => Promise<boolean>>;
  onApply$: QRL<() => Promise<void>>;
}

export const Step4_Summary = component$<Step4Props>(
  ({ wizardState, onEdit$, onValidate$, onApply$ }) => {
    const getConnectionTypeDisplay = (type: string) => {
      switch (type) {
        case "DHCP":
          return $localize`DHCP Client`;
        case "PPPoE":
          return $localize`PPPoE`;
        case "Static":
          return $localize`Static IP`;
        case "LTE":
          return $localize`LTE`;
        default:
          return type;
      }
    };

    const getStrategyDisplay = (strategy?: string) => {
      switch (strategy) {
        case "LoadBalance":
          return $localize`Load Balance`;
        case "Failover":
          return $localize`Failover`;
        case "Both":
          return $localize`Load Balance with Failover`;
        default:
          return "";
      }
    };

    const hasValidationErrors =
      Object.keys(wizardState.validationErrors).length > 0;
    const allErrors = Object.values(wizardState.validationErrors).flat();

    const handleValidateAndApply$ = $(async () => {
      const isValid = await onValidate$();
      if (isValid) {
        await onApply$();
      }
    });

    return (
      <div class="space-y-6">
        {/* Header */}
        <div>
          <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
            {$localize`Configuration Summary`}
          </h2>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {$localize`Review your configuration before applying`}
          </p>
        </div>

        {/* Validation Errors */}
        {hasValidationErrors && (
          <ValidationMessage errors={allErrors} type="error" />
        )}

        {/* Mode */}
        <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-base font-medium text-gray-900 dark:text-gray-100">
                {$localize`Configuration Mode`}
              </h3>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {wizardState.mode === "easy"
                  ? $localize`Easy Mode`
                  : $localize`Advanced Mode`}
              </p>
            </div>
          </div>
        </div>

        {/* WAN Links */}
        <div class="rounded-lg bg-white shadow dark:bg-gray-800">
          <div class="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
            <h3 class="text-base font-medium text-gray-900 dark:text-gray-100">
              {$localize`WAN Links`} ({wizardState.links.length})
            </h3>
            <button
              onClick$={() => onEdit$(0)}
              class="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              {$localize`Edit`}
            </button>
          </div>

          <div class="divide-y divide-gray-200 dark:divide-gray-700">
            {wizardState.links.map((link) => (
              <div key={link.id} class="px-6 py-4">
                <div class="flex items-start justify-between">
                  <div class="space-y-1">
                    <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {link.name}
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      {$localize`Interface:`} {link.interfaceType} (
                      {link.interfaceName || $localize`Not selected`})
                    </p>

                    {/* Wireless Info */}
                    {link.wirelessCredentials && (
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        {$localize`SSID:`} {link.wirelessCredentials.SSID}
                      </p>
                    )}

                    {/* LTE Info */}
                    {link.lteSettings && (
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        {$localize`APN:`} {link.lteSettings.apn}
                      </p>
                    )}

                    {/* VLAN Info */}
                    {link.vlanConfig?.enabled && (
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        {$localize`VLAN ID:`} {link.vlanConfig.id}
                      </p>
                    )}

                    {/* MAC Info */}
                    {link.macAddress?.enabled && (
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        {$localize`MAC:`} {link.macAddress.address}
                      </p>
                    )}
                  </div>

                  <button
                    onClick$={() => onEdit$(1)}
                    class="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
                  >
                    {$localize`Edit`}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Connection Configuration */}
        <div class="rounded-lg bg-white shadow dark:bg-gray-800">
          <div class="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
            <h3 class="text-base font-medium text-gray-900 dark:text-gray-100">
              {$localize`Connection Configuration`}
            </h3>
            <button
              onClick$={() => onEdit$(1)}
              class="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              {$localize`Edit`}
            </button>
          </div>

          <div class="divide-y divide-gray-200 dark:divide-gray-700">
            {wizardState.links.map((link) => (
              <div key={link.id} class="px-6 py-4">
                <p class="mb-1 text-sm font-medium text-gray-900 dark:text-gray-100">
                  {link.name}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {$localize`Type:`}{" "}
                  {getConnectionTypeDisplay(link.connectionType)}
                </p>

                {/* PPPoE Details */}
                {link.connectionType === "PPPoE" &&
                  link.connectionConfig?.pppoe && (
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      {$localize`Username:`}{" "}
                      {link.connectionConfig.pppoe.username}
                    </p>
                  )}

                {/* Static IP Details */}
                {link.connectionType === "Static" &&
                  link.connectionConfig?.static && (
                    <div class="mt-1 space-y-1">
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        {$localize`IP:`}{" "}
                        {link.connectionConfig.static.ipAddress}/
                        {link.connectionConfig.static.subnet}
                      </p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        {$localize`Gateway:`}{" "}
                        {link.connectionConfig.static.gateway}
                      </p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        {$localize`DNS:`}{" "}
                        {link.connectionConfig.static.primaryDns}
                        {link.connectionConfig.static.secondaryDns &&
                          `, ${link.connectionConfig.static.secondaryDns}`}
                      </p>
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>

        {/* Multi-Link Configuration */}
        {wizardState.links.length > 1 && wizardState.multiLinkStrategy && (
          <div class="rounded-lg bg-white shadow dark:bg-gray-800">
            <div class="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
              <h3 class="text-base font-medium text-gray-900 dark:text-gray-100">
                {$localize`Multi-WAN Configuration`}
              </h3>
              <button
                onClick$={() => onEdit$(2)}
                class="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
              >
                {$localize`Edit`}
              </button>
            </div>

            <div class="px-6 py-4">
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {$localize`Strategy:`}{" "}
                {getStrategyDisplay(wizardState.multiLinkStrategy.strategy)}
              </p>

              {/* Load Balance Details */}
              {(wizardState.multiLinkStrategy.strategy === "LoadBalance" ||
                wizardState.multiLinkStrategy.strategy === "Both") && (
                <div class="mt-2">
                  <p class="mb-1 text-sm text-gray-500 dark:text-gray-400">
                    {$localize`Method:`}{" "}
                    {wizardState.multiLinkStrategy.loadBalanceMethod}
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {$localize`Weight Distribution:`}
                  </p>
                  <ul class="ml-4 mt-1 space-y-1">
                    {wizardState.links.map((link) => (
                      <li
                        key={link.id}
                        class="text-sm text-gray-500 dark:text-gray-400"
                      >
                        • {link.name}: {link.weight}%
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Failover Details */}
              {(wizardState.multiLinkStrategy.strategy === "Failover" ||
                wizardState.multiLinkStrategy.strategy === "Both") && (
                <div class="mt-2">
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {$localize`Priority Order:`}
                  </p>
                  <ol class="ml-4 mt-1 space-y-1">
                    {wizardState.links
                      .sort((a, b) => (a.priority || 0) - (b.priority || 0))
                      .map((link, index) => (
                        <li
                          key={link.id}
                          class="text-sm text-gray-500 dark:text-gray-400"
                        >
                          {index + 1}. {link.name}
                        </li>
                      ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div class="flex justify-end gap-3">
          <button
            onClick$={onValidate$}
            class="rounded-md border border-gray-300 px-4 py-2 text-sm 
                 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 
                 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {$localize`Validate`}
          </button>
          <button
            onClick$={handleValidateAndApply$}
            class="rounded-md bg-primary-600 px-4 py-2 text-sm 
                 font-medium text-white shadow-sm hover:bg-primary-700"
          >
            {$localize`Apply Configuration`}
          </button>
        </div>
      </div>
    );
  },
);
