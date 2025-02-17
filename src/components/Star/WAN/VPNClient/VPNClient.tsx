import { $, component$, useContext } from "@builder.io/qwik";
import { StarContext } from "../../StarContext";
import type { StepProps } from "~/types/step";
import { useVPNConfig } from "./useVPNConfig";
import { VPNSelector } from "./VPNSelector";
import { ConfigInput } from "./ConfigInput";
import { ErrorMessage } from "./ErrorMessage";
import { ActionFooter } from "./ActionFooter";
import type { VPNType } from "~/components/Star/StarContext";

export const VPNClient = component$<StepProps>(
  ({ isComplete, onComplete$ }) => {
    const starContext = useContext(StarContext);
    const {
      config,
      isValid,
      vpnType,
      errorMessage,
      validateRequiredFields,
      parseWireguardConfig,
    } = useVPNConfig();

    const handleVPNTypeChange = $((value: VPNType) => {
      vpnType.value = value;
      config.value = "";
      isValid.value = false;
    });

    const handleConfigChange = $(async (value: string) => {
      config.value = value;
      errorMessage.value = "";

      if (vpnType.value === "Wireguard") {
        const parsedConfig = await parseWireguardConfig(value);
        if (!parsedConfig) {
          isValid.value = false;
          errorMessage.value = $localize`Invalid Wireguard configuration format`;
          return;
        }

        const { isValid: valid, emptyFields } =
          await validateRequiredFields(parsedConfig);

        if (!valid) {
          isValid.value = false;
          errorMessage.value = $localize`Missing required fields: ${emptyFields.join(", ")}`;
          return;
        }

        isValid.value = true;
        starContext.updateWAN$({
          Easy: {
            ...starContext.state.WAN.Easy,
            VPNClient: {
              VPNType: "Wireguard",
              Wireguard: [parsedConfig],
              OpenVPN: "",
              PPTP: "",
              L2TP: "",
              SSTP: "",
              IKeV2: "",
            },
          },
        });
      }
    });

    const handleFileUpload = $(async (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        const file = input.files[0];
        if (file.name.endsWith(".conf")) {
          const text = await file.text();
          config.value = text;
          handleConfigChange(text);
        }
      }
    });

    const handleComplete = $(() => {
      if (!vpnType.value) {
        isValid.value = false;
        return;
      }

      if (vpnType.value === "Wireguard" && isValid.value) {
        if (onComplete$) {
          onComplete$();
        }
      }
    });

    return (
      <div class="w-full p-4">
        <div class="rounded-lg bg-surface p-6 shadow-md transition-all dark:bg-surface-dark">
          <div class="space-y-6">
            {/* Header */}
            <div class="flex items-center space-x-4">
              <div class="rounded-full bg-primary-100 p-3 dark:bg-primary-900">
                <svg
                  class="h-6 w-6 text-primary-600 dark:text-primary-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div>
                <h2 class="text-text-default text-xl font-semibold dark:text-text-dark-default">
                  {$localize`VPN Client Configuration`}
                </h2>
                <p class="text-text-muted dark:text-text-dark-muted">
                  {$localize`Your use of Starlink can be traced back to your identity. To enhance security and privacy, please upload your WireGuard configuration to conceal your Starlink IP.`}
                </p>
              </div>
            </div>

            <VPNSelector
              selectedType={vpnType.value}
              onTypeChange$={handleVPNTypeChange}
            />

            {vpnType.value === "Wireguard" && (
              <>
                <ConfigInput
                  config={config.value}
                  onConfigChange$={handleConfigChange}
                  onFileUpload$={handleFileUpload}
                />
                <ErrorMessage message={errorMessage.value} />
              </>
            )}

            <ActionFooter
              isComplete={isComplete}
              isValid={isValid.value}
              onComplete$={handleComplete}
            />
          </div>
        </div>
      </div>
    );
  },
);
