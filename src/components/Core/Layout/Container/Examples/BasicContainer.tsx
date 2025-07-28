import { component$ } from "@builder.io/qwik";
import { Container } from "../index";

export default component$(() => {
  return (
    <Container maxWidth="md" paddingX="md">
      <div class="rounded bg-gray-100 p-4 dark:bg-gray-800">
        This is a basic container with medium max-width and padding
      </div>
    </Container>
  );
});
