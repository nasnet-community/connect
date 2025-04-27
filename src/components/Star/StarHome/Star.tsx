import { component$ } from "@builder.io/qwik";
import { StarContainer } from "../StarContainer/StarContainer";
import { StarContextProvider } from "../StarContext/StarProvider";

export const Star = component$(() => {
  return (
    <div class="w-full">
      <StarContextProvider>
        <StarContainer />
      </StarContextProvider>
    </div>
  );
});
