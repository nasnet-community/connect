import { $, useSignal, useContext } from "@builder.io/qwik";
import { StarContext } from "../../../StarContext/StarContext";

export const useCertificate = () => {
  const starContext = useContext(StarContext);
  const vpnServerState = starContext.state.LAN.VPNServer || { Users: [], CertificatePassphrase: "" };

  // Initialize certificate passphrase from StarContext
  const certificatePassphrase = useSignal(vpnServerState.CertificatePassphrase || "");
  const showPassphrase = useSignal(false);
  const passphraseError = useSignal("");

  // Validate passphrase
  const validatePassphrase = $((value: string) => {
    if (value.length > 0 && value.length < 10) {
      passphraseError.value = $localize`Passphrase must be at least 10 characters`;
      return false;
    }
    passphraseError.value = "";
    return true;
  });

  // Update passphrase with validation
  const updatePassphrase$ = $((value: string) => {
    certificatePassphrase.value = value;
    validatePassphrase(value);
  });

  // Toggle passphrase visibility
  const togglePassphraseVisibility$ = $(() => {
    showPassphrase.value = !showPassphrase.value;
  });

  return {
    // State
    certificatePassphrase,
    showPassphrase,
    passphraseError,

    // Actions
    updatePassphrase$,
    togglePassphraseVisibility$,
    validatePassphrase,
  };
};

