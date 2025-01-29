import { component$ } from "@builder.io/qwik";
import { Star } from "~/components/Star/StarHome/Star";

export default component$(() => {
  return (
    <div class="w-full">
      <Star />
    </div>
  );
});
