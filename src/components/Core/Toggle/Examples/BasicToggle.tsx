import { component$, useSignal, $ } from "@builder.io/qwik";
import { Toggle } from "../Toggle";

export default component$(() => {
  const checked = useSignal(false);

  return (
    <div class="flex flex-col gap-4">
      <Toggle
        checked={checked.value}
        onChange$={$((value) => {
          checked.value = value;
        })}
        label="Toggle feature"
      />
    </div>
  );
});
