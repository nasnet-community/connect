import { component$ } from '@builder.io/qwik';
import { PlaygroundTemplate } from '~/components/Docs/templates';
import { Pagination } from '../Pagination';

export default component$(() => {
  const properties = [
    {
      type: 'number',
      name: 'currentPage',
      label: 'Current Page',
      defaultValue: 3,
      min: 1,
      max: 10
    },
    {
      type: 'number',
      name: 'totalPages',
      label: 'Total Pages',
      defaultValue: 10,
      min: 1,
      max: 100
    },
    {
      type: 'number',
      name: 'maxVisiblePages',
      label: 'Max Visible Pages',
      defaultValue: 5,
      min: 1,
      max: 10
    },
    {
      type: 'select',
      name: 'pageSize',
      label: 'Items Per Page',
      defaultValue: 10,
      options: [
        { label: '5 items', value: 5 },
        { label: '10 items', value: 10 },
        { label: '25 items', value: 25 },
        { label: '50 items', value: 50 },
        { label: '100 items', value: 100 }
      ]
    },
    {
      type: 'boolean',
      name: 'showPageNumbers',
      label: 'Show Page Numbers',
      defaultValue: true
    },
    {
      type: 'boolean',
      name: 'showPageInput',
      label: 'Show Page Input',
      defaultValue: false
    },
    {
      type: 'boolean',
      name: 'showItemCount',
      label: 'Show Item Count',
      defaultValue: true
    },
    {
      type: 'boolean',
      name: 'showPageSizeSelector',
      label: 'Show Page Size Selector',
      defaultValue: false
    },
    {
      type: 'boolean',
      name: 'compact',
      label: 'Compact Mode',
      defaultValue: false
    },
    {
      type: 'boolean',
      name: 'disabled',
      label: 'Disabled',
      defaultValue: false
    }
  ];

  return (
    <PlaygroundTemplate
      component={(props: any) => {
        // Calculate total items based on page size and total pages
        const totalItems = props.totalPages * props.pageSize;
        
        return (
          <div class="p-4 bg-white dark:bg-gray-800 rounded-md">
            <Pagination
              currentPage={props.currentPage || 3}
              totalPages={props.totalPages || 10}
              pageSize={props.pageSize || 10}
              totalItems={totalItems}
              maxVisiblePages={props.maxVisiblePages || 5}
              showPageNumbers={props.showPageNumbers !== false}
              showPageInput={props.showPageInput || false}
              showItemCount={props.showItemCount || false}
              showPageSizeSelector={props.showPageSizeSelector || false}
              compact={props.compact || false}
              disabled={props.disabled || false}
              pageSizeOptions={[5, 10, 25, 50, 100]}
              onPageChange$={(page) => console.log(`Page changed to ${page}`)}
              onPageSizeChange$={(size) => console.log(`Page size changed to ${size}`)}
            />
          </div>
        );
      }}
      properties={properties}
    />
  );
});
