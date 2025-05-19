import { component$ } from '@builder.io/qwik';
import { PlaygroundTemplate } from '~/components/Docs/templates';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  type TableVariant,
  type TableSize
} from '../index';

export default component$(() => {
  // Sample data for the playground
  const sampleData = [
    { id: 1, name: 'John Smith', role: 'Software Engineer', department: 'Engineering', status: 'Active' },
    { id: 2, name: 'Maria Garcia', role: 'Product Manager', department: 'Product', status: 'Active' },
    { id: 3, name: 'Robert Johnson', role: 'UX Designer', department: 'Design', status: 'On Leave' },
    { id: 4, name: 'Sarah Williams', role: 'Data Scientist', department: 'Data', status: 'Active' },
    { id: 5, name: 'David Brown', role: 'DevOps Engineer', department: 'Operations', status: 'Inactive' }
  ];

  return (
    <PlaygroundTemplate
      componentName="Table"
      usage={`
import { 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
  TableFooter
} from '~/components/Core/DataDisplay/Table';

<Table variant="bordered" size="md" hoverable>
  <TableHead>
    <TableRow>
      <TableCell variant="th">Name</TableCell>
      <TableCell variant="th">Role</TableCell>
      <TableCell variant="th">Department</TableCell>
      <TableCell variant="th">Status</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {sampleData.map((person) => (
      <TableRow key={person.id}>
        <TableCell>{person.name}</TableCell>
        <TableCell>{person.role}</TableCell>
        <TableCell>{person.department}</TableCell>
        <TableCell>{statusBadge(person.status)}</TableCell>
      </TableRow>
    ))}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={4}>
        Showing {sampleData.length} employees
      </TableCell>
    </TableRow>
  </TableFooter>
</Table>
      `}
      controls={[
        {
          type: 'select',
          label: 'Variant',
          options: ['default', 'bordered', 'striped', 'bordered-striped'],
          defaultValue: 'bordered',
          propertyName: 'variant'
        },
        {
          type: 'select',
          label: 'Size',
          options: ['sm', 'md', 'lg'],
          defaultValue: 'md',
          propertyName: 'size'
        },
        {
          type: 'boolean',
          label: 'Hoverable',
          defaultValue: true,
          propertyName: 'hoverable'
        },
        {
          type: 'boolean',
          label: 'Dense',
          defaultValue: false,
          propertyName: 'dense'
        },
        {
          type: 'boolean',
          label: 'Sticky Header',
          defaultValue: false,
          propertyName: 'stickyHeader'
        },
        {
          type: 'boolean',
          label: 'Horizontal Scroll',
          defaultValue: false,
          propertyName: 'horizontalScroll'
        },
        {
          type: 'text',
          label: 'Height',
          defaultValue: '',
          propertyName: 'height'
        }
      ]}
    >
      {(props) => {
        const statusBadge = (status: string) => {
          const statusClasses = status === 'Active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
            : status === 'On Leave'
              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
          
          return (
            <span class={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusClasses}`}>
              {status}
            </span>
          );
        };

        return (
          <div class="border border-neutral-200 dark:border-neutral-700 rounded-md overflow-hidden">
            <Table
              variant={props.variant as TableVariant}
              size={props.size as TableSize}
              hoverable={props.hoverable as boolean}
              dense={props.dense as boolean}
              stickyHeader={props.stickyHeader as boolean}
              horizontalScroll={props.horizontalScroll as boolean}
              height={props.height as string}
            >
              <TableHead>
                <TableRow>
                  <TableCell variant="th">Name</TableCell>
                  <TableCell variant="th">Role</TableCell>
                  <TableCell variant="th">Department</TableCell>
                  <TableCell variant="th">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sampleData.map((person) => (
                  <TableRow key={person.id}>
                    <TableCell>{person.name}</TableCell>
                    <TableCell>{person.role}</TableCell>
                    <TableCell>{person.department}</TableCell>
                    <TableCell>{statusBadge(person.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4}>
                    <div class="flex justify-between px-2 py-1">
                      <span>Showing {sampleData.length} employees</span>
                      <div class="flex gap-2">
                        <button class="px-2 py-1 text-sm bg-neutral-100 dark:bg-neutral-800 rounded disabled:opacity-50" disabled>
                          Previous
                        </button>
                        <button class="px-2 py-1 text-sm bg-neutral-100 dark:bg-neutral-800 rounded disabled:opacity-50" disabled>
                          Next
                        </button>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        );
      }}
    </PlaygroundTemplate>
  );
});
