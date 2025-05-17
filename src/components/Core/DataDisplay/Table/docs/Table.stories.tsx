import { $, component$, useSignal } from '@builder.io/qwik';
import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { Table, TableBody, TableCell, TableHead, TableRow, type SortState } from '../index';

interface Person {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  lastActivity: string;
}

const people: Person[] = [
  {
    id: '1',
    name: 'Jane Cooper',
    email: 'jane.cooper@example.com',
    role: 'Admin',
    status: 'active',
    joinDate: '2023-01-15',
    lastActivity: '2023-05-20',
  },
  {
    id: '2',
    name: 'Cody Fisher',
    email: 'cody.fisher@example.com',
    role: 'Developer',
    status: 'inactive',
    joinDate: '2023-02-10',
    lastActivity: '2023-04-05',
  },
  {
    id: '3',
    name: 'Esther Howard',
    email: 'esther.howard@example.com',
    role: 'Designer',
    status: 'active',
    joinDate: '2023-03-22',
    lastActivity: '2023-05-18',
  },
  {
    id: '4',
    name: 'Jenny Wilson',
    email: 'jenny.wilson@example.com',
    role: 'Manager',
    status: 'pending',
    joinDate: '2023-01-05',
    lastActivity: '2023-05-15',
  },
  {
    id: '5',
    name: 'Kristin Watson',
    email: 'kristin.watson@example.com',
    role: 'Developer',
    status: 'active',
    joinDate: '2022-12-01',
    lastActivity: '2023-05-22',
  },
];

