import { component$, useSignal } from '@builder.io/qwik';
import { 
  Table, 
  type TableColumn 
} from '~/components/Core/DataDisplay/Table';

interface Person {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
}

export default component$(() => {
  const sortState = useSignal({ column: 'name', direction: 'asc' as const });

  // Sample data for the data-driven table
  const data: Person[] = [
    { 
      id: 1, 
      name: 'Jane Cooper', 
      email: 'jane@example.com', 
      role: 'Frontend Developer', 
      department: 'Engineering',
      status: 'Active'
    },
    { 
      id: 2, 
      name: 'Michael Scott', 
      email: 'michael@example.com', 
      role: 'Product Manager', 
      department: 'Product',
      status: 'Active'
    },
    { 
      id: 3, 
      name: 'Ada Lovelace', 
      email: 'ada@example.com', 
      role: 'Backend Engineer', 
      department: 'Engineering',
      status: 'On Leave'
    },
    { 
      id: 4, 
      name: 'Alex Rodriguez', 
      email: 'alex@example.com', 
      role: 'UX Designer', 
      department: 'Design',
      status: 'Active'
    }
  ];

  // Column definitions for the data-driven table
  const columns: TableColumn<Person>[] = [
    {
      id: 'name',
      header: 'Name',
      field: 'name',
      sortable: true
    },
    {
      id: 'email',
      header: 'Email',
      field: 'email',
    },
    {
      id: 'role',
      header: 'Role',
      field: 'role',
      sortable: true
    },
    {
      id: 'department',
      header: 'Department',
      field: 'department',
      sortable: true
    },
    {
      id: 'status',
      header: 'Status',
      field: 'status',
      align: 'center',
      sortable: true,
      renderCell$: $((_value, row) => {
        const statusColor = 
          row.status === 'Active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
        
        return (
          <span class={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
            {row.status}
          </span>
        );
      })
    }
  ];

  return (
    <div>
      <h3 class="text-sm font-medium mb-2">Data-Driven Table with Sorting</h3>
      <Table
        data={data}
        columns={columns}
        sortState={sortState}
        onSortChange$={(newSortState) => {
          sortState.value = newSortState;
        }}
        hoverable
        caption="Employee Directory"
        emptyContent={<div class="p-4 text-center">No employees found.</div>}
      />
    </div>
  );
});
