import { component$ } from "@builder.io/qwik";
import {
  SimpleTable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "~/components/Core/DataDisplay/Table";

export const TableVariants = component$(() => {
  // Sample data for the tables
  const headers = ["Product", "Category", "Price", "Status"];
  const data = [
    ["Laptop", "Electronics", "$999", "In Stock"],
    ["Headphones", "Audio", "$129", "In Stock"],
    ["Monitor", "Electronics", "$349", "Low Stock"],
    ["Keyboard", "Accessories", "$59", "Out of Stock"],
  ];

  return (
    <div class="flex flex-col gap-8">
      <div>
        <h3 class="mb-2 text-sm font-medium">Default Variant</h3>
        <SimpleTable variant="default">
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
                  <TableCell key={`${rowIndex}-${cellIndex}`}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </SimpleTable>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Bordered Variant</h3>
        <SimpleTable variant="bordered">
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
                  <TableCell key={`${rowIndex}-${cellIndex}`}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </SimpleTable>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Striped Variant</h3>
        <SimpleTable variant="striped">
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
                  <TableCell key={`${rowIndex}-${cellIndex}`}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </SimpleTable>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Bordered-Striped Variant</h3>
        <SimpleTable variant="bordered-striped">
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
                  <TableCell key={`${rowIndex}-${cellIndex}`}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </SimpleTable>
      </div>
    </div>
  );
});
