import { $, component$, useContext } from "@builder.io/qwik";
import { useWirelessForm } from "./useWireless";
import { WirelessHeader } from "./WirelessHeader";
import { SSIDModeSelector } from "./SSIDModeSelector";
import { SingleSSIDForm } from "./SingleSSIDForm";
import { MultiSSIDForm } from "./MultiSSIDForm";
import { ActionButtons } from "./ActionButtons";
import { StarContext } from "../../StarContext";
import type { StepProps } from "~/types/step";

export const Wireless = component$<StepProps>(({ onComplete$ }) => {
  const starContext = useContext(StarContext);
  const {
    isMultiSSID,
    ssid,
    password,
    networks,
    isLoading,
    generateSSID,
    generatePassword,
    generateNetworkSSID,
    generateNetworkPassword,
    generateAllPasswords,
    isFormValid,
  } = useWirelessForm();

  return (
    <div class="mx-auto w-full max-w-4xl p-4">
      <div class="rounded-lg bg-surface p-6 shadow-lg dark:bg-surface-dark">
        <WirelessHeader />
        <SSIDModeSelector isMultiSSID={isMultiSSID} />

        {!isMultiSSID.value ? (
          <SingleSSIDForm
            ssid={ssid}
            password={password}
            generateSSID={generateSSID}
            generatePassword={generatePassword}
            isLoading={isLoading}
          />
        ) : (
          <MultiSSIDForm
            networks={networks}
            isLoading={isLoading.value}
            generateNetworkSSID={generateNetworkSSID}
            generateNetworkPassword={generateNetworkPassword}
            generateAllPasswords={generateAllPasswords}
          />
        )}

        <ActionButtons
          onSubmit={$(async () => {
            starContext.state.LAN.Wireless.isMultiSSID = isMultiSSID.value;

            if (!isMultiSSID.value) {
              starContext.state.LAN.Wireless.SingleMode.WirelessCredentials = {
                SSID: ssid.value,
                Password: password.value,
              };
            }

            await onComplete$();
          })}
          isValid={isFormValid.value}
        />
      </div>
    </div>
  );
});
