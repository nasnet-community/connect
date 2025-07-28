import { component$, useSignal } from "@builder.io/qwik";
import {
  PlaygroundTemplate,
  type PropertyControl,
} from "~/components/Docs/templates";
import { DatePicker } from "../DatePicker";
import type { DateRange } from "../DatePicker.types";

/**
 * DatePicker component playground using the standard template
 */
export default component$(() => {
  const selectedDate = useSignal<Date | undefined>(undefined);
  const selectedRange = useSignal<DateRange | undefined>({
    startDate: null,
    endDate: null,
  });

  // Define the DatePickerDemo component that will be controlled by the playground
  const DatePickerDemo = component$<{
    mode: "single" | "range" | "datetime";
    placeholder: string;
    label: string;
    required: boolean;
    disabled: boolean;
    helperText: string;
    errorMessage: string;
    size: "sm" | "md" | "lg";
    inline: boolean;
    showWeekNumbers: boolean;
    clearable: boolean;
    showTodayButton: boolean;
  }>((props) => {
    return (
      <div class="mx-auto w-full max-w-md">
        {props.mode === "single" && (
          <DatePicker
            mode="single"
            placeholder={props.placeholder}
            label={props.label}
            required={props.required}
            disabled={props.disabled}
            helperText={props.helperText || undefined}
            errorMessage={props.errorMessage || undefined}
            size={props.size}
            inline={props.inline}
            showWeekNumbers={props.showWeekNumbers}
            clearable={props.clearable}
            showTodayButton={props.showTodayButton}
            value={selectedDate.value}
            onDateSelect$={(date: Date | null) => {
              selectedDate.value = date || undefined;
            }}
          />
        )}

        {props.mode === "range" && (
          <DatePicker
            mode="range"
            placeholder={props.placeholder}
            label={props.label}
            required={props.required}
            disabled={props.disabled}
            helperText={props.helperText || undefined}
            errorMessage={props.errorMessage || undefined}
            size={props.size}
            inline={props.inline}
            showWeekNumbers={props.showWeekNumbers}
            clearable={props.clearable}
            showTodayButton={props.showTodayButton}
            value={selectedRange.value}
            onRangeSelect$={(range: DateRange) => {
              selectedRange.value = range;
            }}
          />
        )}

        {props.mode === "datetime" && (
          <DatePicker
            mode="datetime"
            placeholder={props.placeholder}
            label={props.label}
            required={props.required}
            disabled={props.disabled}
            helperText={props.helperText || undefined}
            errorMessage={props.errorMessage || undefined}
            size={props.size}
            inline={props.inline}
            showWeekNumbers={props.showWeekNumbers}
            clearable={props.clearable}
            showTodayButton={props.showTodayButton}
            value={selectedDate.value}
            onDateSelect$={(date: Date | null) => {
              selectedDate.value = date || undefined;
            }}
          />
        )}

        <div class="bg-surface-secondary dark:bg-surface-dark-secondary mt-4 rounded p-2 text-sm">
          {props.mode === "range" && selectedRange.value ? (
            <p>
              Selected range:{" "}
              {selectedRange.value.startDate
                ? new Date(selectedRange.value.startDate).toLocaleDateString()
                : "None"}{" "}
              -
              {selectedRange.value.endDate
                ? new Date(selectedRange.value.endDate).toLocaleDateString()
                : "None"}
            </p>
          ) : (
            <p>
              Current selection:{" "}
              {selectedDate.value
                ? new Date(selectedDate.value).toLocaleDateString()
                : "None"}
            </p>
          )}
        </div>
      </div>
    );
  });

  // Define the controls for the playground
  const properties: PropertyControl[] = [
    {
      type: "select",
      name: "mode",
      label: "Mode",
      options: [
        { label: "Single", value: "single" },
        { label: "Range", value: "range" },
        { label: "DateTime", value: "datetime" },
      ],
      defaultValue: "single",
    },
    {
      type: "text",
      name: "placeholder",
      label: "Placeholder",
      defaultValue: "Select a date",
    },
    {
      type: "text",
      name: "label",
      label: "Label",
      defaultValue: "Date",
    },
    {
      type: "boolean",
      name: "required",
      label: "Required",
      defaultValue: false,
    },
    {
      type: "boolean",
      name: "disabled",
      label: "Disabled",
      defaultValue: false,
    },
    {
      type: "text",
      name: "helperText",
      label: "Helper Text",
      defaultValue: "Please select a date",
    },
    {
      type: "text",
      name: "errorMessage",
      label: "Error Message",
      defaultValue: "",
    },
    {
      type: "select",
      name: "size",
      label: "Size",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
      defaultValue: "md",
    },
    {
      type: "boolean",
      name: "inline",
      label: "Inline",
      defaultValue: false,
    },
    {
      type: "boolean",
      name: "showWeekNumbers",
      label: "Show Week Numbers",
      defaultValue: false,
    },
    {
      type: "boolean",
      name: "clearable",
      label: "Clearable",
      defaultValue: true,
    },
    {
      type: "boolean",
      name: "showTodayButton",
      label: "Show Today Button",
      defaultValue: false,
    },
  ];

  return (
    <PlaygroundTemplate component={DatePickerDemo} properties={properties} />
  );
});
