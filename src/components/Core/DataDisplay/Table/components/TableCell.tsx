import { component$, Slot } from "@builder.io/qwik";
import type { TableCellProps } from "../Table.types";

export const TableCell = component$<TableCellProps>((props) => {
  const {
    isHeader = false,
    align = "left",
    truncate = false,
    width,
    colSpan,
    rowSpan,
    scope,
    class: className = "",
    style: styleProps = {},
    ...rest
  } = props;

  const classes = [
    align === "center"
      ? "text-center"
      : align === "right"
        ? "text-end"
        : "text-start",
    truncate ? "truncate" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const style: Record<string, string> = {
    ...styleProps,
  };

  if (width) {
    style.width = width;
  }

  if (isHeader) {
    return (
      <th
        class={classes}
        style={style}
        colSpan={colSpan}
        rowSpan={rowSpan}
        scope={scope}
        {...rest}
      >
        <Slot />
      </th>
    );
  }

  return (
    <td
      class={classes}
      style={style}
      colSpan={colSpan}
      rowSpan={rowSpan}
      {...rest}
    >
      <Slot />
    </td>
  );
});
