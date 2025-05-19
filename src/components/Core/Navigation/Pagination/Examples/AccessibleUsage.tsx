import { component$ } from '@builder.io/qwik';
import { Pagination } from '../../Pagination';

export default component$(() => {
  return (
    <div class="p-4">
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange$={(page) => console.log(`Page changed to ${page}`)}
        ariaLabel="Product search results pagination"
        prevButtonLabel="Previous page"
        nextButtonLabel="Next page"
        pageInputAriaLabel="Go to page"
      />
      <p class="text-sm mt-2 text-gray-600">
        This example includes proper ARIA labels for improved screen reader support.
      </p>
    </div>
  );
});
