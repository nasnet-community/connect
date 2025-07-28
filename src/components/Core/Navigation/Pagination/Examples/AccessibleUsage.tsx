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
        ariaLabel="Product search results pagination"
        labels={{
          previous: "Previous page",
          next: "Next page",
          goToPage: "Go to page",
        }}
      />
      <p class="mt-2 text-sm text-gray-600">
        This example includes proper ARIA labels for improved screen reader
        support.
      </p>
    </div>
  );
});