const meta: Meta<typeof Table> = {
  title: 'Core/Data Display/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'striped', 'bordered-striped'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

/**
 * Basic usage of the Table component.
 */
export const Basic: Story = {
  args: {
    data: people,
    columns: [
      { id: 'name', header: 'Name', field: 'name' },
      { id: 'email', header: 'Email', field: 'email' },
      { id: 'role', header: 'Role', field: 'role' },
    ],
    variant: 'default',
    size: 'md',
  },
};

/**
 * Table with sorting capabilities.
 */
export const Sortable: Story = {
  render: component$(() => {
    const sortState = useSignal<SortState>({ column: '', direction: 'none' });
    
    const handleSortChange$ = $((newSortState: SortState) => {
      sortState.value = newSortState;
    });
    
    return (
      <Table
        data={people}
        columns={[
          { 
            id: 'name', 
            header: 'Name', 
            field: 'name', 
            sortable: true,
            description: 'User full name'
          },
          { 
            id: 'email', 
            header: 'Email', 
            field: 'email', 
            sortable: true 
          },
          { 
            id: 'role', 
            header: 'Role', 
            field: 'role', 
            sortable: true 
          },
          { 
            id: 'joinDate', 
            header: 'Join Date', 
            field: 'joinDate', 
            sortable: true,
            description: 'When the user joined'
          },
        ]}
        sortState={sortState}
        onSortChange$={handleSortChange$}
        caption="User Directory - Click column headers to sort"
      />
    );
  })
};

/**
 * Table with custom cell rendering.
 */
export const CustomCells: Story = {
  render: component$(() => {
    return (
      <Table
        data={people}
        columns={[
          { 
            id: 'name', 
            header: 'Name', 
            field: 'name',
            renderCell: (value, row) => (
              <div class="flex items-center gap-2">
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900">
                  <svg class="h-4 w-4 text-primary-600 dark:text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <div class="font-medium">{value as string}</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">{row.email}</div>
                </div>
              </div>
            )
          },
          { 
            id: 'role', 
            header: 'Role', 
            renderCell: (_, row) => (
              <div class="flex items-center gap-1">
                {row.role === 'Admin' && (
                  <svg class="h-4 w-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
                {row.role === 'Developer' && (
                  <svg class="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )}
                <span>{row.role}</span>
              </div>
            )
          },
          { 
            id: 'status', 
            header: 'Status', 
            field: 'status',
            renderCell: (value) => {
              const status = value as Person['status'];
              return (
                <span 
                  class={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                    status === 'active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                      : status === 'inactive' 
                        ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                  }`}
                >
                  {status}
                </span>
              );
            }
          },
          { 
            id: 'lastActivity', 
            header: 'Last Active', 
            field: 'lastActivity',
            align: 'right'
          },
          {
            id: 'actions',
            header: 'Actions',
            renderCell: () => (
              <div class="flex justify-end">
                <button class="rounded-md bg-primary-50 px-2 py-1 text-xs font-medium text-primary-600 hover:bg-primary-100 dark:bg-primary-900/30 dark:text-primary-300 dark:hover:bg-primary-900/50">
                  View
                </button>
              </div>
            ),
            align: 'right',
            width: '100px'
          }
        ]}
        variant="bordered"
        size="md"
      />
    );
  })
};

/**
 * Table with different visual variants.
 */
export const Variants: Story = {
  render: component$(() => {
    return (
      <div class="flex flex-col gap-8">
        <div>
          <h3 class="mb-2 text-lg font-medium">Default</h3>
          <Table
            data={people.slice(0, 3)}
            columns={[
              { id: 'name', header: 'Name', field: 'name' },
              { id: 'email', header: 'Email', field: 'email' },
              { id: 'role', header: 'Role', field: 'role' },
            ]}
            variant="default"
          />
        </div>
        
        <div>
          <h3 class="mb-2 text-lg font-medium">Bordered</h3>
          <Table
            data={people.slice(0, 3)}
            columns={[
              { id: 'name', header: 'Name', field: 'name' },
              { id: 'email', header: 'Email', field: 'email' },
              { id: 'role', header: 'Role', field: 'role' },
            ]}
            variant="bordered"
          />
        </div>
        
        <div>
          <h3 class="mb-2 text-lg font-medium">Striped</h3>
          <Table
            data={people.slice(0, 3)}
            columns={[
              { id: 'name', header: 'Name', field: 'name' },
              { id: 'email', header: 'Email', field: 'email' },
              { id: 'role', header: 'Role', field: 'role' },
            ]}
            variant="striped"
          />
        </div>
        
        <div>
          <h3 class="mb-2 text-lg font-medium">Bordered & Striped</h3>
          <Table
            data={people.slice(0, 3)}
            columns={[
              { id: 'name', header: 'Name', field: 'name' },
              { id: 'email', header: 'Email', field: 'email' },
              { id: 'role', header: 'Role', field: 'role' },
            ]}
            variant="bordered-striped"
          />
        </div>
      </div>
    );
  })
};

/**
 * Table with different sizes.
 */
export const Sizes: Story = {
  render: component$(() => {
    return (
      <div class="flex flex-col gap-8">
        <div>
          <h3 class="mb-2 text-lg font-medium">Small</h3>
          <Table
            data={people.slice(0, 3)}
            columns={[
              { id: 'name', header: 'Name', field: 'name' },
              { id: 'email', header: 'Email', field: 'email' },
              { id: 'role', header: 'Role', field: 'role' },
            ]}
            size="sm"
          />
        </div>
        
        <div>
          <h3 class="mb-2 text-lg font-medium">Medium (Default)</h3>
          <Table
            data={people.slice(0, 3)}
            columns={[
              { id: 'name', header: 'Name', field: 'name' },
              { id: 'email', header: 'Email', field: 'email' },
              { id: 'role', header: 'Role', field: 'role' },
            ]}
            size="md"
          />
        </div>
        
        <div>
          <h3 class="mb-2 text-lg font-medium">Large</h3>
          <Table
            data={people.slice(0, 3)}
            columns={[
              { id: 'name', header: 'Name', field: 'name' },
              { id: 'email', header: 'Email', field: 'email' },
              { id: 'role', header: 'Role', field: 'role' },
            ]}
            size="lg"
          />
        </div>
      </div>
    );
  })
};

/**
 * Interactive table with row click events.
 */
export const Interactive: Story = {
  render: component$(() => {
    const selectedRow = useSignal<string | null>(null);
    
    const handleRowClick$ = $((row: Person) => {
      selectedRow.value = row.id === selectedRow.value ? null : row.id;
    });
    
    return (
      <div>
        <Table
          data={people}
          columns={[
            { id: 'name', header: 'Name', field: 'name' },
            { id: 'email', header: 'Email', field: 'email' },
            { id: 'role', header: 'Role', field: 'role' },
          ]}
          variant="striped"
          hoverable={true}
          rowClass={(row) => row.id === selectedRow.value ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
          onRowClick$={handleRowClick$}
          caption="Click on a row to select it"
        />
        
        <div class="mt-4 rounded-md bg-gray-50 p-4 dark:bg-gray-800">
          <h3 class="text-sm font-medium">Selected Row</h3>
          <pre class="mt-2 whitespace-pre-wrap text-xs">
            {selectedRow.value 
              ? JSON.stringify(people.find(p => p.id === selectedRow.value), null, 2) 
              : 'No row selected'}
          </pre>
        </div>
      </div>
    );
  })
};

/**
 * Table with responsive column hiding.
 */
export const Responsive: Story = {
  render: component$(() => {
    return (
      <div class="max-w-full">
        <p class="mb-4 text-sm">
          Resize your browser window to see how columns hide at different breakpoints
        </p>
        
        <Table
          data={people}
          columns={[
            { id: 'name', header: 'Name', field: 'name' },
            { 
              id: 'email', 
              header: 'Email', 
              field: 'email',
              hideOn: { sm: true } 
            },
            { id: 'role', header: 'Role', field: 'role' },
            { 
              id: 'status', 
              header: 'Status', 
              field: 'status',
              hideOn: { md: true }
            },
            { 
              id: 'joinDate', 
              header: 'Join Date', 
              field: 'joinDate',
              hideOn: { sm: true }
            },
            { 
              id: 'lastActivity', 
              header: 'Last Active', 
              field: 'lastActivity',
              hideOn: { md: true }
            },
          ]}
          variant="bordered"
          horizontalScroll={true}
        />
      </div>
    );
  })
};

/**
 * Table with empty state handling.
 */
export const EmptyState: Story = {
  render: component$(() => {
    return (
      <Table
        data={[]}
        columns={[
          { id: 'name', header: 'Name', field: 'name' },
          { id: 'email', header: 'Email', field: 'email' },
          { id: 'role', header: 'Role', field: 'role' },
        ]}
        emptyContent={
          <div class="flex flex-col items-center justify-center py-8">
            <svg class="h-12 w-12 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-200">No users</h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Get started by creating a new user.
            </p>
            <div class="mt-6">
              <button class="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">
                Add User
              </button>
            </div>
          </div>
        }
      />
    );
  })
};

/**
 * Table with loading state.
 */
export const Loading: Story = {
  render: component$(() => {
    return (
      <Table
        data={[]}
        columns={[
          { id: 'name', header: 'Name', field: 'name' },
          { id: 'email', header: 'Email', field: 'email' },
          { id: 'role', header: 'Role', field: 'role' },
        ]}
        loading={true}
        loadingContent={
          <div class="flex flex-col items-center justify-center py-8">
            <div class="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary-600"></div>
            <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">Loading data...</p>
          </div>
        }
      />
    );
  })
};

/**
 * Table with manual component composition.
 */
export const Composition: Story = {
  render: component$(() => {
    return (
      <div class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table class="w-full text-left text-sm">
          <caption class="caption-top mb-2 text-sm text-gray-600 dark:text-gray-400">
            Manual composition of table components
          </caption>
          
          <TableHead>
            <tr>
              <TableCell isHeader>Name</TableCell>
              <TableCell isHeader>Email</TableCell>
              <TableCell isHeader>Role</TableCell>
              <TableCell isHeader align="right">Last Active</TableCell>
            </tr>
          </TableHead>
          
          <TableBody>
            {people.map((person) => (
              <TableRow key={person.id}>
                <TableCell>{person.name}</TableCell>
                <TableCell>{person.email}</TableCell>
                <TableCell>{person.role}</TableCell>
                <TableCell align="right">{person.lastActivity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </table>
      </div>
    );
  })
};
