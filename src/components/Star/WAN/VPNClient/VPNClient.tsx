import { component$ } from "@builder.io/qwik";
import type { StepProps } from "~/types/step";
import { VPNClientEasy } from "./VPNClientEasy/VPNClientEasy";
import { VPNClientAdvanced } from "./VPNClientAdvanced/AdvancedVPNClient";
import { useVPNClientMode } from "./useVPNClientMode";

export const VPNClient = component$<StepProps>(
  ({ isComplete, onComplete$ }) => {
    const { vpnMode } = useVPNClientMode();

    // If in advanced mode, render the advanced component
    if (vpnMode.value === "advanced") {
      return (
        <VPNClientAdvanced
          onComplete$={onComplete$}
        />
      );
    }

    // Easy mode - render easy component
    return (
      <VPNClientEasy
        isComplete={isComplete}
        onComplete$={onComplete$}
      />
    );
  },
);
