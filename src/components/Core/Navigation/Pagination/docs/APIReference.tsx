import { component$ } from '@builder.io/qwik';
import { APIReferenceTemplate } from '~/components/Docs/templates';

export default component$(() => {
  const props = [
    {
      name: 'currentPage',
      type: 'number',
      defaultValue: '1',
      description: 'The current active page.',
      required: true
    },
    {
      name: 'totalPages',
      type: 'number',
      description: 'Total number of pages available.',
      required: true
    },
    {
      name: 'onPageChange$',
      type: '(page: number) => void',
      description: 'Function called when the page changes.',
      required: true
    },
    {
      name: 'pageSize',
      type: 'number',
      defaultValue: '10',
      description: 'Number of items shown per page.'
    },
    {
      name: 'totalItems',
      type: 'number',
      description: 'Total number of items across all pages. Used for displaying item count.'
    },
    {
      name: 'pageSizeOptions',
      type: 'number[]',
      defaultValue: '[10, 25, 50, 100]',
      description: 'Available options for page size selection.'
    },
    {
      name: 'onPageSizeChange$',
      type: '(size: number) => void',
      description: 'Function called when the page size changes.'
    },
    {
      name: 'showPageNumbers',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Whether to show numbered page buttons.'
    },
    {
      name: 'showPageInput',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether to show a direct page input field.'
    },
    {
      name: 'showPageSizeSelector',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether to show the page size selector dropdown.'
    },
    {
      name: 'showItemCount',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether to show the item count information (e.g., "1-10 of 100 items").'
    },
    {
      name: 'maxVisiblePages',
      type: 'number',
      defaultValue: '5',
      description: 'Maximum number of page buttons to display before using ellipsis.'
    },
    {
      name: 'compact',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether to use a more compact layout with reduced spacing.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Disables all pagination controls.'
    },
    {
      name: 'ariaLabel',
      type: 'string',
      defaultValue: '"Pagination"',
      description: 'Accessible label for the pagination component.'
    },
    {
      name: 'prevButtonLabel',
      type: 'string',
      defaultValue: '"Previous"',
      description: 'Accessible label for the previous page button.'
    },
    {
      name: 'nextButtonLabel',
      type: 'string',
      defaultValue: '"Next"',
      description: 'Accessible label for the next page button.'
    },
    {
      name: 'pageInputAriaLabel',
      type: 'string',
      defaultValue: '"Go to page"',
      description: 'Accessible label for the page input field.'
    },
    {
      name: 'pageSizeSelectorAriaLabel',
      type: 'string',
      defaultValue: '"Items per page"',
      description: 'Accessible label for the page size selector.'
    },
    {
      name: 'class',
      type: 'string',
      description: 'Additional CSS classes to apply to the pagination container.'
    },
    {
      name: 'buttonClass',
      type: 'string',
      description: 'Additional CSS classes to apply to page number buttons.'
    },
    {
      name: 'activeButtonClass',
      type: 'string',
      description: 'Additional CSS classes to apply to the active page button.'
    },
    {
      name: 'id',
      type: 'string',
      description: 'The ID attribute for the pagination element.'
    }
  ];

  return (
    <APIReferenceTemplate props={props}>
      <p>
        The Pagination component provides a comprehensive set of props for customizing both the 
        appearance and behavior. The component handles page navigation, page size selection, and 
        various display options to fit different use cases.
      </p>
      
      <p class="mt-3">
        All pagination controls are keyboard accessible and include proper ARIA attributes for 
        screen readers. You can further enhance accessibility by providing custom ARIA labels
        through the dedicated props.
      </p>
    </APIReferenceTemplate>
  );
});
