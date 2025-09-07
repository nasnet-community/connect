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
    <div class="container mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Animated container with responsive padding */}
      <div class="animate-fade-in">
        {/* Mode-specific Content */}
        {mode === "easy" ? (
          <UsefulServicesEasy isComplete={false} onComplete$={onComplete$} />
        ) : (
          <UsefulServicesAdvanced isComplete={false} onComplete$={onComplete$} />
        )}
      </div>
    </div>
  );
});
