import { component$ } from "@builder.io/qwik";
import { Pagination } from "../../Pagination";

export default component$(() => {
  return (
    <div class="p-4">
      <Pagination
        currentPage={3}
        totalItems={100}
        totalPages={10}
        onPageChange$={(page) => console.log(`Page changed to ${page}`)}
      />
    </div>
  );
});
