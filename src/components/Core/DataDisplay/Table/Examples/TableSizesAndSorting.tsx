import { component$, useSignal, $ } from '@builder.io/qwik';
import { 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell
} from '~/components/Core/DataDisplay/Table';

interface SampleData {
  name: string;
  type: string;
  size: number;
  lastModified: string;
}

export const TableSizesAndSorting = component$(() => {
  const data = useSignal<SampleData[]>([
    { name: 'Document.pdf', type: 'PDF', size: 2500, lastModified: '2025-04-10' },
    { name: 'Image.jpg', type: 'Image', size: 4200, lastModified: '2025-04-15' },
    { name: 'Spreadsheet.xlsx', type: 'Spreadsheet', size: 1800, lastModified: '2025-04-12' },
    { name: 'Presentation.pptx', type: 'Presentation', size: 3600, lastModified: '2025-04-08' }
  ]);
  
  const sortColumn = useSignal<keyof SampleData>('name');
  const sortDirection = useSignal<'asc' | 'desc'>('asc');
  
  const handleSort = $((column: keyof SampleData) => {
    if (sortColumn.value === column) {
      // Toggle direction if same column
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
      // New column, default to ascending
      sortColumn.value = column;
      sortDirection.value = 'asc';
    }
    
    // Sort the data
    const sortedData = [...data.value].sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection.value === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection.value === 'asc' 
          ? aValue - bValue 
          : bValue - aValue;
      }
      
      return 0;
    });
    
    data.value = sortedData;
  });
  
  const getSortIndicator = (column: keyof SampleData) => {
    if (sortColumn.value !== column) return null;
    
    return sortDirection.value === 'asc' 
      ? <span class="ml-1">↑</span> 
      : <span class="ml-1">↓</span>;
  };
  
  const formatSize = (sizeInKB: number) => {
    return sizeInKB < 1000 
      ? `${sizeInKB} KB` 
      : `${(sizeInKB / 1024).toFixed(2)} MB`;
  };
  
  return (
    <div class="flex flex-col gap-8">
      <div>
        <h3 class="text-sm font-medium mb-2">Table with Sorting</h3>
        <Table data={data.value} columns={[]}>
          <TableHead>
            <TableRow>
              <TableCell 
                variant="th" 
                onClick$={() => handleSort('name')}
                class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                File Name {getSortIndicator('name')}
              </TableCell>
              <TableCell 
                variant="th" 
                onClick$={() => handleSort('type')}
                class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Type {getSortIndicator('type')}
              </TableCell>
              <TableCell 
                variant="th" 
                onClick$={() => handleSort('size')}
                class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Size {getSortIndicator('size')}
              </TableCell>
              <TableCell 
                variant="th" 
                onClick$={() => handleSort('lastModified')}
                class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Last Modified {getSortIndicator('lastModified')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.value.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{formatSize(item.size)}</TableCell>
                <TableCell>{item.lastModified}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Small Size Table</h3>
        <Table data={data.value} columns={[]} size="sm">
          <TableHead>
            <TableRow>
              <TableCell variant="th">File Name</TableCell>
              <TableCell variant="th">Type</TableCell>
              <TableCell variant="th">Size</TableCell>
              <TableCell variant="th">Last Modified</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.value.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{formatSize(item.size)}</TableCell>
                <TableCell>{item.lastModified}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Large Size Table</h3>
        <Table data={data.value} columns={[]} size="lg">
          <TableHead>
            <TableRow>
              <TableCell variant="th">File Name</TableCell>
              <TableCell variant="th">Type</TableCell>
              <TableCell variant="th">Size</TableCell>
              <TableCell variant="th">Last Modified</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.value.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{formatSize(item.size)}</TableCell>
                <TableCell>{item.lastModified}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
});
