import { component$ } from "@builder.io/qwik";
import { Pagination } from "../../Pagination";

export default component$(() => {
  return (
    <div class="p-4">
      <Pagination
        currentPage={7}
        totalItems={150}
        totalPages={15}
        showPageNumbers={false}
        compact={true}
        onPageChange$={(page) => console.log(`Page changed to ${page}`)}
      />
    </div>
  );
});
