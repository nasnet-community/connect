import { component$, useSignal, $ } from "@builder.io/qwik";
import { Autocomplete } from "../Autocomplete";
import type {
  AutocompleteOption,
  AutocompleteGroup,
} from "../Autocomplete.types";

// Sample data
const basicOptions: AutocompleteOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
  { value: "elderberry", label: "Elderberry" },
  { value: "fig", label: "Fig" },
  { value: "grape", label: "Grape" },
  { value: "honeydew", label: "Honeydew" },
];

const groupedOptions: AutocompleteGroup[] = [
  {
    label: "Fruits",
    options: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "orange", label: "Orange" },
    ],
  },
  {
    label: "Vegetables",
    options: [
      { value: "carrot", label: "Carrot" },
      { value: "broccoli", label: "Broccoli" },
      { value: "spinach", label: "Spinach" },
    ],
  },
  {
    label: "Grains",
    options: [
      { value: "rice", label: "Rice" },
      { value: "wheat", label: "Wheat" },
      { value: "oats", label: "Oats" },
    ],
  },
];

const countryOptions: AutocompleteOption[] = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
  { value: "jp", label: "Japan" },
  { value: "cn", label: "China" },
];

export const BasicAutocompleteExample = component$(() => {
  const basicValue = useSignal<string>("");
  const customValue = useSignal<string>("");
  const groupedValue = useSignal<string>("");
  const asyncValue = useSignal<string>("");
  const sizeValue = useSignal<string>("");
  const errorValue = useSignal<string>("");
  const disabledValue = useSignal<string>("");
  const noCustomValue = useSignal<string>("");
  const customFilterValue = useSignal<string>("");
  const isLoading = useSignal(false);
  const asyncOptions = useSignal<AutocompleteOption[]>([]);

  // Simulate async loading
  const loadAsyncOptions = $(async (query: string) => {
    isLoading.value = true;
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Filter countries based on query
    const filtered = countryOptions.filter((option) =>
      option.label.toLowerCase().includes(query.toLowerCase()),
    );

    asyncOptions.value = filtered;
    isLoading.value = false;
  });

  // Custom filter function that matches from the start of the string
  const customFilter = $((option: AutocompleteOption, inputValue: string) => {
    return option.label.toLowerCase().startsWith(inputValue.toLowerCase());
  });

  return (
    <div class="space-y-8 p-4">
      <h2 class="mb-4 text-2xl font-bold">Autocomplete Component Examples</h2>

      {/* Basic Autocomplete */}
      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Basic Autocomplete</h3>
        <p class="text-sm text-gray-600">
          Simple autocomplete with predefined options
        </p>
        <Autocomplete
          value={basicValue.value}
          options={basicOptions}
          placeholder="Select a fruit..."
          onValueChange$={$((value: string) => {
            basicValue.value = value;
          })}
        />
        <p class="text-sm">Selected value: {basicValue.value || "None"}</p>
      </div>

      {/* Autocomplete with Custom Values */}
      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Autocomplete with Custom Values</h3>
        <p class="text-sm text-gray-600">
          Allows entering custom values not in the list
        </p>
        <Autocomplete
          value={customValue.value}
          options={basicOptions}
          placeholder="Select or type a custom fruit..."
          allowCustomValue={true}
          onValueChange$={$((value: string) => {
            customValue.value = value;
          })}
        />
        <p class="text-sm">Selected value: {customValue.value || "None"}</p>
      </div>

      {/* Grouped Options */}
      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Grouped Options</h3>
        <p class="text-sm text-gray-600">Options organized in groups</p>
        <Autocomplete
          value={groupedValue.value}
          options={groupedOptions.flatMap((group) => group.options)}
          placeholder="Select food item..."
          onValueChange$={$((value: string) => {
            groupedValue.value = value;
          })}
        />
        <p class="text-sm">Selected value: {groupedValue.value || "None"}</p>
      </div>

      {/* Async Loading */}
      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Async Loading</h3>
        <p class="text-sm text-gray-600">
          Load options asynchronously as user types
        </p>
        <Autocomplete
          value={asyncValue.value}
          options={asyncOptions.value}
          placeholder="Search countries..."
          loading={isLoading.value}
          onInputChange$={$((value: string) => {
            if (value.length >= 1) {
              loadAsyncOptions(value);
            } else {
              asyncOptions.value = [];
            }
          })}
          onValueChange$={$((value: string) => {
            asyncValue.value = value;
          })}
        />
        <p class="text-sm">Selected value: {asyncValue.value || "None"}</p>
      </div>

      {/* Different Sizes */}
      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Different Sizes</h3>
        <p class="text-sm text-gray-600">Autocomplete in various sizes</p>
        <div class="space-y-3">
          <Autocomplete
            value={sizeValue.value}
            options={basicOptions}
            placeholder="Small size..."
            size="sm"
            onValueChange$={$((value: string) => {
              sizeValue.value = value;
            })}
          />
          <Autocomplete
            value={sizeValue.value}
            options={basicOptions}
            placeholder="Medium size (default)..."
            size="md"
            onValueChange$={$((value: string) => {
              sizeValue.value = value;
            })}
          />
          <Autocomplete
            value={sizeValue.value}
            options={basicOptions}
            placeholder="Large size..."
            size="lg"
            onValueChange$={$((value: string) => {
              sizeValue.value = value;
            })}
          />
        </div>
      </div>

      {/* Error State */}
      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Error State</h3>
        <p class="text-sm text-gray-600">Autocomplete with error state</p>
        <Autocomplete
          value={errorValue.value}
          options={basicOptions}
          placeholder="Select a fruit..."
          error="Please select a valid fruit"
          onValueChange$={$((value: string) => {
            errorValue.value = value;
          })}
        />
        <p class="text-sm text-red-500">Please select a valid fruit</p>
      </div>

      {/* Disabled State */}
      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Disabled State</h3>
        <p class="text-sm text-gray-600">Disabled autocomplete</p>
        <Autocomplete
          value={disabledValue.value}
          options={basicOptions}
          placeholder="Disabled autocomplete..."
          disabled={true}
          onValueChange$={$((value: string) => {
            disabledValue.value = value;
          })}
        />
      </div>

      {/* No Custom Values Mode */}
      <div class="space-y-2">
        <h3 class="text-lg font-semibold">No Custom Values</h3>
        <p class="text-sm text-gray-600">Only allows selection from the list</p>
        <Autocomplete
          value={noCustomValue.value}
          options={basicOptions}
          placeholder="Must select from list..."
          allowCustomValue={false}
          onValueChange$={$((value: string) => {
            noCustomValue.value = value;
          })}
        />
        <p class="text-sm">Selected value: {noCustomValue.value || "None"}</p>
      </div>

      {/* Custom Filtering */}
      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Custom Filtering</h3>
        <p class="text-sm text-gray-600">
          Uses custom filter that only matches from start of string
        </p>
        <Autocomplete
          value={customFilterValue.value}
          options={basicOptions}
          placeholder="Type to filter from start..."
          filterFunction$={customFilter}
          onValueChange$={$((value: string) => {
            customFilterValue.value = value;
          })}
        />
        <p class="text-sm">
          Selected value: {customFilterValue.value || "None"}
        </p>
      </div>
    </div>
  );
});

export default BasicAutocompleteExample;
