import { $, useSignal, useContext } from "@builder.io/qwik";
import { StarContext } from "../../../StarContext/StarContext";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export const useCertificate = () => {
  const locale = useMessageLocale();
  const starContext = useContext(StarContext);
  const vpnServerState = starContext.state.LAN.VPNServer || {
    Users: [],
    CertificatePassphrase: "",
  };

  // Initialize certificate passphrase from StarContext
  const certificatePassphrase = useSignal(
    vpnServerState.CertificatePassphrase || "",
  );
  const showPassphrase = useSignal(false);
  const passphraseError = useSignal("");

  // Validate passphrase
  const validatePassphrase = $((value: string) => {
    if (value.length > 0 && value.length < 10) {
      passphraseError.value = semanticMessages.vpn_server_passphrase_min(
        {},
        {
          locale,
        },
      );
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
