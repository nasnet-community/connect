import { component$ } from "@builder.io/qwik";
import {
  SimpleTable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "~/components/Core/DataDisplay/Table";

export default component$(() => {
  // Generate more columns for a wide table
  const headers = [
    "ID",
    "Product",
    "Category",
    "Price",
    "Stock",
    "Rating",
    "Vendor",
    "Last Updated",
    "Status",
  ];

  const data = [
    [
      "001",
      'Laptop Pro 16"',
      "Electronics",
      "$1,999",
      "12",
      "4.5/5",
      "TechCorp",
      "2025-04-10",
      "In Stock",
    ],
    [
      "002",
      "Wireless Headphones",
      "Audio",
      "$249",
      "45",
      "4.3/5",
      "SoundWave",
      "2025-04-15",
      "In Stock",
    ],
    [
      "003",
      'Smart Monitor 32"',
      "Electronics",
      "$599",
      "8",
      "4.7/5",
      "DisplayTech",
      "2025-04-12",
      "Low Stock",
    ],
    [
      "004",
      "Ergonomic Keyboard",
      "Accessories",
      "$129",
      "0",
      "4.2/5",
      "InputGear",
      "2025-04-05",
      "Out of Stock",
    ],
    [
      "005",
      "Wireless Mouse",
      "Accessories",
      "$79",
      "23",
      "4.4/5",
      "InputGear",
      "2025-04-18",
      "In Stock",
    ],
  ];

  return (
    <div class="flex flex-col gap-10">
      <div>
        <h3 class="mb-2 text-sm font-medium">
          Responsive Table with Horizontal Scroll
        </h3>
        <div class="rounded-md border border-gray-200 dark:border-gray-700">
          <SimpleTable horizontalScroll>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableCell key={header} isHeader={true}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <TableCell key={`${rowIndex}-${cellIndex}`}>
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </SimpleTable>
        </div>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          This table horizontally scrolls when the content exceeds the container
          width.
        </p>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Table with Sticky Header</h3>
        <div class="rounded-md border border-gray-200 dark:border-gray-700">
          <SimpleTable stickyHeader height="250px" variant="striped">
            <TableHead>
              <TableRow>
                {headers.slice(0, 5).map((header) => (
                  <TableCell key={header} isHeader={true}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {[...data, ...data, ...data].map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.slice(0, 5).map((cell, cellIndex) => (
                    <TableCell key={`${rowIndex}-${cellIndex}`}>
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </SimpleTable>
        </div>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          This table has a sticky header that remains visible when scrolling
          through a large dataset.
        </p>
      </div>
    </div>
  );
});
