import { component$, Slot } from "@builder.io/qwik";
import { MobileWarning } from "~/components/Core/MobileWarning";

export default component$(() => {
  return (
    <>
      <MobileWarning />
      <Slot />
    </>
  );
});
