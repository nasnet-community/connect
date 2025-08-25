import {
  $,
  useSignal,
  useStore,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { Credentials } from "../../../StarContext/Utils/VPNServerType";
import type { VPNType } from "../../../StarContext/CommonType";
import { StarContext } from "../../../StarContext/StarContext";
import { useStepperContext } from "~/components/Core/Stepper/CStepper";
import { VPNServerContextId } from "../VPNServerAdvanced/VPNServerContext";

interface UseUserCredentialProps {
  user: Credentials;
  index: number;
  onUsernameChange$: QRL<(value: string, index: number) => void>;
  onPasswordChange$: QRL<(value: string, index: number) => void>;
  onProtocolToggle$: QRL<(protocol: VPNType, index: number) => void>;
  onDelete$: QRL<(index: number) => void>;
}

// Hook for individual user credential management (original functionality)
export const useUserCredential = ({
  user,
  index,
  onUsernameChange$,
  onPasswordChange$,
  onProtocolToggle$,
  onDelete$,
}: UseUserCredentialProps) => {
  const stepper = useStepperContext(VPNServerContextId);
  const starContext = useContext(StarContext);
  const isEasyMode = starContext.state.Choose.Mode === "easy";

  // Determine if this user is valid
  const isUserValid =
    user.Username.trim() !== "" &&
    user.Password.trim() !== "" &&
    Array.isArray(user.VPNType) &&
    // In Easy mode, protocols are auto-assigned, so consider them valid
    (isEasyMode || user.VPNType.length > 0);

  // Use useVisibleTask$ to validate and update step completion
  // This runs on the client and doesn't have serialization issues
  useVisibleTask$(({ track }) => {
    // Track the user and all users for validation
    track(() => user);
    track(() => stepper.data.users);

    // Check if all users are valid
    const isFormValid = stepper.data.users.every((u) => {
      const hasCredentials =
        u.Username.trim() !== "" && u.Password.trim() !== "";
      // In Easy mode, protocols are auto-assigned, so consider them valid
      const hasProtocols = isEasyMode || (Array.isArray(u.VPNType) && u.VPNType.length > 0);
      const hasValidProtocols = isEasyMode || (
        Array.isArray(u.VPNType) &&
        u.VPNType.every(
          (protocol: VPNType) =>
            stepper.data.enabledProtocols[protocol] === true,
        )
      );
      return hasCredentials && hasProtocols && hasValidProtocols;
    });

    // Update the context data stepState directly
    if (stepper.data.stepState) {
      stepper.data.stepState.users = isFormValid;
    }

    // Find the Users step and update its completion status
    const usersStepId = stepper.steps.value.find((step) =>
      step.title.includes("Users"),
    )?.id;

    if (usersStepId !== undefined) {
      if (isFormValid) {
        stepper.completeStep$(usersStepId);
      } else {
        stepper.updateStepCompletion$(usersStepId, false);
      }
    }
  });

  // Event handlers for inputs - they don't need to call validation explicitly
  // as useVisibleTask$ will handle that reactively
  const handleUsernameChange = $(async (value: string) => {
    await onUsernameChange$(value, index);
  });

  const handlePasswordChange = $(async (value: string) => {
    await onPasswordChange$(value, index);
  });

  const handleProtocolToggle = $(async (protocol: VPNType) => {
    await onProtocolToggle$(protocol, index);
  });

  const handleDelete = $(async () => {
    await onDelete$(index);
  });

  // Use a basic title for the Card component to satisfy TypeScript requirements
  const cardTitle = $localize`User ${index + 1}`;

  return {
    // Computed values
    isUserValid,
    cardTitle,

    // Event handlers
    handleUsernameChange,
    handlePasswordChange,
    handleProtocolToggle,
    handleDelete,
  };
};

// New hook for managing all users (moved from useVPNServer)
export const useUserManagement = () => {
  const starContext = useContext(StarContext);
  const vpnServerState = starContext.state.LAN.VPNServer || { Users: [] };
  const isEasyMode = starContext.state.Choose.Mode === "easy";

  // === USER MANAGEMENT STATE ===
  const users = useStore<Credentials[]>(
    vpnServerState.Users.length
      ? [...vpnServerState.Users]
      : [{ Username: "", Password: "", VPNType: [] }],
  );

  // Error signals for duplicate usernames
  const usernameErrors = useStore<Record<number, string>>({});

  // Validation state
  const isValid = useSignal(true);

  // === USER VALIDATION ===
  const validateAllUsernames = $(() => {
    const errors: Record<number, string> = {};

    users.forEach((user, index) => {
      if (user.Username.trim()) {
        // Check for duplicates inline
        const isDuplicate = users.some(
          (otherUser, otherIndex) =>
            otherIndex !== index &&
            otherUser.Username.trim().toLowerCase() ===
              user.Username.trim().toLowerCase(),
        );

        if (isDuplicate) {
          errors[index] =
            $localize`Username already exists. Please choose a different username.`;
        }
      }
    });

    // Clear previous errors and set new ones
    Object.keys(usernameErrors).forEach((key) => {
      delete usernameErrors[parseInt(key)];
    });
    Object.assign(usernameErrors, errors);
  });

  // === VALIDATION TASK ===
  useTask$(({ track }) => {
    track(() => users);

    // Validate usernames for duplicates whenever users change
    validateAllUsernames();

    // Check for duplicate usernames
    const hasDuplicateUsernames = Object.keys(usernameErrors).length > 0;

    const hasValidUsers = users.every((user) => {
      const hasCredentials =
        user.Username.trim() !== "" && user.Password.trim() !== "";
      // In Easy mode, protocols are auto-assigned, so consider them valid
      const hasProtocols = isEasyMode || (user.VPNType.length || 0) > 0;
      return hasCredentials && hasProtocols;
    });

    isValid.value = hasValidUsers && !hasDuplicateUsernames;
  });

  // === USER MANAGEMENT ACTIONS ===
  const addUser = $(() => {
    // Generate a unique username suggestion
    let newUserIndex = users.length + 1;
    let suggestedUsername = `user${newUserIndex}`;

    // Ensure the suggested username is unique
    while (
      users.some(
        (user) =>
          user.Username.toLowerCase() === suggestedUsername.toLowerCase(),
      )
    ) {
      newUserIndex++;
      suggestedUsername = `user${newUserIndex}`;
    }

    // Auto-assign protocols for Easy mode, empty array for Advanced mode
    const defaultProtocols = isEasyMode ? ["OpenVPN", "Wireguard"] as VPNType[] : [];
    
    users.push({ Username: suggestedUsername, Password: "", VPNType: defaultProtocols });
  });

  const removeUser = $((index: number) => {
    if (users.length > 1) {
      users.splice(index, 1);
      // Clean up any errors for the removed user and adjust indices
      const newErrors: Record<number, string> = {};
      Object.entries(usernameErrors).forEach(([key, value]) => {
        const errorIndex = parseInt(key);
        if (errorIndex < index) {
          newErrors[errorIndex] = value;
        } else if (errorIndex > index) {
          newErrors[errorIndex - 1] = value;
        }
        // Skip the removed index
      });

      // Clear and update errors
      Object.keys(usernameErrors).forEach((key) => {
        delete usernameErrors[parseInt(key)];
      });
      Object.assign(usernameErrors, newErrors);
    }
  });

  const handleUsernameChange = $((value: string, index: number) => {
    users[index].Username = value;

    // Clear previous error for this user
    delete usernameErrors[index];

    // Check for duplicates only if username is not empty
    if (value.trim()) {
      const isDuplicate = users.some(
        (otherUser, otherIndex) =>
          otherIndex !== index &&
          otherUser.Username.trim().toLowerCase() ===
            value.trim().toLowerCase(),
      );
      if (isDuplicate) {
        usernameErrors[index] =
          $localize`Username already exists. Please choose a different username.`;
      }
    }
  });

  const handlePasswordChange = $((value: string, index: number) => {
    users[index].Password = value;
  });

  const handleProtocolToggle = $((protocol: VPNType, index: number) => {
    const userVpnTypes = users[index].VPNType || [];
    const typeIndex = userVpnTypes.indexOf(protocol);

    if (typeIndex === -1) {
      users[index].VPNType = [...userVpnTypes, protocol];
    } else {
      users[index].VPNType = userVpnTypes.filter((t) => t !== protocol);
    }
  });

  // === SAVE USERS TO CONTEXT ===
  const saveUsers = $(() => {
    const validUsers = users.filter(
      (user) =>
        user.Username.trim() !== "" &&
        user.Password.trim() !== "" &&
        (user.VPNType.length || 0) > 0,
    );

    // Always work with the most recent VPNServer object to prevent
    // accidentally overwriting protocol configurations that may have
    // been added after this hook was initialized.
    const latestVpnServer = {
      ...(starContext.state.LAN.VPNServer || {}),
    } as any;

    starContext.updateLAN$({
      VPNServer: {
        ...latestVpnServer,
        Users: validUsers,
      },
    });
  });

  return {
    // === STATE ===
    users,
    usernameErrors,
    isValid,

    // === USER MANAGEMENT ACTIONS ===
    addUser,
    removeUser,
    handleUsernameChange,
    handlePasswordChange,
    handleProtocolToggle,

    // === SAVE ===
    saveUsers,

    // === VALIDATION ===
    validateAllUsernames,
  };
};
