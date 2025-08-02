import { component$, useContext } from "@builder.io/qwik";
import type { StepProps } from "~/types/step";
import { UsefulServicesEasy } from "./UsefulServicesEasy/UsefulServicesEasy";
import { UsefulServicesAdvanced } from "./UsefulServicesAdvanced/UsefulServicesAdvanced";
import { StarContext } from "../../StarContext/StarContext";

export type UsefulServicesMode = "easy" | "advanced";

export const UsefulServices = component$<StepProps>(({ onComplete$ }) => {
  const ctx = useContext(StarContext);
  // Map from "advance" (typo in context) to "advanced"
  const mode = ctx.state.Choose.Mode === "advance" ? "advanced" : "easy";

  return (
    <div class="mx-auto w-full max-w-6xl p-4">
      {/* Mode-specific Content */}
      {mode === "easy" ? (
        <UsefulServicesEasy isComplete={false} onComplete$={onComplete$} />
      ) : (
        <UsefulServicesAdvanced isComplete={false} onComplete$={onComplete$} />
      )}
    </div>
  );
});
