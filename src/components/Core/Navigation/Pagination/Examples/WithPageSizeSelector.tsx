import { component$ } from '@builder.io/qwik';
import { Pagination } from '../../Pagination';

export default component$(() => {
  return (
    <div class="p-4">
      <Pagination
        currentPage={1}
        totalPages={8}
        pageSize={10}
        totalItems={75}
        pageSizeOptions={[5, 10, 25, 50]}
        onPageChange$={(page) => console.log(`Page changed to ${page}`)}
        onPageSizeChange$={(size) => console.log(`Page size changed to ${size}`)}
        showPageSizeSelector={true}
      />
    </div>
  );
});
