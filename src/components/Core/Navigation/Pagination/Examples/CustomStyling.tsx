import { component$ } from '@builder.io/qwik';
import { Pagination } from '../../Pagination';

export default component$(() => {
  return (
    <div class="p-4">
      <Pagination
        currentPage={4}
        totalPages={10}
        onPageChange$={(page) => console.log(`Page changed to ${page}`)}
        class="bg-blue-50 p-3 rounded-lg"
        buttonClass="bg-blue-500 text-white hover:bg-blue-600"
        activeButtonClass="bg-blue-800 text-white font-bold"
      />
    </div>
  );
});
