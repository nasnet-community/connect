import { component$ } from "@builder.io/qwik";
import { Pagination } from "../../Pagination";

export default component$(() => {
  return (
    <div class="p-4">
      <Pagination
        currentPage={5}
        totalItems={200}
        totalPages={20}
        showPageInput={true}
        onPageChange$={(page) => console.log(`Page changed to ${page}`)}
      />
    </div>
  );
});
